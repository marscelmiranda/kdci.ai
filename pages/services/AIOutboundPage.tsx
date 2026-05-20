
import React, { useState, useRef } from 'react';
import { ArrowRight, CheckCircle2, Star, Shield, Target, Mail, Linkedin, BarChart3, Search, Users2, Calendar, TrendingUp, ShoppingCart, Briefcase, Building2, Home, Landmark, Laptop, RefreshCw, Database, MessageSquare, Filter, Zap } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';

const CONTACT_IMG = "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800";

export const AIOutboundPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', service: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const captchaRef = useRef<CaptchaHandle>(null);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  const tools = [
    { name: "Apollo.io",              icon: Search,      desc: "Prospect sourcing & enrichment" },
    { name: "Clay",                   icon: Database,    desc: "Data enrichment & personalization" },
    { name: "Instantly",              icon: Mail,        desc: "Email sequencing at scale" },
    { name: "Smartlead",              icon: Zap,         desc: "Multi-inbox warm-up & sending" },
    { name: "LinkedIn Sales Nav",     icon: Linkedin,    desc: "LinkedIn outreach campaigns" },
    { name: "HubSpot CRM",            icon: BarChart3,   desc: "Pipeline & CRM updates" },
    { name: "Lemlist",                icon: MessageSquare, desc: "Personalized outreach sequences" },
  ];

  const industries = [
    {
      name: "SaaS & Tech",
      icon: Laptop,
      tag: "Fastest to Adopt",
      workflows: ["B2B sales motion — fastest to adopt outbound", "Trial-to-paid conversion sequences", "Product-led outbound to engaged users", "Churn-risk re-engagement campaigns", "Enterprise pipeline development"],
    },
    {
      name: "Professional Services",
      icon: Briefcase,
      tag: "High Deal Value",
      workflows: ["High deal value justifies outbound investment", "Decision-maker outreach at C-suite level", "Thought leadership + cold outreach blend", "RFP pipeline development", "Niche ICP targeting and enrichment"],
    },
    {
      name: "Staffing & Recruitment",
      icon: Users2,
      tag: "Dual Pipeline",
      workflows: ["Employer and candidate pipelines at scale", "Client acquisition for new verticals", "Talent outreach for hard-to-fill roles", "Partnership and referral outreach", "Job board alternative — direct sourcing"],
    },
    {
      name: "E-Commerce Wholesale",
      icon: ShoppingCart,
      tag: "Volume Outreach",
      workflows: ["Retailer and distributor outreach at volume", "New market and channel partner acquisition", "Seasonal buyer outreach automation", "Product launch prospect targeting", "Category expansion campaigns"],
    },
    {
      name: "Real Estate",
      icon: Home,
      tag: "Investor Outreach",
      workflows: ["Investor and buyer outreach automation", "Off-market deal sourcing campaigns", "Agent and broker partnership outreach", "Developer and property manager targeting", "Geographic expansion prospecting"],
    },
    {
      name: "Financial Services",
      icon: Landmark,
      tag: "Institutional",
      workflows: ["Advisor and institutional prospect outreach", "Regulatory-compliant outbound sequences", "AUM growth via targeted outreach", "Product launch and fund promotion", "Cross-sell sequences for existing clients"],
    },
  ];

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30" />
          <div className="blob blob-purple opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs
            setView={setView}
            currentName="AI Outbound & Lead Generation"
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
            align="left"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
                High Demand · AI Outbound & Lead Generation
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-white">Your full</span><br/>
                <span className="text-[#E61739]">Outbound Engine.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                We build and operate your entire outbound engine — ICP research, list building, AI-personalized sequences, and meeting booking as a fully managed service.
              </p>

              <div className="flex flex-col gap-4 mb-12 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">AI-personalized 5-touch sequences — not generic blasts</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">ICP research, list building, and Clay enrichment handled for you</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Meetings booked directly to your calendar — CRM updated automatically</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={() => setView('contact')}
                  className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group"
                >
                  Book a Pipeline Strategy Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — image card */}
            <div className="relative lg:h-full hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=1000&h=1000"
                  alt="AI Outbound team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AI-Powered · Full-Funnel Outbound
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {[
                    { name: 'Apollo.io',  logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1779240994/apollo_logo_l3tlxx.png',   imgH: '22px' },
                    { name: 'Clay',       logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1779237981/clay_ufl558.webp', imgH: '22px' },
                    { name: 'Instantly',  logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1779241458/instantly_logo_rhr68i.svg', imgH: '22px' },
                    { name: 'HubSpot',    logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327928/Hubspot_Logo_skscda.png', imgH: '22px' },
                  ].map((app, i) => (
                    <div key={i} className="h-[37px] md:h-[46px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <img src={app.logo} alt={app.name} className="object-contain" style={{ height: app.imgH }} referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">3,000+</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Contacts/Week (Max)</p></div>
            <div><div className="text-xl md:text-2xl font-black">7 Platforms</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">In Every Campaign</p></div>
            <div><div className="text-xl md:text-2xl font-black">6 Weeks</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">To Full Performance</p></div>
            <div><div className="text-xl md:text-2xl font-black">Weekly</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Reporting & A/B Tests</p></div>
          </div>
        </div>
      </section>

      {/* ── PROBLEM STRIP ── */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Why Outbound Fails In-House</div>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900">Most outbound programmes stall before they produce pipeline.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "Lists go stale before anyone sends", desc: "Building a quality prospect list takes 2–4 weeks. By the time sequences launch, contacts have changed roles, companies have pivoted, and deliverability has dropped." },
              { title: "Sequences read like templates", desc: "Generic \"Hi {{FirstName}}\" emails get deleted on sight. AI personalization at scale — pulling company signals, job changes, and role-specific pain points — requires tools and a system most teams don't have." },
              { title: "SDRs burn out before the engine scales", desc: "A single SDR managing ICP research, list building, inbox warm-up, sequence writing, and CRM updates is doing five jobs. Specialised functions, run by a managed team, produce 3–5× more meetings at lower cost." },
            ].map((p, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white border border-black/[0.04] shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#E61739]/10 flex items-center justify-center mb-5">
                  <span className="text-[#E61739] text-xs font-black">0{i + 1}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 text-sm font-medium leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER ── */}
      <section className="py-32 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">What We Deliver</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">The full outbound stack,<br/>fully managed.</h2>
            <p className="text-white/40 max-w-3xl mx-auto font-medium text-[17px]">Every component of a high-performing outbound engine — research, enrichment, sequences, LinkedIn, booking, and reporting — run end-to-end by our team.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Target,       title: "ICP Definition & Target Market Mapping", desc: "We workshop your ideal customer profile — target titles, company sizes, industries, signals — and build a scoring model before a single contact is sourced." },
              { icon: Filter,       title: "Prospect List Building + Clay Enrichment", desc: "Apollo sourcing combined with Clay enrichment gives every prospect a data-rich profile — job title history, tech stack, funding stage, and custom triggers." },
              { icon: Mail,         title: "AI-Personalized 5-Touch Email Sequences", desc: "Five-step sequences where every touchpoint pulls personalized signals — recent funding, new hire announcements, product launches — written at scale by AI, reviewed by our team." },
              { icon: Linkedin,     title: "LinkedIn Outreach Campaign Management", desc: "Connection requests, InMail sequences, and profile engagement fully managed inside LinkedIn Sales Navigator — coordinated with email for a true multi-channel motion." },
              { icon: Calendar,     title: "Meeting Booking & CRM Pipeline Updates", desc: "Qualified replies are handled by our team, objections are managed, and meetings are booked directly to your calendar. HubSpot or Salesforce is updated in real time." },
              { icon: BarChart3,    title: "Weekly Reports + A/B Test Results", desc: "Every Friday: open rates, reply rates, meeting counts, sequence-level breakdowns, and A/B test results with our recommended next-week optimisations." },
            ].map((cap, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#E61739]/10 border border-[#E61739]/20 flex items-center justify-center text-[#E61739] mb-8"><cap.icon size={26} /></div>
                <h3 className="text-xl font-bold text-white mb-4">{cap.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ONBOARDING TIMELINE ── */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Onboarding Timeline</div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">First meetings in 6 weeks.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">A structured launch process that builds the right foundation before volume ramps — so deliverability holds and meetings actually show.</p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "01", period: "Week 1",   title: "ICP Workshop", desc: "Define target titles, industries, company signals. Build ICP scoring model and messaging brief." },
              { step: "02", period: "Week 2",   title: "List Building", desc: "Source prospects via Apollo. Enrich via Clay. QA every contact before sequences touch them." },
              { step: "03", period: "Week 3",   title: "Sequence Setup", desc: "Write and approve 5-touch email sequences. Set up sending domains. Domain warm-up begins." },
              { step: "04", period: "Week 4",   title: "Test Launch", desc: "Warm inboxes. Launch first 100-contact test batch. Monitor deliverability and early reply signals." },
              { step: "05", period: "Month 2",  title: "Full Volume", desc: "Full volume launch. A/B test subject lines and CTAs. LinkedIn campaign goes live in parallel." },
              { step: "06", period: "Ongoing",  title: "Optimise Weekly", desc: "Weekly performance reports. Sequence optimisation. List refresh. Scale what works, cut what doesn't." },
            ].map((s, i) => (
              <div key={i} className="bg-white rounded-[2rem] p-6 border border-slate-100 shadow-sm flex flex-col">
                <div className="text-[#E61739] text-[9px] font-black uppercase tracking-widest mb-1">{s.step}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">{s.period}</div>
                <h4 className="text-base font-bold text-slate-900 mb-2">{s.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 p-5 rounded-2xl bg-white border border-slate-100 text-center shadow-sm">
            <p className="text-slate-500 text-sm font-medium"><span className="text-slate-900 font-bold">3-month minimum</span> · 6-week ramp before full performance · Sequences are paused and relaunched if deliverability drops below threshold</p>
          </div>
        </div>
      </section>

      {/* ── WHY KDCI ── */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Why KDCI.ai</div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-10 leading-tight">
                Built to produce pipeline,<br/><span className="text-[#E61739]">not just send emails.</span>
              </h2>
              <div className="space-y-6">
                {[
                  { icon: TrendingUp,  title: "Dedicated outbound specialists — not a SaaS tool", desc: "A human team runs every component: ICP researcher, list builder, copywriter, campaign manager, and CRM admin. You get a function, not a subscription." },
                  { icon: RefreshCw,   title: "A/B testing is built into every campaign from week one", desc: "Subject lines, openers, CTAs, and sequence length are tested systematically — not guessed. Every Friday report includes what we're changing and why." },
                  { icon: Filter,      title: "Deliverability-first infrastructure", desc: "Dedicated sending domains, inbox warm-up protocols, and bounce rate monitoring ensure your sequences land in primary inboxes — not spam." },
                  { icon: Database,    title: "Clay enrichment adds personalisation at scale", desc: "Every prospect gets a data-rich profile before a message is sent — funding stage, tech stack, recent news, job changes — so personalisation is signal-based, not templated." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 group">
                    <div className="w-11 h-11 bg-white rounded-2xl shrink-0 flex items-center justify-center text-[#E61739] shadow-sm group-hover:bg-[#E61739] group-hover:text-white transition-all">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/5]">
                <img src={CONTACT_IMG} alt="Outbound team at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
                <div className="absolute bottom-10 left-8 right-8 p-7 rounded-3xl bg-white/95 backdrop-blur-xl shadow-2xl border border-white/10">
                  <blockquote className="border-l-4 border-[#E61739] pl-5">
                    <p className="text-slate-900 font-bold text-lg leading-snug mb-3">"We went from 2 meetings a month to 18 in our first full quarter — same ICP, completely different engine."</p>
                    <footer className="text-slate-500 text-xs font-black uppercase tracking-widest">VP Sales · Series B SaaS</footer>
                  </blockquote>
                </div>
              </div>
            </div>
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Outbound Plans.</h2>
            <p className="text-white/40 text-lg font-medium">Fully managed outbound — from ICP to booked meeting. No hiring, no tooling, no guesswork.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {[
              {
                name: "Launch Package",
                price: "$3,000",
                period: "/mo",
                setup: "$2,000 setup",
                desc: "The right starting point for teams new to managed outbound.",
                features: [
                  "500 contacts per week",
                  "1 active sequence",
                  "Email outreach only",
                  "ICP definition & list building",
                  "Monthly performance report",
                  "CRM pipeline updates",
                ],
                highlight: false,
                badge: null,
              },
              {
                name: "Growth Engine",
                price: "$5,000",
                period: "/mo",
                setup: "$2,500 setup",
                desc: "Multi-channel outbound with LinkedIn — built for teams ready to scale pipeline.",
                features: [
                  "1,500 contacts per week",
                  "Multi-sequence (email + LinkedIn)",
                  "LinkedIn Sales Navigator included",
                  "A/B testing from week 1",
                  "Weekly performance reports",
                  "Meeting booking to your calendar",
                ],
                highlight: true,
                badge: "Most Popular",
              },
              {
                name: "Full Outbound Team",
                price: "$8,000",
                period: "/mo",
                setup: "$3,000 setup",
                desc: "A dedicated SDR and researcher running your outbound as a full function.",
                features: [
                  "3,000+ contacts per week",
                  "Dedicated SDR + researcher",
                  "All channels: email + LinkedIn + CRM",
                  "Clay enrichment on every contact",
                  "Priority inbox management",
                  "Weekly strategy call included",
                ],
                highlight: false,
                badge: null,
              },
            ].map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.highlight ? 'bg-white/5 border-2 border-[#E61739]' : 'bg-white/5 border border-white/10'}`}>
                {plan.badge && <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">{plan.badge}</div>}
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
                <button onClick={() => setView('contact')} className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'}`}>
                  Request Plan
                </button>
              </div>
            ))}
          </div>

          <p className="text-center text-white/25 text-xs font-bold uppercase tracking-widest mt-6">3-month minimum · 6-week ramp before full performance output</p>

          <div className="mt-8 p-7 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Need a custom outbound programme?</h4>
              <p className="text-sm text-white/40 font-medium">Multi-market campaigns, dedicated senior SDR teams, or agency white-label arrangements — contact us.</p>
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-4">Outbound works best where the numbers make sense.</h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium">Six verticals where managed outbound delivers the highest pipeline ROI.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] border border-slate-100 bg-white shadow-sm hover:shadow-xl hover:border-[#E61739]/20 transition-all duration-500 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                    <ind.icon size={22} />
                  </div>
                  <span className="px-3 py-1 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest rounded-full">{ind.tag}</span>
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
            <h3 className="text-2xl md:text-4xl font-heading font-bold text-white mb-4">The modern outbound stack.</h3>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">Every tool in our stack is configured, managed, and optimised by our team — you never touch a dashboard.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((tool, i) => (
              <div key={i} className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 flex flex-col gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#E61739]/10 border border-[#E61739]/20 flex items-center justify-center text-[#E61739]">
                  <tool.icon size={20} />
                </div>
                <div>
                  <h4 className="text-white font-bold text-base mb-1">{tool.name}</h4>
                  <p className="text-white/35 text-xs font-medium">{tool.desc}</p>
                </div>
              </div>
            ))}
            <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/[0.07] flex flex-col gap-4 items-start justify-center">
              <div className="text-white/25 text-xs font-black uppercase tracking-widest">Custom tools as needed</div>
              <p className="text-white/20 text-xs font-medium leading-relaxed">We adapt to your existing stack and add tools where gaps exist in your outbound motion.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ── */}
      <section className="py-16 bg-[#020202]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="border-l-4 border-[#E61739] pl-8 py-2">
            <p className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug mb-4">
              "We pause and rebuild any sequence that drops below our deliverability threshold — at no extra cost. Your sender reputation is our responsibility."
            </p>
            <footer className="text-white/30 text-[11px] font-black uppercase tracking-widest">KDCI.ai Outbound Guarantee</footer>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6 bg-[#020202]">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-[4rem] overflow-hidden relative border border-white/[0.07]">
          <div className="absolute inset-0 z-0">
            <img src={CONTACT_IMG} alt="AI Outbound Team" className="w-full h-full object-cover opacity-[0.05]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80" />
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            <div className="p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let's Build Your Pipeline
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Start booking<br /><span className="text-[#E61739]">meetings in 6 weeks.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm">
                  Tell us about your ICP and revenue targets — we'll have a campaign architecture and pricing ready within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'ICP workshop and sequence approval in week 1' },
                  { icon: CheckCircle2, text: 'First test batch live by week 4 — full volume by month 2' },
                  { icon: CheckCircle2, text: '3-month minimum · 6-week ramp to full performance' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[
                    { val: '$3,000', label: 'Starting/mo' },
                    { val: '6 Weeks', label: 'To Performance' },
                    { val: '7', label: 'Platforms Run' },
                  ].map((s, i) => (
                    <div key={i}>
                      <div className="text-xl font-black text-white mb-0.5">{s.val}</div>
                      <div className="text-[9px] text-white/25 font-black uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-l border-white/[0.07] p-12 md:p-16 flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-12">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Brief received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs">Our outbound team will review your ICP and goals and reach out within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); if (captchaRef.current?.isBot()) return; setSubmitted(true); }} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Send us your campaign brief</h3>
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
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Outbound Plan</label>
                    <input required className={inp} placeholder="e.g. Launch Package, Growth Engine, Full Outbound Team" value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="ICP, target industries, average deal size, CRM in use..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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
              { q: "What exactly is 'fully managed' outbound?", a: "It means we handle every component: ICP definition, prospect sourcing, Clay enrichment, sequence writing, domain setup, inbox warm-up, LinkedIn campaign management, reply handling, meeting booking, CRM updates, and weekly reporting. You review and approve the ICP and sequences, then we run the engine. Your only job is to show up to the meetings we book." },
              { q: "Why is there a 6-week ramp before full performance?", a: "Cold email deliverability depends on sender reputation. Sending high volumes from a new domain immediately will land in spam. We use a structured warm-up protocol — starting with small batches, gradually increasing volume, monitoring bounce and spam rates — before scaling to full contact volume. Skipping this destroys your domain reputation. We don't skip it." },
              { q: "How many meetings should we expect?", a: "Meetings booked depend on ICP quality, deal size, and market saturation. Typical benchmarks for our managed programmes: 8–15 meetings/month on the Launch Package, 15–30 on the Growth Engine, and 25–45+ on the Full Outbound Team. These are ranges — actual results depend on your market and offer." },
              { q: "What's the difference between the Growth Engine and Full Outbound Team?", a: "The Growth Engine ($5,000/mo) runs 1,500 contacts/week across email and LinkedIn with multi-sequence testing — ideal for teams with a defined ICP who want to scale outbound. The Full Outbound Team ($8,000/mo) adds a dedicated SDR and researcher, 3,000+ contacts/week, Clay enrichment on every contact, and a weekly strategy call — it's a full outbound function, not just a campaign." },
              { q: "Do you handle LinkedIn outreach as well as email?", a: "Yes — LinkedIn outreach is included from the Growth Engine tier upward. We use LinkedIn Sales Navigator to run connection requests, personalised InMail sequences, and profile engagement campaigns, coordinated with email so the outreach is multi-channel rather than repetitive." },
              { q: "What CRM do you update and how?", a: "We natively integrate with HubSpot and Salesforce. Every qualified reply, booked meeting, and status change is logged in your CRM in real time. If you use a different CRM, we discuss integration options during onboarding — most standard CRMs can be connected via Zapier." },
              { q: "Can we review and approve the sequences before launch?", a: "Yes — always. We write the first sequence and present it for your review and approval before a single email is sent. You can request edits, approve, or reject. We iterate until you're satisfied. The same applies to LinkedIn scripts and A/B test variants." },
              { q: "What's the minimum commitment?", a: "All plans require a 3-month minimum. This gives the ramp period time to complete and delivers enough performance data to optimise. Most clients continue beyond 3 months — outbound compounds as we learn what resonates with your ICP and refine the sequences accordingly." },
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

    </div>
  );
};
