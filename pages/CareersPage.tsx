import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { Search, MapPin, Clock, ArrowRight, Filter, Briefcase } from 'lucide-react';
import { IMG_REC_HERO } from '../data';
import { getJobs, type Job } from '../contentStore';

export const CareersPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [jobs, setJobs]                     = useState<Job[]>([]);
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    getJobs()
      .then(data => setJobs(data))
      .finally(() => setLoading(false));
  }, []);

  // Build dynamic lists from live data
  const departments = ["All", ...Array.from(new Set(jobs.map(j => j.department))).sort()];
  const locations   = ["All Locations", ...Array.from(new Set(jobs.map(j => j.location))).sort()];

  const filteredJobs = jobs.filter(job => {
    const matchesCategory = activeCategory === "All" || job.department === activeCategory;
    const matchesLocation = locationFilter === "All Locations" || job.location === locationFilter;
    const tags = job.tags ?? [];
    const matchesSearch   = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch && matchesLocation;
  });

  const handleJobClick = (job: Job) => {
    if (job.view_type) {
      setView(job.view_type as any);
    } else {
      setView('contact');
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden pt-48 pb-32 md:pb-40">
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
          <button onClick={() => document.getElementById('job-board')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-14 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-3 group mx-auto">
            View Open Roles <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white/5 border-t border-white/10 backdrop-blur-md py-8">
          <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-6 md:gap-x-20 lg:gap-x-28 items-center text-white">
            {[
              { v: 'Top 1%', l: 'Talent Only' },
              { v: 'Global', l: 'Opportunities' },
              { v: 'Remote', l: 'First Culture' },
              { v: loading ? '...' : String(jobs.length), l: 'Open Roles' },
            ].map((s, i) => (
              <div key={i} className="text-center md:text-left">
                <div className="text-xl md:text-2xl font-black mb-1">{s.v}</div>
                <p className="text-white/40 text-[9px] md:text-[10px] font-black uppercase tracking-widest">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div id="job-board" className="sticky top-[72px] z-30 bg-white/80 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input type="text" placeholder="Search roles, skills, or keywords..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-100 border-none rounded-2xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white transition-all placeholder:text-slate-400" />
            </div>
            <div className="relative">
              <select value={locationFilter} onChange={e => setLocationFilter(e.target.value)}
                className="appearance-none pl-4 pr-10 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-700 focus:outline-none focus:border-[#E61739]/50 cursor-pointer">
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
              <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
            </div>
          </div>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
            {departments.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                  activeCategory === cat
                    ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-lg'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                }`}>
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
              {loading ? '...' : `${filteredJobs.length} Available`}
            </span>
          </h2>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"/>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map(job => (
              <div key={job.id} onClick={() => handleJobClick(job)}
                className="group bg-white p-8 rounded-[2rem] border border-slate-200 hover:border-[#E61739]/30 hover:shadow-xl transition-all duration-300 relative overflow-hidden cursor-pointer">
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
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4">
                    <MapPin size={16} /> {job.location}
                  </div>
                  {job.salary && <div className="text-sm font-bold text-green-700 mb-4">💰 {job.salary}</div>}
                  {job.description && <p className="text-sm text-slate-500 mb-6 line-clamp-2">{job.description}</p>}
                  {job.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      {job.tags.slice(0, 4).map((tag: string) => (
                        <span key={tag} className="px-3 py-1 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      Posted {new Date(job.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
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
            <p className="text-slate-500">Try adjusting your search or filters.</p>
            <button onClick={() => { setActiveCategory("All"); setSearchQuery(""); setLocationFilter("All Locations"); }}
              className="mt-6 text-[#E61739] font-bold text-sm hover:underline">
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* Final CTA */}
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
            <h2 className="text-4xl md:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-tight">
              Don't see <br/><span className="text-shine-red">your role?</span>
            </h2>
            <p className="text-xl md:text-2xl text-white/60 mb-12 font-medium leading-relaxed">
              We are always looking for exceptional talent. Submit a general application and we'll keep you on file.
            </p>
            <button onClick={() => setView('contact')}
              className="px-14 py-6 bg-[#E61739] text-white rounded-[2rem] font-bold text-xl hover:bg-[#c51431] transition-all glow-red shadow-2xl flex items-center justify-center gap-4 group mx-auto">
              Submit General Application <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
