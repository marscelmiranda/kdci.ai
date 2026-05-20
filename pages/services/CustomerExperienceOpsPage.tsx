
import React, { useState, useRef } from 'react';
import { ArrowRight, MessageSquare, BrainCircuit, Users, ShoppingCart, Code, Building, Landmark, HeartPulse, Megaphone, Truck, GraduationCap, Layers2, ScanSearch, UsersRound, Rocket, CheckCircle2, Settings2, ShieldCheck, Zap, Shield, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';
import { IMG_CX_TEAM } from '../../data';

export const CustomerExperienceOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
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
      title: "AI Agents on First Contact",
      desc: "We configure and manage AI agents for chat, email, and voice — handling your highest-volume ticket categories automatically, 24/7.",
      icon: BrainCircuit,
      metric: "70%+ Deflection"
    },
    {
      title: "PH-Based Human Escalation",
      desc: "Complex, sensitive, and high-value cases escalate instantly to our trained Philippine-based specialists — seamlessly, with full context.",
      icon: Users,
      metric: "Top 1% Talent"
    },
    {
      title: "Monthly CSAT Optimization",
      desc: "Every month: CSAT and NPS reviewed, agents retrained, knowledge base updated, and a full CX scorecard delivered to your team.",
      icon: MessageSquare,
      metric: "24+ mo avg contract"
    }
  ];

  const cxIndustries = [
    {
      name: 'E-Commerce',
      icon: ShoppingCart,
      tag: 'Order & returns at scale',
      workflows: ['Order status & tracking', 'Return & refund automation', 'Pre-sale product queries', 'Cart abandonment follow-up', 'Gorgias/Shopify native support']
    },
    {
      name: 'SaaS & Technology',
      icon: Code,
      tag: 'Onboarding & deflection',
      workflows: ['AI-first onboarding support', 'Technical triage & deflection', 'Feature request logging', 'Renewal risk monitoring', 'Intercom activation loops']
    },
    {
      name: 'Hospitality & Travel',
      icon: Megaphone,
      tag: 'Booking & complaint handling',
      workflows: ['Booking & amendment handling', 'Complaint & refund resolution', 'Itinerary change support', 'Loyalty program queries', '24/7 guest support']
    },
    {
      name: 'Healthcare Adjacent',
      icon: HeartPulse,
      tag: 'Scheduling & patient queries',
      workflows: ['Appointment scheduling', 'Patient query handling', 'Insurance verification triage', 'HIPAA-compliant messaging', 'Provider help desk']
    },
    {
      name: 'Financial Services',
      icon: Landmark,
      tag: 'Account inquiry & onboarding',
      workflows: ['Account inquiry handling', 'Onboarding automation', 'KYC document support', 'Fraud alert response', 'Compliance-aware escalation']
    },
    {
      name: 'Education',
      icon: GraduationCap,
      tag: 'Student support & enrollment',
      workflows: ['Enrollment queries', 'Student support desk', 'Course access issues', 'LMS troubleshooting', 'Payment & billing support']
    },
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
            currentName="AI-Augmented Customer Experience"
            parent={{ name: 'Solutions', view: 'solutions-hub' }}
            align="left"
          />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            <div className="text-left flex flex-col justify-between py-2">
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl" style={{color:'#FFFFFF'}}>
                  AI-Augmented<br />CX Support
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                  We combine AI-powered first-contact resolution with specialist escalation support and monthly CX performance optimization, all delivered as a managed service.
                </p>

                <div className="flex flex-col gap-4 mb-12 text-white/90 text-sm md:text-base font-medium">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">AI agents configured for chat, email, and voice — 24/5 or 24/7</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">PH-based human specialists handle every escalation, with full context</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">Monthly CSAT scorecard, agent retraining, and knowledge base updates</span>
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
                    <div key={i} className="h-[41px] md:h-[51px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
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
              <div className="text-xl md:text-2xl font-black mb-1 text-center">70%+</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">AI Deflection Rate</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">24/7</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Coverage Available</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">24+ mo</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Avg Client Lifetime</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1 text-center">Top 1%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">PH-Based Specialists</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">What We Deliver</div>
            <h2 className="md:text-6xl font-heading font-bold text-slate-900 mb-6 text-[60px]">CX support enhanced by AI agents.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium ml-[232px] mr-[232px]">Led by AI on first contact, humans on escalation, and continuous optimization, delivered as one fully managed CX retainer.</p>
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
               <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">AI-powered customer support, live inside your helpdesk</h3>
               <p className="text-slate-400 mt-2 text-sm font-medium ml-[232px] mr-[232px]">We configure and manage AI-powered support agents that resolve customer inquiries automatically  without need for new software, cutting resolution time and reducing support costs from day one.</p>
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
            <h2 className="md:text-6xl font-heading font-bold text-slate-900 mb-6 text-[56px]">Vertical AI that speaks your industry's language from day one</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">Our AI agents are trained on your specific helpdesk toolset, product vocabulary, and CS workflows, ensuring accurate, on-brand AI support automation.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cxIndustries.map((ind, i) => (
              <div key={i} className="bg-white p-8 rounded-[3rem] border border-black/[0.02] hover:shadow-2xl transition-all group h-full flex flex-col">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 shadow-sm flex items-center justify-center text-[#E61739] mb-4 group-hover:bg-[#E61739] group-hover:text-white transition-all duration-500">
                  <ind.icon size={24} />
                </div>
                <span className="inline-block text-[9px] font-black uppercase tracking-widest text-[#E61739] bg-[#E61739]/10 px-2 py-0.5 rounded-full mb-3 self-start">{ind.tag}</span>
                <h4 className="text-xl font-bold text-slate-900 mb-5 leading-tight">{ind.name}</h4>
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

      <section id="how-it-works" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Onboarding Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">
              AI CX Agent live in just 1 month.<br /><span className="text-[#E61739]">Continuous optimization every month after.</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[8%] right-[8%] h-px bg-gradient-to-r from-transparent via-[#1D1D1F]/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {[
                { n: '01', period: 'Week 1',  title: 'Audit',        desc: 'Map current support stack, ticket types, and monthly volume.' },
                { n: '02', period: 'Week 2',  title: 'Configure AI', desc: 'Configure AI agents for your top 10 highest-volume ticket categories.' },
                { n: '03', period: 'Week 3',  title: 'Train Team',   desc: 'Train PH-based escalation team on your brand, tone, and policies.' },
                { n: '04', period: 'Week 4',  title: 'Soft Launch',  desc: '50% AI / 50% human split. Tune deflection thresholds in real time.' },
                { n: '05', period: 'Month 2', title: 'Full Launch',  desc: 'Target 70%+ AI deflection rate. Full hybrid operation goes live.' },
                { n: '06', period: 'Ongoing', title: 'Optimize',     desc: 'Monthly CX scorecard, agent retraining, CSAT reviews, KB updates.' },
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
                <Settings2 size={18} className="text-[#E61739]" />
              </div>
              <div>
                <h4 className="font-black text-[#1D1D1F] text-sm mb-0.5">Ongoing after Month 2</h4>
                <p className="text-[#86868b] text-sm font-medium">Monthly CSAT scorecard · agent retraining · knowledge base updates</p>
              </div>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center gap-2">
              Start Your 30-Day Onboarding <ArrowRight size={16} />
            </button>
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
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Transparent tiers. No surprises.</h2>
            <p className="text-white/40 text-lg font-medium">3-month minimum · Average client lifetime: 24+ months</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {[
              {
                name: 'AI CX Starter',
                price: '$3,500',
                period: '/mo',
                setup: '$2,000 setup fee',
                volume: 'Up to 500 tickets/mo',
                desc: 'AI-first coverage with human overflow for growing businesses handling moderate support volume across one or two channels.',
                features: ['AI agents on chat & email', 'Human overflow for escalations', 'Up to 500 tickets/month', '24/5 coverage', 'Monthly CSAT report'],
                featured: false,
                cta: 'Get Started',
              },
              {
                name: 'AI CX Core',
                price: '$7,000',
                period: '/mo',
                setup: '$3,000 setup fee',
                volume: 'Up to 2,000 tickets/mo',
                desc: 'Full AI + human hybrid for scaling teams. Dedicated PH-based escalation team, multichannel coverage, and monthly optimization.',
                features: ['AI agents on chat, email & voice', 'Dedicated PH escalation team', 'Up to 2,000 tickets/month', '24/7 coverage option', 'CSAT & NPS tracking', 'Knowledge base management', 'Monthly CX scorecard'],
                featured: true,
                cta: 'Most Popular',
              },
              {
                name: 'AI CX Enterprise',
                price: '$14,000+',
                period: '/mo',
                setup: 'Setup negotiated',
                volume: 'Unlimited volume',
                desc: 'Dedicated CX team, unlimited ticket volume, guaranteed SLAs, and full multichannel AI + human coverage for enterprise operations.',
                features: ['Dedicated CX team', 'Unlimited ticket volume', 'SLA-guaranteed response times', 'Full multichannel coverage', 'Executive reporting & QBRs', 'Custom escalation design'],
                featured: false,
                cta: 'Book a Call',
              },
            ].map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.featured ? 'bg-white/5 border-2 border-[#E61739]' : 'bg-white/5 border border-white/10'}`}>
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">Most Popular</div>
                )}
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-white/30 text-sm font-black mb-1">{plan.period}</span>
                </div>
                <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-1">{plan.volume}</p>
                <p className="text-white/30 text-xs font-medium mb-4">{plan.setup}</p>
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
                <button onClick={() => setView('contact')} className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.featured ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg' : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'}`}>
                  {plan.cta === 'Most Popular' ? 'Get Started' : plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-7 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Running more than 2,000 tickets a month?</h4>
              <p className="text-sm text-white/40 font-medium">We build dedicated CX pods sized to your volume, channels, and SLA requirements.</p>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all whitespace-nowrap">Request Custom Quote</button>
          </div>
        </div>
      </section>

      {/* ── CONTACT FORM ── */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[4rem] border border-white/5 flex flex-col lg:flex-row" style={{ overflow: 'hidden' }}>

          {/* Left — image panel */}
          <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-0 shrink-0">
            <img
              src={IMG_CX_TEAM}
              alt="KDCI CX Team"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mb-2">AI-Augmented Customer Experience</p>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">Your AI CX pod, live in 30 days.</h3>
              <div className="flex flex-wrap gap-2 mt-5">
                {['AI-Augmented', 'Omnichannel', '24/7 Coverage'].map((t, i) => (
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
                <p className="text-white/50 font-medium">Your brief has been received. Expect a response within 24 hours.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-4">
                    Free Consultation
                  </div>
                  <h2 className="md:text-3xl font-heading font-bold text-white mb-2 text-[32px]">Build Your CX Pod Today</h2>
                  <p className="text-white/40 font-medium text-[13px]">Every engagement begins with a discovery call. Tell us what you need and we'll design your ideal support operation.</p>
                </div>
                <form onSubmit={e => { e.preventDefault(); if (captchaRef.current?.isBot()) return; setSubmitted(true); }} className="space-y-4">
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
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Work Email</label>
                      <input required type="email" className={inp} placeholder="jane@company.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Phone (optional)</label>
                      <input className={inp} placeholder="+1 555 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Support Channels Needed</label>
                    <input required className={inp} placeholder="e.g. Live Chat, Email, Voice, Social Media" value={form.channel} onChange={e => setForm(f => ({ ...f, channel: e.target.value }))} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + " resize-none"} placeholder="Volume, hours, industry, current helpdesk..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <Captcha ref={captchaRef} onVerify={() => {}} theme="dark" />
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all group mt-2">
                    Request Free Consultation <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-[10px] text-white/20 text-center font-medium">No commitment required · Response within 24 hours</p>
                </form>
              </>
            )}
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
