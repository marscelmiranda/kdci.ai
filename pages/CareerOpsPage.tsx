
import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  LayoutGrid, Briefcase, FileText, TrendingUp, BookOpen, Award,
  Image as ImageIcon, Bell, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Trash2, Eye, Save, X, Check, MapPin, Clock, Users, Code, Zap, Sparkles,
  Calendar, ClipboardList, Activity, MoreHorizontal, UserCheck, UserX, UserMinus, UserPlus, Linkedin, Mail, Link,
  MousePointerClick, MessageSquare, Bookmark, Archive, Layers, BarChart as BarChartIcon, Filter
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';

interface JobListing {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: 'Active' | 'Draft' | 'Closed';
  applicants: number;
  postedDate: string;
}

interface Applicant {
  id: string;
  name: string;
  jobTitle: string;
  experience: number; // years
  previousRole: string;
  education: string;
  compatibilityScore: number; // 0-100
  insights: string;
  source: 'LinkedIn' | 'Email' | 'Careers Page' | 'Referrals' | 'Added Manually';
  stage: 'Applied' | 'Screening' | 'Interview' | 'Evaluation' | 'Offer' | 'Disqualified';
  evaluationScore?: number; // Optional, out of 100
  dateApplied: string;
}

const MOCK_JOBS: JobListing[] = [
  { id: '1', title: "Senior AI Prompt Engineer", department: "AI & Data", location: "Manila (Hybrid)", type: "Full-Time", status: 'Active', applicants: 42, postedDate: 'Oct 24, 2024' },
  { id: '2', title: "Full-Stack Developer (React/Node)", department: "Engineering", location: "Remote", type: "Full-Time", status: 'Active', applicants: 18, postedDate: 'Oct 22, 2024' },
  { id: '3', title: "DevOps Architect", department: "Engineering", location: "Manila (On-site)", type: "Full-Time", status: 'Draft', applicants: 0, postedDate: '-' },
  { id: '4', title: "Customer Success Manager", department: "CX & Support", location: "Remote", type: "Full-Time", status: 'Closed', applicants: 156, postedDate: 'Sep 15, 2024' },
  { id: '5', title: "UI/UX Designer", department: "Creative", location: "Manila (Hybrid)", type: "Full-Time", status: 'Active', applicants: 8, postedDate: 'Oct 20, 2024' },
];

const MOCK_APPLICANTS: Applicant[] = [
  {
    id: 'a1',
    name: 'Alex Rivera',
    jobTitle: 'Senior AI Prompt Engineer',
    experience: 5,
    previousRole: 'NLP Researcher at TechGen',
    education: 'MS in Computer Science, Stanford',
    compatibilityScore: 95,
    insights: 'Strong background in LLM fine-tuning and RAG architectures. Matches 90% of technical requirements.',
    source: 'LinkedIn',
    stage: 'Evaluation',
    evaluationScore: 92,
    dateApplied: '2024-10-24'
  },
  {
    id: 'a2',
    name: 'Jordan Smith',
    jobTitle: 'Full-Stack Developer (React/Node)',
    experience: 4,
    previousRole: 'Senior Dev at CloudScale',
    education: 'BS in Software Engineering, MIT',
    compatibilityScore: 88,
    insights: 'Expert in React and Node.js. Previous experience with high-concurrency SaaS platforms is a major plus.',
    source: 'Careers Page',
    stage: 'Interview',
    evaluationScore: 85,
    dateApplied: '2024-10-20'
  },
  {
    id: 'a3',
    name: 'Casey Johnson',
    jobTitle: 'UI/UX Designer',
    experience: 3,
    previousRole: 'Product Designer at CreativeFlow',
    education: 'BFA in Graphic Design, RISD',
    compatibilityScore: 82,
    insights: 'Excellent portfolio. Strong focus on accessibility and design systems. Slightly below target experience for "Senior" but high potential.',
    source: 'Referrals',
    stage: 'Screening',
    dateApplied: '2024-10-22'
  },
  {
    id: 'a4',
    name: 'Taylor Morgan',
    jobTitle: 'Senior AI Prompt Engineer',
    experience: 2,
    previousRole: 'Content Strategist at AI-Write',
    education: 'BA in Linguistics, UC Berkeley',
    compatibilityScore: 75,
    insights: 'Unique linguistics background is valuable for prompt engineering, but lacks deep technical experience with vector databases.',
    source: 'Email',
    stage: 'Applied',
    dateApplied: '2024-10-23'
  }
];

export const CareerOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor' | 'applicants' | 'analytics'>('list');
  const [jobs, setJobs] = useState<JobListing[]>(MOCK_JOBS);
  const [applicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Analytics State
  const [analyticsMetric, setAnalyticsMetric] = useState<'published' | 'filled' | 'archived' | 'fillRate' | 'timeToFill' | 'timeToClose'>('published');
  const [analyticsFilter, setAnalyticsFilter] = useState<'week' | 'month' | 'quarter' | 'year' | 'custom'>('month');

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [applicantSearchQuery, setApplicantSearchQuery] = useState('');
  const [activeApplicantTab, setActiveApplicantTab] = useState<'overview' | 'calendar' | 'evaluations' | 'activity'>('overview');
  const [activeSourceFilter, setActiveSourceFilter] = useState<string | null>(null);
  const [activeJobFilter, setActiveJobFilter] = useState<'All Jobs' | 'Followed' | 'Involved' | 'Active' | 'Archived'>('All Jobs');
  const [applicantSort, setApplicantSort] = useState<{key: keyof Applicant, direction: 'asc'|'desc'}>({key: 'compatibilityScore', direction: 'desc'});
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  
  const livePostings = jobs.filter(j => j.status === 'Active').length;
  const totalApplicants = jobs.reduce((sum, j) => sum + j.applicants, 0);
  
  // Editor State
  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: '',
    type: 'Full-Time',
    description: '',
    requirements: '',
    status: 'Draft'
  });

  // Isolate styles
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const handleEdit = (job: JobListing) => {
    setEditingId(job.id);
    setFormData({
      title: job.title,
      department: job.department,
      location: job.location,
      type: job.type,
      description: "Sample description loaded...", // In real app, load full details
      requirements: "- Requirement 1\n- Requirement 2",
      status: job.status as string
    });
    setViewState('editor');
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      department: 'Engineering',
      location: '',
      type: 'Full-Time',
      description: '',
      requirements: '',
      status: 'Draft'
    });
    setViewState('editor');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      // Update existing
      setJobs(prev => prev.map(job => job.id === editingId ? { ...job, ...formData, id: job.id, applicants: job.applicants, postedDate: job.postedDate } as JobListing : job));
    } else {
      // Create new
      const newJob: JobListing = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        applicants: 0,
        postedDate: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      } as JobListing;
      setJobs([newJob, ...jobs]);
    }
    setViewState('list');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this job posting?")) {
      setJobs(prev => prev.filter(j => j.id !== id));
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('publisher-dashboard');
    else if (id === 'careers') setView('cms-career-ops');
    else if (id === 'blog') setView('cms-blog-ops');
    else if (id === 'case-studies') setView('cms-case-studies-ops');
    else if (id === 'resources') setView('cms-resources-ops');
    else if (id === 'portfolio') setView('cms-portfolio-ops');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      
      {/* Sidebar Navigation (Reused from Dashboard for consistency) */}
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>

        <nav className="flex-grow px-4 py-6 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutGrid },
            { id: 'careers', label: 'Career Ops', icon: Briefcase },
            { id: 'blog', label: 'Blogs & Insights', icon: FileText },
            { id: 'case-studies', label: 'Case Studies', icon: Award },
            { id: 'resources', label: 'Resources', icon: BookOpen },
            { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.id === 'careers' 
                  ? 'bg-white/10 text-white shadow-sm' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2">
            <Settings size={18} /> Settings
          </button>
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
        
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
              <span onClick={() => setView('publisher-dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
              <ChevronLeft size={10} className="rotate-180" />
              <span className="text-[#E61739]">Career Ops</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">Job Postings</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {viewState === 'list' && (
              <button 
                onClick={handleCreateNew}
                className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red"
              >
                <Plus size={16} /> Create Job Post
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div 
            onClick={() => setViewState('list')}
            className={`bg-[#1a1a1a] border ${viewState === 'list' ? 'border-[#E61739]/50' : 'border-white/5'} rounded-2xl p-6 flex items-center gap-5 group hover:border-[#E61739]/30 transition-all cursor-pointer`}
          >
            <div className="w-14 h-14 rounded-xl bg-[#E61739]/10 flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform">
              <Briefcase size={28} />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Live Job Postings</div>
              <div className="text-3xl font-heading font-bold text-white">{livePostings}</div>
            </div>
          </div>

          <div 
            onClick={() => setViewState('applicants')}
            className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex items-center gap-5 group hover:border-[#E61739]/30 transition-all cursor-pointer"
          >
            <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
              <Users size={28} />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Active Pool of Applicants</div>
              <div className="text-3xl font-heading font-bold text-white">{totalApplicants.toLocaleString()}</div>
            </div>
          </div>

          <div 
            onClick={() => setViewState('analytics')}
            className={`bg-[#1a1a1a] border ${viewState === 'analytics' ? 'border-[#E61739]/50' : 'border-white/5'} rounded-2xl p-6 flex items-center gap-5 group hover:border-[#E61739]/30 transition-all cursor-pointer`}
          >
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 group-hover:scale-110 transition-transform">
              <BarChartIcon size={28} />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Analytics</div>
              <div className="text-3xl font-heading font-bold text-white">View</div>
            </div>
          </div>
        </div>

        {/* --- VIEW: LIST --- */}
        {viewState === 'list' && (() => {
          const counts = {
            all: jobs.length,
            followed: jobs.filter(j => j.isFollowed).length,
            involved: jobs.filter(j => j.isInvolved).length,
            active: jobs.filter(j => j.status === 'Active' && (j.isInvolved || j.isFollowed)).length,
            archived: jobs.filter(j => j.status === 'Closed').length
          };

          const filteredJobs = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 job.department.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDept = deptFilter === 'All' || job.department === deptFilter;
            const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
            
            let matchesJobFilter = true;
            if (activeJobFilter === 'Followed') matchesJobFilter = !!job.isFollowed;
            if (activeJobFilter === 'Involved') matchesJobFilter = !!job.isInvolved;
            if (activeJobFilter === 'Active') matchesJobFilter = job.status === 'Active' && (!!job.isFollowed || !!job.isInvolved);
            if (activeJobFilter === 'Archived') matchesJobFilter = job.status === 'Closed';

            return matchesSearch && matchesDept && matchesStatus && matchesJobFilter;
          });

          return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              
              {/* Job Source Widget */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
                <button onClick={() => setActiveJobFilter('All Jobs')} className={`text-left bg-[#1a1a1a] border ${activeJobFilter === 'All Jobs' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                  <div className="text-white/40 mb-3"><Layers size={24} /></div>
                  <div className="text-3xl font-black text-white mb-1">{counts.all}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">All Jobs</div>
                </button>
                <button onClick={() => setActiveJobFilter('Followed')} className={`text-left bg-[#1a1a1a] border ${activeJobFilter === 'Followed' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                  <div className="text-white/40 mb-3"><Bookmark size={24} /></div>
                  <div className="text-3xl font-black text-white mb-1">{counts.followed}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Followed</div>
                </button>
                <button onClick={() => setActiveJobFilter('Involved')} className={`text-left bg-[#1a1a1a] border ${activeJobFilter === 'Involved' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                  <div className="text-white/40 mb-3"><UserCheck size={24} /></div>
                  <div className="text-3xl font-black text-white mb-1">{counts.involved}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">I'm Involved In</div>
                </button>
                <button onClick={() => setActiveJobFilter('Active')} className={`text-left bg-[#1a1a1a] border ${activeJobFilter === 'Active' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                  <div className="text-white/40 mb-3"><Zap size={24} /></div>
                  <div className="text-3xl font-black text-white mb-1">{counts.active}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Active</div>
                </button>
                <button onClick={() => setActiveJobFilter('Archived')} className={`text-left bg-[#1a1a1a] border ${activeJobFilter === 'Archived' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                  <div className="text-white/40 mb-3"><Archive size={24} /></div>
                  <div className="text-3xl font-black text-white mb-1">{counts.archived}</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Archived</div>
                </button>
              </div>

              {/* Filters */}
              <div className="flex items-center gap-4 mb-8">
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by title or department..." 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-colors"
                  />
                </div>
                <select 
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]"
                >
                  <option value="All">All Departments</option>
                  <option value="Engineering">Engineering</option>
                  <option value="AI & Data">AI & Data</option>
                  <option value="Creative">Creative</option>
                  <option value="CX & Support">CX & Support</option>
                  <option value="Operations">Operations</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]"
                >
                  <option value="All">All Statuses</option>
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {/* Table */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                      <th className="px-8 py-5">Job Title</th>
                      <th className="px-8 py-5">Department</th>
                      <th className="px-8 py-5">Location</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Applicants</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredJobs.length > 0 ? (
                      filteredJobs.map((job) => (
                        <tr key={job.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="font-bold text-white">{job.title}</div>
                            <div className="text-xs text-white/40">{job.type}</div>
                          </td>
                          <td className="px-8 py-5 text-sm text-white/70">{job.department}</td>
                          <td className="px-8 py-5 text-sm text-white/70 flex items-center gap-2">
                            <MapPin size={12} className="text-[#E61739]" /> {job.location}
                          </td>
                          <td className="px-8 py-5">
                            <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                              job.status === 'Active' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                              job.status === 'Draft' ? 'bg-white/5 text-white/50 border-white/10' :
                              'bg-red-500/10 text-red-500 border-red-500/20'
                            }`}>
                              {job.status}
                            </span>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-2 text-sm font-bold">
                              <Users size={14} className="text-white/30" />
                              {job.applicants}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="View">
                                <Eye size={16} />
                              </button>
                              <button onClick={() => handleEdit(job)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739] transition-colors" title="Edit">
                                <Edit2 size={16} />
                              </button>
                              <button onClick={() => handleDelete(job.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500 transition-colors" title="Delete">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-8 py-20 text-center text-white/40">
                          <div className="flex flex-col items-center gap-4">
                            <Search size={40} className="opacity-20" />
                            <p className="font-bold">No job postings match your filters.</p>
                            <button 
                              onClick={() => { setSearchQuery(''); setDeptFilter('All'); setStatusFilter('All'); }}
                              className="text-[#E61739] text-sm font-bold hover:underline"
                            >
                              Clear all filters
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })()}

        {/* --- VIEW: APPLICANTS --- */}
        {viewState === 'applicants' && (() => {
          let filteredApplicants = applicants.filter(app => 
            app.name.toLowerCase().includes(applicantSearchQuery.toLowerCase()) ||
            app.jobTitle.toLowerCase().includes(applicantSearchQuery.toLowerCase()) ||
            app.previousRole.toLowerCase().includes(applicantSearchQuery.toLowerCase())
          );

          if (activeSourceFilter) {
            filteredApplicants = filteredApplicants.filter(app => app.source === activeSourceFilter);
          }

          filteredApplicants.sort((a, b) => {
            const aVal = a[applicantSort.key];
            const bVal = b[applicantSort.key];
            if (aVal === undefined || bVal === undefined) return 0;
            if (aVal < bVal) return applicantSort.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return applicantSort.direction === 'asc' ? 1 : -1;
            return 0;
          });

          const handleSort = (key: keyof Applicant) => {
            if (applicantSort.key === key) {
              setApplicantSort({ key, direction: applicantSort.direction === 'asc' ? 'desc' : 'asc' });
            } else {
              setApplicantSort({ key, direction: 'desc' });
            }
          };

          return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setViewState('list')}
                    className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <h2 className="text-xl font-bold text-white">Active Applicant Pool</h2>
                </div>
                
                <div className="relative flex-grow max-w-md">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                  <input 
                    type="text" 
                    value={applicantSearchQuery}
                    onChange={(e) => setApplicantSearchQuery(e.target.value)}
                    placeholder="Search applicants by name, role, or experience..." 
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-colors"
                  />
                </div>
              </div>

              {/* Applicant Tabs */}
              <div className="flex items-center gap-4 border-b border-white/10 mb-8 overflow-x-auto pb-px">
                <button
                  onClick={() => setActiveApplicantTab('overview')}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeApplicantTab === 'overview'
                      ? 'border-[#E61739] text-white'
                      : 'border-transparent text-white/40 hover:text-white/80'
                  }`}
                >
                  <TrendingUp size={16} /> Overview
                </button>
                <button
                  onClick={() => setActiveApplicantTab('calendar')}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeApplicantTab === 'calendar'
                      ? 'border-[#E61739] text-white'
                      : 'border-transparent text-white/40 hover:text-white/80'
                  }`}
                >
                  <Calendar size={16} /> Calendar
                </button>
                <button
                  onClick={() => setActiveApplicantTab('evaluations')}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeApplicantTab === 'evaluations'
                      ? 'border-[#E61739] text-white'
                      : 'border-transparent text-white/40 hover:text-white/80'
                  }`}
                >
                  <ClipboardList size={16} /> Evaluations
                </button>
                <button
                  onClick={() => setActiveApplicantTab('activity')}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
                    activeApplicantTab === 'activity'
                      ? 'border-[#E61739] text-white'
                      : 'border-transparent text-white/40 hover:text-white/80'
                  }`}
                >
                  <Activity size={16} /> Activity
                </button>
              </div>

              {activeApplicantTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-300">
                  {/* Sources Widget */}
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <button onClick={() => setActiveSourceFilter(null)} className={`text-left bg-[#1a1a1a] border ${activeSourceFilter === null ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                      <div className="text-white/40 mb-3"><Users size={24} /></div>
                      <div className="text-3xl font-black text-white mb-1">2,855</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Total Candidates</div>
                    </button>
                    <button onClick={() => setActiveSourceFilter('LinkedIn')} className={`text-left bg-[#1a1a1a] border ${activeSourceFilter === 'LinkedIn' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                      <div className="text-white/40 mb-3"><Linkedin size={24} /></div>
                      <div className="text-3xl font-black text-white mb-1">1,240</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">LinkedIn</div>
                    </button>
                    <button onClick={() => setActiveSourceFilter('Email')} className={`text-left bg-[#1a1a1a] border ${activeSourceFilter === 'Email' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                      <div className="text-white/40 mb-3"><Mail size={24} /></div>
                      <div className="text-3xl font-black text-white mb-1">843</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Via Email</div>
                    </button>
                    <button onClick={() => setActiveSourceFilter('Careers Page')} className={`text-left bg-[#1a1a1a] border ${activeSourceFilter === 'Careers Page' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                      <div className="text-white/40 mb-3"><MousePointerClick size={24} /></div>
                      <div className="text-3xl font-black text-white mb-1">512</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Careers Page</div>
                    </button>
                    <button onClick={() => setActiveSourceFilter('Referrals')} className={`text-left bg-[#1a1a1a] border ${activeSourceFilter === 'Referrals' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                      <div className="text-white/40 mb-3"><Link size={24} /></div>
                      <div className="text-3xl font-black text-white mb-1">215</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Referrals</div>
                    </button>
                    <button onClick={() => setActiveSourceFilter('Added Manually')} className={`text-left bg-[#1a1a1a] border ${activeSourceFilter === 'Added Manually' ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5'} hover:border-white/20 rounded-2xl p-6 transition-all duration-300`}>
                      <div className="text-white/40 mb-3"><Plus size={24} /></div>
                      <div className="text-3xl font-black text-white mb-1">45</div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40">Added Manually</div>
                    </button>
                  </div>

                  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                    <div className="px-8 py-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                      <h3 className="text-sm font-bold text-white">{activeSourceFilter ? `${activeSourceFilter} Applicants` : 'Recent Applicants'}</h3>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                            <th className="px-8 py-5 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort('name')}>
                              Name {applicantSort.key === 'name' && (applicantSort.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort('jobTitle')}>
                              Job {applicantSort.key === 'jobTitle' && (applicantSort.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort('stage')}>
                              Stage {applicantSort.key === 'stage' && (applicantSort.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort('compatibilityScore')}>
                              Compatibility {applicantSort.key === 'compatibilityScore' && (applicantSort.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort('evaluationScore')}>
                              Evaluation Score {applicantSort.key === 'evaluationScore' && (applicantSort.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-5 cursor-pointer hover:text-white transition-colors whitespace-nowrap" onClick={() => handleSort('dateApplied')}>
                              Date Applied {applicantSort.key === 'dateApplied' && (applicantSort.direction === 'asc' ? '↑' : '↓')}
                            </th>
                            <th className="px-8 py-5 text-right whitespace-nowrap">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                          {filteredApplicants.length > 0 ? (
                            filteredApplicants.map((applicant) => (
                              <tr key={applicant.id} className="hover:bg-white/5 transition-colors group">
                                <td className="px-8 py-5">
                                  <div className="font-bold text-white">{applicant.name}</div>
                                  <div className="text-xs text-white/40">ID: {applicant.id}</div>
                                </td>
                                <td className="px-8 py-5">
                                  <div className="text-sm font-bold text-[#E61739]">{applicant.jobTitle}</div>
                                </td>
                                <td className="px-8 py-5">
                                  <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-white">
                                    {applicant.stage}
                                  </div>
                                </td>
                                <td className="px-8 py-5">
                                  <div className="flex items-center gap-3">
                                    <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                      <div 
                                        className={`h-full rounded-full ${
                                          applicant.compatibilityScore >= 90 ? 'bg-green-500' :
                                          applicant.compatibilityScore >= 80 ? 'bg-blue-500' :
                                          'bg-yellow-500'
                                        }`}
                                        style={{ width: `${applicant.compatibilityScore}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-xs font-black text-white">{applicant.compatibilityScore}%</span>
                                  </div>
                                </td>
                                <td className="px-8 py-5">
                                  {applicant.evaluationScore !== undefined ? (
                                    <div className="text-sm font-bold text-white">{applicant.evaluationScore} / 100</div>
                                  ) : (
                                    <div className="text-sm text-white/40 italic">Pending</div>
                                  )}
                                </td>
                                <td className="px-8 py-5">
                                  <div className="text-sm text-white/70">{applicant.dateApplied}</div>
                                </td>
                                <td className="px-8 py-5 text-right">
                                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-[#E61739] text-white text-xs font-bold transition-all whitespace-nowrap">
                                      View
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan={7} className="px-8 py-12 text-center text-white/40 font-bold">
                                No applicants found for this source.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeApplicantTab === 'calendar' && (
                <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-lg font-bold text-white">Scheduled Interviews Today</h3>
                    <div className="text-[#E61739] text-sm font-bold">Oct 24, 2024</div>
                  </div>
                  <div className="space-y-4">
                    {[
                      { time: "09:00 AM", candidate: "Alex Rivera", role: "Senior AI Prompt Engineer", interviewer: "Sarah Chen", type: "Technical Round" },
                      { time: "11:30 AM", candidate: "Casey Johnson", role: "UI/UX Designer", interviewer: "Marcus Thorne", type: "Portfolio Review" },
                      { time: "02:00 PM", candidate: "Jordan Smith", role: "Full-Stack Developer", interviewer: "David Kim", type: "Final Culture Fit" }
                    ].map((interview, i) => (
                      <div key={i} className="flex flex-col md:flex-row items-start md:items-center p-6 border border-white/5 rounded-2xl bg-white/[0.02] hover:bg-white/5 transition-colors gap-6">
                        <div className="w-32 flex-shrink-0">
                          <div className="text-lg font-black text-white">{interview.time}</div>
                          <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mt-1">{interview.type}</div>
                        </div>
                        <div className="flex-grow">
                          <div className="text-base font-bold text-white mb-1">{interview.candidate}</div>
                          <div className="text-sm text-white/50">{interview.role}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-white border border-white/10">
                            {interview.interviewer.charAt(0)}
                          </div>
                          <div className="text-sm text-white/70">with {interview.interviewer}</div>
                        </div>
                        <div className="hidden md:block">
                          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all">
                            Join Link
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeApplicantTab === 'evaluations' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8">
                    <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-400 flex items-center justify-center mb-6">
                      <Clock size={24} />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">32</div>
                    <div className="text-sm font-bold text-white/70 mb-1">Requested</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">Pending recruiter review</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8">
                    <div className="w-12 h-12 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center mb-6">
                      <ClipboardList size={24} />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">128</div>
                    <div className="text-sm font-bold text-white/70 mb-1">Completed</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">Evaluations finished</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8">
                    <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-400 flex items-center justify-center mb-6">
                      <UserCheck size={24} />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">45</div>
                    <div className="text-sm font-bold text-white/70 mb-1">Passed</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">Moved to next stage</div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8">
                    <div className="w-12 h-12 rounded-full bg-[#E61739]/10 text-[#E61739] flex items-center justify-center mb-6">
                      <UserX size={24} />
                    </div>
                    <div className="text-4xl font-black text-white mb-2">18</div>
                    <div className="text-sm font-bold text-white/70 mb-1">Dismissed</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wide">Rejected post-eval</div>
                  </div>
                </div>
              )}

              {activeApplicantTab === 'activity' && (
                <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden animate-in fade-in duration-300">
                  <div className="px-8 py-6 border-b border-white/5">
                    <h3 className="text-lg font-bold text-white">Recent Activity</h3>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[
                      { user: "You", action: "moved Alex Rivera to Final Interview", time: "10 mins ago", icon: UserCheck, color: "text-green-500", bg: "bg-green-500/10" },
                      { user: "Sarah Chen", action: "tagged you in a comment on Taylor Morgan's profile", time: "1 hour ago", icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
                      { user: "You", action: "published new job posting 'DevOps Architect'", time: "3 hours ago", icon: Briefcase, color: "text-purple-500", bg: "bg-purple-500/10" },
                      { user: "System", action: "bulk imported 45 candidates from LinkedIn", time: "Yesterday at 4:30 PM", icon: Linkedin, color: "text-blue-400", bg: "bg-blue-400/10" },
                      { user: "Marcus Thorne", action: "requested your review on Casey Johnson's design test", time: "Yesterday at 2:15 PM", icon: Eye, color: "text-yellow-500", bg: "bg-yellow-500/10" },
                    ].map((act, i) => (
                      <div key={i} className="p-6 px-8 flex items-start gap-6 hover:bg-white/[0.02] transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.bg} ${act.color} flex-shrink-0 mt-1`}>
                          <act.icon size={18} />
                        </div>
                        <div>
                          <div className="text-base text-white/80 leading-relaxed">
                            <span className="font-bold text-white">{act.user}</span> {act.action}
                          </div>
                          <div className="text-xs font-bold text-white/40 mt-2 flex items-center gap-2">
                            <Clock size={12} /> {act.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })()}

        {/* --- VIEW: ANALYTICS --- */}
        {viewState === 'analytics' && (() => {
          const stats = {
            published: 145,
            filled: 89,
            archived: 23,
            fillRate: 61.4,
            timeToFill: 18,
            timeToClose: 24
          };

          const chartData = [
            { name: 'Jan', value: Math.floor(Math.random() * 400) + 100 },
            { name: 'Feb', value: Math.floor(Math.random() * 400) + 100 },
            { name: 'Mar', value: Math.floor(Math.random() * 400) + 100 },
            { name: 'Apr', value: Math.floor(Math.random() * 400) + 100 },
            { name: 'May', value: Math.floor(Math.random() * 400) + 100 },
            { name: 'Jun', value: Math.floor(Math.random() * 400) + 100 },
            { name: 'Jul', value: Math.floor(Math.random() * 400) + 100 },
          ];

          const CustomTooltip = ({ active, payload, label }: any) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[#1a1a1a] border border-white/10 rounded-lg p-3 shadow-xl">
                  <p className="text-white/60 text-xs mb-1 font-bold uppercase">{label}</p>
                  <p className="text-[#E61739] text-sm font-black">{payload[0].value}</p>
                </div>
              );
            }
            return null;
          };

          return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setViewState('list')}
                    className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs transition-colors"
                  >
                    <ChevronLeft size={16} /> Back
                  </button>
                  <h2 className="text-xl font-bold text-white">Analytics</h2>
                </div>
                
                <div className="flex items-center bg-[#1a1a1a] border border-white/5 rounded-xl p-1">
                  {['week', 'month', 'quarter', 'year', 'custom'].map((ft) => (
                    <button
                      key={ft}
                      onClick={() => setAnalyticsFilter(ft as any)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all ${
                        analyticsFilter === ft ? 'bg-[#E61739] text-white shadow-lg' : 'text-white/40 hover:text-white/80'
                      }`}
                    >
                      {ft}
                    </button>
                  ))}
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {[
                  { id: 'published', label: 'Jobs Published', value: stats.published, unit: '' },
                  { id: 'filled', label: 'Jobs Filled', value: stats.filled, unit: '' },
                  { id: 'archived', label: 'Jobs Archived', value: stats.archived, unit: '' },
                  { id: 'fillRate', label: 'Fill Rate', value: stats.fillRate, unit: '%' },
                  { id: 'timeToFill', label: 'Time To Fill', value: stats.timeToFill, unit: 'd' },
                  { id: 'timeToClose', label: 'Time to Close', value: stats.timeToClose, unit: 'd' }
                ].map((m) => (
                  <button 
                    key={m.id}
                    onClick={() => setAnalyticsMetric(m.id as any)}
                    className={`text-left bg-[#1a1a1a] border rounded-2xl p-6 transition-all duration-300 ${
                      analyticsMetric === m.id ? 'border-[#E61739] ring-1 ring-[#E61739]/50' : 'border-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="text-3xl font-black text-white mb-1">
                      {m.value}{m.unit}
                    </div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{m.label}</div>
                  </button>
                ))}
              </div>

              {/* Chart */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 mb-8">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-widest">
                  {analyticsMetric.replace(/([A-Z])/g, ' $1').trim()} Data ({analyticsFilter})
                </h3>
                <div className="h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                      <XAxis dataKey="name" stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="rgba(255,255,255,0.2)" fontSize={12} tickLine={false} axisLine={false} />
                      <RechartsTooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.02)' }} />
                      <Bar dataKey="value" fill="#E61739" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Tables */}
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Box 1 */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                  <div className="px-8 py-6 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white">Open Time per Job</h3>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                        <th className="px-8 py-4">Job Title</th>
                        <th className="px-8 py-4 text-right">Job Open Time</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {jobs.slice(0, 5).map((job) => (
                        <tr key={job.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-4">
                            <div className="font-bold text-white">{job.title}</div>
                          </td>
                          <td className="px-8 py-4 text-right">
                            <div className="text-sm text-white/70">{Math.floor(Math.random() * 30 + 5)} days</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Box 2 */}
                <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                  <div className="px-8 py-6 border-b border-white/5">
                    <h3 className="text-sm font-bold text-white">Fill Rate per Job</h3>
                  </div>
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                        <th className="px-8 py-4">Job Title</th>
                        <th className="px-8 py-4 text-right">Fill Rate %</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {jobs.slice(0, 5).map((job) => (
                        <tr key={job.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-8 py-4">
                            <div className="font-bold text-white">{job.title}</div>
                          </td>
                          <td className="px-8 py-4 text-right">
                            <div className="text-sm text-white/70">{Math.floor(Math.random() * 50 + 50)}%</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          );
        })()}

        {/* --- VIEW: EDITOR --- */}
        {viewState === 'editor' && (
          <div className="max-w-4xl animate-in fade-in slide-in-from-right-8 duration-500">
            <button 
              onClick={() => setViewState('list')}
              className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs mb-6 transition-colors"
            >
              <ChevronLeft size={16} /> Cancel & Back
            </button>

            <form onSubmit={handleSave} className="space-y-8">
              {/* Main Info Card */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 md:p-10">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                  <Briefcase className="text-[#E61739]" size={20} /> Job Details
                </h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Job Title</label>
                    <input 
                      required
                      type="text" 
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      placeholder="e.g. Senior Product Designer" 
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Department</label>
                    <select 
                      value={formData.department}
                      onChange={e => setFormData({...formData, department: e.target.value})}
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold appearance-none"
                    >
                      <option>Engineering</option>
                      <option>AI & Data</option>
                      <option>Creative</option>
                      <option>CX & Support</option>
                      <option>Operations</option>
                      <option>Sales</option>
                      <option>Corporate</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Location</label>
                    <div className="relative">
                      <MapPin size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <input 
                        type="text" 
                        value={formData.location}
                        onChange={e => setFormData({...formData, location: e.target.value})}
                        placeholder="e.g. Manila (Hybrid)" 
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Employment Type</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                      <select 
                        value={formData.type}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold appearance-none"
                      >
                        <option>Full-Time</option>
                        <option>Part-Time</option>
                        <option>Contract</option>
                        <option>Project-Based</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description & Req Card */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 md:p-10">
                <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                  <FileText className="text-[#E61739]" size={20} /> Content & Specs
                </h3>

                <div className="space-y-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Job Description</label>
                    <textarea 
                      rows={6}
                      value={formData.description}
                      onChange={e => setFormData({...formData, description: e.target.value})}
                      placeholder="Describe the role, responsibilities, and team culture..."
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all text-sm leading-relaxed"
                    ></textarea>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Requirements (Bulleted)</label>
                    <textarea 
                      rows={6}
                      value={formData.requirements}
                      onChange={e => setFormData({...formData, requirements: e.target.value})}
                      placeholder="- 3+ years of experience in..."
                      className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all text-sm leading-relaxed font-mono"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-4">
                   <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Status:</span>
                   <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-white/10">
                      {['Active', 'Draft', 'Closed'].map(status => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setFormData({...formData, status})}
                          className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                            formData.status === status 
                              ? 'bg-white text-black shadow-sm' 
                              : 'text-white/40 hover:text-white'
                          }`}
                        >
                          {status}
                        </button>
                      ))}
                   </div>
                </div>

                <div className="flex gap-4">
                  <button 
                    type="button" 
                    onClick={() => setViewState('list')}
                    className="px-6 py-3 rounded-xl border border-white/10 text-white/60 font-bold text-sm hover:text-white hover:bg-white/5 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="px-8 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center gap-2"
                  >
                    <Save size={16} /> Save Job Post
                  </button>
                </div>
              </div>

            </form>
          </div>
        )}

      </main>
    </div>
  );
};
