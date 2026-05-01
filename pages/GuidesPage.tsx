import React, { useState, useEffect } from 'react';
import { ArrowRight, BookOpen } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { getGuides, resolveIcon, type Guide } from '../contentStore';

const HERO_IMG = "https://images.unsplash.com/photo-1553484771-371af2727894?auto=format&fit=crop&q=80&w=1200&h=800";

export const GuidesPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGuides().then(data => setGuides(data)).finally(() => setLoading(false));
  }, []);

  const featuredGuide = guides.find(g => g.featured) ?? guides[0] ?? null;
  const restGuides    = guides.filter(g => g !== featuredGuide);
  const FeaturedIcon  = featuredGuide ? resolveIcon(featuredGuide.icon_name) : BookOpen;

  return (
    <div className="min-h-screen bg-white">
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Guides & Playbooks" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40"><div className="blob blob-purple"></div><div className="blob blob-magenta opacity-30"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Guides & Playbooks" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Operational</span><br/><span className="text-[#E61739]">Blueprints.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Tactical guides, SOP templates, and strategic frameworks for scaling your business with intelligent operations.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {loading && <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"/></div>}

          {!loading && featuredGuide && (
            <div className="mb-20">
              <div className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-16 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-2/3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E61739]/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#E61739]/20">
                      <BookOpen size={12} /> Featured Playbook
                    </div>
                    <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 group-hover:text-[#E61739] transition-colors">{featuredGuide.title}</h2>
                    <p className="text-white/60 text-lg mb-8 leading-relaxed">{featuredGuide.description}</p>
                    <div className="flex items-center gap-6">
                      <button onClick={() => setView('contact')} className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-[#E61739] hover:text-white transition-all">Read Guide</button>
                      <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{featuredGuide.read_time}</span>
                    </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                    <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700">
                      <FeaturedIcon size={80} className="text-[#E61739]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {!loading && restGuides.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restGuides.map((guide) => {
                const Icon = resolveIcon(guide.icon_name);
                return (
                  <div key={guide.id} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer">
                    <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform"><Icon size={24} /></div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full">{guide.category}</div>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors">{guide.title}</h3>
                    <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow text-sm">{guide.description}</p>
                    <div className="flex items-center justify-between pt-6 border-t border-black/5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{guide.read_time}</span>
                      <ArrowRight size={20} className="text-slate-300 group-hover:text-[#E61739] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
