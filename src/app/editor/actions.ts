"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInvitationSettings(invitationId: string, settingsJSON: any) {
  const supabase = await createClient();
  
  try {
    // Fetch current settings to prevent overwriting non-editor data like guestList
    const { data: currentInv } = await supabase
      .from('Invitation')
      .select('settingsJSON')
      .eq('id', invitationId)
      .single();
      
    const currentSettings = currentInv?.settingsJSON || {};
    const mergedSettings = {
      ...currentSettings,
      ...settingsJSON,
      // explicitly preserve guestList if it exists and isn't provided by the editor
      guestList: settingsJSON.guestList || currentSettings.guestList
    };

    const { error } = await supabase
      .from('Invitation')
      .update({ 
        settingsJSON: mergedSettings,
        updatedAt: new Date().toISOString()
      })
      .eq('id', invitationId);

    if (error) throw error;
    
    // Revalidate paths that might display this invitation
    revalidatePath("/(admin)/invitations");
    // We can't revalidate the dynamic slug easily here unless we know it, 
    // but the next fetch will get fresh data anyway.
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update settings", error);
    return { error: error.message || "Failed to update settings" };
  }
}
