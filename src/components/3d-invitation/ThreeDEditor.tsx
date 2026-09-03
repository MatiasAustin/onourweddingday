"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink, ChevronDown, ChevronRight, Image as ImageIcon, MapPin, Users, Heart, Camera, Gift, Type, Layout, Palette, Code, Eye, Music, Smartphone, Tablet, Monitor, BookOpen } from "lucide-react";
import Link from "next/link";
import Experience from "./Experience";
import FileUpload from "@/components/ui/FileUpload";

interface ThreeDEditorProps {
  invitation: any;
  realWishes?: any[];
}

  const AccordionItem = ({ id, title, icon: Icon, children, activeTab, setActiveTab }: any) => {
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

  const InputField = ({ label, name, type = "text", placeholder = "", multiline = false, formData, onChange }: any) => (
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">{label}</label>
      {multiline ? (
        <textarea
          name={name}
          value={formData[name as keyof typeof formData]}
          onChange={onChange}
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
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-3 py-2 rounded-lg border border-secondary bg-white focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm ${type === 'color' ? 'h-10 cursor-pointer p-1' : ''}`}
          />
        </div>
      )}
    </div>
  );

  const CodeEditorGroup = ({ sectionId, formData, onChange }: { sectionId: string, formData: any, onChange: any }) => (
    <div className="space-y-6">
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <label className="block text-xs font-semibold uppercase tracking-wider text-green-400 mb-2">Custom HTML</label>
        <textarea
          name={`customHtml_${sectionId}`}
          value={formData[`customHtml_${sectionId}` as keyof typeof formData] as string || ''}
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder={`console.log("Hello from ${sectionId}");`}
          rows={4}
          className="w-full bg-transparent text-gray-300 font-mono text-sm focus:outline-none resize-y"
        />
      </div>
    </div>
  );


  const SectionOrnamentEditor = ({ sectionKey, formData, onChange, handleUploadChange }: any) => {
    const ornamentsKey = sectionKey + 'Ornaments';
    let ornaments = [];
    try {
      if (formData[ornamentsKey]) {
        ornaments = typeof formData[ornamentsKey] === 'string' ? JSON.parse(formData[ornamentsKey]) : formData[ornamentsKey];
      }
    } catch (e) {}

    const updateOrnaments = (newOrnaments: any) => {
      onChange({ target: { name: ornamentsKey, value: JSON.stringify(newOrnaments) } });
    };

    const addOrnament = () => {
      updateOrnaments([...ornaments, { id: Date.now().toString(), url: '', corner: 'top-left', offsetX: 0, offsetY: 0, scale: 100 }]);
    };

    const removeOrnament = (id: string) => {
      updateOrnaments(ornaments.filter((o: any) => o.id !== id));
    };

    const updateOrnament = (id: string, field: string, value: any) => {
      updateOrnaments(ornaments.map((o: any) => o.id === id ? { ...o, [field]: value } : o));
    };

    return (
      <div className="mt-8 border-t border-secondary/20 pt-4 pb-4">
        <h4 className="text-xs font-bold text-primary uppercase mb-4 flex items-center justify-between">
          Ornamen Tambahan
          <button type="button" onClick={addOrnament} className="bg-primary/10 text-primary px-2 py-1 rounded text-[10px]">+ Tambah</button>
        </h4>
        {ornaments.length === 0 && <p className="text-[10px] text-foreground/50 italic mb-4">Tambahkan gambar ornamen (bunga/bingkai) khusus untuk section ini.</p>}
        
        {ornaments.map((orn: any, index: number) => (
          <div key={orn.id} className="p-3 bg-secondary/5 rounded-lg border border-secondary/20 mb-3 space-y-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-bold">Ornamen #{index + 1}</span>
              <button type="button" onClick={() => removeOrnament(orn.id)} className="text-red-500 text-xs">Hapus</button>
            </div>
            
            <div className="mb-2">
              <FileUpload 
                label="URL / Gambar (Upload)" 
                name={`ornament_${orn.id}`} 
                value={orn.url} 
                onChange={(e: any) => updateOrnament(orn.id, 'url', e.target.value)} 
                placeholder="https://..." 
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold uppercase text-foreground/80 mb-1">Posisi Sudut</label>
              <select 
                value={orn.corner} 
                onChange={(e) => updateOrnament(orn.id, 'corner', e.target.value)}
                className="w-full px-2 py-1 text-xs rounded border border-secondary bg-white"
              >
                <option value="top-left">Kiri Atas</option>
                <option value="top-right">Kanan Atas</option>
                <option value="bottom-left">Kiri Bawah</option>
                <option value="bottom-right">Kanan Bawah</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[10px] font-semibold uppercase text-foreground/80 mb-1">Offset X ({orn.offsetX}%)</label>
                <input type="range" min="-100" max="100" value={orn.offsetX} onChange={(e) => updateOrnament(orn.id, 'offsetX', parseInt(e.target.value))} className="w-full accent-primary" />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase text-foreground/80 mb-1">Offset Y ({orn.offsetY}%)</label>
                <input type="range" min="-100" max="100" value={orn.offsetY} onChange={(e) => updateOrnament(orn.id, 'offsetY', parseInt(e.target.value))} className="w-full accent-primary" />
              </div>
            </div>
            <div>
              <label className="block text-[10px] font-semibold uppercase text-foreground/80 mb-1">Ukuran / Skala ({orn.scale}%)</label>
              <input type="range" min="10" max="300" value={orn.scale} onChange={(e) => updateOrnament(orn.id, 'scale', parseInt(e.target.value))} className="w-full accent-primary" />
            </div>
          </div>
        ))}
      </div>
    );
  };

export default function ThreeDEditor({ invitation, realWishes = [] }: ThreeDEditorProps) {
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
    coverLayout: invitation.settingsJSON?.coverLayout || "center",
    coverMarginTop: invitation.settingsJSON?.coverMarginTop || 0,
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
    quoteBgColor: invitation.settingsJSON?.quoteBgColor || "#4A0E17",
    quoteTextColor: invitation.settingsJSON?.quoteTextColor || "#C5A059",
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
    storyBgColor: invitation.settingsJSON?.storyBgColor || "#4A0E17",
    storyTitleColor: invitation.settingsJSON?.storyTitleColor || "#C5A059",
    storyLineColor: invitation.settingsJSON?.storyLineColor || "#C5A059",
    storyTextColor: invitation.settingsJSON?.storyTextColor || "#ffffff",
    
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
    giftBgColor: invitation.settingsJSON?.giftBgColor || "#4A0E17",
    giftTitleColor: invitation.settingsJSON?.giftTitleColor || "#C5A059",
    giftIconColor: invitation.settingsJSON?.giftIconColor || "#C5A059",
    giftTextColor: invitation.settingsJSON?.giftTextColor || "#ffffff",
    giftCardBgColor: invitation.settingsJSON?.giftCardBgColor || "#F7F3EC",
    giftCardTitleColor: invitation.settingsJSON?.giftCardTitleColor || "#4A0E17",
    giftCardTextColor: invitation.settingsJSON?.giftCardTextColor || "#4A0E17",
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
              <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="theme" title="Tema Global" icon={Palette}>
                <InputField formData={formData} onChange={handleChange} label="Global Primary Color" name="primaryColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Global Secondary Color" name="secondaryColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Global Background Color" name="bgColor" type="color" />

                             </AccordionItem>

              <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="hero" title="Hero / Utama" icon={Heart}>
                <h4 className="text-xs font-bold text-primary uppercase mb-2 border-b pb-2">Teks & Konten</h4>
                <InputField formData={formData} onChange={handleChange} label="Teks Atas" name="heroTitleText" placeholder="The Wedding Of" />
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Nama Panggilan Wanita" name="brideName" />
                  <InputField formData={formData} onChange={handleChange} label="Nama Panggilan Pria" name="groomName" />
                </div>
                <InputField formData={formData} onChange={handleChange} label="Tanggal Pernikahan" name="weddingDate" type="datetime-local" />

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
                  <InputField formData={formData} onChange={handleChange} label="Text Color" name="heroTextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Overlay Color" name="heroOverlayColor" type="color" />
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

                <InputField formData={formData} onChange={handleChange} label="Text Reveal Delay (Seconds)" name="heroTextDelay" placeholder="e.g. 2 or 5" type="number" />
                <SectionOrnamentEditor sectionKey="hero" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

              <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="typography" title="Tipografi & Format" icon={Type}>
                <InputField formData={formData} onChange={handleChange} label="Title Font Family (Google Fonts)" name="fontFamilyTitle" placeholder="e.g. Great Vibes" />
                <InputField formData={formData} onChange={handleChange} label="Body Font Family (Google Fonts)" name="fontFamilyBody" placeholder="e.g. Montserrat" />
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Title Font Size" name="fontSizeTitle" placeholder="e.g. 4rem or 64px" />
                  <InputField formData={formData} onChange={handleChange} label="Title Font Weight" name="fontWeightTitle" placeholder="e.g. 400, 700" />
                  <InputField formData={formData} onChange={handleChange} label="Body Font Size" name="fontSizeBody" placeholder="e.g. 1rem or 16px" />
                  <InputField formData={formData} onChange={handleChange} label="Body Font Weight" name="fontWeightBody" placeholder="e.g. 400, 700" />
                </div>
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Body Line Height" name="lineHeightBody" placeholder="e.g. 1.6" />
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
              <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="quote" title="Kutipan (Quote)" icon={Type}>
                <FileUpload label="Background Media" name="quoteBgUrl" value={formData.quoteBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Section Background Color" name="quoteBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Quote Text Color" name="quoteTextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Quote Icon Color" name="quoteIconColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Quote Source Color" name="quoteSourceColor" type="color" />
                </div>
                <InputField formData={formData} onChange={handleChange} label="Quote Text" name="quoteText" multiline />
                <InputField formData={formData} onChange={handleChange} label="Quote Source" name="quoteSource" placeholder="e.g. Ar-Rum: 21" />
                <SectionOrnamentEditor sectionKey="quote" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

              {/* COUPLE */}
              <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="couple" title="Mempelai" icon={Users}>
                <h4 className="text-[10px] font-bold text-primary uppercase mt-2 mb-2 border-b pb-2">Typografi Teks Pembuka</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <InputField formData={formData} onChange={handleChange} label="Ukuran Teks 'BRIDE & GROOM'" name="heroTopSize" placeholder="e.g. 0.75rem" />
                  <InputField formData={formData} onChange={handleChange} label="Spasi Huruf Atas" name="heroTopSpace" placeholder="e.g. 0.2em" />
                  <InputField formData={formData} onChange={handleChange} label="Ukuran Judul (Two Families)" name="heroTitleSize" placeholder="e.g. 2.25rem" />
                  <InputField formData={formData} onChange={handleChange} label="Tinggi Baris Judul" name="heroTitleHeight" placeholder="e.g. 1.2" />
                  <InputField formData={formData} onChange={handleChange} label="Ukuran Subjudul" name="heroSubtitleSize" placeholder="e.g. 0.875rem" />
                  <InputField formData={formData} onChange={handleChange} label="Tinggi Baris Subjudul" name="heroSubtitleHeight" placeholder="e.g. 1.625" />
                </div>
                <h4 className="text-[10px] font-bold text-primary uppercase mt-4 mb-2 border-b pb-2">Warna & Elemen</h4>
                <InputField formData={formData} onChange={handleChange} label="Warna Background Section" name="coupleBgColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Teks Judul" name="coupleTitleColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Teks Subjudul" name="coupleSubtitleColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Nama Mempelai" name="coupleNameColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Aksen (Batas Foto & Dan)" name="coupleAccentColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Teks Orang Tua" name="coupleTextColor" type="color" />
                <FileUpload label="Upload PNG Frame Mempelai (Opsional)" name="coupleFrameUrl" value={formData.coupleFrameUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="space-y-6 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-pink-500" /> Mempelai Wanita</h4>
                    <InputField formData={formData} onChange={handleChange} label="Nama Lengkap" name="brideFullName" placeholder="Nova Nursaniah" />
                    <InputField formData={formData} onChange={handleChange} label="Nama Panggilan" name="brideName" placeholder="Nova" />
                    <InputField formData={formData} onChange={handleChange} label="Anak ke-berapa" name="brideChildOrder" placeholder="Putri ke-2" />
                    <InputField formData={formData} onChange={handleChange} label="Nama Orang Tua" name="brideParents" placeholder="Bapak Nurdani & Ibu Supriyanti" />
                    <FileUpload label="Upload Foto Wanita" name="bridePhotoUrl" value={formData.bridePhotoUrl} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4 flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-blue-500" /> Mempelai Pria</h4>
                    <InputField formData={formData} onChange={handleChange} label="Nama Lengkap" name="groomFullName" placeholder="Muhamad Irfan Zidni" />
                    <InputField formData={formData} onChange={handleChange} label="Nama Panggilan" name="groomName" placeholder="Irfan" />
                    <InputField formData={formData} onChange={handleChange} label="Anak ke-berapa" name="groomChildOrder" placeholder="Putra ke-3" />
                    <InputField formData={formData} onChange={handleChange} label="Nama Orang Tua" name="groomParents" placeholder="Bapak Abu Hasan & Ibu Imbriyah" />
                    <FileUpload label="Upload Foto Pria" name="groomPhotoUrl" value={formData.groomPhotoUrl} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                </div>
                <SectionOrnamentEditor sectionKey="couple" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

              <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="story" title="Kisah Kami" icon={BookOpen}>
                <InputField formData={formData} onChange={handleChange} label="Warna Background Section" name="storyBgColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Judul" name="storyTitleColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Garis Timeline" name="storyLineColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Teks Deskripsi" name="storyTextColor" type="color" />
                
                <div className="space-y-6 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 1</h4>
                    <InputField formData={formData} onChange={handleChange} label="Tanggal/Tahun" name="story1Date" placeholder="Maret 2020" />
                    <InputField formData={formData} onChange={handleChange} label="Judul Cerita" name="story1Title" placeholder="Pertama Bertemu" />
                    <InputField formData={formData} onChange={handleChange} label="Deskripsi Cerita" name="story1Desc" placeholder="Berawal dari..." />
                    <FileUpload label="Upload Foto Cerita 1" name="story1Image" value={formData.story1Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                  
                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 2</h4>
                    <InputField formData={formData} onChange={handleChange} label="Tanggal/Tahun" name="story2Date" placeholder="Desember 2022" />
                    <InputField formData={formData} onChange={handleChange} label="Judul Cerita" name="story2Title" placeholder="Resmi Bersama" />
                    <InputField formData={formData} onChange={handleChange} label="Deskripsi Cerita" name="story2Desc" placeholder="Hari di mana..." />
                    <FileUpload label="Upload Foto Cerita 2" name="story2Image" value={formData.story2Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>

                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 3</h4>
                    <InputField formData={formData} onChange={handleChange} label="Tanggal/Tahun" name="story3Date" placeholder="Januari 2024" />
                    <InputField formData={formData} onChange={handleChange} label="Judul Cerita" name="story3Title" placeholder="Lamaran" />
                    <InputField formData={formData} onChange={handleChange} label="Deskripsi Cerita" name="story3Desc" placeholder="Sebuah janji..." />
                    <FileUpload label="Upload Foto Cerita 3" name="story3Image" value={formData.story3Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>

                  <div className="p-4 bg-black/5 rounded-xl border space-y-3">
                    <h4 className="font-bold flex items-center gap-2">Cerita 4</h4>
                    <InputField formData={formData} onChange={handleChange} label="Tanggal/Tahun" name="story4Date" placeholder="Oktober 2026" />
                    <InputField formData={formData} onChange={handleChange} label="Judul Cerita" name="story4Title" placeholder="Pernikahan" />
                    <InputField formData={formData} onChange={handleChange} label="Deskripsi Cerita" name="story4Desc" placeholder="Hari bahagia..." />
                    <FileUpload label="Upload Foto Cerita 4" name="story4Image" value={formData.story4Image} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                </div>
                <SectionOrnamentEditor sectionKey="story" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>
            </>
          )}

          {/* COVER & AUDIO */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="cover" title="Cover & Audio" icon={Music}>
            {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="cover" /> : (
              <>
                <h4 className="text-xs font-bold text-primary uppercase mt-2 mb-2 border-b pb-2">Posisi & Teks Cover</h4>
                <div className="flex flex-col gap-4">
                  <div className="mb-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Posisi Teks Vertikal</label>
                    <select name="coverLayout" value={formData.coverLayout as string} onChange={handleChange as any} className="w-full px-3 py-2 rounded-lg border border-secondary bg-white text-sm">
                      <option value="start">Atas (Top)</option>
                      <option value="center">Tengah (Center)</option>
                      <option value="end">Bawah (Bottom)</option>
                    </select>
                  </div>
                  <InputField formData={formData} onChange={handleChange} label="Geser Posisi (pixel)" name="coverMarginTop" type="number" />
                  <InputField formData={formData} onChange={handleChange} label="Judul Cover" name="coverTitleText" placeholder="WEDDING INVITATION" />
                  <InputField formData={formData} onChange={handleChange} label="Subjudul Cover" name="coverSubtitleText" placeholder="Kepada Yth." />
                  <InputField formData={formData} onChange={handleChange} label="Nama Panggilan Wanita" name="brideName" />
                  <InputField formData={formData} onChange={handleChange} label="Nama Panggilan Pria" name="groomName" />
                </div>
                
                <h4 className="text-[10px] font-bold text-primary uppercase mt-4 mb-2 border-b pb-2">Typografi Teks Cover</h4>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <InputField formData={formData} onChange={handleChange} label="Ukuran Nama" name="coverNameSize" placeholder="e.g. 4.5rem" />
                  <InputField formData={formData} onChange={handleChange} label="Spasi Huruf Nama" name="coverNameSpace" placeholder="e.g. normal" />
                  <InputField formData={formData} onChange={handleChange} label="Tinggi Baris Nama" name="coverNameHeight" placeholder="e.g. 1" />
                  <InputField formData={formData} onChange={handleChange} label="Ukuran Judul" name="coverTitleSize" placeholder="e.g. 0.75rem" />
                  <InputField formData={formData} onChange={handleChange} label="Spasi Huruf Judul" name="coverTitleSpace" placeholder="e.g. 0.3em" />
                </div>

                <InputField formData={formData} onChange={handleChange} label="Tanggal Pernikahan" name="weddingDate" type="datetime-local" />

                <h4 className="text-xs font-bold text-primary uppercase mt-6 mb-2 border-b pb-2">Media & Overlay</h4>
                <FileUpload label="Background Music (MP3)" name="bgMusicUrl" value={formData.bgMusicUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="flex flex-col gap-4 mt-4">
                  <FileUpload label="Cover Image (Desktop)" name="coverDesktopBgUrl" value={formData.coverDesktopBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                  <FileUpload label="Cover Image (Mobile)" name="coverMobileBgUrl" value={formData.coverMobileBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <InputField formData={formData} onChange={handleChange} label="Overlay Color" name="coverOverlayColor" type="color" />
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
                  <InputField formData={formData} onChange={handleChange} label="Title Color" name="coverTitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Button Text Color" name="coverButtonTextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Button Bg Color" name="coverButtonBgColor" type="color" />
                </div>
              </>
            )}
          </AccordionItem>

          {/* COUNTDOWN */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="countdown" title="Hitung Mundur (Countdown)" icon={Heart}>
            {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="countdown" /> : (
              <>
                <InputField formData={formData} onChange={handleChange} label="Tanggal & Waktu (YYYY-MM-DDTHH:mm)" name="countdownDate" type="datetime-local" />
                <InputField formData={formData} onChange={handleChange} label="Background Color" name="countdownBgColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Text Color" name="countdownTextColor" type="color" />
              </>
            )}
            <SectionOrnamentEditor sectionKey="countdown" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

          {/* EVENTS */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="events" title="Detail Acara Section" icon={MapPin}>
            {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="event" /> : (
              <>
                <FileUpload label="Background Media" name="eventBgUrl" value={formData.eventBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Section Colors</h4>
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Background Color" name="eventBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Title Color" name="eventTitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Subtitle Color" name="eventSubtitleColor" type="color" />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Akad Card Colors</h4>
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Card Background" name="eventCard1BgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Card Text Color" name="eventCard1TextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Accent / Button" name="eventCard1AccentColor" type="color" />
                </div>

                <h4 className="text-xs font-bold text-primary uppercase mt-4 border-b border-secondary/20 pb-2 mb-2">Resepsi Card Colors</h4>
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Card Background" name="eventCard2BgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Card Text Color" name="eventCard2TextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Accent / Button" name="eventCard2AccentColor" type="color" />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Data Akad Nikah</h4>
                    <InputField formData={formData} onChange={handleChange} label="Hari" name="akadHari" placeholder="Minggu" />
                    <InputField formData={formData} onChange={handleChange} label="Tanggal" name="akadTanggal" placeholder="04 Oktober 2026" />
                    <InputField formData={formData} onChange={handleChange} label="Waktu" name="akadWaktu" placeholder="Menyusul" />
                    <InputField formData={formData} onChange={handleChange} label="Nama Lokasi" name="akadLokasi" placeholder="Kediaman Mempelai Wanita" />
                    <InputField formData={formData} onChange={handleChange} label="Alamat Lengkap" name="akadAlamat" multiline placeholder="Jl.Bbk Kaum..." />
                    <InputField formData={formData} onChange={handleChange} label="Link Google Maps" name="akadMapLink" placeholder="https://maps..." />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Data Resepsi</h4>
                    <InputField formData={formData} onChange={handleChange} label="Hari" name="resepsiHari" placeholder="Minggu" />
                    <InputField formData={formData} onChange={handleChange} label="Tanggal" name="resepsiTanggal" placeholder="04 Oktober 2026" />
                    <InputField formData={formData} onChange={handleChange} label="Waktu" name="resepsiWaktu" placeholder="Menyusul" />
                    <InputField formData={formData} onChange={handleChange} label="Nama Lokasi" name="resepsiLokasi" placeholder="Kediaman Mempelai Wanita" />
                    <InputField formData={formData} onChange={handleChange} label="Alamat Lengkap" name="resepsiAlamat" multiline placeholder="Jl.Bbk Kaum..." />
                    <InputField formData={formData} onChange={handleChange} label="Link Google Maps" name="resepsiMapLink" placeholder="https://maps..." />
                  </div>
                </div>
              </>
            )}
            <SectionOrnamentEditor sectionKey="events" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

          {/* VIDEO PREWEDDING */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="video" title="Video Prewedding" icon={Camera}>
             {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="video" /> : (
              <>
                <InputField formData={formData} onChange={handleChange} label="Link Video YouTube/Vimeo" name="videoUrl" placeholder="https://www.youtube.com/watch?v=..." />
              </>
            )}
          </AccordionItem>

          {/* GALLERY */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="gallery" title="Galeri" icon={ImageIcon}>
             {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="gallery" /> : (
              <>
                <InputField formData={formData} onChange={handleChange} label="Warna Background Section" name="galleryBgColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Judul" name="galleryTitleColor" type="color" />
                <InputField formData={formData} onChange={handleChange} label="Warna Ikon Kamera" name="galleryIconColor" type="color" />
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
            <SectionOrnamentEditor sectionKey="gallery" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

          {/* GIFT */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="gift" title="Wedding Gift Section" icon={Gift}>
            {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="gift" /> : (
              <>
                <FileUpload label="Background Media" name="giftBgUrl" value={formData.giftBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Background Color" name="giftBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Title Color" name="giftTitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Icon Color" name="giftIconColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Text Color" name="giftTextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Card Background" name="giftCardBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Card Title Color" name="giftCardTitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Card Text Color" name="giftCardTextColor" type="color" />
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Rekening 1</h4>
                    <InputField formData={formData} onChange={handleChange} label="Nama Bank/Dompet" name="bank1Name" placeholder="BRI" />
                    <InputField formData={formData} onChange={handleChange} label="Atas Nama" name="bank1Holder" placeholder="NOVA NURSANIAH" />
                    <InputField formData={formData} onChange={handleChange} label="Nomor Rekening" name="bank1Number" placeholder="3260 0104 1138 532" />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Rekening 2</h4>
                    <InputField formData={formData} onChange={handleChange} label="Nama Bank/Dompet" name="bank2Name" placeholder="BCA" />
                    <InputField formData={formData} onChange={handleChange} label="Atas Nama" name="bank2Holder" placeholder="MUHAMAD IRFAN ZIDNI" />
                    <InputField formData={formData} onChange={handleChange} label="Nomor Rekening" name="bank2Number" placeholder="3781961530" />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">QRIS</h4>
                    <FileUpload label="Upload Barcode QRIS" name="qrisUrl" value={formData.qrisUrl} onChange={handleUploadChange} placeholder="https://..." />
                  </div>
                  <div className="p-4 bg-black/5 rounded-xl border">
                    <h4 className="font-bold mb-4">Kirim Kado (Fisik)</h4>
                    <InputField formData={formData} onChange={handleChange} label="Nama Penerima" name="giftPenerima" placeholder="Nova Nursaniah" />
                    <InputField formData={formData} onChange={handleChange} label="Nomor HP" name="giftHp" placeholder="085155143885" />
                    <InputField formData={formData} onChange={handleChange} label="Alamat Lengkap" name="giftAlamat" multiline placeholder="Jl. bbk kaum..." />
                  </div>
                </div>
              </>
            )}
            <SectionOrnamentEditor sectionKey="gift" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>

          {/* RSVP */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="rsvp" title="RSVP & Ucapan" icon={Users}>
            {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="rsvp" /> : (
              <>
                <FileUpload label="Background Media" name="rsvpBgUrl" value={formData.rsvpBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Background Color" name="rsvpBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Title Color" name="rsvpTitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Subtitle Color" name="rsvpSubtitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Form Background" name="rsvpFormBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Form Text Color" name="rsvpFormTextColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Button Background" name="rsvpButtonBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Button Text Color" name="rsvpButtonTextColor" type="color" />
                </div>
              </>
            )}
            <SectionOrnamentEditor sectionKey="rsvp" formData={formData} onChange={handleChange} handleUploadChange={handleUploadChange} />
              </AccordionItem>
          
          {/* FOOTER */}
          <AccordionItem activeTab={activeTab} setActiveTab={setActiveTab} id="footer" title="Footer Section" icon={ImageIcon}>
            {isCodeMode ? <CodeEditorGroup formData={formData} onChange={handleChange} sectionId="footer" /> : (
              <>
                <FileUpload label="Background Media" name="footerBgUrl" value={formData.footerBgUrl} onChange={handleUploadChange} placeholder="https://..." />
                <div className="flex flex-col gap-4">
                  <InputField formData={formData} onChange={handleChange} label="Background Color" name="footerBgColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Title Color" name="footerTitleColor" type="color" />
                  <InputField formData={formData} onChange={handleChange} label="Text Color" name="footerTextColor" type="color" />
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
            <Experience 
              data={{...invitation.settingsJSON, ...formData}} 
              previewMode={previewMode} 
              invitationId={invitation.id}
              wishes={realWishes}
            />
         </div>
      </div>
    </div>
  );
}
