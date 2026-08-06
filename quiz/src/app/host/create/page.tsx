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
    question_text: "Question 1. उम्मुल हिन्द किनकी कुन्नियत है?\nاُمُّ الہِند کِن کی کُنیت ہے؟\nWhose kunyah is \"Umm al-Hind\"?",
    options: ["Ammi Khadijah (RA) / امی خدیجہؓ", "Ammi Ayesha (RA) / امی عائشہؓ", "Mariyam (AS) / مریم علیہا السلام", "Bibi Fatima (RA) / بی بی فاطمہؓ"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 2. शेब-ए-अबू तालिब में क़ैद रहने की वजह से इनमें किनका इंतक़ाल हुआ?\nشِعبِ ابی طالب میں محصور رہنے کی وجہ سے اِن میں سے کِن کا انتقال ہوا؟\nWhich of the following passed away due to the hardships of being confined in the Valley of Abu Talib (Shi'b Abi Talib)?",
    options: ["Ammi Ayesha (RA) / امی عائشہؓ", "Bibi Zainab (RA) / بی بی زینبؓ", "Ammi Khadijah (RA) / امی خدیجہؓ", "Bibi Fatima (RA) / بی بی فاطمہؓ"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 3. अल्लाह ने इनमें से किनको सलाम भेजा?\nاللہ تعالیٰ نے اِن میں سے کِن کو سلام بھیجا؟\nTo which of the following did Allah send greetings (Salam)?",
    options: ["Mariyam (AS) / مریم علیہا السلام", "Asiya / آسیہ", "Bibi Fatima (RA) / بی بی فاطمہؓ", "Ammi Khadijah (RA) / امی خدیجہؓ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 4. काबे से ताल्लुक रखने वाले ओहदों पर कौन फ़ाइज़ थे?\nکعبہ سے تعلق رکھنے والے عہدوں پر کون فائز تھے؟\nWho held the positions associated with the Kaaba?",
    options: ["Ahle Yasrab / اہلِ یثرب", "Ahle Saqeef / اہلِ ثقیف", "Ahle Taif / اہلِ طائف", "Ahle Makka / اہلِ مکہ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 5. बाकूम कौन था?\nباقوم کون تھا؟\nWho was Baqum?",
    options: ["Commander / کمانڈر", "Soldier / سپاہی", "Carpenter / بڑھئی", "Mason (Rajgeer) / راج گیر"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 6. सुलेह कौन था?\nصلیح کون تھا؟\nWho was Sulayh?",
    options: ["Commander / کمانڈر", "Soldier / سپاہی", "Carpenter / بڑھئی", "Mason (Rajgeer) / راج گیر"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 7. बाबुस्सफ़ा क्या है?\nبابُ الصفا کیا ہے؟\nWhat is Bab al-Safa?",
    options: ["Ek pahar / ایک پہاڑ", "Ek imarat / ایک عمارت", "Ek qila / ایک قلعہ", "Ek darwaza / ایک دروازہ"],
    correct_answer_index: 3,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 8. पहले खलीफा कौन थे जिन्हें अमीरुल मुमिनीन कहा गया?\nامیر المومنین کہلانے والا پہلا خلیفہ کون تھا؟\nWho was the first Caliph to be called Ameerul Mumineen?",
    options: ["Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Umar (RA) / حضرت عمرؓ", "Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Hassan (RA) / حضرت حسنؓ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 9. किस खलीफा ने हज़रत ख़ालिद बिन वलीद को सिपाहसालारी के ओहदे से माज़ूल कर के हज़रत अबू उबैद को नया सिपाहसालार मुक़र्रर किया?\nکس خلیفہ نے حضرت خالد بن ولید کو کمانڈر انچیف کے عہدے سے ہٹا کر حضرت ابو عبید کو نیا کمانڈر ان چیف مقرر کیا؟\nWhich Caliph terminated Hazrat Khalid bin Waleed from the post of Commander in chief and appointed Hazrat Abu Ubaid as new Commander in chief?",
    options: ["Hazrat Ali (RA) ne / حضرت علیؓ نے", "Hazrat Abu Bakr (RA) ne / حضرت ابوبکرؓ نے", "Hazrat Umar (RA) ne / حضرت عمرؓ نے", "Hazrat Muawiya (RA) ne / حضرت معاویہؓ نے"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 10. किस खलीफा को ग़नी का ख़िताब दिया गया?\nکس خلیفہ کو غنی کا خطاب دیا گیا؟\nWhich Caliph was given the Title of Ghani?",
    options: ["Hazrat Abu Bakr (RA) / حضرت ابوبکرؓ", "Hazrat Usman (RA) / حضرت عثمانؓ", "Hazrat Ali (RA) / حضرت علیؓ", "Hazrat Usman (RA) / حضرت عثمانؓ"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 11. हज़रत अबू बकर (रज़ि॰) का ताल्लुक किस क़बीले से था?\nحضرت ابوبکر رضی اللہ عنہ کا تعلق کس قبیلے سے تھا؟\nHazrat Abu Bakr (RA) belonged to which Tribe?",
    options: ["Banu Kureza / بنو قریظہ", "Banu Taim / بنو تیم", "Banu Aas / بنو عاص", "Banu Hashim / بنو ہاشم"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 12. काबे की तामीर के वक़्त हमारे नबी ﷺ की उम्र क्या थी?\nکعبہ کی تعمیر کے وقت ہمارے نبی ﷺ کی عمر کیا تھی؟\nHow old was our Prophet ﷺ at the time of the reconstruction of the Kaaba?",
    options: ["40", "25", "35", "45"],
    correct_answer_index: 2,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 13. हिजर-ए-अस्वद का इख़्तिलाफ़ हमारे नबी ﷺ ने नहीं सुलझाया था।\nکیا حجرِ اسود کے بارے میں ہونے والے اختلاف کو ہمارے نبی ﷺ نے حل نہیں کیا تھا؟\nDidn't our Prophet ﷺ resolve the dispute over the Black Stone (Hajar al-Aswad)?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 14. हमारे नबी ﷺ से पहले हज़रत इब्राहीम (अ॰) के दीन को मानने वाले मक्के में बहुत से लोग थे।\nہمارے نبی ﷺ سے پہلے مکہ میں حضرت ابراہیمؑ کے دین کو ماننے والے بہت سے لوگ تھے۔\nBefore our Prophet ﷺ, there were many people in Makkah who followed the religion of Prophet Ibrahim (AS).",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 15. ग़ार-ए-हिरा मक्के से 6 दूर है।\nغار حرا مکہ سے 6 دور ہے؟\nGhar-e-Hira is 6 (units) away from Makkah.",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 16. क्या अबुल आस अम्मी ख़दीजा के भांजे थे?\nکیا ابوالعاص امی خدیجہؓ کے بھانجے تھے؟\nWas Abul Aas the nephew of Ummi Khadijah (RA)?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 17. हज़रत ज़ैद (रज़ि॰) के दादा का नाम शुरहाबील था।\nکیا حضرت زیدؓ کے دادا کا نام شرحبیل تھا؟\nWas Hazrat Zayd's (RA) grandfather's name Sharhabil?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 18. क्या हज़रत जफ़र (रज़ि॰) को हज़रत अब्बास (रज़ि॰) ने पाला था?\nکیا حضرت جعفرؓ کی پرورش حضرت عباسؓ نے کی تھی؟\nWas Hazrat Ja'far (RA) raised by Hazrat Abbas (RA)?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 0,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 19. हमारे नबी ﷺ को ख़्याली ख़्वाब नज़र आते थे।\nکیا ہمارے نبی ﷺ کو خیالی خواب نظر آتے تھے؟\nDid our Prophet ﷺ see imaginary dreams?",
    options: ["True / सही", "False / ग़लत"],
    correct_answer_index: 1,
    time_limit: 15
  },
  {
    quiz_id: quiz.id,
    question_text: "Question 20. क्या हमारे नबी ﷺ ग़ार में सच्चाई की तलाश में नहीं जाते थे?\nکیا ہمارے نبی ﷺ غار میں سچائی کی تلاش میں نہیں جاتے تھے؟\nDid our Prophet ﷺ not go to the cave in search of the truth?",
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
