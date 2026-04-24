'use client';

import { Player } from '@/types/game';
import { motion } from 'framer-motion';
import { Trophy, PartyPopper } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';

interface PodiumProps {
  players: Player[];
  showHomeButton?: boolean;
}

export default function Podium({ players, showHomeButton = true }: PodiumProps) {
  const sorted = [...players].sort((a, b) => b.score - a.score).slice(0, 3);
  
  useEffect(() => {
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  const positions = [1, 0, 2]; // Index mapping for 2nd, 1st, 3rd

  return (
    <div className="bg-kahoot-purple p-4 md:p-8 text-white overflow-hidden flex flex-col items-center">
      <motion.div 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 md:gap-4 mb-8 md:mb-20"
      >
        <PartyPopper size={32} className="text-kahoot-yellow md:w-16 md:h-16" />
        <h1 className="text-4xl md:text-8xl font-black italic tracking-tighter">PODIUM</h1>
        <PartyPopper size={32} className="text-kahoot-yellow md:w-16 md:h-16" />
      </motion.div>

      <div className="flex items-end justify-center gap-2 md:gap-4 w-full max-w-5xl h-[40vh] md:h-[500px]">
        {positions.map((posIndex, idx) => {
          const player = sorted[posIndex];
          if (!player) return <div key={idx} className="flex-1" />;

          const heights = ['h-[70%]', 'h-[100%]', 'h-[50%]'];
          const delay = [0.5, 0, 1];
          const labels = ['1st', '2nd', '3rd'];

          return (
            <motion.div
              key={player.id}
              initial={{ y: 500 }}
              animate={{ y: 0 }}
              transition={{ delay: delay[idx], type: 'spring', stiffness: 50 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="mb-2 md:mb-4 text-center">
                <div className="text-sm md:text-3xl font-black truncate max-w-[80px] md:max-w-none">{player.nickname}</div>
                <div className="text-xs md:text-xl font-bold opacity-80">{Math.round(player.score)}</div>
              </div>
              
              <div className={`${heights[idx]} ${posIndex === 0 ? 'bg-kahoot-yellow' : posIndex === 1 ? 'bg-gray-400' : 'bg-orange-600'} w-full rounded-t-2xl shadow-2xl flex flex-col items-center pt-4 md:pt-8 border-x-2 md:border-x-4 border-t-2 md:border-t-4 border-white/20`}>
                 <div className="text-2xl md:text-6xl font-black text-white/50">{labels[posIndex]}</div>
                 {posIndex === 0 && <Trophy className="mt-2 md:mt-8 text-white animate-bounce w-8 h-8 md:w-20 md:h-20" />}
              </div>
            </motion.div>
          );
        })}
      </div>
      
      {showHomeButton && (
        <button 
          onClick={() => window.location.href = '/'}
          className="mt-12 kahoot-button bg-white text-kahoot-purple px-12 py-4 rounded-xl font-black text-2xl"
        >
          Back to Home
        </button>
      )}
    </div>
  );
}
