"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink } from "lucide-react";
import Link from "next/link";

import Experience from "./Experience";

interface ThreeDEditorProps {
  invitation: any;
}

export default function ThreeDEditor({ invitation }: ThreeDEditorProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    brideName: invitation.settingsJSON?.brideName || "Liliane",
    groomName: invitation.settingsJSON?.groomName || "Fernando",
    weddingDate: invitation.settingsJSON?.weddingDate || "2024-06-15T19:30",
    ceremonyLocation: invitation.settingsJSON?.ceremonyLocation || "Paróquia Cristo Profeta\nR. Antônio José de Oliveira, 467\nBarra Funda, Apucarana - PR",
    pixKey: invitation.settingsJSON?.pixKey || "41 998798618"
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

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* LEFT SIDEBAR: Editor Form */}
      <div className="w-[450px] flex-shrink-0 bg-white border-r border-secondary/50 flex flex-col h-full z-20 shadow-xl overflow-y-auto relative">
        <div className="p-6 border-b border-secondary/30 sticky top-0 bg-white/90 backdrop-blur-md z-30 flex items-center justify-between">
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

        <div className="p-6 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Bride Name</label>
              <input 
                type="text" 
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Groom Name</label>
              <input 
                type="text" 
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Wedding Date & Time</label>
            <input 
              type="datetime-local" 
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Ceremony Location</label>
            <textarea 
              name="ceremonyLocation"
              value={formData.ceremonyLocation}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors resize-none text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">Pix Key / Gift Account</label>
            <input 
              type="text" 
              name="pixKey"
              value={formData.pixKey}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/5 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors text-sm"
            />
          </div>
          
          <div className="pt-4 border-t border-secondary/30">
            <Link 
              href={`/${invitation.slug}`} 
              target="_blank"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-secondary/10 text-foreground border border-secondary rounded-xl hover:bg-secondary/30 transition-colors shadow-sm font-medium text-sm"
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
