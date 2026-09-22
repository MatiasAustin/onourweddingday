"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, Trash2 } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import imageCompression from "browser-image-compression";

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
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processAndUploadFiles = async (filesArray: File[]) => {
    if (!filesArray || filesArray.length === 0) return;
    
    const supabase = createClient();
    setIsUploading(true);
    setError("");
    
    try {
      const uploadPromises = filesArray.map(async (file) => {
        let fileToUpload = file;
        
        // Auto compress images
        if (file.type.startsWith("image/")) {
          const options = {
            maxSizeMB: 1, // Max 1MB
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          };
          try {
            fileToUpload = await imageCompression(file, options);
          } catch (compressErr) {
            console.error("Compression error:", compressErr);
            // Fallback to original file if compression fails
          }
        }
        
        const fileExt = fileToUpload.name.split('.').pop() || 'png';
        const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { data, error: uploadError } = await supabase.storage
          .from('media')
          .upload(filePath, fileToUpload, { upsert: true });

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
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    await processAndUploadFiles(Array.from(e.target.files));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      await processAndUploadFiles(Array.from(e.dataTransfer.files));
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

        {/* Drag and Drop Zone for Multiline */}
        {multiline ? (
          <div 
            className={`relative w-full border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center transition-colors cursor-pointer
              ${isDragging ? 'border-primary bg-primary/5' : 'border-secondary bg-secondary/5 hover:bg-secondary/10'}
              ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input 
              ref={fileInputRef}
              type="file" 
              multiple={multiline}
              className="hidden" 
              onChange={handleUpload}
              disabled={isUploading}
              accept="image/*,video/*,audio/*"
            />
            {isUploading ? (
              <>
                <Loader2 className="w-8 h-8 text-primary animate-spin mb-2" />
                <p className="text-sm text-foreground/70 font-medium">Mengunggah...</p>
              </>
            ) : (
              <>
                <Upload className="w-8 h-8 text-primary mb-2" />
                <p className="text-sm font-medium text-foreground mb-1">Pilih File atau Seret & Lepas (Drag & Drop) ke sini</p>
                <p className="text-xs text-foreground/60 text-center max-w-xs">Mendukung gambar (otomatis dikompres) dan video.</p>
              </>
            )}
          </div>
        ) : (
          <div className="flex gap-2">
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
            
            <div 
              className={`flex-1 flex gap-2 relative ${isDragging ? 'ring-2 ring-primary bg-primary/5' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <input
                type="text"
                name={name}
                value={value}
                onChange={(e: any) => onChange(e)}
                placeholder={placeholder || "Paste URL atau Drag & Drop gambar kesini"}
                className="flex-1 px-3 py-2 rounded-lg border border-secondary bg-white focus:ring-2 focus:ring-primary/50 text-sm min-w-0"
              />
              <div 
                className={`shrink-0 flex items-center justify-center px-4 py-2.5 rounded-lg border border-secondary ${isUploading ? 'bg-secondary/20 text-foreground/50' : 'bg-primary text-white hover:bg-primary-light'} transition-colors cursor-pointer`}
                onClick={() => fileInputRef.current?.click()}
              >
                <input 
                  ref={fileInputRef}
                  type="file" 
                  className="hidden" 
                  onChange={handleUpload}
                  disabled={isUploading}
                  accept="image/*,video/*,audio/*"
                />
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5" />}
              </div>
            </div>
            
            {/* Delete/Clear Button for Single Line */}
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
        )}
        
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
      </div>
    </div>
  );
}
