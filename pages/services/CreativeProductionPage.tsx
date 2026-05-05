
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, PenTool, Play, Presentation, ShieldCheck, BrainCircuit, CheckCircle2, Star, Award, Palette, Zap, Layers, Globe2, Shield, Settings2 } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_CREATIVE_HERO, IMG_CREATIVE_TEAM, INDUSTRIES } from '../../data';
import { portfolioItems, PortfolioItem } from './PortfolioData';
import { PortfolioModal } from './PortfolioModal';

const CREATIVE_INDUSTRY_ROLES: Record<string, string[]> = {
  'ecommerce':      ['Product Photographer', 'eCommerce Graphic Designer', 'Amazon A+ Content Creator', 'Social Media Designer', 'Email Template Designer', 'Banner Ad Specialist'],
  'software-dev':   ['UI/UX Designer', 'Product Designer', 'Brand Designer', 'Motion Graphics Artist', 'Presentation Designer', 'Icon & Illustration Artist'],
  'property-mgmt':  ['Real Estate Graphic Designer', 'Property Brochure Designer', 'Social Media Designer', 'Video Editor', 'Listing Photographer', 'Email Template Designer'],
  'fintech':        ['Brand Identity Designer', 'Infographic Designer', 'Presentation Designer', 'UI/UX Designer', 'Social Media Designer', 'Report & Document Designer'],
  'healthcare':     ['Medical Infographic Designer', 'Patient Education Designer', 'Brand Designer', 'Social Media Designer', 'Video Editor', 'Presentation Designer'],
  'marketing-ad':   ['Ad Creative Designer', 'Social Media Designer', 'Motion Graphics Artist', 'Video Editor', 'Email Template Designer', 'Brand Identity Designer'],
  'retail':         ['Product Graphic Designer', 'In-Store Signage Designer', 'Social Media Designer', 'Packaging Designer', 'Email Template Designer', 'Banner Ad Specialist'],
  'logistics':      ['Infographic Designer', 'Presentation Designer', 'Brand Identity Designer', 'Social Media Designer', 'Report Designer', 'Vehicle Wrap Designer'],
  'travel':         ['Travel Ad Designer', 'Social Media Designer', 'Video Editor', 'Brochure Designer', 'Email Template Designer', 'Motion Graphics Artist'],
  'edtech':         ['eLearning Graphic Designer', 'Infographic Designer', 'Video Editor', 'Presentation Designer', 'Social Media Designer', 'Illustration Artist'],
  'legal':          ['Legal Document Designer', 'Presentation Designer', 'Brand Identity Designer', 'Infographic Designer', 'Social Media Designer', 'Report Designer'],
  'insurance':      ['Brand Designer', 'Infographic Designer', 'Presentation Designer', 'Social Media Designer', 'Email Template Designer', 'Report Designer'],
  'media':          ['Social Media Designer', 'Thumbnail Designer', 'Video Editor', 'Motion Graphics Artist', 'Podcast Cover Designer', 'Email Template Designer'],
  'consumer-tech':  ['Product UI Designer', 'App Store Screenshot Designer', 'Social Media Designer', 'Motion Graphics Artist', 'Brand Designer', 'Video Editor'],
  'telecom':        ['Brand Designer', 'Infographic Designer', 'Social Media Designer', 'Presentation Designer', 'Video Editor', 'Email Template Designer'],
  'auto':           ['Vehicle Wrap Designer', 'Social Media Designer', 'Ad Creative Designer', 'Video Editor', 'Brochure Designer', 'Photography Retoucher'],
  'fashion':        ['Lookbook Designer', 'Social Media Designer', 'Product Photography Editor', 'Email Template Designer', 'Brand Identity Designer', 'Motion Graphics Artist'],
  'energy':         ['Infographic Designer', 'Presentation Designer', 'Brand Designer', 'Social Media Designer', 'Report Designer', 'Video Editor'],
  'prof-services':  ['Brand Identity Designer', 'Presentation Designer', 'Report Designer', 'Infographic Designer', 'Social Media Designer', 'Email Template Designer'],
  'gov':            ['Infographic Designer', 'Report & Document Designer', 'Presentation Designer', 'Social Media Designer', 'Brand Designer', 'Video Editor'],
};

const CREATIVE_INCLUDED = [
  'Graphic & Ad Design',
  'Motion Graphics & Video',
  'eCommerce & Product Content',
  'Pitch Decks & Sales Decks',
  'Social Media Asset Kits',
  'Brand Identity Systems',
  'AI-Augmented Workflows',
  'Creative QA & Brand Audits',
  'Unlimited Revisions',
  'Dedicated Creative PM',
];

export const CreativeProductionPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', projectType: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleForm = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-40">
        <div className="absolute inset-0 z-0">
          <img src={IMG_CREATIVE_HERO} alt="AI-Augmented Creative Production" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Creative Production" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Creative Production</span><br/>
            <span className="text-[#E61739]">at Scale.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Embedded creative pods delivering on-brand assets daily — powered by AI workflows that drive accuracy, speed, and creative consistency across every channel.
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

      {/* What We Deliver */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100">
                <Sparkles size={12} /> What We Deliver
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                From brief<br/>to <span className="text-[#E61739]">published asset.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10" style={{ textWrap: 'balance' }}>
                A fully embedded creative studio that produces on-brand design, motion, and content assets at velocity — with AI-managed workflows that remove the bottlenecks of traditional agencies.
              </p>
              <div className="space-y-3">
                {[
                  { icon: PenTool, text: 'Graphic, ad, and brand design with strict style-guide adherence' },
                  { icon: Play, text: 'Motion graphics, video editing, and animated social content' },
                  { icon: Presentation, text: 'Pitch decks, sales collateral, and executive presentations' },
                  { icon: BrainCircuit, text: 'AI-augmented workflows for resizing, versioning, and QA' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-black/5 hover:border-black/10 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#E61739]">
                      <item.icon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="reveal d2 relative">
              <div className="relative rounded-3xl aspect-[4/5] shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_CREATIVE_HERO} alt="Creative team at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Star size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">Top 1% Only</div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Every designer fully vetted</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Commands a Premium */}
      <section className="py-12 bg-[#020202] relative overflow-hidden">
        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(32px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          @keyframes pulseRing {
            0%, 100% { box-shadow: 0 0 0 0 rgba(230,23,57,0.5); }
            50%       { box-shadow: 0 0 0 14px rgba(230,23,57,0); }
          }
          .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.62s cubic-bezier(0.22,1,0.36,1), transform 0.62s cubic-bezier(0.22,1,0.36,1);
          }
          .reveal.in-view {
            opacity: 1;
            transform: translateY(0);
          }
          .reveal.d1 { transition-delay: 0.1s; }
          .reveal.d2 { transition-delay: 0.2s; }
          .reveal.d3 { transition-delay: 0.3s; }
          .reveal.d4 { transition-delay: 0.4s; }
          .reveal.d5 { transition-delay: 0.5s; }
        `}</style>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-3 gap-4">

            {/* AI Tool Mastery + Design Seniority */}
            <div className="reveal bg-[#E61739] rounded-3xl p-8 flex items-center gap-6" style={{ animation: 'pulseRing 2.8s ease-in-out 2s infinite' }}>
              <div className="shrink-0">
                <div className="text-[4.5rem] font-black text-white leading-none">3×</div>
                <div className="text-sm font-black text-white/70 uppercase tracking-widest -mt-1">Faster Output</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
                  AI tool mastery combined with senior design expertise means agency-quality work at startup speed.
                </p>
              </div>
            </div>

            {/* Assessed Designers */}
            <div className="reveal d2 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Rigorously Assessed</div>
                <h4 className="text-sm font-black text-white mb-1">Vetted Creative Talent</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Every designer passes portfolio reviews, live briefs, and brand-alignment tests before joining your pod.</p>
              </div>
            </div>

            {/* Agency Quality at Fraction of Price */}
            <div className="reveal d3 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Zap size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">60% Less Cost</div>
                <h4 className="text-sm font-black text-white mb-1">Agency Quality</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Premium creative output without agency retainer markups — at a fraction of the typical in-house cost.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <div className="reveal flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 self-start">
                <CheckCircle2 size={12} /> What's Included
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Everything your brand<br/><span className="text-[#E61739]">needs to produce.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Every engagement includes our full creative production suite — from concept through delivery, with dedicated PM oversight and AI-powered quality assurance.
              </p>
              <div className="bg-slate-50 border border-black/5 rounded-3xl p-8 flex-grow">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 h-full content-start">
                  {CREATIVE_INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                      <span className="text-sm font-semibold text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="reveal d2 relative h-full rounded-3xl shadow-2xl" style={{ overflow: 'hidden' }}>
              <img src={IMG_CREATIVE_TEAM} alt="Creative production studio" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Palette size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">Unlimited</div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Asset requests per month</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio */}
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

      {/* Pricing */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Simple, Transparent Pricing.</h2>
            <p className="text-slate-500 text-lg font-medium">Structured for every stage of your creative output needs.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">

            {/* LEFT — Growth (featured) */}
            <div className="reveal d1 bg-slate-900 rounded-3xl p-12 flex flex-col justify-between relative" style={{ animation: 'pulseRing 2.8s ease-in-out 2s infinite' }}>
              <div className="absolute top-8 right-8 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                Most Popular
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">Growth</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-white">$4,500</span>
                  <span className="text-white/40 text-sm font-black uppercase tracking-widest">/ mo</span>
                </div>
                <p className="text-white/50 text-sm font-medium mb-8">2 designers · up to 90 deliverables/mo · static + motion + brand system oversight · $1,000 setup · 3-month minimum</p>
                <div className="border-t border-white/10 pt-8">
                  <ul className="space-y-3">
                    {['Static Ads & Social Kits', 'Motion Graphics & Video Editing', 'Brand System Oversight', 'Dedicated Creative PM', 'AI-Augmented Workflows', 'Unlimited Revisions'].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/80">
                        <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button onClick={() => setView('contact')} className="mt-10 w-full py-4 rounded-3xl bg-[#E61739] text-white font-bold text-base hover:bg-[#c51431] transition-all shadow-xl">
                Get a Quote
              </button>
            </div>

            {/* RIGHT — two stacked cards */}
            <div className="flex flex-col gap-6">

              {/* Core */}
              <div className="reveal d2 bg-white border border-slate-100 rounded-3xl p-8 flex-1 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Core</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-slate-900">$2,500</span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">/ mo</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-5">1 senior designer · up to 40 deliverables/mo · static assets only · $750 setup · 3-month minimum</p>
                <ul className="space-y-2">
                  {['Static Graphic & Ad Design', 'Social Media Asset Kits', 'Brand-Guide Adherence', 'Unlimited Revisions'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={13} className="text-[#E61739] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setView('contact')} className="mt-6 w-full py-3.5 rounded-3xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all">
                  Get a Quote
                </button>
              </div>

              {/* Enterprise */}
              <div className="reveal d3 bg-white border border-slate-100 rounded-3xl p-8 flex-1 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Enterprise</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-slate-900">$7,500+</span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">/ mo</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-5">Full studio (3+ creatives) · creative director included · full brand stewardship · custom scope · setup fee waived · 6-month minimum</p>
                <ul className="space-y-2">
                  {['Creative Director Included', 'Full Brand Stewardship', 'Unlimited Active Deliverables', 'Executive & Volume Creative'].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-slate-600">
                      <CheckCircle2 size={13} className="text-[#E61739] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setView('contact')} className="mt-6 w-full py-3.5 rounded-3xl bg-slate-900 text-white font-bold text-sm hover:bg-black transition-all">
                  Get a Quote
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="reveal shrink-0">
              <h2 className="text-3xl md:text-4xl font-heading font-bold whitespace-nowrap">Built for Speed.</h2>
              <p className="text-white/40 text-sm font-medium mt-2 max-w-[220px]" style={{ textWrap: 'balance' }}>AI-managed creative ops. Zero wasted time.</p>
            </div>
            <div className="w-px bg-white/10 self-stretch hidden md:block shrink-0"></div>
            <div className="reveal d2 grid grid-cols-5 gap-4 flex-1 relative">
              <div className="hidden md:block absolute top-[1.6rem] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              {[
                { step: "01", title: "Brand Alignment", desc: "Absorb style guides & SOPs.", icon: ShieldCheck },
                { step: "02", title: "Pod Setup",       desc: "Designers embed in your tools.", icon: Settings2 },
                { step: "03", title: "Brief Intake",    desc: "Daily task queue via ClickUp.", icon: Layers },
                { step: "04", title: "AI-Managed QA",  desc: "Automated brand audits.", icon: BrainCircuit },
                { step: "05", title: "Daily Delivery",  desc: "Consistent on-brand output.", icon: Zap },
              ].map((s, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                  <div className="w-11 h-11 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-4 group-hover:border-[#E61739] transition-all">
                    <s.icon size={18} />
                  </div>
                  <div className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-1">{s.step}</div>
                  <h4 className="text-sm font-bold mb-1">{s.title}</h4>
                  <p className="text-[11px] text-white/40 leading-relaxed font-medium">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Specialization */}
      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Industry Specialization.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
              Our designers understand the visual language of your vertical — producing assets that resonate with your audience across 20+ industries.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Left: industry list */}
            <div className="reveal d1 bg-white rounded-3xl border border-black/5 p-3 shadow-sm">
              <div className="space-y-0.5 max-h-[520px] overflow-y-auto pr-1">
                {INDUSTRIES.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedInd(ind)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                      selectedInd.id === ind.id
                        ? 'bg-[#E61739] text-white shadow-sm'
                        : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <ind.icon size={15} className={selectedInd.id === ind.id ? 'text-white' : 'text-[#E61739]'} />
                    <span className="text-sm font-semibold leading-tight">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right: detail panel */}
            <div className="reveal d2 lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white min-h-[520px] flex flex-col">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <selectedInd.icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight">{selectedInd.name}</h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Creative Roles We Provide</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow content-start">
                {(CREATIVE_INDUSTRY_ROLES[selectedInd.id] ?? []).map((role, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-5 py-4 border border-white/5">
                    <div className="w-7 h-7 bg-[#E61739]/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-[#E61739] text-xs font-black">0{idx + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-white leading-tight">{role}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-xs font-medium">Select any industry to explore its creative roles</p>
                <button
                  onClick={() => setView('contact')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] rounded-2xl text-white text-sm font-bold hover:bg-[#c51431] transition-colors"
                >
                  Start a project <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Creative Advantage */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal relative">
              <div className="bg-slate-100 rounded-3xl aspect-[4/5] relative shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_CREATIVE_TEAM} alt="Creative team advantage" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                      <Zap size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">60%</div>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Typical Cost Reduction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="reveal d2">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The Creative Production<br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Embedded Studio Access", desc: "Your designers work directly in your Figma, Slack, and ClickUp — acting as a native extension of your in-house team.", icon: Globe2 },
                  { title: "AI + Human Creative Hybrid", desc: "We deploy Gen-AI for resizing, versioning, and smart tagging, while senior designers handle the craft and brand integrity.", icon: BrainCircuit },
                  { title: "Consistent Brand Quality", desc: "Automated QA workflows and strict style-guide adherence mean every asset ships at the standard your brand demands.", icon: ShieldCheck },
                  { title: "Unlimited Revision Policy", desc: "We iterate until every asset is right. No revision caps, no hidden fees — just output your team is proud to publish.", icon: Award },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl shrink-0 flex items-center justify-center text-[#E61739] group-hover:scale-110 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium" style={{ textWrap: 'balance' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl overflow-hidden relative border border-white/[0.07]">
          <div className="absolute inset-0 z-0">
            <img src={IMG_CREATIVE_HERO} alt="Creative Production Team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            {/* Left — headline + stats */}
            <div className="reveal p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Sparkles size={11} /> Let's Talk Creative
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Build your<br/><span className="text-[#E61739]">creative machine.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm" style={{ textWrap: 'balance' }}>
                  Tell us about your creative needs and we'll have a production plan ready within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'Embedded designers inside your existing tools' },
                  { icon: CheckCircle2, text: '24-48h turnaround on standard asset requests' },
                  { icon: CheckCircle2, text: 'Unlimited revisions, 100% brand-aligned output' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[
                    { val: '24-48h', label: 'Turnaround' },
                    { val: '100%', label: 'Brand Fit' },
                    { val: 'Top 1%', label: 'Designers' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-xl font-black text-white mb-0.5">{s.val}</div>
                      <div className="text-[9px] text-white/25 font-black uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — contact form */}
            <div className="reveal d2 border-l border-white/[0.07] p-12 md:p-16 flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-12">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our creative leads will review your brief and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Tell us about your creative needs</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Full Name</label>
                      <input required className={inp} placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Company</label>
                      <input required className={inp} placeholder="Acme Inc." value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Work Email</label>
                      <input required type="email" className={inp} placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Phone (optional)</label>
                      <input className={inp} placeholder="+1 555 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Project Type</label>
                    <input required className={inp} placeholder="e.g. Social ads, pitch deck, brand identity, motion graphics" value={form.projectType} onChange={e => setForm(f => ({ ...f, projectType: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Volume, timeline, brand guidelines, existing tools..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all shadow-xl flex items-center justify-center gap-3 group mt-2">
                    Send My Brief <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-white/20 text-[11px] text-center font-medium">No commitment · Response within 24 hours</p>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5 border border-slate-100">
              <Shield size={11} /> FAQs
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Frequently asked questions.</h2>
          </div>
          <div className="reveal d1 space-y-3">
            {[
              {
                q: "What is your typical turnaround time?",
                a: "Standard graphic design tasks (social ads, banners, email headers) are delivered within 24-48 hours. Motion graphics, video edits, and complex brand projects typically take 3-5 business days. Rush delivery within 12 hours is available on request."
              },
              {
                q: "How does the revision policy work?",
                a: "We offer unlimited revisions on every project — there are no caps or hidden fees. We iterate until every asset meets your brand standards. Our designers follow your style guides closely, so most tasks are approved on the first or second pass."
              },
              {
                q: "What AI tools do your designers use?",
                a: "Our teams are certified across the Adobe Creative Cloud suite and modern AI tools including Midjourney, Adobe Firefly, Runway, and proprietary internal automation for resizing and versioning. AI augments our designers — it never replaces their creative judgment."
              },
              {
                q: "Do you offer retainer plans or project-based work?",
                a: "Both. Our Design Retainer gives you unlimited monthly requests with an embedded designer. For larger teams, our Creative Studio plan deploys a multi-disciplinary pod with a dedicated PM. One-off project pricing is also available — contact us for a custom quote."
              },
              {
                q: "How do designers integrate with my existing team?",
                a: "Our designers embed natively into your existing workflow — Figma, Slack, Notion, ClickUp, Asana, or any tool you use. They follow your brief formats, brand guides, and communication norms so it feels like an internal hire from day one."
              },
              {
                q: "What types of creative work do you handle?",
                a: "We cover the full production spectrum: static ads and social kits, motion graphics and video editing, eCommerce product imagery and Amazon A+ content, pitch decks and sales collateral, UI/UX design, and brand identity systems. If it's visual, we build it."
              },
            ].map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900 pr-6">{item.q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-[#E61739] text-white rotate-45' : 'bg-slate-100 text-slate-400'}`}>
                    <ArrowRight size={12} className="-rotate-45" />
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6">
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
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
