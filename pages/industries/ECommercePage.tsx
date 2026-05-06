import React, { useState } from 'react';
import { ArrowRight, ShoppingCart, Package, Headphones, Megaphone, Layout, BrainCircuit, Target, Users2, BarChart3, Store, CheckCircle2, Shirt, Smartphone, Home, HeartPulse, Activity, Quote, Settings2, Users, Tags, FileText, BookOpen, Presentation } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_ECOM_HERO, IMG_ECOM_TEAM } from '../../data';

export const ECommercePage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [selectedService, setSelectedService] = useState(0);
  const [selectedVertical, setSelectedVertical] = useState(0);

  const services = [
    {
      title: 'Customer Experience Operations',
      icon: ShoppingCart,
      desc: 'Omnichannel support coverage for pre-sale, post-sale, and retention workflows.',
      tasks: ['Customer support rep', 'CX specialist', 'Chat/email agent', 'Escalation lead', 'Retention specialist', 'QA analyst'],
    },
    {
      title: 'Graphic Design Studio',
      icon: Layout,
      desc: 'Creative production support for storefronts, campaigns, and social assets.',
      tasks: ['Storefront creative direction', 'Product image enhancement', 'Ad creative production', 'Social content design', 'Brand system updates', 'Marketplace image QA'],
    },
    {
      title: 'Philippine Offshore Staffing',
      icon: Package,
      desc: 'Dedicated offshore team builds for e-commerce operations and back-office execution.',
      tasks: [],
    },
    {
      title: 'Global Recruitment Services',
      icon: Headphones,
      desc: 'International hiring support for specialist and leadership roles.',
      tasks: [],
    },
  ];

  const rolesByService = [
    ['CX Lead', 'Chat Support Agent', 'Email Support Agent', 'QA Analyst', 'Retention Specialist', 'Escalation Manager'],
    ['Graphic Designer', 'Layout Artist', 'Thumbnail Designer', 'Brand Designer', 'Motion Designer', 'Creative QA'],
    ['Operations Manager', 'E-commerce Coordinator', 'Order Specialist', 'Inventory Manager', 'Returns Coordinator', 'Customer Support Rep', 'Supply Chain Analyst', 'Logistics Assistant', 'Vendor Liaison', 'Fulfillment Assistant', 'Marketplace Specialist', 'QA Analyst'],
    ['Recruitment Lead', 'Talent Sourcer', 'Technical Recruiter', 'Account Manager', 'Interview Coordinator', 'Candidate Experience Specialist', 'Employer Branding Specialist', 'ATS Administrator', 'Compensation Analyst', 'Onboarding Specialist', 'Pipeline Analyst', 'Recruitment Ops Specialist'],
  ];

  const verticals = [
    { name: 'E-commerce', focus: ['Live chat support for order inquiries', 'Email handling for shipping & delivery questions', 'Returns and refund request processing', 'Order status tracking and updates', 'Product listing copywriting and optimization', 'Customer review response management'] },
    { name: 'SaaS & Software', focus: ['Technical support via chat and email', 'Onboarding assistance for new users', 'Bug report triage and ticket routing', 'Knowledge base and help doc writing', 'Subscription and billing inquiry handling', 'Feature request logging and follow-up'] },
    { name: 'Property Mgmt', focus: ['Tenant inquiry handling via email and chat', 'Lease renewal coordination and follow-up', 'Maintenance request intake and routing', 'Virtual property tour scheduling', 'Rental listing creation and posting', 'Rent reminder and collections follow-up'] },
    { name: 'FinTech', focus: ['Customer onboarding support', 'Account inquiry handling via chat and email', 'Transaction dispute intake and triage', 'Fraud alert follow-up communication', 'Billing and fee inquiry resolution', 'App and platform technical support'] },
  ];

  const insights = [
    { type: 'Case Study', title: 'Scaling to 500+ Agents: A Case Study in Fintech Support' },
    { type: 'Blog', title: 'The Future of CX: Moving Beyond Ticketing to Real-time Agency' },
    { type: 'Ebook', title: 'The 2024 AI Engineering Handbook' },
    { type: 'Webinar', title: 'Future of Customer Ops (Live Session)' },
  ];

  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-32 md:pb-40">
        <div className="absolute inset-0 z-0">
          <img src={IMG_ECOM_HERO} alt="AI-Managed E-commerce Operations" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta opacity-30"></div>
          <div className="blob blob-purple opacity-40"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="E-commerce Operations" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Scale Your</span><br />
            <span className="text-[#E61739]">Store Faster.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            End-to-end e-commerce management. We handle listing, support, and logistics using elite offshore talent and agentic AI systems.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Book a Strategy Call <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div><div className="text-xl md:text-2xl font-black">24/7</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Global Support</p></div>
            <div><div className="text-xl md:text-2xl font-black">40%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Efficiency Gain</p></div>
            <div><div className="text-xl md:text-2xl font-black">99.9%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">Listing Accuracy</p></div>
            <div><div className="text-xl md:text-2xl font-black">60%</div><p className="text-[10px] text-white/40 font-black uppercase tracking-widest">OpEx Reduction</p></div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">E-commerce Services</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Can Run For You.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">Four core services built from the same specialization patterns we use across our industry verticals.</p>
          </div>
          <div className="grid lg:grid-cols-2 gap-6">
            {services.map((service, i) => (
              <div key={i} className={`rounded-[3rem] border p-8 transition-all duration-500 ${selectedService === i ? 'bg-[#1D1D1F] border-[#E61739] shadow-2xl' : 'bg-[#F5F5F7] border-black/[0.03] hover:bg-white hover:shadow-2xl'}`}>
                <button onClick={() => setSelectedService(i)} className="w-full text-left flex items-start gap-5 mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${selectedService === i ? 'bg-[#E61739] text-white' : 'bg-white text-[#E61739]'}`}>
                    <service.icon size={28} />
                  </div>
                  <div>
                    <h3 className={`text-2xl font-bold mb-2 leading-tight ${selectedService === i ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                    <p className={`text-sm leading-6 font-medium ${selectedService === i ? 'text-white/60' : 'text-slate-500'}`}>{service.desc}</p>
                  </div>
                </button>
                <div className="grid md:grid-cols-2 gap-6">
                  {i < 2 && (
                    <div className={`p-5 rounded-2xl ${selectedService === i ? 'bg-white/5' : 'bg-white'} border ${selectedService === i ? 'border-white/10' : 'border-slate-100'}`}>
                      <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Service Focus</div>
                      <div className="space-y-2">
                        {(i === 1 ? services[i].tasks : verticals[selectedVertical].focus).map((task, idx) => (
                          <div key={idx} className={`flex items-center gap-2 text-xs font-bold ${selectedService === i ? 'text-white/50' : 'text-slate-400'}`}>
                            <CheckCircle2 size={12} className="text-[#E61739]" /> {task}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  <div className={`p-5 rounded-2xl ${selectedService === i ? 'bg-white/5' : 'bg-white'} border ${selectedService === i ? 'border-white/10' : 'border-slate-100'} ${i >= 2 ? 'md:col-span-2' : ''}`}>
                    <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Roles we can hire</div>
                    <div className={`grid ${i >= 2 ? 'grid-cols-2' : 'grid-cols-1'} gap-x-4 gap-y-2`}>
                      {rolesByService[i].map((role, idx) => (
                        <div key={idx} className={`flex items-center gap-2 text-xs font-semibold ${selectedService === i ? 'text-white/50' : 'text-slate-500'}`}>
                          <CheckCircle2 size={12} className="text-[#E61739]" /> {role}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {verticals.map((vertical, i) => (
              <button key={i} onClick={() => setSelectedVertical(i)} className={`rounded-2xl px-4 py-3 text-left border transition-all ${selectedVertical === i ? 'bg-[#E61739] text-white border-[#E61739]' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                <div className="text-[10px] font-black uppercase tracking-widest mb-1">Industry Vertical</div>
                <div className="text-sm font-bold">{vertical.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">The E-commerce <br /><span className="text-[#E61739]">Advantage.</span></h2>
              <div className="space-y-8">
                {[
                  { title: 'Built for high-volume retail', desc: 'We adapt to marketplace speed, SKU complexity, and changing customer demand.', icon: Store },
                  { title: 'Human + AI execution', desc: 'Automation where it helps, skilled operators where judgment matters.', icon: BrainCircuit },
                  { title: 'Lower ops friction', desc: 'Reduce handoffs across support, catalog, and order workflows.', icon: Target },
                  { title: 'Always-on coverage', desc: 'Scale support and ops without waiting on internal headcount.', icon: Users2 },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-white rounded-2xl shrink-0 flex items-center justify-center text-[#E61739] group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
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
            <div className="relative rounded-3xl aspect-[4/5] shadow-2xl overflow-hidden">
              <img src={IMG_ECOM_TEAM} alt="E-commerce team" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Insights</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Related Resources.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">Blogs, case studies, ebooks, and webinars that support your growth planning.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {insights.map((item, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-[#F5F5F7] border border-black/[0.03] hover:shadow-2xl transition-all">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] mb-6 shadow-sm">
                  {item.type === 'Blog' ? <FileText size={24} /> : item.type === 'Case Study' ? <Settings2 size={24} /> : item.type === 'Ebook' ? <BookOpen size={24} /> : <Presentation size={24} />}
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-3">{item.type}</div>
                <h3 className="text-xl font-bold text-slate-900 leading-tight">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto bg-[#0A0A0A] rounded-3xl relative border border-white/[0.07] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img src={IMG_ECOM_HERO} alt="E-commerce team" className="w-full h-full object-cover opacity-[0.06]" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A] via-[#0A0A0A]/95 to-[#0A0A0A]/80" />
          </div>
          <div className="relative z-10 grid lg:grid-cols-2 gap-0 items-stretch">
            <div className="p-12 md:p-16 flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
                  <Store size={11} /> E-commerce Vertical
                </div>
                <h2 className="text-5xl md:text-6xl font-heading font-bold text-white tracking-tight leading-[0.95] mb-6">
                  Launch with<br /><span className="text-[#E61739]">confidence.</span>
                </h2>
                <p className="text-white/45 text-base font-medium leading-relaxed max-w-sm" style={{ textWrap: 'balance' }}>
                  Tell us your catalog size, channels, and support workload — we’ll tailor the right operating model.
                </p>
              </div>
              <div className="space-y-4 mt-12">
                {[
                  'Catalog, support, and order workflows',
                  'Marketplace and storefront coverage',
                  'Custom AI + human escalation design',
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-white/70 text-sm font-medium">
                    <CheckCircle2 size={14} className="text-[#E61739]" /> {item}
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white p-10 md:p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Start Your E-commerce Project</h3>
              <p className="text-slate-500 mb-8">Tell us what you need and we’ll send a tailored plan.</p>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="Full name" />
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="Work email" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="Company" />
                  <input className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm" placeholder="Monthly order volume" />
                </div>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm min-h-[140px]" placeholder="Tell us about your store, channels, and support needs" />
                <button type="button" className="w-full py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all">
                  Request Proposal
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
