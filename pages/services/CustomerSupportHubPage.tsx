
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, UserCheck, ClipboardCheck, Cpu, Workflow, CheckCircle2, Star, Target, Zap, Shield, BrainCircuit, Globe2, ShieldCheck, Award, TrendingDown, FileSearch, Calendar, BarChart3 } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_CX_HERO, IMG_CX_TEAM } from '../../data';

const INCLUDED = [
  'AI Agent Build & Config',
  'Email Automation',
  'Live Chat AI',
  'Voice Agent (Growth+)',
  'Escalation Routing Logic',
  'Human Backup CX Agent',
  'Brand Voice Training',
  'Knowledge Base Setup',
  'CSAT Reporting',
  'Monthly Optimization',
];

const INDUSTRY_TASKS: Record<string, string[]> = {
  ecommerce: [
    'Live chat support for order inquiries',
    'Email handling for shipping & delivery questions',
    'Returns and refund request processing',
    'Order status tracking and updates',
    'Product listing copywriting and optimization',
    'Customer review response management',
    'Cart abandonment email follow-ups',
    'Loyalty program enrollment and management',
  ],
  'software-dev': [
    'Technical support via chat and email',
    'Onboarding assistance for new users',
    'Bug report triage and ticket routing',
    'Knowledge base and help doc writing',
    'Subscription and billing inquiry handling',
    'Feature request logging and follow-up',
    'Customer success check-ins via video/email',
    'Churn prevention outreach',
  ],
  'property-mgmt': [
    'Tenant inquiry handling via email and chat',
    'Lease renewal coordination and follow-up',
    'Maintenance request intake and routing',
    'Virtual property tour scheduling',
    'Rental listing creation and posting',
    'Rent reminder and collections follow-up',
    'Tenant onboarding documentation support',
    'Vacancy marketing via digital channels',
  ],
  fintech: [
    'Customer onboarding support (KYC guidance)',
    'Account inquiry handling via chat and email',
    'Transaction dispute intake and triage',
    'Fraud alert follow-up communication',
    'Billing and fee inquiry resolution',
    'App and platform technical support',
    'Regulatory communication drafting',
    'Customer education on product features',
  ],
  healthcare: [
    'Appointment scheduling and reminders',
    'Insurance verification intake',
    'Medical billing inquiry support',
    'Patient intake form processing',
    'Telehealth session coordination',
    'Prescription refill request routing',
    'Patient follow-up after visits',
    'Health portal navigation assistance',
  ],
  'marketing-ad': [
    'Campaign performance reporting',
    'Social media content scheduling',
    'Ad copy drafting and revisions',
    'Email marketing campaign management',
    'Lead generation form management',
    'SEO content writing and optimization',
    'Influencer outreach coordination',
    'Client reporting and dashboard updates',
  ],
  retail: [
    'Online order support via chat and email',
    'Return and exchange request handling',
    'Product availability inquiry responses',
    'Customer review monitoring and replies',
    'Loyalty program support',
    'Gift card and promo code management',
    'Back-in-stock notification setup',
    'Customer complaint resolution via email',
  ],
  logistics: [
    'Shipment tracking inquiry handling',
    'Carrier coordination via email',
    'Delivery exception follow-up communication',
    'Customs documentation intake and support',
    'Freight quote request processing',
    'Supplier communication and follow-up',
    'Order discrepancy triage and resolution',
    'Logistics reporting and KPI updates',
  ],
  travel: [
    'Reservation booking and modification support',
    'Cancellation and refund request handling',
    'Guest pre-arrival communication',
    'Travel itinerary research and drafting',
    'Hotel and flight inquiry responses',
    'Loyalty points inquiry handling',
    'Post-stay review response management',
    'Travel documentation guidance (visas, requirements)',
  ],
  edtech: [
    'Student enrollment and onboarding support',
    'LMS navigation assistance',
    'Course progress follow-up communication',
    'Instructor scheduling and coordination',
    'Payment and subscription inquiry handling',
    'Content upload and course setup support',
    'Student feedback collection and reporting',
    'Certificate issuance and tracking',
  ],
  legal: [
    'Client intake form processing',
    'Document collection and organization',
    'Legal research assistance (non-advisory)',
    'Contract review scheduling coordination',
    'Deadline and calendar management',
    'Billing and invoice follow-up',
    'Case status update communication',
    'Legal transcription and summary drafting',
  ],
  insurance: [
    'Policy inquiry handling via chat and email',
    'Claims intake and initial documentation',
    'Renewal reminder communication',
    'Premium payment follow-up',
    'Coverage explanation support',
    'Policy change request intake',
    'Customer onboarding for new policies',
    'Claim status update communication',
  ],
  media: [
    'Subscriber inquiry and support handling',
    'Content scheduling and calendar management',
    'Proofreading and editorial support',
    'Social media audience engagement',
    'Advertiser communication and reporting',
    'Newsletter production and distribution',
    'Content performance reporting',
    'Rights and licensing inquiry intake',
  ],
  'consumer-tech': [
    'Product setup and troubleshooting support',
    'Warranty claim intake and processing',
    'App and software support via chat/email',
    'Product return and exchange coordination',
    'User manual and FAQ writing',
    'Customer feedback and review monitoring',
    'Firmware/update guidance communication',
    'Subscription and account management support',
  ],
  telecom: [
    'Plan and pricing inquiry handling',
    'Account change and upgrade processing',
    'Billing dispute intake and resolution',
    'Technical troubleshooting (Tier 1) via chat',
    'Service outage communication and updates',
    'Porting and number transfer support',
    'Contract renewal outreach',
    'Customer retention offer management',
  ],
  auto: [
    'Service appointment scheduling',
    'Recall and warranty inquiry handling',
    'Vehicle availability and pricing inquiries',
    'Financing inquiry intake and routing',
    'Customer follow-up after service visits',
    'Online lead response and qualification',
    'Parts availability inquiry support',
    'Post-purchase satisfaction follow-up',
  ],
  fashion: [
    'Order and shipping inquiry handling',
    'Size and fit guidance via chat/email',
    'Return and exchange request processing',
    'Product availability and restock updates',
    'Styling advice via digital channels',
    'Loyalty and rewards program support',
    'Customer review response management',
    'Influencer and PR outreach coordination',
  ],
  energy: [
    'Billing inquiry handling and dispute intake',
    'Service start/stop request processing',
    'Outage reporting intake and status updates',
    'Energy usage inquiry support',
    'Payment plan setup and follow-up',
    'Rebate and incentive program guidance',
    'Account update and transfer processing',
    'Renewable energy plan inquiry handling',
  ],
  'prof-services': [
    'Client intake and onboarding coordination',
    'Meeting and calendar scheduling',
    'Proposal and contract follow-up',
    'Invoice and billing inquiry handling',
    'Project status update communication',
    'Research and report drafting support',
    'CRM data entry and maintenance',
    'Client satisfaction survey follow-up',
  ],
  gov: [
    'Constituent inquiry handling via email/chat',
    'Public records request intake',
    'Permit and license application guidance',
    'Service availability and eligibility inquiries',
    'Complaint and feedback intake processing',
    'Document collection and verification support',
    'Grant inquiry and application assistance',
    'Public communication and announcement drafting',
  ],
};

export const CustomerSupportHubPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedInd, setSelectedInd] = useState({ id: 'ecommerce', name: 'Ecommerce' });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const handleForm = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true); };
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/25 focus:outline-none focus:border-[#E61739]/60 transition-colors";

  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'Customer Experience Operations | AI CX | KDCI';

    const setMeta = (name: string, content: string, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el); }
      el.setAttribute('content', content);
      return el;
    };

    const desc = 'We design, build, and manage AI-powered customer experience across email, chat, and voice with intelligent human escalation handled by Philippine CX specialists.';
    setMeta('description', desc);
    setMeta('og:title', 'Customer Experience Operations | KDCI', 'property');
    setMeta('og:description', desc, 'property');

    const ldId = 'ld-cx-ops';
    let ld = document.getElementById(ldId);
    if (!ld) { ld = document.createElement('script'); ld.id = ldId; (ld as HTMLScriptElement).type = 'application/ld+json'; document.head.appendChild(ld); }
    ld.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebPage', name: 'Customer Experience Operations', description: desc, url: 'https://kdci.co' });

    return () => { document.title = prevTitle; document.getElementById(ldId)?.remove(); };
  }, []);

  useEffect(() => {
    const els = document.querySelectorAll('.rec-reveal');
    const obs = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in-view'); obs.unobserve(e.target); } }),
      { threshold: 0.12 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <style>{`
        @keyframes pulseRingRec {
          0%, 100% { box-shadow: 0 0 0 0 rgba(230,23,57,0.45); }
          50%       { box-shadow: 0 0 0 14px rgba(230,23,57,0); }
        }
        .rec-reveal {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.62s cubic-bezier(0.22,1,0.36,1), transform 0.62s cubic-bezier(0.22,1,0.36,1);
        }
        .rec-reveal.in-view { opacity: 1; transform: translateY(0); }
        .rec-reveal.d1 { transition-delay: 0.1s; }
        .rec-reveal.d2 { transition-delay: 0.2s; }
        .rec-reveal.d3 { transition-delay: 0.3s; }
      `}</style>

      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-40">
        <div className="absolute inset-0 z-0">
          <img src={IMG_CX_HERO} alt="Customer experience operations" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30" />
          <div className="blob blob-purple opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Customer Experience Operations" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Customer Experience</span><br/>
            <span className="text-[#E61739]">Operations.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-14 px-4">
            We design, build, and manage your AI-powered customer experience — across email, chat, and voice — with intelligent human escalation handled by our Philippine CX specialists. You get enterprise-grade CX without an enterprise headcount.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-3xl font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Start CX Build <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setView('customer-support-v2')} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-3xl font-bold text-base hover:bg-white/10 transition-all backdrop-blur-md">
              View CX Hub →
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">Omnichannel</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Email · Chat · Voice</p></div>
            <div><div className="text-xl md:text-2xl font-black">AI + Human</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Escalation Layer</p></div>
            <div><div className="text-xl md:text-2xl font-black">Monthly</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Optimization Included</p></div>
            <div><div className="text-xl md:text-2xl font-black">Philippine</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">CX Specialists</p></div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="rec-reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 self-start">
                <Sparkles size={12} /> What We Deliver
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                AI agents built to <span className="text-[#E61739]">sound like you.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10" style={{ textWrap: 'balance' }}>
                End-to-end AI agent deployment configured to your brand voice, workflows, and escalation rules. We handle the technical build (agent training, API integrations, knowledge base setup), ongoing optimization, and staff the human escalation layer with trained CX agents who know your product cold. Monthly performance reviews included.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Cpu, text: 'AI agent training, prompt tuning, and deployment' },
                  { icon: Workflow, text: 'Brand voice, workflow, and escalation rule configuration' },
                  { icon: UserCheck, text: 'Human backup CX agents for seamless escalation' },
                  { icon: BarChart3, text: 'Monthly performance reviews and optimization' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-black/5 hover:border-black/10 hover:bg-white hover:shadow-sm transition-all">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#E61739]"><item.icon size={20} /></div>
                    <span className="text-sm font-semibold text-slate-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rec-reveal d2 relative">
              <div className="relative rounded-3xl aspect-[4/5] shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_CX_TEAM} alt="CX specialists" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
              </div>
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0"><Star size={22} className="text-white" /></div>
                  <div>
                    <div className="text-xl font-black text-slate-900">Enterprise-Grade CX</div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Without enterprise headcount</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-[#020202] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-3 gap-4">
            <div className="rec-reveal bg-[#E61739] rounded-3xl p-8 flex items-center gap-6" style={{ animation: 'pulseRingRec 2.8s ease-in-out 2s infinite' }}>
              <div className="shrink-0">
                <div className="text-[4.5rem] font-black text-white leading-none">AI</div>
                <div className="text-sm font-black text-white/70 uppercase tracking-widest -mt-1">Integrated</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
                  Competitors offer either the technology or the people — we offer both, fully integrated and managed.
                </p>
              </div>
            </div>

            <div className="rec-reveal d1 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0"><BrainCircuit size={20} className="text-[#E61739]" /></div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Faster Iteration</div>
                <h4 className="text-sm font-black text-white mb-1">In-house AI build capability</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Zero third-party markups, tighter customization, and quicker improvements than vanilla BPO or SaaS-only models.</p>
              </div>
            </div>

            <div className="rec-reveal d2 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0"><ShieldCheck size={20} className="text-[#E61739]" /></div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Human Escalation</div>
                <h4 className="text-sm font-black text-white mb-1">Philippine CX specialists</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Intelligent escalation handled by trained specialists who know your product and your customers cold.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-stretch">
            <div className="rec-reveal flex flex-col">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 self-start">
                <ClipboardCheck size={12} /> What's Included
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Everything you need.<br/><span className="text-[#E61739]">Nothing you don't.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-8">
                Everything needed to launch and run AI-powered CX — from build and deployment to reporting and continuous optimization.
              </p>
              <div className="bg-slate-50 border border-black/5 rounded-3xl p-8 flex-grow">
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 h-full content-start">
                  {INCLUDED.map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" />
                      <span className="text-sm font-semibold text-slate-600">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rec-reveal d2 relative h-full rounded-3xl shadow-2xl" style={{ overflow: 'hidden', minHeight: '480px' }}>
              <img src={IMG_CX_HERO} alt="CX operations process" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0"><Zap size={22} className="text-white" /></div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">24/7</div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Always-on CX coverage available</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rec-reveal text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Pricing Tiers.</h2>
            <p className="text-slate-500 text-lg font-medium">Structured for every stage of your CX needs.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">
            <div className="rec-reveal d1 bg-slate-900 rounded-3xl p-12 flex flex-col justify-between relative" style={{ animation: 'pulseRingRec 2.8s ease-in-out 2s infinite' }}>
              <div className="absolute top-8 right-8 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                Core
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">Core</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-white">$3,500</span>
                  <span className="text-white/40 text-sm font-black uppercase tracking-widest">/ mo</span>
                </div>
                <p className="text-white/50 text-sm font-medium mb-8">1 channel (email or chat) · up to 1,500 tickets/mo · AI-led with email escalation</p>
                <div className="border-t border-white/10 pt-8">
                  <ul className="space-y-3 mb-8">
                    {[
                      { icon: Cpu, text: 'AI agent build & configuration' },
                      { icon: FileSearch, text: 'Email automation and live chat AI' },
                      { icon: ShieldCheck, text: 'Escalation routing logic' },
                      { icon: BarChart3, text: 'CSAT reporting and monthly optimization' },
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70 font-medium">
                        <f.icon size={14} className="text-[#E61739] shrink-0" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex justify-between text-xs font-semibold text-white/40">
                    <span>Setup fee: $2,000</span>
                    <span>3-month minimum</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setView('contact')} className="mt-10 w-full py-5 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 group">
                Start Core Plan <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              <div className="rec-reveal d2 bg-white border border-black/[0.06] rounded-3xl p-10 flex flex-col flex-1 hover:shadow-xl transition-all">
                <div className="absolute top-0 right-0 m-6 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">★ Most Popular</div>
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">Growth</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-slate-900">$7,500</span>
                  <span className="text-slate-400 text-sm font-black uppercase tracking-widest">/ mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">Email + chat + voice · up to 5,000 interactions/mo · 1 dedicated CX agent · full escalation layer</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    'Email, chat, and voice channels',
                    'Dedicated CX agent included',
                    'Human escalation layer and optimized workflows',
                    'Monthly performance reviews',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-slate-400 font-semibold mb-4">Setup fee: $3,500 · 3-month minimum</div>
                <button onClick={() => setView('contact')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  Get a Quote
                </button>
              </div>

              <div className="rec-reveal d3 bg-white border border-black/[0.06] rounded-3xl p-10 flex flex-col flex-1 hover:shadow-xl transition-all">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">Enterprise</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-slate-900">$14,000<span className="text-3xl">+</span></span>
                  <span className="text-slate-400 text-sm font-black uppercase tracking-widest">/ mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">Omnichannel · unlimited volume · dedicated team (2–4 agents) · custom SLA · CX manager</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    'Omnichannel support and custom SLAs',
                    'Dedicated CX manager and 2–4 agents',
                    'Unlimited volume handling',
                    'Advanced optimization and reporting',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <div className="text-xs text-slate-400 font-semibold mb-4">Setup fee: Waived · 6-month minimum</div>
                <button onClick={() => setView('contact')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  Talk to Sales
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F9F9F9] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rec-reveal text-center mb-14">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Industry Specialization.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
              Our CX operations team supports customer experience programs across a wide range of industries — with playbooks built around your product, your customers, and your channel mix.
            </p>
          </div>
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            <div className="rec-reveal d1 bg-white rounded-3xl border border-black/5 p-3 shadow-sm">
              <div className="space-y-0.5 max-h-[520px] overflow-y-auto pr-1">
                {[
                  { id: 'ecommerce', name: 'E-commerce' },
                  { id: 'software-dev', name: 'SaaS & Software' },
                  { id: 'property-mgmt', name: 'Real Estate & Property Management' },
                  { id: 'fintech', name: 'Fintech' },
                  { id: 'healthcare', name: 'Healthcare Support' },
                  { id: 'marketing-ad', name: 'Marketing & Ad' },
                  { id: 'retail', name: 'Retail' },
                  { id: 'logistics', name: 'Logistics & Supply Chain' },
                  { id: 'travel', name: 'Travel & Hospitality' },
                  { id: 'edtech', name: 'EdTech' },
                  { id: 'legal', name: 'Legal Support' },
                  { id: 'insurance', name: 'Insurance' },
                  { id: 'media', name: 'Media & Publishing' },
                  { id: 'consumer-tech', name: 'Consumer Tech' },
                  { id: 'telecom', name: 'Telecommunications' },
                  { id: 'auto', name: 'Automotive' },
                  { id: 'fashion', name: 'Fashion & Apparel' },
                  { id: 'energy', name: 'Energy & Utilities' },
                  { id: 'prof-services', name: 'Professional Services' },
                  { id: 'gov', name: 'Government & Public Sector' },
                ].map((ind, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedInd(ind)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 ${
                      selectedInd.id === ind.id ? 'bg-[#E61739] text-white shadow-sm' : 'hover:bg-slate-50 text-slate-600'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full ${selectedInd.id === ind.id ? 'bg-white' : 'bg-[#E61739]'}`} />
                    <span className="text-sm font-semibold leading-tight">{ind.name}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rec-reveal d2 lg:col-span-2 bg-slate-900 rounded-3xl p-10 text-white min-h-[520px] flex flex-col">
              <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0 shadow-lg"><Target size={30} className="text-white" /></div>
                <div>
                  <h3 className="text-2xl font-black leading-tight">Channel + Vertical CX</h3>
                  <p className="text-white/40 text-xs font-black uppercase tracking-widest mt-1">Built for your support flow</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-grow content-start">
                {(INDUSTRY_TASKS[selectedInd.id] ?? []).slice(0, 6).map((role, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl px-5 py-4 border border-white/5">
                    <div className="w-7 h-7 bg-[#E61739]/20 rounded-lg flex items-center justify-center shrink-0">
                      <span className="text-[#E61739] text-xs font-black">0{idx + 1}</span>
                    </div>
                    <span className="text-sm font-semibold text-white leading-tight">{role}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between">
                <p className="text-white/30 text-xs font-medium">Select a vertical to tailor the CX model</p>
                <button onClick={() => setView('contact')} className="flex items-center gap-2 px-5 py-2.5 bg-[#E61739] rounded-2xl text-white text-sm font-bold hover:bg-[#c51431] transition-colors">
                  Build My CX <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="rec-reveal relative">
              <div className="bg-slate-100 rounded-3xl aspect-[4/5] relative shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_CX_TEAM} alt="CX operations advantage" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0"><TrendingDown size={22} className="text-white" /></div>
                    <div>
                      <div className="text-3xl font-black text-slate-900 mb-1">Faster</div>
                      <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Iterate in-house, not through vendors</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="rec-reveal d2">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-10 leading-tight">The CX Operations<br/><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-8">
                {[
                  { title: 'Built and managed in-house', desc: 'Zero third-party markups, faster iteration, and tighter customization than outsourced-only solutions.', icon: BrainCircuit },
                  { title: 'AI + human escalation', desc: 'Automation where it wins, skilled CX specialists where empathy and judgment matter.', icon: ShieldCheck },
                  { title: 'Brand-accurate CX', desc: 'We tune the system to your voice, workflows, and escalation rules — not a generic script.', icon: Workflow },
                  { title: 'Monthly optimization', desc: 'We keep improving the model with reporting, reviews, and ongoing refinement.', icon: BarChart3 },
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

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl relative border border-white/[0.07]" style={{ overflow: 'hidden' }}>
          <div className="absolute inset-0 z-0">
            <img src={IMG_CX_HERO} alt="CX team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80" />
          </div>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#E61739]/8 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">
            <div className="rec-reveal p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Star size={11} /> Let’s Build Your CX
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Launch with<br/><span className="text-[#E61739]">confidence.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm" style={{ textWrap: 'balance' }}>
                  Tell us your channels, workflows, and ticket volume — we’ll design the right CX model for you.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  { icon: CheckCircle2, text: 'AI agent deployment configured to your brand' },
                  { icon: CheckCircle2, text: 'Human escalation handled by Philippine CX specialists' },
                  { icon: CheckCircle2, text: 'Monthly optimization and performance reviews included' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <item.icon size={14} className="text-[#E61739] shrink-0" />
                    <span className="text-white/50 text-sm font-medium">{item.text}</span>
                  </div>
                ))}
                <div className="grid grid-cols-3 gap-4 pt-6 mt-2 border-t border-white/[0.07]">
                  {[{ val: '24/7', label: 'Coverage' }, { val: '3', label: 'Tiers' }, { val: '1', label: 'Partner' }].map((s, i) => (
                    <div key={i}>
                      <div className="text-xl font-black text-white mb-0.5">{s.val}</div>
                      <div className="text-[9px] text-white/25 font-black uppercase tracking-widest">{s.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rec-reveal d2 border-l border-white/[0.07] p-12 md:p-16 flex flex-col justify-center">
              {submitted ? (
                <div className="flex flex-col items-center justify-center text-center gap-5 py-12">
                  <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl"><CheckCircle2 size={30} className="text-white" /></div>
                  <h3 className="text-2xl font-black text-white">Message received!</h3>
                  <p className="text-white/50 text-sm font-medium max-w-xs" style={{ textWrap: 'balance' }}>
                    Our CX team will review your brief and get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleForm} className="space-y-4">
                  <h3 className="text-lg font-black text-white mb-6">Send us your CX brief</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Full Name</label>
                      <input required className={inp} placeholder="Jane Smith" />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Company</label>
                      <input required className={inp} placeholder="Acme Inc." />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Work Email</label>
                      <input required type="email" className={inp} placeholder="jane@company.com" />
                    </div>
                    <div>
                      <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Phone (optional)</label>
                      <input className={inp} placeholder="+1 555 000 0000" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Channels / Requirements</label>
                    <input required className={inp} placeholder="Email, chat, voice, SLA, ticket volume..." />
                  </div>
                  <div>
                    <label className="text-[10px] text-white/30 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                    <textarea rows={3} className={inp + ' resize-none'} placeholder="Brand voice, workflows, escalation rules, timeline..." />
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

      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="rec-reveal text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-5 border border-slate-100">
              <Shield size={11} /> FAQs
            </div>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Frequently asked questions.</h2>
          </div>
          <div className="rec-reveal d1 space-y-3">
            {[
              { q: 'Do you build the AI agents or just manage them?', a: 'We do both. KDCI designs, builds, configures, and manages the AI layer, then pairs it with trained CX specialists for human escalation and continuous optimization.' },
              { q: 'What channels do you support?', a: 'Email, live chat, and voice are available, with voice included in Growth and Enterprise plans.' },
              { q: 'What does the setup fee cover?', a: 'It covers agent build/configuration, brand voice training, knowledge base setup, integrations, routing logic, and launch support.' },
              { q: 'Can you work with our existing tools?', a: 'Yes — we integrate with your current CRM, help desk, knowledge base, and support stack.' },
              { q: 'How do you handle escalations?', a: 'AI handles first response and triage, then routes to a human backup CX agent when the issue needs empathy, judgment, or exception handling.' },
              { q: 'Do you offer monthly optimization?', a: 'Yes, monthly performance reviews and optimization are included in every plan.' },
              { q: 'Can Enterprise be customized?', a: 'Absolutely. We can tailor SLA, staffing levels, channel coverage, and reporting around your requirements.' },
              { q: 'How quickly can you launch?', a: 'Timing depends on scope, but smaller deployments can be launched quickly once your workflows and knowledge base are ready.' },
            ].map((item, i) => (
              <div key={i} className="border border-slate-100 rounded-2xl" style={{ overflow: 'hidden' }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between px-7 py-5 text-left hover:bg-slate-50 transition-colors">
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