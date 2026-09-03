"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteGuestbookEntry(entryId: string) {
  try {
    const supabase = await createClient();
    
    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
      .from('Guestbook')
      .delete()
      .eq('id', entryId);

    if (error) throw error;
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function toggleGuestbookVisibility(entryId: string, isVisible: boolean) {
  try {
    const supabase = await createClient();
    
    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");

    const { error } = await supabase
      .from('Guestbook')
      .update({ isVisible })
      .eq('id', entryId);

    if (error) throw error;
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function updateGuestList(invitationId: string, guestList: any[]) {
  try {
    const supabase = await createClient();
    
    // Auth check
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("Unauthorized");
    
    const { data: invitation } = await supabase
      .from('Invitation')
      .select('settingsJSON')
      .eq('id', invitationId)
      .single();
      
    if (!invitation) throw new Error("Invitation not found");
    
    const newSettingsJSON = {
      ...(invitation.settingsJSON || {}),
      guestList
    };
    
    const { error } = await supabase
      .from('Invitation')
      .update({ settingsJSON: newSettingsJSON })
      .eq('id', invitationId);
      
    if (error) throw error;
    
    revalidatePath('/', 'layout');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}
