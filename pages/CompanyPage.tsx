
import React from 'react';
import { Lightbulb, Target, ShieldCheck, UsersRound, Globe, MapPin, Quote, UserCog, Zap as ZapBolt, LifeBuoy, ArrowRight, Globe as GlobeIcon, Cpu, Sparkles, Command, MessageSquare, Image, Database, Layout, BrainCircuit } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { IMG_CX_TEAM, IMG_CX_TEAM2, IMG_DEV_TEAM } from '../data';

export const CompanyPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMG_CX_TEAM2} 
            alt="KDCI Corporate Culture" 
            className="w-full h-full object-cover opacity-20 grayscale object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-50">
           <div className="blob blob-magenta"></div>
           <div className="blob blob-purple"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Our Company" />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.05]">
            <span className="text-shine-white">Managed Intelligence</span><br/>
            <span className="text-[#E61739]">at Global Scale.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/60 font-medium leading-relaxed mb-12">
            KDCI.ai is the performance partner for mid-market and enterprise firms seeking to scale efficiently through AI-integrated Philippine teams.
          </p>
        </div>
      </section>

      {/* 2. Our Mission/Vision */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
             
             {/* Mission Block */}
             <div className="bg-[#F5F5F7] p-10 md:p-14 rounded-[3rem] border border-black/[0.03] flex flex-col justify-center min-h-[400px]">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 border border-slate-100 w-fit">
                  <Target size={12} /> Our Mission
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                  To provide the best work through the continuous improvement of our people, process, and technology.
                </h2>
             </div>

             {/* Vision Block */}
             <div className="bg-[#1D1D1F] p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex flex-col justify-center min-h-[400px]">
                <div className="mesh-container opacity-30 pointer-events-none"><div className="blob blob-purple"></div></div>
                <div className="relative z-10">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10 w-fit">
                     <Lightbulb size={12} /> Our Vision
                   </div>
                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                     To power the best companies in the world with the best teams.
                   </h2>
                </div>
             </div>

          </div>
        </div>
      </section>

      {/* 3. Our Story / Evolution */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-12">The KDCI Evolution.</h2>
          <div className="relative">
             <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2"></div>
             <div className="grid md:grid-cols-3 gap-12">
                {[
                  { year: '2011', title: 'Founding Mission', desc: 'Founded with a mission to empower brands with the best people.' },
                  { year: '2018', title: 'Strategic Expansion', desc: 'Grew from key accounts to 20+ accounts and 150+ team members.' },
                  { year: '2025', title: 'Global Scale', desc: 'Handling 50+ accounts and 300+ members.' }
                ].map((milestone, idx) => (
                  <div key={idx} className="relative z-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                     <div className="w-12 h-12 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-[#E61739] mx-auto mb-6 group-hover:bg-[#E61739] group-hover:text-white transition-all font-black text-xs">
                        {milestone.year}
                     </div>
                     <h4 className="text-xl font-bold text-slate-900 mb-2">{milestone.title}</h4>
                     <p className="text-sm text-slate-500 font-medium">{milestone.desc}</p>
                  </div>
                ))}
             </div>
          </div>
        </div>
      </section>

      {/* 4. Core Values */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24">
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">The DNA</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Our Core Values.</h2>
              <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Principles that guide every pod we deploy and every line of code we ship.</p>
           </div>
           <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Lightbulb, title: "AI-First Thinking", desc: "We default to automation to unlock human creativity." }, 
                { icon: Target, title: "Outcome Obsessed", desc: "We don't sell hours; we sell business performance." },
                { icon: ShieldCheck, title: "Radical Transparency", desc: "Real-time visibility into every team member's output." },
                { icon: UsersRound, title: "Human Centric", desc: "Engineering environments where talent can thrive." }
              ].map((value, i) => (
                <div key={i} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 transition-transform">
                    <value.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                  <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 5. Global Footprint / Hubs */}
      <section className="py-32 bg-[#1D1D1F] text-white relative overflow-hidden">
         <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">Global Roots, <br/><span className="text-[#E61739]">Local Excellence.</span></h2>
                  <p className="text-xl text-white/40 mb-12 font-medium leading-relaxed">
                    KDCI operates with a distributed mindset, keeping strategic leadership close to our clients while maintaining a massive, world-class operational hub in the Philippines.
                  </p>
                  <div className="space-y-8">
                     <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-[#E61739] border border-white/10 shrink-0"><MapPin size={16} /></div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">Global HQ</h4>
                           <p className="text-white/40 text-sm font-medium">Strategic planning and client partnership leads based in the United States and Europe.</p>
                        </div>
                     </div>
                     <div className="flex gap-6 items-start">
                        <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><Globe size={24} /></div>
                        <div>
                           <h4 className="text-xl font-bold mb-2">Operational Hub</h4>
                           <p className="text-white/40 text-sm font-medium">Our talent hub in Metro Manila, Philippines — home to our top 1% engineers, designers, and support leads.</p>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="relative group">
                  <div className="bg-white/5 rounded-[4rem] p-1 border border-white/10 aspect-square relative overflow-hidden flex items-center justify-center">
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1449156003053-c306a04833a8?auto=format&fit=crop&q=80&w=800')] opacity-20 grayscale bg-cover bg-center"></div>
                     <div className="relative z-10 text-center px-12">
                        <GlobeIcon size={120} className="text-[#E61739] mx-auto mb-8 animate-pulse-slow" />
                        <h4 className="text-3xl font-black">24/7 Coverage</h4>
                        <p className="text-white/40 text-sm mt-4 font-medium uppercase tracking-[0.2em]">Always On Operations</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Leadership Culture */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
           <div className="grid lg:grid-cols-2 gap-20 items-center">
              <div className="order-2 lg:order-1">
                 <div className="bg-slate-100 rounded-[4rem] aspect-[4/5] overflow-hidden relative shadow-2xl">
                    <img src={IMG_DEV_TEAM} alt="KDCI Team" className="absolute inset-0 w-full h-full object-cover grayscale" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                    <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50">
                       <Quote className="text-[#E61739] mb-4 opacity-50" size={32} />
                       <p className="text-xl font-heading font-bold text-slate-900 mb-2 italic">"The bench is deep."</p>
                       <p className="text-slate-500 text-sm font-medium">We vet for more than skills — we hire for leadership and curiosity.</p>
                    </div>
                 </div>
              </div>
              <div className="order-1 lg:order-2">
                 <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.25em] mb-4">Leadership Culture</div>
                 <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Elite Experts, <br/>Not Just <span className="text-[#E61739]">Labor.</span></h2>
                 <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
                    Our team consists of specialists who have scaled startups, managed enterprise-grade infrastructure, and designed for world-renowned brands. 
                 </p>
                 <div className="space-y-6">
                    {[
                      { icon: UserCog, title: "Subject Matter Leads", desc: "Every department is led by a veteran with 10+ years of domain expertise." },
                      { icon: ZapBolt, title: "Agile Practitioners", desc: "Built-in scrum masters and project managers ensure zero missed deadlines." },
                      { icon: LifeBuoy, title: "Culture of Ownership", desc: "We empower our teams to solve problems proactively, not just follow tickets." }
                    ].map((feat, idx) => (
                      <div key={idx} className="flex gap-4 group">
                         <div className="w-10 h-10 shrink-0 bg-slate-50 rounded-xl flex items-center justify-center text-[#E61739] group-hover:bg-[#E61739] group-hover:text-white transition-all"><feat.icon size={20} /></div>
                         <div>
                            <h4 className="font-bold text-slate-900">{feat.title}</h4>
                            <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* NEW SECTION: Technology Stack */}
      <section className="py-32 bg-[#F5F5F7] border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 shadow-sm">
              <Cpu size={12} /> Tech Stack
           </div>
           <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Technology Is Our Backbone.</h2>
           <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto mb-16 leading-relaxed">
             We ensure that our pool of experts are up to date with the latest trends and technologies across industries to provide you with top-notch service.
           </p>
           
           <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: 'Midjourney', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/0/06/Midjourney_logo.svg', cat: 'Generative Art' },
                { name: 'Gemini', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg', cat: 'Multimodal AI' },
                { name: 'ChatGPT', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg', cat: 'LLM Reasoning' },
                { name: 'CoPilot', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Microsoft_Copilot_Icon.svg', cat: 'Code Assist' },
                { name: 'Zapier', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Cib-zapier_%28CoreUI_Icons_v1.0.0%29.svg', cat: 'AI Automation' },
                { name: 'Claude', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg', cat: 'Long Context' },
                { name: 'Adobe Firefly', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Firefly_Logo.svg', cat: 'Edge AI' },
                { name: 'HubSpot', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Cib-hubspot_%28CoreUI_Icons_v1.0.0%29.svg', cat: 'CRM & Sales' }
              ].map((tool: any, i) => (
                <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                   <div className="w-20 h-20 flex items-center justify-center text-slate-300 group-hover:text-[#E61739] transition-colors mb-6">
                      {tool.imgSrc ? (
                        <img src={tool.imgSrc} alt={tool.name} className="w-20 h-20 object-contain opacity-40 group-hover:opacity-100 transition-all grayscale group-hover:grayscale-0" />
                      ) : (
                        <tool.icon size={80} strokeWidth={1} />
                      )}
                   </div>
                   <div className="text-lg font-bold text-slate-900 group-hover:text-[#E61739] transition-colors">{tool.name}</div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1">{tool.cat}</div>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* 7. Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img 
                src={IMG_CX_TEAM} 
                alt="KDCI Team" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Scale with a <br/><span className="text-shine-red">Partner, Not a BPO.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Let’s build the operational intelligence your enterprise needs to win in the AGI era.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Partner with KDCI <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
