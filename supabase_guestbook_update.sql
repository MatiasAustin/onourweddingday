-- Update existing Guestbook table to add isVisible column
ALTER TABLE public."Guestbook" 
ADD COLUMN IF NOT EXISTS "isVisible" boolean DEFAULT true NOT NULL;

-- Allow authenticated users to update entries
CREATE POLICY "Allow auth update Guestbook"
ON public."Guestbook" FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);
