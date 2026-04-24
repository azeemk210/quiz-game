-- Enable Realtime for all relevant tables
begin;
  -- drop the publication if it exists
  drop publication if exists supabase_realtime;
  -- create the publication
  create publication supabase_realtime;
commit;

-- Quizzes Table
create table quizzes (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  creator_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Questions Table
create table questions (
  id uuid default gen_random_uuid() primary key,
  quiz_id uuid references quizzes(id) on delete cascade,
  question_text text not null,
  options jsonb not null, -- Array of strings
  correct_answer_index integer not null,
  time_limit integer default 20, -- seconds
  created_at timestamp with time zone default now()
);

-- Game Sessions Table
create table game_sessions (
  id uuid default gen_random_uuid() primary key,
  quiz_id uuid references quizzes(id) on delete cascade,
  pin text not null unique,
  status text check (status in ('LOBBY', 'IN_PROGRESS', 'FINISHED')) default 'LOBBY',
  current_question_id uuid references questions(id),
  host_id uuid references auth.users(id) on delete cascade,
  created_at timestamp with time zone default now()
);

-- Players Table
create table players (
  id uuid default gen_random_uuid() primary key,
  game_id uuid references game_sessions(id) on delete cascade,
  nickname text not null,
  score integer default 0,
  joined_at timestamp with time zone default now(),
  unique(game_id, nickname)
);

-- Answers Table (to track submissions per question)
create table answers (
  id uuid default gen_random_uuid() primary key,
  player_id uuid references players(id) on delete cascade,
  game_id uuid references game_sessions(id) on delete cascade,
  question_id uuid references questions(id) on delete cascade,
  answer_index integer not null,
  is_correct boolean not null,
  points integer default 0,
  answered_at timestamp with time zone default now(),
  unique(player_id, question_id)
);

-- Realtime Configuration
begin;
  drop publication if exists supabase_realtime;
  create publication supabase_realtime;
commit;

alter publication supabase_realtime add table game_sessions, players, questions, answers;

-- RLS Policies

-- Game Sessions:
create policy "Anyone can view game sessions" on game_sessions for select using (true);
create policy "Anyone can manage sessions" on game_sessions for all using (true);

-- Players:
create policy "Anyone can view players" on players for select using (true);
create policy "Anyone can join games" on players for insert with check (true);
create policy "Anyone can update player scores" on players for update using (true);

-- Answers:
create policy "Anyone can view answers" on answers for select using (true);
create policy "Anyone can submit answers" on answers for insert with check (true);

-- Quizzes/Questions:
create policy "Anyone can read quizzes" on quizzes for select using (true);
create policy "Anyone can read questions" on questions for select using (true);
create policy "Anyone can insert quizzes" on quizzes for insert with check (true);
create policy "Anyone can insert questions" on questions for insert with check (true);

-- RPC for score increment
create or replace function increment_score(player_uuid uuid, points_to_add integer)
returns void as $$
begin
  update players
  set score = score + points_to_add
  where id = player_uuid;
end;
$$ language plpgsql;
