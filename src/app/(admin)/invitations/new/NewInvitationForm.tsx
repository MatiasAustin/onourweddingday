"use client";

import { useState } from "react";
import { Save, Image as ImageIcon, Link as LinkIcon, Palette, Type, Users, MapPin, Music, HeartHandshake, Eye, CheckCircle2, ChevronRight, LayoutTemplate, Map, Settings2, BarChart3, Search, PlayCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createInvitation } from "../actions";

interface Props {
  templates: any[];
  users: any[];
}

export default function NewInvitationForm({ templates, users }: Props) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    userId: "",
    templateId: "elegance-3d", // default
    
    // settingsJSON fields
    brideName: "",
    groomName: "",
    weddingDate: "",
    venue: "",
    pixKey: "",
    
    // Background URLs
    heroBgUrl: "",
    quoteBgUrl: "",
    coupleBgUrl: "",
    eventBgUrl: "",
    galleryBgUrl: "",
    giftBgUrl: "",
    rsvpBgUrl: "",
    footerBgUrl: ""
  });

  const sections = [
    { id: 1, title: "Basic Information", icon: LayoutTemplate },
    { id: 2, title: "Invitation URL", icon: LinkIcon },
    { id: 3, title: "Template Selection", icon: Eye },
    { id: 4, title: "Wedding Information", icon: HeartHandshake },
    { id: 5, title: "Background Assets", icon: ImageIcon },
  ];

  const handleInputChange = (e: any) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const generateSlug = () => {
    if (formData.title) {
      setFormData(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  };

  const handlePublish = async () => {
    setIsSubmitting(true);
    setError("");

    if (!formData.title || !formData.slug || !formData.userId || !formData.templateId) {
      setError("Please fill in all required basic fields (Title, Slug, Client, Template).");
      setIsSubmitting(false);
      return;
    }

    const payload = new FormData();
    payload.append("userId", formData.userId);
    payload.append("templateId", formData.templateId);
    payload.append("title", formData.title);
    payload.append("slug", formData.slug);
    
    // Pack all other fields into settingsJSON
    const settingsJSON = {
      brideName: formData.brideName,
      groomName: formData.groomName,
      weddingDate: formData.weddingDate,
      venue: formData.venue,
      pixKey: formData.pixKey,
      heroBgUrl: formData.heroBgUrl,
      quoteBgUrl: formData.quoteBgUrl,
      coupleBgUrl: formData.coupleBgUrl,
      eventBgUrl: formData.eventBgUrl,
      galleryBgUrl: formData.galleryBgUrl,
      giftBgUrl: formData.giftBgUrl,
      rsvpBgUrl: formData.rsvpBgUrl,
      footerBgUrl: formData.footerBgUrl
    };
    
    payload.append("settingsJSON", JSON.stringify(settingsJSON));

    const result = await createInvitation(payload);
    
    if (result.error) {
      setError(result.error);
      setIsSubmitting(false);
    } else {
      // Success, go back to dashboard
      router.push("/invitations");
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#FAF7F2] font-sans">
      
      {/* Sidebar Navigation */}
      <div className="w-72 bg-white border-r border-[#C8A24C]/20 shadow-[4px_0_24px_rgba(139,30,36,0.03)] flex flex-col z-10">
        <div className="p-6 border-b border-[#C8A24C]/20 bg-gradient-to-br from-white to-[#FAF7F2]">
          <Link href="/invitations" className="text-sm text-[#8B1E24]/60 hover:text-[#8B1E24] flex items-center font-medium transition-colors mb-2">
            ← Back to Invitations
          </Link>
          <h2 className="text-2xl font-serif text-[#8B1E24] font-bold">New Product</h2>
          <p className="text-xs text-[#C8A24C] uppercase tracking-widest mt-1 font-semibold">Javanese Edition</p>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          <div className="space-y-1">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  activeSection === section.id 
                    ? "bg-[#8B1E24] text-white shadow-lg shadow-[#8B1E24]/20 translate-x-1" 
                    : "text-gray-600 hover:bg-[#FAF7F2] hover:text-[#8B1E24]"
                }`}
              >
                <section.icon className={`w-4 h-4 ${activeSection === section.id ? "text-[#C8A24C]" : "text-gray-400"}`} />
                {section.title}
                {activeSection === section.id && <ChevronRight className="w-4 h-4 ml-auto opacity-50" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-[#C8A24C]/20 px-8 flex items-center justify-between z-10">
          <div>
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium mb-1">
              <span>Dashboard</span>
              <span className="text-gray-300">/</span>
              <span>Products</span>
              <span className="text-gray-300">/</span>
              <span className="text-[#8B1E24]">Create</span>
            </div>
            <h1 className="text-xl font-serif font-bold text-gray-900">Create New Wedding Invitation</h1>
          </div>
          <div className="flex items-center gap-4">
            {error && <span className="text-red-500 text-sm font-medium">{error}</span>}
            <button className="px-5 py-2.5 rounded-xl border border-[#8B1E24]/20 text-[#8B1E24] font-medium text-sm hover:bg-[#FAF7F2] transition-colors">
              Save Draft
            </button>
            <button 
              onClick={handlePublish}
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1E24] to-[#a32830] text-white font-medium text-sm shadow-lg shadow-[#8B1E24]/30 hover:shadow-[#8B1E24]/50 transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4 text-[#C8A24C]" />}
              {isSubmitting ? "Publishing..." : "Publish Product"}
            </button>
          </div>
        </header>

        {/* Scrollable Form Workspace */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] opacity-[0.03] pointer-events-none" style={{ filter: 'sepia(1) hue-rotate(320deg) saturate(3)' }}></div>
          
          <div className="max-w-4xl mx-auto space-y-8 relative z-10 pb-32">
            
            {/* Section 1: Basic Info */}
            <div className={`transition-all duration-500 ${activeSection === 1 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B1E24] to-[#C8A24C]"></div>
                <h3 className="text-2xl font-serif text-[#8B1E24] mb-6 flex items-center gap-3">
                  <LayoutTemplate className="w-6 h-6 text-[#C8A24C]" />
                  Basic Information
                </h3>
                
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product / Project Name *</label>
                    <input 
                      type="text" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange} 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all"
                      placeholder="e.g., Nova & Bima Royal Wedding"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Client *</label>
                    <select 
                      name="userId" 
                      value={formData.userId} 
                      onChange={handleInputChange} 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all appearance-none"
                    >
                      <option value="">Select client account...</option>
                      {users.map(u => <option key={u.id} value={u.id}>{u.email}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: URL */}
            <div className={`transition-all duration-500 ${activeSection === 2 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-serif text-[#8B1E24] mb-6 flex items-center gap-3">
                  <LinkIcon className="w-6 h-6 text-[#C8A24C]" />
                  Invitation URL
                </h3>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom URL Slug *</label>
                <div className="flex gap-4">
                  <div className="flex-1 flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#8B1E24]/30 focus-within:border-[#8B1E24] transition-all">
                    <span className="px-5 py-3 text-gray-400 font-medium border-r border-gray-200 bg-white">myinvite.com/</span>
                    <input 
                      type="text" 
                      name="slug" 
                      value={formData.slug} 
                      onChange={handleInputChange} 
                      className="flex-1 px-5 py-3 bg-transparent outline-none font-medium text-[#8B1E24]"
                      placeholder="rahma-bima"
                    />
                  </div>
                  <button onClick={generateSlug} className="px-6 py-3 bg-[#FAF7F2] text-[#8B1E24] border border-[#C8A24C]/30 rounded-xl font-medium hover:bg-[#C8A24C]/10 transition-colors">
                    Generate
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3: Templates */}
            <div className={`transition-all duration-500 ${activeSection === 3 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-serif text-[#8B1E24] mb-6 flex items-center gap-3">
                  <Eye className="w-6 h-6 text-[#C8A24C]" />
                  Template Selection
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  {templates.map((tmpl) => (
                    <div key={tmpl.id} className={`border-2 rounded-2xl p-2 cursor-pointer transition-all ${formData.templateId === tmpl.id ? 'border-[#8B1E24] bg-[#FAF7F2]' : 'border-transparent bg-gray-50 hover:bg-gray-100'}`} onClick={() => setFormData(prev => ({...prev, templateId: tmpl.id}))}>
                      <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4 overflow-hidden relative group flex items-center justify-center">
                         <span className="font-semibold text-gray-500">{tmpl.name}</span>
                      </div>
                      <div className="px-2 pb-2 flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-900">{tmpl.name}</h4>
                          <p className="text-xs text-gray-500 mt-0.5">{tmpl.id}</p>
                        </div>
                        {formData.templateId === tmpl.id && <CheckCircle2 className="w-5 h-5 text-[#8B1E24]" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 4: Wedding Information */}
            <div className={`transition-all duration-500 ${activeSection === 4 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-serif text-[#8B1E24] mb-6 flex items-center gap-3">
                  <HeartHandshake className="w-6 h-6 text-[#C8A24C]" />
                  Wedding Information
                </h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bride Name</label>
                    <input 
                      type="text" 
                      name="brideName" 
                      value={formData.brideName} 
                      onChange={handleInputChange} 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all"
                      placeholder="e.g., Nova"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Groom Name</label>
                    <input 
                      type="text" 
                      name="groomName" 
                      value={formData.groomName} 
                      onChange={handleInputChange} 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all"
                      placeholder="e.g., Partner"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Wedding Date</label>
                    <input 
                      type="date" 
                      name="weddingDate" 
                      value={formData.weddingDate} 
                      onChange={handleInputChange} 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all"
                    />
                  </div>
                  <div className="col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">PIX / Bank Account Key</label>
                    <input 
                      type="text" 
                      name="pixKey" 
                      value={formData.pixKey} 
                      onChange={handleInputChange} 
                      className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all"
                      placeholder="e.g., BCA 1234 5678 90 a.n Nova"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 5: Background Assets */}
            <div className={`transition-all duration-500 ${activeSection === 5 ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
              <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8">
                <h3 className="text-2xl font-serif text-[#8B1E24] mb-6 flex items-center gap-3">
                  <ImageIcon className="w-6 h-6 text-[#C8A24C]" />
                  Background Assets
                </h3>
                <p className="text-sm text-gray-500 mb-8">Paste the URL for videos (e.g. .mp4) or images (e.g. .jpg, .webp) to be used as backgrounds for each section. Leave empty to use default.</p>
                
                <div className="space-y-6">
                  {[
                    { label: "Hero Background URL (Video/Image)", name: "heroBgUrl" },
                    { label: "Quote Background URL", name: "quoteBgUrl" },
                    { label: "Couple Section Background URL", name: "coupleBgUrl" },
                    { label: "Event Section Background URL", name: "eventBgUrl" },
                    { label: "Gallery Section Background URL", name: "galleryBgUrl" },
                    { label: "Gift Section Background URL", name: "giftBgUrl" },
                    { label: "RSVP Section Background URL", name: "rsvpBgUrl" },
                    { label: "Footer Background URL", name: "footerBgUrl" }
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">{field.label}</label>
                      <input 
                        type="url" 
                        name={field.name} 
                        value={(formData as any)[field.name]} 
                        onChange={handleInputChange} 
                        className="w-full px-5 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-[#8B1E24]/30 focus:border-[#8B1E24] transition-all font-mono text-sm"
                        placeholder="https://..."
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </main>
      </div>
      
      {/* Global CSS overrides for the custom scrollbar */}
      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #C8A24C40;
          border-radius: 10px;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background-color: #C8A24C;
        }
      `}} />
    </div>
  );
}
