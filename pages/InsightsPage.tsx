
import React, { useState, useEffect } from 'react';
import { ArrowRight, MessageSquare, TrendingUp, FileText, BookOpen, Video, CircleHelp, FileJson, BrainCircuit, Loader2 } from 'lucide-react';
import { useAuthorAvatars, getAvatarUrl } from '../hooks/useAuthorAvatars';
import { AuthorAvatar } from '../components/AuthorAvatar';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

interface LiveCard {
  id: string | number;
  slug?: string;
  title: string;
  excerpt: string;
  image?: string;
  date?: string;
  byline?: string;
  category?: string;
}

const STATIC_SECTIONS = [
  {
    id: 'guides',
    label: 'Guides & Playbooks',
    tag: 'How-to Content',
    view: 'guides' as ViewType,
    icon: BookOpen,
    desc: 'Operational blueprints and tactical playbooks for scaling your AI-managed intelligence layer. From onboarding checklists to advanced agentic workflow templates.',
    heroImage: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200&h=500',
  },
  {
    id: 'webinars',
    label: 'Webinars & Events',
    tag: 'Live Sessions',
    view: 'webinars' as ViewType,
    icon: Video,
    desc: 'Expert-led discussions on the future of AGI, managed operations, and global talent strategy. Catch live sessions or watch recordings on demand.',
    heroImage: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=1200&h=500',
  },
  {
    id: 'faqs',
    label: 'FAQs',
    tag: 'Help Center',
    view: 'faqs' as ViewType,
    icon: CircleHelp,
    desc: 'Quick, accurate answers to the most common questions about AI managed services, outsourcing models, pricing, compliance, and onboarding.',
    heroImage: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=1200&h=500',
  },
  {
    id: 'glossary',
    label: 'Glossary',
    tag: 'Terms & Concepts',
    view: 'glossary' as ViewType,
    icon: FileJson,
    desc: "The definitive reference for AI, outsourcing, and agentic operations terminology. Whether you're new to managed services or deep in AI strategy, this is your guide.",
    heroImage: 'https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&q=80&w=1200&h=500',
  },
];

const FALLBACK = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=420',
  'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=420',
  'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=420',
];

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '';

export const InsightsPage = ({
  setView,
  onNavigateToContent,
}: {
  setView: (v: ViewType) => void;
  onNavigateToContent?: (type: 'blog' | 'case-study' | 'ebook', slug: string) => void;
}) => {
  const [blogs, setBlogs]   = useState<LiveCard[]>([]);
  const [cases, setCases]   = useState<LiveCard[]>([]);
  const [ebooks, setEbooks] = useState<LiveCard[]>([]);
  const [loading, setLoading] = useState(true);
  const avatarMap = useAuthorAvatars();

  useEffect(() => {
    Promise.all([
      fetch('/api/blog').then(r => r.ok ? r.json() : []),
      fetch('/api/cases').then(r => r.ok ? r.json() : []),
      fetch('/api/ebooks').then(r => r.ok ? r.json() : []),
    ]).then(([b, c, e]) => {
      setBlogs(
        b.filter((p: any) => p.status === 'published').slice(0, 3).map((p: any, i: number) => ({
          id: p.id, slug: p.slug, title: p.title,
          excerpt: p.excerpt || '',
          image: p.cover_image || FALLBACK[i % FALLBACK.length],
          date: fmtDate(p.published_at),
          byline: p.author || 'KDCI Editorial',
          category: p.category || 'AI Operations',
        }))
      );
      setCases(
        c.filter((p: any) => p.status === 'published').slice(0, 3).map((p: any, i: number) => ({
          id: p.id, slug: p.slug, title: p.title,
          excerpt: p.excerpt || p.challenge || '',
          image: p.hero_image || FALLBACK[i % FALLBACK.length],
          date: fmtDate(p.published_at),
          byline: p.client || '',
          category: p.industry || 'Case Study',
        }))
      );
      setEbooks(
        e.filter((p: any) => p.status === 'published').slice(0, 3).map((p: any, i: number) => ({
          id: p.id, slug: p.slug, title: p.title,
          excerpt: p.excerpt || p.description || '',
          image: p.cover_image || FALLBACK[i % FALLBACK.length],
          date: fmtDate(p.published_at),
          byline: p.author || 'KDCI Research',
          category: p.category || 'Ebook',
        }))
      );
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const renderCard = (
    item: LiveCard,
    idx: number,
    type: 'blog' | 'case-study' | 'ebook',
    pillLabel: string,
    pillClass: string,
  ) => {
    const handleClick = () => {
      if (!item.slug || !onNavigateToContent) {
        setView(type === 'blog' ? 'blog' : type === 'case-study' ? 'case-studies' : 'ebooks');
        return;
      }
      onNavigateToContent(type, item.slug);
    };
    return (
      <div
        key={item.id}
        onClick={handleClick}
        className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-black/[0.04] hover:shadow-2xl transition-all duration-500 cursor-pointer"
      >
        <div className="relative h-44 overflow-hidden shrink-0">
          <img loading="lazy"
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            onError={e => { (e.target as HTMLImageElement).src = FALLBACK[idx % FALLBACK.length]; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
          <div className="absolute top-3 left-3">
            <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${pillClass}`}>
              {pillLabel}
            </span>
          </div>
          {item.category && (
            <div className="absolute bottom-3 right-3">
              <span className="px-2 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-white/80 border border-white/20">
                {item.category}
              </span>
            </div>
          )}
        </div>
        <div className="p-7 flex flex-col flex-1">
          {(item.byline || item.date) && (
            <div className="flex items-center gap-2 mb-3">
              {item.byline && (
                <AuthorAvatar
                  name={item.byline}
                  avatarUrl={getAvatarUrl(avatarMap, item.byline)}
                  size={24}
                  theme="light"
                />
              )}
              {item.byline && <span className="font-bold text-slate-500 text-xs">{item.byline}</span>}
              {item.byline && item.date && <span className="text-slate-300">·</span>}
              {item.date && <span className="text-xs text-slate-400">{item.date}</span>}
            </div>
          )}
          <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors line-clamp-2">
            {item.title}
          </h3>
          {item.excerpt && (
            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-5 flex-grow line-clamp-3">
              {item.excerpt}
            </p>
          )}
          <div className="mt-auto pt-4 border-t border-black/5 flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#E61739]">Read More</span>
            <ArrowRight size={14} className="text-slate-300 group-hover:text-[#E61739] group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-30" />
          <div className="blob blob-magenta opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Insights Hub" />
          <div className="mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
              <BrainCircuit size={12} className="text-[#E61739]" />
              Knowledge Center
            </div>
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-5">
              Insights &amp;{' '}
              <span className="text-[#E61739]">Resources</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Everything you need to lead AI-managed operations — articles, playbooks, case studies, webinars, and expert references, all in one place.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-10">
            {([
              { label: 'Blog', view: 'blog' },
              { label: 'Case Studies', view: 'case-studies' },
              { label: 'Ebooks', view: 'ebooks' },
              { label: 'Guides', view: 'guides' },
              { label: 'Webinars', view: 'webinars' },
              { label: 'FAQs', view: 'faqs' },
              { label: 'Glossary', view: 'glossary' },
            ] as { label: string; view: ViewType }[]).map(({ label, view }) => (
              <button
                key={view}
                onClick={() => setView(view)}
                className="px-5 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#E61739] hover:text-[#E61739] text-white/60 font-bold text-sm transition-all"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── BLOG ── */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <MessageSquare size={12} /> Latest Articles
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1D1D1F]">Blog</h2>
              <p className="text-[#86868b] text-base font-medium mt-2 max-w-xl">
                Insights on AI, managed operations, and global talent strategy from the KDCI team.
              </p>
            </div>
            <button
              onClick={() => setView('blog')}
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all"
            >
              Explore All Articles <ArrowRight size={14} />
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={32} className="animate-spin text-[#E61739]/40" /></div>
          ) : blogs.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((item, i) => renderCard(item, i, 'blog', 'Blog', 'bg-[#E61739]/90 text-white border-transparent backdrop-blur-sm'))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 font-medium">No published articles yet — check back soon.</div>
          )}
        </div>
      </section>

      {/* ── CASE STUDIES ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <TrendingUp size={12} /> Client Success
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1D1D1F]">Case Studies</h2>
              <p className="text-[#86868b] text-base font-medium mt-2 max-w-xl">
                Real outcomes from enterprise AI and outsourcing engagements across 20+ industry verticals.
              </p>
            </div>
            <button
              onClick={() => setView('case-studies')}
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-all"
            >
              Explore All Case Studies <ArrowRight size={14} />
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={32} className="animate-spin text-blue-400/40" /></div>
          ) : cases.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {cases.map((item, i) => renderCard(item, i, 'case-study', 'Case Study', 'bg-blue-600/90 text-white border-transparent backdrop-blur-sm'))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 font-medium">No published case studies yet — check back soon.</div>
          )}
        </div>
      </section>

      {/* ── EBOOKS ── */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <div className="text-purple-600 text-[10px] font-black uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                <FileText size={12} /> Deep Dives
              </div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1D1D1F]">Ebooks & Whitepapers</h2>
              <p className="text-[#86868b] text-base font-medium mt-2 max-w-xl">
                Comprehensive research, tactical frameworks, and strategy documents for AI-forward businesses.
              </p>
            </div>
            <button
              onClick={() => setView('ebooks')}
              className="shrink-0 flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-purple-600 transition-all"
            >
              Explore All Ebooks <ArrowRight size={14} />
            </button>
          </div>
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 size={32} className="animate-spin text-purple-400/40" /></div>
          ) : ebooks.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ebooks.map((item, i) => renderCard(item, i, 'ebook', 'Ebook', 'bg-purple-600/90 text-white border-transparent backdrop-blur-sm'))}
            </div>
          ) : (
            <div className="text-center py-16 text-slate-400 font-medium">No published ebooks yet — check back soon.</div>
          )}
        </div>
      </section>

      {/* ── STATIC SECTIONS — 2-col grid ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-3">More Resources</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-[#1D1D1F]">Everything Else You Need</h2>
            <p className="text-[#86868b] text-base font-medium mt-2 max-w-xl mx-auto">
              From live sessions to quick-reference guides — your complete KDCI knowledge base.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {STATIC_SECTIONS.map((sec) => {
              const Icon = sec.icon;
              return (
                <div
                  key={sec.id}
                  className="group rounded-[2.5rem] overflow-hidden border border-black/[0.04] bg-[#F5F5F7] hover:shadow-xl transition-all duration-500 flex flex-col"
                >
                  <div className="relative h-48 overflow-hidden shrink-0">
                    <img loading="lazy"
                      src={sec.heroImage}
                      alt={sec.label}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-5 flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white shrink-0">
                        <Icon size={16} />
                      </div>
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-white/60 block">{sec.tag}</span>
                        <span className="text-base font-bold text-white leading-tight">{sec.label}</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-7 flex flex-col flex-grow">
                    <p className="text-[#86868b] text-sm font-medium leading-relaxed flex-grow mb-6">{sec.desc}</p>
                    <button
                      onClick={() => setView(sec.view)}
                      className="w-full py-3.5 bg-[#1D1D1F] text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn"
                    >
                      Explore {sec.label} <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── BOTTOM CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5">
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-purple opacity-30" />
            <div className="blob blob-magenta opacity-30" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
            <div className="flex-1 px-12 py-[58px] md:px-20 md:py-[68px] flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
                Ready to put these<br /><span className="text-shine-red">insights to work?</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 mb-10 font-medium leading-relaxed max-w-lg">
                Our solutions architects can map these strategies directly to your business and build a custom operational model.
              </p>
              <div>
                <button
                  onClick={() => setView('contact')}
                  className="px-10 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl inline-flex items-center gap-3 group/cta"
                >
                  Talk to an Architect <ArrowRight size={20} className="group-hover/cta:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="lg:w-[777px] shrink-0 relative min-h-[260px]">
              <img loading="lazy"
                src="/kdci-challenge.webp"
                alt="KDCI solutions architect consultation"
                className="absolute inset-0 w-full h-full object-cover"
                style={{ objectPosition: '0% top' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
