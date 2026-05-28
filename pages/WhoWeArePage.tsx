
import React from 'react';
import { Lightbulb, Target, ShieldCheck, UsersRound, Globe, MapPin, Quote, UserCog, Zap as ZapBolt, LifeBuoy, ArrowRight, Globe as GlobeIcon, Cpu, Star, TrendingDown, BrainCircuit, Palette, HeartPulse, Code, ClipboardList } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { IMG_CX_TEAM, IMG_CX_TEAM2, IMG_DEV_TEAM } from '../data';
import IMG_WHO_WE_ARE_HERO from '@/attached_assets/kdci-team-manila-headquarters.webp';
import IMG_HQ_BUILDING from '@/attached_assets/kdci-philippine-hq-one-corporate-centre-ortigas.webp';
import IMG_BUILD_TEAMS from '@/attached_assets/kdci-team-welcoming-new-offshore-client.webp';

const STATS = [
  { value: '2011', label: 'Year Founded' },
  { value: 'Up to 70%', label: 'Savings vs. US Hiring' },
  { value: '300+', label: 'Team Members' },
  { value: '50+', label: 'Global Clients' },
];

const TESTIMONIALS = [
  {
    quote: "We have found KDCI to be a consistently reliable partner, always willing to 'go the extra mile' to ensure our valued customers receive the best possible service.",
    author: "Operations Director",
    company: "Global E-Commerce Brand",
  },
  {
    quote: "It's been five years since we started working with KDCI, and it just keeps getting better and better. We've grown together and achieved a lot of shared success. Overall, they're incredibly professional yet fun to work with.",
    author: "CEO",
    company: "Technology Scale-Up",
  },
  {
    quote: "KDCI seamlessly integrated into our workflows and culture. Their team felt like an extension of our own — not a vendor, but a true partner invested in our outcomes.",
    author: "VP of Product",
    company: "SaaS Company",
  },
];

export const WhoWeArePage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">

      {/* 1. Hero */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-40"></div>
          <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="Our Company" align="left" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 w-fit">
                Trusted Offshore Partner Since 2011
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-[#ffffff]">Your Dedicated </span>
                <span className="text-[#e61739]">AI Operations Partner.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed">
                Founded by executives with 20+ years of proven experience, KDCI delivers AI solutions that empower brands with AI-augmented capabilities, full cycle AI agent management, brand-grade creative production, customer service support, and more.
              </p>
            </div>

            {/* Right — image card */}
            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img loading="lazy"
                  src={IMG_WHO_WE_ARE_HERO}
                  alt="KDCI team collaborating at their Manila headquarters in Ortigas Center, Philippines"
                  className="w-full h-full object-cover object-right"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Ortigas Center, Manila
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-around">
                  {[
                    { label: 'Founded', value: '2011' },
                    { label: 'Team Members', value: '300+' },
                    { label: 'Global Clients', value: '50+' },
                    { label: 'Cost Savings', value: '70%' },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-white font-black text-xl md:text-2xl leading-none">{stat.value}</div>
                      <div className="text-white/50 text-[9px] font-bold uppercase tracking-widest mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-[#E61739] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mission / Vision */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            <div className="bg-[#F5F5F7] p-10 md:p-14 rounded-[3rem] border border-black/[0.03] flex flex-col justify-center min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 border border-slate-100 w-fit">
                <Target size={12} /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                To provide the best work through combining intelligent outsourcing and AI-powered operations built for real business outcomes.
              </h2>
            </div>

            <div className="bg-[#1D1D1F] p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex flex-col justify-center min-h-[400px]">
              <div className="mesh-container opacity-30 pointer-events-none"><div className="blob blob-purple"></div></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10 w-fit">
                  <Lightbulb size={12} /> Our Vision
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  To power the best companies in the world with the best teams.
                </h2>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Story / Evolution */}
      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Our History
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">The KDCI Story.</h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-7 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-[#1D1D1F]/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
              {[
                { year: '2011', title: 'Founded', desc: 'Established with a mission to empower brands with the best offshore talent and expertise.' },
                { year: '2015', title: 'Service Expansion', desc: 'Expanded beyond creative work into customer service, back office support, and web development.' },
                { year: '2018', title: 'Rapid Growth', desc: 'Scaled to 20+ client accounts and 150+ team members across multiple service verticals.' },
                { year: '2025', title: 'AI-Powered Operations', desc: 'Serving 50+ global clients with 300+ specialists, now fully integrating AI into every workflow.' },
              ].map((milestone, idx) => (
                <div key={idx} className="relative flex flex-col items-start md:items-center text-left md:text-center">
                  <div className="w-14 h-14 rounded-full bg-[#E61739] text-white flex items-center justify-center font-black text-sm mb-5 relative z-10 shrink-0 shadow-lg">
                    {milestone.year.slice(2)}
                  </div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">{milestone.year}</p>
                  <h4 className="font-black text-[#1D1D1F] text-sm mb-2">{milestone.title}</h4>
                  <p className="text-[#86868b] text-xs font-medium leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* 6. AI Enablement */}
      <section className="py-32 bg-[#1D1D1F] text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-magenta"></div><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
              <BrainCircuit size={12} /> AI-Enhanced Services
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Human Expertise,<br /><span className="text-[#E61739]">Powered by AI.</span></h2>
            <p className="text-white/50 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              KDCI enables brands to streamline operations with offshore experts delivering end-to-end AI solutions. Our teams are trained to operate alongside them, boosting output, accuracy, and results across every function.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {[
              {
                icon: BrainCircuit,
                title: "AI Consulting & Implementation",
                desc: "We audit your operations, design your AI stack, and go live in 42 days. Strategy, agent builds, integrations, and post-launch monitoring — all under one roof.",
              },
              {
                icon: ShieldCheck,
                title: "AI Observability and Governance",
                desc: "Daily oversight of every AI agent you deploy. We catch drift, hallucinations, and integration failures before your customers do — with monthly performance scorecards.",
              },
              {
                icon: Target,
                title: "AI Outbound & Lead Generation",
                desc: "A fully managed outbound engine: ICP research, Clay-enriched list building, AI-personalized sequences, LinkedIn outreach, and booked meetings — end to end.",

              },
              {
                icon: UsersRound,
                title: "AI Workforce Augmentation",
                desc: "Pre-trained Filipino specialists — prompt engineers, AI ops leads, data analysts, and VAs — embedded in your team at up to 70% less than equivalent US hiring costs.",
              },
              {
                icon: HeartPulse,
                title: "AI-Augmented Customer Experience",
                desc: "AI handles 70%+ of first-contact volume. Human escalation specialists in Manila handle everything else — with monthly CSAT optimization and CX scorecards.",
              },
              {
                icon: Palette,
                title: "AI Creative Studio",
                desc: "Brand-grade design at production speed. Our Manila team uses Midjourney, Firefly, Runway ML, and Adobe CC to deliver assets faster and at lower cost than any traditional agency.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-[#E61739]/20 rounded-xl flex items-center justify-center mb-6">
                  <item.icon size={20} className="text-[#E61739]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-white/50 font-medium leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="border-t border-white/10 pt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10">
                <Cpu size={11} /> Tools Our Teams Use
              </div>
              <p className="text-white/40 text-sm font-medium">We keep our experts current with the latest AI and productivity technologies across every industry we serve.</p>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {[
                { name: 'Midjourney', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/0/06/Midjourney_logo.svg', cat: 'Generative Art' },
                { name: 'Gemini', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg', cat: 'Multimodal AI' },
                { name: 'ChatGPT', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg', cat: 'LLM Reasoning' },
                { name: 'CoPilot', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Microsoft_Copilot_Icon.svg', cat: 'Code Assist' },
                { name: 'Zapier', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Cib-zapier_%28CoreUI_Icons_v1.0.0%29.svg', cat: 'Automation' },
                { name: 'Claude', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg', cat: 'Long Context' },
                { name: 'Firefly', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Firefly_Logo.svg', cat: 'Creative AI' },
                { name: 'HubSpot', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Cib-hubspot_%28CoreUI_Icons_v1.0.0%29.svg', cat: 'CRM & Sales' },
              ].map((tool, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-all group">
                  <img loading="lazy" src={tool.imgSrc} alt={tool.name} className="w-8 h-8 object-contain opacity-40 group-hover:opacity-80 transition-all grayscale group-hover:grayscale-0 mb-2" />
                  <div className="text-[10px] font-bold text-white/50 group-hover:text-white/80 transition-colors text-center">{tool.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Core Values */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">The DNA</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Our Core Values.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Principles that guide every team we build and every partnership we forge.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: "Outcome Obsessed", desc: "We align on KPIs at kickoff — deflection rates, pipeline booked, output velocity — and report against them every month. Miss a target, you get a credit." },
              { icon: UsersRound, title: "People at the Core", desc: "Every specialist is hand-picked, AI-certified, and backed by KDCI's full HR, payroll, and compliance infrastructure — so you get elite talent without the admin burden." },
              { icon: ShieldCheck, title: "Radical Transparency", desc: "Real-time dashboards, weekly standups, and open access to your team's daily output. No black boxes, no hidden markups, no surprises on your invoice." },
              { icon: ZapBolt, title: "Always Improving", desc: "We treat go-live as the starting line, not the finish. Every engagement includes monthly performance reviews, AI model retraining, and workflow refinement — so results compound over time." },
            ].map((value, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 transition-transform">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Global Footprint */}
      <section className="py-32 bg-[#F5F5F7] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <div>
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.25em] mb-4">Our Location</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Global Roots,<br /><span className="text-[#E61739]">Philippine Excellence.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                KDCI.ai operates with a distributed mindset–AI-powered operations from the Philippines, covering US, Europe, and beyond — zero gaps, full time zone coverage.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] border border-slate-200 shrink-0 shadow-sm"><Globe size={20} /></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Client Base</h4>
                    <p className="text-slate-500 text-sm font-medium">Primarily serving US and European businesses with 50+ active global client accounts.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><MapPin size={20} /></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Philippine HQ</h4>
                    <p className="text-slate-500 text-sm font-medium">3008 One Corporate Centre, Julia Vargas Avenue, Ortigas Center, Pasig City 1605, Metro Manila, Philippines.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] border border-slate-200 shrink-0 shadow-sm"><ZapBolt size={20} /></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">24/7 Coverage</h4>
                    <p className="text-slate-500 text-sm font-medium">Our overlapping shift structure provides uninterrupted coverage across all major time zones.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative rounded-[4rem] overflow-hidden shadow-xl">
              <img loading="lazy"
                src={IMG_HQ_BUILDING}
                alt="KDCI Philippine headquarters — One Corporate Centre, Ortigas Center, Manila"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              <div className="absolute top-8 left-8">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest backdrop-blur-md">
                  <MapPin size={10} /> Ortigas Center, Metro Manila
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Client Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Client Stories</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What Our Clients Say.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Built on long-term partnerships, not one-time transactions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#F5F5F7] rounded-[2.5rem] p-10 border border-black/[0.03] flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-[#E61739] fill-[#E61739]" />
                  ))}
                </div>
                <Quote size={28} className="text-[#E61739] opacity-30 mb-4" />
                <p className="text-slate-700 font-medium leading-relaxed italic flex-1 mb-8">"{t.quote}"</p>
                <div className="border-t border-slate-200 pt-6">
                  <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                  <div className="text-[#E61739] text-xs font-black uppercase tracking-widest mt-0.5">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Leadership Culture */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="rounded-[40px] aspect-[4/5] overflow-hidden relative shadow-2xl">
                <img loading="lazy" src={IMG_BUILD_TEAMS} alt="KDCI leadership team welcoming and onboarding a new offshore client partner" className="absolute inset-0 w-full h-full object-cover object-center" />
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-10 rounded-[40px] shadow-2xl border border-white/50">
                  <Quote className="text-[#E61739] mb-4 opacity-50" size={32} />
                  <p className="text-xl font-heading font-bold text-slate-900 mb-2 italic">"The bench is deep."</p>
                  <p className="text-slate-500 text-sm font-medium">We vet for more than skills — we hire for leadership, curiosity, and cultural fit.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.25em] mb-4">How We Build Teams</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Elite Experts,<br />Not Just <span className="text-[#E61739]">Labor.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
                When building your team with KDCI, every KDCI team member is hand-picked to fit your culture and hit the ground running.
              </p>
              <div className="space-y-6">
                {[
                  { icon: UserCog, title: "Skills & Domain Match", desc: "Specialists, not generalists. Every role is matched to verified domain experts with real agentic AI workflow experience." },
                  { icon: ZapBolt, title: "Cultural Compatibility", desc: "Our screening evaluates communication style, values alignment, and team fit alongside technical ability, making sure your offshore AI team integrates like an internal hire." },
                  { icon: LifeBuoy, title: "Ongoing Development", desc: "Our teams undergo continuous training to keep up with the latest AI tools, agentic technologies, and industry best practices." },
                ].map((feat, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center text-[#E61739] border border-slate-200 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
                      <feat.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{feat.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
          <div className="absolute inset-0 z-0">
            <img loading="lazy"
              src={IMG_CX_TEAM}
              alt="KDCI AI solutions team at their Philippine offshore staffing headquarters"
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
            />
          </div>
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-purple opacity-30"></div>
            <div className="blob blob-magenta opacity-30"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">
              Your AI Solutions Partner,<br /><span className="text-shine-red">Not Just a Vendor.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-4 font-medium leading-relaxed">
              KDCI delivers end-to-end AI solutions — agentic workflows, AI-trained operators, and intelligent automation — deployed as one managed system, at up to 70% less than in-house.
            </p>
            <p className="text-white/30 text-sm font-medium mb-12 uppercase tracking-widest">Trusted Since 2011 · 50+ Global Clients · 300+ Team Members</p>
            <button
              onClick={() => setView('contact')}
              className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto"
            >
              Partner with KDCI <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
