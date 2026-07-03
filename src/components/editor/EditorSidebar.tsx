"use client";

import { Save, Eye, ArrowLeft, Settings2, Layers, Type, Palette } from "lucide-react";
import Link from "next/link";

export function EditorSidebar() {
  return (
    <div className="flex h-screen w-80 flex-col border-r border-secondary/50 bg-white shadow-xl z-50">
      
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-secondary/50">
        <Link href="/dashboard" className="p-2 hover:bg-secondary/30 rounded-lg text-foreground/60 hover:text-primary transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-secondary/30 rounded-lg text-foreground/60 hover:text-primary transition-colors" title="Preview">
            <Eye className="w-5 h-5" />
          </button>
          <button className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-light transition-colors text-sm font-medium shadow-sm">
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-secondary/50">
        <button className="flex-1 py-3 border-b-2 border-primary text-primary font-medium text-sm flex items-center justify-center gap-2">
          <Layers className="w-4 h-4" />
          Sections
        </button>
        <button className="flex-1 py-3 text-foreground/50 hover:text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-colors">
          <Palette className="w-4 h-4" />
          Theme
        </button>
        <button className="flex-1 py-3 text-foreground/50 hover:text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-colors">
          <Settings2 className="w-4 h-4" />
          Settings
        </button>
      </div>

      {/* Content Area (Placeholder for Drag and Drop list) */}
      <div className="flex-1 overflow-y-auto p-4 bg-secondary/5">
        <div className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-4 px-2">Active Blocks</div>
        
        <div className="space-y-3">
          {/* Example of draggable items */}
          {["Hero Section", "Our Story", "Photo Gallery", "RSVP Form"].map((block) => (
            <div key={block} className="bg-white p-4 rounded-xl border border-secondary/50 shadow-sm cursor-move hover:border-primary transition-colors flex items-center justify-between">
              <span className="font-medium text-sm">{block}</span>
              <Settings2 className="w-4 h-4 text-foreground/40" />
            </div>
          ))}
        </div>
        
        <button className="w-full mt-6 py-3 border-2 border-dashed border-secondary/80 rounded-xl text-primary font-medium text-sm hover:bg-secondary/20 transition-colors">
          + Add Section
        </button>
      </div>
      
    </div>
  );
}
