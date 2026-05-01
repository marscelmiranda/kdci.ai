// ─── CaseStudiesPage.tsx ─────────────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { ArrowRight, FileText } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { getCaseStudies, resolveIcon, type CaseStudy } from '../contentStore';

const HERO_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800";

export const CaseStudiesPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCaseStudies().then(data => setCaseStudies(data)).finally(() => setLoading(false));
  }, []);

  const featured = caseStudies[0];
  const rest      = caseStudies.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Case Studies" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40"><div className="blob blob-purple"></div><div className="blob blob-magenta opacity-30"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Case Studies" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Proven</span><br/><span className="text-[#E61739]">Results.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            See how leading enterprises are using KDCI's managed intelligence to scale faster, reduce costs, and improve quality.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"/></div>}

          {!loading && featured && (
            <div className="mb-20">
              <div className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-16 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-2/3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E61739]/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#E61739]/20">
                      {React.createElement(resolveIcon(featured.icon_name), { size: 12 })} Featured Success Story
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 group-hover:text-[#E61739] transition-colors">{featured.title}</h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">{featured.description}</p>
                    <div className="grid grid-cols-3 gap-6 mb-8 border-t border-white/10 pt-8">
                      {featured.metrics.map((m, i) => (
                        <div key={i}><div className="text-2xl md:text-3xl font-black text-white">{m.value}</div><div className="text-[10px] font-bold text-white/40 uppercase tracking-tight">{m.label}</div></div>
                      ))}
                    </div>
                    <button onClick={() => setView('case-study-detail')} className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-[#E61739] hover:text-white transition-all flex items-center gap-2">
                      Read Full Story <ArrowRight size={16} />
                    </button>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 md:w-64 md:h-64 bg-gradient-to-br from-white/5 to-white/0 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700 backdrop-blur-sm relative">
                      <div className="absolute inset-0 rounded-full border border-white/5 animate-spin-slow"></div>
                      {React.createElement(resolveIcon(featured.icon_name), { size: 80, className: 'text-[#E61739]' })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && rest.length > 0 && (
            <div className="grid md:grid-cols-2 gap-12">
              {rest.map((study) => {
                const Icon = resolveIcon(study.icon_name);
                return (
                  <div key={study.id} className="group flex flex-col h-full bg-[#F5F5F7] rounded-[3rem] p-10 border border-black/[0.03] hover:shadow-2xl hover:bg-white transition-all duration-500">
                    <div className="flex justify-between items-start mb-8">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform"><Icon size={24} /></div>
                        <div><div className="text-xs font-black uppercase tracking-widest text-[#E61739]">{study.industry}</div><div className="font-bold text-slate-900">{study.client}</div></div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors">{study.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{study.description}</p>
                    <div className="grid grid-cols-3 gap-4 mb-8 pt-8 border-t border-black/5">
                      {study.metrics.map((m, i) => (<div key={i}><div className="text-2xl font-black text-slate-900">{m.value}</div><div className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{m.label}</div></div>))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {study.tags.map((tag, i) => (<span key={i} className="px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">{tag}</span>))}
                    </div>
                    <button className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2">
                      Read Case Study <ArrowRight size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
          <div className="absolute inset-0 z-0"><img src={HERO_IMG} alt="" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" /></div>
          <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple opacity-30"></div><div className="blob blob-magenta opacity-30"></div></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Have a similar <br/><span className="text-shine-red">challenge?</span></h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Our solutions architects can design a custom operational model for your specific needs.</p>
            <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
              Consult an Architect <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
