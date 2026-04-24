'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Player } from '@/types/game';
import { Users, Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface LobbyProps {
  pin: string;
  gameId: string;
  onStart: () => void;
}

export default function Lobby({ pin, gameId, onStart }: LobbyProps) {
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    // Initial fetch
    const fetchPlayers = async () => {
      const { data } = await supabase
        .from('players')
        .select('*')
        .eq('game_id', gameId);
      if (data) setPlayers(data);
    };

    fetchPlayers();

    // Realtime subscription for new players
    const channel = supabase
      .channel(`lobby-${gameId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'players',
          filter: `game_id=eq.${gameId}`,
        },
        (payload) => {
          console.log('New player detected via Realtime:', payload.new);
          setPlayers((prev) => [...prev, payload.new as Player]);
        }
      )
      .subscribe((status) => {
        console.log(`Realtime subscription status for lobby: ${status}`);
        if (status === 'CHANNEL_ERROR') {
          console.error('Realtime subscription failed. Check if Realtime is enabled in Supabase.');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, [gameId]);

  return (
    <div className="screen-container bg-kahoot-purple p-4 md:p-8 text-white">
      <motion.div 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-center mb-4 md:mb-12 flex-none"
      >
        <h1 className="text-xl md:text-4xl font-bold mb-2 md:mb-4">Join at <span className="underline">www.islamquiz.it</span></h1>
        <div className="bg-white text-black text-3xl md:text-6xl font-black py-2 md:py-4 px-6 md:px-12 rounded-xl shadow-2xl inline-block">
          {pin}
        </div>
      </motion.div>

      <div className="flex-1 w-full max-w-4xl mx-auto glass-card p-4 md:p-8 flex flex-col items-center overflow-hidden">
        <div className="flex items-center justify-between w-full mb-4 md:mb-8 flex-none">
          <div className="flex items-center gap-2 text-xl md:text-2xl font-bold">
            <Users size={24} className="md:w-8 md:h-8" />
            <span>{players.length} Players</span>
          </div>
          
          <button
            onClick={onStart}
            disabled={players.length === 0}
            className="kahoot-button bg-kahoot-green px-4 md:px-8 py-2 md:py-3 rounded-lg font-bold text-lg md:text-xl flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Play fill="white" size={20} className="md:w-6 md:h-6" />
            Start
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-4 w-full overflow-y-auto pr-2 custom-scrollbar">
          {players.map((player, idx) => (
            <motion.div
              key={player.id}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white/20 p-2 md:p-4 rounded-lg text-center font-bold text-sm md:text-xl truncate"
            >
              {player.nickname}
            </motion.div>
          ))}
          {players.length === 0 && (
            <div className="col-span-full text-center text-white/50 animate-pulse-soft text-lg md:text-xl py-12">
              Waiting for players...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
