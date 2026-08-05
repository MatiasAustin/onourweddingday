"use client";

import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";
import { CalendarHeart, Gift, Camera, Heart, Quote, Navigation } from "lucide-react";

// Reusable Animation Variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

interface ExperienceProps {
  data: any;
  children?: React.ReactNode;
}

export default function Experience({ data, children }: ExperienceProps) {
  const [mounted, setMounted] = useState(false);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    // Fallback: If video doesn't end (e.g. error or very long), show text anyway after 10s
    const timer = setTimeout(() => {
      setIsVideoFinished(true);
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[var(--bg-color)]" />;

  // Helper to render backgrounds dynamically
  const renderBg = (url: string | undefined, defaultBgClass: string, isHero: boolean = false) => {
    if (!url && isHero) url = "https://cdn.pixabay.com/video/2020/05/21/40003-424103176_large.mp4";
    if (!url) return <div className={`absolute inset-0 w-full h-full -z-10 ${defaultBgClass}`} />;

    const isVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('pixabay.com/video');
    
    return (
      <div className={`absolute inset-0 w-full h-full -z-10 ${defaultBgClass} transition-opacity duration-1000 ${isHero && isVideoFinished ? 'opacity-30' : 'opacity-100'}`}>
        {isVideo ? (
           <video 
             autoPlay 
             loop={!isHero} 
             muted 
             playsInline 
             onEnded={() => isHero && setIsVideoFinished(true)}
             className={`absolute inset-0 w-full h-full object-cover ${isHero ? 'opacity-60' : 'opacity-30'}`}
             src={url} 
           />
        ) : (
           <img 
             src={url} 
             className={`absolute inset-0 w-full h-full object-cover ${isHero ? 'opacity-60' : 'opacity-30'}`}
             alt="Background" 
             onLoad={() => {
               if (isHero) {
                 // If hero is just an image, show text immediately
                 setIsVideoFinished(true);
               }
             }}
           />
        )}
      </div>
    );
  };

  const formattedDate = data.weddingDate 
    ? new Date(data.weddingDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) 
    : "15 Juni 2024";

  const customStyles = {
    '--primary': data.primaryColor || '#500000',
    '--secondary': data.secondaryColor || '#C8A24C',
    '--bg-color': data.bgColor || '#fff1f2',
  } as React.CSSProperties;

  return (
    <div style={customStyles} className="w-full bg-[var(--bg-color)] font-sans text-[var(--primary)] overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
        {renderBg(data.heroBgUrl, "bg-black", true)}
        
        {/* Content Layer (Only animates in after video finishes or timer triggers) */}
        {isVideoFinished && (
          <motion.div 
            className="relative z-10 text-center text-white p-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className="tracking-[0.3em] uppercase text-sm mb-6 text-white/80">The Wedding Of</p>
            <h1 className="font-script text-8xl md:text-9xl mb-4 drop-shadow-xl">
              {data.brideName || "Nova"}
            </h1>
            <p className="font-serif text-3xl italic my-2 text-white/70">&</p>
            <h1 className="font-script text-8xl md:text-9xl drop-shadow-xl">
              {data.groomName || "Partner"}
            </h1>
            
            <motion.div 
              className="mt-16 text-sm tracking-widest uppercase border border-white/30 rounded-full px-6 py-3 inline-block bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              {formattedDate}
            </motion.div>
          </motion.div>
        )}
      </section>

      {/* 2. QUOTE SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden">
        {renderBg(data.quoteBgUrl, "bg-[var(--bg-color)]")}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Quote className="w-12 h-12 mx-auto text-[var(--secondary)] mb-8 opacity-50" />
            <p className="font-serif text-xl md:text-2xl leading-relaxed italic opacity-80">
              "{data.quoteText || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."}"
            </p>
            <p className="mt-6 font-sans font-semibold tracking-widest text-sm uppercase text-[var(--secondary)]">
              {data.quoteSource || "Ar-Rum: 21"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. COUPLE SECTION */}
      <section className="relative w-full py-24 border-y border-[var(--secondary)]/20 px-8 overflow-hidden">
        {renderBg(data.coupleBgUrl, "bg-white/50")}

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-script text-6xl">Mempelai</h2>
            <p className="font-sans text-sm tracking-widest text-[var(--secondary)] uppercase mt-4">Dengan memohon rahmat Allah SWT</p>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-center items-center gap-16 md:gap-32">
            <motion.div 
              className="text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-64 h-80 mx-auto rounded-t-full border-4 border-[var(--secondary)]/30 p-2 mb-6">
                <div className="w-full h-full rounded-t-full overflow-hidden bg-[var(--primary)]/10">
                  <img src={data.bridePhotoUrl || "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"} alt="Bride" className="w-full h-full object-cover" />
                </div>
              </div>
              <h3 className="font-script text-5xl mb-2">{data.brideName || "Nova"}</h3>
              <p className="font-serif opacity-70 font-medium">Putri dari</p>
              <p className="font-sans text-sm opacity-60 mt-1">{data.brideParents || "Bapak Fulan & Ibu Fulanah"}</p>
            </motion.div>

            <span className="font-script text-7xl text-[var(--secondary)]">&</span>

            <motion.div 
              className="text-center"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="w-64 h-80 mx-auto rounded-t-full border-4 border-[var(--secondary)]/30 p-2 mb-6">
                <div className="w-full h-full rounded-t-full overflow-hidden bg-[var(--primary)]/10">
                  <img src={data.groomPhotoUrl || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"} alt="Groom" className="w-full h-full object-cover grayscale opacity-80" />
                </div>
              </div>
              <h3 className="font-script text-5xl mb-2">{data.groomName || "Partner"}</h3>
              <p className="font-serif opacity-70 font-medium">Putra dari</p>
              <p className="font-sans text-sm opacity-60 mt-1">{data.groomParents || "Bapak Fulan & Ibu Fulanah"}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. EVENT DETAILS SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden">
        {renderBg(data.eventBgUrl, "bg-[var(--bg-color)]")}

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-script text-6xl">Detail Acara</h2>
            <p className="font-sans text-sm tracking-widest text-[var(--secondary)] uppercase mt-4">Waktu & Tempat Pelaksanaan</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="bg-white/70 backdrop-blur-md p-10 rounded-[40px] border border-[var(--secondary)]/30 shadow-xl text-center relative overflow-hidden"
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--secondary)]/10 rounded-bl-full" />
              <Heart className="w-10 h-10 mx-auto text-[var(--secondary)] mb-6" />
              <h3 className="font-script text-5xl mb-4">Akad Nikah</h3>
              <div className="space-y-4 font-serif text-lg opacity-80">
                <p className="font-bold opacity-100">{formattedDate}</p>
                <p>{data.akadTime || "08:00 WIB - Selesai"}</p>
                <div className="w-12 h-px bg-[var(--secondary)] mx-auto my-4" />
                <p className="font-bold opacity-100">Lokasi Akad</p>
                <p className="text-sm">{data.akadLocation || data.venue || "Masjid Agung, Jakarta"}</p>
              </div>
              {data.mapLink && (
                <a href={data.mapLink} target="_blank" className="mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-[var(--primary)] text-white hover:opacity-80 transition-opacity font-sans text-sm uppercase tracking-wider">
                  <Navigation className="w-4 h-4" /> Buka Peta
                </a>
              )}
            </motion.div>

            <motion.div 
              className="bg-[var(--primary)] text-white p-10 rounded-[40px] shadow-xl text-center relative overflow-hidden"
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className="absolute top-0 left-0 w-32 h-32 bg-black/20 rounded-br-full" />
              <CalendarHeart className="w-10 h-10 mx-auto text-[var(--secondary)] mb-6" />
              <h3 className="font-script text-5xl mb-4 text-white">Resepsi</h3>
              <div className="space-y-4 font-serif text-lg text-white/80">
                <p className="font-bold text-white">{formattedDate}</p>
                <p>{data.resepsiTime || "11:00 WIB - 14:00 WIB"}</p>
                <div className="w-12 h-px bg-[var(--secondary)] mx-auto my-4" />
                <p className="font-bold text-white">Lokasi Resepsi</p>
                <p className="text-sm">{data.resepsiLocation || data.venue || "Grand Ballroom, Jakarta"}</p>
              </div>
              {data.mapLink && (
                <a href={data.mapLink} target="_blank" className="mt-8 flex items-center justify-center gap-2 w-full py-3 rounded-full bg-white text-[var(--primary)] hover:bg-gray-100 transition-colors font-sans text-sm uppercase tracking-wider">
                  <Navigation className="w-4 h-4" /> Buka Peta
                </a>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. GALLERY SECTION */}
      <section className="relative w-full py-24 px-8 border-y border-[var(--secondary)]/20 overflow-hidden">
        {renderBg(data.galleryBgUrl, "bg-white/30")}

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Camera className="w-8 h-8 mx-auto text-[var(--secondary)] mb-4" />
            <h2 className="font-script text-6xl">Galeri Kami</h2>
          </motion.div>

          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.galleryPhotos ? (
              data.galleryPhotos.split(',').filter(Boolean).map((photoUrl: string, i: number) => (
                <motion.div key={i} variants={fadeInUp} className="aspect-square rounded-2xl overflow-hidden bg-[var(--primary)]/10">
                  <img src={photoUrl.trim()} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </motion.div>
              ))
            ) : (
              [1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <motion.div key={i} variants={fadeInUp} className="aspect-square rounded-2xl overflow-hidden bg-[var(--primary)]/10">
                  <img src={`https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop&sig=${i}`} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </motion.div>
              ))
            )}
          </motion.div>
        </div>
      </section>

      {/* 6. GIFT SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden">
        {renderBg(data.giftBgUrl, "bg-[var(--bg-color)]")}

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Gift className="w-10 h-10 mx-auto text-[var(--secondary)] mb-6" />
            <h2 className="font-script text-6xl mb-6">Wedding Gift</h2>
            <p className="font-serif text-lg opacity-80 mb-10 leading-relaxed">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
              Namun jika Anda ingin memberikan tanda kasih, dapat melalui:
            </p>
            
            <div className="bg-white p-8 rounded-3xl border border-[var(--secondary)]/30 shadow-lg max-w-sm mx-auto">
              <h4 className="font-sans font-bold text-xl mb-2">{data.bankName || "BCA / PIX"}</h4>
              <p className="font-mono text-xl tracking-widest mb-4 break-all">
                {data.pixKey || "1234 5678 90"}
              </p>
              <p className="font-serif opacity-70 mb-6">a.n {data.accountHolder || (data.brideName + " / " + data.groomName) || "Nova / Partner"}</p>
              <button 
                className="px-6 py-2 bg-[var(--secondary)]/10 text-[var(--secondary)] font-semibold rounded-full hover:bg-[var(--secondary)]/20 transition-colors border border-[var(--secondary)]/50"
                onClick={() => navigator.clipboard.writeText(data.pixKey || "1234 5678 90")}
              >
                Salin Rekening
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 7. RSVP SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden">
        {renderBg(data.rsvpBgUrl, "bg-[var(--primary)]")}

        <div className="relative z-10 max-w-2xl mx-auto text-white">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-script text-6xl mb-4 text-white">RSVP</h2>
            <p className="font-serif text-white/80">Mohon konfirmasi kehadiran Anda sebelum tanggal {formattedDate}</p>
          </motion.div>

          <motion.form 
            className="bg-white/10 backdrop-blur-md p-8 rounded-3xl border border-white/20 flex flex-col gap-6"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div>
              <label className="block font-sans text-sm tracking-wider uppercase mb-2 text-white/80">Nama Anda</label>
              <input type="text" className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--secondary)] transition-colors" placeholder="Masukkan nama..." />
            </div>
            <div>
              <label className="block font-sans text-sm tracking-wider uppercase mb-2 text-white/80">Kehadiran</label>
              <select className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--secondary)] transition-colors appearance-none">
                <option value="hadir" className="text-black">Ya, Saya akan hadir</option>
                <option value="tidak" className="text-black">Maaf, Saya tidak bisa hadir</option>
              </select>
            </div>
            <div>
              <label className="block font-sans text-sm tracking-wider uppercase mb-2 text-white/80">Jumlah Tamu</label>
              <select className="w-full bg-white/5 border border-white/20 rounded-xl p-4 text-white focus:outline-none focus:border-[var(--secondary)] transition-colors appearance-none">
                <option value="1" className="text-black">1 Orang</option>
                <option value="2" className="text-black">2 Orang</option>
              </select>
            </div>
            <button type="button" className="w-full py-4 mt-4 bg-[var(--secondary)] text-white font-bold tracking-widest uppercase rounded-xl hover:opacity-80 transition-opacity">
              Kirim Konfirmasi
            </button>
          </motion.form>
        </div>
      </section>

      {/* 8. FOOTER */}
      <footer className="relative w-full py-16 text-center border-t border-[var(--secondary)]/30 overflow-hidden">
        {renderBg(data.footerBgUrl, "bg-white/50")}

        <motion.div
          className="relative z-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-script text-5xl mb-4">{data.brideName || "Nova"} & {data.groomName || "Partner"}</h2>
          <p className="font-sans text-sm opacity-60 tracking-widest uppercase mb-8">Terima Kasih</p>
          <p className="font-sans text-xs opacity-40">Powered by OnOurWeddingDay</p>
        </motion.div>
      </footer>

      {/* Include extra children if injected from admin, just in case */}
      {children && (
        <div className="hidden">
          {children}
        </div>
      )}
    </div>
  );
}
