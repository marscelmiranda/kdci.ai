
import React, { useState } from 'react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { Search, MapPin, Clock, ArrowRight, Filter, Briefcase, ChevronDown } from 'lucide-react';
import { IMG_REC_HERO } from '../data';

const JOBS = [
  // Engineering & AI
  { id: 1, title: "Senior AI Prompt Engineer", department: "AI & Data", location: "Manila (Hybrid)", type: "Full-time", tags: ["LLM", "Python", "NLP"], view: "job-prompt-engineer" },
  { id: 2, title: "Full-Stack Developer (React/Node)", department: "Engineering", location: "Remote", type: "Full-time", tags: ["TypeScript", "AWS", "SaaS"], view: "job-full-stack-dev" },
  { id: 3, title: "DevOps Architect", department: "Engineering", location: "Manila (On-site)", type: "Full-time", tags: ["Docker", "Kubernetes", "CI/CD"], view: "job-devops-architect" },
  { id: 4, title: "Data Scientist - Predictive Analytics", department: "AI & Data", location: "Remote", type: "Full-time", tags: ["SQL", "Python", "Tableau"], view: "job-data-scientist" },
  { id: 5, title: "QA Automation Lead", department: "Engineering", location: "Manila (Hybrid)", type: "Full-time", tags: ["Selenium", "Cypress", "Appium"], view: "job-qa-automation" },
  { id: 6, title: "Python Backend Developer", department: "Engineering", location: "Remote", type: "Full-time", tags: ["Django", "FastAPI", "Postgres"], view: "job-python-backend" },
  { id: 21, title: "Machine Learning Engineer", department: "AI & Data", location: "Remote", type: "Full-time", tags: ["TensorFlow", "PyTorch", "Model Ops"], view: "job-ml-engineer" },
  
  // Creative & Design
  { id: 7, title: "Senior UI/UX Designer", department: "Creative", location: "Manila (Hybrid)", type: "Full-time", tags: ["Figma", "Design Systems"], view: "job-ui-ux-designer" },
  { id: 8, title: "Motion Graphics Artist", department: "Creative", location: "Remote", type: "Full-time", tags: ["After Effects", "Cinema 4D"], view: "job-motion-graphics" },
  { id: 9, title: "Digital Art Director", department: "Creative", location: "Remote", type: "Full-time", tags: ["Branding", "Campaigns"], view: "job-art-director" },
  { id: 10, title: "Video Editor (Short Form)", department: "Creative", location: "Manila (On-site)", type: "Full-time", tags: ["Premiere", "Social Media"], view: "job-video-editor" },

  // Customer Experience & Ops
  { id: 11, title: "Customer Success Manager (SaaS)", department: "CX & Support", location: "Remote", type: "Full-time", tags: ["Retention", "Onboarding"], view: "job-customer-success" },
  { id: 12, title: "Tier 3 Technical Support Engineer", department: "CX & Support", location: "Manila (On-site)", type: "Full-time", tags: ["API", "Troubleshooting"], view: "job-tech-support" },
  { id: 13, title: "Operations Manager (E-commerce)", department: "Operations", location: "Manila (Hybrid)", type: "Full-time", tags: ["Shopify", "Logistics"], view: "job-ops-manager" },
  { id: 14, title: "Fraud Analyst (Fintech)", department: "Operations", location: "Manila (Secure Site)", type: "Full-time", tags: ["Risk", "Compliance"], view: "job-fraud-analyst" },
  { id: 15, title: "Workforce Management Analyst", department: "Operations", location: "Remote", type: "Full-time", tags: ["Forecasting", "Scheduling"], view: "job-wfm-analyst" },

  // Corporate & Growth
  { id: 16, title: "Solutions Architect", department: "Sales", location: "US (Remote)", type: "Full-time", tags: ["Pre-sales", "Technical"], view: "job-solutions-architect" },
  { id: 17, title: "Enterprise Account Executive", department: "Sales", location: "US (Remote)", type: "Full-time", tags: ["B2B", "Closing"], view: "job-account-executive" },
  { id: 18, title: "HR Business Partner", department: "Corporate", location: "Manila (On-site)", type: "Full-time", tags: ["People Ops", "Culture"], view: "job-hr-bp" },
  { id: 19, title: "Technical Recruiter", department: "Corporate", location: "Manila (Hybrid)", type: "Full-time", tags: ["Sourcing", "Tech"], view: "job-tech-recruiter" },
  { id: 20, title: "Finance Controller", department: "Corporate", location: "Manila (On-site)", type: "Full-time", tags: ["CPA", "Reporting"], view: "job-finance-controller" },
];

const CATEGORIES = ["All", "Engineering", "AI & Data", "Creative", "CX & Support", "Operations", "Sales", "Corporate"];
const LOCATIONS = ["All Locations", "Remote", "Manila (Hybrid)", "Manila (On-site)", "US (Remote)"];

export const CareersPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");

  const filteredJobs = JOBS.filter(job => {
    const matchesCategory = activeCategory === "All" || job.department === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesLocation = locationFilter === "All Locations" || job.location === locationFilter;
    
    return matchesCategory && matchesSearch && matchesLocation;
  });

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero Section (Replicated from AutoPage style) */}
      <section className={`relative bg-[#020202] overflow-hidden pt-48 pb-32 md:pb-40`}>
        <div className="absolute inset-0 z-0">
          <img src={IMG_REC_HERO} alt="Careers at KDCI" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Careers" />
          <h1 className="text-5xl md:text-8xl lg:text-9xl font-heading font-bold text-white mb-6 md:mb-10 tracking-tight leading-[0.95] drop-shadow-2xl">
            <span className="text-shine-white">Join the</span><br/>
            <span className="text-[#E61739]">Elite Intelligence.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg md:text-2xl text-white/60 font-medium leading-relaxed mb-10 md:mb-16 px-4">
            Build your career with the world's most innovative brands. We are looking for the top 1% of talent to drive the AGI revolution.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button onClick={() => {
              const el = document.getElementById('job-board');
              el?.scrollIntoView({ behavior: 'smooth' });
            }} className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group">
              View Open Roles <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">Top 1%</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Talent Only</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">Global</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Opportunities</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">Remote</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">First Culture</p>
            </div>
            <div className="text-center md:text-left">
              <div className="text-xl md:text-2xl font-black mb-1">Growth</div>
              <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Accelerated</p>
            </div>
          </div>
        </div>
      </section>

      {/* Filter & Tabs Bar */}
      <div id="job-board" className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-6 py-4">
          
          {/* Top Row: Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="text" 
                placeholder="Search roles, skills, or keywords..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white transition-all placeholder:text-slate-400"
              />
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative w-full md:w-auto">
                <select 
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full md:w-56 appearance-none pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 focus:border-[#E61739] focus:outline-none transition-all cursor-pointer"
                >
                  {LOCATIONS.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                </select>
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
              </div>
            </div>
          </div>

          {/* Bottom Row: Categories Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat 
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-lg' 
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Job Grid */}
      <section className="py-20 px-6 max-w-7xl mx-auto min-h-[60vh]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            {activeCategory === "All" ? "Latest Openings" : `${activeCategory} Roles`}
            <span className="ml-3 text-sm font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 align-middle">
              {filteredJobs.length} Available
            </span>
          </h2>
        </div>

        {filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                onClick={() => job.view ? setView(job.view as ViewType) : setView('contact')}
                className="group bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-[#E61739]/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                  <Briefcase size={100} className="text-[#E61739] transform translate-x-4 -translate-y-4" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="px-3 py-1 rounded-lg bg-slate-100 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
                      {job.department}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wide bg-slate-50 px-2 py-1 rounded-md">
                      <Clock size={12} /> {job.type}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#E61739] transition-colors pr-8">
                    {job.title}
                  </h3>

                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
                    <MapPin size={16} />
                    {job.location}
                  </div>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {job.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">Posted 2 days ago</span>
                    <button className="flex items-center gap-2 text-sm font-black text-slate-900 group-hover:text-[#E61739] uppercase tracking-widest transition-colors">
                      View Role <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
              <Filter size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No roles found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button 
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); setLocationFilter("All Locations"); }}
              className="mt-6 text-[#E61739] font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 px-6 py-20 md:p-24 text-center group">
           <div className="absolute inset-0 z-0">
              <img src={IMG_REC_HERO} alt="Careers Team" className="w-full h-full object-cover opacity-10 group-hover:opacity-20 transition-opacity duration-700" />
           </div>
           <div className="mesh-container opacity-20 pointer-events-none">
              <div className="blob blob-purple opacity-30"></div>
              <div className="blob blob-magenta opacity-30"></div>
           </div>
           <div className="relative z-10 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">Don't see <br/><span className="text-shine-red">your role?</span></h2>
              <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">We are always looking for exceptional talent. Submit a general application and we'll keep you on file for future elite pods.</p>
              <button onClick={() => setView('contact')} className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
                 Submit General Application <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </button>
           </div>
        </div>
      </section>
    </div>
  );
};
