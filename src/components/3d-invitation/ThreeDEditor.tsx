"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink, ChevronDown, ChevronRight, Image as ImageIcon, MapPin, Users, Heart, Camera, Gift, Type, Layout } from "lucide-react";
import Link from "next/link";
import Experience from "./Experience";

interface ThreeDEditorProps {
  invitation: any;
}

export default function ThreeDEditor({ invitation }: ThreeDEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("hero");
  
  const [formData, setFormData] = useState({
    // Hero
    heroBgUrl: invitation.settingsJSON?.heroBgUrl || "",
    brideName: invitation.settingsJSON?.brideName || "Nova",
    groomName: invitation.settingsJSON?.groomName || "Partner",
    weddingDate: invitation.settingsJSON?.weddingDate || "2024-06-15T19:30",
    
    // Quote
    quoteBgUrl: invitation.settingsJSON?.quoteBgUrl || "",
    quoteText: invitation.settingsJSON?.quoteText || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...",
    quoteSource: invitation.settingsJSON?.quoteSource || "Ar-Rum: 21",
    
    // Couple
    coupleBgUrl: invitation.settingsJSON?.coupleBgUrl || "",
    bridePhotoUrl: invitation.settingsJSON?.bridePhotoUrl || "",
    brideParents: invitation.settingsJSON?.brideParents || "Bapak Fulan & Ibu Fulanah",
    groomPhotoUrl: invitation.settingsJSON?.groomPhotoUrl || "",
    groomParents: invitation.settingsJSON?.groomParents || "Bapak Fulan & Ibu Fulanah",
    
    // Events
    eventBgUrl: invitation.settingsJSON?.eventBgUrl || "",
    akadTime: invitation.settingsJSON?.akadTime || "08:00 WIB - Selesai",
    akadLocation: invitation.settingsJSON?.akadLocation || "Masjid Agung, Jakarta",
    resepsiTime: invitation.settingsJSON?.resepsiTime || "11:00 WIB - 14:00 WIB",
    resepsiLocation: invitation.settingsJSON?.resepsiLocation || "Grand Ballroom, Jakarta",
    mapLink: invitation.settingsJSON?.mapLink || "",
    
    // Gallery
    galleryBgUrl: invitation.settingsJSON?.galleryBgUrl || "",
    galleryPhotos: invitation.settingsJSON?.galleryPhotos || "",
    
    // Gift
    giftBgUrl: invitation.settingsJSON?.giftBgUrl || "",
    bankName: invitation.settingsJSON?.bankName || "BCA / PIX",
    pixKey: invitation.settingsJSON?.pixKey || "1234 5678 90",
    accountHolder: invitation.settingsJSON?.accountHolder || "",
    
    // Others
    rsvpBgUrl: invitation.settingsJSON?.rsvpBgUrl || "",
    footerBgUrl: invitation.settingsJSON?.footerBgUrl || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateInvitationSettings(invitation.id, formData);
    setIsSaving(false);
    
    if (result.error) {
      alert("Error saving: " + result.error);
    } else {
      alert("Saved successfully!");
    }
  };

  const AccordionItem = ({ id, title, icon: Icon, children }: any) => {
    const isActive = activeTab === id;
    return (
      <div className="border border-secondary/30 rounded-xl overflow-hidden bg-white mb-3">
        <button
          onClick={() => setActiveTab(isActive ? "" : id)}
          className={`w-full flex items-center justify-between p-4 text-left transition-colors ${isActive ? 'bg-primary/5' : 'hover:bg-secondary/10'}`}
        >
          <div className="flex items-center gap-3">
            <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-foreground/50'}`} />
            <span className={`text-sm font-semibold uppercase tracking-wider ${isActive ? 'text-primary' : 'text-foreground/70'}`}>
              {title}
            </span>
          </div>
          {isActive ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-foreground/40" />}
        </button>
        {isActive && (
          <div className="p-5 border-t border-secondary/20 bg-secondary/5 space-y-4">
            {children}
          </div>
        )}
      </div>
    );
  };

  const InputField = ({ label, name, type = "text", placeholder = "", multiline = false }: any) => (
    <div>
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors resize-none text-sm"
        />
      ) : (
        <input
          type={type}
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
        />
      )}
    </div>
  );

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* LEFT SIDEBAR: Editor Form */}
      <div className="w-[450px] flex-shrink-0 bg-white border-r border-secondary/50 flex flex-col h-full z-20 shadow-xl overflow-hidden relative">
        <div className="p-6 border-b border-secondary/30 bg-white/90 backdrop-blur-md z-30 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-2xl font-semibold text-foreground">Editor</h1>
            <p className="text-foreground/60 text-xs mt-1 truncate max-w-[200px]">{invitation.title}</p>
          </div>
          
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-light transition-colors font-medium shadow-sm disabled:opacity-50 text-sm"
          >
            <Save className="w-4 h-4" />
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 bg-secondary/5">
          <AccordionItem id="hero" title="Hero & General" icon={Layout}>
            <InputField label="Hero Background URL (Video/Image)" name="heroBgUrl" placeholder="https://..." />
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Bride Name" name="brideName" />
              <InputField label="Groom Name" name="groomName" />
            </div>
            <InputField label="Wedding Date & Time" name="weddingDate" type="datetime-local" />
          </AccordionItem>

          <AccordionItem id="quote" title="Quote Section" icon={Type}>
            <InputField label="Background URL" name="quoteBgUrl" placeholder="https://..." />
            <InputField label="Quote Text" name="quoteText" multiline />
            <InputField label="Quote Source" name="quoteSource" placeholder="e.g. Ar-Rum: 21" />
          </AccordionItem>

          <AccordionItem id="couple" title="Mempelai" icon={Heart}>
            <InputField label="Background URL" name="coupleBgUrl" placeholder="https://..." />
            <div className="p-3 bg-white border border-secondary/30 rounded-lg space-y-4 mb-4">
              <h4 className="text-xs font-bold text-primary uppercase">Bride</h4>
              <InputField label="Photo URL" name="bridePhotoUrl" placeholder="https://..." />
              <InputField label="Parents Name" name="brideParents" placeholder="Putri dari..." />
            </div>
            <div className="p-3 bg-white border border-secondary/30 rounded-lg space-y-4">
              <h4 className="text-xs font-bold text-primary uppercase">Groom</h4>
              <InputField label="Photo URL" name="groomPhotoUrl" placeholder="https://..." />
              <InputField label="Parents Name" name="groomParents" placeholder="Putra dari..." />
            </div>
          </AccordionItem>

          <AccordionItem id="events" title="Detail Acara" icon={MapPin}>
            <InputField label="Background URL" name="eventBgUrl" placeholder="https://..." />
            <InputField label="Google Maps Link" name="mapLink" placeholder="https://maps.google.com/..." />
            
            <div className="grid grid-cols-2 gap-4 mt-4">
              <InputField label="Akad Time" name="akadTime" placeholder="08:00 WIB" />
              <InputField label="Akad Location" name="akadLocation" placeholder="Masjid..." />
              <InputField label="Resepsi Time" name="resepsiTime" placeholder="11:00 WIB" />
              <InputField label="Resepsi Location" name="resepsiLocation" placeholder="Gedung..." />
            </div>
          </AccordionItem>

          <AccordionItem id="gallery" title="Galeri" icon={Camera}>
            <InputField label="Background URL" name="galleryBgUrl" placeholder="https://..." />
            <InputField label="Photo URLs (Comma separated)" name="galleryPhotos" multiline placeholder="https://img1.jpg, https://img2.jpg" />
            <p className="text-xs text-foreground/50 mt-1">Pisahkan link foto dengan tanda koma.</p>
          </AccordionItem>

          <AccordionItem id="gift" title="Wedding Gift" icon={Gift}>
            <InputField label="Background URL" name="giftBgUrl" placeholder="https://..." />
            <InputField label="Bank / Wallet Name" name="bankName" placeholder="BCA / Mandiri" />
            <InputField label="Account Number / Pix Key" name="pixKey" />
            <InputField label="Account Holder Name" name="accountHolder" placeholder="A.n Nova" />
          </AccordionItem>

          <AccordionItem id="others" title="Lainnya (RSVP & Footer)" icon={ImageIcon}>
            <InputField label="RSVP Background URL" name="rsvpBgUrl" placeholder="https://..." />
            <InputField label="Footer Background URL" name="footerBgUrl" placeholder="https://..." />
          </AccordionItem>

          <div className="pt-4 pb-8">
            <Link 
              href={`/${invitation.slug}`} 
              target="_blank"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white text-foreground border border-secondary rounded-xl hover:bg-secondary/30 transition-colors shadow-sm font-medium text-sm"
            >
              <ExternalLink className="w-4 h-4" />
              Open Live Link
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT AREA: Live Preview */}
      <div className="flex-1 relative bg-black overflow-y-auto h-full">
         <div className="absolute top-4 left-4 z-50 pointer-events-none bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
           <span className="text-white/80 font-mono tracking-widest text-xs uppercase flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             Live Preview
           </span>
         </div>
         {/* Render the Experience component directly with the current formData */}
         <Experience data={{...invitation.settingsJSON, ...formData}} />
      </div>
    </div>
  );
}
