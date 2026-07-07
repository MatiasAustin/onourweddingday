"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 lg:pt-32 lg:pb-40 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-medium text-foreground leading-tight mb-6">
              Moments Are <br />
              Framed with <br />
              <span className="text-primary italic">Love Grace</span>
            </h1>
            <p className="text-foreground/70 text-lg mb-8 max-w-md leading-relaxed">
              Create a breathtaking digital invitation for your special day. Effortless, elegant, and timeless.
            </p>
            <div className="flex items-center space-x-4">
              <Link 
                href="/sign-up" 
                className="bg-primary text-white px-8 py-3.5 rounded-full font-medium hover:bg-primary-light transition-all shadow-md hover:shadow-lg flex items-center"
              >
                Plan With Serenity <span className="ml-2">→</span>
              </Link>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative h-[600px] flex justify-center items-center"
          >
            {/* Main Oval Image Placeholder (Using a generic colored div if no image is available, but let's use a standard unsplash source for preview) */}
            <div className="w-[340px] h-[520px] rounded-[170px] overflow-hidden border-8 border-white/50 shadow-2xl relative z-10">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Happy Couple" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute top-10 right-0 w-32 h-40 rounded-full overflow-hidden border-4 border-white shadow-xl z-20">
              <img 
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Wedding Details" 
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="absolute bottom-20 left-0 w-40 h-32 rounded-3xl overflow-hidden border-4 border-white shadow-xl z-20">
              <img 
                src="https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" 
                alt="Wedding Rings" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Background Accent Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[600px] bg-secondary/50 rounded-full -z-10 blur-3xl"></div>
          </motion.div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="bg-primary text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/20">
            <div>
              <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">86+</div>
              <div className="text-white/80 text-sm tracking-wider uppercase">Curated Themes</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">120k+</div>
              <div className="text-white/80 text-sm tracking-wider uppercase">Happy Couples</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">14k+</div>
              <div className="text-white/80 text-sm tracking-wider uppercase">Venue Partners</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-serif font-semibold mb-2">6.8+</div>
              <div className="text-white/80 text-sm tracking-wider uppercase">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Signature Touch Section */}
      <section id="features" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">Our Signature Touch</h2>
            <p className="text-foreground/70">Experience the perfect blend of elegant design and modern technology for your special day.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature Cards */}
            {[
              { id: '01', title: 'Elegant Designs', desc: 'Premium typography and layouts tailored to your style.' },
              { id: '02', title: 'Smart RSVP', desc: 'Manage your guest list and dietary preferences effortlessly.' },
              { id: '03', title: 'Photo Gallery', desc: 'A beautiful masonry grid to showcase your love story.' },
              { id: '04', title: 'Custom Domain', desc: 'Use your own custom URL for a truly personalized touch.' }
            ].map((feature, i) => (
              <motion.div 
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="bg-secondary/30 p-8 rounded-2xl border border-secondary/50 hover:bg-secondary/50 transition-colors"
              >
                <div className="text-primary/60 font-serif text-xl mb-6">{feature.id}.</div>
                <h3 className="font-serif text-2xl font-medium mb-3">{feature.title}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Templates Section */}
      <section id="templates" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-semibold text-foreground mb-6">Discover Our Templates</h2>
            <p className="text-foreground/70">Beautifully crafted starting points for your perfect invitation.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Classic Elegance", image: "https://images.unsplash.com/photo-1522061911475-14f77c050080?q=80&w=800&auto=format&fit=crop", style: "Minimalist & Clean" },
              { name: "Rustic Charm", image: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop", style: "Warm & Earthy" },
              { name: "Modern Romance", image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop", style: "Bold & Contemporary" }
            ].map((template, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-6 shadow-md border border-secondary/20">
                  <img src={template.image} alt={template.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-white text-primary px-6 py-2 rounded-full font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">Preview & Order</span>
                  </div>
                </div>
                <h3 className="font-serif text-xl font-medium text-center">{template.name}</h3>
                <p className="text-foreground/50 text-sm text-center mt-1">{template.style}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Link href="/templates" className="inline-block border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-colors">
              View All Templates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
