
import React, { useState } from 'react';
import { ArrowRight, Globe as GlobeIcon, Layers as LayersIcon, FileCode2 as ApiIcon, Zap as ZapIcon, Workflow as PipelineIcon, Rocket, Target, Users2, BrainCircuit, BarChart3, Code, CheckCircle2, Cloud, ShoppingCart, Landmark, Home, Truck, Quote, Settings2, Terminal, Database, ShieldCheck } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_DEV_HERO, IMG_DEV_TEAM } from '../../data';

export const SoftwareEngineeringPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');

  const devStack = [
    { name: "React / Next.js", color: "hover:border-[#61DAFB]" },
    { name: "Vue / Nuxt", color: "hover:border-[#4FC08D]" },
    { name: "Angular", color: "hover:border-[#DD0031]" },
    { name: "Node.js", color: "hover:border-[#339933]" },
    { name: "Python / Django", color: "hover:border-[#3776AB]" },
    { name: "Laravel", color: "hover:border-[#FF2D20]" },
    { name: "GoLang", color: "hover:border-[#00ADD8]" },
    { name: "PostgreSQL", color: "hover:border-[#336791]" },
    { name: "AWS / Serverless", color: "hover:border-[#FF9900]" },
    { name: "Docker & K8s", color: "hover:border-[#2496ED]" },
    { name: "Jira / Agile", color: "hover:border-[#0052CC]" },
    { name: "GitHub / CI/CD", color: "hover:border-[#181717]" }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className={`relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img 
            src={IMG_DEV_HERO} 
            alt="AI-Managed Software Delivery" 
            className="w-full h-full object-cover opacity-20 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-40"></div>
          <div className="blob blob-violet opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs 
            setView={setView} 
            currentName="Software Engineering" 
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
          />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Code Better.</span><br/>
            <span className="text-[#E61739]">Scale Faster.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Our engineers integrate directly with your team and stack, while we manage the AI workflows that drive speed, quality, and scalability.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Book Engineering Strategy Call <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">90 Days</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Typical MVP Launch</p></div>
            <div><div className="text-xl md:text-2xl font-black">3x</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Development Velocity</p></div>
            <div><div className="text-xl md:text-2xl font-black">40%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">QA Cycle Reduction</p></div>
            <div><div className="text-xl md:text-2xl font-black">24/7</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Global Coverage</p></div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Engineering Excellence</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Do.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">End-to-end product development powered by embedded experts and managed AI.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: GlobeIcon, title: "Web & SaaS Development", desc: "Building scalable, high-conversion multi-tenant platforms with modern architecture." },
              { icon: LayersIcon, title: "Modern Tech Stacks", desc: "Expertise in React, Vue, and Angular frontends paired with robust Node.js or Laravel backends." },
              { icon: ApiIcon, title: "API & Integrations", desc: "Seamless systems interoperability via custom API design and industrial-grade integrations." },
              { icon: ZapIcon, title: "AI-Augmented Agile", desc: "Sprint execution accelerated by AI-powered coding pods and automated task management." },
              { icon: PipelineIcon, title: "CI/CD & Automation", desc: "Zero-downtime deployment pipelines with integrated QA and regression test automation." },
              { icon: Rocket, title: "Rapid Team Scaling", desc: "Deploy specialized engineering pods in weeks to hit your product roadmap milestones." }
            ].map((cap, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E61739] mb-8"><cap.icon size={28} /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Our Delivery Flow.</h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Standardized excellence from alignment to execution.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Roadmap Alignment", desc: "We map your product goals to our engineering resource plan.", icon: Target },
              { step: "02", title: "Embedded Teams", desc: "Our devs sync directly into your Jira, Slack, and Git flows.", icon: Users2 },
              { step: "03", title: "AI-Managed Delivery", desc: "Enabling Copilot and automated QA to maximize velocity.", icon: BrainCircuit },
              { step: "04", title: "Quality Review", desc: "Monthly performance audits ensure code quality and SLA hits.", icon: BarChart3 }
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-8 group-hover:border-[#E61739] transition-all"><s.icon size={24} /></div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-widest mb-2">{s.step}</div>
                <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tech Stack Section */}
      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-slate-500 text-[10px] font-black uppercase mb-4 border border-slate-100">
              <Code size={12} /> Tech Ecosystem
            </div>
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Cloud-Native Mastery.</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our teams are experts across modern development frameworks and deployment tools.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {devStack.map((tech, i) => (
              <div key={i} className={`p-6 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-center transition-all duration-300 shadow-sm ${tech.color}`}>
                <span className="text-sm font-black text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-tighter">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing / Role Plans */}
      <section className="py-32 bg-[#F5F5F7] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Transparent Pricing.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto mb-10">Choose the model that fits your growth stage.</p>
            
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
                  name: "Dedicated Engineer", 
                  price: "$2,800", 
                  desc: "A senior developer embedded in your team.", 
                  features: ["Full-time (160h/mo)", "Git/Agile integration", "AI co-pilot enabled", "Daily standup sync"], 
                  highlight: false 
                },
                { 
                  name: "Managed DevOps", 
                  price: "Custom", 
                  desc: "Full Product Unit + PM.", 
                  features: ["Frontend + Backend + QA", "Dedicated Project Manager", "Strategic Architecture Sync", "CI/CD pipeline management"], 
                  highlight: true, 
                  badge: "Scale Ready" 
                },
                { 
                  name: "Maintenance Squad", 
                  price: "$2,200", 
                  desc: "SLA-driven uptime & fixes.", 
                  features: ["Bug triage & resolution", "Security patching", "Uptime monitoring", "Legacy code refactoring"], 
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
                    {plan.name === "Managed Dev Pod" ? "Request Pod Quote" : "Request Plan"}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { role: "Frontend Dev", price: "$2,800", focus: "UI/UX", focusIcon: GlobeIcon, desc: "React, Vue, or Angular specialists for pixel-perfect UIs." },
                { role: "Backend Engineer", price: "$3,000", focus: "Logic", focusIcon: Terminal, desc: "Node.js, Python, or Go for robust API & data layers." },
                { role: "DevOps Specialist", price: "$3,500", focus: "Infra", focusIcon: Cloud, desc: "AWS/Azure management, CI/CD, and containerization." },
                { role: "QA Automation", price: "$2,400", focus: "Quality", focusIcon: ShieldCheck, desc: "Building regression suites and automated test scripts." }
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
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] shadow-sm"><Settings2 size={24} /></div>
                <div>
                   <h4 className="text-lg font-bold text-slate-900">Custom Squads?</h4>
                   <p className="text-sm text-slate-500 font-medium">Build a dedicated pod with Team Leads and Product Owners.</p>
                </div>
             </div>
             <button onClick={() => setView('contact')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">Request Custom Quote</button>
          </div>
        </div>
      </section>

      {/* 6. Vertical Expertise / Case Study */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Engineering for <br/><span className="text-[#E61739]">Industry Leaders.</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "SaaS Platforms", icon: Cloud },
                  { name: "E-commerce Hubs", icon: ShoppingCart },
                  { name: "Fintech Systems", icon: Landmark },
                  { name: "PropTech Admin", icon: Home },
                  { name: "AI/ML Integration", icon: BrainCircuit },
                  { name: "Logistics Software", icon: Truck }
                ].map((ind, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#E61739]/30 transition-all group shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#E61739] transition-colors"><ind.icon size={20} /></div>
                    <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-10 rounded-[3rem] bg-[#1D1D1F] text-white shadow-2xl relative overflow-hidden group">
                <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                <div className="relative z-10">
                   <Quote className="text-[#E61739] mb-6 opacity-30" size={40} />
                   <p className="text-2xl font-heading font-bold mb-10 leading-snug">"KDCI acted as a literal force multiplier for our engineering team. We shipped our v3 enterprise dashboard in half the time it took for our v2 launch."</p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 font-bold uppercase">JD</div>
                      <div>
                         <div className="font-bold">Jason D.</div>
                         <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">CTO, Stealth SaaS</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img 
                src={IMG_DEV_TEAM} 
                alt="Engineering Team" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Accelerate Your <br/><span className="text-shine-red">Product Roadmap.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Book a consultation with our software architects to build your high-velocity engineering pod.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Start Engineering Sync <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
