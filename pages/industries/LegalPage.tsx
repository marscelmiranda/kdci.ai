
import React, { useState } from 'react';
import { ArrowRight, Gavel, Scale, FileText, Shield, Search, Phone, DollarSign, Building, Scroll, BrainCircuit, CheckCircle2, MessageSquare, Lock, Users, Activity, Settings2 } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_LEGAL_HERO as HERO_IMG, IMG_LEGAL_TEAM as TEAM_IMG } from '../../data';

export const LegalPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className={`relative bg-[#020202] overflow-hidden pt-48 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Legal Operations" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Legal Support" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Legal Ops</span><br/>
            <span className="text-[#E61739]">Precision.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Confidential paralegal and administrative support for law firms and legal tech companies. Secure, accurate, and cost-effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Get Started <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- Stats Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">100%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Accuracy QA</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">Strict</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">NDA Security</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">60%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Cost Savings</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">24h</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Turnaround</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Legal Services</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Do.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">From document review to intake, we handle the critical tasks that keep your practice moving.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: FileText, title: "Document Review", desc: "First-pass review of contracts, discovery documents, and case files." },
              { icon: Phone, title: "Case Intake", desc: "Screening potential clients, gathering case details, and scheduling consultations." },
              { icon: MessageSquare, title: "Transcription", desc: "Accurate transcription of depositions, hearings, and client meetings." },
              { icon: DollarSign, title: "Billing & Invoicing", desc: "Managing time entries, expense tracking, and client billing cycles." },
              { icon: Scale, title: "Paralegal Support", desc: "Research, drafting pleadings, and organizing case exhibits." },
              { icon: Scroll, title: "Contract Admin", desc: "Managing contract lifecycles, renewals, and database updates." }
            ].map((s, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 transition-transform">
                  <s.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
             <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
             <div className="relative z-10 w-16 h-16 shrink-0 bg-[#E61739] rounded-2xl flex items-center justify-center">
               <Shield size={32} />
             </div>
             <div className="relative z-10">
               <h4 className="text-2xl font-bold mb-2">Confidentiality Assured</h4>
               <p className="text-white/60 font-medium">We operate under strict NDA protocols with secure, monitored environments to protect sensitive client data.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Who We Help */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-16">Who We Help.</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {[
               { icon: Building, name: "Law Firms" },
               { icon: Scale, name: "Legal Tech" },
               { icon: Users, name: "Corp Counsel" },
               { icon: Gavel, name: "Solo Practice" },
               { icon: FileText, name: "Court Reporters" }
             ].map((type, i) => (
               <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-[#E61739]/30 transition-all">
                  <type.icon size={32} className="text-slate-300 group-hover:text-[#E61739] transition-colors mb-4" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">{type.name}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Secure Onboarding.</h2>
            <p className="text-slate-500 text-xl font-medium">Deploying legal support with enterprise-grade security.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-[1px] bg-slate-100"></div>
            {[
              { step: '01', title: 'Security Audit', desc: 'Establishing secure VPN and access protocols.', icon: Lock },
              { step: '02', title: 'Vetting', desc: 'Selecting staff with legal background and impeccable records.', icon: Search },
              { step: '03', title: 'Secure Access', desc: 'Integration with your case management software.', icon: Shield },
              { step: '04', title: 'QA Workflow', desc: 'Establishing double-check procedures for accuracy.', icon: CheckCircle2 }
            ].map((s, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-400 mb-8 group-hover:border-[#E61739] group-hover:text-[#E61739] transition-all">
                  <s.icon size={24} />
                </div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-widest mb-2">{s.step}</div>
                <h4 className="text-xl font-bold mb-2 text-slate-900">{s.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI-Managed Ops Layer */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
         <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
                    <BrainCircuit size={12} /> The Intelligence Layer
                  </div>
                  <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">Legal <br/><span className="text-[#E61739]">Augmentation.</span></h2>
                  <p className="text-xl text-white/40 mb-12 leading-relaxed font-medium">
                    We use AI to accelerate document review, contract analysis, and redaction, allowing your legal team to focus on strategy and counsel.
                  </p>
                  
                  <div className="space-y-8">
                     {[
                       { title: "Contract Analysis", desc: "AI tools to quickly identify key clauses and risks." },
                       { title: "E-Discovery", desc: "Accelerated sorting and tagging of discovery documents." },
                       { title: "Auto-Redaction", desc: "Automated removal of sensitive information from filings." },
                       { title: "Legal Research", desc: "AI-assisted case law research and summarization." }
                     ].map((feat, idx) => (
                       <div key={idx} className="flex gap-6">
                          <div className="w-10 h-10 shrink-0 bg-[#E61739]/20 rounded-xl flex items-center justify-center text-[#E61739] border border-[#E61739]/30">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                             <h4 className="text-lg font-bold mb-1">{feat.title}</h4>
                             <p className="text-sm text-white/40 font-medium">{feat.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="bg-white/5 rounded-[4rem] p-12 border border-white/10 backdrop-blur-xl shadow-2xl">
                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                           <div className="h-8 w-20 bg-[#E61739]/40 rounded-lg"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
                           <div className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
                        </div>
                        <div className="h-48 bg-white/5 rounded-3xl border border-white/5"></div>
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 bg-[#E61739] p-8 rounded-[3rem] shadow-2xl hidden md:block">
                     <div className="text-3xl font-black mb-1">AI</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Contract Review</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Pricing Overview */}
      <section className="py-32 bg-[#F5F5F7] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Transparent Pricing.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto mb-10">Cost-effective roles for legal support.</p>

            {/* Toggle */}
            <div className="inline-flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm mb-12">
              <button 
                onClick={() => setPricingModel('outcomes')}
                className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                  pricingModel === 'outcomes' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                Outcomes
              </button>
              <button 
                onClick={() => setPricingModel('staff-aug')}
                className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                  pricingModel === 'staff-aug' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                Staff Augmentation
              </button>
            </div>
          </div>

          {pricingModel === 'outcomes' ? (
            <div className="grid md:grid-cols-3 gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { 
                  name: "Case Intake", 
                  price: "$2,000", 
                  desc: "Qualified lead processing.", 
                  features: ["Lead Screening", "Document Collection", "Scheduling", "Conflict Checking"], 
                  highlight: false 
                },
                { 
                  name: "Managed Review", 
                  price: "Custom", 
                  desc: "High-volume document review.", 
                  features: ["Dedicated Review Team", "QA Oversight", "E-Discovery Support", "Daily Progress Reports"], 
                  highlight: true, 
                  badge: "Litigation Support" 
                },
                { 
                  name: "Doc Preparation", 
                  price: "$2,500", 
                  desc: "Drafting & filing support.", 
                  features: ["Pleading Drafts", "Contract Analysis", "Exhibit Organization", "Filing Prep"], 
                  highlight: false 
                }
              ].map((plan, i) => (
                <div key={i} className={`p-10 rounded-[3.5rem] relative transition-all ${plan.highlight ? 'bg-slate-900 text-white shadow-2xl scale-105 border-0' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'}`}>
                  {plan.badge && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">{plan.badge}</div>}
                  <h4 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${plan.highlight ? 'text-white/40' : 'text-slate-400'}`}>{plan.highlight ? '/mo' : ''}</span>
                  </div>
                  <p className={`text-sm mb-8 font-medium ${plan.highlight ? 'text-white/50' : 'text-slate-500'}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80">
                        <CheckCircle2 size={16} className="text-[#E61739]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setView('contact')} className={`w-full py-4 rounded-[2rem] font-bold text-lg transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-xl' : 'bg-slate-900 text-white hover:bg-black'}`}>
                    {plan.name === "Managed Review" ? "Request Custom Quote" : "Request Plan"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { role: "Legal Assistant", price: "$1,900", focus: "Admin", focusIcon: FileText, desc: "Managing calendars, filing, and correspondence." },
                { role: "Intake Specialist", price: "$1,800", focus: "Client", focusIcon: Phone, desc: "Screening new leads and gathering initial facts." },
                { role: "Billing Coord", price: "$2,000", focus: "Finance", focusIcon: DollarSign, desc: "Handling invoices, time entries, and expenses." },
                { role: "Paralegal", price: "$2,400", focus: "Case", focusIcon: Scale, desc: "Research, drafting, and case management support." }
              ].map((plan, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-black/[0.03] hover:shadow-2xl transition-all group flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{plan.role}</h4>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4 flex items-center gap-1.5"><plan.focusIcon size={12} />{plan.focus}</div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">/ MONTH</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-10 flex-grow font-medium">{plan.desc}</p>
                  <button onClick={() => setView('contact')} className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#E61739] hover:text-white transition-all">Select Role</button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 p-8 bg-white/60 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-300 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] shadow-sm"><Search size={24} /></div>
                <div>
                   <h4 className="text-lg font-bold text-slate-900">Need Research Support?</h4>
                   <p className="text-sm text-slate-500 font-medium">Dedicated researchers for case law and precedent analysis.</p>
                </div>
             </div>
             <button onClick={() => setView('contact')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">Contact Sales</button>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: Shield, title: "Detail Obsessed", desc: "Rigorous QA processes for zero-error tolerance." },
              { icon: Lock, title: "Data Privacy", desc: "Enterprise-grade security infrastructure for sensitive files." },
              { icon: Scale, title: "Legal Background", desc: "Staff with law degrees or paralegal certifications." },
              { icon: Users, title: "Scalable Support", desc: "Ramp up support for large cases or busy periods." }
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

      {/* 8. Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img src={TEAM_IMG} alt="Legal Team" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Scale Your <br/><span className="text-shine-red">Legal Practice.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Book a consultation with our legal operations specialists.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Request Legal Quote <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
