'use client';

import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { GameSession, Question, Player, GameStatus } from '@/types/game';
import Lobby from './Lobby';
import QuestionView from './QuestionView';
import Leaderboard from './Leaderboard';
import Podium from './Podium';
import HostScorecard from './HostScorecard';

interface HostViewProps {
  initialSession: GameSession;
  questions: Question[];
}

export default function HostView({ initialSession, questions }: HostViewProps) {
  const [status, setStatus] = useState<GameStatus>(initialSession.status);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [answerCount, setAnswerCount] = useState(0);
  const [channel, setChannel] = useState<any>(null);
  const [currentEndTime, setCurrentEndTime] = useState<number>(0);

  // Refs for listeners to avoid stale closures
  const statusRef = useRef(status);
  const indexRef = useRef(currentQuestionIndex);
  const endTimeRef = useRef(currentEndTime);

  useEffect(() => { statusRef.current = status; }, [status]);
  useEffect(() => { indexRef.current = currentQuestionIndex; }, [currentQuestionIndex]);
  useEffect(() => { endTimeRef.current = currentEndTime; }, [currentEndTime]);

  // Subscribe to players and setup broadcast channel
  useEffect(() => {
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('game_id', initialSession.id);
      if (data) setPlayers(data);
    };

    fetchPlayers();

    // Setup the main game channel for broadcasting
    const gameChannel = supabase.channel(`game-${initialSession.id}`);
    
    gameChannel
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        // Use refs to get latest state
        if (statusRef.current === 'IN_PROGRESS' && indexRef.current >= 0) {
          const currentQ = questions[indexRef.current];
          gameChannel.send({
            type: 'broadcast',
            event: 'QUESTION_START',
            payload: { 
              questionId: currentQ.id,
              question_text: currentQ.question_text,
              questionText: currentQ.question_text,
              options: currentQ.options,
              startTime: Date.now(),
              endTime: endTimeRef.current,
              timeLimit: currentQ.time_limit
            }
          });
        }
      })
      .subscribe((status) => {
        console.log(`Main game channel status: ${status}`);
      });
    
    setChannel(gameChannel);

    const playerChannel = supabase
      .channel(`host-updates-${initialSession.id}`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'players', filter: `game_id=eq.${initialSession.id}` },
        () => fetchPlayers()
      )
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'answers', filter: `game_id=eq.${initialSession.id}` },
        () => setAnswerCount((prev) => prev + 1)
      )
      .subscribe();

    return () => {
      supabase.removeChannel(gameChannel);
      supabase.removeChannel(playerChannel);
    };
  }, [initialSession.id]);

  // Prevent accidental refresh
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (status !== 'FINISHED' && status !== 'LOBBY') {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [status]);

  const startGame = async () => {
    const firstQuestion = questions[0];
    const { error } = await supabase
      .from('game_sessions')
      .update({ 
        status: 'IN_PROGRESS', 
        current_question_id: firstQuestion.id 
      })
      .eq('id', initialSession.id);

    if (!error && channel) {
      setStatus('IN_PROGRESS');
      setCurrentQuestionIndex(0);
      setAnswerCount(0);
      
      const endTime = Date.now() + (firstQuestion.time_limit * 1000);
      setCurrentEndTime(endTime);
      
      // Broadcast question start
      channel.send({
        type: 'broadcast',
        event: 'QUESTION_START',
        payload: { 
          questionId: firstQuestion.id,
          question_text: firstQuestion.question_text,
          questionText: firstQuestion.question_text,
          options: firstQuestion.options,
          startTime: Date.now(),
          endTime: endTime,
          timeLimit: firstQuestion.time_limit
        }
      });
    }
  };

  const nextQuestion = async () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      const nextQ = questions[nextIndex];
      await supabase
        .from('game_sessions')
        .update({ current_question_id: nextQ.id })
        .eq('id', initialSession.id);

      setCurrentQuestionIndex(nextIndex);
      setShowLeaderboard(false);
      setAnswerCount(0);

      const endTime = Date.now() + (nextQ.time_limit * 1000);
      setCurrentEndTime(endTime);

      channel.send({
        type: 'broadcast',
        event: 'QUESTION_START',
        payload: { 
          questionId: nextQ.id,
          question_text: nextQ.question_text,
          questionText: nextQ.question_text,
          options: nextQ.options,
          startTime: Date.now(),
          endTime: endTime,
          timeLimit: nextQ.time_limit
        }
      });
    } else {
      await supabase
        .from('game_sessions')
        .update({ status: 'FINISHED' })
        .eq('id', initialSession.id);
      
      setStatus('FINISHED');
      setShowLeaderboard(false);

      // Broadcast game finished to all players
      if (channel) {
        channel.send({
          type: 'broadcast',
          event: 'GAME_FINISHED',
          payload: {}
        });
      }
    }
  };

  const handleTimeUp = () => {
    setShowLeaderboard(true);
    if (channel) {
      channel.send({
        type: 'broadcast',
        event: 'QUESTION_END',
        payload: {}
      });
    }
  };
  const [showScorecard, setShowScorecard] = useState(false);

  if (status === 'FINISHED') {
    return (
      <div className="min-h-screen bg-kahoot-purple overflow-y-auto pb-10">
        {!showScorecard ? (
          <>
            <Podium players={players} />
            <div className="flex justify-center mt-8">
              <button 
                onClick={() => setShowScorecard(true)}
                className="bg-white text-kahoot-purple px-10 py-4 rounded-2xl text-2xl font-black shadow-xl hover:scale-105 transition-transform"
              >
                View Detailed Scorecard
              </button>
            </div>
          </>
        ) : (
          <>
            <HostScorecard gameId={initialSession.id} players={players} />
            <div className="flex justify-center mt-8">
              <button 
                onClick={() => setShowScorecard(false)}
                className="bg-white/20 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/30 transition-colors"
              >
                Back to Podium
              </button>
            </div>
          </>
        )}
      </div>
    );
  }

  if (status === 'LOBBY') {
    return <Lobby pin={initialSession.pin} gameId={initialSession.id} onStart={startGame} />;
  }

  if (showLeaderboard) {
    return (
      <Leaderboard 
        players={players} 
        onNext={nextQuestion} 
        isLastQuestion={currentQuestionIndex === questions.length - 1} 
      />
    );
  }

  if (status === 'IN_PROGRESS' && currentQuestionIndex >= 0) {
    return (
      <QuestionView 
        question={questions[currentQuestionIndex]}
        currentIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        onTimeUp={handleTimeUp}
        answerCount={answerCount}
        endTime={currentEndTime}
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-kahoot-purple text-white">
      <h1 className="text-6xl font-black italic">Loading...</h1>
    </div>
  );
}
