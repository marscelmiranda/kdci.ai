
import React, { useState } from 'react';
import { ArrowRight, PenTool, ShoppingCart, Play, Presentation, ShieldCheck, BrainCircuit, Target, Users2, BarChart3, Laptop, CheckCircle2, Megaphone, Home, Shirt, HeartPulse, Quote, Settings2, Video, Eye, Palette } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_CREATIVE_HERO, IMG_CREATIVE_TEAM } from '../../data';
import { portfolioItems, PortfolioItem } from './PortfolioData';
import { PortfolioModal } from './PortfolioModal';

export const CreativeProductionPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);

  const creativeTools = [
    { name: "Figma", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773896658/Figma-Logo_t0pp3n.png" },
    { name: "Photoshop", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900297/ps_logo_ld4hl9.png" },
    { name: "Illustrator", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900298/ai_logo_x0wbhp.png" },
    { name: "After Effects", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900298/ai_logo_x0wbhp.png" },
    { name: "InDesign", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900287/indd_logo_b6z33k.png" },
    { name: "Canva Pro", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900671/canva_logo_tiqapn.png" },
    { name: "Midjourney", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900915/mj_logo_zggxbt.png" },
    { name: "Runway", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773901127/runway_logo_c_h9fvko.png" },
    { name: "Adobe Firefly", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900300/fi_logo_jxaqfa.png" },
    { name: "ClickUp", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900672/clickup_logo_egqqdk.png" }
    
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className={`relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img 
            src={IMG_CREATIVE_HERO} 
            alt="AI-Managed Creative Production" 
            className="w-full h-full object-cover opacity-20 object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs 
            setView={setView} 
            currentName="Creative Production" 
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
          />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Creative Production</span><br/>
            <span className="text-[#E61739]">at Scale.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Our embedded creative teams deliver on-brand assets daily, while we manage the AI workflows that drive accuracy, speed, and creative consistency.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Book a Creative Strategy Call <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">24-48h</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Typical Turnaround</p></div>
            <div><div className="text-xl md:text-2xl font-black">Unlimited</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Asset Requests</p></div>
            <div><div className="text-xl md:text-2xl font-black">100%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Brand Alignment</p></div>
            <div><div className="text-xl md:text-2xl font-black">Top 1%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Vetted Designers</p></div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Production Arsenal</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Do.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">Daily production excellence powered by embedded pods and managed AI.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: PenTool, title: "Graphic & Ad Design", desc: "High-velocity static ads, social kits, and email templates following strict brand guides." },
              { icon: ShoppingCart, title: "eCommerce Content", desc: "Amazon A+ content, PDP imagery, and high-end product retouching for global retail." },
              { icon: Play, title: "Motion & Video Ops", desc: "Short-form video editing, motion graphics, and animated ad sequences for paid social." },
              { icon: Presentation, title: "Pitch Decks & Sales", desc: "Professional presentation systems and sales collateral that converts complex ideas into clarity." },
              { icon: ShieldCheck, title: "Creative QA & Systems", desc: "Automated brand audits and template systems ensuring 100% visual consistency." },
              { icon: BrainCircuit, title: "AI-Enhanced Workflows", desc: "Deploying Gen-AI for rapid resizing, asset versioning, and smart tagging at scale." }
            ].map((cap, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E61739] mb-8"><cap.icon size={28} /></div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">The Delivery Flow.</h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Streamlined creative ops from alignment to delivery.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Brand Alignment", desc: "We absorb your style guides, SOPs, and creative goals.", icon: Target },
              { step: "02", title: "Native Embedding", desc: "Designers sync directly into your Figma, Slack, and ClickUp.", icon: Users2 },
              { step: "03", title: "AI-Managed Ops", desc: "We deploy automation for resizing, QA, and task routing.", icon: BrainCircuit },
              { step: "04", title: "Daily Output", desc: "Consistent asset delivery with real-time performance tracking.", icon: BarChart3 }
            ].map((s, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-8 group-hover:border-[#E61739] transition-all"><s.icon size={24} /></div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-widest mb-2">{s.step}</div>
                <h4 className="text-xl font-bold mb-2">{s.title}</h4>
                <p className="text-sm text-white/40 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">See Our Work.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Explore how we help brands produce high-quality, on-brand assets at scale.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
             {portfolioItems.map((item) => (
               <div 
                 key={item.id} 
                 className="group relative rounded-[2rem] overflow-hidden shadow-sm aspect-[4/3] cursor-pointer bg-slate-50"
                 onClick={() => setSelectedPortfolioItem(item)}
               >
                  <img src={item.thumbnail} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-x-0 bottom-0 pt-32 pb-6 px-6 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end">
                     <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-200 mb-1 drop-shadow-md">{item.tag}</div>
                     <h4 className="text-white font-bold text-lg drop-shadow-md hover:underline underline-offset-4 inline-block">{item.title}</h4>
                  </div>
               </div>
             ))}
          </div>
          <div className="text-center">
             <button onClick={() => setView('contact')} className="px-10 py-4 border border-slate-200 rounded-2xl font-bold text-slate-900 hover:bg-slate-50 transition-all">View Full Portfolio</button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-slate-500 text-[10px] font-black uppercase mb-4 border border-slate-100">
              <Laptop size={12} /> Tech Stack
            </div>
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-slate-900 mb-4">Native Tool Integration.</h3>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our designers are certified across the Adobe Creative Cloud and modern AI suites.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {creativeTools.map((app, i) => (
              <div key={i} className="p-6 h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md grayscale hover:grayscale-0 opacity-70 hover:opacity-100 cursor-pointer">
                <img src={app.logo} alt={app.name} className="w-[180px] max-h-full object-contain" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing / Role Plans */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Flexible Creative Plans.</h2>
            <p className="text-white/40 text-lg font-medium">Scaling your creative throughput without the headcount friction.</p>
          </div>

          <div className="flex justify-center mb-10">
            <div className="inline-flex bg-white/5 p-1.5 rounded-full border border-white/10">
              <button onClick={() => setPricingModel('outcomes')} className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${pricingModel === 'outcomes' ? 'bg-[#E61739] text-white' : 'text-white/40 hover:text-white'}`}>Outcomes</button>
              <button onClick={() => setPricingModel('staff-aug')} className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${pricingModel === 'staff-aug' ? 'bg-[#E61739] text-white' : 'text-white/40 hover:text-white'}`}>Staff Augmentation</button>
            </div>
          </div>

          {pricingModel === 'outcomes' ? (
            <div className="grid md:grid-cols-3 gap-5 items-stretch animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { name: "Design Retainer", price: "$2,200", period: "/mo", desc: "Unlimited graphic design requests.", features: ["Integrated into your Figma/Slack", "Follows your brand guides", "Unlimited task queue", "AI workflow support included"], highlight: false },
                { name: "Creative Studio", price: "Custom", period: "", desc: "Multi-disciplinary team + PM.", features: ["Task execution at massive scale", "Dedicated PM oversight", "Strategic brand consulting", "Full performance analytics"], highlight: true, badge: "Enterprise Scale" },
                { name: "Ad Performance Pack", price: "$2,800", period: "/mo", desc: "High-velocity creative testing.", features: ["Auto-versioning & resizing", "Creative QA automation", "Smart tagging systems", "Supports internal designers"], highlight: false },
              ].map((plan, i) => (
                <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.highlight ? 'bg-white/5 border-2 border-[#E61739]' : 'bg-white/5 border border-white/10'}`}>
                  {plan.badge && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{plan.name}</p>
                  <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                  <p className="text-white/30 text-xs font-black uppercase tracking-wide mb-3">{plan.period}</p>
                  <p className="text-white/40 text-sm font-medium mb-6 leading-relaxed">{plan.desc}</p>
                  <div className="border-t border-white/10 pt-6 mb-6 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                          <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setView('contact')} className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'}`}>
                    Request Plan
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { role: "Graphic Designer", price: "$1,800", focus: "Static", focusIcon: Palette, desc: "Social assets, ads, and brand collateral." },
                { role: "Video Editor", price: "$2,200", focus: "Motion", focusIcon: Video, desc: "Short-form content and ad sequencing." },
                { role: "Motion Artist", price: "$2,500", focus: "Anim", focusIcon: Play, desc: "2D/3D motion graphics and visual effects." },
                { role: "UI/UX Designer", price: "$2,800", focus: "Product", focusIcon: Eye, desc: "Web and mobile app interface design." },
              ].map((plan, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7 flex flex-col hover:bg-white/10 transition-all">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{plan.role}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4 flex items-center gap-1.5"><plan.focusIcon size={12} />{plan.focus}</div>
                  <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                  <p className="text-white/30 text-xs font-black uppercase tracking-wide mb-4">/mo</p>
                  <p className="text-white/40 text-sm font-medium mb-8 flex-grow leading-relaxed">{plan.desc}</p>
                  <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-[#E61739] hover:border-[#E61739] transition-all">Select Role</button>
                </div>
              ))}
            </div>
          )}

          <div className="mt-8 p-7 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Custom Squads?</h4>
              <p className="text-sm text-white/40 font-medium">Build a dedicated pod with Team Leads and QA Managers.</p>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">Request Custom Quote</button>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Creative Support for <br/><span className="text-[#E61739]">Growing Brands.</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "eCommerce & Retail", icon: ShoppingCart },
                  { name: "SaaS & Tech Startups", icon: Laptop },
                  { name: "Marketing Agencies", icon: Megaphone },
                  { name: "Real Estate & PropTech", icon: Home },
                  { name: "Consumer Goods", icon: Shirt },
                  { name: "Healthcare & Wellness", icon: HeartPulse }
                ].map((ind, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-white border border-slate-100 hover:border-[#E61739]/30 transition-all group shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 shadow-sm flex items-center justify-center text-slate-400 group-hover:text-[#E61739] transition-colors"><ind.icon size={20} /></div>
                    <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{ind.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="p-10 rounded-[3rem] bg-[#1D1D1F] text-white shadow-2xl relative overflow-hidden group">
                <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                <div className="relative z-10">
                   <Quote className="text-[#E61739] mb-6 opacity-30" size={40} />
                   <p className="text-2xl font-heading font-bold mb-10 leading-snug">"KDCI reduced our time-to-publish by 40% with their dedicated design pod. Their AI layer standardizes our asset versioning instantly."</p>
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white/40 font-bold uppercase">KL</div>
                      <div>
                         <div className="font-bold">Kevin L.</div>
                         <div className="text-[10px] font-black uppercase text-white/40 tracking-widest">Brand Director, Global SaaS</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img 
                src={IMG_CREATIVE_TEAM} 
                alt="Creative Production Team" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Let's Build Your <br/><span className="text-shine-red">Creative Machine.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Talk to us about building a creative ops solution tailored to your brand and workload.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Book a Free Consultation <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>

      <PortfolioModal 
        item={selectedPortfolioItem} 
        onClose={() => setSelectedPortfolioItem(null)} 
      />
    </div>
  );
};
