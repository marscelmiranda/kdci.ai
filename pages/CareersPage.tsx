
import React, { useState, useEffect, useRef } from 'react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { Search, MapPin, Clock, ArrowRight, Briefcase, Loader2, ChevronDown, Plus, X } from 'lucide-react';
import { IMG_REC_HERO } from '../data';

interface ApiJob {
  id: number;
  title: string;
  slug: string;
  department: string;
  industry?: string | null;
  location: string;
  employment_type: string;
  experience_level: string | null;
  description: string | null;
  requirements: string | null;
  salary_range: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
}

export const CareersPage = ({ setView, onSelectJob }: { setView: (v: ViewType) => void; onSelectJob?: (id: number) => void }) => {
  const [jobs, setJobs] = useState<ApiJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const [activeIndustry, setActiveIndustry]     = useState('All');
  const [activeService, setActiveService]       = useState('All');
  const [activeLocation, setActiveLocation]     = useState('All');
  const [activeContract, setActiveContract]     = useState('All');
  const [openPanel, setOpenPanel] = useState<'industry' | 'service' | 'location' | 'contract' | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then(r => { if (!r.ok) throw new Error('Failed to load jobs'); return r.json(); })
      .then((data: ApiJob[]) => {
        setJobs(data.filter(j => j.status === 'active'));
        setLoading(false);
      })
      .catch(err => { setError(err.message); setLoading(false); });
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) {
        setOpenPanel(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const industries   = ['All', ...Array.from(new Set(jobs.map(j => j.industry).filter(Boolean) as string[])).sort()];
  const services     = ['All', ...Array.from(new Set(jobs.map(j => j.department))).sort()];
  const locations    = ['All', ...Array.from(new Set(jobs.map(j => j.location))).sort()];
  const contractTypes = ['All', ...Array.from(new Set(jobs.map(j => j.employment_type))).sort()];

  const filteredJobs = jobs.filter(job => {
    const matchesIndustry  = activeIndustry === 'All' || job.industry === activeIndustry;
    const matchesService   = activeService  === 'All' || job.department === activeService;
    const matchesLocation  = activeLocation === 'All' || job.location === activeLocation;
    const matchesContract  = activeContract === 'All' || job.employment_type === activeContract;
    const matchesSearch    = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             (job.description ?? '').toLowerCase().includes(searchQuery.toLowerCase());
    return matchesIndustry && matchesService && matchesLocation && matchesContract && matchesSearch;
  });

  const clearAll = () => {
    setActiveIndustry('All');
    setActiveService('All');
    setActiveLocation('All');
    setActiveContract('All');
    setSearchQuery('');
    setOpenPanel(null);
  };

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'Today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  };

  const industryLabel  = activeIndustry === 'All' ? 'Industry'      : activeIndustry;
  const serviceLabel   = activeService  === 'All' ? 'Service'       : activeService;
  const locationLabel  = activeLocation === 'All' ? 'Location'      : activeLocation;
  const contractLabel  = activeContract === 'All' ? 'Contract Type' : activeContract;

  const industryActive  = activeIndustry !== 'All';
  const serviceActive   = activeService  !== 'All';
  const locationActive  = activeLocation !== 'All';
  const contractActive  = activeContract !== 'All';

  const panelOptions: Record<string, string[]> = {
    industry: industries,
    service:  services,
    location: locations,
    contract: contractTypes,
  };
  const panelSetters: Record<string, (v: string) => void> = {
    industry: setActiveIndustry,
    service:  setActiveService,
    location: setActiveLocation,
    contract: setActiveContract,
  };
  const panelActives: Record<string, string> = {
    industry: activeIndustry,
    service:  activeService,
    location: activeLocation,
    contract: activeContract,
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">

      {/* ── COMPACT HERO ── */}
      <section className="relative bg-[#020202] overflow-hidden pt-36 pb-16">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-black/95 to-slate-900" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple opacity-30" />
          <div className="blob blob-magenta opacity-20" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Careers" />
          <div className="mt-6">
            <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
              <span className="text-shine-white">Join the</span>{' '}
              <span className="text-[#E61739]">Elite Intelligence.</span>
            </h1>
            <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
              Build your career with the world's most innovative brands. We're looking for the top 1% of talent to drive the AI revolution.
            </p>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── outside overflow-hidden so dropdown isn't clipped */}
      <div id="job-board" ref={filterRef} className="relative z-30 bg-white border-y border-slate-200 shadow-sm">

        {/* Search row */}
        <div className="max-w-7xl mx-auto px-8 pt-5 pb-4 border-b border-slate-100">
          <div className="relative max-w-lg">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Search roles, skills, or keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white focus:border-[#E61739]/40 transition-all placeholder:text-slate-400 outline-none"
            />
          </div>
        </div>

        {/* Four-column trigger row */}
        <div className="max-w-7xl mx-auto flex divide-x divide-slate-200">

          {/* Industry */}
          <button
            onClick={() => setOpenPanel(openPanel === 'industry' ? null : 'industry')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'industry' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {industryActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveIndustry('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${industryActive ? 'text-slate-900' : 'text-slate-500'}`}>{industryLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'industry' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>

          {/* Service */}
          <button
            onClick={() => setOpenPanel(openPanel === 'service' ? null : 'service')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'service' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {serviceActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveService('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${serviceActive ? 'text-slate-900' : 'text-slate-500'}`}>{serviceLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'service' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>

          {/* Location */}
          <button
            onClick={() => setOpenPanel(openPanel === 'location' ? null : 'location')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'location' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {locationActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveLocation('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${locationActive ? 'text-slate-900' : 'text-slate-500'}`}>{locationLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'location' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>

          {/* Contract Type */}
          <button
            onClick={() => setOpenPanel(openPanel === 'contract' ? null : 'contract')}
            className={`flex-1 flex items-center gap-3 px-8 py-5 transition-colors ${openPanel === 'contract' ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
          >
            {contractActive
              ? <X size={16} className="text-[#E61739] shrink-0" onClick={(e) => { e.stopPropagation(); setActiveContract('All'); setOpenPanel(null); }} />
              : <Plus size={16} className="text-slate-400 shrink-0" />
            }
            <span className={`text-sm font-bold uppercase tracking-widest ${contractActive ? 'text-slate-900' : 'text-slate-500'}`}>{contractLabel}</span>
            <ChevronDown size={14} className={`ml-auto transition-transform ${openPanel === 'contract' ? 'rotate-180 text-slate-700' : 'text-slate-400'}`} />
          </button>

        </div>

        {/* Dropdown panel */}
        {openPanel && (
          <div className="absolute left-0 right-0 bg-white border-t border-slate-200 shadow-xl px-8 py-6 z-50">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">
              {openPanel === 'industry' ? 'Filter by Industry' :
               openPanel === 'service'  ? 'Filter by Service'  :
               openPanel === 'location' ? 'Filter by Location' :
                                          'Filter by Contract Type'}
            </p>
            <div className="flex flex-wrap gap-3">
              {panelOptions[openPanel].map(opt => {
                const isActive = panelActives[openPanel] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => { panelSetters[openPanel](opt); setOpenPanel(null); }}
                    className={`px-5 py-2.5 text-sm font-bold uppercase tracking-widest border transition-all rounded-sm ${
                      isActive
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-slate-900 hover:text-slate-900'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── JOB GRID ── */}
      <section className="py-14 px-6 max-w-7xl mx-auto min-h-[60vh]">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">
            Open Roles
            {!loading && (
              <span className="ml-3 text-sm font-medium text-slate-400 bg-white px-3 py-1 rounded-full border border-slate-200 align-middle">
                {filteredJobs.length} Available
              </span>
            )}
          </h2>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <Loader2 size={40} className="animate-spin text-[#E61739] opacity-60" />
          </div>
        ) : error ? (
          <div className="text-center py-32">
            <p className="text-slate-500">Could not load job listings. Please try again later.</p>
          </div>
        ) : filteredJobs.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => onSelectJob ? onSelectJob(job.id) : setView('contact')}
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
                      <Clock size={12} /> {job.employment_type}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 group-hover:text-[#E61739] transition-colors pr-8">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-8">
                    <MapPin size={16} />
                    {job.location}
                  </div>
                  {job.experience_level && (
                    <div className="flex flex-wrap gap-2 mb-8">
                      <span className="px-3 py-1 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                        {job.experience_level}
                      </span>
                      {job.salary_range && (
                        <span className="px-3 py-1 border border-slate-100 rounded-full text-[10px] font-bold text-slate-500 uppercase tracking-wide">
                          {job.salary_range}
                        </span>
                      )}
                    </div>
                  )}
                  <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-400">
                      Posted {timeAgo(job.published_at ?? job.created_at)}
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
              <Briefcase size={40} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No roles found</h3>
            <p className="text-slate-500">Try adjusting your search or filters to find what you're looking for.</p>
            <button
              onClick={clearAll}
              className="mt-6 text-[#E61739] font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </section>

      {/* ── FINAL CTA ── */}
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
