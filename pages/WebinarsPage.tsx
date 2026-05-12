
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, X, Plus, ChevronDown, Video, MonitorPlay, Mic2, Users, Globe, BrainCircuit, BarChart3, ShieldCheck, Layers } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const webinars = [
  { id: 1, title: "The Rise of Agentic AI: Transforming Operations in 2025", desc: "A deep dive into the next generation of AI agents that don't just chat, but execute complex workflows independently.", industry: "Technology", source: "Dr. Elena Vance & Marcus Jordon", contentType: "Webinar" as const, tags: ["AI Ops", "Operations"], icon: BrainCircuit, metrics: [{ label: "Duration", value: "60 min" }, { label: "Date", value: "Oct 2024" }, { label: "Attendees", value: "2,400+" }] },
  { id: 2, title: "Scaling Engineering Teams: Offshore vs. Nearshore", desc: "A tactical breakdown of when to go offshore, when to go nearshore, and how to structure each model for success.", industry: "Technology", source: "Sarah Chen & Devin Zhao", contentType: "Webinar" as const, tags: ["Software Dev", "Staff Aug"], icon: Layers, metrics: [{ label: "Duration", value: "45 min" }, { label: "Date", value: "Sep 2024" }, { label: "Attendees", value: "1,800+" }] },
  { id: 3, title: "CX Automation: Balancing Bots and Humans", desc: "How leading brands are combining AI triage with empathetic human agents to deliver world-class customer experiences.", industry: "Retail", source: "Michael Ross & Sarah Chen", contentType: "Webinar" as const, tags: ["Customer Support", "AI Ops"], icon: Users, metrics: [{ label: "Duration", value: "55 min" }, { label: "Date", value: "Aug 2024" }, { label: "Attendees", value: "3,100+" }] },
  { id: 4, title: "Fintech Compliance in a Distributed World", desc: "Navigating SOC-2, PCI-DSS, and AML requirements when your operations team spans multiple jurisdictions.", industry: "Financial Services", source: "Marcus Jordon", contentType: "Webinar" as const, tags: ["Back Office", "Operations"], icon: ShieldCheck, metrics: [{ label: "Duration", value: "60 min" }, { label: "Date", value: "Jul 2024" }, { label: "Attendees", value: "1,200+" }] },
  { id: 5, title: "Building a 24/7 Global Brand Strategy", desc: "How to maintain brand consistency across timezones, cultures, and markets with a distributed creative operations team.", industry: "Retail", source: "Devin Zhao", contentType: "Webinar" as const, tags: ["Creative", "Operations"], icon: Globe, metrics: [{ label: "Duration", value: "40 min" }, { label: "Date", value: "Jun 2024" }, { label: "Attendees", value: "980+" }] },
  { id: 6, title: "Measuring AI ROI: Moving Beyond Cost to Velocity", desc: "A framework for quantifying the impact of AI-augmented teams using outcome velocity, quality scores, and ramp metrics.", industry: "Professional Services", source: "Sarah Chen & Marcus Jordon", contentType: "Webinar" as const, tags: ["AI Ops", "Staff Aug"], icon: BarChart3, metrics: [{ label: "Duration", value: "50 min" }, { label: "Date", value: "May 2024" }, { label: "Attendees", value: "2,700+" }] },
  { id: 7, title: "Healthcare Operations at Scale: HIPAA in the Cloud", desc: "Secure, compliant patient data workflows for distributed medical administration teams and multi-state networks.", industry: "Healthcare", source: "Dr. Elena Vance", contentType: "Webinar" as const, tags: ["Back Office", "Operations"], icon: ShieldCheck, metrics: [{ label: "Duration", value: "45 min" }, { label: "Date", value: "Apr 2024" }, { label: "Attendees", value: "1,600+" }] },
  { id: 8, title: "Logistics Digitization: From Paper Waybills to Real-time Data", desc: "How global freight leaders are eliminating manual documentation bottlenecks using AI-assisted OCR and offshore teams.", industry: "Logistics", source: "Michael Ross", contentType: "Webinar" as const, tags: ["Data Entry", "AI Ops"], icon: MonitorPlay, metrics: [{ label: "Duration", value: "40 min" }, { label: "Date", value: "Mar 2024" }, { label: "Attendees", value: "1,050+" }] },
  { id: 9, title: "The PropTech Playbook: AI-Managed Leasing at Scale", desc: "Centralizing tenant verification, leasing admin, and maintenance coordination for property platforms managing 50k+ units.", industry: "Real Estate", source: "Devin Zhao", contentType: "Webinar" as const, tags: ["Back Office", "Operations"], icon: Video, metrics: [{ label: "Duration", value: "35 min" }, { label: "Date", value: "Feb 2024" }, { label: "Attendees", value: "870+" }] },
];

const INDUSTRIES    = ['All', 'Financial Services', 'Logistics', 'Technology', 'Retail', 'Real Estate', 'Healthcare', 'Professional Services'];
const SERVICES      = ['All', 'Customer Support', 'Data Entry', 'Software Dev', 'Staff Aug', 'Back Office', 'AI Ops', 'Operations', 'Creative'];
const CONTENT_TYPES = ['All', 'Blog', 'Case Study', 'Guide & Playbooks', 'Webinar', 'Ebook', 'FAQ', 'Glossary'];

export const WebinarsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeIndustry, setActiveIndustry]       = useState('All');
  const [activeService, setActiveService]         = useState('All');
  const [activeContentType, setActiveContentType] = useState('Webinar');
  const [openPanel, setOpenPanel] = useState<'industry' | 'service' | 'content' | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setOpenPanel(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = webinars.filter(w => {
    const industryOk    = activeIndustry    === 'All' || w.industry    === activeIndustry;
    const serviceOk     = activeService     === 'All' || w.tags.includes(activeService);
    const contentTypeOk = activeContentType === 'All' || w.contentType === activeContentType;
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
          <Breadcrumbs setView={setView} currentName="Webinars & Events" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Live</span>{' '}
              <span className="text-[#E61739]">Sessions.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Expert discussions on the future of work, AI integration, and operational scaling — live and on demand.
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
            <div className="text-center py-24 text-slate-400 font-medium text-lg">No webinars match the selected filters.</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(webinar => {
                const Icon = webinar.icon;
                return (
                  <div key={webinar.id} onClick={() => setView('contact')}
                    className="group flex flex-col h-full bg-white rounded-[2.5rem] p-8 border border-black/[0.04] hover:shadow-2xl transition-all duration-500 cursor-pointer">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform shrink-0">
                        <Icon size={22} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739]">{webinar.industry}</div>
                        <div className="font-bold text-slate-900 text-sm">{webinar.source}</div>
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors">{webinar.title}</h3>
                    <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">{webinar.desc}</p>
                    <div className="grid grid-cols-3 gap-3 mb-6 pt-6 border-t border-black/5">
                      {webinar.metrics.map((m, i) => (
                        <div key={i}>
                          <div className="text-base font-black text-slate-900 leading-tight">{m.value}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-tight mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {webinar.tags.map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">{tag}</span>
                      ))}
                    </div>
                    <button className="mt-auto w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn">
                      Watch Recording <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
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
