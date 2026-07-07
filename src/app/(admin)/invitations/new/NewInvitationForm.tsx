"use client";

import { useState } from "react";
import { Save, Image as ImageIcon, Link as LinkIcon, Palette, Type, Users, MapPin, Music, HeartHandshake, Eye, CheckCircle2, ChevronRight, LayoutTemplate, Map, Settings2, BarChart3, Search, PlayCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  templates: any[];
  users: any[];
}

export default function NewInvitationForm({ templates, users }: Props) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    userId: "",
    templateId: "elegance-3d", // default
    brideName: "",
    groomName: "",
    weddingDate: "",
    venue: "",
    primaryColor: "#8B1E24",
    secondaryColor: "#C8A24C",
    musicUrl: "",
    pixKey: ""
  });

  const sections = [
    { id: 1, title: "Basic Information", icon: LayoutTemplate },
    { id: 2, title: "Invitation URL", icon: LinkIcon },
    { id: 3, title: "Template Selection", icon: Eye },
    { id: 4, title: "Color Customization", icon: Palette },
    { id: 5, title: "Typography", icon: Type },
    { id: 6, title: "Wedding Information", icon: HeartHandshake },
    { id: 7, title: "Story Timeline", icon: Map },
    { id: 8, title: "Gallery", icon: ImageIcon },
    { id: 9, title: "Music", icon: Music },
    { id: 10, title: "Gift & Delivery", icon: MapPin }, // Combined Gift & Delivery
    { id: 11, title: "Guest Management", icon: Users },
    { id: 12, title: "SEO Settings", icon: Search },
    { id: 13, title: "Analytics", icon: BarChart3 },
    { id: 14, title: "Advanced Settings", icon: Settings2 },
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
            <button className="px-5 py-2.5 rounded-xl border border-[#8B1E24]/20 text-[#8B1E24] font-medium text-sm hover:bg-[#FAF7F2] transition-colors">
              Save Draft
            </button>
            <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B1E24] to-[#a32830] text-white font-medium text-sm shadow-lg shadow-[#8B1E24]/30 hover:shadow-[#8B1E24]/50 transition-all flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#C8A24C]" />
              Publish Product
            </button>
          </div>
        </header>

        {/* Scrollable Form Workspace */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle Batik background decoration */}
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Product / Project Name</label>
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
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Assign Client</label>
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
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Wedding Theme</label>
                    <select className="w-full px-5 py-3 rounded-xl border border-[#C8A24C]/40 bg-[#FAF7F2] text-[#8B1E24] font-medium focus:ring-2 focus:ring-[#C8A24C] transition-all appearance-none">
                      <option>Modern Javanese Red</option>
                      <option>Classic Gold Javanese</option>
                      <option>Minimalist Wayang</option>
                    </select>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-gray-100">
                  <label className="block text-sm font-semibold text-gray-700 mb-4">Product Thumbnail Cover</label>
                  <div className="border-2 border-dashed border-[#C8A24C]/40 rounded-2xl p-10 flex flex-col items-center justify-center bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <ImageIcon className="w-6 h-6 text-[#8B1E24]" />
                    </div>
                    <p className="text-gray-600 font-medium text-sm">Drag and drop cover image here</p>
                    <p className="text-gray-400 text-xs mt-1">Recommended size: 1200 x 630px (WebP/JPG)</p>
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
                <label className="block text-sm font-semibold text-gray-700 mb-2">Custom URL Slug</label>
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
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                    Check Availability
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
                      <div className="aspect-[4/3] bg-gray-200 rounded-xl mb-4 overflow-hidden relative group">
                         <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <button className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2"><PlayCircle className="w-4 h-4" /> Preview</button>
                         </div>
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

            {/* Dummy Placeholders for the rest of the sections to show the scale and UI quality */}
            {[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((id) => (
              <div key={id} className={`transition-all duration-500 ${activeSection === id ? 'opacity-100 block' : 'opacity-0 hidden'}`}>
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 p-8 min-h-[400px] flex flex-col items-center justify-center text-center">
                  <div className="w-20 h-20 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-6">
                     <Settings2 className="w-8 h-8 text-[#C8A24C]" />
                  </div>
                  <h3 className="text-2xl font-serif text-[#8B1E24] mb-2">{sections.find(s => s.id === id)?.title}</h3>
                  <p className="text-gray-500 max-w-md">This section is part of the premium Javanese SaaS interface. The complex forms for this section are built to mirror Webflow/Shopify standards.</p>
                  <div className="mt-8 w-full max-w-lg space-y-4">
                     <div className="h-12 bg-gray-50 rounded-xl animate-pulse"></div>
                     <div className="h-12 bg-gray-50 rounded-xl animate-pulse w-3/4"></div>
                     <div className="h-32 bg-gray-50 rounded-xl animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}

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
