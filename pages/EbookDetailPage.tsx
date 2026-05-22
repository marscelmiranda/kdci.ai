
import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight, Download, ChevronLeft, FileText, BookOpen,
  Loader2, AlertCircle, Link as LinkIcon, CheckCircle2, X, Mail
} from 'lucide-react';
import { ViewType } from '../types';

// ── Inline breadcrumb (Resources / title) ──────────────────────────────────
const EbookBreadcrumb = ({
  setView,
  title,
}: {
  setView: (v: ViewType) => void;
  title: string;
}) => (
  <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/30 mb-8 justify-start">
    <button onClick={() => setView('home')} className="hover:text-white transition-colors">Home</button>
    <span className="opacity-50">/</span>
    <button onClick={() => setView('ebooks')} className="hover:text-white transition-colors">Resources</button>
    <span className="opacity-50">/</span>
    <span className="text-[#E61739] truncate max-w-[260px]">{title}</span>
  </nav>
);

// ── Types ──────────────────────────────────────────────────────────────────
interface Ebook {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  category: string;
  cover_image: string;
  download_url: string;
  page_count: number;
  tags: string | string[];
  status: string;
  published_at: string;
}

interface AccessForm {
  fullName: string;
  email: string;
  contactNumber: string;
  serviceInterests: string[];
  marketingConsent: boolean;
}

const SERVICE_LINES = [
  'AI Agent Monitoring',
  'AI Consulting & Implementation',
  'AI-Augmented Customer Experience',
  'AI Creative Studio',
  'AI Outbound & Lead Generation',
  'AI Workforce Augmentation',
];

const parseTags = (tags: string | string[]): string[] => {
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (!tags) return [];
  try {
    const p = JSON.parse(tags);
    if (Array.isArray(p)) return p;
  } catch {}
  return tags.split(',').map(t => t.trim()).filter(Boolean);
};

// ── Access Modal ──────────────────────────────────────────────────────────
const AccessModal = ({
  ebook,
  onClose,
}: {
  ebook: Ebook;
  onClose: () => void;
}) => {
  const [form, setForm] = useState<AccessForm>({
    fullName: '',
    email: '',
    contactNumber: '',
    serviceInterests: [],
    marketingConsent: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const firstInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstInputRef.current?.focus(), 80);
    return () => { document.body.style.overflow = ''; };
  }, []);

  const toggleService = (s: string) => {
    setForm(f => ({
      ...f,
      serviceInterests: f.serviceInterests.includes(s)
        ? f.serviceInterests.filter(x => x !== s)
        : [...f.serviceInterests, s],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.marketingConsent) {
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
          email: form.email,
          fullName: form.fullName,
          contactNumber: form.contactNumber,
          serviceInterests: form.serviceInterests,
          marketingConsent: form.marketingConsent,
          source: `ebook:${ebook.slug}`,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div className="relative w-full max-w-lg bg-[#0d0d0d] border border-white/10 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-3">
              Read the Report
            </div>
            <h2 className="text-xl font-black text-white leading-tight">Get instant access</h2>
            <p className="text-white/40 text-[13px] font-medium mt-1 line-clamp-1 max-w-[320px]">{ebook.title}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all shrink-0"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="px-8 py-8 max-h-[70vh] overflow-y-auto">
          {done ? (
            <div className="flex flex-col items-center justify-center text-center gap-5 py-6">
              <div className="w-16 h-16 rounded-2xl bg-[#E61739] flex items-center justify-center shadow-xl shadow-[#E61739]/30">
                <CheckCircle2 size={30} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-white">You're all set!</h3>
              <p className="text-white/50 text-sm font-medium max-w-xs leading-relaxed">
                {ebook.download_url
                  ? 'Click below to download your copy of the report.'
                  : 'Thank you! Our team will reach out with access details shortly.'}
              </p>
              {ebook.download_url ? (
                <a
                  href={ebook.download_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-xl shadow-[#E61739]/20"
                >
                  Download PDF <Download size={16} />
                </a>
              ) : (
                <button
                  onClick={onClose}
                  className="mt-2 px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-white/70 text-sm font-bold hover:bg-white/10 transition-all"
                >
                  Close
                </button>
              )}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Full Name */}
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">
                  Full Name <span className="text-[#E61739]">*</span>
                </label>
                <input
                  ref={firstInputRef}
                  required
                  type="text"
                  placeholder="Jane Smith"
                  value={form.fullName}
                  onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors font-medium"
                />
              </div>

              {/* Work Email */}
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">
                  Work Email <span className="text-[#E61739]">*</span>
                </label>
                <input
                  required
                  type="email"
                  placeholder="jane@company.com"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors font-medium"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">
                  Contact Number{' '}
                  <span className="text-white/25 font-medium normal-case tracking-normal text-[11px]">(optional)</span>
                </label>
                <input
                  type="tel"
                  placeholder="+1 555 000 0000"
                  value={form.contactNumber}
                  onChange={e => setForm(f => ({ ...f, contactNumber: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors font-medium"
                />
              </div>

              {/* Services of Interest */}
              <div>
                <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-3">
                  Services of Interest{' '}
                  <span className="text-white/25 font-medium normal-case tracking-normal text-[11px]">(select all that apply)</span>
                </label>
                <div className="space-y-2">
                  {SERVICE_LINES.map(svc => {
                    const checked = form.serviceInterests.includes(svc);
                    return (
                      <label
                        key={svc}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-all select-none ${
                          checked
                            ? 'bg-[#E61739]/10 border-[#E61739]/40 text-white'
                            : 'bg-white/[0.03] border-white/[0.08] text-white/50 hover:border-white/20 hover:text-white/70'
                        }`}
                      >
                        <span
                          className={`w-4 h-4 rounded-[5px] border-2 flex items-center justify-center shrink-0 transition-all ${
                            checked ? 'bg-[#E61739] border-[#E61739]' : 'border-white/20 bg-transparent'
                          }`}
                        >
                          {checked && (
                            <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                              <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={checked}
                          onChange={() => toggleService(svc)}
                        />
                        <span className="text-[13px] font-bold">{svc}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Marketing Consent */}
              <div className="pt-2 border-t border-white/[0.08]">
                <label className="flex items-start gap-3 cursor-pointer group select-none">
                  <span
                    className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all ${
                      form.marketingConsent ? 'bg-[#E61739] border-[#E61739]' : 'border-white/25 bg-transparent group-hover:border-white/40'
                    }`}
                  >
                    {form.marketingConsent && (
                      <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                        <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={form.marketingConsent}
                    onChange={e => setForm(f => ({ ...f, marketingConsent: e.target.checked }))}
                  />
                  <span className="text-[13px] text-white/50 font-medium leading-relaxed group-hover:text-white/70 transition-colors">
                    I agree to receive marketing emails from KDCI, including the Scale Insights newsletter, product updates, and promotions. I can unsubscribe at any time.
                  </span>
                </label>
              </div>

              {/* Error */}
              {error && (
                <p className="text-[#E61739] text-[13px] font-semibold bg-[#E61739]/10 border border-[#E61739]/20 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#E61739]/20 group"
              >
                {submitting ? (
                  <><Loader2 size={16} className="animate-spin" /> Submitting…</>
                ) : (
                  <>Read the Report <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>
                )}
              </button>
              <p className="text-white/20 text-[11px] text-center font-medium">
                No spam · Unsubscribe any time · GDPR compliant
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Page ──────────────────────────────────────────────────────────────
export const EbookDetailPage = ({
  setView,
  ebookId,
}: {
  setView: (v: ViewType) => void;
  ebookId: number | null;
}) => {
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [showAccessModal, setShowAccessModal] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!ebookId) { setError('Ebook not found.'); setLoading(false); return; }
    fetch('/api/ebooks')
      .then(r => r.json())
      .then((data: Ebook[]) => {
        const found = data.find(e => e.id === ebookId);
        if (!found) throw new Error('This ebook could not be found.');
        setEbook(found);
      })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [ebookId]);

  if (loading) return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="animate-spin text-[#E61739]" size={40} />
    </div>
  );

  if (error || !ebook) return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 px-6">
      <AlertCircle size={40} className="text-red-400" />
      <p className="text-slate-600 font-medium text-lg">{error || 'Ebook not found.'}</p>
      <button onClick={() => setView('ebooks')} className="flex items-center gap-2 text-[#E61739] font-bold hover:underline text-sm">
        <ChevronLeft size={15} /> Back to Resources
      </button>
    </div>
  );

  const tags = parseTags(ebook.tags);
  const pubYear = ebook.published_at ? new Date(ebook.published_at).getFullYear() : null;
  const pubMonth = ebook.published_at
    ? new Date(ebook.published_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {showAccessModal && ebook && (
        <AccessModal ebook={ebook} onClose={() => setShowAccessModal(false)} />
      )}

      <div className="min-h-screen bg-white">

        {/* ── HERO ── */}
        <section className="bg-[#020202] pt-32 pb-0 overflow-hidden">
          <div className="max-w-7xl mx-auto px-6">
            <EbookBreadcrumb setView={setView} title={ebook.title} />

            <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px] gap-12 xl:gap-20 mt-4 items-end">

              {/* Left column */}
              <div className="pb-16">
                {/* Category + tags */}
                <div className="flex flex-wrap items-center gap-2 mb-7">
                  {ebook.category && (
                    <span className="px-4 py-1.5 bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest rounded-full">
                      {ebook.category}
                    </span>
                  )}
                  {tags.slice(0, 3).map((tag, i) => (
                    <span key={i} className="px-4 py-1.5 bg-white/5 border border-white/10 text-white/40 text-[10px] font-black uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                <h1 className="text-4xl md:text-5xl xl:text-[3.25rem] font-heading font-bold text-white leading-[1.1] tracking-tight mb-6 max-w-2xl">
                  {ebook.title}
                </h1>

                <p className="text-white/60 text-lg font-medium leading-relaxed mb-10 max-w-xl">
                  {ebook.description}
                </p>

                {/* Author + meta */}
                <div className="flex items-center gap-6 mb-10 pb-10 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#E61739]/20 border border-[#E61739]/30 flex items-center justify-center text-[#E61739] font-bold text-sm shrink-0">
                      {(ebook.author || 'K')[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="text-white font-bold text-sm">{ebook.author || 'KDCI Research'}</div>
                      {pubMonth && <div className="text-white/40 text-xs mt-0.5">{pubMonth}</div>}
                    </div>
                  </div>
                  {ebook.page_count > 0 && (
                    <div className="flex items-center gap-2 text-white/40 text-sm border-l border-white/10 pl-6">
                      <FileText size={14} />
                      <span>{ebook.page_count} pages · PDF</span>
                    </div>
                  )}
                </div>

                {/* CTA buttons */}
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setShowAccessModal(true)}
                    className="px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-lg group"
                  >
                    Read the Report <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button
                    onClick={handleCopyLink}
                    className="px-8 py-4 bg-white/5 border border-white/10 text-white/70 rounded-2xl font-bold text-sm hover:bg-white/10 transition-all inline-flex items-center gap-2"
                  >
                    <LinkIcon size={15} /> {copied ? 'Copied!' : 'Share'}
                  </button>
                </div>
              </div>

              {/* Right column — Cover */}
              <div className="flex justify-center lg:justify-end items-end">
                {ebook.cover_image ? (
                  <div className="relative w-full max-w-[320px] rounded-t-[2rem] overflow-hidden shadow-2xl border border-white/10">
                    <img
                      src={ebook.cover_image}
                      alt={ebook.title}
                      className="w-full aspect-[3/4] object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#020202] to-transparent" />
                  </div>
                ) : (
                  <div className="w-full max-w-[320px] aspect-[3/4] rounded-t-[2rem] bg-gradient-to-br from-[#E61739]/10 via-white/5 to-transparent border border-white/10 flex items-center justify-center">
                    <BookOpen size={72} className="text-white/10" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR ── */}
        <div className="bg-[#111] border-b border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-wrap divide-x divide-white/5">
              {[
                { label: 'Format', value: 'PDF Download' },
                { label: 'Pages', value: ebook.page_count > 0 ? `${ebook.page_count} pages` : '—' },
                { label: 'Published', value: pubYear ? String(pubYear) : '—' },
                { label: 'Author', value: ebook.author || 'KDCI Research' },
                { label: 'Category', value: ebook.category || 'Research' },
              ].map((item, i) => (
                <div key={i} className="flex-1 min-w-[120px] px-6 py-5">
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">{item.label}</div>
                  <div className="text-white font-bold text-sm truncate">{item.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── BODY ── */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-3xl mx-auto">

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-10">
                {tags.map((tag, i) => (
                  <span key={i} className="px-4 py-2 bg-[#F5F5F7] text-slate-600 text-xs font-bold uppercase tracking-widest rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <h2 className="text-2xl font-heading font-bold text-slate-900 mb-5">About This Report</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">{ebook.description}</p>

            {/* Inline CTA */}
            <div className="mt-14 bg-[#F5F5F7] rounded-[2rem] p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex-grow">
                <h3 className="text-xl font-bold text-slate-900 mb-1">Ready to read?</h3>
                <p className="text-slate-500 text-sm">Fill in a quick form and get instant access.</p>
              </div>
              <button
                onClick={() => setShowAccessModal(true)}
                className="shrink-0 px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-lg"
              >
                Read the Report <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* ── BOTTOM NAV ── */}
        <section className="py-12 px-6 bg-[#F5F5F7] border-t border-slate-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={() => setView('ebooks')}
              className="flex items-center gap-2 text-slate-600 font-bold hover:text-[#E61739] transition-colors text-sm"
            >
              <ChevronLeft size={16} /> Back to Resources
            </button>
            <button
              onClick={() => setView('contact')}
              className="flex items-center gap-2 text-sm font-bold text-[#E61739] hover:underline"
            >
              Speak with an Advisor <ArrowRight size={14} />
            </button>
          </div>
        </section>

      </div>
    </>
  );
};
