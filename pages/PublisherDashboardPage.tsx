
import React, { useEffect, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  Briefcase, FileText, BookOpen, Award,
  Image as ImageIcon, Bell, Search, LogOut,
  ChevronRight, Mail, Phone, Key, Edit3
} from 'lucide-react';

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

  // Isolate styles for the dashboard to keep the "dark mode app" feel
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const handleCreate = (type: string) => {
    if (type === 'Job Posting') {
      setView('cms-career-ops');
    } else if (type === 'Blog Post') {
      setView('cms-blog-ops');
    } else if (type === 'Case Study') {
      setView('cms-case-studies-ops');
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
    } else if (id === 'case-studies') {
        setView('cms-case-studies-ops');
    } else {
        setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      
      {/* Sidebar Navigation */}
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>

        <div className="flex-grow px-8 py-6 flex flex-col gap-6 overflow-y-auto">
          {/* Profile Photo & Basics */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border-2 border-white/10 mb-4 overflow-hidden relative group">
              <img 
                src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1777595870/468598394_10162265374063293_2142667036521414352_n_krsqc5.jpg?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
                <Edit3 size={16} className="text-white" />
              </div>
            </div>
            <h2 className="text-lg font-bold text-white text-center">Marscel Cruz</h2>
            <p className="text-[#E61739] text-xs font-black uppercase tracking-widest mt-1">Operations Manager</p>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-1.5">
                <Mail size={12} /> Email Address
              </div>
              <div className="text-sm font-medium text-white/80">marscel@kdci.co</div>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-1.5">
                <Phone size={12} /> Contact Number
              </div>
              <div className="text-sm font-medium text-white/80">+1 (555) 123-4567</div>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-2 space-y-2">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Edit3 size={14} /> Edit Profile
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Key size={14} /> Change Password
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button 
            onClick={() => setView('home')} 
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, Editor.</h1>
            <p className="text-white/40 text-sm font-medium">Manage your content pipeline and talent acquisition.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-[#1a1a1a] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E61739] transition-colors w-64"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
              <Bell size={18} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E61739] to-purple-600 border-2 border-[#0a0a0a]"></div>
          </div>
        </header>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
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
          <DashboardCard 
            title="Case Studies" 
            description="Build and publish structured client success stories with outcomes, metrics, and pull quotes." 
            icon={<Award size={24} />} 
            actionText="Manage Case Studies"
            color="bg-red-600"
            onClick={() => handleNavClick('case-studies')}
          />
        </div>

      </main>
    </div>
  );
};
