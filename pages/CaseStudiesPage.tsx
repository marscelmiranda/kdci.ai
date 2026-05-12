
import React, { useState } from 'react';
import { ArrowRight, Smartphone, Globe, Building2, ShoppingCart, Activity, Landmark, Truck, Monitor, Store, Home, HeartPulse, Headphones, Database, Code2, Users, Share2, Layers } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const caseStudies = [
  {
    id: 1,
    client: "Fintech Unicorn",
    industry: "Financial Services",
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

const INDUSTRIES = [
  { label: 'All', value: 'All Industries', icon: Layers },
  { label: 'Financial Services', value: 'Financial Services', icon: Landmark },
  { label: 'Logistics', value: 'Logistics', icon: Truck },
  { label: 'Technology', value: 'Technology', icon: Monitor },
  { label: 'Retail', value: 'Retail', icon: Store },
  { label: 'Real Estate', value: 'Real Estate', icon: Home },
  { label: 'Healthcare', value: 'Healthcare', icon: HeartPulse },
];

const SERVICES = [
  { label: 'All', value: 'All Services', icon: Layers },
  { label: 'Customer Support', value: 'Customer Support', icon: Headphones },
  { label: 'Data Entry', value: 'Data Entry', icon: Database },
  { label: 'Software Dev', value: 'Software Dev', icon: Code2 },
  { label: 'Staff Aug', value: 'Staff Aug', icon: Users },
  { label: 'Social Media', value: 'Social Media', icon: Share2 },
  { label: 'Back Office', value: 'Back Office', icon: Layers },
];

export const CaseStudiesPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeIndustry, setActiveIndustry] = useState('All Industries');
  const [activeService, setActiveService]   = useState('All Services');

  const filtered = caseStudies.filter(cs => {
    const industryOk = activeIndustry === 'All Industries' || cs.industry === activeIndustry;
    const serviceOk  = activeService  === 'All Services'  || cs.tags.includes(activeService);
    return industryOk && serviceOk;
  });

  return (
    <div className="min-h-screen bg-white">

      {/* ── COMPACT HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-0">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-30" />
          <div className="blob blob-magenta opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="Case Studies" />

          <div className="mt-6 mb-10">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Proven</span>{' '}
              <span className="text-[#E61739]">Results.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl">
              See how leading enterprises use KDCI's managed intelligence to scale faster, cut costs, and improve quality.
            </p>
          </div>
        </div>

        {/* ── FILTER STRIP ── */}
        <div className="relative z-10 border-t border-white/10 bg-white/[0.03] backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-6">

            {/* Industry row */}
            <div className="flex items-stretch border-b border-white/8 overflow-x-auto scrollbar-none">
              <div className="shrink-0 flex items-center pr-6 border-r border-white/10 mr-2">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Industry</span>
              </div>
              <div className="flex items-stretch gap-1 py-1">
                {INDUSTRIES.map(({ label, value, icon: Icon }) => {
                  const active = activeIndustry === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setActiveIndustry(value)}
                      className={`relative flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-t-xl ${
                        active
                          ? 'text-white bg-white/10'
                          : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={13} className={active ? 'text-[#E61739]' : ''} />
                      {label}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E61739] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service row */}
            <div className="flex items-stretch overflow-x-auto scrollbar-none">
              <div className="shrink-0 flex items-center pr-6 border-r border-white/10 mr-2">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30">Service</span>
              </div>
              <div className="flex items-stretch gap-1 py-1">
                {SERVICES.map(({ label, value, icon: Icon }) => {
                  const active = activeService === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setActiveService(value)}
                      className={`relative flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all rounded-b-xl ${
                        active
                          ? 'text-white bg-white/10'
                          : 'text-white/40 hover:text-white/80 hover:bg-white/5'
                      }`}
                    >
                      <Icon size={13} className={active ? 'text-[#E61739]' : ''} />
                      {label}
                      {active && (
                        <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#E61739] rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

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
