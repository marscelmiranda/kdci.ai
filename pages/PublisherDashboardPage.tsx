
import React, { useEffect, useState } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  LayoutGrid, Briefcase, FileText, TrendingUp, BookOpen, 
  Image as ImageIcon, Bell, Search, Plus, LogOut, Settings,
  ChevronRight, BarChart3, Users
} from 'lucide-react';

interface DashboardCardProps {
  title: string;
  count: string;
  icon: React.ReactNode;
  actionText: string;
  color: string;
  onClick: () => void;
}

const DashboardCard = ({ title, count, icon, actionText, color, onClick }: DashboardCardProps) => (
  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 hover:bg-[#222] transition-all group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-20 ${color} opacity-5 blur-[80px] rounded-full pointer-events-none`}></div>
    <div className="relative z-10">
      <div className="flex justify-between items-start mb-4">
        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 border border-white/5 group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <div className="text-3xl font-heading font-bold text-white">{count}</div>
      </div>
      <h3 className="text-lg font-bold text-white/90 mb-6">{title}</h3>
      <button 
        onClick={onClick}
        className="w-full py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/60 hover:bg-[#E61739] hover:text-white hover:border-[#E61739] transition-all flex items-center justify-center gap-2"
      >
        <Plus size={14} /> {actionText}
      </button>
    </div>
  </div>
);

export const PublisherDashboardPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeTab, setActiveTab] = useState('overview');

  // Isolate styles for the dashboard to keep the "dark mode app" feel
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const handleCreate = (type: string) => {
    if (type === 'Job Posting') {
      setView('cms-career-ops');
    } else if (type === 'Blog Post') {
      setView('cms-blog-ops');
    } else {
      alert(`This would open the ${type} creation modal/form.`);
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'careers') {
        setView('cms-career-ops');
    } else if (id === 'blog') {
        setView('cms-blog-ops');
    } else {
        setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      
      {/* Sidebar Navigation */}
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
                activeTab === item.id 
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
        
        {/* Top Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-heading font-bold mb-2">Welcome back, Editor.</h1>
            <p className="text-white/40 text-sm font-medium">Manage your content pipeline and talent acquisition.</p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
              <input 
                type="text" 
                placeholder="Search content..." 
                className="bg-[#1a1a1a] border border-white/10 rounded-full pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#E61739] transition-colors w-64"
              />
            </div>
            <button className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-all">
              <Bell size={18} />
            </button>
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#E61739] to-purple-600 border-2 border-[#0a0a0a]"></div>
          </div>
        </header>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
           <div className="p-6 rounded-[2rem] bg-[#1a1a1a] border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><BarChart3 size={20} /></div>
              <div>
                 <div className="text-2xl font-bold">12.5k</div>
                 <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">Total Views</div>
              </div>
           </div>
           <div className="p-6 rounded-[2rem] bg-[#1a1a1a] border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><Users size={20} /></div>
              <div>
                 <div className="text-2xl font-bold">48</div>
                 <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">Active Candidates</div>
              </div>
           </div>
           <div className="p-6 rounded-[2rem] bg-[#1a1a1a] border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-500"><FileText size={20} /></div>
              <div>
                 <div className="text-2xl font-bold">15</div>
                 <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">Published Posts</div>
              </div>
           </div>
           <div className="p-6 rounded-[2rem] bg-[#1a1a1a] border border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><TrendingUp size={20} /></div>
              <div>
                 <div className="text-2xl font-bold">+24%</div>
                 <div className="text-[10px] font-black uppercase text-white/30 tracking-widest">MoM Growth</div>
              </div>
           </div>
        </div>

        {/* Content Creation Grid */}
        <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6">Create Content</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          
          <DashboardCard 
            title="Job Postings" 
            count="12 Active" 
            icon={<Briefcase size={24} />} 
            actionText="Post Job"
            color="bg-blue-600"
            onClick={() => handleCreate('Job Posting')}
          />

          <DashboardCard 
            title="Blogs" 
            count="8 Drafts" 
            icon={<FileText size={24} />} 
            actionText="Write Blog"
            color="bg-purple-600"
            onClick={() => handleCreate('Blog Post')}
          />

          <DashboardCard 
            title="Case Studies" 
            count="6 Live" 
            icon={<TrendingUp size={24} />} 
            actionText="Add Case Study"
            color="bg-green-600"
            onClick={() => handleCreate('Case Study')}
          />

          <DashboardCard 
            title="Portfolio" 
            count="24 Items" 
            icon={<ImageIcon size={24} />} 
            actionText="Add Entry"
            color="bg-orange-600"
            onClick={() => handleCreate('Portfolio Entry')}
          />

          <DashboardCard 
            title="Ebooks" 
            count="4 Gates" 
            icon={<BookOpen size={24} />} 
            actionText="Upload PDF"
            color="bg-pink-600"
            onClick={() => handleCreate('Ebook')}
          />

        </div>

        {/* Recent Activity Table */}
        <h2 className="text-sm font-black uppercase tracking-widest text-white/40 mb-6">Recent Activity</h2>
        <div className="bg-[#1a1a1a] border border-white/5 rounded-[2.5rem] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40">
                  <th className="px-8 py-6">Content Title</th>
                  <th className="px-8 py-6">Type</th>
                  <th className="px-8 py-6">Author</th>
                  <th className="px-8 py-6">Status</th>
                  <th className="px-8 py-6">Date</th>
                  <th className="px-8 py-6">Action</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium text-white/80">
                {[
                  { title: "Senior AI Prompt Engineer", type: "Job Post", author: "HR Team", status: "Active", date: "Oct 24" },
                  { title: "The Future of AGI Ops", type: "Blog Post", author: "Elena V.", status: "Published", date: "Oct 22" },
                  { title: "Fintech Scaling Study", type: "Case Study", author: "Marcus J.", status: "Draft", date: "Oct 20" },
                  { title: "Q4 Marketing Assets", type: "Portfolio", author: "Creative Pod", status: "Published", date: "Oct 18" },
                  { title: "Full-Stack Developer", type: "Job Post", author: "HR Team", status: "Active", date: "Oct 15" },
                ].map((row, idx) => (
                  <tr key={idx} className="border-b border-white/5 hover:bg-white/5 transition-colors group">
                    <td className="px-8 py-5 font-bold text-white">{row.title}</td>
                    <td className="px-8 py-5">
                      <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold">{row.type}</span>
                    </td>
                    <td className="px-8 py-5 text-white/60">{row.author}</td>
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${row.status === 'Active' || row.status === 'Published' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        {row.status}
                      </div>
                    </td>
                    <td className="px-8 py-5 text-white/40">{row.date}</td>
                    <td className="px-8 py-5">
                      <button className="text-white/40 hover:text-[#E61739] transition-colors"><ChevronRight size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};
