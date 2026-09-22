"use client";

import { useState, useEffect } from "react";
import { Save, User, Globe, Bell, Lock, Loader2 } from "lucide-react";
import FileUpload from "@/components/ui/FileUpload";
import { getSiteSettings, saveSiteSettings } from "./actions";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [siteSettings, setSiteSettings] = useState({
    siteName: "On Our Wedding Day",
    siteDescription: "Digital Wedding Invitation Platform",
    logoUrl: "",
    faviconUrl: ""
  });

  useEffect(() => {
    async function loadSettings() {
      const res = await getSiteSettings();
      if (res.success && res.settings) {
        setSiteSettings(prev => ({ ...prev, ...res.settings }));
      }
      setIsLoading(false);
    }
    loadSettings();
  }, []);

  const handleSiteSettingChange = (e: any) => {
    const { name, value } = e.target;
    setSiteSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveSiteSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const res = await saveSiteSettings(siteSettings);
    setIsSaving(false);
    if (res.success) {
      alert("Site preferences saved successfully!");
    } else {
      alert("Failed to save settings: " + res.error);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your platform preferences and admin profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button 
            onClick={() => setActiveTab("profile")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 font-medium rounded-xl transition-colors ${activeTab === 'profile' ? 'bg-white text-primary border border-secondary shadow-sm' : 'text-foreground/70 hover:bg-secondary/30'}`}
          >
            <User className="w-4 h-4" />
            Profile
          </button>
          <button 
            onClick={() => setActiveTab("site")}
            className={`w-full flex items-center gap-3 px-4 py-2.5 font-medium rounded-xl transition-colors ${activeTab === 'site' ? 'bg-white text-primary border border-secondary shadow-sm' : 'text-foreground/70 hover:bg-secondary/30'}`}
          >
            <Globe className="w-4 h-4" />
            Site Preferences
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground/70 font-medium rounded-xl hover:bg-secondary/30 transition-colors opacity-50 cursor-not-allowed">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground/70 font-medium rounded-xl hover:bg-secondary/30 transition-colors opacity-50 cursor-not-allowed">
            <Lock className="w-4 h-4" />
            Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
          {activeTab === 'profile' && (
            <>
              <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm p-6">
                <h2 className="font-serif text-xl font-medium mb-6">Profile Information</h2>
                
                <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">First Name</label>
                      <input 
                        type="text" 
                        defaultValue="Admin"
                        className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue="User"
                        className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Email Address</label>
                    <input 
                      type="email" 
                      disabled
                      defaultValue="admin@example.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/30 text-foreground/60 cursor-not-allowed"
                    />
                    <p className="text-xs text-foreground/50 mt-1.5">Email address cannot be changed. It is linked to your Supabase Auth.</p>
                  </div>

                  <div className="pt-4 border-t border-secondary/50 flex justify-end">
                    <button type="submit" className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary-light transition-colors font-medium shadow-sm">
                      <Save className="w-4 h-4" />
                      Save Changes
                    </button>
                  </div>
                </form>
              </div>
              
              <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm p-6">
                <h2 className="font-serif text-xl font-medium mb-4 text-red-600">Danger Zone</h2>
                <p className="text-sm text-foreground/70 mb-4">
                  Permanent actions that cannot be undone. Please proceed with caution.
                </p>
                <button className="px-4 py-2 bg-red-50 text-red-600 font-medium rounded-xl border border-red-200 hover:bg-red-100 transition-colors text-sm">
                  Delete Admin Account
                </button>
              </div>
            </>
          )}

          {activeTab === 'site' && (
            <div className="bg-white rounded-2xl border border-secondary/50 shadow-sm p-6">
              <h2 className="font-serif text-xl font-medium mb-6">Site Preferences</h2>
              
              {isLoading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
              ) : (
                <form className="space-y-6" onSubmit={handleSaveSiteSettings}>
                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Site Name</label>
                    <input 
                      type="text" 
                      name="siteName"
                      value={siteSettings.siteName}
                      onChange={handleSiteSettingChange}
                      className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground/80 mb-1.5">Site Description</label>
                    <textarea 
                      name="siteDescription"
                      value={siteSettings.siteDescription}
                      onChange={handleSiteSettingChange}
                      rows={3}
                      className="w-full px-4 py-2.5 rounded-xl border border-secondary bg-secondary/10 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/50 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-2 border-t border-secondary/30">
                    <FileUpload 
                      label="Site Logo" 
                      name="logoUrl" 
                      value={siteSettings.logoUrl} 
                      onChange={handleSiteSettingChange} 
                      placeholder="Upload or drag & drop logo image..." 
                    />
                  </div>

                  <div className="pt-2 border-t border-secondary/30">
                    <FileUpload 
                      label="Favicon (Icon Browser)" 
                      name="faviconUrl" 
                      value={siteSettings.faviconUrl} 
                      onChange={handleSiteSettingChange} 
                      placeholder="Upload or drag & drop favicon image..." 
                    />
                  </div>

                  <div className="pt-4 border-t border-secondary/50 flex justify-end">
                    <button type="submit" disabled={isSaving} className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-xl hover:bg-primary-light transition-colors font-medium shadow-sm disabled:opacity-50">
                      {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      Save Preferences
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
