
import React, { useEffect, useMemo, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  Briefcase, FileText, BookOpen, 
  Image as ImageIcon, Bell, Search, LogOut,
  ChevronRight, Mail, Phone, Key, Edit3, Monitor, Moon, SunMedium, Settings2
} from 'lucide-react';
import { signOut } from '../authStore';

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  color: string;
  onClick: () => void;
}

const DashboardCard = ({ title, description, icon, actionText, color, onClick }: DashboardCardProps) => (
  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 flex flex-col h-full hover:bg-[#222] transition-all group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-20 ${color} opacity-5 blur-[80px] rounded-full pointer-events-none`}></div>
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 border border-white/5 group-hover:scale-110 group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-heading font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/50 text-sm mb-8 flex-grow leading-relaxed">
        {description}
      </p>
      <button 
        onClick={onClick}
        className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/60 hover:bg-[#E61739] hover:text-white hover:border-[#E61739] transition-all flex items-center justify-center gap-2"
      >
        <span className="group-hover:translate-x-1 transition-transform">{actionText}</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

export const PublisherDashboardPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeTab, setActiveTab] = useState('overview');
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

  const handleCreate = (type: string) => {
    if (type === 'Job Posting') {
      setView('cms-career-ops');
    } else if (type === 'Blog Post') {
      setView('cms-blog-ops');
    } else {
      alert(`This would open the ${type} creation modal/form.`);
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'careers') {
        setView('cms-career-ops');
    } else if (id === 'blog') {
        setView('cms-blog-ops');
    } else if (id === 'resources') {
        setView('cms-resources-ops');
    } else if (id === 'portfolio') {
        setView('cms-portfolio-ops');
    } else {
        setActiveTab(id);
    }
  };

  return (
    <div className={`min-h-screen flex font-sans transition-colors ${resolvedTheme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-slate-50 text-slate-900'}`}>
      
      {/* Sidebar Navigation */}
      <aside className={`w-72 shrink-0 border-r h-screen sticky top-0 flex flex-col ${resolvedTheme === 'dark' ? 'border-white/5 bg-[#0a0a0a]' : 'border-slate-200 bg-white'}`}>
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>

        <div className="flex-grow px-8 py-6 flex flex-col gap-6 overflow-y-auto">
          {/* Profile Photo & Basics */}
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

          {/* Contact Details */}
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

          {/* Actions */}
          <div className="mt-2 space-y-2">
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${resolvedTheme === 'dark' ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
              <Edit3 size={14} /> Edit Profile
            </button>
            <button className={`w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${resolvedTheme === 'dark' ? 'border-white/10 text-white/60 hover:text-white hover:bg-white/5' : 'border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'}`}>
              <Key size={14} /> Change Password
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={async () => { await signOut(); setView('login'); }} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-grow p-8 md:p-12 overflow-y-auto ${resolvedTheme === 'dark' ? 'bg-[#0a0a0a]' : 'bg-slate-50'}`}>
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className={`text-3xl font-heading font-bold mb-2 ${resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Welcome back, Editor.</h1>
            <p className={`text-sm font-medium ${resolvedTheme === 'dark' ? 'text-white/40' : 'text-slate-500'}`}>Manage your content pipeline and talent acquisition.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className={`absolute left-4 top-1/2 -translate-y-1/2 ${resolvedTheme === 'dark' ? 'text-white/30' : 'text-slate-400'}`} size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className={`rounded-full pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-[#E61739] transition-colors w-64 ${resolvedTheme === 'dark' ? 'bg-[#1a1a1a] border border-white/10 text-white' : 'bg-white border border-slate-200 text-slate-900'}`}
              />
            </div>
            <button className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${resolvedTheme === 'dark' ? 'bg-[#1a1a1a] border border-white/10 text-white/60 hover:text-white hover:border-white/30' : 'bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300'}`}>
              <Bell size={18} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E61739] to-purple-600 border-2 border-[#0a0a0a]"></div>
          </div>
        </header>

        <section className={`rounded-[2rem] p-6 mb-12 border ${resolvedTheme === 'dark' ? 'bg-[#121212] border-white/5' : 'bg-white border-slate-200 shadow-sm'}`}>
          <div className="flex items-center gap-3 mb-5">
            <Settings2 size={18} className="text-[#E61739]" />
            <div>
              <h2 className={`text-lg font-bold ${resolvedTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Publisher Settings</h2>
              <p className={`text-sm ${resolvedTheme === 'dark' ? 'text-white/45' : 'text-slate-500'}`}>Choose how the dashboard appears.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
        </section>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <DashboardCard 
            title="Career Ops" 
            description="Manage all open job requisitions, view active applicant pipelines, and publish new roles." 
            icon={<Briefcase size={24} />} 
            actionText="Manage Careers"
            color="bg-blue-600"
            onClick={() => handleNavClick('careers')}
          />
          <DashboardCard 
            title="Blogs" 
            description="Create, edit, and publish new articles, news, and insights to the main blog portal." 
            icon={<FileText size={24} />} 
            actionText="Manage Blogs"
            color="bg-purple-600"
            onClick={() => handleNavClick('blog')}
          />
          <DashboardCard 
            title="Resources" 
            description="Publish actionable ebooks, technical case studies, and engaging webinar materials." 
            icon={<BookOpen size={24} />} 
            actionText="Manage Resources"
            color="bg-green-600"
            onClick={() => handleNavClick('resources')}
          />
          <DashboardCard 
            title="Portfolio" 
            description="Showcase creative work, recent client deployments, and highly-visual case results." 
            icon={<ImageIcon size={24} />} 
            actionText="Manage Portfolio"
            color="bg-orange-600"
            onClick={() => handleNavClick('portfolio')}
          />
        </div>

      </main>
    </div>
  );
};
