
import React from 'react';
import { ViewType } from '../../types';
import { Breadcrumbs } from '../../components/Shared';
import { MapPin, Clock, BrainCircuit, Code, Upload, ArrowRight, CheckCircle2, Check, Zap, Target, Briefcase } from 'lucide-react';
import { JobData } from './jobsData';

interface JobPostProps extends JobData {
  setView: (v: ViewType) => void;
}

export const JobPost = ({ setView, title, department, location, type, description, description2, responsibilities, techStack, experience }: JobPostProps) => {
  
  // Determine icon based on department for a bit of flavor
  const getDeptIcon = () => {
    if (department.includes('AI')) return <BrainCircuit size={14} className="text-[#E61739]" />;
    if (department.includes('Engineering')) return <Code size={14} className="text-[#E61739]" />;
    if (department.includes('Creative')) return <Zap size={14} className="text-[#E61739]" />;
    return <Briefcase size={14} className="text-[#E61739]" />;
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7]">
      {/* Hero Section */}
      <section className="relative bg-[#020202] overflow-hidden pt-40 pb-20">
        <div className="mesh-container opacity-40">
           <div className="blob blob-magenta"></div>
           <div className="blob blob-purple"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs 
            setView={setView} 
            currentName={title} 
            parent={{ name: 'Careers', view: 'careers' }} 
          />
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight leading-[1.1]">
            {title.split(' ').slice(0, -2).join(' ')} <span className="text-[#E61739]">{title.split(' ').slice(-2).join(' ')}</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-8">
            Join the team building the future of intelligent operations.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-bold uppercase tracking-widest text-white/80">
            <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10"><MapPin size={14} className="text-[#E61739]" /> {location}</span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10"><Clock size={14} className="text-[#E61739]" /> {type}</span>
            <span className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full border border-white/10">{getDeptIcon()} {department}</span>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content (Left) */}
          <div className="lg:col-span-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <Target className="text-[#E61739]" /> The Role
              </h2>
              <p className="text-slate-500 leading-loose text-lg mb-6">
                {description}
              </p>
              {description2 && (
                <p className="text-slate-500 leading-loose text-lg">
                  {description2}
                </p>
              )}
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm mb-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Zap className="text-[#E61739]" /> Key Responsibilities
              </h2>
              <ul className="space-y-6">
                {responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-4 items-start">
                    <div className="w-6 h-6 rounded-full bg-[#E61739]/10 text-[#E61739] flex items-center justify-center shrink-0 mt-1">
                      <Check size={14} strokeWidth={3} />
                    </div>
                    <span className="text-slate-600 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-10 rounded-[2.5rem] border border-slate-200 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Code className="text-[#E61739]" /> Requirements
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Technical Stack</h4>
                  <ul className="space-y-3">
                    {techStack.map((req, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> {req}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest text-slate-400 mb-4">Core Experience</h4>
                  <ul className="space-y-3">
                    {experience.map((req, i) => (
                      <li key={i} className="flex items-center gap-3 text-slate-600 font-bold text-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div> {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Application (Right) */}
          <div className="lg:col-span-4 relative">
            <div className="sticky top-24">
              <div className="bg-[#1D1D1F] text-white p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
                <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-2">Apply Now</h3>
                  <p className="text-white/50 text-sm mb-8">Join the elite intelligence layer.</p>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Full Name</label>
                      <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">Email</label>
                      <input type="email" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2 block">LinkedIn / Portfolio</label>
                      <input type="text" className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold" />
                    </div>
                    
                    <div className="pt-4">
                      <div className="border border-dashed border-white/20 rounded-xl p-6 text-center hover:bg-white/5 transition-all cursor-pointer group">
                        <Upload size={24} className="mx-auto text-white/30 group-hover:text-[#E61739] mb-2 transition-colors" />
                        <div className="text-xs font-bold text-white/60">Upload Resume (PDF)</div>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-[#E61739] text-white rounded-xl font-bold mt-4 hover:bg-[#c51431] transition-all shadow-lg glow-red flex justify-center items-center gap-2">
                      Submit Application <ArrowRight size={16} />
                    </button>
                  </form>
                </div>
              </div>

              <div className="mt-8 p-6 bg-white border border-slate-200 rounded-[2rem]">
                <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Why KDCI?</h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> Top 1% salary compensation
                  </li>
                  <li className="flex gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> Remote-first culture
                  </li>
                  <li className="flex gap-3 text-sm font-medium text-slate-600">
                    <CheckCircle2 size={16} className="text-green-500 shrink-0" /> Access to cutting-edge AI tools
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
