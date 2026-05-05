
import React, { useEffect } from 'react';
import { ArrowRight, Sparkles, Briefcase, UserCheck, ClipboardCheck, Cpu, Workflow, CheckCircle2, Star, Target, Zap, FileSearch, Calendar, Shield, Users, BarChart3 } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_CX_HERO, IMG_CX_TEAM } from '../../data';

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

export const CustomerSupportHubPage = ({ setView }: { setView: (v: ViewType) => void }) => {

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

      {/* ── Hero ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-40">
        <div className="absolute inset-0 z-0">
          <img src={IMG_CX_HERO} alt="KDCI Recruitment" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30" />
          <div className="blob blob-purple opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Recruitment & Talent" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">AI-Accelerated</span><br/>
            <span className="text-[#E61739]">Recruitment.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-14 px-4">
            Full-cycle sourcing, screening, and shortlisting for US companies hiring in the Philippines or building blended teams — faster and more cost-effective than any domestic recruiter.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-3xl font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Start Hiring <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => setView('customer-support-v2')} className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-3xl font-bold text-base hover:bg-white/10 transition-all backdrop-blur-md">
              View CX Hub →
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            {[
              { v: '5,000+', l: 'Hires Sourced' },
              { v: '14 Days', l: 'Avg. Time-to-Fill' },
              { v: '70%',     l: 'Typical Cost Savings' },
              { v: '90-Day', l: 'Replacement Guarantee' },
            ].map((s, i) => (
              <div key={i}>
                <div className="text-xl md:text-2xl font-black">{s.v}</div>
                <p className="text-[10px] text-white/40 font-black uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What We Deliver ── */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="rec-reveal">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-slate-100 self-start">
                <Sparkles size={12} /> What We Deliver
              </div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                From job brief<br/>to <span className="text-[#E61739]">signed offer.</span>
              </h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10" style={{ textWrap: 'balance' }}>
                Full-cycle recruitment using AI tools to source, screen, and score candidates at 3× the speed of traditional methods. Our recruiters are specialists in the Philippine talent market, with deep networks across design, tech, marketing, finance, and operations roles. Shortlists of 3–5 fully vetted candidates only.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Cpu,          text: 'AI-powered sourcing across 100k+ candidate profiles' },
                  { icon: UserCheck,    text: 'Specialists in Philippine talent market depth' },
                  { icon: Briefcase,    text: 'Deep networks in design, tech, marketing, finance & ops' },
                  { icon: ClipboardCheck, text: 'Shortlists of 3–5 fully vetted candidates, no filler' },
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

            <div className="rec-reveal d2 relative">
              <div className="relative rounded-3xl aspect-[4/5] shadow-2xl" style={{ overflow: 'hidden' }}>
                <img src={IMG_CX_HERO} alt="Recruitment team at work" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
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

      {/* ── Why It Commands a Premium ── */}
      <section className="py-12 bg-[#020202] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-3 gap-4">

            <div className="rec-reveal bg-[#E61739] rounded-3xl p-8 flex items-center gap-6" style={{ animation: 'pulseRingRec 2.8s ease-in-out 2s infinite' }}>
              <div className="shrink-0">
                <div className="text-[4.5rem] font-black text-white leading-none">90</div>
                <div className="text-sm font-black text-white/70 uppercase tracking-widest -mt-1">Day Guarantee</div>
              </div>
              <div className="border-l border-white/20 pl-6">
                <p className="text-white/80 text-sm font-medium leading-relaxed" style={{ textWrap: 'balance' }}>
                  We have skin in the game — re-sourced at zero cost if a hire doesn't work out. No fine print.
                </p>
              </div>
            </div>

            <div className="rec-reveal d1 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Target size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Flat Fee</div>
                <h4 className="text-sm font-black text-white mb-1">Not 15–25% of Salary</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>Skip the agency markup. One flat fee, backed by a placement guarantee.</p>
              </div>
            </div>

            <div className="rec-reveal d2 bg-white/5 border border-white/10 rounded-3xl p-8 flex items-center gap-5 hover:bg-white/8 transition-all">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
                <Workflow size={20} className="text-[#E61739]" />
              </div>
              <div>
                <div className="text-2xl font-black text-[#E61739] mb-0.5">Embedded</div>
                <h4 className="text-sm font-black text-white mb-1">RPO Function</h4>
                <p className="text-white/40 text-xs font-medium leading-relaxed" style={{ textWrap: 'balance' }}>For RPO retainer clients, we become an embedded talent function that knows your culture and hiring bar intimately.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── What's Included ── */}
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
                Every engagement includes our complete recruitment suite — from AI sourcing to offer management and beyond.
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
              <img src={IMG_CX_TEAM} alt="Recruitment vetting process" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 to-transparent" />
              <div className="absolute bottom-10 left-10 right-10 bg-white/95 backdrop-blur-xl p-7 rounded-3xl shadow-2xl border border-black/5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center shrink-0">
                    <Zap size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-3xl font-black text-slate-900 mb-1">3× Faster</div>
                    <p className="text-slate-500 text-xs font-black uppercase tracking-widest">Than traditional recruitment agencies</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rec-reveal text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Simple, Transparent Pricing.</h2>
            <p className="text-slate-500 text-lg font-medium">Structured for every stage of your hiring needs.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-6 items-stretch">

            {/* Featured — RPO Retainer */}
            <div className="rec-reveal d1 bg-slate-900 rounded-3xl p-12 flex flex-col justify-between relative" style={{ animation: 'pulseRingRec 2.8s ease-in-out 2s infinite' }}>
              <div className="absolute top-8 right-8 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
                ★ Best Value
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest mb-3">RPO Retainer</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-6xl font-black text-white">$3,500</span>
                  <span className="text-white/40 text-sm font-black uppercase tracking-widest">/ mo</span>
                </div>
                <p className="text-white/50 text-sm font-medium mb-8">Dedicated recruiter · up to 5 active roles/mo · priority sourcing · ATS management</p>
                <div className="border-t border-white/10 pt-8">
                  <ul className="space-y-3 mb-8">
                    {[
                      { icon: Users,       text: 'Dedicated recruiter, fully embedded' },
                      { icon: FileSearch,  text: 'Up to 5 active roles per month' },
                      { icon: Zap,         text: 'Priority sourcing & AI-accelerated pipeline' },
                      { icon: BarChart3,   text: 'ATS management & talent market reports' },
                      { icon: Calendar,    text: 'Interview scheduling & offer management' },
                      { icon: Shield,      text: '90-day replacement guarantee on every hire' },
                    ].map((f, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm text-white/70 font-medium">
                        <f.icon size={14} className="text-[#E61739] shrink-0" />
                        {f.text}
                      </li>
                    ))}
                  </ul>
                  <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-3 flex justify-between text-xs font-semibold text-white/40">
                    <span>Setup fee: $1,000</span>
                    <span>3-month minimum</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setView('contact')} className="mt-10 w-full py-5 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 group">
                Start RPO Engagement <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* Right — stacked: Per Placement + Enterprise */}
            <div className="flex flex-col gap-6">

              {/* Per Placement */}
              <div className="rec-reveal d2 bg-white border border-black/[0.06] rounded-3xl p-10 flex flex-col flex-1 hover:shadow-xl transition-all">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">Per Placement</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-slate-900">$1,800</span>
                  <span className="text-slate-400 text-sm font-black">–$3,500</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">Per successful hire · Junior to mid-level: $1,800 · Senior / specialist: $3,500 · No monthly commitment</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    'No setup fee — pay on successful hire only',
                    'Full sourcing, screening & shortlist of 3–5',
                    'Background check coordination included',
                    '90-day replacement guarantee',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setView('contact')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  Get a Quote
                </button>
              </div>

              {/* Enterprise RPO */}
              <div className="rec-reveal d3 bg-white border border-black/[0.06] rounded-3xl p-10 flex flex-col flex-1 hover:shadow-xl transition-all">
                <p className="text-slate-400 text-xs font-black uppercase tracking-widest mb-3">Enterprise RPO</p>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-5xl font-black text-slate-900">$6,000<span className="text-3xl">+</span></span>
                  <span className="text-slate-400 text-sm font-black uppercase tracking-widest">/ mo</span>
                </div>
                <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed">Full embedded talent function · unlimited roles · team of recruiters · employer branding support</p>
                <ul className="space-y-2.5 mb-8 flex-grow">
                  {[
                    'Unlimited active roles, no cap',
                    'Dedicated team of recruiters',
                    'Employer branding & candidate experience',
                    'Setup fee waived · 6-month minimum',
                  ].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                      <CheckCircle2 size={14} className="text-[#E61739] shrink-0" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setView('contact')} className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">
                  Talk to Sales
                </button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── Final CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
          <div className="absolute inset-0 z-0">
            <img src={IMG_CX_TEAM} alt="KDCI Recruitment Team" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
          </div>
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-magenta opacity-30" />
            <div className="blob blob-purple opacity-30" />
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">
              Build your team<br/><span className="text-shine-red">the smarter way.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">
              Book a discovery call with our recruitment leads and get your first shortlist in 5 business days.
            </p>
            <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
              Start Hiring Now <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
