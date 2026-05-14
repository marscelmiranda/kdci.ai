
import React, { useState, useRef } from 'react';
import { ArrowRight, MessageSquare, BrainCircuit, Users, ShoppingCart, Code, Building, Landmark, HeartPulse, Megaphone, Truck, GraduationCap, Layers2, ScanSearch, UsersRound, Rocket, CheckCircle2, Settings2, ShieldCheck, Zap, Shield, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';
import { IMG_CX_TEAM } from '../../data';

export const CustomerExperienceOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', channel: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  const cxApps = [
    { name: "Zendesk", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327923/Zendesk_Logo_jlsxla.png" },
    { name: "Intercom", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327927/IntercomLogo_tqzspk.png" },
    { name: "Gorgias", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327925/GorgiasLogo_xvhteo.png" },
    { name: "Freshdesk", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327923/Freshdesk_Logo_suwwdf.png" },
    { name: "Salesforce", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327929/Salesforce_Logo_ufhkqn.png" },
    { name: "Shopify", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327931/Shopify_Logo_exmdy6.png" },
    { name: "Kustomer", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327930/Kustomer_Logo_ty1hnr.png" },
    { name: "Help Scout", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327926/Helpscout_Logo_e9an5j.png" },
    { name: "HubSpot", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327928/Hubspot_Logo_skscda.png" },
    { name: "Gladly", logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327924/Gladly_Logo_qvzh94.png" }
  ];

  const simplifiedCapabilities = [
    {
      title: "Omnichannel Support",
      desc: "Tier 1 & 2 coverage across email, chat, and voice with 98% resolution velocity.",
      icon: MessageSquare,
      metric: "98% CSAT"
    },
    {
      title: "Managed AI Layer",
      desc: "Proprietary AI routing and sentiment tools integrated into your existing stack.",
      icon: BrainCircuit,
      metric: "3.2x Faster"
    },
    {
      title: "Embedded Teams",
      desc: "Dedicated Philippine agents trained natively on your brand tone and SOPs.",
      icon: Users,
      metric: "Top 1% Talent"
    }
  ];

  const cxIndustries = [
    { 
      name: 'E-commerce', 
      icon: ShoppingCart,
      workflows: ['Refund & Return Automation', 'Order Status Tracking', 'Pre-sale Product Consultation', 'Live Chat Sales Conversion', 'Gorgias/Shopify Native Support']
    },
    { 
      name: 'SaaS & Tech', 
      icon: Code,
      workflows: ['Tier 1 Technical Triage', 'Feature Request Cataloging', 'User Onboarding Support', 'Intercom Activation Loops', 'Renewal Risk Monitoring']
    },
    { 
      name: 'Real Estate', 
      icon: Building,
      workflows: ['Leasing Lead Qualification', 'Maintenance Dispatch Desk', 'Tenant Support Lifecycle', 'Yardi/AppFolio Admin', 'Compliance Documents Triage']
    },
    { 
      name: 'Fintech', 
      icon: Landmark,
      workflows: ['KYC/AML Document Vetting', 'Account Security Verifications', 'Fraud Alert Response', 'Dispute Management', 'High-Trust Chat Escalation']
    },
    { 
      name: 'Healthcare', 
      icon: HeartPulse,
      workflows: ['Appointment Scheduling', 'Insurance Triage & Verification', 'HIPAA-Compliant Messaging', 'Patient Record Admin', 'Provider Help Desk']
    },
    { 
      name: 'Consumer Services', 
      icon: Megaphone,
      workflows: ['Subscription Management', 'Promotional Campaign Support', 'Community Moderation', 'Loyalty Program Ops', 'Review & Reputation Management']
    },
    { 
      name: 'Logistics', 
      icon: Truck,
      workflows: ['Shipment Exception Handling', 'Driver Support Hotline', 'Warehouse/Carrier Liaison', 'Real-time Tracking Updates', 'Waybill Accuracy Checks']
    },
    { 
      name: 'Travel & EdTech', 
      icon: GraduationCap,
      workflows: ['Booking Amendment Desk', 'Student Success Liaisons', 'Course Material Access Ops', 'LMS Technical Troubleshooting', 'Global Itinerary Support']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className={`relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900"></div>
        </div>

        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs
            setView={setView}
            currentName="Customer Experience"
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
            align="left"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            <div className="text-left flex flex-col justify-between py-2">
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                  <span className="text-shine-white mt-[0px]">Smarter CX with Agentic Solutions</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                  Our agentic solutions combine autonomous AI agents with skilled specialists to handle complex interactions your bots can't solve alone. 
                </p>

                <div className="flex flex-col gap-4 mb-12 text-white/90 text-sm md:text-base font-medium">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">AI agents handle calls and chat at scale</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">Seamless escalation to human specialists</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">Human oversight ensures continuous improvement</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setView('contact')} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Book a Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774495868/Gemini_Generated_Image_bem5d9bem5d9bem5-3_gcazem.png?auto=format&fit=crop&q=80&w=1000&h=1000"
                  alt="Filipino Customer Support Agent"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Manila, Philippines
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {cxApps.slice(0, 4).map((app, i) => (
                    <div key={i} className="h-[37px] md:h-[46px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <img src={app.logo} alt={app.name} className="max-w-full max-h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">98%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">CSAT Score</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">3.2x</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Faster Resolution</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">24/7</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Always-On Coverage</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">Top 1%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Vetted CX Talent</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Intelligent Infrastructure</div>
            <h2 className="md:text-6xl font-heading font-bold text-slate-900 mb-6 text-[60px]">Purpose-Built AI that Elevates Your CX</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">Accelerate resolutions with AI-driven automation, backed by top-tier human talent for complex interactions.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {simplifiedCapabilities.map((cap, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center text-[#E61739] mb-8">
                  <cap.icon size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{cap.title}</h3>
                <p className="text-slate-500 font-medium mb-10 text-sm leading-relaxed">{cap.desc}</p>
                <div className="mt-auto px-6 py-2 bg-slate-900 text-white rounded-full text-xs font-black uppercase tracking-widest">
                  {cap.metric}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-20 border-t border-slate-100">
            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4">
                  <Layers2 size={12} /> Tech Ecosystem
               </div>
               <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">AI Solutions that Work with Your Favorite Support Platforms.</h3>
               <p className="text-slate-400 mt-2 text-sm font-medium">Our agents are certified across the world's leading CX and contact center platforms.<br />No rip-and-replace, just seamless integration with the tools you already use.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {cxApps.map((app, i) => (
                <div key={i} className="p-6 h-24 rounded-2xl bg-white border border-slate-100 flex items-center justify-center transition-all duration-300 shadow-sm hover:shadow-md grayscale hover:grayscale-0 opacity-70 hover:opacity-100 cursor-pointer">
                  <img src={app.logo} alt={app.name} className="w-[140px] max-h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Vertical Specialization</div>
            <h2 className="md:text-6xl font-heading font-bold text-slate-900 mb-6 text-[56px]">Built for Your Toughest Business Challenges</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">Our AI agents are trained in the specific toolsets and jargon of your industry vertical, ensuring seamless integration from day one.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {cxIndustries.map((ind, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-black/[0.02] hover:shadow-2xl transition-all group h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center text-[#E61739] mb-6 group-hover:bg-[#E61739] group-hover:text-white transition-all duration-500">
                  <ind.icon size={24} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-6 leading-tight">{ind.name}</h4>
                <div className="flex-grow">
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Targeted Workflows</div>
                  <ul className="space-y-3">
                    {ind.workflows.map((flow, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-[11px] font-bold text-slate-500 group-hover:text-slate-700 transition-colors">
                        <div className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#E61739] mt-1.5 opacity-30"></div>
                        {flow}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">Fully Operational in Under 14 Days.</h2>
            <p className="text-white/40 max-w-3xl mx-auto font-medium text-[18px]">Get your agentic support system running fast, without sacrificing quality or oversight.</p>
          </div>
          <div className="grid md:grid-cols-5 gap-8 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
            
            {[
              { step: "01", title: "Discovery", desc: "SLA & Stack definition.", icon: ScanSearch },
              { step: "02", title: "Team Build", desc: "Top 1% talent selection.", icon: UsersRound },
              { step: "03", title: "Deep Training", desc: "Brand tone immersion.", icon: GraduationCap },
              { step: "04", title: "AI Setup", desc: "Workflow automation.", icon: BrainCircuit },
              { step: "05", title: "Go Live", desc: "Continuous performance optimization.", icon: Rocket }
            ].map((s, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-[#E61739] mb-8 group-hover:border-[#E61739] group-hover:bg-slate-900 transition-all shadow-lg">
                  <s.icon size={24} />
                </div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-[0.2em] mb-2">{s.step}</div>
                <h4 className="text-lg font-bold mb-2">{s.title}</h4>
                <p className="text-[11px] text-white/40 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Pricing Overview */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Flexible CX Plans.</h2>
            <p className="text-white/40 text-lg font-medium">Pricing models that scale with your growth velocity.</p>
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
                { name: "Business Hours Coverage", price: "$1,800", period: "/mo", desc: "Standard 9-hour shift coverage, Mon-Fri.", features: ["Dedicated Agent", "SLA Compliance", "Weekly Reporting", "Native Tool Integration"], highlight: false },
                { name: "24/7 Enterprise Hub", price: "Custom", period: "", desc: "Always-on global support pod.", features: ["Full 24/7 Roster", "Team Lead & QA", "Strategic CSAT Analysis", "Managed AI Layer"], highlight: true, badge: "Most Popular" },
                { name: "AI Automation Suite", price: "$1,500", period: "/mo", desc: "Deflection bots & self-service setup.", features: ["Automated Routing", "Tagging & Sentiment", "Performance Dashboards", "Agent Assist Activation"], highlight: false },
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
                        <li key={fi} className="flex items-start gap-3 text-sm font-semibold text-white/70">
                          <CheckCircle2 size={14} className="text-[#E61739] shrink-0 mt-0.5" />{f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <button onClick={() => setView('contact')} className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'}`}>
                    Request CX Quote
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                {
                  role: "CX Specialist", price: "$1,600", focus: "General", focusIcon: Users,
                  features: ["Tier 1 email and live chat support", "Ticket logging and resolution tracking", "Customer satisfaction follow-ups"],
                },
                {
                  role: "Technical Support", price: "$2,000", focus: "Tech", focusIcon: Zap,
                  features: ["Product issue troubleshooting and escalation", "Bug documentation and dev handoff", "Knowledge base article creation"],
                },
                {
                  role: "Fraud & Risk Analyst", price: "$1,900", focus: "Risk", focusIcon: ShieldCheck,
                  features: ["Content moderation and policy enforcement", "Fraud detection and prevention workflows", "Account review and dispute resolution"],
                },
                {
                  role: "Team Lead", price: "$2,500", focus: "Mgmt", focusIcon: UsersRound,
                  features: ["Agent performance monitoring and QA", "Shift scheduling and capacity planning", "Coaching, feedback, and team reporting"],
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

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl overflow-hidden relative border border-white/[0.07]">
          <div className="absolute inset-0 z-0">
            <img src={IMG_CX_TEAM} alt="KDCI CX Team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80"></div>
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">

            {/* Left — headline + bullets */}
            <div className="p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let's Talk Support
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Build your<br /><span className="text-[#E61739]">support legacy.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm">
                  Tell us about your CX needs and we'll have a pod design and cost model ready within 24 hours.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'Omnichannel coverage across voice, chat, email & social' },
                  { icon: CheckCircle2, text: '14-day ramp for a fully trained 5-agent pod' },
                  { icon: CheckCircle2, text: '4.7–4.9/5 CSAT across all managed accounts' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[
                    { val: '4.8/5', label: 'Avg CSAT' },
                    { val: '14 Days', label: 'Ramp Time' },
                    { val: '24/7', label: 'Coverage' },
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
                  <p className="text-white/50 text-sm font-medium max-w-xs">Our CX leads will review your brief and get back to you within 24 hours.</p>
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
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Support Channels Needed</label>
                    <input required className={inp} placeholder="e.g. Live Chat, Email, Voice, Social Media" value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Volume, hours, industry, current helpdesk..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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
              { q: "What customer support channels can KDCI cover?", a: "We support voice, email, live chat, social media DMs, SMS, and in-app messaging. Our agents are trained across multiple channels simultaneously, so you get a true omnichannel operation from a single managed team." },
              { q: "What are your typical CSAT and FCR benchmarks?", a: "Across our managed CX pods, we consistently deliver 4.7–4.9/5 CSAT and 85–92% First Contact Resolution. We publish monthly QA scorecards for full transparency." },
              { q: "Can KDCI handle 24/7 support coverage?", a: "Yes. We run three overlapping shifts from Metro Manila, giving you uninterrupted coverage across all time zones without the complexity of managing multiple vendors." },
              { q: "How quickly can we ramp up a support team?", a: "Our standard ramp is 14 days for a 5-agent pod. We maintain a pre-vetted bench of trained candidates, so we can often exceed that speed for urgent scaling needs." },
              { q: "Do your agents handle escalations and complex complaints?", a: "Absolutely. We train a dedicated Tier 2 and Tier 3 layer within each pod. Complex escalations are routed automatically using AI triage and handled by senior agents with specialized domain knowledge." },
              { q: "Can KDCI integrate with our existing helpdesk platform?", a: "Yes. Our agents are proficient in Zendesk, Freshdesk, Salesforce Service Cloud, Intercom, Gorgias, HubSpot Service Hub, Kustomer, and most major platforms. We can be operational in your stack within days." },
              { q: "How do you maintain quality across a large team?", a: "We use our proprietary QA system that samples 15% of all interactions weekly, scoring them against a calibrated rubric. Agents receive weekly coaching, and Team Leads review results daily." },
              { q: "Can agents upsell and cross-sell during support interactions?", a: "Yes. We run dedicated 'support-to-sales' training programs. Our retail and e-commerce clients see an average 18–25% lift in revenue from support interactions through proactive upselling." },
              { q: "What languages can KDCI support?", a: "Our primary language is English (neutral accent). We also have agents proficient in Spanish, French, Mandarin, Japanese, and German. For specialized language needs, we can source and train within 4–6 weeks." },
              { q: "How do you handle spikes in volume (holiday, campaign surges)?", a: "We build flexible surge capacity into every contract. You can request additional seats with 72-hour notice for up to 30% above your base headcount. For larger surges, we plan together 30 days in advance." },
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
