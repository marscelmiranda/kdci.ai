
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { ArrowRight, PenTool, ShoppingCart, Play, Presentation, ShieldCheck, BrainCircuit, Target, Users2, BarChart3, Laptop, CheckCircle2, Megaphone, Home, Shirt, HeartPulse, Quote, Settings2, Video, Eye, Palette, ZoomIn, X, Shield, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';
import { IMG_CREATIVE_TEAM, PORTFOLIO_1, PORTFOLIO_2, PORTFOLIO_3, PORTFOLIO_4, PORTFOLIO_5, PORTFOLIO_6, PORTFOLIO_7, PORTFOLIO_8 } from '../../data';
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
            <img
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

export const GraphicDesignStudioPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');
  const [selectedPortfolioItem, setSelectedPortfolioItem] = useState<PortfolioItem | null>(null);
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxVisible, setLightboxVisible] = useState(false);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
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
    { name: "Figma", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773896658/Figma-Logo_t0pp3n.png" },
    { name: "Photoshop", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900297/ps_logo_ld4hl9.png" },
    { name: "Illustrator", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900298/ai_logo_x0wbhp.png" },
    { name: "After Effects", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900298/ai_logo_x0wbhp.png" },
    { name: "InDesign", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900287/indd_logo_b6z33k.png" },
    { name: "Canva Pro", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900671/canva_logo_tiqapn.png" },
    { name: "Midjourney", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900915/mj_logo_zggxbt.png" },
    { name: "Runway", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773901127/runway_logo_c_h9fvko.png" },
    { name: "Adobe Firefly", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900300/fi_logo_jxaqfa.png" },
    { name: "ClickUp", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1773900672/clickup_logo_egqqdk.png" },
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
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
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
            currentName="Creative Production"
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
            align="left"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-[#ffffff]">AI-Powered</span><br/>
                <span className="text-[#e61739]">Graphic Design Services</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                We deliver on-demand graphic design services accelerated by AI workflows for enhanced creative and on-brand asset delivery.
              </p>

              <div className="flex flex-col gap-4 mb-12 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Unlimited graphic design requests with 24–48h turnaround</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">100% brand-aligned by dedicated embedded designers</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">AI-powered workflows for consistency and speed</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setView('contact')}
                  className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group"
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
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">24-48h</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Typical Turnaround</p></div>
            <div><div className="text-xl md:text-2xl font-black">Unlimited</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Asset Requests</p></div>
            <div><div className="text-xl md:text-2xl font-black">100%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Brand Alignment</p></div>
            <div><div className="text-xl md:text-2xl font-black">Top 1%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Vetted Designers</p></div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DO ── */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Production Arsenal</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Do.</h2>
            <p className="text-slate-500 max-w-3xl mx-auto font-medium text-[17px]">On-demand graphic design delivered through embedded pods and AI-enhanced workflows.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: PenTool, title: "Graphic & Ad Design", desc: "High-velocity static ads, social kits, and email templates following strict brand guides." },
              { icon: ShoppingCart, title: "eCommerce Content", desc: "Amazon A+ content, PDP imagery, and high-end product retouching for global retail." },
              { icon: Play, title: "Motion & Video Ops", desc: "Short-form video editing, motion graphics, and animated ad sequences for paid social." },
              { icon: Presentation, title: "Pitch Decks & Sales", desc: "Professional presentation systems and sales collateral that converts complex ideas into clarity." },
              { icon: ShieldCheck, title: "Creative QA & Systems", desc: "Automated brand audits and template systems ensuring 100% visual consistency." },
              { icon: BrainCircuit, title: "AI-Enhanced Workflows", desc: "Deploying Gen-AI for rapid resizing, asset versioning, and smart tagging at scale." },
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

      {/* ── DELIVERY FLOW ── */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple" /></div>
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
              { step: "04", title: "Daily Output", desc: "Consistent asset delivery with real-time performance tracking.", icon: BarChart3 },
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

      {/* ── PORTFOLIO ── */}
      <section id="cp-portfolio" className="py-32 bg-white">
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

      {/* ── PRICING ── */}
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
                {
                  role: "Graphic Designer", price: "$1,800", focus: "Static", focusIcon: Palette,
                  features: ["Social media assets and ad creatives", "Brand collateral and print-ready files", "Template systems and style guide adherence"],
                },
                {
                  role: "Video Editor", price: "$2,200", focus: "Motion", focusIcon: Video,
                  features: ["Short-form content cuts for social and ads", "Multi-format resizing and versioning", "Captions, transitions, and audio sync"],
                },
                {
                  role: "Motion Artist", price: "$2,500", focus: "Anim", focusIcon: Play,
                  features: ["2D and 3D motion graphics production", "Animated explainers and brand intros", "Visual effects and compositing"],
                },
                {
                  role: "UI/UX Designer", price: "$2,800", focus: "Product", focusIcon: Eye,
                  features: ["Web and mobile interface design", "Wireframing, prototyping, and user flows", "Design system creation and component libraries"],
                },
              ].map((plan, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7 flex flex-col hover:bg-white/10 transition-all">
                  <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">{plan.role}</p>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4 flex items-center gap-1.5"><plan.focusIcon size={12} />{plan.focus}</div>
                  <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                  <p className="text-white/30 text-xs font-black uppercase tracking-wide mb-4">/mo</p>
                  <div className="border-t border-white/10 pt-5 mb-6 flex-grow">
                    <ul className="space-y-3">
                      {plan.features.map((f, fi) => (
                        <li key={fi} className="flex items-start gap-3 text-sm font-semibold text-white/70">
                          <CheckCircle2 size={14} className="text-[#E61739] shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
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

      {/* ── TECH STACK ── */}
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

      {/* ── INDUSTRIES + TESTIMONIAL ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Creative Support for <br /><span className="text-[#E61739]">Growing Brands.</span></h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: "eCommerce & Retail", icon: ShoppingCart },
                  { name: "SaaS & Tech Startups", icon: Laptop },
                  { name: "Marketing Agencies", icon: Megaphone },
                  { name: "Real Estate & PropTech", icon: Home },
                  { name: "Consumer Goods", icon: Shirt },
                  { name: "Healthcare & Wellness", icon: HeartPulse },
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
                <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple" /></div>
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

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl overflow-hidden relative border border-white/[0.07]">
          <div className="absolute inset-0 z-0">
            <img src={IMG_CREATIVE_TEAM} alt="Creative Production Team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            {/* Left — headline + bullets */}
            <div className="p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let's Talk Creative
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Build your<br /><span className="text-[#E61739]">creative machine.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm">
                  Tell us about your brand and workload — we'll have a creative ops plan ready within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'Dedicated creative pod, onboarded in 14 days' },
                  { icon: CheckCircle2, text: '50–200+ assets per month at scale' },
                  { icon: CheckCircle2, text: 'Brand-trained team with AI workflow support' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[
                    { val: '200+', label: 'Assets/mo' },
                    { val: '14 Days', label: 'Onboarding' },
                    { val: '500+', label: 'Clients Served' },
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
            <div className="border-l border-white/[0.07] p-12 md:p-16 flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-12">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs">Our creative leads will review your brief and get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (captchaRef.current?.isBot()) return; setSubmitted(true); }} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Send us your brief</h3>
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
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Service You Need</label>
                    <input required className={inp} placeholder="e.g. Graphic Design Pod, Video Editing, UI/UX" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Volume, deadlines, brand guidelines, tools..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <Captcha ref={captchaRef} onVerify={() => {}} theme="dark" />
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
              { q: "What creative services does KDCI's production team provide?", a: "We offer graphic design, video editing and production, motion graphics, UI/UX design, social media content creation, copywriting, email design, ad creative (static and animated), and brand identity work." },
              { q: "How does a managed creative pod work?", a: "A Creative Pod is a dedicated team of 2–6 creatives (Art Director, Designers, Video Editors, Copywriter) assigned exclusively to your account. They operate as your in-house team, just offshore." },
              { q: "What design tools does your team use?", a: "Our designers work in Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects), Canva Pro, Webflow, and Framer. We adapt to whatever's in your existing workflow." },
              { q: "Can KDCI maintain our brand guidelines at scale?", a: "Absolutely. We conduct a brand onboarding session in week one, build a shared asset library, and implement a style guide review step into every deliverable. Brand consistency is a core KPI for our creative teams." },
              { q: "How do we manage revisions and feedback loops?", a: "We use a structured feedback process via Frame.io for video, Figma comments for design, and a project board (Asana, ClickUp, or Notion) for all task tracking. Most feedback cycles complete in under 24 hours." },
              { q: "How quickly can KDCI produce content at scale?", a: "Our creative pods can produce 50–200+ social media assets per month, 10–30 video edits per month, and unlimited copy drafts depending on pod size. We're built for high-velocity creative output." },
              { q: "Do your creatives have experience with performance marketing assets?", a: "Yes. We have a dedicated performance creative unit that specializes in direct-response ad creative for Meta, TikTok, Google, and YouTube. We understand hooks, CTAs, and creative testing frameworks." },
              { q: "Can KDCI handle video production from raw footage?", a: "Yes. Our video editors work from your raw footage, stock footage, and motion graphics briefs. We produce polished edits for social, YouTube, webinars, product demos, and brand films." },
              { q: "What's the minimum team size for a creative engagement?", a: "You can start with a single dedicated creative (e.g., one Graphic Designer or one Video Editor) at a monthly flat rate. Most clients scale to full pods within 90 days after validating the initial hire." },
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
          <img
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
    </div>
  );
};
