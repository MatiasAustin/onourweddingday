"use client";

import { Save, User, Globe, Bell, Lock } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-semibold text-foreground">Settings</h1>
        <p className="text-foreground/60 mt-1">Manage your platform preferences and admin profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Settings Navigation */}
        <div className="md:col-span-1 space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-2.5 bg-white text-primary font-medium rounded-xl border border-secondary shadow-sm">
            <User className="w-4 h-4" />
            Profile
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground/70 font-medium rounded-xl hover:bg-secondary/30 transition-colors">
            <Globe className="w-4 h-4" />
            Site Preferences
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground/70 font-medium rounded-xl hover:bg-secondary/30 transition-colors">
            <Bell className="w-4 h-4" />
            Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-foreground/70 font-medium rounded-xl hover:bg-secondary/30 transition-colors">
            <Lock className="w-4 h-4" />
            Security
          </button>
        </div>

        {/* Settings Content */}
        <div className="md:col-span-3 space-y-6">
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
        </div>
      </div>
    </div>
  );
}
