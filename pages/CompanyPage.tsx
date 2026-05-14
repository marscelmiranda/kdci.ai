
import React from 'react';
import { Lightbulb, Target, ShieldCheck, UsersRound, Globe, MapPin, Quote, UserCog, Zap as ZapBolt, LifeBuoy, ArrowRight, Globe as GlobeIcon, Cpu, Star, TrendingDown, BrainCircuit, Palette, HeartPulse, Code, ClipboardList } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { IMG_CX_TEAM, IMG_CX_TEAM2, IMG_DEV_TEAM } from '../data';

const STATS = [
  { value: '2011', label: 'Year Founded' },
  { value: 'Up to 70%', label: 'Savings vs. US Hiring' },
  { value: '300+', label: 'Team Members' },
  { value: '50+', label: 'Global Clients' },
];

const TESTIMONIALS = [
  {
    quote: "We have found KDCI to be a consistently reliable partner, always willing to 'go the extra mile' to ensure our valued customers receive the best possible service.",
    author: "Operations Director",
    company: "Global E-Commerce Brand",
  },
  {
    quote: "It's been five years since we started working with KDCI, and it just keeps getting better and better. We've grown together and achieved a lot of shared success. Overall, they're incredibly professional yet fun to work with.",
    author: "CEO",
    company: "Technology Scale-Up",
  },
  {
    quote: "KDCI seamlessly integrated into our workflows and culture. Their team felt like an extension of our own — not a vendor, but a true partner invested in our outcomes.",
    author: "VP of Product",
    company: "SaaS Company",
  },
];

export const CompanyPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">

      {/* 1. Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img
            src={IMG_CX_TEAM2}
            alt="KDCI Corporate Culture"
            className="w-full h-full object-cover opacity-20 grayscale object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-50">
          <div className="blob blob-magenta"></div>
          <div className="blob blob-purple"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Our Company" />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8">
            Trusted Offshore Partner Since 2011
          </div>
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.05]">
            <span className="text-shine-white">Your Trusted</span><br />
            <span className="text-[#E61739]">Offshore Partner.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl md:text-2xl text-white/60 font-medium leading-relaxed mb-12">
            Founded by seasoned executives with over 20 years of proven experience, KDCI empowers brands with the best people in creative design, customer service, back office support, software development, and offshore IT — now supercharged with AI.
          </p>
        </div>
      </section>

      {/* 2. Stats Bar */}
      <section className="bg-[#E61739] py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((stat, i) => (
            <div key={i}>
              <div className="text-3xl md:text-4xl font-heading font-black text-white mb-1">{stat.value}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Mission / Vision */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">

            <div className="bg-[#F5F5F7] p-10 md:p-14 rounded-[3rem] border border-black/[0.03] flex flex-col justify-center min-h-[400px]">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 border border-slate-100 w-fit">
                <Target size={12} /> Our Mission
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-slate-900 mb-6 leading-tight">
                To provide the best work through the continuous improvement of our people, process, and technology.
              </h2>
            </div>

            <div className="bg-[#1D1D1F] p-10 md:p-14 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group flex flex-col justify-center min-h-[400px]">
              <div className="mesh-container opacity-30 pointer-events-none"><div className="blob blob-purple"></div></div>
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-8 border border-white/10 w-fit">
                  <Lightbulb size={12} /> Our Vision
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                  To power the best companies in the world with the best teams.
                </h2>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Our Story / Evolution */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Our History</div>
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">The KDCI Story.</h2>
          <p className="text-slate-500 text-xl font-medium max-w-3xl mx-auto mb-16 leading-relaxed">
            Established by seasoned executives with over 20 years of proven experience, KDCI was built with one goal: empowering brands with the best people. From a focused founding team to a 300-strong global operation, our growth has always been driven by people, not just process.
          </p>
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-200 -translate-y-1/2"></div>
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { year: '2011', title: 'Founded', desc: 'Established with a mission to empower brands with the best offshore talent and expertise.' },
                { year: '2015', title: 'Service Expansion', desc: 'Expanded beyond creative work into customer service, back office support, and web development.' },
                { year: '2018', title: 'Rapid Growth', desc: 'Scaled to 20+ client accounts and 150+ team members across multiple service verticals.' },
                { year: '2025', title: 'AI-Powered Operations', desc: 'Serving 50+ global clients with 300+ specialists, now fully integrating AI into every workflow.' },
              ].map((milestone, idx) => (
                <div key={idx} className="relative z-10 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 hover:shadow-xl transition-all group">
                  <div className="w-14 h-7 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-[#E61739] mx-auto mb-6 group-hover:bg-[#E61739] group-hover:text-white transition-all font-black text-xs">
                    {milestone.year}
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2">{milestone.title}</h4>
                  <p className="text-sm text-slate-500 font-medium leading-relaxed">{milestone.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Core Service Areas */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">What We Do</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Skilled Professionals.<br/>Specialized Expertise.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
              KDCI takes pride in offering skilled professionals with specialized expertise that drives efficiency, innovation, and growth — now amplified by AI.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: UsersRound,
                title: "Customer Service & Support",
                desc: "Teams trained alongside AI-powered solutions, enhancing response times and handling complex queries with precision and empathy.",
              },
              {
                icon: Code,
                title: "Software Development",
                desc: "Experienced developers specializing in AI-driven applications to enterprise solutions, helping you scale efficiently while cutting costs.",
              },
              {
                icon: Palette,
                title: "Creative Production",
                desc: "Graphic designers, video editors, and content creators who leverage the latest AI tools to produce brand-grade work at speed.",
              },
              {
                icon: ClipboardList,
                title: "Back Office & Admin Support",
                desc: "Skilled virtual assistants, admin coordinators, and operations teams that reduce overhead while keeping your business running smoothly.",
              },
            ].map((svc, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 transition-transform">
                  <svc.icon size={28} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{svc.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{svc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. AI Enablement */}
      <section className="py-32 bg-[#1D1D1F] text-white relative overflow-hidden">
        <div className="mesh-container opacity-20"><div className="blob blob-magenta"></div><div className="blob blob-purple"></div></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10">
              <BrainCircuit size={12} /> AI-Enhanced Services
            </div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6">Human Expertise,<br /><span className="text-[#E61739]">Powered by AI.</span></h2>
            <p className="text-white/50 text-xl font-medium max-w-3xl mx-auto leading-relaxed">
              KDCI enables brands to streamline operations with offshore experts powered by AI. Our teams don't just use AI tools — they're trained to operate alongside them, amplifying output and accuracy across every function.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              {
                title: "AI-Assisted Design",
                desc: "Our creative teams use Midjourney, Adobe Firefly, and other generative tools to auto-generate graphics and basic design elements, freeing designers to focus on strategy and refinement.",
              },
              {
                title: "AI-Augmented Support",
                desc: "We develop and train chatbots with customer service experts ready to handle escalations. Our AI routing and sentiment tools integrate into your existing helpdesk stack.",
              },
              {
                title: "AI-Driven Marketing",
                desc: "We use AI to analyze data, personalize campaigns, and produce content tailored to your target audiences — delivering better results with faster turnaround times.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-all">
                <div className="w-10 h-10 bg-[#E61739]/20 rounded-xl flex items-center justify-center mb-6">
                  <BrainCircuit size={20} className="text-[#E61739]" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{item.title}</h3>
                <p className="text-white/50 font-medium leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div className="border-t border-white/10 pt-16">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10">
                <Cpu size={11} /> Tools Our Teams Use
              </div>
              <p className="text-white/40 text-sm font-medium">We keep our experts current with the latest AI and productivity technologies across every industry we serve.</p>
            </div>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
              {[
                { name: 'Midjourney', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/0/06/Midjourney_logo.svg', cat: 'Generative Art' },
                { name: 'Gemini', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/8f/Google-gemini-icon.svg', cat: 'Multimodal AI' },
                { name: 'ChatGPT', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/ChatGPT-Logo.svg', cat: 'LLM Reasoning' },
                { name: 'CoPilot', imgSrc: 'https://upload.wikimedia.org/wikipedia/en/a/aa/Microsoft_Copilot_Icon.svg', cat: 'Code Assist' },
                { name: 'Zapier', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Cib-zapier_%28CoreUI_Icons_v1.0.0%29.svg', cat: 'Automation' },
                { name: 'Claude', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Claude_AI_symbol.svg', cat: 'Long Context' },
                { name: 'Firefly', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Adobe_Firefly_Logo.svg', cat: 'Creative AI' },
                { name: 'HubSpot', imgSrc: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Cib-hubspot_%28CoreUI_Icons_v1.0.0%29.svg', cat: 'CRM & Sales' },
              ].map((tool, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center hover:bg-white/10 transition-all group">
                  <img src={tool.imgSrc} alt={tool.name} className="w-8 h-8 object-contain opacity-40 group-hover:opacity-80 transition-all grayscale group-hover:grayscale-0 mb-2" />
                  <div className="text-[10px] font-bold text-white/50 group-hover:text-white/80 transition-colors text-center">{tool.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. Core Values */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">The DNA</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">Our Core Values.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Principles that guide every team we build and every partnership we forge.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Lightbulb, title: "AI-First Thinking", desc: "We default to automation and AI assistance to unlock human creativity and strategic capacity." },
              { icon: Target, title: "Outcome Obsessed", desc: "We don't sell hours — we deliver business performance, efficiency, and measurable results." },
              { icon: ShieldCheck, title: "Radical Transparency", desc: "Open communication, regular updates, and real-time visibility into every team member's output." },
              { icon: UsersRound, title: "People First", desc: "We screen and hand-pick every team member for skills, expertise, and cultural compatibility." },
            ].map((value, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] mb-8 group-hover:scale-110 transition-transform">
                  <value.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4">{value.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Global Footprint */}
      <section className="py-32 bg-[#F5F5F7] border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.25em] mb-4">Our Location</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Global Roots,<br /><span className="text-[#E61739]">Philippine Excellence.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-12">
                KDCI operates with a distributed mindset — keeping strategy close to our clients while maintaining a world-class operational hub in Metro Manila.
              </p>
              <div className="space-y-8">
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] border border-slate-200 shrink-0 shadow-sm"><Globe size={20} /></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Client Base</h4>
                    <p className="text-slate-500 text-sm font-medium">Primarily serving US and European businesses with 50+ active global client accounts.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center text-white shrink-0 shadow-lg"><MapPin size={20} /></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">Philippine HQ</h4>
                    <p className="text-slate-500 text-sm font-medium">3008 One Corporate Centre, Julia Vargas Avenue, Ortigas Center, Pasig City 1605, Metro Manila, Philippines.</p>
                  </div>
                </div>
                <div className="flex gap-6 items-start">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#E61739] border border-slate-200 shrink-0 shadow-sm"><ZapBolt size={20} /></div>
                  <div>
                    <h4 className="text-lg font-bold text-slate-900 mb-1">24/7 Coverage</h4>
                    <p className="text-slate-500 text-sm font-medium">Our overlapping shift structure provides uninterrupted coverage across all major time zones.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-[4rem] p-12 border border-slate-100 shadow-xl">
              <div className="text-center mb-10">
                <GlobeIcon size={64} className="text-[#E61739] mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">Offshore Savings</h3>
                <p className="text-slate-500 text-sm font-medium mt-2">vs. equivalent US/EU hiring costs</p>
              </div>
              <div className="space-y-5">
                {[
                  { role: 'Customer Service Lead', saving: '65%' },
                  { role: 'Full-Stack Developer', saving: '72%' },
                  { role: 'Graphic Designer', saving: '68%' },
                  { role: 'Executive VA', saving: '70%' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-600">{item.role}</span>
                    <div className="flex items-center gap-3">
                      <div className="h-2 bg-slate-100 rounded-full w-28 overflow-hidden">
                        <div className="h-full bg-[#E61739] rounded-full" style={{ width: item.saving }}></div>
                      </div>
                      <span className="text-sm font-black text-[#E61739] w-10 text-right">{item.saving}</span>
                    </div>
                  </div>
                ))}
                <p className="text-[10px] text-slate-400 font-medium text-center pt-2 uppercase tracking-widest">Average savings across roles</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Client Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.2em] mb-4">Client Stories</div>
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-6">What Our Clients Say.</h2>
            <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">Built on long-term partnerships, not one-time transactions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="bg-[#F5F5F7] rounded-[2.5rem] p-10 border border-black/[0.03] flex flex-col">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} size={14} className="text-[#E61739] fill-[#E61739]" />
                  ))}
                </div>
                <Quote size={28} className="text-[#E61739] opacity-30 mb-4" />
                <p className="text-slate-700 font-medium leading-relaxed italic flex-1 mb-8">"{t.quote}"</p>
                <div className="border-t border-slate-200 pt-6">
                  <div className="font-bold text-slate-900 text-sm">{t.author}</div>
                  <div className="text-[#E61739] text-xs font-black uppercase tracking-widest mt-0.5">{t.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Leadership Culture */}
      <section className="py-32 bg-slate-50 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-slate-200 rounded-[4rem] aspect-[4/5] overflow-hidden relative shadow-2xl">
                <img src={IMG_DEV_TEAM} alt="KDCI Team" className="absolute inset-0 w-full h-full object-cover grayscale" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-12 left-12 right-12 bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl border border-white/50">
                  <Quote className="text-[#E61739] mb-4 opacity-50" size={32} />
                  <p className="text-xl font-heading font-bold text-slate-900 mb-2 italic">"The bench is deep."</p>
                  <p className="text-slate-500 text-sm font-medium">We vet for more than skills — we hire for leadership, curiosity, and cultural fit.</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="text-[#E61739] text-[10px] font-black uppercase tracking-[0.25em] mb-4">How We Build Teams</div>
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 mb-8 leading-tight">Elite Experts,<br />Not Just <span className="text-[#E61739]">Labor.</span></h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed mb-8">
                When building your team with KDCI, every member is screened and hand-picked to seamlessly integrate into your organization — possessing not just the necessary experience, but the qualities that make them the best fit for your culture.
              </p>
              <div className="space-y-6">
                {[
                  { icon: UserCog, title: "Skills & Domain Match", desc: "Every role is filled by a specialist with verified domain expertise, not generalists handed a script." },
                  { icon: ZapBolt, title: "Cultural Compatibility", desc: "Our screening process evaluates communication style, values alignment, and team fit alongside technical ability." },
                  { icon: LifeBuoy, title: "Ongoing Development", desc: "Continuous training keeps our teams current with the latest tools, AI technologies, and industry best practices." },
                ].map((feat, idx) => (
                  <div key={idx} className="flex gap-4 group">
                    <div className="w-10 h-10 shrink-0 bg-white rounded-xl flex items-center justify-center text-[#E61739] border border-slate-200 group-hover:bg-[#E61739] group-hover:text-white transition-all shadow-sm">
                      <feat.icon size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900">{feat.title}</h4>
                      <p className="text-sm text-slate-500 font-medium">{feat.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
          <div className="absolute inset-0 z-0">
            <img
              src={IMG_CX_TEAM}
              alt="KDCI Team"
              className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700"
            />
          </div>
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-purple opacity-30"></div>
            <div className="blob blob-magenta opacity-30"></div>
          </div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">
              Scale with a <br /><span className="text-shine-red">Partner, Not a BPO.</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-4 font-medium leading-relaxed">
              Reduce operational costs by up to 70% while gaining access to top-tier offshore talent — now powered by AI.
            </p>
            <p className="text-white/30 text-sm font-medium mb-12 uppercase tracking-widest">Trusted Since 2011 · 50+ Global Clients · 300+ Team Members</p>
            <button
              onClick={() => setView('contact')}
              className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto"
            >
              Partner with KDCI <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
