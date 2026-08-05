"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink, ChevronDown, ChevronRight, Image as ImageIcon, MapPin, Users, Heart, Camera, Gift, Type, Layout, Palette, Code, Eye, Music, Smartphone, Tablet, Monitor, BookOpen } from "lucide-react";
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
    primaryColor: invitation.settingsJSON?.primaryColor || "#4A0E17",
    secondaryColor: invitation.settingsJSON?.secondaryColor || "#C5A059",
    bgColor: invitation.settingsJSON?.bgColor || "#F7F3EC",

    // Typography
    fontFamilyTitle: invitation.settingsJSON?.fontFamilyTitle || "Playfair Display",
    fontFamilyBody: invitation.settingsJSON?.fontFamilyBody || "Montserrat",
    fontSizeTitle: invitation.settingsJSON?.fontSizeTitle || "4rem",
    fontSizeBody: invitation.settingsJSON?.fontSizeBody || "1rem",
    fontWeightTitle: invitation.settingsJSON?.fontWeightTitle || "400",
    fontWeightBody: invitation.settingsJSON?.fontWeightBody || "400",
    lineHeightBody: invitation.settingsJSON?.lineHeightBody || "1.6",
    textAlignment: invitation.settingsJSON?.textAlignment || "center",

    // Cover
    coverTitleText: invitation.settingsJSON?.coverTitleText || "WEDDING INVITATION",
    coverSubtitleText: invitation.settingsJSON?.coverSubtitleText || "Kepada Yth.",
    coverDesktopBgUrl: invitation.settingsJSON?.coverDesktopBgUrl || "",
    coverMobileBgUrl: invitation.settingsJSON?.coverMobileBgUrl || "",
    coverTitleColor: invitation.settingsJSON?.coverTitleColor || "#ffffff",
    coverButtonBgColor: invitation.settingsJSON?.coverButtonBgColor || "var(--secondary)",
    coverButtonTextColor: invitation.settingsJSON?.coverButtonTextColor || "#ffffff",
    coverOverlayColor: invitation.settingsJSON?.coverOverlayColor || "#000000",
    coverOverlayOpacity: invitation.settingsJSON?.coverOverlayOpacity || "0.4",
    bgMusicUrl: invitation.settingsJSON?.bgMusicUrl || "",
    customHtml_cover: invitation.settingsJSON?.customHtml_cover || "",
    customCss_cover: invitation.settingsJSON?.customCss_cover || "",
    customJs_cover: invitation.settingsJSON?.customJs_cover || "",

    // Hero
    heroBgUrl: invitation.settingsJSON?.heroBgUrl || "",
    heroTextColor: invitation.settingsJSON?.heroTextColor || "#ffffff",
    heroOverlayColor: invitation.settingsJSON?.heroOverlayColor || "#000000",
    heroOverlayOpacity: invitation.settingsJSON?.heroOverlayOpacity || "0.4",
    heroTextDelay: invitation.settingsJSON?.heroTextDelay || "2",
    heroTitleText: invitation.settingsJSON?.heroTitleText || "VINTAGE JAVANESE WEDDING",
    topOrnamentUrl: invitation.settingsJSON?.topOrnamentUrl || "",
    bottomOrnamentUrl: invitation.settingsJSON?.bottomOrnamentUrl || "",
    heroLayout: invitation.settingsJSON?.heroLayout || "center",
    heroTextAlign: invitation.settingsJSON?.heroTextAlign || "center",
    heroLineHeight: invitation.settingsJSON?.heroLineHeight || "1.2",
    heroTranslateY: invitation.settingsJSON?.heroTranslateY || "0",
    heroDateSpacing: invitation.settingsJSON?.heroDateSpacing || "32",
    brideName: invitation.settingsJSON?.brideName || "Nova",
    groomName: invitation.settingsJSON?.groomName || "Irfan",
    weddingDate: invitation.settingsJSON?.weddingDate || "2026-10-04T08:00",
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
    coupleFrameUrl: invitation.settingsJSON?.coupleFrameUrl || "",
    bridePhotoUrl: invitation.settingsJSON?.bridePhotoUrl || "",
    brideFullName: invitation.settingsJSON?.brideFullName || "Nova Nursaniah",
    brideChildOrder: invitation.settingsJSON?.brideChildOrder || "Putri ke-2",
    brideParents: invitation.settingsJSON?.brideParents || "Bapak Nurdani & Ibu Supriyanti",
    groomPhotoUrl: invitation.settingsJSON?.groomPhotoUrl || "",
    groomFullName: invitation.settingsJSON?.groomFullName || "Muhamad Irfan Zidni",
    groomChildOrder: invitation.settingsJSON?.groomChildOrder || "Putra ke-3",
    groomParents: invitation.settingsJSON?.groomParents || "Bapak Abu Hasan & Ibu Imbriyah",
    
    // Our Story
    storyBgColor: invitation.settingsJSON?.storyBgColor || "rgba(255,255,255,0.5)",
    storyTitleColor: invitation.settingsJSON?.storyTitleColor || "var(--primary)",
    storyLineColor: invitation.settingsJSON?.storyLineColor || "var(--secondary)",
    storyTextColor: invitation.settingsJSON?.storyTextColor || "var(--primary)",
    
    story1Date: invitation.settingsJSON?.story1Date || "Pertama Bertemu",
    story1Title: invitation.settingsJSON?.story1Title || "Pertama Bertemu",
    story1Desc: invitation.settingsJSON?.story1Desc || "Semua berawal dari sebuah swipe sederhana di aplikasi dating. Siapa sangka, pertemuan virtual itu menjadi awal dari kisah cinta yang nyata",
    story1Image: invitation.settingsJSON?.story1Image || "",
    
    story2Date: invitation.settingsJSON?.story2Date || "02-Maret-2026",
    story2Title: invitation.settingsJSON?.story2Title || "Mulai Pacaran",
    story2Desc: invitation.settingsJSON?.story2Desc || "Hari ketika dua hati memutuskan untuk berjalan bersama. Sejak saat itu, setiap langkah memiliki arti karena kita melangkah sebagai satu",
    story2Image: invitation.settingsJSON?.story2Image || "",
    
    story3Date: invitation.settingsJSON?.story3Date || "14 Juni 2026",
    story3Title: invitation.settingsJSON?.story3Title || "Lamaran",
    story3Desc: invitation.settingsJSON?.story3Desc || "14 Juni 2026 menjadi hari yang tak terlupakan. Dengan restu keluarga dan penuh rasa syukur, kami melangkah ke tahap berikutnya melalui sebuah lamaran, sebagai awal menuju hari bahagia kami. ❤️💍",
    story3Image: invitation.settingsJSON?.story3Image || "",

    story4Date: invitation.settingsJSON?.story4Date || "04 Oktober 2026",
    story4Title: invitation.settingsJSON?.story4Title || "Menikah",
    story4Desc: invitation.settingsJSON?.story4Desc || "Dengan penuh rasa syukur kepada Allah SWT, kami mengucapkan ijab kabul dan memulai perjalanan sebagai suami istri. Semoga Allah SWT senantiasa melimpahkan rahmat, keberkahan, serta menjadikan rumah tangga kami keluarga yang sakinah, mawaddah, wa rahmah. Aamiin. 🤍🕌💍",
    story4Image: invitation.settingsJSON?.story4Image || "",

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
    akadHari: invitation.settingsJSON?.akadHari || "Minggu",
    akadTanggal: invitation.settingsJSON?.akadTanggal || "04 Oktober 2026",
    akadWaktu: invitation.settingsJSON?.akadWaktu || "Menyusul",
    akadLokasi: invitation.settingsJSON?.akadLokasi || "Kediaman Mempelai Wanita",
    akadAlamat: invitation.settingsJSON?.akadAlamat || "Jl.Bbk Kaum RT 02 RW 02 Cikampek Selatan Kab. Karawang",
    akadMapLink: invitation.settingsJSON?.akadMapLink || "https://maps.google.com/?q=HFV2+9CH,+Unnamed+Road,+Cikampek+Sel.,+Kec.+Cikampek,+Karawang,+Jawa+Barat+41373",
    resepsiHari: invitation.settingsJSON?.resepsiHari || "Minggu",
    resepsiTanggal: invitation.settingsJSON?.resepsiTanggal || "04 Oktober 2026",
    resepsiWaktu: invitation.settingsJSON?.resepsiWaktu || "Menyusul",
    resepsiLokasi: invitation.settingsJSON?.resepsiLokasi || "Kediaman Mempelai Wanita",
    resepsiAlamat: invitation.settingsJSON?.resepsiAlamat || "Jl.Bbk Kaum RT 02 RW 02 Cikampek Selatan Kab. Karawang",
    resepsiMapLink: invitation.settingsJSON?.resepsiMapLink || "https://maps.google.com/?q=HFV2+9CH,+Unnamed+Road,+Cikampek+Sel.,+Kec.+Cikampek,+Karawang,+Jawa+Barat+41373",
    customHtml_event: invitation.settingsJSON?.customHtml_event || "",
    customCss_event: invitation.settingsJSON?.customCss_event || "",
    customJs_event: invitation.settingsJSON?.customJs_event || "",
    
    // Countdown
    countdownBgColor: invitation.settingsJSON?.countdownBgColor || "#4A0E17",
    countdownTextColor: invitation.settingsJSON?.countdownTextColor || "#ffffff",
    countdownDate: invitation.settingsJSON?.countdownDate || "2026-10-04T08:00:00",
    
    // Gallery
    galleryBgUrl: invitation.settingsJSON?.galleryBgUrl || "",
    galleryTitleColor: invitation.settingsJSON?.galleryTitleColor || "var(--primary)",
    galleryIconColor: invitation.settingsJSON?.galleryIconColor || "var(--secondary)",
    galleryBgColor: invitation.settingsJSON?.galleryBgColor || "rgba(255,255,255,0.3)",
    galleryPhotos: invitation.settingsJSON?.galleryPhotos || "",
    galleryMode: invitation.settingsJSON?.galleryMode || "grid",
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
    bank1Name: invitation.settingsJSON?.bank1Name || "BRI",
    bank1Holder: invitation.settingsJSON?.bank1Holder || "NOVA NURSANIAH",
    bank1Number: invitation.settingsJSON?.bank1Number || "3260 0104 1138 532",
    bank2Name: invitation.settingsJSON?.bank2Name || "BCA",
    bank2Holder: invitation.settingsJSON?.bank2Holder || "MUHAMAD IRFAN ZIDNI",
    bank2Number: invitation.settingsJSON?.bank2Number || "3781961530",
    qrisUrl: invitation.settingsJSON?.qrisUrl || "",
    giftPenerima: invitation.settingsJSON?.giftPenerima || "Nova Nursaniah",
    giftHp: invitation.settingsJSON?.giftHp || "085155143885",
    giftAlamat: invitation.settingsJSON?.giftAlamat || "Jl. bbk kaum rt 02 rw 02 cikampek selatan kab. karawang 41373",
    customHtml_gift: invitation.settingsJSON?.customHtml_gift || "",
    customCss_gift: invitation.settingsJSON?.customCss_gift || "",
    customJs_gift: invitation.settingsJSON?.customJs_gift || "",
    
    // Video
    videoUrl: invitation.settingsJSON?.videoUrl || "",
    
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
            <>
              <AccordionItem id="theme" title="Tema Global" icon={Palette}>
                <InputField label="Global Primary Color" name="primaryColor" type="color" />
                <InputField label="Global Secondary Color" name="secondaryColor" type="color" />
                <InputField label="Global Background Color" name="bgColor" type="color" />
              </AccordionItem>

              <AccordionItem id="hero" title="Hero / Utama" icon={Heart}>
                <h4 className="text-xs font-bold text-primary uppercase mb-2 border-b pb-2">Teks & Konten</h4>
                <InputField label="Teks Atas" name="heroTitleText" placeholder="The Wedding Of" />
                <div className="flex flex-col gap-4">
                  <InputField label="Nama Panggilan Wanita" name="brideName" />
                  <InputField label="Nama Panggilan Pria" name="groomName" />
                </div>
                <InputField label="Tanggal Pernikahan" name="weddingDate" type="datetime-local" />

                <h4 className="text-xs font-bold text-primary uppercase mt-6 mb-2 border-b pb-2">Layout & Tipografi</h4>
                <div className="flex flex-col gap-4">
                  <div className="mb-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Posisi Vertikal</label>
                    <select name="heroLayout" value={formData.heroLayout as string} onChange={handleChange as any} className="w-full px-3 py-2 rounded-lg border border-secondary bg-white text-sm">
                      <option value="start">Atas (Top)</option>
                      <option value="center">Tengah (Center)</option>
                      <option value="end">Bawah (Bottom)</option>
                    </select>
                  </div>
                  <div className="mb-4">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Perataan Teks</label>
                    <select name="heroTextAlign" value={formData.heroTextAlign as string} onChange={handleChange as any} className="w-full px-3 py-2 rounded-lg border border-secondary bg-white text-sm">
                      <option value="left">Kiri (Left)</option>
                      <option value="center">Tengah (Center)</option>
                      <option value="right">Kanan (Right)</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Geser Posisi (Y Offset)</label>
                    <span className="text-xs font-mono bg-secondary/20 text-primary px-2 py-1 rounded">
                      {formData.heroTranslateY}px
                    </span>
                  </div>
                  <input 
                    type="range" name="heroTranslateY" min="-300" max="300" step="1" 
                    value={formData.heroTranslateY as string || "0"} onChange={handleChange as any} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>

                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Jarak Nama & Tanggal</label>
                    <span className="text-xs font-mono bg-secondary/20 text-primary px-2 py-1 rounded">
                      {formData.heroDateSpacing}px
                    </span>
                  </div>
                  <input 
                    type="range" name="heroDateSpacing" min="0" max="200" step="1" 
                    value={formData.heroDateSpacing as string || "32"} onChange={handleChange as any} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Jarak Baris Nama (Line Height)</label>
                    <span className="text-xs font-mono bg-secondary/20 text-primary px-2 py-1 rounded">
                      {formData.heroLineHeight}
                    </span>
                  </div>
                  <input 
                    type="range" name="heroLineHeight" min="0.5" max="3" step="0.1" 
                    value={formData.heroLineHeight as string || "1.2"} onChange={handleChange as any} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-6 mb-2 border-b pb-2">Media & Overlay</h4>
                <FileUpload label="Upload Background (Photo/Video)" name="heroBgUrl" value={formData.heroBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                  <InputField label="Text Color" name="heroTextColor" type="color" />
                  <InputField label="Overlay Color" name="heroOverlayColor" type="color" />
                  <FileUpload label="Top Ornament (PNG)" name="topOrnamentUrl" value={formData.topOrnamentUrl} onChange={handleUploadChange} placeholder="https://..." />
                  <FileUpload label="Bottom Ornament (PNG)" name="bottomOrnamentUrl" value={formData.bottomOrnamentUrl} onChange={handleUploadChange} placeholder="https://..." />
                  
                  <div className="w-full mt-4">
                  <div className="flex justify-between items-center mb-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Overlay Opacity</label>
                    <span className="text-xs font-mono bg-secondary/20 text-primary px-2 py-1 rounded">
                      {Math.round(parseFloat(formData.heroOverlayOpacity as string || "0.4") * 100)}%
                    </span>
                  </div>
                  <input 
                    type="range" 
                    name="heroOverlayOpacity"
                    min="0" max="1" step="0.01" 
                    value={formData.heroOverlayOpacity as string} 
                    onChange={handleChange as any} 
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                  />
                </div>

                <InputField label="Text Reveal Delay (Seconds)" name="heroTextDelay" placeholder="e.g. 2 or 5" type="number" />
              </AccordionItem>

              <AccordionItem id="typography" title="Tipografi & Format" icon={Type}>
                <InputField label="Title Font Family (Google Fonts)" name="fontFamilyTitle" placeholder="e.g. Great Vibes" />
                <InputField label="Body Font Family (Google Fonts)" name="fontFamilyBody" placeholder="e.g. Montserrat" />
                <div className="flex flex-col gap-4">
                  <InputField label="Title Font Size" name="fontSizeTitle" placeholder="e.g. 4rem or 64px" />
                  <InputField label="Title Font Weight" name="fontWeightTitle" placeholder="e.g. 400, 700" />
                  <InputField label="Body Font Size" name="fontSizeBody" placeholder="e.g. 1rem or 16px" />
                  <InputField label="Body Font Weight" name="fontWeightBody" placeholder="e.g. 400, 700" />
                </div>
                <div className="flex flex-col gap-4">
                  <InputField label="Body Line Height" name="lineHeightBody" placeholder="e.g. 1.6" />
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Text Alignment</label>
                    <select
                      name="textAlignment"
                      value={formData.textAlignment as string}
                      onChange={handleChange as any}
                      className="w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                      <option value="justify">Justify</option>
                    </select>
                  </div>
                </div>
              </AccordionItem>

              {/* QUOTE */}
              <AccordionItem id="quote" title="Kutipan (Quote)" icon={Type}>
                <FileUpload label="Background Media" name="quoteBgUrl" value={formData.quoteBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="flex flex-col gap-4">
                  <InputField label="Section Background Color" name="quoteBgColor" type="color" />
                  <InputField label="Quote Text Color" name="quoteTextColor" type="color" />
                  <InputField label="Quote Icon Color" name="quoteIconColor" type="color" />
                  <InputField label="Quote Source Color" name="quoteSourceColor" type="color" />
                </div>
                <InputField label="Quote Text" name="quoteText" multiline />
                <InputField label="Quote Source" name="quoteSource" placeholder="e.g. Ar-Rum: 21" />
              </AccordionItem>

              {/* COUPLE */}
              <AccordionItem id="couple" title="Mempelai" icon={Users}>
                <InputField label="Warna Background Section" name="coupleBgColor" type="color" />
                <InputField label="Warna Teks Judul" name="coupleTitleColor" type="color" />
                <InputField label="Warna Teks Subjudul" name="coupleSubtitleColor" type="color" />
                <InputField label="Warna Nama Mempelai" name="coupleNameColor" type="color" />
                <InputField label="Warna Aksen (Batas Foto & Dan)" name="coupleAccentColor" type="color" />
                <InputField label="Warna Teks Orang Tua" name="coupleTextColor" type="color" />
                <FileUpload label="Upload PNG Frame Mempelai (Opsional)" name="coupleFrameUrl" value={formData.coupleFrameUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="space-y-6 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500" /> Mempelai Wanita</h4>
                    <InputField label="Nama Lengkap" name="brideFullName" placeholder="Nova Nursaniah" />
                    <InputField label="Nama Panggilan" name="brideName" placeholder="Nova" />
                    <InputField label="Anak ke-berapa" name="brideChildOrder" placeholder="Putri ke-2" />
                    <InputField label="Nama Orang Tua" name="brideParents" placeholder="Bapak Nurdani & Ibu Supriyanti" />
                    <FileUpload label="Upload Foto Wanita" name="bridePhotoUrl" value={formData.bridePhotoUrl} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Mempelai Pria</h4>
                    <InputField label="Nama Lengkap" name="groomFullName" placeholder="Muhamad Irfan Zidni" />
                    <InputField label="Nama Panggilan" name="groomName" placeholder="Irfan" />
                    <InputField label="Anak ke-berapa" name="groomChildOrder" placeholder="Putra ke-3" />
                    <InputField label="Nama Orang Tua" name="groomParents" placeholder="Bapak Abu Hasan & Ibu Imbriyah" />
                    <FileUpload label="Upload Foto Pria" name="groomPhotoUrl" value={formData.groomPhotoUrl} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem id="story" title="Kisah Kami" icon={BookOpen}>
                <InputField label="Warna Background Section" name="storyBgColor" type="color" />
                <InputField label="Warna Judul" name="storyTitleColor" type="color" />
                <InputField label="Warna Garis Timeline" name="storyLineColor" type="color" />
                <InputField label="Warna Teks Deskripsi" name="storyTextColor" type="color" />
                
                <div className="space-y-6 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 1</h4>
                    <InputField label="Tanggal/Tahun" name="story1Date" placeholder="Maret 2020" />
                    <InputField label="Judul Cerita" name="story1Title" placeholder="Pertama Bertemu" />
                    <InputField label="Deskripsi Cerita" name="story1Desc" placeholder="Berawal dari..." />
                    <FileUpload label="Upload Foto Cerita 1" name="story1Image" value={formData.story1Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                  
                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 2</h4>
                    <InputField label="Tanggal/Tahun" name="story2Date" placeholder="Desember 2022" />
                    <InputField label="Judul Cerita" name="story2Title" placeholder="Resmi Bersama" />
                    <InputField label="Deskripsi Cerita" name="story2Desc" placeholder="Hari di mana..." />
                    <FileUpload label="Upload Foto Cerita 2" name="story2Image" value={formData.story2Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>

                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 3</h4>
                    <InputField label="Tanggal/Tahun" name="story3Date" placeholder="Januari 2024" />
                    <InputField label="Judul Cerita" name="story3Title" placeholder="Lamaran" />
                    <InputField label="Deskripsi Cerita" name="story3Desc" placeholder="Sebuah janji..." />
                    <FileUpload label="Upload Foto Cerita 3" name="story3Image" value={formData.story3Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>

                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 4</h4>
                    <InputField label="Tanggal/Tahun" name="story4Date" placeholder="Oktober 2026" />
                    <InputField label="Judul Cerita" name="story4Title" placeholder="Pernikahan" />
                    <InputField label="Deskripsi Cerita" name="story4Desc" placeholder="Hari bahagia..." />
                    <FileUpload label="Upload Foto Cerita 4" name="story4Image" value={formData.story4Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                </div>
              </AccordionItem>
            </>
          )}

          {/* COVER & AUDIO */}
          <AccordionItem id="cover" title="Cover & Audio" icon={Music}>
            {isCodeMode ? <CodeEditorGroup sectionId="cover" /> : (
              <>
                <h4 className="text-xs font-bold text-primary uppercase mt-2 mb-2 border-b pb-2">Informasi Utama</h4>
                <div className="flex flex-col gap-4">
                  <InputField label="Judul Cover" name="coverTitleText" placeholder="WEDDING INVITATION" />
                  <InputField label="Subjudul Cover" name="coverSubtitleText" placeholder="Kepada Yth." />
                  <InputField label="Nama Panggilan Wanita" name="brideName" />
                  <InputField label="Nama Panggilan Pria" name="groomName" />
                </div>
                <InputField label="Tanggal Pernikahan" name="weddingDate" type="datetime-local" />

                <h4 className="text-xs font-bold text-primary uppercase mt-6 mb-2 border-b pb-2">Media & Overlay</h4>
                <FileUpload label="Background Music (MP3)" name="bgMusicUrl" value={formData.bgMusicUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="flex flex-col gap-4 mt-4">
                  <FileUpload label="Cover Image (Desktop)" name="coverDesktopBgUrl" value={formData.coverDesktopBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                  <FileUpload label="Cover Image (Mobile)" name="coverMobileBgUrl" value={formData.coverMobileBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <InputField label="Overlay Color" name="coverOverlayColor" type="color" />
                  <div className="w-full">
                    <div className="flex justify-between items-center mb-2">
                      <label className="text-xs font-semibold uppercase tracking-wider text-foreground/80">Overlay Opacity</label>
                      <span className="text-xs font-mono bg-secondary/20 text-primary px-2 py-1 rounded">
                        {Math.round(parseFloat(formData.coverOverlayOpacity as string || "0.4") * 100)}%
                      </span>
                    </div>
                    <input 
                      type="range" name="coverOverlayOpacity" min="0" max="1" step="0.01" 
                      value={formData.coverOverlayOpacity as string || "0.4"} onChange={handleChange as any} 
                      className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                    />
                  </div>
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-6 mb-2 border-b pb-2">Warna Elemen</h4>
                <div className="flex flex-col gap-4">
                  <InputField label="Title Color" name="coverTitleColor" type="color" />
                  <InputField label="Button Text Color" name="coverButtonTextColor" type="color" />
                  <InputField label="Button Bg Color" name="coverButtonBgColor" type="color" />
                </div>
              </>
            )}
          </AccordionItem>

          {/* COUNTDOWN */}
          <AccordionItem id="countdown" title="Hitung Mundur (Countdown)" icon={Heart}>
            {isCodeMode ? <CodeEditorGroup sectionId="countdown" /> : (
              <>
                <InputField label="Tanggal & Waktu (YYYY-MM-DDTHH:mm)" name="countdownDate" type="datetime-local" />
                <InputField label="Background Color" name="countdownBgColor" type="color" />
                <InputField label="Text Color" name="countdownTextColor" type="color" />
              </>
            )}
          </AccordionItem>

          {/* EVENTS */}
          <AccordionItem id="events" title="Detail Acara Section" icon={MapPin}>
            {isCodeMode ? <CodeEditorGroup sectionId="event" /> : (
              <>
                <FileUpload label="Background Media" name="eventBgUrl" value={formData.eventBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Section Colors</h4>
                <div className="flex flex-col gap-4">
                  <InputField label="Background Color" name="eventBgColor" type="color" />
                  <InputField label="Title Color" name="eventTitleColor" type="color" />
                  <InputField label="Subtitle Color" name="eventSubtitleColor" type="color" />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Akad Card Colors</h4>
                <div className="flex flex-col gap-4">
                  <InputField label="Card Background" name="eventCard1BgColor" type="color" />
                  <InputField label="Card Text Color" name="eventCard1TextColor" type="color" />
                  <InputField label="Accent / Button" name="eventCard1AccentColor" type="color" />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Resepsi Card Colors</h4>
                <div className="flex flex-col gap-4">
                  <InputField label="Card Background" name="eventCard2BgColor" type="color" />
                  <InputField label="Card Text Color" name="eventCard2TextColor" type="color" />
                  <InputField label="Accent / Button" name="eventCard2AccentColor" type="color" />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Data Akad Nikah</h4>
                    <InputField label="Hari" name="akadHari" placeholder="Minggu" />
                    <InputField label="Tanggal" name="akadTanggal" placeholder="04 Oktober 2026" />
                    <InputField label="Waktu" name="akadWaktu" placeholder="Menyusul" />
                    <InputField label="Nama Lokasi" name="akadLokasi" placeholder="Kediaman Mempelai Wanita" />
                    <InputField label="Alamat Lengkap" name="akadAlamat" multiline placeholder="Jl.Bbk Kaum..." />
                    <InputField label="Link Google Maps" name="akadMapLink" placeholder="https://maps..." />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Data Resepsi</h4>
                    <InputField label="Hari" name="resepsiHari" placeholder="Minggu" />
                    <InputField label="Tanggal" name="resepsiTanggal" placeholder="04 Oktober 2026" />
                    <InputField label="Waktu" name="resepsiWaktu" placeholder="Menyusul" />
                    <InputField label="Nama Lokasi" name="resepsiLokasi" placeholder="Kediaman Mempelai Wanita" />
                    <InputField label="Alamat Lengkap" name="resepsiAlamat" multiline placeholder="Jl.Bbk Kaum..." />
                    <InputField label="Link Google Maps" name="resepsiMapLink" placeholder="https://maps..." />
                  </div>
                </div>
              </>
            )}
          </AccordionItem>

          {/* VIDEO PREWEDDING */}
          <AccordionItem id="video" title="Video Prewedding" icon={Camera}>
             {isCodeMode ? <CodeEditorGroup sectionId="video" /> : (
              <>
                <InputField label="Link Video YouTube/Vimeo" name="videoUrl" placeholder="https://www.youtube.com/watch?v=..." />
              </>
            )}
          </AccordionItem>

          {/* GALLERY */}
          <AccordionItem id="gallery" title="Galeri" icon={ImageIcon}>
             {isCodeMode ? <CodeEditorGroup sectionId="gallery" /> : (
              <>
                <InputField label="Warna Background Section" name="galleryBgColor" type="color" />
                <InputField label="Warna Judul" name="galleryTitleColor" type="color" />
                <InputField label="Warna Ikon Kamera" name="galleryIconColor" type="color" />
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Gallery Mode</label>
                  <select
                    name="galleryMode"
                    value={formData.galleryMode as string}
                    onChange={handleChange as any}
                    className="w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
                  >
                    <option value="grid">Grid Biasa</option>
                    <option value="slider">Auto Slide Looping (Korsel)</option>
                    <option value="stars">Twinkling Stars (Acak & Elegan)</option>
                  </select>
                </div>
                <FileUpload label="Gallery Photos (Pisahkan URL dengan koma)" name="galleryPhotos" value={formData.galleryPhotos} onChange={handleUploadChange} placeholder="https://..., https://..." multiline />
              </>
            )}
          </AccordionItem>

          {/* GIFT */}
          <AccordionItem id="gift" title="Wedding Gift Section" icon={Gift}>
            {isCodeMode ? <CodeEditorGroup sectionId="gift" /> : (
              <>
                <FileUpload label="Background Media" name="giftBgUrl" value={formData.giftBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="flex flex-col gap-4">
                  <InputField label="Background Color" name="giftBgColor" type="color" />
                  <InputField label="Title Color" name="giftTitleColor" type="color" />
                  <InputField label="Icon Color" name="giftIconColor" type="color" />
                  <InputField label="Text Color" name="giftTextColor" type="color" />
                  <InputField label="Card Background" name="giftCardBgColor" type="color" />
                  <InputField label="Card Title Color" name="giftCardTitleColor" type="color" />
                  <InputField label="Card Text Color" name="giftCardTextColor" type="color" />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Rekening 1</h4>
                    <InputField label="Nama Bank/Dompet" name="bank1Name" placeholder="BRI" />
                    <InputField label="Atas Nama" name="bank1Holder" placeholder="NOVA NURSANIAH" />
                    <InputField label="Nomor Rekening" name="bank1Number" placeholder="3260 0104 1138 532" />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Rekening 2</h4>
                    <InputField label="Nama Bank/Dompet" name="bank2Name" placeholder="BCA" />
                    <InputField label="Atas Nama" name="bank2Holder" placeholder="MUHAMAD IRFAN ZIDNI" />
                    <InputField label="Nomor Rekening" name="bank2Number" placeholder="3781961530" />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">QRIS</h4>
                    <FileUpload label="Upload Barcode QRIS" name="qrisUrl" value={formData.qrisUrl} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Kirim Kado (Fisik)</h4>
                    <InputField label="Nama Penerima" name="giftPenerima" placeholder="Nova Nursaniah" />
                    <InputField label="Nomor HP" name="giftHp" placeholder="085155143885" />
                    <InputField label="Alamat Lengkap" name="giftAlamat" multiline placeholder="Jl. bbk kaum..." />
                  </div>
                </div>
              </>
            )}
          </AccordionItem>

          {/* RSVP */}
          <AccordionItem id="rsvp" title="RSVP Section" icon={Users}>
            {isCodeMode ? <CodeEditorGroup sectionId="rsvp" /> : (
              <>
                <FileUpload label="Background Media" name="rsvpBgUrl" value={formData.rsvpBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="flex flex-col gap-4">
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
                <div className="flex flex-col gap-4">
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
            previewMode === 'mobile' ? 'w-[375px] h-[812px] my-auto mt-20 border-[8px] border-gray-800 rounded-[40px] shadow-2xl overflow-y-auto overflow-x-hidden relative shrink-0' : 
            previewMode === 'tablet' ? 'w-[768px] h-[1024px] my-auto mt-20 border-[8px] border-gray-800 rounded-[30px] shadow-2xl overflow-y-auto overflow-x-hidden relative shrink-0' : 
            'w-full h-full overflow-y-auto overflow-x-hidden relative'
         }`}>
            <Experience data={{...invitation.settingsJSON, ...formData}} previewMode={previewMode} />
         </div>
      </div>
    </div>
  );
}
