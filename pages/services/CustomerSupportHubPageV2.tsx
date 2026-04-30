import React, { useState } from 'react';
import { ArrowRight, MessageSquare, BrainCircuit, Users, ShoppingCart, Code, Building, Landmark, HeartPulse, Megaphone, Truck, GraduationCap, Layers2, ScanSearch, UsersRound, Rocket, CheckCircle2, Settings2, ShieldCheck, Zap } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_CX_HERO, IMG_CX_TEAM } from '../../data';

export const CustomerSupportHubPageV2 = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [pricingModel, setPricingModel] = useState<'outcomes' | 'staff-aug'>('outcomes');

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
      metric: "1% of Top Talents"
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
          />
          
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-stretch mt-8">
            <div className="text-left flex flex-col justify-between py-2">
              <div>
                <h1 className="text-5xl md:text-7xl lg:text-7xl font-heading font-bold text-white mb-6 md:mb-8 tracking-tight leading-[1.1] drop-shadow-2xl">
                  <span className="text-shine-white">AI-Powered Efficiency.</span><br/>
                  <span className="text-[#E61739]">Human-Led Satisfaction.</span>
                </h1>
                <p className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-8">
                  Deploy AI agents to handle interactions at scale, with seamless escalation to human professionals. 
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
                <button onClick={() => setView('customer-support')} className="text-white/60 hover:text-white text-sm font-medium transition-colors underline underline-offset-4 mt-2 sm:mt-0 sm:ml-4">
                  View V1 (Centered Hero)
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
      </section>

      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Intelligent Infrastructure</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Modern CX Capabilities.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">Accelerate resolutions with AI-driven automation, backed by top-tier human talent for complex interactions.</p>
          </div>

          <div className="rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] overflow-hidden shadow-2xl mb-24">
            <div className="grid lg:grid-cols-2 items-stretch">
              <div className="relative min-h-[400px] lg:min-h-full">
                <img 
                  src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1774497557/Gemini_Generated_Image_sb3jjlsb3jjlsb3j_jkcjqa.png?auto=format&fit=crop&q=80&w=1000&h=1000" 
                  alt="Intelligent Infrastructure" 
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>
              </div>
              
              <div className="p-10 md:p-12 flex flex-col justify-between gap-10">
                {simplifiedCapabilities.map((cap, i) => {
                  const bigText = cap.metric.split(' ')[0];
                  const smallText = cap.metric.split(' ').slice(1).join(' ');
                  
                  return (
                    <div key={i} className="flex flex-col sm:flex-row gap-6 items-start">
                      <div className="w-24 h-24 shrink-0 rounded-2xl bg-[#1a1423] shadow-sm flex flex-col items-center justify-center text-center p-3">
                        <span className="text-2xl font-black text-[#E61739] leading-none mb-2">{bigText}</span>
                        <span className="text-[10px] font-bold text-[#FFFFFF] uppercase tracking-widest leading-tight">{smallText}</span>
                      </div>
                      <div className="pt-2">
                        <h3 className="text-2xl font-bold text-slate-900 mb-2">{cap.title}</h3>
                        <p className="text-slate-500 font-medium text-sm leading-relaxed">{cap.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-20 border-t border-slate-100">
            <div className="text-center mb-12">
               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-500 text-[9px] font-black uppercase tracking-widest mb-4">
                  <Layers2 size={12} /> Tech Ecosystem
               </div>
               <h3 className="text-2xl md:text-3xl font-heading font-bold text-slate-900">Your App Stack, Fully Managed.</h3>
               <p className="text-slate-400 mt-2 text-sm font-medium">Our agents are certified across the world's leading CX platforms.</p>
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
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Expertise by Vertical.</h2>
            <p className="text-xl text-slate-500 max-w-3xl mx-auto font-medium leading-relaxed">Our agents are trained in the specific toolsets and jargon of your industry vertical, ensuring seamless integration from day one.</p>
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
            <h2 className="text-4xl md:text-6xl font-heading font-bold mb-4">The Implementation Flow.</h2>
            <p className="text-white/40 text-xl max-w-3xl mx-auto font-medium leading-relaxed">From initial discovery to a fully managed 24/7 global operation in under 14 days.</p>
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

      {/* Featured Case Study */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl aspect-square lg:aspect-auto lg:h-[600px]">
              <img 
                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1000&h=1000" 
                alt="Customer Experience Case Study" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest mb-4 border border-white/20">
                  <Zap size={12} className="text-[#E61739]" /> E-Commerce Retailer
                </div>
                <h3 className="text-3xl font-bold text-white mb-2">Scaling Support During Peak Season</h3>
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Featured Case Study</div>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-slate-900 mb-6">How a Global E-Commerce Brand Achieved 99% CSAT.</h2>
              <p className="text-slate-500 text-lg font-medium leading-relaxed mb-10">
                Faced with a 300% surge in ticket volume during the holiday season, this leading retailer needed a rapidly scalable solution. We deployed a dedicated team of 50+ CX specialists integrated with their Zendesk instance in under 14 days.
              </p>
              
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-2">99%</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">CSAT Score</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-2">&lt; 2m</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">First Response Time</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-2">50+</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Agents Deployed</div>
                </div>
                <div>
                  <div className="text-4xl font-black text-slate-900 mb-2">14</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">Days to Launch</div>
                </div>
              </div>
              
              <button onClick={() => setView('case-studies')} className="inline-flex items-center gap-2 text-[#E61739] font-bold hover:gap-4 transition-all w-fit">
                Read Full Case Study <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Pricing Overview */}
      <section className="py-32 bg-[#F5F5F7] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Flexible CX Plans.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto mb-10">Pricing models that scale with your growth velocity.</p>
            
            {/* Toggle */}
            <div className="inline-flex bg-white p-1.5 rounded-full border border-slate-200 shadow-sm mb-12">
              <button 
                onClick={() => setPricingModel('outcomes')}
                className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                  pricingModel === 'outcomes' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                Outcomes
              </button>
              <button 
                onClick={() => setPricingModel('staff-aug')}
                className={`px-8 py-3 rounded-full text-sm font-black uppercase tracking-widest transition-all ${
                  pricingModel === 'staff-aug' 
                    ? 'bg-slate-900 text-white shadow-md' 
                    : 'text-slate-400 hover:text-slate-900'
                }`}
              >
                Staff Augmentation
              </button>
            </div>
          </div>

          {pricingModel === 'outcomes' ? (
            <div className="grid md:grid-cols-3 gap-6 items-start animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { 
                  name: "Business Hours Coverage", 
                  price: "$1,800", 
                  desc: "Standard 9-hour shift coverage, Mon-Fri.", 
                  features: ["Dedicated Agent", "SLA Compliance", "Weekly Reporting", "Native Tool Integration"], 
                  highlight: false 
                },
                { 
                  name: "24/7 Enterprise Hub", 
                  price: "Custom", 
                  desc: "Always-on global support pod.", 
                  features: ["Full 24/7 Roster", "Team Lead & QA", "Strategic CSAT Analysis", "Managed AI Layer"], 
                  highlight: true, 
                  badge: "Most Popular" 
                },
                { 
                  name: "AI Automation Suite", 
                  price: "$1,500", 
                  desc: "Deflection bots & self-service setup.", 
                  features: ["Automated Routing", "Tagging & Sentiment", "Performance Dashboards", "Agent Assist Activation"], 
                  highlight: false 
                }
              ].map((plan, i) => (
                <div key={i} className={`p-10 rounded-[3.5rem] relative transition-all ${plan.highlight ? 'bg-slate-900 text-white shadow-2xl scale-105 border-0' : 'bg-white border border-slate-100 shadow-sm hover:shadow-xl'}`}>
                  {plan.badge && (
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#E61739] text-white text-[10px] font-black uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-xl">
                      {plan.badge}
                    </div>
                  )}
                  <h4 className={`text-xl font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>{plan.name}</h4>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-4xl font-black">{plan.price}</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${plan.highlight ? 'text-white/40' : 'text-slate-400'}`}>{plan.highlight ? '/mo' : ''}</span>
                  </div>
                  <p className={`text-sm mb-8 font-medium ${plan.highlight ? 'text-white/50' : 'text-slate-500'}`}>{plan.desc}</p>
                  <ul className="space-y-3 mb-10">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm font-bold opacity-80">
                        <CheckCircle2 size={16} className="text-[#E61739]" /> {f}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setView('contact')} className={`w-full py-4 rounded-[2rem] font-bold text-lg transition-all ${plan.highlight ? 'bg-[#E61739] text-white hover:bg-[#c51431] shadow-xl' : 'bg-slate-900 text-white hover:bg-black'}`}>
                    Request CX Quote
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {[
                { role: "CX Specialist", price: "$1,600", focus: "General", focusIcon: Users, desc: "Handling tier 1 inquiries via email and chat." },
                { role: "Technical Support", price: "$2,000", focus: "Tech", focusIcon: Zap, desc: "Troubleshooting product issues and bugs." },
                { role: "Trust & Safety", price: "$1,900", focus: "Risk", focusIcon: ShieldCheck, desc: "Moderation and fraud prevention workflows." },
                { role: "Team Lead", price: "$2,500", focus: "Mgmt", focusIcon: UsersRound, desc: "Managing performance, QA, and coaching." }
              ].map((plan, i) => (
                <div key={i} className="bg-white p-8 rounded-[3rem] border border-black/[0.03] hover:shadow-2xl transition-all group flex flex-col">
                  <h4 className="text-lg font-bold text-slate-900 mb-1">{plan.role}</h4>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4 flex items-center gap-1.5"><plan.focusIcon size={12} />{plan.focus}</div>
                  <div className="flex items-baseline gap-1 mb-4">
                    <span className="text-3xl font-black text-slate-900">{plan.price}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">/ MONTH</span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed mb-10 flex-grow font-medium">{plan.desc}</p>
                  <button onClick={() => setView('contact')} className="w-full py-4 bg-slate-50 text-slate-900 rounded-2xl font-bold text-xs uppercase tracking-widest hover:bg-[#E61739] hover:text-white transition-all">Select Role</button>
                </div>
              ))}
            </div>
          )}
          
          <div className="mt-12 p-8 bg-white/60 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-300 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] shadow-sm"><Settings2 size={24} /></div>
                <div>
                   <h4 className="text-lg font-bold text-slate-900">Custom Squads?</h4>
                   <p className="text-sm text-slate-500 font-medium">Build a dedicated pod with Team Leads and QA Managers.</p>
                </div>
             </div>
             <button onClick={() => setView('contact')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">Request Custom Quote</button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img 
                src={IMG_CX_TEAM} 
                alt="KDCI CX Team" 
                className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
              />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-magenta opacity-30"></div>
              <div className="blob blob-purple opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Redefine your <br/><span className="text-shine-red">support legacy.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Book a strategy session with our CX leads and design a pod that actually converts.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Book Free CX Consultation <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
