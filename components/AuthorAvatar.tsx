import React from 'react';

interface Props {
  name: string;
  avatarUrl?: string | null;
  size?: number;
  theme?: 'dark' | 'light';
  className?: string;
}

export const AuthorAvatar = ({ name, avatarUrl, size = 40, theme = 'dark', className = '' }: Props) => {
  const initial = (name || 'K').charAt(0).toUpperCase();
  const style: React.CSSProperties = { width: size, height: size, minWidth: size, minHeight: size };

  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        title={name}
        className={`rounded-full object-cover border ${theme === 'dark' ? 'border-white/20' : 'border-slate-200'} shrink-0 ${className}`}
        style={style}
        onError={e => {
          const img = e.currentTarget;
          img.onerror = null;
          img.style.display = 'none';
          const parent = img.parentElement;
          if (parent) {
            const fallback = document.createElement('div');
            fallback.className = img.className.replace('object-cover', 'flex items-center justify-center font-black text-sm');
            fallback.style.cssText = `width:${size}px;height:${size}px;min-width:${size}px;border-radius:9999px;background:${theme === 'dark' ? 'rgba(230,23,57,0.2)' : '#fef2f4'};border:1px solid ${theme === 'dark' ? 'rgba(230,23,57,0.3)' : '#fecdd3'};color:#E61739;display:flex;align-items:center;justify-content:center;font-weight:900;font-size:${size * 0.35}px`;
            fallback.textContent = initial;
            parent.insertBefore(fallback, img);
          }
        }}
      />
    );
  }

  return (
    <div
      title={name}
      className={`rounded-full flex items-center justify-center font-black shrink-0 ${
        theme === 'dark'
          ? 'bg-[#E61739]/20 border border-[#E61739]/30 text-[#E61739]'
          : 'bg-red-50 border border-red-100 text-[#E61739]'
      } ${className}`}
      style={{ ...style, fontSize: size * 0.35 }}
    >
      {initial}
    </div>
  );
};
