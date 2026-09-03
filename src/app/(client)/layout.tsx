import { Sidebar } from "@/components/client/Sidebar";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function ClientLayout({
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
  
  if (!dbUser || dbUser.role === "ADMIN") {
    // If admin, maybe redirect to /dashboard
    if (dbUser?.role === "ADMIN") redirect("/dashboard");
    redirect("/");
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
