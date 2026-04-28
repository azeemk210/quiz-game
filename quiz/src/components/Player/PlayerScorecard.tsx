'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

interface ScorecardItem {
  question_text: string;
  is_correct: boolean;
  points: number;
  answer_index: number | null;  // null = not answered (timed out)
  correct_answer_index: number;
  options: string[];
  skipped: boolean;
}

export default function PlayerScorecard({ playerId, gameId }: { playerId: string; gameId: string }) {
  const [answers, setAnswers] = useState<ScorecardItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScorecard = async () => {
      // Fetch ALL questions for this game session
      const { data: sessionData } = await supabase
        .from('game_sessions')
        .select('quiz_id')
        .eq('id', gameId)
        .single();

      if (!sessionData) { setLoading(false); return; }

      const { data: questions, error: qErr } = await supabase
        .from('questions')
        .select('id, question_text, correct_answer_index, options')
        .eq('quiz_id', sessionData.quiz_id)
        .order('created_at', { ascending: true });

      if (qErr) console.error('Error fetching questions:', qErr);

      // Fetch this player's answers for this game
      const { data: playerAnswers } = await supabase
        .from('answers')
        .select('question_id, is_correct, points, answer_index')
        .eq('player_id', playerId)
        .eq('game_id', gameId);

      if (questions && !qErr) {
        const answerMap = new Map(
          (playerAnswers || []).map((a: any) => [a.question_id, a])
        );

        const formatted: ScorecardItem[] = questions.map((q: any) => {
          const playerAns = answerMap.get(q.id);
          return {
            question_text: q.question_text,
            is_correct: playerAns?.is_correct ?? false,
            points: playerAns?.points ?? 0,
            answer_index: playerAns?.answer_index ?? null,
            correct_answer_index: q.correct_answer_index,
            options: q.options,
            skipped: !playerAns,
          };
        });
        setAnswers(formatted);
      }
      setLoading(false);
    };

    fetchScorecard();

    // Listen for new answers to update live
    const channel = supabase.channel(`player-scorecard-${playerId}`)
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'answers', filter: `player_id=eq.${playerId}` },
        () => fetchScorecard()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [playerId, gameId]);

  if (loading) return <div className="p-8 text-center animate-pulse">Generating your scorecard...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl">
      <h3 className="text-2xl font-black text-white text-center mb-6 uppercase tracking-widest">Your Game History</h3>
      
      <div className="space-y-4">
        {answers.map((item, idx) => {
          const borderColor = item.skipped
            ? 'border-gray-400'
            : item.is_correct
            ? 'border-green-500'
            : 'border-red-500';
          const bgColor = item.skipped
            ? 'bg-gray-50'
            : item.is_correct
            ? 'bg-green-50'
            : 'bg-red-50';
          return (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={idx} 
            className={`p-4 rounded-2xl border-l-8 ${bgColor} ${borderColor} shadow-sm`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className="text-xs font-bold text-gray-400">Question {idx + 1}</span>
              <span className={`text-xs font-black px-2 py-1 rounded-full ${
                item.skipped ? 'bg-gray-400 text-white' :
                item.is_correct ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
              }`}>
                {item.skipped ? 'Skipped' : item.is_correct ? `+${item.points} pts` : '0 pts'}
              </span>
            </div>
            
            <p className="text-[12px] font-bold text-gray-800 mb-3 whitespace-pre-wrap leading-tight">
              {item.question_text}
            </p>

            <div className="grid grid-cols-1 gap-2">
              {item.skipped ? (
                <div className="text-xs p-2 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-between">
                  <span>No answer submitted (time ran out)</span>
                  <span>⏱️</span>
                </div>
              ) : (
                <div className={`text-xs p-2 rounded-lg flex items-center justify-between ${item.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  <span>Your Answer: <strong>{item.answer_index !== null ? item.options[item.answer_index] : '—'}</strong></span>
                  <span>{item.is_correct ? '✅' : '❌'}</span>
                </div>
              )}
              {!item.is_correct && (
                <div className="text-xs p-2 rounded-lg bg-blue-50 text-blue-800 flex items-center justify-between">
                  <span>Correct: <strong>{item.options[item.correct_answer_index]}</strong></span>
                  <span>💡</span>
                </div>
              )}
            </div>
          </motion.div>
          );
        })}
        
        {answers.length === 0 && (
          <div className="text-center py-10 text-white/60 font-bold italic">No questions answered.</div>
        )}
      </div>
    </div>
  );
}
