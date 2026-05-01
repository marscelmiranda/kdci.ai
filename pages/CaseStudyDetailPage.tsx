
import React from 'react';
import { ArrowRight, Clock, Calendar, Share2, Linkedin, Twitter, Link as LinkIcon, Download, Quote, CheckCircle2 } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200&h=800";

export const CaseStudyDetailPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Immersive Hero */}
      <section className="relative h-[85vh] flex items-center bg-[#020202] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={HERO_IMG} 
            alt="Fintech Case Study" 
            className="w-full h-full object-cover opacity-30 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 w-full pt-20">
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-[11px] font-black uppercase tracking-[0.2em] mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <span className="text-[#E61739]">Case Study</span>
                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                <span>Financial Services</span>
                <span className="w-1 h-1 rounded-full bg-white/30"></span>
                <span>Customer Support</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-10 leading-[1.05] tracking-tight drop-shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-100">
              Scaling Support from <br/>
              0 to 500 Agents.
            </h1>
            
            <p className="text-xl md:text-2xl text-white/70 font-medium leading-relaxed max-w-2xl mb-12 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
              How a high-growth neobank maintained 98% CSAT while hyper-scaling their customer operations offshore in under 6 months.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
               <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-white">65%</div>
                  <div className="text-[10px] text-white/50 font-bold uppercase leading-tight">Cost<br/>Savings</div>
               </div>
               <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-[#E61739]">14</div>
                  <div className="text-[10px] text-white/50 font-bold uppercase leading-tight">Days to<br/>Launch</div>
               </div>
               <div className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-xl border border-white/10">
                  <div className="text-2xl font-black text-white">4.8</div>
                  <div className="text-[10px] text-white/50 font-bold uppercase leading-tight">CSAT<br/>Score</div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main Content Grid */}
      <section className="bg-white border-t border-slate-100 relative">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Main Narrative (8 cols) */}
            <div className="lg:col-span-8">
              
              {/* Executive Summary Block */}
              <div className="bg-[#F5F5F7] p-10 rounded-[2.5rem] mb-16 border-t-4 border-[#E61739]">
                 <h3 className="text-[11px] font-black uppercase tracking-[0.2em] text-[#E61739] mb-4">In Brief</h3>
                 <p className="text-xl font-medium text-slate-800 leading-relaxed">
                    Facing exponential user growth, a Tier-1 Fintech unicorn needed to expand support capacity by 500% without compromising their premium brand reputation. KDCI deployed a managed "Pod" structure, integrating AI for ticket triage and human experts for complex financial inquiries, achieving massive scale in record time.
                 </p>
              </div>

              {/* Body Text */}
              <div className="prose prose-lg prose-slate max-w-none">
                 <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">The Challenge: Hyper-growth pain points.</h2>
                 <p className="text-slate-500 leading-loose mb-8">
                    The client, a mobile-first banking platform, saw their user base triple in a single quarter following a successful Series C raise. Their internal support team in San Francisco was overwhelmed, with response times slipping from minutes to days. They faced three critical hurdles:
                 </p>
                 <ul className="space-y-4 mb-12">
                    {[
                      "Cost of scaling locally in SF was prohibitive ($85k+ per agent).",
                      "Maintaining strict compliance (KYC/AML) quality at speed.",
                      "Preserving the 'human touch' that defined their brand voice."
                    ].map((item, i) => (
                      <li key={i} className="flex gap-4 items-start">
                         <div className="w-6 h-6 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0 mt-1 text-[#E61739] font-bold text-xs">{i+1}</div>
                         <span className="text-slate-600 font-medium">{item}</span>
                      </li>
                    ))}
                 </ul>

                 <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">The Solution: Managed Intelligence Pods.</h2>
                 <p className="text-slate-500 leading-loose mb-8">
                    KDCI didn't just supply headcount; we architected a scalable support ecosystem. We moved away from the traditional BPO "classroom" training model to a <strong>Pod Structure</strong>. Each pod consists of 10 agents, 1 QA specialist, and 1 Team Lead, operating as an autonomous unit responsible for specific KPIs.
                 </p>
                 <p className="text-slate-500 leading-loose mb-12">
                    Simultaneously, we deployed our proprietary <strong>AI Triage Layer</strong>. This system intercepts inbound tickets, categorizes them by intent (e.g., "Account Locked" vs. "Fraud Report"), and routes them to the specialized pod best equipped to handle them. Simple queries like password resets were automated, while high-touch banking issues were fast-tracked to senior human agents.
                 </p>

                 {/* Pull Quote */}
                 <div className="my-16 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#E61739]"></div>
                    <div className="pl-10">
                       <Quote size={40} className="text-slate-200 mb-6" />
                       <p className="text-3xl font-heading font-bold text-slate-900 leading-tight mb-6">
                          "KDCI mirrored our internal culture so perfectly that our customers couldn't tell the difference between an agent in Manila and an agent in San Francisco."
                       </p>
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-slate-200"></div>
                          <div>
                             <div className="font-bold text-slate-900">VP of Operations</div>
                             <div className="text-xs font-black uppercase text-slate-400 tracking-widest">Client Partner</div>
                          </div>
                       </div>
                    </div>
                 </div>

                 <h2 className="text-3xl font-heading font-bold text-slate-900 mb-6">The Outcome.</h2>
                 <p className="text-slate-500 leading-loose mb-6">
                    Within 6 months, the operation scaled from 0 to 500 active seats. The hybrid AI+Human model absorbed 80% of the volume spike without adding headcount beyond the plan.
                 </p>
                 <div className="grid sm:grid-cols-2 gap-6 mb-12">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                       <div className="text-4xl font-black text-[#E61739] mb-2">$12M</div>
                       <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">Annualized Savings</p>
                    </div>
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100">
                       <div className="text-4xl font-black text-[#E61739] mb-2">&lt;30s</div>
                       <p className="text-sm font-bold text-slate-500 uppercase tracking-wide">First Response Time</p>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 relative">
               <div className="sticky top-24 space-y-8">
                  
                  {/* Action Card */}
                  <div className="p-8 rounded-[2rem] bg-[#1D1D1F] text-white shadow-xl relative overflow-hidden">
                     <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                     <div className="relative z-10">
                        <h4 className="text-xl font-bold mb-4">Scale Your Own Team</h4>
                        <p className="text-white/60 text-sm mb-8 leading-relaxed">
                           See how our managed pods can reduce your burn rate while improving CSAT.
                        </p>
                        <button onClick={() => setView('contact')} className="w-full py-4 bg-[#E61739] hover:bg-[#c51431] rounded-xl font-bold transition-all flex items-center justify-center gap-2">
                           Talk to an Architect <ArrowRight size={16} />
                        </button>
                     </div>
                  </div>

                  {/* Metadata */}
                  <div className="p-8 rounded-[2rem] border border-slate-100 bg-white">
                     <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">At a Glance</h4>
                     <ul className="space-y-6">
                        <li>
                           <div className="text-xs font-bold text-slate-400 mb-1">Industry</div>
                           <div className="text-slate-900 font-bold">Fintech / Banking</div>
                        </li>
                        <li>
                           <div className="text-xs font-bold text-slate-400 mb-1">Services</div>
                           <div className="text-slate-900 font-bold">CX, Fraud Ops, KYC</div>
                        </li>
                        <li>
                           <div className="text-xs font-bold text-slate-400 mb-1">Region</div>
                           <div className="text-slate-900 font-bold">North America</div>
                        </li>
                        <li>
                           <div className="text-xs font-bold text-slate-400 mb-1">Tech Stack</div>
                           <div className="flex flex-wrap gap-2 mt-2">
                              {['Zendesk', 'Intercom', 'Salesforce', 'Jira'].map(tech => (
                                 <span key={tech} className="px-2 py-1 bg-slate-100 rounded-md text-[10px] font-bold text-slate-600 uppercase">{tech}</span>
                              ))}
                           </div>
                        </li>
                     </ul>
                  </div>

                  {/* Share */}
                  <div className="flex gap-4">
                     <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#0077b5] transition-all"><Linkedin size={18} /></button>
                     <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-[#1DA1F2] transition-all"><Twitter size={18} /></button>
                     <button className="w-12 h-12 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-slate-900 transition-all"><LinkIcon size={18} /></button>
                  </div>

               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Read Next */}
      <section className="py-24 bg-[#F5F5F7]">
         <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-3xl font-heading font-bold text-slate-900 mb-12">Read Next.</h3>
            <div className="grid md:grid-cols-2 gap-8">
               <div className="group cursor-pointer bg-white p-8 rounded-[2.5rem] border border-black/[0.03] hover:shadow-xl transition-all">
                  <div className="text-xs font-black uppercase tracking-widest text-[#E61739] mb-4">Logistics</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors">Automating 10,000 Weekly Waybills with AI + Humans</h4>
                  <p className="text-slate-500 text-sm mb-6">How a logistics giant reduced manual data entry by 80%.</p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Story <ArrowRight size={14} /></div>
               </div>
               <div className="group cursor-pointer bg-white p-8 rounded-[2.5rem] border border-black/[0.03] hover:shadow-xl transition-all">
                  <div className="text-xs font-black uppercase tracking-widest text-[#E61739] mb-4">Healthcare</div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors">HIPAA-Compliant Patient Intake at Scale</h4>
                  <p className="text-slate-500 text-sm mb-6">Reducing no-shows by 30% for a multi-state hospital network.</p>
                  <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Story <ArrowRight size={14} /></div>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};
