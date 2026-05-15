
import React from 'react';
import { ArrowRight, Home, Search } from 'lucide-react';
import { ViewType } from '../types';

export const NotFoundPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-[#020202] flex flex-col items-center justify-center px-6 relative overflow-hidden">

      {/* Background mesh blobs */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#E61739]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#E61739]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center max-w-xl mx-auto">

        {/* 404 number */}
        <div className="text-[clamp(120px,20vw,200px)] font-heading font-black leading-none text-white/[0.04] select-none mb-0">
          404
        </div>

        {/* Icon */}
        <div className="w-16 h-16 bg-[#E61739]/15 border border-[#E61739]/25 rounded-2xl flex items-center justify-center mx-auto -mt-8 mb-8">
          <Search size={28} className="text-[#E61739]" />
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 tracking-tight">
          Page not found.
        </h1>

        <p className="text-white/45 text-lg font-medium leading-relaxed mb-10">
          The page you're looking for doesn't exist or may have been moved.<br />
          Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setView('home')}
            className="flex items-center gap-3 px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all shadow-xl group"
          >
            <Home size={16} />
            Back to Home
          </button>
          <button
            onClick={() => setView('contact')}
            className="flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/10 transition-all group"
          >
            Contact Support
            <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Quick links */}
        <div className="mt-14 pt-10 border-t border-white/[0.07]">
          <p className="text-white/30 text-[11px] font-black uppercase tracking-widest mb-5">Popular pages</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'Services', view: 'solutions-hub' },
              { label: 'Offshore Staffing', view: 'staff-aug' },
              { label: 'Customer Experience', view: 'customer-support' },
              { label: 'Blog', view: 'blog' },
              { label: 'Careers', view: 'careers' },
            ].map((link) => (
              <button
                key={link.view}
                onClick={() => setView(link.view as ViewType)}
                className="px-4 py-2 bg-white/5 border border-white/10 text-white/60 text-xs font-bold rounded-xl hover:bg-white/10 hover:text-white transition-all"
              >
                {link.label}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
