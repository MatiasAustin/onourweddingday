import { login, signup } from "./actions";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message: string }>;
}) {
  const { message } = await searchParams;

  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
      <Link href="/" className="absolute top-8 left-8 p-2 bg-white rounded-full shadow-sm hover:bg-secondary/20 transition-colors text-foreground/60 hover:text-primary">
        <ArrowLeft className="w-5 h-5" />
      </Link>

      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-secondary/50">
        <div className="text-center mb-8">
          <h1 className="font-serif text-3xl font-bold text-primary tracking-tight mb-2">Welcome Back</h1>
          <p className="text-foreground/60 text-sm">Sign in to your account or create a new one.</p>
        </div>

        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-secondary/50 bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground/80" htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-secondary/50 bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
            />
          </div>

          {message && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium text-center">
              {message}
            </div>
          )}

          <div className="flex gap-4 mt-4">
            <button
              formAction={login}
              className="flex-1 bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-light transition-colors shadow-sm"
            >
              Log In
            </button>
            <button
              formAction={signup}
              className="flex-1 bg-white border border-secondary text-foreground hover:bg-secondary/10 py-3 rounded-xl font-medium transition-colors"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
