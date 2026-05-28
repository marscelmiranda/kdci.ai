import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { RichTextEditor } from '../components/RichTextEditor';
import {
  ChevronLeft, BookOpen, TrendingUp, Presentation, Plus, Search, Edit2, Trash2, LogOut, Settings, LayoutGrid, Briefcase, FileText, Image as ImageIcon,
  Save, Check, ChevronUp, ChevronDown, GripVertical, Type, Code, Youtube, Columns, MousePointer2, Quote, AppWindow, Minus, Activity, User,
  Users, UserCircle2, Loader2, AlertCircle, BookMarked, Download, Tag, Calendar
} from 'lucide-react';
import { getAllEbooks, createEbook, updateEbook, deleteEbook } from '../lib/api';
import { ImagePicker } from '../components/ImagePicker';

interface Resource {
  id: string;
  title: string;
  type: 'ebooks' | 'cases' | 'webinars';
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  date: string;
  views: number;
}

interface DbEbook {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  category: string;
  cover_image: string;
  cover_image_alt: string;
  download_url: string;
  page_count: number;
  tags: string;
  status: string;
  published_at: string;
  created_at: string;
}

type BlockType = 'rich_text' | 'html' | 'image' | 'video' | 'two_columns' | 'cta' | 'pull_quote' | 'embed' | 'divider';

interface Block {
  id: string;
  type: BlockType;
  isCollapsed: boolean;
  content: any;
}

const MOCK_RESOURCES: Resource[] = [
  { id: '2', title: "Fintech Support Scaling: 0 to 500+", type: "cases", author: "Michael Ross", status: 'Published', date: 'Sep 20, 2024', views: 890 },
  { id: '3', title: "Future of Customer Ops (Live Session)", type: "webinars", author: "KDCI Events", status: 'Draft', date: '-', views: 0 },
];

const EBOOK_CATEGORIES = [
  'Technology', 'Financial Services', 'Healthcare', 'Marketing', 'Retail',
  'Logistics', 'Professional Services', 'E-Commerce', 'EdTech', 'Other',
];

const EMPTY_EBOOK = {
  title: '', slug: '', description: '', author: '', category: '',
  cover_image: '', cover_image_alt: '', download_url: '', page_count: '', tags: '', status: 'Draft',
};

export const ResourcesOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeTab, setActiveTab] = useState<'ebooks' | 'cases' | 'webinars'>('ebooks');
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'hubspot'>('content');

  // ---- Ebook-specific state ----
  const [dbEbooks, setDbEbooks] = useState<DbEbook[]>([]);
  const [ebooksLoading, setEbooksLoading] = useState(false);
  const [ebooksError, setEbooksError] = useState<string | null>(null);
  const [ebookSaving, setEbookSaving] = useState(false);
  const [ebookSaveError, setEbookSaveError] = useState<string | null>(null);
  const [editingEbookId, setEditingEbookId] = useState<number | null>(null);
  const [ebookForm, setEbookForm] = useState({ ...EMPTY_EBOOK });

  // ---- Generic resource form (cases/webinars) ----
  const [formData, setFormData] = useState({
    title: '', slug: '', type: 'cases', author: '', readTime: '10 min', resourceUrl: '', tags: '', featured: false, imageUrl: '', imageAlt: '', status: 'Draft',
    blocks: [] as Block[],
    metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false,
    hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: ''
  });

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  // Auto-slug from title for ebook form
  useEffect(() => {
    if (ebookForm.title && !editingEbookId) {
      setEbookForm(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      }));
    }
  }, [ebookForm.title]);

  // Fetch ebooks from API when tab is ebooks
  const loadEbooks = () => {
    setEbooksLoading(true);
    setEbooksError(null);
    getAllEbooks()
      .then((data: any) => setDbEbooks(Array.isArray(data) ? data : []))
      .catch((e: any) => setEbooksError(e.message ?? 'Failed to load ebooks.'))
      .finally(() => setEbooksLoading(false));
  };

  useEffect(() => {
    if (activeTab === 'ebooks') loadEbooks();
  }, [activeTab]);

  // ---- Ebook handlers ----
  const handleCreateEbook = () => {
    setEditingEbookId(null);
    setEbookForm({ ...EMPTY_EBOOK });
    setEbookSaveError(null);
    setViewState('editor');
  };

  const handleEditEbook = (ebook: DbEbook) => {
    setEditingEbookId(ebook.id);
    setEbookForm({
      title: ebook.title || '',
      slug: ebook.slug || '',
      description: ebook.description || '',
      author: ebook.author || '',
      category: ebook.category || '',
      cover_image: ebook.cover_image || '',
      cover_image_alt: ebook.cover_image_alt || '',
      download_url: ebook.download_url || '',
      page_count: ebook.page_count ? String(ebook.page_count) : '',
      tags: Array.isArray(ebook.tags)
        ? (ebook.tags as any[]).join(', ')
        : (ebook.tags || ''),
      status: ebook.status || 'Draft',
    });
    setEbookSaveError(null);
    setViewState('editor');
  };

  const handleDeleteEbook = async (id: number) => {
    if (!confirm('Delete this ebook? This cannot be undone.')) return;
    try {
      await deleteEbook(id);
      setDbEbooks(prev => prev.filter(e => e.id !== id));
    } catch (e: any) {
      alert(e.message ?? 'Delete failed.');
    }
  };

  const handleSaveEbook = async (e: React.FormEvent) => {
    e.preventDefault();
    setEbookSaveError(null);
    setEbookSaving(true);
    try {
      const payload = {
        title: ebookForm.title,
        slug: ebookForm.slug,
        description: ebookForm.description,
        author: ebookForm.author,
        category: ebookForm.category,
        cover_image: ebookForm.cover_image,
        cover_image_alt: ebookForm.cover_image_alt,
        download_url: ebookForm.download_url,
        page_count: ebookForm.page_count ? parseInt(ebookForm.page_count) : null,
        tags: ebookForm.tags
          ? ebookForm.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
          : [],
        status: ebookForm.status,
      };
      if (editingEbookId) {
        await updateEbook(editingEbookId, payload);
      } else {
        await createEbook(payload);
      }
      await loadEbooks();
      setViewState('list');
    } catch (err: any) {
      setEbookSaveError(err.message ?? 'Save failed. Try again.');
    } finally {
      setEbookSaving(false);
    }
  };

  // ---- Generic resource handlers ----
  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('dashboard');
    else if (id === 'careers') setView('career-ops');
    else if (id === 'blog') setView('blog-ops');
    else if (id === 'case-studies') setView('case-studies-ops');
    else if (id === 'resources') setView('resources-ops');
    else if (id === 'portfolio') setView('portfolio-ops');
    else if (id === 'admin') setView('admin-approvals');
    else if (id === 'profile') setView('profile');
  };

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({ title: '', slug: '', type: activeTab, author: '', readTime: '', resourceUrl: '', tags: '', featured: false, imageUrl: '', imageAlt: '', status: 'Draft', blocks: [], metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false, hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: '' });
    setViewState('editor');
    setEditorTab('content');
  };

  const handleEdit = (resource: Resource) => {
    setEditingId(resource.id);
    setFormData({
      title: resource.title, slug: resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
      type: resource.type, author: resource.author, readTime: '', resourceUrl: '', tags: '', featured: false, imageUrl: '', status: resource.status,
      blocks: [{ id: '1', type: 'rich_text', isCollapsed: false, content: { text: "Sample content..." } }],
      metaTitle: resource.title, metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false, hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: ''
    });
    setViewState('editor');
    setEditorTab('content');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (editingId) {
      setResources(prev => prev.map(p => p.id === editingId ? { ...p, title: formData.title, type: formData.type as any, author: formData.author, status: formData.status as any, date: formData.status === 'Published' && p.status !== 'Published' ? currentDate : p.date } : p));
    } else {
      setResources([{ id: Math.random().toString(36).substr(2, 9), title: formData.title, type: formData.type as any, author: formData.author, status: formData.status as any, date: formData.status === 'Published' ? currentDate : '-', views: 0 }, ...resources]);
    }
    setViewState('list');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) setResources(prev => prev.filter(p => p.id !== id));
  };

  const addBlock = (type: BlockType) => {
    setFormData(prev => ({ ...prev, blocks: [...prev.blocks, { id: Math.random().toString(36).substr(2, 9), type, isCollapsed: false, content: {} }] }));
  };
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
        <RichTextEditor key={block.id} value={block.content.text || ''} onChange={html => updateBlock(block.id, { ...block.content, text: html })} placeholder="Write rich text content here…" minHeight="150px" />
      );
      case 'html': return (
        <textarea value={block.content.code || ''} onChange={e => updateBlock(block.id, { ...block.content, code: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-green-400 font-mono text-xs focus:outline-none focus:border-[#E61739] min-h-[150px]"
          placeholder="<div>Custom code...</div>" />
      );
      case 'image': return (
        <ImagePicker
          value={block.content.url || ''}
          onChange={url => updateBlock(block.id, { ...block.content, url })}
          altText={block.content.alt || ''}
          onAltChange={alt => updateBlock(block.id, { ...block.content, alt })}
        />
      );
      case 'divider': return <div className="py-4"><hr className="border-white/10" /></div>;
      default: return null;
    }
  };

  const seoChecklist = [
    { label: 'Meta title ≤ 60 chars', done: formData.metaTitle.length > 0 && formData.metaTitle.length <= 60 },
    { label: 'Meta description 120–160 chars', done: formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 },
    { label: 'Keywords specified', done: formData.keywords.length > 0 },
    { label: 'Slug populated', done: formData.slug.length > 0 },
    { label: 'Open Graph populated', done: formData.ogTitle.length > 0 && formData.ogDescription.length > 0 },
    { label: 'Featured image added', done: formData.imageUrl.length > 0 },
  ];

  const filteredResources = resources.filter(r => r.type === activeTab);

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

  const ef = ebookForm;
  const setEf = (patch: Partial<typeof ebookForm>) => setEbookForm(prev => ({ ...prev, ...patch }));

  // ---- Helper: shared input styles ----
  const inp = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] text-sm";
  const lbl = "text-[10px] font-black uppercase tracking-widest text-white/40";

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">Publisher Portal</div>
        </div>
        <nav className="flex-grow px-4 py-6 space-y-1">
          {[
            { id: 'overview',     label: 'Overview',           icon: LayoutGrid  },
            { id: 'careers',      label: 'Career Ops',         icon: Briefcase   },
            { id: 'blog',         label: 'Blogs & Insights',   icon: FileText    },
            { id: 'case-studies', label: 'Case Studies',       icon: BookMarked  },
            { id: 'resources',    label: 'Resources',          icon: BookOpen    },
            { id: 'portfolio',    label: 'Creative Portfolio', icon: ImageIcon   },
            { id: 'admin',        label: 'User Approvals',     icon: Users       },
            { id: 'profile',      label: 'My Profile',         icon: UserCircle2 },
          ].map((item) => (
            <button key={item.id} onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${item.id === 'resources' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={18} />{item.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/5">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2"><Settings size={18} /> Settings</button>
          <button onClick={() => setView('login')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all"><LogOut size={18} /> Sign Out</button>
        </div>
      </aside>

      <main className="flex-grow flex flex-col min-h-screen relative overflow-hidden">

        {/* ─── LIST VIEW ─── */}
        {viewState === 'list' && (
          <div className="p-8 md:p-12 overflow-y-auto flex-grow">
            <div className="flex justify-between items-center mb-10">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                  <ChevronLeft size={10} className="rotate-180" />
                  <span className="text-[#E61739]">Resources</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Resources Library</h1>
              </div>
              <button
                onClick={activeTab === 'ebooks' ? handleCreateEbook : handleCreateNew}
                className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg"
              >
                <Plus size={16} /> {activeTab === 'ebooks' ? 'New Ebook' : 'Create Resource'}
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-4 mb-8 border-b border-white/5">
              {[{ id: 'ebooks', label: 'Ebooks', icon: BookOpen }, { id: 'cases', label: 'Case Studies', icon: TrendingUp }, { id: 'webinars', label: 'Webinars', icon: Presentation }].map((tab) => (
                <button key={tab.id} onClick={() => { setActiveTab(tab.id as any); setViewState('list'); }}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${activeTab === tab.id ? 'border-[#E61739] text-[#E61739]' : 'border-transparent text-white/40 hover:text-white/80'}`}>
                  <tab.icon size={18} />{tab.label}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" placeholder={`Search ${activeTab}...`} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
              </div>
            </div>

            {/* ── Ebooks List (API) ── */}
            {activeTab === 'ebooks' && (
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                {ebooksLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="animate-spin text-[#E61739]" size={32} />
                  </div>
                ) : ebooksError ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-3 text-white/30">
                    <AlertCircle size={32} />
                    <p className="text-sm font-medium">{ebooksError}</p>
                    <button onClick={loadEbooks} className="text-[#E61739] text-xs font-bold hover:underline">Retry</button>
                  </div>
                ) : dbEbooks.length === 0 ? (
                  <div className="p-16 text-center">
                    <BookOpen size={40} className="text-white/10 mx-auto mb-4" />
                    <p className="text-white/30 font-medium mb-2">No ebooks yet.</p>
                    <button onClick={handleCreateEbook} className="text-[#E61739] text-sm font-bold hover:underline">Create your first ebook →</button>
                  </div>
                ) : (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                        <th className="px-8 py-5">Title</th>
                        <th className="px-6 py-5">Category</th>
                        <th className="px-6 py-5">Author</th>
                        <th className="px-6 py-5">Status</th>
                        <th className="px-6 py-5">Published</th>
                        <th className="px-6 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {dbEbooks.map(ebook => (
                        <tr key={ebook.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-5">
                            <div className="font-bold text-white line-clamp-1 max-w-xs">{ebook.title}</div>
                            <div className="text-white/30 text-xs font-mono mt-0.5">/{ebook.slug}</div>
                          </td>
                          <td className="px-6 py-5 text-sm text-white/50">{ebook.category || '—'}</td>
                          <td className="px-6 py-5 text-sm text-white/70">
                            <div className="flex items-center gap-2"><User size={12} className="text-white/30" />{ebook.author || '—'}</div>
                          </td>
                          <td className="px-6 py-5">
                            <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${ebook.status === 'published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : ebook.status === 'draft' ? 'bg-white/5 text-white/50 border-white/10' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>
                              {ebook.status}
                            </span>
                          </td>
                          <td className="px-6 py-5 text-sm text-white/40 font-mono">
                            {ebook.published_at ? new Date(ebook.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                          </td>
                          <td className="px-6 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleEditEbook(ebook)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739]"><Edit2 size={16} /></button>
                              <button onClick={() => handleDeleteEbook(ebook.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {/* ── Cases / Webinars List (Mock) ── */}
            {activeTab !== 'ebooks' && (
              <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                {filteredResources.length > 0 ? (
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                        <th className="px-8 py-5">Title</th><th className="px-8 py-5">Author</th><th className="px-8 py-5">Status</th><th className="px-8 py-5">Published</th><th className="px-8 py-5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredResources.map((resource) => (
                        <tr key={resource.id} className="hover:bg-white/5 transition-colors group">
                          <td className="px-8 py-5"><div className="font-bold text-white line-clamp-1">{resource.title}</div></td>
                          <td className="px-8 py-5 text-sm text-white/70"><div className="flex items-center gap-2"><User size={12} className="text-white/30" />{resource.author}</div></td>
                          <td className="px-8 py-5"><span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${resource.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : resource.status === 'Draft' ? 'bg-white/5 text-white/50 border-white/10' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{resource.status}</span></td>
                          <td className="px-8 py-5 text-sm text-white/40 font-mono">{resource.date}</td>
                          <td className="px-8 py-5 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button onClick={() => handleEdit(resource)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739]"><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(resource.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-16 text-center text-white/30 font-medium">No {activeTab} found. Create one to get started.</div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ─── EBOOK EDITOR ─── */}
        {viewState === 'editor' && activeTab === 'ebooks' && (
          <form onSubmit={handleSaveEbook} className="flex-grow flex flex-col min-h-screen">
            {/* Editor header */}
            <header className="bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setViewState('list')} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={20} /></button>
                <div className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white/70 font-mono min-w-[200px] truncate">
                  {ef.title || 'Untitled Ebook'}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Ebook Editor</span>
              </div>
              <div className="flex items-center gap-3">
                {ebookSaveError && (
                  <span className="text-red-400 text-xs font-medium flex items-center gap-1">
                    <AlertCircle size={14} /> {ebookSaveError}
                  </span>
                )}
                <select
                  value={ef.status}
                  onChange={e => setEf({ status: e.target.value })}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <button
                  type="submit"
                  disabled={ebookSaving}
                  className="px-6 py-2 bg-[#E61739] hover:bg-[#c51431] text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-60"
                >
                  {ebookSaving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {editingEbookId ? 'Update' : 'Publish'}
                </button>
              </div>
            </header>

            <div className="flex-grow p-8 md:p-10 overflow-y-auto">
              {/* ── Section: Basic Info ── */}
              <div className="mb-8">
                <h2 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                  <FileText size={14} /> Basic Information
                </h2>
                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div className="col-span-2 space-y-1.5">
                      <label className={lbl}>Title <span className="text-[#E61739]">*</span></label>
                      <input required type="text" value={ef.title} onChange={e => setEf({ title: e.target.value })} className={inp} placeholder="e.g. The CFO's Guide to AI-Driven Finance" />
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>URL Slug <span className="text-[#E61739]">*</span></label>
                      <input required type="text" value={ef.slug} onChange={e => setEf({ slug: e.target.value })} className={`${inp} font-mono`} placeholder="cfo-guide-ai-finance" />
                      <p className="text-[10px] text-white/20">Auto-generated from title. Edit to customize.</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Category</label>
                      <select value={ef.category} onChange={e => setEf({ category: e.target.value })} className={inp}>
                        <option value="">Select category…</option>
                        {EBOOK_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Author / Source <span className="text-[#E61739]">*</span></label>
                      <input required type="text" value={ef.author} onChange={e => setEf({ author: e.target.value })} className={inp} placeholder="e.g. KDCI Research Lab" />
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>Page Count</label>
                      <input type="number" min="1" value={ef.page_count} onChange={e => setEf({ page_count: e.target.value })} className={inp} placeholder="e.g. 32" />
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className={lbl}>Description / Summary <span className="text-[#E61739]">*</span></label>
                      <textarea required value={ef.description} onChange={e => setEf({ description: e.target.value })} rows={4} className={`${inp} resize-none`} placeholder="A short paragraph describing what this ebook covers, who it's for, and what readers will learn." />
                      <p className="text-[10px] text-white/20">Shown on the ebook listing and detail page. Aim for 2–3 sentences.</p>
                    </div>
                    <div className="col-span-2 space-y-1.5">
                      <label className={lbl}>Tags <span className="text-white/20 normal-case font-medium">(comma-separated)</span></label>
                      <input type="text" value={ef.tags} onChange={e => setEf({ tags: e.target.value })} className={inp} placeholder="e.g. AI Ops, Finance, Automation" />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section: Media & Files ── */}
              <div className="mb-8">
                <h2 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                  <ImageIcon size={14} /> Media & Files
                </h2>
                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 space-y-5">
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <ImagePicker
                        label="Cover Image"
                        value={ef.cover_image}
                        onChange={url => setEf({ cover_image: url })}
                        altText={ef.cover_image_alt}
                        onAltChange={alt => setEf({ cover_image_alt: alt })}
                        hint="Displayed on the ebook card and detail page. Ideal: portrait 3:4 ratio."
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className={lbl}>PDF Download URL</label>
                      <input type="url" value={ef.download_url} onChange={e => setEf({ download_url: e.target.value })} className={inp} placeholder="https://..." />
                      <p className="text-[10px] text-white/20">Direct link to the PDF file. Leave blank to show a "Request Access" button instead.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section: Checklist ── */}
              <div className="mb-8">
                <h2 className="text-xs font-black uppercase tracking-widest text-white/30 mb-4 flex items-center gap-2">
                  <Check size={14} /> Pre-publish Checklist
                </h2>
                <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { label: 'Title filled', done: ef.title.length > 0 },
                      { label: 'Slug set', done: ef.slug.length > 0 },
                      { label: 'Description written', done: ef.description.length > 30 },
                      { label: 'Author specified', done: ef.author.length > 0 },
                      { label: 'Category selected', done: ef.category.length > 0 },
                      { label: 'Cover image added', done: ef.cover_image.length > 0 },
                      { label: 'Download URL provided', done: ef.download_url.length > 0 },
                      { label: 'Tags added', done: ef.tags.length > 0 },
                    ].map((item, i) => (
                      <div key={i} className={`flex items-center gap-2 text-sm font-medium ${item.done ? 'text-green-400' : 'text-white/25'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${item.done ? 'bg-green-500/20 border-green-500' : 'border-white/15'}`}>
                          {item.done && <Check size={10} className="text-green-400" />}
                        </div>
                        {item.label}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* ─── GENERIC EDITOR (Cases / Webinars) ─── */}
        {viewState === 'editor' && activeTab !== 'ebooks' && (
          <form onSubmit={handleSave} className="flex-grow flex flex-col min-h-screen">
            <header className="bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setViewState('list')} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={20} /></button>
                <div className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white/70 font-mono min-w-[200px] truncate">{formData.title || 'Untitled Resource'}</div>
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
                <button type="submit" className="px-6 py-2 bg-[#E61739] hover:bg-[#c51431] text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg">
                  <Save size={16} /> Save
                </button>
              </div>
            </header>

            <div className="flex flex-grow overflow-hidden">
              <div className="flex-grow p-8 overflow-y-auto space-y-6">
                {editorTab === 'content' && (
                  <>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Title</label>
                        <input type="text" required value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))}
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] font-bold" placeholder="Resource title..." />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Type</label>
                        <select value={formData.type} onChange={e => setFormData(p => ({ ...p, type: e.target.value }))}
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]">
                          <option value="cases">Case Study</option>
                          <option value="webinars">Webinar</option>
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
                      <div>
                        <ImagePicker
                          label="Cover Image"
                          value={formData.imageUrl}
                          onChange={url => setFormData(p => ({ ...p, imageUrl: url }))}
                          altText={formData.imageAlt}
                          onAltChange={alt => setFormData(p => ({ ...p, imageAlt: alt }))}
                        />
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
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="e.g. q1-ebook" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
