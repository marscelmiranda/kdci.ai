
import React, { useEffect, useState, useRef } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  Briefcase, FileText, BookOpen, Award,
  Image as ImageIcon, Bell, LogOut, ChevronRight,
  Mail, Phone, Key, Edit3, Menu, X, LayoutDashboard,
  ChevronDown, Settings, ExternalLink,
} from 'lucide-react';

// ── Types ────────────────────────────────────────────────────────────────────

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  color: string;
  onClick: () => void;
}

// ── Dashboard Card ────────────────────────────────────────────────────────────

const DashboardCard = ({ title, description, icon, actionText, color, onClick }: DashboardCardProps) => (
  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 flex flex-col h-full hover:bg-[#222] transition-all group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-20 ${color} opacity-5 blur-[80px] rounded-full pointer-events-none`} />
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 border border-white/5 group-hover:scale-110 group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-heading font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/50 text-sm mb-8 flex-grow leading-relaxed">{description}</p>
      <button
        onClick={onClick}
        className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/60 hover:bg-[#ad1457] hover:text-white hover:border-[#E61739] transition-all flex items-center justify-center gap-2"
      >
        <span className="group-hover:translate-x-1 transition-transform">{actionText}</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

// ── Nav items config ──────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { id: 'overview',       label: 'Dashboard',    icon: <LayoutDashboard size={15} /> },
  { id: 'careers',        label: 'Career Ops',   icon: <Briefcase size={15} /> },
  { id: 'blog',           label: 'Blogs',        icon: <FileText size={15} /> },
  { id: 'resources',      label: 'Resources',    icon: <BookOpen size={15} /> },
  { id: 'portfolio',      label: 'Portfolio',    icon: <ImageIcon size={15} /> },
  { id: 'case-studies',   label: 'Case Studies', icon: <Award size={15} /> },
];

// ── Main Component ────────────────────────────────────────────────────────────

export const PublisherDashboardPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeTab, setActiveTab]           = useState('overview');
  const [isMobileMenuOpen, setMobileMenu]   = useState(false);
  const [isProfileOpen, setProfileOpen]     = useState(false);
  const profileRef                          = useRef<HTMLDivElement>(null);

  // Dark background for portal feel
  useEffect(() => {
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = prev; };
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileMenu(false);
    setProfileOpen(false);
    if (id === 'careers')      { setView('cms-career-ops');     return; }
    if (id === 'blog')         { setView('cms-blog-ops');        return; }
    if (id === 'resources')    { setView('cms-resources-ops');   return; }
    if (id === 'portfolio')    { setView('cms-portfolio-ops');   return; }
    if (id === 'case-studies') { setView('cms-case-studies-ops');return; }
    setActiveTab(id);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">

      {/* ═══════════════════════════════════════════════════════
          TOP NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* ── Left: Logo + badge ── */}
          <div className="flex items-center gap-3 shrink-0">
            <button onClick={() => setView('home')} className="hover:opacity-80 transition-opacity">
              <Logo isDarkHero={true} />
            </button>
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-[#ad1457]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
              Publisher Portal
            </span>
          </div>

          {/* ── Center: Desktop nav links ── */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-[13px] font-semibold transition-all ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* ── Right: Actions + Profile ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Bell */}
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all">
              <Bell size={16} />
            </button>

            {/* Live site link — desktop */}
            <a
              href="/"
              onClick={e => { e.preventDefault(); setView('home'); }}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white/50 hover:text-white hover:border-white/20 transition-all"
            >
              <ExternalLink size={13} /> View Site
            </a>

            {/* Profile avatar + dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(prev => !prev)}
                className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
                aria-label="Profile menu"
              >
                <img
                  src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1777595870/468598394_10162265374063293_2142667036521414352_n_krsqc5.jpg?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="Profile"
                  className="w-7 h-7 rounded-full object-cover border border-white/10"
                />
                <span className="hidden sm:block text-xs font-semibold text-white/70 group-hover:text-white transition-colors">Marscel</span>
                <ChevronDown
                  size={13}
                  className={`text-white/40 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {/* Profile Dropdown */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-2 w-72 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.6)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
                  {/* Profile header */}
                  <div className="p-5 flex items-center gap-4 border-b border-white/5">
                    <div className="relative shrink-0">
                      <img
                        src="https://res.cloudinary.com/dqkwcbbe5/image/upload/v1777595870/468598394_10162265374063293_2142667036521414352_n_krsqc5.jpg?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="Profile"
                        className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10"
                      />
                      <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#161616]" />
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-white text-sm">Marscel Cruz</div>
                      <div className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mt-0.5">Operations Manager</div>
                      <div className="text-white/40 text-xs mt-1 truncate">marscel@kdci.co</div>
                    </div>
                  </div>

                  {/* Contact details */}
                  <div className="px-5 py-3 space-y-2.5 border-b border-white/5">
                    <div className="flex items-center gap-2.5 text-xs text-white/50">
                      <Mail size={13} className="text-white/30 shrink-0" />
                      marscel@kdci.co
                    </div>
                    <div className="flex items-center gap-2.5 text-xs text-white/50">
                      <Phone size={13} className="text-white/30 shrink-0" />
                      +1 (555) 123-4567
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left">
                      <Edit3 size={15} className="shrink-0" /> Edit Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left">
                      <Settings size={15} className="shrink-0" /> Change Password
                    </button>
                    <button
                      onClick={() => { setProfileOpen(false); setView('home'); }}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#E61739] hover:bg-[#ad1457]/10 transition-all text-left mt-1 border-t border-white/5 pt-2.5"
                    >
                      <LogOut size={15} className="shrink-0" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger — mobile only */}
            <button
              onClick={() => setMobileMenu(prev => !prev)}
              className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ── Mobile nav drawer ── */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0d0d0d] px-4 py-3 flex flex-col gap-1 animate-in slide-in-from-top-2 duration-150">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left w-full transition-all ${
                  activeTab === item.id
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <div className="h-px bg-white/5 my-1" />
            <a
              href="/"
              onClick={e => { e.preventDefault(); setView('home'); }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/50 hover:text-white hover:bg-white/5 transition-all"
            >
              <ExternalLink size={15} /> View Live Site
            </a>
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════ */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Page header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-heading font-bold">Welcome back, Editor.</h1>
          <p className="text-white/40 text-sm font-medium mt-2">Manage your content pipeline and talent acquisition.</p>
        </div>

        {/* Employee Portal Banner */}
        <a
          href="/midgard/"
          className="flex items-center justify-between mb-8 md:mb-10 p-4 md:p-5 rounded-2xl bg-[#ad1457]/10 border border-[#E61739]/20 hover:bg-[#ad1457]/15 transition-all group"
        >
          <div className="flex items-center gap-3 md:gap-4 min-w-0">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-[#ad1457] flex items-center justify-center shrink-0">
              <Key size={16} className="text-white" />
            </div>
            <div className="min-w-0">
              <div className="text-sm font-bold text-white">Employee Portal — Midgard</div>
              <div className="text-xs text-white/40 font-medium hidden sm:block">Secure CMS access with JWT auth, account approval & brute-force protection</div>
            </div>
          </div>
          <ChevronRight size={18} className="text-[#E61739] group-hover:translate-x-1 transition-transform shrink-0" />
        </a>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
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
