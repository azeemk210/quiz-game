'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';

export default function CreateHost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    setLoading(true);
    try {
      // 1. Create a dummy quiz
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({ title: 'Islamic History 101' })
        .select()
        .single();

      if (quizError) throw quizError;

      // 2. Create only the first 5 questions for testing
      const questions = [
        {
          quiz_id: quiz.id,
          question_text: "Q.1 After hazrat Umar RZ became the caliph, who came to him for help?\nحضرت عمر رضی اللہ عنہ کے خلیفہ بننے کے بعد ان کے پاس کون مدد کے لیے آیا؟\nहज़रत उमर रज़ियल्लाहु अनहु के खलीफ़ा बनने के बाद, कौन-कौन उनसे मदद मांगने आया?",
          options: ["Hazrat Ali RZ", "Hazrat Musna bin Harisa", "Hazrat Usman RZ", "None of these"],
          correct_answer_index: 1,
          time_limit: 3
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.2 Which Caliph terminated Hazrat Khalid bin Waleed from the post of Commander in chief?\nکس خلیفہ نے حضرت خالد بن ولید کو کمانڈر انچیف کے عہدے سے ہٹا کر حضرت ابو عبید کو نیا کمانڈر ان چیف مقرر کیا؟\nकिस खलीफा ने हजरत खालिद बिन वलीद को सिपाह सालार के पद से हटाकर हजरत अबू उबैद को नया सिपाह सालार मुकर्रर किया?",
          options: ["Hazrat Ali RZ ne", "Hazrat Abu Bakr RZ ne", "Hazrat Umar RZ ne", "Hazrat Muawiya RZ ne"],
          correct_answer_index: 2,
          time_limit: 10
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.3 Who was the first Caliph to be called Ameerul Mumineen?\nامیر المومنین کہلانے والا پہلا خلیفہ کون تھا؟\nपहले खलीफा कौन थे जिन्हें अमीरुल मुमिनीन कहा गया?",
          options: ["Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Hazrat Usman RZ", "Hazrat Hassan RZ"],
          correct_answer_index: 1,
          time_limit: 10
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.4 How many Hadith are narrated by Hazrat Umar RZ?\nحضرت عمر رضی اللہ عنہ سے کتنی احادیث مروی ہیں؟\nहज़रत उमर रज़ियल्लाहु अन्हु से कितनी हदीस मरवी है?",
          options: ["100", "365", "539", "421"],
          correct_answer_index: 2,
          time_limit: 10
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.5 When was the Bai'at taken to make Hazrat Umar RZ the caliph?\nحضرت عمر رضی اللہ عنہ کو خلیفہ بنانے کے لیے بیعت کب لی گئی؟\nहज़रत उमर रज़ियल्लाहु अनहु को खलीफ़ा बनाने के लिए बैअत कब ली गई थी?",
          options: ["23 jamadi us sani (13h)", "12 rabiul awwal (14h)", "24 ramzan (13 h)", "11 safar (14h)"],
          correct_answer_index: 0,
          time_limit: 10
        }
      ];

      await supabase.from('questions').insert(questions);

      // 3. Create game session
      const pin = Math.floor(100000 + Math.random() * 900000).toString();
      const { data: session, error: sessionError } = await supabase
        .from('game_sessions')
        .insert({
          quiz_id: quiz.id,
          pin,
          status: 'LOBBY'
        })
        .select()
        .single();

      if (sessionError) throw sessionError;

      router.push(`/host/${session.id}`);
    } catch (err) {
      alert('Error creating game: ' + (err as any).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-kahoot-purple text-white p-6">
      <h1 className="text-4xl font-bold mb-8">Ready to Host?</h1>
      <button
        onClick={createGame}
        disabled={loading}
        className="kahoot-button bg-kahoot-green px-12 py-6 rounded-2xl text-3xl font-black disabled:opacity-50"
      >
        {loading ? 'Setting up...' : 'Create New Session'}
      </button>
    </div>
  );
}
