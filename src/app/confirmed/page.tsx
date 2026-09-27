import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary/10 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-secondary/50 text-center">
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-green-500" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-primary tracking-tight mb-4">Email Confirmed!</h1>
        <p className="text-foreground/60 text-sm mb-8">
          Your email has been successfully verified. You can now access your dashboard and start planning.
        </p>
        
        <Link 
          href="/client-dashboard" 
          className="w-full inline-block bg-primary text-white py-3 rounded-xl font-medium hover:bg-primary-light transition-colors shadow-sm"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
}
