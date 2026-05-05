import React, { useEffect, useMemo, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { ArrowLeft, Edit3, LogOut, Mail, Monitor, Moon, Phone, Settings2, SunMedium } from 'lucide-react';
import { signOut } from '../authStore';

export const PublisherSettingsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(
    (localStorage.getItem('kdci-publisher-theme') as 'light' | 'dark' | 'system') || 'system'
  );

  const resolvedTheme = useMemo(() => {
    if (theme === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return theme;
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('kdci-publisher-theme', theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', resolvedTheme === 'dark');
    document.body.style.backgroundColor = resolvedTheme === 'dark' ? '#0a0a0a' : '#f8fafc';
    return () => {
      document.body.style.backgroundColor = '';
    };
  }, [resolvedTheme]);

  return (
    <div className={`min-h-screen flex font-sans transition-colors ${resolvedTheme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-slate-50 text-slate-900'}`}>
      <aside className={`w-72 shrink-0 border-r h-screen sticky top-0 flex flex-col ${resolvedTheme === 'dark' ? 'border-white/5 bg-[#0a0a0a]' : 'border-slate-200 bg-white'}`}>
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>

        <div className="flex-grow px-8 py-6 flex flex-col gap-6 overflow-y-auto">
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-24 h-24 rounded-full mb-4 overflow-hidden relative group border-2 ${resolvedTheme === 'dark' ? 'bg-[#1a1a1a] border-white/10' : 'bg-slate-100 border-slate-200'}`}>
              <img 
                src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1777595870/468598394_10162265374063293_2142667036521414352_n_krsqc5.jpg?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Edit3 size={16} className="text-white" />
              </div>
            </div>
            <h2 className={`text-lg font-bold text-center ${resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Marscel Cruz</h2>
            <p className="text-[#E61739] text-xs font-black uppercase tracking-widest mt-1">Operations Manager</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1.5 ${resolvedTheme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                <Mail size={12} /> Email Address
              </div>
              <div className={`text-sm font-medium ${resolvedTheme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>marscel@kdci.co</div>
            </div>
            <div>
              <div className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest mb-1.5 ${resolvedTheme === 'dark' ? 'text-white/40' : 'text-slate-400'}`}>
                <Phone size={12} /> Contact Number
              </div>
              <div className={`text-sm font-medium ${resolvedTheme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>+1 (555) 123-4567</div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-white/5 space-y-2">
          <button 
            onClick={() => setView('publisher-dashboard')} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={18} /> Back
          </button>
          <button 
            onClick={async () => { await signOut(); setView('login'); }} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className={`flex-grow p-8 md:p-12 overflow-y-auto ${resolvedTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className={`text-3xl font-heading font-bold mb-2 ${resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Publisher Settings</h1>
            <p className={`text-sm font-medium ${resolvedTheme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Manage theme, profile, password, and future account settings here.</p>
          </div>
        </header>

        <section className={`rounded-[2rem] p-6 border ${resolvedTheme === 'dark' ? 'bg-[#121212] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-3 mb-5">
            <Settings2 size={18} className="text-[#E61739]" />
            <div>
              <h2 className={`text-lg font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Publisher Settings</h2>
              <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-white/45' : 'text-slate-500'}`}>Choose how the dashboard appears.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
            {([
              { key: 'light', label: 'Light', icon: <SunMedium size={16} /> },
              { key: 'dark', label: 'Dark', icon: <Moon size={16} /> },
              { key: 'system', label: 'Default to Device', icon: <Monitor size={16} /> },
            ] as const).map(option => (
              <button
                key={option.key}
                onClick={() => setTheme(option.key)}
                className={`flex items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-bold border transition-all ${theme === option.key ? 'border-[#E61739] bg-[#E61739]/10 text-[#E61739]' : resolvedTheme === 'dark' ? 'border-white/10 bg-white/5 text-white/70 hover:text-white hover:bg-white/10' : 'border-slate-200 bg-slate-50 text-slate-600 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                {option.icon}
                {option.label}
              </button>
            ))}
          </div>

          <div className={`rounded-2xl border p-5 ${resolvedTheme === 'dark' ? 'border-white/5 bg-white/5' : 'border-slate-200 bg-slate-50'}`}>
            <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-white/60' : 'text-slate-600'}`}>More settings will be added here later:</p>
            <ul className={`mt-3 space-y-2 text-sm ${resolvedTheme === 'dark' ? 'text-white/80' : 'text-slate-700'}`}>
              <li>• Edit Profile</li>
              <li>• Change Password</li>
              <li>• Change Profile Photo</li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};
