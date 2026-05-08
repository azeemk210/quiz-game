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
    question_text: "Question 1. ज़माना-ए-जाहिलियत में एक सफ़ेद ऊंट की कीमत क्या थी?\nزمانہ جاہلیت میں ایک سفید اونٹ کی قیمت کیا تھی؟\nWhat was the price of a white camel during the Age of Ignorance (Jahiliyyah)?",
    options: ["1 Bora Anaj / ایک بوری اناج", "1 Aurat / ایک عورت", "5 horses / پانچ گھوڑے", "2 Aurtein / دو عورتیں"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. हमारे नबी ﷺ किस दिन पैदा हुए?\nہمارے نبی ﷺ کس دن پیدا ہوئے؟\nOn which day was our Prophet ﷺ born?",
    options: ["Sunday / اتوار", "Friday / جمعہ", "Saturday / ہفتہ", "Monday / پیر"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. दाई हलीमा किस क़बीले से ताल्लुक रखती थीं?\nدائی حلیمہ کس قبیلے سے تعلق رکھتی تھیں؟\nWhich tribe did Halima (the wet nurse) belong to?",
    options: ["Banu Sa'd / بنو سعد", "Banu Jurhum / بنو جرہم", "Taghlib / تغلب", "Banu Najjar / بنو نجار"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. हज़रत हलीमा सादिया के वालिद का क्या नाम था?\nحضرت حلیمہ سعدیہ کے والد کا کیا نام تھا؟\nWhat was the name of Hazrat Halima Saadia's father?",
    options: ["Abu Zaid", "Abu Zuhaib", "Abu Amir", "Abu Nashar"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. हमारे नबी ﷺ किस साल पैदा हुए?\nہمارے نبی ﷺ کس سال پیدا ہوئے؟\nIn which year was our Prophet ﷺ born?",
    options: ["1 Amul Feel", "2 Amul Feel", "10 Amul Feel", "7 Amul Feel"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. हज़रत अब्दुल्लाह की जगह कितने ऊंटों की क़ुर्बानी दी गई?\nحضرت عبداللہ کی جگہ کتنے اونٹوں کی قربانی دی گئی؟\nHow many camels were sacrificed in place of Hazrat Abdullah?",
    options: ["70", "10", "100", "7"],
    correct_answer_index: 2,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. इनमें से कौन सा क़बीला हमारे नबी ﷺ की ननिहाल है?\nان میں سے کون سا قبیلہ ہمارے نبی ﷺ کا ننھیال ہے؟\nWhich of these tribes is the maternal family tribe of our Prophet ﷺ?",
    options: ["Banu Zahra", "Banu Asad", "Banu Hashim", "Banu Adi"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. अब्राहा ने अल-क़ुलीस (गिरजाघर) कहाँ बनवाया था?\nابرہہ نے القلیس (کلیسہ) کہاں بنوایا تھا؟\nWhere did Abraha build the Al-Qullays (Church)?",
    options: ["Aden", "Syria", "Yathrib", "Yemen"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. हज़रत अब्दुल मुत्तलिब की कितनी बेटियाँ थीं?\nحضرت عبدالمطلب کی کتنی بیٹیاں تھیں؟\nHow many daughters did Hazrat Abdul Muttalib have?",
    options: ["1", "4", "3", "6"],
    correct_answer_index: 3,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10: हज़रत अब्दुल्लाह की बांदी का नाम क्या था?\nحضرت عبداللہ کی باندی کا نام کیا تھا؟\nWhat was the name of Hazrat Abdullah’s maidservant?",
    options: ["Umme Aiman", "Umme Salma", "Umme Kulsum", "Umme Hani"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. क्या अब्राहा ने काबे पर पहला हमला किया था?\nکیا ابرہہ نے کعبہ پر پہلا حملہ کیا تھا؟\nDid Abraha make the first attack on the Kaaba?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. हज़रत अब्दुल्लाह की वफ़ात 25 साल की उम्र में हुई थी?\nحضرت عبداللہ کی وفات 25 سال کی عمر میں ہوئی تھی؟\nDid Hazrat Abdullah pass away at the age of 25?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. हज़रत अब्दुल मुत्तलिब के 9 बेटे थे?\nحضرت عبدالمطلب کے 9 بیٹے تھے؟\nDid Hazrat Abdul Muttalib have 9 sons?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. हमारे नबी ﷺ को अबू लहब की बांदी ने दूध पिलाया था?\nہمارے نبی ﷺ کو ابو لہب کی باندی نے دودھ پلایا تھا؟\nWas our Prophet ﷺ breastfed by the slave woman of Abu Lahab?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. हज़रत अब्दुल्लाह का इंतक़ाल मदीने में नहीं हुआ था?\nحضرت عبداللہ کا انتقال مدینہ میں نہیں ہوا تھا؟\nDid Hazrat Abdullah NOT pass away in Madinah?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. हज़रत अली हमारे नबी ﷺ के रज़ाई (दूध शरीक) भाई थे?\nحضرت علی ہمارے نبی ﷺ کے رضاعی بھائی تھے؟\nWas Hazrat Ali the milk-brother of our Prophet ﷺ?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. हज़रत हमज़ा हमारे नबी ﷺ के रज़ाई भाई नहीं थे?\nحضرت حمزہ ہمارے نبی ﷺ کے رضاعی بھائی نہیں تھے؟\nWas Hazrat Hamza NOT the milk-brother of our Prophet ﷺ?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. हमारे नबी ﷺ की दादी का नाम फातिमा था?\nہمارے نبی ﷺ کی دادی کا نام فاطمہ تھا؟\nWas the name of our Prophet’s ﷺ grandmother Fatimah?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. दाई हलीमा पहले ही दिन हमारे नबी ﷺ को लेने आ गई थीं?\nدائی حلیمہ پہلے ہی دن ہمارے نبی ﷺ کو لینے آ گئی تھیں؟\nDid Halima come on the very first day to take our Prophet ﷺ?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 20
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. हमारे नबी ﷺ का नाम उनके दादा ने रखा था?\nہمارے نبی ﷺ کا نام ان کے دادا نے رکھا تھا؟\nWas our Prophet ﷺ named by his grandfather?",
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