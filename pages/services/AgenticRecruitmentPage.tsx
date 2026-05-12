
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Briefcase, ScanSearch, UserCheck, ClipboardCheck, Workflow, Cpu, Handshake, BrainCircuit, Globe2, ShieldCheck, CheckCircle2, Star, Award, Target, Shield, Zap, TrendingDown, X } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
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

const INCLUDED = [
  'AI-Powered Sourcing',
  'Resume Screening & Scoring',
  'Skills Assessment',
  '3–5 Vetted Shortlist',
  'Background Check Coordination',
  'Interview Scheduling',
  'Offer Management',
  '90-Day Replacement Guarantee',
  'ATS Management (RPO)',
  'Talent Market Reports',
];

export const AgenticRecruitmentPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const handleModalForm = (e: React.FormEvent) => { e.preventDefault(); setModalSubmitted(true); };
  const closeModal = () => { setShowModal(false); setModalSubmitted(false); setModalForm({ name: '', company: '', email: '', phone: '', role: '', notes: '' }); };
  const handleForm = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
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

      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="Global Recruitment Services" parent={{ name: 'Solutions', view: 'solutions-hub' }} />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-shine-white">Smarter, Faster</span><br/>
                <span className="text-[#E61739]">Recruitment.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                Full-cycle global recruitment from job brief to signed offer — powered by AI tools and expert sourcers across 40+ countries who deliver 3× faster than traditional agencies.
              </p>

              <div className="flex flex-col gap-4 mb-8 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">AI-powered sourcing across 40+ countries</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">3–5 vetted candidates shortlisted in 14 days</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">90-day replacement guarantee on every hire</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Start Hiring <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — image card */}
            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src={IMG_HERO_MEETING}
                  alt="KDCI recruitment consultation"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    40+ Countries · AI-Powered
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {[
                    { name: "Zendesk",   logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327923/Zendesk_Logo_jlsxla.png" },
                    { name: "Intercom",  logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327927/IntercomLogo_tqzspk.png" },
                    { name: "Gorgias",   logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327925/GorgiasLogo_xvhteo.png" },
                    { name: "Freshdesk", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327923/Freshdesk_Logo_suwwdf.png" },
                  ].map((app, i) => (
                    <div key={i} className="h-[37px] md:h-[46px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <img src={app.logo} alt={app.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">5,000+</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Hires Sourced</p></div>
            <div><div className="text-xl md:text-2xl font-black">14 Days</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Avg. Time-to-Fill</p></div>
            <div><div className="text-xl md:text-2xl font-black">70%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Typical Cost Savings</p></div>
            <div><div className="text-xl md:text-2xl font-black">90-Day</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Replacement Guarantee</p></div>
          </div>
        </div>
      </section>

      {/* What We Deliver */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100">
                <Sparkles size={12} /> What We Deliver
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                From job brief<br/>to <span className="text-[#E61739]">signed offer.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10" style={{ textWrap: 'balance' }}>
                Full-cycle recruitment using AI tools to source, screen, and score candidates at 3× the speed of traditional methods. Our recruiters are specialists in the Philippine talent market, with deep networks across design, tech, marketing, finance, and operations roles.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Cpu, text: 'AI-powered sourcing across 100k+ global profiles' },
                  { icon: UserCheck, text: 'Expert Philippine talent market specialists' },
                  { icon: Briefcase, text: 'Deep networks in design, tech, marketing, finance & ops' },
                  { icon: ClipboardCheck, text: 'Shortlists of only 3–5 fully vetted candidates' },
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
            <div className="relative">
              <div className="relative rounded-3xl aspect-[4/5] shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_REC_HERO} alt="Recruitment team at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
              </div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Star size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">Top 1% Only</div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Every candidate fully vetted</p>
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

            {/* 90-Day Guarantee */}
            <div className="bg-[#E61739] rounded-3xl p-8 flex items-center gap-6" style={{ animation: 'pulseRing 2.8s ease-in-out 2s infinite' }}>
              <div className="shrink-0">
                <div className="text-[4.5rem] font-black text-white leading-none">90</div>
                <div className="text-sm font-black text-white/70 uppercase tracking-widest -mt-1">Day Guarantee</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
                  Re-sourced at zero cost if a hire doesn't work out. No fine print.
                </p>
              </div>
            </div>

            {/* Flat Fee */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Target size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">70% Less</div>
                <h4 className="text-sm font-black text-white mb-1">Flat Fee Model</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Skip the 15–25% agency markup. One flat fee, guaranteed results.</p>
              </div>
            </div>

            {/* Embedded RPO */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/10 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Workflow size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Day 1 Fit</div>
                <h4 className="text-sm font-black text-white mb-1">Embedded RPO</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>We become part of your team, learning your culture and hiring bar.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <div className="flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 self-start">
                <ClipboardCheck size={12} /> What's Included
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Everything you need.<br/><span className="text-[#E61739]">Nothing you don't.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Every engagement includes our complete recruitment suite — from AI sourcing to offer management and beyond.
              </p>
              <div className="bg-slate-50 border border-black/5 rounded-3xl p-8 flex-grow">
                <div className="grid grid-cols-2 gap-x-6 gap-y-3 h-full content-start">
                  {INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                      <span className="text-sm font-semibold text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative h-full rounded-3xl shadow-2xl" style={{ overflow: 'hidden' }}>
              <img src={recIncludedImg} alt="Candidate vetting process" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Zap size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">3× Faster</div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Than traditional recruitment agencies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">Simple, Transparent Pricing.</h2>
            <p className="text-white/40 text-lg font-medium">Structured for every stage of your hiring needs.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">

            {/* Per Placement */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-all">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Per Placement</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-black text-white">$1,800</span>
                <span className="text-white/30 text-xs font-black uppercase tracking-widest">– $3,500</span>
              </div>
              <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">per hire</p>
              <p className="text-white/40 text-sm font-medium mb-8 leading-relaxed">No monthly commitment. Pay on hire, no setup fee.</p>
              <div className="border-t border-white/10 pt-6 mb-8 flex-grow">
                <ul className="space-y-3">
                  {["AI-Powered Sourcing", "Resume Screening & Scoring", "3–5 Vetted Shortlist", "90-Day Replacement Guarantee"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/60">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all">
                Get a Quote
              </button>
            </div>

            {/* RPO Retainer — featured */}
            <div className="bg-[#E61739] rounded-3xl p-8 flex flex-col relative shadow-2xl scale-[1.02]">
              <div className="absolute top-6 right-6 bg-white/20 text-white text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full">
                Best Value
              </div>
              <p className="text-white/70 text-[10px] font-black uppercase tracking-widest mb-4">RPO Retainer</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-black text-white">$3,500</span>
                <span className="text-white/60 text-xs font-black uppercase tracking-widest">/ mo</span>
              </div>
              <p className="text-white/60 text-xs font-black uppercase tracking-widest mb-2">up to 5 roles · 3-mo minimum</p>
              <p className="text-white/70 text-sm font-medium mb-8 leading-relaxed">Dedicated recruiter with full-cycle management per month.</p>
              <div className="border-t border-white/20 pt-6 mb-8 flex-grow">
                <ul className="space-y-3">
                  {["AI-Powered Sourcing", "Dedicated Recruiter", "ATS Management", "Talent Market Reports", "Interview & Offer Management", "90-Day Replacement Guarantee"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/90">
                      <CheckCircle2 size={14} className="text-white shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white text-[#E61739] font-bold text-sm hover:bg-white/90 transition-all shadow-lg">
                Get a Quote
              </button>
            </div>

            {/* Enterprise RPO */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-all">
              <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-4">Enterprise RPO</p>
              <div className="flex items-baseline gap-1.5 mb-1">
                <span className="text-4xl font-black text-white">$6,000+</span>
              </div>
              <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-2">/ month</p>
              <p className="text-white/40 text-sm font-medium mb-8 leading-relaxed">Full embedded talent function. Unlimited roles, 6-month minimum.</p>
              <div className="border-t border-white/10 pt-6 mb-8 flex-grow">
                <ul className="space-y-3">
                  {["Team of Recruiters", "Employer Branding Support", "Unlimited Active Roles", "Executive & Volume Hiring"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm font-semibold text-white/60">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
              <button onClick={() => setView('contact')} className="mt-auto w-full py-3.5 rounded-2xl bg-white/10 border border-white/10 text-white font-bold text-sm hover:bg-white/20 transition-all">
                Get a Quote
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-12 bg-slate-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="shrink-0">
              <h2 className="text-3xl md:text-4xl font-heading font-bold whitespace-nowrap">Built for Speed.</h2>
              <p className="text-white/40 text-sm font-medium mt-2 max-w-[220px]" style={{ textWrap: 'balance' }}>AI-augmented hiring. Zero wasted time.</p>
            </div>
            <div className="w-px bg-white/10 self-stretch hidden md:block shrink-0"></div>
            <div className="grid grid-cols-5 gap-4 flex-1 relative">
              <div className="hidden md:block absolute top-[1.6rem] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
              {[
                { step: "01", title: "Discovery",    desc: "KPI targets & cultural fit.", icon: ScanSearch },
                { step: "02", title: "AI Sourcing",  desc: "100k+ global profiles.", icon: Cpu },
                { step: "03", title: "Screening",    desc: "Technical skill scoring.", icon: ClipboardCheck },
                { step: "04", title: "Shortlist",    desc: "Top 3–5 vetted candidates.", icon: UserCheck },
                { step: "05", title: "Offer & Close", desc: "Offer & handover.", icon: Handshake },
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
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Industry Specialization.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
              Our recruiters understand the technical nuances of your vertical — sourcing talent that hits the ground running across 20+ industries.
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
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Top In-Demand Roles</p>
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
                <p className="text-white/30 text-xs font-medium">Select any industry to explore its top roles</p>
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

      {/* The Recruitment Advantage */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="bg-slate-100 rounded-3xl aspect-[4/5] relative shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_REC_VETTING} alt="Agent vetting" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                      <TrendingDown size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">70%</div>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Typical OpEx Reduction</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The Global Recruitment <br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Worldwide Talent Access", desc: "We source from 100k+ profiles across 40+ countries — surfacing the best candidate regardless of geography.", icon: Globe2 },
                  { title: "AI + Human Hybrid", desc: "Algorithmic speed meets deep recruiter intuition to deliver shortlists of only 3–5 fully-vetted candidates.", icon: BrainCircuit },
                  { title: "Cross-Border Compliance", desc: "We handle visa readiness, timezone alignment, and local labour law nuances so you don't have to.", icon: ShieldCheck },
                  { title: "90-Day Placement Guarantee", desc: "If a hire doesn't work out within 90 days, we replace them at no additional cost — zero risk to you.", icon: Award },
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
            <img src={IMG_REC_HERO} alt="Recruitment Team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            {/* Left — headline + stats */}
            <div className="p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let's Talk Hiring
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Build your<br/><span className="text-[#E61739]">dream team.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm" style={{ textWrap: 'balance' }}>
                  Tell us about your hiring needs and we'll have a sourcing plan ready within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'AI sourcing across 100k+ global profiles' },
                  { icon: CheckCircle2, text: '3–5 vetted candidates, avg. 14-day turnaround' },
                  { icon: CheckCircle2, text: '90-day replacement guarantee, no fine print' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[
                    { val: '5,000+', label: 'Hires Sourced' },
                    { val: '14 Days', label: 'Avg. Fill' },
                    { val: '90-Day', label: 'Guarantee' },
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
                  <p className="text-white/50 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our talent leads will review your brief and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-4">
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
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Role(s) You're Hiring For</label>
                    <input required className={inp} placeholder="e.g. Senior Full-Stack Developer, Marketing Manager" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Timeline, budget, team size, remote/on-site..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5 border border-slate-100">
              <Shield size={11} /> FAQs
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Frequently asked questions.</h2>
          </div>
          <div className="space-y-3">
            {[
              {
                q: "How quickly can you fill a role?",
                a: "Our average time-to-fill is 14 business days from brief to signed offer. For senior or highly specialised roles it can extend to 21 days, but you'll have a vetted shortlist within 5–7 days in most cases."
              },
              {
                q: "What does the 90-day guarantee actually mean?",
                a: "If a placed candidate leaves or doesn't work out within 90 days of their start date, we re-source and deliver a replacement shortlist at zero additional cost — no conditions, no fine print."
              },
              {
                q: "Do you only hire in the Philippines?",
                a: "No. While we specialise in Philippine talent, our AI sourcing platform scans 100k+ profiles across 40+ countries. We match the right talent to your role regardless of geography."
              },
              {
                q: "What's the difference between Per Placement and the RPO Retainer?",
                a: "Per Placement is pay-per-hire with no ongoing commitment — ideal for one-off or occasional hires. The RPO Retainer gives you a dedicated recruiter managing up to 5 active roles per month with priority sourcing, ATS management, and market reports."
              },
              {
                q: "What industries do you specialise in?",
                a: "We cover 20+ verticals including Software & Tech, E-commerce, Healthcare, FinTech, Legal, Marketing & Media, Logistics, and more. Each engagement is handled by a recruiter with direct experience in your sector."
              },
              {
                q: "How do you screen candidates before presenting them?",
                a: "Every candidate goes through AI-powered resume scoring, a skills assessment, a structured competency interview with our recruiters, and a cultural-fit review against your brief. You only see the top 3–5 who clear all stages."
              },
              {
                q: "Is there a setup fee?",
                a: "Per Placement has no setup fee — you pay only on a successful hire. The RPO Retainer has a one-time $1,000 setup fee. Enterprise RPO waives the setup fee entirely."
              },
              {
                q: "Can we switch plans after we start?",
                a: "Yes. If your hiring volume grows, you can upgrade from Per Placement to the RPO Retainer at any time. Our team will prorate any fees and ensure a smooth handover of active roles."
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

      {/* Hiring Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ animation: 'fadeInUp 0.25s ease both' }}
          onKeyDown={e => e.key === 'Escape' && closeModal()}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />

          {/* Panel */}
          <div className="relative z-10 w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">
                  <Star size={10} /> Start Hiring
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Tell us about your role.</h2>
                <p className="text-slate-400 text-sm font-medium mt-1">We'll have a shortlist ready in 14 days.</p>
              </div>
              <button onClick={closeModal} className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shrink-0 ml-4">
                <X size={16} />
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-8 bg-slate-50/60">
              {modalSubmitted ? (
                <div className="flex flex-col items-center text-center gap-5 py-10">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">You're on our radar!</h3>
                  <p className="text-slate-500 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our talent leads will review your brief and reach out within 24 hours.
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
                    <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Role(s) You're Hiring For</label>
                    <input required className={lightInp} placeholder="e.g. Senior Full-Stack Developer, Marketing Manager" value={modalForm.role} onChange={e => setModalForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={lightInp + " resize-none"} placeholder="Timeline, budget, remote/on-site, team size..." value={modalForm.notes} onChange={e => setModalForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
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

            {/* Trust strip */}
            {!modalSubmitted && (
              <div className="px-8 pb-6 grid grid-cols-3 gap-4 border-t border-slate-100 pt-5 bg-slate-50">
                {[
                  { val: '5,000+', label: 'Hires Sourced' },
                  { val: '14 Days', label: 'Avg. Time-to-Fill' },
                  { val: '90-Day', label: 'Guarantee' },
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
