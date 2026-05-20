
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, Briefcase, UserCheck, ClipboardCheck, Workflow, BrainCircuit, Globe2, CheckCircle2, Star, Award, Target, Shield, Zap, TrendingDown, X, Users2, BarChart3, Settings2, HeartPulse, ShoppingCart, Laptop, Megaphone, RefreshCw, Clock } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';
import { IMG_REC_HERO, IMG_REC_VETTING, INDUSTRIES } from '../../data';
import recIncludedImg from '@/attached_assets/Gemini_Generated_Image_x4lp18x4lp18x4lp_1777967577991.png';
import IMG_HERO_MEETING from '../../attached_assets/Untitled-1_1778062521021.png';

const INDUSTRY_ROLES: Record<string, string[]> = {
  'ecommerce':      ['Growth Marketer', 'Catalog Manager', 'SEO Specialist', 'CX Lead', 'Visual Merchandiser', 'E-commerce Analyst'],
  'software-dev':   ['Product Manager', 'Full-Stack Developer', 'QA Engineer', 'DevOps Engineer', 'Technical Writer', 'UI/UX Designer'],
  'property-mgmt':  ['Property Manager', 'Listings Coordinator', 'Transaction Coordinator', 'CRM Specialist', 'Real Estate VA', 'Leasing Admin'],
  'fintech':        ['Compliance Analyst', 'Fraud Detection Specialist', 'Financial Analyst', 'Data Analyst', 'CX Lead', 'KYC Specialist'],
  'healthcare':     ['Medical VA', 'Healthcare Administrator', 'Medical Biller/Coder', 'Patient Coordinator', 'Claims Processor', 'Prior Auth Specialist'],
  'marketing-ad':   ['Digital Marketing Manager', 'Content Strategist', 'Social Media Manager', 'PPC Specialist', 'Brand Designer', 'Email Marketing Specialist'],
  'retail':         ['Inventory Manager', 'Customer Service Rep', 'E-commerce Coordinator', 'Supply Chain Analyst', 'Merchandiser', 'Returns & Refunds Specialist'],
  'logistics':      ['Logistics Coordinator', 'Supply Chain Analyst', 'Operations Manager', 'Data Entry Specialist', 'Freight Broker VA', 'Dispatch Coordinator'],
  'travel':         ['Booking Coordinator', 'Customer Support Agent', 'Travel Consultant', 'Reservations Manager', 'Content Writer', 'Itinerary Planner'],
  'edtech':         ['Curriculum Developer', 'Instructional Designer', 'LMS Administrator', 'Student Support Rep', 'Content Creator', 'Academic Researcher'],
  'legal':          ['Legal VA', 'Paralegal', 'Contract Reviewer', 'Legal Researcher', 'Compliance Coordinator', 'Litigation Support Specialist'],
  'insurance':      ['Claims Processor', 'Underwriting Assistant', 'Policy Administrator', 'Insurance Analyst', 'Customer Support Rep', 'Loss Control Specialist'],
  'media':          ['Content Writer', 'Copy Editor', 'Social Media Manager', 'Video Editor', 'SEO Content Specialist', 'Podcast Producer'],
  'consumer-tech':  ['Product Support Specialist', 'Technical Writer', 'QA Tester', 'Customer Success Manager', 'Community Manager', 'App Onboarding Specialist'],
  'telecom':        ['Technical Support Agent', 'Network Documentation Specialist', 'Billing Specialist', 'Sales Support Rep', 'Customer Service Rep', 'NOC Analyst'],
  'auto':           ['Parts Coordinator', 'Customer Service Rep', 'Inventory Manager', 'Digital Marketing Specialist', 'Data Entry Specialist', 'Warranty Claims Processor'],
  'fashion':        ['Product Listing Specialist', 'Visual Merchandiser', 'Customer Service Rep', 'Social Media Manager', 'E-commerce Coordinator', 'Influencer Outreach Coordinator'],
  'energy':         ['Data Analyst', 'Operations Coordinator', 'Compliance Specialist', 'Billing Analyst', 'Customer Support Rep', 'Regulatory Affairs Assistant'],
  'prof-services':  ['Executive VA', 'Research Analyst', 'Project Coordinator', 'Business Development Rep', 'Client Success Manager', 'Proposal Writer'],
  'gov':            ['Data Entry Specialist', 'Records Management Specialist', 'Administrative Assistant', 'Research Analyst', 'Compliance Coordinator', 'Public Affairs Writer'],
};

export const GlobalRecruitmentPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const modalCaptchaRef = useRef<CaptchaHandle>(null);
  const handleModalForm = (e: React.FormEvent) => { e.preventDefault(); if (modalCaptchaRef.current?.isBot()) return; setModalSubmitted(true); };
  const closeModal = () => { setShowModal(false); setModalSubmitted(false); setModalForm({ name: '', company: '', email: '', phone: '', role: '', notes: '' }); };
  const handleForm = (e: React.FormEvent) => { e.preventDefault(); if (captchaRef.current?.isBot()) return; setSubmitted(true); };
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors";
  const lightInp = "w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm";

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

      {/* ── HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
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
          .reveal.in-view { opacity: 1; transform: translateY(0); }
          .reveal.d1 { transition-delay: 0.1s; }
          .reveal.d2 { transition-delay: 0.2s; }
          .reveal.d3 { transition-delay: 0.3s; }
          .reveal.d4 { transition-delay: 0.4s; }
          .reveal.d5 { transition-delay: 0.5s; }
        `}</style>

        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="AI Workforce Augmentation" parent={{ name: 'Solutions', view: 'solutions-hub' }} align="left" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 w-fit">
                Global Recruitment Solutions
              </div>
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-shine-white">AI-Ready Workforce.</span><br/>
                <span className="text-[#FFFFFF]">Top Filipino Talents.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                Build an AI-ready team, ranging from prompt engineers, AI ops specialists, data analytics, and AI-enabled VAs at a fraction of US hiring costs.
              </p>

              <div className="flex flex-col gap-4 mb-8 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Role onboarding within 5 to 7 business days</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Proficient in AI tools such as Claude, Midjourney, Zapier, and more</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">HR, payroll, and compliance fully managed by KDCI.ai</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Request a Specialist <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — image card */}
            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src={IMG_HERO_MEETING}
                  alt="KDCI AI Workforce Augmentation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AI-Trained · Philippines-Based
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {[
                    { name: "ChatGPT", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778627897/chatgpt_logo_b4z32j.png", imgH: '24px' },
                    { name: "Gemini",  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/330px-Google_Gemini_logo_2025.svg.png", imgH: '20px' },
                    { name: "Claude",  logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/330px-Claude_AI_logo.svg.png", imgH: '18px' },
                    { name: "Grok",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Grok-feb-2025-logo.svg/330px-Grok-feb-2025-logo.svg.png", imgH: '28px' },
                  ].map((app: any, i) => (
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
            <div><div className="text-xl md:text-2xl font-black">5–7 Days</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Role Onboarding</p></div>
            <div><div className="text-xl md:text-2xl font-black">70%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Below US Hiring Cost</p></div>
            <div><div className="text-xl md:text-2xl font-black">14 Months</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Avg. Placement Tenure</p></div>
            <div><div className="text-xl md:text-2xl font-black">2-Week</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Replacement Guarantee</p></div>
          </div>
        </div>
      </section>

      {/* ── WHAT WE DELIVER ── */}
      <section className="py-32 bg-[#080808] relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6">
              <Sparkles size={12} /> What We Deliver
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight tracking-tight ml-[120px] mr-[120px]">
              Autonomous workforce productive from day one.
            </h2>
            <p className="text-white/40 text-lg font-medium max-w-3xl mx-auto leading-relaxed">
              Dedicated specialists from the Philippines trained on AI tools, intelligent workflows, and accountability frameworks that power modern, high-performing remote teams.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Users2,       title: "Dedicated Team Member", desc: "Full-time or part-time — one specialist embedded in your workflow, available on your schedule, aligned to your tools and processes." },
              { icon: BrainCircuit, title: "Pre-Trained on Today's AI Stack", desc: "Every AI-ready hire comes fluent in Claude, GPT-4o, Midjourney, Zapier, and other enterprise AI tools." },
              { icon: Zap,          title: "Live in 5–7 Business Days", desc: "Fully managed onboarding, live in under two weeks. Intelligent candidate matching…" },
              { icon: ClipboardCheck, title: "HR, Payroll & Compliance Managed", desc: "KDCI.ai handles all employment administration — payroll, statutory benefits, Philippine labor compliance, and HR documentation." },
              { icon: BarChart3,    title: "Monthly KPI Reviews", desc: "Monthly performance reviews with structured KPI tracking. You see what's working, what's not, and how to scale." },
              { icon: RefreshCw,    title: "2-Week Replacement Guarantee", desc: "If a placement doesn't work out for any reason, we find and onboard a replacement within two weeks at zero additional cost." },
            ].map((cap, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/[0.07] hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 rounded-2xl bg-[#E61739]/10 border border-[#E61739]/20 flex items-center justify-center text-[#E61739] mb-8"><cap.icon size={26} /></div>
                <h3 className="text-xl font-bold text-white mb-4">{cap.title}</h3>
                <p className="text-white/40 font-medium leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>

          {/* Platforms strip */}
          <div className="mt-16 p-6 rounded-2xl bg-white/[0.03] border border-white/[0.07] text-center">
            <p className="text-[10px] text-white/30 font-black uppercase tracking-widest mb-3">Platforms Every Specialist Is Trained On</p>
            <p className="text-white/60 font-semibold text-sm md:text-base">
              Claude / ChatGPT / Gemini · Zapier / Make / n8n · HubSpot / Salesforce · Midjourney / Canva AI · Notion AI / ClickUp AI · Custom tools as needed
            </p>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <section className="py-12 bg-[#020202] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-3 gap-4">

            <div className="bg-[#E61739] rounded-3xl p-8 flex items-center gap-6" style={{ animation: 'pulseRing 2.8s ease-in-out 2s infinite' }}>
              <div className="shrink-0">
                <div className="text-[4.5rem] font-black text-white leading-none">2</div>
                <div className="text-sm font-black text-white/70 uppercase tracking-widest -mt-1">Week Guarantee</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm font-medium leading-relaxed">
                  If the specialist isn't the right fit, we replace them within two weeks — at zero cost.
                </p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <TrendingDown size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">70% Less</div>
                <h4 className="text-sm font-black text-white mb-1">Fraction of US Cost</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed">AI-trained Philippines specialists at a fraction of equivalent US or UK hiring cost.</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Settings2 size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Zero Admin</div>
                <h4 className="text-sm font-black text-white mb-1">HR Fully Managed</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed">Payroll, benefits, compliance, and HR documentation handled end-to-end by KDCI.ai.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── ONBOARDING TIMELINE ── */}
      <section id="how-it-works" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Onboarding Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight text-left">
              Your AI-Skilled Hire, <span className="text-[#E61739]">Live in 5–7 Days</span><span className="text-[#1D1D1F]">.</span>
            </h2>
            <p className="text-slate-500 text-lg font-medium max-w-3xl leading-relaxed mt-6 text-left">
              We've got a proven onboarding framework that places future-ready talent inside your workflow, so they go from role brief to productive from day-one fast.
            </p>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#1D1D1F]/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { n: '01', period: 'Day 1–2',  title: 'Role Brief Call',      desc: 'Define tools, tasks, hours, and KPIs. We align on the exact profile needed before sourcing begins.' },
                { n: '02', period: 'Day 3–5',  title: 'Candidate Matching',   desc: 'Matching from KDCI.ai\'s talent pool of AI-trained specialists — pre-vetted and tool-proficient.' },
                { n: '03', period: 'Day 6–7',  title: 'Client Interviews',    desc: 'You interview shortlisted candidates, select and confirm your hire. We handle offer and acceptance.' },
                { n: '04', period: 'Week 2',   title: 'Onboarding',           desc: 'Tools access, workflow setup, and training aligned to your processes. Specialist is fully set up.' },
                { n: '05', period: 'Week 3',   title: 'First Full Week',      desc: 'First full productive week. Daily check-ins to ensure alignment, output quality, and tool usage.' },
                { n: '06', period: 'Month 2+', title: 'Full Integration',     desc: 'Full integration and monthly KPI review. Scale up additional seats as needs grow.' },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-start md:items-center text-left md:text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E61739] text-white flex items-center justify-center font-black text-sm mb-5 relative z-10 shrink-0 shadow-lg">
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
              <div className="w-10 h-10 bg-[#E61739]/10 rounded-xl flex items-center justify-center shrink-0">
                <Clock size={18} className="text-[#E61739]" />
              </div>
              <div>
                <h4 className="font-black text-[#1D1D1F] text-sm mb-0.5">Ongoing from Month 2</h4>
                <p className="text-[#86868b] text-sm font-medium">Monthly KPI reviews · 2-week replacement guarantee · scale seats as you grow</p>
              </div>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center gap-2">
              Request Your First Specialist <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Simple, Transparent Pricing</h2>
            <p className="text-white/40 text-lg font-medium">Dedicated AI-trained specialists with no agency markup — flat monthly rate, all HR included.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-all">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">Part-Time</p>
              <div className="text-4xl font-black text-white mb-1">$2,000<span className="text-xl text-white/40">/mo</span></div>
              <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">$500 setup · 20 hrs/wk</p>
              <p className="text-white/40 text-sm font-medium mb-8 leading-relaxed">1 dedicated AI-trained specialist · set weekly schedule · all tools included.</p>
              <div className="border-t border-white/10 pt-6 mb-8 flex-grow">
                <ul className="space-y-3">
                  {["20 hours per week · set schedule", "AI tool proficiency included", "HR, payroll & compliance managed", "Monthly KPI review", "2-week replacement guarantee"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/60">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all">
                Request a Specialist
              </button>
            </div>

            <div className="bg-white/5 border-2 border-[#E61739] rounded-3xl p-8 flex flex-col relative shadow-2xl">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">Most Popular</div>
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">Full-Time</p>
              <div className="text-4xl font-black text-white mb-1">$3,500<span className="text-xl text-white/40">/mo</span></div>
              <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">$750 setup · 40 hrs/wk</p>
              <p className="text-white/40 text-sm font-medium mb-8 leading-relaxed">1 dedicated specialist · full-time embedded in your team · all AI tools included.</p>
              <div className="border-t border-white/10 pt-6 mb-8 flex-grow">
                <ul className="space-y-3">
                  {["40 hours per week · full-time", "All AI tools proficiency included", "HR, payroll & compliance managed", "Monthly KPI review + check-ins", "2-week replacement guarantee", "Avg. 14-month placement tenure"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-[#E61739] text-white font-bold text-sm hover:bg-[#c51431] transition-all shadow-lg">
                Request a Specialist
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-all">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">Team (3+ Seats)</p>
              <div className="text-4xl font-black text-white mb-1">$2,800<span className="text-xl text-white/40">/seat/mo</span></div>
              <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">$1,500 setup · volume discount</p>
              <p className="text-white/40 text-sm font-medium mb-8 leading-relaxed">3+ dedicated specialists · volume discount · team lead included at 5+ seats.</p>
              <div className="border-t border-white/10 pt-6 mb-8 flex-grow">
                <ul className="space-y-3">
                  {["Minimum 3 seats", "Volume pricing at 3+ seats", "Team lead included at 5+ seats", "Unified HR & payroll management", "Monthly team KPI review", "2-week replacement guarantee"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/60">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />{f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all">
                Request a Team Quote
              </button>
            </div>

          </div>

          <p className="text-center text-white/25 text-xs font-bold uppercase tracking-widest mt-6">3-month minimum · Low churn — avg 14 months per placement</p>
        </div>
      </section>

      {/* ── INDUSTRY SPECIALIZATION ── */}
      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Vertical Specialization. AI-Ready Workforce.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
              Our AI-trained specialists understand your industry's unique demands, covering 20+ verticals with pre-built role playbooks and tool configurations.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Left: industry list */}
            <div className="bg-white rounded-3xl border border-black/5 p-3 shadow-sm">
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
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white min-h-[520px] flex flex-col">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <selectedInd.icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight">{selectedInd.name}</h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Top AI-Augmented Roles</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow content-start">
                {(INDUSTRY_ROLES[selectedInd.id] ?? []).map((role, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-5 py-4 border border-white/5">
                    <div className="w-7 h-7 bg-[#E61739]/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-[#E61739] text-xs font-black">0{idx + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-white leading-tight">{role}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-xs font-medium">Select any industry to explore its top AI-augmented roles</p>
                <button
                  onClick={() => setView('contact')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] rounded-2xl text-white text-sm font-bold hover:bg-[#c51431] transition-colors"
                >
                  Hire in this vertical <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO WE SERVE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="bg-slate-100 rounded-3xl aspect-[4/5] relative shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_REC_VETTING} alt="AI Workforce team" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                      <TrendingDown size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">70%</div>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Below US Hiring Cost</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The AI Workforce <br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "SaaS & Tech", desc: "AI ops, data ops, and content roles in high demand — prompt engineers, data analysts, and AI-enabled ops specialists.", icon: Laptop },
                  { title: "E-Commerce", desc: "Product listing, catalog management, and CX ops at scale — AI-trained specialists who know the platforms.", icon: ShoppingCart },
                  { title: "Marketing Agencies", desc: "AI content, design, and campaign ops support — specialists proficient in Midjourney, Canva AI, HubSpot, and more.", icon: Megaphone },
                  { title: "Healthcare", desc: "Data processing, scheduling, and admin AI support — compliant, accurate, and deeply trained on healthcare workflows.", icon: HeartPulse },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-[#F5F5F7] rounded-2xl shrink-0 flex items-center justify-center text-[#E61739] group-hover:scale-110 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
                      <item.icon size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl overflow-hidden relative border border-white/[0.07]">
          <div className="absolute inset-0 z-0">
            <img src={IMG_REC_HERO} alt="AI Workforce Augmentation Team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            <div className="p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let's Talk Augmentation
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Embed your first<br/><span className="text-[#E61739]">AI specialist.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm" style={{ textWrap: 'balance' }}>
                  Tell us about the role and tools needed — we'll have matched candidates ready within 3–5 business days.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'Role live in 5–7 business days from brief' },
                  { icon: CheckCircle2, text: 'AI tool proficiency: Claude, GPT-4o, Zapier, and more' },
                  { icon: CheckCircle2, text: '2-week replacement guarantee, no conditions' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[
                    { val: '$2,000', label: 'Starting/mo' },
                    { val: '5–7 Days', label: 'To Go Live' },
                    { val: '14 mo', label: 'Avg Tenure' },
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
                  <h3 className="text-2xl font-black text-white">Message received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our team will review your role brief and reach out within 24 hours with matched candidates.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Send us your role brief</h3>
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
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Role(s) You Need</label>
                    <input required className={inp} placeholder="e.g. Prompt Engineer, AI Ops Specialist, Data Analyst" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Full-time or part-time, tools required, hours, KPIs..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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
              { q: "What makes KDCI.ai specialists different from a typical VA or offshore hire?", a: "Every specialist in our talent pool is AI-trained before placement — they arrive proficient in Claude, GPT-4o, Zapier, Midjourney, HubSpot, Notion AI, and other tools relevant to your role. You're not training someone on AI from scratch; you're embedding someone who already uses these tools in their daily workflow." },
              { q: "How fast can a specialist be live and productive?", a: "Our standard onboarding timeline runs 5–7 business days from role brief to first productive day. Day 1–2: brief call and KPI definition. Day 3–5: candidate matching from our talent pool. Day 6–7: your interviews and hire confirmation. Week 2: full onboarding and setup. Week 3: first productive week with daily check-ins." },
              { q: "What does the 2-week replacement guarantee mean?", a: "If a placed specialist isn't the right fit for any reason within the first 3 months, we find and onboard a replacement within 2 weeks at zero additional cost. No conditions, no rebooking fees." },
              { q: "What's included in the monthly fee?", a: "Everything. The flat monthly rate covers the specialist's salary, HR administration, payroll processing, Philippine statutory benefits, compliance documentation, and KDCI.ai's management layer. There are no hidden markups or additional HR costs on your end." },
              { q: "What's the difference between Part-Time and Full-Time plans?", a: "Part-Time ($2,000/mo) gives you 20 hours per week at a fixed schedule — ideal for focused AI ops or research roles. Full-Time ($3,500/mo) is a fully embedded team member at 40 hours per week. Both plans include all AI tools, HR management, and the 2-week replacement guarantee." },
              { q: "How does the Team (3+ seats) plan work?", a: "Team pricing starts at $2,800/seat/month for 3 or more dedicated specialists, offering a volume discount over the individual full-time rate. At 5+ seats, a dedicated team lead is included to coordinate output, run daily standups, and manage KPI reporting across the team." },
              { q: "What types of roles can we hire for?", a: "Our most in-demand AI-augmented roles include: Prompt Engineers, AI Ops Specialists, Data Analysts, AI-Enabled Executive VAs, Content Ops Managers, Social Media AI Specialists, CRM Admins (HubSpot/Salesforce), Research Analysts, and Catalog & Listing Managers. If your role isn't listed, contact us — we likely have a match in our talent pool." },
              { q: "Is there a minimum commitment?", a: "All plans require a 3-month minimum. This ensures we have time to complete onboarding, validate performance, and deliver measurable results. Our average placement tenure is 14 months — most clients scale to additional seats well before the minimum expires." },
              { q: "Do specialists work exclusively for our company?", a: "Yes. Every KDCI.ai specialist is 100% dedicated to your account. They work your hours, use your tools, follow your processes, and represent your brand. They are not shared across multiple clients — they are effectively your employee, just managed and supported by KDCI.ai." },
              { q: "Can we conduct our own interviews before confirming a hire?", a: "Absolutely. We present a shortlist of 3–5 pre-screened, AI-proficiency-tested candidates. You conduct your own interviews, ask your own questions, and make the final hire decision. We handle the offer, onboarding, HR setup, and ongoing management from there." },
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

      {/* ── HIRING MODAL ── */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ animation: 'fadeInUp 0.25s ease both' }}
          onKeyDown={e => e.key === 'Escape' && closeModal()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          <div className="relative z-10 w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">
                  <Star size={10} /> Request a Specialist
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Tell us about your role.</h2>
                <p className="text-slate-400 text-sm font-medium mt-1">Matched candidates ready in 3–5 business days.</p>
              </div>
              <button onClick={closeModal} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shrink-0 ml-4">
                <X size={16} />
              </button>
            </div>

            <div className="px-8 py-8 bg-slate-50/60">
              {modalSubmitted ? (
                <div className="flex flex-col items-center text-center gap-5 py-10">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">Brief received!</h3>
                  <p className="text-slate-500 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our team will review your role brief and reach out within 24 hours with matched candidates.
                  </p>
                  <button onClick={closeModal} className="mt-2 px-8 py-3 bg-slate-100 rounded-2xl text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all">
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleModalForm} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Full Name</label>
                      <input required className={lightInp} placeholder="Jane Smith" value={modalForm.name} onChange={e => setModalForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Company</label>
                      <input required className={lightInp} placeholder="Acme Inc." value={modalForm.company} onChange={e => setModalForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Work Email</label>
                      <input required type="email" className={lightInp} placeholder="jane@company.com" value={modalForm.email} onChange={e => setModalForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Phone (optional)</label>
                      <input className={lightInp} placeholder="+1 555 000 0000" value={modalForm.phone} onChange={e => setModalForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Role(s) You Need</label>
                    <input required className={lightInp} placeholder="e.g. Prompt Engineer, AI Ops Specialist, Data Analyst" value={modalForm.role} onChange={e => setModalForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={lightInp + " resize-none"} placeholder="Full-time or part-time, tools required, hours, KPIs..." value={modalForm.notes} onChange={e => setModalForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <Captcha ref={modalCaptchaRef} onVerify={() => {}} theme="light" />
                  <div className="flex gap-3 pt-2">
                    <button type="button" onClick={closeModal} className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all">
                      Cancel
                    </button>
                    <button type="submit" className="flex-[2] py-4 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all shadow-lg flex items-center justify-center gap-2 group">
                      Send My Brief <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                  <p className="text-slate-400 text-[11px] text-center font-medium">No commitment · Response within 24 hours</p>
                </form>
              )}
            </div>

            {!modalSubmitted && (
              <div className="px-8 pb-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5 bg-slate-50">
                {[
                  { val: '$2,000', label: 'Starting/mo' },
                  { val: '5–7 Days', label: 'To Go Live' },
                  { val: '14 mo', label: 'Avg Tenure' },
                ].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-lg font-black text-slate-900">{s.val}</div>
                    <div className="text-[9px] text-slate-400 font-black uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
