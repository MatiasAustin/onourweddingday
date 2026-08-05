"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordInput() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        placeholder="••••••••"
        required
        className="w-full px-4 py-2.5 rounded-xl border border-secondary/50 bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all pr-12"
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-foreground/80 transition-colors focus:outline-none"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
  );
}
