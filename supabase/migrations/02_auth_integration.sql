-- Migration for User Authentication logic
ALTER TABLE public.business_ledger 
ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id);

-- Optional: Create basic profiles table mapping to auth.users for Business Name and Language Preference
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    business_name TEXT,
    preferred_language TEXT DEFAULT 'en-IN'
);

-- Note: RLS policies should be applied in Supabase dashboard
-- Example: CREATE POLICY "Individuals can view their own ledger." ON business_ledger FOR SELECT USING (auth.uid() = user_id);
