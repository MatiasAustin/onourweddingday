"use client";

import { useState } from "react";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

interface FileUploadProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: { target: { name: string; value: string } }) => void;
  placeholder?: string;
  multiline?: boolean;
}

export default function FileUpload({ label, name, value, onChange, placeholder, multiline }: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const file = e.target.files[0];
    const supabase = createClient();
    
    setIsUploading(true);
    setError("");
    
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error: uploadError } = await supabase.storage
        .from('media')
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('media')
        .getPublicUrl(filePath);

      // If multiline (like gallery), append. Otherwise replace.
      let newValue = publicUrl;
      if (multiline) {
        newValue = value ? `${value}, ${publicUrl}` : publicUrl;
      }

      onChange({ target: { name, value: newValue } });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file");
    } finally {
      setIsUploading(false);
      // Reset input value so same file can be selected again if needed
      e.target.value = '';
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">{label}</label>
      
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          {multiline ? (
            <textarea
              name={name}
              value={value}
              onChange={(e: any) => onChange(e)}
              placeholder={placeholder}
              rows={3}
              className="flex-1 px-3 py-2 rounded-lg border border-secondary bg-white focus:ring-2 focus:ring-primary/50 resize-none text-sm font-mono"
            />
          ) : (
            <input
              type="text"
              name={name}
              value={value}
              onChange={(e: any) => onChange(e)}
              placeholder={placeholder}
              className="flex-1 px-3 py-2 rounded-lg border border-secondary bg-white focus:ring-2 focus:ring-primary/50 text-sm"
            />
          )}
          
          <div className="relative">
            <input 
              type="file" 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
              onChange={handleUpload}
              disabled={isUploading}
              accept="image/*,video/*"
            />
            <div className={`h-full flex items-center justify-center px-4 rounded-lg border border-secondary ${isUploading ? 'bg-secondary/20' : 'bg-primary text-white hover:bg-primary-light'} transition-colors cursor-pointer`}>
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
            </div>
          </div>
          
          {/* Delete/Clear Button */}
          {value && (
            <button
              type="button"
              onClick={() => onChange({ target: { name, value: '' } })}
              className="flex items-center justify-center px-3 rounded-lg border border-red-200 bg-red-50 text-red-500 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors"
              title="Hapus Media"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
      </div>
    </div>
  );
}
