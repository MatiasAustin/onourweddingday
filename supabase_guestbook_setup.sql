-- Create the Guestbook table
CREATE TABLE public."Guestbook" (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    "invitationId" uuid REFERENCES public."Invitation"(id) ON DELETE CASCADE,
    name text NOT NULL,
    attendance text,
    "guestsCount" integer DEFAULT 1,
    message text,
    "createdAt" timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public."Guestbook" ENABLE ROW LEVEL SECURITY;

-- Policy: Allow everyone (public/anon) to read guestbook entries
CREATE POLICY "Allow public select from Guestbook"
ON public."Guestbook" FOR SELECT TO public
USING (true);

-- Policy: Allow everyone (public/anon) to submit a guestbook entry
CREATE POLICY "Allow public insert to Guestbook"
ON public."Guestbook" FOR INSERT TO public
WITH CHECK (true);

-- Policy: Allow authenticated users (Admin/Client) to delete entries
CREATE POLICY "Allow auth delete Guestbook"
ON public."Guestbook" FOR DELETE TO authenticated
USING (true);
