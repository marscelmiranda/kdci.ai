
import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  LayoutGrid, Briefcase, FileText, TrendingUp, BookOpen, 
  Image as ImageIcon, Bell, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Trash2, Eye, Save, X, Calendar, User, Clock, Check
} from 'lucide-react';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  date: string;
  views: number;
}

const MOCK_POSTS: BlogPost[] = [
  { id: '1', title: "Why the Philippines is the New Epicenter for AI Engineering", category: "Engineering", author: "Sarah Chen", status: 'Published', date: 'Oct 12, 2024', views: 2450 },
  { id: '2', title: "Scaling to 500+ Agents: A Case Study in Fintech Support", category: "Case Studies", author: "Michael Ross", status: 'Published', date: 'Sep 28, 2024', views: 1890 },
  { id: '3', title: "Prompt Engineering vs. Software Engineering: The Merging Path", category: "AI Operations", author: "Devin Zhao", status: 'Draft', date: '-', views: 0 },
  { id: '4', title: "The Future of CX: Moving Beyond Ticketing to Real-time Agency", category: "AI Operations", author: "Sarah Chen", status: 'Draft', date: '-', views: 0 },
  { id: '5', title: "How Global Logistics Firms are Scaling with Managed Pods", category: "Case Studies", author: "Marcus Jordon", status: 'Published', date: 'Aug 12, 2024', views: 3100 },
];

export const BlogOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Editor State
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI Operations',
    author: '',
    readTime: '5 min read',
    excerpt: '',
    content: '',
    status: 'Draft',
    imageUrl: ''
  });

  // Isolate styles
  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => {
      document.body.style.backgroundColor = originalBg;
    };
  }, []);

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({
      title: post.title,
      category: post.category,
      author: post.author,
      readTime: '5 min read', // Mock data doesn't have this, default for now
      excerpt: "Sample excerpt loaded for editing...", 
      content: "Full content would load here in a real CMS integration...",
      status: post.status as string,
      imageUrl: ''
    });
    setViewState('editor');
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: '',
      category: 'AI Operations',
      author: '',
      readTime: '5 min read',
      excerpt: '',
      content: '',
      status: 'Draft',
      imageUrl: ''
    });
    setViewState('editor');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    if (editingId) {
      // Update existing
      setPosts(prev => prev.map(p => p.id === editingId ? { 
        ...p, 
        title: formData.title, 
        category: formData.category, 
        author: formData.author, 
        status: formData.status as any,
        date: formData.status === 'Published' && p.status !== 'Published' ? currentDate : p.date
      } : p));
    } else {
      // Create new
      const newPost: BlogPost = {
        id: Math.random().toString(36).substr(2, 9),
        title: formData.title,
        category: formData.category,
        author: formData.author,
        status: formData.status as any,
        date: formData.status === 'Published' ? currentDate : '-',
        views: 0
      };
      setPosts([newPost, ...posts]);
    }
    setViewState('list');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) {
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('publisher-dashboard');
    if (id === 'careers') setView('cms-career-ops');
    // Blog is current page
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
                item.id === 'blog' 
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
              <span className="text-[#E61739]">Content Ops</span>
            </div>
            <h1 className="text-3xl font-heading font-bold text-white">Blogs & Insights</h1>
          </div>
          
          <div className="flex items-center gap-4">
            {viewState === 'list' && (
              <button 
                onClick={handleCreateNew}
                className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red"
              >
                <Plus size={16} /> Write Article
              </button>
            )}
          </div>
        </div>

        {/* --- VIEW: LIST --- */}
        {viewState === 'list' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Filters */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input 
                  type="text" 
                  placeholder="Search articles by title or author..." 
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-colors"
                />
              </div>
              <select className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]">
                <option value="All">All Categories</option>
                <option value="AI Operations">AI Operations</option>
                <option value="Engineering">Engineering</option>
                <option value="Future of Work">Future of Work</option>
                <option value="Case Studies">Case Studies</option>
              </select>
              <select className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]">
                <option value="All">All Statuses</option>
                <option value="Published">Published</option>
                <option value="Draft">Draft</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            {/* Table */}
            <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                    <th className="px-8 py-5">Article Title</th>
                    <th className="px-8 py-5">Category</th>
                    <th className="px-8 py-5">Author</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Published</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5">
                        <div className="font-bold text-white line-clamp-1">{post.title}</div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/70">{post.category}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-white/70">
                        <div className="flex items-center gap-2">
                           <User size={12} className="text-white/30" /> {post.author}
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${
                          post.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                          post.status === 'Draft' ? 'bg-white/5 text-white/50 border-white/10' :
                          'bg-red-500/10 text-red-500 border-red-500/20'
                        }`}>
                          {post.status}
                        </span>
                      </td>
                      <td className="px-8 py-5 text-sm text-white/40 font-mono">
                        {post.date}
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white transition-colors" title="View Live">
                            <Eye size={16} />
                          </button>
                          <button onClick={() => handleEdit(post)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739] transition-colors" title="Edit">
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500 transition-colors" title="Delete">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- VIEW: EDITOR --- */}
        {viewState === 'editor' && (
          <div className="max-w-5xl animate-in fade-in slide-in-from-right-8 duration-500">
            <button 
              onClick={() => setViewState('list')}
              className="flex items-center gap-2 text-white/40 hover:text-white font-bold text-xs mb-6 transition-colors"
            >
              <ChevronLeft size={16} /> Cancel & Back
            </button>

            <form onSubmit={handleSave} className="space-y-8">
              {/* Meta & Info */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                 <div className="lg:col-span-2 space-y-8">
                    {/* Main Content Area */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8 md:p-10">
                       <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                         <FileText className="text-[#E61739]" size={20} /> Article Content
                       </h3>
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Headline</label>
                             <input 
                               required
                               type="text" 
                               value={formData.title}
                               onChange={e => setFormData({...formData, title: e.target.value})}
                               placeholder="Enter an engaging title..." 
                               className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all font-bold text-lg"
                             />
                          </div>
                          
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Excerpt / Meta Description</label>
                             <textarea 
                               rows={3}
                               value={formData.excerpt}
                               onChange={e => setFormData({...formData, excerpt: e.target.value})}
                               placeholder="Short summary for SEO and previews..."
                               className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all text-sm leading-relaxed resize-none"
                             ></textarea>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Body Content (Markdown Supported)</label>
                             <textarea 
                               rows={15}
                               value={formData.content}
                               onChange={e => setFormData({...formData, content: e.target.value})}
                               placeholder="Start writing your masterpiece..."
                               className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all text-sm leading-relaxed font-mono"
                             ></textarea>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="space-y-8">
                    {/* Publishing Settings */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8">
                       <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                         <Settings className="text-[#E61739]" size={16} /> Publishing
                       </h3>
                       
                       <div className="space-y-6">
                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Author</label>
                             <div className="relative">
                                <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                  type="text" 
                                  value={formData.author}
                                  onChange={e => setFormData({...formData, author: e.target.value})}
                                  placeholder="e.g. Sarah Chen"
                                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-all"
                                />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Category</label>
                             <select 
                               value={formData.category}
                               onChange={e => setFormData({...formData, category: e.target.value})}
                               className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-all appearance-none"
                             >
                               <option>AI Operations</option>
                               <option>Engineering</option>
                               <option>Future of Work</option>
                               <option>Case Studies</option>
                               <option>News & Updates</option>
                             </select>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Read Time</label>
                             <div className="relative">
                                <Clock size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                  type="text" 
                                  value={formData.readTime}
                                  onChange={e => setFormData({...formData, readTime: e.target.value})}
                                  placeholder="e.g. 5 min read"
                                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-all"
                                />
                             </div>
                          </div>

                          <div className="space-y-2">
                             <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Featured Image URL</label>
                             <div className="relative">
                                <ImageIcon size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                                <input 
                                  type="text" 
                                  value={formData.imageUrl}
                                  onChange={e => setFormData({...formData, imageUrl: e.target.value})}
                                  placeholder="https://..."
                                  className="w-full bg-black/20 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-all truncate"
                                />
                             </div>
                          </div>
                       </div>
                    </div>

                    {/* Status & Save */}
                    <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-8">
                       <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 mb-4 block">Status</label>
                       <div className="flex bg-black/30 p-1 rounded-xl border border-white/10 mb-8">
                          {['Published', 'Draft', 'Archived'].map(status => (
                            <button
                              key={status}
                              type="button"
                              onClick={() => setFormData({...formData, status})}
                              className={`flex-1 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wide transition-all ${
                                formData.status === status 
                                  ? 'bg-white text-black shadow-sm' 
                                  : 'text-white/40 hover:text-white'
                              }`}
                            >
                              {status}
                            </button>
                          ))}
                       </div>

                       <button 
                         type="submit"
                         className="w-full py-4 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all shadow-lg flex items-center justify-center gap-2"
                       >
                         <Save size={16} /> Save Article
                       </button>
                    </div>
                 </div>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
