"use client";

import { useState } from "react";
import { updateInvitationSettings } from "@/app/editor/actions";
import { Save, ExternalLink } from "lucide-react";
import Link from "next/link";

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
    <div className="min-h-screen bg-secondary/10 p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-serif text-3xl font-semibold text-foreground">3D Invitation Editor</h1>
            <p className="text-foreground/60 mt-1">Manage content for {invitation.title}</p>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href={`/${invitation.slug}`} 
              target="_blank"
              className="flex items-center gap-2 px-4 py-2 bg-white text-primary border border-secondary rounded-xl hover:bg-secondary/30 transition-colors shadow-sm font-medium"
            >
              <ExternalLink className="w-4 h-4" />
              Preview Live
            </Link>
            <button 
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary-light transition-colors font-medium shadow-sm disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {isSaving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl border border-secondary/50 shadow-sm space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Bride Name</label>
              <input 
                type="text" 
                name="brideName"
                value={formData.brideName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground/80 mb-2">Groom Name</label>
              <input 
                type="text" 
                name="groomName"
                value={formData.groomName}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Wedding Date & Time</label>
            <input 
              type="datetime-local" 
              name="weddingDate"
              value={formData.weddingDate}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Ceremony Location</label>
            <textarea 
              name="ceremonyLocation"
              value={formData.ceremonyLocation}
              onChange={handleChange}
              rows={4}
              className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground/80 mb-2">Pix Key / Gift Account</label>
            <input 
              type="text" 
              name="pixKey"
              value={formData.pixKey}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:ring-2 focus:ring-primary/50 transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
