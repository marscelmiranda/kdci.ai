import React, { useEffect, useRef, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { getMe, clearToken } from '../lib/api';
import {
  Briefcase, BookOpen, BookMarked, ChevronDown, ClipboardList, Edit3,
  FileText, Grid3x3, Image as ImageIcon, LayoutDashboard,
  LogOut, Settings, Users, UserCircle2, X,
} from 'lucide-react';

interface PortalTopBarProps {
  setView: (v: ViewType) => void;
  activeNav?: string;
  onSignOut?: () => void;
}

const ALL_NAV = [
  { id: 'dashboard',         label: 'Dashboard',      view: 'dashboard'          as ViewType, Icon: LayoutDashboard, color: 'from-blue-500 to-blue-700'         },
  { id: 'career-ops',        label: 'Career Ops',     view: 'career-ops'         as ViewType, Icon: Briefcase,       color: 'from-cyan-500 to-blue-600'          },
  { id: 'manpower-requests', label: 'Manpower',       view: 'manpower-requests'  as ViewType, Icon: ClipboardList,   color: 'from-amber-500 to-orange-600'       },
  { id: 'blog-ops',          label: 'Blogs',          view: 'blog-ops'           as ViewType, Icon: FileText,        color: 'from-purple-500 to-violet-700'      },
  { id: 'resources-ops',     label: 'Resources',      view: 'resources-ops'      as ViewType, Icon: BookOpen,        color: 'from-emerald-500 to-green-700'      },
  { id: 'portfolio-ops',     label: 'Portfolio',      view: 'portfolio-ops'      as ViewType, Icon: ImageIcon,       color: 'from-orange-500 to-red-600'         },
  { id: 'case-studies-ops',  label: 'Case Studies',   view: 'case-studies-ops'   as ViewType, Icon: BookMarked,      color: 'from-teal-500 to-cyan-700'          },
  { id: 'admin-approvals',   label: 'User Approvals', view: 'admin-approvals'    as ViewType, Icon: Users,           color: 'from-rose-500 to-red-700'           },
  { id: 'profile',           label: 'My Profile',     view: 'profile'            as ViewType, Icon: UserCircle2,     color: 'from-slate-500 to-slate-700'        },
];

export const PortalTopBar = ({ setView, activeNav, onSignOut }: PortalTopBarProps) => {
  const [isLauncherOpen, setLauncherOpen] = useState(false);
  const [isProfileOpen, setProfileOpen]   = useState(false);
  const [userEmail,     setUserEmail]     = useState('');
  const [displayName,   setDisplayName]   = useState('');
  const [displayTitle,  setDisplayTitle]  = useState('');
  const [displayAvatar, setDisplayAvatar] = useState('');
  const launcherRef = useRef<HTMLDivElement>(null);
  const profileRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMe().then(u => {
      setUserEmail(u.email || '');
      const stored = localStorage.getItem(`userProfile_${u.email}`);
      let p: any = null;
      try { if (stored) p = JSON.parse(stored); } catch {}
      setDisplayName(p ? [p.firstName, p.lastName].filter(Boolean).join(' ') || u.name : u.name || '');
      setDisplayTitle(p?.positionTitle || '');
      setDisplayAvatar(p?.avatarImage || '');
    }).catch(() => {});
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (launcherRef.current && !launcherRef.current.contains(e.target as Node)) setLauncherOpen(false);
      if (profileRef.current  && !profileRef.current.contains(e.target as Node))  setProfileOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = displayName
    ? displayName.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()
    : (userEmail[0] || '?').toUpperCase();

  const firstName = displayName.split(' ')[0] || 'User';

  const handleNav = (view: ViewType) => {
    setLauncherOpen(false);
    setProfileOpen(false);
    setView(view);
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    if (onSignOut) { onSignOut(); return; }
    clearToken();
    setView('login');
  };

  const AvatarBubble = ({ size = 8 }: { size?: number }) =>
    displayAvatar ? (
      <img src={displayAvatar} alt="Avatar"
        className={`w-${size} h-${size} rounded-full object-cover border border-white/10 shrink-0`} />
    ) : (
      <div className={`w-${size} h-${size} rounded-full bg-[#E61739]/20 border border-[#E61739]/30 flex items-center justify-center text-[11px] font-black text-[#E61739] select-none shrink-0`}>
        {initials}
      </div>
    );

  return (
    <>
      {/* ── Fixed top bar ───────────────────────────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-50 h-14 flex items-center px-4 sm:px-6 gap-4 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5">

        {/* Left: Logo + badge */}
        <button onClick={() => handleNav('dashboard')} className="flex items-center gap-3 hover:opacity-80 transition-opacity shrink-0">
          <Logo isDarkHero={true} />
          <span className="hidden sm:inline-flex px-2 py-0.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
            Portal
          </span>
        </button>

        <div className="flex-1" />

        {/* Right: waffle launcher + avatar */}
        <div className="flex items-center gap-1.5">

          {/* Waffle / App launcher */}
          <div className="relative" ref={launcherRef}>
            <button
              onClick={() => { setLauncherOpen(p => !p); setProfileOpen(false); }}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all
                ${isLauncherOpen ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white hover:bg-white/5'}`}
              aria-label="Open app launcher"
            >
              <Grid3x3 size={18} />
            </button>

            {isLauncherOpen && (
              <div className="absolute right-0 top-full mt-2 w-80 bg-[#111] border border-white/10 rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.9)] overflow-hidden z-[60]">
                {/* Panel header */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Publisher Portal</span>
                  <button onClick={() => setLauncherOpen(false)} className="text-white/30 hover:text-white transition-colors">
                    <X size={15} />
                  </button>
                </div>

                {/* App grid */}
                <div className="p-4 grid grid-cols-3 gap-3">
                  {ALL_NAV.map(({ id, label, view, Icon, color }) => {
                    const isActive = activeNav === id;
                    return (
                      <button
                        key={id}
                        onClick={() => handleNav(view)}
                        className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all group
                          ${isActive ? 'bg-white/10 ring-1 ring-white/10' : 'hover:bg-white/5'}`}
                      >
                        <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>
                          <Icon size={24} className="text-white" />
                        </div>
                        <span className="text-[11px] font-semibold text-white/60 group-hover:text-white transition-colors text-center leading-tight">
                          {label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Avatar / Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => { setProfileOpen(p => !p); setLauncherOpen(false); }}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-white/5 transition-all"
            >
              <AvatarBubble size={8} />
              <ChevronDown size={13} className={`text-white/30 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8)] overflow-hidden z-[60]">
                {/* Profile header */}
                <div className="p-4 flex items-center gap-3 border-b border-white/5">
                  <AvatarBubble size={12} />
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
      </header>

      {/* spacer so content doesn't hide under the fixed bar */}
      <div className="h-14 shrink-0" />
    </>
  );
};
