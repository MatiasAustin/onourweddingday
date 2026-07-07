import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { BlockRenderer } from "@/components/blocks/BlockRenderer";
import Experience from "@/components/3d-invitation/Experience";

interface InvitationPageProps {
  params: Promise<{
    invitationSlug: string;
  }>;
}

export default async function InvitationPage({ params }: InvitationPageProps) {
  // In Next.js 15, params is a Promise that must be awaited
  const { invitationSlug } = await params;
  const supabase = await createClient();

  // Attempt to fetch the invitation and its active sections from the database
  let invitation;
  try {
    const { data } = await supabase
      .from('Invitation')
      .select('*, sections:Section(*)')
      .eq('slug', invitationSlug)
      .eq('status', 'PUBLISHED')
      .single();
      
    if (data) {
      // Filter visible sections and sort by order
      const sortedSections = (data.sections || [])
        .filter((s: any) => s.isVisible)
        .sort((a: any, b: any) => a.order - b.order);
        
      invitation = { ...data, sections: sortedSections };
    }
  } catch (error) {
    // If the database is not connected yet, we'll log the error but still throw 404
    // so the page doesn't crash catastrophically during development without DB.
    console.error("Database error fetching invitation:", error);
    invitation = null;
  }

  // If the invitation doesn't exist, show Next.js 404
  if (!invitation) {
    notFound();
  }

  // Parse global settings if they exist (e.g., custom colors, fonts)
  // For now, we rely on the global layout styles defined in layout.tsx
  // const globalSettings = invitation.settingsJSON as any;

  // Determine which template to render
  if (invitation.templateId === "elegance-3d") {
    return (
      <Experience data={invitation.settingsJSON || {}}>
        <main className="w-full flex flex-col items-center py-32 px-8">
          {invitation.sections.map((section: any) => (
            <BlockRenderer
              key={section.id}
              type={section.type}
              contentJSON={section.contentJSON}
              animationSettingsJSON={section.animationSettingsJSON}
            />
          ))}
          
          {/* If there are no sections added yet, show a beautiful fallback so it's not completely empty */}
          {(!invitation.sections || invitation.sections.length === 0) && (
            <div className="max-w-3xl text-center">
              <h2 className="font-serif text-4xl text-[#500000] mb-4">Informasi Acara</h2>
              <p className="font-sans text-lg text-[#500000]/70">
                Detail acara pernikahan sedang dipersiapkan. Silakan kembali lagi nanti untuk melihat pembaruan.
              </p>
            </div>
          )}
        </main>
      </Experience>
    );
  }

  // Default Template Fallback
  return (
    <main className="min-h-screen flex flex-col bg-background text-foreground">
      {invitation.sections.map((section: any) => (
        <BlockRenderer
          key={section.id}
          type={section.type}
          contentJSON={section.contentJSON}
          animationSettingsJSON={section.animationSettingsJSON}
        />
      ))}
    </main>
  );
}
