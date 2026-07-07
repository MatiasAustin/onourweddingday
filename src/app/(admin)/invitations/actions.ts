"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { Status } from "@prisma/client";

export async function createInvitation(formData: FormData) {
  const userId = formData.get("userId") as string;
  const templateId = formData.get("templateId") as string;
  const title = formData.get("title") as string;
  const slug = formData.get("slug") as string;

  if (!userId || !templateId || !title || !slug) {
    return { error: "Missing required fields" };
  }

  // Check if slug exists
  const existing = await prisma.invitation.findUnique({ where: { slug } });
  if (existing) {
    return { error: "Slug already exists. Please choose a different URL slug." };
  }

  const template = await prisma.template.findUnique({
    where: { id: templateId }
  });

  if (!template) return { error: "Template not found" };

  try {
    const invitation = await prisma.invitation.create({
      data: {
        userId,
        templateId,
        title,
        slug,
        status: "DRAFT",
        settingsJSON: {},
      }
    });

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
      }));
      await prisma.section.createMany({ data: sectionData });
    }

    revalidatePath("/(admin)/invitations");
    return { success: true, invitation };
  } catch (error: any) {
    console.error("Failed to create invitation", error);
    return { error: error.message || "Failed to create invitation" };
  }
}

export async function updateInvitationStatus(id: string, status: Status) {
  try {
    await prisma.invitation.update({
      where: { id },
      data: { status }
    });
    revalidatePath("/(admin)/invitations");
    return { success: true };
  } catch (error: any) {
    return { error: "Failed to update status" };
  }
}
