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
    question_text: "Question 1. इनमें से किनका नाम अब्दुल काबा था?\nان میں سے کس کا نام عبدُ الکعبہ تھا؟\nAmong these, who was named Abdul Kaaba?",
    options: ["Hazrat Umar (RA) / حضرت عمرؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Hazrat Umar (RA) / حضرت عمرؓ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. हज़रत अबू बकर (रज़ि॰) किस क़बीले से ताल्लुक रखते थे?\nحضرت ابو بکر رضی اللہ عنہ کس قبیلے سے تعلق رکھتے تھے؟\nTo which tribe did Hazrat Abu Bakr (RA) belong?",
    options: ["Banu Taim / بنو تیم", "Banu Adi / بنو عدی", "Banu Najjar / بنو نجار", "Banu Asad / بنو اسد"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. हज़रत अबू बकर (रज़ि॰) ने किस उम्र में बैरून-ए-मुल्क का सफ़र शुरू किया?\nحضرت ابو بکر رضی اللہ عنہ نے کس عمر میں بیرونِ ملک کا سفر شروع کیا؟\nAt what age did Hazrat Abu Bakr (RA) start traveling abroad?",
    options: ["16", "19", "14", "18"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. इनमें से किनकी वालिदा के हक़ में हमारे नबी ﷺ ने दुआ की?\nان میں سے کن کی والدہ کے حق میں ہمارے نبی ﷺ نے دعا کی؟\nAmong these, for whose mother did our Prophet ﷺ pray?",
    options: ["Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Hazrat Umar (RA) / حضرت عمرؓ"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. ग़ार-ए-सूर में अल्लाह के नबी ﷺ को ख़बरें कौन पहुँचाता था?\nغارِ ثور میں اللہ کے نبی ﷺ کو خبریں کون پہنچاتا تھا؟\nWho used to bring news to the Prophet of Allah ﷺ in the Cave of Thawr?",
    options: ["Abdullah bin Umar / عبداللہ بن عمر", "Abdullah bin Zubair / عبداللہ بن زبیر", "Abdullah bin Abu Bakr / عبداللہ بن ابوبکر", "Abdullah bin Abdul Rahman / عبداللہ بن عبدالرحمن"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. क़ुबा में मस्जिद की ज़मीन किसने ख़रीदी थी?\nقُبا میں مسجد کی زمین کس نے خریدی تھی؟\nWho purchased the land for the mosque in Quba?",
    options: ["Hazrat Usman Ghani (RA) / حضرت عثمان غنیؓ", "Hazrat Abdul Rahman (RA) / حضرت عبدالرحمنؓ", "Hazrat Abbas (RA) / حضرت عباسؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. नबी ﷺ की वफ़ात के बाद शाम की तरफ़ लश्कर किसने भेजा?\nنبی ﷺ کی وفات کے بعد شام کی طرف لشکر کس نے بھیجا؟\nWho sent the army towards Syria after the death of the Prophet ﷺ?",
    options: ["Hazrat Umar (RA) / حضرت عمرؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Ali (RA) / حضرت علیؓ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. ईरानियों के ख़िलाफ़ हज़रत ख़ालिद बिन वलीद को सिपाहसालार बनाकर किसने भेजा?\nایرانیوں کے خلاف حضرت خالد بن ولید کو سپہ سالار بنا کر کس نے بھیجا؟\nWho sent Hazrat Khalid bin Waleed as commander-in-chief against the Iranians?",
    options: ["Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Umar (RA) / حضرت عمرؓ", "Nabi ﷺ / نبی ﷺ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. शामियों के ख़िलाफ़ हज़रत ख़ालिद बिन वलीद को सिपाहसालार बनाकर किसने भेजा?\nشامیوں کے خلاف حضرت خالد بن ولید کو سپہ سالار بنا کر کس نے بھیجا؟\nWho sent Hazrat Khalid bin Waleed as commander-in-chief against the Syrians?",
    options: ["Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Umar (RA) / حضرت عمرؓ", "Nabi ﷺ / نبی ﷺ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. हज़रत अबू बकर (रज़ि॰) की वफ़ात कितनी उम्र में हुई?\nحضرت ابو بکر کی وفات کتنی عمر میں ہوئی؟\nAt what age did Hazrat Abu Bakr pass away?",
    options: ["62 years / 62 سال", "65 years / 65 سال", "63 years / 63 سال", "64 years / 64 سال"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. सारा किनकी माँ थीं?\nسارہ کس کی ماں تھیں؟\nWhose mother was Sara?",
    options: ["Hazrat Ismail (AS) / حضرت اسماعیل", "Hazrat Ibrahim (AS) / حضرت ابراہیم", "Hazrat Ishaq (AS) / حضرت اسحاق", "Hazrat Isa (AS) / حضرت عیسیٰ"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. हज़रत हाजरा सफ़ा और मरवा पहाड़ों के बीच क्यों दौड़ी थीं?\nحضرت ہاجرہ صفا اور مروہ پہاڑوں کے درمیان کیوں دوڑی تھیں؟\nWhy did Hazrat Hajra run between the hills of Safa and Marwa?",
    options: ["Khane ke liye / کھانے کے لیے", "Janwar se bachne ke liye / جانور سے بچنے کے لیے", "Pani ke liye / پانی کے لیے", "Sardi se bachne ke liye / سردی سے بچنے کے لیے"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. ज़माना-ए-जाहिलियत में एक सफ़ेद ऊँट की क़ीमत क्या थी?\nزمانۂ جاہلیت میں ایک سفید اونٹ کی قیمت کیا تھی؟\nWhat was the price of a white camel during the Age of Ignorance (Jahiliyyah)?",
    options: ["1 Bora Anaj / ایک بوری اناج", "1 Aurat / ایک عورت", "5 horses / پانچ گھوڑے", "2 Aurtein / دو عورتیں"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. इनमें से फ़िरऔन की बेटी कौन थी?\nان میں سے فرعون کی بیٹی کون تھی؟\nWho among these was Pharaoh's daughter?",
    options: ["Sara / سارا", "Hajra / حاجرہ", "Asiya / آسیہ", "Ziya / ضیا"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. हज़रत हाजरा के पास सबसे पहले कौन सा क़बीला आया?\nحضرت ہاجرہ کے پاس سب سے پہلے کون سا قبیلہ آیا؟\nWhich tribe came to Hazrat Hajra first?",
    options: ["Banu Najjar / بنو نجار", "Banu Hashim / بنو ہاشم", "Banu Asad / بنو اسد", "Banu Jurhum / بنو جرہم"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. मक्के में सबसे पहला बुत कौन लाया?\nمکہ میں سب سے پہلا بت کون لایا؟\nWho brought the first idol to Mecca?",
    options: ["Amr bin Madi / عمرو بن مادی", "Amr ibn Luhayy / عمرو بن لُحَی", "Abu Jahl / ابو جہل", "Abu Lahab / ابو لہب"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. मक्के में सबसे पहली इमारत किसने बनवाई?\nمکہ میں سب سے پہلی عمارت کس نے بنوائی؟\nWho built the first building in Mecca?",
    options: ["Qusayy / قصیّ", "Kaʿb / کاب", "Hashim / ہاشم", "Abdul Muttalib / عبدالمطلب"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. दारुन्नदवा की तामीर किसने करवाई?\nدار الندوہ کی تعمیر کس نے کرائی؟\nWho had the construction of Dar al-Nadwa done?",
    options: ["Hashim / ہاشم", "Abdul Muttalib / عبدالمطلب", "Qusayy / قصیّ", "Hazrat Umar (RA) / حضرت عمرؓ"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. हाशिम किसके बेटे थे?\nہاشم کس کے بیٹے تھے؟\nWho was Hashim's father?",
    options: ["Abd al-Dar / عبدالدار", "Murrah / مرہ", "Abu Talib / ابو طالب", "Abd Manaf / عبد مناف"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. क़ुरैश के क़ाफ़िलों को लूट से बचाने के लिए पॉलिसी किसने बनाई?\nقریش کے قافلوں کو لوٹ سے بچانے کے لئے پالیسی کس نے بنائی؟\nWho made the policy to protect the Quraysh caravans from looting?",
    options: ["Qusayy / قصیّ", "Abd al-Dar / عبدالدار", "Abd al-Dar / عبدالدار", "Abdul Muttalib / عبدالمطلب"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 21. इराक़ को फ़तह करने की मुहिम किसने शुरू की?\nعراق کو فتح کرنے کی مہم کس نے شروع کی؟\nWho initiated the campaign to conquer Iraq?",
    options: ["Amr ibn al-Aas / عمرو ابن العاص", "Suraqa / سراقہ", "Sharjeel bin Hasna / شرجیل بن حسنہ", "Muthanna bin Haritha / مثنی بن حارثہ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 22. हमारे नबी ﷺ के हिजरत के साथी कौन थे?\nہمارے نبی ﷺ کے ہجرت کے ساتھی کون تھے؟\nWho was the companion of our Prophet ﷺ during the Hijrah (migration)?",
    options: ["Hazrat Ali (RA) / حضرت علیؓ", "Abd al-Dar / عبدالدار", "Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Umar (RA) / حضرت عمرؓ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 23. इस्लाम के पहले मुजद्दिद कौन थे?\nاسلام کے پہلے مجدّد کون تھے؟\nWho was the first Mujaddid in Islam?",
    options: ["Abd al-Dar / عبدالدار", "Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Hazrat Umar (RA) / حضرت عمرؓ"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 24. हमारे नबी ﷺ किस दिन पैदा हुए?\nہمارے نبی ﷺ کس دن پیدا ہوئے؟\nOn which day was our Prophet ﷺ born?",
    options: ["Sunday / اتوار", "Friday / جمعہ", "Saturday / ہفتہ", "Monday / پیر"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 25. दाई हलीमा किस क़बीले से ताल्लुक रखती थीं?\nدائی حلیمہ کس قبیلے سے تعلق رکھتی تھیں؟\nWhich tribe did Halima (the wet nurse) belong to?",
    options: ["Banu Asad / بنو اسد", "Banu Jurhum / بنو جرہم", "Taghlib / تغلب", "Banu Najjar / بنو نجار"],
    correct_answer_index: 0,
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
