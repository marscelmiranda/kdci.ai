
import React, { useState } from 'react';
import { Plus, Minus, Search, HelpCircle, MessageCircle, ArrowRight } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200&h=800";

const faqs = [
  {
    category: "Operational Model",
    questions: [
      { q: "How is KDCI different from a traditional BPO?", a: "Traditional BPOs focus on 'seat leasing'—renting you a body in a chair. KDCI is a managed intelligence partner. We provide the talent, but we also overlay our proprietary AI systems for QA, reporting, and workflow automation. You get outcomes, not just hours." },
      { q: "Do I manage the staff, or do you?", a: "We offer both models. In our 'Managed Pod' model, we provide a Team Lead and Project Manager who handle day-to-day oversight. In our 'Staff Augmentation' model, the talent reports directly to your managers, integrating into your Slack/Teams, while we handle HR and payroll." },
      { q: "What are your security protocols?", a: "We are SOC-2 ready and ISO 27001 certified. Our facilities use biometric access, clean-desk policies, and disabled USB ports. For sensitive data (Fintech/Healthcare), we deploy secure VDI environments and VPN tunnels." }
    ]
  },
  {
    category: "Pricing & Contracts",
    questions: [
      { q: "What is your pricing structure?", a: "We operate on a transparent monthly flat rate per role. This fee is all-inclusive: salary, benefits, equipment, office space, management layer, and our AI tech stack. No hidden setup fees." },
      { q: "Is there a long-term commitment?", a: "Our standard engagement is 6 months to ensure proper training and ramp-up, but we offer a 30-day pilot period for new clients to validate the model with zero risk." },
      { q: "How does billing work?", a: "We invoice monthly in USD via ACH or wire transfer. For larger enterprise pods, we can structure quarterly billing with volume discounts." }
    ]
  },
  {
    category: "Talent & Quality",
    questions: [
      { q: "Where is your talent located?", a: "Our primary operations hub is in Metro Manila, Philippines. This gives us access to a massive pool of English-proficient, college-educated talent with strong cultural alignment to Western markets." },
      { q: "How do you vet candidates?", a: "We accept less than 1% of applicants. Our process includes: 1) Language & Logic assessment, 2) Technical skills test (coding/design/writing), 3) Live interview with a domain expert, 4) Background check." }
    ]
  }
];

export const FaqPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [openIndex, setOpenIndex] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const toggle = (id: string) => {
    setOpenIndex(openIndex === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="FAQ" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Help Center" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Frequently Asked</span><br/>
            <span className="text-[#E61739]">Questions.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Everything you need to know about our operational models, pricing, and security protocols.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          
          {/* Search Bar */}
          <div className="mb-20 relative">
             <div className="relative shadow-xl rounded-2xl">
               <input 
                 type="text" 
                 placeholder="Search for answers..." 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full py-5 pl-14 pr-6 rounded-2xl bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-[#E61739]/10 focus:border-[#E61739] transition-all font-medium text-lg" 
               />
               <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
             </div>
          </div>

          {faqs.map((category, idx) => (
            <div key={idx} className="mb-16 last:mb-0">
              <h3 className="text-2xl font-heading font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">{category.category}</h3>
              <div className="space-y-4">
                {category.questions.filter(q => 
                  q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
                  q.a.toLowerCase().includes(searchQuery.toLowerCase())
                ).map((item, qIdx) => {
                  const id = `${idx}-${qIdx}`;
                  const isOpen = openIndex === id;
                  return (
                    <div key={id} className={`rounded-3xl transition-all duration-300 ${isOpen ? 'bg-[#F5F5F7]' : 'bg-white hover:bg-slate-50'}`}>
                      <button 
                        onClick={() => toggle(id)}
                        className="w-full text-left p-6 md:p-8 flex justify-between items-center gap-6"
                      >
                        <span className={`text-lg font-bold ${isOpen ? 'text-[#E61739]' : 'text-slate-900'}`}>{item.q}</span>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${isOpen ? 'bg-[#E61739] text-white' : 'bg-slate-200 text-slate-500'}`}>
                           {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                        </div>
                      </button>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="p-6 md:p-8 pt-0 text-slate-500 font-medium leading-relaxed">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img src={HERO_IMG} alt="Help Center Team" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Still have <br/><span className="text-shine-red">questions?</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">Can't find the answer you're looking for? Please chat to our friendly team.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Get in Touch <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
