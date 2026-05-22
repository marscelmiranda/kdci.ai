
import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Download, ChevronLeft, FileText, BookOpen,
  Loader2, AlertCircle, Link as LinkIcon
} from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

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

const parseTags = (tags: string | string[]): string[] => {
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (!tags) return [];
  try {
    const p = JSON.parse(tags);
    if (Array.isArray(p)) return p;
  } catch {}
  return tags.split(',').map(t => t.trim()).filter(Boolean);
};

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
        <ChevronLeft size={15} /> Back to Ebooks
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
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="bg-[#020202] pt-32 pb-0 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <Breadcrumbs
            setView={setView}
            currentName={ebook.title}
            parent={{ name: 'Ebooks & Whitepapers', view: 'ebooks' }}
            align="left"
          />

          <div className="grid lg:grid-cols-[1fr_360px] xl:grid-cols-[1fr_420px] gap-12 xl:gap-20 mt-10 items-end">

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
                {ebook.download_url ? (
                  <a
                    href={ebook.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-lg group"
                  >
                    Download PDF <Download size={16} className="group-hover:translate-y-0.5 transition-transform" />
                  </a>
                ) : (
                  <button
                    onClick={() => setView('contact')}
                    className="px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-lg group"
                  >
                    Request Access <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                )}
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

          {/* Tags */}
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

          {/* Inline download CTA */}
          <div className="mt-14 bg-[#F5F5F7] rounded-[2rem] p-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-1">Ready to read?</h3>
              <p className="text-slate-500 text-sm">Download the full report as a PDF — free.</p>
            </div>
            {ebook.download_url ? (
              <a
                href={ebook.download_url}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-lg"
              >
                Download Now <Download size={16} />
              </a>
            ) : (
              <button
                onClick={() => setView('contact')}
                className="shrink-0 px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all inline-flex items-center gap-2 shadow-lg"
              >
                Request Access <ArrowRight size={16} />
              </button>
            )}
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
            <ChevronLeft size={16} /> Back to Ebooks & Whitepapers
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
  );
};
