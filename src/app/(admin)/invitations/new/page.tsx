import { createClient } from "@/utils/supabase/server";
import NewInvitationForm from "./NewInvitationForm";

export default async function NewInvitationPage() {
  const supabase = await createClient();
  
  // We fetch templates so the user can select one
  const { data: templates } = await supabase.from("Template").select("*").order("name", { ascending: true });
  
  // We fetch users (clients) so the admin can assign this invitation to someone
  const { data: users } = await supabase.from("User").select("id, email");

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <NewInvitationForm templates={templates || []} users={users || []} />
    </div>
  );
}
