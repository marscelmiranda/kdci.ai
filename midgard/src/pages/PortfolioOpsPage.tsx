import React from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  ChevronLeft, BookOpen, Plus, LogOut, Settings,
  LayoutGrid, Briefcase, FileText, Image as ImageIcon, Users, UserCircle2
} from 'lucide-react';

export const PortfolioOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('dashboard');
    else if (id === 'careers') setView('career-ops');
    else if (id === 'blog') setView('blog-ops');
    else if (id === 'resources') setView('resources-ops');
    else if (id === 'portfolio') setView('portfolio-ops');
    else if (id === 'admin') setView('admin-approvals');
    else if (id === 'profile') setView('profile');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">

      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-1">
          {[
            { id: 'overview',  label: 'Overview',           icon: LayoutGrid  },
            { id: 'careers',   label: 'Career Ops',         icon: Briefcase   },
            { id: 'blog',      label: 'Blogs & Insights',   icon: FileText    },
            { id: 'resources', label: 'Resources',          icon: BookOpen    },
            { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon   },
            { id: 'admin',     label: 'User Approvals',     icon: Users       },
            { id: 'profile',   label: 'My Profile',         icon: UserCircle2 },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.id === 'portfolio'
                  ? 'bg-[#E61739] text-white shadow-lg shadow-[#E61739]/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2">
            <Settings size={18} /> Settings
          </button>
          <button
            onClick={() => setView('login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
              <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
              <ChevronLeft size={10} className="rotate-180" />
              <span className="text-[#E61739]">Portfolio Ops</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">Manage Creative Portfolio</h1>
          </div>
          <button className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red">
            <Plus size={16} /> Create Entry
          </button>
        </div>

        <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-bold text-white mb-2">Portfolio Data</h2>
            <p className="text-white/40 mb-6 text-sm">Add and manage components on the Creative Portfolio layout.</p>
            <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
              Update Pages
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};
