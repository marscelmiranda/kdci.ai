
import React from 'react';
import { ArrowRight, Video, Calendar, Clock, Users, PlayCircle, Mic2, MonitorPlay } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=1200&h=800";

const upcomingWebinar = {
  title: "The Rise of Agentic AI: Transforming Operations in 2025",
  date: "October 24, 2024",
  time: "10:00 AM PST",
  speakers: ["Dr. Elena Vance, AI Strategy", "Marcus Jordon, VP Ops"],
  desc: "Join us for a deep dive into the next generation of AI agents that don't just chat, but execute complex workflows independently."
};

const pastWebinars = [
  {
    id: 1,
    title: "Scaling Engineering Teams: Offshore vs. Nearshore",
    date: "Sep 12, 2024",
    duration: "45 min",
    thumb: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 2,
    title: "CX Automation: Balancing Bots and Humans",
    date: "Aug 28, 2024",
    duration: "55 min",
    thumb: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 3,
    title: "Fintech Compliance in a Distributed World",
    date: "Jul 15, 2024",
    duration: "60 min",
    thumb: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=400"
  },
  {
    id: 4,
    title: "Building a 24/7 Global Brand Strategy",
    date: "Jun 30, 2024",
    duration: "40 min",
    thumb: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400"
  }
];

export const WebinarsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* 1. Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Webinars" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Webinars & Events" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Live</span><br/>
            <span className="text-[#E61739]">Sessions.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Expert discussions on the future of work, AI integration, and operational scaling.
          </p>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl group">
             <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
             <div className="relative z-10 flex flex-col lg:flex-row gap-16 items-center">
                <div className="lg:w-2/3">
                   <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E61739] text-white text-[10px] font-black uppercase tracking-widest mb-6 shadow-lg animate-pulse-slow">
                     <Video size={12} /> Upcoming Live Event
                   </div>
                   <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">{upcomingWebinar.title}</h2>
                   <p className="text-white/60 text-lg mb-10 font-medium leading-relaxed max-w-2xl">{upcomingWebinar.desc}</p>
                   
                   <div className="flex flex-wrap gap-8 text-white/80 text-sm font-bold uppercase tracking-widest mb-10">
                      <div className="flex items-center gap-3"><Calendar size={16} className="text-[#E61739]" /> {upcomingWebinar.date}</div>
                      <div className="flex items-center gap-3"><Clock size={16} className="text-[#E61739]" /> {upcomingWebinar.time}</div>
                   </div>
                   
                   <button onClick={() => setView('contact')} className="px-10 py-4 bg-white text-black rounded-2xl font-bold hover:bg-[#E61739] hover:text-white transition-all shadow-xl">
                      Reserve Your Spot
                   </button>
                </div>
                <div className="lg:w-1/3 w-full">
                   <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm">
                      <h4 className="text-white font-bold mb-6 flex items-center gap-2"><Mic2 size={18} className="text-[#E61739]" /> Speakers</h4>
                      <ul className="space-y-4">
                         {upcomingWebinar.speakers.map((speaker, i) => (
                            <li key={i} className="flex items-center gap-4">
                               <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">{speaker.charAt(0)}</div>
                               <span className="text-white/80 text-sm font-medium">{speaker}</span>
                            </li>
                         ))}
                      </ul>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
             <div>
                <h3 className="text-4xl font-heading font-bold text-slate-900 mb-4">Past Sessions</h3>
                <p className="text-slate-500 font-medium">Watch recordings of our previous deep dives.</p>
             </div>
             <button className="hidden md:flex items-center gap-2 text-[#E61739] font-bold uppercase tracking-widest text-xs hover:translate-x-1 transition-transform">View All <ArrowRight size={14} /></button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
             {pastWebinars.map((webinar) => (
                <div key={webinar.id} className="group cursor-pointer">
                   <div className="relative rounded-[2.5rem] overflow-hidden mb-6 aspect-video shadow-md">
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors z-10"></div>
                      <img src={webinar.thumb} alt={webinar.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                         <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:scale-110 transition-transform">
                            <PlayCircle size={32} fill="white" className="opacity-90" />
                         </div>
                      </div>
                      <div className="absolute bottom-6 right-6 z-20 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
                         <Clock size={12} /> {webinar.duration}
                      </div>
                   </div>
                   <div className="flex items-center gap-3 text-slate-400 text-[10px] font-black uppercase tracking-widest mb-2">
                      <Calendar size={12} /> {webinar.date}
                   </div>
                   <h4 className="text-xl font-bold text-slate-900 group-hover:text-[#E61739] transition-colors">{webinar.title}</h4>
                </div>
             ))}
          </div>
        </div>
      </section>
    </div>
  );
};
