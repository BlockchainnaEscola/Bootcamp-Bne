-- Create profiles table
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  wallet_address text NOT NULL UNIQUE,
  name text NOT NULL,
  school text NOT NULL,
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Create activity_completions table to track on-chain activities
CREATE TABLE public.activity_completions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  activity_id integer NOT NULL,
  day integer NOT NULL,
  tx_hash text NOT NULL,
  reward_amount integer NOT NULL,
  completed_at timestamp with time zone DEFAULT now() NOT NULL,
  UNIQUE(user_id, activity_id, day)
);

-- Create badges table to track NFT badges
CREATE TABLE public.badges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id integer NOT NULL,
  badge_name text NOT NULL,
  token_id text,
  tx_hash text NOT NULL,
  minted_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view all profiles"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Activity completions policies
CREATE POLICY "Users can view all activity completions"
  ON public.activity_completions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own completions"
  ON public.activity_completions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Badges policies
CREATE POLICY "Users can view all badges"
  ON public.badges FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their own badges"
  ON public.badges FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();