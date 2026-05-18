/*
  # SportSync Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `email` (text, unique)
      - `role` (text, default 'user')
      - `avatar_url` (text)
      - `primary_sport` (text)
      - `phone` (text)
      - `rank` (text, default 'Beginner')
      - `level` (integer, default 1)
      - `points` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `venues`
      - `id` (uuid, primary key)
      - `owner_id` (uuid, references profiles)
      - `name` (text)
      - `location` (text)
      - `sport` (text)
      - `type` (text, 'court' or 'studio')
      - `rating` (numeric, default 0)
      - `price` (integer)
      - `price_label` (text)
      - `image_url` (text)
      - `tags` (text array)
      - `available_now` (boolean, default false)
      - `slots` (integer, default 0)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `bookings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `venue_id` (uuid, references venues)
      - `date` (text)
      - `time_slots` (text array)
      - `status` (text, default 'confirmed')
      - `amount` (integer)
      - `receipt_code` (text)
      - `items` (jsonb)
      - `payment_method` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `clubs`
      - `id` (uuid, primary key)
      - `name` (text)
      - `description` (text)
      - `owner_id` (uuid, references profiles)
      - `image_url` (text)
      - `tag` (text)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `club_members`
      - `id` (uuid, primary key)
      - `club_id` (uuid, references clubs)
      - `user_id` (uuid, references profiles)
      - `status` (text, default 'pending')
      - `joined_at` (timestamptz)

    - `posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `image_url` (text, nullable)
      - `tag` (text)
      - `likes_count` (integer, default 0)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `post_likes`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references posts)
      - `user_id` (uuid, references profiles)
      - `created_at` (timestamptz)

    - `post_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references posts)
      - `user_id` (uuid, references profiles)
      - `text` (text)
      - `created_at` (timestamptz)

    - `open_plays`
      - `id` (uuid, primary key)
      - `sport` (text)
      - `level` (text)
      - `location` (text)
      - `venue` (text)
      - `date` (text)
      - `time` (text)
      - `max_slots` (integer)
      - `current_slots` (integer, default 0)
      - `description` (text)
      - `organizer_id` (uuid, references profiles)
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)

    - `open_play_participants`
      - `id` (uuid, primary key)
      - `open_play_id` (uuid, references open_plays)
      - `user_id` (uuid, references profiles)
      - `joined_at` (timestamptz)

    - `notifications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `type` (text)
      - `source_user` (text)
      - `detail` (text)
      - `is_read` (boolean, default false)
      - `created_at` (timestamptz)

    - `reports`
      - `id` (uuid, primary key)
      - `reporter_id` (uuid, references profiles)
      - `target_type` (text)
      - `target_id` (text)
      - `target_name` (text)
      - `category` (text)
      - `narrative` (text)
      - `attachment_url` (text, nullable)
      - `status` (text, default 'Pending')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `tournaments`
      - `id` (uuid, primary key)
      - `name` (text)
      - `sport` (text)
      - `date` (text)
      - `location` (text)
      - `prize` (text)
      - `description` (text)
      - `status` (text, default 'Open')
      - `is_active` (boolean, default true)
      - `created_at` (timestamptz)

    - `tournament_registrations`
      - `id` (uuid, primary key)
      - `tournament_id` (uuid, references tournaments)
      - `user_id` (uuid, references profiles)
      - `registered_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Users can read all public data (venues, clubs, open_plays, tournaments, posts)
    - Users can only modify their own data (profiles, bookings, posts, club memberships, etc.)
    - Owners can manage their own venues
    - Admin-level operations restricted by role checks
*/

-- Profiles
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL DEFAULT '',
  email text UNIQUE NOT NULL DEFAULT '',
  role text NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'owner', 'admin')),
  avatar_url text DEFAULT '',
  primary_sport text DEFAULT '',
  phone text DEFAULT '',
  rank text DEFAULT 'Beginner',
  level integer DEFAULT 1,
  points integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Venues
CREATE TABLE IF NOT EXISTS venues (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  name text NOT NULL,
  location text NOT NULL DEFAULT '',
  sport text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'court' CHECK (type IN ('court', 'studio')),
  rating numeric DEFAULT 0,
  price integer DEFAULT 0,
  price_label text DEFAULT '',
  image_url text DEFAULT '',
  tags text[] DEFAULT '{}',
  available_now boolean DEFAULT false,
  slots integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active venues"
  ON venues FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Owners can insert own venues"
  ON venues FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Owners can update own venues"
  ON venues FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Bookings
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  venue_id uuid REFERENCES venues(id) ON DELETE CASCADE NOT NULL,
  date text NOT NULL DEFAULT '',
  time_slots text[] DEFAULT '{}',
  status text NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled')),
  amount integer DEFAULT 0,
  receipt_code text DEFAULT '',
  items jsonb DEFAULT '[]',
  payment_method text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own bookings"
  ON bookings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
  ON bookings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
  ON bookings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Clubs
CREATE TABLE IF NOT EXISTS clubs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text DEFAULT '',
  owner_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  image_url text DEFAULT '',
  tag text DEFAULT '',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active clubs"
  ON clubs FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can create clubs"
  ON clubs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Club owners can update their clubs"
  ON clubs FOR UPDATE
  TO authenticated
  USING (auth.uid() = owner_id)
  WITH CHECK (auth.uid() = owner_id);

-- Club Members
CREATE TABLE IF NOT EXISTS club_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  club_id uuid REFERENCES clubs(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'removed')),
  joined_at timestamptz DEFAULT now()
);
ALTER TABLE club_members ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read club members"
  ON club_members FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own membership"
  ON club_members FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Club owners can update membership status"
  ON club_members FOR UPDATE
  TO authenticated
  USING (
    EXISTS (SELECT 1 FROM clubs WHERE clubs.id = club_members.club_id AND clubs.owner_id = auth.uid())
    OR auth.uid() = user_id
  )
  WITH CHECK (
    EXISTS (SELECT 1 FROM clubs WHERE clubs.id = club_members.club_id AND clubs.owner_id = auth.uid())
    OR auth.uid() = user_id
  );

-- Posts
CREATE TABLE IF NOT EXISTS posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  content text NOT NULL DEFAULT '',
  image_url text,
  tag text DEFAULT 'General',
  likes_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read posts"
  ON posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert own posts"
  ON posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Post Likes
CREATE TABLE IF NOT EXISTS post_likes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(post_id, user_id)
);
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read post likes"
  ON post_likes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can like posts"
  ON post_likes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can unlike posts"
  ON post_likes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Post Comments
CREATE TABLE IF NOT EXISTS post_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES posts(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  text text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE post_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read post comments"
  ON post_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can comment on posts"
  ON post_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Open Plays
CREATE TABLE IF NOT EXISTS open_plays (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sport text NOT NULL DEFAULT '',
  level text NOT NULL DEFAULT 'Intermediate',
  location text NOT NULL DEFAULT '',
  venue text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  time text NOT NULL DEFAULT '',
  max_slots integer NOT NULL DEFAULT 4,
  current_slots integer DEFAULT 0,
  description text DEFAULT '',
  organizer_id uuid REFERENCES profiles(id) ON DELETE SET NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE open_plays ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active open plays"
  ON open_plays FOR SELECT
  TO authenticated
  USING (is_active = true);

CREATE POLICY "Authenticated users can create open plays"
  ON open_plays FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = organizer_id);

CREATE POLICY "Organizers can update their open plays"
  ON open_plays FOR UPDATE
  TO authenticated
  USING (auth.uid() = organizer_id)
  WITH CHECK (auth.uid() = organizer_id);

-- Open Play Participants
CREATE TABLE IF NOT EXISTS open_play_participants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  open_play_id uuid REFERENCES open_plays(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  joined_at timestamptz DEFAULT now(),
  UNIQUE(open_play_id, user_id)
);
ALTER TABLE open_play_participants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read open play participants"
  ON open_play_participants FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can join open plays"
  ON open_play_participants FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can leave open plays"
  ON open_play_participants FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Notifications
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL DEFAULT '',
  source_user text DEFAULT '',
  detail text DEFAULT '',
  is_read boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reporter_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  target_type text NOT NULL DEFAULT '',
  target_id text DEFAULT '',
  target_name text DEFAULT '',
  category text NOT NULL DEFAULT '',
  narrative text DEFAULT '',
  attachment_url text,
  status text NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Resolved', 'Dismissed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = reporter_id);

CREATE POLICY "Users can submit reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = reporter_id);

-- Tournaments
CREATE TABLE IF NOT EXISTS tournaments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  sport text NOT NULL DEFAULT '',
  date text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  prize text DEFAULT '',
  description text DEFAULT '',
  status text DEFAULT 'Open',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE tournaments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read active tournaments"
  ON tournaments FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Tournament Registrations
CREATE TABLE IF NOT EXISTS tournament_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tournament_id uuid REFERENCES tournaments(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  registered_at timestamptz DEFAULT now(),
  UNIQUE(tournament_id, user_id)
);
ALTER TABLE tournament_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read tournament registrations"
  ON tournament_registrations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can register for tournaments"
  ON tournament_registrations FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_venue_id ON bookings(venue_id);
CREATE INDEX IF NOT EXISTS idx_club_members_club_id ON club_members(club_id);
CREATE INDEX IF NOT EXISTS idx_club_members_user_id ON club_members(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_comments_post_id ON post_comments(post_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_open_plays_sport ON open_plays(sport);
CREATE INDEX IF NOT EXISTS idx_venues_sport ON venues(sport);
CREATE INDEX IF NOT EXISTS idx_venues_location ON venues(location);
CREATE INDEX IF NOT EXISTS idx_reports_reporter_id ON reports(reporter_id);
