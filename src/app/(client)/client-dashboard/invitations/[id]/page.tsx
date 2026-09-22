import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { InvitationManager } from "@/components/client/InvitationManager";

export default async function ClientInvitationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  
  // Verify ownership
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return notFound();
  const { data: dbUser } = await supabase.from('User').select('id').eq('supabaseId', user.id).single();
  
  const { data: invitation } = await supabase
    .from('Invitation')
    .select('*')
    .eq('id', id)
    .eq('userId', dbUser?.id)
    .single();
    
  if (!invitation) return notFound();

  // Fetch guestbook
  const { data: guestbookEntries } = await supabase
    .from('Guestbook')
    .select('*')
    .eq('invitationId', id)
    .order('createdAt', { ascending: false });

  // Get guest list from settingsJSON if any
  const settingsJSON = invitation.settingsJSON || {};
  const guestList = settingsJSON.guestList || [];

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-foreground mb-2">Manage: {invitation.title || "Invitation"}</h1>
      <p className="text-foreground/60 mb-8">Slug: /{invitation.slug}</p>
      
      <InvitationManager 
        invitationId={id} 
        invitationSlug={invitation.slug}
        initialGuestbook={guestbookEntries || []}
        initialGuestList={guestList}
      />
    </div>
  );
}
