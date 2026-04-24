import Link from 'next/link';

export default function Home() {
  return (
    <div className="screen-container bg-kahoot-purple text-white p-6 justify-center items-center">
      <h1 className="responsive-text-xl font-black italic mb-8 md:mb-12 animate-pulse-soft text-center leading-tight">
        IslamQuiz
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full max-w-4xl px-4">
        <Link 
          href="/play" 
          className="kahoot-button bg-kahoot-blue p-6 md:p-12 rounded-2xl text-center hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Player</h2>
          <p className="text-sm md:text-xl opacity-80">Join a game with a PIN</p>
        </Link>

        <Link 
          href="/host/create" 
          className="kahoot-button bg-kahoot-green p-6 md:p-12 rounded-2xl text-center hover:scale-105 transition-transform"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Host</h2>
          <p className="text-sm md:text-xl opacity-80">Create and run a quiz</p>
        </Link>
      </div>

      <footer className="mt-12 md:mt-24 opacity-50 text-xs md:text-sm text-center">
        A premium Kahoot-style experience built with Next.js & Supabase
      </footer>
    </div>
  );
}
