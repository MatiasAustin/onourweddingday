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
  // UUID for Nova from the screenshot
  const userId = '18730e54-4251-45de-af4a-1893c7e59926';

  const { data: invitations, error } = await supabase
    .from('Invitation')
    .select('*')
    .eq('userId', userId);
    
  if (error) {
    console.error('Error fetching invitation:', error);
    return;
  }
  
  if (!invitations || invitations.length === 0) {
    console.error('No invitation found for Nova');
    return;
  }
  
  const invitation = invitations[0];
  const settingsJSON = invitation.settingsJSON || {};
  
  const newGuests = [
    'Erisa & Matias', 'Angely', 'Om Ferdi', 'Om Bram', 'Om Dimas', 'Dewi Sri',
    'Siti Fitriah', 'Titin', 'Ellen', 'Eka', 'Lala', 'Rita', 'Siti Nurjannah',
    'Lucy', 'Indri Eka', 'Wahyuni', 'Riza', 'Teh Sri Sugiarti', 'Bunda Isal',
    'Mama Gwen', 'Fitria', 'Caca', 'Nadya & Fahru', 'Umi Haliza', 'Nida',
    'Syaiful', 'Lola', 'Febri', 'Dewi Srigaya', 'Mila', 'Anggi Pitaloka',
    'Mba Lilis', 'Mama Anton', 'A Aden', 'Teh Winny', 'Ibu Ria & bpk Edi',
    'Jehan', 'Teh Siti', 'Teh Tita', 'Bunpit', 'Rida', 'Daos', 'Kumis',
    'Komeng', 'Kadut', 'Sendi', 'Aldi', 'Reza pakopen', 'Dede nurhidayat',
    'Aditya', 'Fazriel', 'Angga', 'gemblong', 'Agung', 'Usman', 'Ramdan njang',
    'Hasbi', 'Bayu', 'Khalil', 'Hasfi', 'Bayu dede ramadhan', 'Sety', 'Hilda',
    'Riska', 'Khoerudin', 'Cahri', 'Angga', 'Kimung'
  ];
  
  const guestList = newGuests.map(name => ({ id: crypto.randomUUID(), name: name, isSent: false }));
  
  settingsJSON.guestList = guestList;
  
  // Notice that RLS for update Invitation to anonymous might fail if we don't have RLS fixed or use admin. 
  // Let's try it first.
  const { error: updateError } = await supabase
    .from('Invitation')
    .update({ settingsJSON })
    .eq('id', invitation.id);
    
  if (updateError) {
    console.error('Error updating invitation:', updateError);
  } else {
    console.log('Successfully updated guest list for Nova!');
  }
}

run();
