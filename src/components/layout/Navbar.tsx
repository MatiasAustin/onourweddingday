import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-md border-b border-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="font-serif text-2xl font-semibold text-primary">
              OnOurWeddingDay
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link href="/" className="text-foreground/80 hover:text-primary transition-colors">Home</Link>
            <Link href="#templates" className="text-foreground/80 hover:text-primary transition-colors">Templates</Link>
            <Link href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="text-foreground/80 hover:text-primary transition-colors">Pricing</Link>
          </div>

          <div className="flex items-center space-x-4">
            {userId ? (
              <>
                <Link href="/dashboard" className="text-foreground/80 hover:text-primary transition-colors font-medium mr-4">
                  Dashboard
                </Link>
                <UserButton />
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-foreground/80 hover:text-primary transition-colors font-medium">
                  Log In
                </Link>
                <Link href="/sign-up" className="bg-primary text-white px-5 py-2.5 rounded-full font-medium hover:bg-primary-light transition-colors shadow-sm">
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
