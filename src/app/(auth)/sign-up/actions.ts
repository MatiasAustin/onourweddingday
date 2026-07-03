'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'
import { prisma } from '@/lib/prisma'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: authData, error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/sign-up?message=Could not create user: ' + error.message)
  }

  // Also create a Prisma user here if needed, but it's better to do it via Supabase webhook or on first login.
  // For simplicity right now, we create it directly:
  if (authData.user) {
    try {
      await prisma.user.create({
        data: {
          supabaseId: authData.user.id,
          email: authData.user.email!,
          role: 'CLIENT'
        }
      });
    } catch (e) {
      console.error("Prisma user creation failed", e);
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
