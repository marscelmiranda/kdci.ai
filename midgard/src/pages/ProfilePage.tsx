import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  LayoutGrid, Briefcase, FileText, BookOpen, Image as ImageIcon,
  LogOut, Settings, Users, UserCircle2, Pencil, Camera, Plus, Trash2,
  Check, X, MapPin, Calendar, Phone, Mail, Link2, Building2,
  Shield, Upload, ChevronLeft
} from 'lucide-react';
import { getMe } from '../lib/api';

// ---- Types ----
interface DirectReport { id: string; name: string; title: string; }
interface EmergencyContact { id: string; name: string; relationship: string; primaryPhone: string; secondaryPhone: string; email: string; }
interface ProfileData {
  coverImage: string; avatarImage: string; idPhotoImage: string;
  city: string; state: string;
  positionTitle: string; rank: string; department: string; hireDate: string;
  employeeId: string; employmentType: string; workLocation: string; reportsTo: string;
  directReports: DirectReport[];
  firstName: string; lastName: string; middleName: string;
  dateOfBirth: string; gender: string; pronouns: string; nationality: string; maritalStatus: string;
  personalEmail: string; workPhone: string; mobilePhone: string;
  officeLocation: string; linkedinUrl: string;
  workAddress: { street: string; city: string; state: string; zip: string };
  emergencyContacts: EmergencyContact[];
}

// ---- Constants ----
const RANKS       = ['Junior','Mid-Level','Senior','Lead','Manager','Director','VP','C-Suite'];
const EMP_TYPES   = ['Full-Time','Part-Time','Contractor','Intern'];
const WORK_LOCS   = ['On-site','Remote','Hybrid'];
const GENDERS     = ['Male','Female','Non-binary','Prefer not to say'];
const MARITAL     = ['Single','Married','Divorced','Widowed','Prefer not to say'];
const RELS        = ['Spouse','Parent','Sibling','Child','Friend','Other'];

// ---- Seed data ----
const SEED: ProfileData = {
  coverImage:'', avatarImage:'', idPhotoImage:'',
  city:'Manila', state:'NCR',
  positionTitle:'Senior Systems Analyst', rank:'Senior', department:'Information Technology',
  hireDate:'2019-03-12', employeeId:'EMP-001', employmentType:'Full-Time',
  workLocation:'On-site', reportsTo:'Jordan Lee',
  directReports:[
    { id:'1', name:'Casey Thompson', title:'IT Specialist' },
    { id:'2', name:'Devon Reyes',    title:'Systems Admin'  },
  ],
  firstName:'Alex', lastName:'Morgan', middleName:'',
  dateOfBirth:'1990-06-15', gender:'', pronouns:'', nationality:'', maritalStatus:'',
  personalEmail:'', workPhone:'', mobilePhone:'', officeLocation:'', linkedinUrl:'',
  workAddress:{ street:'', city:'', state:'', zip:'' },
  emergencyContacts:[
    { id:'1', name:'Sam Morgan', relationship:'Spouse', primaryPhone:'(555) 234-5678', secondaryPhone:'', email:'' },
  ],
};

// ---- Utilities ----
const calcTenure = (d: string) => {
  if (!d) return null;
  const hire = new Date(d), today = new Date();
  if (hire > today) return null;
  let y = today.getFullYear() - hire.getFullYear(), m = today.getMonth() - hire.getMonth();
  if (m < 0) { y--; m += 12; }
  return { y, m, hire };
};
const fmtTenure = (t: { y:number; m:number } | null) => {
  if (!t) return '';
  const p: string[] = [];
  if (t.y > 0) p.push(`${t.y} yr${t.y!==1?'s':''}`);
  if (t.m > 0) p.push(`${t.m} mo${t.m!==1?'s':''}`);
  return p.join(' ') || 'Less than a month';
};
const fmtDate = (d: string) =>
  d ? new Date(d+'T00:00:00').toLocaleDateString('en-US',{ year:'numeric', month:'long', day:'numeric' }) : '';
const calcAge = (d: string) => {
  if (!d) return null;
  const b = new Date(d+'T00:00:00'), today = new Date();
  let age = today.getFullYear() - b.getFullYear();
  const m = today.getMonth() - b.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
  return age;
};
const fmtPhone = (v: string) => {
  const d = v.replace(/\D/g,'').slice(0,10);
  if (d.length >= 7) return `(${d.slice(0,3)}) ${d.slice(3,6)}-${d.slice(6)}`;
  if (d.length >= 4) return `(${d.slice(0,3)}) ${d.slice(3)}`;
  return d.length ? `(${d}` : '';
};
const validEmail = (e: string) => !e || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
const calcCompleteness = (p: ProfileData) => {
  const f = [
    p.positionTitle, p.rank, p.department, p.hireDate, p.employmentType,
    p.workLocation, p.reportsTo, p.firstName, p.lastName, p.dateOfBirth,
    p.nationality, p.personalEmail, p.workPhone, p.mobilePhone, p.officeLocation,
    p.emergencyContacts[0]?.name,
  ];
  return Math.round(f.filter(x => x && String(x).trim()).length / f.length * 100);
};
const uid = () => Math.random().toString(36).slice(2);

// ---- Style constants ----
const iCls = 'w-full bg-black/30 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/20 placeholder:text-white/20 transition-all';
const lCls = 'text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5 block';

export const ProfilePage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [profile, setProfile]   = useState<ProfileData>(SEED);
  const [user, setUser]         = useState<{ email: string; name: string; role: string } | null>(null);
  const [editing, setEditing]   = useState<Record<string, boolean>>({});
  const [draft, setDraft]       = useState<Partial<ProfileData>>({});
  const [hasUnsaved, setHasUnsaved] = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});

  useEffect(() => {
    getMe().then(u => {
      setUser({ email: u.email, name: u.name, role: u.role });
      const key = `userProfile_${u.email}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        try { setProfile(JSON.parse(stored)); return; } catch {}
      }
      // First visit — seed with user's real name from auth and auto-save
      const parts = (u.name || '').trim().split(/\s+/);
      const initial: ProfileData = {
        ...SEED,
        firstName: parts[0] || '',
        lastName:  parts.slice(1).join(' ') || '',
      };
      setProfile(initial);
      localStorage.setItem(key, JSON.stringify(initial));
    }).catch(() => {});
  }, []);

  const persist = (updated: ProfileData) => {
    setProfile(updated);
    if (user) localStorage.setItem(`userProfile_${user.email}`, JSON.stringify(updated));
  };

  const startEdit = (key: string, data: Partial<ProfileData>) => {
    setEditing(e => ({ ...e, [key]: true }));
    setDraft(data);
    setHasUnsaved(true);
    setErrors({});
  };

  const save = (key: string) => {
    persist({ ...profile, ...draft });
    setEditing(e => ({ ...e, [key]: false }));
    setDraft({});
    setHasUnsaved(false);
    setErrors({});
  };

  const cancel = (key: string) => {
    setEditing(e => ({ ...e, [key]: false }));
    setDraft({});
    setErrors({});
    setHasUnsaved(false);
  };

  const d = <K extends keyof ProfileData>(k: K): ProfileData[K] =>
    (draft[k] !== undefined ? draft[k] : profile[k]) as ProfileData[K];
  const setD = <K extends keyof ProfileData>(k: K, v: ProfileData[K]) =>
    setDraft(prev => ({ ...prev, [k]: v }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: 'avatarImage'|'coverImage'|'idPhotoImage') => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => persist({ ...profile, [field]: reader.result as string });
    reader.readAsDataURL(file);
  };

  const nav = (id: string) => {
    if (hasUnsaved && !window.confirm('You have unsaved changes. Leave anyway?')) return;
    if (id === 'overview')  setView('dashboard');
    else if (id === 'careers')   setView('career-ops');
    else if (id === 'blog')      setView('blog-ops');
    else if (id === 'resources') setView('resources-ops');
    else if (id === 'portfolio') setView('portfolio-ops');
    else if (id === 'admin')     setView('admin-approvals');
  };

  const tenure = calcTenure(profile.hireDate);
  const completeness = calcCompleteness(profile);

  // Sub-components
  const ViewRow = ({ label, value, span }: { label: string; value?: string|null; span?: boolean }) => (
    <div className={span ? 'col-span-2' : ''}>
      <div className={lCls}>{label}</div>
      <div className="text-sm text-white font-medium min-h-[20px]">
        {value?.trim() ? value : <span className="text-white/20 italic">—</span>}
      </div>
    </div>
  );

  const CardHeader = ({ title, sectionKey, editData }: { title: string; sectionKey: string; editData: Partial<ProfileData> }) => (
    <div className="flex items-center justify-between mb-6">
      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{title}</span>
      {!editing[sectionKey] && (
        <button onClick={() => startEdit(sectionKey, editData)}
          className="p-2 rounded-lg text-white/20 hover:text-white hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100">
          <Pencil size={14} />
        </button>
      )}
    </div>
  );

  const SaveCancel = ({ sectionKey, validate }: { sectionKey: string; validate?: () => boolean }) => (
    <div className="flex gap-3 mt-6 pt-5 border-t border-white/5 col-span-2">
      <button onClick={() => { if (!validate || validate()) save(sectionKey); }}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#E61739] text-white text-xs font-black hover:bg-[#c51431] transition-all">
        <Check size={14} /> Save Changes
      </button>
      <button onClick={() => cancel(sectionKey)}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 text-white/60 text-xs font-black hover:bg-white/5 transition-all">
        <X size={14} /> Cancel
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">

      {/* ── Sidebar ── */}
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">Publisher Portal</div>
        </div>
        <nav className="flex-grow px-4 py-6 space-y-1">
          {([
            { id:'overview',  label:'Overview',           icon: LayoutGrid  },
            { id:'careers',   label:'Career Ops',         icon: Briefcase   },
            { id:'blog',      label:'Blogs & Insights',   icon: FileText    },
            { id:'resources', label:'Resources',          icon: BookOpen    },
            { id:'portfolio', label:'Creative Portfolio', icon: ImageIcon   },
            { id:'admin',     label:'User Approvals',     icon: Users       },
            { id:'profile',   label:'My Profile',         icon: UserCircle2 },
          ] as const).map(item => (
            <button key={item.id} onClick={() => item.id === 'profile' ? undefined : nav(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.id === 'profile' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2"><Settings size={18} /> Settings</button>
          <button onClick={() => { if (hasUnsaved && !window.confirm('You have unsaved changes. Leave anyway?')) return; setView('login'); }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-grow overflow-y-auto pb-20">

        {/* ── HERO ── */}
        <div className="relative">
          {/* Cover photo */}
          <div className="h-52 w-full relative overflow-hidden" style={{
            background: profile.coverImage ? `url(${profile.coverImage}) center/cover no-repeat` : 'linear-gradient(135deg, #1a050a 0%, #0d0d1f 45%, #1a0510 100%)',
          }}>
            <label className="absolute inset-0 cursor-pointer flex items-center justify-center bg-black/0 hover:bg-black/50 transition-all group">
              <div className="opacity-0 group-hover:opacity-100 flex items-center gap-2 bg-black/60 text-white text-xs font-bold px-4 py-2 rounded-full backdrop-blur-sm transition-all">
                <Camera size={13} /> Change Cover Photo
              </div>
              <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'coverImage')} />
            </label>
          </div>
          {/* Avatar */}
          <div className="absolute left-10" style={{ bottom: '-68px' }}>
            <div className="w-32 h-32 rounded-full border-4 border-[#0a0a0a] bg-[#111] overflow-hidden relative group cursor-pointer shadow-xl">
              {profile.avatarImage
                ? <img src={profile.avatarImage} alt="Avatar" className="w-full h-full object-cover" />
                : <div className="w-full h-full flex items-center justify-center text-5xl font-black text-[#E61739] select-none">{(profile.firstName||'A').charAt(0)}</div>
              }
              <label className="absolute inset-0 flex items-center justify-center bg-black/0 hover:bg-black/65 transition-all cursor-pointer">
                <Camera className="opacity-0 group-hover:opacity-100 text-white transition-all" size={24} />
                <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e, 'avatarImage')} />
              </label>
            </div>
          </div>
        </div>

        {/* Hero info strip */}
        <div className="pt-24 px-10 pb-8 border-b border-white/5">
          <div className="flex justify-between items-start gap-6">
            <div>
              <h1 className="text-3xl font-heading font-bold text-white leading-tight">
                {profile.firstName} {profile.lastName}
              </h1>
              <p className="text-white/50 text-base mt-1">{profile.positionTitle || <span className="italic text-white/20">No title set</span>}</p>
              <div className="flex flex-wrap items-center gap-3 mt-3">
                {profile.rank && (
                  <span className="px-3 py-1 rounded-full bg-[#E61739]/15 border border-[#E61739]/25 text-[#E61739] text-[11px] font-black uppercase tracking-widest">{profile.rank}</span>
                )}
                {profile.department && (
                  <span className="text-white/40 text-sm flex items-center gap-1.5"><Building2 size={12}/>{profile.department}</span>
                )}
                {(profile.city||profile.state) && (
                  <span className="text-white/40 text-sm flex items-center gap-1.5"><MapPin size={12}/>{[profile.city,profile.state].filter(Boolean).join(', ')}</span>
                )}
              </div>
              {tenure && (
                <p className="text-white/30 text-sm mt-2 flex items-center gap-1.5">
                  <Calendar size={13}/> Hired {fmtDate(profile.hireDate)}
                  <span className="text-white/20">·</span>
                  <span className="text-white/50 font-semibold">{fmtTenure(tenure)} tenure</span>
                </p>
              )}
            </div>
            <button onClick={() => startEdit('hero', { firstName:profile.firstName, lastName:profile.lastName, city:profile.city, state:profile.state })}
              className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/50 text-xs font-black hover:bg-white/5 hover:text-white transition-all">
              <Pencil size={13}/> Edit Profile
            </button>
          </div>

          {editing['hero'] && (
            <div className="mt-6 bg-black/20 border border-white/5 rounded-2xl p-6">
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lCls}>First Name</label><input className={iCls} value={d('firstName')} onChange={e => setD('firstName', e.target.value)} /></div>
                <div><label className={lCls}>Last Name</label><input className={iCls} value={d('lastName')} onChange={e => setD('lastName', e.target.value)} /></div>
                <div><label className={lCls}>City</label><input className={iCls} value={d('city')} onChange={e => setD('city', e.target.value)} /></div>
                <div><label className={lCls}>State / Region</label><input className={iCls} value={d('state')} onChange={e => setD('state', e.target.value)} /></div>
                <SaveCancel sectionKey="hero" />
              </div>
            </div>
          )}

          {/* Completeness bar */}
          <div className="mt-6">
            <div className="flex justify-between text-[11px] font-bold mb-2">
              <span className="text-white/50">Profile {completeness}% complete</span>
              <span className="text-white/25">{completeness < 100 ? 'Fill in more fields to reach 100%' : '✓ Profile complete'}</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-700"
                style={{ width:`${completeness}%`, background: completeness===100 ? '#22c55e' : '#E61739' }} />
            </div>
          </div>
        </div>

        <div className="px-10 py-8 space-y-6">

          {/* ── WORK INFORMATION ── */}
          <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 group">
            <CardHeader title="Work Information" sectionKey="work" editData={{
              positionTitle:profile.positionTitle, rank:profile.rank, department:profile.department,
              hireDate:profile.hireDate, employeeId:profile.employeeId, employmentType:profile.employmentType,
              workLocation:profile.workLocation, reportsTo:profile.reportsTo,
            }} />
            {!editing['work'] ? (
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                <ViewRow label="Position Title"   value={profile.positionTitle} />
                <ViewRow label="Rank"             value={profile.rank} />
                <ViewRow label="Department"       value={profile.department} />
                <ViewRow label="Hire Date"        value={fmtDate(profile.hireDate)} />
                <ViewRow label="Tenure"           value={fmtTenure(tenure)} />
                <ViewRow label="Employee ID"      value={profile.employeeId} />
                <ViewRow label="Employment Type"  value={profile.employmentType} />
                <ViewRow label="Work Location"    value={profile.workLocation} />
                <ViewRow label="Reports To"       value={profile.reportsTo} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lCls}>Position Title</label><input className={iCls} value={d('positionTitle')} onChange={e => setD('positionTitle', e.target.value)} /></div>
                <div>
                  <label className={lCls}>Rank</label>
                  <select className={iCls} value={d('rank')} onChange={e => setD('rank', e.target.value)}>
                    <option value="">Select rank...</option>
                    {RANKS.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div><label className={lCls}>Department</label><input className={iCls} value={d('department')} onChange={e => setD('department', e.target.value)} /></div>
                <div>
                  <label className={lCls}>Hire Date</label>
                  <input type="date" className={iCls} value={d('hireDate')} max={new Date().toISOString().split('T')[0]}
                    onChange={e => { setD('hireDate', e.target.value); setErrors(ev => { const x={...ev}; delete x.hireDate; return x; }); }} />
                  {errors.hireDate && <p className="text-red-400 text-[11px] mt-1">{errors.hireDate}</p>}
                </div>
                <div>
                  <label className={lCls}>Tenure (auto)</label>
                  <input className={`${iCls} cursor-not-allowed opacity-40`} readOnly value={fmtTenure(calcTenure(d('hireDate')))||'—'} />
                </div>
                <div>
                  <label className={lCls}>Employee ID (read-only)</label>
                  <input className={`${iCls} cursor-not-allowed opacity-40`} readOnly value={d('employeeId')} />
                </div>
                <div>
                  <label className={lCls}>Employment Type</label>
                  <select className={iCls} value={d('employmentType')} onChange={e => setD('employmentType', e.target.value)}>
                    <option value="">Select...</option>
                    {EMP_TYPES.map(t => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className={lCls}>Work Location</label>
                  <select className={iCls} value={d('workLocation')} onChange={e => setD('workLocation', e.target.value)}>
                    <option value="">Select...</option>
                    {WORK_LOCS.map(l => <option key={l}>{l}</option>)}
                  </select>
                </div>
                <div><label className={lCls}>Reports To</label><input className={iCls} value={d('reportsTo')} onChange={e => setD('reportsTo', e.target.value)} /></div>
                <SaveCancel sectionKey="work" validate={() => {
                  if (d('hireDate') && new Date(d('hireDate')) > new Date()) {
                    setErrors(e => ({ ...e, hireDate:'Hire date cannot be in the future.' })); return false;
                  }
                  return true;
                }} />
              </div>
            )}
          </div>

          {/* ── ORG CHART ── */}
          <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 group">
            <CardHeader title="Company Structure" sectionKey="org" editData={{
              reportsTo: profile.reportsTo,
              directReports: JSON.parse(JSON.stringify(profile.directReports)),
            }} />
            {!editing['org'] ? (
              <div className="flex flex-col items-center py-4 gap-0">
                {profile.reportsTo && (
                  <>
                    <div className="bg-black/40 border border-white/10 rounded-2xl px-8 py-4 text-center min-w-[180px]">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-white font-black text-lg">{profile.reportsTo.charAt(0)}</div>
                      <p className="text-white text-sm font-bold">{profile.reportsTo}</p>
                      <p className="text-white/30 text-xs mt-0.5">Manager</p>
                    </div>
                    <div className="w-0.5 h-8 bg-white/10" />
                  </>
                )}

                <div className="bg-[#E61739]/10 border-2 border-[#E61739]/30 rounded-2xl px-10 py-5 text-center min-w-[200px] relative">
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#E61739] rounded-full text-[9px] font-black uppercase tracking-widest text-white whitespace-nowrap">You</span>
                  <div className="w-14 h-14 rounded-full bg-[#E61739]/20 border-2 border-[#E61739]/40 flex items-center justify-center mx-auto mb-2 text-[#E61739] font-black text-2xl overflow-hidden">
                    {profile.avatarImage ? <img src={profile.avatarImage} alt="" className="w-full h-full object-cover" /> : (profile.firstName||'A').charAt(0)}
                  </div>
                  <p className="text-white font-bold">{profile.firstName} {profile.lastName}</p>
                  <p className="text-white/50 text-sm mt-0.5">{profile.positionTitle||'—'}</p>
                  {profile.rank && <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full bg-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase">{profile.rank}</span>}
                </div>

                {profile.directReports.length > 0 ? (
                  <>
                    <div className="w-0.5 h-8 bg-white/10" />
                    <div className="relative flex justify-center w-full">
                      {profile.directReports.length > 1 && (
                        <div className="absolute top-0 bg-white/10 h-0.5" style={{ width: `${Math.min(profile.directReports.length * 156, 700)}px`, maxWidth:'90%' }} />
                      )}
                      <div className="flex gap-4 flex-wrap justify-center pt-8">
                        {profile.directReports.map(r => (
                          <div key={r.id} className="bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-center" style={{ minWidth:130 }}>
                            <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-2 text-white font-black">{r.name.charAt(0)}</div>
                            <p className="text-white text-xs font-bold truncate">{r.name}</p>
                            <p className="text-white/30 text-[10px] mt-0.5 truncate">{r.title}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="mt-5 text-white/20 text-sm italic">No direct reports added yet.</p>
                )}
              </div>
            ) : (
              <div className="space-y-5">
                <div>
                  <label className={lCls}>Reports To (Manager)</label>
                  <input className={iCls} value={d('reportsTo')} placeholder="Manager name..." onChange={e => setD('reportsTo', e.target.value)} />
                </div>
                <div>
                  <label className={lCls}>Direct Reports</label>
                  <div className="space-y-2">
                    {(d('directReports') as DirectReport[]).map((r, i) => {
                      const rpts = d('directReports') as DirectReport[];
                      return (
                        <div key={r.id} className="flex gap-2 items-center">
                          <input className={`${iCls} flex-1`} value={r.name} placeholder="Name"
                            onChange={e => { const a=[...rpts]; a[i]={...a[i],name:e.target.value}; setD('directReports', a as any); }} />
                          <input className={`${iCls} flex-1`} value={r.title} placeholder="Title"
                            onChange={e => { const a=[...rpts]; a[i]={...a[i],title:e.target.value}; setD('directReports', a as any); }} />
                          <button onClick={() => setD('directReports', rpts.filter((_,j)=>j!==i) as any)}
                            className="p-2 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={14}/></button>
                        </div>
                      );
                    })}
                    {(d('directReports') as DirectReport[]).length < 6 && (
                      <button onClick={() => setD('directReports', [...(d('directReports') as DirectReport[]), { id:uid(), name:'', title:'' }] as any)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 text-white/40 text-xs font-bold hover:bg-white/5 transition-all">
                        <Plus size={12}/> Add Report
                      </button>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2"><SaveCancel sectionKey="org" /></div>
              </div>
            )}
          </div>

          {/* ── PERSONAL INFORMATION ── */}
          <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 group">
            <CardHeader title="Personal Information" sectionKey="personal" editData={{
              firstName:profile.firstName, lastName:profile.lastName, middleName:profile.middleName,
              dateOfBirth:profile.dateOfBirth, gender:profile.gender, pronouns:profile.pronouns,
              nationality:profile.nationality, maritalStatus:profile.maritalStatus,
            }} />
            {!editing['personal'] ? (
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                <ViewRow label="First Name"     value={profile.firstName} />
                <ViewRow label="Last Name"      value={profile.lastName} />
                <ViewRow label="Middle Name"    value={profile.middleName} />
                <ViewRow label="Date of Birth"  value={profile.dateOfBirth ? `${fmtDate(profile.dateOfBirth)}  ·  ${calcAge(profile.dateOfBirth)} years old` : null} />
                <ViewRow label="Gender"         value={profile.gender} />
                <ViewRow label="Pronouns"       value={profile.pronouns} />
                <ViewRow label="Nationality"    value={profile.nationality} />
                <ViewRow label="Marital Status" value={profile.maritalStatus} />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div><label className={lCls}>First Name</label><input className={iCls} value={d('firstName')} onChange={e => setD('firstName', e.target.value)} /></div>
                <div><label className={lCls}>Last Name</label><input className={iCls} value={d('lastName')} onChange={e => setD('lastName', e.target.value)} /></div>
                <div><label className={lCls}>Middle Name</label><input className={iCls} value={d('middleName')} onChange={e => setD('middleName', e.target.value)} /></div>
                <div>
                  <label className={lCls}>Date of Birth</label>
                  <input type="date" className={iCls} value={d('dateOfBirth')}
                    onChange={e => { setD('dateOfBirth', e.target.value); setErrors(ev => { const x={...ev}; delete x.dob; return x; }); }} />
                  {errors.dob && <p className="text-red-400 text-[11px] mt-1">{errors.dob}</p>}
                </div>
                <div>
                  <label className={lCls}>Gender (Optional)</label>
                  <select className={iCls} value={d('gender')} onChange={e => setD('gender', e.target.value)}>
                    <option value="">Prefer not to say</option>
                    {GENDERS.map(g => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div><label className={lCls}>Pronouns (Optional)</label><input className={iCls} value={d('pronouns')} placeholder="e.g. they/them" onChange={e => setD('pronouns', e.target.value)} /></div>
                <div><label className={lCls}>Nationality</label><input className={iCls} value={d('nationality')} onChange={e => setD('nationality', e.target.value)} /></div>
                <div>
                  <label className={lCls}>Marital Status (Optional)</label>
                  <select className={iCls} value={d('maritalStatus')} onChange={e => setD('maritalStatus', e.target.value)}>
                    <option value="">Select...</option>
                    {MARITAL.map(m => <option key={m}>{m}</option>)}
                  </select>
                </div>
                <SaveCancel sectionKey="personal" validate={() => {
                  const age = calcAge(d('dateOfBirth'));
                  if (d('dateOfBirth') && (age === null || age < 16)) {
                    setErrors(e => ({ ...e, dob:'Age must be 16 or older.' })); return false;
                  }
                  return true;
                }} />
              </div>
            )}
          </div>

          {/* ── CONTACT INFORMATION ── */}
          <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 group">
            <CardHeader title="Contact Information" sectionKey="contact" editData={{
              personalEmail:profile.personalEmail, workPhone:profile.workPhone, mobilePhone:profile.mobilePhone,
              officeLocation:profile.officeLocation, linkedinUrl:profile.linkedinUrl,
              workAddress:{ ...profile.workAddress },
            }} />
            {!editing['contact'] ? (
              <div className="grid grid-cols-2 gap-x-10 gap-y-5">
                <div>
                  <div className={lCls}>Work Email</div>
                  <div className="flex items-center gap-2 text-sm text-white font-medium">
                    <Mail size={13} className="text-white/30"/>{user?.email||'—'}
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/20 bg-white/5 px-1.5 py-0.5 rounded">read-only</span>
                  </div>
                </div>
                <ViewRow label="Personal Email"       value={profile.personalEmail} />
                <ViewRow label="Work Phone"           value={profile.workPhone} />
                <ViewRow label="Mobile Phone"         value={profile.mobilePhone} />
                <ViewRow label="Office Location/Room" value={profile.officeLocation} />
                <ViewRow label="LinkedIn URL"         value={profile.linkedinUrl} />
                {(profile.workAddress.street||profile.workAddress.city) && (
                  <ViewRow label="Work Address" span
                    value={[profile.workAddress.street,profile.workAddress.city,profile.workAddress.state,profile.workAddress.zip].filter(Boolean).join(', ')} />
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={lCls}>Work Email (Read-Only)</label>
                  <input className={`${iCls} opacity-40 cursor-not-allowed`} readOnly value={user?.email??''} />
                </div>
                <div>
                  <label className={lCls}>Personal Email</label>
                  <input type="email" className={iCls} value={d('personalEmail')} placeholder="personal@email.com"
                    onChange={e => { setD('personalEmail', e.target.value); setErrors(ev => { const x={...ev}; delete x.pemail; return x; }); }}
                    onBlur={() => { if (!validEmail(d('personalEmail'))) setErrors(e => ({ ...e, pemail:'Invalid email format.' })); }} />
                  {errors.pemail && <p className="text-red-400 text-[11px] mt-1">{errors.pemail}</p>}
                </div>
                <div>
                  <label className={lCls}>Work Phone</label>
                  <input className={iCls} value={d('workPhone')} placeholder="(###) ###-####"
                    onChange={e => setD('workPhone', e.target.value)}
                    onBlur={() => setD('workPhone', fmtPhone(d('workPhone')))} />
                </div>
                <div>
                  <label className={lCls}>Mobile Phone</label>
                  <input className={iCls} value={d('mobilePhone')} placeholder="(###) ###-####"
                    onChange={e => setD('mobilePhone', e.target.value)}
                    onBlur={() => setD('mobilePhone', fmtPhone(d('mobilePhone')))} />
                </div>
                <div><label className={lCls}>Office Location / Room</label><input className={iCls} value={d('officeLocation')} onChange={e => setD('officeLocation', e.target.value)} /></div>
                <div><label className={lCls}>LinkedIn URL</label><input className={iCls} value={d('linkedinUrl')} placeholder="https://linkedin.com/in/..." onChange={e => setD('linkedinUrl', e.target.value)} /></div>
                <div className="col-span-2">
                  <label className={lCls}>Work Address</label>
                  <div className="grid grid-cols-2 gap-2">
                    {(['street','city','state','zip'] as const).map(k => (
                      <input key={k} className={iCls} placeholder={k.charAt(0).toUpperCase()+k.slice(1)}
                        value={(d('workAddress') as ProfileData['workAddress'])[k]}
                        onChange={e => setD('workAddress', { ...d('workAddress') as ProfileData['workAddress'], [k]: e.target.value })} />
                    ))}
                  </div>
                </div>
                <SaveCancel sectionKey="contact" validate={() => {
                  if (!validEmail(d('personalEmail'))) { setErrors(e => ({ ...e, pemail:'Invalid email format.' })); return false; }
                  return true;
                }} />
              </div>
            )}
          </div>

          {/* ── EMERGENCY CONTACTS ── */}
          <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8 group">
            <CardHeader title="Emergency Contacts" sectionKey="emergency" editData={{
              emergencyContacts: JSON.parse(JSON.stringify(profile.emergencyContacts)),
            }} />
            {!editing['emergency'] ? (
              <div className="space-y-6">
                {profile.emergencyContacts.length === 0 && (
                  <p className="text-white/20 text-sm italic">No emergency contacts added.</p>
                )}
                {profile.emergencyContacts.map((c, i) => (
                  <div key={c.id} className={i>0 ? 'pt-6 border-t border-white/5' : ''}>
                    <div className="flex items-center gap-2 mb-4">
                      <Shield size={13} className="text-[#E61739]"/>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30">Contact {i+1}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-10 gap-y-4">
                      <ViewRow label="Full Name"       value={c.name} />
                      <ViewRow label="Relationship"    value={c.relationship} />
                      <ViewRow label="Primary Phone"   value={c.primaryPhone} />
                      <ViewRow label="Secondary Phone" value={c.secondaryPhone} />
                      <ViewRow label="Email"           value={c.email} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {(d('emergencyContacts') as EmergencyContact[]).map((c, i) => (
                  <div key={c.id} className={i>0 ? 'pt-6 border-t border-white/5' : ''}>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/30 flex items-center gap-2">
                        <Shield size={12} className="text-[#E61739]"/>Contact {i+1}
                      </span>
                      {i > 0 && (
                        <button onClick={() => setD('emergencyContacts', (d('emergencyContacts') as EmergencyContact[]).filter((_,j)=>j!==i) as any)}
                          className="text-red-400/60 hover:text-red-400 text-xs font-bold flex items-center gap-1 transition-colors">
                          <Trash2 size={11}/> Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {(['name','primaryPhone','secondaryPhone','email'] as const).map(k => {
                        const labels: Record<string,string> = { name:'Full Name', primaryPhone:'Primary Phone', secondaryPhone:'Secondary Phone', email:'Email' };
                        return (
                          <div key={k}>
                            <label className={lCls}>{labels[k]}</label>
                            <input className={iCls} value={c[k]}
                              onChange={e => { const cs=[...(d('emergencyContacts') as EmergencyContact[])]; cs[i]={...cs[i],[k]:e.target.value}; setD('emergencyContacts',cs as any); }}
                              onBlur={() => {
                                if (k.includes('Phone')) {
                                  const cs=[...(d('emergencyContacts') as EmergencyContact[])];
                                  cs[i]={...cs[i],[k]:fmtPhone(cs[i][k])};
                                  setD('emergencyContacts',cs as any);
                                }
                              }} />
                          </div>
                        );
                      })}
                      <div>
                        <label className={lCls}>Relationship</label>
                        <select className={iCls} value={c.relationship}
                          onChange={e => { const cs=[...(d('emergencyContacts') as EmergencyContact[])]; cs[i]={...cs[i],relationship:e.target.value}; setD('emergencyContacts',cs as any); }}>
                          <option value="">Select...</option>
                          {RELS.map(r => <option key={r}>{r}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
                {(d('emergencyContacts') as EmergencyContact[]).length < 2 && (
                  <button onClick={() => setD('emergencyContacts', [...(d('emergencyContacts') as EmergencyContact[]), { id:uid(), name:'', relationship:'', primaryPhone:'', secondaryPhone:'', email:'' }] as any)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/40 text-xs font-bold hover:bg-white/5 transition-all">
                    <Plus size={12}/> Add Second Contact
                  </button>
                )}
                <div className="grid grid-cols-2"><SaveCancel sectionKey="emergency" /></div>
              </div>
            )}
          </div>

          {/* ── DOCUMENTS ── */}
          <div className="bg-[#141414] border border-white/5 rounded-[2rem] p-8">
            <h2 className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-6">Profile Photo &amp; Documents</h2>
            <div className="grid grid-cols-2 gap-10">
              <div>
                <label className={lCls}>Profile Photo</label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-20 h-20 rounded-full bg-black/30 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                    {profile.avatarImage ? <img src={profile.avatarImage} alt="" className="w-full h-full object-cover"/> : <span className="text-3xl font-black text-[#E61739]">{(profile.firstName||'A').charAt(0)}</span>}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/50 text-xs font-bold hover:bg-white/5 cursor-pointer transition-all">
                    <Upload size={13}/> Upload Photo
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e,'avatarImage')} />
                  </label>
                </div>
              </div>
              <div>
                <label className={lCls}>ID / Badge Photo</label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-20 h-20 rounded-xl bg-black/30 border border-white/10 overflow-hidden flex items-center justify-center shrink-0">
                    {profile.idPhotoImage ? <img src={profile.idPhotoImage} alt="" className="w-full h-full object-cover"/> : <Shield size={26} className="text-white/10"/>}
                  </div>
                  <label className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-white/50 text-xs font-bold hover:bg-white/5 cursor-pointer transition-all">
                    <Upload size={13}/> Upload ID Photo
                    <input type="file" accept="image/*" className="hidden" onChange={e => handleImageUpload(e,'idPhotoImage')} />
                  </label>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};
