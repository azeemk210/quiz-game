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
    question_text: "Question 1. हमारे नबी ﷺ से पहले कितने लोगों ने तौहीद का पैगाम दिया?\nہمارے نبی ﷺ سے پہلے کتنے لوگوں نے توحید کا پیغام دیا؟\nBefore our Prophet ﷺ, how many people preached the message of Tawheed?",
    options: ["6", "4", "2", "5"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. बुहेरा ने अबू तालिब को किन लोगों से हमारे नबी ﷺ को बचाकर रखने की हिदायत की?\nبہیرہ نے ابو طالب کو کن لوگوں سے ہمارے نبی ﷺ کو بچا کر رکھنے کی ہدایت کی؟\nBuhayrah advised Abu Talib to protect our Prophet ﷺ from which people?",
    options: ["Jews / یہودی", "Christians / عیسائی", "Quraysh / قریش", "Persians / فارسی"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. हमारे नबी ﷺ ने तिजारत किनके साथ शुरू की?\nہمارے نبی ﷺ نے تجارت کن کے ساتھ شروع کی؟\nWith whom did our Prophet ﷺ start trade?",
    options: ["Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Umar (RA) / حضرت عمرؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Ammi Khadijah (RA) / امی خدیجہؓ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. दाई हलीमा से पहले हमारे नबी ﷺ को किसने दूध पिलाया?\nدائی حلیمہ سے پہلے ہمارے نبی ﷺ کو کس نے دودھ پلایا؟\nBefore Halima, who nursed our Prophet ﷺ?",
    options: ["Rubaida / زیبہ", "Suvaiba / صہیب", "Zikra / ذکرا", "Marrah / مرراح"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. सुमैय्या (रज़ि॰) किस क़बीले की क़ैद में थीं?\nسُمَیّہ رَضِیَ اللہُ عَنْہَا کس قبیلے کی قید میں تھیں؟\nSumayyah (RA) was in the captivity of which tribe?",
    options: ["Bani Asad / بنی اسد", "Bani Jarham / بنی جرم", "Bani Makhzoom / بنی مخصوم", "Bani Asad / بنی اسد"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. बहीरा कहाँ का रहने वाला था?\nبہیرہ کہاں کا رہنے والا تھا؟\nWhere was Bahera a resident of?",
    options: ["Madinah / مدینہ", "Yemen / یمن", "Habsha / حبشہ", "Basra / بصرہ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. हज़रत सफ़िया इनमें से किनकी बहन थीं?\nحضرت صفیہ ان میں سے کس کی بہن تھیں؟\nWhose sister was Hazrat Safiyyah among these?",
    options: ["Abu Dujana al-Ansari (RA) / ابو دجانہ انصاریؓ", "Kaʿb bin Malik (RA) / کعب بن مالکؓ", "Abu Bakr (RA) / ابوبکرؓ", "Ameer Hamza (RA) / امیر حمزہؓ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. इनमें से कौन से नबी हज़रत इस्माइल (अ॰) की औलाद हैं?\nان میں سے کون سے نبی حضرت اسماعیل علیہ السلام کی اولاد میں سے ہیں؟\nWhich of these prophets are descendants of Hazrat Ismail (AS)?",
    options: ["Isa (AS) / عیسیٰ علیہ السلام", "Musa (AS) / موسیٰ علیہ السلام", "Yusuf (AS) / یوسف علیہ السلام", "Muhammad ﷺ / محمد ﷺ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. कौन से नबी हज़रत इब्राहीम (अ॰) से मुशाबहत रखते हैं?\nکون سے نبی حضرت ابراہیمؑ سے مشابہت رکھتے ہیں؟\nWhich prophet resembles Hazrat Ibrahim (AS)?",
    options: ["Adam (AS) / آدم علیہ السلام", "Lut (AS) / لوط علیہ السلام", "Yunus (AS) / یونس علیہ السلام", "Muhammad ﷺ / محمد ﷺ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. इनमें से हमारे नबी ﷺ की रज़ाई बहन कौन हैं?\nان میں سے ہمارے نبی ﷺ کی رضاعی بہن کون ہیں؟\nAmong these, who is the foster sister of our Prophet ﷺ?",
    options: ["Hinda (RA) / ہندہؓ", "Safiya (RA) / صفیہؓ", "Shaima (RA) / شیماءؓ", "Shaima (RA) / شیماءؓ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. नफ़ीस किनकी सहेली थीं?\nنفیس کس کی سہیلی تھی؟\nNafees was a friend of whom?",
    options: ["Bibi Fatima (RA) / بی بی فاطمہؓ", "Bibi Ruqayyah (RA) / بی بی رقیہؓ", "Ammi Ayesha (RA) / امی عائشہؓ", "Ammi Khadijah (RA) / امی خدیجہؓ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. अबू ज़ुऐब की बेटी कौन थीं?\nابو زُویب کی بیٹی کون تھی؟\nWho was the daughter of Abu Zu'aib?",
    options: ["Halima (RA) / حلیمہؓ", "Shayma (RA) / شیماءؓ", "Umm Hani (RA) / اُمِّ ہانیؓ", "Mariya (RA) / ماریہؓ"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. हमारे नबी ﷺ ने पहली बार शाम (सीरिया) का सफ़र किस उम्र में किया?\nہمارے نبی ﷺ نے پہلی بار شام (سوریہ) کا سفر کس عمر میں کیا؟\nAt what age did our Prophet ﷺ travel to Syria for the first time?",
    options: ["12 years / 12 سال", "8 years / 8 سال", "5 years / 5 سال", "25 years / 25 سال"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. हमारे नबी ﷺ 12 साल की उम्र में बकरियां चराने लगे थे।\nکیا ہمارے نبی ﷺ 12 سال کی عمر میں بکریاں چرانا شروع کر دی تھیں؟\nDid our Prophet ﷺ start herding goats at the age of 12?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. अरब में हुरमत वाले 5 महीने थे।\nعرب میں حرمت والے 5 مہینے تھے۔\nThere were five sacred months in Arabia.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. हिल्फ़ुलफ़ज़ूल के वक़्त हमारे नबी ﷺ की उम्र 16 साल थी।\nکیا حلفُ الفضول کے وقت ہمارے نبی ﷺ کی عمر 16 سال تھی؟\nWas our Prophet ﷺ 16 years old at the time of Hilf al-Fudul?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. हमारे नबी ﷺ ने 25 साल की उम्र में तिजारत शुरू की।\nکیا ہمارے نبی ﷺ نے 25 سال کی عمر میں تجارت شروع کی؟\nDid our Prophet ﷺ start trading at the age of 25?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. हमारे नबी ﷺ ने 25 साल की उम्र में हज़रत अबू तालिब के साथ तिजारत शुरू की।\nکیا ہمارے نبی ﷺ نے 25 سال کی عمر میں حضرت ابو طالبؓ کے ساتھ تجارت شروع کی؟\nDid our Prophet ﷺ start trading with Abu Talib at the age of 25?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. नस्तूर हमारे नबी ﷺ को पहचान गया था।\nکیا نسطور ہمارے نبی ﷺ کو پہچان گیا تھا؟\nDid Nastur recognize our Prophet ﷺ?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. हज़रत अबू तालिब ने हमारे नबी ﷺ को तिजारत का मशवरा दिया था।\nکیا حضرت ابو طالبؓ نے ہمارے نبی ﷺ کو تجارت کا مشورہ دیا تھا؟\nDid Abu Talib advise our Prophet ﷺ to engage in trade?",
    options: ["True / सही", "False / ग़लत"],
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