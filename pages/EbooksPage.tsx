
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, X, Plus, ChevronDown, Loader2, AlertCircle, Search } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

interface ApiEbook {
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

const CATEGORIES = ['All', 'Technology', 'Financial Services', 'Healthcare', 'Marketing', 'Retail', 'Logistics', 'Professional Services', 'Other'];

export const EbooksPage = ({
  setView,
  onSelectEbook,
}: {
  setView: (v: ViewType) => void;
  onSelectEbook?: (id: number) => void;
}) => {
  const [ebooks, setEbooks] = useState<ApiEbook[]>([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState('All');
  const [openPanel, setOpenPanel] = useState<'category' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/ebooks')
      .then(r => r.json())
      .then((data: ApiEbook[]) => setEbooks(Array.isArray(data) ? data : []))
      .catch(e => setFetchError(e.message))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = ebooks.filter(e => {
    const cat = activeCategory === 'All' || e.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const search = q === '' || e.title.toLowerCase().includes(q) || (e.description || '').toLowerCase().includes(q);
    return cat && search;
  });

  const categoryActive = activeCategory !== 'All';
  const categoryLabel = activeCategory === 'All' ? 'Category' : activeCategory;

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-30" />
          <div className="blob blob-magenta opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Ebooks & Whitepapers" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Strategic</span>{' '}
              <span className="text-[#E61739]">Deep Dives.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Comprehensive research, data-driven reports, and strategic frameworks for the modern executive.
            </p>
            <div className="relative max-w-lg mx-auto mt-8">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search ebooks, reports, or topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-sm font-medium text-white focus:ring-2 focus:ring-[#E61739]/40 focus:bg-white/15 focus:border-[#E61739]/60 transition-all placeholder:text-white/40 outline-none backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div ref={filterRef} className="relative z-30 bg-white border-y border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex divide-x divide-slate-200">
          <button
            onClick={() => setOpenPanel(openPanel === 'category' ? null : 'category')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'category' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {categoryActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveCategory('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />}
            <span className={`text-sm font-bold uppercase tracking-widest ${categoryActive ? 'text-slate-900' : 'text-slate-500'}`}>{categoryLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'category' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
        </div>
        {openPanel === 'category' && (
          <div className="absolute left-0 right-0 bg-white border-t border-slate-200 shadow-xl px-8 py-6 z-50">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Filter by Category</p>
            <div className="flex flex-wrap gap-3">
              {CATEGORIES.map(opt => {
                const isActive = activeCategory === opt;
                return (
                  <button key={opt} onClick={() => { setActiveCategory(opt); setOpenPanel(null); }}
                    className={`px-5 py-2.5 text-sm font-bold uppercase tracking-widest border transition-all rounded-sm ${isActive ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900'}`}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── CARDS GRID ── */}
      <section className="py-14 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          {loading ? (
            <div className="flex items-center justify-center py-32">
              <Loader2 className="animate-spin text-[#E61739]" size={40} />
            </div>
          ) : fetchError ? (
            <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-400">
              <AlertCircle size={40} />
              <p className="font-medium">{fetchError}</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400 font-medium text-lg">
              {ebooks.length === 0 ? 'No ebooks published yet. Check back soon.' : 'No ebooks match the selected filters.'}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(ebook => {
                const tags = parseTags(ebook.tags);
                return (
                  <div
                    key={ebook.id}
                    onClick={() => onSelectEbook ? onSelectEbook(ebook.id) : setView('contact')}
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-black/[0.04] hover:shadow-2xl transition-all duration-500 cursor-pointer"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-52 overflow-hidden shrink-0 bg-[#F5F5F7]">
                      {ebook.cover_image ? (
                        <img src={ebook.cover_image} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200">
                          <span className="text-4xl font-heading font-black text-slate-300 tracking-tight px-6 text-center leading-tight line-clamp-3">{ebook.title}</span>
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      {ebook.category && (
                        <div className="absolute bottom-3 left-4">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{ebook.category}</span>
                        </div>
                      )}
                      {ebook.page_count > 0 && (
                        <div className="absolute top-3 right-3">
                          <span className="px-3 py-1 bg-[#E61739]/80 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                            PDF · {ebook.page_count} pp
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-slate-500 text-xs">{ebook.author || 'KDCI Research'}</span>
                        {ebook.published_at && (
                          <>
                            <span className="text-slate-300">·</span>
                            <span className="text-xs text-slate-400">{new Date(ebook.published_at).getFullYear()}</span>
                          </>
                        )}
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors">{ebook.title}</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow line-clamp-3">{ebook.description}</p>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6 pt-5 border-t border-black/5">
                          {tags.slice(0, 3).map((tag, i) => (
                            <span key={i} className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">{tag}</span>
                          ))}
                        </div>
                      )}
                      <button className="mt-auto w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn">
                        {ebook.download_url ? 'Download PDF' : 'View Report'}
                        <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 group">
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-purple opacity-30" />
            <div className="blob blob-magenta opacity-30" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
            <div className="flex-1 px-12 py-[58px] md:px-20 md:py-[68px] flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
                Have a similar<br /><span className="text-shine-red">challenge?</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 mb-10 font-medium leading-relaxed max-w-lg">
                Our solutions architects can design a custom operational model for your specific needs.
              </p>
              <div>
                <button onClick={() => setView('contact')}
                  className="px-10 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl inline-flex items-center gap-3 group/cta">
                  Consult an Architect <ArrowRight size={20} className="group-hover/cta:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="lg:w-[777px] shrink-0 relative min-h-[260px]">
              <img src="/kdci-challenge.png" alt="KDCI Solutions Architect" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '0% top' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
