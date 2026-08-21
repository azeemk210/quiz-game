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

      // 2. Create quiz questions with Hindi -> Urdu -> English order
const questions = [
  {
    quiz_id: quiz.id,
    question_text: "Question 1. हमारे नबी ﷺ पर नबूवत की शुरुआत किस तरह हुई?\nہمارے نبی ﷺ پر نبوت کی ابتدا کس طرح ہوئی؟\nHow did prophethood begin for our Prophet ﷺ?",
    options: ["Ilham se / الہام سے", "Vahi se / وحی سے", "Sachche Khuvab se / سچے خواب سے", "Khayal se / خیال سے"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. हमारे नबी ﷺ ने अपनी कैफ़ियत सबसे पहले किनसे ज़ाहिर की?\nہمارے نبی ﷺ نے اپنی کیفیت سب سے پہلے کن سے ظاہر کی؟\nTo whom did our Prophet ﷺ first disclose his condition?",
    options: ["Abu Talib se / ابو طالب سے", "Hazrat Abu Bakr (RA) se / حضرت ابوبکرؓ سے", "Ammi Ayesha (RA) se / امی عائشہؓ سے", "Ammi Khadijah (RA) se / امی خدیجہؓ سے"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. सबसे पहले वही किस महीने में आई?\nسب سے پہلے وحی کس مہینے میں آئی؟\nIn which month did the first revelation come?",
    options: ["Ramzan me / رمضان میں", "Moharram me / محرم میں", "Shaban me / شعبان میں", "Rajab me / رجب میں"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. दुनिया में फ़िलहाल किस फ़रिश्ते का काम ख़त्म हो चुका है?\nدنیا میں فی الحال کس فرشتے کا کام ختم ہو چکا ہے؟\nWhich angel's duty in the world has been completed so far?",
    options: ["Mekail (AS) / میکائیل علیہ السلام", "Jibreel (AS) / جبرئیل علیہ السلام", "Israfeel (AS) / اسرافیل علیہ السلام", "Izrail (AS) / عزرائیل علیہ السلام"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. हमारे नबी ﷺ को सबसे पहले नबूवत की मुबारकबाद किसने दी?\nہمارے نبی ﷺ کو سب سے پہلے نبوت کی مبارک باد کس نے دی؟\nWho was the first person to congratulate our Prophet ﷺ on his Prophethood?",
    options: ["Ammi Ayesha (RA) / امی عائشہؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Ammi Khadijah (RA) / امی خدیجہؓ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. सबसे पहले ईमान किसने क़ुबूल किया?\nسب سے پہلے ایمان کس نے قبول کیا؟\nWho accepted Islam first?",
    options: ["Ammi Khadijah (RA) / امی خدیجہؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Zaid bin Haris (RA) / زید بن حارثؓ"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. क़ुरैश की तरफ़ से होने वाले ज़ुल्मो-सितम की पेशेनगोई किसने की?\nقریش کی طرف سے ہونے والے ظلم و ستم کی پیشگوئی کس نے کی؟\nWho foretold the persecution and oppression that would be inflicted by the Quraysh?",
    options: ["Usman bin Haris / عثمان بن حارث", "Ubaid bin Jhash / عبید بن جحش", "Varka bin Nofil / ورقہ بن نوفل", "Zaid bin Nofil / زید بن نوفل"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. वही कितनी दफ़ा रुकी?\nوحی کتنی دفعہ رکی؟\nHow many times did the revelation stop?",
    options: ["2", "1", "3", "5"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. हज़रत अली (रज़ि॰) ने किस उम्र में इस्लाम क़ुबूल किया?\nحضرت علیؓ نے کس عمر میں اسلام قبول کیا؟\nAt what age did Hazrat Ali (RA) accept Islam?",
    options: ["8-9", "9-10", "10-11", "7-8"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. हज़रत अली (रज़ि॰) के साथ किसने इस्लाम क़ुबूल किया?\nحضرت علیؓ کے ساتھ کس نے اسلام قبول کیا؟\nWho accepted Islam along with Hazrat Ali (RA)?",
    options: ["Zaid bin Haris (RA) / زید بن حارثؓ", "Abu Talib / ابو طالب", "Abu Bakr (RA) / ابوبکرؓ", "Jafar / جعفر"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. अशरा-ए-मुबश्शरा में कितने सहाबा (रज़ि॰) हैं?\nعشرۂ مبشرہ میں کتنے صحابہؓ ہیں؟\nHow many Companions (Sahaba) are there in Ashara-e-Mubashshara?",
    options: ["9", "8", "11", "10"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. हज़रत जाफ़र (रज़ि॰) की परवरिश किसने की?\nحضرت جعفرؓ کی پرورش کس نے کی؟\nWho brought up Hazrat Ja'far (RA)?",
    options: ["Janab Abu Talib / جنابِ ابو طالب", "Hazrat Hamza (RA) / حضرت حمزہؓ", "Nabi ﷺ / نبی ﷺ", "Hazrat Abbas (RA) / حضرت عباسؓ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. हज़रत उस्मान (रज़ि॰) किस क़बीले से ताल्लुक रखते थे?\nحضرت عثمانؓ کس قبیلے سے تعلق رکھتے تھے؟\nWhich tribe did Hazrat Usman (RA) belong to?",
    options: ["Banu Umayya / بنو امیہ", "Taim / تیم", "Adi / عدی", "Banu / بنو"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. क्या साबिक़ूनल अव्वलीन में हिजरत के बाद के सहाबा (रज़ि॰) आते हैं?\nکیا سابقون الاوّلین میں ہجرت کے بعد کے صحابہؓ بھی آتے ہیں؟\nAre the Companions (RA) who accepted Islam after the Hijrah also included among the Sabiqunal Awwaleen?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. क्या साबिक़ूनल अव्वलीन की तादाद 10 है?\nکیا سابقون الاوّلین کی تعداد 10 ہے؟\nAre there 10 Sabiqunal Awwaleen?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
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
