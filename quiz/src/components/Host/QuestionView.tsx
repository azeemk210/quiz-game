'use client';

import { useState, useEffect } from 'react';
import { Question } from '@/types/game';
import { motion, AnimatePresence } from 'framer-motion';

interface QuestionViewProps {
  question: Question;
  totalQuestions: number;
  currentIndex: number;
  onTimeUp: () => void;
  answerCount: number;
  endTime: number;
}

export default function QuestionView({ 
  question, 
  totalQuestions, 
  currentIndex, 
  onTimeUp,
  answerCount,
  endTime
}: QuestionViewProps) {
  const [timeLeft, setTimeLeft] = useState(Math.max(0, Math.ceil((endTime - Date.now()) / 1000)));

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = Math.max(0, Math.ceil((endTime - Date.now()) / 1000));
      setTimeLeft(remaining);
      if (remaining <= 0) {
        onTimeUp();
        clearInterval(timer);
      }
    }, 500); // Check more frequently for better precision

    return () => clearInterval(timer);
  }, [endTime, onTimeUp]);

  const colors = ['bg-kahoot-red', 'bg-kahoot-blue', 'bg-kahoot-yellow', 'bg-kahoot-green'];
  const shapes = ['▲', '◆', '●', '■'];

  return (
    <div className="screen-container bg-gray-100 p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="bg-white px-4 py-1 rounded-full font-bold shadow-sm text-sm md:text-base">
          {currentIndex + 1} of {totalQuestions}
        </div>
        <div className="text-2xl md:text-3xl font-black text-kahoot-purple">IslamQuiz</div>
        <div className="bg-white px-4 py-1 rounded-full font-bold shadow-sm text-sm md:text-base">
          {answerCount} Answers
        </div>
      </div>

      {/* Question Text */}
      <div className="bg-white p-4 md:p-6 rounded-xl shadow-md text-center mb-4 flex-none">
        <h2 className="text-lg md:text-3xl font-bold text-gray-800 leading-tight whitespace-pre-wrap break-words">
          {question.question_text}
        </h2>
      </div>

      {/* Middle section with Timer and Image placeholder */}
      <div className="flex flex-1 items-center justify-between gap-4 mb-4 overflow-hidden">
        <motion.div 
          animate={timeLeft <= 5 ? { scale: [1, 1.05, 1] } : {}}
          transition={{ repeat: Infinity, duration: 0.5 }}
          className={`w-20 h-20 md:w-32 md:h-32 rounded-full border-4 md:border-8 ${
            timeLeft <= 5 ? 'border-kahoot-red text-kahoot-red' : 'border-kahoot-purple text-kahoot-purple'
          } flex-shrink-0 flex items-center justify-center text-3xl md:text-4xl font-black bg-white transition-colors`}
        >
          {timeLeft}
        </motion.div>
        
        <div className="flex-1 max-w-2xl h-full bg-gray-200 rounded-xl flex items-center justify-center border-4 border-white shadow-lg overflow-hidden">
           <span className="text-gray-400 font-bold">Quiz Image</span>
        </div>

        <div className="w-20 md:w-32 flex-shrink-0" /> {/* Spacer */}
      </div>

      {/* Options Grid */}
      <div className="grid grid-cols-2 gap-2 md:gap-4 h-[30vh] md:h-[25vh] flex-none">
        {question.options.map((option, idx) => (
          <div 
            key={idx}
            className={`${colors[idx]} rounded-lg px-4 py-2 text-white flex items-center gap-3 shadow-md`}
          >
            <span className="text-2xl md:text-4xl opacity-50">{shapes[idx]}</span>
            <span className="text-sm md:text-2xl font-bold truncate">{option}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
