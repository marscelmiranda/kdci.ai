
import React from 'react';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { TOP_SERVICES, INDUSTRIES } from '../../data';

export const SolutionsHubPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      <section className={`relative bg-[#020202] overflow-hidden pt-48 pb-32`}>
        <div className="mesh-container">
          <div className="blob blob-magenta opacity-40"></div>
          <div className="blob blob-purple opacity-40"></div>
          <div className="blob blob-violet opacity-30"></div>
        </div>
        <div className="particle-canvas opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="mb-20 text-center">
            <Breadcrumbs setView={setView} currentName="Solutions Hub" align="left" />
            <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.05]">
              <span className="text-shine-white">AI-Managed Solutions for</span><br/>
              <span className="text-[#E61739]">Enterprise-Ready Growth.</span>
            </h1>
            <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/60 font-medium leading-relaxed mb-12">
              We help companies scale operations across support, design, development, and recruitment — tailored to the needs of 20+ industries.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#industries" className="px-12 py-5 bg-[#E61739] text-white rounded-2xl font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl">
                Find Your Industry Fit
              </a>
              <button onClick={() => setView('contact')} className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-2xl font-bold text-lg hover:bg-white/10 transition-all backdrop-blur-md">
                Talk to a Solutions Architect
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_SERVICES.map((s, i) => (
              <div key={i} className="group flex flex-col bg-white/5 rounded-[2.5rem] overflow-hidden border border-white/10 hover:bg-white/8 hover:border-white/20 hover:shadow-2xl transition-all duration-500">
                <div className="relative h-44 overflow-hidden shrink-0">
                  <img src={(s as any).image} alt={s.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: (s as any).imagePosition || 'center' }} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-[10px] font-black uppercase tracking-widest text-white border border-white/30">
                      {s.tag}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="w-9 h-9 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white border border-white/30">
                      <s.icon size={18} />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-grow p-7">
                  <h3 className="text-lg font-bold text-white mb-3">{s.name}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow font-medium">{s.desc}</p>
                  <div className="w-full pt-5 border-t border-white/10 mb-6">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-3">Key Outcomes</div>
                    <div className="space-y-2">
                      {s.benefits.map((b, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-bold text-white/40">
                          <CheckCircle2 size={12} className="text-[#E61739]" /> {b}
                        </div>
                      ))}
                    </div>
                  </div>
                  <button onClick={() => setView(s.id as ViewType)} className="mt-auto w-full py-3.5 bg-white/10 text-white rounded-2xl font-bold text-sm border border-white/10 hover:bg-[#E61739] hover:border-transparent transition-all flex items-center justify-center gap-2">
                    Explore Solution <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="industries" className="py-32 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Vertical Expertise</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Trusted Across 20+ Industries.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">We build custom workflows that respect the unique regulatory and operational needs of your sector.</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#E61739] mb-4">
                  <ind.icon size={24} />
                </div>
                <h4 className="text-[13px] font-bold text-slate-900 leading-tight">{ind.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
