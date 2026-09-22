import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';

const envFile = fs.readFileSync('.env', 'utf8');
const env = envFile.split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key && val.length) acc[key.trim()] = val.join('=').trim().replace(/['"]/g, '');
  return acc;
}, {});

const supabase = createClient(env.NEXT_PUBLIC_SUPABASE_URL, env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function run() {
  const userId = '18730e54-4251-45de-af4a-1893c7e59926';

  const { data: invitations } = await supabase
    .from('Invitation')
    .select('*')
    .eq('userId', userId);
    
  console.log('Total guests:', invitations[0].settingsJSON.guestList.length);
}
run();
