
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, PenTool, ShoppingCart, Play, Presentation, BrainCircuit, Target, Laptop, CheckCircle2, Megaphone, Home, Quote, Video, Eye, ZoomIn, X, Shield, Star, ImageIcon, Layers, Building2, Briefcase, Sparkles, Palette, Clock } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';
import { ServiceHeroModal } from '../../components/ServiceHeroModal';
import { IMG_CREATIVE_TEAM, PORTFOLIO_1, PORTFOLIO_2, PORTFOLIO_3, PORTFOLIO_4, PORTFOLIO_5, PORTFOLIO_6, PORTFOLIO_7, PORTFOLIO_8 } from '../../data';
import IMG_CONTACT from '@/attached_assets/kdci-solutions-specialist-discovery-call.webp';
import { portfolioItems, PortfolioItem } from './PortfolioData';
import { PortfolioModal } from './PortfolioModal';

const EXTRA_1 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773885625/N2_jcknr7.webp";
const EXTRA_2 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886863/H2_oebyq8.webp";
const EXTRA_3 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890145/quantiq_2_d0ybqk.webp";
const EXTRA_4 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890144/furtim_1_gudfvs.webp";
const EXTRA_5 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890056/starbucks_2_ongs4l.webp";
const EXTRA_6 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890060/tutti_frutti_2_ycv0a3.webp";
const EXTRA_7 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773890071/nielsen_2_a4v1st.webp";
const EXTRA_8 = "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773886863/H4_tc17d1.webp";

type Tile = { thumb: string; full: string };
const t = (thumb: string, full: string = thumb): Tile => ({ thumb, full });

const COL_A: Tile[] = [t(PORTFOLIO_1), t(PORTFOLIO_4), t(EXTRA_1), t(PORTFOLIO_7), t(EXTRA_5), t(EXTRA_8)];
const COL_B: Tile[] = [t(PORTFOLIO_2), t(PORTFOLIO_5), t(EXTRA_3), t(PORTFOLIO_8), t(EXTRA_6), t(PORTFOLIO_3)];
const COL_C: Tile[] = [t(PORTFOLIO_6), t(EXTRA_2), t(EXTRA_4), t(EXTRA_7), t(PORTFOLIO_4), t(PORTFOLIO_1)];

const ScrollingColumn = ({
  images,
  duration,
  direction = 'up',
  offset = 0,
  onImageClick,
}: {
  images: Tile[];
  duration: number;
  direction?: 'up' | 'down';
  offset?: number;
  onImageClick?: (src: string) => void;
}) => {
  const doubled = [...images, ...images];
  const animName = direction === 'up' ? 'creativeScrollUp' : 'creativeScrollDown';
  return (
    <div
      className="flex flex-col gap-3 overflow-hidden w-[190px] shrink-0"
      style={{
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 14%, black 86%, transparent 100%)',
        marginTop: `${offset}px`,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation: `${animName} ${duration}s linear infinite`,
          willChange: 'transform',
        }}
      >
        {doubled.map((tile, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden shrink-0 w-full relative group cursor-zoom-in"
            style={{ height: i % 2 === 0 ? '150px' : '240px' }}
            onClick={() => onImageClick?.(tile.full)}
          >
            <img loading="lazy"
              src={tile.thumb}
              alt=""
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              draggable={false}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
              <ZoomIn size={28} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const AIGraphicDesignPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  const openLightbox = useCallback((src: string) => {
    setLightboxSrc(src);
    requestAnimationFrame(() => requestAnimationFrame(() => setLightboxVisible(true)));
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxVisible(false);
    setTimeout(() => setLightboxSrc(null), 300);
  }, []);

  useEffect(() => {
    if (!lightboxSrc) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') closeLightbox(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxSrc, closeLightbox]);

  const creativeTools = [
    { name: "Midjourney", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900915/mj_logo_zggxbt.png" },
    { name: "Adobe Firefly", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900300/fi_logo_jxaqfa.png" },
    { name: "Canva AI", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900671/canva_logo_tiqapn.png" },
    { name: "Runway ML", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773901127/runway_logo_c_h9fvko.png" },
    { name: "Adobe Creative Suite", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900297/ps_logo_ld4hl9.png" },
    { name: "CapCut AI", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900298/ai_logo_x0wbhp.png" },
    { name: "ElevenLabs", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900287/indd_logo_b6z33k.png" },
  ];

  const industries = [
    {
      name: "E-Commerce & Retail",
      icon: ShoppingCart,
      tag: "Catalog & Ads",
      workflows: ["Product catalog design & bulk product image editing", "Static and animated ad creative for Meta, Google, and TikTok", "Promotional banner design & seasonal campaign graphics", "Packaging design & brand refresh for retail and DTC", "Amazon A+ content design, PDP imagery & marketplace visuals"],
    },
    {
      name: "Real Estate",
      icon: Home,
      tag: "Listings & Brand",
      workflows: ["Property listing graphics, flyer design & digital brochures", "Real estate agent branding kits & agency brand identity design", "Social media content design for property listings", "Property video walkthroughs, reels & virtual tour graphics", "Sales proposal design & pitch deck templates"],
    },
    {
      name: "SaaS & Tech",
      icon: Laptop,
      tag: "Product & Decks",
      workflows: ["Product screenshot design, UI mockups & app store graphics", "Investor pitch deck design & sales presentation templates", "Social media graphic design at scale for tech brands", "Onboarding flow visuals, in-app graphics & UX illustrations", "Ad creative design for paid social and SEM campaigns"],
    },
    {
      name: "Hospitality & venue brand design",
      icon: Building2,
      tag: "Brand & Social",
      workflows: ["Brand photography editing & visual imagery for hotels and venues", "Menu design, signage graphics & print collateral", "Social media content calendar design & hospitality content production", "Promotional campaign graphics for events & seasonal offers", "Email template design & landing page graphics"],
    },
    {
      name: "Professional Services",
      icon: Briefcase,
      tag: "Thought Leadership",
      workflows: ["Business proposal design, report layout & corporate document design", "Thought leadership content design & white paper formatting", "PowerPoint presentation design & branded deck templates", "LinkedIn graphic design, infographic creation & data visualisation", "Brand identity design & visual system development"],
    },
    {
      name: "Startups",
      icon: Sparkles,
      tag: "Full Brand Identity",
      workflows: ["Brand identity design from scratch — logo, colours & typography", "Logo design & complete visual identity system", "Investor pitch deck design for fundraising rounds", "Social media graphic design & paid ad creative launch kits", "Website visual design, product illustrations & digital asset creation"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes creativeScrollUp {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes creativeScrollDown {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
      `}</style>

      {/* ── HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-56 md:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30" />
          <div className="blob blob-purple opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs
            setView={setView}
            currentName="AI Graphic Design Services"
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
            align="left"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
                Deliver at Agency Quality
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                AI Graphic<br />Design Services
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                Our dedicated design team pairs human creative talent with advanced AI production tools to deliver your brand assets faster and more affordably. Our AI graphic design services give high-growth brands an unfair production advantage.
              </p>

              <div className="flex flex-col gap-4 mb-12 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Full-service creative output from a single, embedded design team</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">On-brand, AI-assisted collateral consistent with your visual identity</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">First design batch delivered within 2 weeks of onboarding</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-0">
                <button
                  onClick={() => setShowHeroModal(true)}
                  className="w-full sm:w-auto px-10 py-4 bg-[#ad1457] text-white rounded-[2rem] font-bold text-lg hover:bg-[#8e1049] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group"
                >
                  Book a Creative Strategy Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — animated mosaic */}
            <div className="hidden lg:flex justify-end">
              <div className="flex gap-3 overflow-hidden rounded-3xl" style={{ width: '594px', height: '560px' }}>
                <ScrollingColumn images={COL_A} duration={60} direction="up" offset={-40} onImageClick={openLightbox} />
                <ScrollingColumn images={COL_B} duration={78} direction="down" offset={0} onImageClick={openLightbox} />
                <ScrollingColumn images={COL_C} duration={69} direction="up" offset={-80} onImageClick={openLightbox} />
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-x-20 lg:gap-x-28 md:items-center text-white text-center">
            <div><div className="text-xl md:text-2xl font-black">5-Day</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Turnaround SLA</p></div>
            <div><div className="text-xl md:text-2xl font-black">7 AI Tools</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">In Every Workflow</p></div>
            <div><div className="text-xl md:text-2xl font-black">100%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Brand Consistent</p></div>
            <div><div className="text-xl md:text-2xl font-black">Top 1%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Manila Creatives</p></div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER ── */}
      <section className="py-32 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">What We Deliver</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Full-Service Creative Design, Branding & Content Production</h2>
            <p className="text-white/40 max-w-3xl mx-auto font-medium text-[17px]">Everything your brand needs to look exceptional — produced at high volume by our AI-powered design team. Our AI graphic design services cover every visual touchpoint, from brand identity to performance ad creative.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Palette, title: "Brand Identity & Visual System", desc: "Logo, typography, color system, and a complete brand guide built from scratch or refreshed for consistency across every channel." },
              { icon: Megaphone, title: "Social Media Content", desc: "On-brand graphics, carousels, and reels produced on a weekly content calendar. Scroll-stopping visual content, delivered consistently." },
              { icon: ShoppingCart, title: "Product & Catalog Design", desc: "High-volume image editing and catalogue layouts for retail, DTC storefronts, Amazon, and marketplace listings. Automated design workflow." },
              { icon: Video, title: "Ad Creative Design", desc: "Performance-driven static banners, animated graphics, and short-form video ads for Meta, TikTok, and YouTube. Built for click-through." },
              { icon: Presentation, title: "Pitch Decks & Presentations", desc: "Custom presentation design that communicates your value proposition clearly and moves investor and client deals forward." },
              { icon: ImageIcon, title: "AI-Generated Imagery", desc: "Brand-safe AI image generation using Midjourney and Adobe Firefly, guided by our designers with locked style prompts for on-brand outputs." },
            ].map((cap, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#ad1457]/10 border border-[#E61739]/20 flex items-center justify-center text-[#E61739] mb-8"><cap.icon size={26} /></div>
                <h3 className="text-xl font-bold text-white mb-4">{cap.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>

          {/* Platforms strip */}
          <div className="mt-16 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-center">
            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-3">Platforms</p>
            <p className="text-white/60 font-semibold text-sm md:text-base">
              Midjourney · Adobe Firefly · Canva AI · Runway ML · ElevenLabs · Adobe Creative Suite · CapCut AI
            </p>
          </div>
        </div>
      </section>

      {/* ── ONBOARDING TIMELINE ── */}
      <section id="how-it-works" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ad1457]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Onboarding Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">
              Fully operational creative design team<br /><span className="text-[#E61739]">onboarded in 30 days.</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#1D1D1F]/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { n: '01', period: 'Day 1–3',  title: 'Brand Discovery',  desc: 'Collect assets, brand voice, style preferences and existing guidelines.' },
                { n: '02', period: 'Day 4–7',  title: 'Brand Guide',       desc: 'Create or audit your brand guide. Document colours, fonts, tone, and visual rules.' },
                { n: '03', period: 'Week 2',   title: 'First Batch',       desc: 'First creative assets delivered. Feedback cycle begins. Revisions turned around within 48 hours.' },
                { n: '04', period: 'Week 3',   title: 'Refine & Rhythm',   desc: 'Refine based on feedback. Lock in templates and creative systems for consistent, high-volume digital asset creation.' },
                { n: '05', period: 'Month 1',  title: 'Full Cadence Live', desc: 'Full creative production is live. Content calendar set. Weekly delivery begins. Team operates as your design pod.' },
                { n: '06', period: 'Ongoing',  title: 'Weekly Delivery',   desc: 'Weekly asset delivery. Monthly creative reviews keep your visual content strategy aligned to business goals.' },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-start md:items-center text-left md:text-center">
                  <div className="w-12 h-12 rounded-full bg-[#ad1457] text-white flex items-center justify-center font-black text-sm mb-5 relative z-10 shrink-0 shadow-lg">
                    {s.n}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">{s.period}</p>
                  <h4 className="font-black text-[#1D1D1F] text-sm mb-2">{s.title}</h4>
                  <p className="text-[#86868b] text-xs font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-16 p-8 bg-white border border-slate-100 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#ad1457]/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[#E61739]" />
              </div>
              <div>
                <h4 className="font-black text-[#1D1D1F] text-sm mb-0.5">Ongoing after Month 1</h4>
                <p className="text-[#86868b] text-sm font-medium">Weekly asset delivery · monthly creative review · continuous brand optimization</p>
              </div>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-[#ad1457] text-white rounded-2xl font-bold text-sm hover:bg-[#8e1049] transition-all flex items-center gap-2">
              Start Your 30-Day Onboarding <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section id="cp-portfolio" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">AI Graphic Design Services<br />Built for High-Growth Brands</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our AI-powered graphic design studio specialises in six industries where visual content volume, brand consistency, and fast turnaround matter most.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {portfolioItems.map((item) => (
              <div
                key={item.id}
                className="group relative rounded-[2rem] overflow-hidden shadow-sm aspect-[4/3] cursor-pointer bg-slate-50"
                onClick={() => setSelectedPortfolioItem(item)}
              >
                <img loading="lazy" src={item.thumbnail} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
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

      {/* ── PRICING ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ad1457]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Flexible Creative Plans.</h2>
            <p className="text-white/40 text-lg font-medium">Scale your creative output without the cost of hiring a full in-house design team.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {[
              {
                name: "Content Pack",
                price: "$2,500",
                period: "/mo",
                setup: "$1,000 setup",
                desc: "Predictable monthly creative output for brands building a content rhythm.",
                features: ["20 social posts per month", "4 carousels per month", "Monthly brand asset refresh", "5-day turnaround SLA", "Brand guide adherence review"],
                highlight: false,
                badge: null,
              },
              {
                name: "Creative Retainer",
                price: "$4,500",
                period: "/mo",
                setup: "$1,500 setup",
                desc: "A dedicated designer fully embedded in your workflow — unlimited requests.",
                features: ["Dedicated designer assigned", "Unlimited design requests", "5-day turnaround on all tasks", "Figma, Slack & ClickUp native", "Monthly creative review call"],
                highlight: true,
                badge: "Most Popular",
              },
              {
                name: "Full Studio",
                price: "$7,500",
                period: "/mo",
                setup: "$2,500 setup",
                desc: "A full creative team covering brand, ads, video, and social — priority SLA.",
                features: ["Full team: design + video + motion", "Brand, ads, video & social covered", "Priority 3-day SLA", "Dedicated Creative Director", "Weekly delivery + monthly planning"],
                highlight: false,
                badge: null,
              },
            ].map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.highlight ? 'bg-white/5 border-2 border-[#E61739]' : 'bg-white/5 border border-white/10'}`}>
                {plan.badge && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#ad1457] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="text-4xl font-black text-white mb-1">{plan.price}<span className="text-xl text-white/40">{plan.period}</span></div>
                <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-3">{plan.setup}</p>
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
                <button onClick={() => setView('contact')} className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.highlight ? 'bg-[#ad1457] text-white hover:bg-[#8e1049] shadow-lg' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'}`}>
                  Request Plan
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-white/25 text-xs font-bold uppercase tracking-widest mt-6">3-month minimum · Easy upsell from Content Pack to Full Studio</p>

          <div className="mt-8 p-7 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Scaling to a full studio?</h4>
              <p className="text-sm text-white/40 font-medium">Custom team builds available for high-volume or multi-brand production needs.</p>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">Request Custom Quote</button>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Who We Serve</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">AI Graphic Design Services<br />Built for High-Growth Brands</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Our AI-powered graphic design studio specialises in six industries where visual content volume, brand consistency, and fast turnaround matter most.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-[#E61739]/20 transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <ind.icon size={22} />
                  </div>
                  <span className="px-3 py-1 bg-[#ad1457] text-white text-[9px] font-black uppercase tracking-widest rounded-full">{ind.tag}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-4">{ind.name}</h3>
                <ul className="space-y-2">
                  {ind.workflows.map((w, wi) => (
                    <li key={wi} className="flex items-start gap-2 text-sm text-slate-500 font-medium">
                      <span className="text-[#E61739] mt-1 shrink-0">·</span>{w}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Platforms & Tools</div>
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">AI-Enabled. Human-Guided.</h3>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">AI image generation, video production tools, and professional design software all in the hands of Manila's Top 1% designers and motion artists.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {creativeTools.map((app, i) => (
              <div key={i} className="p-5 h-20 rounded-2xl bg-white/[0.04] border border-white/[0.07] flex flex-col items-center justify-center gap-2 hover:bg-white/[0.08] transition-all duration-300 cursor-pointer">
                <img loading="lazy" src={app.logo} alt={app.name} className="h-7 max-w-full object-contain grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
                <span className="text-[9px] text-white/25 font-black uppercase tracking-widest text-center leading-tight">{app.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[4rem] border border-white/5 flex flex-col lg:flex-row" style={{ overflow: 'hidden' }}>

          {/* Left — image panel */}
          <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-0 shrink-0">
            <img loading="lazy"
              src={IMG_CONTACT}
              alt="KDCI AI Creative Studio team producing marketing design and branded content"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mb-2">AI Creative Design</p>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">
                Launch your<br />AI Creative Studio.
              </h3>
              <div className="flex flex-wrap gap-2 mt-5">
                {['First content in 14 days', 'Live in 30 days', '3-month minimum'].map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[10px] text-white/70 font-bold uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form panel */}
          <div className="flex-1 p-10 md:p-14 flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-12">
                  <div className="w-16 h-16 bg-[#ad1457] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs">Our creative leads will review your brief and get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={async e => {
                  e.preventDefault();
                  if (captchaRef.current?.isBot()) return;
                  try {
                    await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ...form, inquiryType: 'AI Creative Design Services', source: 'graphic-design-page' }),
                    });
                  } catch {}
                  setSubmitted(true);
                }} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Send us your brief</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input required className={inp} placeholder="Full Name *" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <input required className={inp} placeholder="Company *" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input required type="email" className={inp} placeholder="Work Email *" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <input className={inp} placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <input required className={inp} placeholder="AI Creative Studio Service" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} />
                  </div>
                  <div>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="How can we help you?" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <Captcha ref={captchaRef} onVerify={() => {}} theme="dark" />
                  <button type="submit" className="w-full py-4 bg-[#ad1457] text-white rounded-2xl font-bold text-base hover:bg-[#8e1049] transition-all shadow-xl flex items-center justify-center gap-3 group mt-2">
                    Send My Brief <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-white/20 text-[11px] text-center font-medium">No commitment · Response within 24 hours</p>
                </form>
              )}
            </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5 border border-slate-100">
              <Shield size={11} /> FAQs
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Frequently asked questions.</h2>
          </div>
          <div className="space-y-3">
            {[
              { q: "What makes KDCI's AI Creative Studio different from a traditional design agency?", a: "Our Manila team runs AI tools — Midjourney, Adobe Firefly, Runway ML, CapCut AI — at every stage of production. That means faster delivery, lower cost per asset, and consistent brand output without sacrificing quality. Traditional agencies bill hourly and have slower turnaround cycles. We operate on a production cadence model." },
              { q: "What's included in each pricing tier?", a: "Content Pack ($2,500/mo + $1K setup): 20 social posts, 4 carousels, and monthly brand assets — ideal for brands that need consistent social output. Creative Retainer ($4,500/mo + $1.5K setup): dedicated designer, unlimited requests, 5-day turnaround. Full Studio ($7,500/mo + $2.5K setup): full team covering brand, ads, video, and social with a 3-day priority SLA." },
              { q: "How quickly can we get started?", a: "We begin brand discovery within 48 hours of sign-off. Your first content batch is delivered by the end of Week 2. Full production cadence is live by Month 1. We're structured to move fast without skipping brand alignment." },
              { q: "How does AI-generated imagery work without going off-brand?", a: "We build a brand prompt library in Week 1 — documenting your colour palette, visual style, subject matter rules, and tone. Every AI image generated goes through a brand consistency review before delivery. You'll never receive outputs that don't match your visual identity." },
              { q: "Can you handle video and motion content?", a: "Yes. Our Full Studio tier includes a dedicated motion and video team. We use Runway ML for AI-assisted video, CapCut AI for short-form editing, and Adobe Premiere/After Effects for polished cuts. ElevenLabs handles voiceover where required." },
              { q: "What's the minimum commitment?", a: "All plans require a 3-month minimum. This ensures we have enough runway to complete onboarding, establish a production rhythm, and deliver measurable results. Most clients stay well beyond the minimum — our average engagement is over 18 months." },
              { q: "Can we start on a Content Pack and upgrade later?", a: "Absolutely — and this is the most common path. Many clients start with the Content Pack to validate quality and cadence, then move to the Creative Retainer or Full Studio as their creative needs scale. The upgrade is seamless because your brand guide and team are already in place." },
              { q: "What industries do you specialise in?", a: "Our highest-volume verticals are E-Commerce & Retail, Real Estate, SaaS & Tech, Hospitality, Professional Services, and Startups. We have pre-built template systems and production playbooks for each that accelerate onboarding significantly." },
              { q: "How do we manage revisions and feedback loops?", a: "We use a structured feedback process — Frame.io for video reviews, Figma comments for design assets, and a shared project board (Asana, ClickUp, or Notion) for all task tracking. Revision requests submitted before 12pm Manila time are typically turned around within the same business day." },
              { q: "What design tools does your team use?", a: "Our team works in Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects), Canva Pro, Midjourney, Adobe Firefly, Runway ML, and CapCut AI. We adapt to whatever's already in your workflow and can operate within your existing DAM or asset library." },
            ].map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-slate-50 transition-colors"
                >
                  <span className="text-sm font-bold text-slate-900 pr-6">{item.q}</span>
                  <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-[#ad1457] text-white rotate-45' : 'bg-slate-100 text-slate-400'}`}>
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

      <PortfolioModal item={selectedPortfolioItem} onClose={() => setSelectedPortfolioItem(null)} />

      {/* Lightbox */}
      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center backdrop-blur-sm"
          style={{
            backgroundColor: 'rgba(0,0,0,0.9)',
            opacity: lightboxVisible ? 1 : 0,
            transition: 'opacity 300ms ease',
          }}
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all"
          >
            <X size={20} />
          </button>
          <img loading="lazy"
            src={lightboxSrc}
            alt="Artwork preview"
            className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl object-contain"
            style={{
              transform: lightboxVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'transform 300ms ease, opacity 300ms ease',
              opacity: lightboxVisible ? 1 : 0,
            }}
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}

      {showHeroModal && (
        <ServiceHeroModal
          config={{
            tag: 'AI Creative Studio',
            title: 'Tell us about your creative needs.',
            subtitle: 'First content delivered within 14 days.',
            inquiryType: 'AI Creative Design Services',
            source: 'graphic-design-hero',
            specificField: {
              label: 'Service of Interest',
              placeholder: 'e.g. Content Pack, Creative Retainer, Full Studio',
              fieldKey: 'service',
            },
            notesPlaceholder: 'Volume, deadlines, brand guidelines, formats needed…',
            submitLabel: 'Book a Creative Strategy Call',
            successTitle: 'Message received!',
            successMessage: 'Our creative leads will review your brief and get back to you within 24 hours to plan your first sprint.',
          }}
          onClose={() => setShowHeroModal(false)}
        />
      )}
    </div>
  );
};
