-- Create the business_ledger table
CREATE TABLE IF NOT EXISTS public.business_ledger (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
    amount NUMERIC NOT NULL,
    vendor TEXT NOT NULL,
    category TEXT,
    items JSONB DEFAULT '[]'::jsonb
);

-- Turn on Row Level Security (RLS) but allow authenticated inserts (setup basic policies later if needed)
-- For MVP we just use the service role key to bypass RLS.
