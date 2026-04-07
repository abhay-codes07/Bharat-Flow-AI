-- Add status column to business_ledger to support Pending states for Payment Recovery Feature
ALTER TABLE public.business_ledger 
ADD COLUMN IF NOT EXISTS status TEXT NOT NULL DEFAULT 'completed' CHECK (status IN ('completed', 'pending'));
