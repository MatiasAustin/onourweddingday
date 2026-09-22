"use server";

import { createClient } from "@/utils/supabase/server";

export async function getSiteSettings() {
  const supabase = await createClient();
  
  try {
    const { data, error } = await supabase.storage.from('media').download('settings.json');
    if (error) {
      if (error.message.includes('Object not found')) {
        return { success: true, settings: {} };
      }
      return { success: false, error: error.message };
    }
    
    const text = await data.text();
    return { success: true, settings: JSON.parse(text) };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function saveSiteSettings(settings: any) {
  const supabase = await createClient();
  
  // Verify admin
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, error: 'Unauthorized' };
  
  try {
    const { error } = await supabase.storage
      .from('media')
      .upload('settings.json', JSON.stringify(settings), {
        contentType: 'application/json',
        upsert: true
      });
      
    if (error) return { success: false, error: error.message };
    
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
