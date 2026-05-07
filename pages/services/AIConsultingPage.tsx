
import React, { useState } from 'react';
import { ArrowRight, BrainCircuit, Workflow, ShieldCheck, BarChart3, CheckCircle2, Cpu, Zap, Users, Target, Globe, HeartPulse, ShoppingCart, Truck, Scale, GraduationCap, Megaphone, Building2, Landmark, ChevronRight } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';

const SERVICES = [
  {
    icon: Target,
    title: 'AI Strategy & Roadmap',
    desc: 'We assess your operations and build a department-by-department AI adoption plan tied to measurable business outcomes. No generic frameworks — everything is scoped to your business.',
  },
  {
    icon: BrainCircuit,
    title: 'Custom AI Agent Build',
    desc: 'We configure and train AI agents for your specific workflows — from customer support and lead qualification to internal ops and data processing. Deployed, tested, and handed over production-ready.',
  },
  {
    icon: Workflow,
    title: 'System Integration & Automation',
    desc: 'We connect your AI agents to your CRM, helpdesk, ERP, and data sources so outcomes flow into the systems your team already uses. No rip-and-replace required.',
  },
  {
    icon: ShieldCheck,
    title: 'Managed AI Operations',
    desc: 'Ongoing management of your AI systems including monitoring, retraining, performance reporting, and a dedicated AI ops team. We stay accountable to the KPIs we agreed on at kickoff.',
  },
];

const STEPS = [
  { n: '01', title: 'Discovery Call', desc: '60-min session to map your operations, pain points, and AI readiness.' },
  { n: '02', title: 'AI Readiness Audit', desc: 'We assess your current tools, workflows, and data to identify the highest-impact opportunities.' },
  { n: '03', title: 'Strategy & Roadmap', desc: 'A custom department-by-department plan with defined KPIs, timelines, and expected ROI.' },
  { n: '04', title: 'Build & Integrate', desc: 'We configure and deploy your AI agents, connecting them to your existing systems.' },
  { n: '05', title: 'Go Live & Manage', desc: 'Your AI systems go live with human oversight and monthly performance reporting against agreed KPIs.' },
];

const PRICING = [
  {
    name: 'Starter',
    price: 'From $3,000/mo',
    period: '3-month minimum',
    desc: 'For businesses ready to start with AI in one department.',
    features: ['AI readiness audit', '1-department strategy', '1 AI agent build', 'Monthly review call', 'Performance dashboard'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    price: 'From $7,000/mo',
    period: '6-month minimum',
    desc: 'For companies scaling AI across multiple departments.',
    features: ['Multi-department strategy', 'Custom agent builds', 'System integrations', 'Human oversight layer', 'Dedicated AI consultant', 'Weekly reporting & KPI tracking'],
    cta: 'Most Popular',
    featured: true,
  },
  {
    name: 'Enterprise',
    price: "Let's talk",
    period: 'Custom term',
    desc: 'Full embedded AI operations team for enterprise-scale deployment.',
    features: ['Unlimited departments', 'Full AI ops team', 'Custom SLAs', 'Executive strategy sessions', 'Priority support', 'Bespoke KPI framework'],
    cta: 'Book a Call',
    featured: false,
  },
];

const INDUSTRIES = [
  { icon: ShoppingCart, name: 'E-Commerce & Retail', desc: 'Order management, customer support, inventory ops, returns automation.' },
  { icon: HeartPulse, name: 'Healthcare & Wellness', desc: 'Patient intake, appointment scheduling, billing support, compliance workflows.' },
  { icon: Scale, name: 'Legal & Professional', desc: 'Document review, client intake, billing automation, contract processing.' },
  { icon: Landmark, name: 'Financial Services', desc: 'KYC workflows, fraud detection, compliance reporting, customer ops.' },
  { icon: GraduationCap, name: 'EdTech & Education', desc: 'Student support, course operations, enrollment workflows, LMS integrations.' },
  { icon: Building2, name: 'Real Estate & Property', desc: 'Listing management, lead qualification, tenant ops, maintenance workflows.' },
  { icon: Megaphone, name: 'Marketing & Agencies', desc: 'Content pipelines, reporting automation, campaign ops, client management.' },
  { icon: Truck, name: 'Logistics & Supply Chain', desc: 'Dispatch coordination, tracking updates, claims processing, vendor ops.' },
  { icon: Globe, name: 'SaaS & Technology', desc: 'Onboarding automation, support triage, churn prediction, product ops.' },
];

const DEPARTMENTS = [
  'Customer Support', 'Sales & CRM', 'Finance & Billing', 'HR & Recruitment',
  'Marketing', 'Operations', 'Compliance', 'Product & Engineering',
  'Legal', 'IT & Helpdesk', 'Procurement', 'Executive Office',
];

const TOOLS = [
  { name: 'ElevenLabs', category: 'Voice AI' },
  { name: 'n8n', category: 'Workflow Automation' },
  { name: 'OpenAI', category: 'Language Models' },
  { name: 'Anthropic Claude', category: 'AI Reasoning' },
  { name: 'Retell AI', category: 'Voice Agents' },
  { name: 'Vapi', category: 'Voice Infrastructure' },
  { name: 'Make', category: 'Automation' },
  { name: 'Zapier', category: 'Integrations' },
  { name: 'Pinecone', category: 'Vector Database' },
  { name: 'LangChain', category: 'AI Orchestration' },
  { name: 'Notion AI', category: 'Knowledge Ops' },
  { name: 'HubSpot AI', category: 'CRM Automation' },
];

export const AIConsultingPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', department: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  return (
    <div className="min-h-screen bg-white">

      {/* SECTION 1 — HERO */}
      <section className="relative bg-[#080808] min-h-[90vh] flex flex-col justify-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{ background: 'radial-gradient(ellipse at 60% 40%, rgba(230,23,57,0.08) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(230,23,57,0.05) 0%, transparent 50%)' }} />
        <div className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-24" style={{ animation: 'aiHeroFade 0.9s cubic-bezier(0.22,1,0.36,1) both' }}>
          <style>{`
            @keyframes aiHeroFade {
              from { opacity: 0; transform: translateY(28px); }
              to   { opacity: 1; transform: translateY(0); }
            }
          `}</style>
          <Breadcrumbs setView={setView} currentName="AI Consulting" parent={{ name: 'Solutions', view: 'solutions-hub' }} align="left" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
            <Cpu size={11} /> KDCI.ai · AI Consulting
          </div>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white leading-[1.0] tracking-tight mb-8 max-w-4xl">
            Your business deserves an AI strategy —<br />
            <span className="text-[#E61739]">not just AI tools.</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/50 font-medium leading-relaxed max-w-2xl mb-12">
            KDCI.ai builds, integrates, and manages AI systems across your departments with human oversight and measurable outcomes.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => setView('contact')} className="inline-flex items-center gap-3 px-10 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all shadow-xl group">
              Book a Discovery Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <a href="#how-it-works" className="inline-flex items-center gap-2 px-10 py-4 border border-white/20 text-white rounded-2xl font-bold text-base hover:bg-white/5 transition-all">
              See How It Works <ChevronRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROBLEM STRIP */}
      <section className="bg-[#F5F5F7] py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1F]/10">
            {[
              "You've bought AI tools that went nowhere.",
              "Your team doesn't know where to start.",
              "Vendors sell software. Nobody manages the outcome.",
            ].map((pain, i) => (
              <div key={i} className="px-8 py-8 md:py-4 first:pl-0 last:pr-0">
                <p className="text-xl md:text-2xl font-black text-[#1D1D1F] leading-snug">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT WE DO */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Services
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight max-w-3xl">
              End-to-end AI consulting —<br />from strategy to <span className="text-[#E61739]">live systems.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {SERVICES.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-[#E61739]/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E61739]/25 transition-all">
                  <s.icon size={22} className="text-[#E61739]" />
                </div>
                <h3 className="text-xl font-black text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4 — HOW IT WORKS */}
      <section id="how-it-works" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Process
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">
              Live within <span className="text-[#E61739]">21 days.</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-[#1D1D1F]/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {STEPS.map((s, i) => (
                <div key={i} className="relative flex flex-col items-start md:items-center text-left md:text-center">
                  <div className="w-12 h-12 rounded-full bg-[#E61739] text-white flex items-center justify-center font-black text-sm mb-5 relative z-10 shrink-0 shadow-lg">
                    {s.n}
                  </div>
                  <h4 className="font-black text-[#1D1D1F] text-sm mb-2">{s.title}</h4>
                  <p className="text-[#86868b] text-xs font-medium leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — PRICING */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Transparent tiers. No surprises.</h2>
            <p className="text-white/40 text-lg font-medium">Pick a plan. Agree on KPIs. We deliver.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {PRICING.map((plan, i) => (
              <div
                key={i}
                className={`rounded-3xl p-8 flex flex-col ${
                  plan.featured
                    ? 'bg-white/5 border-2 border-[#E61739] relative'
                    : 'bg-white/5 border border-white/10'
                }`}
              >
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full">
                    Most Popular
                  </div>
                )}
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="text-3xl font-black text-white mb-1">{plan.price}</div>
                <p className="text-white/30 text-xs font-black uppercase tracking-wide mb-3">{plan.period}</p>
                <p className="text-white/40 text-sm font-medium mb-6 leading-relaxed">{plan.desc}</p>
                <div className="border-t border-white/10 pt-6 mb-6 flex-grow">
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                        <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setView('contact')}
                  className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${
                    plan.featured
                      ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg'
                      : 'bg-white/10 border border-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {plan.cta === 'Most Popular' ? 'Get Started' : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 6 — WHY KDCI.AI */}
      <section className="py-24 bg-[#F5F5F7] overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Image */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/our-difference.jpeg" alt="KDCI AI consulting team reviewing performance dashboards" className="w-full h-full object-cover" style={{ minHeight: '420px' }} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6">
                Our Difference
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight mb-10">
                Built to deliver outcomes,<br /><span className="text-[#E61739]">not slide decks.</span>
              </h2>
              <div className="space-y-6">
                {[
                  {
                    icon: Cpu,
                    title: 'We build in-house',
                    desc: 'No third-party reselling or vendor markups. Every AI system is configured by our own team — giving us full control over quality, speed, and customization.',
                  },
                  {
                    icon: BarChart3,
                    title: 'KPI-backed accountability',
                    desc: 'We agree on measurable outcomes before work begins and report against them every month. If we miss a target, you get a credit.',
                  },
                  {
                    icon: Users,
                    title: 'Human in the loop, always',
                    desc: 'Every AI deployment is managed by a trained operations team who monitor performance, catch errors, and continuously improve the system.',
                  },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-5 bg-white rounded-2xl p-6 border border-black/5 shadow-sm">
                    <div className="w-11 h-11 bg-[#E61739]/10 rounded-xl flex items-center justify-center shrink-0">
                      <d.icon size={20} className="text-[#E61739]" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-[#1D1D1F] mb-1.5">{d.title}</h3>
                      <p className="text-[#86868b] text-sm font-medium leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 7 — INDUSTRIES & DEPARTMENTS */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Who We Serve
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4">
              AI operations for the businesses<br /><span className="text-[#E61739]">that run America.</span>
            </h2>
            <p className="text-[#86868b] text-lg font-medium max-w-xl mx-auto">If your team does it manually today, we can make it smarter.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-14">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="flex items-start gap-4 p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:border-[#E61739]/20 hover:bg-white hover:shadow-sm transition-all">
                <div className="w-10 h-10 bg-[#E61739]/10 rounded-xl flex items-center justify-center shrink-0">
                  <ind.icon size={18} className="text-[#E61739]" />
                </div>
                <div>
                  <h4 className="font-black text-[#1D1D1F] text-sm mb-1">{ind.name}</h4>
                  <p className="text-[#86868b] text-xs font-medium leading-relaxed">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 pt-10">
            <p className="text-[10px] font-black uppercase tracking-widest text-[#86868b] mb-5">Departments We Automate</p>
            <div className="flex flex-wrap gap-2.5">
              {DEPARTMENTS.map((dep, i) => (
                <span key={i} className="px-4 py-2 bg-slate-100 rounded-xl text-sm font-semibold text-[#1D1D1F] border border-slate-200 hover:border-[#E61739]/30 hover:text-[#E61739] hover:bg-[#E61739]/5 transition-all cursor-default">
                  {dep}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 — AI TOOLS */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Our Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 max-w-2xl">
              Best-in-class tools.<br /><span className="text-[#E61739]">Configured for your business.</span>
            </h2>
            <p className="text-white/40 text-lg font-medium max-w-2xl">We don't lock you into proprietary software. We build on the leading AI platforms and customize them around your workflows.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {TOOLS.map((tool, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 flex flex-col items-center text-center hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-[#E61739]/15 rounded-xl flex items-center justify-center mb-3">
                  <Zap size={16} className="text-[#E61739]" />
                </div>
                <div className="text-sm font-black text-white leading-tight mb-1">{tool.name}</div>
                <div className="text-[10px] font-black uppercase tracking-wide text-white/30">{tool.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 — GUARANTEE */}
      <section className="py-20 bg-[#080808] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-l-4 border-[#E61739] pl-10 py-4">
            <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-6 max-w-3xl">
              "We define KPIs before we start. Miss them once — you get a credit. Miss them twice — you walk away free."
            </p>
            <p className="text-white/40 text-base font-medium max-w-2xl">
              Every engagement includes measurable performance targets agreed at onboarding. We price at a premium because we back it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10 — CONTACT FORM */}
      <section className="py-24 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left */}
            <div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Ready to build your<br /><span className="text-[#E61739]">AI operation?</span>
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-10">
                Book a 30-minute discovery call. We'll map your operations, identify the highest-impact AI opportunities, and show you exactly what KDCI.ai looks like for your business — no obligation.
              </p>
              <div className="space-y-4">
                {[
                  'No lock-in on Starter plans',
                  'Live within 14–21 days',
                  'KPI-backed SLAs on every engagement',
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-[#E61739] shrink-0" />
                    <span className="text-white/70 text-sm font-semibold">{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — Form */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-[#E61739]/15 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={32} className="text-[#E61739]" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">We'll be in touch shortly.</h3>
                  <p className="text-white/40 text-sm font-medium">Expect a response within 2 business hours.</p>
                </div>
              ) : (
                <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">First Name</label>
                      <input required className={inp} placeholder="Jane" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Last Name</label>
                      <input required className={inp} placeholder="Smith" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Company</label>
                    <input required className={inp} placeholder="Acme Corp" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Work Email</label>
                    <input required type="email" className={inp} placeholder="jane@acme.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Phone</label>
                    <input className={inp} placeholder="+1 (555) 000-0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Which department needs AI first?</label>
                    <input className={inp} placeholder="e.g. Customer Support, Finance, Sales…" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/30 block mb-1.5">Anything else?</label>
                    <textarea rows={3} className={`${inp} resize-none`} placeholder="Tell us about your biggest operational pain point…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <button type="submit" className="w-full py-4 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all shadow-xl flex items-center justify-center gap-3 group mt-2">
                    Book a Discovery Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
