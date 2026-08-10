"use client";

import { useEffect, useState, useRef } from "react";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { CalendarHeart, Gift, Camera, Heart, Quote, Navigation, Music2, VolumeX, MailOpen } from "lucide-react";
import { submitGuestbookEntry } from "@/app/actions/guestbook";

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

// Custom Injector Component for Custom HTML/CSS/JS
const CustomInjector = ({ html, css, js }: { html?: string, css?: string, js?: string }) => {
  useEffect(() => {
    if (!js) return;
    let script: HTMLScriptElement;
    try {
      script = document.createElement('script');
      script.innerHTML = js;
      document.body.appendChild(script);
    } catch (e) {
      console.error('Custom JS Error', e);
    }
  
  
  
  return () => { 
      if (script && document.body.contains(script)) {
        document.body.removeChild(script); 
      }
    }
  }, [js]);

  return (
    <>
      {css && <style dangerouslySetInnerHTML={{ __html: css }} />}
      {html && <div dangerouslySetInnerHTML={{ __html: html }} className="relative z-30 w-full" />}
    </>
  );
};

const TwinklingStarsGallery = ({ photos }: { photos: string[] }) => {
  return (
    <div className="relative w-full h-[600px] overflow-hidden rounded-3xl bg-black/5 mt-8">
       {photos.map((photo, i) => {
          const size = 100 + (Math.random() * 150);
          const top = Math.random() * 80;
          const left = Math.random() * 80;
          const delay = Math.random() * 5;
          const duration = 4 + (Math.random() * 4);
          return (
             <div 
               key={i} 
               className="absolute rounded-2xl shadow-xl overflow-hidden border-2 border-white/50"
               style={{ 
                 width: size, height: size, top: `${top}%`, left: `${left}%`,
                 animation: `twinkle ${duration}s infinite alternate ${delay}s ease-in-out`,
                 opacity: 0
               }}
             >
                <img src={photo.trim()} className="w-full h-full object-cover" />
             </div>
          )
       })}
       <style dangerouslySetInnerHTML={{__html: `
         @keyframes twinkle {
           0% { opacity: 0; transform: scale(0.8); }
           50% { opacity: 1; transform: scale(1.05); }
           100% { opacity: 0; transform: scale(0.8); }
         }
       `}} />
    </div>
  )
}

interface ExperienceProps {
  data: any;
  invitationId?: string;
  wishes?: any[];
  children?: React.ReactNode;
  previewMode?: "desktop" | "tablet" | "mobile";
}

const renderDynamicOrnaments = (ornamentsStr: any) => {
    if (!ornamentsStr) return null;
    try {
      const ornaments = typeof ornamentsStr === 'string' ? JSON.parse(ornamentsStr) : ornamentsStr;
      return ornaments.map((orn: any, idx: number) => {
        if (!orn.url) return null;
        let positionClass = '';
        if (orn.corner === 'top-left') positionClass = 'top-0 left-0';
        else if (orn.corner === 'top-right') positionClass = 'top-0 right-0';
        else if (orn.corner === 'bottom-left') positionClass = 'bottom-0 left-0';
        else if (orn.corner === 'bottom-right') positionClass = 'bottom-0 right-0';
        
        return (
          <img 
            key={orn.id || idx}
            src={orn.url} 
            className={'absolute ' + positionClass + ' object-contain pointer-events-none z-0'} 
            style={{ 
              transform: 'translate(' + orn.offsetX + '%, ' + orn.offsetY + '%) scale(' + (orn.scale / 100) + ')',
              transformOrigin: orn.corner === 'top-left' ? 'top left' : orn.corner === 'top-right' ? 'top right' : orn.corner === 'bottom-left' ? 'bottom left' : 'bottom right',
              width: '256px',
              maxWidth: '50vw'
            }} 
            alt="" 
          />
        );
      });
    } catch (e) {
      return null;
    }
  };

export default function Experience({ data, invitationId, wishes = [], children, previewMode = "desktop" }: ExperienceProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [isHeroTextVisible, setIsHeroTextVisible] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [rsvpForm, setRsvpForm] = useState({ name: '', attendance: 'hadir', guestsCount: '1', message: '' });
  const [isSubmittingRsvp, setIsSubmittingRsvp] = useState(false);
  const [rsvpStatus, setRsvpStatus] = useState<null | 'success' | 'error'>(null);
  
  const handleRsvpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!invitationId) return; // In editor preview mode, just return
    setIsSubmittingRsvp(true);
    setRsvpStatus(null);
    const res = await submitGuestbookEntry({
      invitationId,
      name: rsvpForm.name,
      attendance: rsvpForm.attendance,
      guestsCount: parseInt(rsvpForm.guestsCount),
      message: rsvpForm.message
    });
    setIsSubmittingRsvp(false);
    if (res.success) {
      setRsvpStatus('success');
      setRsvpForm({ name: '', attendance: 'hadir', guestsCount: '1', message: '' });
    } else {
      setRsvpStatus('error');
    }
  };
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Text Reveal Timer starts only AFTER cover is opened
  useEffect(() => {
    if (isOpened) {
      const delay = parseFloat(data.heroTextDelay || "2") * 1000;
      const timer = setTimeout(() => {
        setIsHeroTextVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isOpened, data.heroTextDelay]);

  // Handle Music and Hero Video Playback
  useEffect(() => {
    if (isOpened) {
      if (heroVideoRef.current) {
        heroVideoRef.current.play().catch(e => console.log("Video play blocked:", e));
      }
      
      if (audioRef.current) {
        if (isMuted) {
          audioRef.current.pause();
        } else {
          audioRef.current.play().catch(e => console.log("Audio play blocked:", e));
        }
      }
    } else if (audioRef.current) {
       audioRef.current.pause();
    }
  }, [isOpened, isMuted]);

  // Countdown Timer Logic
  useEffect(() => {
    if (!data.countdownDate) return;
    
    const target = new Date(data.countdownDate).getTime();
    
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = target - now;
      
      if (distance < 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [data.countdownDate]);

  if (!mounted) return <div className="min-h-screen bg-[var(--bg-color)]" />;

  // Helper to render backgrounds dynamically
  const renderBg = (url: string | undefined, defaultBgClass: string, isHero: boolean = false) => {
    if (!url && isHero) url = "https://cdn.pixabay.com/video/2020/05/21/40003-424103176_large.mp4";
    if (!url) return <div className={`absolute inset-0 w-full h-full z-0 ${defaultBgClass}`} />;

    const isVideo = url.endsWith('.mp4') || url.endsWith('.webm') || url.includes('pixabay.com/video') || url.includes('supabase');
    
    return (
      <div className={`absolute inset-0 w-full h-full z-0 ${defaultBgClass} transition-opacity duration-1000 opacity-100`}>
        {isVideo ? (
           <video 
             ref={isHero ? heroVideoRef : undefined}
             autoPlay={!isHero} 
             loop={!isHero} 
             muted 
             playsInline 
             className={`absolute inset-0 w-full h-full object-cover ${!isHero ? 'opacity-40' : 'opacity-100'}`}
             src={url} 
           />
        ) : (
           <img 
             src={url} 
             className={`absolute inset-0 w-full h-full object-cover ${!isHero ? 'opacity-40' : 'opacity-100'}`}
             alt="Background" 
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
    '--font-title': `"${data.fontFamilyTitle || 'Great Vibes'}", cursive, serif`,
    '--font-body': `"${data.fontFamilyBody || 'Montserrat'}", sans-serif`,
    '--title-size': data.fontSizeTitle || '4rem',
    '--body-size': data.fontSizeBody || '1rem',
    '--title-weight': data.fontWeightTitle || '400',
    '--body-weight': data.fontWeightBody || '400',
    '--body-line-height': data.lineHeightBody || '1.6',
    '--text-alignment': data.textAlignment || 'center',
  } as React.CSSProperties;

  const exactScreenHeight = previewMode === 'mobile' ? '812px' : previewMode === 'tablet' ? '1024px' : '100vh';
  const googleFontsUrl = `https://fonts.googleapis.com/css2?family=${(data.fontFamilyTitle || 'Great Vibes').replace(/ /g, '+')}:wght@${data.fontWeightTitle || '400'}&family=${(data.fontFamilyBody || 'Montserrat').replace(/ /g, '+')}:wght@${data.fontWeightBody || '400'}&display=swap`;

  return (
    <div style={{ ...customStyles, minHeight: exactScreenHeight, height: !isOpened ? exactScreenHeight : 'auto' }} className={`@container w-full bg-[var(--bg-color)] font-sans text-[var(--primary)] overflow-x-hidden relative ${!isOpened ? 'overflow-hidden' : ''}`}>
      <style dangerouslySetInnerHTML={{__html: `
        @import url('${googleFontsUrl}');
        .font-script { font-family: var(--font-title) !important; font-size: var(--title-size) !important; font-weight: var(--title-weight) !important; line-height: 1.2; }
        .font-sans, .font-serif, .font-mono, p { font-family: var(--font-body) !important; font-size: var(--body-size) !important; line-height: var(--body-line-height) !important; font-weight: var(--body-weight) !important; }
        .text-center { text-align: var(--text-alignment) !important; }
      `}} />
      
      {/* 0. COVER SECTION (Full Screen Overlay) */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div 
            className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1] } }}
          >
            {/* Responsive Background using CSS */}
            <style dangerouslySetInnerHTML={{__html: `
              .cover-bg-image {
                background-image: url('${data.coverMobileBgUrl || "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop"}');
              }
              @container (min-width: 768px) {
                .cover-bg-image {
                  background-image: url('${data.coverDesktopBgUrl || "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2000&auto=format&fit=crop"}');
                }
              }
            `}} />
            <div className="absolute inset-0 bg-cover bg-center cover-bg-image" />
            <div className="absolute inset-0 transition-opacity" style={{ backgroundColor: data.coverOverlayColor || '#000000', opacity: data.coverOverlayOpacity || '0.4' }} />
            
            <div className="relative z-10 text-center px-6 flex flex-col items-center h-full w-full justify-between py-24">
              <div className="flex-1 flex flex-col items-center justify-center">
                <p className="tracking-[0.3em] uppercase text-xs mb-6 opacity-80 font-bold" style={{ color: data.coverTitleColor || '#ffffff' }}>{data.coverTitleText || "Undangan Pernikahan"}</p>
                <h1 className="font-script text-7xl @md:text-9xl mb-4 drop-shadow-xl" style={{ color: data.coverTitleColor || '#ffffff' }}>
                  {data.brideName || "Nova"} & {data.groomName || "Irfan"}
                </h1>
                {data.coverSubtitleText && (
                  <p className="tracking-[0.2em] mt-2 uppercase text-[10px] opacity-70 font-semibold" style={{ color: data.coverTitleColor || '#ffffff' }}>{data.coverSubtitleText}</p>
                )}
              </div>

              <div className="mt-auto flex flex-col @md:flex-row items-center gap-4">
                <motion.button
                  onClick={() => setIsOpened(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full flex items-center gap-3 shadow-xl font-bold tracking-wider uppercase text-xs border-2"
                  style={{ 
                    backgroundColor: data.coverButtonBgColor || 'var(--primary)', 
                    color: data.coverButtonTextColor || '#ffffff',
                    borderColor: data.coverButtonBgColor || 'var(--primary)'
                  }}
                >
                  <MailOpen className="w-4 h-4" />
                  Open Invitation
                </motion.button>

                <motion.button
                  onClick={() => setIsOpened(true)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 rounded-full flex items-center gap-3 shadow-xl font-bold tracking-wider uppercase text-xs border-2"
                  style={{ 
                    backgroundColor: 'transparent',
                    color: data.coverButtonBgColor || 'var(--primary)',
                    borderColor: data.coverButtonBgColor || 'var(--primary)'
                  }}
                >
                  <CalendarHeart className="w-4 h-4" />
                  Save The Date
                </motion.button>
              </div>
            </div>
            
            <CustomInjector html={data.customHtml_cover} css={data.customCss_cover} js={data.customJs_cover} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* AUDIO PLAYER */}
      {data.bgMusicUrl && (
        <>
          <audio ref={audioRef} src={data.bgMusicUrl} loop />
          
          <AnimatePresence>
            {isOpened && (
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                onClick={() => setIsMuted(!isMuted)}
                className="fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl backdrop-blur-md border"
                style={{ 
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  borderColor: 'rgba(255,255,255,0.4)',
                  color: data.primaryColor || '#500000'
                }}
              >
                {isMuted ? <VolumeX className="w-6 h-6" /> : <Music2 className="w-6 h-6 animate-spin-slow" style={{ animationDuration: '4s' }} />}
              </motion.button>
            )}
          </AnimatePresence>
        </>
      )}

      {/* 1. HERO SECTION */}
      <section className={`relative w-full flex flex-col items-center justify-${data.heroLayout || 'center'} overflow-hidden`} style={{ minHeight: exactScreenHeight }}>
        {renderBg(data.heroBgUrl, "bg-black", true)}
        
        {/* Dynamic Overlay */}
        <div className="absolute inset-0 w-full h-full z-0 transition-opacity duration-1000" style={{ backgroundColor: data.heroOverlayColor || '#000000', opacity: isHeroTextVisible ? (data.heroOverlayOpacity || '0.4') : '0' }} />
        
        {/* Floral Ornaments */}
        {data.topOrnamentUrl && (
          <img src={data.topOrnamentUrl} className="absolute top-0 left-0 w-full @md:w-2/3 object-contain z-0 pointer-events-none drop-shadow-xl" alt="Top Ornament" />
        )}
        {data.bottomOrnamentUrl && (
          <img src={data.bottomOrnamentUrl} className="absolute bottom-0 right-0 w-full @md:w-2/3 object-contain z-0 pointer-events-none drop-shadow-xl" style={{ transform: 'rotate(180deg)' }} alt="Bottom Ornament" />
        )}
        
        {/* Content Layer (Only animate in if isOpened is true) */}
        {isHeroTextVisible && isOpened && (
          <motion.div 
            className={`relative z-10 w-full p-8 pb-32 text-${data.heroTextAlign || 'center'}`}
            style={{ color: data.heroTextColor || '#ffffff' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: parseInt(data.heroTranslateY || "0") }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          >
            <p className="font-sans font-bold tracking-[0.3em] uppercase text-xs mb-8 opacity-80" style={{ color: data.secondaryColor || 'var(--secondary)' }}>{data.heroTitleText || "VINTAGE JAVANESE WEDDING"}</p>
            <h1 className="font-script text-6xl @md:text-7xl mb-8" style={{ lineHeight: data.heroLineHeight || "1.2", letterSpacing: "-0.02em" }}>
              {data.brideName || "Nova"} & {data.groomName || "Irfan"}
            </h1>
            
            <motion.div 
              className="inline-block border-y border-current py-2 px-8"
              style={{ marginTop: `${data.heroDateSpacing || '32'}px`, borderColor: data.heroTextColor ? `${data.heroTextColor}40` : 'rgba(255,255,255,0.3)' }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <p className="font-sans font-bold tracking-widest uppercase text-sm">{formattedDate}</p>
            </motion.div>
          </motion.div>
        )}
        <CustomInjector html={data.customHtml_hero} css={data.customCss_hero} js={data.customJs_hero} />
      </section>

      {/* 2. QUOTE SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.quoteBgColor || 'var(--bg-color)' }}>
        {renderBg(data.quoteBgUrl, "")}

        {renderDynamicOrnaments(data.quoteOrnaments)}

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <Quote className="w-12 h-12 mx-auto mb-8 opacity-50" style={{ color: data.quoteIconColor || 'var(--secondary)' }} />
            <p className="font-serif text-xl @md:text-2xl leading-relaxed italic opacity-80" style={{ color: data.quoteTextColor || 'var(--primary)' }}>
              "{data.quoteText || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya diantaramu rasa kasih dan sayang."}"
            </p>
            <p className="mt-6 font-sans font-semibold tracking-widest text-sm uppercase" style={{ color: data.quoteSourceColor || 'var(--secondary)' }}>
              {data.quoteSource || "Ar-Rum: 21"}
            </p>
          </motion.div>
        </div>
        <CustomInjector html={data.customHtml_quote} css={data.customCss_quote} js={data.customJs_quote} />
      </section>

      {/* 3. COUPLE SECTION */}
      <section className="relative w-full py-24 border-y border-[var(--secondary)]/20 px-8 overflow-hidden" style={{ backgroundColor: data.coupleBgColor || 'rgba(255,255,255,0.5)' }}>
        {renderBg(data.coupleBgUrl, "")}

        {renderDynamicOrnaments(data.coupleOrnaments)}

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16 flex flex-col items-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-sans font-bold tracking-[0.2em] uppercase text-xs mb-4" style={{ color: data.secondaryColor || 'var(--secondary)' }}>BRIDE & GROOM</p>
            <div className="w-12 h-px mb-6" style={{ backgroundColor: data.secondaryColor || 'var(--secondary)' }} />
            <h2 className="font-script text-4xl @md:text-5xl px-4" style={{ color: data.coupleTitleColor || 'var(--primary)' }}>Two Families, One Sacred Promise</h2>
            <div className="w-12 h-px mt-6 mb-6" style={{ backgroundColor: data.secondaryColor || 'var(--secondary)' }} />
            <p className="font-serif text-sm opacity-70 max-w-md mx-auto leading-relaxed px-4" style={{ color: data.coupleSubtitleColor || 'var(--primary)' }}>In the warmth of tradition and the blessing of our parents, we begin a new home together.</p>
          </motion.div>

          <div className="flex flex-col @md:flex-row justify-center items-center gap-16 @md:gap-32">
            <motion.div 
              className={`text-center ${data.coupleFrameUrl ? 'p-8 @md:p-12 rounded-[40px] border shadow-sm w-full max-w-md' : ''}`}
              style={data.coupleFrameUrl ? { backgroundColor: data.coupleBgColor || 'var(--bg-color)', borderColor: data.coupleAccentColor ? `${data.coupleAccentColor}4d` : 'rgba(200,162,76,0.3)' } : {}}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {data.coupleFrameUrl ? (
                <div className="relative w-64 @md:w-80 mx-auto aspect-[3/4] mb-8">
                  <div className="absolute inset-0 p-[20%]">
                    <img src={data.bridePhotoUrl || "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"} alt="Bride" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <img src={data.coupleFrameUrl} alt="Frame" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-lg" />
                </div>
              ) : (
                <div className="w-64 h-80 mx-auto rounded-t-full border-4 p-2 mb-6" style={{ borderColor: data.coupleAccentColor ? `${data.coupleAccentColor}4d` : 'var(--secondary)' }}>
                  <div className="w-full h-full rounded-t-full overflow-hidden bg-[var(--primary)]/10">
                    <img src={data.bridePhotoUrl || "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"} alt="Bride" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <h3 className="font-script text-5xl mb-2" style={{ color: data.coupleNameColor || 'var(--primary)' }}>{data.brideFullName || data.brideName || "Nova"}</h3>
              <p className="font-serif opacity-70 font-medium mt-6" style={{ color: data.coupleTextColor || 'var(--primary)' }}>{data.brideChildOrder || "Putri dari"}</p>
              <p className="font-sans text-sm opacity-60 mt-1" style={{ color: data.coupleTextColor || 'var(--primary)' }}>{data.brideParents || "Bapak Fulan & Ibu Fulanah"}</p>
            </motion.div>

            <span className="font-script text-7xl" style={{ color: data.coupleAccentColor || 'var(--secondary)' }}>&</span>

            <motion.div 
              className={`text-center ${data.coupleFrameUrl ? 'p-8 @md:p-12 rounded-[40px] border shadow-sm w-full max-w-md' : ''}`}
              style={data.coupleFrameUrl ? { backgroundColor: data.coupleBgColor || 'var(--bg-color)', borderColor: data.coupleAccentColor ? `${data.coupleAccentColor}4d` : 'rgba(200,162,76,0.3)' } : {}}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {data.coupleFrameUrl ? (
                <div className="relative w-64 @md:w-80 mx-auto aspect-[3/4] mb-8">
                  <div className="absolute inset-0 p-[20%]">
                    <img src={data.groomPhotoUrl || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"} alt="Groom" className="w-full h-full object-cover rounded-xl" />
                  </div>
                  <img src={data.coupleFrameUrl} alt="Frame" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-lg" />
                </div>
              ) : (
                <div className="w-64 h-80 mx-auto rounded-t-full border-4 p-2 mb-6" style={{ borderColor: data.coupleAccentColor ? `${data.coupleAccentColor}4d` : 'var(--secondary)' }}>
                  <div className="w-full h-full rounded-t-full overflow-hidden bg-[var(--primary)]/10">
                    <img src={data.groomPhotoUrl || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop"} alt="Groom" className="w-full h-full object-cover" />
                  </div>
                </div>
              )}
              <h3 className="font-script text-5xl mb-2" style={{ color: data.coupleNameColor || 'var(--primary)' }}>{data.groomFullName || data.groomName || "Partner"}</h3>
              <p className="font-serif opacity-70 font-medium mt-6" style={{ color: data.coupleTextColor || 'var(--primary)' }}>{data.groomChildOrder || "Putra dari"}</p>
              <p className="font-sans text-sm opacity-60 mt-1" style={{ color: data.coupleTextColor || 'var(--primary)' }}>{data.groomParents || "Bapak Fulan & Ibu Fulanah"}</p>
            </motion.div>
          </div>
        </div>
        <CustomInjector html={data.customHtml_couple} css={data.customCss_couple} js={data.customJs_couple} />
      </section>

      {/* 3.5 OUR STORY SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.storyBgColor || 'rgba(255,255,255,0.5)' }}>
         <div className="relative z-10 max-w-4xl mx-auto">
           <motion.div className="text-center mb-16" variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
             <h2 className="font-script text-6xl mb-4" style={{ color: data.storyTitleColor || 'var(--primary)' }}>Kisah Kami</h2>
           </motion.div>
           
           <div className="relative border-l-2 ml-4 @md:ml-0 @md:border-l-0" style={{ borderColor: data.storyLineColor || 'var(--secondary)' }}>
             {/* Desktop Timeline Line */}
             <div className="hidden @md:block absolute top-0 bottom-0 left-1/2 -ml-[1px] w-0.5" style={{ backgroundColor: data.storyLineColor || 'var(--secondary)' }} />
             
             {[
               { date: data.story1Date, title: data.story1Title, desc: data.story1Desc, img: data.story1Image },
               { date: data.story2Date, title: data.story2Title, desc: data.story2Desc, img: data.story2Image },
               { date: data.story3Date, title: data.story3Title, desc: data.story3Desc, img: data.story3Image },
               { date: data.story4Date, title: data.story4Title, desc: data.story4Desc, img: data.story4Image },
             ].filter(s => s.title || s.desc).map((story, i) => (
               <motion.div key={i} variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }} className={`relative mb-12 flex flex-col @md:flex-row items-center justify-between ${i % 2 === 0 ? '@md:flex-row-reverse' : ''}`}>
                  <div className="hidden @md:block w-5 h-5 rounded-full absolute left-1/2 -ml-[10px] top-4 border-4 border-white shadow-md z-10" style={{ backgroundColor: data.storyLineColor || 'var(--secondary)' }} />
                  <div className="absolute w-4 h-4 rounded-full @md:hidden -left-[9px] top-6 border-4 border-white shadow-md z-10" style={{ backgroundColor: data.storyLineColor || 'var(--secondary)' }} />
                  
                  <div className={`w-full @md:w-[45%] pl-8 @md:pl-0 ${i % 2 === 0 ? '@md:pl-12 @md:text-left' : '@md:pr-12 @md:text-right'}`}>
                     <p className="font-sans font-bold text-sm tracking-widest uppercase mb-2 global-align" style={{ color: data.storyLineColor || 'var(--secondary)' }}>{story.date}</p>
                     <h3 className="font-serif text-3xl font-bold mb-4 global-align" style={{ color: data.storyTitleColor || 'var(--primary)' }}>{story.title}</h3>
                     <p className="opacity-80 leading-relaxed global-align" style={{ color: data.storyTextColor || 'var(--primary)' }}>{story.desc}</p>
                  </div>
                  
                  <div className={`w-full @md:w-[45%] pl-8 @md:pl-0 mt-6 @md:mt-0 ${i % 2 === 0 ? '@md:pr-12' : '@md:pl-12'}`}>
                     {story.img && (
                       <div className="rounded-2xl overflow-hidden shadow-xl aspect-video border-4" style={{ borderColor: 'rgba(255,255,255,0.5)' }}>
                         <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
                       </div>
                     )}
                  </div>
               </motion.div>
             ))}
           </div>
         </div>
      </section>

      {/* 3.75 COUNTDOWN SECTION */}
      {data.countdownDate && (
        <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.countdownBgColor || '#4A0E17' }}>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <h2 className="font-script text-5xl @md:text-6xl mb-12" style={{ color: data.countdownTextColor || '#ffffff' }}>Save The Date</h2>
              
              <div className="flex justify-center gap-2 @md:gap-8">
                {[
                  { label: "DAYS", value: timeLeft.days },
                  { label: "HOURS", value: timeLeft.hours },
                  { label: "MINUTES", value: timeLeft.minutes },
                  { label: "SECONDS", value: timeLeft.seconds }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center justify-center w-[72px] h-[72px] @sm:w-20 @sm:h-20 @md:w-32 @md:h-32 border rounded-xl backdrop-blur-sm shrink-0" style={{ borderColor: data.secondaryColor ? `${data.secondaryColor}80` : 'rgba(197,160,89,0.5)', backgroundColor: 'rgba(0,0,0,0.1)' }}>
                    <span className="font-serif text-xl @md:text-4xl font-bold mb-0.5 @md:mb-1" style={{ color: data.countdownTextColor || '#ffffff' }}>{String(item.value).padStart(2, '0')}</span>
                    <span className="font-sans text-[7px] @md:text-xs tracking-wide @md:tracking-widest uppercase opacity-70" style={{ color: data.countdownTextColor || '#ffffff' }}>{item.label}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 font-sans font-bold tracking-[0.15em] text-sm @md:text-base uppercase" style={{ color: data.countdownTextColor || '#ffffff' }}>
                {data.akadHari ? `${data.akadHari}, ${data.akadTanggal}` : formattedDate}
              </div>
            </motion.div>
          </div>
          {/* Subtle floral accents on sides if needed */}
          {data.topOrnamentUrl && (
            <img src={data.topOrnamentUrl} className="absolute -left-32 top-1/2 -translate-y-1/2 w-64 object-contain opacity-20 pointer-events-none" style={{ transform: 'rotate(90deg)' }} alt="" />
          )}
          {data.bottomOrnamentUrl && (
            <img src={data.bottomOrnamentUrl} className="absolute -right-32 top-1/2 -translate-y-1/2 w-64 object-contain opacity-20 pointer-events-none" style={{ transform: 'rotate(-90deg)' }} alt="" />
          )}
        </section>
      )}

      {/* 4. EVENT DETAILS SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.eventBgColor || 'var(--bg-color)' }}>
        {renderBg(data.eventBgUrl, "")}

        {renderDynamicOrnaments(data.eventsOrnaments)}

        <div className="relative z-10 max-w-5xl mx-auto">
          <motion.div 
            className="text-center mb-16 flex flex-col items-center"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="font-sans font-bold tracking-[0.2em] uppercase text-xs mb-4" style={{ color: data.secondaryColor || 'var(--secondary)' }}>WEDDING EVENTS</p>
            <div className="w-12 h-px mb-6" style={{ backgroundColor: data.secondaryColor || 'var(--secondary)' }} />
            <h2 className="font-script text-4xl @md:text-5xl px-4" style={{ color: data.eventTitleColor || 'var(--primary)' }}>Akad & Reception</h2>
            <div className="w-12 h-px mt-6 mb-6" style={{ backgroundColor: data.secondaryColor || 'var(--secondary)' }} />
            <p className="font-serif text-sm opacity-70 max-w-md mx-auto leading-relaxed px-4" style={{ color: data.eventTitleColor || 'var(--primary)' }}>We would be honored by your presence and prayers as we celebrate with sacred tradition and family warmth.</p>
          </motion.div>

          <div className="grid @md:grid-cols-2 gap-8">
            {/* Akad Card */}
            <motion.div 
              className="p-10 rounded-[30px] border shadow-sm text-center relative overflow-hidden"
              style={{ 
                backgroundColor: data.eventCard1BgColor || 'var(--bg-color)',
                color: data.eventCard1TextColor || 'var(--primary)',
                borderColor: data.eventCard1AccentColor ? `${data.eventCard1AccentColor}4d` : 'rgba(197,160,89,0.3)'
              }}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Heart className="w-6 h-6 mx-auto mb-6 opacity-80" style={{ color: data.eventCard1AccentColor || 'var(--secondary)' }} />
              <h3 className="font-script text-4xl mb-6">Akad Nikah</h3>
              <div className="space-y-2 font-sans text-sm opacity-80">
                <p className="font-bold tracking-wider">{data.akadHari ? `${data.akadHari}, ${data.akadTanggal}` : formattedDate}</p>
                <p className="tracking-widest text-xs mt-1">{data.akadWaktu || data.akadTime || "08:00 WIB - Selesai"}</p>
                <div className="w-8 h-px mx-auto my-6" style={{ backgroundColor: data.eventCard1AccentColor || 'var(--secondary)' }} />
                <p className="font-bold">{data.akadLokasi || "Lokasi Akad"}</p>
                <p className="text-xs font-serif leading-relaxed mt-2">{data.akadAlamat || data.akadLocation || data.venue || "Masjid Agung, Jakarta"}</p>
              </div>
              {(data.akadMapLink || data.mapLink) && (
                <a href={data.akadMapLink || data.mapLink} target="_blank" rel="noreferrer" className="mt-8 mx-auto flex items-center justify-center gap-2 w-max px-6 py-2 rounded-full hover:opacity-80 transition-opacity font-sans text-[10px] font-bold uppercase tracking-widest border" style={{ color: data.eventCard1AccentColor || 'var(--secondary)', borderColor: data.eventCard1AccentColor || 'var(--secondary)' }}>
                  <Navigation className="w-3 h-3" /> Buka Peta
                </a>
              )}
            </motion.div>

            {/* Resepsi Card */}
            <motion.div 
              className="p-10 rounded-[30px] border shadow-sm text-center relative overflow-hidden"
              style={{ 
                backgroundColor: data.eventCard2BgColor || 'var(--bg-color)',
                color: data.eventCard2TextColor || 'var(--primary)',
                borderColor: data.eventCard2AccentColor ? `${data.eventCard2AccentColor}4d` : 'rgba(197,160,89,0.3)'
              }}
              variants={scaleUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <CalendarHeart className="w-6 h-6 mx-auto mb-6 opacity-80" style={{ color: data.eventCard2AccentColor || 'var(--secondary)' }} />
              <h3 className="font-script text-4xl mb-6">Resepsi</h3>
              <div className="space-y-2 font-sans text-sm opacity-80">
                <p className="font-bold tracking-wider">{data.resepsiHari ? `${data.resepsiHari}, ${data.resepsiTanggal}` : formattedDate}</p>
                <p className="tracking-widest text-xs mt-1">{data.resepsiWaktu || data.resepsiTime || "11:00 WIB - 14:00 WIB"}</p>
                <div className="w-8 h-px mx-auto my-6" style={{ backgroundColor: data.eventCard2AccentColor || 'var(--secondary)' }} />
                <p className="font-bold">{data.resepsiLokasi || "Lokasi Resepsi"}</p>
                <p className="text-xs font-serif leading-relaxed mt-2">{data.resepsiAlamat || data.resepsiLocation || data.venue || "Grand Ballroom, Jakarta"}</p>
              </div>
              {(data.resepsiMapLink || data.mapLink) && (
                <a href={data.resepsiMapLink || data.mapLink} target="_blank" rel="noreferrer" className="mt-8 mx-auto flex items-center justify-center gap-2 w-max px-6 py-2 rounded-full hover:opacity-80 transition-opacity font-sans text-[10px] font-bold uppercase tracking-widest border" style={{ color: data.eventCard2AccentColor || 'var(--secondary)', borderColor: data.eventCard2AccentColor || 'var(--secondary)' }}>
                  <Navigation className="w-3 h-3" /> Buka Peta
                </a>
              )}
            </motion.div>
          </div>
        </div>
        <CustomInjector html={data.customHtml_event} css={data.customCss_event} js={data.customJs_event} />
      </section>

      {/* VIDEO PREWEDDING */}
      {data.videoUrl && (
        <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.galleryBgColor || 'var(--bg-color)' }}>
          <div className="relative z-10 max-w-4xl mx-auto text-center">
            <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
              <Camera className="w-8 h-8 mx-auto mb-4" style={{ color: data.galleryIconColor || 'var(--secondary)' }} />
              <h2 className="font-script text-6xl mb-10" style={{ color: data.galleryTitleColor || 'var(--primary)' }}>Video Prewedding</h2>
              <div className="relative w-full overflow-hidden rounded-3xl shadow-xl aspect-video border-4" style={{ borderColor: data.galleryIconColor || 'var(--secondary)' }}>
                <iframe 
                  className="absolute inset-0 w-full h-full"
                  src={data.videoUrl.replace("watch?v=", "embed/")} 
                  title="Prewedding Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. GALLERY SECTION */}
      <section className="relative w-full py-24 px-8 border-y border-[var(--secondary)]/20 overflow-hidden" style={{ backgroundColor: data.galleryBgColor || 'rgba(255,255,255,0.3)' }}>
        {renderBg(data.galleryBgUrl, "")}

        {renderDynamicOrnaments(data.galleryOrnaments)}

        <div className="relative z-10 max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Camera className="w-8 h-8 mx-auto mb-4" style={{ color: data.galleryIconColor || 'var(--secondary)' }} />
            <h2 className="font-script text-6xl" style={{ color: data.galleryTitleColor || 'var(--primary)' }}>Galeri Kami</h2>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {data.galleryMode === 'slider' ? (
               <div className="w-full overflow-hidden flex flex-nowrap py-4 mt-8 relative">
                  <motion.div 
                    className="flex gap-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                  >
                     {(() => {
                       const photos = data.galleryPhotos ? data.galleryPhotos.split(',').filter(Boolean) : [1,2,3,4,5,6].map(i => `https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop&sig=${i}`);
                       const duplicated = [...photos, ...photos];
                       return duplicated.map((photoUrl: string, i: number) => (
                         <div key={i} className="w-64 h-80 shrink-0 rounded-2xl overflow-hidden shadow-lg border-4 border-white/50 bg-[var(--primary)]/10">
                           <img src={photoUrl.trim()} className="w-full h-full object-cover" />
                         </div>
                       ));
                     })()}
                  </motion.div>
               </div>
            ) : data.galleryMode === 'stars' ? (
               <TwinklingStarsGallery photos={data.galleryPhotos ? data.galleryPhotos.split(',').filter(Boolean) : [1,2,3,4,5,6].map(i => `https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop&sig=${i}`)} />
            ) : (
               <div className="grid grid-cols-2 @md:grid-cols-4 gap-4 mt-8">
                 {(() => {
                   const photos = data.galleryPhotos ? data.galleryPhotos.split(',').filter(Boolean) : [1,2,3,4,5,6,7,8].map(i => `https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop&sig=${i}`);
                   return photos.map((photoUrl: string, i: number) => (
                     <motion.div key={i} variants={fadeInUp} className="aspect-square rounded-2xl overflow-hidden shadow-md bg-[var(--primary)]/10">
                       <img src={photoUrl.trim()} alt="Gallery" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                     </motion.div>
                   ));
                 })()}
               </div>
            )}
          </motion.div>
        </div>
        {/* WISHES DISPLAY IN GALLERY */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 pb-24">
          {/* WISHES DISPLAY (Slider / List) */}
          {wishes && wishes.length > 0 && (
            <motion.div 
              className="mt-16 w-full"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <h3 className="font-serif text-3xl mb-8 text-center" style={{ color: data.rsvpTitleColor || '#ffffff' }}>Ucapan & Doa</h3>
              <div className="w-full max-h-[500px] overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                {wishes.map((wish: any) => (
                  <div key={wish.id} className="p-6 rounded-2xl border backdrop-blur-sm" style={{ backgroundColor: data.rsvpFormBgColor || 'rgba(255,255,255,0.1)', color: data.rsvpFormTextColor || '#ffffff', borderColor: data.rsvpFormTextColor ? `${data.rsvpFormTextColor}33` : 'rgba(255,255,255,0.2)' }}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-lg">{wish.name}</h4>
                      <span className="text-xs uppercase tracking-wider opacity-60 bg-white/10 px-2 py-1 rounded-full">
                        {wish.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                      </span>
                    </div>
                    <p className="opacity-90 font-serif leading-relaxed">{wish.message}</p>
                  </div>
                ))}
              </div>
              
              <style dangerouslySetInnerHTML={{__html: `
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: ${data.rsvpTitleColor || '#ffffff'}80; border-radius: 10px; }
              `}} />
            </motion.div>
          )}
        </div>
        <CustomInjector html={data.customHtml_gallery} css={data.customCss_gallery} js={data.customJs_gallery} />
      </section>

      {/* 6. GIFT SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.giftBgColor || 'var(--bg-color)' }}>
        {renderBg(data.giftBgUrl, "")}

        {renderDynamicOrnaments(data.giftOrnaments)}

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Gift className="w-10 h-10 mx-auto mb-6" style={{ color: data.giftIconColor || 'var(--secondary)' }} />
            <h2 className="font-script text-6xl mb-6" style={{ color: data.giftTitleColor || 'var(--primary)' }}>Wedding Gift</h2>
            <p className="font-serif text-lg opacity-80 mb-10 leading-relaxed" style={{ color: data.giftTextColor || 'var(--primary)' }}>
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. 
              Namun jika Anda ingin memberikan tanda kasih, dapat melalui:
            </p>
            
            <div className="flex flex-col gap-6 w-full max-w-sm mx-auto">
              {(data.bank1Name || data.bank1Number) && (
                <div className="p-8 rounded-3xl border shadow-lg" style={{ backgroundColor: data.giftCardBgColor || '#ffffff', color: data.giftCardTextColor || 'var(--primary)', borderColor: data.giftIconColor ? `${data.giftIconColor}4d` : 'var(--secondary)' }}>
                  <h4 className="font-sans font-bold text-xl mb-2" style={{ color: data.giftCardTitleColor || 'inherit' }}>{data.bank1Name || "Bank 1"}</h4>
                  <p className="font-mono text-xl tracking-widest mb-4 break-all">{data.bank1Number}</p>
                  <p className="font-serif opacity-70 mb-6">a.n {data.bank1Holder}</p>
                  <button onClick={() => navigator.clipboard.writeText(data.bank1Number as string)} className="px-6 py-2 font-semibold rounded-full hover:opacity-80 transition-colors border" style={{ backgroundColor: data.giftIconColor ? `${data.giftIconColor}1a` : 'rgba(200,162,76,0.1)', color: data.giftIconColor || 'var(--secondary)', borderColor: data.giftIconColor || 'var(--secondary)' }}>Salin Rekening</button>
                </div>
              )}
              
              {(data.bank2Name || data.bank2Number) && (
                <div className="p-8 rounded-3xl border shadow-lg" style={{ backgroundColor: data.giftCardBgColor || '#ffffff', color: data.giftCardTextColor || 'var(--primary)', borderColor: data.giftIconColor ? `${data.giftIconColor}4d` : 'var(--secondary)' }}>
                  <h4 className="font-sans font-bold text-xl mb-2" style={{ color: data.giftCardTitleColor || 'inherit' }}>{data.bank2Name || "Bank 2"}</h4>
                  <p className="font-mono text-xl tracking-widest mb-4 break-all">{data.bank2Number}</p>
                  <p className="font-serif opacity-70 mb-6">a.n {data.bank2Holder}</p>
                  <button onClick={() => navigator.clipboard.writeText(data.bank2Number as string)} className="px-6 py-2 font-semibold rounded-full hover:opacity-80 transition-colors border" style={{ backgroundColor: data.giftIconColor ? `${data.giftIconColor}1a` : 'rgba(200,162,76,0.1)', color: data.giftIconColor || 'var(--secondary)', borderColor: data.giftIconColor || 'var(--secondary)' }}>Salin Rekening</button>
                </div>
              )}

              {data.qrisUrl && (
                <div className="p-8 rounded-3xl border shadow-lg" style={{ backgroundColor: data.giftCardBgColor || '#ffffff', color: data.giftCardTextColor || 'var(--primary)', borderColor: data.giftIconColor ? `${data.giftIconColor}4d` : 'var(--secondary)' }}>
                  <h4 className="font-sans font-bold text-xl mb-4" style={{ color: data.giftCardTitleColor || 'inherit' }}>QRIS</h4>
                  <img src={data.qrisUrl as string} alt="QRIS" className="w-full rounded-xl" />
                </div>
              )}

              {(data.giftAlamat || data.giftPenerima) && (
                <div className="p-8 rounded-3xl border shadow-lg text-left" style={{ backgroundColor: data.giftCardBgColor || '#ffffff', color: data.giftCardTextColor || 'var(--primary)', borderColor: data.giftIconColor ? `${data.giftIconColor}4d` : 'var(--secondary)' }}>
                  <h4 className="font-sans font-bold text-xl mb-4 text-center" style={{ color: data.giftCardTitleColor || 'inherit' }}>Kirim Kado</h4>
                  <p className="font-bold">{data.giftPenerima}</p>
                  <p className="mb-2 opacity-80">{data.giftHp}</p>
                  <p className="font-serif opacity-80 text-sm leading-relaxed whitespace-pre-wrap">{data.giftAlamat}</p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
        <CustomInjector html={data.customHtml_gift} css={data.customCss_gift} js={data.customJs_gift} />
      </section>

      {/* 7. RSVP SECTION */}
      <section className="relative w-full py-24 px-8 overflow-hidden" style={{ backgroundColor: data.rsvpBgColor || 'var(--primary)' }}>
        {renderBg(data.rsvpBgUrl, "")}
        {renderDynamicOrnaments(data.rsvpOrnaments)}

        <div className="relative z-10 max-w-2xl mx-auto">
          <motion.div 
            className="text-center mb-12"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h2 className="font-script text-6xl mb-4" style={{ color: data.rsvpTitleColor || '#ffffff' }}>RSVP</h2>
            <p className="font-serif" style={{ color: data.rsvpSubtitleColor || 'rgba(255,255,255,0.8)' }}>Mohon konfirmasi kehadiran Anda sebelum tanggal {formattedDate}</p>
          </motion.div>

          <motion.form 
            onSubmit={handleRsvpSubmit}
            className="backdrop-blur-md p-8 rounded-3xl border flex flex-col gap-6"
            style={{ backgroundColor: data.rsvpFormBgColor || 'rgba(255,255,255,0.1)', color: data.rsvpFormTextColor || '#ffffff', borderColor: data.rsvpFormTextColor ? `${data.rsvpFormTextColor}33` : 'rgba(255,255,255,0.2)' }}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {rsvpStatus === 'success' && (
              <div className="p-4 rounded-xl bg-green-500/20 border border-green-500/50 text-center">
                Terima kasih! RSVP dan Ucapan Anda telah terkirim.
              </div>
            )}
            {rsvpStatus === 'error' && (
              <div className="p-4 rounded-xl bg-red-500/20 border border-red-500/50 text-center">
                Maaf, terjadi kesalahan. Silakan coba lagi.
              </div>
            )}
            <div>
              <label className="block font-sans text-sm tracking-wider uppercase mb-2 opacity-80">Nama Anda</label>
              <input type="text" required value={rsvpForm.name} onChange={e => setRsvpForm({...rsvpForm, name: e.target.value})} className="w-full bg-white/5 border rounded-xl p-4 focus:outline-none transition-colors" style={{ borderColor: 'inherit', color: 'inherit' }} placeholder="Masukkan nama..." />
            </div>
            <div>
              <label className="block font-sans text-sm tracking-wider uppercase mb-2 opacity-80">Kehadiran</label>
              <select value={rsvpForm.attendance} onChange={e => setRsvpForm({...rsvpForm, attendance: e.target.value})} className="w-full bg-white/5 border rounded-xl p-4 focus:outline-none transition-colors appearance-none" style={{ borderColor: 'inherit', color: 'inherit' }}>
                <option value="hadir" className="text-black">Ya, Saya akan hadir</option>
                <option value="tidak" className="text-black">Maaf, Saya tidak bisa hadir</option>
              </select>
            </div>
            {rsvpForm.attendance === 'hadir' && (
              <div>
                <label className="block font-sans text-sm tracking-wider uppercase mb-2 opacity-80">Jumlah Tamu</label>
                <select value={rsvpForm.guestsCount} onChange={e => setRsvpForm({...rsvpForm, guestsCount: e.target.value})} className="w-full bg-white/5 border rounded-xl p-4 focus:outline-none transition-colors appearance-none" style={{ borderColor: 'inherit', color: 'inherit' }}>
                  <option value="1" className="text-black">1 Orang</option>
                  <option value="2" className="text-black">2 Orang</option>
                </select>
              </div>
            )}
            <div>
              <label className="block font-sans text-sm tracking-wider uppercase mb-2 opacity-80">Ucapan & Doa</label>
              <textarea required value={rsvpForm.message} onChange={e => setRsvpForm({...rsvpForm, message: e.target.value})} rows={3} className="w-full bg-white/5 border rounded-xl p-4 focus:outline-none transition-colors resize-none" style={{ borderColor: 'inherit', color: 'inherit' }} placeholder="Tuliskan ucapan dan doa untuk mempelai..."></textarea>
            </div>
            <button type="submit" disabled={isSubmittingRsvp} className="w-full py-4 mt-4 font-bold tracking-widest uppercase rounded-xl hover:opacity-80 transition-opacity disabled:opacity-50" style={{ backgroundColor: data.rsvpButtonBgColor || 'var(--secondary)', color: data.rsvpButtonTextColor || '#ffffff' }}>
              {isSubmittingRsvp ? 'Mengirim...' : 'Kirim Konfirmasi'}
            </button>
          </motion.form>
          

        </div>
        <CustomInjector html={data.customHtml_rsvp} css={data.customCss_rsvp} js={data.customJs_rsvp} />
      </section>

      {/* 8. FOOTER */}
      <footer className="relative w-full py-16 text-center border-t overflow-hidden" style={{ backgroundColor: data.footerBgColor || 'rgba(255,255,255,0.5)', borderColor: 'rgba(200,162,76,0.3)' }}>
        {renderBg(data.footerBgUrl, "")}

        <motion.div
          className="relative z-10"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="font-script text-5xl mb-4" style={{ color: data.footerTitleColor || 'var(--primary)' }}>{data.brideName || "Nova"} & {data.groomName || "Partner"}</h2>
          <p className="font-sans text-sm tracking-widest uppercase mb-8" style={{ color: data.footerTextColor || 'var(--primary)', opacity: 0.6 }}>Terima Kasih</p>
          <p className="font-sans text-xs" style={{ color: data.footerTextColor || 'var(--primary)', opacity: 0.4 }}>Powered by OnOurWeddingDay</p>
        </motion.div>
        <CustomInjector html={data.customHtml_footer} css={data.customCss_footer} js={data.customJs_footer} />
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
