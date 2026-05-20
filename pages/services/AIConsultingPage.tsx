
import React, { useState, useRef } from 'react';
import { ArrowRight, BrainCircuit, Workflow, ShieldCheck, BarChart3, CheckCircle2, Cpu, Zap, Users, Target, Globe, HeartPulse, ShoppingCart, Truck, Scale, GraduationCap, Megaphone, Building2, Landmark, ChevronRight, Shield, Star } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';

const SERVICES = [
  {
    icon: Target,
    title: 'AI Readiness Audit',
    desc: 'We assess every department — ops, support, sales, finance — and map where AI solutions creates the highest-impact opportunities. Delivered as a structured report with a prioritized implementation roadmap.',
  },
  {
    icon: Cpu,
    title: 'Custom AI Stack Recommendation & Vendor Selection',
    desc: 'We recommend the right platforms, models, and tools for your specific use case — without vendor bias. You get a complete stack design with rationale, cost estimates, and integration requirements.',
  },
  {
    icon: BrainCircuit,
    title: 'Agent Design, Prompt Engineering & Build',
    desc: 'Skip out on the trial and error. We\'ll handle prompt engineering, model selection, testing, QA, and AI agent deployment. Handed over fully-documented and production-ready.',
  },
  {
    icon: Workflow,
    title: 'Multi-Platform Integration & Setup',
    desc: 'Connect and plug your new AI agents into your CRM, helpdesk, ERP, and data sources so outcomes flow into your existing systems from day one.',
  },
  {
    icon: GraduationCap,
    title: 'Team Training & Change Management',
    desc: 'We run hands-on training sessions for every team that will interact with the new AI system, and deliver a runbook so your team can operate independently from day one.',
  },
  {
    icon: ShieldCheck,
    title: '30-Day Post-Launch Monitoring Handoff',
    desc: 'We run 30 days of live monitoring before hand off, covering fixing edge cases, retraining on real data, and locking in a performance baseline before converting to a monitoring retainer.',
  },
];

const STEPS = [
  { n: '01', period: 'Week 1',    title: 'Discovery',  desc: 'Audit current operations, map AI opportunities department by department, and agree on success metrics.' },
  { n: '02', period: 'Week 2',    title: 'Design',     desc: 'Select platforms, architect the agent stack, and finalize the integration plan with your existing tools.' },
  { n: '03', period: 'Week 3–4',  title: 'Build',      desc: 'Prompt engineering, agent configuration, integration setup, and full QA testing before go-live.' },
  { n: '04', period: 'Week 5',    title: 'Deploy',     desc: 'Go live with team training, runbook handoff, and a structured launch process managed by our team.' },
  { n: '05', period: 'Week 6',    title: 'Monitor',    desc: '30-day post-launch review — real-world retraining, edge case resolution, and performance baseline set.' },
  { n: '06', period: 'Month 2+',  title: 'Convert',    desc: 'Transition to an AI Agent Monitoring retainer — continuous oversight, prompt optimization, and monthly reporting.' },
];

const PRICING = [
  {
    name: 'AI Readiness Audit',
    price: '$3,000',
    period: 'One-time',
    tag: '1-week engagement',
    desc: 'A structured audit of your operations with a prioritized AI opportunity report and implementation roadmap delivered at the end of week one.',
    features: ['Department-by-department AI mapping', 'Stack recommendation + vendor selection', 'Prioritized implementation roadmap', 'ROI estimates per opportunity', 'Delivered as a written report'],
    cta: 'Start with an Audit',
    featured: false,
  },
  {
    name: 'Implementation',
    price: '$8,000–$15,000',
    period: 'Project-based',
    tag: 'Full build included',
    desc: 'Complete agent design, prompt engineering, integration setup, team training, and 30-day monitored handoff. Everything to go live.',
    features: ['Full agent design & prompt engineering', 'Integration with your existing tools', 'QA testing and production deployment', 'Team training & runbook', '30-day post-launch monitoring', 'Natural feeder into monitoring retainer'],
    cta: 'Start Implementation',
    featured: true,
  },
  {
    name: 'Consulting Retainer',
    price: '$3,000–$5,000',
    period: '/mo · 3-month minimum',
    tag: 'Ongoing strategy',
    desc: 'Ongoing AI strategy support with quarterly implementation sprints — for businesses that want continuous improvement without a full-time AI team.',
    features: ['Monthly strategy sessions', 'Quarterly implementation sprints', 'Stack optimization & new agent scoping', 'Performance review & recommendations', 'Priority access to our AI team'],
    cta: 'Book a Call',
    featured: false,
  },
];

const INDUSTRIES = [
  { icon: Building2,    name: 'Professional Services', tag: 'Highest willingness to pay', desc: 'Clear ROI on implementation — consulting, accounting, and agency firms are fast-movers with strong budgets.' },
  { icon: HeartPulse,  name: 'Healthcare & Telehealth', tag: 'Complex workflows', desc: 'Patient intake, scheduling, billing, and compliance workflows demand expert AI design — not off-the-shelf tools.' },
  { icon: Scale,        name: 'Legal Services', tag: 'Trusted partner needed', desc: 'Risk-averse buyers who need a proven implementation partner — not a vendor. Document review, intake, and billing automation.' },
  { icon: Truck,        name: 'Logistics', tag: 'Massive ops savings', desc: 'Exception handling agents — for dispatch, freight, and claims — deliver some of the highest measurable ROI of any vertical.' },
  { icon: Landmark,     name: 'Financial Services', tag: 'Compliance-aware', desc: 'Compliance-aware AI implementation is rare and highly valued. KYC, fraud detection, and customer ops with full audit trails.' },
  { icon: GraduationCap, name: 'Education', tag: 'Growing demand', desc: 'Enrollment automation and student support agent demand is growing fast across higher ed and online learning platforms.' },
];

const DEPARTMENTS = [
  'Customer Support', 'Sales & CRM', 'Finance & Billing', 'HR & Recruitment',
  'Marketing', 'Operations', 'Compliance', 'Product & Engineering',
  'Legal', 'IT & Helpdesk', 'Procurement', 'Executive Office',
];

const TOOLS = [
  { name: 'Claude API',         category: 'AI Reasoning' },
  { name: 'GPT-4o',             category: 'Language Models' },
  { name: 'Gemini',             category: 'AI Models' },
  { name: 'Zapier',             category: 'Integrations' },
  { name: 'Make',               category: 'Automation' },
  { name: 'n8n',                category: 'Workflow Automation' },
  { name: 'LangChain',          category: 'AI Orchestration' },
  { name: 'Pinecone',           category: 'Vector Database' },
  { name: 'ElevenLabs',         category: 'Voice AI' },
  { name: 'Retell AI',          category: 'Voice Agents' },
  { name: 'Custom API',         category: 'API Integrations' },
  { name: '24+ Platforms',      category: 'Monitoring Ecosystem' },
];

export const AIConsultingPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', department: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  return (
    <div className="min-h-screen bg-white">

      {/* SECTION 1 — HERO */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="AI Consulting & Implementation" parent={{ name: 'Solutions', view: 'solutions-hub' }} align="left" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                <span className="text-[#E61739] text-[66px]">We audit, design, and build your AI stack.</span><span className="text-shine-white text-[66px]"> Then we monitor it for life.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                From ai consulting to long-term monitoring, KDCI.ai audits, designs, and builds your AI stack all within 6 weeks.
              </p>

              <div className="flex flex-col gap-4 mb-8 text-white/90 text-sm md:text-base font-medium">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">AI readiness audit in the first week</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">Custom agent design, build, and integration with your existing tools</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                  <span className="leading-snug">30-day monitored handoff then converted to an ongoing monitoring retainer</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setView('contact')} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Book a Discovery Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — image card */}
            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105"></div>
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778556766/AI-Consulting_onxfb8.png"
                  alt="AI Consulting team"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    AI-Powered · Outcome-Driven
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {[
                    { name: "ChatGPT",   logo: "https://res.cloudinary.com/dqkwcbbe5/image/upload/v1778627897/chatgpt_logo_b4z32j.png", imgH: '24px' },
                    { name: "Gemini",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Google_Gemini_logo_2025.svg/330px-Google_Gemini_logo_2025.svg.png", imgH: '20px' },
                    { name: "Claude",    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Claude_AI_logo.svg/330px-Claude_AI_logo.svg.png", imgH: '18px' },
                    { name: "Grok",      logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/Grok-feb-2025-logo.svg/330px-Grok-feb-2025-logo.svg.png", imgH: '28px' },
                  ].map((app, i) => (
                    <div key={i} className="h-[37px] md:h-[46px] flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                      <img src={app.logo} alt={app.name} className="object-contain" style={(app as any).imgH ? { height: (app as any).imgH } : { maxHeight: '100%', maxWidth: '100%' }} referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">$3K</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Audit Starting Price</p></div>
            <div><div className="text-xl md:text-2xl font-black">6 Weeks</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Audit to Live Agents</p></div>
            <div><div className="text-xl md:text-2xl font-black">24+</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Platforms Supported</p></div>
            <div><div className="text-xl md:text-2xl font-black">100%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Outcome-Focused</p></div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — PROBLEM STRIP */}
      <section className="bg-[#F5F5F7] py-16">
        <div className="max-w-7xl mx-auto px-6">
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              What we do
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight max-w-3xl">
              Maximize ROI and Efficiency through <span className="text-[#E61739] text-[48px]">AI implementation</span>
            </h2>
            <p className="text-white/50 text-lg font-medium mt-4 max-w-2xl">Our team works across your environment to ensure the success implementation of agentic ai solutions. From AI-readiness audit to retainer hand-off, we deploy AI copilots that maximize ROI and transform your workflows.</p>
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Our Process
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">
              6-Week Implementation Roadmap.<br />Live agents within <span className="text-[#E61739]">42 days.</span>
            </h2>
          </div>
          <div className="relative">
            <div className="hidden md:block absolute top-6 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-[#1D1D1F]/15 to-transparent" />
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {STEPS.map((s, i) => (
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
        </div>
      </section>

      {/* SECTION 5 — WHY KDCI.AI */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            {/* Content */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 self-start">
                Our Difference
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight mb-10">
                Built to deliver outcomes,<br />
                <span className="text-[#E61739]">not slide decks.</span>
              </h2>
              <div className="divide-y divide-black/10">
                {[
                  {
                    num: '01',
                    icon: Cpu,
                    title: 'We build in-house',
                    desc: 'Behind every AI system configured is an AI specialist with deep industry knowledge and experience, exercising full control over quality, speed, and customization.',
                  },
                  {
                    num: '02',
                    icon: BarChart3,
                    title: 'KPI-backed accountability',
                    desc: 'We agree on outcomes that focus on delivering measurable return on your investments and report against them every month. You get a credit for any targets we miss.',
                  },
                  {
                    num: '03',
                    icon: Users,
                    title: 'Human in the loop, always',
                    desc: 'Every AI agent deployment is managed by a trained operations team who monitor performance, catch errors, and continuously improve your AI systems over time.',
                  },
                ].map((d, i) => (
                  <div key={i} className="flex items-start gap-4 py-6">
                    <span className="text-[11px] font-black text-[#E61739]/40 tracking-widest pt-0.5 w-6 shrink-0">{d.num}</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2.5 mb-1.5">
                        <d.icon size={15} className="text-[#E61739]" />
                        <h3 className="text-sm font-black text-[#1D1D1F]">{d.title}</h3>
                      </div>
                      <p className="text-[#86868b] text-sm font-medium leading-relaxed">{d.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating portrait image */}
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] w-full">
              <img
                src="/our-difference.png"
                alt="KDCI AI consulting team reviewing performance dashboards"
                className="w-full h-full object-cover object-center"
              />
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 6 — PRICING */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Transparent tiers. No surprises.</h2>
            <p className="text-white/40 text-lg font-medium">Project-based or 3-month retainer · Natural feeder into monitoring</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {PRICING.map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.featured ? 'bg-white/5 border-2 border-[#E61739]' : 'bg-white/5 border border-white/10'}`}>
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">Most Popular</div>
                )}
                <p className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-3">{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                </div>
                <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-1">{plan.tag}</p>
                <p className="text-white/30 text-xs font-medium mb-4">{plan.period}</p>
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
                  {plan.cta}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-7 border border-white/10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white/5">
            <div>
              <h4 className="text-base font-bold text-white mb-1">Not sure where to start?</h4>
              <p className="text-sm text-white/40 font-medium">Start with the $3,000 AI Readiness Audit — a structured 1-week engagement that gives you a full implementation roadmap and vendor recommendation before you commit to a build.</p>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all whitespace-nowrap">Book the Audit</button>
          </div>
        </div>
      </section>

      {/* SECTION 7 — INDUSTRIES & DEPARTMENTS */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Who We Serve
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4">
              The industries where AI implementation<br /><span className="text-[#E61739]">pays for itself fastest.</span>
            </h2>
            <p className="text-[#86868b] text-lg font-medium max-w-xl mx-auto">We work in verticals where ai implementation meets urgent, real-life business needs.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-14">
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Our Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 max-w-2xl">
              No need to replace your existing systems.<span className="text-[#E61739]"><br/>We work with what you have. </span>
            </h2>
            <p className="text-white/40 font-medium max-w-2xl text-[17px]">KDCI.ai is tool-agnostic. We don't lock you into proprietary software. Rather, we build on the leading AI platforms and customize them around your workflows.</p>
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
              Before we write a single line of code, we align on agreed performance targets. We hold ourselves <span style={{color:'#E61739'}}>accountable to outcomes, not just deliverables.</span>
            </p>
            <p className="text-white/40 text-base font-medium max-w-2xl">
              Every engagement includes measurable performance targets agreed at onboarding. We price at a premium because we back it.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10 — CONTACT FORM */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[4rem] border border-white/5 flex flex-col lg:flex-row" style={{ overflow: 'hidden' }}>

          {/* Left — image panel */}
          <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-0 shrink-0">
            <img
              src="/contact-section.png"
              alt="KDCI operations consultant on a live discovery call"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mb-2">AI Consulting</p>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">
                Ready to build your<br />AI operation?
              </h3>
              <div className="flex flex-wrap gap-2 mt-5">
                {['No lock-in on Starter', 'Live in 14–21 days', 'KPI-backed SLAs'].map((t, i) => (
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
                <p className="text-white/50 font-medium">Expect a response within 2 business hours.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-4">
                    Free Discovery Call
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight">Ready to Build AI that Works?</h2>
                  <p className="text-white/40 text-sm font-medium">Book a free 30-minute discovery call. Let's map out your top AI implementation opportunities and identify the highest-impact AI opportunities — no obligation.</p>
                </div>
                <form onSubmit={e => { e.preventDefault(); if (captchaRef.current?.isBot()) return; setSubmitted(true); }} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">First Name</label>
                      <input required className={inp} placeholder="Jane" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Last Name</label>
                      <input required className={inp} placeholder="Smith" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Company</label>
                      <input required className={inp} placeholder="Acme Corp" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Work Email</label>
                      <input required type="email" className={inp} placeholder="jane@acme.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Phone (optional)</label>
                      <input className={inp} placeholder="+1 555 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Department to automate first</label>
                      <input className={inp} placeholder="e.g. Support, Finance…" value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={`${inp} resize-none`} placeholder="Tell us about your biggest operational pain point…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
                  </div>
                  <Captcha ref={captchaRef} onVerify={() => {}} theme="dark" />
                  <button type="submit" className="w-full flex items-center justify-center gap-3 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all group mt-2">
                    Book a Discovery Call <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                  <p className="text-[10px] text-white/20 text-center font-medium">No commitment required · Response within 2 business hours</p>
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
              { q: "What is 'AI Operations' and how does KDCI deliver it?", a: "AI Operations (AI Ops) is the integration of intelligent automation into business workflows — using large language models, OCR, computer vision, and process automation layered with human oversight. KDCI designs, deploys, and manages these hybrid human-AI systems for clients." },
              { q: "Do I need to have my own AI tools for KDCI to work with?", a: "No. We bring our own AI stack including LLM integrations, workflow automation platforms, and proprietary QA tools. We can also integrate with your existing AI infrastructure or tools like OpenAI, Anthropic, or Google AI." },
              { q: "Can KDCI build custom AI agents for my business processes?", a: "Yes. Our AI engineering team designs and deploys custom agentic workflows using LangChain, CrewAI, and similar frameworks. We build agents for tasks like automated research, document review, outreach sequencing, and data synthesis." },
              { q: "How do you handle AI hallucinations and accuracy in automated workflows?", a: "We implement human-in-the-loop checkpoints at every critical step. Our AI agents generate outputs that are reviewed and approved by trained human operators before execution, ensuring accuracy without sacrificing speed." },
              { q: "What business processes are best suited for AI augmentation?", a: "High-volume, rule-based tasks with structured inputs are ideal: document classification, data extraction, content generation, email routing, lead scoring, report generation, and first-response customer support triage." },
              { q: "Can you help us identify automation opportunities in our current operations?", a: "Yes. We offer a free 2-hour Operations Audit session where our AI solutions architects map your existing workflows and identify the highest-ROI automation opportunities, ranked by effort and impact." },
              { q: "How is AI performance monitored over time?", a: "We track accuracy rates, task completion rates, time savings, and error rates through a monthly AI Ops performance report. Models are retrained or updated as your data and processes evolve." },
              { q: "Is agentic AI safe to deploy in regulated industries like Fintech or Healthcare?", a: "Yes, with the right safeguards. We implement strict data governance, encrypted pipelines, audit logs, and human approval gates for any sensitive outputs. We have deployed AI Ops solutions for HIPAA and SOC-2 environments." },
              { q: "What is the typical ROI timeline for an AI Ops engagement?", a: "Most clients see measurable ROI within 60–90 days. Common outcomes include 40–80% reduction in manual processing time, 30–50% cost reduction versus purely human teams, and near-zero error rates on automated tasks." },
              { q: "How does KDCI stay current with rapidly evolving AI technology?", a: "Our AI Labs team conducts weekly model evaluations, attends major AI research conferences, and has direct partnerships with leading AI vendors. We proactively upgrade client workflows when superior tools become available." },
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
