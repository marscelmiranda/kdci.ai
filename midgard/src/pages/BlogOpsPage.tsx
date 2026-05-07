import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  LayoutGrid, Briefcase, FileText, BookOpen,
  Image as ImageIcon, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Trash2, Save, X, User, Check,
  ChevronUp, ChevronDown, GripVertical, Type, Code, Youtube, Columns, MousePointer2,
  Quote, AppWindow, Minus, Activity
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

type BlockType = 'rich_text' | 'html' | 'image' | 'video' | 'two_columns' | 'cta' | 'pull_quote' | 'embed' | 'divider';

interface Block {
  id: string;
  type: BlockType;
  isCollapsed: boolean;
  content: any;
}

const MOCK_POSTS: BlogPost[] = [
  { id: '1', title: "Why the Philippines is the New Epicenter for AI Engineering", category: "Engineering", author: "Sarah Chen", status: 'Published', date: 'Oct 12, 2024', views: 2450 },
  { id: '2', title: "Scaling to 500+ Agents: A Case Study in Fintech Support", category: "Case Studies", author: "Michael Ross", status: 'Published', date: 'Sep 28, 2024', views: 1890 },
];

const BLOCK_TYPES: { type: BlockType; label: string; icon: React.ReactNode }[] = [
  { type: 'rich_text', label: 'Rich Text', icon: <Type size={14} /> },
  { type: 'html', label: 'HTML Block', icon: <Code size={14} /> },
  { type: 'image', label: 'Image', icon: <ImageIcon size={14} /> },
  { type: 'video', label: 'Video', icon: <Youtube size={14} /> },
  { type: 'two_columns', label: 'Two Columns', icon: <Columns size={14} /> },
  { type: 'cta', label: 'CTA', icon: <MousePointer2 size={14} /> },
  { type: 'pull_quote', label: 'Pull Quote', icon: <Quote size={14} /> },
  { type: 'embed', label: 'Embed', icon: <AppWindow size={14} /> },
  { type: 'divider', label: 'Divider', icon: <Minus size={14} /> },
];

export const BlogOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [posts, setPosts] = useState<BlogPost[]>(MOCK_POSTS);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'hubspot'>('content');

  const [formData, setFormData] = useState({
    title: '', slug: '', category: 'AI Operations', author: '', readTime: '5 min read', tags: '', featured: false, imageUrl: '', status: 'Draft',
    blocks: [] as Block[],
    metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false,
    hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: ''
  });

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    }
  }, [formData.title]);

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('dashboard');
    else if (id === 'careers') setView('career-ops');
    else if (id === 'blog') setView('blog-ops');
    else if (id === 'resources') setView('resources-ops');
    else if (id === 'portfolio') setView('portfolio-ops');
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({ title: '', slug: '', category: 'AI Operations', author: '', readTime: '5 min read', tags: '', featured: false, imageUrl: '', status: 'Draft', blocks: [], metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false, hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: '' });
    setViewState('editor');
    setEditorTab('content');
  };

  const handleEdit = (post: BlogPost) => {
    setEditingId(post.id);
    setFormData({ title: post.title, slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''), category: post.category, author: post.author, readTime: '5 min read', tags: '', featured: false, imageUrl: '', status: post.status, blocks: [{ id: '1', type: 'rich_text', isCollapsed: false, content: { text: "Sample content..." } }], metaTitle: post.title, metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false, hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: '' });
    setViewState('editor');
    setEditorTab('content');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (editingId) {
      setPosts(prev => prev.map(p => p.id === editingId ? { ...p, title: formData.title, category: formData.category, author: formData.author, status: formData.status as any, date: formData.status === 'Published' && p.status !== 'Published' ? currentDate : p.date } : p));
    } else {
      setPosts([{ id: Math.random().toString(36).substr(2, 9), title: formData.title, category: formData.category, author: formData.author, status: formData.status as any, date: formData.status === 'Published' ? currentDate : '-', views: 0 }, ...posts]);
    }
    setViewState('list');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this article?")) setPosts(prev => prev.filter(p => p.id !== id));
  };

  const addBlock = (type: BlockType) => setFormData(prev => ({ ...prev, blocks: [...prev.blocks, { id: Math.random().toString(36).substr(2, 9), type, isCollapsed: false, content: {} }] }));
  const removeBlock = (id: string) => setFormData(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== id) }));
  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.blocks.length - 1) return;
    const newBlocks = [...formData.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setFormData(prev => ({ ...prev, blocks: newBlocks }));
  };
  const toggleBlock = (id: string) => setFormData(prev => ({ ...prev, blocks: prev.blocks.map(b => b.id === id ? { ...b, isCollapsed: !b.isCollapsed } : b) }));
  const updateBlock = (id: string, newContent: any) => setFormData(prev => ({ ...prev, blocks: prev.blocks.map(b => b.id === id ? { ...b, content: newContent } : b) }));

  const renderBlockEditor = (block: Block) => {
    switch (block.type) {
      case 'rich_text': return (
        <textarea value={block.content.text || ''} onChange={e => updateBlock(block.id, { ...block.content, text: e.target.value })}
          className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] min-h-[150px]" placeholder="Write your content here..." />
      );
      case 'html': return (
        <textarea value={block.content.code || ''} onChange={e => updateBlock(block.id, { ...block.content, code: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-green-400 font-mono text-xs focus:outline-none focus:border-[#E61739] min-h-[150px]" placeholder="<div>Custom HTML...</div>" />
      );
      case 'image': return (
        <div className="space-y-3">
          <input type="text" value={block.content.url || ''} onChange={e => updateBlock(block.id, { ...block.content, url: e.target.value })} placeholder="Image URL" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
          {block.content.url && <img src={block.content.url} alt="" className="max-h-48 object-contain mx-auto border border-white/10 rounded-lg" />}
        </div>
      );
      case 'pull_quote': return (
        <textarea value={block.content.quote || ''} onChange={e => updateBlock(block.id, { ...block.content, quote: e.target.value })}
          placeholder="Quote text..." className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none min-h-[80px]" />
      );
      case 'cta': return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <input type="text" value={block.content.headline || ''} onChange={e => updateBlock(block.id, { ...block.content, headline: e.target.value })} placeholder="CTA Headline" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
            <input type="text" value={block.content.buttonText || ''} onChange={e => updateBlock(block.id, { ...block.content, buttonText: e.target.value })} placeholder="Button Text" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
          </div>
          <div className="p-4 bg-[#E61739]/10 border border-[#E61739]/20 rounded-xl flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-lg mb-3">{block.content.headline || 'Your Headline'}</h4>
            <button type="button" className="px-6 py-2 bg-[#E61739] text-white rounded-lg font-bold">{block.content.buttonText || 'Click Here'}</button>
          </div>
        </div>
      );
      case 'divider': return <hr className="border-white/10" />;
      default: return <div className="text-white/30 text-sm p-4 text-center">Block editor for "{block.type}" coming soon.</div>;
    }
  };

  const seoChecklist = [
    { label: 'Meta title ≤ 60 chars', done: formData.metaTitle.length > 0 && formData.metaTitle.length <= 60 },
    { label: 'Meta description 120–160 chars', done: formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 },
    { label: 'Keywords specified', done: formData.keywords.length > 0 },
    { label: 'Slug populated', done: formData.slug.length > 0 },
    { label: 'Canonical URL set', done: formData.canonicalUrl.length > 0 },
    { label: 'Open Graph populated', done: formData.ogTitle.length > 0 && formData.ogDescription.length > 0 },
    { label: 'Featured image added', done: formData.imageUrl.length > 0 },
    { label: 'JSON-LD included', done: formData.jsonLd.length > 0 },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">Publisher Portal</div>
        </div>
        <nav className="flex-grow px-4 py-6 space-y-1">
          {[
            { id: 'overview', label: 'Overview', icon: LayoutGrid },
            { id: 'careers', label: 'Career Ops', icon: Briefcase },
            { id: 'blog', label: 'Blogs & Insights', icon: FileText },
            { id: 'resources', label: 'Resources', icon: BookOpen },
            { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon },
          ].map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.id === 'blog' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2"><Settings size={18} /> Settings</button>
          <button onClick={() => setView('login')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-h-screen">
        {viewState === 'list' && (
          <div className="p-8 md:p-12 overflow-y-auto flex-grow">
            <div className="flex justify-between items-center mb-10">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                  <ChevronLeft size={10} className="rotate-180" />
                  <span className="text-[#E61739]">Blogs & Insights</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Blogs & Insights</h1>
              </div>
              <button onClick={handleCreateNew} className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red">
                <Plus size={16} /> Write Article
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" placeholder="Search articles..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                    <th className="px-8 py-5">Article Title</th><th className="px-8 py-5">Category</th><th className="px-8 py-5">Author</th><th className="px-8 py-5">Status</th><th className="px-8 py-5">Published</th><th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {posts.map((post) => (
                    <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5"><div className="font-bold text-white line-clamp-1">{post.title}</div></td>
                      <td className="px-8 py-5"><span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/70">{post.category}</span></td>
                      <td className="px-8 py-5 text-sm text-white/70"><div className="flex items-center gap-2"><User size={12} className="text-white/30" />{post.author}</div></td>
                      <td className="px-8 py-5"><span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${post.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : post.status === 'Draft' ? 'bg-white/5 text-white/50 border-white/10' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{post.status}</span></td>
                      <td className="px-8 py-5 text-sm text-white/40 font-mono">{post.date}</td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(post)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739]"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(post.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewState === 'editor' && (
          <form onSubmit={handleSave} className="flex-grow flex flex-col min-h-screen">
            <header className="bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setViewState('list')} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={20} /></button>
                <div className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white/70 font-mono min-w-[200px] truncate">{formData.title || 'Untitled Article'}</div>
                <div className="flex gap-2">
                  {['content', 'seo', 'hubspot'].map((tab) => (
                    <button key={tab} type="button" onClick={() => setEditorTab(tab as any)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editorTab === tab ? 'bg-[#E61739] text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]">
                  <option>Draft</option><option>Published</option><option>Archived</option>
                </select>
                <button type="submit" className="px-6 py-2 bg-[#E61739] hover:bg-[#c51431] text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red">
                  <Save size={16} /> Save
                </button>
              </div>
            </header>

            <div className="p-8 overflow-y-auto space-y-6 flex-grow">
              {editorTab === 'content' && (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Title</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] font-bold" placeholder="Article title..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Category</label>
                      <select value={formData.category} onChange={e => setFormData(p => ({ ...p, category: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]">
                        {['AI Operations', 'Engineering', 'Case Studies', 'Company News', 'Industry Insights'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Author</label>
                      <input type="text" value={formData.author} onChange={e => setFormData(p => ({ ...p, author: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="Author name" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Slug</label>
                      <input type="text" value={formData.slug} onChange={e => setFormData(p => ({ ...p, slug: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] font-mono text-sm" placeholder="url-slug" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Cover Image URL</label>
                      <input type="text" value={formData.imageUrl} onChange={e => setFormData(p => ({ ...p, imageUrl: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="https://..." />
                    </div>
                  </div>
                  <div className="space-y-4">
                    {formData.blocks.map((block, index) => (
                      <div key={block.id} className="bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden">
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-white/5">
                          <GripVertical size={16} className="text-white/20 cursor-grab" />
                          <span className="text-xs font-black uppercase tracking-widest text-white/40">{block.type.replace('_', ' ')}</span>
                          <div className="flex items-center gap-1 ml-auto">
                            <button type="button" onClick={() => moveBlock(index, 'up')} className="p-1 hover:bg-white/10 rounded text-white/30 hover:text-white"><ChevronUp size={14} /></button>
                            <button type="button" onClick={() => moveBlock(index, 'down')} className="p-1 hover:bg-white/10 rounded text-white/30 hover:text-white"><ChevronDown size={14} /></button>
                            <button type="button" onClick={() => toggleBlock(block.id)} className="p-1 hover:bg-white/10 rounded text-white/30 hover:text-white"><Activity size={14} /></button>
                            <button type="button" onClick={() => removeBlock(block.id)} className="p-1 hover:bg-white/10 rounded text-white/30 hover:text-red-500"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        {!block.isCollapsed && <div className="p-4">{renderBlockEditor(block)}</div>}
                      </div>
                    ))}
                    <div className="border-2 border-dashed border-white/10 rounded-2xl p-4">
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-3">Add Block</p>
                      <div className="flex flex-wrap gap-2">
                        {BLOCK_TYPES.map(bt => (
                          <button key={bt.type} type="button" onClick={() => addBlock(bt.type)}
                            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs font-bold text-white/60 hover:text-white hover:bg-white/10 transition-all">
                            {bt.icon}{bt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {editorTab === 'seo' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Meta Title</label>
                      <input type="text" value={formData.metaTitle} onChange={e => setFormData(p => ({ ...p, metaTitle: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="SEO title..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Canonical URL</label>
                      <input type="text" value={formData.canonicalUrl} onChange={e => setFormData(p => ({ ...p, canonicalUrl: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="https://..." />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Meta Description</label>
                    <textarea value={formData.metaDescription} onChange={e => setFormData(p => ({ ...p, metaDescription: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] min-h-[100px]" placeholder="SEO description..." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">OG Title</label>
                      <input type="text" value={formData.ogTitle} onChange={e => setFormData(p => ({ ...p, ogTitle: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="Open Graph title..." />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">OG Image URL</label>
                      <input type="text" value={formData.ogImageUrl} onChange={e => setFormData(p => ({ ...p, ogImageUrl: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="https://..." />
                    </div>
                  </div>
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">SEO Checklist</p>
                    <div className="space-y-3">
                      {seoChecklist.map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 text-sm font-medium ${item.done ? 'text-green-500' : 'text-white/30'}`}>
                          <Check size={14} className={item.done ? 'text-green-500' : 'text-white/20'} />{item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">JSON-LD Structured Data</label>
                    <textarea value={formData.jsonLd} onChange={e => setFormData(p => ({ ...p, jsonLd: e.target.value }))}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-green-400 font-mono text-xs focus:outline-none focus:border-[#E61739] min-h-[120px]" placeholder='{"@context": "https://schema.org", ...}' />
                  </div>
                </div>
              )}

              {editorTab === 'hubspot' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">UTM Source</label>
                      <input type="text" value={formData.utmSource} onChange={e => setFormData(p => ({ ...p, utmSource: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="e.g. linkedin" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">UTM Medium</label>
                      <input type="text" value={formData.utmMedium} onChange={e => setFormData(p => ({ ...p, utmMedium: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="e.g. social" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">UTM Campaign</label>
                      <input type="text" value={formData.utmCampaign} onChange={e => setFormData(p => ({ ...p, utmCampaign: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="e.g. q1-blog" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">HubSpot Event Name</label>
                      <input type="text" value={formData.hubspotEventName} onChange={e => setFormData(p => ({ ...p, hubspotEventName: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="e.g. blog_view" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">HubSpot Form GUID</label>
                      <input type="text" value={formData.hubspotFormGuid} onChange={e => setFormData(p => ({ ...p, hubspotFormGuid: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="xxxxxxxx-xxxx-xxxx-xxxx" />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
