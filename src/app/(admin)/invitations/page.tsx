import { createClient } from "@/utils/supabase/server";
import { InvitationsClient } from "./InvitationsClient";

export default async function InvitationsPage() {
  const supabase = await createClient();

  const { data: invitations } = await supabase
    .from('Invitation')
    .select('*, user:User(*), template:Template(*)')
    .order('createdAt', { ascending: false });

  const { data: users } = await supabase
    .from('User')
    .select('id, email')
    .eq('role', 'CLIENT');

  const { data: templates } = await supabase
    .from('Template')
    .select('id, name');

  return (
    <div>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-semibold text-foreground">Client Invitations</h1>
          <p className="text-foreground/60 mt-2">Manage live client products, create new invitations, and update statuses.</p>
        </div>
      </div>
      
      <InvitationsClient 
        initialInvitations={invitations} 
        users={users} 
        templates={templates} 
      />
    </div>
  );
}
