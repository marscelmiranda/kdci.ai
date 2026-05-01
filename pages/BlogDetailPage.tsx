
import React from 'react';
import { 
  ArrowRight, Clock, Calendar, Share2, Linkedin, Twitter, 
  Link as LinkIcon, Download, Quote, CheckCircle2,
  ChevronLeft, Sparkles, BrainCircuit, Users, Database,
  TrendingUp, ShieldCheck
} from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { AUTHOR_1, IMG_BLOG_HERO, IMG_BLOG_1, IMG_BLOG_3 } from '../data';

export const BlogDetailPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Header Section (Dark Theme) */}
      <section className="relative bg-[#020202] pt-40 pb-20 overflow-hidden">
        {/* Background Mesh */}
        <div className="mesh-container opacity-30">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-20"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setView('blog')}
              className="flex items-center gap-2 text-white/40 hover:text-[#E61739] font-black uppercase tracking-[0.2em] text-[10px] mb-12 transition-colors group"
            >
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </button>
            
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E61739]/10 text-[#E61739] text-[11px] font-black uppercase tracking-widest mb-8 border border-[#E61739]/30">
              <Sparkles size={14} /> Strategic Analysis
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-10 leading-[1.1] tracking-tight">
              The Intelligence Layer: How <span className="text-shine-red">AGI is Redefining</span> Global Operations.
            </h1>
            
            <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-10 text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
               <div className="flex items-center gap-3">
                  <img src={AUTHOR_1} alt="Elena Vance" className="w-10 h-10 rounded-full border border-white/20" />
                  <div>
                    <div className="text-white">Elena Vance</div>
                    <div className="text-[9px] opacity-60">Director of AI Strategy</div>
                  </div>
               </div>
               <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
               <div className="flex items-center gap-2"><Calendar size={14} className="text-[#E61739]" /> October 24, 2024</div>
               <div className="flex items-center gap-2"><Clock size={14} className="text-[#E61739]" /> 8 Min Read</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Hero Image Section (Impactful Graphic) */}
      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_48px_100px_-20px_rgba(0,0,0,0.3)] group bg-black">
             <img 
               src={IMG_BLOG_HERO} 
               alt="AGI Operations Visualization" 
               className="w-full h-full object-cover aspect-[16/9] opacity-80 group-hover:scale-105 transition-transform duration-[3s] ease-out"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
             
             {/* Floating badge for image */}
             <div className="absolute bottom-10 right-10 p-6 bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl hidden lg:block animate-float-slow">
                <div className="flex items-center gap-4">
                   <div className="w-10 h-10 rounded-xl bg-[#E61739] flex items-center justify-center text-white shadow-xl">
                      <BrainCircuit size={20} />
                   </div>
                   <div>
                      <div className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">Architecture</div>
                      <div className="text-white font-bold text-xs">Autonomous Triage v4.2</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Main Content Grid */}
      <section className="bg-white relative">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-16">
            
            {/* Left Column: Article Body (8 cols) */}
            <div className="lg:col-span-8 max-w-3xl">
              <article className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-8">
                 <p className="text-2xl font-medium text-slate-800 leading-relaxed mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-[#E61739] first-letter:mr-3 first-letter:float-left">
                    For over a decade, global offshoring was defined by a single metric: labor arbitrage. Success meant finding the lowest cost-per-seat and managing it through human effort. But as we enter 2025, that model is collapsing. The new era of operations is defined by the "Intelligence Layer"—a synthesis of elite talent and autonomous agents.
                 </p>

                 <h2 className="text-3xl font-heading font-bold text-slate-900 mt-16 mb-8">The Death of the Call Center Model</h2>
                 <p>
                    Traditional BPO structures are built on headcount. If you have more tickets, you hire more people. This linear scaling creates massive operational friction and overhead. In high-growth environments, this model is too slow and too fragile.
                 </p>
                 <p>
                    At KDCI, we are seeing a shift toward "Outcome Units." Instead of renting hours, enterprises are building pods that leverage <strong>Agentic AI</strong> to handle the 70% of tasks that are repetitive, allowing human agents to focus purely on high-complexity logic and emotional empathy.
                 </p>

                 <div className="my-16 bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden">
                    <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        <Sparkles className="text-[#E61739]" /> Three Pillars of the Intelligence Layer:
                      </h3>
                      <div className="grid md:grid-cols-3 gap-10">
                        <div className="space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E61739] border border-white/10"><BrainCircuit size={24}/></div>
                            <div className="font-bold text-white text-base">Autonomous Triage</div>
                            <p className="text-xs text-white/50 leading-relaxed">Instant intent detection and categorization for every inbound request.</p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E61739] border border-white/10"><Users size={24}/></div>
                            <div className="font-bold text-white text-base">Embedded Experts</div>
                            <p className="text-xs text-white/50 leading-relaxed">Top 1% domain specialists acting as the "Human-in-the-Loop".</p>
                        </div>
                        <div className="space-y-3">
                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E61739] border border-white/10"><Database size={24}/></div>
                            <div className="font-bold text-white text-base">Real-time Feedback</div>
                            <p className="text-xs text-white/50 leading-relaxed">Continuous learning loops that update SOPs based on performance.</p>
                        </div>
                      </div>
                    </div>
                 </div>

                 <h2 className="text-3xl font-heading font-bold text-slate-900 mt-16 mb-8">Why the Philippines?</h2>
                 <p>
                    The Philippines is uniquely positioned to lead this transformation. It's no longer about just English proficiency; it's about tech-savviness and cultural alignment with Western innovation. Our Manila hub is now home to <strong>Prompt Engineers</strong> and <strong>AI Ops Analysts</strong>, not just support agents.
                 </p>

                 <div className="my-16 border-l-4 border-[#E61739] pl-10 py-4 relative">
                    <Quote size={60} className="absolute -top-6 -left-6 text-slate-50 opacity-80 -z-10" />
                    <p className="text-3xl font-heading font-bold text-slate-900 leading-tight mb-8">
                       "Automation doesn't replace people; it elevates them. Our goal is to give every agent the power of ten, using AI as their operational exoskeleton."
                    </p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">MJ</div>
                       <div>
                          <div className="text-slate-900 font-bold text-sm">Marcus Jordon</div>
                          <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">VP of Operations, KDCI.ai</div>
                       </div>
                    </div>
                 </div>

                 <p>
                    To stay competitive, firms must move beyond the "outsourcing" mindset and toward "managed intelligence." This means building teams that are natively integrated into your tech stack and empowered by tools that learn in real-time. The era of the body-shop is over. The era of the Intelligence Layer has begun.
                 </p>
              </article>

              {/* Action Footer */}
              <div className="mt-20 pt-12 border-t border-slate-100">
                 <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex flex-wrap gap-2">
                       {['AI Operations', 'Strategic Scaling', 'Manila Tech'].map(tag => (
                          <span key={tag} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                       ))}
                    </div>
                    <div className="flex items-center gap-4">
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Share Insight</span>
                       <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#0077b5] hover:text-white transition-all shadow-sm"><Linkedin size={16} /></button>
                       <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-[#1DA1F2] hover:text-white transition-all shadow-sm"><Twitter size={16} /></button>
                       <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-slate-900 hover:text-white transition-all shadow-sm"><LinkIcon size={16} /></button>
                    </div>
                 </div>
              </div>
            </div>

            {/* Right Column: Sticky Sidebar (4 cols) */}
            <div className="lg:col-span-4 relative">
               <div className="sticky top-24 space-y-8">
                  
                  {/* Strategic Action Card */}
                  <div className="p-8 rounded-[3rem] bg-[#1D1D1F] text-white shadow-2xl relative overflow-hidden group">
                     <div className="mesh-container opacity-20 pointer-events-none group-hover:opacity-30 transition-opacity"><div className="blob blob-purple"></div></div>
                     <div className="relative z-10">
                        <h4 className="text-2xl font-heading font-bold mb-4">Optimize Your Intelligence Layer.</h4>
                        <p className="text-white/50 text-sm mb-10 leading-relaxed font-medium">
                           Is your offshore team ready for the AGI revolution? Talk to our architects today about building your pod.
                        </p>
                        <button onClick={() => setView('contact')} className="w-full py-5 bg-[#E61739] hover:bg-[#c51431] rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl glow-red">
                           Consult an Architect <ArrowRight size={18} />
                        </button>
                     </div>
                  </div>

                  {/* Related Resource */}
                  <div className="p-8 rounded-[3rem] border border-slate-200 bg-[#F5F5F7] group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                     <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] shrink-0"><Download size={22} /></div>
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">Whitepaper</div>
                           <h5 className="text-base font-bold text-slate-900 leading-tight">The Future of AGI Ops 2025</h5>
                           <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 group-hover:text-[#E61739] transition-colors">
                              Download PDF <ArrowRight size={12} />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Quick Insight Box */}
                  <div className="p-8 rounded-[3rem] border border-slate-100 bg-white shadow-sm">
                     <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Key Takeaways</h4>
                     <ul className="space-y-4">
                        {[
                           "BPO models based on headcount are becoming obsolete.",
                           "Hybrid pods (AI + Elite Humans) yield 3x higher velocity.",
                           "Philippines is transitioning from 'Service' to 'Engineering' hub."
                        ].map((takeaway, i) => (
                           <li key={i} className="flex gap-3 text-xs font-medium text-slate-600 leading-relaxed">
                              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                              {takeaway}
                           </li>
                        ))}
                     </ul>
                  </div>

               </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Read Next / Related */}
      <section className="py-32 bg-[#F5F5F7] border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
               <div>
                  <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Read Next.</h3>
               </div>
               <button onClick={() => setView('blog')} className="text-[11px] font-black uppercase tracking-widest text-[#E61739] hover:underline">View All Insights</button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-10">
               <article onClick={() => setView('blog-detail')} className="group cursor-pointer bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                     <img src={IMG_BLOG_1} alt="Next Story" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="md:w-3/5 p-10 flex flex-col h-full">
                     <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Engineering</div>
                     <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors leading-tight">Why the Philippines is the New Epicenter for AI Engineering</h4>
                     <p className="text-slate-500 text-sm mb-8 line-clamp-2">Unpacking the talent shift as Manila transforms from a support hub into a global node for agentic AI development.</p>
                     <div className="mt-auto flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Story <ArrowRight size={14} className="text-[#E61739]" /></div>
                  </div>
               </article>
               
               <article onClick={() => setView('blog-detail')} className="group cursor-pointer bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden">
                     <img src={IMG_BLOG_3} alt="Next Story" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  </div>
                  <div className="md:w-3/5 p-10 flex flex-col h-full">
                     <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Case Studies</div>
                     <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors leading-tight">Scaling to 500+ Agents: A Case Study in Fintech</h4>
                     <p className="text-slate-500 text-sm mb-8 line-clamp-2">How a neobank maintained 98% CSAT during hyper-growth with managed intelligence.</p>
                     <div className="mt-auto flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Story <ArrowRight size={14} className="text-[#E61739]" /></div>
                  </div>
               </article>
            </div>
         </div>
      </section>
    </div>
  );
};
