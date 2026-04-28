'use client';

import { Player } from '@/types/game';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

interface LeaderboardProps {
  players: Player[];
  onNext: () => void;
  isLastQuestion: boolean;
}

export default function Leaderboard({ players, onNext, isLastQuestion }: LeaderboardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score).slice(0, 5);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-kahoot-blue p-8 text-white">
      <div className="flex items-center gap-4 mb-12">
        <Trophy size={64} className="text-kahoot-yellow" />
        <h1 className="text-6xl font-black italic">Leaderboard</h1>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden mb-8">
        {sortedPlayers.map((player, idx) => (
          <motion.div
            key={player.id}
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex justify-between items-center p-6 border-b last:border-b-0 ${idx === 0 ? 'bg-kahoot-yellow/10' : ''}`}
          >
            <div className="flex items-center gap-4">
              <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${idx === 0 ? 'bg-kahoot-yellow text-white' : 'bg-gray-200 text-gray-600'}`}>
                {idx + 1}
              </span>
              <span className="text-2xl font-bold text-gray-800">{player.nickname}</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-2xl font-black text-kahoot-blue">{Math.round(player.score)}</span>
              {typeof (player as any).correctCount === 'number' && (
                <span className="text-xs font-bold text-kahoot-green uppercase tracking-tighter">
                  {(player as any).correctCount} Correct
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onNext}
        className="kahoot-button bg-white text-kahoot-blue px-12 py-4 rounded-xl font-black text-2xl"
      >
        {isLastQuestion ? 'View Final Results' : 'Next Question'}
      </button>
    </div>
  );
}
