
import React from 'react';
import { ArrowRight, Sparkles, Briefcase, ScanSearch, UserCheck, ClipboardCheck, Workflow, Cpu, Handshake, BrainCircuit, Globe2, ShieldCheck, CheckCircle2, Star, Award, Target, Shield } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_REC_HERO, IMG_REC_VETTING, INDUSTRIES } from '../../data';
import recIncludedImg from '@/attached_assets/Gemini_Generated_Image_x4lp18x4lp18x4lp_1777967577991.png';

const INDUSTRY_ROLES: Record<string, string[]> = {
  'ecommerce':      ['Growth Marketer', 'Catalog Manager', 'SEO Specialist', 'CX Lead', 'Visual Merchandiser'],
  'software-dev':   ['Product Manager', 'Full-Stack Developer', 'QA Engineer', 'DevOps Engineer', 'Technical Writer'],
  'property-mgmt':  ['Property Manager', 'Listings Coordinator', 'Transaction Coordinator', 'CRM Specialist', 'Real Estate VA'],
  'fintech':        ['Compliance Analyst', 'Fraud Detection Specialist', 'Financial Analyst', 'Data Analyst', 'CX Lead'],
  'healthcare':     ['Medical VA', 'Healthcare Administrator', 'Medical Biller/Coder', 'Patient Coordinator', 'Claims Processor'],
  'marketing-ad':   ['Digital Marketing Manager', 'Content Strategist', 'Social Media Manager', 'PPC Specialist', 'Brand Designer'],
  'retail':         ['Inventory Manager', 'Customer Service Rep', 'E-commerce Coordinator', 'Supply Chain Analyst', 'Merchandiser'],
  'logistics':      ['Logistics Coordinator', 'Supply Chain Analyst', 'Operations Manager', 'Data Entry Specialist', 'Freight Broker VA'],
  'travel':         ['Booking Coordinator', 'Customer Support Agent', 'Travel Consultant', 'Reservations Manager', 'Content Writer'],
  'edtech':         ['Curriculum Developer', 'Instructional Designer', 'LMS Administrator', 'Student Support Rep', 'Content Creator'],
  'legal':          ['Legal VA', 'Paralegal', 'Contract Reviewer', 'Legal Researcher', 'Compliance Coordinator'],
  'insurance':      ['Claims Processor', 'Underwriting Assistant', 'Policy Administrator', 'Insurance Analyst', 'Customer Support Rep'],
  'media':          ['Content Writer', 'Copy Editor', 'Social Media Manager', 'Video Editor', 'SEO Content Specialist'],
  'consumer-tech':  ['Product Support Specialist', 'Technical Writer', 'QA Tester', 'Customer Success Manager', 'Community Manager'],
  'telecom':        ['Technical Support Agent', 'Network Documentation Specialist', 'Billing Specialist', 'Sales Support Rep', 'Customer Service Rep'],
  'auto':           ['Parts Coordinator', 'Customer Service Rep', 'Inventory Manager', 'Digital Marketing Specialist', 'Data Entry Specialist'],
  'fashion':        ['Product Listing Specialist', 'Visual Merchandiser', 'Customer Service Rep', 'Social Media Manager', 'E-commerce Coordinator'],
  'energy':         ['Data Analyst', 'Operations Coordinator', 'Compliance Specialist', 'Billing Analyst', 'Customer Support Rep'],
  'prof-services':  ['Executive VA', 'Research Analyst', 'Project Coordinator', 'Business Development Rep', 'Client Success Manager'],
  'gov':            ['Data Entry Specialist', 'Records Management Specialist', 'Administrative Assistant', 'Research Analyst', 'Compliance Coordinator'],
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
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-40">
        <div className="absolute inset-0 z-0">
          <img src={IMG_REC_HERO} alt="KDCI Recruitment Hub" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Global Recruitment Services" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Smarter, Faster</span><br/>
            <span className="text-[#E61739]">Recruitment.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Full-cycle recruitment from job brief to signed offer — powered by AI tools and expert Philippine sourcers who deliver 3× faster than traditional agencies.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-3xl font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Start Hiring <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-white/5 border border-white/10 text-white rounded-3xl font-bold text-xl hover:bg-white/10 transition-all backdrop-blur-md">
              Request Pricing
            </button>
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
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100">
                <Sparkles size={12} /> What We Deliver
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                From job brief<br/>to <span className="text-[#E61739]">signed offer.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
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
              <div className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl">
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
      <section className="py-32 bg-[#020202] relative overflow-hidden">
        <div className="mesh-container opacity-20">
          <div className="blob blob-purple"></div>
          <div className="blob blob-magenta"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
              <Award size={12} /> Why It Commands a Premium
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
              Skin in the game.<br/><span className="text-[#E61739]">Not just a service.</span>
            </h2>
            <p className="text-white/50 text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              We back every placement with a 90-day replacement guarantee — standard, no exceptions.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: '90-Day Replacement Guarantee',
                desc: "We have skin in the game. A 90-day replacement guarantee is standard on every placement. If it doesn't work out, we re-source at no extra cost.",
                highlight: false,
              },
              {
                icon: Target,
                title: 'Flat Fee vs. 15–25%',
                desc: 'US recruiting firms charge 15–25% of annual salary. We charge a flat fee and back it with a guarantee — saving you tens of thousands per hire.',
                highlight: true,
              },
              {
                icon: Workflow,
                title: 'Embedded RPO Option',
                desc: 'For RPO retainer clients, we become an embedded talent function that knows your culture and hiring bar intimately — delivering consistently better candidates over time.',
                highlight: false,
              },
            ].map((item, i) => (
              <div key={i} className={`p-10 rounded-3xl border transition-all ${item.highlight ? 'bg-[#E61739] border-[#E61739]' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${item.highlight ? 'bg-white/20' : 'bg-white/10'}`}>
                  <item.icon size={28} className="text-white" />
                </div>
                <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
                <p className={`text-sm font-medium leading-relaxed ${item.highlight ? 'text-white/80' : 'text-white/50'}`}>{item.desc}</p>
              </div>
            ))}
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
                <div className="text-3xl font-black text-slate-900 mb-1">3× Faster</div>
                <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Than traditional recruitment agencies</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Simple, Transparent Pricing.</h2>
            <p className="text-slate-500 text-lg font-medium">Structured for every stage of your hiring needs.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {[
              {
                name: "Per Placement",
                badge: null,
                price: "$1,800–$3,500",
                priceNote: "per hire",
                tagline: "Per successful hire · No monthly commitment",
                details: ["Junior to mid-level: $1,800 · Senior / specialist: $3,500 · No setup fee · Pay on hire"],
                features: ["AI-Powered Sourcing", "Resume Screening & Scoring", "3–5 Vetted Shortlist", "90-Day Replacement Guarantee"],
                highlight: false,
              },
              {
                name: "RPO Retainer",
                badge: "Best Value",
                price: "$3,500",
                priceNote: "/ mo",
                tagline: "Dedicated recruiter · up to 5 active roles/mo",
                details: ["Priority sourcing · ATS management", "Setup fee: $1,000 · 3-month minimum"],
                features: ["Everything in Per Placement", "Dedicated Recruiter", "ATS Management", "Talent Market Reports", "Interview Scheduling & Offer Management"],
                highlight: true,
              },
              {
                name: "Enterprise RPO",
                badge: null,
                price: "$6,000+",
                priceNote: "/ mo",
                tagline: "Full embedded talent function · unlimited roles",
                details: ["Team of recruiters · employer branding support", "Setup fee: Waived · 6-month minimum"],
                features: ["Everything in RPO Retainer", "Team of Recruiters", "Employer Branding Support", "Unlimited Active Roles", "Executive & Volume Hiring"],
                highlight: false,
              },
            ].map((plan, i) => (
              <div key={i} className={`p-10 rounded-3xl relative transition-all ${plan.highlight ? 'bg-slate-900 text-white shadow-2xl scale-105 border-0' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'}`}>
                {plan.badge && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">
                    {plan.badge}
                  </div>
                )}
                <h4 className={`text-2xl font-bold mb-3 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h4>
                <div className="flex items-baseline gap-1.5 mb-1 flex-wrap">
                  <span className={`text-3xl font-black whitespace-nowrap ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.price}</span>
                  <span className={`text-xs font-black uppercase tracking-widest ${plan.highlight ? 'text-white/40' : 'text-slate-400'}`}>{plan.priceNote}</span>
                </div>
                <p className={`text-sm font-semibold mb-4 ${plan.highlight ? 'text-white/60' : 'text-slate-500'}`}>{plan.tagline}</p>
                <div className="mb-6 space-y-1">
                  {plan.details.map((d, idx) => (
                    <p key={idx} className={`text-xs font-bold ${plan.highlight ? 'text-white/40' : 'text-slate-400'}`}>{d}</p>
                  ))}
                </div>
                <div className={`border-t mb-6 ${plan.highlight ? 'border-white/10' : 'border-slate-100'}`}></div>
                <ul className="space-y-3 mb-10">
                  {plan.features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-sm font-bold">
                      <CheckCircle2 size={15} className="text-[#E61739] shrink-0" />
                      <span className={plan.highlight ? 'text-white/80' : 'text-slate-600'}>{f}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={() => setView('contact')} className={`w-full py-4 rounded-3xl font-bold text-base transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-xl' : 'bg-slate-900 text-white hover:bg-black'}`}>
                  Get a Quote
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Built for Speed.</h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto font-medium leading-relaxed">Our AI-augmented recruitment lifecycle ensures you never waste time on sub-par candidates.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            {[
              { step: "01", title: "Discovery", desc: "KPI targets & cultural fit.", icon: ScanSearch },
              { step: "02", title: "AI Sourcing", desc: "100k+ global profiles scan.", icon: Cpu },
              { step: "03", title: "Screening", desc: "Technical skill scoring.", icon: ClipboardCheck },
              { step: "04", title: "Shortlist", desc: "Top 3–5 curated candidates.", icon: UserCheck },
              { step: "05", title: "Offer & Close", desc: "Scheduling, offer & handover.", icon: Handshake },
            ].map((s, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-8 group-hover:border-[#E61739] group-hover:bg-slate-900 transition-all shadow-lg">
                  <s.icon size={24} />
                </div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-[0.2em] mb-2">{s.step}</div>
                <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                <p className="text-xs text-white/40 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Specialization — all 20 verticals */}
      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Industry Specialization.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">
              Our recruiters understand the technical nuances of your vertical — sourcing talent that hits the ground running across 20+ industries.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {INDUSTRIES.map((ind, i) => {
              const roles = INDUSTRY_ROLES[ind.id] ?? [];
              return (
                <div key={i} className="bg-white border border-black/5 rounded-3xl p-4 hover:shadow-md hover:border-[#E61739]/25 transition-all duration-300 group overflow-hidden">
                  <div className="flex items-center gap-2.5 mb-0 group-hover:mb-3 transition-all duration-300">
                    <div className="w-7 h-7 shrink-0 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-[#E61739]/10 group-hover:text-[#E61739] transition-colors">
                      <ind.icon size={13} />
                    </div>
                    <h4 className="text-[11px] font-black text-slate-800 leading-tight">{ind.name}</h4>
                  </div>
                  <div className="max-h-0 group-hover:max-h-40 overflow-hidden transition-all duration-300 ease-in-out">
                    <div className="space-y-1 pt-0.5">
                      {roles.map((role, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-[#E61739] shrink-0 opacity-50"></div>
                          <span className="text-[10px] font-medium text-slate-500 leading-tight">{role}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
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
                  <div className="text-3xl font-black text-slate-900 mb-1">70%</div>
                  <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Typical OpEx Reduction</p>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The Recruitment <br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-10">
                {[
                  { title: "AI + Human Hybrid", desc: "Algorithmic speed meets deep talent intuition for perfect cultural fit.", icon: BrainCircuit },
                  { title: "Offshore Efficiency", desc: "Access the Philippines' top 1% at high-velocity local market rates.", icon: Globe2 },
                  { title: "High-Caliber Vetting", desc: "We test for technical mastery, EQ, and alignment with your goals.", icon: ShieldCheck },
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

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-3xl overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
          <div className="absolute inset-0 z-0">
            <img src={IMG_REC_HERO} alt="Recruitment Team" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
          </div>
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-magenta opacity-30"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Build your <br/><span className="text-shine-red">dream team.</span></h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Book a strategy session with our talent leads and get a customized sourcing plan.</p>
            <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-3xl font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
              Book Recruitment Strategy <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
