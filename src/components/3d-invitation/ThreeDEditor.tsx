"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink, ChevronDown, ChevronRight, Image as ImageIcon, MapPin, Users, Heart, Camera, Gift, Type, Layout, Palette, Code, Eye, Music, Smartphone, Tablet, Monitor } from "lucide-react";
import Link from "next/link";
import Experience from "./Experience";
import FileUpload from "@/components/ui/FileUpload";

interface ThreeDEditorProps {
  invitation: any;
}

export default function ThreeDEditor({ invitation }: ThreeDEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("cover");
  const [isCodeMode, setIsCodeMode] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
  
  const [formData, setFormData] = useState({
    // Global Colors
    primaryColor: invitation.settingsJSON?.primaryColor || "#500000",
    secondaryColor: invitation.settingsJSON?.secondaryColor || "#C8A24C",
    bgColor: invitation.settingsJSON?.bgColor || "#fff1f2",

    // Cover & Audio
    coverDesktopBgUrl: invitation.settingsJSON?.coverDesktopBgUrl || "",
    coverMobileBgUrl: invitation.settingsJSON?.coverMobileBgUrl || "",
    bgMusicUrl: invitation.settingsJSON?.bgMusicUrl || "",
    coverTitleColor: invitation.settingsJSON?.coverTitleColor || "#ffffff",
    coverButtonBgColor: invitation.settingsJSON?.coverButtonBgColor || "#C8A24C",
    coverButtonTextColor: invitation.settingsJSON?.coverButtonTextColor || "#ffffff",
    customHtml_cover: invitation.settingsJSON?.customHtml_cover || "",
    customCss_cover: invitation.settingsJSON?.customCss_cover || "",
    customJs_cover: invitation.settingsJSON?.customJs_cover || "",

    // Hero
    heroBgUrl: invitation.settingsJSON?.heroBgUrl || "",
    heroTextColor: invitation.settingsJSON?.heroTextColor || "#ffffff",
    brideName: invitation.settingsJSON?.brideName || "Nova",
    groomName: invitation.settingsJSON?.groomName || "Partner",
    weddingDate: invitation.settingsJSON?.weddingDate || "2024-06-15T19:30",
    customHtml_hero: invitation.settingsJSON?.customHtml_hero || "",
    customCss_hero: invitation.settingsJSON?.customCss_hero || "",
    customJs_hero: invitation.settingsJSON?.customJs_hero || "",
    
    // Quote
    quoteBgUrl: invitation.settingsJSON?.quoteBgUrl || "",
    quoteBgColor: invitation.settingsJSON?.quoteBgColor || "",
    quoteTextColor: invitation.settingsJSON?.quoteTextColor || "",
    quoteIconColor: invitation.settingsJSON?.quoteIconColor || "",
    quoteSourceColor: invitation.settingsJSON?.quoteSourceColor || "",
    quoteText: invitation.settingsJSON?.quoteText || "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu isteri-isteri dari jenismu sendiri...",
    quoteSource: invitation.settingsJSON?.quoteSource || "Ar-Rum: 21",
    customHtml_quote: invitation.settingsJSON?.customHtml_quote || "",
    customCss_quote: invitation.settingsJSON?.customCss_quote || "",
    customJs_quote: invitation.settingsJSON?.customJs_quote || "",
    
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
    customHtml_couple: invitation.settingsJSON?.customHtml_couple || "",
    customCss_couple: invitation.settingsJSON?.customCss_couple || "",
    customJs_couple: invitation.settingsJSON?.customJs_couple || "",
    
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
    customHtml_event: invitation.settingsJSON?.customHtml_event || "",
    customCss_event: invitation.settingsJSON?.customCss_event || "",
    customJs_event: invitation.settingsJSON?.customJs_event || "",
    
    // Gallery
    galleryBgUrl: invitation.settingsJSON?.galleryBgUrl || "",
    galleryBgColor: invitation.settingsJSON?.galleryBgColor || "",
    galleryTitleColor: invitation.settingsJSON?.galleryTitleColor || "",
    galleryIconColor: invitation.settingsJSON?.galleryIconColor || "",
    galleryPhotos: invitation.settingsJSON?.galleryPhotos || "",
    customHtml_gallery: invitation.settingsJSON?.customHtml_gallery || "",
    customCss_gallery: invitation.settingsJSON?.customCss_gallery || "",
    customJs_gallery: invitation.settingsJSON?.customJs_gallery || "",
    
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
    customHtml_gift: invitation.settingsJSON?.customHtml_gift || "",
    customCss_gift: invitation.settingsJSON?.customCss_gift || "",
    customJs_gift: invitation.settingsJSON?.customJs_gift || "",
    
    // RSVP
    rsvpBgUrl: invitation.settingsJSON?.rsvpBgUrl || "",
    rsvpBgColor: invitation.settingsJSON?.rsvpBgColor || "",
    rsvpTitleColor: invitation.settingsJSON?.rsvpTitleColor || "",
    rsvpSubtitleColor: invitation.settingsJSON?.rsvpSubtitleColor || "",
    rsvpFormBgColor: invitation.settingsJSON?.rsvpFormBgColor || "",
    rsvpFormTextColor: invitation.settingsJSON?.rsvpFormTextColor || "",
    rsvpButtonBgColor: invitation.settingsJSON?.rsvpButtonBgColor || "",
    rsvpButtonTextColor: invitation.settingsJSON?.rsvpButtonTextColor || "",
    customHtml_rsvp: invitation.settingsJSON?.customHtml_rsvp || "",
    customCss_rsvp: invitation.settingsJSON?.customCss_rsvp || "",
    customJs_rsvp: invitation.settingsJSON?.customJs_rsvp || "",
    
    // Footer
    footerBgUrl: invitation.settingsJSON?.footerBgUrl || "",
    footerBgColor: invitation.settingsJSON?.footerBgColor || "",
    footerTitleColor: invitation.settingsJSON?.footerTitleColor || "",
    footerTextColor: invitation.settingsJSON?.footerTextColor || "",
    customHtml_footer: invitation.settingsJSON?.customHtml_footer || "",
    customCss_footer: invitation.settingsJSON?.customCss_footer || "",
    customJs_footer: invitation.settingsJSON?.customJs_footer || "",
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

  const toggleCodeMode = () => {
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

  const CodeEditorGroup = ({ sectionId }: { sectionId: string }) => (
    <div className="space-y-6">
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <label className="block text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">Custom HTML</label>
        <textarea
          name={`customHtml_${sectionId}`}
          value={formData[`customHtml_${sectionId}` as keyof typeof formData] as string || ''}
          onChange={handleChange}
          placeholder={`<div class="custom-block">...</div>`}
          rows={4}
          className="w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-y"
        />
      </div>
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <label className="block text-xs font-semibold uppercase tracking-wider text-blue-400 mb-2">Custom CSS</label>
        <textarea
          name={`customCss_${sectionId}`}
          value={formData[`customCss_${sectionId}` as keyof typeof formData] as string || ''}
          onChange={handleChange}
          placeholder={`.custom-block { color: red; }`}
          rows={4}
          className="w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-y"
        />
      </div>
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <label className="block text-xs font-semibold uppercase tracking-wider text-yellow-400 mb-2">Custom JS</label>
        <textarea
          name={`customJs_${sectionId}`}
          value={formData[`customJs_${sectionId}` as keyof typeof formData] as string || ''}
          onChange={handleChange}
          placeholder={`console.log("Hello from ${sectionId}");`}
          rows={4}
          className="w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-y"
        />
      </div>
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
              className={`p-2 rounded-xl transition-colors ${isCodeMode ? 'bg-gray-900 text-white' : 'bg-secondary/10 text-foreground hover:bg-secondary/30'}`}
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

        <div className={`p-4 overflow-y-auto flex-1 ${isCodeMode ? 'bg-gray-800' : 'bg-secondary/5'}`}>
          
          {/* THEME (Only in visual mode) */}
          {!isCodeMode && (
            <AccordionItem id="theme" title="Tema Global" icon={Palette}>
              <InputField label="Global Primary Color" name="primaryColor" type="color" />
              <InputField label="Global Secondary Color" name="secondaryColor" type="color" />
              <InputField label="Global Background Color" name="bgColor" type="color" />
            </AccordionItem>
          )}

          {/* COVER & AUDIO */}
          <AccordionItem id="cover" title="Cover & Audio" icon={Music}>
            {isCodeMode ? <CodeEditorGroup sectionId="cover" /> : (
              <>
                <FileUpload label="Background Music (Audio URL/Upload)" name="bgMusicUrl" value={formData.bgMusicUrl} onChange={handleUploadChange} placeholder="https://...mp3" />
                
                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Cover Images</h4>
                <FileUpload label="Cover Image (Desktop/Landscape)" name="coverDesktopBgUrl" value={formData.coverDesktopBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <FileUpload label="Cover Image (Mobile/Portrait)" name="coverMobileBgUrl" value={formData.coverMobileBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Cover Colors</h4>
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Title Color" name="coverTitleColor" type="color" />
                  <InputField label="Button Background" name="coverButtonBgColor" type="color" />
                  <InputField label="Button Text Color" name="coverButtonTextColor" type="color" />
                </div>
              </>
            )}
          </AccordionItem>

          {/* HERO */}
          <AccordionItem id="hero" title="Hero Section" icon={Layout}>
            {isCodeMode ? <CodeEditorGroup sectionId="hero" /> : (
              <>
                <FileUpload label="Background Media (URL/Upload)" name="heroBgUrl" value={formData.heroBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <InputField label="Text Color" name="heroTextColor" type="color" />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <InputField label="Bride Name" name="brideName" />
                  <InputField label="Groom Name" name="groomName" />
                </div>
                <InputField label="Wedding Date & Time" name="weddingDate" type="datetime-local" />
              </>
            )}
          </AccordionItem>

          {/* QUOTE */}
          <AccordionItem id="quote" title="Quote Section" icon={Type}>
            {isCodeMode ? <CodeEditorGroup sectionId="quote" /> : (
              <>
                <FileUpload label="Background Media" name="quoteBgUrl" value={formData.quoteBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Section Background Color" name="quoteBgColor" type="color" />
                  <InputField label="Quote Text Color" name="quoteTextColor" type="color" />
                  <InputField label="Quote Icon Color" name="quoteIconColor" type="color" />
                  <InputField label="Quote Source Color" name="quoteSourceColor" type="color" />
                </div>
                <InputField label="Quote Text" name="quoteText" multiline />
                <InputField label="Quote Source" name="quoteSource" placeholder="e.g. Ar-Rum: 21" />
              </>
            )}
          </AccordionItem>

          {/* COUPLE */}
          <AccordionItem id="couple" title="Mempelai Section" icon={Heart}>
            {isCodeMode ? <CodeEditorGroup sectionId="couple" /> : (
              <>
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
              </>
            )}
          </AccordionItem>

          {/* EVENTS */}
          <AccordionItem id="events" title="Detail Acara Section" icon={MapPin}>
            {isCodeMode ? <CodeEditorGroup sectionId="event" /> : (
              <>
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
              </>
            )}
          </AccordionItem>

          {/* GALLERY */}
          <AccordionItem id="gallery" title="Galeri Section" icon={Camera}>
            {isCodeMode ? <CodeEditorGroup sectionId="gallery" /> : (
              <>
                <FileUpload label="Background Media" name="galleryBgUrl" value={formData.galleryBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="galleryBgColor" type="color" />
                  <InputField label="Title Color" name="galleryTitleColor" type="color" />
                  <InputField label="Icon Color" name="galleryIconColor" type="color" />
                </div>

                <FileUpload label="Photos (URL/Upload)" name="galleryPhotos" value={formData.galleryPhotos} onChange={handleUploadChange} placeholder="Upload photos..." multiline />
                <p className="text-xs text-foreground/50 mt-1 mb-4">Pisahkan dengan koma.</p>
              </>
            )}
          </AccordionItem>

          {/* GIFT */}
          <AccordionItem id="gift" title="Wedding Gift Section" icon={Gift}>
            {isCodeMode ? <CodeEditorGroup sectionId="gift" /> : (
              <>
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
              </>
            )}
          </AccordionItem>

          {/* RSVP */}
          <AccordionItem id="rsvp" title="RSVP Section" icon={Users}>
            {isCodeMode ? <CodeEditorGroup sectionId="rsvp" /> : (
              <>
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
              </>
            )}
          </AccordionItem>
          
          {/* FOOTER */}
          <AccordionItem id="footer" title="Footer Section" icon={ImageIcon}>
            {isCodeMode ? <CodeEditorGroup sectionId="footer" /> : (
              <>
                <FileUpload label="Background Media" name="footerBgUrl" value={formData.footerBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="grid grid-cols-2 gap-4">
                  <InputField label="Background Color" name="footerBgColor" type="color" />
                  <InputField label="Title Color" name="footerTitleColor" type="color" />
                  <InputField label="Text Color" name="footerTextColor" type="color" />
                </div>
              </>
            )}
          </AccordionItem>

          {!isCodeMode && (
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
          )}
        </div>
      </div>

      {/* RIGHT AREA: Live Preview */}
      <div className="flex-1 relative bg-gray-950 overflow-y-auto h-full flex flex-col items-center">
         {/* Responsive Toolbar */}
         <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[60] flex items-center gap-2 bg-gray-900/80 backdrop-blur-md p-1.5 rounded-full border border-gray-700 shadow-xl">
           <button onClick={() => setPreviewMode("mobile")} className={`p-2 rounded-full transition-colors ${previewMode === 'mobile' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Mobile Preview">
             <Smartphone className="w-4 h-4" />
           </button>
           <button onClick={() => setPreviewMode("tablet")} className={`p-2 rounded-full transition-colors ${previewMode === 'tablet' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Tablet Preview">
             <Tablet className="w-4 h-4" />
           </button>
           <button onClick={() => setPreviewMode("desktop")} className={`p-2 rounded-full transition-colors ${previewMode === 'desktop' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`} title="Desktop Preview">
             <Monitor className="w-4 h-4" />
           </button>
         </div>

         {/* Render the Experience component in a constrained box based on mode */}
         <div className={`transition-all duration-500 ease-in-out bg-white ${
            previewMode === 'mobile' ? 'w-[375px] h-[812px] my-auto mt-20 border-[8px] border-gray-800 rounded-[40px] shadow-2xl overflow-hidden relative shrink-0' : 
            previewMode === 'tablet' ? 'w-[768px] h-[1024px] my-auto mt-20 border-[8px] border-gray-800 rounded-[30px] shadow-2xl overflow-hidden relative shrink-0' : 
            'w-full h-full relative'
         }`}>
            <Experience data={{...invitation.settingsJSON, ...formData}} />
         </div>
      </div>
    </div>
  );
}
