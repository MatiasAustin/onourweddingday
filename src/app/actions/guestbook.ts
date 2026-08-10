"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitGuestbookEntry(data: {
  invitationId: string;
  name: string;
  attendance: string;
  guestsCount: number;
  message: string;
}) {
  try {
    const supabase = await createClient();
    
    // We insert into the Guestbook table
    const { error } = await supabase
      .from("Guestbook")
      .insert([
        {
          invitationId: data.invitationId,
          name: data.name,
          attendance: data.attendance,
          guestsCount: data.guestsCount,
          message: data.message,
        }
      ]);

    if (error) {
      console.error("Supabase insert error:", error);
      throw error;
    }

    return { success: true };
  } catch (error: any) {
    console.error("Failed to submit guestbook entry:", error);
    return { error: error.message || "Failed to submit" };
  }
}

export async function getGuestbookEntries(invitationId: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from("Guestbook")
      .select("*")
      .eq("invitationId", invitationId)
      .order("createdAt", { ascending: false });

    if (error) throw error;
    
    return { data };
  } catch (error: any) {
    console.error("Failed to fetch guestbook entries:", error);
    return { data: [] };
  }
}
