
import React, { useState, useEffect } from 'react';
import { ArrowRight, Headphones, Palette, Code, UserCircle, Coins, UserPlus, Home, Database, Users, Workflow, Target, Search, Handshake, Activity, CheckCircle2, Globe, GraduationCap, Clock, TrendingDown, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_STAFF_AUG_HERO, INDUSTRIES } from '../../data';
import IMG_PH_TEAM from '../../attached_assets/Gemini_Generated_Image_8gr4nc8gr4nc8gr4_1777973290700.png';
import IMG_CONTACT from '../../attached_assets/Gemini_Generated_Image_alu075alu075alu0_1777983805487.png';

const INDUSTRY_SAVINGS: Record<string, { role: string; ph: string; save: string }[]> = {
  'ecommerce':     [{ role: 'E-commerce Analyst',       ph: '$2,000', save: '65%' }, { role: 'Catalog Manager',         ph: '$1,800', save: '63%' }, { role: 'SEO Specialist',          ph: '$2,000', save: '67%' }, { role: 'CX Lead',                 ph: '$1,800', save: '62%' }, { role: 'Visual Merchandiser',     ph: '$1,900', save: '64%' }],
  'software-dev':  [{ role: 'Full-Stack Developer',     ph: '$2,800', save: '72%' }, { role: 'QA Engineer',             ph: '$2,200', save: '68%' }, { role: 'DevOps Engineer',         ph: '$3,000', save: '70%' }, { role: 'UI/UX Designer',          ph: '$2,200', save: '71%' }, { role: 'Technical Writer',        ph: '$1,800', save: '63%' }],
  'property-mgmt': [{ role: 'Property Manager',         ph: '$2,000', save: '60%' }, { role: 'Transaction Coordinator', ph: '$1,900', save: '62%' }, { role: 'Listings Coordinator',    ph: '$1,800', save: '62%' }, { role: 'CRM Specialist',          ph: '$2,000', save: '63%' }, { role: 'Real Estate VA',          ph: '$1,600', save: '65%' }],
  'fintech':       [{ role: 'Compliance Analyst',       ph: '$2,200', save: '66%' }, { role: 'Financial Analyst',       ph: '$2,500', save: '67%' }, { role: 'Data Analyst',            ph: '$2,500', save: '67%' }, { role: 'KYC Specialist',          ph: '$2,000', save: '63%' }, { role: 'Fraud Detection Spec.',   ph: '$2,200', save: '65%' }],
  'healthcare':    [{ role: 'Medical VA',               ph: '$1,800', save: '65%' }, { role: 'Medical Biller/Coder',    ph: '$1,900', save: '63%' }, { role: 'Patient Coordinator',     ph: '$1,800', save: '62%' }, { role: 'Claims Processor',        ph: '$1,700', save: '61%' }, { role: 'Prior Auth Specialist',   ph: '$1,900', save: '62%' }],
  'marketing-ad':  [{ role: 'Digital Marketing Manager',ph: '$2,200', save: '67%' }, { role: 'Content Strategist',      ph: '$2,000', save: '66%' }, { role: 'PPC Specialist',          ph: '$2,200', save: '67%' }, { role: 'Social Media Manager',    ph: '$1,900', save: '65%' }, { role: 'Brand Designer',          ph: '$2,000', save: '65%' }],
  'retail':        [{ role: 'Inventory Manager',        ph: '$1,900', save: '62%' }, { role: 'Customer Service Rep',    ph: '$1,800', save: '60%' }, { role: 'E-commerce Coordinator',  ph: '$2,000', save: '63%' }, { role: 'Supply Chain Analyst',    ph: '$2,200', save: '65%' }, { role: 'Merchandiser',            ph: '$1,800', save: '62%' }],
  'logistics':     [{ role: 'Logistics Coordinator',    ph: '$1,900', save: '63%' }, { role: 'Supply Chain Analyst',    ph: '$2,200', save: '65%' }, { role: 'Dispatch Coordinator',    ph: '$1,800', save: '61%' }, { role: 'Data Entry Specialist',   ph: '$1,500', save: '64%' }, { role: 'Operations Manager',      ph: '$2,500', save: '67%' }],
  'travel':        [{ role: 'Booking Coordinator',      ph: '$1,800', save: '62%' }, { role: 'Customer Support Agent',  ph: '$1,800', save: '61%' }, { role: 'Travel Consultant',       ph: '$2,000', save: '63%' }, { role: 'Reservations Manager',    ph: '$2,000', save: '63%' }, { role: 'Content Writer',          ph: '$1,800', save: '63%' }],
  'edtech':        [{ role: 'Curriculum Developer',     ph: '$2,000', save: '65%' }, { role: 'Instructional Designer',  ph: '$2,200', save: '66%' }, { role: 'LMS Administrator',       ph: '$1,900', save: '63%' }, { role: 'Student Support Rep',     ph: '$1,700', save: '61%' }, { role: 'Content Creator',         ph: '$1,900', save: '64%' }],
  'legal':         [{ role: 'Legal VA',                 ph: '$1,800', save: '65%' }, { role: 'Paralegal',               ph: '$2,000', save: '63%' }, { role: 'Contract Reviewer',       ph: '$2,200', save: '64%' }, { role: 'Legal Researcher',        ph: '$1,900', save: '63%' }, { role: 'Compliance Coordinator',  ph: '$2,000', save: '62%' }],
  'insurance':     [{ role: 'Claims Processor',         ph: '$1,800', save: '62%' }, { role: 'Underwriting Assistant',  ph: '$2,000', save: '63%' }, { role: 'Policy Administrator',    ph: '$1,800', save: '61%' }, { role: 'Insurance Analyst',       ph: '$2,200', save: '64%' }, { role: 'Loss Control Specialist', ph: '$2,000', save: '62%' }],
  'media':         [{ role: 'Content Writer',           ph: '$1,800', save: '63%' }, { role: 'Video Editor',            ph: '$2,200', save: '67%' }, { role: 'SEO Content Specialist',  ph: '$2,000', save: '66%' }, { role: 'Social Media Manager',    ph: '$1,900', save: '65%' }, { role: 'Copy Editor',             ph: '$1,700', save: '62%' }],
  'consumer-tech': [{ role: 'Product Support Spec.',    ph: '$1,900', save: '62%' }, { role: 'Technical Writer',        ph: '$1,800', save: '63%' }, { role: 'Customer Success Manager',ph: '$2,200', save: '65%' }, { role: 'QA Tester',               ph: '$2,000', save: '65%' }, { role: 'Community Manager',       ph: '$1,900', save: '63%' }],
  'telecom':       [{ role: 'Technical Support Agent',  ph: '$1,800', save: '61%' }, { role: 'Billing Specialist',      ph: '$1,700', save: '60%' }, { role: 'Customer Service Rep',    ph: '$1,700', save: '60%' }, { role: 'Sales Support Rep',       ph: '$1,900', save: '63%' }, { role: 'NOC Analyst',             ph: '$2,200', save: '65%' }],
  'auto':          [{ role: 'Parts Coordinator',        ph: '$1,800', save: '61%' }, { role: 'Customer Service Rep',    ph: '$1,700', save: '60%' }, { role: 'Inventory Manager',       ph: '$1,900', save: '62%' }, { role: 'Digital Marketing Spec.', ph: '$2,000', save: '65%' }, { role: 'Warranty Claims Processor',ph: '$1,700', save: '60%' }],
  'fashion':       [{ role: 'Product Listing Specialist',ph: '$1,700', save: '62%' }, { role: 'Customer Service Rep',   ph: '$1,700', save: '61%' }, { role: 'Social Media Manager',    ph: '$1,900', save: '65%' }, { role: 'E-commerce Coordinator',  ph: '$2,000', save: '63%' }, { role: 'Influencer Outreach Coord.',ph: '$1,800', save: '63%' }],
  'energy':        [{ role: 'Data Analyst',             ph: '$2,500', save: '67%' }, { role: 'Operations Coordinator',  ph: '$2,000', save: '63%' }, { role: 'Compliance Specialist',   ph: '$2,200', save: '64%' }, { role: 'Billing Analyst',         ph: '$1,800', save: '62%' }, { role: 'Customer Support Rep',    ph: '$1,700', save: '60%' }],
  'prof-services': [{ role: 'Executive VA',             ph: '$1,800', save: '65%' }, { role: 'Research Analyst',        ph: '$2,200', save: '66%' }, { role: 'Project Coordinator',     ph: '$2,000', save: '63%' }, { role: 'Business Development Rep',ph: '$2,000', save: '64%' }, { role: 'Proposal Writer',         ph: '$1,900', save: '64%' }],
  'gov':           [{ role: 'Data Entry Specialist',    ph: '$1,500', save: '62%' }, { role: 'Records Mgmt. Specialist',ph: '$1,700', save: '61%' }, { role: 'Administrative Assistant',ph: '$1,600', save: '60%' }, { role: 'Research Analyst',        ph: '$2,000', save: '64%' }, { role: 'Compliance Coordinator',  ph: '$1,900', save: '63%' }],
};


export const StaffAugmentationPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleForm = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors";
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const capabilities = [
    { title: "Customer Service Agents", icon: Headphones, roles: "Support, Tech Support, Chat" },
    { title: "Designers & Editors", icon: Palette, roles: "UI/UX, Video, Content" },
    { title: "Software Engineers", icon: Code, roles: "Frontend, Backend, Full-Stack" },
    { title: "Admins & Assistants", icon: UserCircle, roles: "Virtual Assistants, EAs" },
    { title: "Accounting & Finance", icon: Coins, roles: "Bookkeepers, Analysts" },
    { title: "Recruiters & HR", icon: UserPlus, roles: "Sourcing, Admin Support" },
    { title: "Real Estate Support", icon: Home, roles: "TCs, Property Assistants" },
    { title: "Data & Back-Office", icon: Database, roles: "Data Entry, Verification" }
  ];


  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-32 md:pb-40 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img 
            src={IMG_STAFF_AUG_HERO} 
            alt="Staff Augmentation" 
            className="w-full h-full object-cover opacity-30 object-center grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple opacity-40"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs 
            setView={setView} 
            currentName="Philippine Offshore Staffing" 
            parent={{ name: 'Solutions', view: 'solutions-hub' }} 
          />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.05]">
            Build Your Team in the <br/>
            <span className="text-[#E61739]">Philippines.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Get full-time, dedicated offshore professionals based in the Philippines embedded in your team — with AI handling performance, workflows, and reporting for seamless enterprise scale.
          </p>
          <button onClick={() => setView('contact')} className="px-12 py-5 bg-[#E61739] text-white rounded-2xl font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group mx-auto">
            Book a Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* --- Stats Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-4 md:gap-x-16 lg:gap-x-20 items-center text-white">
            {[
              { stat: '#2 in Asia',  label: 'English Proficiency' },
              { stat: '500,000+',    label: 'Graduates Per Year' },
              { stat: 'GMT +8',      label: 'Timezone Advantage' },
              { stat: 'Up to 70%',   label: 'Cost Savings' },
              { stat: '20+ Years',   label: 'Outsourcing Legacy' },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-xl md:text-2xl font-black mb-0.5">{s.stat}</div>
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. What We Offer */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-stretch">

            {/* LEFT — image column */}
            <div className="lg:w-[46%] relative rounded-[3rem] overflow-hidden min-h-[560px] shrink-0">
              <img
                src={IMG_PH_TEAM}
                alt="Philippine offshore team at KDCI"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* bottom copy */}
              <div className="absolute bottom-0 left-0 right-0 p-10">
                <p className="text-[11px] text-white/50 font-black uppercase tracking-widest mb-2">Based in the Philippines</p>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">World-class talent,<br/>timezone-friendly.</h3>
              </div>

              {/* floating stat badge */}
              <div className="absolute top-8 left-8 bg-[#E61739] rounded-2xl shadow-xl px-6 py-3 flex items-center gap-3 whitespace-nowrap">
                <div className="w-9 h-9 bg-white/15 rounded-xl flex items-center justify-center shrink-0">
                  <Star size={18} className="text-white" />
                </div>
                <div>
                  <div className="text-lg font-black text-white leading-none">95%</div>
                  <div className="text-[9px] text-white/70 font-black uppercase tracking-widest mt-0.5">Client Retention Rate</div>
                </div>
              </div>
            </div>

            {/* RIGHT — content column */}
            <div className="lg:w-[54%] flex flex-col justify-center">
              <div className="mb-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
                  Expert Functions
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-5 tracking-tight leading-tight">Top Philippine Talent,<br/>Any Function.</h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl">From creative studios to software pods, we source and embed the best offshore professionals the Philippines has to offer.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {capabilities.map((cap, i) => (
                  <div key={i} className="group flex items-center gap-4 p-4 rounded-2xl bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-lg transition-all duration-300 cursor-default">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#E61739] shrink-0 group-hover:scale-110 transition-transform">
                      <cap.icon size={20} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F] leading-snug">{cap.title}</h3>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{cap.roles}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setView('contact')}
                className="mt-10 self-start flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all group"
              >
                View All Roles <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-24 bg-[#0A0A0A] text-white relative" style={{ overflow: 'hidden' }}>
        {/* subtle grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

        <div className="max-w-7xl mx-auto px-6 relative z-10">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-20">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
                Onboarding Timeline
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold tracking-tight leading-none">From brief to team<br/>in 14–30 days.</h2>
            </div>
            <p className="text-white/40 text-base font-medium max-w-xs leading-relaxed">Common roles in 14 days. Specialized or senior roles in up to 30. We handle every step.</p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* connecting line */}
            <div className="hidden lg:block absolute top-8 left-[calc(12.5%)] right-[calc(12.5%)] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  day: 'Day 1',
                  icon: Target,
                  title: 'Discovery Call',
                  bullets: ['Define roles & seniority', 'Set team size & budget', 'Agree on KPIs & SLAs'],
                  color: 'from-[#E61739]/20 to-transparent',
                },
                {
                  day: 'Day 2–5',
                  icon: Search,
                  title: 'Source & Screen',
                  bullets: ['AI-assisted talent search', 'Skills & culture fit vetting', 'Top 3 candidates presented'],
                  color: 'from-white/5 to-transparent',
                },
                {
                  day: 'Day 6–10',
                  icon: Handshake,
                  title: 'You Approve',
                  bullets: ['Interview shortlist', 'Select your hire(s)', 'Contracts & NDAs signed'],
                  color: 'from-white/5 to-transparent',
                },
                {
                  day: 'Day 11–14',
                  icon: Activity,
                  title: 'Go Live',
                  bullets: ['Equipment & access set up', 'Integrated into your tools', 'AI monitoring activated'],
                  color: 'from-[#E61739]/10 to-transparent',
                },
              ].map((s, idx) => (
                <div key={idx} className="relative group">
                  {/* card */}
                  <div className="bg-white/[0.03] border border-white/8 rounded-3xl p-7 h-full hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300">
                    {/* day pill */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E61739]/15 border border-[#E61739]/20 mb-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E61739]" />
                      <span className="text-[#E61739] text-[10px] font-black uppercase tracking-widest">{s.day}</span>
                    </div>

                    {/* icon */}
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-5 group-hover:bg-[#E61739]/15 group-hover:border-[#E61739]/30 group-hover:text-[#E61739] transition-all">
                      <s.icon size={22} />
                    </div>

                    <h4 className="text-lg font-bold text-white mb-4">{s.title}</h4>

                    <ul className="space-y-2.5">
                      {s.bullets.map((b, bi) => (
                        <li key={bi} className="flex items-start gap-2.5 text-sm text-white/45 font-medium">
                          <CheckCircle2 size={14} className="text-[#E61739]/60 mt-0.5 shrink-0" />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* step number — bottom right */}
                  <div className="absolute bottom-5 right-6 text-5xl font-black text-white/[0.04] select-none leading-none">
                    {String(idx + 1).padStart(2, '0')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom promise bar */}
          <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-8 py-6 border-t border-white/8">
            {[
              { icon: CheckCircle2, text: 'First candidate presented in 5 days' },
              { icon: CheckCircle2, text: '14 days for common roles · up to 30 for specialized' },
              { icon: CheckCircle2, text: 'Free replacement within 90 days' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-white/50 font-medium">
                <p.icon size={15} className="text-[#E61739] shrink-0" />
                {p.text}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Industry Savings */}
      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">

          {/* Header */}
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">See the Savings.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Pick your industry and see the top 5 offshore roles — with KDCI's all-in monthly rate and how much you save vs US market equivalents.
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

            {/* Right: savings panel */}
            <div className="lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white min-h-[520px] flex flex-col">

              {/* Panel header */}
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                  <selectedInd.icon size={30} className="text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black leading-tight">{selectedInd.name}</h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Top 5 Roles · KDCI Offshore Rate</p>
                </div>
              </div>

              {/* Role rows */}
              <div className="flex flex-col gap-2 flex-grow">
                {/* Column labels */}
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

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-xs font-medium">Indicative mid-level monthly rates · all-in, no hidden fees</p>
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

      {/* Logo strip — dark full-width */}
      <div className="bg-[#0A0A0A] py-10 w-full">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-[10px] font-black uppercase tracking-widest text-white/30 mb-8">Trusted by companies across North America, Europe &amp; Australia</p>
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5 md:gap-x-16">
            {[
              { name: 'Cedar Management', sub: ' Group' },
              { name: 'Kole Imports',      sub: '' },
              { name: 'YogaClub',          sub: '' },
              { name: 'CPO Commerce',      sub: '' },
              { name: 'Softonic',          sub: '.com' },
              { name: 'QUANTIQ',           sub: '' },
              { name: 'Cyvatar',           sub: '' },
            ].map((logo, i) => (
              <div key={i} className="opacity-35 hover:opacity-70 transition-opacity cursor-default select-none">
                <span className="text-sm md:text-base font-black text-white tracking-tight whitespace-nowrap">
                  {logo.name}<span className="text-[#E61739]">{logo.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. How We Compare */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Competitive Comparison
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4 tracking-tight">How We Compare.</h2>
            <p className="text-slate-500 text-lg font-medium max-w-2xl mx-auto">See how KDCI stacks up against traditional staffing agencies and freelance platforms across the factors that matter most.</p>
          </div>

          <div className="bg-white rounded-3xl border border-black/[0.06] overflow-hidden shadow-sm">

            {/* Column headers */}
            <div className="grid grid-cols-4 bg-slate-900 text-white">
              <div className="px-6 py-5 text-xs font-black uppercase tracking-widest text-white/40">Factor</div>
              <div className="px-6 py-5 text-center">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E61739] rounded-lg text-white text-xs font-black uppercase tracking-wider">KDCI Offshore</div>
              </div>
              <div className="px-6 py-5 text-xs font-black uppercase tracking-widest text-white/40 text-center">Traditional Agency</div>
              <div className="px-6 py-5 text-xs font-black uppercase tracking-widest text-white/40 text-center">Freelance Platform</div>
            </div>

            {/* Rows */}
            {[
              {
                factor: 'Talent Vetting',
                kdci:     { text: 'Rigorous multi-stage vetting',    good: true  },
                agency:   { text: 'Varies by firm',                  good: null  },
                freelance:{ text: 'Self-reported only',              good: false },
              },
              {
                factor: 'Time to Hire',
                kdci:     { text: '14–30 days by role',              good: true  },
                agency:   { text: '4–8 weeks typical',               good: false },
                freelance:{ text: 'Fast but unvetted',               good: null  },
              },
              {
                factor: 'Cost',
                kdci:     { text: 'Up to 70% below US rates',        good: true  },
                agency:   { text: 'High placement fees',             good: false },
                freelance:{ text: 'Low but inconsistent quality',    good: null  },
              },
              {
                factor: 'HR & Compliance',
                kdci:     { text: 'Fully managed by KDCI',           good: true  },
                agency:   { text: 'Partial — varies',                good: null  },
                freelance:{ text: 'Your responsibility',             good: false },
              },
              {
                factor: 'Dedicated Account Manager',
                kdci:     { text: 'Included, always-on',             good: true  },
                agency:   { text: 'Sometimes, at extra cost',        good: null  },
                freelance:{ text: 'Not available',                   good: false },
              },
              {
                factor: 'Scalability',
                kdci:     { text: 'Add staff in days',               good: true  },
                agency:   { text: 'Slow to scale',                   good: false },
                freelance:{ text: 'Limited team cohesion',           good: null  },
              },
              {
                factor: 'Replacement Guarantee',
                kdci:     { text: 'Yes — no extra charge',           good: true  },
                agency:   { text: 'Sometimes, with conditions',      good: null  },
                freelance:{ text: 'No — restart from scratch',       good: false },
              },
              {
                factor: 'Cultural & Timezone Fit',
                kdci:     { text: 'GMT+8, Western-trained teams',    good: true  },
                agency:   { text: 'Depends on placement country',    good: null  },
                freelance:{ text: 'Highly variable',                 good: false },
              },
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-4 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                <div className="px-6 py-4 flex items-center">
                  <span className="text-sm font-bold text-slate-700">{row.factor}</span>
                </div>
                {[row.kdci, row.agency, row.freelance].map((cell, j) => (
                  <div key={j} className={`px-6 py-4 flex items-center ${j === 0 ? 'bg-[#E61739]/[0.03]' : ''}`}>
                    <div className="flex items-start gap-2">
                      <span className={`mt-0.5 shrink-0 text-base leading-none ${cell.good === true ? 'text-emerald-500' : cell.good === false ? 'text-slate-300' : 'text-amber-400'}`}>
                        {cell.good === true ? '✓' : cell.good === false ? '✕' : '~'}
                      </span>
                      <span className={`text-sm font-medium leading-snug ${j === 0 ? 'text-slate-800 font-semibold' : 'text-slate-400'}`}>{cell.text}</span>
                    </div>
                  </div>
                ))}
              </div>
            ))}

            {/* Footer CTA */}
            <div className="border-t border-slate-100 bg-slate-50 px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-xs text-slate-400 font-medium">✓ = advantage &nbsp;·&nbsp; ~ = neutral &nbsp;·&nbsp; ✕ = disadvantage</p>
              <button onClick={() => setView('contact')} className="flex items-center gap-2 px-6 py-2.5 bg-[#E61739] text-white rounded-xl font-bold text-xs hover:bg-[#c51431] transition-all group shrink-0">
                Start with KDCI <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Client Testimonials */}
      <section className="py-32 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-5 py-2 mb-8 shadow-sm">
              <Star size={14} className="text-[#E61739] fill-[#E61739]" />
              <span className="text-sm font-bold text-[#1D1D1F] tracking-wide uppercase">Client Success Stories</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-[#1D1D1F] mb-6 tracking-tight">What our clients say.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Real feedback from companies who've built teams with KDCI.</p>
          </div>

          {/* Trust bar */}
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-4 mb-16">
            {[
              { stat: '500+', label: 'Clients Served' },
              { stat: '13+', label: 'Years in Business' },
              { stat: '95%', label: 'Client Retention' },
              { stat: '40+', label: 'Avg. Team Size' },
            ].map((t, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl font-bold text-[#E61739]">{t.stat}</div>
                <div className="text-xs text-slate-500 font-semibold uppercase tracking-wide">{t.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonial cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                quote: "What started out as a few agents, has grown into an invaluable partnership with KDCI. With more than 40 team members, we are lucky enough to count as part of our Cedar Family. Thank you so much KDCI for making our Company better!",
                name: "Rachel Rose",
                company: "Cedar Management Group",
                dept: "Customer Service & Sales",
              },
              {
                quote: "We love our KDCI team. They're just like a regular part of our team — it's just that they're thousands of miles away. We had difficulty finding qualified talent in the US and outsourcing changed everything for us.",
                name: "Jason Halfaker",
                company: "Kole Imports",
                dept: "Customer Service & Sales",
              },
              {
                quote: "It's been five years since we started working with KDCI and it just keeps getting better. We've grown together and achieved a lot of shared success. Overall, they're incredibly professional yet fun to work with.",
                name: "Dave Palmer",
                company: "YogaClub",
                dept: "Graphic Design",
              },
              {
                quote: "We have found KDCI to be a consistently reliable partner, always willing to go the extra mile to ensure our valued customers receive the best possible service.",
                name: "Chris McCaleb",
                company: "CPO Commerce",
                dept: "Customer Service & Sales",
              },
              {
                quote: "KDCI plays a very important role in our catalog and content operations. They are responsive, kind, and always willing to help. We have been working together for more than 4 years.",
                name: "Cristian Capdevila",
                company: "Softonic.com",
                dept: "Content Creation",
              },
              {
                quote: "Having collaborated with KDCI for our creative needs, I can confidently attest to their unparalleled expertise and dedication. Their team consistently delivered innovative solutions that exceeded our expectations.",
                name: "Emerson Bantegui",
                company: "We Are VK, Inc.",
                dept: "Graphic Design",
              },
            ].map((t, i) => (
              <div key={i} className="bg-white rounded-3xl p-8 flex flex-col shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-0.5 transition-all">
                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-[#E61739] fill-[#E61739]" />
                  ))}
                </div>
                <p className="text-[#1D1D1F] text-sm leading-relaxed font-medium flex-1 mb-8">"{t.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#E61739] flex items-center justify-center text-white font-bold text-sm shrink-0">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="font-bold text-[#1D1D1F] text-sm">{t.name}</div>
                    <div className="text-xs text-slate-400 font-medium">{t.company} · {t.dept}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom CTA row */}
          <div className="text-center mt-14">
            <p className="text-slate-500 text-sm font-medium">Join 500+ companies who've built winning teams with KDCI</p>
          </div>
        </div>
      </section>


      {/* 7. Contact Form */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[4rem] border border-white/5 flex flex-col lg:flex-row" style={{ overflow: 'hidden' }}>

          {/* Left — image panel */}
          <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-0 shrink-0">
            <img
              src={IMG_CONTACT}
              alt="KDCI offshore professional"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mb-2">Philippine Offshore Staffing</p>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">Your team, ready<br/>in 14–30 days.</h3>
              <div className="flex flex-wrap gap-2 mt-5">
                {['Expert Vetting', 'AI-Managed', 'Zero Risk'].map((t, i) => (
                  <span key={i} className="px-3 py-1 bg-white/10 border border-white/10 rounded-lg text-[10px] text-white/70 font-bold uppercase tracking-wider">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Right — form panel */}
          <div className="flex-1 p-10 md:p-14">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 bg-[#E61739] rounded-3xl flex items-center justify-center mb-6 shadow-lg">
                  <CheckCircle2 size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">We'll be in touch!</h3>
                <p className="text-white/50 font-medium">Your request has been received. Expect a response within 1 business day.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-4">
                    Free Consultation
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight">Build Your Offshore Team.</h2>
                  <p className="text-white/40 text-sm font-medium">Tell us what you need and we'll match you with top Philippine professionals.</p>
                </div>
                <form onSubmit={handleForm} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Full Name</label>
                      <input required className={inp} placeholder="Jane Smith" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Company</label>
                      <input required className={inp} placeholder="Acme Inc." value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Email</label>
                      <input required type="email" className={inp} placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Phone (optional)</label>
                      <input className={inp} placeholder="+1 555 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Role / Function Needed</label>
                    <input required className={inp} placeholder="e.g. Customer Support Lead, Full-Stack Developer" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Team size, timeline, budget range..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all group mt-2">
                    Request Free Consultation <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-[10px] text-white/20 text-center font-medium">No commitment required · Response within 1 business day</p>
                </form>
              </>
            )}
          </div>

        </div>
      </section>
      {/* 8. FAQ */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4 tracking-tight">Frequently asked questions.</h2>
            <p className="text-slate-500 text-lg font-medium">Everything you need to know before building your offshore team.</p>
          </div>
          <div className="space-y-3">
            {([
              {
                q: "How quickly can I get a team up and running?",
                a: "Most clients have their first hire placed and onboarded within 14 days. For larger team builds (5+ people), we typically complete full onboarding within 30 days. We handle sourcing, vetting, and HR setup — you just approve the candidates."
              },
              {
                q: "What's included in the all-in monthly rate?",
                a: "Your monthly rate covers the employee's salary, government-mandated benefits (SSS, PhilHealth, Pag-IBIG), paid leave, office space, equipment, IT infrastructure, HR management, and our AI-powered performance monitoring. No hidden fees or surprise invoices."
              },
              {
                q: "Are these dedicated employees or shared resources?",
                a: "All KDCI staff are fully dedicated to your business only. They work your hours, follow your processes, and become a true extension of your team — not shared across multiple clients like a typical BPO."
              },
              {
                q: "What happens if a hire isn't the right fit?",
                a: "We offer a free replacement guarantee. If a team member doesn't meet expectations within the first 90 days, we'll find and onboard a replacement at no additional cost. After that period, replacements are handled with the same speed and care."
              },
              {
                q: "How do you handle data security and confidentiality?",
                a: "All staff sign strict NDAs and data protection agreements. Our offices operate under enterprise-grade cybersecurity policies — including clean-desk rules, restricted USB access, and monitored networks. We're fully compliant with international data privacy standards."
              },
              {
                q: "What time zones do Philippine teams work in?",
                a: "The Philippines is GMT+8, which gives excellent overlap with US West Coast (evening shift), Australia, and parts of Europe. Many clients run their teams on shifted schedules to match their home-country business hours — this is standard practice and easily arranged."
              },
              {
                q: "Can I scale my team up or down as needed?",
                a: "Yes. You can add staff or scale down with as little as 30 days notice. There are no long-term lock-in contracts. Our engagement model is built for flexibility — whether you're growing fast or adjusting to seasonal demand."
              },
              {
                q: "Do I manage the team directly or does KDCI handle management?",
                a: "You have full day-to-day control of your team's tasks, priorities, and workflows. KDCI handles the HR, payroll, compliance, and performance infrastructure in the background — giving you the benefits of a direct hire without the employer-of-record overhead."
              },
            ] as { q: string; a: string }[]).map((item, i) => (
              <div key={i} className="border border-slate-200 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-[#F5F5F7] transition-colors group"
                >
                  <span className="font-bold text-[#1D1D1F] text-base pr-4">{item.q}</span>
                  <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-all ${openFaq === i ? 'bg-[#E61739] border-[#E61739] text-white rotate-45' : 'border-slate-300 text-slate-400 group-hover:border-[#E61739] group-hover:text-[#E61739]'}`}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-7 pb-6 text-slate-500 text-sm leading-relaxed font-medium border-t border-slate-100 pt-5">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <p className="text-slate-400 text-sm font-medium mb-4">Still have questions?</p>
            <button
              onClick={() => setView('contact')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#1D1D1F] text-white rounded-full font-bold text-sm hover:bg-[#E61739] transition-colors"
            >
              Talk to our team <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </section>

      {/* Sticky floating CTA */}
      <div className={`fixed bottom-8 right-8 z-50 transition-all duration-300 ${showSticky ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
        <button
          onClick={() => {
            const el = document.querySelector('#contact-form-section');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
            else setView('contact');
          }}
          className="flex items-center gap-3 px-6 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm shadow-2xl hover:bg-[#c51431] hover:scale-105 transition-all group"
          style={{ boxShadow: '0 8px 32px rgba(230,23,57,0.45)' }}
        >
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shrink-0" />
          Book a Free Call
          <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
