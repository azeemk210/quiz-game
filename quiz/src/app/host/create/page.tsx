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
    question_text: "Question 1. हमारे नबी ﷺ ने पहली बार परदेस का सफ़र किस उम्र में किया?\nہمارے نبی ﷺ نے پہلی بار پردیس کا سفر کس عمر میں کیا؟\nAt what age did our Prophet ﷺ travel abroad for the first time?",
    options: ["12", "9", "8", "25"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. बहीरा कहाँ का रहने वाला था?\nبہیرہ کہاں کا رہنے والا تھا؟\nWhere was Bahera a resident of?",
    options: ["Arab / عرب", "Yemen / یمن", "Syria / سوریہ", "Egypt / مصر"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. हमारे नबी ﷺ ने बकरियां किस उम्र में चराना शुरू कीं?\nہمارے نبی ﷺ نے بکریاں کس عمر میں چرانا شروع کیں؟\nAt what age did our Prophet ﷺ start herding goats?",
    options: ["10", "11", "12", "13"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. बचपन में काबे की दीवार की तामीर के दौरान हमारे नबी ﷺ क्यों बेहोश हुए?\nبچپن میں خانۂ کعبہ کی دیوار کی تعمیر کے دوران ہمارے نبی ﷺ بے ہوش کیوں ہوئے؟\nWhy did our Prophet ﷺ faint during the reconstruction of the wall of the Kaaba in his childhood?",
    options: ["Garmi se / گرمی سے", "Sharm se / شرم سے", "Thakan se / تھکن سے", "Sardi se / سردی سے"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. हमारे नबी ﷺ ने तीर-अंदाज़ी कब सीखी?\nہمارے نبی ﷺ نے تیر اندازی کب سیکھی؟\nAt what age did our Prophet ﷺ learn archery?",
    options: ["Bachpan me / بچپن میں", "Nojawani me / نوجوانی میں", "Shadi ke bad / شادی کے بعد", "Nabuvat ke bad / نبوت کے بعد"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. फ़िजार की जंग के वक़्त हमारे नबी ﷺ की उम्र क्या थी?\nفِجَار کی جنگ کے وقت ہمارے نبی ﷺ کی عمر کیا تھی؟\nHow old was our Prophet ﷺ at the time of the Fijar War?",
    options: ["20", "25", "40", "16"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. अम्मी ख़दीजा से हमारे नबी ﷺ का शजरा किस पुश्त में जाकर मिलता था?\nاُمّ المؤمنین حضرت خدیجہؓ سے ہمارے نبی ﷺ کا شجرۂ نسب کس پشت میں جا کر ملتا تھا؟\nIn which generation did the lineage of our Prophet ﷺ meet that of Umm al-Mu'minin Hazrat Khadijah (RA)?",
    options: ["5", "6", "4", "8"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. अम्मी ख़दीजा के वालिद का क्या नाम था?\nحضرت خدیجہؓ کے والد کا کیا نام تھا؟\nWhat was the name of Hazrat Khadijah's (RA) father?",
    options: ["Abdullah / عبداللہ", "Hajr / ہجر", "Ubaida / عبیدہ", "Khuvailad / خویلد"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. अम्मी ख़दीजा का सामान लेकर हमारे नबी ﷺ किस मुल्क गए?\nحضرت خدیجہؓ کا سامان لے کر ہمارے نبی ﷺ کس ملک گئے تھے؟\nTo which country did our Prophet ﷺ travel with Hazrat Khadijah's (RA) merchandise?",
    options: ["Ethiopia / حبشہ", "Syria / سوریہ", "Iran / ایران", "Palestine / فلسطین"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. शाम (सीरिया) के सफ़र पर हमारे नबी ﷺ को दोबारा किसने पहचाना?\nشام (سوریہ) کے سفر میں ہمارے نبی ﷺ کو دوسری بار کس نے پہچانا؟\nWho recognized our Prophet ﷺ for the second time during the journey to Syria?",
    options: ["Nastoor / نسطور", "Buhera / بہیرہ", "Jarjees / جرجیس", "Kais / قیس"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. अम्मी ख़दीजा का लक़ब क्या था?\nامّی خدیجہؓ کا لقب کیا تھا؟\nWhat was the title (laqab) of Ammi Khadijah (RA)?",
    options: ["Ummul Hind / اُمّ الہند", "Umme Abeeh / اُمِّ ابیہ", "Umme Kulsum / اُمِّ کلثوم", "Tahera / طاہرہ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. अम्मी ख़दीजा की सहेली कौन थीं?\nامّی خدیجہؓ کی سہیلی کون تھیں؟\nWho was the friend of Mother Khadijah (RA)?",
    options: ["Nafeesa / نفیسہ", "Mariyam / مریم", "Asiya / آسیہ", "Fatima / فاطمہ"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. अम्मी ख़दीजा और हमारे नबी ﷺ के निकाह में महर क्या था?\nحضرت خدیجہؓ اور ہمارے نبی ﷺ کے نکاح میں مہر کیا تھا؟\nWhat was the mahr (dower) in the marriage of Ammi Khadijah (RA) and our Prophet Muhammad ﷺ?",
    options: ["40 bakriyan / 40 بکریاں", "152.5 tole chandi / 152.5 تولہ چاندی", "20 camels / 20 اونٹ", "100 Dirham / 100 درہم"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. चार अज़ीम औरतों में से इनमें से कौन नहीं है?\nچار عظیم عورتوں میں سے ان میں سے کون نہیں ہے؟\nWho is not among the four greatest women?",
    options: ["Fatima (RA) / فاطمہؓ", "Khadijah (RA) / خدیجہؓ", "Mariyam (AS) / مریم علیہا السلام", "Hajra (AS) / حاجرہ علیہا السلام"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. अल्लाह ने किनके बारे में कहा कि वह मुझसे ख़ुश है कि नहीं?\nاللہ تعالیٰ نے کن کے بارے میں فرمایا کہ کیا وہ مجھ سے راضی ہے یا نہیں؟\nAbout whom did Allah say, \"Is she pleased with Me or not?\"",
    options: ["Asiya / آسیہ", "Mariyam (AS) / مریم علیہا السلام", "Khadijah (RA) / خدیجہؓ", "Fatima (RA) / فاطمہؓ"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. मैसरा अम्मी ख़दीजा का ग़ुलाम नहीं था।\nمیسرہ امّ المؤمنین حضرت خدیجہؓ کا غلام نہیں تھا؟\nWas Maysarah not the servant of Ammi Khadijah (RA)?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. नस्तूर यहूदी था।\nنَسطور یہودی تھا۔\nWas Nastur a Jew?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. अम्मी ख़दीजा का पैग़ाम लेकर नफ़ीसा गई थीं।\nحضرت خدیجہؓ کا پیغام لے کر نفیسہؓ گئی تھیں۔\nNafisah (RA) went with Ammi Khadijah's (RA) message.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. हमारे नबी ﷺ और अम्मी ख़दीजा के निकाह का ख़ुत्बा हज़रत अबू तालिब ने नहीं दिया था।\nہمارے نبی ﷺ اور امّ المؤمنین حضرت خدیجہؓ کے نکاح کا خطبہ حضرت ابو طالبؓ نے نہیں دیا تھا؟\nDid Abu Talib (RA) not deliver the marriage sermon (khutbah) at the marriage of our Prophet ﷺ and Ammi Khadijah (RA)?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. हमारे नबी ﷺ को अमीन का लक़ब नबूवत के बाद मिला।\nکیا ہمارے نبی ﷺ کو امین کا لقب نبوت کے بعد ملا؟\nDid our Prophet ﷺ receive the title \"Al-Ameen\" after Prophethood?",
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
