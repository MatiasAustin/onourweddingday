'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/sign-in?message=Could not authenticate user')
  }

  // Fetch user role after successful login
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data: dbUser } = await supabase.from('User').select('role').eq('supabaseId', user.id).single()
    
    revalidatePath('/', 'layout')
    
    if (dbUser?.role === 'ADMIN') {
      redirect('/dashboard')
    } else {
      redirect('/client-dashboard')
    }
  }

  revalidatePath('/', 'layout')
  redirect('/client-dashboard')
}
