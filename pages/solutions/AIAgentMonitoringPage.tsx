
import React, { useState, useRef } from 'react';
import {
  ArrowRight, CheckCircle2, Activity, ShieldCheck, BarChart3,
  RefreshCw, Settings, Users, Zap, AlertCircle, Bell,
  ShoppingCart, HeartPulse, Scale, Landmark, Home,
  Monitor, Clock, TrendingUp, Target, BarChart, Shield
} from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';
import { ServiceHeroModal } from '../../components/ServiceHeroModal';
import IMG_HERO from '@/attached_assets/kdci-ai-agent-monitoring-dashboard.webp';
import IMG_OUR_DIFFERENCE from '@/attached_assets/kdci-ai-operations-team-performance-review.webp';
import IMG_CONTACT from '@/attached_assets/kdci-solutions-specialist-discovery-call.webp';

/* ─── Data ─────────────────────────────────────────────────────────── */

const DELIVERABLES = [
  {
    icon: Activity,
    title: 'Daily Performance Monitoring',
    desc: 'We track response accuracy, debug hallucinations, and flag latency spikes across your entire AI stack — giving you a real-time view of LLM observability metrics that matter.',
  },
  {
    icon: RefreshCw,
    title: 'Prompt Retraining on Drift',
    desc: 'We detect behavioral drift — wrong answers, off-script responses, degrading output quality — and retrain affected prompts automatically before it reaches your customers.',
  },
  {
    icon: AlertCircle,
    title: 'Escalation Path Design & Management',
    desc: 'We design and manage the human handoff layer so the right issues reach the right people. No missed escalations. No frustrated customers falling through a gap in your agentic trust controls.',
  },
  {
    icon: Settings,
    title: 'Integration Health Checks',
    desc: 'Regular audits across your CRM, helpdesk, and API connections to surface sync failures, broken webhooks, and stale data — caught and fixed before they cascade into larger AI system failures.',
  },
  {
    icon: BarChart3,
    title: 'Monthly Scorecard & Recommendations',
    desc: 'A full AI performance report every month: benchmarks, behavioral trends, governance checkpoints, and a prioritized action plan for Month 2 — so you always know where your agents stand.',
  },
  {
    icon: Users,
    title: 'Dedicated AI Ops Specialist',
    desc: 'AI agents produce dense, opaque outputs that make debugging hard alone. Your dedicated specialist provides the human layer of AI system transparency — clear visibility into every decision your agent makes.',
  },
];

const STEPS = [
  { n: '01', period: 'Day 1–2',   title: 'Kickoff',               desc: 'Map all of your active AI agents and platforms for real-time monitoring and performance tracking.' },
  { n: '02', period: 'Day 3–4',   title: 'Health Check',          desc: 'Run our AI Agent Health Check — scoring each agent on accuracy, drift risk, escalation rate, and integration stability.' },
  { n: '03', period: 'Day 5–7',   title: 'Monitoring Setup',      desc: 'Configure your monitoring dashboard so you get full visibility on the full decision path, and we get the alerts.' },
  { n: '04', period: 'Week 2',    title: 'First Optimizations',   desc: 'First round of prompt optimizations executed and tested. See measurable improvement within two weeks of kickoff.' },
  { n: '05', period: 'Month 1',   title: 'First Report',          desc: 'Deliver your first monthly performance scorecard with benchmarks, trend analysis, and the Month 2 action plan.' },
];

const INDUSTRIES = [
  { icon: ShoppingCart, name: 'E-Commerce & Retail',    desc: 'High ticket volume means agent failures directly cost sales. We keep support and commerce agents performing at peak.' },
  { icon: Target,       name: 'SaaS & Technology',       desc: 'Native integrations with Intercom, Zendesk, and Freshdesk make SaaS the fastest onboarding profile we handle.' },
  { icon: Home,         name: 'Real Estate',              desc: 'Lead qualification bots are everywhere in real estate — and most are underperforming. We tune and monitor them continuously.' },
  { icon: HeartPulse,   name: 'Healthcare',               desc: 'AI oversight in healthcare isn\'t optional — it\'s regulatory. We provide the audit trail and human review layer compliance teams need.' },
  { icon: Landmark,     name: 'Financial Services',       desc: 'Regulators are watching AI deployments in finance. Our managed oversight model gives you documented monitoring at every step.' },
  { icon: Scale,        name: 'Insurance',                desc: 'Complex products and long journeys mean insurance agents drift and hallucinate more. We run continuous correction so agents stay accurate.' },
];

const TOOLS = [
  { name: 'LangSmith',     category: 'LLM Observability' },
  { name: 'Datadog',       category: 'Infrastructure' },
  { name: 'OpenAI Evals',  category: 'Model Evaluation' },
  { name: 'Intercom',      category: 'Helpdesk' },
  { name: 'Zendesk',       category: 'Support' },
  { name: 'Grafana',       category: 'Dashboards' },
  { name: 'PagerDuty',     category: 'Incident Mgmt' },
  { name: 'Slack',         category: 'Alerts & Comms' },
  { name: 'Make',          category: 'Automation' },
  { name: 'n8n',           category: 'Workflow Ops' },
  { name: 'HubSpot',       category: 'CRM Monitoring' },
  { name: 'Freshdesk',     category: 'Support' },
];

const PRICING = [
  {
    name: 'Starter',
    price: '$2,500',
    period: '/mo',
    setup: '$1,500 setup fee',
    agents: '1–2 agents',
    desc: 'For businesses running one or two AI agents that need professional oversight without a full operations team.',
    features: ['1–2 agents monitored', 'Weekly performance reports', 'Email support', 'Monthly scorecard', 'Prompt drift alerts'],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Core',
    price: '$5,000',
    period: '/mo',
    setup: '$2,500 setup fee',
    agents: '3–5 agents',
    desc: 'For growing teams running multiple agents across departments who need daily oversight and a named point of contact.',
    features: ['3–5 agents monitored', 'Daily monitoring', 'Dedicated account manager', 'Integration health checks', 'Escalation path management', 'Monthly benchmark report'],
    featured: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '$10,000+',
    period: '/mo',
    setup: 'Setup waived',
    agents: 'Unlimited agents',
    desc: 'Full managed AI operations for enterprise deployments with complex agent ecosystems and executive-level reporting.',
    features: ['Unlimited agents', 'Dedicated ops team', 'Quarterly business reviews', 'Custom SLA & escalation design', 'Priority response SLA', 'Executive dashboards'],
    featured: false,
    cta: 'Book a Call',
  },
];

/* ─── Component ─────────────────────────────────────────────────────── */

export const AIAgentMonitoringPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', agents: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  return (
    <div className="min-h-screen bg-white">

      {/* ── SECTION 1 — HERO ──────────────────────────────────────────── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-52 md:pb-40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30" />
          <div className="blob blob-purple opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="AI Observability and Governance" parent={{ name: 'Solutions', view: 'solutions-hub' }} align="left" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl" style={{color:'#FFFFFF'}}>
                AI Observability and Governance
              </h1>
              <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                We give your AI systems the continuous monitoring, audit trails, and governance controls they need to stay accurate, compliant, and trustworthy.
              </p>

              <div className="flex flex-col gap-4 mb-8 text-white/90 text-sm md:text-base font-medium">
                {[
                  'Daily agent monitoring',
                  'Drift detection and retraining',
                  'Dedicated AI Ops Specialist',
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 mb-8 md:mb-0">
                <button onClick={() => setShowHeroModal(true)} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Book a Discovery Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — image card */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105" />
              <div className="relative min-h-[400px] lg:h-[560px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-slate-800">
                <img
                  src={IMG_HERO}
                  alt="KDCI AI agent monitoring dashboard for real-time performance tracking"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Monitoring · Always On
                  </div>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-3xl bg-white/60 backdrop-blur-md border border-white/40 shadow-xl flex items-center justify-around">
                  {[
                    { name: 'Zendesk',      logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327923/Zendesk_Logo_jlsxla.png', style: { maxHeight: '48px', maxWidth: '134px' } },
                    { name: 'ElevenLabs',   logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/f_png,w_160,c_fit/v1779173814/Elevenlabs_Ai_Logo_PNG_SVG_Vector_chtxqo.svg', style: { maxHeight: '100px', maxWidth: '120px' } },
                    { name: 'Intercom',     logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774327927/IntercomLogo_tqzspk.png', style: { maxHeight: '48px', maxWidth: '134px' } },
                    { name: 'HubSpot',      logo: 'https://res.cloudinary.com/dqkwcbbe5/image/upload/v1779174606/hubspot-logo-black-and-white_joijyn.png' },
                  ].map((app: any, i) => (
                    <div key={i} className="h-[37px] md:h-[46px] flex items-center justify-center hover:scale-105 transition-transform">
                      <img src={app.logo} alt={app.name} className="object-contain max-h-7 max-w-[80px]" style={app.style ?? {}} referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-x-20 lg:gap-x-28 md:items-center text-white text-center">
            <div><div className="text-xl md:text-2xl font-black">Daily</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Monitoring Cadence</p></div>
            <div><div className="text-xl md:text-2xl font-black">7 Days</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Time to Live Monitoring</p></div>
            <div><div className="text-xl md:text-2xl font-black">18+ mo</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Avg Client Lifetime</p></div>
            <div><div className="text-xl md:text-2xl font-black">1:1</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">AI Ops Specialist per Account</p></div>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — PROBLEM STRIP ─────────────────────────────────── */}
      <section className="bg-[#F5F5F7] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1F]/10">
            {[
              'Your AI Agents were set up once and never touched again',
              'Nobody on your team is watching for drift or failures',
              'Where your AI agents break, you find out from an angry customer',
            ].map((pain, i) => (
              <div key={i} className="px-8 py-8 md:py-4 md:first:pl-0 md:last:pr-0 text-left">
                <p className="text-xl md:text-2xl font-black text-[#1D1D1F] leading-snug">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 3 — WHAT WE DELIVER ───────────────────────────────── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              What We Deliver
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight max-w-3xl">
              AI Agent Observability <br/><span className="text-[#E61739] text-[48px]">that Actually Catches Issues</span>
            </h2>
            <p className="text-white/50 text-lg font-medium mt-4 max-w-2xl">Six core deliverables that give you complete visibility into every AI agent across your stack — with the governance layer to act on what you find.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {DELIVERABLES.map((s, i) => (
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

      {/* ── SECTION 4 — HOW IT WORKS ──────────────────────────────────── */}
      <section id="how-it-works" className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Onboarding Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">
              From kickoff to fully monitored.<br /><span className="text-[#E61739]">Prepared to go live within 7 days.</span>
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
                <h4 className="font-black text-[#1D1D1F] text-sm mb-0.5">Ongoing after Month 1</h4>
                <p className="text-[#86868b] text-sm font-medium">Daily monitoring · weekly check-ins · monthly performance reports</p>
              </div>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center gap-2">
              Start Your 7-Day Onboarding <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ── SECTION 5 — WHY KDCI ──────────────────────────────────────── */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 self-start">
                Our Difference
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight mb-10">
                Built to keep your agents performing under <span className="text-[#E61739]">agentic trust controls</span>
              </h2>
              <div className="divide-y divide-black/10">
                {[
                  {
                    num: '01',
                    icon: Monitor,
                    title: 'We watch — you build',
                    desc: 'Our AI Ops Specialists monitor every agent across your stack so issues get caught before they cost you — no internal headcount required.',
                  },
                  {
                    num: '02',
                    icon: BarChart3,
                    title: 'Scorecard-backed accountability',
                    desc: 'We agree on performance benchmarks before we start and report against them every month. If we miss a target, we own the fix.',
                  },
                  {
                    num: '03',
                    icon: Users,
                    title: 'An AI Ops Specialist behind every agent',
                    desc: 'A trained specialist monitors every system, catches drift, and improves ai agent performance continuously.',
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

            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl aspect-[4/5] w-full">
              <img
                src={IMG_OUR_DIFFERENCE}
                alt="KDCI AI operations team reviewing agent performance dashboards in Manila, Philippines"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6 — PRICING ───────────────────────────────────────── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-3">Transparent tiers. No surprises.</h2>
            <p className="text-white/40 text-lg font-medium">3-month minimum · Average client lifetime: 18+ months</p>
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
                  <span className="text-white/30 text-sm font-black mb-1">{plan.period}</span>
                </div>
                <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-1">{plan.agents}</p>
                <p className="text-white/30 text-xs font-medium mb-3">{plan.setup}</p>
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
              <h4 className="text-base font-bold text-white mb-1">Running more than 10 agents?</h4>
              <p className="text-sm text-white/40 font-medium">Build a dedicated AI Ops pod tailored to the scale and complexity of your deployment.</p>
            </div>
            <button onClick={() => setView('contact')} className="shrink-0 px-8 py-3.5 bg-white/10 border border-white/10 text-white rounded-2xl font-bold text-sm hover:bg-white/20 transition-all">Request Custom Quote</button>
          </div>
        </div>
      </section>

      {/* ── SECTION 7 — WHO WE SERVE ──────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Who We Serve
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-4">
              Industries where <span className="text-[#E61739]">AI agent <br/> monitoring</span> isn't optional
            </h2>
            <p className="text-[#86868b] text-lg font-medium max-w-xl mx-auto">We specialize in the verticals where AI agent monitoring protects what matters most.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
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
        </div>
      </section>

      {/* ── SECTION 8 — TOOLS ─────────────────────────────────────────── */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Our Stack
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4 max-w-2xl">
              Full Monitoring Services.<br /><span className="text-[#E61739]">Any Platform. Any Agent.</span>
            </h2>
            <p className="text-white/40 font-medium max-w-2xl text-[17px]">We monitor agents built on any platform and connect to the helpdesks, CRMs, and alerting tools your team already uses — no rip-and-replace required.</p>
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

      {/* ── SECTION 9 — GUARANTEE ─────────────────────────────────────── */}
      <section className="py-20 bg-[#080808] border-t border-white/10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="border-l-4 border-[#E61739] pl-10 py-4">
            <p className="text-2xl md:text-4xl font-black text-white leading-tight mb-6 max-w-3xl">
              "We agree on AI agent benchmarks before we start. Miss them once, you <span style={{color:'#E61739'}}>get a credit</span>. Miss them twice, you <span style={{color:'#E61739'}}>walk away free</span>."
            </p>
            <p className="text-white/40 text-base font-medium max-w-2xl">
              Every engagement includes measurable performance targets agreed at kickoff. We price at a premium because we back it with accountability.
            </p>
          </div>
        </div>
      </section>

      {/* ── SECTION 10 — CONTACT FORM ─────────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[4rem] border border-white/5 flex flex-col lg:flex-row" style={{ overflow: 'hidden' }}>

          {/* Left — image panel */}
          <div className="lg:w-[45%] relative min-h-[400px] lg:min-h-0 shrink-0">
            <img
              src={IMG_CONTACT}
              alt="KDCI AI agent monitoring specialist on a free discovery consultation call"
              className="absolute inset-0 w-full h-full object-cover object-right"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 right-10">
              <p className="text-[11px] text-white/40 font-black uppercase tracking-widest mb-2">AI Observability and Governance</p>
              <h3 className="text-2xl md:text-3xl font-heading font-bold text-white leading-snug">
                Ready to stop worrying<br />about your agents?
              </h3>
              <div className="flex flex-wrap gap-2 mt-5">
                {['Free Health Check included', 'Live in 7 days', '3-month minimum'].map((t, i) => (
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
                <p className="text-white/50 font-medium">Expect a response within 2 business hours. We'll schedule your free AI Agent Health Check on the call.</p>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-4">
                    Free Discovery Call
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2 leading-tight">Book a Free AI Agent Health Check</h2>
                  <p className="text-white/40 text-sm font-medium">We'll audit your active AI agents, score each one on accuracy, drift risk, and integration health — no commitment required.</p>
                </div>
                <form onSubmit={async e => {
                  e.preventDefault();
                  const ok = await captchaRef.current?.verify();
                  if (!ok) return;
                  try {
                    await fetch('/api/contact', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ ...form, service: 'AI Observability and Governance', source: 'ai-agent-monitoring-page' }),
                    });
                  } catch {}
                  setSubmitted(true);
                }} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">First Name</label>
                      <input required className={inp} placeholder="Jane" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Last Name</label>
                      <input required className={inp} placeholder="Smith" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Company</label>
                      <input required className={inp} placeholder="Acme Corp" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Work Email</label>
                      <input required type="email" className={inp} placeholder="jane@acme.com" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Phone (optional)</label>
                      <input className={inp} placeholder="+1 555 000 0000" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Number of AI agents</label>
                      <select value={form.agents} onChange={e => setForm(f => ({ ...f, agents: e.target.value }))} className={`${inp} appearance-none`}>
                        <option value="">Select…</option>
                        <option value="1-2">1–2 agents</option>
                        <option value="3-5">3–5 agents</option>
                        <option value="6-10">6–10 agents</option>
                        <option value="10+">10+ agents</option>
                        <option value="not-sure">Not sure yet</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-white/40 uppercase tracking-widest mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={`${inp} resize-none`} placeholder="Tell us about your current AI agent setup…" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} />
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

      {/* ── SECTION 11 — FAQ ──────────────────────────────────────────── */}
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
              { q: "What exactly counts as an 'AI agent' for monitoring purposes?", a: "Any automated system using a large language model (LLM) to handle customer interactions, internal queries, data processing, or decision support — including chatbots, voice agents, email bots, support agents on Intercom or Zendesk, and custom-built LLM workflows." },
              { q: "How do you detect prompt drift?", a: "We run daily automated evaluation benchmarks against a set of baseline test cases established at kickoff. When accuracy scores fall below threshold — or when hallucination rates, escalation rates, or latency spikes are detected — our system flags the agent for human review and retraining." },
              { q: "What's the response time when an issue is detected?", a: "Critical issues (agent failures, integration outages) are escalated within 4 business hours. Performance drift triggers a review within one business day, with optimization executed and tested within the same week." },
              { q: "Do you need admin access to our AI platforms?", a: "We need read access to your agent configurations and, for optimization, the ability to update prompt templates. We document every change and require client approval for any structural modifications to an agent's logic." },
              { q: "What AI platforms and helpdesks do you support?", a: "We support agents built on OpenAI, Anthropic, Google Gemini, and most LLM platforms. For integrations, we work with Intercom, Zendesk, Freshdesk, HubSpot, Salesforce, and custom API-based setups." },
              { q: "How is pricing calculated — is it per agent?", a: "Pricing is tier-based, not strictly per-agent. Each tier covers a range (1–2, 3–5, or unlimited agents) and includes a standard set of services. For high-volume deployments, we build custom pricing around the complexity of your stack." },
              { q: "What happens if an agent goes down completely?", a: "Full agent failures are treated as critical incidents. Your AI Ops Specialist is notified immediately via PagerDuty, investigates root cause, and coordinates with your team or vendor to restore service. You receive an incident report within 24 hours." },
              { q: "Can you monitor voice AI agents (e.g. Retell AI, Vapi)?", a: "Yes. We monitor voice agents for call completion rate, resolution rate, transfer rate, and sentiment patterns. We also review call transcripts to catch accuracy issues that automated scoring may miss." },
              { q: "How is sensitive customer data handled during monitoring?", a: "All monitoring is conducted on anonymized or aggregated performance data wherever possible. If transcript review is required, we follow your data handling policy and can operate under NDA and DPA agreements." },
              { q: "What's included in the monthly scorecard?", a: "The monthly scorecard includes: agent-by-agent accuracy scores, drift trend charts, escalation rate analysis, integration health status, prompt optimization summary, benchmark comparisons to your industry baseline, and a prioritized recommendation list for the next 30 days." },
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

      {showHeroModal && (
        <ServiceHeroModal
          config={{
            tag: 'AI Observability and Governance',
            title: 'Tell us about your AI agents.',
            subtitle: 'Free health check included. Response within 2 business hours.',
            inquiryType: 'AI Observability and Governance',
            source: 'ai-agent-monitoring-hero',
            specificField: {
              label: 'Number of AI Agents',
              placeholder: 'e.g. 5, 25, 100+',
              fieldKey: 'agentCount',
            },
            notesPlaceholder: 'Current monitoring issues, integrations, uptime requirements…',
            submitLabel: 'Book a Discovery Call',
            successTitle: "We'll be in touch!",
            successMessage: "Expect a response within 2 business hours. We'll include a free AI Agent Health Check on the call.",
          }}
          onClose={() => setShowHeroModal(false)}
        />
      )}
    </div>
  );
};
