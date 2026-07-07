'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'


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

  // Create User record in public schema using Supabase client
  if (authData.user) {
    try {
      await supabase.from('User').insert({
        supabaseId: authData.user.id,
        email: authData.user.email,
        role: 'CLIENT',
        updatedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error("User creation failed", e);
    }
  }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
