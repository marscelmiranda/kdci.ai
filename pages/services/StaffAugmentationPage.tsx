
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Briefcase, UserCheck, ClipboardCheck, Cpu, Workflow, CheckCircle2, Star, Target, Zap, Shield, BrainCircuit, Globe2, ShieldCheck, Award, TrendingDown, MessageSquare, Handshake, Clock, GraduationCap, Building2, DollarSign, Search, Activity } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_STAFF_AUG_HERO, INDUSTRIES } from '../../data';
import IMG_PH_TEAM from '../../attached_assets/Gemini_Generated_Image_8gr4nc8gr4nc8gr4_1777973290700.png';
import IMG_CONTACT from '../../attached_assets/Gemini_Generated_Image_alu075alu075alu0_1777983805487.png';
import IMG_KDCI_OFFICE from '../../attached_assets/Gemini_Generated_Image_mhi0ftmhi0ftmhi0_1777992381262.png';

const INDUSTRY_SAVINGS: Record<string, { role: string; ph: string; save: string }[]> = {
  'ecommerce':     [{ role: 'E-commerce Analyst',       ph: '$2,400', save: '65%' }, { role: 'Catalog Manager',         ph: '$2,160', save: '63%' }, { role: 'SEO Specialist',          ph: '$2,400', save: '67%' }, { role: 'CX Lead',                 ph: '$2,160', save: '62%' }, { role: 'Visual Merchandiser',     ph: '$2,280', save: '64%' }],
  'software-dev':  [{ role: 'Full-Stack Developer',     ph: '$3,360', save: '72%' }, { role: 'QA Engineer',             ph: '$2,640', save: '68%' }, { role: 'DevOps Engineer',         ph: '$3,600', save: '70%' }, { role: 'UI/UX Designer',          ph: '$2,640', save: '71%' }, { role: 'Technical Writer',        ph: '$2,160', save: '63%' }],
  'property-mgmt': [{ role: 'Property Manager',         ph: '$2,400', save: '60%' }, { role: 'Transaction Coordinator', ph: '$2,280', save: '62%' }, { role: 'Listings Coordinator',    ph: '$2,160', save: '62%' }, { role: 'CRM Specialist',          ph: '$2,400', save: '63%' }, { role: 'Real Estate VA',          ph: '$1,920', save: '65%' }],
  'fintech':       [{ role: 'Compliance Analyst',       ph: '$2,640', save: '66%' }, { role: 'Financial Analyst',       ph: '$3,000', save: '67%' }, { role: 'Data Analyst',            ph: '$3,000', save: '67%' }, { role: 'KYC Specialist',          ph: '$2,400', save: '63%' }, { role: 'Fraud Detection Spec.',   ph: '$2,640', save: '65%' }],
  'healthcare':    [{ role: 'Medical VA',               ph: '$2,160', save: '65%' }, { role: 'Medical Biller/Coder',    ph: '$2,280', save: '63%' }, { role: 'Patient Coordinator',     ph: '$2,160', save: '62%' }, { role: 'Claims Processor',        ph: '$2,040', save: '61%' }, { role: 'Prior Auth Specialist',   ph: '$2,280', save: '62%' }],
  'marketing-ad':  [{ role: 'Digital Marketing Manager',ph: '$2,640', save: '67%' }, { role: 'Content Strategist',      ph: '$2,400', save: '66%' }, { role: 'PPC Specialist',          ph: '$2,640', save: '67%' }, { role: 'Social Media Manager',    ph: '$2,280', save: '65%' }, { role: 'Brand Designer',          ph: '$2,400', save: '65%' }],
  'retail':        [{ role: 'Inventory Manager',        ph: '$2,280', save: '62%' }, { role: 'Customer Service Rep',    ph: '$2,160', save: '60%' }, { role: 'E-commerce Coordinator',  ph: '$2,400', save: '63%' }, { role: 'Supply Chain Analyst',    ph: '$2,640', save: '65%' }, { role: 'Merchandiser',            ph: '$2,160', save: '62%' }],
  'logistics':     [{ role: 'Logistics Coordinator',    ph: '$2,280', save: '63%' }, { role: 'Supply Chain Analyst',    ph: '$2,640', save: '65%' }, { role: 'Dispatch Coordinator',    ph: '$2,160', save: '61%' }, { role: 'Data Entry Specialist',   ph: '$1,800', save: '64%' }, { role: 'Operations Manager',      ph: '$3,000', save: '67%' }],
  'travel':        [{ role: 'Booking Coordinator',      ph: '$2,160', save: '62%' }, { role: 'Customer Support Agent',  ph: '$2,160', save: '61%' }, { role: 'Travel Consultant',       ph: '$2,400', save: '63%' }, { role: 'Reservations Manager',    ph: '$2,400', save: '63%' }, { role: 'Content Writer',          ph: '$2,160', save: '63%' }],
  'edtech':        [{ role: 'Curriculum Developer',     ph: '$2,400', save: '65%' }, { role: 'Instructional Designer',  ph: '$2,640', save: '66%' }, { role: 'LMS Administrator',       ph: '$2,280', save: '63%' }, { role: 'Student Support Rep',     ph: '$2,040', save: '61%' }, { role: 'Content Creator',         ph: '$2,280', save: '64%' }],
  'legal':         [{ role: 'Legal VA',                 ph: '$2,160', save: '65%' }, { role: 'Paralegal',               ph: '$2,400', save: '63%' }, { role: 'Contract Reviewer',       ph: '$2,640', save: '64%' }, { role: 'Legal Researcher',        ph: '$2,280', save: '63%' }, { role: 'Compliance Coordinator',  ph: '$2,400', save: '62%' }],
  'insurance':     [{ role: 'Claims Processor',         ph: '$2,160', save: '62%' }, { role: 'Underwriting Assistant',  ph: '$2,400', save: '63%' }, { role: 'Policy Administrator',    ph: '$2,160', save: '61%' }, { role: 'Insurance Analyst',       ph: '$2,640', save: '64%' }, { role: 'Loss Control Specialist', ph: '$2,400', save: '62%' }],
  'media':         [{ role: 'Content Writer',           ph: '$2,160', save: '63%' }, { role: 'Video Editor',            ph: '$2,640', save: '67%' }, { role: 'SEO Content Specialist',  ph: '$2,400', save: '66%' }, { role: 'Social Media Manager',    ph: '$2,280', save: '65%' }, { role: 'Copy Editor',             ph: '$2,040', save: '62%' }],
  'consumer-tech': [{ role: 'Product Support Spec.',    ph: '$2,280', save: '62%' }, { role: 'Technical Writer',        ph: '$2,160', save: '63%' }, { role: 'Customer Success Manager',ph: '$2,640', save: '65%' }, { role: 'QA Tester',               ph: '$2,400', save: '65%' }, { role: 'Community Manager',       ph: '$2,280', save: '63%' }],
  'telecom':       [{ role: 'Technical Support Agent',  ph: '$2,160', save: '61%' }, { role: 'Billing Specialist',      ph: '$2,040', save: '60%' }, { role: 'Customer Service Rep',    ph: '$2,040', save: '60%' }, { role: 'Sales Support Rep',       ph: '$2,280', save: '63%' }, { role: 'NOC Analyst',             ph: '$2,640', save: '65%' }],
  'auto':          [{ role: 'Parts Coordinator',        ph: '$2,160', save: '61%' }, { role: 'Customer Service Rep',    ph: '$2,040', save: '60%' }, { role: 'Inventory Manager',       ph: '$2,280', save: '62%' }, { role: 'Digital Marketing Spec.', ph: '$2,400', save: '65%' }, { role: 'Warranty Claims Processor',ph: '$2,040', save: '60%' }],
  'fashion':       [{ role: 'Product Listing Specialist',ph: '$2,040', save: '62%' }, { role: 'Customer Service Rep',   ph: '$2,040', save: '61%' }, { role: 'Social Media Manager',    ph: '$2,280', save: '65%' }, { role: 'E-commerce Coordinator',  ph: '$2,400', save: '63%' }, { role: 'Influencer Outreach Coord.',ph: '$2,160', save: '63%' }],
  'energy':        [{ role: 'Data Analyst',             ph: '$3,000', save: '67%' }, { role: 'Operations Coordinator',  ph: '$2,400', save: '63%' }, { role: 'Compliance Specialist',   ph: '$2,640', save: '64%' }, { role: 'Billing Analyst',         ph: '$2,160', save: '62%' }, { role: 'Customer Support Rep',    ph: '$2,040', save: '60%' }],
  'prof-services': [{ role: 'Executive VA',             ph: '$2,160', save: '65%' }, { role: 'Research Analyst',        ph: '$2,640', save: '66%' }, { role: 'Project Coordinator',     ph: '$2,400', save: '63%' }, { role: 'Business Development Rep',ph: '$2,400', save: '64%' }, { role: 'Proposal Writer',         ph: '$2,280', save: '64%' }],
  'gov':           [{ role: 'Data Entry Specialist',    ph: '$1,800', save: '62%' }, { role: 'Records Mgmt. Specialist',ph: '$2,040', save: '61%' }, { role: 'Administrative Assistant',ph: '$1,920', save: '60%' }, { role: 'Research Analyst',        ph: '$2,400', save: '64%' }, { role: 'Compliance Coordinator',  ph: '$2,280', save: '63%' }],
};

const INCLUDED = [
  'Full HR & Payroll',
  'PH Legal Compliance',
  'IT Setup & Security',
  'Performance Monitoring',
  'AI Tool Access & Training',
  'Dedicated Account Manager',
  'Monthly Performance Reports',
  'Replacement Guarantee',
  'Leave & Attendance Mgmt',
  'Team Lead Option (3+ seats)',
];

export const StaffAugmentationPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const handleForm = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Staff Augmentation Philippines | Fully-Managed Offshore Teams | KDCI';
    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
      return el;
    };
    const desc = 'Premium, fully-managed Philippine professionals embedded in your team — KDCI.ai handles HR, payroll, compliance, IT, performance, and AI upskilling. Starting from $1,800/mo per seat.';
    setMeta('description', desc);
    setMeta('og:title', 'Staff Augmentation | KDCI Operations', 'property');
    setMeta('og:description', desc, 'property');
    const ldId = 'ld-staff-aug';
    let ld = document.getElementById(ldId);
    if (!ld) { ld = document.createElement('script'); ld.id = ldId; (ld as HTMLScriptElement).type = 'application/ld+json'; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Staff Augmentation', description: desc, url: 'https://kdci.co' });
    return () => { document.title = prevTitle; document.getElementById(ldId)?.remove(); };
  }, []);

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

      {/* ── Hero ── */}
      <section className="relative bg-[#020202] pt-36 pb-40" style={{ overflow: 'hidden' }}>
        <div className="absolute inset-0 z-0">
          <img src={IMG_STAFF_AUG_HERO} alt="Staff Augmentation" className="w-full h-full object-cover opacity-20 object-center grayscale" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-40" />
          <div className="blob blob-magenta opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Philippine Offshore Staffing" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/50 text-[10px] font-black uppercase tracking-widest mb-6">
            Managed Offshore Talent · Philippines
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Staff</span><br/>
            <span className="text-[#E61739]">Augmentation.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Premium, fully-managed Philippine professionals embedded into your team — with KDCI.ai handling every layer of operations. The core KDCI franchise, now AI-augmented.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-3xl font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Build Your Team <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="text-center">
              <div className="text-white/30 text-xs font-black uppercase tracking-widest mb-1">Starting from</div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl font-black text-white">$1,800</span>
                <span className="text-white/40 text-sm font-black uppercase tracking-widest">/ mo per seat</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">500+</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Clients Globally</p></div>
            <div><div className="text-xl md:text-2xl font-black">15+ yrs</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">In Operation</p></div>
            <div><div className="text-xl md:text-2xl font-black">95%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Client Retention</p></div>
            <div><div className="text-xl md:text-2xl font-black">14–30d</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Time to First Hire</p></div>
          </div>
        </div>
      </section>

      {/* ── What We Deliver ── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100">
                <Sparkles size={12} /> What We Deliver
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                You direct the work.<br/><span className="text-[#E61739]">We own everything else.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10" style={{ textWrap: 'balance' }}>
                Dedicated full-time professionals who work exclusively for your business — screened, assessed, onboarded, and managed by KDCI.ai. We handle all HR, payroll, government compliance, IT infrastructure, performance management, and retention. Every team member receives KDCI.ai AI tool training, making them measurably more productive than a comparable unmanaged hire.
              </p>
              <div className="space-y-3">
                {[
                  { icon: UserCheck, text: 'Dedicated full-time professionals, exclusively yours' },
                  { icon: ShieldCheck, text: 'Full HR, payroll & PH legal compliance — fully handled' },
                  { icon: BrainCircuit, text: 'AI tool training & access standard for every team member' },
                  { icon: Award, text: 'Replacement guarantee — we replace underperformers at no cost' },
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
                <img src={IMG_PH_TEAM} alt="Philippine offshore team at KDCI" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Star size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-xl font-black text-slate-900">95% Retention Rate</div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Across 500+ global clients</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why It Commands a Premium ── */}
      <section className="py-12 bg-[#020202] relative" style={{ overflow: 'hidden' }}>
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
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="reveal text-center mb-10">
            <p className="text-white/30 text-xs font-black uppercase tracking-widest mb-3">Why It Commands a Premium</p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">The "managed" part is where<br/>the premium <span className="text-[#E61739]">lives.</span></h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-4">

            <div className="reveal bg-[#E61739] rounded-3xl p-8 flex items-center gap-6" style={{ animation: 'pulseRing 2.8s ease-in-out 2s infinite' }}>
              <div className="shrink-0">
                <div className="text-[4.5rem] font-black text-white leading-none">50<span className="text-3xl">–</span>70</div>
                <div className="text-sm font-black text-white/70 uppercase tracking-widest -mt-1">% Cost Savings</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
                  Standard VA platforms hand you a profile and walk away. We manage performance, replace underperformers, and handle compliance risk.
                </p>
              </div>
            </div>

            <div className="reveal d2 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <BrainCircuit size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">AI-Upskilled</div>
                <h4 className="text-sm font-black text-white mb-1">Every Team Member</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Continuous AI tool training makes your offshore team measurably more productive than unmanaged hires.</p>
              </div>
            </div>

            <div className="reveal d3 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Zero Admin</div>
                <h4 className="text-sm font-black text-white mb-1">Full Compliance Cover</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>HR, payroll, PH government filings, IT infrastructure — all owned by KDCI.ai, not you.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <div className="reveal flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 self-start">
                <ClipboardCheck size={12} /> What's Included
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Everything you need.<br/><span className="text-[#E61739]">Nothing you don't.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Every seat includes our complete managed operations suite — from day-one IT setup to monthly performance reporting and AI tool training.
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
            <div className="reveal d2 relative h-full rounded-3xl shadow-2xl" style={{ overflow: 'hidden' }}>
              <img src={IMG_KDCI_OFFICE} alt="KDCI Operations team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Zap size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">14–30 Days</div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">From brief to your first hire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Rate by Role Level.</h2>
            <p className="text-slate-500 text-lg font-medium">Structured for every stage of your team-building needs.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">

            {/* LEFT — Mid-Level featured */}
            <div className="reveal d1 bg-slate-900 rounded-3xl p-12 flex flex-col justify-between relative" style={{ animation: 'pulseRing 2.8s ease-in-out 2s infinite' }}>
              <div className="absolute top-8 right-8 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                Most Common
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">Mid-Level Professional</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-white">$2,800–$4,200</span>
                </div>
                <span className="text-white/40 text-sm font-black uppercase tracking-widest">/ mo per seat</span>
                <p className="text-white/50 text-sm font-medium mt-3 mb-8">Designers, marketers, accountants, SDRs, developers, project managers · Setup fee: $1,000 · 3-month minimum</p>
                <div className="border-t border-white/10 pt-8">
                  <ul className="space-y-3">
                    {["Dedicated Full-Time Professional", "Full HR & Payroll Managed", "AI Tool Access & Training", "Performance Monitoring & Reporting", "Dedicated Account Manager", "90-Day Replacement Guarantee"].map((f, i) => (
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

            {/* RIGHT — two stacked */}
            <div className="flex flex-col gap-6">

              <div className="reveal d2 bg-white border border-slate-100 rounded-3xl p-8 flex-1 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Junior / Admin</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-slate-900">$1,800–$2,200</span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">/ mo</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-5">Data ops, scheduling, CX support, admin, basic marketing execution · Setup fee: $750 · 3-month minimum</p>
                <ul className="space-y-2">
                  {["Full HR & Payroll", "IT Setup & Security", "AI Tool Access & Training", "Replacement Guarantee"].map((f, i) => (
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

              <div className="reveal d3 bg-white border border-slate-100 rounded-3xl p-8 flex-1 hover:shadow-lg transition-all">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-1">Senior / AI Specialist</p>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-3xl font-black text-slate-900">$4,500–$6,500</span>
                      <span className="text-slate-400 text-xs font-black uppercase tracking-widest">/ mo</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-5">Senior devs, AI engineers, ops managers, team leads, CX architects · Setup fee: $1,500 · 6-month minimum</p>
                <ul className="space-y-2">
                  {["Senior-Level Vetting", "AI Specialist Training", "Team Lead Option", "Priority Account Manager"].map((f, i) => (
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

      {/* ── How It Works ── */}
      <section className="py-12 bg-slate-900 text-white relative" style={{ overflow: 'hidden' }}>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
            <div className="reveal shrink-0">
              <h2 className="text-3xl md:text-4xl font-heading font-bold whitespace-nowrap">Built for Speed.</h2>
              <p className="text-white/40 text-sm font-medium mt-2 max-w-[220px]" style={{ textWrap: 'balance' }}>From brief to live team in 14–30 days.</p>
            </div>
            <div className="w-px bg-white/10 self-stretch hidden md:block shrink-0" />
            <div className="reveal d2 grid grid-cols-4 gap-4 flex-1 relative">
              <div className="hidden md:block absolute top-[1.6rem] left-[5%] right-[5%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              {[
                { step: "01", title: "Discovery",     desc: "Define roles, budget & KPIs.",      icon: Target },
                { step: "02", title: "Source & Vet",  desc: "AI-assisted talent screening.",    icon: Search },
                { step: "03", title: "You Approve",   desc: "Interview & select your hire.",    icon: UserCheck },
                { step: "04", title: "Go Live",       desc: "Set up, onboarded & monitored.",   icon: Activity },
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

      {/* ── See the Savings ── */}
      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="reveal text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">See the Savings.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Pick your industry and see the top 5 offshore roles — with KDCI's all-in monthly rate and how much you save vs US market equivalents.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="reveal d1 bg-white rounded-3xl border border-black/5 p-3 shadow-sm">
              <div className="space-y-0.5 max-h-[520px] overflow-y-auto pr-1">
                {INDUSTRIES.map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedInd(ind)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                      selectedInd.id === ind.id ? 'bg-[#E61739] text-white shadow-sm' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <ind.icon size={15} className={selectedInd.id === ind.id ? 'text-white' : 'text-[#E61739]'} />
                    <span className="text-sm font-semibold leading-tight">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="reveal d2 lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white min-h-[520px] flex flex-col">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <selectedInd.icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight">{selectedInd.name}</h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Top 5 Roles · KDCI Offshore Rate</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-grow">
                <div className="grid grid-cols-12 px-5 mb-1">
                  <span className="col-span-6 text-[10px] font-black uppercase tracking-widest text-white/25">Role</span>
                  <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-[#E61739]/70 text-center">KDCI / mo</span>
                  <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-white/25 text-center">vs US</span>
                </div>
                {(INDUSTRY_SAVINGS[selectedInd.id] ?? []).map((row, idx) => (
                  <div key={idx} className="grid grid-cols-12 items-center bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-5 py-4 border border-white/5">
                    <div className="col-span-6 flex items-center gap-3">
                      <div className="w-7 h-7 bg-[#E61739]/20 rounded-lg flex items-center justify-center shrink-0">
                        <span className="text-[#E61739] text-[10px] font-black">0{idx + 1}</span>
                      </div>
                      <span className="text-sm font-semibold text-white leading-tight">{row.role}</span>
                    </div>
                    <div className="col-span-3 text-center">
                      <span className="text-sm font-black text-white">{row.ph}</span>
                    </div>
                    <div className="col-span-3 flex justify-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-500/15 border border-emerald-400/20 rounded-lg text-emerald-400 text-xs font-black">
                        <TrendingDown size={10} /> {row.save}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-xs font-medium">Indicative mid-level monthly rates · all-in, no hidden fees</p>
                <button onClick={() => setView('contact')} className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] rounded-2xl text-white text-sm font-bold hover:bg-[#c51431] transition-colors">
                  Hire in this vertical <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Staff Augmentation Advantage ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="reveal relative">
              <div className="bg-slate-100 rounded-3xl aspect-[4/5] relative shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_CONTACT} alt="KDCI managed team" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
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
            <div className="reveal d2">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The Staff Augmentation<br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-8">
                {[
                  { title: "Fully Managed, Not Just Staffed", desc: "KDCI.ai monitors performance, handles underperformers, manages compliance risk, and upskills your team — continuously. This is where the premium lives.", icon: ShieldCheck },
                  { title: "AI Tool Training as Standard", desc: "Every team member gets access to KDCI.ai's AI tool suite and ongoing training — making them measurably more productive than an equivalent unmanaged hire.", icon: BrainCircuit },
                  { title: "Stop Worrying, Start Relying", desc: "Clients who choose fully-managed stop worrying about their offshore team and start relying on them. That's the outcome we design for.", icon: Globe2 },
                  { title: "15+ Years of Operational Depth", desc: "500+ global clients, 95% retention, and 15 years of Philippines-based operations give KDCI.ai a depth of process no new offshore provider can match.", icon: Award },
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

      {/* ── Contact Form ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl relative border border-white/[0.07]" style={{ overflow: 'hidden' }}>
          <div className="absolute inset-0 z-0">
            <img src={IMG_STAFF_AUG_HERO} alt="Staff team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80" />
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            <div className="reveal p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let's Build Your Team
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Build your<br/><span className="text-[#E61739]">dream team.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm" style={{ textWrap: 'balance' }}>
                  Tell us about your team needs and we'll have a staffing plan ready within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'First candidate presented within 5 days' },
                  { icon: CheckCircle2, text: 'Common roles placed in 14 days, senior in 30' },
                  { icon: CheckCircle2, text: '90-day replacement guarantee, no fine print' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[{ val: '500+', label: 'Clients' }, { val: '15 yrs', label: 'Operating' }, { val: '95%', label: 'Retention' }].map((s, i) => (
                    <div key={i}>
                      <div className="text-xl font-black text-white mb-0.5">{s.val}</div>
                      <div className="text-[9px] text-white/25 font-black uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="reveal d2 border-l border-white/[0.07] p-12 md:p-16 flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-12">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                    <CheckCircle2 size={30} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Message received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our operations team will review your brief and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Tell us about your team</h3>
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
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Role(s) You're Looking to Hire</label>
                    <input required className={inp} placeholder="e.g. Digital Marketer, Customer Service Rep" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Team size, budget, timeline, any specific requirements..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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

      {/* ── FAQ ── */}
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
              { q: "What does 'fully managed' actually mean?", a: "KDCI.ai acts as the employer of record. We hire, onboard, equip, and manage your team member day-to-day — handling HR, payroll, government benefits (SSS, PhilHealth, Pag-IBIG), IT setup, leave management, and performance monitoring. You direct their work; we own all the operational complexity." },
              { q: "How quickly can you place a hire?", a: "Common roles are placed within 14 business days. Senior or highly specialised roles take up to 30 days. You'll receive your first vetted candidate profiles within 5 days of the discovery call." },
              { q: "What is the 90-day replacement guarantee?", a: "If a team member doesn't work out within 90 days of their start date, KDCI.ai will source and present a replacement at no additional cost — no conditions, no fine print." },
              { q: "What does the setup fee cover?", a: "The one-time setup fee covers role scoping, talent sourcing, skills assessments, onboarding coordination, IT procurement, and KDCI.ai system integration. It is not a placement fee — it covers the operational cost of standing up your hire." },
              { q: "Can I scale my team up or down?", a: "Yes. You can add seats with a new discovery call, and scale down with 30 days notice. There are no penalties for reducing headcount outside the minimum contract term." },
              { q: "What AI tools do team members get access to?", a: "Every KDCI.ai team member is trained on and given access to a curated suite of productivity AI tools relevant to their role — from writing and research assistants to workflow automation and data analysis tools. Training is ongoing, not just a one-time induction." },
              { q: "Do you only hire in the Philippines?", a: "Our primary staffing market is the Philippines — one of the world's top offshore destinations for English proficiency, cultural alignment, and cost-to-quality ratio. For highly specialised roles, we can discuss alternative markets." },
              { q: "What is the minimum contract term?", a: "Junior and Mid-Level roles require a 3-month minimum engagement. Senior and AI Specialist roles require a 6-month minimum, reflecting the higher investment in onboarding and specialisation." },
            ].map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl" style={{ overflow: 'hidden' }}>
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
