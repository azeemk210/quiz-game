'use client';

import { motion } from 'framer-motion';

interface AnswerButtonsProps {
  options: string[];
  onSelect: (index: number) => void;
  disabled: boolean;
}

export default function AnswerButtons({ options, onSelect, disabled }: AnswerButtonsProps) {
  const colors = ['bg-kahoot-red', 'bg-kahoot-blue', 'bg-kahoot-yellow', 'bg-kahoot-green'];
  const shapes = ['▲', '◆', '●', '■'];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1.5 h-full w-full">
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => onSelect(idx)}
          disabled={disabled}
          className={`${colors[idx]} rounded-xl text-white flex items-center justify-between px-3 py-2 transition-transform active:scale-95 shadow-md border-b-4 border-black/20 w-full`}
        >
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-3xl font-black opacity-40">{shapes[idx]}</span>
            <span className="text-xs md:text-xl font-extrabold uppercase tracking-tight leading-tight">{option}</span>
          </div>
          <div className="w-5 h-5 md:w-8 md:h-8 rounded-md bg-white/20 flex items-center justify-center font-black text-xs md:text-base flex-shrink-0">
            {String.fromCharCode(65 + idx)}
          </div>
        </button>
      ))}
    </div>
  );
}
