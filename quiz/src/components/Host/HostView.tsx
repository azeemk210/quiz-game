'use client';

import { useState, useEffect } from 'react';
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
    gameChannel.subscribe((status) => {
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

      channel.send({
        type: 'broadcast',
        event: 'QUESTION_START',
        payload: { 
          questionId: nextQ.id,
          question_text: nextQ.question_text,
          questionText: nextQ.question_text,
          options: nextQ.options,
          startTime: Date.now(),
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
      />
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-kahoot-purple text-white">
      <h1 className="text-6xl font-black italic">Loading...</h1>
    </div>
  );
}
