
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, Plus, ChevronDown, FileText, BrainCircuit, Globe, Terminal, Loader2 } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

interface BlogCard {
  id: number | string;
  title: string;
  excerpt: string;
  industry: string;
  source: string;
  contentType: 'Blog';
  tags: string[];
  metrics: { label: string; value: string }[];
  icon: React.ElementType;
  thumb: string;
  isLive?: boolean;
}

const FALLBACK_THUMBS = [
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=420",
  "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=420",
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=420",
  "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800&h=420",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=420",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=420",
];

const STATIC_CARDS: BlogCard[] = [
  {
    id: 's1', icon: Terminal, industry: "Technology", source: "Sarah Chen", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=420",
    title: "Why the Philippines is the New Epicenter for AI Engineering",
    excerpt: "Unpacking the talent shift as Manila transforms from a support hub into a global node for agentic AI development.",
    tags: ["Software Dev", "AI Ops"],
    metrics: [{ label: "Read Time", value: "6 min" }, { label: "Published", value: "Oct 2024" }, { label: "Category", value: "Engineering" }]
  },
  {
    id: 's2', icon: FileText, industry: "Financial Services", source: "Michael Ross", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800&h=420",
    title: "Scaling to 500+ Agents: A Case Study in Fintech Support",
    excerpt: "How a high-growth fintech reduced OpEx by 65% while improving CSAT using managed offshore intelligence.",
    tags: ["Customer Support", "Fintech"],
    metrics: [{ label: "Read Time", value: "8 min" }, { label: "Published", value: "Sep 2024" }, { label: "Category", value: "Case Studies" }]
  },
  {
    id: 's3', icon: BrainCircuit, industry: "Technology", source: "Devin Zhao", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?auto=format&fit=crop&q=80&w=800&h=420",
    title: "Prompt Engineering vs. Software Engineering: The Merging Path",
    excerpt: "Why the developers of 2025 will spend as much time talking to code as they do writing it.",
    tags: ["Software Dev", "AI Ops"],
    metrics: [{ label: "Read Time", value: "5 min" }, { label: "Published", value: "Sep 2024" }, { label: "Category", value: "AI Operations" }]
  },
  {
    id: 's4', icon: BrainCircuit, industry: "Technology", source: "Sarah Chen", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800&h=420",
    title: "The Future of CX: Moving Beyond Ticketing to Real-time Agency",
    excerpt: "Traditional support is dead. Agentic AI is allowing pods to resolve issues before the user even knows they exist.",
    tags: ["Customer Support", "AI Ops"],
    metrics: [{ label: "Read Time", value: "7 min" }, { label: "Published", value: "Aug 2024" }, { label: "Category", value: "AI Operations" }]
  },
  {
    id: 's5', icon: Globe, industry: "Logistics", source: "Marcus Jordon", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=420",
    title: "How Global Logistics Firms are Scaling with Managed Pods",
    excerpt: "Exploring the operational blueprint for managing high-volume data and tracking across multiple timezones.",
    tags: ["Data Entry", "Operations"],
    metrics: [{ label: "Read Time", value: "10 min" }, { label: "Published", value: "Aug 2024" }, { label: "Category", value: "Case Studies" }]
  },
  {
    id: 's6', icon: Globe, industry: "Professional Services", source: "Sarah Chen", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=420",
    title: "Building the Modern Offshore Strategy for Mid-Market Firms",
    excerpt: "You don't need enterprise budgets to build enterprise-scale teams. A tactical guide to intelligent scaling.",
    tags: ["Staff Aug", "Operations"],
    metrics: [{ label: "Read Time", value: "9 min" }, { label: "Published", value: "Jul 2024" }, { label: "Category", value: "Future of Work" }]
  },
  {
    id: 's7', icon: Terminal, industry: "Technology", source: "Michael Ross", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800&h=420",
    title: "Cybersecurity in the AGI Era: Vetting Your Offshore Partner",
    excerpt: "Why SOC-2 compliance and industrial-grade security are the new baseline for global talent partners.",
    tags: ["Software Dev", "Operations"],
    metrics: [{ label: "Read Time", value: "6 min" }, { label: "Published", value: "Jul 2024" }, { label: "Category", value: "Engineering" }]
  },
  {
    id: 's8', icon: BrainCircuit, industry: "Real Estate", source: "Devin Zhao", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=800&h=420",
    title: "PropTech Revolution: AI-Managed Leasing Desks in Manila",
    excerpt: "How real estate giants are using specialized offshore teams to handle the entire tenant lifecycle.",
    tags: ["Back Office", "AI Ops"],
    metrics: [{ label: "Read Time", value: "5 min" }, { label: "Published", value: "Jun 2024" }, { label: "Category", value: "AI Operations" }]
  },
  {
    id: 's9', icon: FileText, industry: "Professional Services", source: "Marcus Jordon", contentType: "Blog",
    thumb: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=420",
    title: "Measuring ROI in AI-Augmented Operations: The Hard Truth",
    excerpt: "Moving beyond 'headcount cost' to 'outcome velocity'. How to build a modern ROI model for your team.",
    tags: ["Operations", "Staff Aug"],
    metrics: [{ label: "Read Time", value: "12 min" }, { label: "Published", value: "Jun 2024" }, { label: "Category", value: "Future of Work" }]
  },
];

const INDUSTRIES    = ['All', 'Financial Services', 'Logistics', 'Technology', 'Retail', 'Real Estate', 'Healthcare', 'Professional Services'];
const SERVICES      = ['All', 'Customer Support', 'Data Entry', 'Software Dev', 'Staff Aug', 'Back Office', 'AI Ops', 'Operations'];
const CONTENT_TYPES = ['All', 'Blog', 'Case Study', 'Guide & Playbooks', 'Webinar', 'Ebook', 'FAQ', 'Glossary'];

export const BlogLandingPage = ({ setView, onSelectBlog }: { setView: (v: ViewType) => void; onSelectBlog?: (id: number | null) => void }) => {
  const [activeIndustry, setActiveIndustry]       = useState('All');
  const [activeService, setActiveService]         = useState('All');
  const [activeContentType, setActiveContentType] = useState('Blog');
  const [openPanel, setOpenPanel] = useState<'industry' | 'service' | 'content' | null>(null);
  const [livePosts, setLivePosts] = useState<BlogCard[]>([]);
  const [loading, setLoading]     = useState(true);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        setLivePosts(data.map((p, i) => ({
          id: p.id,
          title: p.title,
          excerpt: p.excerpt || '',
          industry: 'Technology',
          source: p.author || 'KDCI Editorial',
          contentType: 'Blog' as const,
          tags: ['AI Ops', 'Operations'],
          icon: BrainCircuit,
          thumb: FALLBACK_THUMBS[i % FALLBACK_THUMBS.length],
          isLive: true,
          metrics: [
            { label: "Read Time", value: "5 min" },
            { label: "Published", value: p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Recent' },
            { label: "Category", value: p.category || 'AI Operations' },
          ],
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allCards = [...livePosts, ...STATIC_CARDS];

  const filtered = allCards.filter(c => {
    const industryOk    = activeIndustry    === 'All' || c.industry    === activeIndustry;
    const serviceOk     = activeService     === 'All' || c.tags.includes(activeService);
    const contentTypeOk = activeContentType === 'All' || c.contentType === activeContentType;
    return industryOk && serviceOk && contentTypeOk;
  });

  const industryLabel    = activeIndustry    === 'All' ? 'Industry'     : activeIndustry;
  const serviceLabel     = activeService     === 'All' ? 'Service'      : activeService;
  const contentTypeLabel = activeContentType === 'All' ? 'Content Type' : activeContentType;
  const industryActive    = activeIndustry    !== 'All';
  const serviceActive     = activeService     !== 'All';
  const contentTypeActive = activeContentType !== 'All';

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
          <Breadcrumbs setView={setView} currentName="Insights Hub" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Operational</span>{' '}
              <span className="text-[#E61739]">Intelligence.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Strategic insights on AGI-ready operations, global talent strategy, and high-velocity business outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div ref={filterRef} className="relative z-30 bg-white border-y border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto flex divide-x divide-slate-200">
          <button onClick={() => setOpenPanel(openPanel === 'industry' ? null : 'industry')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'industry' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            {industryActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveIndustry('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />}
            <span className={`text-sm font-bold uppercase tracking-widest ${industryActive ? 'text-slate-900' : 'text-slate-500'}`}>{industryLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'industry' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
          <button onClick={() => setOpenPanel(openPanel === 'service' ? null : 'service')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'service' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            {serviceActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveService('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />}
            <span className={`text-sm font-bold uppercase tracking-widest ${serviceActive ? 'text-slate-900' : 'text-slate-500'}`}>{serviceLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'service' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
          <button onClick={() => setOpenPanel(openPanel === 'content' ? null : 'content')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'content' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            {contentTypeActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveContentType('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />}
            <span className={`text-sm font-bold uppercase tracking-widest ${contentTypeActive ? 'text-slate-900' : 'text-slate-500'}`}>{contentTypeLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'content' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
        </div>
        {openPanel && (
          <div className="absolute left-0 right-0 bg-white border-t border-slate-200 shadow-xl px-8 py-6 z-50">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              {openPanel === 'industry' ? 'Filter by Industry' : openPanel === 'service' ? 'Filter by Service' : 'Filter by Content Type'}
            </p>
            <div className="flex flex-wrap gap-3">
              {(openPanel === 'industry' ? INDUSTRIES : openPanel === 'service' ? SERVICES : CONTENT_TYPES).map(opt => {
                const isActive = openPanel === 'industry' ? activeIndustry === opt : openPanel === 'service' ? activeService === opt : activeContentType === opt;
                return (
                  <button key={opt} onClick={() => {
                    if (openPanel === 'industry') setActiveIndustry(opt);
                    else if (openPanel === 'service') setActiveService(opt);
                    else setActiveContentType(opt);
                    setOpenPanel(null);
                  }} className={`px-5 py-2.5 text-sm font-bold uppercase tracking-widest border transition-all rounded-sm ${isActive ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900'}`}>
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
            <div className="flex justify-center py-24"><Loader2 size={36} className="animate-spin text-[#E61739]/40" /></div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400 font-medium text-lg">No articles match the selected filters.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(card => {
                const Icon = card.icon;
                return (
                  <div key={card.id}
                    onClick={() => { if (card.isLive && onSelectBlog) onSelectBlog(Number(card.id)); else if (onSelectBlog) onSelectBlog(null); setView('blog-detail'); }}
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-black/[0.04] hover:shadow-2xl transition-all duration-500 cursor-pointer">

                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden shrink-0">
                      <img src={card.thumb} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/30">
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{card.industry}</span>
                      </div>
                      <div className="absolute top-3 right-3">
                        <span className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-white/80 border border-white/20">
                          {card.metrics[0].value} read
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-slate-500 text-xs">{card.source}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{card.metrics[1].value}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors">{card.title}</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{card.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mb-6 pt-5 border-t border-black/5">
                        {card.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">{tag}</span>
                        ))}
                        <span className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-[#E61739] uppercase tracking-wide">{card.metrics[2].value}</span>
                      </div>
                      <button className="mt-auto w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn">
                        Read Article <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
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
