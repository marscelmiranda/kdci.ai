import React, { useEffect, useState } from 'react';
import { Cookie, X, ShieldCheck } from 'lucide-react';
import { ViewType } from '../types';

const STORAGE_KEY = 'kdci_cookie_consent';

interface CookieBannerProps {
  setView: (v: ViewType) => void;
}

export const CookieBanner = ({ setView }: CookieBannerProps) => {
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 1200);
      return () => clearTimeout(t);
    }
  }, []);

  const dismiss = (choice: 'accepted' | 'declined') => {
    localStorage.setItem(STORAGE_KEY, choice);
    setLeaving(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
      aria-live="polite"
      aria-label="Cookie consent"
    >
      <div
        className={`
          max-w-3xl mx-auto bg-[#0d0d0d] border border-white/10 rounded-2xl shadow-2xl pointer-events-auto
          transition-all duration-400 ease-out
          ${leaving ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}
        `}
        style={{ backdropFilter: 'blur(16px)' }}
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 sm:p-6">

          {/* Icon */}
          <div className="shrink-0 w-10 h-10 rounded-xl bg-[#ad1457]/15 border border-[#E61739]/20 flex items-center justify-center">
            <Cookie size={18} className="text-[#E61739]" />
          </div>

          {/* Text */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-bold mb-0.5">We use cookies</p>
            <p className="text-white/45 text-[13px] leading-relaxed">
              We use cookies to enhance your browsing experience, analyse site traffic, and personalise content.
              By clicking <span className="text-white/70 font-semibold">Accept All</span>, you consent to our use of cookies.{' '}
              <button
                onClick={() => setView('privacy-policy')}
                className="text-[#E61739] hover:text-[#ff2a50] font-semibold underline underline-offset-2 transition-colors"
              >
                Privacy Policy
              </button>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
            <button
              onClick={() => dismiss('declined')}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-[13px] font-bold text-white/50 hover:text-white/80 hover:bg-white/5 transition-all border border-white/10"
            >
              Decline
            </button>
            <button
              onClick={() => dismiss('accepted')}
              className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl text-[13px] font-bold bg-[#ad1457] text-white hover:bg-[#8e1049] transition-all shadow-lg shadow-[#E61739]/20"
            >
              <ShieldCheck size={14} />
              Accept All
            </button>
          </div>

          {/* Close (X) */}
          <button
            onClick={() => dismiss('declined')}
            className="hidden sm:flex absolute top-4 right-4 w-7 h-7 items-center justify-center rounded-lg text-white/30 hover:text-white/60 hover:bg-white/5 transition-all"
            aria-label="Close"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
