
import React from 'react';
import { Cpu, ChevronRight, CheckCircle2, Zap, Quote, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';
import { HeroBackground } from '../components/HeroBackground';
import { TECH_PARTNERS, TOP_SERVICES, DIFFERENTIATORS, IMG_DEV_TEAM } from '../data';

export const HomePage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-[#0A0A1A]">
      <section className="relative h-screen flex items-center justify-center pt-24 overflow-hidden">
        <HeroBackground />
        <div className="grain-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-[11px] font-bold uppercase tracking-[0.15em] mb-10 backdrop-blur-sm">
            <Cpu size={12} className="text-[#E61739]" /> Managed AI Operations
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold leading-[1] mb-10 tracking-tight drop-shadow-2xl">
            <span className="text-shine-white">Your Operational</span> <br/><span className="text-shine-red">Intelligence Partner.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/80 mb-14 font-medium drop-shadow-lg leading-relaxed">We provide the smart teams and automated systems so you can stay focused on strategy and growth.</p>
          <div className="flex flex-col items-center">
            <button onClick={() => setView('solutions-hub')} className="w-full sm:w-auto px-12 py-5 bg-[#E61739] hover:bg-[#c51431] text-white rounded-2xl font-bold text-lg transition-all glow-red shadow-2xl flex items-center justify-center gap-2 group shadow-2xl">
              See Our Solutions <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Brand ticker — layered over the constellation */}
        <div className="absolute bottom-[100px] left-0 w-full z-30">
          <p className="text-center text-[10px] text-white/30 font-black uppercase tracking-widest mb-5 mt-[150px]">We work with the brands you love</p>
          <div className="relative flex mask-fade overflow-hidden">
            <div className="flex animate-infinite-scroll whitespace-nowrap min-w-full items-center">
              {[...TECH_PARTNERS, ...TECH_PARTNERS].map((partner, idx) => (
                <div key={idx} className="flex items-center justify-center mx-12 shrink-0">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-[44px] md:h-[46px] w-auto object-contain opacity-30 grayscale brightness-200 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="pt-20 pb-32 bg-white rounded-t-[5rem] relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-6 tracking-tight">Built for results.</h2>
            <p className="text-[#86868b] text-xl font-medium max-w-2xl mx-auto">Select a capability to see how we transform operations into competitive advantages.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TOP_SERVICES.map((s, i) => (
              <div key={i} className="group p-7 rounded-[2.5rem] bg-[#F5F5F7] border border-black/[0.02] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col items-start text-left">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <s.icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">{s.name}</h3>
                <p className="text-[#86868b] text-sm leading-relaxed mb-8 flex-grow font-medium">{s.desc}</p>
                <div className="w-full pt-5 border-t border-black/5 mb-6">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#1D1D1F] mb-3">Key Outcomes</div>
                  <div className="space-y-2">
                    {s.benefits.map((b, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-500">
                        <CheckCircle2 size={12} className="text-[#E61739]" /> {b}
                      </div>
                    ))}
                  </div>
                </div>
                <button onClick={() => setView(s.id as ViewType)} className="w-full py-3.5 bg-white text-[#1D1D1F] rounded-2xl font-bold text-sm border border-black/5 hover:bg-[#E61739] hover:text-white transition-all shadow-sm">
                  Explore Solution
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
            <div>
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">The Differentiator</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-8 leading-tight">Beyond traditional <br/><span className="text-[#E61739]">outsourcing.</span></h2>
              <p className="text-xl text-[#86868b] font-medium leading-relaxed">Most BPOs focus on headcount. We focus on outcome. By merging high-end Philippine talent with agentic AI workflows, we create operational units that are 3x more efficient than traditional teams.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white rounded-[2.5rem] shadow-sm">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">35%</div>
                <div className="text-[10px] font-black uppercase text-[#86868b] tracking-widest">Average CSAT Boost</div>
              </div>
              <div className="p-8 bg-white rounded-[2.5rem] shadow-sm">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">60%</div>
                <div className="text-[10px] font-black uppercase text-[#86868b] tracking-widest">OpEx Reduction</div>
              </div>
              <div className="p-8 bg-[#E61739] rounded-[2.5rem] shadow-lg">
                <div className="text-3xl font-bold text-white mb-1">24h</div>
                <div className="text-[10px] font-black uppercase text-white/70 tracking-widest">Setup Potential</div>
              </div>
              <div className="p-8 bg-[#1D1D1F] rounded-[2.5rem] shadow-lg">
                <div className="text-3xl font-bold text-white mb-1">0.1%</div>
                <div className="text-[10px] font-black uppercase text-white/70 tracking-widest">Error Threshold</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DIFFERENTIATORS.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-xl shrink-0 flex items-center justify-center text-[#E61739] shadow-sm group-hover:scale-110 transition-transform">
                  <item.icon size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-[#1D1D1F] mb-3">{item.title}</h4>
                  <p className="text-sm text-[#86868b] leading-relaxed font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-6">Trusted by Industry Leaders.</h2>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
               <div className="text-2xl font-black font-heading">FINTECH<span className="text-[#E61739]">X</span></div>
               <div className="text-2xl font-black font-heading italic">GLOBAL.ecom</div>
               <div className="text-2xl font-black font-heading tracking-widest uppercase">PropBase</div>
               <div className="text-2xl font-black font-heading">CORE<span className="opacity-50">SaaS</span></div>
               <div className="text-2xl font-black font-heading">LOGI<span className="text-[#E61739]">FLOW</span></div>
            </div>
          </div>

          <div className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
             <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
             <div className="relative z-10 grid lg:grid-cols-5 gap-16 items-center">
                <div className="lg:col-span-3">
                   <Quote size={64} className="text-[#E61739] mb-10 opacity-50" />
                   <p className="text-2xl md:text-4xl font-heading font-bold text-white mb-12 leading-snug italic">
                      "KDCI didn't just give us staff; they gave us a smarter process. We scaled our operations by 40% in two quarters without increasing our internal management load. They are truly an extensions of our core team."
                   </p>
                   <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center text-white/30 border border-white/10 font-bold uppercase">MJ</div>
                      <div>
                         <div className="text-white font-bold text-lg">Marcus Jordon</div>
                         <div className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">VP Operations, Stealth FinTech</div>
                      </div>
                   </div>
                </div>
                <div className="lg:col-span-2 space-y-4">
                   <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md">
                      <div className="text-4xl font-black text-white mb-2">$300K+</div>
                      <p className="text-white/60 text-sm font-medium">Saved in annual staffing and overhead costs within the first year.</p>
                   </div>
                   <div className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-md">
                      <div className="text-4xl font-black text-[#E61739] mb-2">99.8%</div>
                      <p className="text-white/60 text-sm font-medium">Uptime and accuracy for global customer support and logistics data.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 relative overflow-hidden">
         <div className="max-w-7xl mx-auto">
            <div className="bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-24 md:p-32 text-center group">
               <div className="absolute inset-0 z-0">
                  <img 
                    src={IMG_DEV_TEAM} 
                    alt="KDCI Team" 
                    className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
                  />
               </div>
               <div className="mesh-container">
                  <div className="blob blob-magenta opacity-30"></div>
                  <div className="blob blob-purple opacity-30"></div>
               </div>
               <div className="relative z-10 max-w-3xl mx-auto">
                  <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight">
                    Start Scaling <br/><span className="text-shine-red">Smarter with KDCI.</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-white/60 mb-14 font-medium leading-relaxed">
                    Talk to our solutions architects today to build your offshore strategy powered by AI and world-class Philippine talent.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-6 justify-center">
                     <button onClick={() => setView('solutions-hub')} className="px-12 py-5 bg-[#E61739] text-white rounded-2xl font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group shadow-2xl">
                        Book a Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                     </button>
                     <button onClick={() => setView('contact')} className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md">
                        Request a Custom Quote
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};
