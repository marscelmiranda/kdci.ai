
import React, { useState } from 'react';
import { ArrowRight, Headphones, Palette, Code, UserCircle, Coins, UserPlus, Home, Database, Users, Workflow, Target, Search, Handshake, Activity, CheckCircle2, Globe, GraduationCap, Clock, TrendingDown, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_STAFF_AUG_HERO, INDUSTRIES } from '../../data';
import IMG_PH_TEAM from '../../attached_assets/Gemini_Generated_Image_8gr4nc8gr4nc8gr4_1777973290700.png';

const INDUSTRY_SAVINGS: Record<string, { role: string; ph: string; save: string }[]> = {
  'ecommerce':     [{ role: 'E-commerce Analyst',       ph: '$2,000', save: '65%' }, { role: 'Catalog Manager',         ph: '$1,800', save: '63%' }, { role: 'SEO Specialist',          ph: '$2,000', save: '67%' }, { role: 'CX Lead',                 ph: '$1,800', save: '62%' }, { role: 'Visual Merchandiser',     ph: '$1,900', save: '64%' }],
  'software-dev':  [{ role: 'Full-Stack Developer',     ph: '$2,800', save: '72%' }, { role: 'QA Engineer',             ph: '$2,200', save: '68%' }, { role: 'DevOps Engineer',         ph: '$3,000', save: '70%' }, { role: 'UI/UX Designer',          ph: '$2,200', save: '71%' }, { role: 'Technical Writer',        ph: '$1,800', save: '63%' }],
  'property-mgmt': [{ role: 'Property Manager',         ph: '$2,000', save: '60%' }, { role: 'Transaction Coordinator', ph: '$1,900', save: '62%' }, { role: 'Listings Coordinator',    ph: '$1,800', save: '62%' }, { role: 'CRM Specialist',          ph: '$2,000', save: '63%' }, { role: 'Real Estate VA',          ph: '$1,600', save: '65%' }],
  'fintech':       [{ role: 'Compliance Analyst',       ph: '$2,200', save: '66%' }, { role: 'Financial Analyst',       ph: '$2,500', save: '67%' }, { role: 'Data Analyst',            ph: '$2,500', save: '67%' }, { role: 'KYC Specialist',          ph: '$2,000', save: '63%' }, { role: 'Fraud Detection Spec.',   ph: '$2,200', save: '65%' }],
  'healthcare':    [{ role: 'Medical VA',               ph: '$1,800', save: '65%' }, { role: 'Medical Biller/Coder',    ph: '$1,900', save: '63%' }, { role: 'Patient Coordinator',     ph: '$1,800', save: '62%' }, { role: 'Claims Processor',        ph: '$1,700', save: '61%' }, { role: 'Prior Auth Specialist',   ph: '$1,900', save: '62%' }],
  'marketing-ad':  [{ role: 'Digital Marketing Manager',ph: '$2,200', save: '67%' }, { role: 'Content Strategist',      ph: '$2,000', save: '66%' }, { role: 'PPC Specialist',          ph: '$2,200', save: '67%' }, { role: 'Social Media Manager',    ph: '$1,900', save: '65%' }, { role: 'Brand Designer',          ph: '$2,000', save: '65%' }],
  'retail':        [{ role: 'Inventory Manager',        ph: '$1,900', save: '62%' }, { role: 'Customer Service Rep',    ph: '$1,800', save: '60%' }, { role: 'E-commerce Coordinator',  ph: '$2,000', save: '63%' }, { role: 'Supply Chain Analyst',    ph: '$2,200', save: '65%' }, { role: 'Merchandiser',            ph: '$1,800', save: '62%' }],
  'logistics':     [{ role: 'Logistics Coordinator',    ph: '$1,900', save: '63%' }, { role: 'Supply Chain Analyst',    ph: '$2,200', save: '65%' }, { role: 'Dispatch Coordinator',    ph: '$1,800', save: '61%' }, { role: 'Data Entry Specialist',   ph: '$1,500', save: '64%' }, { role: 'Operations Manager',      ph: '$2,500', save: '67%' }],
  'travel':        [{ role: 'Booking Coordinator',      ph: '$1,800', save: '62%' }, { role: 'Customer Support Agent',  ph: '$1,800', save: '61%' }, { role: 'Travel Consultant',       ph: '$2,000', save: '63%' }, { role: 'Reservations Manager',    ph: '$2,000', save: '63%' }, { role: 'Content Writer',          ph: '$1,800', save: '63%' }],
  'edtech':        [{ role: 'Curriculum Developer',     ph: '$2,000', save: '65%' }, { role: 'Instructional Designer',  ph: '$2,200', save: '66%' }, { role: 'LMS Administrator',       ph: '$1,900', save: '63%' }, { role: 'Student Support Rep',     ph: '$1,700', save: '61%' }, { role: 'Content Creator',         ph: '$1,900', save: '64%' }],
  'legal':         [{ role: 'Legal VA',                 ph: '$1,800', save: '65%' }, { role: 'Paralegal',               ph: '$2,000', save: '63%' }, { role: 'Contract Reviewer',       ph: '$2,200', save: '64%' }, { role: 'Legal Researcher',        ph: '$1,900', save: '63%' }, { role: 'Compliance Coordinator',  ph: '$2,000', save: '62%' }],
  'insurance':     [{ role: 'Claims Processor',         ph: '$1,800', save: '62%' }, { role: 'Underwriting Assistant',  ph: '$2,000', save: '63%' }, { role: 'Policy Administrator',    ph: '$1,800', save: '61%' }, { role: 'Insurance Analyst',       ph: '$2,200', save: '64%' }, { role: 'Loss Control Specialist', ph: '$2,000', save: '62%' }],
  'media':         [{ role: 'Content Writer',           ph: '$1,800', save: '63%' }, { role: 'Video Editor',            ph: '$2,200', save: '67%' }, { role: 'SEO Content Specialist',  ph: '$2,000', save: '66%' }, { role: 'Social Media Manager',    ph: '$1,900', save: '65%' }, { role: 'Copy Editor',             ph: '$1,700', save: '62%' }],
  'consumer-tech': [{ role: 'Product Support Spec.',    ph: '$1,900', save: '62%' }, { role: 'Technical Writer',        ph: '$1,800', save: '63%' }, { role: 'Customer Success Manager',ph: '$2,200', save: '65%' }, { role: 'QA Tester',               ph: '$2,000', save: '65%' }, { role: 'Community Manager',       ph: '$1,900', save: '63%' }],
  'telecom':       [{ role: 'Technical Support Agent',  ph: '$1,800', save: '61%' }, { role: 'Billing Specialist',      ph: '$1,700', save: '60%' }, { role: 'Customer Service Rep',    ph: '$1,700', save: '60%' }, { role: 'Sales Support Rep',       ph: '$1,900', save: '63%' }, { role: 'NOC Analyst',             ph: '$2,200', save: '65%' }],
  'auto':          [{ role: 'Parts Coordinator',        ph: '$1,800', save: '61%' }, { role: 'Customer Service Rep',    ph: '$1,700', save: '60%' }, { role: 'Inventory Manager',       ph: '$1,900', save: '62%' }, { role: 'Digital Marketing Spec.', ph: '$2,000', save: '65%' }, { role: 'Warranty Claims Processor',ph: '$1,700', save: '60%' }],
  'fashion':       [{ role: 'Product Listing Specialist',ph: '$1,700', save: '62%' }, { role: 'Customer Service Rep',   ph: '$1,700', save: '61%' }, { role: 'Social Media Manager',    ph: '$1,900', save: '65%' }, { role: 'E-commerce Coordinator',  ph: '$2,000', save: '63%' }, { role: 'Influencer Outreach Coord.',ph: '$1,800', save: '63%' }],
  'energy':        [{ role: 'Data Analyst',             ph: '$2,500', save: '67%' }, { role: 'Operations Coordinator',  ph: '$2,000', save: '63%' }, { role: 'Compliance Specialist',   ph: '$2,200', save: '64%' }, { role: 'Billing Analyst',         ph: '$1,800', save: '62%' }, { role: 'Customer Support Rep',    ph: '$1,700', save: '60%' }],
  'prof-services': [{ role: 'Executive VA',             ph: '$1,800', save: '65%' }, { role: 'Research Analyst',        ph: '$2,200', save: '66%' }, { role: 'Project Coordinator',     ph: '$2,000', save: '63%' }, { role: 'Business Development Rep',ph: '$2,000', save: '64%' }, { role: 'Proposal Writer',         ph: '$1,900', save: '64%' }],
  'gov':           [{ role: 'Data Entry Specialist',    ph: '$1,500', save: '62%' }, { role: 'Records Mgmt. Specialist',ph: '$1,700', save: '61%' }, { role: 'Administrative Assistant',ph: '$1,600', save: '60%' }, { role: 'Research Analyst',        ph: '$2,000', save: '64%' }, { role: 'Compliance Coordinator',  ph: '$1,900', save: '63%' }],
};

const CALC_ROLES = [
  { label: 'Customer Support Specialist', ph: 1800,  us: 4500  },
  { label: 'Full-Stack Developer',         ph: 2800,  us: 10000 },
  { label: 'UI/UX Designer',               ph: 2200,  us: 7500  },
  { label: 'Executive / Virtual Assistant',ph: 1800,  us: 5000  },
  { label: 'Digital Marketing Specialist', ph: 2000,  us: 6000  },
  { label: 'Data Analyst',                 ph: 2500,  us: 7500  },
  { label: 'Bookkeeper / Accountant',      ph: 1800,  us: 4800  },
  { label: 'Project Manager',              ph: 2800,  us: 9000  },
];

export const StaffAugmentationPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [calcHeadcount, setCalcHeadcount] = useState(3);
  const [calcRoleIdx, setCalcRoleIdx] = useState(0);

  const capabilities = [
    { title: "Customer Service Agents", icon: Headphones, roles: "Support, Tech Support, Chat" },
    { title: "Designers & Editors", icon: Palette, roles: "UI/UX, Video, Content" },
    { title: "Software Engineers", icon: Code, roles: "Frontend, Backend, Full-Stack" },
    { title: "Admins & Assistants", icon: UserCircle, roles: "Virtual Assistants, EAs" },
    { title: "Accounting & Finance", icon: Coins, roles: "Bookkeepers, Analysts" },
    { title: "Recruiters & HR", icon: UserPlus, roles: "Sourcing, Admin Support" },
    { title: "Real Estate Support", icon: Home, roles: "TCs, Property Assistants" },
    { title: "Data & Back-Office", icon: Database, roles: "Data Entry, Verification" }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-32 md:pb-40 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMG_STAFF_AUG_HERO} 
            alt="Staff Augmentation" 
            className="w-full h-full object-cover opacity-30 object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple opacity-40"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs 
            setView={setView} 
            currentName="Philippine Offshore Staffing" 
            parent={{ name: 'Solutions', view: 'solutions-hub' }} 
          />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.05]">
            Build Your Team in the <br/>
            <span className="text-[#E61739]">Philippines.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Get full-time, dedicated offshore professionals based in the Philippines embedded in your team — with AI handling performance, workflows, and reporting for seamless enterprise scale.
          </p>
          <button onClick={() => setView('contact')} className="px-12 py-5 bg-[#E61739] text-white rounded-2xl font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group mx-auto">
            Book a Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- Stats Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-4 md:gap-x-16 lg:gap-x-20 items-center text-white">
            {[
              { stat: '#2 in Asia',  label: 'English Proficiency' },
              { stat: '500,000+',    label: 'Graduates Per Year' },
              { stat: 'GMT +8',      label: 'Timezone Advantage' },
              { stat: 'Up to 70%',   label: 'Cost Savings' },
              { stat: '20+ Years',   label: 'Outsourcing Legacy' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-black mb-0.5">{s.stat}</div>
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. What We Offer */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-stretch">

            {/* LEFT — image column */}
            <div className="lg:w-[46%] relative rounded-[3rem] overflow-hidden min-h-[560px] shrink-0">
              <img
                src={IMG_PH_TEAM}
                alt="Philippine offshore team at KDCI"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* bottom copy */}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="text-[11px] text-white/50 font-black uppercase tracking-widest mb-2">Based in the Philippines</p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">World-class talent,<br/>timezone-friendly.</h3>
              </div>

              {/* floating stat badges */}
              <div className="absolute top-8 left-8 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E61739]/10 rounded-xl flex items-center justify-center">
                  <Users size={18} className="text-[#E61739]" />
                </div>
                <div>
                  <div className="text-lg font-black text-[#1D1D1F] leading-none">Top 1%</div>
                  <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">PH Talent Pool</div>
                </div>
              </div>
              <div className="absolute top-8 right-8 bg-white rounded-2xl shadow-xl px-5 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-[#E61739]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle2 size={18} className="text-[#E61739]" />
                </div>
                <div>
                  <div className="text-lg font-black text-[#1D1D1F] leading-none">70%</div>
                  <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest mt-0.5">Cost Savings</div>
                </div>
              </div>
            </div>

            {/* RIGHT — content column */}
            <div className="lg:w-[54%] flex flex-col justify-center">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
                  Expert Functions
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-5 tracking-tight leading-tight">Top Philippine Talent,<br/>Any Function.</h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">From creative studios to software pods, we source and embed the best offshore professionals the Philippines has to offer.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((cap, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E61739] shrink-0 group-hover:scale-110 transition-transform">
                      <cap.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F] leading-snug">{cap.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{cap.roles}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setView('contact')}
                className="mt-10 self-start flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all group"
              >
                View All Roles <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">

            {/* Left: title block */}
            <div className="shrink-0">
              <h2 className="text-3xl md:text-4xl font-heading font-bold whitespace-nowrap">How It Works.</h2>
              <p className="text-white/40 text-sm font-medium mt-2 max-w-[200px]" style={{ textWrap: 'balance' }}>From brief to embedded team in 14 days.</p>
            </div>

            {/* Vertical divider */}
            <div className="w-px bg-white/10 self-stretch hidden md:block shrink-0"></div>

            {/* Right: steps */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1 relative">
              <div className="hidden md:block absolute top-[1.35rem] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              {[
                { step: '01', title: 'Define Needs',        desc: 'Roles, seniority & team size.', icon: Target },
                { step: '02', title: 'Source & Vet',        desc: 'Top 1% of PH talent selected.', icon: Search },
                { step: '03', title: 'Onboard & Integrate', desc: 'Embed into your tools & timezone.', icon: Handshake },
                { step: '04', title: 'AI Management',       desc: 'QA, reporting & optimisation.', icon: Activity },
              ].map((s, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-11 h-11 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-4 group-hover:border-[#E61739] transition-all">
                    <s.icon size={18} />
                  </div>
                  <div className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-1">{s.step}</div>
                  <h4 className="text-sm font-bold mb-1">{s.title}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed font-medium">{s.desc}</p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 4. Industry Savings */}
      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">See the Savings.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Pick your industry and see the top 5 offshore roles — with KDCI's all-in monthly rate and how much you save vs US market equivalents.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">

            {/* Left: industry list */}
            <div className="bg-white rounded-3xl border border-black/5 p-3 shadow-sm">
              <div className="space-y-0.5 max-h-[520px] overflow-y-auto pr-1">
                {INDUSTRIES.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedInd(ind)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                      selectedInd.id === ind.id
                        ? 'bg-[#E61739] text-white shadow-sm'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <ind.icon size={15} className={selectedInd.id === ind.id ? 'text-white' : 'text-[#E61739]'} />
                    <span className="text-sm font-semibold leading-tight">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: savings panel */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white min-h-[520px] flex flex-col">

              {/* Panel header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <selectedInd.icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight">{selectedInd.name}</h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Top 5 Roles · KDCI Offshore Rate</p>
                </div>
              </div>

              {/* Role rows */}
              <div className="flex flex-col gap-2 flex-grow">
                {/* Column labels */}
                <div className="grid grid-cols-12 px-5 mb-1">
                  <span className="col-span-6 text-[10px] font-black uppercase tracking-widest text-white/25">Role</span>
                  <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-[#E61739]/70 text-center">KDCI / mo</span>
                  <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-white/25 text-center">vs US</span>
                </div>
                {(INDUSTRY_SAVINGS[selectedInd.id] ?? []).map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-5 py-4 border border-white/5">
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#E61739]/20 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-[#E61739] text-[10px] font-black">0{idx + 1}</span>
                      </div>
                      <span className="text-sm font-semibold text-white leading-tight">{row.role}</span>
                    </div>
                    <div className="col-span-3 text-center">
                      <span className="text-sm font-black text-white">{row.ph}</span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/15 border border-emerald-400/20 rounded-lg text-emerald-400 text-xs font-black">
                        <TrendingDown size={10} /> {row.save}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-xs font-medium">Indicative mid-level monthly rates · all-in, no hidden fees</p>
                <button
                  onClick={() => setView('contact')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] rounded-2xl text-white text-sm font-bold hover:bg-[#c51431] transition-colors"
                >
                  Hire in this vertical <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. ROI Calculator */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Quick ROI Calculator
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4 tracking-tight">Your Savings, Estimated.</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Adjust your headcount and role to see your estimated annual savings with a Philippine offshore team.</p>
          </div>

          <div className="bg-[#F5F5F7] rounded-[3rem] p-8 md:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">

              {/* Left: controls */}
              <div className="space-y-8">

                {/* Headcount slider */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-black text-slate-700 uppercase tracking-widest">Team Size</label>
                    <span className="text-2xl font-black text-[#E61739]">{calcHeadcount} <span className="text-sm text-slate-400 font-medium">people</span></span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={20}
                    value={calcHeadcount}
                    onChange={e => setCalcHeadcount(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{ accentColor: '#E61739' }}
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-1.5">
                    <span>1</span><span>5</span><span>10</span><span>15</span><span>20</span>
                  </div>
                </div>

                {/* Role selector */}
                <div>
                  <label className="block text-sm font-black text-slate-700 uppercase tracking-widest mb-3">Role Type</label>
                  <div className="grid grid-cols-1 gap-2">
                    {CALC_ROLES.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => setCalcRoleIdx(i)}
                        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold text-left transition-all border ${
                          calcRoleIdx === i
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <span>{r.label}</span>
                        <span className={`text-xs font-black ${calcRoleIdx === i ? 'text-[#E61739]' : 'text-slate-400'}`}>${r.ph.toLocaleString()}/mo</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: results */}
              {(() => {
                const role = CALC_ROLES[calcRoleIdx];
                const annualPH = calcHeadcount * role.ph * 12;
                const annualUS = calcHeadcount * role.us * 12;
                const annualSave = annualUS - annualPH;
                const savePct = Math.round((annualSave / annualUS) * 100);
                const threeYear = annualSave * 3;
                const fmt = (n: number) => '$' + n.toLocaleString('en-US');
                return (
                  <div className="flex flex-col gap-4">

                    {/* Savings highlight */}
                    <div className="bg-slate-900 rounded-3xl p-8 text-white text-center">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Estimated Annual Savings</p>
                      <div className="text-5xl md:text-6xl font-black text-white mb-1">{fmt(annualSave)}</div>
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/15 border border-emerald-400/20 rounded-lg text-emerald-400 text-sm font-black mt-2">
                        <TrendingDown size={14} /> {savePct}% saved vs US hiring
                      </div>
                    </div>

                    {/* Breakdown cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white rounded-2xl p-5 border border-slate-200">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">KDCI Annual Cost</p>
                        <div className="text-2xl font-black text-[#E61739]">{fmt(annualPH)}</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{fmt(role.ph)}/mo × {calcHeadcount} staff</p>
                      </div>
                      <div className="bg-white rounded-2xl p-5 border border-slate-200">
                        <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">US Equivalent Cost</p>
                        <div className="text-2xl font-black text-slate-400 line-through">{fmt(annualUS)}</div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{fmt(role.us)}/mo market avg</p>
                      </div>
                    </div>

                    {/* 3-year callout */}
                    <div className="bg-[#E61739]/6 border border-[#E61739]/15 rounded-2xl px-6 py-4 flex items-center justify-between">
                      <div>
                        <p className="text-[9px] font-black uppercase tracking-widest text-[#E61739]/70 mb-0.5">3-Year Total Savings</p>
                        <div className="text-2xl font-black text-[#E61739]">{fmt(threeYear)}</div>
                      </div>
                      <button onClick={() => setView('contact')} className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-colors shrink-0">
                        Get a Proposal <ArrowRight size={14} />
                      </button>
                    </div>

                    <p className="text-[10px] text-slate-400 text-center font-medium">Estimates based on mid-level market averages. Actual savings may vary.</p>
                  </div>
                );
              })()}

            </div>
          </div>

        </div>
      </section>

      {/* 6. Why Choose KDCI.ai */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24">
             <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-6 tracking-tight">The KDCI Offshore Advantage.</h2>
             <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto">Why global teams choose the Philippines — and KDCI — to scale.</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: UserPlus, title: 'Embedded Full-Time Roles', desc: 'No freelancers. Dedicated professionals who become a part of your company culture.' },
              { icon: Activity, title: 'AI-Managed Backend', desc: 'Automatic reporting, quality audits, and performance tracking built-in.' },
              { icon: Coins, title: 'Transparent Pricing', desc: 'Clear, monthly rates with zero hidden overheads or hiring fees.' },
              { icon: Workflow, title: 'Scalable Support', desc: 'Add staff or managed pods in as little as 14 days to hit your milestones.' }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-[#F5F5F7] rounded-3xl flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
                  <item.icon size={32} />
                </div>
                <h4 className="text-lg font-bold text-[#1D1D1F] mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[4rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img 
                src={IMG_STAFF_AUG_HERO} 
                alt="KDCI Staff Augmentation" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Your Philippine Offshore<br/><span className="text-shine-red">Team Starts Here.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Tell us your goals and we’ll match you with full-time Philippine professionals — embedded in your team, managed by AI, and ready in 14 days.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Request a Custom Quote <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
