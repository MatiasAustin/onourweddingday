import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim().replace(/["']/g, '');
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  // 1. Get old user id
  const { data: oldUser, error: err1 } = await supabase.from('User').select('id').eq('email', 'nova@client.com').single();
  if (err1 || !oldUser) {
    console.error('Failed to get old user', err1);
    return;
  }
  
  // 2. Get new user id
  const { data: newUser, error: err2 } = await supabase.from('User').select('id').eq('email', 'novanursaniah45@gmail.com').single();
  if (err2 || !newUser) {
    console.error('Failed to get new user', err2);
    return;
  }
  
  console.log('Old user ID:', oldUser.id);
  console.log('New user ID:', newUser.id);

  // 3. Update Invitation
  const { data: updateRes, error: err3 } = await supabase
    .from('Invitation')
    .update({ userId: newUser.id })
    .eq('userId', oldUser.id)
    .select();

  if (err3) {
    console.error('Failed to update invitation', err3);
  } else {
    console.log('Successfully updated invitation:', updateRes);
  }
}
run();
