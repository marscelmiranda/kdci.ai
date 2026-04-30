
import React, { useState } from 'react';
import { ChevronRight, MapPin, Globe2 } from 'lucide-react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { TOP_SERVICES, INDUSTRIES } from '../data';

// Solid / Filled Social Media Icons

const LinkedinIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const InstagramIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const FacebookIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
  </svg>
);

const TiktokIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.35-1.17 1.09-1.25 1.79-.05.55-.04 1.1.22 1.62.46.93 1.61 1.55 2.63 1.53 1.29-.01 2.5-.73 3.12-1.87.5-1.02.59-2.13.61-3.23.01-4.8-.01-9.6.02-14.4.68-.02 1.32-.02 1.96-.02z"/>
  </svg>
);

const YoutubeIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
  </svg>
);

const BehanceIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M22 7h-9c0 0-.109 4.196.065 5.565.174 1.369 1.674 1.435 1.674 1.435h5.457v-1.957h-3.413v-.369h5.174v2.543c0 2.218-1.543 3.783-5.261 3.783-3.609 0-5.761-2.022-5.696-5.87.065-3.848 2.065-5.152 4.935-5.152 2.87 0 5.065 1.304 5.065 1.304v-1.282zm-20.065-2h6.739c3.022 0 4.174 1.283 4.174 3.326 0 1.761-.848 2.543-1.891 2.826 1.217.261 2.283 1.261 2.283 3.391 0 3.304-2.826 4.457-6.391 4.457h-6.913v-14zm2.13 5.348h3.913c1.37 0 2.13-.587 2.13-1.63 0-1.283-.913-1.696-2.391-1.696h-3.652v3.326zm0 6.63h4.413c1.5 0 2.5-.565 2.5-1.978 0-1.63-1.348-1.826-2.587-1.826h-4.326v3.804zm12.935-11.978h5v2h-5v-2z"/>
  </svg>
);

const AdobePortfolioIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12-12-5.373-12-12 5.373-12 12-12zm-3.5 6.5v11h2v-4h1c2.5 0 4-1.5 4-3.5s-1.5-3.5-4-3.5h-3zm2 2h1.5c1.1 0 1.5.8 1.5 1.5s-.4 1.5-1.5 1.5h-1.5v-3zm6.5 2v5h2v-5h.5c.3 0 .5-.2.5-.5s-.2-.5-.5-.5h-2.5zm1 2v-1h-1v1h1z"/>
  </svg>
);

export const Footer = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="bg-[#020202] text-white pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="mesh-container opacity-10 pointer-events-none">
        <div className="blob blob-magenta"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Column 1: Branding */}
          <div className="lg:col-span-4">
            <button onClick={() => setView('home')} className="group block mb-8">
              <Logo isDarkHero={true} />
            </button>
            <p className="text-slate-400 text-[15px] font-medium leading-relaxed max-w-sm mb-10">
              The managed intelligence partner for high-growth tech and enterprise firms. We synthesize elite talent with agentic AI to drive unfair advantages.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: LinkedinIcon, href: "https://www.linkedin.com/company/key-discovery-consulting-inc" },
                { icon: InstagramIcon, href: "https://www.instagram.com/kdci_outsourcing" },
                { icon: FacebookIcon, href: "https://www.facebook.com/kdci.official.page/" },
                { icon: TiktokIcon, href: "https://www.tiktok.com/@kdci_outsourcing" },
                { icon: YoutubeIcon, href: "https://www.youtube.com/@kdcioutsourcing" },
                { icon: BehanceIcon, href: "https://www.behance.net/kdcico" },
                { icon: AdobePortfolioIcon, href: "https://kdci.myportfolio.com/" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#E61739] hover:border-transparent transition-all shadow-sm"
                  aria-label="Social Link"
                >
                  <social.icon size={20} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Solutions */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E61739] mb-8">Solutions</h4>
            <ul className="space-y-4">
              {TOP_SERVICES.map(s => (
                <li key={s.id}>
                  <button 
                    onClick={() => setView(s.id as ViewType)} 
                    className="text-[13px] font-bold text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {s.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Industry Expertise */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E61739] mb-8">Verticals</h4>
            <ul className="space-y-4">
              {INDUSTRIES.slice(0, 6).map(ind => (
                <li key={ind.id}>
                  <button 
                    onClick={() => setView(ind.id as ViewType)} 
                    className="text-[13px] font-bold text-slate-400 hover:text-white transition-colors text-left"
                  >
                    {ind.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => setView('solutions-hub')} 
                  className="text-[13px] font-bold text-[#E61739] hover:underline flex items-center gap-1.5"
                >
                  View All Verticals <ChevronRight size={14} />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Location & Subscribe */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#E61739] mb-8">Global Operations</h4>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <MapPin size={16} className="text-slate-400" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">Philippines Office</div>
                  <p className="text-[12px] text-slate-500 font-medium">3008 One Corporate Centre, Julia Vargas Avenue, Ortigas Center, Pasig City 1605, Metro Manila, Philippines</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center shrink-0 mt-1">
                  <Globe2 size={16} className="text-slate-400" />
                </div>
                <div>
                  <div className="text-[13px] font-bold text-white">USA Office</div>
                  <p className="text-[12px] text-slate-500 font-medium">552 E Carson St. Suite 104, Carson, CA 90745, USA</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md">
              <h5 className="text-[11px] font-black uppercase tracking-widest mb-3 text-white">Scale Insights</h5>
              <p className="text-[11px] text-slate-400 mb-5 font-medium leading-relaxed">Join 5,000+ operations leaders receiving our weekly AGI playbook.</p>
              
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Work email" 
                  className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-xs w-full focus:outline-none focus:border-[#E61739]/50 transition-all font-bold placeholder:text-slate-600"
                />
                <button className="bg-[#E61739] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#c51431] transition-all shrink-0">
                  {subscribed ? 'Joined' : 'Join'}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <p className="text-[11px] text-slate-500 font-bold uppercase tracking-widest">© 2025 KDCI Operations LLC.</p>
            <div className="flex gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
              <button onClick={() => setView('privacy-policy')} className="hover:text-white transition-colors">Privacy Policy</button>
              <button onClick={() => setView('terms-and-conditions')} className="hover:text-white transition-colors">Terms of Service</button>
              <button className="hover:text-white transition-colors">Security Compliance</button>
            </div>
          </div>
          
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Status: Optimal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
