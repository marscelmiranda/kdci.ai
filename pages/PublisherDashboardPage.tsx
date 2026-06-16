
import React, { useEffect, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  Briefcase, FileText, BookOpen, Award,
  Image as ImageIcon, Bell, Search, LogOut,
  ChevronRight, Mail, Phone, Key, Edit3, Menu, X
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  // Lock body scroll when sidebar drawer is open on mobile
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isSidebarOpen]);

  const closeSidebar = () => setIsSidebarOpen(false);

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
    closeSidebar();
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

  const SidebarContent = () => (
    <>
      <div className="p-6 pb-4 flex items-center justify-between">
        <div>
          <button onClick={() => { closeSidebar(); setView('home'); }} className="block hover:opacity-80 transition-opacity" title="Back to website">
            <Logo isDarkHero={true} />
          </button>
          <div className="mt-3 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>
        {/* Close button — mobile only */}
        <button
          onClick={closeSidebar}
          className="md:hidden w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Close sidebar"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-grow px-6 py-4 flex flex-col gap-6 overflow-y-auto">
        {/* Profile */}
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border-2 border-white/10 mb-4 overflow-hidden relative group">
            <img loading="lazy"
              src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1777595870/468598394_10162265374063293_2142667036521414352_n_krsqc5.jpg?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer">
              <Edit3 size={16} className="text-white" />
            </div>
          </div>
          <h2 className="text-base font-bold text-white text-center">Marscel Cruz</h2>
          <p className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mt-1">Operations Manager</p>
        </div>

        {/* Contact Details */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">
              <Mail size={11} /> Email Address
            </div>
            <div className="text-sm font-medium text-white/80">marscel@kdci.co</div>
          </div>
          <div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">
              <Phone size={11} /> Contact Number
            </div>
            <div className="text-sm font-medium text-white/80">+1 (555) 123-4567</div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
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
          onClick={() => { closeSidebar(); setView('home'); }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"
        >
          <LogOut size={18} /> Sign Out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">

      {/* ── Desktop Sidebar (always visible md+) ── */}
      <aside className="hidden md:flex w-64 lg:w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex-col bg-[#0a0a0a]">
        <SidebarContent />
      </aside>

      {/* ── Mobile Sidebar Backdrop ── */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/70 backdrop-blur-sm"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* ── Mobile Sidebar Drawer ── */}
      <aside
        className={`md:hidden fixed top-0 left-0 z-50 h-full w-72 max-w-[85vw] bg-[#0a0a0a] border-r border-white/5 flex flex-col transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Sidebar navigation"
      >
        <SidebarContent />
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-grow min-w-0 p-5 md:p-8 lg:p-12 overflow-y-auto">

        {/* Top Header */}
        <header className="flex items-center justify-between gap-4 mb-8 md:mb-12">
          <div className="flex items-center gap-3 min-w-0">
            {/* Hamburger — mobile only */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="md:hidden w-10 h-10 rounded-xl bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all shrink-0"
              aria-label="Open sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="min-w-0">
              <h1 className="text-xl md:text-3xl font-heading font-bold truncate">Welcome back, Editor.</h1>
              <p className="text-white/40 text-xs md:text-sm font-medium mt-0.5 hidden sm:block">Manage your content pipeline and talent acquisition.</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0">
            {/* Search — hidden on small mobile, visible sm+ */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" size={15} />
              <input
                type="text"
                placeholder="Search..."
                className="bg-[#1a1a1a] border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739] transition-colors w-40 md:w-56"
              />
            </div>
            <button className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
              <Bell size={16} />
            </button>
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#E61739] to-purple-600 border-2 border-[#0a0a0a] shrink-0"></div>
          </div>
        </header>

        {/* Employee Portal Banner */}
        <a
          href="/midgard/"
          className="flex items-center justify-between mb-8 md:mb-10 p-4 md:p-5 rounded-2xl bg-[#E61739]/10 border border-[#E61739]/20 hover:bg-[#E61739]/15 transition-all group"
        >
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#E61739] flex items-center justify-center shrink-0">
              <Key size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white">Employee Portal — Midgard</div>
              <div className="text-xs text-white/40 font-medium hidden sm:block">Secure CMS access with JWT auth, account approval & brute-force protection</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-[#E61739] group-hover:translate-x-1 transition-transform shrink-0" />
        </a>

        {/* Navigation Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6 mb-8 md:mb-12">
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
