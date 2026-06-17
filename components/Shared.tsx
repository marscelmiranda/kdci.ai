
import React from 'react';
import { ViewType } from '../types';
import { getPath } from '../lib/routes';

export const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ad1457]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">
    {children}
  </div>
);

export const SectionHeading = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <h2 className={`text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] tracking-tight ${className}`}>
    {children}
  </h2>
);

export const SectionSubheading = ({ children }: { children: React.ReactNode }) => (
  <p className="text-lg text-[#86868b] font-medium leading-relaxed max-w-2xl">
    {children}
  </p>
);

export const Card = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white rounded-3xl p-8 border border-black/5 hover:shadow-xl transition-shadow ${className}`}>
    {children}
  </div>
);

export const Tag = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block px-3 py-1 rounded-full bg-[#ad1457]/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
    {children}
  </span>
);

export const StatCard = ({ value, label, sub }: { value: string, label: string, sub?: string }) => (
  <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10">
    <div className="text-4xl md:text-5xl font-heading font-bold text-white mb-2">{value}</div>
    <div className="text-sm font-bold text-white/70">{label}</div>
    {sub && <div className="text-xs text-white/40 mt-1">{sub}</div>}
  </div>
);

export const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-black/10 to-transparent my-16" />
);

export const Breadcrumbs = ({
  setView,
  currentName,
  parent,
  align = 'center',
}: {
  setView: (v: ViewType) => void;
  currentName: string;
  parent?: { name: string; view: ViewType };
  align?: 'center' | 'left';
}) => (
  <nav
    aria-label="Breadcrumb"
    className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 ${align === 'left' ? 'justify-start' : 'justify-center'}`}
  >
    <a
      href="/"
      onClick={e => { e.preventDefault(); setView('home'); }}
      className="hover:text-white transition-colors"
    >
      Home
    </a>
    {parent && (
      <>
        <span className="opacity-50">/</span>
        <a
          href={getPath(parent.view)}
          onClick={e => { e.preventDefault(); setView(parent.view); }}
          className="hover:text-white transition-colors"
        >
          {parent.name}
        </a>
      </>
    )}
    <span className="opacity-50">/</span>
    <span className="text-[#E61739]">{currentName}</span>
  </nav>
);
