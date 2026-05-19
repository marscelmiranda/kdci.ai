
import React, { useState, useRef } from 'react';
import {
  ArrowRight, CheckCircle2, Activity, ShieldCheck, BarChart3,
  RefreshCw, Settings, Users, Zap, AlertCircle, Calendar,
  ShoppingCart, HeartPulse, Scale, Landmark, Building2, Home,
  Monitor, Clock, FileText, Target, TrendingUp, Bell
} from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { Captcha, CaptchaHandle } from '../../components/Captcha';

const DELIVERABLES = [
  {
    icon: Activity,
    title: 'Daily Performance Monitoring',
    desc: 'Every agent, every day. We track response accuracy, resolution rates, hallucination frequency, and latency across your entire AI stack.',
  },
  {
    icon: RefreshCw,
    title: 'Prompt Retraining on Drift',
    desc: 'When an agent starts drifting — giving wrong answers, going off-script, or degrading in quality — we detect it and retrain before it impacts customers.',
  },
  {
    icon: AlertCircle,
    title: 'Escalation Path Design',
    desc: 'We design and manage the human handoff layer so the right issues reach the right people, every time. No missed escalations, no frustrated customers.',
  },
  {
    icon: Settings,
    title: 'Integration Health Checks',
    desc: 'Regular checks across your CRM, helpdesk, and API connections to catch sync failures, broken webhooks, and stale data before they cascade.',
  },
  {
    icon: BarChart3,
    title: 'Monthly Scorecard & Recommendations',
    desc: 'A full performance report every month — benchmarks, trend analysis, improvement recommendations, and next actions. Transparent and actionable.',
  },
  {
    icon: Users,
    title: 'Dedicated AI Ops Specialist',
    desc: 'Every account gets a named AI Ops Specialist. They know your agents, your workflows, and your business. One point of contact, full accountability.',
  },
];

const INDUSTRIES = [
  {
    icon: ShoppingCart,
    name: 'E-Commerce & Retail',
    tag: 'Highest urgency',
    desc: 'High ticket volume means agent failures directly cost sales. We keep your support and commerce agents performing at peak — especially during surges.',
  },
  {
    icon: Target,
    name: 'SaaS & Technology',
    tag: 'Fastest to deploy',
    desc: 'Native integrations with Intercom, Zendesk, and Freshdesk make SaaS accounts our fastest onboarding. We speak your stack.',
  },
  {
    icon: Home,
    name: 'Real Estate',
    tag: 'High growth',
    desc: 'Lead qualification bots are everywhere in real estate — and most are underperforming. We tune and monitor them so no lead slips through.',
  },
  {
    icon: HeartPulse,
    name: 'Healthcare',
    tag: 'Compliance critical',
    desc: 'AI oversight in healthcare isn\'t optional — it\'s regulatory. We provide the audit trail, monitoring logs, and human review layer your compliance team needs.',
  },
  {
    icon: Landmark,
    name: 'Financial Services',
    tag: 'Regulatory-driven',
    desc: 'Regulators are watching AI deployments in finance. Our managed oversight model gives you documented monitoring and explainability at every step.',
  },
  {
    icon: Scale,
    name: 'Insurance',
    tag: 'High complexity',
    desc: 'Complex products and long customer journeys mean insurance agents drift and hallucinate more. We run continuous correction so your agents stay accurate.',
  },
];

const TIMELINE = [
  { period: 'Day 1–2', title: 'Kickoff', desc: 'Map all active AI agents and platforms. Catalog integrations, escalation paths, and current performance baselines.' },
  { period: 'Day 3–4', title: 'AI Agent Health Check', desc: 'Run our proprietary health check — scoring each agent on accuracy, drift risk, escalation rate, and integration stability.' },
  { period: 'Day 5–7', title: 'Monitoring Setup', desc: 'Configure your monitoring dashboard and alert triggers. You get visibility. We get the alerts.' },
  { period: 'Week 2', title: 'First Optimizations', desc: 'First round of prompt optimizations executed and tested. Measurable improvement within two weeks of kickoff.' },
  { period: 'Month 1', title: 'First Report', desc: 'Deliver your first monthly performance report with benchmarks, improvement summary, and the roadmap for Month 2.' },
  { period: 'Ongoing', title: 'Continuous Ops', desc: 'Daily monitoring, weekly check-ins, monthly reports. Your agents stay sharp — permanently.' },
];

const PRICING = [
  {
    name: 'Starter',
    price: '$2,500',
    period: '/mo',
    setup: '$1,500 setup',
    agents: '1–2 agents',
    desc: 'Ideal for businesses running one or two AI agents and wanting professional oversight without a full operations team.',
    features: [
      '1–2 agents monitored',
      'Weekly performance reports',
      'Email support',
      'Monthly scorecard',
      'Prompt drift alerts',
    ],
    featured: false,
    cta: 'Get Started',
  },
  {
    name: 'Core',
    price: '$5,000',
    period: '/mo',
    setup: '$2,500 setup',
    agents: '3–5 agents',
    desc: 'For growing teams running multiple agents across departments who need daily oversight and a dedicated point of contact.',
    features: [
      '3–5 agents monitored',
      'Daily monitoring',
      'Dedicated account manager',
      'Integration health checks',
      'Escalation path management',
      'Monthly benchmark report',
    ],
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
    features: [
      'Unlimited agents',
      'Dedicated ops team',
      'Quarterly business reviews',
      'Custom SLA & escalation design',
      'Priority response',
      'Executive dashboards',
    ],
    featured: false,
    cta: 'Book a Call',
  },
];

export const AIAgentMonitoringPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [form, setForm] = useState({ firstName: '', lastName: '', company: '', email: '', phone: '', agents: '', notes: '' });
  const [submitted, setSubmitted] = useState(false);
  const captchaRef = useRef<CaptchaHandle>(null);
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await captchaRef.current?.verify();
    if (!ok) return;
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, service: 'AI Agent Monitoring', source: 'ai-agent-monitoring-page' }),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-white">

      {/* HERO */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30" />
          <div className="blob blob-purple opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs setView={setView} currentName="AI Agent Monitoring" parent={{ name: 'Solutions', view: 'solutions-hub' }} align="left" />

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            {/* Left — copy */}
            <div className="text-left flex flex-col py-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/30 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 self-start">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E61739] animate-pulse" />
                Fully Managed · Always On
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-[62px] font-heading font-bold text-white mb-6 tracking-tight leading-[1.1]">
                <span className="text-[#E61739]">We watch your AI agents</span>
                <span className="text-shine-white"> so you don't have to.</span>
              </h1>
              <p className="text-lg md:text-xl text-white/70 font-medium leading-relaxed mb-8">
                Daily monitoring, prompt optimization, and human oversight — delivered as a fully managed service. Your agents stay accurate, compliant, and on-brand, 24/7.
              </p>

              <div className="flex flex-col gap-4 mb-8 text-white/90 text-sm md:text-base font-medium">
                {[
                  'Daily performance monitoring across every active agent',
                  'Prompt retraining triggered automatically on drift detection',
                  'Dedicated AI Ops Specialist for every account',
                ].map((pt, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-[#E61739] shrink-0 mt-0.5" />
                    <span className="leading-snug">{pt}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <button onClick={() => setView('contact')} className="w-full sm:w-auto px-10 py-4 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
                  Book a Discovery Call <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right — stats card */}
            <div className="relative lg:h-full">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E61739]/20 to-transparent rounded-[2rem] blur-3xl transform -rotate-6 scale-105" />
              <div className="relative h-full min-h-[400px] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-[#111]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#E61739]/5 via-transparent to-[#7e22ce]/10" />

                <div className="absolute top-6 left-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/20 text-white text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Live Monitoring Active
                  </div>
                </div>

                <div className="absolute inset-0 flex flex-col items-center justify-center px-10 gap-6">
                  <div className="w-20 h-20 rounded-[1.5rem] bg-[#E61739]/15 border border-[#E61739]/30 flex items-center justify-center mb-2">
                    <Monitor size={36} className="text-[#E61739]" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {[
                      { value: '100%', label: 'Uptime Accountability' },
                      { value: '24 hrs', label: 'Drift Detection SLA' },
                      { value: '18+ mo', label: 'Avg Client Lifetime' },
                      { value: '6', label: 'Target Industries' },
                    ].map((stat, i) => (
                      <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center">
                        <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">Daily</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Monitoring Cadence</p></div>
            <div><div className="text-xl md:text-2xl font-black">3-mo</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Minimum Term</p></div>
            <div><div className="text-xl md:text-2xl font-black">18+</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Months Avg Lifetime</p></div>
            <div><div className="text-xl md:text-2xl font-black">1:1</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Specialist Per Account</p></div>
          </div>
        </div>
      </section>

      {/* PROBLEM STRIP */}
      <section className="bg-[#F5F5F7] py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#1D1D1F]/10">
            {[
              'Your AI agents were set up once and never touched again.',
              'Nobody on your team is watching for drift or failures.',
              'When agents break, you find out from an angry customer.',
            ].map((pain, i) => (
              <div key={i} className="px-8 py-8 md:py-4 first:pl-0 last:pr-0">
                <p className="text-xl md:text-2xl font-black text-[#1D1D1F] leading-snug">{pain}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT WE DELIVER */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              What We Deliver
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight max-w-3xl">
              Everything your AI agents need to <span className="text-[#E61739]">stay sharp.</span>
            </h2>
            <p className="text-white/50 text-lg font-medium mt-4 max-w-2xl">Six core deliverables, managed end-to-end. You deploy AI — we make sure it keeps working.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {DELIVERABLES.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group">
                <div className="w-12 h-12 bg-[#E61739]/15 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#E61739]/25 transition-all">
                  <s.icon size={22} className="text-[#E61739]" />
                </div>
                <h3 className="text-lg font-black text-white mb-3">{s.title}</h3>
                <p className="text-white/50 text-sm font-medium leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TARGET INDUSTRIES */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Target Industries
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] leading-tight">
              Built for industries where <span className="text-[#E61739]">agent errors are expensive.</span>
            </h2>
            <p className="text-[#86868b] text-lg font-medium mt-4 max-w-2xl">We specialize in six verticals where AI agent failures have real business consequences — from lost revenue to regulatory risk.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-3xl p-8 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 bg-[#E61739]/8 rounded-2xl flex items-center justify-center group-hover:bg-[#E61739]/15 transition-all">
                    <ind.icon size={22} className="text-[#E61739]" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-widest text-[#E61739] bg-[#E61739]/8 px-2.5 py-1 rounded-full">{ind.tag}</span>
                </div>
                <h3 className="text-lg font-black text-[#1D1D1F] mb-2">{ind.name}</h3>
                <p className="text-[#86868b] text-sm font-medium leading-relaxed">{ind.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONBOARDING TIMELINE */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Onboarding Timeline
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white leading-tight">
              From kickoff to <span className="text-[#E61739]">fully monitored in 7 days.</span>
            </h2>
            <p className="text-white/50 text-lg font-medium mt-4 max-w-2xl">We move fast. Most clients are fully operational within a week — and seeing their first optimizations in week two.</p>
          </div>
          <div className="relative">
            <div className="absolute top-0 bottom-0 left-[23px] w-px bg-gradient-to-b from-[#E61739]/40 via-[#E61739]/20 to-transparent md:hidden" />
            <div className="space-y-0">
              {TIMELINE.map((step, i) => (
                <div key={i} className="grid md:grid-cols-[180px_1fr] gap-0 md:gap-8 group">
                  <div className="flex md:justify-end items-start gap-4 md:gap-0 pb-8 md:pb-0">
                    <div className="w-12 h-12 rounded-full bg-[#E61739] text-white flex items-center justify-center font-black text-xs shrink-0 relative z-10 shadow-lg md:ml-auto">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="md:hidden">
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-0.5">{step.period}</div>
                      <h4 className="text-base font-black text-white">{step.title}</h4>
                      <p className="text-white/40 text-sm font-medium leading-relaxed mt-1">{step.desc}</p>
                    </div>
                  </div>
                  <div className="hidden md:block border-l border-white/8 pl-10 pb-10 group-last:border-l-0">
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">{step.period}</div>
                    <h4 className="text-lg font-black text-white mb-2">{step.title}</h4>
                    <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xl">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section className="py-24 bg-[#F5F5F7]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/15 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5">
              Pricing
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-[#1D1D1F] mb-3">Transparent tiers. No surprises.</h2>
            <p className="text-[#86868b] text-lg font-medium">3-month minimum · Average client lifetime: 18+ months</p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-stretch">
            {PRICING.map((plan, i) => (
              <div key={i} className={`rounded-3xl p-8 flex flex-col relative ${plan.featured ? 'bg-[#1D1D1F] border-2 border-[#E61739] shadow-2xl' : 'bg-white border border-slate-200 shadow-sm'}`}>
                {plan.featured && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#E61739] text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full whitespace-nowrap">Most Popular</div>
                )}
                <p className={`text-[10px] font-black uppercase tracking-widest mb-3 ${plan.featured ? 'text-white/40' : 'text-[#86868b]'}`}>{plan.name}</p>
                <div className="flex items-end gap-1 mb-1">
                  <span className={`text-4xl font-black ${plan.featured ? 'text-white' : 'text-[#1D1D1F]'}`}>{plan.price}</span>
                  <span className={`text-base font-bold mb-1 ${plan.featured ? 'text-white/40' : 'text-[#86868b]'}`}>{plan.period}</span>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`text-xs font-black uppercase tracking-widest ${plan.featured ? 'text-[#E61739]' : 'text-[#E61739]'}`}>{plan.agents}</span>
                  <span className={`text-xs font-medium ${plan.featured ? 'text-white/30' : 'text-[#86868b]'}`}>·</span>
                  <span className={`text-xs font-medium ${plan.featured ? 'text-white/30' : 'text-[#86868b]'}`}>{plan.setup}</span>
                </div>
                <p className={`text-sm font-medium mb-6 leading-relaxed ${plan.featured ? 'text-white/50' : 'text-[#86868b]'}`}>{plan.desc}</p>
                <div className={`border-t pt-6 mb-6 flex-grow ${plan.featured ? 'border-white/10' : 'border-slate-100'}`}>
                  <ul className="space-y-3">
                    {plan.features.map((f, fi) => (
                      <li key={fi} className={`flex items-start gap-3 text-sm font-semibold ${plan.featured ? 'text-white/70' : 'text-[#1D1D1F]/70'}`}>
                        <CheckCircle2 size={14} className="text-[#E61739] shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={() => setView('contact')}
                  className={`mt-auto w-full py-3.5 rounded-2xl font-bold text-sm transition-all ${plan.featured ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-lg' : 'bg-[#1D1D1F] text-white hover:bg-[#333]'}`}
                >
                  {plan.cta === 'Most Popular' ? 'Get Started' : plan.cta}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* Left — value prop */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6">
                Get Started
              </div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                Ready to stop worrying about your agents?
              </h2>
              <p className="text-white/50 text-lg font-medium leading-relaxed mb-10">
                Book a discovery call and we'll run a free AI Agent Health Check on your existing agents — no commitment required.
              </p>
              <div className="space-y-6">
                {[
                  { icon: Clock, title: '7-day onboarding', desc: 'Fully operational monitoring within one week of kickoff.' },
                  { icon: Bell, title: 'Drift alerts in 24 hrs', desc: 'We catch and flag agent degradation within a business day.' },
                  { icon: TrendingUp, title: 'Monthly scorecards', desc: 'Clear benchmarks, trend data, and a concrete action plan every month.' },
                ].map((pt, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-[#E61739]/15 rounded-xl flex items-center justify-center shrink-0">
                      <pt.icon size={18} className="text-[#E61739]" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm mb-0.5">{pt.title}</h4>
                      <p className="text-white/40 text-sm font-medium leading-relaxed">{pt.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — form */}
            <div className="bg-white/3 border border-white/8 rounded-3xl p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-500/15 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-2xl font-black text-white mb-3">We'll be in touch.</h3>
                  <p className="text-white/50 text-sm font-medium">Expect a response within one business day. We'll schedule your free AI Agent Health Check on the call.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-black text-white mb-6">Book a Discovery Call</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input required placeholder="First Name" value={form.firstName} onChange={e => setForm(f => ({ ...f, firstName: e.target.value }))} className={inp} />
                    <input required placeholder="Last Name" value={form.lastName} onChange={e => setForm(f => ({ ...f, lastName: e.target.value }))} className={inp} />
                  </div>
                  <input required type="email" placeholder="Work Email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inp} />
                  <input required placeholder="Company Name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className={inp} />
                  <input placeholder="Phone (optional)" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} className={inp} />
                  <select value={form.agents} onChange={e => setForm(f => ({ ...f, agents: e.target.value }))} className={`${inp} appearance-none`}>
                    <option value="">How many AI agents do you have?</option>
                    <option value="1-2">1–2 agents</option>
                    <option value="3-5">3–5 agents</option>
                    <option value="6-10">6–10 agents</option>
                    <option value="10+">10+ agents</option>
                    <option value="not-sure">Not sure yet</option>
                  </select>
                  <textarea rows={3} placeholder="Any context on your current AI setup (optional)" value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} className={`${inp} resize-none`} />
                  <Captcha ref={captchaRef} />
                  <button type="submit" className="w-full py-4 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all shadow-lg flex items-center justify-center gap-3 group">
                    Book My Discovery Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                  <p className="text-white/25 text-xs font-medium text-center">3-month minimum · Free AI Agent Health Check included</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
