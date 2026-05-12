
import React, { useState } from 'react';
import { ArrowRight, MousePointer2, MessageSquare, RefreshCw, Home, FileText, Wrench, BarChart, Building, Building2, Plane, Landmark, Rocket, BrainCircuit, CheckCircle2, Users, Zap, TrendingUp, GraduationCap, Layers, Settings2, CheckCircle as CheckIcon, Target, UserCheck, Handshake, Activity } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_PROP_HERO, IMG_PROP_TEAM } from '../../data';

export const PropertyManagementPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');

  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className={`relative bg-[#020202] overflow-hidden pt-48 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img src={IMG_PROP_HERO} alt="Property Ops" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        {/* Accenture Inspired Hero Background Blobs */}
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Property Support" parent={{ name: 'Solutions', view: 'solutions-hub' }} align="left" />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Smarter Property</span><br/>
            <span className="text-[#E61739]">Operations.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Helping property teams reduce cost and speed up workflows with full-time offshore staff supported by AI systems.
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
              <div className="text-xl md:text-2xl font-black mb-1">70%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Avg OpEx Savings</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">24/7</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Global Support</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">99.8%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">SLA Accuracy</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">14 Days</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Rapid Pod Setup</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. What We Do (Capabilities Overview) */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Service Capabilities</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Do.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">End-to-end operational support managed by offshore experts and AI routing.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: MousePointer2, title: "Lead & Inquiry Management", desc: "Rapid qualified lead triaging, appointment setting, and inquiry response automation." },
              { icon: MessageSquare, title: "Tenant Communications", desc: "Omnichannel coverage (email, chat, calls) for high-velocity tenant satisfaction." },
              { icon: RefreshCw, title: "Leasing & Renewal Support", desc: "Managed renewal sequences, application processing, and move-in coordination." },
              { icon: Home, title: "Listing Coordination", desc: "High-velocity listing uploads, syndication updates, and PDP optimization across platforms." },
              { icon: FileText, title: "Document & Data Entry", desc: "Accurate lease digitization, escrow file coordination, and database maintenance." },
              { icon: Wrench, title: "Maintenance Dispatch", desc: "24/7 maintenance request triaging, vendor coordination, and repair scheduling." }
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
               <BarChart size={32} />
             </div>
             <div className="relative z-10">
               <h4 className="text-2xl font-bold mb-2">Performance Visibility</h4>
               <p className="text-white/60 font-medium">Integrated reporting and real-time performance dashboards come standard with every pod.</p>
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
               { icon: Building, name: "Brokerages" },
               { icon: Building2, name: "PropMgmt Firms" },
               { icon: Plane, name: "Vacation Rentals" },
               { icon: Landmark, name: "REITs & Investment" },
               { icon: Rocket, name: "PropTech Startups" }
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
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Simple Deployment.</h2>
            <p className="text-slate-500 text-xl font-medium">Intelligent scaling built for high-growth real estate teams.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-[1px] bg-slate-100"></div>
            {[
              { step: '01', title: 'Define Roles', desc: 'Identify specific property tasks and resourcing gaps.', icon: Target },
              { step: '02', title: 'Source & Vet', desc: 'Onboard pre-trained real estate specialists from our elite bench.', icon: UserCheck },
              { step: '03', title: 'Embed Talent', desc: 'Agents sync directly into your Yardi, Entrata, or AppFolio.', icon: Handshake },
              { step: '04', title: 'AI Management', desc: 'We handle AI workflows, QA, reporting, and optimization.', icon: Activity }
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
                  <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">Automation Meets <br/><span className="text-[#E61739]">Operational Visibility.</span></h2>
                  <p className="text-xl text-white/40 mb-12 leading-relaxed font-medium">We don't just provide talent; we provide the AI OS that keeps your operation lean and transparent.</p>
                  
                  <div className="space-y-8">
                     {[
                       { title: "SLA & Response-Time Tracking", desc: "Automated monitoring ensures lead and tenant inquiries never sit idle." },
                       { title: "AI-Driven Task Routing", desc: "reminders and task triage managed by backend algorithms to maximize agent output." },
                       { title: "Real-Time Productivity Dashboards", desc: "Instant visibility into task completion, resolution speed, and data accuracy." },
                       { title: "Cycle Optimization Reporting", desc: "Deep analytics on tenant response, leasing cycles, and vendor coordination." }
                     ].map((feat, idx) => (
                       <div key={idx} className="flex gap-6">
                          <div className="w-10 h-10 shrink-0 bg-[#E61739]/20 rounded-xl flex items-center justify-center text-[#E61739] border border-[#E61739]/30">
                            <CheckIcon size={20} />
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
                     <div className="text-3xl font-black mb-1">99.8%</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-80">SLA Accuracy</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Pricing Overview */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Transparent Pricing.</h2>
            <p className="text-white/40 text-lg font-medium">Choose the model that fits your growth stage.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10">
              <button onClick={() => setPricingModel('outcomes')} className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${pricingModel === 'outcomes' ? 'bg-[#E61739] text-white' : 'text-white/40 hover:text-white'}`}>Outcomes</button>
              <button onClick={() => setPricingModel('staff-aug')} className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${pricingModel === 'staff-aug' ? 'bg-[#E61739] text-white' : 'text-white/40 hover:text-white'}`}>Staff Augmentation</button>
            </div>
          </div>

          {pricingModel === 'outcomes' ? (
            <div className="grid md:grid-cols-3 gap-5 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { name: "Dedicated Associate", price: "$1,900", period: "/mo", desc: "A dedicated property management assistant.", features: ["Tenant communication", "Lease administration", "Maintenance coordination", "Direct report to your PM"], highlight: false },
                { name: "Managed Operations", price: "Custom", period: "", desc: "A fully managed team unit for scale.", features: ["Team Lead oversight", "24/7 coverage options", "AI-driven lead response", "KPI reporting & QA"], highlight: true, badge: "Scale Ready" },
                { name: "AI Leasing Assistant", price: "$1,500", period: "/mo", desc: "Automation layer for inquiry handling.", features: ["24/7 inquiry response", "Tour scheduling bots", "Pre-qualification logic", "CRM synchronization"], highlight: false },
              ].map((plan, i) => (
                <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.highlight ? 'bg-white/5 border-2 border-[#E61739]' : 'bg-white/5 border border-white/10'}`}>
                  {plan.badge && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{plan.name}</p>
                  <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                  <p className="text-white/30 text-xs font-black uppercase tracking-wide mb-3">{plan.period}</p>
                  <p className="text-white/40 text-sm font-medium mb-6 leading-relaxed">{plan.desc}</p>
                  <div className="border-t border-white/10 pt-6 mb-6 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                          <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setView('contact')} className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'}`}>
                    Request Plan
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { role: "Tenant Support Specialist", price: "$1,800", focus: "Retention", focusIcon: Users, desc: "Omnichannel tenant communications and 24/7 ticket handling." },
                { role: "Leasing Admin Coordinator", price: "$2,000", focus: "Velocity", focusIcon: Zap, desc: "Lead response, application triage, and renewal sequences." },
                { role: "Maintenance Dispatcher", price: "$2,100", focus: "Uptime", focusIcon: Wrench, desc: "Work order triage, vendor coordination, and repair scheduling." },
                { role: "Listing & Data Specialist", price: "$1,900", focus: "Growth", focusIcon: TrendingUp, desc: "Listing uploads, syndication updates, and database maintenance." },
              ].map((plan, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7 flex flex-col hover:bg-white/10 transition-all">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{plan.role}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4 flex items-center gap-1.5"><plan.focusIcon size={12} />{plan.focus}</div>
                  <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                  <p className="text-white/30 text-xs font-black uppercase tracking-wide mb-4">/mo</p>
                  <p className="text-white/40 text-sm font-medium mb-8 flex-grow leading-relaxed">{plan.desc}</p>
                  <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-[#E61739] hover:border-[#E61739] transition-all">Select Role</button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-7 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Custom Squads?</h4>
              <p className="text-sm text-white/40 font-medium">Build a dedicated pod with Team Leads and QA Managers.</p>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">Request Custom Quote</button>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: GraduationCap, title: "Real Estate Trained", desc: "Our offshore staff are pre-trained on property jargon and Western workflows." },
              { icon: Layers, title: "Native Tool Integration", desc: "No learning curve. We embed directly into your existing Yardi, Entrata, or AppFolio." },
              { icon: BrainCircuit, title: "AI-Powered Accuracy", desc: "Managed QA and automated routing eliminate human error and bottlenecking." },
              { icon: TrendingUp, title: "Elastic Scaling", desc: "Add or remove capacity in as little as 14 days to hit seasonal peaks." }
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
              <img 
                src={IMG_PROP_TEAM} 
                alt="KDCI Property Support Team" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Ready to Scale Your <br/><span className="text-shine-red">Property Operations?</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Talk to our team about building a flexible, AI-optimized support team for your real estate business.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Request a Custom Quote <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
