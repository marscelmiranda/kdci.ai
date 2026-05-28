import React, { useState, useRef, useEffect } from 'react';
import { Link as LinkIcon, Upload, LayoutGrid, X, Loader2, Check, AlertCircle } from 'lucide-react';

interface MediaFile {
  url: string;
  name: string;
}

interface ImagePickerProps {
  value: string;
  onChange: (url: string) => void;
  altText?: string;
  onAltChange?: (alt: string) => void;
  label?: string;
  hint?: string;
}

type Tab = 'url' | 'upload' | 'library';

const inputCls = 'w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none placeholder-white/25';
const tabCls = (active: boolean) =>
  `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
    active ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
  }`;

export const ImagePicker: React.FC<ImagePickerProps> = ({
  value,
  onChange,
  altText,
  onAltChange,
  label,
  hint,
}) => {
  const [tab, setTab] = useState<Tab>('url');
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState<string | null>(null);
  const [library, setLibrary] = useState<MediaFile[]>([]);
  const [libLoading, setLibLoading] = useState(false);
  const [libLoaded, setLibLoaded] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const loadLibrary = async () => {
    if (libLoaded) return;
    setLibLoading(true);
    try {
      const r = await fetch('/api/media', { credentials: 'include' });
      if (r.ok) setLibrary(await r.json());
    } catch {}
    setLibLoading(false);
    setLibLoaded(true);
  };

  useEffect(() => {
    if (tab === 'library') loadLibrary();
  }, [tab]);

  const handleFile = async (file: File) => {
    setUploading(true);
    setUploadErr(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const r = await fetch('/api/upload', { method: 'POST', body: fd, credentials: 'include' });
      if (!r.ok) throw new Error('Upload failed');
      const { url } = await r.json();
      onChange(url);
      setLibLoaded(false);
    } catch (e: any) {
      setUploadErr(e.message || 'Upload failed');
    }
    setUploading(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-3">
      {label && (
        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{label}</label>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => setTab('url')} className={tabCls(tab === 'url')}>
          <LinkIcon size={11} /> URL
        </button>
        <button type="button" onClick={() => setTab('upload')} className={tabCls(tab === 'upload')}>
          <Upload size={11} /> Upload
        </button>
        <button type="button" onClick={() => setTab('library')} className={tabCls(tab === 'library')}>
          <LayoutGrid size={11} /> Library
        </button>
        {value && (
          <button type="button" onClick={() => onChange('')} className="ml-auto p-1 rounded hover:bg-white/10 text-white/30 hover:text-red-400 transition-colors">
            <X size={13} />
          </button>
        )}
      </div>

      {/* URL tab */}
      {tab === 'url' && (
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder="https://example.com/image.jpg"
          className={inputCls}
        />
      )}

      {/* Upload tab */}
      {tab === 'upload' && (
        <div
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-[#E61739]/50 transition-colors"
        >
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ''; }}
          />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 size={24} className="animate-spin text-[#E61739]" />
              <p className="text-xs text-white/40">Uploading…</p>
            </div>
          ) : uploadErr ? (
            <div className="flex flex-col items-center gap-2">
              <AlertCircle size={20} className="text-red-400" />
              <p className="text-xs text-red-400">{uploadErr}</p>
              <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-[#E61739] underline">Try again</button>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload size={20} className="text-white/30" />
              <p className="text-xs text-white/40">Drag & drop or</p>
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                className="px-4 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-lg transition-colors"
              >
                Choose File
              </button>
              <p className="text-[10px] text-white/20">JPG, PNG, WebP, GIF — max 15 MB</p>
            </div>
          )}
        </div>
      )}

      {/* Library tab */}
      {tab === 'library' && (
        <div className="border border-white/10 rounded-xl p-3 max-h-52 overflow-y-auto">
          {libLoading ? (
            <div className="flex justify-center py-6">
              <Loader2 size={20} className="animate-spin text-[#E61739]/60" />
            </div>
          ) : library.length === 0 ? (
            <p className="text-center text-xs text-white/30 py-6">No uploads yet. Use the Upload tab to add images.</p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {library.map(f => (
                <button
                  key={f.url}
                  type="button"
                  onClick={() => { onChange(f.url); setTab('url'); }}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    value === f.url ? 'border-[#E61739]' : 'border-transparent hover:border-white/30'
                  }`}
                  title={f.name}
                >
                  <img src={f.url} alt={f.name} className="w-full h-full object-cover" />
                  {value === f.url && (
                    <div className="absolute inset-0 bg-[#E61739]/30 flex items-center justify-center">
                      <Check size={14} className="text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="rounded-xl overflow-hidden border border-white/10 max-h-40 flex items-center justify-center bg-black/20">
          <img
            src={value}
            alt=""
            className="max-h-40 max-w-full object-contain"
            onError={e => { (e.target as HTMLImageElement).style.opacity = '0.3'; }}
          />
        </div>
      )}

      {/* Alt text */}
      {onAltChange !== undefined && (
        <div className="space-y-1">
          <label className="text-[10px] font-black uppercase tracking-widest text-white/30">Alt Text</label>
          <input
            type="text"
            value={altText || ''}
            onChange={e => onAltChange(e.target.value)}
            placeholder="Describe the image for accessibility and SEO…"
            className={inputCls}
          />
        </div>
      )}

      {hint && <p className="text-[10px] text-white/20">{hint}</p>}
    </div>
  );
};
