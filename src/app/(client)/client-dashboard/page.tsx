import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { Paintbrush, ExternalLink } from "lucide-react";

export default async function ClientDashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: dbUser } = await supabase.from('User').select('id').eq('supabaseId', user.id).single();

  const { data: invitations } = await supabase
    .from('Invitation')
    .select('*')
    .eq('userId', dbUser?.id)
    .order('createdAt', { ascending: false });

  return (
    <div>
      <h1 className="font-serif text-3xl font-semibold text-foreground mb-8">Welcome to Your Dashboard</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Your Invitations</h2>
        
        {(!invitations || invitations.length === 0) ? (
          <div className="bg-white rounded-2xl border border-secondary/50 p-8 text-center shadow-sm">
            <p className="text-foreground/60 mb-4">You do not have any invitations yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {invitations.map((invitation: any) => (
              <div key={invitation.id} className="bg-white rounded-2xl border border-secondary/50 p-6 shadow-sm flex flex-col">
                <h3 className="font-semibold text-lg mb-2">{invitation.title || "Untitled Invitation"}</h3>
                <p className="text-sm text-foreground/60 mb-4">Slug: /{invitation.slug}</p>
                <div className="mt-auto flex items-center gap-3">
                  <Link 
                    href={`/client-dashboard/invitations/${invitation.id}`}
                    className="flex-1 bg-primary text-white text-center py-2 rounded-xl text-sm font-medium hover:bg-primary/90 transition-colors"
                  >
                    Manage
                  </Link>
                  <a 
                    href={`/${invitation.slug}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-2 border border-secondary rounded-xl hover:bg-secondary/10 transition-colors text-primary"
                  >
                    <ExternalLink className="w-5 h-5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
