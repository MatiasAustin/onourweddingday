import { Sidebar } from "@/components/admin/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { data: dbUser } = await supabase.from('User').select('*').eq('supabaseId', user.id).single();
  
  if (!dbUser || dbUser.role !== "ADMIN") {
    // Redirect non-admins to a normal user dashboard (or home for now)
    // redirect("/");
    // TODO: Temporarily allowing access to dashboard. Remove this comment when ready to enforce admin roles.
  }

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-secondary/10 p-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
