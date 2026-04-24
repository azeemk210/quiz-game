export type GameStatus = 'LOBBY' | 'IN_PROGRESS' | 'FINISHED';

export interface Quiz {
  id: string;
  title: string;
  creator_id?: string;
}

export interface Question {
  id: string;
  quiz_id: string;
  question_text: string;
  options: string[];
  correct_answer_index: number;
  time_limit: number;
}

export interface GameSession {
  id: string;
  quiz_id: string;
  pin: string;
  status: GameStatus;
  current_question_id: string | null;
  host_id?: string;
}

export interface Player {
  id: string;
  game_id: string;
  nickname: string;
  score: number;
}

export interface AnswerSubmission {
  player_id: string;
  game_id: string;
  question_id: string;
  answer_index: number;
  is_correct: boolean;
  points: number;
  time_taken: number;
}
