'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Player, Question } from '@/types/game';
import JoinGame from './JoinGame';
import AnswerButtons from './AnswerButtons';
import Podium from '../Host/Podium';
import PlayerScorecard from './PlayerScorecard';
import { motion, AnimatePresence } from 'framer-motion';

export default function PlayerView() {
  const [gameId, setGameId] = useState<string | null>(null);
  const [player, setPlayer] = useState<Player | null>(null);
  const [gameState, setGameState] = useState<'WAITING' | 'QUESTION' | 'RESULT' | 'FINISHED'>('WAITING');
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [lastResult, setLastResult] = useState<{ correct: boolean; points: number } | null>(null);
  const [allPlayers, setAllPlayers] = useState<Player[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    if (!gameId || !player || gameState !== 'FINISHED') return;
    
    const fetchAll = async () => {
      const { data } = await supabase.from('players').select('*').eq('game_id', gameId);
      if (data) setAllPlayers(data);
    };
    fetchAll();
  }, [gameId, player, gameState]);

  useEffect(() => {
    if (!gameId || !player) return;

    const channel = supabase.channel(`game-${gameId}`, {
      config: {
        presence: {
          key: player.nickname,
        },
      },
    });

    channel
      .on('broadcast', { event: 'QUESTION_START' }, ({ payload }) => {
        console.log('Received QUESTION_START:', payload);
        setGameState('QUESTION');
        setCurrentQuestion(payload);
        setHasAnswered(false);
        setLastResult(null);
        
        // Initialize timer based on absolute end time
        const updateTimer = () => {
          const remaining = Math.max(0, Math.ceil((payload.endTime - Date.now()) / 1000));
          setTimeLeft(remaining);
        };
        updateTimer();
      })
      .on('broadcast', { event: 'QUESTION_END' }, () => {
        console.log('Received QUESTION_END');
        setGameState('RESULT');
        setTimeLeft(0);
      })
      .on('broadcast', { event: 'GAME_FINISHED' }, () => {
        console.log('Received GAME_FINISHED');
        setGameState('FINISHED');
        setTimeLeft(0);
      })
      .subscribe(async (status) => {
        console.log(`Player game channel status: ${status}`);
        if (status === 'SUBSCRIBED') {
          await channel.track({ online_at: new Date().toISOString() });
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId, player]);

  useEffect(() => {
    if (gameState !== 'QUESTION' || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const handleJoin = (id: string, p: Player) => {
    setGameId(id);
    setPlayer(p);
  };

  const submitAnswer = async (index: number) => {
    if (hasAnswered || !currentQuestion || !player || !gameId) return;

    setHasAnswered(true);
    const timeTaken = (Date.now() - currentQuestion.startTime) / 1000;
    
    // Fetch question to check answer (ideally this should be secure)
    const { data: qData } = await supabase
      .from('questions')
      .select('correct_answer_index')
      .eq('id', currentQuestion.questionId)
      .single();

    if (!qData) return;

    const isCorrect = qData.correct_answer_index === index;
    
    // Scoring logic: 1000 * (1 - (time_taken / total_time) * 0.5)
    let points = 0;
    if (isCorrect) {
      const timeRatio = Math.min(timeTaken / currentQuestion.timeLimit, 1);
      points = Math.round(1000 * (1 - timeRatio * 0.5));
    }

    setLastResult({ correct: isCorrect, points });

    // Insert answer
    await supabase.from('answers').insert({
      player_id: player.id,
      game_id: gameId,
      question_id: currentQuestion.questionId,
      answer_index: index,
      is_correct: isCorrect,
      points: points
    });

    // Update total score in players table using the RPC
    if (points > 0) {
      const { error: rpcError } = await supabase.rpc('increment_score', { 
        player_uuid: player.id, 
        points_to_add: points 
      });

      if (!rpcError) {
        // Update local state so the next question uses the correct total
        setPlayer(prev => prev ? { ...prev, score: prev.score + points } : null);
      }
    }
  };

  if (!gameId || !player) {
    return <JoinGame onJoin={handleJoin} />;
  }

  if (gameState === 'FINISHED') {
    return (
      <div className="min-h-screen bg-kahoot-purple overflow-y-auto">
        <Podium players={allPlayers} showHomeButton={false} />
        <div className="flex flex-col items-center px-4 relative z-10 gap-4 mt-8 pb-10">
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full max-w-2xl bg-white text-kahoot-purple py-4 rounded-2xl font-black text-xl shadow-xl hover:scale-105 transition-transform"
          >
            Back to Home
          </button>
          <PlayerScorecard playerId={player.id} gameId={gameId} />
        </div>
      </div>
    );
  }

  return (
    <div className="screen-container bg-white">
      {/* Header */}
      <div className="bg-gray-100 p-4 flex justify-between items-center shadow-sm flex-none">
        <span className="font-bold text-gray-700 truncate max-w-[100px]">{player.nickname}</span>
        <div className="bg-gray-800 text-white px-3 py-1 rounded font-bold text-sm">
          {gameState === 'RESULT' ? 'Result' : 'Game'}
        </div>
        <span className="font-bold text-gray-700">{Math.round(player.score)}</span>
      </div>

      <main className="flex-1 flex flex-col items-center justify-center p-1 md:p-4 overflow-hidden w-full">
        <AnimatePresence mode="wait">
          {gameState === 'WAITING' && (
            <motion.div
              key="waiting"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-kahoot-purple mb-2">You're in!</h2>
              <p className="text-lg text-gray-600">Look at the Host's screen</p>
            </motion.div>
          )}

          {gameState === 'QUESTION' && currentQuestion && (
            <motion.div
              key="question"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex flex-col px-1"
            >
              {hasAnswered ? (
                <div className="flex flex-col items-center justify-center flex-1 gap-2">
                  <div className="w-10 h-10 border-4 border-kahoot-purple border-t-transparent rounded-full animate-spin" />
                  <p className="text-lg font-bold text-kahoot-purple text-center">Submitted!</p>
                </div>
              ) : (
                <div className="flex-1 flex flex-col overflow-hidden w-full max-w-4xl mx-auto">
                  {/* Question Box — grows to fill remaining space */}
                  <div className="flex-1 flex flex-col items-center justify-center p-3 relative">
                    {/* Timer Circle */}
                    {!hasAnswered && (
                      <motion.div 
                        animate={timeLeft <= 5 ? { scale: [1, 1.1, 1] } : {}}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                        className={`absolute top-0 right-4 w-14 h-14 rounded-full border-4 ${
                          timeLeft <= 5 ? 'border-kahoot-red text-kahoot-red' : 'border-kahoot-purple text-kahoot-purple'
                        } flex items-center justify-center text-xl font-black bg-white shadow-xl z-20 transition-colors`}
                      >
                        {timeLeft}
                      </motion.div>
                    )}
                    
                    <div className="bg-white px-4 py-4 md:p-8 rounded-2xl shadow-lg border-b-4 border-gray-200 text-center w-full">
                      <h2 
                        className="font-black text-gray-800 leading-snug whitespace-pre-wrap break-words mx-auto"
                        style={{
                          fontSize: currentQuestion.question_text?.length > 200
                            ? 'clamp(14px, 4vw, 22px)'
                            : currentQuestion.question_text?.length > 100
                            ? 'clamp(17px, 5vw, 26px)'
                            : 'clamp(20px, 6vw, 30px)'
                        }}
                      >
                        {currentQuestion.question_text || (currentQuestion as any).questionText}
                      </h2>
                    </div>
                  </div>
                  
                  {/* Options — fixed height so buttons stay compact */}
                  <div className="flex-none h-[52vhmax] bg-white rounded-t-3xl shadow-2xl border-t-2 border-gray-100" style={{height: 'min(52vh, 320px)'}}>
                    <div className="p-2 h-full">
                    <AnswerButtons 
                      options={currentQuestion.options} 
                      onSelect={submitAnswer} 
                      disabled={hasAnswered} 
                    />
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {gameState === 'RESULT' && (
            <motion.div
              key="result"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className={`w-full h-full flex flex-col items-center justify-center text-white rounded-xl ${
                !lastResult ? 'bg-gray-500' : 
                lastResult.correct ? 'bg-kahoot-green' : 'bg-kahoot-red'
              }`}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-4">
                {!lastResult ? "TIME'S UP!" : lastResult.correct ? 'CORRECT!' : 'INCORRECT'}
              </h2>
              {lastResult && (
                <div className="text-2xl md:text-4xl font-bold bg-black/20 px-8 py-4 rounded-xl">
                  +{lastResult.points} points
                </div>
              )}
              {!lastResult && (
                <div className="text-xl md:text-2xl font-bold bg-black/20 px-6 py-3 rounded-xl">
                  Better luck next time!
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer PIN display */}
      <div className="p-2 bg-gray-800 text-white text-center font-bold text-xs flex-none">
        PIN: {gameId.substring(0, 8)}...
      </div>
    </div>
  );
}
