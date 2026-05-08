import React, { useEffect, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  Briefcase, FileText, BookOpen,
  Image as ImageIcon, Bell, Search, LogOut,
  ChevronRight, Mail, Phone, Key, Edit3, Users, UserCircle2, MapPin, Building2
} from 'lucide-react';
import { getMe } from '../lib/api';

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

export const PublisherDashboardPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName]   = useState('');
  const [profile, setProfile]     = useState<SidebarProfile | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  useEffect(() => {
    getMe().then(u => {
      setUserEmail(u.email);
      setUserName(u.name || '');
      const key = `userProfile_${u.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try { setProfile(JSON.parse(stored)); return; } catch {}
      }
      // No profile yet — auto-initialize from auth name so sidebar is never empty
      const parts = (u.name || '').trim().split(/\s+/);
      const initial: SidebarProfile = {
        avatarImage: '', firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '',
        positionTitle: '', rank: '', department: '', city: '', state: '',
        workPhone: '', mobilePhone: '',
      };
      // Persist a full minimal profile so ProfilePage & dashboard stay in sync
      const fullInitial = {
        coverImage:'', avatarImage:'', idPhotoImage:'',
        city:'', state:'',
        positionTitle:'', rank:'', department:'', hireDate:'',
        employeeId:'', employmentType:'', workLocation:'', reportsTo:'',
        directReports:[],
        firstName: parts[0] || '', lastName: parts.slice(1).join(' ') || '', middleName:'',
        dateOfBirth:'', gender:'', pronouns:'', nationality:'', maritalStatus:'',
        personalEmail:'', workPhone:'', mobilePhone:'', officeLocation:'', linkedinUrl:'',
        workAddress:{ street:'', city:'', state:'', zip:'' },
        emergencyContacts:[],
      };
      localStorage.setItem(key, JSON.stringify(fullInitial));
      setProfile(initial);
    }).catch(() => {});
  }, []);

  const displayName = profile
    ? [profile.firstName, profile.lastName].filter(Boolean).join(' ') || userName
    : userName;

  const displayTitle = profile?.positionTitle || '';
  const displayPhone = profile?.workPhone || profile?.mobilePhone || '';
  const displayAvatar = profile?.avatarImage || '';
  const displayLocation = profile ? [profile.city, profile.state].filter(Boolean).join(', ') : '';
  const displayDept = profile?.department || '';
  const initials = displayName
    ? displayName.split(' ').map((p: string) => p[0]).join('').slice(0, 2).toUpperCase()
    : (userEmail[0] || '?').toUpperCase();

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">

      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>

        <div className="flex-grow px-8 py-6 flex flex-col gap-5 overflow-y-auto">
          {/* Avatar */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div
              onClick={() => setView('profile')}
              className="w-24 h-24 rounded-full bg-[#1a1a1a] border-2 border-white/10 mb-4 overflow-hidden relative group cursor-pointer"
            >
              {displayAvatar ? (
                <img src={displayAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-black text-[#E61739] select-none">
                  {initials}
                </div>
              )}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Edit3 size={16} className="text-white" />
              </div>
            </div>

            <h2 className="text-lg font-bold text-white text-center leading-tight">
              {displayName || <span className="text-white/30 italic text-base">No name set</span>}
            </h2>

            {displayTitle ? (
              <p className="text-[#E61739] text-xs font-black uppercase tracking-widest mt-1 text-center">
                {displayTitle}
              </p>
            ) : (
              <p className="text-white/20 text-xs italic mt-1">No title set</p>
            )}

            {(displayDept || displayLocation) && (
              <div className="mt-2 flex flex-col items-center gap-1">
                {displayDept && (
                  <span className="flex items-center gap-1 text-white/40 text-[11px]">
                    <Building2 size={10} />{displayDept}
                  </span>
                )}
                {displayLocation && (
                  <span className="flex items-center gap-1 text-white/30 text-[11px]">
                    <MapPin size={10} />{displayLocation}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Contact info */}
          <div className="space-y-3 border-t border-white/5 pt-4">
            <div>
              <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">
                <Mail size={10} /> Work Email
              </div>
              <div className="text-xs font-medium text-white/70 truncate">{userEmail || '—'}</div>
            </div>
            {displayPhone && (
              <div>
                <div className="flex items-center gap-1.5 text-white/30 text-[10px] font-black uppercase tracking-widest mb-1">
                  <Phone size={10} /> Phone
                </div>
                <div className="text-xs font-medium text-white/70">{displayPhone}</div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="space-y-2">
            <button
              onClick={() => setView('profile')}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              <Edit3 size={14} /> Edit Profile
            </button>
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
              <Key size={14} /> Change Password
            </button>
          </div>
        </div>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={() => setView('login')}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-grow p-8 md:p-12 overflow-y-auto">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">
              Welcome back, {displayName.split(' ')[0] || 'Editor'}.
            </h1>
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
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <DashboardCard
            title="Career Ops"
            description="Manage all open job requisitions, view active applicant pipelines, and publish new roles."
            icon={<Briefcase size={24} />}
            actionText="Manage Careers"
            color="bg-blue-600"
            onClick={() => setView('career-ops')}
          />
          <DashboardCard
            title="Blogs"
            description="Create, edit, and publish new articles, news, and insights to the main blog portal."
            icon={<FileText size={24} />}
            actionText="Manage Blogs"
            color="bg-purple-600"
            onClick={() => setView('blog-ops')}
          />
          <DashboardCard
            title="Resources"
            description="Publish actionable ebooks, technical case studies, and engaging webinar materials."
            icon={<BookOpen size={24} />}
            actionText="Manage Resources"
            color="bg-green-600"
            onClick={() => setView('resources-ops')}
          />
          <DashboardCard
            title="Portfolio"
            description="Showcase creative work, recent client deployments, and highly-visual case results."
            icon={<ImageIcon size={24} />}
            actionText="Manage Portfolio"
            color="bg-orange-600"
            onClick={() => setView('portfolio-ops')}
          />
          <DashboardCard
            title="User Approvals"
            description="Review and approve pending team member accounts, manage access and unlock locked accounts."
            icon={<Users size={24} />}
            actionText="Manage Users"
            color="bg-red-600"
            onClick={() => setView('admin-approvals')}
          />
          <DashboardCard
            title="My Profile"
            description="View and update your employee profile, work information, contact details, and org chart position."
            icon={<UserCircle2 size={24} />}
            actionText="View Profile"
            color="bg-indigo-600"
            onClick={() => setView('profile')}
          />
        </div>
      </main>
    </div>
  );
};
