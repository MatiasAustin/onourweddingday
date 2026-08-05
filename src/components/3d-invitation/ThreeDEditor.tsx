"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink, ChevronDown, ChevronRight, Image as ImageIcon, MapPin, Users, Heart, Camera, Gift, Type, Layout, Palette, Code, Eye } from "lucide-react";
import Link from "next/link";
import Experience from "./Experience";
import FileUpload from "@/components/ui/FileUpload";

interface ThreeDEditorProps {
  invitation: any;
}

export default function ThreeDEditor({ invitation }: ThreeDEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("theme");
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [jsonText, setJsonText] = useState("");
  
  const [formData, setFormData] = useState({
    // Global Colors
    primaryColor: invitation.settingsJSON?.primaryColor || "#500000",
    secondaryColor: invitation.settingsJSON?.secondaryColor || "#C8A24C",
    bgColor: invitation.settingsJSON?.bgColor || "#fff1f2",

    // Hero
    heroBgUrl: invitation.settingsJSON?.heroBgUrl || "",
    heroTextColor: invitation.settingsJSON?.heroTextColor || "#ffffff",
    brideName: invitation.settingsJSON?.brideName || "Nova",
    groomName: invitation.settingsJSON?.groomName || "Partner",
    weddingDate: invitation.settingsJSON?.weddingDate || "2024-06-15T19:30",
    
    // Quote
    quoteBgUrl: invitation.settingsJSON?.quoteBgUrl || "",
    quoteBgColor: invitation.settingsJSON?.quoteBgColor || "",
    quoteTextColor: invitation.settingsJSON?.quoteTextColor || "",
    quoteIconColor: invitation.settingsJSON?.quoteIconColor || "",
    quoteSourceColor: invitation.settingsJSON?.quoteSourceColor || "",
    quoteText: invitation.settingsJSON?.quoteText || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...",
    quoteSource: invitation.settingsJSON?.quoteSource || "Ar-Rum: 21",
    
    // Couple
    coupleBgUrl: invitation.settingsJSON?.coupleBgUrl || "",
    coupleBgColor: invitation.settingsJSON?.coupleBgColor || "",
    coupleTitleColor: invitation.settingsJSON?.coupleTitleColor || "",
    coupleSubtitleColor: invitation.settingsJSON?.coupleSubtitleColor || "",
    coupleNameColor: invitation.settingsJSON?.coupleNameColor || "",
    coupleTextColor: invitation.settingsJSON?.coupleTextColor || "",
    coupleAccentColor: invitation.settingsJSON?.coupleAccentColor || "",
    bridePhotoUrl: invitation.settingsJSON?.bridePhotoUrl || "",
    brideParents: invitation.settingsJSON?.brideParents || "Bapak Fulan & Ibu Fulanah",
    groomPhotoUrl: invitation.settingsJSON?.groomPhotoUrl || "",
    groomParents: invitation.settingsJSON?.groomParents || "Bapak Fulan & Ibu Fulanah",
    
    // Events
    eventBgUrl: invitation.settingsJSON?.eventBgUrl || "",
    eventBgColor: invitation.settingsJSON?.eventBgColor || "",
    eventTitleColor: invitation.settingsJSON?.eventTitleColor || "",
    eventSubtitleColor: invitation.settingsJSON?.eventSubtitleColor || "",
    eventCard1BgColor: invitation.settingsJSON?.eventCard1BgColor || "",
    eventCard1TextColor: invitation.settingsJSON?.eventCard1TextColor || "",
    eventCard1AccentColor: invitation.settingsJSON?.eventCard1AccentColor || "",
    eventCard2BgColor: invitation.settingsJSON?.eventCard2BgColor || "",
    eventCard2TextColor: invitation.settingsJSON?.eventCard2TextColor || "",
    eventCard2AccentColor: invitation.settingsJSON?.eventCard2AccentColor || "",
    akadTime: invitation.settingsJSON?.akadTime || "08:00 WIB - Selesai",
    akadLocation: invitation.settingsJSON?.akadLocation || "Masjid Agung, Jakarta",
    resepsiTime: invitation.settingsJSON?.resepsiTime || "11:00 WIB - 14:00 WIB",
    resepsiLocation: invitation.settingsJSON?.resepsiLocation || "Grand Ballroom, Jakarta",
    mapLink: invitation.settingsJSON?.mapLink || "",
    
    // Gallery
    galleryBgUrl: invitation.settingsJSON?.galleryBgUrl || "",
    galleryBgColor: invitation.settingsJSON?.galleryBgColor || "",
    galleryTitleColor: invitation.settingsJSON?.galleryTitleColor || "",
    galleryIconColor: invitation.settingsJSON?.galleryIconColor || "",
    galleryPhotos: invitation.settingsJSON?.galleryPhotos || "",
    
    // Gift
    giftBgUrl: invitation.settingsJSON?.giftBgUrl || "",
    giftBgColor: invitation.settingsJSON?.giftBgColor || "",
    giftTitleColor: invitation.settingsJSON?.giftTitleColor || "",
    giftIconColor: invitation.settingsJSON?.giftIconColor || "",
    giftTextColor: invitation.settingsJSON?.giftTextColor || "",
    giftCardBgColor: invitation.settingsJSON?.giftCardBgColor || "",
    giftCardTitleColor: invitation.settingsJSON?.giftCardTitleColor || "",
    giftCardTextColor: invitation.settingsJSON?.giftCardTextColor || "",
    bankName: invitation.settingsJSON?.bankName || "BCA / PIX",
    pixKey: invitation.settingsJSON?.pixKey || "1234 5678 90",
    accountHolder: invitation.settingsJSON?.accountHolder || "",
    
    // RSVP
    rsvpBgUrl: invitation.settingsJSON?.rsvpBgUrl || "",
    rsvpBgColor: invitation.settingsJSON?.rsvpBgColor || "",
    rsvpTitleColor: invitation.settingsJSON?.rsvpTitleColor || "",
    rsvpSubtitleColor: invitation.settingsJSON?.rsvpSubtitleColor || "",
    rsvpFormBgColor: invitation.settingsJSON?.rsvpFormBgColor || "",
    rsvpFormTextColor: invitation.settingsJSON?.rsvpFormTextColor || "",
    rsvpButtonBgColor: invitation.settingsJSON?.rsvpButtonBgColor || "",
    rsvpButtonTextColor: invitation.settingsJSON?.rsvpButtonTextColor || "",
    
    // Footer
    footerBgUrl: invitation.settingsJSON?.footerBgUrl || "",
    footerBgColor: invitation.settingsJSON?.footerBgColor || "",
    footerTitleColor: invitation.settingsJSON?.footerTitleColor || "",
    footerTextColor: invitation.settingsJSON?.footerTextColor || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUploadChange = (e: { target: { name: string; value: string } }) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonText(e.target.value);
    try {
      const parsed = JSON.parse(e.target.value);
      setFormData(parsed);
    } catch (err) {
      // Don't update formData if JSON is invalid, just let them keep typing
    }
  };

  const toggleCodeMode = () => {
    if (!isCodeMode) {
      setJsonText(JSON.stringify(formData, null, 2));
    }
    setIsCodeMode(!isCodeMode);
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
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={handleChange}
          placeholder={placeholder}
          rows={3}
          className="w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors resize-none text-sm font-mono"
        />
      ) : (
        <div className="flex items-center gap-2">
          {type === 'color' && (
             <div 
               className="w-8 h-8 rounded-lg border border-secondary flex-shrink-0"
               style={{ backgroundColor: formData[name as keyof typeof formData] || 'transparent' }}
             />
          )}
          <input
            type={type}
            name={name}
            value={formData[name as keyof typeof formData]}
            onChange={handleChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm ${type === 'color' ? 'h-10 cursor-pointer p-1' : ''}`}
          />
        </div>
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
          
          <div className="flex items-center gap-2">
            <button 
              onClick={toggleCodeMode}
              className="p-2 bg-secondary/10 text-foreground rounded-xl hover:bg-secondary/30 transition-colors"
              title={isCodeMode ? "Switch to Visual Editor" : "Switch to Code Editor"}
            >
              {isCodeMode ? <Eye className="w-5 h-5" /> : <Code className="w-5 h-5" />}
            </button>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-xl hover:bg-primary-light transition-colors font-medium shadow-sm disabled:opacity-50 text-sm"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>

        <div className="p-4 overflow-y-auto flex-1 bg-secondary/5">
          {isCodeMode ? (
            <div className="h-full flex flex-col">
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">JSON Configuration</label>
              <p className="text-xs text-foreground/50 mb-4">Edit raw settings here. Make sure it is valid JSON.</p>
              <textarea
                value={jsonText}
                onChange={handleJsonChange}
                className="flex-1 w-full p-4 font-mono text-xs bg-gray-900 text-green-400 rounded-xl border border-secondary focus:ring-2 focus:ring-primary/50 resize-none"
              />
            </div>
          ) : (
            <>
              <AccordionItem id="theme" title="Tema Global" icon={Palette}>
                <InputField label="Global Primary Color" name="primaryColor" type="color" />
                <InputField label="Global Secondary Color" name="secondaryColor" type="color" />
                <InputField label="Global Background Color" name="bgColor" type="color" />
              </AccordionItem>

              <AccordionItem id="hero" title="Hero Section" icon={Layout}>
                <FileUpload label="Background Media (URL/Upload)" name="heroBgUrl" value={formData.heroBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <InputField label="Text Color" name="heroTextColor" type="color" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputField label="Bride Name" name="brideName" />
                  <InputField label="Groom Name" name="groomName" />
                </div>
                <InputField label="Wedding Date & Time" name="weddingDate" type="datetime-local" />
              </AccordionItem>

              <AccordionItem id="quote" title="Quote Section" icon={Type}>
                <FileUpload label="Background Media" name="quoteBgUrl" value={formData.quoteBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Section Background Color" name="quoteBgColor" type="color" />
                  <InputField label="Quote Text Color" name="quoteTextColor" type="color" />
                  <InputField label="Quote Icon Color" name="quoteIconColor" type="color" />
                  <InputField label="Quote Source Color" name="quoteSourceColor" type="color" />
                </div>
                <InputField label="Quote Text" name="quoteText" multiline />
                <InputField label="Quote Source" name="quoteSource" placeholder="e.g. Ar-Rum: 21" />
              </AccordionItem>

              <AccordionItem id="couple" title="Mempelai Section" icon={Heart}>
                <FileUpload label="Background Media" name="coupleBgUrl" value={formData.coupleBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Section Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="coupleBgColor" type="color" />
                  <InputField label="Title Color" name="coupleTitleColor" type="color" />
                  <InputField label="Subtitle Color" name="coupleSubtitleColor" type="color" />
                  <InputField label="Accent Color (&)" name="coupleAccentColor" type="color" />
                  <InputField label="Name Color" name="coupleNameColor" type="color" />
                  <InputField label="Text Color" name="coupleTextColor" type="color" />
                </div>

                <div className="p-4 bg-white border border-secondary/30 rounded-lg space-y-4 mb-4 mt-4">
                  <h4 className="text-xs font-bold text-primary uppercase">Bride</h4>
                  <FileUpload label="Photo" name="bridePhotoUrl" value={formData.bridePhotoUrl} onChange={handleUploadChange} placeholder="https://..." />
                  <InputField label="Parents Name" name="brideParents" placeholder="Putri dari..." />
                </div>
                <div className="p-4 bg-white border border-secondary/30 rounded-lg space-y-4">
                  <h4 className="text-xs font-bold text-primary uppercase">Groom</h4>
                  <FileUpload label="Photo" name="groomPhotoUrl" value={formData.groomPhotoUrl} onChange={handleUploadChange} placeholder="https://..." />
                  <InputField label="Parents Name" name="groomParents" placeholder="Putra dari..." />
                </div>
              </AccordionItem>

              <AccordionItem id="events" title="Detail Acara Section" icon={MapPin}>
                <FileUpload label="Background Media" name="eventBgUrl" value={formData.eventBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Section Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="eventBgColor" type="color" />
                  <InputField label="Title Color" name="eventTitleColor" type="color" />
                  <InputField label="Subtitle Color" name="eventSubtitleColor" type="color" />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Akad Card Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Card Background" name="eventCard1BgColor" type="color" />
                  <InputField label="Card Text Color" name="eventCard1TextColor" type="color" />
                  <InputField label="Accent / Button" name="eventCard1AccentColor" type="color" />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Resepsi Card Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Card Background" name="eventCard2BgColor" type="color" />
                  <InputField label="Card Text Color" name="eventCard2TextColor" type="color" />
                  <InputField label="Accent / Button" name="eventCard2AccentColor" type="color" />
                </div>

                <InputField label="Google Maps Link" name="mapLink" placeholder="https://maps.google.com/..." />
                
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputField label="Akad Time" name="akadTime" placeholder="08:00 WIB" />
                  <InputField label="Akad Location" name="akadLocation" placeholder="Masjid..." />
                  <InputField label="Resepsi Time" name="resepsiTime" placeholder="11:00 WIB" />
                  <InputField label="Resepsi Location" name="resepsiLocation" placeholder="Gedung..." />
                </div>
              </AccordionItem>

              <AccordionItem id="gallery" title="Galeri Section" icon={Camera}>
                <FileUpload label="Background Media" name="galleryBgUrl" value={formData.galleryBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="galleryBgColor" type="color" />
                  <InputField label="Title Color" name="galleryTitleColor" type="color" />
                  <InputField label="Icon Color" name="galleryIconColor" type="color" />
                </div>

                <FileUpload label="Photos (URL/Upload)" name="galleryPhotos" value={formData.galleryPhotos} onChange={handleUploadChange} placeholder="Upload photos..." multiline />
                <p className="text-xs text-foreground/50 mt-1 mb-4">Pilih file satu per satu, link akan ditambahkan otomatis.</p>
              </AccordionItem>

              <AccordionItem id="gift" title="Wedding Gift Section" icon={Gift}>
                <FileUpload label="Background Media" name="giftBgUrl" value={formData.giftBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="giftBgColor" type="color" />
                  <InputField label="Title Color" name="giftTitleColor" type="color" />
                  <InputField label="Icon Color" name="giftIconColor" type="color" />
                  <InputField label="Text Color" name="giftTextColor" type="color" />
                  <InputField label="Card Background" name="giftCardBgColor" type="color" />
                  <InputField label="Card Title Color" name="giftCardTitleColor" type="color" />
                  <InputField label="Card Text Color" name="giftCardTextColor" type="color" />
                </div>

                <InputField label="Bank / Wallet Name" name="bankName" placeholder="BCA / Mandiri" />
                <InputField label="Account Number / Pix Key" name="pixKey" />
                <InputField label="Account Holder Name" name="accountHolder" placeholder="A.n Nova" />
              </AccordionItem>

              <AccordionItem id="rsvp" title="RSVP Section" icon={Users}>
                <FileUpload label="Background Media" name="rsvpBgUrl" value={formData.rsvpBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="rsvpBgColor" type="color" />
                  <InputField label="Title Color" name="rsvpTitleColor" type="color" />
                  <InputField label="Subtitle Color" name="rsvpSubtitleColor" type="color" />
                  <InputField label="Form Background" name="rsvpFormBgColor" type="color" />
                  <InputField label="Form Text Color" name="rsvpFormTextColor" type="color" />
                  <InputField label="Button Background" name="rsvpButtonBgColor" type="color" />
                  <InputField label="Button Text Color" name="rsvpButtonTextColor" type="color" />
                </div>
              </AccordionItem>
              
              <AccordionItem id="footer" title="Footer Section" icon={ImageIcon}>
                <FileUpload label="Background Media" name="footerBgUrl" value={formData.footerBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="footerBgColor" type="color" />
                  <InputField label="Title Color" name="footerTitleColor" type="color" />
                  <InputField label="Text Color" name="footerTextColor" type="color" />
                </div>
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
            </>
          )}
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
