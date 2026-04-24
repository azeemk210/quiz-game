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
          question_text: "Q.1 Who sent Hazrat Khalid bin Waleed against the Syrians?\nشامیوں کے خلاف حضرت خالد بن ولید کو کس نے بھیجا؟\nशामियों के खिलाफ हज़रत खालिद को किसने भेजा?",
          options: ["Hazrat Usman RZ", "Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Nabi ﷺ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.2 What was the reason for the death of Hazrat Musna bin Harisa?\nحضرت مثنیٰ بن حارثہ کی وفات کی وجہ کیا تھی؟\nहज़रत मुसन्ना बिन हारिसा की वफ़ात की वजह क्या थी?",
          options: ["Jung me shaheed hone se", "Jung me zakhmi hone se", "Qudrati maut", "Kisi bimari ki wajah se"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.3 To which tribe did Hazrat Abu Bakr RZ belong?\nحضرت ابو بکر رضی اللہ عنہ کس قبیلے سے تعلق رکھتے تھے؟\nहज़रत अबू बकर रज़ि. किस क़बीले से ताल्लुक रखते थे?",
          options: ["Banu Taim", "Banu Adi", "Banu Najjar", "Banu Asad"],
          correct_answer_index: 0,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.4 What advice of Hazrat Umar RZ did Hazrat Abu Ubaid forget and suffer loss?\nحضرت ابو عبیدہ رضی اللہ عنہ نے حضرت عمر رضی اللہ عنہ کی کون سی نصیحت بھول کر نقصان اٹھایا؟\nहज़रत उमर रज़ियल्लाहु अन्हु की कौन सी हिदायत भूल कर नुकसान उठाया?",
          options: ["Nahar e Furaat ka paar karna", "Salaaro se mashvara karna", "Both A and B", "None of these"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.5 Who used to bring news to the Prophet ﷺ in the Cave of Thawr?\nغارِ ثور میں نبی ﷺ کو خبریں کون پہنچاتا تھا؟\nग़ार-ए-सौर में नबी ﷺ को खबरें कौन पहुँचाता था?",
          options: ["Abdullah bin Umar", "Abdullah bin Zubair", "Abdullah bin Abu Bakr", "Abdullah bin Abdul Rahman"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.6 How many Hadith are narrated by Hazrat Umar RZ?\nحضرت عمر رضی اللہ عنہ سے کتنی احادیث مروی ہیں؟\nहज़रत उमर रज़ियल्लाहु अन्हु से कितनी हदीस मरवी हैं?",
          options: ["100", "365", "539", "421"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.7 Who sent the army towards Syria after the Prophet ﷺ?\nنبی ﷺ کی وفات کے بعد شام کی طرف لشکر کس نے بھیجا؟\nनबी ﷺ की वफ़ात के बाद शाम की तरफ लश्कर किसने भेजा?",
          options: ["Hazrat Umar RZ", "Hazrat Abu Bakr RZ", "Hazrat Usman RZ", "Hazrat Ali RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.8 After Hazrat Umar RZ became the caliph, who came to him for help?\nحضرت عمر رضی اللہ عنہ کے خلیفہ بننے کے بعد ان کے پاس کون مدد کے لیے آیا؟\nहज़रत उमर रज़ियल्लाहु अनहु के खलीफ़ा बनने के बाद, कौन उनसे मदद मांगने आया?",
          options: ["Hazrat Ali RZ", "Hazrat Musna bin Harisa", "Hazrat Usman RZ", "None of these"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.9 At what age did Hazrat Abu Bakr RZ pass away?\nحضرت ابو بکر رضی اللہ عنہ کی وفات کس عمر میں ہوئی؟\nहज़रत अबू बकर रज़ि. की वफ़ात किस उम्र में हुई?",
          options: ["62 years", "65 years", "63 years", "64 years"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.10 Which Caliph terminated Hazrat Khalid bin Waleed from the post of Commander in chief and appoint Hazrat Abu Ubaid as new Commander in chief?\nکس خلیفہ نے حضرت خالد بن ولید کو کمانڈر انچیف کے عہدے سے ہٹا کر حضرت ابو عبید کو نیا کمانڈر ان چیف مقرر کیا؟\nकिस खलीफा ने हज़रत खालिद बिन वलीद को सिपाह सालार के पद से हटाकर हज़रत अबू उबैद को नया सिपाह सालार मुकर्रर किया?",
          options: ["Hazrat Ali RZ ne", "Hazrat Abu Bakr RZ ne", "Hazrat Umar RZ ne", "Hazrat Muawiya RZ ne"],
          correct_answer_index: 2,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.11 Among these, who was named Abdul Kaaba?\nان میں سے کس کا نام عبد الکعبہ تھا؟\nइनमें से किसका नाम अब्दुल काबा था?",
          options: ["Hazrat Umar", "Hazrat Abu Bakr", "Hazrat Ali", "Hazrat Umar"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.12 In which battle did Hazrat Umar RZ and Hazrat Musna avenge the battle of Jisar?\nحضرت عمر رضی اللہ عنہ اور حضرت مثنیٰ نے کس جنگ میں جسر کا بدلہ لیا؟\nहज़रत उमर रज़ियल्लाहु अन्हु और हज़रत मुसन्ना ने जंग-ए-जिसर का बदला किस जंग में लिया?",
          options: ["Jung e Boyeb", "Jung e Qadisiya", "Jung e Naharwan", "None of these"],
          correct_answer_index: 0,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.13 By whose order was the chritians of najran exiled?\nنجران کے عیسائیوں کو کس کے حکم سے جلاوطن کیا گیا؟\nनजरान के ईसाइयों को किसके हुक्म से निकाला गया?",
          options: ["Hazrat Umar RZ ke", "Hazrat Abu Bakr RZ ke", "Hazrat Hassan RZ ke", "None of these"],
          correct_answer_index: 0,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.14 Who purchased the land for the mosque in Quba?\nقبا میں مسجد کی زمین کس نے خریدی تھی؟\nक़ुबा में मस्जिद की ज़मीन किसने खरीदी थी?",
          options: ["Hazrat Usman RZ", "Hazrat Abdul Rahman RZ", "Hazrat Abbas RZ", "Hazrat Abu Bakr RZ"],
          correct_answer_index: 3,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.15 What order did Hazrat Umar RZ issue after the battle of Yarmouk?\nجنگ یرموک کے بعد حضرت عمر رضی اللہ عنہ نے کیا حکم جاری کیا؟\nजंग-ए-यरमूक के बाद हज़रत उमर रज़ि. ने क्या हुक्म जारी किया?",
          options: ["Muslimano ko aaram karne ke liye", "Muslims ki Madina wapasi", "Romans se sulah ka hukum", "5000 sipahi lashkar bhejne ka hukum"],
          correct_answer_index: 3,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.16 When was the Bai'at taken to make Hazrat Umar RZ the caliph?\nحضرت عمر رضی اللہ عنہ کو خلیفہ بنانے کے لیے بیعت کب لی گئی؟\nहज़रत उमर रज़ियल्लाहु अनहु को खलीफ़ा बनाने के लिए बैअत कब ली गई थी?",
          options: ["23 jamadi us sani (13h)", "12 rabiul awwal (14h)", "24 ramzan (13h)", "11 safar (14h)"],
          correct_answer_index: 0,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.17 Who sent Hazrat Khalid bin Waleed against the Iranians?\nایرانیوں کے خلاف حضرت خالد بن ولید کو کس نے بھیجا؟\nईरानियों के खिलाफ हज़रत खालिद को किसने भेजा?",
          options: ["Hazrat Usman RZ", "Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Nabi ﷺ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.18 Who was the first Caliph to be called Ameerul Mumineen?\nامیر المومنین کہلانے والا پہلا خلیفہ کون تھا؟\nपहले खलीफा कौन थे जिन्हें अमीरुल मोमिनीन कहा गया?",
          options: ["Hazrat Abu Bakr RZ", "Hazrat Umar RZ", "Hazrat Usman RZ", "Hazrat Hassan RZ"],
          correct_answer_index: 1,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.19 At what age did Hazrat Abu Bakr RZ start traveling abroad?\nحضرت ابو بکر رضی اللہ عنہ نے کس عمر میں بیرون ملک کا سفر شروع کیا؟\nहज़रत अबू बकर रज़ि. ने किस उम्र में बाहर का सफर शुरू किया?",
          options: ["16", "19", "14", "18"],
          correct_answer_index: 3,
          time_limit: 15
        },
        {
          quiz_id: quiz.id,
          question_text: "Q.20 For whose mother did the Prophet ﷺ make dua?\nنبی ﷺ نے کس کی والدہ کے حق میں دعا کی؟\nनबी ﷺ ने किसकी वालिदा के लिए दुआ की?",
          options: ["Hazrat Abu Bakr RZ", "Hazrat Usman RZ", "Hazrat Ali RZ", "Hazrat Umar RZ"],
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
