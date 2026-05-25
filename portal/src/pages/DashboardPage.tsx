import React from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { LogOut, User, LayoutDashboard, FileText, MessageSquare, BarChart3, Settings, Bell } from 'lucide-react';
import { logout } from '../lib/api';

interface Props {
  setView: (v: ViewType) => void;
  user: { name: string; email: string; role: string } | null;
}

export const DashboardPage = ({ setView, user }: Props) => {
  const handleLogout = () => {
    logout();
    setView('login');
  };

  const cards = [
    { icon: FileText, label: 'Reports', desc: 'View your monthly performance reports and analytics.', color: 'bg-blue-50 text-blue-600', soon: true },
    { icon: MessageSquare, label: 'Messages', desc: 'Communicate directly with your KDCI account team.', color: 'bg-purple-50 text-purple-600', soon: true },
    { icon: BarChart3, label: 'Analytics', desc: 'Real-time KPIs, SLA performance, and team metrics.', color: 'bg-green-50 text-green-600', soon: true },
    { icon: Settings, label: 'Settings', desc: 'Manage your account preferences and integrations.', color: 'bg-slate-50 text-slate-600', soon: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top nav */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Logo isDarkHero={false} />
            <div className="h-6 w-px bg-slate-200 ml-1" />
            <span className="text-[11px] font-black uppercase tracking-[0.18em] text-slate-400">Client Portal</span>
          </div>
          <div className="flex items-center gap-4">
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

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* Welcome banner */}
        <div className="bg-[#020202] rounded-[2.5rem] px-10 py-10 mb-10 relative overflow-hidden">
          <div className="absolute top-[-60px] right-[-60px] w-[300px] h-[300px] bg-[#E61739]/20 rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-[-60px] left-[20%] w-[200px] h-[200px] bg-purple-600/15 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-4">
              <LayoutDashboard size={10} /> Dashboard
            </div>
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">
              Welcome back{user?.name ? `, ${user.name.split(' ')[0]}` : ''}.
            </h1>
            <p className="text-white/50 font-medium text-sm max-w-lg">
              Your KDCI Client Portal is active. Full feature access is coming soon — your account team will notify you when new modules are available.
            </p>
          </div>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {cards.map((card, i) => (
            <div key={i} className="bg-white rounded-[1.5rem] border border-slate-100 p-7 shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-200">
              <div className={`w-11 h-11 rounded-2xl ${card.color} flex items-center justify-center mb-5`}>
                <card.icon size={20} />
              </div>
              <h3 className="font-bold text-slate-900 text-[15px] mb-1">{card.label}</h3>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">{card.desc}</p>
              {card.soon && (
                <span className="absolute top-5 right-5 text-[9px] font-black uppercase tracking-widest bg-slate-100 text-slate-400 px-2.5 py-1 rounded-full">
                  Soon
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Support banner */}
        <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="w-12 h-12 rounded-2xl bg-[#E61739]/10 flex items-center justify-center shrink-0">
            <MessageSquare size={22} className="text-[#E61739]" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-slate-900 text-[15px] mb-1">Need help or have questions?</h3>
            <p className="text-slate-500 text-sm font-medium">Reach your dedicated KDCI account manager directly via email or phone.</p>
          </div>
          <a
            href="mailto:portal@kdci.co"
            className="shrink-0 px-6 py-3 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all"
          >
            Contact Support
          </a>
        </div>
      </main>
    </div>
  );
};
