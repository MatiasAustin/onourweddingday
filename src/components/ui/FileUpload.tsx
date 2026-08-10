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
    
    const files = Array.from(e.target.files);
    const supabase = createClient();
    
    setIsUploading(true);
    setError("");
    
    try {
      const uploadPromises = files.map(async (file) => {
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
          
        return publicUrl;
      });

      const newUrls = await Promise.all(uploadPromises);

      let newValue = newUrls[0];
      if (multiline) {
        const existingUrls = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];
        newValue = [...existingUrls, ...newUrls].join(', ');
      }

      onChange({ target: { name, value: newValue } });
    } catch (err: any) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload file(s)");
    } finally {
      setIsUploading(false);
      e.target.value = '';
    }
  };

  const handleRemove = (urlToRemove: string) => {
    const existingUrls = value ? value.split(',').map(s => s.trim()).filter(Boolean) : [];
    const newUrls = existingUrls.filter(url => url !== urlToRemove);
    onChange({ target: { name, value: newUrls.join(', ') } });
  };

  return (
    <div className="mb-4">
      <label className="block text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-2">{label}</label>
      
      <div className="flex flex-col gap-2">
        {/* Gallery Grid View for Multiline */}
        {multiline && value && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {value.split(',').map(s => s.trim()).filter(Boolean).map((url, index) => (
              <div key={index} className="relative group aspect-square rounded-lg overflow-hidden border border-secondary/20 bg-gray-100 flex items-center justify-center">
                {url.match(/\.(mp4|webm|ogg)$/i) ? (
                  <video src={url} className="w-full h-full object-cover" muted playsInline />
                ) : (
                  <img src={url} alt={`Media ${index}`} className="w-full h-full object-cover" />
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(url)}
                  className="absolute top-1 right-1 p-1.5 bg-red-500/90 hover:bg-red-600 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  title="Hapus Media"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}

        <div className="flex gap-2">
          {!multiline && (
            <>
              {value && !value.match(/\.(mp4|webm|ogg)$/i) && (
                <div className="shrink-0 w-10 h-10 rounded-md overflow-hidden border border-secondary/20 bg-gray-100 flex items-center justify-center">
                  <img src={value} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              {value && value.match(/\.(mp4|webm|ogg)$/i) && (
                <div className="shrink-0 w-10 h-10 rounded-md overflow-hidden border border-secondary/20 bg-gray-100 flex items-center justify-center text-[10px] text-center p-1">
                  Video
                </div>
              )}
              <input
                type="text"
                name={name}
                value={value}
                onChange={(e: any) => onChange(e)}
                placeholder={placeholder}
                className="flex-1 px-3 py-2 rounded-lg border border-secondary bg-white focus:ring-2 focus:ring-primary/50 text-sm min-w-0"
              />
            </>
          )}
          
          <div className={`relative shrink-0 ${multiline ? 'w-full' : ''}`}>
            <input 
              type="file" 
              multiple={multiline}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed z-10" 
              onChange={handleUpload}
              disabled={isUploading}
              accept="image/*,video/*,audio/*"
            />
            <div className={`h-full flex items-center justify-center px-4 py-2.5 rounded-lg border border-secondary ${isUploading ? 'bg-secondary/20 text-foreground/50' : 'bg-primary text-white hover:bg-primary-light'} transition-colors cursor-pointer`}>
              {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              {multiline && <span className="ml-2 text-sm font-medium">{isUploading ? "Mengunggah..." : "Tambah Media"}</span>}
            </div>
          </div>
          
          {/* Delete/Clear Button for Single Line */}
          {!multiline && value && (
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
