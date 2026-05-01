
import React from 'react';
import { ArrowRight, Landmark, Users, FileText, Database, Calendar, ShieldCheck, Scale, Building2, Globe, Lock, BrainCircuit, CheckCircle2, Search, UserCheck, Handshake, Activity, Settings2, FileCheck, Phone } from 'lucide-react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { IMG_GOV_HERO as HERO_IMG, IMG_GOV_TEAM as TEAM_IMG } from '../../data';

export const GovPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className={`relative bg-[#020202] overflow-hidden pt-48 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Government Operations" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Public Sector" parent={{ name: 'Solutions', view: 'solutions-hub' }} />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Modernizing</span><br/>
            <span className="text-[#E61739]">Public Service.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Secure, scalable administrative and constituent support teams for government agencies and public sector contractors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => setView('contact')} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              Get Started <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* --- Stats Bar --- */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">ISO 27001</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Security Certified</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">50%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Backlog Reduction</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">24/7</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Citizen Support</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">99.5%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Data Accuracy</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Capabilities */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">GovTech Capabilities</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What We Do.</h2>
            <p className="text-slate-500 text-xl max-w-3xl mx-auto font-medium">Efficient, secure back-office and front-line support for public initiatives.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Users, title: "Constituent Services", desc: "Omnichannel 311 support, benefits inquiries, and public helpline management." },
              { icon: FileCheck, title: "Application Processing", desc: "Reviewing and digitizing license, permit, and grant applications." },
              { icon: Database, title: "Records Digitization", desc: "Converting paper archives to secure digital databases with metadata tagging." },
              { icon: Search, title: "Compliance Audits", desc: "Verifying documentation for regulatory adherence and program eligibility." },
              { icon: Calendar, title: "Scheduling Ops", desc: "Managing appointments for public offices, courts, and inspection services." },
              { icon: Globe, title: "Emergency Response", desc: "Surge capacity support teams for disaster relief and public health hotlines." }
            ].map((s, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 transition-transform">
                  <s.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{s.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">{s.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 p-10 rounded-[3rem] bg-slate-900 text-white flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden">
             <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
             <div className="relative z-10 w-16 h-16 shrink-0 bg-[#E61739] rounded-2xl flex items-center justify-center">
               <Lock size={32} />
             </div>
             <div className="relative z-10">
               <h4 className="text-2xl font-bold mb-2">Government-Grade Security</h4>
               <p className="text-white/60 font-medium">We operate dedicated clean rooms with restricted access, disabled USB ports, and full audit trails to protect sensitive citizen data.</p>
             </div>
          </div>
        </div>
      </section>

      {/* 3. Who We Help */}
      <section className="py-24 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-heading font-bold text-slate-900 mb-16">Who We Help.</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
             {[
               { icon: Building2, name: "Municipalities" },
               { icon: Landmark, name: "State Agencies" },
               { icon: Handshake, name: "Gov Contractors" },
               { icon: Scale, name: "Judicial Courts" },
               { icon: Globe, name: "Public Utilities" }
             ].map((type, i) => (
               <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center text-center group hover:border-[#E61739]/30 transition-all">
                  <type.icon size={32} className="text-slate-300 group-hover:text-[#E61739] transition-colors mb-4" />
                  <span className="text-[13px] font-bold text-slate-600 group-hover:text-slate-900">{type.name}</span>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* 4. How It Works */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Secure Deployment.</h2>
            <p className="text-slate-500 text-xl font-medium">Risk-managed scaling for public sector needs.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-[2.75rem] left-[10%] right-[10%] h-[1px] bg-slate-100"></div>
            {[
              { step: '01', title: 'Requirements', desc: 'Define security clearance levels and operational scope.', icon: FileText },
              { step: '02', title: 'Vetted Talent', desc: 'Staff undergo rigorous background checks and NBI clearance.', icon: UserCheck },
              { step: '03', title: 'Secure Ops', desc: 'Setup of VPNs, VDIs, and physical access controls.', icon: Lock },
              { step: '04', title: 'Oversight', desc: 'Real-time QA and daily reporting to agency stakeholders.', icon: Activity }
            ].map((s, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-14 h-14 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-slate-400 mb-8 group-hover:border-[#E61739] group-hover:text-[#E61739] transition-all">
                  <s.icon size={24} />
                </div>
                <div className="text-[#E61739] text-xs font-black uppercase tracking-widest mb-2">{s.step}</div>
                <h4 className="text-xl font-bold mb-2 text-slate-900">{s.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. AI-Managed Ops Layer */}
      <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
         <div className="mesh-container opacity-20"><div className="blob blob-purple"></div></div>
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-20 items-center">
               <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
                    <BrainCircuit size={12} /> The Intelligence Layer
                  </div>
                  <h2 className="text-4xl md:text-6xl font-heading font-bold mb-8 leading-tight">Civic Tech <br/><span className="text-[#E61739]">Accelerated.</span></h2>
                  <p className="text-xl text-white/40 mb-12 leading-relaxed font-medium">
                    Modernize legacy workflows without a complete IT overhaul. Our AI layer sits on top of your existing systems to speed up processing.
                  </p>
                  
                  <div className="space-y-8">
                     {[
                       { title: "Smart Triage", desc: "AI routes constituent emails and calls to the right department instantly." },
                       { title: "Automated Redaction", desc: "Protect PII in public records requests automatically." },
                       { title: "Form Validation", desc: "Pre-check applications for errors before a human reviews them." },
                       { title: "Sentiment Monitoring", desc: "Track public sentiment trends across support channels." }
                     ].map((feat, idx) => (
                       <div key={idx} className="flex gap-6">
                          <div className="w-10 h-10 shrink-0 bg-[#E61739]/20 rounded-xl flex items-center justify-center text-[#E61739] border border-[#E61739]/30">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                             <h4 className="text-lg font-bold mb-1">{feat.title}</h4>
                             <p className="text-sm text-white/40 font-medium">{feat.desc}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="relative">
                  <div className="bg-white/5 rounded-[4rem] p-12 border border-white/10 backdrop-blur-xl shadow-2xl">
                     <div className="space-y-6">
                        <div className="flex justify-between items-end">
                           <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                           <div className="h-8 w-20 bg-[#E61739]/40 rounded-lg"></div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
                           <div className="h-32 bg-white/5 rounded-3xl border border-white/5"></div>
                        </div>
                        <div className="h-48 bg-white/5 rounded-3xl border border-white/5"></div>
                     </div>
                  </div>
                  <div className="absolute -bottom-10 -right-10 bg-[#E61739] p-8 rounded-[3rem] shadow-2xl hidden md:block">
                     <div className="text-3xl font-black mb-1">50%</div>
                     <div className="text-[10px] font-black uppercase tracking-widest opacity-80">Faster Processing</div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* 6. Pricing Overview */}
      <section className="py-32 bg-[#F5F5F7] rounded-t-[5rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-4">Transparent Pricing.</h2>
            <p className="text-slate-500 text-xl font-medium">Cost-effective roles for public sector efficiency.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { role: "Case Manager", price: "$2,100", focus: "Quality", focusIcon: ShieldCheck, desc: "Managing constituent cases and benefits applications." },
              { role: "Data Entry Specialist", price: "$1,600", focus: "Speed", focusIcon: FileText, desc: "High-volume digitization of paper records and forms." },
              { role: "Constituent Liaison", price: "$1,800", focus: "Service", focusIcon: Phone, desc: "Handling inbound inquiries via phone, email, and chat." },
              { role: "Grant Admin", price: "$2,300", focus: "Detail", focusIcon: FileCheck, desc: "Supporting grant applications and compliance reporting." }
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
          
          <div className="mt-12 p-8 bg-white/60 backdrop-blur-md rounded-[3rem] border border-dashed border-slate-300 flex flex-col md:flex-row items-center justify-between gap-8">
             <div className="flex gap-6 items-center">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] shadow-sm"><Settings2 size={24} /></div>
                <div>
                   <h4 className="text-lg font-bold text-slate-900">Need an RFP Response?</h4>
                   <p className="text-sm text-slate-500 font-medium">Our team is experienced in government contracting and procurement cycles.</p>
                </div>
             </div>
             <button onClick={() => setView('contact')} className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm hover:bg-black transition-all">Contact Tender Team</button>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: ShieldCheck, title: "Data Sovereignty", desc: "Protocols ensuring data handling meets jurisdictional requirements." },
              { icon: UserCheck, title: "Public Trust", desc: "Staff trained in ethics and respectful constituent communication." },
              { icon: Globe, title: "Language Access", desc: "Multilingual support teams to serve diverse populations." },
              { icon: Activity, title: "Surge Ready", desc: "Rapidly scale up for tax season, elections, or emergency events." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 bg-[#F5F5F7] rounded-3xl flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
                  <item.icon size={32} />
                </div>
                <h4 className="text-lg font-bold text-[#1D1D1F] mb-3">{item.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img src={TEAM_IMG} alt="GovTech Team" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Better Service for <br/><span className="text-shine-red">Citizens.</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Book a consultation with our public sector operations specialists.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Request GovTech Consultation <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
