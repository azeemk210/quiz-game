'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

interface Question {
  id: string;
  question_text: string;
  options: string[];
  correct_answer_index: number;
  time_limit: number;
}

const shapes = ['▲', '◆', '●', '■'];
const colors = ['bg-red-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-600'];
const lightColors = ['bg-red-50 border-red-300', 'bg-blue-50 border-blue-300', 'bg-yellow-50 border-yellow-300', 'bg-green-50 border-green-300'];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [quizTitle, setQuizTitle] = useState('');

  useEffect(() => {
    const fetchQuestions = async () => {
      // Get latest quiz
      const { data: quiz } = await supabase
        .from('quizzes')
        .select('id, title')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (!quiz) { setLoading(false); return; }
      setQuizTitle(quiz.title);

      const { data: qs } = await supabase
        .from('questions')
        .select('id, question_text, options, correct_answer_index, time_limit')
        .eq('quiz_id', quiz.id)
        .order('created_at', { ascending: true });

      if (qs) setQuestions(qs);
      setLoading(false);
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1a0533] flex items-center justify-center">
        <div className="text-white text-2xl font-bold animate-pulse">Loading questions…</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1a0533] py-10 px-4">
      {/* Header */}
      <div className="max-w-3xl mx-auto mb-8 text-center">
        <h1 className="text-4xl font-black text-white uppercase tracking-widest mb-1">
          📋 Question Bank
        </h1>
        <p className="text-purple-300 font-semibold text-lg">{quizTitle}</p>
        <p className="text-purple-400 text-sm mt-1">{questions.length} questions · 15s each</p>
      </div>

      {/* Questions */}
      <div className="max-w-3xl mx-auto space-y-6">
        {questions.map((q, idx) => {
          const lines = q.question_text.split('\n');
          return (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.04 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Question header bar */}
              <div className="bg-[#46178f] px-5 py-3 flex items-center justify-between">
                <span className="text-white font-black text-sm uppercase tracking-widest">
                  Q.{idx + 1}
                </span>
                <span className="text-purple-200 text-xs font-bold">⏱ {q.time_limit}s</span>
              </div>

              {/* Question text */}
              <div className="px-5 pt-4 pb-3 border-b border-gray-100">
                {lines.map((line, li) => (
                  <p
                    key={li}
                    className={`leading-snug ${
                      li === 0
                        ? 'text-base font-black text-gray-900'
                        : 'text-sm font-semibold text-gray-500 mt-1'
                    }`}
                  >
                    {line}
                  </p>
                ))}
              </div>

              {/* Options grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 p-4">
                {q.options.map((opt, oi) => {
                  const isCorrect = oi === q.correct_answer_index;
                  return (
                    <div
                      key={oi}
                      className={`flex items-center gap-3 rounded-xl border-2 px-4 py-2.5 transition-all ${
                        isCorrect
                          ? 'bg-green-50 border-green-500 shadow-md'
                          : lightColors[oi]
                      }`}
                    >
                      {/* Shape icon */}
                      <span className={`text-lg font-black ${isCorrect ? 'text-green-600' : 'text-gray-400'}`}>
                        {shapes[oi]}
                      </span>
                      {/* Option letter badge */}
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white flex-shrink-0 ${
                        isCorrect ? 'bg-green-500' : colors[oi]
                      }`}>
                        {String.fromCharCode(65 + oi)}
                      </span>
                      {/* Option text */}
                      <span className={`text-sm font-bold flex-1 ${isCorrect ? 'text-green-800' : 'text-gray-700'}`}>
                        {opt}
                      </span>
                      {/* Correct tick */}
                      {isCorrect && (
                        <span className="text-green-500 text-lg font-black">✓</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Correct answer summary */}
              <div className="mx-4 mb-4 px-4 py-2 bg-green-500 rounded-xl flex items-center gap-2">
                <span className="text-white text-sm font-black">✅ Correct Answer:</span>
                <span className="text-white text-sm font-bold">
                  {String.fromCharCode(65 + q.correct_answer_index)} — {q.options[q.correct_answer_index]}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="max-w-3xl mx-auto mt-10 text-center">
        <a
          href="/host/create"
          className="inline-block bg-[#46178f] text-white font-black px-8 py-3 rounded-2xl shadow-lg hover:scale-105 transition-transform text-sm uppercase tracking-widest"
        >
          ← Back to Host
        </a>
      </div>
    </div>
  );
}
