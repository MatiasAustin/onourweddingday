import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/20 pt-20 pb-10 border-t border-secondary/50 mt-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h2 className="font-serif text-3xl font-semibold text-primary mb-6">
              OnOurWeddingDay
            </h2>
            <p className="text-foreground/70 max-w-sm mb-6 leading-relaxed">
              Create beautiful, modern, and elegant digital wedding invitations that leave a lasting impression on your guests.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Platform</h3>
            <ul className="space-y-3">
              <li><Link href="#templates" className="text-foreground/70 hover:text-primary transition-colors">Templates</Link></li>
              <li><Link href="#features" className="text-foreground/70 hover:text-primary transition-colors">Features</Link></li>
              <li><Link href="#pricing" className="text-foreground/70 hover:text-primary transition-colors">Pricing</Link></li>
              <li><Link href="#showcase" className="text-foreground/70 hover:text-primary transition-colors">Showcase</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-foreground mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-secondary/40 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/60">
          <p>© {new Date().getFullYear()} OnOurWeddingDay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
