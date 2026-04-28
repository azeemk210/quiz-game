'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { motion } from 'framer-motion';

interface JoinGameProps {
  onJoin: (gameId: string, player: any) => void;
}

export default function JoinGame({ onJoin }: JoinGameProps) {
  const [pin, setPin] = useState('');
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Find game session by PIN (allow joining during LOBBY or IN_PROGRESS)
      const { data: session, error: sessionError } = await supabase
        .from('game_sessions')
        .select('*')
        .eq('pin', pin)
        .in('status', ['LOBBY', 'IN_PROGRESS'])
        .single();

      if (sessionError || !session) {
        throw new Error('Game not found or already started.');
      }

      // Check if nickname is taken in this game
      const { data: existingPlayer } = await supabase
        .from('players')
        .select('*')
        .eq('game_id', session.id)
        .eq('nickname', nickname)
        .maybeSingle();

      if (existingPlayer) {
        // Check if this is the same player re-joining
        const savedSession = sessionStorage.getItem('quiz_session');
        let canRejoin = false;
        if (savedSession) {
          const { player: sPlayer } = JSON.parse(savedSession);
          if (sPlayer.id === existingPlayer.id) {
            canRejoin = true;
          }
        }

        if (canRejoin) {
          // Fetch correct answers count for re-joining player
          const { count } = await supabase
            .from('answers')
            .select('*', { count: 'exact', head: true })
            .eq('player_id', existingPlayer.id)
            .eq('game_id', session.id)
            .eq('is_correct', true);

          onJoin(session.id, { ...existingPlayer, correctCount: count || 0 });
          return;
        } else {
          throw new Error('Nickname already taken by another player.');
        }
      }

      // Join game as new player
      const { data: player, error: joinError } = await supabase
        .from('players')
        .insert({
          game_id: session.id,
          nickname,
          score: 0
        })
        .select()
        .single();

      if (joinError || !player) {
        throw new Error('Failed to join game.');
      }

      onJoin(session.id, { ...player, correctCount: 0 });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="screen-container bg-kahoot-purple p-6 text-white justify-center items-center">
      <motion.h1 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-4xl md:text-8xl font-black italic mb-8 md:mb-12 text-center"
      >
        IslamQuiz
      </motion.h1>

      <form onSubmit={handleJoin} className="w-full max-w-sm space-y-3 md:space-y-4">
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Game PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="w-full p-3 md:p-4 rounded-lg bg-white text-black text-center text-xl md:text-2xl font-bold placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-white/50"
            required
          />
          <input
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="w-full p-3 md:p-4 rounded-lg bg-white text-black text-center text-xl md:text-2xl font-bold placeholder:text-gray-300 focus:outline-none focus:ring-4 focus:ring-white/50"
            required
          />
        </div>

        {error && (
          <div className="bg-kahoot-red/20 border border-kahoot-red p-2 md:p-3 rounded-lg text-center font-bold text-sm md:text-base">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="kahoot-button w-full bg-gray-800 text-white p-3 md:p-4 rounded-lg text-xl md:text-2xl font-black disabled:opacity-50"
        >
          {loading ? 'Joining...' : 'Enter'}
        </button>
      </form>
    </div>
  );
}
