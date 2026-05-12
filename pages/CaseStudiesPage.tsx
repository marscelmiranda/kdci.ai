
import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, Smartphone, Globe, Building2, ShoppingCart, Activity, Plus, X, ChevronDown } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const caseStudies = [
  {
    id: 1,
    client: "Fintech Unicorn",
    industry: "Financial Services",
    contentType: "Case Study",
    icon: Smartphone,
    title: "Scaling Support from 0 to 500 Agents in 6 Months",
    desc: "How a high-growth neobank maintained 98% CSAT while hyper-scaling their customer operations offshore.",
    metrics: [
      { label: "Cost Savings", value: "65%" },
      { label: "CSAT Score", value: "4.8/5" },
      { label: "Ramp Time", value: "14 Days" }
    ],
    tags: ["Customer Support", "AI Ops", "Fintech"]
  },
  {
    id: 2,
    client: "Global Logistics Leader",
    industry: "Logistics",
    contentType: "Guide & Playbooks",
    icon: Globe,
    title: "Automating 10,000 Weekly Waybills with AI + Humans",
    desc: "Implementing a human-in-the-loop OCR workflow to digitize shipping documentation with 99.9% accuracy.",
    metrics: [
      { label: "Accuracy", value: "99.9%" },
      { label: "Manual Work", value: "-80%" },
      { label: "Turnaround", value: "<1 Hr" }
    ],
    tags: ["Data Entry", "Logistics", "Automation"]
  },
  {
    id: 3,
    client: "SaaS Enterprise",
    industry: "Technology",
    contentType: "Webinar",
    icon: Building2,
    title: "Building a Dedicated Engineering Pod for Legacy Migration",
    desc: "Deploying a 15-person specialized dev team to modernize a monolithic architecture to microservices.",
    metrics: [
      { label: "Velocity", value: "3x" },
      { label: "Bug Rate", value: "-40%" },
      { label: "Uptime", value: "99.99%" }
    ],
    tags: ["Software Dev", "Staff Aug", "SaaS"]
  },
  {
    id: 4,
    client: "D2C Fashion Brand",
    industry: "Retail",
    contentType: "Blog",
    icon: ShoppingCart,
    title: "24/7 Social Commerce Support & Community Management",
    desc: "Turning customer support into a revenue channel through proactive social engagement and chat sales.",
    metrics: [
      { label: "Sales Lift", value: "+25%" },
      { label: "Response", value: "<30s" },
      { label: "ROI", value: "400%" }
    ],
    tags: ["Social Media", "Sales", "Retail"]
  },
  {
    id: 5,
    client: "PropTech Platform",
    industry: "Real Estate",
    contentType: "Ebook",
    icon: Building2,
    title: "Streamlining Tenant Verification & Leasing Admin",
    desc: "Centralizing back-office operations for a property management platform managing 50k+ units.",
    metrics: [
      { label: "Processing", value: "2x Faster" },
      { label: "Savings", value: "$1.2M" },
      { label: "Errors", value: "0%" }
    ],
    tags: ["Back Office", "PropTech", "Admin"]
  },
  {
    id: 6,
    client: "Healthcare Network",
    industry: "Healthcare",
    contentType: "Case Study",
    icon: Activity,
    title: "HIPAA-Compliant Patient Intake & Scheduling",
    desc: "Secure, empathetic patient coordination support for a multi-state hospital network.",
    metrics: [
      { label: "No-Shows", value: "-30%" },
      { label: "Answer Rate", value: "99%" },
      { label: "Compliance", value: "100%" }
    ],
    tags: ["Healthcare", "Voice Support", "HIPAA"]
  }
];

const INDUSTRIES    = ['All', 'Financial Services', 'Logistics', 'Technology', 'Retail', 'Real Estate', 'Healthcare'];
const SERVICES      = ['All', 'Customer Support', 'Data Entry', 'Software Dev', 'Staff Aug', 'Social Media', 'Back Office'];
const CONTENT_TYPES = ['All', 'Blog', 'Case Study', 'Guide & Playbooks', 'Webinar', 'Ebook', 'FAQ', 'Glossary'];

export const CaseStudiesPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeIndustry, setActiveIndustry]     = useState('All');
  const [activeService, setActiveService]       = useState('All');
  const [activeContentType, setActiveContentType] = useState('Case Study');
  const [openPanel, setOpenPanel] = useState<'industry' | 'service' | 'content' | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filtered = caseStudies.filter(cs => {
    const industryOk    = activeIndustry    === 'All' || cs.industry    === activeIndustry;
    const serviceOk     = activeService     === 'All' || cs.tags.includes(activeService);
    const contentTypeOk = activeContentType === 'All' || cs.contentType === activeContentType;
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

      {/* ── COMPACT HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-30" />
          <div className="blob blob-magenta opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Case Studies" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Proven</span>{' '}
              <span className="text-[#E61739]">Results.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              See how leading enterprises use KDCI's managed intelligence to scale faster, cut costs, and improve quality.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── outside overflow-hidden so dropdown isn't clipped */}
      <div ref={filterRef} className="relative z-30 bg-white border-y border-slate-200 shadow-sm">
        {/* Three-column trigger row */}
        <div className="max-w-7xl mx-auto flex divide-x divide-slate-200">
          {/* Industry trigger */}
          <button
            onClick={() => setOpenPanel(openPanel === 'industry' ? null : 'industry')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'industry' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {industryActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveIndustry('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${industryActive ? 'text-slate-900' : 'text-slate-500'}`}>{industryLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'industry' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>

          {/* Service trigger */}
          <button
            onClick={() => setOpenPanel(openPanel === 'service' ? null : 'service')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'service' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {serviceActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveService('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${serviceActive ? 'text-slate-900' : 'text-slate-500'}`}>{serviceLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'service' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>

          {/* Content Type trigger */}
          <button
            onClick={() => setOpenPanel(openPanel === 'content' ? null : 'content')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'content' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {contentTypeActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveContentType('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${contentTypeActive ? 'text-slate-900' : 'text-slate-500'}`}>{contentTypeLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'content' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>
        </div>

        {/* Dropdown panel */}
        {openPanel && (
          <div className="absolute left-0 right-0 bg-white border-t border-slate-200 shadow-xl px-8 py-6 z-50">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              {openPanel === 'industry' ? 'Filter by Industry' : openPanel === 'service' ? 'Filter by Service' : 'Filter by Content Type'}
            </p>
            <div className="flex flex-wrap gap-3">
              {(openPanel === 'industry' ? INDUSTRIES : openPanel === 'service' ? SERVICES : CONTENT_TYPES).map(opt => {
                const isActive =
                  openPanel === 'industry' ? activeIndustry === opt :
                  openPanel === 'service'  ? activeService  === opt :
                  activeContentType === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => {
                      if (openPanel === 'industry') setActiveIndustry(opt);
                      else if (openPanel === 'service') setActiveService(opt);
                      else setActiveContentType(opt);
                      setOpenPanel(null);
                    }}
                    className={`px-5 py-2.5 text-sm font-bold uppercase tracking-widest border transition-all rounded-sm ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900'
                    }`}
                  >
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
            <div className="text-center py-24 text-slate-400 font-medium text-lg">
              No case studies match the selected filters.
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((study) => (
                <div
                  key={study.id}
                  className="group flex flex-col h-full bg-white rounded-[2.5rem] p-8 border border-black/[0.04] hover:shadow-2xl transition-all duration-500"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform shrink-0">
                      <study.icon size={22} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739]">{study.industry}</div>
                      <div className="font-bold text-slate-900 text-sm">{study.client}</div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug group-hover:text-[#E61739] transition-colors">
                    {study.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-medium leading-relaxed mb-6 flex-grow">
                    {study.desc}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-6 pt-6 border-t border-black/5">
                    {study.metrics.map((m, i) => (
                      <div key={i}>
                        <div className="text-xl font-black text-slate-900">{m.value}</div>
                        <div className="text-[9px] font-bold text-slate-400 uppercase tracking-tight leading-tight">{m.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag, i) => (
                      <span key={i} className="px-3 py-1 bg-[#F5F5F7] rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setView('case-study-detail')}
                    className="mt-auto w-full py-3 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    Read Case Study <ArrowRight size={15} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-purple opacity-30" />
            <div className="blob blob-magenta opacity-30" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">
              Have a similar<br/><span className="text-shine-red">challenge?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">
              Our solutions architects can design a custom operational model for your specific needs.
            </p>
            <button
              onClick={() => setView('contact')}
              className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 mx-auto group/cta"
            >
              Consult an Architect <ArrowRight size={24} className="group-hover/cta:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
