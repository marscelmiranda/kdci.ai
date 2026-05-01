
import React from 'react';
import { ArrowRight, FileText, Download, TrendingUp, Shield, Cpu, Globe } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200&h=800";

const papers = [
  {
    id: 1,
    title: "State of Global AI Operations 2025",
    desc: "An in-depth analysis of how 500+ enterprise leaders are integrating agentic AI into their workforce strategy.",
    pages: "45 Pages",
    icon: Globe,
    color: "bg-blue-500"
  },
  {
    id: 2,
    title: "The Ultimate Guide to QA Automation",
    desc: "Moving beyond manual testing: A framework for building self-healing regression suites with offshore teams.",
    pages: "32 Pages",
    icon: Cpu,
    color: "bg-purple-500"
  },
  {
    id: 3,
    title: "Fintech Compliance: The Offshore Playbook",
    desc: "Navigating GDPR, SOC-2, and PCI-DSS when working with distributed financial operations teams.",
    pages: "28 Pages",
    icon: Shield,
    color: "bg-green-500"
  },
  {
    id: 4,
    title: "ROI of Managed Creative Pods",
    desc: "Calculating the velocity and cost impact of switching from freelancers to dedicated creative units.",
    pages: "18 Pages",
    icon: TrendingUp,
    color: "bg-orange-500"
  }
];

export const EbooksPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Whitepapers" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Ebooks & Whitepapers" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Strategic</span><br/>
            <span className="text-[#E61739]">Deep Dives.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Comprehensive research, data-driven reports, and strategic frameworks for the modern executive.
          </p>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12">
            {papers.map((paper) => (
              <div key={paper.id} className="group relative bg-[#F5F5F7] rounded-[3rem] p-10 overflow-hidden border border-black/[0.03] hover:shadow-2xl transition-all duration-500">
                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity transform group-hover:scale-110 duration-700">
                   <paper.icon size={200} className="text-slate-900" />
                </div>
                
                <div className="relative z-10 flex flex-col h-full">
                   <div className={`w-16 h-16 rounded-2xl ${paper.color} flex items-center justify-center text-white shadow-lg mb-8`}>
                      <FileText size={32} />
                   </div>
                   <div className="mb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">{paper.pages} • PDF Download</div>
                   <h3 className="text-3xl font-heading font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors">{paper.title}</h3>
                   <p className="text-slate-500 font-medium leading-relaxed mb-10 max-w-md">{paper.desc}</p>
                   
                   <button onClick={() => setView('contact')} className="mt-auto self-start px-8 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-sm hover:bg-slate-900 hover:text-white hover:border-transparent transition-all flex items-center gap-3">
                      Download Report <Download size={16} />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-t border-slate-200">
         <div className="max-w-4xl mx-auto px-6 text-center">
            <h3 className="text-3xl font-heading font-bold text-slate-900 mb-6">Get research delivered to your inbox.</h3>
            <p className="text-slate-500 mb-10">Join 15,000+ operations leaders who read our quarterly reports.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <input type="email" placeholder="Business Email" className="px-6 py-4 rounded-2xl border border-slate-200 w-full sm:w-80 focus:outline-none focus:border-[#E61739]" />
               <button className="px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold hover:bg-[#c51431] transition-all">Subscribe</button>
            </div>
         </div>
      </section>
    </div>
  );
};
