import React from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { LogOut, User, Bell } from 'lucide-react';
import { logout } from '../lib/api';

interface Props {
  setView: (v: ViewType) => void;
  user: { name: string; email: string; role: string } | null;
}

export const NavBar = ({ setView, user }: Props) => {
  const handleLogout = () => {
    logout();
    setView('login');
  };

  return (
    <header className="bg-[#0a0a0a] border-b border-white/[0.07] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left — logo */}
        <button onClick={() => setView('dashboard')} className="flex items-center">
          <Logo isDarkHero={true} />
        </button>

        {/* Right — actions */}
        <div className="flex items-center gap-3">
          <button className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all">
            <Bell size={15} />
          </button>

          <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10">
            <div className="w-7 h-7 rounded-lg bg-[#ad1457] flex items-center justify-center shrink-0">
              <User size={14} className="text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="text-[12px] font-bold text-white leading-none">{user?.name ?? 'Client'}</div>
              <div className="text-[10px] text-white/40 font-medium mt-0.5">{user?.role ?? 'Partner'}</div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/40 hover:text-[#E61739] hover:bg-[#ad1457]/10 transition-all text-xs font-bold"
          >
            <LogOut size={15} />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
};
