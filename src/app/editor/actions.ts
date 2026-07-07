"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function updateInvitationSettings(invitationId: string, settingsJSON: any) {
  const supabase = await createClient();
  
  try {
    const { error } = await supabase
      .from('Invitation')
      .update({ 
        settingsJSON,
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
