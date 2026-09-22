-- Mengaktifkan RLS dan membuat kebijakan (policy) untuk tabel User
ALTER TABLE public."User" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select User" ON public."User";
CREATE POLICY "Allow public select User"
ON public."User" FOR SELECT TO public
USING (true);

DROP POLICY IF EXISTS "Allow public insert User" ON public."User";
CREATE POLICY "Allow public insert User"
ON public."User" FOR INSERT TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow auth update User" ON public."User";
CREATE POLICY "Allow auth update User"
ON public."User" FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

-- Mengaktifkan RLS dan membuat kebijakan untuk tabel Invitation
ALTER TABLE public."Invitation" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select Invitation" ON public."Invitation";
CREATE POLICY "Allow public select Invitation"
ON public."Invitation" FOR SELECT TO public
USING (true);

DROP POLICY IF EXISTS "Allow public insert Invitation" ON public."Invitation";
CREATE POLICY "Allow public insert Invitation"
ON public."Invitation" FOR INSERT TO public
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow auth update Invitation" ON public."Invitation";
CREATE POLICY "Allow auth update Invitation"
ON public."Invitation" FOR UPDATE TO authenticated
USING (true)
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow auth delete Invitation" ON public."Invitation";
CREATE POLICY "Allow auth delete Invitation"
ON public."Invitation" FOR DELETE TO authenticated
USING (true);

-- Mengaktifkan RLS dan membuat kebijakan untuk tabel Template
ALTER TABLE public."Template" ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public select Template" ON public."Template";
CREATE POLICY "Allow public select Template"
ON public."Template" FOR SELECT TO public
USING (true);
