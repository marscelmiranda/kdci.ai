
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, Plus, ChevronDown, BrainCircuit, Users, Layers, FileText, BarChart3, Palette, Settings, Globe, BookOpen } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const guides = [
  { id: 1, title: "The Ultimate Guide to AI-Augmented Offshoring", desc: "A comprehensive blueprint for integrating agentic AI into your remote team workflows to 3x productivity.", industry: "Technology", source: "KDCI Research", contentType: "Guide & Playbooks" as const, tags: ["Software Dev", "AI Ops"], icon: BrainCircuit, metrics: [{ label: "Read Time", value: "15 min" }, { label: "Level", value: "Advanced" }, { label: "Format", value: "Online" }] },
  { id: 2, title: "Building a 24/7 Customer Support Operation from Scratch", desc: "Step-by-step framework for setting up shifts, tooling, and QA processes for round-the-clock coverage.", industry: "Professional Services", source: "KDCI Editorial", contentType: "Guide & Playbooks" as const, tags: ["Customer Support", "Operations"], icon: Users, metrics: [{ label: "Read Time", value: "10 min" }, { label: "Level", value: "Beginner" }, { label: "Format", value: "Online" }] },
  { id: 3, title: "Scaling Engineering Teams: The Pod Model Explained", desc: "Why the 'Pod' structure outperforms individual staff augmentation for software development projects.", industry: "Technology", source: "KDCI Research", contentType: "Guide & Playbooks" as const, tags: ["Software Dev", "Staff Aug"], icon: Layers, metrics: [{ label: "Read Time", value: "12 min" }, { label: "Level", value: "Intermediate" }, { label: "Format", value: "Online" }] },
  { id: 4, title: "Quality Assurance in the Age of Generative AI", desc: "How to adapt your QA frameworks when using LLMs for content and code generation at scale.", industry: "Technology", source: "KDCI Editorial", contentType: "Guide & Playbooks" as const, tags: ["Software Dev", "AI Ops"], icon: FileText, metrics: [{ label: "Read Time", value: "8 min" }, { label: "Level", value: "Advanced" }, { label: "Format", value: "Online" }] },
  { id: 5, title: "The CFO's Guide to Outsourcing ROI", desc: "Moving beyond simple labor arbitrage to calculating total value creation and velocity impact.", industry: "Financial Services", source: "KDCI Research", contentType: "Guide & Playbooks" as const, tags: ["Operations", "Staff Aug"], icon: BarChart3, metrics: [{ label: "Read Time", value: "10 min" }, { label: "Level", value: "Advanced" }, { label: "Format", value: "Online" }] },
  { id: 6, title: "Managing Remote Creative Teams: A Style Guide Template", desc: "Standardize your visual identity across borders with this customizable SOP template.", industry: "Retail", source: "KDCI Editorial", contentType: "Guide & Playbooks" as const, tags: ["Creative", "Operations"], icon: Palette, metrics: [{ label: "Read Time", value: "Downloadable" }, { label: "Level", value: "All Levels" }, { label: "Format", value: "PDF" }] },
  { id: 7, title: "Healthcare Data Management: The Offshore Compliance Playbook", desc: "Navigate HIPAA, GDPR, and HITECH requirements for distributed medical data teams.", industry: "Healthcare", source: "KDCI Research", contentType: "Guide & Playbooks" as const, tags: ["Back Office", "Operations"], icon: Settings, metrics: [{ label: "Read Time", value: "14 min" }, { label: "Level", value: "Advanced" }, { label: "Format", value: "Online" }] },
  { id: 8, title: "Logistics Operations Playbook: From Waybills to Real-time Tracking", desc: "End-to-end guide to digitizing freight documentation and operations at scale.", industry: "Logistics", source: "KDCI Editorial", contentType: "Guide & Playbooks" as const, tags: ["Data Entry", "Operations"], icon: Globe, metrics: [{ label: "Read Time", value: "11 min" }, { label: "Level", value: "Intermediate" }, { label: "Format", value: "Online" }] },
  { id: 9, title: "Agentic Recruitment: Hiring Offshore Engineers in 2025", desc: "A step-by-step sourcing, vetting, and onboarding framework for building elite distributed dev teams.", industry: "Technology", source: "KDCI Research", contentType: "Guide & Playbooks" as const, tags: ["Staff Aug", "Software Dev"], icon: Users, metrics: [{ label: "Read Time", value: "9 min" }, { label: "Level", value: "Intermediate" }, { label: "Format", value: "Online" }] },
];

const INDUSTRIES    = ['All', 'Financial Services', 'Logistics', 'Technology', 'Retail', 'Real Estate', 'Healthcare', 'Professional Services'];
const SERVICES      = ['All', 'Customer Support', 'Data Entry', 'Software Dev', 'Staff Aug', 'Back Office', 'AI Ops', 'Operations', 'Creative'];
const CONTENT_TYPES = ['All', 'Blog', 'Case Study', 'Guide & Playbooks', 'Webinar', 'Ebook', 'FAQ', 'Glossary'];

export const GuidesPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeIndustry, setActiveIndustry]       = useState('All');
  const [activeService, setActiveService]         = useState('All');
  const [activeContentType, setActiveContentType] = useState('Guide & Playbooks');
  const [openPanel, setOpenPanel] = useState<'industry' | 'service' | 'content' | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = guides.filter(g => {
    const industryOk    = activeIndustry    === 'All' || g.industry    === activeIndustry;
    const serviceOk     = activeService     === 'All' || g.tags.includes(activeService);
    const contentTypeOk = activeContentType === 'All' || g.contentType === activeContentType;
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
          <Breadcrumbs setView={setView} currentName="Guides & Playbooks" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Operational</span>{' '}
              <span className="text-[#E61739]">Blueprints.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Tactical guides, SOP templates, and strategic frameworks for scaling with intelligent operations.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <div ref={filterRef} className="relative z-30 bg-white border-y border-slate-200 shadow-sm">
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
            <div className="text-center py-24 text-slate-400 font-medium text-lg">No guides match the selected filters.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(guide => {
                const Icon = guide.icon;
                return (
                  <div key={guide.id} onClick={() => setView('contact')}
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] p-8 border border-black/[0.04] hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739]">{guide.industry}</div>
                        <div className="font-bold text-slate-900 text-sm">{guide.source}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors">{guide.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{guide.desc}</p>
                    <div className="grid grid-cols-3 gap-3 mb-6 pt-6 border-t border-black/5">
                      {guide.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-base font-black text-slate-900 leading-tight">{m.value}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {guide.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">{tag}</span>
                      ))}
                    </div>
                    <button className="mt-auto w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn">
                      Read Guide <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
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
