import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-bold text-primary tracking-tight">
              OnOurWeddingDay
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

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors font-medium mr-4">
                  Dashboard
                </Link>
                <form action="/auth/signout" method="post">
                  <button type="submit" className="text-sm font-medium text-red-500 hover:text-red-600 transition-colors">
                    Log out
                  </button>
                </form>
              </>
            ) : (
              <>
                <Link href="/login" className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  Log In
                </Link>
                <Link href="/login" className="bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-light transition-colors shadow-sm">
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
