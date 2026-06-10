import React, { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload, Link2, Youtube, Play, Pause, Volume2, VolumeX,
  RefreshCw, AlignLeft, AlignCenter, AlignRight, Copy, Check,
  Film, Trash2, Settings2, Image as ImageIcon, Type, ChevronDown
} from 'lucide-react';

/* ─── Types ─────────────────────────────────────────────── */

export interface VideoBlockContent {
  sourceType: 'file' | 'youtube' | 'vimeo';
  fileObjectUrl?: string;
  fileName?: string;
  fileSize?: number;
  fileFormat?: string;
  thumbnailDataUrl?: string;
  url?: string;
  videoId?: string;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  showControls?: boolean;
  maxWidth?: string;
  aspectRatio?: '16/9' | '4/3' | '1/1' | 'custom';
  customAspectW?: number;
  customAspectH?: number;
  borderRadius?: number;
  boxShadow?: boolean;
  alignment?: 'left' | 'center' | 'right';
  caption?: string;
  posterUrl?: string;
}

interface Props {
  content: VideoBlockContent;
  onChange: (content: VideoBlockContent) => void;
}

/* ─── Helpers ────────────────────────────────────────────── */

const extractYouTubeId = (url: string): string | null => {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? match[1] : null;
};

const extractVimeoId = (url: string): string | null => {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return match ? match[1] : null;
};

const formatBytes = (bytes: number): string => {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const generateThumbnail = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const videoEl = document.createElement('video');
    const objectUrl = URL.createObjectURL(file);
    videoEl.src = objectUrl;
    videoEl.muted = true;
    videoEl.playsInline = true;
    videoEl.currentTime = 0.5;
    const cleanup = () => URL.revokeObjectURL(objectUrl);
    videoEl.onseeked = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = videoEl.videoWidth || 1280;
        canvas.height = videoEl.videoHeight || 720;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.82));
      } catch (e) {
        reject(e);
      } finally {
        cleanup();
      }
    };
    videoEl.onerror = () => { cleanup(); reject(new Error('Thumbnail failed')); };
    videoEl.load();
  });

const buildEmbedUrl = (content: VideoBlockContent): string => {
  const { sourceType, videoId, autoplay, loop, muted, showControls } = content;
  if (sourceType === 'youtube' && videoId) {
    const params = new URLSearchParams({
      ...(autoplay ? { autoplay: '1' } : {}),
      ...(autoplay || muted ? { mute: '1' } : {}),
      ...(loop ? { loop: '1', playlist: videoId } : {}),
      controls: showControls === false ? '0' : '1',
      rel: '0',
    });
    return `https://www.youtube.com/embed/${videoId}?${params}`;
  }
  if (sourceType === 'vimeo' && videoId) {
    const params = new URLSearchParams({
      ...(autoplay ? { autoplay: '1' } : {}),
      ...(autoplay || muted ? { muted: '1' } : {}),
      ...(loop ? { loop: '1' } : {}),
      controls: showControls === false ? '0' : '1',
      byline: '0',
      portrait: '0',
      title: '0',
    });
    return `https://player.vimeo.com/video/${videoId}?${params}`;
  }
  return '';
};

const buildEmbedHTML = (content: VideoBlockContent): string => {
  const { sourceType, fileObjectUrl, fileName, autoplay, loop, muted, showControls, maxWidth, aspectRatio, borderRadius, boxShadow, alignment, caption, posterUrl } = content;
  const ar = aspectRatio === '4/3' ? '75%' : aspectRatio === '1/1' ? '100%' : aspectRatio === 'custom'
    ? `${((content.customAspectH || 9) / (content.customAspectW || 16)) * 100}%` : '56.25%';
  const align = alignment === 'left' ? 'margin-right:auto' : alignment === 'right' ? 'margin-left:auto' : 'margin:0 auto';
  const shadow = boxShadow ? 'box-shadow:0 24px 60px rgba(0,0,0,0.18)' : '';
  const radius = `border-radius:${borderRadius ?? 8}px`;
  const wrapStyle = `max-width:${maxWidth || '100%'};${align};width:100%`;
  const padStyle = `position:relative;padding-top:${ar};${radius};${shadow};overflow:hidden`;

  if (sourceType === 'file' && fileObjectUrl) {
    return `<div style="${wrapStyle}">\n  <video style="width:100%;${radius}" ${autoplay ? 'autoplay muted' : ''} ${loop ? 'loop' : ''} ${muted ? 'muted' : ''} ${showControls !== false ? 'controls' : ''} ${posterUrl ? `poster="${posterUrl}"` : ''} playsinline>\n    <source src="${fileObjectUrl}" type="video/${(fileName?.split('.').pop() || 'mp4')}">\n  </video>\n  ${caption ? `<p style="text-align:center;font-size:13px;margin-top:8px;opacity:.6">${caption}</p>` : ''}\n</div>`;
  }
  const embedUrl = buildEmbedUrl(content);
  return `<div style="${wrapStyle}">\n  <div style="${padStyle}">\n    <iframe src="${embedUrl}" style="position:absolute;inset:0;width:100%;height:100%" frameborder="0" allowfullscreen allow="autoplay;encrypted-media;picture-in-picture"></iframe>\n  </div>\n  ${caption ? `<p style="text-align:center;font-size:13px;margin-top:8px;opacity:.6">${caption}</p>` : ''}\n</div>`;
};

/* ─── Sub-components ──────────────────────────────────────── */

const inp = 'w-full bg-black/30 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739] transition-colors';
const label = 'block text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5';
const sectionHead = 'text-[10px] font-black uppercase tracking-widest text-white/30 mb-3 mt-5 border-b border-white/5 pb-1';

const Toggle = ({ checked, onChange, label: lbl }: { checked: boolean; onChange: (v: boolean) => void; label: string }) => (
  <label className="flex items-center justify-between cursor-pointer select-none py-1.5">
    <span className="text-sm text-white/70 font-medium">{lbl}</span>
    <div
      onClick={() => onChange(!checked)}
      className={`relative w-9 h-5 rounded-full transition-all ${checked ? 'bg-[#E61739]' : 'bg-white/10'}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </div>
  </label>
);

/* ─── Main Component ──────────────────────────────────────── */

export const VideoEmbedEditor = ({ content, onChange }: Props) => {
  const c = content || {} as VideoBlockContent;
  const up = (patch: Partial<VideoBlockContent>) => onChange({ ...c, ...patch });

  const [activeTab, setActiveTab] = useState<'source' | 'playback' | 'style'>(c.sourceType ? 'source' : 'source');
  const [urlInput, setUrlInput] = useState(c.url || '');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const previewVideoRef = useRef<HTMLVideoElement>(null);

  const sourceType = c.sourceType || 'youtube';
  const hasVideo = !!(c.fileObjectUrl || c.videoId);

  const handleUrlBlur = () => {
    const ytId = extractYouTubeId(urlInput);
    if (ytId) { up({ sourceType: 'youtube', videoId: ytId, url: urlInput }); return; }
    const vmId = extractVimeoId(urlInput);
    if (vmId) { up({ sourceType: 'vimeo', videoId: vmId, url: urlInput }); return; }
    if (urlInput) up({ url: urlInput });
  };

  const handleFile = useCallback(async (file: File) => {
    if (!['video/mp4', 'video/webm', 'video/ogg'].includes(file.type)) return;
    if (file.size > 100 * 1024 * 1024) { alert('File must be under 100 MB'); return; }
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => setUploadProgress(p => Math.min((p || 0) + 10, 90)), 60);
    const objectUrl = URL.createObjectURL(file);
    let thumb: string | undefined;
    try { thumb = await generateThumbnail(file); } catch { /* no thumb */ }
    clearInterval(interval);
    setUploadProgress(100);
    setTimeout(() => setUploadProgress(null), 800);
    setUploading(false);
    up({
      sourceType: 'file',
      fileObjectUrl: objectUrl,
      fileName: file.name,
      fileSize: file.size,
      fileFormat: file.type.split('/')[1].toUpperCase(),
      thumbnailDataUrl: thumb,
      showControls: true,
    });
  }, [c]);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const copyEmbed = () => {
    navigator.clipboard.writeText(buildEmbedHTML(c)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const arLabel = { '16/9': '16 : 9', '4/3': '4 : 3', '1/1': '1 : 1', 'custom': 'Custom' } as const;

  /* Thumbnail/preview thumb */
  const thumbSrc = c.posterUrl || c.thumbnailDataUrl;
  const embedUrl = buildEmbedUrl(c);

  return (
    <div className="flex gap-4 min-h-[420px]">

      {/* ── Left: Main panel ── */}
      <div className="flex-grow space-y-4">

        {/* Source Type Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white/5 rounded-xl border border-white/5">
          {([
            { key: 'youtube', label: 'YouTube', icon: <Youtube size={13} /> },
            { key: 'vimeo', label: 'Vimeo', icon: <Film size={13} /> },
            { key: 'file', label: 'File Upload', icon: <Upload size={13} /> },
          ] as const).map(t => (
            <button key={t.key} type="button"
              onClick={() => up({ sourceType: t.key })}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-[11px] font-bold transition-all ${sourceType === t.key ? 'bg-[#E61739] text-white shadow' : 'text-white/40 hover:text-white'}`}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* URL input (YouTube / Vimeo) */}
        {(sourceType === 'youtube' || sourceType === 'vimeo') && (
          <div className="space-y-3">
            <div>
              <label className={label}>
                {sourceType === 'youtube' ? 'YouTube URL' : 'Vimeo URL'}
              </label>
              <div className="relative">
                <input
                  type="url"
                  className={inp + ' pr-10'}
                  placeholder={sourceType === 'youtube' ? 'https://www.youtube.com/watch?v=…' : 'https://vimeo.com/123456789'}
                  value={urlInput}
                  onChange={e => setUrlInput(e.target.value)}
                  onBlur={handleUrlBlur}
                  onKeyDown={e => e.key === 'Enter' && handleUrlBlur()}
                />
                <Link2 size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20" />
              </div>
            </div>
            {c.videoId && (
              <div className="flex items-center gap-2 px-3 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
                <Check size={13} className="text-green-400 shrink-0" />
                <span className="text-[11px] font-bold text-green-300">
                  {sourceType === 'youtube' ? 'YouTube' : 'Vimeo'} ID detected: <code className="font-mono">{c.videoId}</code>
                </span>
              </div>
            )}
          </div>
        )}

        {/* File Upload */}
        {sourceType === 'file' && (
          <div className="space-y-3">
            {!c.fileObjectUrl ? (
              <div
                className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${dragOver ? 'border-[#E61739] bg-[#E61739]/5' : 'border-white/10 hover:border-white/20 bg-white/2'}`}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/mp4,video/webm,video/ogg"
                  className="sr-only"
                  onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
                />
                <Upload size={28} className={`mx-auto mb-3 ${dragOver ? 'text-[#E61739]' : 'text-white/20'}`} />
                <p className="text-sm font-bold text-white/60">Drag & drop or <span className="text-[#E61739]">browse</span></p>
                <p className="text-[11px] text-white/25 mt-1">MP4, WebM, OGG · max 100 MB</p>
              </div>
            ) : (
              <div className="border border-white/10 rounded-2xl overflow-hidden">
                {/* Thumbnail */}
                {thumbSrc && (
                  <div className="relative group aspect-video bg-black cursor-pointer" onClick={() => setPreviewOpen(true)}>
                    <img src={thumbSrc} alt="thumbnail" className="w-full h-full object-cover opacity-80" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/50 transition-all">
                      <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                        <Play size={20} className="text-slate-900 ml-0.5" />
                      </div>
                    </div>
                  </div>
                )}
                {/* File meta */}
                <div className="flex items-center gap-3 px-4 py-3 bg-white/3">
                  <div className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Film size={16} className="text-white/50" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-bold text-white truncate">{c.fileName}</p>
                    <p className="text-[11px] text-white/30">{formatBytes(c.fileSize || 0)}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-[#E61739]/10 border border-[#E61739]/20 text-[10px] font-black text-[#E61739] shrink-0">{c.fileFormat}</span>
                  <button type="button" onClick={() => up({ fileObjectUrl: undefined, fileName: undefined, fileSize: undefined, fileFormat: undefined, thumbnailDataUrl: undefined })}
                    className="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-white/30 hover:text-red-400 transition-all shrink-0">
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            )}
            {/* Upload Progress */}
            {uploading && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-white/40">Uploading…</span>
                  <span className="text-[11px] font-mono text-white/40">{uploadProgress}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-[#E61739] rounded-full transition-all duration-150" style={{ width: `${uploadProgress || 0}%` }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* Poster override */}
        <div>
          <label className={label}><ImageIcon size={10} className="inline mr-1" />Poster / Thumbnail Override (URL)</label>
          <input type="url" className={inp} placeholder="https://cdn.example.com/poster.jpg"
            value={c.posterUrl || ''}
            onChange={e => up({ posterUrl: e.target.value })} />
        </div>

        {/* Caption */}
        <div>
          <label className={label}><Type size={10} className="inline mr-1" />Caption (optional)</label>
          <input type="text" className={inp} placeholder="Add a caption below the video…"
            value={c.caption || ''}
            onChange={e => up({ caption: e.target.value })} />
        </div>

        {/* Live Preview (for embeds) */}
        {(sourceType === 'youtube' || sourceType === 'vimeo') && c.videoId && (
          <div className="space-y-2">
            <p className={sectionHead}>Live Preview</p>
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black"
              style={{ paddingTop: c.aspectRatio === '4/3' ? '75%' : c.aspectRatio === '1/1' ? '100%' : '56.25%' }}>
              <iframe
                src={embedUrl}
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* Copy embed code */}
        {hasVideo && (
          <button type="button" onClick={copyEmbed}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border text-[11px] font-black uppercase tracking-widest transition-all ${copied ? 'border-green-500/30 text-green-400 bg-green-500/5' : 'border-white/10 text-white/40 hover:text-white hover:border-white/20 bg-white/2'}`}>
            {copied ? <><Check size={13} /> Copied!</> : <><Copy size={13} /> Copy Embed Code</>}
          </button>
        )}
      </div>

      {/* ── Right: Settings sidebar ── */}
      <div className="w-56 shrink-0 border-l border-white/5 pl-4 space-y-0.5">

        <p className={sectionHead + ' mt-0'}>Playback</p>
        <Toggle checked={!!c.autoplay} onChange={v => up({ autoplay: v, muted: v ? true : c.muted })} label="Autoplay" />
        <Toggle checked={!!c.loop} onChange={v => up({ loop: v })} label="Loop" />
        <Toggle checked={c.muted !== false} onChange={v => up({ muted: v })} label="Muted" />
        <Toggle checked={c.showControls !== false} onChange={v => up({ showControls: v })} label="Show Controls" />

        <p className={sectionHead}>Styling</p>

        {/* Alignment */}
        <div className="mb-2">
          <label className={label}>Alignment</label>
          <div className="flex gap-1">
            {([
              { v: 'left', icon: <AlignLeft size={13} /> },
              { v: 'center', icon: <AlignCenter size={13} /> },
              { v: 'right', icon: <AlignRight size={13} /> },
            ] as const).map(({ v, icon }) => (
              <button key={v} type="button"
                onClick={() => up({ alignment: v })}
                className={`flex-1 py-2 rounded-lg flex items-center justify-center transition-all ${(c.alignment || 'center') === v ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}>
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="mb-2">
          <label className={label}>Aspect Ratio</label>
          <div className="grid grid-cols-2 gap-1">
            {(['16/9', '4/3', '1/1', 'custom'] as const).map(ar => (
              <button key={ar} type="button"
                onClick={() => up({ aspectRatio: ar })}
                className={`py-1.5 rounded-lg text-[10px] font-black transition-all ${(c.aspectRatio || '16/9') === ar ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}>
                {arLabel[ar]}
              </button>
            ))}
          </div>
          {c.aspectRatio === 'custom' && (
            <div className="flex gap-1 mt-1.5">
              <input type="number" min={1} className={inp + ' text-center'} placeholder="W"
                value={c.customAspectW || ''} onChange={e => up({ customAspectW: Number(e.target.value) })} />
              <span className="text-white/30 flex items-center text-xs">:</span>
              <input type="number" min={1} className={inp + ' text-center'} placeholder="H"
                value={c.customAspectH || ''} onChange={e => up({ customAspectH: Number(e.target.value) })} />
            </div>
          )}
        </div>

        {/* Max Width */}
        <div className="mb-2">
          <label className={label}>Max Width</label>
          <input type="text" className={inp} placeholder="100% or 800px"
            value={c.maxWidth || ''}
            onChange={e => up({ maxWidth: e.target.value })} />
        </div>

        {/* Border Radius */}
        <div className="mb-2">
          <label className={label}>Border Radius: {c.borderRadius ?? 8}px</label>
          <input type="range" min={0} max={40} step={1}
            value={c.borderRadius ?? 8}
            onChange={e => up({ borderRadius: Number(e.target.value) })}
            className="w-full accent-[#E61739]" />
        </div>

        {/* Box Shadow */}
        <Toggle checked={!!c.boxShadow} onChange={v => up({ boxShadow: v })} label="Box Shadow" />
      </div>

      {/* ── Native video preview modal ── */}
      {previewOpen && c.fileObjectUrl && (
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-8" onClick={() => setPreviewOpen(false)}>
          <div className="w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <video
              ref={previewVideoRef}
              src={c.fileObjectUrl}
              poster={c.posterUrl || c.thumbnailDataUrl}
              controls
              autoPlay
              className="w-full rounded-2xl"
              style={{ maxHeight: '80vh' }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

/* ─── Renderer (used in preview + public site) ────────────── */

interface RenderProps {
  content: VideoBlockContent;
  className?: string;
}

export const VideoBlockRenderer = ({ content: c, className = '' }: RenderProps) => {
  if (!c) return null;
  const { sourceType, fileObjectUrl, autoplay, loop, muted, showControls, maxWidth, aspectRatio, customAspectW, customAspectH, borderRadius, boxShadow, alignment, caption, posterUrl, thumbnailDataUrl } = c;

  const paddingTop = aspectRatio === '4/3' ? '75%' : aspectRatio === '1/1' ? '100%' : aspectRatio === 'custom'
    ? `${(((customAspectH || 9) / (customAspectW || 16)) * 100).toFixed(2)}%` : '56.25%';
  const alignClass = alignment === 'left' ? 'mr-auto' : alignment === 'right' ? 'ml-auto' : 'mx-auto';
  const shadow = boxShadow ? 'shadow-2xl' : '';
  const radius = `${borderRadius ?? 8}px`;
  const embedUrl = buildEmbedUrl(c);
  const thumbSrc = posterUrl || thumbnailDataUrl;

  const wrapStyle: React.CSSProperties = { maxWidth: maxWidth || '100%' };

  if (sourceType === 'file' && fileObjectUrl) {
    return (
      <div className={`${alignClass} ${className}`} style={wrapStyle}>
        <video
          src={fileObjectUrl}
          poster={thumbSrc}
          autoPlay={autoplay}
          loop={!!loop}
          muted={autoplay || !!muted}
          controls={showControls !== false}
          playsInline
          className={`w-full ${shadow}`}
          style={{ borderRadius: radius }}
        />
        {caption && <p className="text-center text-sm text-slate-400 mt-3">{caption}</p>}
      </div>
    );
  }

  if ((sourceType === 'youtube' || sourceType === 'vimeo') && c.videoId) {
    return (
      <div className={`${alignClass} ${className}`} style={wrapStyle}>
        <div className={`relative overflow-hidden ${shadow}`} style={{ paddingTop, borderRadius: radius }}>
          <iframe
            src={embedUrl}
            className="absolute inset-0 w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            title="Embedded video"
          />
        </div>
        {caption && <p className="text-center text-sm text-slate-400 mt-3">{caption}</p>}
      </div>
    );
  }

  return null;
};
