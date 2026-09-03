"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Paintbrush } from "lucide-react";


const navigation = [
  { name: "Dashboard", href: "/client-dashboard", icon: LayoutDashboard },
  { name: "My Invitations", href: "/client-dashboard/invitations", icon: Paintbrush },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen w-64 flex-col border-r border-secondary/50 bg-background/50 backdrop-blur-xl shrink-0">
        <div className="flex h-20 shrink-0 items-center px-6 border-b border-secondary/50">
          <Link href="/" className="font-serif text-2xl font-semibold text-primary">
            OOWD Client
          </Link>
        </div>
        
        <nav className="flex flex-1 flex-col px-4 py-6 overflow-y-auto space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/client-dashboard');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-x-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-sm"
                    : "text-foreground/70 hover:bg-secondary/30 hover:text-primary"
                }`}
              >
                <item.icon className={`h-5 w-5 ${isActive ? "text-white" : "text-foreground/50"}`} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-secondary/50 p-4">
          <form action="/auth/signout" method="post">
            <button type="submit" className="w-full flex items-center gap-x-4 px-4 py-3 rounded-xl hover:bg-secondary/20 transition-colors text-left text-red-500 hover:text-red-600">
              <span className="text-sm font-medium">Log out</span>
            </button>
          </form>
        </div>
      </div>

      {/* Mobile Bottom Navigation & Top Header */}
      <div className="md:hidden flex flex-col shrink-0">
        <div className="flex h-16 shrink-0 items-center px-4 border-b border-secondary/50 bg-background">
          <Link href="/" className="font-serif text-xl font-semibold text-primary">
            OOWD Client
          </Link>
          <div className="ml-auto">
            <form action="/auth/signout" method="post">
              <button type="submit" className="text-sm font-medium text-red-500 px-3 py-1.5 rounded-lg border border-red-200">
                Logout
              </button>
            </form>
          </div>
        </div>
        
        <div className="fixed bottom-0 left-0 w-full bg-background border-t border-secondary/50 flex items-center justify-around z-50 px-2 py-2 pb-safe">
          {navigation.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/client-dashboard');
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex flex-col items-center justify-center p-2 rounded-xl flex-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-foreground/50"
                }`}
              >
                <div className={`mb-1 p-1.5 rounded-full ${isActive ? 'bg-primary/10' : ''}`}>
                  <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : "text-foreground/50"}`} />
                </div>
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
