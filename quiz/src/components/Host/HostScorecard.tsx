'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Player } from '@/types/game';

interface DetailedPlayer extends Player {
  correct_count: number;
  total_answers: number;
}

export default function HostScorecard({ gameId, players }: { gameId: string; players: Player[] }) {
  const [detailedData, setDetailedData] = useState<DetailedPlayer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      // Fetch all answers for this game
      const { data: answers, error } = await supabase
        .from('answers')
        .select('player_id, is_correct')
        .eq('game_id', gameId);

      if (answers && !error) {
        const stats = players.map(p => {
          const playerAnswers = answers.filter(a => a.player_id === p.id);
          return {
            ...p,
            correct_count: playerAnswers.filter(a => a.is_correct).length,
            total_answers: playerAnswers.length
          };
        });
        
        // Sort by score
        setDetailedData(stats.sort((a, b) => b.score - a.score));
      }
      setLoading(false);
    };

    fetchDetails();
  }, [gameId, players]);

  if (loading) return <div className="p-10 text-center text-white text-2xl font-bold animate-pulse">Loading detailed results...</div>;

  return (
    <div className="w-full max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden mt-8">
      <div className="bg-kahoot-purple p-6">
        <h2 className="text-3xl font-black text-white text-center uppercase tracking-wider">Final Game Report</h2>
      </div>
      
      <div className="overflow-x-auto p-4 md:p-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-4 border-gray-100">
              <th className="py-4 px-6 text-kahoot-purple font-black uppercase tracking-tighter">Rank</th>
              <th className="py-4 px-6 text-kahoot-purple font-black uppercase tracking-tighter">Player</th>
              <th className="py-4 px-6 text-kahoot-purple font-black uppercase tracking-tighter text-center">Correct Answers</th>
              <th className="py-4 px-6 text-kahoot-purple font-black uppercase tracking-tighter text-center">Accuracy</th>
              <th className="py-4 px-6 text-kahoot-purple font-black uppercase tracking-tighter text-right">Final Score</th>
            </tr>
          </thead>
          <tbody>
            {detailedData.map((player, idx) => (
              <tr key={player.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-6 font-black text-gray-400">#{idx + 1}</td>
                <td className="py-4 px-6 font-bold text-gray-800 text-lg">{player.nickname}</td>
                <td className="py-4 px-6 text-center font-bold text-gray-600">
                  <span className="text-green-600">{player.correct_count}</span> / {player.total_answers || 0}
                </td>
                <td className="py-4 px-6 text-center">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-kahoot-green" 
                        style={{ width: `${player.total_answers > 0 ? (player.correct_count / player.total_answers) * 100 : 0}%` }}
                      />
                    </div>
                    <span className="text-sm font-black text-gray-400">
                      {player.total_answers > 0 ? Math.round((player.correct_count / player.total_answers) * 100) : 0}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-6 text-right">
                  <span className="text-2xl font-black text-kahoot-purple">{Math.round(player.score)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-4 text-center">
        <p className="text-gray-400 font-bold text-sm uppercase">End of Report</p>
      </div>
    </div>
  );
}
