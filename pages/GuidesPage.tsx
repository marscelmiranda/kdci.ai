
import React from 'react';
import { ArrowRight, BookOpen, Download, FileText, Share2, Layers, BrainCircuit, Users, BarChart3, Palette } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1553484771-371af2727894?auto=format&fit=crop&q=80&w=1200&h=800";

const guides = [
  {
    id: 1,
    title: "The Ultimate Guide to AI-Augmented Offshoring",
    category: "Strategic Playbook",
    readTime: "15 min read",
    desc: "A comprehensive blueprint for integrating agentic AI into your remote team workflows to 3x productivity.",
    icon: BrainCircuit,
    featured: true
  },
  {
    id: 2,
    title: "Building a 24/7 Customer Support Operation from Scratch",
    category: "Operational Guide",
    readTime: "10 min read",
    desc: "Step-by-step framework for setting up shifts, tooling, and QA processes for round-the-clock coverage.",
    icon: Users
  },
  {
    id: 3,
    title: "Scaling Engineering Teams: The Pod Model Explained",
    category: "Technical Guide",
    readTime: "12 min read",
    desc: "Why the 'Pod' structure outperforms individual staff augmentation for software development projects.",
    icon: Layers
  },
  {
    id: 4,
    title: "Quality Assurance in the Age of Generative AI",
    category: "Quality Control",
    readTime: "8 min read",
    desc: "How to adapt your QA frameworks when using LLMs for content and code generation.",
    icon: FileText
  },
  {
    id: 5,
    title: "The CFO's Guide to Outsourcing ROI",
    category: "Finance",
    readTime: "10 min read",
    desc: "Moving beyond simple labor arbitrage to calculating total value creation and velocity impact.",
    icon: BarChart3
  },
  {
    id: 6,
    title: "Managing Remote Creative Teams: A Style Guide Template",
    category: "Creative Ops",
    readTime: "Downloadable Template",
    desc: "Standardize your visual identity across borders with this customizable SOP template.",
    icon: Palette
  }
];

export const GuidesPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Guides & Playbooks" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Guides & Playbooks" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Operational</span><br/>
            <span className="text-[#E61739]">Blueprints.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Tactical guides, SOP templates, and strategic frameworks for scaling your business with intelligent operations.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          {/* Featured Guide */}
          <div className="mb-20">
            <div className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-16 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
               <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
               <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                  <div className="md:w-2/3">
                     <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E61739]/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#E61739]/20">
                       <BookOpen size={12} /> Featured Playbook
                     </div>
                     <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 group-hover:text-[#E61739] transition-colors">{guides[0].title}</h2>
                     <p className="text-white/60 text-lg mb-8 leading-relaxed">{guides[0].desc}</p>
                     <div className="flex items-center gap-6">
                        <button onClick={() => setView('contact')} className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-[#E61739] hover:text-white transition-all">Read Guide</button>
                        <span className="text-white/40 text-xs font-bold uppercase tracking-widest">{guides[0].readTime}</span>
                     </div>
                  </div>
                  <div className="md:w-1/3 flex justify-center">
                     <div className="w-48 h-48 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-700">
                        <BrainCircuit size={80} className="text-[#E61739]" />
                     </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.slice(1).map((guide) => (
              <div key={guide.id} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer">
                <div className="flex justify-between items-start mb-8">
                   <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform">
                     <guide.icon size={24} />
                   </div>
                   <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-white px-3 py-1 rounded-full">{guide.category}</div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors">{guide.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow text-sm">{guide.desc}</p>
                <div className="flex items-center justify-between pt-6 border-t border-black/5">
                   <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{guide.readTime}</span>
                   <ArrowRight size={20} className="text-slate-300 group-hover:text-[#E61739] group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
