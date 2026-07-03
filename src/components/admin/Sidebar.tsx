"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LayoutTemplate, ShoppingCart, Users, Settings, LogOut, Paintbrush } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Invitations", href: "/invitations", icon: Paintbrush },
  { name: "Templates", href: "/templates", icon: LayoutTemplate },
  { name: "Orders", href: "/orders", icon: ShoppingCart },
  { name: "Users", href: "/users", icon: Users },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-64 flex-col border-r border-secondary/50 bg-background/50 backdrop-blur-xl">
      <div className="flex h-20 shrink-0 items-center px-6 border-b border-secondary/50">
        <Link href="/" className="font-serif text-2xl font-semibold text-primary">
          OOWD Admin
        </Link>
      </div>
      
      <nav className="flex flex-1 flex-col px-4 py-6 overflow-y-auto space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
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
        <div className="flex items-center gap-x-4 px-4 py-3 rounded-xl hover:bg-secondary/20 transition-colors">
          <UserButton afterSignOutUrl="/" />
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Admin Account</span>
            <span className="text-xs text-foreground/50">Manage Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
