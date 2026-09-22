import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import crypto from 'crypto';

const envFile = fs.readFileSync('.env', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim().replace(/['"]/g, '');
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const testEmail = 'test_' + Date.now() + '@gmail.com';
  console.log('Signing up:', testEmail);
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: testEmail,
    password: 'password123'
  });
  if (authError) return console.error('Auth Error:', authError.message);
  
  const { error: insertError } = await supabase.from('User').insert({
    id: crypto.randomUUID(),
    supabaseId: authData.user.id,
    email: testEmail,
    role: 'CLIENT',
    updatedAt: new Date().toISOString()
  });
  if (insertError) console.error('Insert Error:', insertError.message);
  
  const { data: readData, error: readError } = await supabase.from('User').select('*').eq('supabaseId', authData.user.id).single();
  console.log('Read Data:', readData);
  if (readError) console.error('Read Error:', readError.message);
}
run();
