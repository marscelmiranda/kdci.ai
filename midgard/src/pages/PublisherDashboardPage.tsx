import React, { useEffect, useState, useRef } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  Briefcase, FileText, BookOpen, BookMarked,
  Image as ImageIcon, Bell, LogOut,
  ChevronRight, Mail, Phone, Key, Edit3, Users, UserCircle2,
  Building2, MapPin, Lock, Eye, EyeOff, Loader2, AlertCircle,
  CheckCircle2, ShieldQuestion, X, ClipboardList, Menu, ChevronDown,
  LayoutDashboard, Settings, ExternalLink,
} from 'lucide-react';
import { getMe, forgotPassword, verifySecret, resetPassword } from '../lib/api';

// ── Types ────────────────────────────────────────────────────────────────────

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  color: string;
  onClick: () => void;
}

interface SidebarProfile {
  avatarImage: string;
  firstName: string;
  lastName: string;
  positionTitle: string;
  rank: string;
  department: string;
  city: string;
  state: string;
  workPhone: string;
  mobilePhone: string;
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
        className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/60 hover:bg-[#E61739] hover:text-white hover:border-[#E61739] transition-all flex items-center justify-center gap-2"
      >
        <span className="group-hover:translate-x-1 transition-transform">{actionText}</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export const PublisherDashboardPage = ({ setView, userRole }: { setView: (v: ViewType) => void; userRole: string }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName]   = useState('');
  const [profile, setProfile]     = useState<SidebarProfile | null>(null);
  const [isMobileMenuOpen, setMobileMenu] = useState(false);
  const [isProfileOpen, setProfileOpen]   = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Change-password modal state
  const [cpOpen, setCpOpen]                   = useState(false);
  const [cpStep, setCpStep]                   = useState<1 | 2 | 3>(1);
  const [cpSecretQuestion, setCpSecretQuestion] = useState('');
  const [cpCode, setCpCode]                   = useState('');
  const [cpSecretAnswer, setCpSecretAnswer]   = useState('');
  const [cpNewPassword, setCpNewPassword]     = useState('');
  const [cpConfirmPassword, setCpConfirmPassword] = useState('');
  const [cpShowPw, setCpShowPw]               = useState(false);
  const [cpLoading, setCpLoading]             = useState(false);
  const [cpError, setCpError]                 = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
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

  // Fetch user data
  useEffect(() => {
    getMe().then(u => {
      setUserEmail(u.email);
      setUserName(u.name || '');
      const key = `userProfile_${u.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try { setProfile(JSON.parse(stored)); return; } catch {}
      }
      const parts = (u.name || '').trim().split(/\s+/);
      const initial: SidebarProfile = {
        avatarImage: '', firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '',
        positionTitle: '', rank: '', department: '', city: '', state: '',
        workPhone: '', mobilePhone: '',
      };
      const fullInitial = {
        coverImage: '', avatarImage: '', idPhotoImage: '',
        city: '', state: '',
        positionTitle: '', rank: '', department: '', hireDate: '',
        employeeId: '', employmentType: '', workLocation: '', reportsTo: '',
        directReports: [],
        firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '', middleName: '',
        dateOfBirth: '', gender: '', pronouns: '', nationality: '', maritalStatus: '',
        personalEmail: '', workPhone: '', mobilePhone: '', officeLocation: '', linkedinUrl: '',
        workAddress: { street: '', city: '', state: '', zip: '' },
        emergencyContacts: [],
      };
      localStorage.setItem(key, JSON.stringify(fullInitial));
      setProfile(initial);
    }).catch(() => {});
  }, []);

  // Derived display values
  const displayName     = profile ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') || userName : userName;
  const displayTitle    = profile?.positionTitle || '';
  const displayPhone    = profile?.workPhone || profile?.mobilePhone || '';
  const displayAvatar   = profile?.avatarImage || '';
  const displayLocation = profile ? [profile.city, profile.state].filter(Boolean).join(', ') : '';
  const displayDept     = profile?.department || '';
  const initials        = displayName
    ? displayName.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()
    : (userEmail[0] || '?').toUpperCase();
  const firstName       = displayName.split(' ')[0] || 'Editor';

  // Change-password modal helpers
  const openChangePassword = async () => {
    setProfileOpen(false);
    setCpError(null); setCpStep(1); setCpSecretAnswer('');
    setCpNewPassword(''); setCpConfirmPassword(''); setCpCode(''); setCpSecretQuestion('');
    setCpLoading(true); setCpOpen(true);
    try {
      const res = await forgotPassword(userEmail);
      setCpCode(res.code ?? '');
      setCpSecretQuestion(res.secret_question ?? '');
    } catch (err: any) {
      setCpError(err.message ?? 'Could not start password change. Try again.');
    } finally {
      setCpLoading(false);
    }
  };

  const handleCpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpSecretAnswer.trim()) { setCpError('Please answer the security question.'); return; }
    setCpError(null); setCpLoading(true);
    try {
      await verifySecret(userEmail, cpSecretAnswer.trim());
      setCpStep(2);
    } catch (err: any) {
      setCpError(err.message ?? 'Incorrect answer. Try again.');
    } finally {
      setCpLoading(false);
    }
  };

  const handleCpSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cpNewPassword.length < 8) { setCpError('Password must be at least 8 characters.'); return; }
    if (cpNewPassword !== cpConfirmPassword) { setCpError('Passwords do not match.'); return; }
    setCpError(null); setCpLoading(true);
    try {
      await resetPassword(userEmail, cpCode, cpNewPassword);
      setCpStep(3);
    } catch (err: any) {
      setCpError(err.message ?? 'Password update failed. Try again.');
    } finally {
      setCpLoading(false);
    }
  };

  // Role-based visibility
  const show = (card: 'careers' | 'blogs' | 'resources' | 'portfolio' | 'casestudies' | 'approvals' | 'profile' | 'manpower') => {
    if (userRole === 'marketing')   return ['blogs', 'resources', 'casestudies', 'profile'].includes(card);
    if (userRole === 'recruitment') return ['careers', 'manpower', 'profile'].includes(card);
    if (userRole === 'manager')     return ['manpower', 'profile'].includes(card);
    if (userRole === 'admin')       return true;
    return !['approvals', 'manpower'].includes(card);
  };

  // Filtered nav items based on role
  const ALL_NAV = [
    { id: 'dashboard',          label: 'Dashboard',          view: 'dashboard'          as ViewType, icon: <LayoutDashboard size={15} />, card: null },
    { id: 'career-ops',         label: 'Career Ops',         view: 'career-ops'         as ViewType, icon: <Briefcase size={15} />,       card: 'careers'     },
    { id: 'manpower-requests',  label: 'Manpower',           view: 'manpower-requests'  as ViewType, icon: <ClipboardList size={15} />,    card: 'manpower'    },
    { id: 'blog-ops',           label: 'Blogs',              view: 'blog-ops'           as ViewType, icon: <FileText size={15} />,         card: 'blogs'       },
    { id: 'resources-ops',      label: 'Resources',          view: 'resources-ops'      as ViewType, icon: <BookOpen size={15} />,         card: 'resources'   },
    { id: 'portfolio-ops',      label: 'Portfolio',          view: 'portfolio-ops'      as ViewType, icon: <ImageIcon size={15} />,        card: 'portfolio'   },
    { id: 'case-studies-ops',   label: 'Case Studies',       view: 'case-studies-ops'   as ViewType, icon: <BookMarked size={15} />,       card: 'casestudies' },
    { id: 'admin-approvals',    label: 'User Approvals',     view: 'admin-approvals'    as ViewType, icon: <Users size={15} />,            card: 'approvals'   },
    { id: 'profile',            label: 'My Profile',         view: 'profile'            as ViewType, icon: <UserCircle2 size={15} />,      card: 'profile'     },
  ] as const;

  const navItems = ALL_NAV.filter(item => item.card === null || show(item.card as any));

  const handleNavClick = (view: ViewType) => {
    setMobileMenu(false);
    setProfileOpen(false);
    setView(view);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans flex flex-col">

      {/* ═══════════════════════════════════════════════════════
          TOP NAVBAR
      ═══════════════════════════════════════════════════════ */}
      <nav className="sticky top-0 z-50 bg-[#0d0d0d]/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Left: Logo + badge */}
          <div className="flex items-center gap-3 shrink-0">
            <a href="/" className="hover:opacity-80 transition-opacity">
              <Logo isDarkHero={true} />
            </a>
            <span className="hidden sm:inline-flex px-2.5 py-1 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
              Publisher Portal
            </span>
          </div>

          {/* Center: Desktop nav links (scrollable on mid-size screens) */}
          <div className="hidden md:flex items-center gap-0.5 overflow-x-auto no-scrollbar">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.view)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-[12px] font-semibold whitespace-nowrap transition-all text-white/50 hover:text-white hover:bg-white/5"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>

          {/* Right: Bell + Profile avatar */}
          <div className="flex items-center gap-2 shrink-0">
            <button className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all">
              <Bell size={16} />
            </button>

            {/* Profile avatar dropdown */}
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

              {/* Dropdown */}
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
                      onClick={openChangePassword}
                      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-all text-left"
                    >
                      <Settings size={15} className="shrink-0" /> Change Password
                    </button>
                    <div className="border-t border-white/5 mt-1 pt-1">
                      <button
                        onClick={() => { setProfileOpen(false); setView('login'); }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#E61739] hover:bg-[#E61739]/10 transition-all text-left"
                      >
                        <LogOut size={15} className="shrink-0" /> Sign Out
                      </button>
                    </div>
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

        {/* Mobile nav drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-[#0d0d0d] px-4 py-3 flex flex-col gap-1">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.view)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-left w-full text-white/50 hover:text-white hover:bg-white/5 transition-all"
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* ═══════════════════════════════════════════════════════
          MAIN CONTENT
      ═══════════════════════════════════════════════════════ */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 md:py-12">

        {/* Page header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-heading font-bold">
            Welcome back, {firstName}.
          </h1>
          <p className="text-white/40 text-sm font-medium mt-2">
            Manage your content pipeline and talent acquisition.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {show('careers') && (
            <DashboardCard
              title="Career Ops"
              description="Manage all open job requisitions, view active applicant pipelines, and publish new roles."
              icon={<Briefcase size={24} />}
              actionText="Manage Careers"
              color="bg-blue-600"
              onClick={() => setView('career-ops')}
            />
          )}
          {show('manpower') && (
            <DashboardCard
              title="Manpower Requests"
              description="Submit staffing requests for new hires. Recruiters will review, self-assign, and publish approved roles to the Careers page."
              icon={<ClipboardList size={24} />}
              actionText="Submit Request"
              color="bg-amber-600"
              onClick={() => setView('manpower-requests')}
            />
          )}
          {show('blogs') && (
            <DashboardCard
              title="Blogs"
              description="Create, edit, and publish new articles, news, and insights to the main blog portal."
              icon={<FileText size={24} />}
              actionText="Manage Blogs"
              color="bg-purple-600"
              onClick={() => setView('blog-ops')}
            />
          )}
          {show('resources') && (
            <DashboardCard
              title="Resources"
              description="Publish actionable ebooks, technical case studies, and engaging webinar materials."
              icon={<BookOpen size={24} />}
              actionText="Manage Resources"
              color="bg-green-600"
              onClick={() => setView('resources-ops')}
            />
          )}
          {show('portfolio') && (
            <DashboardCard
              title="Portfolio"
              description="Showcase creative work, recent client deployments, and highly-visual case results."
              icon={<ImageIcon size={24} />}
              actionText="Manage Portfolio"
              color="bg-orange-600"
              onClick={() => setView('portfolio-ops')}
            />
          )}
          {show('casestudies') && (
            <DashboardCard
              title="Case Studies"
              description="Write, publish, and manage client success stories displayed on the public case studies page."
              icon={<BookMarked size={24} />}
              actionText="Manage Case Studies"
              color="bg-teal-600"
              onClick={() => setView('case-studies-ops')}
            />
          )}
          {show('approvals') && (
            <DashboardCard
              title="User Approvals"
              description="Review and approve pending team member accounts, manage access and unlock locked accounts."
              icon={<Users size={24} />}
              actionText="Manage Users"
              color="bg-red-600"
              onClick={() => setView('admin-approvals')}
            />
          )}
          {show('profile') && (
            <DashboardCard
              title="My Profile"
              description="View and update your employee profile, work information, contact details, and org chart position."
              icon={<UserCircle2 size={24} />}
              actionText="View Profile"
              color="bg-indigo-600"
              onClick={() => setView('profile')}
            />
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════
          CHANGE PASSWORD MODAL
      ═══════════════════════════════════════════════════════ */}
      {cpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={() => setCpOpen(false)}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">
                {cpStep === 3 ? 'Done' : `Step ${cpStep} of 2`}
              </p>
              <h2 className="text-xl font-heading font-bold text-white">
                {cpStep === 1 && 'Verify Your Identity'}
                {cpStep === 2 && 'Set New Password'}
                {cpStep === 3 && 'Password Updated'}
              </h2>
              {cpStep < 3 && (
                <div className="flex gap-2 mt-3">
                  {[1, 2].map(i => (
                    <div key={i} className={`h-1 w-8 rounded-full transition-all ${i <= cpStep ? 'bg-[#E61739]' : 'bg-white/10'}`} />
                  ))}
                </div>
              )}
            </div>

            {cpError && (
              <div className="mb-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm font-medium">
                <AlertCircle size={16} className="shrink-0" />{cpError}
              </div>
            )}

            {/* Step 1 — Security question */}
            {cpStep === 1 && (
              <form onSubmit={handleCpVerify} className="space-y-5">
                {cpLoading && !cpSecretQuestion ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-[#E61739]" size={28} />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">
                        <ShieldQuestion size={12} /> Security Question
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80">
                        {cpSecretQuestion || '—'}
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Your answer..."
                        value={cpSecretAnswer}
                        onChange={e => setCpSecretAnswer(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#E61739] transition-all"
                      />
                      <p className="text-[10px] text-white/30 ml-1">Answer is not case-sensitive.</p>
                    </div>
                    <button
                      type="submit"
                      disabled={cpLoading}
                      className="w-full py-3.5 bg-[#E61739] text-white rounded-xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {cpLoading ? <Loader2 className="animate-spin" size={18} /> : 'Verify & Continue'}
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Step 2 — New password */}
            {cpStep === 2 && (
              <form onSubmit={handleCpSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type={cpShowPw ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={cpNewPassword}
                      onChange={e => setCpNewPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#E61739] transition-all"
                    />
                    <button type="button" onClick={() => setCpShowPw(!cpShowPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                      {cpShowPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={cpConfirmPassword}
                      onChange={e => setCpConfirmPassword(e.target.value)}
                      className={`w-full pl-11 pr-10 py-3 bg-white/5 border rounded-xl text-sm font-bold text-white placeholder:text-white/20 focus:outline-none transition-all ${
                        cpConfirmPassword && cpNewPassword !== cpConfirmPassword
                          ? 'border-red-500/50 focus:border-red-500'
                          : cpConfirmPassword && cpNewPassword === cpConfirmPassword
                          ? 'border-green-500/50 focus:border-green-500'
                          : 'border-white/10 focus:border-[#E61739]'
                      }`}
                    />
                    {cpConfirmPassword && cpNewPassword === cpConfirmPassword && (
                      <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={16} />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={cpLoading}
                  className="w-full py-3.5 bg-[#E61739] text-white rounded-xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {cpLoading ? <Loader2 className="animate-spin" size={18} /> : 'Save New Password'}
                </button>
              </form>
            )}

            {/* Step 3 — Success */}
            {cpStep === 3 && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <p className="text-white/60 text-sm">Your password has been updated successfully.</p>
                <button
                  onClick={() => setCpOpen(false)}
                  className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
