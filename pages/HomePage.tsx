
import React, { useState } from 'react';
import { Cpu, ChevronRight, CheckCircle2, Zap, Quote, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';
import { HeroBackground } from '../components/HeroBackground';
import { TECH_PARTNERS, TOP_SERVICES, DIFFERENTIATORS, IMG_DEV_TEAM } from '../data';

const highlightAI = (text: string) =>
  text.split(/(AI)/).map((part, i) =>
    part === 'AI' ? <span key={i} className="text-[#E61739]">{part}</span> : part
  );

const STORIES = [
  {
    quote: "What started out as a few agents, has grown into an invaluable partnership with KDCI. With more than 40 team members, we are lucky enough to count as part of our Cedar Family. Thank you so much KDCI for making our Company better!",
    name: "Cedar Team Lead",
    role: "Operations, Cedar",
    initials: "CT",
    tag: "Offshore Staffing",
  },
  {
    quote: "We have found KDCI to be a consistently reliable partner, always willing to 'go the extra mile' to ensure our valued customers receive the best possible service.",
    name: "Client Partner",
    role: "Customer Experience",
    initials: "CP",
    tag: "Customer Support",
  },
  {
    quote: "It's been five years since we started working with KDCI, and it just keeps getting better and better. We've grown together and achieved a lot of shared success. Overall, they're incredibly professional yet fun to work with.",
    name: "Long-Term Client",
    role: "5-Year Partnership",
    initials: "LC",
    tag: "Long-term Partner",
  },
  {
    quote: "KDCI's team has been instrumental in helping us not only modernize our platforms but also increase the experiences for the customer, and to deliver on the tsunami of content that came their way.",
    name: "Platform Director",
    role: "Technology & Content",
    initials: "PD",
    tag: "Tech & Content",
  },
  {
    quote: "We love our KDCI team. They're just like a regular part of our team, it's just that they're thousands of miles away. We had a lot of difficulty finding qualified talent in the United States — KDCI solved that completely.",
    name: "US Business Owner",
    role: "Founder, US-based Company",
    initials: "UB",
    tag: "Talent Solutions",
  },
  {
    quote: "KDCI plays a very important role in our catalog and content operations. They are responsive, kind, and always willing to help us as much as possible. We have been working together for more than 4 years.",
    name: "eCommerce Lead",
    role: "Catalog & Content Operations",
    initials: "EC",
    tag: "eCommerce",
  },
];

export const HomePage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeStory, setActiveStory] = useState(0);
  const prev2 = (activeStory + STORIES.length - 2) % STORIES.length;
  const prev1 = (activeStory + STORIES.length - 1) % STORIES.length;
  const sideIndices = [prev2, prev1];

  return (
    <div className="min-h-screen bg-[#0A0A1A]">
      <section className="relative min-h-[calc(100vh-250px)] flex items-center justify-center pt-24 pb-28 md:pb-0 overflow-hidden">
        <HeroBackground />
        <div className="grain-overlay absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}></div>
        <div className="max-w-7xl mx-auto px-6 text-center relative z-20 -translate-y-[75px] pt-[150px]">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/90 text-[11px] font-bold uppercase tracking-[0.15em] mb-10 backdrop-blur-sm">
            <Cpu size={12} className="text-[#E61739]" /> AI Managed Operations
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-9xl font-heading font-bold leading-[1] mb-10 tracking-tight drop-shadow-2xl">
            <span className="text-shine-white">Your Operational</span> <br/><span className="text-shine-red">Intelligence Partner.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/80 mb-14 font-medium drop-shadow-lg leading-relaxed">We provide AI-managed services across CX, creative, demand generation, and workforce augmentation, purpose-built for 20+ industry verticals.</p>
          <div className="flex flex-col items-center">
            <button onClick={() => setView('solutions-hub')} className="w-full sm:w-auto px-12 py-5 bg-[#E61739] hover:bg-[#c51431] text-white rounded-2xl font-bold text-lg transition-all glow-red shadow-2xl flex items-center justify-center gap-2 group shadow-2xl">
              See Our Solutions <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

      </section>

      {/* Brand ticker — black band */}
      <div className="bg-[#020202] py-10 border-y border-white/[0.06]">
        <p className="text-center text-[10px] text-white font-black uppercase tracking-widest mb-6">We work with the brands you love</p>
        <div className="relative overflow-hidden mask-fade">
          <div className="flex w-max animate-ticker items-center">
            {[...TECH_PARTNERS, ...TECH_PARTNERS].map((partner, idx) => (
              <div key={idx} className="flex items-center justify-center mx-12 shrink-0">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="h-[44px] md:h-[46px] w-auto object-contain opacity-70 grayscale invert brightness-200 hover:opacity-100 transition-all duration-500 cursor-default"
                  style={(partner as any).style ?? {}}
                  referrerPolicy="no-referrer"
                  onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="pt-20 pb-32 bg-white relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-6 tracking-tight">Built for Measurable AI Outcomes. </h2>
            <p className="text-[#86868b] text-xl font-medium max-w-2xl mx-auto">Explore our managed AI services and see how each capability turns operational complexity into a scalable competitive edge.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOP_SERVICES.map((s, i) => (
              <div key={i} className="group flex flex-col bg-white rounded-[20px] border border-black/[0.04] hover:shadow-2xl transition-all duration-500 p-7">
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-[#E61739] group-hover:bg-[#E61739] group-hover:text-white transition-all duration-300">
                    <s.icon size={22} />
                  </div>
                  <span className="px-3 py-1 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-500">
                    {s.tag}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#1D1D1F] mb-3">{highlightAI(s.name)}</h3>
                <p className="text-[#86868b] text-sm leading-relaxed mb-6 flex-grow font-medium">{s.desc}</p>
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
                <button onClick={() => setView(s.id as ViewType)} className="mt-auto w-full py-3.5 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-[#E61739] transition-all flex items-center justify-center gap-2">
                  Explore Solution <ArrowRight size={14} />
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
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">AI OPERATIONS ADVANTAGE</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-8 leading-tight">Beyond traditional <br/><span className="text-[#E61739]">outsourcing.</span></h2>
              <p className="text-xl text-[#86868b] font-medium leading-relaxed">Most BPOs sell headcount. KDCI delivers managed AI operations. We combine elite Philippine talent with agentic AI workflows, and build AI-augmented teams that are 3x more efficient than traditional teams.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-8 bg-white rounded-[20px] shadow-sm">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">35%</div>
                <div className="text-[10px] font-black uppercase text-[#86868b] tracking-widest">Average CSAT Boost</div>
              </div>
              <div className="p-8 bg-white rounded-[20px] shadow-sm">
                <div className="text-3xl font-bold text-[#1D1D1F] mb-1">60%</div>
                <div className="text-[10px] font-black uppercase text-[#86868b] tracking-widest">OpEx Reduction</div>
              </div>
              <div className="p-8 bg-[#E61739] rounded-[20px] shadow-lg">
                <div className="text-3xl font-bold text-white mb-1">24h</div>
                <div className="text-[10px] font-black uppercase text-white/70 tracking-widest">Setup Potential</div>
              </div>
              <div className="p-8 bg-[#1D1D1F] rounded-[20px] shadow-lg">
                <div className="text-3xl font-bold text-white mb-1">0.1%</div>
                <div className="text-[10px] font-black uppercase text-white/70 tracking-widest">Error Threshold</div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {DIFFERENTIATORS.map((item, idx) => (
              <div key={idx} className="flex gap-6 items-start group">
                <div className="w-12 h-12 bg-white rounded-full border border-[#E61739] shrink-0 flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform">
                  <item.icon size={22} strokeWidth={1} />
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

      {/* ── CLIENT SUCCESS STORIES ── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Client Success Stories</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4 tracking-tight">Our Clients Love Working With Us.</h2>
            <p className="text-[#86868b] text-lg font-medium max-w-2xl mx-auto">Real stories from the businesses we've helped scale, streamline, and grow.</p>
          </div>

          {/* Main layout: big card + 2 side cards */}
          <div className="grid lg:grid-cols-3 gap-6 items-stretch">

            {/* Big featured card */}
            <div className="lg:col-span-2 bg-[#1D1D1F] rounded-[20px] p-10 md:p-14 flex flex-col justify-between relative overflow-hidden min-h-[380px]">
              <div className="absolute top-0 right-0 w-72 h-72 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <Quote size={36} className="text-[#E61739] opacity-60" />
                  <span className="px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest text-white/50">
                    {STORIES[activeStory].tag}
                  </span>
                </div>
                <p className="text-xl md:text-2xl font-heading font-bold text-white leading-snug italic mb-10">
                  "{STORIES[activeStory].quote}"
                </p>
              </div>
              <div className="relative z-10 flex items-center gap-4 pt-8 border-t border-white/[0.08]">
                <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 font-bold text-sm shrink-0">
                  {STORIES[activeStory].initials}
                </div>
                <div>
                  <div className="text-white font-bold">{STORIES[activeStory].name}</div>
                  <div className="text-white/40 text-[10px] font-black uppercase tracking-widest">{STORIES[activeStory].role}</div>
                </div>
              </div>
            </div>

            {/* Two side preview cards */}
            <div className="flex flex-col gap-6">
              {sideIndices.map((idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStory(idx)}
                  className="flex-1 text-left bg-white rounded-[20px] p-8 border border-black/[0.04] hover:shadow-xl hover:border-[#E61739]/20 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <Quote size={18} className="text-[#E61739] opacity-50" />
                      <span className="px-2 py-0.5 bg-slate-100 rounded-full text-[9px] font-black uppercase tracking-widest text-slate-400">
                        {STORIES[idx].tag}
                      </span>
                    </div>
                    <p className="text-[#1D1D1F] text-sm font-medium leading-relaxed italic line-clamp-3">
                      "{STORIES[idx].quote}"
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-5 pt-4 border-t border-black/5">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-[10px] shrink-0">
                      {STORIES[idx].initials}
                    </div>
                    <div>
                      <div className="text-[#1D1D1F] font-bold text-xs">{STORIES[idx].name}</div>
                      <div className="text-[#86868b] text-[9px] font-black uppercase tracking-widest">{STORIES[idx].role}</div>
                    </div>
                    <ArrowRight size={14} className="ml-auto text-slate-300 group-hover:text-[#E61739] transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Carousel dots */}
          <div className="flex items-center justify-center gap-2 mt-10">
            {STORIES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveStory(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === activeStory
                    ? 'w-8 h-2.5 bg-[#E61739]'
                    : 'w-2.5 h-2.5 bg-black/15 hover:bg-black/30'
                }`}
              />
            ))}
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
                    Talk to our solutions architects today to build AI service strategy, combining agentic workflows and elite AI-trained operations talent.
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
