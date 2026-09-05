import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import crypto from 'crypto';

const envFile = fs.readFileSync('.env', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim().replace(/["']/g, '');
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
async function run() {
  const res = await supabase.from('User').insert({
    id: crypto.randomUUID(),
    supabaseId: '815dd1ca-ce54-4d9d-9c41-2dc0495464c3',
    email: 'novanursaniah45@gmail.com',
    role: 'CLIENT',
    updatedAt: new Date().toISOString()
  });
  console.log(res);
}
run();
