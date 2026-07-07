"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createInvitation(formData: FormData) {
  const supabase = await createClient();
  const userId = formData.get("userId") as string;
  const templateId = formData.get("templateId") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;

  if (!userId || !templateId || !title || !slug) {
    return { error: "Missing required fields" };
  }

  // Check if slug exists
  const { data: existing } = await supabase.from('Invitation').select('id').eq('slug', slug).maybeSingle();
  if (existing) {
    return { error: "Slug already exists. Please choose a different URL slug." };
  }

  const { data: template } = await supabase.from('Template').select('*').eq('id', templateId).single();

  if (!template) return { error: "Template not found" };

  try {
    const { data: invitation, error: createError } = await supabase.from('Invitation').insert({
      userId,
      templateId,
      title,
      slug,
      status: "DRAFT",
      settingsJSON: {},
      updatedAt: new Date().toISOString()
    }).select().single();

    if (createError || !invitation) {
      throw createError || new Error("Failed to create invitation record");
    }

    // Create sections based on template defaultSectionsJSON
    let defaultSections: any[] = [];
    if (template.defaultSectionsJSON) {
      if (typeof template.defaultSectionsJSON === 'string') {
        try {
          defaultSections = JSON.parse(template.defaultSectionsJSON);
        } catch (e) {}
      } else if (Array.isArray(template.defaultSectionsJSON)) {
        defaultSections = template.defaultSectionsJSON;
      }
    }

    if (defaultSections.length > 0) {
      const sectionData = defaultSections.map((section, idx) => ({
        invitationId: invitation.id,
        type: section.type || 'hero',
        order: idx,
        contentJSON: section.contentJSON || {},
        animationSettingsJSON: section.animationSettingsJSON || {},
        updatedAt: new Date().toISOString()
      }));
      await supabase.from('Section').insert(sectionData);
    }

    revalidatePath("/(admin)/invitations");
    return { success: true, invitation };
  } catch (error: any) {
    console.error("Failed to create invitation", error);
    return { error: error.message || "Failed to create invitation" };
  }
}

export async function updateInvitationStatus(id: string, status: string) {
  const supabase = await createClient();
  try {
    await supabase.from('Invitation').update({ 
      status,
      updatedAt: new Date().toISOString()
    }).eq('id', id);
    
    revalidatePath("/(admin)/invitations");
    return { success: true };
  } catch (error: any) {
    return { error: "Failed to update status" };
  }
}
