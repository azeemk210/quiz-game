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
    question_text: "Question 1. हज़रत अबू ज़ुऐब की बेटी कौन थीं?\nحضرت ابو زُوَیب کی بیٹی کون تھیں؟\nWho was the daughter of Abu Zu'aib?",
    options: ["Shaima / شیماء", "Halima / حلیمہ", "Hinda / ہندہ", "Sara / سارہ"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. हमारे नबी ﷺ दाई हलीमा के पास कितने साल रहे?\nہمارے نبی ﷺ دائی حلیمہ کے پاس کتنے سال رہے؟\nHow many years did our Prophet ﷺ stay with Halima Saadia?",
    options: ["5 years / 5 سال", "2 years / 2 سال", "3 years / 3 سال", "2.5 years / 2.5 سال"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. हमारे नबी ﷺ पहली बार मदीना किस उम्र में गए?\nہمارے نبی ﷺ پہلی بار مدینہ کس عمر میں گئے؟\nAt what age did our Prophet ﷺ go to Madinah for the first time?",
    options: ["6 years / 6 سال", "5 years / 5 سال", "8 years / 8 سال", "7 years / 7 سال"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. हमारे नबी ﷺ के दादा की ननिहाल किस ख़ानदान में थी?\nہمارے نبی ﷺ کے دادا کی ننھیال کس خاندان میں تھی؟\nWhich family did the maternal relatives of our Prophet ﷺ's grandfather belong to?",
    options: ["Banu Adi / بنو عدی", "Banu Abde Shams / بنو عبد شمس", "Banu Abde Manaf / بنو عبد مناف", "Banu Najjar / بنو نجار"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. हज़रत सुमैय्या रज़ि0 कहां की रहने वाली थीं?\nحضرت سمیہ رضی اللہ عنہا کہاں کی رہنے والی تھیں؟\nWhere was Hazrat Sumayyah (RA) from?",
    options: ["Ethiopia / حبشہ", "Egypt / مصر", "Iraq / عراق", "Sham / شام"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. हज़रत आमना का इंतकाल कहां हुआ?\nحضرت آمنہ رضی اللہ عنہا کا انتقال کہاں ہوا؟\nWhere did Aminah bint Wahb pass away?",
    options: ["Huzaifa / حذیفہ", "Saffa / صفا", "Abwa / ابواء", "Hudaibiya / حدیبیہ"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. हज़रत सुमैय्या किस उम्र में शहीद हुईं?\nحضرت سمیہ رضی اللہ عنہا کس عمر میں شہید ہوئیں؟\nAt what age was Hazrat Sumayyah (RA) martyred?",
    options: ["70 years / 70 سال", "50 years / 50 سال", "63 years / 63 سال", "60 years / 60 سال"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. हज़रत अम्मार किस क़बीले के ग़ुलाम थे?\nحضرت عمار رضی اللہ عنہ کس قبیلے کے غلام تھے؟\nWhich tribe was Hazrat Ammar (RA) a slave of?",
    options: ["Banu Makhzoom / بنو مخزوم", "Banu Adi / بنو عدی", "Banu Kinana / بنو کنانہ", "Banu Khazraj / بنو خزرج"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. इस्लाम में सबसे पहले शहादत किसको मिली?\nاسلام میں سب سے پہلے شہادت کس کو ملی؟\nWho was the first martyr in Islam?",
    options: ["एक लड़की / ایک لڑکی", "एक बच्ची / ایک بچی", "एक बुज़ुर्ग औरत / ایک بزرگ عورت", "एक जवान औरत / ایک جوان عورت"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. अबू जहल के बुतों को कौन कोसती थीं?\nابو جہل کے بتوں کو کون برا بھلا کہتی تھیں؟\nWho used to condemn Abu Jahl's idols?",
    options: ["Hazrat Sumayyah (RA) / حضرت سمیہؓ", "Hazrat Aisha (RA) / حضرت عائشہؓ", "Hazrat Safiyah (RA) / حضرت صفیہؓ", "Hazrat Shaima / حضرت شیماء"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. हज़रत आमना के इंतकाल के बाद हमारे नबी ﷺ को मदीने से उम्मे ऐमन लेकर आईं।\nحضرت آمنہ کے انتقال کے بعد ہمارے نبی ﷺ کو مدینے سے اُمِّ ایمن لے کر آئیں۔\nAfter the demise of Aminah bint Wahb, our Prophet ﷺ was brought back from Madinah by Umm Ayman.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. हज़रत सुमैय्या को अबू जहल ने तलवार से शहीद कर दिया था।\nحضرت سمیہ رضی اللہ عنہا کو ابو جہل نے تلوار سے شہید کر دیا تھا۔\nHazrat Sumayyah (RA) was martyred by Abu Jahl with a sword.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. दाई हलीमा की बेटी का नाम शैमा नहीं था।\nدائی حلیمہ کی بیٹی کا نام شیماء نہیں تھا۔\nThe name of Daai Halima's daughter was not Shaima.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. हज़रत सुमैय्या हमारे नबी ﷺ की पैदाइश से 20 साल पहले पैदा हुई थीं।\nحضرت سمیہ رضی اللہ عنہا ہمارے نبی ﷺ کی پیدائش سے 20 سال پہلے پیدا ہوئی تھیں۔\nHazrat Sumayyah (RA) was born 20 years before the birth of our Prophet ﷺ.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. हज़रत यासिर हज़रत सुमैय्या के शौहर नहीं हैं।\nحضرت یاسر، حضرت سمیہ رضی اللہ عنہا کے شوہر نہیں ہیں۔\nHazrat Yasir is not the husband of Hazrat Sumayyah (RA).",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. जब हमारे नबी ﷺ के दादा का इंतकाल हुआ, तब आप ﷺ 8 साल के थे।\nجب ہمارے نبی ﷺ کے دادا کا انتقال ہوا، تب آپ ﷺ کی عمر 8 سال تھی۔\nWhen our Prophet ﷺ's grandfather passed away, he ﷺ was 8 years old.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. हज़रत यासिर यमन के रहने वाले थे।\nحضرت یاسر یمن کے رہنے والے تھے۔\nHazrat Yasir was from Yemen.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. हज़रत यासिर मक्का बिज़नेस के लिए आए थे।\nحضرت یاسر مکہ تجارت کے لیے آئے تھے۔\nHazrat Yasir came to Makkah for business.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. जब हमारे नबी ﷺ 9 साल के थे, तब उनके चाचा का इंतकाल हो गया।\nجب ہمارے نبی ﷺ 9 سال کے تھے، تب اُن کے چچا کا انتقال ہو گیا۔\nWhen our Prophet ﷺ was 9 years old, his uncle passed away.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. हज़रत सुमैय्या रज़ि0 के बेटे का नाम अम्मार था।\nحضرت سمیہ رضی اللہ عنہا کے بیٹے کا نام عمار تھا۔\nThe name of Hazrat Sumayyah (RA)'s son was Ammar.",
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