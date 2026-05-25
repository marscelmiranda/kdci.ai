import React from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { LogOut, User, Bell, LayoutDashboard, Settings } from 'lucide-react';
import { logout } from '../lib/api';

interface Props {
  setView: (v: ViewType) => void;
  activeView: ViewType;
  user: { name: string; email: string; role: string } | null;
}

export const NavBar = ({ setView, activeView, user }: Props) => {
  const handleLogout = () => { logout(); setView('login'); };

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Logo isDarkHero={false} />
          <div className="h-6 w-px bg-slate-200" />
          <nav className="hidden sm:flex items-center gap-1">
            <button
              onClick={() => setView('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'dashboard' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <LayoutDashboard size={14} /> Dashboard
            </button>
            <button
              onClick={() => setView('settings')}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeView === 'settings' ? 'bg-slate-100 text-slate-900' : 'text-slate-400 hover:text-slate-700 hover:bg-slate-50'}`}
            >
              <Settings size={14} /> Settings
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-all">
            <Bell size={16} />
          </button>
          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-[#E61739] flex items-center justify-center">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[12px] font-bold text-slate-900 leading-none">{user?.name ?? 'Client'}</div>
              <div className="text-[10px] text-slate-400 font-medium mt-0.5">{user?.role ?? 'Partner'}</div>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-slate-400 hover:text-[#E61739] hover:bg-red-50 transition-all text-xs font-bold"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
