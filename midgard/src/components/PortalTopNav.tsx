import React, { useEffect, useRef, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from './Logo';
import { getMe, clearToken } from '../lib/api';
import {
  Bell, Briefcase, BookOpen, BookMarked, Building2, ChevronDown,
  ClipboardList, Edit3, FileText, Image as ImageIcon, LayoutDashboard,
  LogOut, Mail, MapPin, Menu, Phone, Settings, Users, UserCircle2, X,
} from 'lucide-react';

interface PortalTopNavProps {
  setView: (v: ViewType) => void;
  activeNav?: string;
  onSignOut?: () => void;
}

const ALL_NAV = [
  { id: 'dashboard',         label: 'Dashboard',      view: 'dashboard'          as ViewType, icon: <LayoutDashboard size={15} /> },
  { id: 'career-ops',        label: 'Career Ops',     view: 'career-ops'         as ViewType, icon: <Briefcase size={15} /> },
  { id: 'manpower-requests', label: 'Manpower',       view: 'manpower-requests'  as ViewType, icon: <ClipboardList size={15} /> },
  { id: 'blog-ops',          label: 'Blogs',          view: 'blog-ops'           as ViewType, icon: <FileText size={15} /> },
  { id: 'resources-ops',     label: 'Resources',      view: 'resources-ops'      as ViewType, icon: <BookOpen size={15} /> },
  { id: 'portfolio-ops',     label: 'Portfolio',      view: 'portfolio-ops'      as ViewType, icon: <ImageIcon size={15} /> },
  { id: 'case-studies-ops',  label: 'Case Studies',   view: 'case-studies-ops'   as ViewType, icon: <BookMarked size={15} /> },
  { id: 'admin-approvals',   label: 'User Approvals', view: 'admin-approvals'    as ViewType, icon: <Users size={15} /> },
  { id: 'profile',           label: 'My Profile',     view: 'profile'            as ViewType, icon: <UserCircle2 size={15} /> },
];

export const PortalTopNav = ({ setView, activeNav, onSignOut }: PortalTopNavProps) => {
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [isProfileOpen, setProfileOpen]   = useState(false);
  const [userEmail, setUserEmail]         = useState('');
  const [displayName, setDisplayName]     = useState('');
  const [displayTitle, setDisplayTitle]   = useState('');
  const [displayAvatar, setDisplayAvatar] = useState('');
  const [displayDept, setDisplayDept]     = useState('');
  const [displayPhone, setDisplayPhone]   = useState('');
  const [displayLocation, setDisplayLocation] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getMe().then(u => {
      setUserEmail(u.email || '');
      const key = `userProfile_${u.email}`;
      const stored = localStorage.getItem(key);
      let p: any = null;
      try { if (stored) p = JSON.parse(stored); } catch {}
      const parts = (u.name || '').trim().split(/\s+/);
      setDisplayName(p ? [p.firstName, p.lastName].filter(Boolean).join(' ') || u.name : u.name || '');
      setDisplayTitle(p?.positionTitle || '');
      setDisplayAvatar(p?.avatarImage || '');
      setDisplayDept(p?.department || '');
      setDisplayPhone(p?.workPhone || p?.mobilePhone || '');
      setDisplayLocation(p ? [p.city, p.state].filter(Boolean).join(', ') : '');
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

  const initials = displayName
    ? displayName.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()
    : (userEmail[0] || '?').toUpperCase();

  const firstName = displayName.split(' ')[0] || 'User';

  const handleNav = (view: ViewType) => {
    setMobileMenu(false);
    setProfileOpen(false);
    setView(view);
  };

  const handleSignOut = () => {
    setProfileOpen(false);
    if (onSignOut) { onSignOut(); return; }
    clearToken();
    setView('login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5 shrink-0">
      <div className="max-w-full px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Left: Logo + badge */}
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => handleNav('dashboard')} className="hover:opacity-80 transition-opacity">
            <Logo isDarkHero={true} />
          </button>
          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
            Publisher Portal
          </span>
        </div>

        {/* Center: Desktop nav */}
        <div className="hidden md:flex items-center gap-0.5 overflow-x-auto">
          {ALL_NAV.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.view)}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all ${
                activeNav === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right: Bell + Profile */}
        <div className="flex items-center gap-2 shrink-0">
          <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all">
            <Bell size={16} />
          </button>

          {/* Profile dropdown */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(prev => !prev)}
              className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full bg-white/5 border border-white/10 hover:border-white/20 transition-all group"
              aria-label="Profile menu"
            >
              {displayAvatar ? (
                <img src={displayAvatar} alt="Avatar" className="w-7 h-7 rounded-full object-cover border border-white/10" />
              ) : (
                <div className="w-7 h-7 rounded-full bg-[#E61739]/20 border border-[#E61739]/30 flex items-center justify-center text-[11px] font-black text-[#E61739] select-none">
                  {initials}
                </div>
              )}
              <span className="hidden sm:block text-xs font-semibold text-white/70 group-hover:text-white transition-colors max-w-[80px] truncate">
                {firstName}
              </span>
              <ChevronDown
                size={13}
                className={`text-white/40 transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 bg-[#161616] border border-white/10 rounded-2xl shadow-[0_24px_60px_-12px_rgba(0,0,0,0.7)] overflow-hidden z-50">
                {/* Profile header */}
                <div className="p-5 flex items-center gap-4 border-b border-white/5">
                  <div className="relative shrink-0">
                    {displayAvatar ? (
                      <img src={displayAvatar} alt="Avatar" className="w-14 h-14 rounded-2xl object-cover border-2 border-white/10" />
                    ) : (
                      <div className="w-14 h-14 rounded-2xl bg-[#E61739]/15 border-2 border-[#E61739]/20 flex items-center justify-center text-xl font-black text-[#E61739] select-none">
                        {initials}
                      </div>
                    )}
                    <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#161616]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-bold text-white text-sm truncate">
                      {displayName || <span className="text-white/30 italic">No name set</span>}
                    </div>
                    {displayTitle && (
                      <div className="text-[#E61739] text-[10px] font-black uppercase tracking-widest mt-0.5">{displayTitle}</div>
                    )}
                    {displayDept && (
                      <div className="flex items-center gap-1 text-white/30 text-[11px] mt-1">
                        <Building2 size={10} />{displayDept}
                      </div>
                    )}
                    {displayLocation && (
                      <div className="flex items-center gap-1 text-white/30 text-[11px]">
                        <MapPin size={10} />{displayLocation}
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact details */}
                <div className="px-5 py-3 space-y-2 border-b border-white/5">
                  <div className="flex items-center gap-2.5 text-xs text-white/50">
                    <Mail size={13} className="text-white/30 shrink-0" />
                    <span className="truncate">{userEmail || '—'}</span>
                  </div>
                  {displayPhone && (
                    <div className="flex items-center gap-2.5 text-xs text-white/50">
                      <Phone size={13} className="text-white/30 shrink-0" />
                      {displayPhone}
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="p-2">
                  <button
                    onClick={() => { setProfileOpen(false); setView('profile'); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left"
                  >
                    <Edit3 size={15} className="shrink-0" /> Edit Profile
                  </button>
                  <button
                    onClick={() => { setProfileOpen(false); setView('profile'); }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left"
                  >
                    <Settings size={15} className="shrink-0" /> Change Password
                  </button>
                  <div className="border-t border-white/5 mt-1 pt-1">
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#E61739] hover:bg-[#E61739]/10 transition-all text-left"
                    >
                      <LogOut size={15} className="shrink-0" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMobileMenu(prev => !prev)}
            className="md:hidden w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile nav drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0d0d0d] px-4 py-3 flex flex-col gap-1">
          {ALL_NAV.map(item => (
            <button
              key={item.id}
              onClick={() => handleNav(item.view)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left w-full transition-all ${
                activeNav === item.id
                  ? 'bg-white/10 text-white'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
