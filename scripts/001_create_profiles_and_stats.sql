-- Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "profiles_delete_own" ON public.profiles FOR DELETE USING (auth.uid() = id);

-- Allow public read of profiles (for hiscores)
CREATE POLICY "profiles_select_all" ON public.profiles FOR SELECT USING (true);

-- Create player stats table (21 OSRS skills)
CREATE TABLE IF NOT EXISTS public.player_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  attack_level INT DEFAULT 1,
  attack_xp BIGINT DEFAULT 0,
  defence_level INT DEFAULT 1,
  defence_xp BIGINT DEFAULT 0,
  strength_level INT DEFAULT 1,
  strength_xp BIGINT DEFAULT 0,
  hitpoints_level INT DEFAULT 10,
  hitpoints_xp BIGINT DEFAULT 1154,
  ranged_level INT DEFAULT 1,
  ranged_xp BIGINT DEFAULT 0,
  prayer_level INT DEFAULT 1,
  prayer_xp BIGINT DEFAULT 0,
  magic_level INT DEFAULT 1,
  magic_xp BIGINT DEFAULT 0,
  cooking_level INT DEFAULT 1,
  cooking_xp BIGINT DEFAULT 0,
  woodcutting_level INT DEFAULT 1,
  woodcutting_xp BIGINT DEFAULT 0,
  fletching_level INT DEFAULT 1,
  fletching_xp BIGINT DEFAULT 0,
  fishing_level INT DEFAULT 1,
  fishing_xp BIGINT DEFAULT 0,
  firemaking_level INT DEFAULT 1,
  firemaking_xp BIGINT DEFAULT 0,
  crafting_level INT DEFAULT 1,
  crafting_xp BIGINT DEFAULT 0,
  smithing_level INT DEFAULT 1,
  smithing_xp BIGINT DEFAULT 0,
  mining_level INT DEFAULT 1,
  mining_xp BIGINT DEFAULT 0,
  herblore_level INT DEFAULT 1,
  herblore_xp BIGINT DEFAULT 0,
  agility_level INT DEFAULT 1,
  agility_xp BIGINT DEFAULT 0,
  thieving_level INT DEFAULT 1,
  thieving_xp BIGINT DEFAULT 0,
  slayer_level INT DEFAULT 1,
  slayer_xp BIGINT DEFAULT 0,
  farming_level INT DEFAULT 1,
  farming_xp BIGINT DEFAULT 0,
  runecraft_level INT DEFAULT 1,
  runecraft_xp BIGINT DEFAULT 0,
  total_level INT GENERATED ALWAYS AS (
    attack_level + defence_level + strength_level + hitpoints_level +
    ranged_level + prayer_level + magic_level + cooking_level +
    woodcutting_level + fletching_level + fishing_level + firemaking_level +
    crafting_level + smithing_level + mining_level + herblore_level +
    agility_level + thieving_level + slayer_level + farming_level + runecraft_level
  ) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.player_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "stats_select_own" ON public.player_stats FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "stats_insert_own" ON public.player_stats FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "stats_update_own" ON public.player_stats FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "stats_delete_own" ON public.player_stats FOR DELETE USING (auth.uid() = user_id);

-- Allow public read of stats (for hiscores)
CREATE POLICY "stats_select_all" ON public.player_stats FOR SELECT USING (true);

-- Trigger: auto-create profile + stats on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data ->> 'username', split_part(new.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.player_stats (user_id)
  VALUES (new.id)
  ON CONFLICT DO NOTHING;

  RETURN new;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();
