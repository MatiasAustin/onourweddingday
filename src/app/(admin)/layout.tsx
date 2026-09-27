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

  let { data: dbUser, error } = await supabase.from('User').select('*').eq('supabaseId', user.id).single();
  
  if (!dbUser && user.email) {
    const { data: userByEmail } = await supabase.from('User').select('*').eq('email', user.email).single();
    if (userByEmail) {
      await supabase.from('User').update({ supabaseId: user.id }).eq('id', userByEmail.id);
      dbUser = { ...userByEmail, supabaseId: user.id };
    }
  }
  
  console.log("Admin Layout Auth User ID:", user.id);
  console.log("Admin Layout DB User:", dbUser);
  console.log("Admin Layout Error:", error);

  if (!dbUser || dbUser.role !== "ADMIN") {
    // Redirect non-admins to their specific dashboard
    redirect("/client-dashboard");
  }

  return (
    <div className="flex flex-col md:flex-row h-screen overflow-hidden bg-background">
      <Sidebar />
      <main className="flex-1 overflow-y-auto bg-secondary/10 p-4 md:p-8 pb-24 md:pb-8">
        <div className="mx-auto max-w-6xl">
          {children}
        </div>
      </main>
    </div>
  );
}
