import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { 
  ChevronLeft, BookOpen, TrendingUp, Presentation, Plus, Search, Edit2, Trash2, LogOut, Settings, LayoutGrid, Briefcase, FileText, Image as ImageIcon,
  Save, Eye, Check, ChevronUp, ChevronDown, GripVertical, Type, Code, Youtube, Columns, MousePointer2, Quote, AppWindow, Minus, ExternalLink, Activity, User
} from 'lucide-react';

interface Resource {
  id: string;
  title: string;
  type: 'ebooks' | 'cases' | 'webinars';
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

const MOCK_RESOURCES: Resource[] = [
  { id: '1', title: "The 2024 AI Engineering Handbook", type: "ebooks", author: "Sarah Chen", status: 'Published', date: 'Oct 15, 2024', views: 1250 },
  { id: '2', title: "Fintech Support Scaling: 0 to 500+", type: "cases", author: "Michael Ross", status: 'Published', date: 'Sep 20, 2024', views: 890 },
  { id: '3', title: "Future of Customer Ops (Live Session)", type: "webinars", author: "KDCI Events", status: 'Draft', date: '-', views: 0 },
];

export const ResourcesOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeTab, setActiveTab] = useState<'ebooks' | 'cases' | 'webinars'>('ebooks');
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [resources, setResources] = useState<Resource[]>(MOCK_RESOURCES);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'hubspot'>('content');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    type: 'ebooks',
    author: '',
    readTime: '10 min',
    resourceUrl: '', // Additional field for download link or webinar link
    tags: '',
    featured: false,
    imageUrl: '',
    status: 'Draft',
    
    blocks: [] as Block[],
    
    metaTitle: '',
    metaDescription: '',
    keywords: '',
    canonicalUrl: '',
    ogTitle: '',
    ogDescription: '',
    ogImageUrl: '',
    jsonLd: '',
    noIndex: false,

    hubspotEventName: '',
    hubspotFormGuid: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = originalBg; };
  }, []);

  // Update slug automatically
  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({ ...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    }
  }, [formData.title]);

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData({
      title: '', slug: '', type: activeTab, author: '', readTime: '', resourceUrl: '', tags: '', featured: false, imageUrl: '', status: 'Draft',
      blocks: [], metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false, hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: ''
    });
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
      setResources(prev => prev.map(p => p.id === editingId ? { 
        ...p, title: formData.title, type: formData.type as any, author: formData.author, status: formData.status as any,
        date: formData.status === 'Published' && p.status !== 'Published' ? currentDate : p.date
      } : p));
    } else {
      const newResource: Resource = {
        id: Math.random().toString(36).substr(2, 9), title: formData.title, type: formData.type as any, author: formData.author, status: formData.status as any, date: formData.status === 'Published' ? currentDate : '-', views: 0
      };
      setResources([newResource, ...resources]);
    }
    setViewState('list');
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this resource?")) setResources(prev => prev.filter(p => p.id !== id));
  };

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('publisher-dashboard');
    else if (id === 'careers') setView('cms-career-ops');
    else if (id === 'blog') setView('cms-blog-ops');
    else if (id === 'resources') setView('cms-resources-ops');
    else if (id === 'portfolio') setView('cms-portfolio-ops');
  };

  const addBlock = (type: BlockType) => {
    const newBlock: Block = { id: Math.random().toString(36).substr(2, 9), type, isCollapsed: false, content: {} };
    setFormData(prev => ({ ...prev, blocks: [...prev.blocks, newBlock] }));
  };

  const removeBlock = (id: string) => {
    setFormData(prev => ({ ...prev, blocks: prev.blocks.filter(b => b.id !== id) }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === formData.blocks.length - 1) return;
    
    const newBlocks = [...formData.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    [newBlocks[index], newBlocks[targetIndex]] = [newBlocks[targetIndex], newBlocks[index]];
    setFormData(prev => ({ ...prev, blocks: newBlocks }));
  };

  const toggleBlock = (id: string) => {
    setFormData(prev => ({
      ...prev, blocks: prev.blocks.map(b => b.id === id ? { ...b, isCollapsed: !b.isCollapsed } : b)
    }));
  };

  const updateBlock = (id: string, newContent: any) => {
    setFormData(prev => ({
      ...prev, blocks: prev.blocks.map(b => b.id === id ? { ...b, content: newContent } : b)
    }));
  };

  const renderBlockEditor = (block: Block) => {
    switch(block.type) {
      case 'rich_text': return (
        <div className="space-y-4">
          <div className="flex items-center flex-wrap gap-2 border-b border-white/10 pb-2 mb-2">
            <button type="button" className="p-1 hover:bg-white/10 rounded"><b className="font-serif">B</b></button>
            <button type="button" className="p-1 hover:bg-white/10 rounded"><i className="font-serif">I</i></button>
            <button type="button" className="p-1 hover:bg-white/10 rounded"><u className="font-serif">U</u></button>
            <div className="w-px h-4 bg-white/20"></div>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">H1</button>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">H2</button>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">H3</button>
            <div className="w-px h-4 bg-white/20"></div>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">List</button>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">Num</button>
            <div className="w-px h-4 bg-white/20"></div>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">Quote</button>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">Align</button>
            <div className="w-px h-4 bg-white/20"></div>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">Link</button>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">Image</button>
            <button type="button" className="p-1 hover:bg-white/10 rounded text-xs font-bold">YouTube</button>
          </div>
          <textarea 
            value={block.content.text || ''} onChange={e => updateBlock(block.id, { ...block.content, text: e.target.value })}
            className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] transition-all min-h-[150px]"
            placeholder="Write your rich text content here..."
          />
        </div>
      );
      case 'html': return (
        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs text-white/50">
            <span>Raw HTML / CSS / JS</span>
            <label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" onChange={e => updateBlock(block.id, { ...block.content, preview: e.target.checked })} checked={block.content.preview || false} /> Live Preview</label>
          </div>
          {block.content.preview ? (
            <div className="p-4 bg-white text-black min-h-[150px] rounded-xl overflow-hidden" dangerouslySetInnerHTML={{ __html: block.content.code || '<i>No preview available</i>' }} />
          ) : (
            <textarea 
              value={block.content.code || ''} onChange={e => updateBlock(block.id, { ...block.content, code: e.target.value })}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-green-400 font-mono text-xs focus:outline-none focus:border-[#E61739] min-h-[150px]"
              placeholder="<div>Custom code...</div>"
            />
          )}
        </div>
      );
      case 'image': return (
        <div className="space-y-4">
          <input type="text" value={block.content.url || ''} onChange={e => updateBlock(block.id, { ...block.content, url: e.target.value })} placeholder="Image URL" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
          <div className="flex gap-4">
            <input type="text" value={block.content.alt || ''} onChange={e => updateBlock(block.id, { ...block.content, alt: e.target.value })} placeholder="Alt text" className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
            <input type="text" value={block.content.caption || ''} onChange={e => updateBlock(block.id, { ...block.content, caption: e.target.value })} placeholder="SEO Caption" className="flex-1 bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
          </div>
          {block.content.url && <div className="mt-4 p-2 border border-white/10 rounded-lg"><img src={block.content.url} alt={block.content.alt} className="max-h-48 object-contain mx-auto" /></div>}
        </div>
      );
      case 'video': return (
        <div className="space-y-4">
          <input type="text" value={block.content.url || ''} onChange={e => updateBlock(block.id, { ...block.content, url: e.target.value })} placeholder="YouTube or Vimeo URL" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
          {block.content.url && <div className="mt-4 aspect-video bg-black/40 border border-white/10 rounded-lg flex items-center justify-center text-white/40 shadow-inner">Live Video Embedded Preview</div>}
        </div>
      );
      case 'divider': return <div className="py-4"><hr className="border-white/10" /></div>;
      case 'pull_quote': return (
        <div className="space-y-4">
          <textarea value={block.content.quote || ''} onChange={e => updateBlock(block.id, { ...block.content, quote: e.target.value })} placeholder="Quote text" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none min-h-[80px]" />
          <input type="text" value={block.content.attribution || ''} onChange={e => updateBlock(block.id, { ...block.content, attribution: e.target.value })} placeholder="Attribution (e.g. John Doe, CEO)" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
        </div>
      );
      case 'cta': return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <input type="text" value={block.content.headline || ''} onChange={e => updateBlock(block.id, { ...block.content, headline: e.target.value })} placeholder="CTA Headline" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
            <input type="text" value={block.content.buttonText || ''} onChange={e => updateBlock(block.id, { ...block.content, buttonText: e.target.value })} placeholder="Button Text" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
            <input type="text" value={block.content.buttonUrl || ''} onChange={e => updateBlock(block.id, { ...block.content, buttonUrl: e.target.value })} placeholder="Button URL or Hubspot Form GUID" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
          </div>
          <div className="p-4 bg-[#E61739]/10 border border-[#E61739]/20 rounded-xl flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-lg mb-4">{block.content.headline || 'Your Headline Here'}</h4>
            <button type="button" className="px-6 py-2 bg-[#E61739] text-white rounded-lg font-bold shadow-lg shadow-[#E61739]/20">{block.content.buttonText || 'Click Here'}</button>
          </div>
        </div>
      );
      case 'two_columns': return (
        <div className="grid grid-cols-2 gap-4">
          <textarea placeholder="Left Column HTML/Text" value={block.content.left || ''} onChange={e => updateBlock(block.id, { ...block.content, left: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none min-h-[150px]" />
          <textarea placeholder="Right Column HTML/Text" value={block.content.right || ''} onChange={e => updateBlock(block.id, { ...block.content, right: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none min-h-[150px]" />
        </div>
      );
      case 'embed': return (
        <div className="space-y-4">
          <textarea placeholder="Paste embed code (Typeform, Calendly, Scripts)" value={block.content.code || ''} onChange={e => updateBlock(block.id, { ...block.content, code: e.target.value })} className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-green-400 font-mono focus:border-[#E61739] focus:outline-none min-h-[100px]" />
        </div>
      );
    }
  };

  const getSEOChecklistItems = () => [
    { label: 'Meta title specified and ≤ 60 chars', done: formData.metaTitle.length > 0 && formData.metaTitle.length <= 60 },
    { label: 'Meta description between 120-160 chars', done: formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 },
    { label: 'Meta keywords specified', done: formData.keywords.length > 0 },
    { label: 'URL Slug populated', done: formData.slug.length > 0 },
    { label: 'Canonical URL populated', done: formData.canonicalUrl.length > 0 },
    { label: 'Open Graph title & desc populated', done: formData.ogTitle.length > 0 && formData.ogDescription.length > 0 },
    { label: 'Featured Image added', done: formData.imageUrl.length > 0 },
    { label: 'JSON-LD structured data included', done: formData.jsonLd.length > 0 },
  ];

  const getHubspotChecklistItems = () => [
    { label: 'UTM Source specified', done: formData.utmSource.length > 0 },
    { label: 'UTM Medium specified', done: formData.utmMedium.length > 0 },
    { label: 'UTM Campaign specified', done: formData.utmCampaign.length > 0 },
    { label: 'Event tracking name specified', done: formData.hubspotEventName.length > 0 },
  ];

  const seoChecklist = getSEOChecklistItems();
  const hubspotChecklist = getHubspotChecklistItems();

  const titleColor = formData.metaTitle.length === 0 ? 'text-white/40' : formData.metaTitle.length <= 60 ? 'text-green-500' : 'text-red-500';
  const descColor = formData.metaDescription.length === 0 ? 'text-white/40' : formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'text-green-500' : formData.metaDescription.length < 120 ? 'text-yellow-500' : 'text-red-500';

  const filteredResources = resources.filter(r => r.type === activeTab);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">
      
      {/* Sidebar Navigation */}
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
            { id: 'resources', label: 'Resources', icon: BookOpen },
            { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.id === 'resources' 
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
      <main className="flex-grow flex flex-col min-h-screen relative overflow-hidden">
        
        {viewState === 'list' && (
          <div className="p-8 md:p-12 overflow-y-auto flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span onClick={() => setView('publisher-dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                  <ChevronLeft size={10} className="rotate-180" />
                  <span className="text-[#E61739]">Content Ops</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Resources Library</h1>
              </div>
              <button onClick={handleCreateNew} className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red">
                <Plus size={16} /> Create Resource
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex gap-4 mb-8 border-b border-white/5">
              {[
                { id: 'ebooks', label: 'Ebooks', icon: BookOpen },
                { id: 'cases', label: 'Case Studies', icon: TrendingUp },
                { id: 'webinars', label: 'Webinars', icon: Presentation },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-bold border-b-2 transition-all ${
                    activeTab === tab.id
                      ? 'border-[#E61739] text-[#E61739]'
                      : 'border-transparent text-white/40 hover:text-white/80'
                  }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" placeholder={`Search ${activeTab}...`} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
              {filteredResources.length > 0 ? (
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                      <th className="px-8 py-5">Title</th>
                      <th className="px-8 py-5">Author</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Published</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredResources.map((resource) => (
                      <tr key={resource.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-5"><div className="font-bold text-white line-clamp-1">{resource.title}</div></td>
                        <td className="px-8 py-5 text-sm text-white/70"><div className="flex items-center gap-2"><User size={12} className="text-white/30" /> {resource.author}</div></td>
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
                <div className="text-center py-20 px-4">
                  <h2 className="text-xl font-bold text-white mb-2">No {activeTab} defined yet!</h2>
                  <p className="text-white/40 mb-6 text-sm">Publishing options for {activeTab} will appear here.</p>
                  <button onClick={handleCreateNew} className="px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                    Create your first entry
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {viewState === 'editor' && (
          <form onSubmit={handleSave} className="flex-grow flex flex-col min-h-screen animate-in fade-in slide-in-from-right-8 duration-500">
            {/* Top Toolbar */}
            <header className="bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
               <div className="flex items-center gap-4">
                 <button type="button" onClick={() => setViewState('list')} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={20} /></button>
                 <div className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white/70 font-mono min-w-[200px] truncate">
                   {formData.title || 'Untitled Resource'}
                 </div>
                 <div className="flex gap-2">
                   {['content', 'seo', 'hubspot'].map((tab) => (
                      <button 
                        key={tab} type="button" onClick={() => setEditorTab(tab as any)}
                        className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${editorTab === tab ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
                      >
                        {tab === 'content' ? 'Content Builder' : tab === 'seo' ? 'SEO & Meta' : 'HubSpot Tracking'}
                      </button>
                   ))}
                 </div>
               </div>
               <div className="flex items-center gap-4">
                  <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value as any})} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                     <option value="Draft">Draft</option>
                     <option value="Published">Published</option>
                     <option value="Archived">Archived</option>
                  </select>
                  <button type="submit" className="px-6 py-2 bg-[#E61739] text-white rounded-lg font-bold text-sm shadow-lg flex items-center gap-2"><Save size={16}/> Save</button>
               </div>
            </header>

            <div className="flex flex-grow overflow-hidden relative">
               {/* Left Pane - Main Area */}
               <div className="flex-grow overflow-y-auto p-8 lg:p-12 pb-32">
                  <div className="max-w-4xl mx-auto space-y-8">
                     
                     {editorTab === 'content' && (
                        <div className="space-y-8">
                           <div className="space-y-2">
                              <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Resource Headline</label>
                              <input 
                                required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})}
                                placeholder="Enter an engaging title..." 
                                className="w-full bg-transparent border-0 border-b-2 border-white/10 px-0 py-4 text-white focus:ring-0 focus:outline-none focus:border-[#E61739] transition-all font-heading font-bold text-4xl"
                              />
                           </div>

                           {/* Blocks rendered here */}
                           <div className="space-y-4">
                              {formData.blocks.length === 0 && (
                                <div className="text-center py-12 border-2 border-dashed border-white/10 rounded-2xl">
                                   <div className="text-white/40 mb-4">No content blocks yet.</div>
                                </div>
                              )}
                              {formData.blocks.map((block, index) => (
                                 <div key={block.id} className="group bg-[#1a1a1a] border border-white/5 hover:border-white/20 rounded-2xl overflow-hidden transition-all">
                                    <div className="bg-black/20 p-3 flex justify-between items-center border-b border-white/5 cursor-move">
                                       <div className="flex items-center gap-3">
                                          <GripVertical size={16} className="text-white/20 group-hover:text-white/50" />
                                          <span className="text-xs font-bold uppercase tracking-widest text-white/60">{block.type.replace('_', ' ')}</span>
                                       </div>
                                       <div className="flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                                          <button type="button" onClick={() => moveBlock(index, 'up')} className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white"><ChevronUp size={16}/></button>
                                          <button type="button" onClick={() => moveBlock(index, 'down')} className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white"><ChevronDown size={16}/></button>
                                          <div className="w-px h-4 bg-white/10 mx-1"></div>
                                          <button type="button" onClick={() => toggleBlock(block.id)} className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white">{block.isCollapsed ? <Eye size={16}/> : <Minus size={16}/>}</button>
                                          <button type="button" onClick={() => removeBlock(block.id)} className="p-1 hover:bg-red-500/20 rounded text-white/60 hover:text-red-500"><Trash2 size={16}/></button>
                                       </div>
                                    </div>
                                    {!block.isCollapsed && <div className="p-6">{renderBlockEditor(block)}</div>}
                                 </div>
                              ))}
                           </div>

                           {/* Block Adder Menu */}
                           <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-white/5 mt-8">
                              <div className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 text-center">Add Content Block</div>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                 {[
                                   { type: 'rich_text', icon: Type, label: 'Rich Text' },
                                   { type: 'html', icon: Code, label: 'Custom HTML' },
                                   { type: 'image', icon: ImageIcon, label: 'Image' },
                                   { type: 'video', icon: Youtube, label: 'Video Embed' },
                                   { type: 'two_columns', icon: Columns, label: 'Two Columns' },
                                   { type: 'cta', icon: MousePointer2, label: 'Call to Action' },
                                   { type: 'pull_quote', icon: Quote, label: 'Pull Quote' },
                                   { type: 'embed', icon: AppWindow, label: '3rd Party Embed' },
                                   { type: 'divider', icon: Minus, label: 'Divider' },
                                 ].map(btn => (
                                   <button 
                                     key={btn.type} type="button" onClick={() => addBlock(btn.type as BlockType)}
                                     className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-white/10 hover:border-[#E61739] hover:bg-[#E61739]/5 text-white/60 hover:text-[#E61739] transition-all group"
                                   >
                                      <btn.icon size={24} className="group-hover:scale-110 transition-transform" />
                                      <span className="text-[10px] font-bold uppercase tracking-wider">{btn.label}</span>
                                   </button>
                                 ))}
                              </div>
                           </div>
                        </div>
                     )}

                     {editorTab === 'seo' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                           {/* Live SERP Preview */}
                           <div className="bg-white rounded-2xl p-6 text-black border border-gray-200">
                             <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2"><ExternalLink size={14}/> Live Google SERP Preview</div>
                             <div className="space-y-1">
                               <div className="text-sm text-gray-800">https://kdci.co/resources/{formData.slug || 'your-url-slug'}</div>
                               <h3 className="text-xl text-[#1a0dab] font-sans hover:underline cursor-pointer break-words">{formData.metaTitle || formData.title || 'Your Meta Title Will Appear Here'}</h3>
                               <p className="text-sm text-[#4d5156] leading-snug break-words">{formData.metaDescription || 'Your meta description will appear here. Make it compelling and between 120-160 characters.'}</p>
                             </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-6">
                               <div className="space-y-2">
                                  <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Meta Title</label>
                                    <span className={`text-xs font-mono font-bold ${titleColor}`}>{formData.metaTitle.length}/60</span>
                                  </div>
                                  <input type="text" value={formData.metaTitle} onChange={e => setFormData({...formData, metaTitle: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                               </div>
                               <div className="space-y-2">
                                  <div className="flex justify-between items-end">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Meta Description</label>
                                    <span className={`text-xs font-mono font-bold ${descColor}`}>{formData.metaDescription.length}/160</span>
                                  </div>
                                  <textarea rows={3} value={formData.metaDescription} onChange={e => setFormData({...formData, metaDescription: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Keywords (Comma Separated)</label>
                                  <input type="text" value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                               </div>
                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Canonical URL (Optional)</label>
                                  <input type="text" value={formData.canonicalUrl} onChange={e => setFormData({...formData, canonicalUrl: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" placeholder="https://..." />
                               </div>
                               <div className="pt-4 flex items-center gap-3">
                                  <input type="checkbox" id="noindex" checked={formData.noIndex} onChange={e => setFormData({...formData, noIndex: e.target.checked})} className="w-5 h-5 accent-[#E61739] rounded bg-[#1a1a1a] border-white/10" />
                                  <label htmlFor="noindex" className="text-sm font-bold text-white/70">No-Index (Hide from Search Engines)</label>
                               </div>
                             </div>

                             <div className="space-y-6">
                               <div className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 space-y-6">
                                 <h3 className="text-sm font-bold border-b border-white/10 pb-4">Social Media (Open Graph)</h3>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">OG Title</label>
                                    <input type="text" value={formData.ogTitle} onChange={e => setFormData({...formData, ogTitle: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">OG Description</label>
                                    <textarea rows={2} value={formData.ogDescription} onChange={e => setFormData({...formData, ogDescription: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                 </div>
                                 <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">OG Image URL</label>
                                    <input type="text" value={formData.ogImageUrl} onChange={e => setFormData({...formData, ogImageUrl: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                 </div>
                               </div>

                               <div className="space-y-2">
                                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 flex items-center justify-between">
                                    JSON-LD Structured Data <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-[8px] font-bold">Advanced</span>
                                  </label>
                                  <textarea rows={6} value={formData.jsonLd} onChange={e => setFormData({...formData, jsonLd: e.target.value})} placeholder="{ '@context': 'https://schema.org', '@type': 'Article' ... }" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-xs text-green-400 font-mono focus:outline-none focus:border-[#E61739]" />
                               </div>
                             </div>
                           </div>
                        </div>
                     )}

                     {editorTab === 'hubspot' && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                           <div className="p-6 bg-[#ff7a59]/10 border border-[#ff7a59]/20 rounded-2xl">
                             <h3 className="text-[#ff7a59] font-bold mb-2 flex items-center gap-2"><Activity size={18}/> HubSpot Integration Set Up</h3>
                             <p className="text-sm text-[#ff7a59]/80 mb-4">You must have the HubSpot tracking code installed in the site head to capture these events and forms. Ensure CTA blocks use the exact Form GUID defined below.</p>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                             <div className="space-y-6">
                               <h3 className="text-lg font-bold border-b border-white/10 pb-4">Behavioral Event Tracking</h3>
                               <div className="space-y-4">
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Custom Event Name (_hsq.push)</label>
                                    <input type="text" value={formData.hubspotEventName} onChange={e => setFormData({...formData, hubspotEventName: e.target.value})} placeholder="e.g. download_ebook_cta_click" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">HubSpot Form GUID (Triggered via CTA)</label>
                                    <input type="text" value={formData.hubspotFormGuid} onChange={e => setFormData({...formData, hubspotFormGuid: e.target.value})} placeholder="e.g. xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                  </div>
                                  <button type="button" className="px-4 py-2 border border-[#ff7a59] text-[#ff7a59] rounded-lg text-xs font-bold hover:bg-[#ff7a59] hover:text-white transition-all">
                                    Fire Test Event
                                  </button>
                               </div>
                             </div>

                             <div className="space-y-6">
                               <h3 className="text-lg font-bold border-b border-white/10 pb-4">UTM Parameter Builder</h3>
                               <div className="space-y-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">UTM Source</label>
                                      <input type="text" value={formData.utmSource} onChange={e => setFormData({...formData, utmSource: e.target.value})} placeholder="e.g. linkedin" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                    </div>
                                    <div className="space-y-2">
                                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">UTM Medium</label>
                                      <input type="text" value={formData.utmMedium} onChange={e => setFormData({...formData, utmMedium: e.target.value})} placeholder="e.g. social" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                    </div>
                                  </div>
                                  <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">UTM Campaign</label>
                                    <input type="text" value={formData.utmCampaign} onChange={e => setFormData({...formData, utmCampaign: e.target.value})} placeholder="e.g. q4_enterprise_push" className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]" />
                                  </div>
                                  <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Live Generated URL</div>
                                    <div className="text-xs font-mono text-green-400 break-all">
                                      https://kdci.co/resources/{formData.slug || 'slug'}?utm_source={formData.utmSource}&utm_medium={formData.utmMedium}&utm_campaign={formData.utmCampaign}
                                    </div>
                                  </div>
                               </div>
                             </div>
                           </div>
                        </div>
                     )}

                  </div>
               </div>

               {/* Right Sidebar - Meta & Checklists */}
               <div className="w-80 shrink-0 border-l border-white/5 bg-[#0a0a0a] overflow-y-auto hidden xl:block">
                  <div className="p-6 space-y-8">
                    {/* Post Settings */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 border-b border-white/5 pb-2">Resource Details</h4>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 ml-1">URL Slug</label>
                        <input type="text" value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 ml-1">Author / Host</label>
                        <input type="text" value={formData.author} onChange={e => setFormData({...formData, author: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 ml-1">Type</label>
                        <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white">
                           <option value="ebooks">Ebooks</option>
                           <option value="cases">Case Studies</option>
                           <option value="webinars">Webinars</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 ml-1">Resource Link / Download URL</label>
                        <input type="text" value={formData.resourceUrl} onChange={e => setFormData({...formData, resourceUrl: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" placeholder="https://..." />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 ml-1">Tags (comma separated)</label>
                        <input type="text" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40 ml-1">Cover Image</label>
                        <input type="text" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} placeholder="URL..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white mb-2" />
                        {formData.imageUrl && <img src={formData.imageUrl} alt="Cover" className="w-full h-auto aspect-video object-cover rounded-lg border border-white/10" />}
                      </div>
                      <div className="pt-2 flex items-center gap-2">
                        <input type="checkbox" id="featured" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="accent-[#E61739]" />
                        <label htmlFor="featured" className="text-xs font-bold text-white">Mark as Featured</label>
                      </div>
                    </div>

                    {/* SEO Checklist */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 border-b border-white/5 pb-2">SEO Checklist</h4>
                      <div className="space-y-2">
                        {seoChecklist.map((item, idx) => (
                           <div key={idx} className="flex items-start gap-2">
                              <div className={`mt-0.5 w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-green-500' : 'bg-white/10'}`}>
                                {item.done && <Check size={8} className="text-black" />}
                              </div>
                              <span className={`text-xs ${item.done ? 'text-white' : 'text-white/40'}`}>{item.label}</span>
                           </div>
                        ))}
                      </div>
                    </div>

                    {/* HubSpot Checklist */}
                    <div className="space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-widest text-white/40 mb-4 border-b border-white/5 pb-2 text-[#ff7a59]">HubSpot Checklist</h4>
                      <div className="space-y-2">
                        {hubspotChecklist.map((item, idx) => (
                           <div key={idx} className="flex items-start gap-2">
                              <div className={`mt-0.5 w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-[#ff7a59]' : 'bg-white/10'}`}>
                                {item.done && <Check size={8} className="text-white" />}
                              </div>
                              <span className={`text-xs ${item.done ? 'text-white' : 'text-white/40'}`}>{item.label}</span>
                           </div>
                        ))}
                      </div>
                    </div>
                    
                  </div>
               </div>
            </div>
          </form>
        )}

      </main>
    </div>
  );
};

