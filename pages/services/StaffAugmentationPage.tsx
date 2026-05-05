
import React from 'react';
import { ArrowRight, Headphones, Palette, Code, UserCircle, Coins, UserPlus, Home, Database, Users, Workflow, Target, Search, Handshake, Activity, CheckCircle2, Globe, GraduationCap, Clock, TrendingDown, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_STAFF_AUG_HERO } from '../../data';
import IMG_PH_TEAM from '../../attached_assets/Gemini_Generated_Image_8gr4nc8gr4nc8gr4_1777973290700.png';

export const StaffAugmentationPage = ({ setView }: { setView: (v: ViewType) => void }) => {

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

      {/* 4. Salary Comparison Table */}
      <section className="py-24 bg-[#F5F5F7] rounded-t-[5rem]">
        <div className="max-w-6xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Cost Comparison
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4 tracking-tight">See the Savings.</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">Full-time Philippine professionals at a fraction of US, UK, or AU equivalent salaries — all-in, no hidden fees.</p>
          </div>

          {/* Table */}
          <div className="bg-white rounded-3xl border border-black/[0.05] overflow-hidden shadow-sm">

            {/* Column headers */}
            <div className="grid grid-cols-6 bg-slate-900 text-white px-6 py-4">
              <div className="col-span-2 text-xs font-black uppercase tracking-widest text-white/60">Role</div>
              <div className="text-xs font-black uppercase tracking-widest text-[#E61739] text-center">KDCI / PH</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/40 text-center">🇺🇸 US</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/40 text-center">🇬🇧 UK</div>
              <div className="text-xs font-black uppercase tracking-widest text-white/40 text-center">Savings</div>
            </div>

            {/* Rows */}
            {[
              { role: 'Customer Support Specialist', cat: 'Customer Service', ph: '$1,800',  us: '$4,500',  uk: '$3,800',  save: '60%' },
              { role: 'Full-Stack Developer',         cat: 'Engineering',      ph: '$2,800',  us: '$10,000', uk: '$7,500',  save: '72%' },
              { role: 'UI/UX Designer',               cat: 'Creative',         ph: '$2,200',  us: '$7,500',  uk: '$5,500',  save: '71%' },
              { role: 'Executive Assistant',          cat: 'Admin & VA',       ph: '$1,800',  us: '$5,000',  uk: '$3,800',  save: '64%' },
              { role: 'Digital Marketing Specialist', cat: 'Marketing',        ph: '$2,000',  us: '$6,000',  uk: '$4,500',  save: '67%' },
              { role: 'Data Analyst',                 cat: 'Data & Analytics', ph: '$2,500',  us: '$7,500',  uk: '$5,500',  save: '67%' },
              { role: 'Bookkeeper',                   cat: 'Finance',          ph: '$1,800',  us: '$4,800',  uk: '$3,600',  save: '63%' },
              { role: 'Project Manager',              cat: 'Operations',       ph: '$2,800',  us: '$9,000',  uk: '$7,000',  save: '69%' },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-6 px-6 py-4 items-center border-t border-slate-100 group hover:bg-slate-50 transition-colors ${i % 2 === 0 ? '' : 'bg-slate-50/40'}`}>
                <div className="col-span-2">
                  <div className="text-sm font-bold text-slate-900">{row.role}</div>
                  <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wide mt-0.5">{row.cat}</div>
                </div>
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-[#E61739]/8 rounded-lg text-[#E61739] text-sm font-black">{row.ph}</span>
                  <div className="text-[9px] text-slate-400 font-medium mt-0.5">/ mo</div>
                </div>
                <div className="text-center text-sm font-semibold text-slate-400">{row.us}<div className="text-[9px] font-medium text-slate-300">/ mo</div></div>
                <div className="text-center text-sm font-semibold text-slate-400">{row.uk}<div className="text-[9px] font-medium text-slate-300">/ mo</div></div>
                <div className="text-center">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 border border-emerald-100 rounded-lg text-emerald-600 text-xs font-black">
                    <TrendingDown size={11} /> {row.save}
                  </span>
                </div>
              </div>
            ))}

            {/* Footer note */}
            <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <p className="text-[11px] text-slate-400 font-medium">Rates shown are indicative mid-level monthly all-in costs in USD. US/UK figures based on market averages.</p>
              <button onClick={() => setView('contact')} className="shrink-0 flex items-center gap-2 px-6 py-2.5 bg-slate-900 text-white rounded-xl font-bold text-xs hover:bg-black transition-all group">
                Get an Exact Quote <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
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
