
import React, { useState, useEffect } from 'react';
import { ArrowRight, Headphones, Palette, Code, UserCircle, Coins, UserPlus, Home, Database, Users, Workflow, Target, Search, Handshake, Activity, CheckCircle2, Globe, GraduationCap, Clock, TrendingDown, Star, MessageSquare, Building2, DollarSign, Shield, X } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_STAFF_AUG_HERO, INDUSTRIES } from '../../data';
import IMG_PH_TEAM from '../../attached_assets/Gemini_Generated_Image_8gr4nc8gr4nc8gr4_1777973290700.png';
import IMG_CONTACT from '../../attached_assets/Gemini_Generated_Image_alu075alu075alu0_1777983805487.png';
import IMG_KDCI_OFFICE from '../../attached_assets/Gemini_Generated_Image_mhi0ftmhi0ftmhi0_1777992381262.png';
import IMG_HERO_HANDSHAKE from '../../attached_assets/Screenshot_2026-05-06_at_5.48.16_PM_1778060918147.png';

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


const phRange = (mid: string) => {
  const n = parseInt(mid.replace(/[$,]/g, ''));
  const lo = Math.round(n * 0.8 / 120) * 120;
  const hi = Math.round(n * 1.2 / 120) * 120;
  return `$${lo.toLocaleString()} – $${hi.toLocaleString()}`;
};

export const StaffAugmentationPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState(INDUSTRIES[0]);
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleForm = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors";
  const [showSticky, setShowSticky] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [modalForm, setModalForm] = useState({ name: '', company: '', email: '', phone: '', role: '', notes: '' });
  const [modalSubmitted, setModalSubmitted] = useState(false);
  const handleModalForm = (e: React.FormEvent) => { e.preventDefault(); setModalSubmitted(true); };
  const closeModal = () => { setShowModal(false); setModalSubmitted(false); setModalForm({ name: '', company: '', email: '', phone: '', role: '', notes: '' }); };
  const lightInp = "w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm";

  // SEO: update document head when this page is active
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Philippine Offshore Staffing | Hire Dedicated Remote Staff | KDCI';

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
      return el;
    };

    const desc = 'Hire dedicated, full-time offshore staff from the Philippines. Expert-vetted talent across 200+ roles — customer service, engineers, designers, accountants — all-in pricing, onboarded in 14–30 days.';
    setMeta('description', desc);
    setMeta('og:title', 'Philippine Offshore Staffing | KDCI Outsourcing', 'property');
    setMeta('og:description', 'Build a dedicated offshore team in the Philippines. 200+ roles, all-in monthly pricing, 14–30 day onboarding. 500+ clients across North America, Australia & Europe.', 'property');

    // JSON-LD for this specific page
    const ldId = 'ld-staff-aug';
    let ld = document.getElementById(ldId);
    if (!ld) { ld = document.createElement('script'); ld.id = ldId; (ld as HTMLScriptElement).type = 'application/ld+json'; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Philippine Offshore Staffing',
      description: desc,
      url: 'https://kdci.co',
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://kdci.co' },
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://kdci.co/services' },
          { '@type': 'ListItem', position: 3, name: 'Philippine Offshore Staffing', item: 'https://kdci.co/services/offshore-staffing' },
        ],
      },
    });

    return () => {
      document.title = prevTitle;
      document.getElementById(ldId)?.remove();
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setShowSticky(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);



  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-40"></div>
          <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs
            setView={setView}
            currentName="Philippine Offshore Staffing"
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
            align="left"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-[#E61739]">HR Outsourcing Services </span><span className="text-white">for Scaling Teams</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                Hire full-time, dedicated Philippines-based professionals embedded in your team — powered by HR outsourcing services that use AI to manage performance, workflows, and reporting.
              </p>

              <div className="flex flex-col gap-4 mb-8 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Full-time, dedicated Filipino offshore professionals</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">200+ roles across all departments</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Onboarded and embedded in 14–30 days</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setShowModal(true)} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Book a Free Consultation <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — image card */}
            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778557509/PH_Offshore_Staffing_dfqlgx.png"
                  alt="KDCI team greeting a new client"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Manila, Philippines
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {[
                    { name: "Workday",   logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Workday_logo.svg/330px-Workday_logo.svg.png", imgH: '32px', imgW: '80px', imgMB: '8px' },
                    { name: "Greenhouse", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778627008/greenhouse_logo_cvxxgz.png", imgH: '26px', imgMT: '8px' },
                    { name: "Eightfold", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778625323/eightfold_logo_mzmlaw.png", imgH: '28px' },
                    { name: "HireVue",   logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778626347/hirevue-logo_cv5sqa.svg", imgH: '14px' },
                  ].map((app, i) => (
                    <div key={i} className="h-[37px] md:h-[46px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <img src={app.logo} alt={app.name} className="object-contain" style={(app as any).imgH ? { height: (app as any).imgH, width: (app as any).imgW || 'auto', marginTop: (app as any).imgMT || 0, marginBottom: (app as any).imgMB || 0 } : { maxHeight: '100%' }} referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-6">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-10 gap-y-4 md:gap-x-16 lg:gap-x-20 items-center text-white">
            {[
              { stat: '500+',     label: 'Clients Globally' },
              { stat: '15+ yrs', label: 'In Operation' },
              { stat: '95%',      label: 'Client Retention' },
              { stat: '200+',     label: 'Roles Available' },
              { stat: '14–30d',  label: 'Time to First Hire' },
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
      <section className="py-28 bg-white overflow-hidden">
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
                  How It Works
                </div>
                <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-5 tracking-tight leading-tight">One offshore partner for all your staffing needs.</h2>
                <p className="text-slate-500 text-lg font-medium leading-relaxed max-w-xl mb-10">KDCI acts as your employer of record in the Philippines — we hire, manage compliance, and handle HR, while you direct the work and own the output.</p>
              </div>

              <div className="space-y-4 mb-10">
                {[
                  { title: 'Expert-vetted talent only', body: 'Every candidate clears a multi-stage vetting process — skills tests, cultural fit interview, and reference checks before you ever see a profile.' },
                  { title: 'All-in monthly pricing', body: 'One flat rate covers salary, benefits, office, equipment, HR, AI performance monitoring, and a dedicated account manager. No hidden costs.' },
                  { title: 'Onboarded in 14–30 days', body: 'Common roles placed in 14 days. Senior or specialized roles within 30. KDCI handles every step from sourcing to Day 1 activation.' },
                  { title: 'Scale up or down with 30 days notice', body: 'No long-term lock-in. Add roles as you grow or reduce headcount as your needs change — no penalties, no friction.' },
                ].map((p, i) => (
                  <div key={i} className="flex items-start gap-4 p-5 rounded-2xl bg-[#F5F5F7] border border-black/[0.03]">
                    <div className="w-6 h-6 rounded-full bg-[#E61739] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 size={13} className="text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1D1D1F] mb-1">{p.title}</h3>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed">{p.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setView('contact')}
                className="self-start flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all group"
              >
                Book a Free Call <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Onboarding Timeline */}
      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
                Onboarding Timeline
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tight leading-none">Get started with outsourced HR services in four steps.</h2>
            </div>
            <p className="text-white/40 text-base font-medium max-w-xs leading-relaxed">Place common roles in 14 days. Fill specialized or senior roles within 30. Our offshore recruiters handle every step, from sourcing to onboarding.</p>
          </div>

          <div className="space-y-3">
            {[
              { day: 'Day 1',     num: '01', icon: Target,    title: 'Discovery Call',  desc: 'Define roles & seniority, set team size & budget, align on KPIs and SLAs.' },
              { day: 'Day 2–5',   num: '02', icon: Search,    title: 'Source & Screen', desc: 'AI-assisted talent search, skills and culture-fit vetting, top 3 candidates presented.' },
              { day: 'Day 6–10',  num: '03', icon: Handshake, title: 'You Approve',     desc: 'Interview your shortlist, select your hire(s), contracts and NDAs signed.' },
              { day: 'Day 11–14', num: '04', icon: Activity,  title: 'Go Live',         desc: 'Equipment and system access set up, integrated into your tools, AI monitoring activated.' },
            ].map((s, idx) => (
              <div key={idx} className="group flex items-center gap-0 border border-white/[0.07] rounded-2xl overflow-hidden hover:border-white/[0.14] transition-all duration-300">
                <div className="w-20 md:w-28 shrink-0 flex flex-col items-center justify-center self-stretch bg-white/[0.03] border-r border-white/[0.07] group-hover:bg-[#E61739]/10 group-hover:border-[#E61739]/20 transition-all duration-300 py-6">
                  <span className="text-3xl md:text-4xl font-black text-white/30 group-hover:text-[#E61739]/60 transition-colors leading-none">{s.num}</span>
                </div>
                <div className="flex flex-1 flex-col md:flex-row md:items-center gap-5 md:gap-10 px-6 md:px-10 py-6">
                  <div className="flex items-center gap-4 md:w-56 shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/15 flex items-center justify-center text-white/70 group-hover:bg-[#E61739]/15 group-hover:border-[#E61739]/30 group-hover:text-[#E61739] transition-all shrink-0">
                      <s.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-0.5">{s.day}</p>
                      <h4 className="text-base font-bold text-white leading-tight">{s.title}</h4>
                    </div>
                  </div>
                  <p className="text-sm text-white/65 font-medium leading-relaxed flex-1">{s.desc}</p>
                </div>
                <div className="hidden md:flex w-16 shrink-0 items-center justify-center self-stretch border-l border-white/[0.07]">
                  <ArrowRight size={16} className="text-white/25 group-hover:text-[#E61739]/60 transition-colors" />
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 py-6 mt-8 border-t border-white/[0.07]">
            {[
              { icon: CheckCircle2, text: 'First candidate presented in 5 days' },
              { icon: CheckCircle2, text: '14 days for common roles · up to 30 for specialized' },
              { icon: CheckCircle2, text: 'Free replacement within 90 days' },
            ].map((p, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-white/65 font-medium">
                <p.icon size={14} className="text-[#E61739] shrink-0" />
                {p.text}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. 200+ Roles Available */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1D1D1F]/8 border border-[#1D1D1F]/12 text-[#1D1D1F] text-[10px] font-black uppercase tracking-widest mb-5">
              200+ Roles Available
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#1D1D1F] tracking-tight leading-tight mb-4">Most-requested positions.</h2>
            <p className="text-slate-500 text-base font-medium max-w-lg mx-auto leading-relaxed">Source the most in-demand offshore roles at all-in monthly rates that include salary, benefits, office, and HR. No recruiter fees.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                category: 'Operations & Client-Facing',
                color: '#E61739',
                roles: [
                  { icon: Headphones, role: 'Customer Service Agent',  rate: 'from $1,550/mo', tag: 'High demand' },
                  { icon: UserCircle, role: 'Virtual Assistant',        rate: 'from $1,450/mo', tag: 'Quick hire' },
                  { icon: Users,      role: 'HR Specialist',            rate: 'from $1,700/mo', tag: '' },
                  { icon: Home,       role: 'Real Estate Admin',        rate: 'from $1,550/mo', tag: 'High demand' },
                  { icon: Workflow,   role: 'Operations / Process Mgr', rate: 'from $2,200/mo', tag: '' },
                ],
              },
              {
                category: 'Tech, Creative & Finance',
                color: '#1D4ED8',
                roles: [
                  { icon: Code,    role: 'Software Engineer',        rate: 'from $2,750/mo', tag: 'Specialist' },
                  { icon: Palette, role: 'Graphic Designer',         rate: 'from $1,900/mo', tag: '' },
                  { icon: Coins,   role: 'Accountant / Bookkeeper',  rate: 'from $1,700/mo', tag: '' },
                  { icon: Target,  role: 'Digital Marketer / SEO',   rate: 'from $1,900/mo', tag: '' },
                  { icon: Database,role: 'Data Analyst',             rate: 'from $2,050/mo', tag: 'Specialist' },
                ],
              },
            ].map((group, gi) => (
              <div key={gi} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="px-7 py-5 border-b border-slate-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">{group.category}</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {group.roles.map((r, ri) => (
                    <div key={ri} className="flex items-center gap-4 px-7 py-4 hover:bg-slate-50 transition-colors group cursor-default">
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all"
                        style={{ backgroundColor: group.color + '12' }}
                      >
                        <r.icon size={16} style={{ color: group.color }} />
                      </div>
                      <span className="flex-1 text-sm font-semibold text-[#1D1D1F] leading-tight">{r.role}</span>
                      {r.tag && (
                        <span className="text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#E61739]/8 text-[#E61739]">{r.tag}</span>
                      )}
                      <span className="text-sm font-black text-slate-900 shrink-0">{r.rate}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-slate-400 font-medium mt-8">
            Don't see your role? We staff 200+ positions across every function.{' '}
            <button onClick={() => setView('contact')} className="text-[#E61739] font-bold hover:underline">Ask us about it →</button>
          </p>

        </div>
      </section>

      {/* 5. Why the Philippines */}
      <section className="pt-8 pb-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Why Hire From the Philippines
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] tracking-tight leading-tight mb-4">
              The world's leading source of remote offshore teams.
            </h2>
            <p className="text-slate-500 text-base font-medium max-w-xl mx-auto leading-relaxed ml-[251.6px] mr-[251.6px]">
              The Philippines consistently outperforms competing markets on factors that drive long-term team success, making it the top choice for companies building offshore teams.
            </p>
          </div>

          {/* Office team photo */}
          <div className="relative mb-10 rounded-3xl overflow-hidden shadow-lg" style={{ height: '400px' }}>
            <img
              src={IMG_KDCI_OFFICE}
              alt="KDCI Operations team in Manila office"
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 px-8 py-6 flex items-end justify-between">
              <div>
                <p className="text-white font-black text-lg leading-tight">Your dedicated team. Manila, Philippines.</p>
                <p className="text-white/60 text-sm font-medium mt-1">KDCI-managed office — staffed, equipped, and compliant from day one.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                icon: MessageSquare,
                color: '#E61739',
                stat: '#2 in Asia',
                title: 'English Proficiency',
                body: 'The Philippines ranks 2nd in English proficiency across Asia (EF EPI 2024) — ahead of India, China, Japan, and South Korea. Neutral accents and strong written English reduce miscommunication with US, AU, and UK clients.',
              },
              {
                icon: Handshake,
                color: '#1D4ED8',
                stat: '100+ years',
                title: 'Western Cultural Alignment',
                body: 'A century of American-influenced education, media, and business culture means Filipino professionals share communication norms, work ethics, and professional expectations with Western teams. Minimal culture-gap friction.',
              },
              {
                icon: Clock,
                color: '#0891B2',
                stat: 'UTC+8',
                title: 'Flexible Time Zone Coverage',
                body: 'Philippine Standard Time overlaps with Australian business hours (1–4 hrs behind AEST) and can flex into US evening hours. Many KDCI teams split shifts to cover US East / West Coast business hours directly.',
              },
              {
                icon: GraduationCap,
                color: '#7C3AED',
                stat: '750,000+',
                title: 'Graduates Per Year',
                body: 'The Philippine higher education system produces over 750,000 graduates annually. Strong STEM output, plus nursing, accounting, and IT programs that consistently meet global professional certification standards.',
              },
              {
                icon: Building2,
                color: '#059669',
                stat: 'PEZA-backed',
                title: 'Government BPO Support',
                body: 'The IT-BPM industry is a national priority. PEZA-registered business parks, government training programs, and stable infrastructure investment all support a reliable, growing offshore workforce.',
              },
              {
                icon: DollarSign,
                color: '#D97706',
                stat: '50–70% savings',
                title: 'Structural Cost Advantage',
                body: 'Lower cost of living means competitive salaries for local staff at a fraction of US equivalent costs — without compromising on skill or commitment. A $1,800/mo offshore role often replaces a $6,500/mo US equivalent.',
              },
            ].map((card, i) => (
              <div key={i} className="bg-white rounded-3xl p-7 border border-slate-100 hover:shadow-md transition-all group">
                <div className="flex items-start justify-between mb-5">
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: card.color + '18' }}
                  >
                    <card.icon size={20} style={{ color: card.color }} strokeWidth={1.75} />
                  </div>
                  <span className="text-[11px] font-black text-[#E61739] uppercase tracking-wider bg-[#E61739]/8 px-2.5 py-1 rounded-full">{card.stat}</span>
                </div>
                <h4 className="text-base font-bold text-[#1D1D1F] mb-3">{card.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{card.body}</p>
              </div>
            ))}
          </div>

          {/* Country coverage strip */}
          <div className="mt-10 bg-white border border-slate-100 rounded-3xl px-8 py-6">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Serving clients in 9+ countries</p>
            <div className="flex flex-wrap gap-3">
              {[
                { flag: '🇺🇸', name: 'United States' },
                { flag: '🇦🇺', name: 'Australia' },
                { flag: '🇬🇧', name: 'United Kingdom' },
                { flag: '🇨🇦', name: 'Canada' },
                { flag: '🇸🇬', name: 'Singapore' },
                { flag: '🇦🇪', name: 'UAE' },
                { flag: '🇩🇪', name: 'Germany' },
                { flag: '🇳🇿', name: 'New Zealand' },
                { flag: '🇮🇪', name: 'Ireland' },
              ].map((c, i) => (
                <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-base leading-none">{c.flag}</span>
                  <span className="text-xs font-semibold text-slate-600">{c.name}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Industry Savings */}
      <section className="py-20 bg-[#F9F9F9] border-y border-slate-100">
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
                  <span className="col-span-3 text-[10px] font-black uppercase tracking-widest text-[#E61739]/70 text-center">KDCI Range / mo</span>
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
                      <span className="text-sm font-black text-white">{phRange(row.ph)}</span>
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
                <p className="text-white/30 text-xs font-medium">Indicative monthly rate ranges (junior–senior) · all-in, no hidden fees</p>
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

      {/* 6. Pricing Transparency */}
      <section className="py-20 bg-[#0A0A0A] text-white">
        <div className="max-w-5xl mx-auto px-6">

          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Transparent Pricing
            </div>
            <h2 className="text-3xl md:text-5xl font-heading font-bold tracking-tight mb-4">One rate. Everything included.</h2>
            <p className="text-white/65 text-base font-medium max-w-xl mx-auto leading-relaxed">Our offshore staffing services run on one flat monthly rate covering salary, benefits, office, equipment, HR, and AI monitoring. No agency fees, no hidden costs.</p>
          </div>

          {/* Rate tiers */}
          <div className="space-y-2 mb-10">
            {[
              { category: 'Customer Support & Admin',    range: '$1,450 – $2,200',  note: 'CS agents, VAs, data entry, reception' },
              { category: 'Design, Marketing & Content', range: '$1,900 – $3,100',  note: 'Graphic designers, SEO, social media, copywriters' },
              { category: 'Software Engineering',        range: '$2,750 – $4,450',  note: 'Frontend, backend, QA, DevOps — mid level' },
              { category: 'Senior & Specialized Roles',  range: '$4,250 – $6,800',  note: 'Senior engineers, finance leads, operations managers' },
            ].map((tier, i) => (
              <div key={i} className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-7 py-5 border border-white/[0.07] rounded-2xl hover:border-white/[0.14] hover:bg-white/[0.02] transition-all duration-200">
                <span className="flex-1 text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{tier.category}</span>
                <span className="hidden sm:block text-xs text-white/50 font-medium flex-1">{tier.note}</span>
                <span className="text-lg font-black text-white whitespace-nowrap">{tier.range} <span className="text-white/50 text-sm font-semibold">/ mo</span></span>
              </div>
            ))}
          </div>

          {/* Included strip */}
          <div className="border border-white/[0.07] rounded-2xl px-7 py-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/50 mb-5">Every rate includes</p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Users,        label: 'Salary & benefits' },
                { icon: Building2,    label: 'Office & workstation' },
                { icon: Activity,     label: 'IT equipment & internet' },
                { icon: CheckCircle2, label: 'HR & payroll' },
                { icon: Target,       label: 'AI performance monitoring' },
                { icon: Handshake,    label: 'Dedicated account manager' },
                { icon: Shield,       label: '90-day replacement guarantee' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/[0.10]">
                  <item.icon size={13} className="text-[#E61739] shrink-0" />
                  <span className="text-xs font-semibold text-white/75">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-white/50 font-medium mt-6">
            Rates vary by seniority and team size.{' '}
            <button onClick={() => setView('contact')} className="text-[#E61739] font-bold hover:underline">Get an exact quote →</button>
          </p>

        </div>
      </section>

      {/* Client Results */}
      <section className="py-20 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-16">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/8 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
                Client Results
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] tracking-tight leading-tight">Real teams.<br/>Measurable outcomes.</h2>
            </div>
            <p className="text-slate-500 text-base font-medium max-w-sm leading-relaxed">Every engagement below started with a discovery call — and grew into a long-term offshore team.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              {
                client: 'Cedar Management Group',
                industry: 'Property Management',
                flag: '🇺🇸',
                challenge: 'Could not find or retain qualified customer service and admin staff locally at a cost that matched their growth targets.',
                outcome: 'Scaled from 3 KDCI agents to 40+ full-time team members over 4 years — now a core part of their operations across customer service, leasing support, and back-office functions.',
                metrics: [
                  { value: '40+', label: 'Team Members' },
                  { value: '4 yrs', label: 'Partnership' },
                  { value: 'CS + Admin', label: 'Roles Covered' },
                ],
                quote: 'KDCI has become an invaluable partnership — we count them as part of the Cedar Family.',
                author: 'Rachel Rose, Cedar Management Group',
              },
              {
                client: 'YogaClub',
                industry: 'eCommerce / Subscription',
                flag: '🇺🇸',
                challenge: 'Rapid subscriber growth outpaced their ability to staff customer service in the US — ticket backlog was growing and CSAT scores were slipping.',
                outcome: 'Deployed a dedicated KDCI customer service team that absorbed volume spikes, integrated with their helpdesk tools, and maintained sub-4-hour first response times during peak subscription cycles.',
                metrics: [
                  { value: '<4 hrs', label: 'First Response' },
                  { value: '60%+', label: 'Cost Reduction vs US' },
                  { value: '3 weeks', label: 'Onboarding Time' },
                ],
                quote: 'The team integrated seamlessly with our US staff. Customers can\'t tell the difference.',
                author: 'YogaClub Operations Team',
              },
              {
                client: 'CPO Commerce',
                industry: 'B2B eCommerce',
                flag: '🇺🇸',
                challenge: 'Needed to scale product listing, catalog management, and customer support without proportionally scaling headcount costs as SKU count grew.',
                outcome: 'KDCI built a blended offshore team covering catalog operations and customer support — freeing US staff for strategic work while processing 3x the SKU volume at a fraction of the previous cost.',
                metrics: [
                  { value: '3×', label: 'SKU Volume Handled' },
                  { value: '65%', label: 'Per-Head Cost Saving' },
                  { value: 'Catalog + CS', label: 'Roles Covered' },
                ],
                quote: 'We couldn\'t have scaled our catalog operations this fast without our KDCI team.',
                author: 'CPO Commerce Leadership',
              },
            ].map((cs, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl overflow-hidden flex flex-col hover:shadow-md transition-all">
                {/* Header */}
                <div className="px-7 pt-7 pb-5 border-b border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-lg">{cs.flag}</span>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">{cs.industry}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#1D1D1F]">{cs.client}</h3>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 divide-x divide-slate-100 border-b border-slate-100">
                  {cs.metrics.map((m, j) => (
                    <div key={j} className="px-4 py-4 text-center">
                      <div className="text-xl font-black text-[#E61739]">{m.value}</div>
                      <div className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Body */}
                <div className="px-7 py-5 flex-1 flex flex-col gap-4">
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Challenge</div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{cs.challenge}</p>
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Outcome</div>
                    <p className="text-sm text-slate-600 leading-relaxed font-medium">{cs.outcome}</p>
                  </div>
                </div>

                {/* Quote */}
                <div className="px-7 pb-7">
                  <div className="bg-slate-50 rounded-2xl px-5 py-4 border border-slate-100">
                    <p className="text-xs text-slate-500 italic leading-relaxed mb-2">"{cs.quote}"</p>
                    <p className="text-[10px] text-slate-400 font-bold">— {cs.author}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Slim testimonial strip */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {[
              { quote: "We love our KDCI team — they're just like a regular part of our team, thousands of miles away. Outsourcing changed everything for us.", name: "Jason Halfaker", company: "Kole Imports" },
              { quote: "Five years in and it just keeps getting better. Incredibly professional and a genuine pleasure to work with.", name: "Dave Palmer", company: "YogaClub" },
              { quote: "KDCI plays a very important role in our catalog and content operations. Responsive, kind, and always willing to help — 4+ years running.", name: "Cristian Capdevila", company: "Softonic.com" },
            ].map((t, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-2xl px-6 py-5">
                <div className="flex gap-0.5 mb-3">{[...Array(5)].map((_, s) => <Star key={s} size={11} className="text-[#E61739] fill-[#E61739]" />)}</div>
                <p className="text-xs text-slate-600 italic leading-relaxed mb-3">"{t.quote}"</p>
                <p className="text-[10px] text-slate-400 font-bold">— {t.name}, {t.company}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button onClick={() => setView('contact')}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#E61739] text-white rounded-full font-bold text-sm hover:bg-[#c41230] transition-colors">
              Start your success story <ArrowRight size={16} />
            </button>
          </div>

        </div>
      </section>


      {/* Contact Form */}
      <section className="py-20 px-6">
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
                  <h2 className="md:text-3xl font-heading font-bold text-white mb-2 text-[32px]">Build Your Offshore Team Today</h2>
                  <p className="text-white/40 font-medium text-[13px]">Every long-term offshore staffing engagement begins with a discovery call. Tell us what you need, and we'll match you with top Philippine professionals.</p>
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
      <section className="py-24 bg-white">
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

      {/* Consultation Modal */}
      {showModal && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4"
          style={{ animation: 'fadeInUp 0.25s ease both' }}
          onKeyDown={e => e.key === 'Escape' && closeModal()}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={closeModal} />
          <div className="relative z-10 w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl" style={{ maxHeight: '90vh', overflowY: 'auto' }}>

            {/* Header */}
            <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">
                  <Star size={10} /> Book a Consultation
                </div>
                <h2 className="text-2xl font-black text-slate-900 leading-tight">Tell us about your team needs.</h2>
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
                    Our team leads will review your brief and reach out within 24 hours.
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
                    <input required className={lightInp} placeholder="e.g. Customer Support Lead, Full-Stack Developer" value={modalForm.role} onChange={e => setModalForm(f => ({ ...f, role: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={lightInp + " resize-none"} placeholder="Timeline, budget, team size, timezone requirements..." value={modalForm.notes} onChange={e => setModalForm(f => ({ ...f, notes: e.target.value }))} />
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
                  { val: '500+', label: 'Clients Globally' },
                  { val: '14–30 Days', label: 'Time to First Hire' },
                  { val: '95%', label: 'Client Retention' },
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
