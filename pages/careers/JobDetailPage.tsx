
import React, { useState, useEffect } from 'react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import {
  MapPin, Clock, Briefcase, ChevronLeft, ArrowRight,
  Loader2, CheckCircle2, BrainCircuit, Code, Zap,
  DollarSign, GraduationCap, CalendarDays
} from 'lucide-react';

interface ApiJob {
  id: number;
  title: string;
  slug: string;
  department: string;
  location: string;
  employment_type: string;
  experience_level: string | null;
  description: string | null;
  responsibilities: string | null;
  requirements: string | null;
  salary_range: string | null;
  status: string;
  published_at: string | null;
  created_at: string;
}

const parseLines = (text: string): string[] =>
  text.split('\n').map(l => l.replace(/^[-•*]\s*/, '').trim()).filter(Boolean);

const Section = ({ title, content }: { title: string; content: string }) => {
  const lines = parseLines(content);
  const isBullet = lines.length > 1 || content.trim().startsWith('-') || content.trim().startsWith('•');
  return (
    <div className="mb-10">
      <h3 className="text-lg font-black text-slate-900 uppercase tracking-widest mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#E61739] rounded-full inline-block"></span>
        {title}
      </h3>
      {isBullet ? (
        <ul className="space-y-3">
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-3 text-slate-600 leading-relaxed">
              <CheckCircle2 size={16} className="text-[#E61739] mt-1 shrink-0" />
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{content.trim()}</p>
      )}
    </div>
  );
};

export const JobDetailPage = ({
  setView,
  jobId,
}: {
  setView: (v: ViewType) => void;
  jobId: number;
}) => {
  const [job, setJob] = useState<ApiJob | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then(r => { if (!r.ok) throw new Error('Job not found'); return r.json(); })
      .then(data => { setJob(data); setLoading(false); })
      .catch(err => { setError(err.message); setLoading(false); });
  }, [jobId]);

  const getDeptIcon = (dept: string) => {
    if (dept.includes('AI') || dept.includes('Data')) return <BrainCircuit size={14} className="text-[#E61739]" />;
    if (dept.includes('Eng')) return <Code size={14} className="text-[#E61739]" />;
    if (dept.includes('Creative')) return <Zap size={14} className="text-[#E61739]" />;
    return <Briefcase size={14} className="text-[#E61739]" />;
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

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center">
        <Loader2 size={48} className="animate-spin text-[#E61739] opacity-60" />
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-[#F5F5F7] flex flex-col items-center justify-center gap-4">
        <p className="text-slate-500 text-lg">This job listing could not be found.</p>
        <button onClick={() => setView('careers')} className="text-[#E61739] font-bold hover:underline">
          ← Back to Careers
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero */}
      <section className="relative bg-[#020202] overflow-hidden pt-40 pb-24">
        <div className="mesh-container opacity-40">
          <div className="blob blob-magenta"></div>
          <div className="blob blob-purple"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <Breadcrumbs
            setView={setView}
            currentName={job.title}
            parent={{ name: 'Careers', view: 'careers' }}
          />
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6">
              {getDeptIcon(job.department)}
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                {job.department}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-8 tracking-tight leading-[1.05]">
              {job.title.split(' ').slice(0, -2).join(' ')}{' '}
              <span className="text-[#E61739]">{job.title.split(' ').slice(-2).join(' ')}</span>
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-bold text-white/50">
              <span className="flex items-center gap-2">
                <MapPin size={15} className="text-[#E61739]" /> {job.location}
              </span>
              <span className="flex items-center gap-2">
                <Clock size={15} className="text-[#E61739]" /> {job.employment_type}
              </span>
              {job.experience_level && (
                <span className="flex items-center gap-2">
                  <GraduationCap size={15} className="text-[#E61739]" /> {job.experience_level}
                </span>
              )}
              {job.salary_range && (
                <span className="flex items-center gap-2">
                  <DollarSign size={15} className="text-[#E61739]" /> {job.salary_range}
                </span>
              )}
              <span className="flex items-center gap-2">
                <CalendarDays size={15} className="text-[#E61739]" />
                Posted {timeAgo(job.published_at ?? job.created_at)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm">
            {job.description && <Section title="About the Role" content={job.description} />}
            {job.responsibilities && <Section title="Key Responsibilities" content={job.responsibilities} />}
            {job.requirements && <Section title="Requirements" content={job.requirements} />}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Facts */}
          <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-6">Role Details</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Briefcase size={16} className="text-[#E61739] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Department</p>
                  <p className="text-sm font-bold text-slate-900">{job.department}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[#E61739] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Location</p>
                  <p className="text-sm font-bold text-slate-900">{job.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock size={16} className="text-[#E61739] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Employment Type</p>
                  <p className="text-sm font-bold text-slate-900">{job.employment_type}</p>
                </div>
              </div>
              {job.experience_level && (
                <div className="flex items-start gap-3">
                  <GraduationCap size={16} className="text-[#E61739] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Experience Level</p>
                    <p className="text-sm font-bold text-slate-900">{job.experience_level}</p>
                  </div>
                </div>
              )}
              {job.salary_range && (
                <div className="flex items-start gap-3">
                  <DollarSign size={16} className="text-[#E61739] mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Salary Range</p>
                    <p className="text-sm font-bold text-slate-900">{job.salary_range}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Apply CTA */}
          <div className="bg-[#020202] rounded-[2rem] p-8 border border-white/5 text-center">
            <h3 className="text-xl font-bold text-white mb-3">Ready to Apply?</h3>
            <p className="text-white/50 text-sm mb-6 leading-relaxed">
              Join the top 1% of global talent driving the future of intelligent operations.
            </p>
            <button
              onClick={() => setView('contact')}
              className="w-full px-6 py-4 bg-[#E61739] text-white rounded-2xl font-bold text-sm hover:bg-[#c51431] transition-all glow-red flex items-center justify-center gap-2 group"
            >
              Apply Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setView('careers')}
              className="mt-3 w-full px-6 py-3 text-white/40 hover:text-white text-sm font-bold transition-colors flex items-center justify-center gap-2"
            >
              <ChevronLeft size={14} /> View All Openings
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
