
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, Plus, ChevronDown, Globe, Cpu, ShieldCheck, TrendingUp, Users, BarChart3, BrainCircuit, Layers, FileText, Search } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const ebooks = [
  { id: 1, icon: Globe, industry: "Technology", source: "KDCI Research Lab", contentType: "Ebook" as const, tags: ["AI Ops", "Operations"], thumb: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?auto=format&fit=crop&q=80&w=800&h=420", title: "State of Global AI Operations 2025", desc: "An in-depth analysis of how 500+ enterprise leaders are integrating agentic AI into their workforce strategy.", metrics: [{ label: "Pages", value: "45" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2025" }] },
  { id: 2, icon: Cpu, industry: "Technology", source: "KDCI Engineering", contentType: "Ebook" as const, tags: ["Software Dev", "AI Ops"], thumb: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800&h=420", title: "The Ultimate Guide to QA Automation", desc: "Moving beyond manual testing: a framework for building self-healing regression suites with offshore teams.", metrics: [{ label: "Pages", value: "32" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2024" }] },
  { id: 3, icon: ShieldCheck, industry: "Financial Services", source: "KDCI Research Lab", contentType: "Ebook" as const, tags: ["Back Office", "Operations"], thumb: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=800&h=420", title: "Fintech Compliance: The Offshore Playbook", desc: "Navigating GDPR, SOC-2, and PCI-DSS when working with distributed financial operations teams globally.", metrics: [{ label: "Pages", value: "28" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2024" }] },
  { id: 4, icon: TrendingUp, industry: "Retail", source: "KDCI Analytics", contentType: "Ebook" as const, tags: ["Creative", "Staff Aug"], thumb: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=800&h=420", title: "ROI of Managed Creative Pods", desc: "Calculating the velocity and cost impact of switching from freelancers to dedicated creative units.", metrics: [{ label: "Pages", value: "18" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2024" }] },
  { id: 5, icon: Users, industry: "Healthcare", source: "KDCI Research Lab", contentType: "Ebook" as const, tags: ["Back Office", "Operations"], thumb: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800&h=420", title: "Healthcare Data Management in a Distributed World", desc: "A comprehensive framework for HIPAA-compliant patient data workflows across multi-state offshore operations.", metrics: [{ label: "Pages", value: "36" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2025" }] },
  { id: 6, icon: BarChart3, industry: "Technology", source: "KDCI Research Lab", contentType: "Ebook" as const, tags: ["Software Dev", "Staff Aug"], thumb: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800&h=420", title: "The Offshore Engineering Talent Report 2025", desc: "Benchmarks, salary data, and hiring trends for software engineers across Southeast Asia and Latin America.", metrics: [{ label: "Pages", value: "52" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2025" }] },
  { id: 7, icon: BrainCircuit, industry: "Professional Services", source: "KDCI AI Labs", contentType: "Ebook" as const, tags: ["Customer Support", "AI Ops"], thumb: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?auto=format&fit=crop&q=80&w=800&h=420", title: "Agentic AI in Customer Operations", desc: "How intelligent automation is reshaping CX teams — from chatbots to fully autonomous resolution agents.", metrics: [{ label: "Pages", value: "24" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2025" }] },
  { id: 8, icon: Layers, industry: "Logistics", source: "KDCI Analytics", contentType: "Ebook" as const, tags: ["Data Entry", "Operations"], thumb: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800&h=420", title: "Logistics Digitization Benchmark Report", desc: "How top-performing freight companies are eliminating manual bottlenecks and achieving real-time visibility.", metrics: [{ label: "Pages", value: "22" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2024" }] },
  { id: 9, icon: FileText, industry: "Professional Services", source: "KDCI Research Lab", contentType: "Ebook" as const, tags: ["Staff Aug", "Operations"], thumb: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800&h=420", title: "The Staff Augmentation Buyer's Guide", desc: "Everything procurement teams need to evaluate, negotiate, and onboard an offshore operations partner effectively.", metrics: [{ label: "Pages", value: "30" }, { label: "Format", value: "PDF" }, { label: "Year", value: "2025" }] },
];

const INDUSTRIES    = ['All', 'Financial Services', 'Logistics', 'Technology', 'Retail', 'Real Estate', 'Healthcare', 'Professional Services'];
const SERVICES      = ['All', 'Customer Support', 'Data Entry', 'Software Dev', 'Staff Aug', 'Back Office', 'AI Ops', 'Operations', 'Creative'];
const CONTENT_TYPES = ['All', 'Blog', 'Case Study', 'Guide & Playbooks', 'Webinar', 'Ebook', 'FAQ', 'Glossary'];

export const EbooksPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeIndustry, setActiveIndustry]       = useState('All');
  const [activeService, setActiveService]         = useState('All');
  const [activeContentType, setActiveContentType] = useState('Ebook');
  const [openPanel, setOpenPanel] = useState<'industry' | 'service' | 'content' | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = ebooks.filter(e => {
    const industryOk    = activeIndustry    === 'All' || e.industry    === activeIndustry;
    const serviceOk     = activeService     === 'All' || e.tags.includes(activeService);
    const contentTypeOk = activeContentType === 'All' || e.contentType === activeContentType;
    const q = searchQuery.toLowerCase();
    const searchOk = q === '' || e.title.toLowerCase().includes(q) || e.desc.toLowerCase().includes(q);
    return industryOk && serviceOk && contentTypeOk && searchOk;
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
          <Breadcrumbs setView={setView} currentName="Ebooks & Whitepapers" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Strategic</span>{' '}
              <span className="text-[#E61739]">Deep Dives.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Comprehensive research, data-driven reports, and strategic frameworks for the modern executive.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div ref={filterRef} className="relative z-30 bg-white border-y border-slate-200 shadow-sm">
        {/* Search row */}
        <div className="max-w-7xl mx-auto px-8 pt-5 pb-4 border-b border-slate-100">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search ebooks, reports, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white focus:border-[#E61739]/40 transition-all placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>
        <div className="max-w-7xl mx-auto flex divide-x divide-slate-200">
          <button onClick={() => setOpenPanel(openPanel === 'industry' ? null : 'industry')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'industry' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            {industryActive ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveIndustry('All'); setOpenPanel(null); }} /> : <Plus size={16} className="text-slate-400 shrink-0" />}
            <span className={`text-sm font-bold uppercase tracking-widest ${industryActive ? 'text-slate-900' : 'text-slate-500'}`}>{industryLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'industry' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
          <button onClick={() => setOpenPanel(openPanel === 'service' ? null : 'service')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'service' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            {serviceActive ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveService('All'); setOpenPanel(null); }} /> : <Plus size={16} className="text-slate-400 shrink-0" />}
            <span className={`text-sm font-bold uppercase tracking-widest ${serviceActive ? 'text-slate-900' : 'text-slate-500'}`}>{serviceLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'service' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
          <button onClick={() => setOpenPanel(openPanel === 'content' ? null : 'content')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'content' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}>
            {contentTypeActive ? <X size={16} className="text-[#E61739] shrink-0" onClick={e => { e.stopPropagation(); setActiveContentType('All'); setOpenPanel(null); }} /> : <Plus size={16} className="text-slate-400 shrink-0" />}
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
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400 font-medium text-lg">No ebooks match the selected filters.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(ebook => {
                const Icon = ebook.icon;
                return (
                  <div key={ebook.id} onClick={() => setView('contact')}
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] overflow-hidden border border-black/[0.04] hover:shadow-2xl transition-all duration-500 cursor-pointer">

                    {/* Thumbnail */}
                    <div className="relative h-44 overflow-hidden shrink-0">
                      <img src={ebook.thumb} alt={ebook.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                      <div className="absolute bottom-3 left-4 flex items-center gap-2">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/30">
                          <Icon size={16} />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/90">{ebook.industry}</span>
                      </div>
                      <div className="absolute top-3 right-3 flex items-center gap-1.5">
                        <span className="px-3 py-1 bg-[#E61739]/80 backdrop-blur-sm rounded-full text-[9px] font-black uppercase tracking-widest text-white border border-white/10">
                          PDF · {ebook.metrics[0].value} pp
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="font-bold text-slate-500 text-xs">{ebook.source}</span>
                        <span className="text-slate-300">·</span>
                        <span className="text-xs text-slate-400">{ebook.metrics[2].value}</span>
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors">{ebook.title}</h3>
                      <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{ebook.desc}</p>
                      <div className="flex flex-wrap gap-2 mb-6 pt-5 border-t border-black/5">
                        {ebook.tags.map((tag, i) => (
                          <span key={i} className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">{tag}</span>
                        ))}
                      </div>
                      <button className="mt-auto w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn">
                        Download PDF <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
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
