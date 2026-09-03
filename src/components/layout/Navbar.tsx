import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let dbUser = null;
  if (user) {
    const { data } = await supabase.from('User').select('role').eq('supabaseId', user.id).single();
    dbUser = data;
  }

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <div className="flex items-center shrink-0">
            <Link href="/" className="font-serif text-xl sm:text-2xl font-bold text-primary tracking-tight">
              <span className="hidden sm:inline">OnOurWeddingDay</span>
              <span className="sm:hidden">OOWD</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="#templates" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Templates
            </Link>
            <Link href="#pricing" className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors">
              Pricing
            </Link>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 shrink-0">
            {user ? (
              <>
                <Link href={dbUser?.role === 'ADMIN' ? "/dashboard" : "/client-dashboard"} className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors font-medium mr-2 sm:mr-4">
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors px-2 py-1">
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-sm sm:text-base text-foreground/80 hover:text-primary transition-colors font-medium px-2 py-1">
                  Log In
                </Link>
                <Link href="/sign-up" className="bg-primary text-white text-sm sm:text-base px-4 py-2 sm:px-5 sm:py-2.5 rounded-full font-medium hover:bg-primary-light transition-colors shadow-sm">
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
