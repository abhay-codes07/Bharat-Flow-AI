-- Transitioning from native Supabase Auth (UUID) to Clerk Auth (TEXT clerk_id)
ALTER TABLE public.business_ledger 
ADD COLUMN IF NOT EXISTS clerk_id TEXT;

-- We could drop user_id if we strictly use clerk_id, but keeping it for backward compatibility MVP
-- ALTER TABLE public.business_ledger DROP COLUMN user_id;

-- Create user profiles table mapped to Clerk ID
CREATE TABLE IF NOT EXISTS public.clerk_profiles (
    clerk_id TEXT PRIMARY KEY,
    business_name TEXT,
    gstin TEXT,
    stripe_customer_id TEXT,
    subscription_status TEXT DEFAULT 'free',
    preferred_language TEXT DEFAULT 'en-IN',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Note: RLS policies will need to reference `clerk_id` instead of `auth.uid()`.
-- Clerk provides Supabase JWT integration which allows grabbing request.jwt.claim('sub') in Postgres.
