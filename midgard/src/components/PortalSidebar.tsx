import React, { useEffect, useRef, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { getMe, clearToken } from '../lib/api';
import {
  Briefcase, BookOpen, BookMarked, ClipboardList, Edit3,
  FileText, Image as ImageIcon, LayoutDashboard,
  LogOut, Menu, Settings, Users, UserCircle2, ChevronDown,
} from 'lucide-react';

interface PortalSidebarProps {
  setView: (v: ViewType) => void;
  activeNav?: string;
  onSignOut?: () => void;
}

const ALL_NAV = [
  { id: 'dashboard',         label: 'Dashboard',      view: 'dashboard'          as ViewType, Icon: LayoutDashboard },
  { id: 'career-ops',        label: 'Career Ops',     view: 'career-ops'         as ViewType, Icon: Briefcase },
  { id: 'manpower-requests', label: 'Manpower',       view: 'manpower-requests'  as ViewType, Icon: ClipboardList },
  { id: 'blog-ops',          label: 'Blogs',          view: 'blog-ops'           as ViewType, Icon: FileText },
  { id: 'resources-ops',     label: 'Resources',      view: 'resources-ops'      as ViewType, Icon: BookOpen },
  { id: 'portfolio-ops',     label: 'Portfolio',      view: 'portfolio-ops'      as ViewType, Icon: ImageIcon },
  { id: 'case-studies-ops',  label: 'Case Studies',   view: 'case-studies-ops'   as ViewType, Icon: BookMarked },
  { id: 'admin-approvals',   label: 'User Approvals', view: 'admin-approvals'    as ViewType, Icon: Users },
  { id: 'profile',           label: 'My Profile',     view: 'profile'            as ViewType, Icon: UserCircle2 },
];

export const PortalSidebar = ({ setView, activeNav, onSignOut }: PortalSidebarProps) => {
  const [isExpanded, setIsExpanded] = useState(() => {
    try { return localStorage.getItem('midgard_sidebar') !== 'collapsed'; } catch { return true; }
  });
  const [isMobileOpen, setMobileOpen] = useState(false);
  const [isProfileOpen, setProfileOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [displayTitle, setDisplayTitle] = useState('');
  const [displayAvatar, setDisplayAvatar] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMe().then(u => {
      setUserEmail(u.email || '');
      const key = `userProfile_${u.email}`;
      const stored = localStorage.getItem(key);
      let p: any = null;
      try { if (stored) p = JSON.parse(stored); } catch {}
      setDisplayName(p ? [p.firstName, p.lastName].filter(Boolean).join(' ') || u.name : u.name || '');
      setDisplayTitle(p?.positionTitle || '');
      setDisplayAvatar(p?.avatarImage || '');
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  const toggleExpanded = () => {
    setIsExpanded(prev => {
      const next = !prev;
      try { localStorage.setItem('midgard_sidebar', next ? 'expanded' : 'collapsed'); } catch {}
      return next;
    });
  };

  const initials = displayName
    ? displayName.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()
    : (userEmail[0] || '?').toUpperCase();

  const firstName = displayName.split(' ')[0] || 'User';

  const handleNav = (view: ViewType) => {
    setMobileOpen(false);
    setProfileOpen(false);
    setView(view);
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    if (onSignOut) { onSignOut(); return; }
    clearToken();
    setView('login');
  };

  const Avatar = ({ size = 8 }: { size?: number }) =>
    displayAvatar ? (
      <img src={displayAvatar} alt="Avatar"
        className={`w-${size} h-${size} rounded-full object-cover border border-white/10 shrink-0`} />
    ) : (
      <div className={`w-${size} h-${size} rounded-full bg-[#E61739]/20 border border-[#E61739]/30 flex items-center justify-center text-[11px] font-black text-[#E61739] select-none shrink-0`}>
        {initials}
      </div>
    );

  const NavItems = ({ expanded }: { expanded: boolean }) => (
    <>
      {ALL_NAV.map(({ id, label, view, Icon }) => {
        const isActive = activeNav === id;
        return (
          <button
            key={id}
            onClick={() => handleNav(view)}
            title={!expanded ? label : undefined}
            className={`w-full flex items-center rounded-xl transition-all duration-150 text-sm font-semibold
              ${expanded ? 'gap-3 px-3 py-2.5' : 'justify-center py-3'}
              ${isActive
                ? 'bg-white/10 text-white'
                : 'text-white/45 hover:text-white hover:bg-white/5'}
            `}
          >
            <Icon size={18} className="shrink-0" />
            {expanded && <span className="truncate">{label}</span>}
          </button>
        );
      })}
    </>
  );

  const ProfileSection = ({ expanded }: { expanded: boolean }) => (
    <div className="border-t border-white/5 p-2 shrink-0" ref={profileRef}>
      <div className="relative">
        <button
          onClick={() => setProfileOpen(prev => !prev)}
          className={`w-full flex items-center rounded-xl hover:bg-white/5 transition-all
            ${expanded ? 'gap-3 px-3 py-2.5' : 'justify-center py-3'}
          `}
        >
          <Avatar size={8} />
          {expanded && (
            <>
              <div className="flex-1 min-w-0 text-left">
                <div className="text-xs font-semibold text-white/80 truncate">{firstName}</div>
                {displayTitle && <div className="text-[10px] text-white/30 truncate">{displayTitle}</div>}
              </div>
              <ChevronDown size={13} className={`text-white/30 shrink-0 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </>
          )}
        </button>

        {isProfileOpen && (
          <div className={`absolute z-[60] w-72 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden
            ${expanded ? 'bottom-full left-0 mb-2' : 'bottom-0 left-full ml-3'}
          `}>
            <div className="p-4 flex items-center gap-3 border-b border-white/5">
              <Avatar size={12} />
              <div className="min-w-0 flex-1">
                <div className="font-bold text-white text-sm truncate">
                  {displayName || <span className="text-white/30 italic">No name set</span>}
                </div>
                {displayTitle && (
                  <div className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mt-0.5">{displayTitle}</div>
                )}
                <div className="text-white/30 text-[11px] mt-0.5 truncate">{userEmail}</div>
              </div>
            </div>
            <div className="p-2">
              <button
                onClick={() => { setProfileOpen(false); setView('profile'); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left"
              >
                <Edit3 size={14} className="shrink-0" /> Edit Profile
              </button>
              <button
                onClick={() => { setProfileOpen(false); setView('profile'); }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left"
              >
                <Settings size={14} className="shrink-0" /> Settings
              </button>
              <div className="border-t border-white/5 mt-1 pt-1">
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#E61739] hover:bg-[#E61739]/10 transition-all text-left"
                >
                  <LogOut size={14} className="shrink-0" /> Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop sidebar ─────────────────────────────────────── */}
      <aside className={`hidden md:flex flex-col h-screen sticky top-0 bg-[#0d0d0d] border-r border-white/5 shrink-0 z-40 transition-[width] duration-300
        ${isExpanded ? 'w-60' : 'w-16'}
      `}>
        {/* Header */}
        <div className={`flex items-center h-16 border-b border-white/5 shrink-0 px-3.5 ${isExpanded ? 'gap-3' : 'justify-center'}`}>
          <button
            onClick={toggleExpanded}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all shrink-0"
            aria-label="Toggle sidebar"
          >
            <Menu size={18} />
          </button>
          {isExpanded && (
            <button onClick={() => handleNav('dashboard')} className="hover:opacity-80 transition-opacity">
              <Logo isDarkHero={true} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
          <NavItems expanded={isExpanded} />
        </nav>

        {/* Profile */}
        <ProfileSection expanded={isExpanded} />
      </aside>

      {/* ── Mobile top bar ──────────────────────────────────────── */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center h-14 px-4 gap-3 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5">
        <button
          onClick={() => setMobileOpen(true)}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all shrink-0"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <button onClick={() => handleNav('dashboard')} className="hover:opacity-80 transition-opacity">
          <Logo isDarkHero={true} />
        </button>
        <span className="px-2 py-0.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
          Portal
        </span>
      </div>

      {/* ── Mobile drawer ───────────────────────────────────────── */}
      {isMobileOpen && (
        <>
          <div
            className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="md:hidden fixed left-0 top-0 h-screen w-64 bg-[#0d0d0d] border-r border-white/5 z-50 flex flex-col">
            <div className="flex items-center h-14 px-4 gap-3 border-b border-white/5 shrink-0">
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white/50 hover:text-white hover:bg-white/5 transition-all shrink-0"
              >
                <Menu size={18} />
              </button>
              <button onClick={() => handleNav('dashboard')} className="hover:opacity-80 transition-opacity">
                <Logo isDarkHero={true} />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-0.5">
              <NavItems expanded={true} />
            </nav>
            <ProfileSection expanded={true} />
          </aside>
        </>
      )}
    </>
  );
};
