import HostView from '@/components/Host/HostView';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';

interface HostPageProps {
  params: { id: string };
}

export default async function HostPage({ params }: HostPageProps) {
  // Use await to get the id if params is a Promise (Next.js 15+ convention)
  const { id } = await params;

  // Fetch session and its questions
  const { data: session } = await supabase
    .from('game_sessions')
    .select('*, quiz_id')
    .eq('id', id)
    .single();

  if (!session) {
    notFound();
  }

  const { data: questions } = await supabase
    .from('questions')
    .select('*')
    .eq('quiz_id', session.quiz_id)
    .order('created_at', { ascending: true });

  return <HostView initialSession={session} questions={questions || []} />;
}
