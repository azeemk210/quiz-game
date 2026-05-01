'use client';

import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { useState } from 'react';
import { q } from 'framer-motion/client';

export default function CreateHost() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    setLoading(true);
    try {
      // 1. Create a quiz entry
      const { data: quiz, error: quizError } = await supabase
        .from('quizzes')
        .insert({ title: 'Islamic History' })
        .select()
        .single();

      if (quizError) throw quizError;

      // 2. Create all 20 questions with Hindi -> Urdu -> English order
      const questions = [
        {
          quiz_id: quiz.id,
          question_text: "Q.1 वादी-ए-बतहा किस जगह का नाम था?\nوادیِ بطحاء کس جگہ کا نام تھا؟\nWhat place was Wadi-e-Batha the name of?",
          options: ["Yasrab", "Madeena", "Makka", "Taif"],
          correct_answer_index: 2,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.2 हज़रत इब्राहिम (अ.स.) की दूसरी बीवी कौन थीं?\nحضرت ابراہیم علیہ السلام کی دوسری بیوی کون تھیں؟\nWho was the second wife of Hazrat Ibrahim (A.S.)?",
          options: ["Sara", "Hajra", "Samra", "Tuba"],
          correct_answer_index: 1,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.3 हज़रत इब्राहिम (अ.स.) के दूसरे बेटे कौन थे?\nحضرت ابراہیم علیہ السلام کے دوسرے بیٹے کون تھے؟\nWho was the second son of Hazrat Ibrahim (A.S.)?",
          options: ["Ismail (AS)", "Ishaq (AS)", "Yusuf (AS)", "None of these"],
          correct_answer_index: 1, // Ishaq (AS) is the second son
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.4 हज़रत इस्माइल (अ.स.) की शादी किस कबीले में हुई?\nحضرت اسماعیل کی شادی کس قبیلے میں ہوئی؟\nIn which tribe did Hazrat Ismail (AS) get married?",
          options: ["Banu Jurhum", "Banu Asad", "Banu Taim", "Banu Adi"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.5 मक्के में सबसे पहला बुत कौन लाया?\nمکہ میں سب سے پہلا بت کون لایا؟\nWho brought the first idol to Mecca?",
          options: ["Amr bin Madi", "Amr bin Luayy", "Abu Jahal", "Abu Lahab"],
          correct_answer_index: 1,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.6 मक्के में सबसे पहली इमारत किसने बनवाई?\nمکہ میں سب سے پہلی عمارت کس نے بنوائی؟\nWho built the first building in Mecca?",
          options: ["Qusai", "Kab", "Hashim", "Abdul Muttalib"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.7 ज़मज़म के कुएँ को किसने खोदा था?\nزمزم کے کنویں کو کس نے پاٹا تھا\nWho dug the well of Zamzam?",
          options: ["Banu Jarham", "Abraha", "Hassan", "Rakhoon"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.8 खाना-ए-काबा पर पहला हमला किसने किया?\nخانۂ کعبہ پر پہلا حملہ کس نے کیا؟\nWho made the first attack on the Kaaba?",
          options: ["Abraha", "Abu Tahir Qarmati", "Namrood", "Hassan"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.9 हज़रत इस्माइल (अ.स.) के कितने बेटे थे?\nحضرت اسماعیلؑ کے کتنے بیٹے تھے؟\nHow many sons did Hazrat Ismail (AS) have?",
          options: ["12", "2", "1", "7"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {quiz_id: quiz.id,
          question_text: "Q.10 ज़बी-उल्लाह कौन से नबी हैं?\nزبیحُ اللہ کون سے نبی کو کہا جاتا ہے؟\nWhich Prophet is known as “Zabiullah”?",
          options: ["Hazrat Ishaq As", "Hazrat Musa As", "Hazrat Ibrahim As", "Hazrat Ismail As"],
          correct_answer_index: 3,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.11 शीबा असल नाम किनका था?\nشیبہ اصل نام کس کا تھا؟\nWhose real name was Shaiba?",
          options: ["Abdul Muttalib", "Abu Talib", "Hashim", "Abd Manaf"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.12 ज़मज़म की खुदाई अब्दुल मुत्तलिब ने की।\nعبدالمطلب نے زمزم کے کنویں کی کھدائی کی۔\nAbdul Muttalib dug (re-discovered) the well of Zamzam.",
          options: ["True", "False"],
          correct_answer_index: 0,
          time_limit: 20
        },
        
        {
          quiz_id: quiz.id,
          question_text: "Q.13 पहला हज हज़रत इब्राहिम और हज़रत इस्माइल ने किया।\nپہلا حج حضرت ابراہیمؑ اور حضرت اسماعیلؑ نے ادا کیا۔\nThe first Hajj was performed by Hazrat Ibrahim (AS) and Hazrat Ismail (AS).",
          options: ["True", "False"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.14 क्या हज़रत अब्दुल्ला भी ज़बीह कहलाते हैं?\nکیا حضرت عبداللہ کو بھی ذبیح کہا جاتا ہے؟\nIs Hazrat Abdullah also called \"Zabih\"?",
          options: ["True", "False"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.15 क्या हज़रत अब्दुल्ला के बदले 10 ऊंटों की कुर्बानी दी गई?\nکیا حضرت عبداللہ کے بدلے 10 اونٹوں کی قربانی دی گئی؟\nWere 10 camels sacrificed in place of Hazrat Abdullah?",
          options: ["True", "False"],
          correct_answer_index: 1, // Final number was 100 camels
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.16 क्या ज़मज़म की खुदाई में लोहे के हिरन निकले?\nکیا زمزم کی کھدائی کے دوران لوہے کے ہرن نکلے تھے？\nDid iron deer come out during the excavation of Zamzam?",
          options: ["True", "False"],
          correct_answer_index: 1, // They were golden deer
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.17 दारुन्नदवा की तामीर हज़रत हाशिम ने नहीं कराई।\nحضرت ہاشمؒ نے دارالندوہ کی تعمیر نہیں کروائی۔\nHazrat Hashim did not construct Dar al-Nadwa.",
          options: ["True", "False"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.18 मक्का वालों को पक्की इमारतें बनाने का हुक्म कुसाई ने दिया?\nقصی نے مکہ والوں کو پکی عمارتیں بنانے کا حکم دیا۔\nQusai instructed the people of Mecca to build permanent (solid) houses.",
          options: ["True", "False"],
          correct_answer_index: 0,
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.19 जब हज़रत अब्दुल मुत्तलिब ने खुदाई शुरू की तब उनके 10 बेटे थे?\nجب حضرت عبدالمطلب نے کھدائی شروع کی تو اُن کے 10 بیٹے تھے۔\nWhen Hazrat Abdul Muttalib began the excavation, he had 10 sons.",
          options: ["True", "False"],
          correct_answer_index: 1, // He had only 1 son at the time
          time_limit: 20
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.20 हज़रत इस्माइल (अ.स.) रसूल थे?\nحضرت اسماعیلؑ رسول تھے۔\nHazrat Ismail (AS) was a Messenger (Rasool).",
          options: ["True", "False"],
          correct_answer_index: 0,
          time_limit: 20
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