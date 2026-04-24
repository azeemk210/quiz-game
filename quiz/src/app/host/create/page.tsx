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

      // 2. Create all 20 questions
      const questions = [
        {
          quiz_id: quiz.id,
          question_text: "Q.1 After Hazrat Umar RZ became the Caliph, who came to him for help?\nحضرت عمر رضی اللہ عنہ کے خلیفہ بننے کے بعد ان کے پاس کون مدد کے لیے آیا؟\nहज़रत उमर रज़ि. के खलीफ़ा बनने के बाद कौन उनसे मदद मांगने आया?",
          options: ["Hazrat Ali RZ", "Hazrat Musanna bin Haritha RZ", "Hazrat Usman RZ", "Hazrat Zubair RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.2 Which Caliph removed Hazrat Khalid bin Waleed RZ from the post of Commander-in-Chief?\nکس خلیفہ نے حضرت خالد بن ولید کو کمانڈر انچیف کے عہدے سے ہٹایا؟\nकिस खलीफ़ा ने हज़रत खालिद बिन वलीद रज़ि. को सिपाह सालार के पद से हटाया?",
          options: ["Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Hazrat Usman RZ", "Hazrat Muawiya RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.3 Who was the first Caliph to be given the title of Ameer-ul-Momineen?\nامیر المومنین کا لقب پانے والے پہلے خلیفہ کون تھے؟\nअमीरुल मुमिनीन का लक़ब पाने वाले पहले खलीफ़ा कौन थे?",
          options: ["Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Hazrat Usman RZ", "Hazrat Hassan RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.4 How many Ahadith are narrated by Hazrat Umar RZ?\nحضرت عمر رضی اللہ عنہ سے کتنی احادیث مروی ہیں؟\nहज़रत उमर रज़ि. से कितनी अहादीस मरवी हैं?",
          options: ["100", "365", "539", "421"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.5 When was the Bay'at taken to appoint Hazrat Umar RZ as Caliph?\nحضرت عمر رضی اللہ عنہ کو خلیفہ بنانے کے لیے بیعت کب لی گئی؟\nहज़रत उमर रज़ि. को खलीफ़ा बनाने के लिए बैअत कब ली गई?",
          options: ["23 Jamadi-us-Sani 13H", "12 Rabi-ul-Awwal 14H", "24 Ramzan 13H", "11 Safar 14H"],
          correct_answer_index: 0,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.6 Who was appointed as new Commander-in-Chief after Hazrat Khalid bin Waleed RZ?\nحضرت خالد بن ولید کے بعد نیا کمانڈر انچیف کسے مقرر کیا گیا؟\nहज़रत खालिद बिन वलीद रज़ि. के बाद नया सिपाह सालार किसे मुकर्रर किया गया?",
          options: ["Hazrat Amr bin Al-As RZ", "Hazrat Abu Ubaid RZ", "Hazrat Sad bin Abi Waqqas RZ", "Hazrat Zubair RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.7 In which Hijri year did Hazrat Umar RZ become the Caliph?\nحضرت عمر رضی اللہ عنہ کس ہجری سال خلیفہ بنے؟\nहज़रत उमर रज़ि. किस हिजरी साल खलीफ़ा बने?",
          options: ["11H", "12H", "13H", "14H"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.8 Who martyred Hazrat Umar RZ?\nحضرت عمر رضی اللہ عنہ کو شہید کس نے کیا؟\nहज़रत उमर रज़ि. को शहीद किसने किया?",
          options: ["Abu Lulu Firoze", "Wahshi bin Harb", "Hinda bint Utba", "Ibn Muljam"],
          correct_answer_index: 0,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.9 How many years did Hazrat Umar RZ serve as Caliph?\nحضرت عمر رضی اللہ عنہ کتنے سال خلیفہ رہے؟\nहज़रत उमर रज़ि. कितने साल खलीफ़ा रहे?",
          options: ["7 years", "8 years", "10 years", "12 years"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.10 Which Islamic calendar did Hazrat Umar RZ officially introduce?\nحضرت عمر رضی اللہ عنہ نے کون سا اسلامی کیلنڈر باقاعدہ متعارف کروایا؟\nहज़रत उमर रज़ि. ने कौन-सा इस्लामी कैलेंडर बाकायदा शुरू किया?",
          options: ["Gregorian Calendar", "Hijri Calendar", "Shamsi Calendar", "Julian Calendar"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.11 Which garrison city did Hazrat Umar RZ found in Iraq?\nحضرت عمر رضی اللہ عنہ نے عراق میں کون سا فوجی شہر بسایا؟\nहज़रत उमर रज़ि. ने इराक़ में कौन-सा फ़ौजी शहर बसाया?",
          options: ["Kufa", "Basra", "Baghdad", "Mosul"],
          correct_answer_index: 0, // Kufa is the primary answer
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.12 During whose Caliphate was Jerusalem (Bait-ul-Maqdis) conquered?\nبیت المقدس کس خلیفہ کے دور میں فتح ہوا؟\nबैतुल मक़दिस किस खलीफ़ा के दौर में फ़तह हुआ?",
          options: ["Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Hazrat Usman RZ", "Hazrat Ali RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.13 What was the name of Hazrat Umar's RZ father?\nحضرت عمر رضی اللہ عنہ کے والد کا نام کیا تھا؟\nहज़रत उमर रज़ि. के वालिद का नाम क्या था?",
          options: ["Abu Talib", "Khattab", "Abdul Muttalib", "Abu Sufyan"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.14 In which battle did Muslims decisively defeat the Persian Empire?\nحضرت عمر رضی اللہ عنہ کے دور میں کس جنگ میں مسلمانوں نے ایرانی سلطنت کو فیصلہ کن شکست دی؟\nहज़रत उमर रज़ि. के दौर में किस जंग में मुसलमानों ने ईरानी सल्तनत को फ़ैसलाकुन शिकस्त दी?",
          options: ["Battle of Badr", "Battle of Uhud", "Battle of Qadisiyyah", "Battle of Yarmouk"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.15 Which department did Hazrat Umar RZ establish to pay soldiers?\nحضرت عمر رضی اللہ عنہ نے فوجیوں کو تنخواہ دینے کے لیے کون سا شعبہ قائم کیا؟\nहज़रत उमर रज़ि. ने फ़ौजियों को तनख़्वाह देने के लिए कौन-सा शोबा क़ायम किया?",
          options: ["Bait-ul-Mal", "Diwan-ul-Jund", "Diwan-ul-Kharaj", "Diwan-ul-Rasa'il"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.16 What title did the Holy Prophet ﷺ give to Hazrat Umar RZ?\nحضور نبی کریم ﷺ نے حضرت عمر رضی اللہ عنہ کو کون سا لقب عطا فرمایا؟\nहुज़ूर नबी करीम ﷺ ने हज़रत उमर रज़ि. को कौन-सा लक़ब अता फ़रमाया?",
          options: ["Saifullah", "Al-Farooq", "As-Siddiq", "Dhul-Nurayn"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.17 Which region was NOT conquered during Hazrat Umar's RZ Caliphate?\nحضرت عمر رضی اللہ عنہ کے دور خلافت میں کون سا علاقہ فتح نہیں ہوا؟\nहज़रत उमर रज़ि. के दौर-ए-खिलाफ़त में कौन-सा इलाका फ़तह नहीं हुआ?",
          options: ["Persia (Iran)", "Byzantine Syria", "Constantinople", "Egypt"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.18 In which mosque was Hazrat Umar RZ attacked during Fajr prayer?\nحضرت عمر رضی اللہ عنہ پر نماز فجر کے دوران کس مسجد में हमला हुआ?\nहज़रत उमर रज़ि. पर नमाज़-ए-फ़ज्र के दौरान किस मस्जिद में हमला हुआ?",
          options: ["Masjid-ul-Haram", "Masjid-ul-Aqsa", "Masjid-e-Nabawi", "Masjid-e-Quba"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.19 Where is Hazrat Umar RZ buried?\nحضرت عمر رضی اللہ عنہ کہاں مدفون ہیں؟\nहज़रत उमर रज़ि. कहाँ मदफ़ून हैं?",
          options: ["Makkah", "Madinah (next to Prophet ﷺ)", "Jerusalem", "Kufa"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.20 How many members were in the Shura committee to select the next Caliph?\nحضرت عمر رضی اللہ عنہ نے اگلے خلیفہ کے انتخاب کے لیے کتنے افراد کی شوریٰ مقرر کی؟\nहज़रत उमर रज़ि. ने अगले खलीफ़ा के चुनाव के लिए कितने सदस्यों की शूरा मुकर्रर की?",
          options: ["4 members", "5 members", "6 members", "8 members"],
          correct_answer_index: 2,
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
