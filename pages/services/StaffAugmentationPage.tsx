
import React, { useState } from 'react';
import { ArrowRight, Headphones, Palette, Code, UserCircle, Coins, UserPlus, Home, Database, Users, BrainCircuit, Workflow, Target, Search, Handshake, Activity, CheckCircle2 } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_STAFF_AUG_HERO } from '../../data';
import IMG_PH_TEAM from '../../attached_assets/Gemini_Generated_Image_8gr4nc8gr4nc8gr4_1777973290700.png';

export const StaffAugmentationPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState(0);

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

  const pricingCategories = [
    {
      name: 'Customer Service',
      roles: [
        { title: 'Support Specialist', junior: '$1,800', mid: '$2,300', senior: '$2,800', desc: 'Handles high-volume voice, chat, and email tickets with high empathy.' },
        { title: 'Technical Support', junior: '$2,000', mid: '$2,600', senior: '$3,200', desc: 'Troubleshooting and software guidance for SaaS/Tech platforms.' },
        { title: 'CS Team Lead', junior: '$2,400', mid: '$3,000', senior: '$3,800', desc: 'Manages agent performance, QA scores, and shift scheduling.' }
      ]
    },
    {
      name: 'Software Development',
      roles: [
        { title: 'Full-Stack Developer', junior: '$2,200', mid: '$3,500', senior: '$4,500', desc: 'React/Node or Laravel/Vue engineering in your native stack.' },
        { title: 'QA Engineer', junior: '$1,800', mid: '$2,800', senior: '$3,800', desc: 'Manual and automated testing with deep documentation focus.' },
        { title: 'DevOps Engineer', junior: '$2,500', mid: '$3,800', senior: '$5,000', desc: 'CI/CD pipeline management, cloud infrastructure, and security.' }
      ]
    },
    {
      name: 'Creative & Design',
      roles: [
        { title: 'Graphic Designer', junior: '$1,800', mid: '$2,400', senior: '$3,000', desc: 'Marketing collateral, social kits, and digital brand assets.' },
        { title: 'Video Editor', junior: '$2,000', mid: '$2,800', senior: '$3,600', desc: 'Short-form social ads and high-end brand storytelling.' },
        { title: 'UI/UX Designer', junior: '$2,200', mid: '$3,200', senior: '$4,200', desc: 'Wireframing, prototyping, and high-fidelity product design.' }
      ]
    },
    {
      name: 'Admin & VA',
      roles: [
        { title: 'Executive Assistant', junior: '$1,800', mid: '$2,300', senior: '$2,800', desc: 'Calendar management, travel, and high-level project sync.' },
        { title: 'Virtual Assistant', junior: '$1,500', mid: '$1,900', senior: '$2,400', desc: 'General operational support and back-office management.' },
        { title: 'Project Coordinator', junior: '$1,900', mid: '$2,500', senior: '$3,200', desc: 'Managing timelines, resources, and stakeholder communication.' }
      ]
    },
    {
      name: 'Accounting & Finance',
      roles: [
        { title: 'Bookkeeper', junior: '$1,800', mid: '$2,300', senior: '$2,900', desc: 'AP/AR, reconciliations, and monthly financial reporting.' },
        { title: 'Financial Analyst', junior: '$2,200', mid: '$3,000', senior: '$4,000', desc: 'Forecasting, budget tracking, and KPI monitoring.' },
        { title: 'Payroll Specialist', junior: '$1,900', mid: '$2,400', senior: '$3,000', desc: 'Processing global payroll, compliance, and benefits admin.' }
      ]
    },
    {
      name: 'HR & Recruitment',
      roles: [
        { title: 'Talent Sourcer', junior: '$1,800', mid: '$2,300', senior: '$2,800', desc: 'LinkedIn sourcing and initial candidate vetting pipelines.' },
        { title: 'HR Administrator', junior: '$1,700', mid: '$2,100', senior: '$2,600', desc: 'Onboarding, payroll sync, and employee record management.' },
        { title: 'Recruiter (Full Cycle)', junior: '$2,000', mid: '$2,800', senior: '$3,500', desc: 'Managing end-to-end hiring from screening to offer negotiation.' }
      ]
    },
    {
      name: 'Real Estate Support',
      roles: [
        { title: 'Property Assistant', junior: '$1,800', mid: '$2,300', senior: '$2,800', desc: 'Leasing admin, tenant queries, and maintenance dispatch.' },
        { title: 'TC (Transaction Coord)', junior: '$1,900', mid: '$2,500', senior: '$3,200', desc: 'Escrow paperwork, compliance, and real estate documents.' },
        { title: 'Inside Sales Agent (ISA)', junior: '$1,800', mid: '$2,400', senior: '$3,000', desc: 'Lead qualification, cold calling, and appointment setting.' }
      ]
    },
    {
      name: 'eCommerce Support',
      roles: [
        { title: 'Listing Specialist', junior: '$1,700', mid: '$2,100', senior: '$2,600', desc: 'Amazon/Shopify product descriptions and catalog sync.' },
        { title: 'Order Coordinator', junior: '$1,600', mid: '$2,000', senior: '$2,500', desc: 'Shipping exceptions and warehouse communication.' },
        { title: 'Inventory Planner', junior: '$2,000', mid: '$2,700', senior: '$3,500', desc: 'Demand forecasting, stock balancing, and supplier liaison.' }
      ]
    },
    {
      name: 'Marketing & Content',
      roles: [
        { title: 'Digital Ad Specialist', junior: '$2,200', mid: '$3,000', senior: '$4,200', desc: 'FB/Google ad management and ROI tracking.' },
        { title: 'Content Writer', junior: '$1,800', mid: '$2,300', senior: '$2,800', desc: 'SEO blogs, whitepapers, and high-conversion landing page copy.' },
        { title: 'SEO Specialist', junior: '$1,900', mid: '$2,600', senior: '$3,400', desc: 'Keyword strategy, on-page optimization, and backlink building.' }
      ]
    },
    {
      name: 'Data & Back Office',
      roles: [
        { title: 'Data Entry Operator', junior: '$1,400', mid: '$1,700', senior: '$2,000', desc: 'High-speed data digitization and database maintenance.' },
        { title: 'Verification Agent', junior: '$1,500', mid: '$1,800', senior: '$2,200', desc: 'Doc verification, background checks, and KYC workflows.' },
        { title: 'Data Analyst', junior: '$2,100', mid: '$2,900', senior: '$3,800', desc: 'Cleaning data, creating dashboards, and generating insights.' }
      ]
    }
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
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">Top 1%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Philippines Talent</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">14 Days</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Typical Launch Time</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">70%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Average OpEx Savings</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">24/7</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Managed Operations</p>
            </div>
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
      <section className="py-14 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold">How It Works.</h2>
              <p className="text-white/40 text-sm font-medium mt-1">Four steps from brief to embedded team.</p>
            </div>
            <button onClick={() => setView('contact')} className="self-start md:self-auto flex items-center gap-2 px-6 py-3 bg-[#E61739] text-white rounded-xl font-bold text-sm hover:bg-[#c51431] transition-all group shrink-0">
              Get Started <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Connecting line — sits behind the nodes */}
            <div className="hidden md:block absolute top-[22px] left-[calc(12.5%-1px)] right-[calc(12.5%-1px)] h-[2px]" style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(230,23,57,0.25) 15%, rgba(230,23,57,0.5) 50%, rgba(230,23,57,0.25) 85%, transparent 100%)' }} />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
              {[
                { step: '01', title: 'Define Needs', desc: 'Tell us the roles, seniority, and team size you need.', icon: Target },
                { step: '02', title: 'Source & Vet', desc: 'We select the top 1% of Philippine talent for your brief.', icon: Search },
                { step: '03', title: 'Onboard & Integrate', desc: 'Staff embed into your tools, timezone, and workflows.', icon: Handshake },
                { step: '04', title: 'AI Management', desc: 'Automated QA, reporting, and performance tracking kicks in.', icon: Activity },
              ].map((s, idx) => (
                <div key={idx} className="flex flex-col items-center text-center group">
                  {/* Node */}
                  <div className="relative mb-5">
                    <div className="w-11 h-11 rounded-full bg-slate-800 border-2 border-slate-700 group-hover:border-[#E61739] group-hover:bg-[#E61739]/10 flex items-center justify-center text-[#E61739] transition-all duration-300 relative z-10">
                      <s.icon size={18} />
                    </div>
                    {/* pulse ring on hover */}
                    <div className="absolute inset-0 rounded-full border border-[#E61739]/0 group-hover:border-[#E61739]/30 group-hover:scale-150 transition-all duration-500" />
                  </div>
                  {/* Content */}
                  <div className="text-[#E61739] text-[9px] font-black uppercase tracking-widest mb-1">{s.step}</div>
                  <h4 className="text-sm font-bold text-white mb-1 leading-snug">{s.title}</h4>
                  <p className="text-[11px] text-white/35 leading-relaxed font-medium max-w-[160px]">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 4. Interactive Pricing Section */}
      <section className="py-32 bg-[#F5F5F7] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-6 tracking-tight">Transparent Offshore Pricing.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto">All-inclusive monthly rates for full-time Philippine professionals — no hidden fees, no surprise markups.</p>
          </div>

          {/* Category Selector */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              {pricingCategories.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedCategory(idx)}
                  className={`px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all border ${
                    selectedCategory === idx 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xl scale-105' 
                      : 'bg-white text-slate-400 border-slate-100 hover:border-slate-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Role Cards */}
          <div className="grid grid-cols-1 gap-6 mb-20">
            {pricingCategories[selectedCategory].roles.map((role, idx) => (
              <div key={idx} className="bg-white rounded-[2.5rem] border border-black/[0.04] p-8 md:p-12 hover:shadow-2xl transition-all group overflow-hidden">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-10">
                  <div className="lg:w-1/3">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#1D1D1F] mb-4 group-hover:text-[#E61739] transition-colors">{role.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed">{role.desc}</p>
                    <button onClick={() => setView('contact')} className="mt-8 px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all">Request This Role</button>
                  </div>
                  <div className="lg:w-2/3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { level: 'Junior', price: role.junior },
                        { level: 'Mid-Level', price: role.mid, best: true },
                        { level: 'Senior', price: role.senior }
                      ].map((tier, i) => (
                        <div key={i} className={`p-8 rounded-3xl text-center relative overflow-hidden transition-all ${tier.best ? 'bg-white border-2 border-slate-900 shadow-lg scale-105' : 'bg-slate-50 border border-slate-100 opacity-60 hover:opacity-100'}`}>
                          {tier.best && <div className="absolute top-0 left-0 right-0 h-1 bg-[#E61739]"></div>}
                          <div className={`text-[10px] font-black uppercase tracking-widest mb-2 ${tier.best ? 'text-[#E61739]' : 'text-slate-400'}`}>{tier.level} (From)</div>
                          <div className="text-3xl font-black text-[#1D1D1F] mb-1">{tier.price}</div>
                          <div className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">/ MONTH</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div className="pt-20 border-t border-slate-200">
             <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-[#1D1D1F] mb-2">Operational Multipliers</h3>
                <p className="text-slate-400 font-medium">Standard add-ons to boost your team's output.</p>
             </div>
             <div className="grid md:grid-cols-3 gap-6">
                {[
                  { title: "Team Lead Oversight", price: "+$700/mo", desc: "Local performance management and SOP adherence.", icon: Users },
                  { title: "AI Workflow Layer", price: "+$500/mo", desc: "Reporting, automated QA, and sentiment tools.", icon: BrainCircuit },
                  { title: "Dedicated PM", price: "+$900/mo", desc: "Strategic roadmap planning and resource sync.", icon: Workflow }
                ].map((addon, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-dashed border-slate-300 flex items-center gap-6 group hover:border-[#E61739]/50 transition-colors shadow-sm">
                     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#E61739] group-hover:bg-[#E61739] group-hover:text-white transition-colors"><addon.icon size={24} /></div>
                     <div className="text-left">
                        <div className="flex items-center justify-between gap-4">
                           <h4 className="text-sm font-bold text-[#1D1D1F]">{addon.title}</h4>
                           <span className="text-xs font-black text-[#E61739]">{addon.price}</span>
                        </div>
                        <p className="text-[10px] text-slate-500 font-medium">{addon.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 5. Why Choose KDCI.ai */}
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
