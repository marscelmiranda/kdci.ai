
import React from 'react';
import { ArrowRight, Sparkles, Briefcase, ScanSearch, UserCheck, ClipboardCheck, Workflow, Rocket, Globe, Cpu, Handshake, ShoppingCart, Code, Building, Landmark, BrainCircuit, Globe2, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_REC_HERO, IMG_REC_VETTING } from '../../data';

export const AgenticRecruitmentPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className={`relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img 
            src={IMG_REC_HERO} 
            alt="KDCI Recruitment Hub" 
            className="w-full h-full object-cover opacity-20 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Smart Recruitment" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Smarter, Faster</span><br/>
            <span className="text-[#E61739]">Recruitment.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            KDCI.ai combines the intuition of expert Philippine sourcing teams with agentic AI to find, vet, and place high-performance talent 3x faster than traditional agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Start Hiring <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-md">
              Request Pricing
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">5,000+</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Hires Sourced</p></div>
            <div><div className="text-xl md:text-2xl font-black">14 Days</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Avg. Time-to-Fill</p></div>
            <div><div className="text-xl md:text-2xl font-black">70%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Typical Cost Savings</p></div>
            <div><div className="text-xl md:text-2xl font-black">Top 1%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Vetting Standard</p></div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100">
              <Sparkles size={12} /> Recruitment Hub
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 tracking-tight">Smarter Hiring with <br /><span className="text-[#E61739]">Embedded Recruiters + AI</span></h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              KDCI.ai delivers full-cycle recruitment services powered by expert talent acquisition professionals and AI tools that enhance speed, quality, and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Briefcase, title: "Full-Cycle Support", desc: "End-to-end recruitment for technical, creative, and support roles." },
              { icon: ScanSearch, title: "AI-Enhanced Sourcing", desc: "Advanced talent sourcing and automated resume screening algorithms." },
              { icon: UserCheck, title: "Human-Led Vetting", desc: "Deep technical interviews and shortlisting by domain experts." },
              { icon: ClipboardCheck, title: "Pipeline Transparency", desc: "Seamless interview coordination and real-time pipeline reporting." },
              { icon: Workflow, title: "Native Integration", desc: "Works directly with your existing ATS and internal hiring tools." },
              { icon: Rocket, title: "On-Demand Scale", desc: "Scalable support for single hires or high-volume department ramp-ups." },
            ].map((cap, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-[#F5F5F7] border border-black/[0.02] hover:bg-white hover:shadow-2xl transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E61739] mb-6 group-hover:scale-110 transition-transform">
                  <cap.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-2">{cap.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
             <div className="p-8 rounded-[3rem] bg-[#1D1D1F] text-white lg:col-span-3 flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
                <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
                <div className="relative z-10 w-16 h-16 shrink-0 bg-[#E61739] rounded-2xl flex items-center justify-center">
                  <Globe size={32} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-2xl font-bold mb-2">Elite Philippines Talent Hub</h4>
                  <p className="text-white/60 font-medium">Focused exclusively on sourcing the top-tier 1% of talent from the Philippines to build your global team.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Built for Speed.</h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Our AI-augmented recruitment lifecycle ensures you never waste time on sub-par candidates.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            {[
              { step: "01", title: "Discovery", desc: "KPI targets & cultural fit.", icon: ScanSearch },
              { step: "02", title: "AI Sourcing", desc: "100k+ global profiles scan.", icon: Cpu },
              { step: "03", title: "Screening", desc: "Technical skill scoring.", icon: ClipboardCheck },
              { step: "04", title: "Shortlist", desc: "Top 3 curated interviews.", icon: UserCheck },
              { step: "05", title: "Success", desc: "Onboarding & management.", icon: Handshake }
            ].map((s, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-8 group-hover:border-[#E61739] group-hover:bg-slate-900 transition-all shadow-lg"><s.icon size={24} /></div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-[0.2em] mb-2">{s.step}</div>
                <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Industry Specialization.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">Our recruiters understand the technical nuances of your vertical — sourcing talent that hits the ground running.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'E-commerce', icon: ShoppingCart, roles: ['Visual Search Engineers', 'Growth Marketers', 'Catalog Specialists'] },
              { name: 'SaaS & Tech', icon: Code, roles: ['LLM Managers', 'Prompt Engineers', 'Cloud Architects'] },
              { name: 'Real Estate', icon: Building, roles: ['PropTech Modelers', 'Valuation Leads', 'Predictive Analysts'] },
              { name: 'Fintech', icon: Landmark, roles: ['Fraud Detection Leads', 'Compliance Automators', 'FinBot Developers'] }
            ].map((ind, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-[3rem] border border-black/[0.02] hover:bg-white hover:shadow-2xl transition-all group h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E61739] mb-6 group-hover:scale-110 transition-transform"><ind.icon size={24} /></div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 leading-tight">{ind.name}</h4>
                <div className="flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Targeted Roles</div>
                  <ul className="space-y-3">{ind.roles.map((role, idx) => (<li key={idx} className="flex items-start gap-3 text-[11px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors"><div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#E61739] mt-1.5 opacity-30"></div>{role}</li>))}</ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Flexible Talent Models.</h2>
            <p className="text-slate-500 text-lg font-medium">Pricing that scales with your growth velocity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {[
              { name: "Contingency", price: "10-15%", desc: "Pay only when you hire.", features: ["Expert Sourcing", "ATS Management", "Standard Guarantee", "Full Vetting"], highlight: false },
              { name: "Subscription", price: "$2,000", desc: "Monthly talent delivery.", features: ["Infinite Pipeline", "Priority Sourcing", "Extended Guarantee", "Custom Skill Tests"], highlight: true, badge: "Most Popular" },
              { name: "Embedded", price: "$1,800", desc: "A recruiter inside your team.", features: ["Dedicated Lead", "Employer Branding", "Native Tool Integration", "Process Optimization"], highlight: false }
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-[3.5rem] relative transition-all ${plan.highlight ? 'bg-slate-900 text-white shadow-2xl scale-105 border-0' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'}`}>
                {plan.badge && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">{plan.badge}</div>}
                <h4 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h4>
                <div className="flex items-baseline gap-1 mb-4"><span className="text-4xl font-black">{plan.price}</span><span className={`text-xs font-black uppercase tracking-widest ${plan.highlight ? 'text-white/40' : 'text-slate-400'}`}>{plan.highlight ? '/mo' : 'salary'}</span></div>
                <p className={`text-sm mb-8 font-medium ${plan.highlight ? 'text-white/50' : 'text-slate-500'}`}>{plan.desc}</p>
                <ul className="space-y-3 mb-10">{plan.features.map((f, idx) => (<li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80"><CheckCircle2 size={16} className="text-[#E61739]" /> {f}</li>))}</ul>
                <button onClick={() => setView('contact')} className={`w-full py-4 rounded-[2rem] font-bold text-lg transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-xl' : 'bg-slate-900 text-white hover:bg-black'}`}>Request Plan</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Vetting Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative"><div className="bg-slate-100 rounded-[4rem] aspect-[4/5] overflow-hidden relative shadow-2xl"><img src={IMG_REC_VETTING} alt="Agent vetting" className="absolute inset-0 w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div><div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-8 rounded-[3rem] shadow-2xl border border-white/5"><div className="text-3xl font-black text-slate-900 mb-1">70%</div><p className="text-slate-500 text-xs font-black uppercase tracking-widest">Typical OpEx Reduction</p></div></div></div>
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The Recruitment <br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-10">
                {[
                  { title: "AI + Human Hybrid", desc: "Algorithmic speed meets deep talent intuition for perfect cultural fit.", icon: BrainCircuit },
                  { title: "Offshore Efficiency", desc: "Access the Philippines' top 1% at high-velocity local market rates.", icon: Globe2 },
                  { title: "High-Caliber Vetting", desc: "We test for technical mastery, EQ, and alignment with your goals.", icon: ShieldCheck }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group"><div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl shrink-0 flex items-center justify-center text-[#E61739] group-hover:scale-110 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm"><item.icon size={24} /></div><div><h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4><p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p></div></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img 
                src={IMG_REC_HERO} 
                alt="Recruitment Team" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Build your <br/><span className="text-shine-red">dream team.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Book a strategy session with our talent leads and get a customized sourcing plan.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Book Recruitment Strategy <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
