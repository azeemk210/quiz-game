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
    question_text: "Question 1. हज़रत ज़ुबैर (रज़ि॰) के वालिद का क्या नाम था?\nحضرت زبیرؓ کے والد کا کیا نام تھا؟\nWhat was the name of Hazrat Zubair's (RA) father?",
    options: ["Harb / حرب", "Al-Awwam / عوّام", "Waqi / واقع", "Zaki / زکی"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. हज़रत सुफ़यान (रज़ि॰) ने किस उम्र में हिजरत की?\nحضرت سفیانؓ نے کس عمر میں ہجرت کی؟\nAt what age did Hazrat Sufyan (RA) migrate (perform Hijrah)?",
    options: ["60 years / 60 سال", "20 years / 20 سال", "30 years / 30 سال", "50 years / 50 سال"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. इनमें से किसने एक यहूदी को क़त्ल किया?\nان میں سے ایک یہودی کو کس نے قتل کیا؟\nWho killed one of these Jews?",
    options: ["Sumayyah (RA) / سمیہؓ", "Shayma (RA) / شیماءؓ", "Asma (RA) / اسماءؓ", "Safiyyah (RA) / صفیہؓ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. इनमें से हमारे नबी ﷺ की फूफ़ी कौन हैं?\nان میں سے ہمارے نبی ﷺ کی پھوپھی کون ہیں؟\nWhich one of these is our Prophet's ﷺ paternal aunt?",
    options: ["Safiyyah (RA) / صفیہؓ", "Umm Ayman (RA) / اُمِّ ایمنؓ", "Hind (RA) / ہندؓ", "Khadijah (RA) / خدیجہؓ"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. हमारे नबी ﷺ ने कितने अरसे तक दूध पिया?\nہمارے نبی ﷺ نے کتنے عرصے تک دودھ پیا؟\nFor how long was our Prophet ﷺ breastfed?",
    options: ["2 years / 2 سال", "2.5 years / 2.5 سال", "3 years / 3 سال", "5 years / 5 سال"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. हमारे नबी ﷺ दाई हलीमा (रज़ि॰) के पास कितने साल रहे?\nہمارے نبی ﷺ دائی حلیمہؓ کے پاس کتنے سال رہے؟\nFor how many years did our Prophet ﷺ stay with Halima Saadia (RA)?",
    options: ["2 years / 2 سال", "3 years / 3 سال", "4–5 years / 4-5 سال", "6 years / 6 سال"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. हज़रत ज़ुबैर बिन अव्वाम हमारे नबी ﷺ के क्या लगते थे?\nحضرت زبیر بن عوام ہمارے نبی ﷺ کے کیا لگتے تھے؟\nWhat relation did Hazrat Zubair bin al-Awwam have with our Prophet ﷺ?",
    options: ["Khala-zad bhai / خالہ زاد بھائی", "Mamu-zad bhai / مامو زاد بھائی", "Phoophi-zad bhai / پھوپھی زاد بھائی", "Chacha-zad bhai / چچا زاد بھائی"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. बहीरा ने अबू तालिब को किन लोगों से हमारे नबी ﷺ को बचाकर रखने की हिदायत की?\nبہیرہ نے ابو طالب کو کن لوگوں سے ہمارے نبی ﷺ کو بچا کر رکھنے کی ہدایت کی؟\nBahira advised Abu Talib to protect our Prophet ﷺ from which people?",
    options: ["Jews / یہود", "Christians / عیسائی", "Quraysh / قریش", "Persians / فارسی"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. दाई हलीमा से पहले हमारे नबी ﷺ को किसने दूध पिलाया?\nدائی حلیمہ سے پہلے ہمارے نبی ﷺ کو کس نے دودھ پلایا؟\nBefore Halima, who nursed our Prophet ﷺ?",
    options: ["Ruqayyah / رقیہ", "Thuwayba / ثویبہ", "Zikra / ذکرا", "Marrah / مرّہ"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. हमारे नबी ﷺ की कितनी फूफ़ियों ने इस्लाम क़बूल किया?\nہمارے نبی ﷺ کی کتنی پھوپھیوں نے اسلام قبول کیا؟\nHow many of our Prophet's ﷺ paternal aunts accepted Islam?",
    options: ["1 / ۱", "2 / ۲", "4 / ۴", "5 / ۵"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. मक्के में सबसे पहला बुत कौन लाया?\nمکہ میں سب سے پہلا بت کون لایا؟\nWho brought the first idol to Mecca?",
    options: ["Amr bin Madi / عمرو بن مادی", "Amr ibn Luhayy / عمرو بن لُحَی", "Abu Jahl / ابو جہل", "Abu Lahab / ابو لہب"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. हज़रत ज़ुबैर बिन अव्वाम की माँ का क्या नाम था?\nحضرت زبیر بن عوام کی ماں کا کیا نام تھا؟\nWhat was the name of Zubair bin al-Awwam's mother?",
    options: ["Sumayyah (RA) / سمیہؓ", "Asma (RA) / اسماءؓ", "Safiyyah (RA) / صفیہؓ", "Ayman (RA) / ایمنؓ"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. हमारे नबी ﷺ ने पहली बार किस उम्र में शाम (सीरिया) का सफ़र किया?\nہمارے نبی ﷺ نے پہلی بار کس عمر میں شام کا سفر کیا؟\nAt what age did our Prophet ﷺ first travel to Syria (Sham)?",
    options: ["7 years / 7 سال", "8 years / 8 سال", "12 years / 12 سال", "13 years / 13 سال"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. बहीरा कहाँ का रहने वाला था?\nبحیرہ کہاں کا رہنے والا تھا؟\nWhere did Bahira reside?",
    options: ["Madinah / مدینہ", "Yemen / یمن", "Habsha / حبشہ", "Busra / بصرہ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. हज़रत सफ़िया इनमें से किनकी बहन थीं?\nحضرت صفیہ ان میں سے کس کی بہن تھیں؟\nWhose sister was Hazrat Safiyyah among these?",
    options: ["Abu Dujana al-Ansari (RA) / ابو دجانہ انصاریؓ", "Kaʿb bin Malik (RA) / کعب بن مالکؓ", "Abu Bakr (RA) / ابوبکرؓ", "Ameer Hamza (RA) / امیر حمزہؓ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. हज़रत सफ़िया ने यहूदी को किस जंग के दौरान क़त्ल किया?\nحضرت صفیہ نے یہودی کو کس جنگ کے دوران قتل کیا؟\nDuring which battle did Hazrat Safiyyah kill a Jew?",
    options: ["Yarmuk / یرموک", "Tabuk / تبوک", "Khandaq / خندق", "Badr / بدر"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. हमारे नबी ﷺ ने किस जंग में तीर पकड़ाए थे?\nہمارے نبی ﷺ نے کس جنگ میں تیر پکڑائے تھے؟\nIn which battle did our Prophet ﷺ hand out arrows?",
    options: ["Uhud / اُحد", "Badr / بدر", "Mutah / موتہ", "Fijar / فِجار"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. पुरानी किताबों में नबी ﷺ की आमद का ज़िक्र था; आप ﷺ को किसने पहचाना?\nپرانی کتابوں میں نبی ﷺ کی آمد کا ذکر تھا؛ آپ ﷺ کو کس نے پہچانا؟\nThe coming of the Prophet ﷺ was foretold in earlier scriptures; who recognized him?",
    options: ["The Jews / یہود", "Arrafa / عرّافہ", "Abu Talib / ابو طالب", "Bahira / بحیرہ"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. जब हमारे नबी ﷺ के दादा का इंतक़ाल हुआ, तब आप ﷺ की उम्र 9 साल थी।\nجب ہمارے نبی ﷺ کے دادا کا انتقال ہوا تو آپ ﷺ کی عمر 9 سال تھی۔\nWhen our Prophet ﷺ's grandfather passed away, he ﷺ was 9 years old.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. हमारे नबी ﷺ के चाचा अबू तालिब आपके साथ 35 साल रहे।\nہمارے نبی ﷺ کے چچا ابو طالب آپ کے ساتھ 35 سال رہے۔\nOur Prophet ﷺ's uncle Abu Talib stayed with him for 35 years.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
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