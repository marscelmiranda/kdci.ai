
import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, MapPin, Globe2, X, CheckCircle2, Loader2, ArrowRight, Mail } from 'lucide-react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { TOP_SERVICES, INDUSTRIES } from '../data';
import { getPath } from '../lib/routes';

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


const SERVICE_LINES = [
  'AI Agent Operations',
  'AI Consulting and Strategy',
  'AI in Customer Service',

  'AI Staffing Solutions',
];

interface ModalForm {
  firstName: string;
  lastName: string;
  email: string;
  notes: string;
  marketingConsent: boolean;
}

export const Footer = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState<ModalForm>({
    firstName: '',
    lastName: '',
    company: '',
    contactNumber: '',
    serviceInterests: [],
    marketingConsent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 80);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showModal]);

  const openModal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(false);
    setError('');
    setModalForm({ firstName: '', lastName: '', email, notes: '', marketingConsent: false });
    setShowModal(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!modalForm.marketingConsent) {
      setError('Please confirm you agree to receive marketing emails to continue.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: modalForm.firstName,
          lastName: modalForm.lastName,
          email: modalForm.email || email,
          notes: modalForm.notes,
          marketingConsent: modalForm.marketingConsent,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Subscription failed.');
      setDone(true);
      setEmail('');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => { setShowModal(false); setDone(false); setError(''); };

  return (
    <>
    <footer className="bg-[#020202] text-white pt-24 pb-12 px-6 border-t border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="mesh-container opacity-10 pointer-events-none">
        <div className="blob blob-magenta"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Column 1: Branding */}
          <div className="lg:col-span-4">
            <a href="/" onClick={e => { e.preventDefault(); setView('home'); }} className="group block mb-8">
              <Logo isDarkHero={true} />
            </a>
            <p className="text-slate-400 text-[15px] font-medium leading-relaxed max-w-sm mb-10">
              The managed intelligence partner for high-growth tech and enterprise firms. We synthesize elite talent with agentic AI to drive unfair advantages.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: LinkedinIcon, href: "https://www.linkedin.com/company/kdciai" },
                { icon: InstagramIcon, href: "https://www.instagram.com/kdciai/" },
                { icon: FacebookIcon, href: "https://www.facebook.com/kdciai/" },
                { icon: TiktokIcon, href: "https://www.tiktok.com/@kdci_outsourcing" },
                { icon: YoutubeIcon, href: "https://www.youtube.com/@kdci_ai" },
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#ad1457] hover:border-transparent transition-all shadow-sm"
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
                  <a
                    href={getPath(s.id as ViewType)}
                    onClick={e => { e.preventDefault(); setView(s.id as ViewType); }}
                    className="text-[13px] font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    {s.name}
                  </a>
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
                  <a
                    href={getPath(ind.id as ViewType)}
                    onClick={e => { e.preventDefault(); setView(ind.id as ViewType); }}
                    className="text-[13px] font-bold text-slate-400 hover:text-white transition-colors"
                  >
                    {ind.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/solutions/"
                  onClick={e => { e.preventDefault(); setView('solutions-hub'); }}
                  className="text-[13px] font-bold text-[#E61739] hover:underline flex items-center gap-1.5"
                >
                  View All Verticals <ChevronRight size={14} />
                </a>
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
              <form onSubmit={openModal} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Work email"
                  className="bg-[#0a0a0a] border border-white/10 rounded-xl px-4 py-2 text-xs w-full focus:outline-none focus:border-[#E61739]/50 transition-all font-bold placeholder:text-slate-600"
                />
                <button type="submit" className="bg-[#ad1457] text-white px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-[#8e1049] transition-all shrink-0">
                  Join
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
              <a href="/privacy-policy/" onClick={e => { e.preventDefault(); setView('privacy-policy'); }} className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="/terms-and-conditions/" onClick={e => { e.preventDefault(); setView('terms-and-conditions'); }} className="hover:text-white transition-colors">Terms of Service</a>
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

      {/* ── SUBSCRIBE MODAL ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ animation: 'fadeInUp 0.25s ease both' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          {/* Card */}
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-3">
                  Scale Insights
                </div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">Complete your signup</h2>
                <p className="text-slate-400 text-[13px] font-medium mt-1 flex items-center gap-1.5">
                  <Mail size={12} className="shrink-0" />
                  <span className="truncate">{email}</span>
                </p>
              </div>
              <button
                onClick={closeModal}
                className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shrink-0 ml-4"
                aria-label="Close"
              >
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8 max-h-[70vh] overflow-y-auto bg-slate-50/60">
              {done ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-10">
                  <div className="w-16 h-16 rounded-2xl bg-[#ad1457] flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">You're in!</h3>
                  <p className="text-slate-500 text-sm font-medium max-w-xs leading-relaxed">
                    Welcome to Scale Insights. Your first AGI playbook lands in your inbox this week.
                  </p>
                  <button
                    onClick={closeModal}
                    className="mt-2 px-8 py-3 bg-slate-100 rounded-2xl text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleModalSubmit} className="space-y-5">

                  {/* Name Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        ref={firstInputRef}
                        required
                        type="text"
                        placeholder="First Name *"
                        value={modalForm.firstName}
                        onChange={e => setModalForm(f => ({ ...f, firstName: e.target.value }))}
                        className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm font-medium"
                      />
                    </div>
                    <div>
                      <input
                        required
                        type="text"
                        placeholder="Last Name *"
                        value={modalForm.lastName}
                        onChange={e => setModalForm(f => ({ ...f, lastName: e.target.value }))}
                        className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm font-medium"
                      />
                    </div>
                  </div>

                  {/* Work Email (pre-filled, editable) */}
                  <div>
                    <input
                      required
                      type="email"
                      placeholder="Work Email *"
                      value={modalForm.email}
                      onChange={e => setModalForm(f => ({ ...f, email: e.target.value }))}
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm font-medium"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <textarea
                      rows={3}
                      placeholder="How can we help you?"
                      value={modalForm.notes}
                      onChange={e => setModalForm(f => ({ ...f, notes: e.target.value }))}
                      className="w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm font-medium resize-none"
                    />
                  </div>

                  {/* Marketing Consent */}
                  <div className="pt-2 border-t border-slate-100">
                    <label className="flex items-start gap-3 cursor-pointer group select-none">
                      <span
                        className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                          modalForm.marketingConsent ? 'bg-[#ad1457] border-[#E61739]' : 'border-slate-300 bg-transparent group-hover:border-slate-400'
                        }`}
                      >
                        {modalForm.marketingConsent && (
                          <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                            <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </span>
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={modalForm.marketingConsent}
                        onChange={e => setModalForm(f => ({ ...f, marketingConsent: e.target.checked }))}
                      />
                      <span className="text-[13px] text-slate-500 font-medium leading-relaxed group-hover:text-slate-700 transition-colors">
                        I agree to receive marketing emails from KDCI, including the Scale Insights newsletter, product updates, and promotions. I can unsubscribe at any time.{' '}
                        <button type="button" onClick={closeModal} className="text-[#E61739] hover:underline font-semibold" tabIndex={-1}>
                          Privacy Policy
                        </button>
                      </span>
                    </label>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-red-500 text-[13px] font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                      {error}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#ad1457] text-white rounded-2xl font-bold text-sm hover:bg-[#8e1049] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#E61739]/20 group"
                  >
                    {submitting ? (
                      <><Loader2 size={16} className="animate-spin" /> Subscribing…</>
                    ) : (
                      <>Subscribe <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>
                    )}
                  </button>
                  <p className="text-slate-400 text-[11px] text-center font-medium">
                    No spam · Unsubscribe any time · GDPR compliant
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
