
import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  LayoutGrid, Briefcase, FileText, TrendingUp, BookOpen, 
  Image as ImageIcon, Bell, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Trash2, Eye, Save, X, Check, MapPin, Clock, Users, Code, Zap, Sparkles
} from 'lucide-react';

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
    insights: 'Strong background in LLM fine-tuning and RAG architectures. Matches 90% of technical requirements.'
  },
  {
    id: 'a2',
    name: 'Jordan Smith',
    jobTitle: 'Full-Stack Developer (React/Node)',
    experience: 4,
    previousRole: 'Senior Dev at CloudScale',
    education: 'BS in Software Engineering, MIT',
    compatibilityScore: 88,
    insights: 'Expert in React and Node.js. Previous experience with high-concurrency SaaS platforms is a major plus.'
  },
  {
    id: 'a3',
    name: 'Casey Johnson',
    jobTitle: 'UI/UX Designer',
    experience: 3,
    previousRole: 'Product Designer at CreativeFlow',
    education: 'BFA in Graphic Design, RISD',
    compatibilityScore: 82,
    insights: 'Excellent portfolio. Strong focus on accessibility and design systems. Slightly below target experience for "Senior" but high potential.'
  },
  {
    id: 'a4',
    name: 'Taylor Morgan',
    jobTitle: 'Senior AI Prompt Engineer',
    experience: 2,
    previousRole: 'Content Strategist at AI-Write',
    education: 'BA in Linguistics, UC Berkeley',
    compatibilityScore: 75,
    insights: 'Unique linguistics background is valuable for prompt engineering, but lacks deep technical experience with vector databases.'
  }
];

export const CareerOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor' | 'applicants'>('list');
  const [jobs, setJobs] = useState<JobListing[]>(MOCK_JOBS);
  const [applicants] = useState<Applicant[]>(MOCK_APPLICANTS);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [applicantSearchQuery, setApplicantSearchQuery] = useState('');
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
    // Careers is current page
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      
      {/* Sidebar Navigation (Reused from Dashboard for consistency) */}
      <aside className="w-72 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
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
            { id: 'cases', label: 'Case Studies', icon: TrendingUp },
            { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon },
            { id: 'ebooks', label: 'Ebooks & Whitepapers', icon: BookOpen },
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
          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex items-center gap-5 group hover:border-[#E61739]/30 transition-all cursor-default">
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

          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 flex items-center gap-5 group hover:border-[#E61739]/30 transition-all cursor-default">
            <div className="w-14 h-14 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500 group-hover:scale-110 transition-transform">
              <TrendingUp size={28} />
            </div>
            <div>
              <div className="text-white/40 text-[10px] font-black uppercase tracking-widest mb-1">Hiring Velocity</div>
              <div className="text-3xl font-heading font-bold text-white">+12%</div>
            </div>
          </div>
        </div>

        {/* --- VIEW: LIST --- */}
        {viewState === 'list' && (() => {
          const filteredJobs = jobs.filter(job => {
            const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                                 job.department.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesDept = deptFilter === 'All' || job.department === deptFilter;
            const matchesStatus = statusFilter === 'All' || job.status === statusFilter;
            return matchesSearch && matchesDept && matchesStatus;
          });

          return (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          const filteredApplicants = applicants.filter(app => 
            app.name.toLowerCase().includes(applicantSearchQuery.toLowerCase()) ||
            app.jobTitle.toLowerCase().includes(applicantSearchQuery.toLowerCase()) ||
            app.previousRole.toLowerCase().includes(applicantSearchQuery.toLowerCase())
          );

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

              {/* Applicant Table */}
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                      <th className="px-8 py-5">Applicant Name</th>
                      <th className="px-8 py-5">Applied For</th>
                      <th className="px-8 py-5">Experience & Education</th>
                      <th className="px-8 py-5">Compatibility</th>
                      <th className="px-8 py-5 text-right">Actions</th>
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
                            <div className="text-sm text-white/70 font-bold">{applicant.experience} Years Exp.</div>
                            <div className="text-xs text-white/40 line-clamp-1">{applicant.previousRole}</div>
                            <div className="text-[10px] text-white/30 mt-1 italic">{applicant.education}</div>
                          </td>
                          <td className="px-8 py-5">
                            <div className="flex items-center gap-3 mb-2">
                              <div className="flex-grow h-1.5 bg-white/5 rounded-full overflow-hidden">
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
                            <div className="text-[10px] text-white/50 leading-relaxed max-w-xs">
                              <Sparkles size={10} className="inline mr-1 text-yellow-500" />
                              {applicant.insights}
                            </div>
                          </td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="px-4 py-2 rounded-lg bg-white/5 hover:bg-[#E61739] text-white text-xs font-bold transition-all">
                                View Profile
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5} className="px-8 py-20 text-center text-white/40">
                          <div className="flex flex-col items-center gap-4">
                            <Search size={40} className="opacity-20" />
                            <p className="font-bold">No applicants match your search.</p>
                            <button 
                              onClick={() => setApplicantSearchQuery('')}
                              className="text-[#E61739] text-sm font-bold hover:underline"
                            >
                              Clear search
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
