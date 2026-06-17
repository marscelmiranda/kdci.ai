import React, { useState, useEffect, useRef } from 'react';
import { ViewType } from '../types';
import { PortalTopBar } from '../components/PortalTopBar';
import { RichTextEditor } from '../components/RichTextEditor';
import { TableBuilder, generateTableHTML } from '../components/TableBuilder';
import {
  LayoutGrid, Briefcase, FileText, BookOpen, BookMarked,
  Image as ImageIcon, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Trash2, Save, X, User, Check,
  ChevronUp, ChevronDown, GripVertical, Type, Code, Youtube, Columns, MousePointer2,
  Quote, AppWindow, Minus, Activity, Loader2, AlertCircle, Users, UserCircle2,
  Eye, Sparkles, Calendar, Table2
} from 'lucide-react';
import { getAllPosts, createPost, updatePost, deletePost } from '../lib/api';
import { ImagePicker } from '../components/ImagePicker';
import { VideoEmbedEditor, VideoBlockRenderer } from '../components/VideoEmbedEditor';

interface BlogPost {
  id: string;
  title: string;
  category: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  date: string;
}

type BlockType = 'rich_text' | 'html' | 'image' | 'video' | 'two_columns' | 'cta' | 'pull_quote' | 'embed' | 'divider' | 'table';

interface Block {
  id: string;
  type: BlockType;
  isCollapsed: boolean;
  content: any;
}

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
  { type: 'table', label: 'Table', icon: <Table2 size={14} /> },
];

const renderPreviewBlocks = (blocks: Block[]) =>
  blocks.map((block, i) => {
    switch (block.type) {
      case 'rich_text':
        return <div key={i} className="rte-content" dangerouslySetInnerHTML={{ __html: block.content?.text || '' }} />;
      case 'html':
        return <div key={i} className="max-w-full overflow-x-auto [&_img]:max-w-full [&_table]:max-w-full [&_iframe]:max-w-full" dangerouslySetInnerHTML={{ __html: block.content?.code || '' }} />;
      case 'image':
        return block.content?.url ? (
          <div key={i} className="my-8">
            <img src={block.content.url} alt={block.content.caption || ''} className="w-full rounded-3xl object-cover" />
            {block.content.caption && <p className="text-center text-sm text-slate-400 mt-3">{block.content.caption}</p>}
          </div>
        ) : null;
      case 'pull_quote':
        return (
          <div key={i} className="my-12 border-l-4 border-[#E61739] pl-10 py-4 relative">
            <Quote size={60} className="absolute -top-6 -left-6 text-slate-100 opacity-80 -z-10" />
            <div className="text-2xl font-bold text-slate-900 leading-tight rte-content" dangerouslySetInnerHTML={{ __html: block.content?.quote || '' }} />
            {block.content?.author && <p className="mt-4 text-sm font-bold text-[#E61739]">— {block.content.author}</p>}
          </div>
        );
      case 'two_columns':
        return (
          <div key={i} className="my-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            {(['left', 'right'] as const).map(side => {
              const col = block.content?.[side] || {};
              if (col.type === 'image') return col.url ? (
                <div key={side}>
                  <img src={col.url} alt={col.caption || ''} className="w-full rounded-2xl object-cover" />
                  {col.caption && <p className="text-center text-xs text-slate-400 mt-2">{col.caption}</p>}
                </div>
              ) : <div key={side} className="rounded-2xl bg-slate-50 h-32 flex items-center justify-center text-slate-300 text-sm border border-slate-100">No image yet</div>;
              return <div key={side} className="rte-content" dangerouslySetInnerHTML={{ __html: col.text || '' }} />;
            })}
          </div>
        );
      case 'cta':
        return (
          <div key={i} className="my-10 bg-[#1D1D1F] rounded-[2rem] p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">{block.content?.headline || ''}</h3>
            {block.content?.buttonText && (
              <a href={block.content?.buttonUrl || '/contact'} target={block.content?.buttonUrl?.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-[#E61739] text-white rounded-xl font-bold hover:bg-[#c51431] transition-colors">
                {block.content.buttonText}
              </a>
            )}
          </div>
        );
      case 'video':
        return (
          <div key={i} className="my-8">
            <VideoBlockRenderer content={block.content} />
            {block.content?.caption && <p className="text-center text-sm text-slate-400 mt-3">{block.content.caption}</p>}
          </div>
        );
      case 'divider':
        return <hr key={i} className="my-10 border-slate-100" />;
      case 'table': {
        try {
          const tableData = typeof block.content?.tableData === 'string'
            ? JSON.parse(block.content.tableData)
            : block.content?.tableData;
          if (!tableData?.rows) return null;
          return (
            <div key={i} className="my-8 overflow-x-auto">
              <div dangerouslySetInnerHTML={{ __html: generateTableHTML(tableData) }} />
            </div>
          );
        } catch { return null; }
      }
      default:
        return null;
    }
  });

const emptyForm = () => ({
  title: '', slug: '', category: 'AI Operations', author: '', tags: '', imageUrl: '', imageAlt: '', status: 'draft',
  blocks: [] as Block[],
  metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false,
  hubspotEventName: '', utmSource: '', utmMedium: '', utmCampaign: ''
});

export const BlogOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor' | 'preview'>('list');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'hubspot'>('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState(emptyForm());
  const [hsFormGuid, setHsFormGuid] = useState<string>('');
  const [hsGuidLoaded, setHsGuidLoaded] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  // Wrap tables and iframes in the preview for mobile responsiveness
  useEffect(() => {
    if (viewState !== 'preview' || !previewRef.current) return;
    const container = previewRef.current;

    // Wrap bare <table> elements not already inside .rte-table-wrapper
    container.querySelectorAll<HTMLTableElement>('.rte-content table').forEach(table => {
      if (table.parentElement?.classList.contains('rte-table-wrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'rte-table-wrapper';
      table.parentNode?.insertBefore(wrapper, table);
      wrapper.appendChild(table);
    });

    // Wrap bare <iframe> elements not already inside .rte-video-wrapper
    container.querySelectorAll<HTMLIFrameElement>('.rte-content iframe').forEach(iframe => {
      if (iframe.parentElement?.classList.contains('rte-video-wrapper')) return;
      const wrapper = document.createElement('div');
      wrapper.className = 'rte-video-wrapper';
      iframe.parentNode?.insertBefore(wrapper, iframe);
      wrapper.appendChild(iframe);
    });
  }, [viewState, formData.blocks]);

  useEffect(() => {
    if (formData.title && !editingId) {
      setFormData(prev => ({ ...prev, slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') }));
    }
  }, [formData.title]);

  useEffect(() => {
    if (formData.slug) {
      setFormData(prev => ({ ...prev, utmCampaign: prev.slug }));
    }
  }, [formData.slug]);

  useEffect(() => {
    if (editorTab === 'hubspot' && !hsGuidLoaded) {
      fetch('/api/settings')
        .then(r => r.json())
        .then(d => { setHsFormGuid(d.hubspotFormGuid || ''); setHsGuidLoaded(true); })
        .catch(() => setHsGuidLoaded(true));
    }
  }, [editorTab, hsGuidLoaded]);

  const loadPosts = () => {
    setLoading(true);
    getAllPosts()
      .then((data: any[]) => {
        setPosts(data.map(p => ({
          id: String(p.id),
          title: p.title,
          category: p.category || '',
          author: p.author || '',
          status: p.status as BlogPost['status'],
          date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—',
        })));
      })
      .catch(() => setError('Failed to load posts'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadPosts(); }, []);

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
    setFormData(emptyForm());
    setViewState('editor');
    setEditorTab('content');
    setError(null);
  };

  const handlePreview = async (post: BlogPost) => {
    setEditingId(post.id);
    setError(null);
    try {
      const full: any = await (await fetch(`/api/blog/${post.id}`)).json();
      setFormData({
        title: full.title || '', slug: full.slug || '', category: full.category || 'AI Operations',
        author: full.author || '', tags: (full.tags || []).join(', '), imageUrl: full.cover_image || '', imageAlt: full.cover_image_alt || '',
        status: full.status || 'draft',
        blocks: (() => { try { return JSON.parse(full.content || '[]'); } catch { return [{ id: '1', type: 'rich_text' as BlockType, isCollapsed: false, content: { text: full.content || '' } }]; } })(),
        metaTitle: full.meta_title || '', metaDescription: full.meta_description || '', keywords: full.keywords || '',
        canonicalUrl: full.canonical_url || '', ogTitle: full.og_title || '', ogDescription: full.og_description || '', ogImageUrl: full.og_image_url || '',
        jsonLd: full.json_ld || '', noIndex: full.no_index || false, hubspotEventName: '', utmSource: '', utmMedium: '', utmCampaign: full.slug || ''
      });
    } catch {
      setFormData({ ...emptyForm(), title: post.title, category: post.category, author: post.author, status: post.status });
    }
    setViewState('preview');
  };

  const handleEdit = async (post: BlogPost) => {
    setEditingId(post.id);
    setError(null);
    try {
      const full: any = await (await fetch(`/api/blog/${post.id}`)).json();
      setFormData({
        title: full.title || '', slug: full.slug || '', category: full.category || 'AI Operations',
        author: full.author || '', tags: (full.tags || []).join(', '), imageUrl: full.cover_image || '', imageAlt: full.cover_image_alt || '',
        status: full.status || 'draft',
        blocks: (() => { try { return JSON.parse(full.content || '[]'); } catch { return [{ id: '1', type: 'rich_text' as BlockType, isCollapsed: false, content: { text: full.content || '' } }]; } })(),
        metaTitle: full.meta_title || '', metaDescription: full.meta_description || '', keywords: full.keywords || '',
        canonicalUrl: full.canonical_url || '', ogTitle: full.og_title || '', ogDescription: full.og_description || '', ogImageUrl: full.og_image_url || '',
        jsonLd: full.json_ld || '', noIndex: full.no_index || false, hubspotEventName: '', utmSource: '', utmMedium: '', utmCampaign: full.slug || ''
      });
    } catch {
      setFormData({ ...emptyForm(), title: post.title, category: post.category, author: post.author, status: post.status });
    }
    setViewState('editor');
    setEditorTab('content');
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const blocksJson = JSON.stringify(formData.blocks);
      const excerpt = formData.metaDescription ||
        formData.blocks.filter(b => b.type === 'rich_text').map(b => b.content.text || '').join(' ').slice(0, 200);
      const payload = {
        title: formData.title,
        slug: formData.slug,
        excerpt,
        content: blocksJson,
        author: formData.author,
        category: formData.category,
        cover_image: formData.imageUrl,
        cover_image_alt: formData.imageAlt,
        tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
        status: formData.status,
        meta_title: formData.metaTitle,
        meta_description: formData.metaDescription,
        keywords: formData.keywords,
        canonical_url: formData.canonicalUrl,
        og_title: formData.ogTitle,
        og_description: formData.ogDescription,
        og_image_url: formData.ogImageUrl,
        json_ld: formData.jsonLd,
        no_index: formData.noIndex,
      };
      if (editingId) {
        await updatePost(editingId, payload);
      } else {
        await createPost(payload);
      }
      await loadPosts();
      setViewState('list');
    } catch (err: any) {
      setError(err.message ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) return;
    try {
      await deletePost(id);
      setPosts(prev => prev.filter(p => p.id !== id));
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
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
        <RichTextEditor
          key={block.id}
          value={block.content.text || ''}
          onChange={html => updateBlock(block.id, { ...block.content, text: html })}
          placeholder="Write your content here…"
          minHeight="150px"
        />
      );
      case 'html': return (
        <textarea value={block.content.code || ''} onChange={e => updateBlock(block.id, { ...block.content, code: e.target.value })}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-green-400 font-mono text-xs focus:outline-none focus:border-[#E61739] min-h-[150px]" placeholder="<div>Custom HTML...</div>" />
      );
      case 'image': return (
        <ImagePicker
          value={block.content.url || ''}
          onChange={url => updateBlock(block.id, { ...block.content, url })}
          altText={block.content.alt || ''}
          onAltChange={alt => updateBlock(block.id, { ...block.content, alt })}
        />
      );
      case 'pull_quote': return (
        <div className="space-y-3">
          <RichTextEditor
            key={block.id + '_pq'}
            value={block.content.quote || ''}
            onChange={html => updateBlock(block.id, { ...block.content, quote: html })}
            placeholder="Enter pull quote text…"
            minHeight="80px"
          />
          <input
            type="text"
            value={block.content.author || ''}
            onChange={e => updateBlock(block.id, { ...block.content, author: e.target.value })}
            placeholder="Author attribution (optional, e.g. Jane Smith, CEO)"
            className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/25 focus:border-[#E61739] focus:outline-none"
          />
        </div>
      );
      case 'two_columns': return (
        <div className="space-y-4">
          {(['left', 'right'] as const).map(side => {
            const col = block.content?.[side] || { type: 'text', text: '', url: '', caption: '' };
            return (
              <div key={side} className="border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{side === 'left' ? 'Left Column' : 'Right Column'}</span>
                  <div className="flex gap-1">
                    {(['text', 'image'] as const).map(t => (
                      <button key={t} type="button"
                        onClick={() => updateBlock(block.id, { ...block.content, [side]: { ...col, type: t } })}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all ${col.type === t ? 'bg-[#E61739] text-white' : 'bg-white/5 text-white/40 hover:text-white'}`}>
                        {t === 'text' ? '⊺ Text' : '⊞ Image'}
                      </button>
                    ))}
                  </div>
                </div>
                {col.type === 'image' ? (
                  <div className="space-y-2">
                    <ImagePicker
                      value={col.url || ''}
                      onChange={url => updateBlock(block.id, { ...block.content, [side]: { ...col, url } })}
                      altText={col.alt || ''}
                      onAltChange={alt => updateBlock(block.id, { ...block.content, [side]: { ...col, alt } })}
                    />
                    <input type="text" value={col.caption || ''} onChange={e => updateBlock(block.id, { ...block.content, [side]: { ...col, caption: e.target.value } })} placeholder="Caption (optional)" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
                  </div>
                ) : (
                  <RichTextEditor
                    key={block.id + '_' + side}
                    value={col.text || ''}
                    onChange={html => updateBlock(block.id, { ...block.content, [side]: { ...col, text: html } })}
                    placeholder={`Write ${side} column content…`}
                    minHeight="120px"
                  />
                )}
              </div>
            );
          })}
        </div>
      );
      case 'cta': return (
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <input type="text" value={block.content.headline || ''} onChange={e => updateBlock(block.id, { ...block.content, headline: e.target.value })} placeholder="CTA Headline" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
            <input type="text" value={block.content.buttonText || ''} onChange={e => updateBlock(block.id, { ...block.content, buttonText: e.target.value })} placeholder="Button Text" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none" />
            <div className="relative">
              <input type="url" value={block.content.buttonUrl || ''} onChange={e => updateBlock(block.id, { ...block.content, buttonUrl: e.target.value })} placeholder="https://… (leave blank → /contact)" className="w-full bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-[#E61739] focus:outline-none font-mono" />
              {!block.content.buttonUrl && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black uppercase tracking-widest text-white/25">default</span>
              )}
            </div>
          </div>
          <div className="p-4 bg-[#E61739]/10 border border-[#E61739]/20 rounded-xl flex flex-col items-center justify-center text-center">
            <h4 className="font-bold text-lg mb-3">{block.content.headline || 'Your Headline'}</h4>
            <button type="button" className="px-6 py-2 bg-[#E61739] text-white rounded-lg font-bold">{block.content.buttonText || 'Click Here'}</button>
            <p className="text-[9px] font-mono text-white/30 mt-2 truncate max-w-full">{block.content.buttonUrl || '/contact'}</p>
          </div>
        </div>
      );
      case 'video': return (
        <VideoEmbedEditor
          key={block.id}
          content={block.content || {}}
          onChange={c => updateBlock(block.id, c)}
        />
      );
      case 'divider': return <hr className="border-white/10" />;
      case 'table': return (
        <TableBuilder
          key={block.id}
          value={typeof block.content?.tableData === 'object'
            ? JSON.stringify(block.content.tableData)
            : (block.content?.tableData || '')}
          onChange={json => updateBlock(block.id, { ...block.content, tableData: JSON.parse(json) })}
        />
      );
      default: return <div className="text-white/30 text-sm p-4 text-center">Block editor for "{block.type}" coming soon.</div>;
    }
  };

  const focusKw = formData.keywords.split(',')[0]?.trim().toLowerCase() || '';
  const firstRichText = formData.blocks.find((b: Block) => b.type === 'rich_text');
  const firstBlockText = (firstRichText?.content?.text || '').toLowerCase().replace(/<[^>]+>/g, '');
  const metaTitleLower = formData.metaTitle.toLowerCase();
  const metaDescLower = formData.metaDescription.toLowerCase();
  const kwInSlug = focusKw ? focusKw.split(/\s+/).every((w: string) => formData.slug.toLowerCase().includes(w)) : false;
  type SeoStatus = 'pass' | 'warn' | 'fail';
  const seoChecklist: { label: string; status: SeoStatus; detail?: string }[] = [
    { label: 'Focus keyword in meta title', status: !focusKw ? 'warn' : metaTitleLower.includes(focusKw) ? 'pass' : 'fail', detail: !focusKw ? 'add keyword first' : undefined },
    { label: 'Focus keyword in meta description', status: !focusKw ? 'warn' : metaDescLower.includes(focusKw) ? 'pass' : 'fail' },
    { label: 'Focus keyword in first paragraph', status: !focusKw ? 'warn' : firstBlockText.includes(focusKw) ? 'pass' : 'fail' },
    { label: 'Meta title 30–60 chars', status: formData.metaTitle.length >= 30 && formData.metaTitle.length <= 60 ? 'pass' : formData.metaTitle.length > 0 ? 'warn' : 'fail', detail: formData.metaTitle.length > 0 ? `${formData.metaTitle.length} chars` : undefined },
    { label: 'Meta description 120–160 chars', status: formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 ? 'pass' : formData.metaDescription.length > 0 ? 'warn' : 'fail', detail: formData.metaDescription.length > 0 ? `${formData.metaDescription.length} chars` : undefined },
    { label: 'Slug contains focus keyword', status: !focusKw ? 'warn' : kwInSlug ? 'pass' : 'fail' },
    { label: 'Cover image alt text filled', status: formData.imageAlt.length > 0 ? 'pass' : 'fail' },
  ];
  const seoScore = Math.round((seoChecklist.filter(i => i.status === 'pass').length / seoChecklist.length) * 100);

  const statusBadge = (status: string) => {
    if (status === 'published') return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (status === 'archived') return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-white/5 text-white/50 border-white/10';
  };

  const filteredPosts = posts.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
      <PortalTopBar setView={setView} activeNav="blog-ops" />

      <main className="flex-1 overflow-y-auto flex flex-col">
        {viewState === 'list' && (
          <div className="p-4 sm:p-8 md:p-12 flex-grow">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                  <ChevronLeft size={10} className="rotate-180" />
                  <span className="text-[#E61739]">Blogs & Insights</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Blogs & Insights</h1>
              </div>
              <button onClick={handleCreateNew} className="self-start sm:self-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red whitespace-nowrap">
                <Plus size={16} /> Write Article
              </button>
            </div>

            {error && (
              <div className="mb-6 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={16} /> {error}
              </div>
            )}

            {/* ── Search ── */}
            <div className="mb-6">
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" placeholder="Search articles..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
              </div>
            </div>

            {/* ── Loading / Empty ── */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={28} className="animate-spin text-[#E61739]/60" />
              </div>
            )}
            {!loading && filteredPosts.length === 0 && (
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl px-8 py-16 text-center text-white/30 text-sm">
                No articles yet. Click "Write Article" to create your first post.
              </div>
            )}

            {/* ── Mobile: card list (hidden md+) ── */}
            {!loading && filteredPosts.length > 0 && (
              <div className="md:hidden flex flex-col gap-3">
                {filteredPosts.map(post => (
                  <div key={post.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-white text-sm leading-snug line-clamp-2 flex-1">{post.title}</div>
                      <span className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${statusBadge(post.status)}`}>{post.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-semibold text-white/70">{post.category}</span>
                      <span className="flex items-center gap-1"><User size={11} className="text-white/30" />{post.author || '—'}</span>
                      <span className="font-mono text-white/30">{post.date}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <button onClick={() => handlePreview(post)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold transition-all">
                        <Eye size={13} /> Preview
                      </button>
                      <button onClick={() => handleEdit(post)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#E61739] text-xs font-semibold transition-all">
                        <Edit2 size={13} /> Edit
                      </button>
                      <button onClick={() => handleDelete(post.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 text-xs font-semibold transition-all">
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Desktop: table (hidden below md) ── */}
            {!loading && filteredPosts.length > 0 && (
              <div className="hidden md:block bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
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
                    {filteredPosts.map((post) => (
                      <tr key={post.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-5"><div className="font-bold text-white line-clamp-1 max-w-xs">{post.title}</div></td>
                        <td className="px-8 py-5"><span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/70">{post.category}</span></td>
                        <td className="px-8 py-5 text-sm text-white/70"><div className="flex items-center gap-2"><User size={12} className="text-white/30" />{post.author || '—'}</div></td>
                        <td className="px-8 py-5"><span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${statusBadge(post.status)}`}>{post.status}</span></td>
                        <td className="px-8 py-5 text-sm text-white/40 font-mono">{post.date}</td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handlePreview(post)} title="Preview" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"><Eye size={16} /></button>
                            <button onClick={() => handleEdit(post)} title="Edit" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739]"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(post.id)} title="Delete" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500"><Trash2 size={16} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {viewState === 'preview' && (
          <div className="flex-grow flex flex-col bg-white">
            {/* Preview banner */}
            <div className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200 px-6 py-3 flex items-center gap-4 shrink-0">
              <button type="button" onClick={() => setViewState('editor')}
                className="flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-900 transition-colors shrink-0">
                <ChevronLeft size={14} /> Back to Editor
              </button>
              <div className="flex-1 text-center">
                <span className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-amber-700">
                  <Eye size={11} /> Preview Mode — this is how your article will appear when published
                </span>
              </div>
              <span className={`shrink-0 text-[10px] font-black uppercase tracking-widest border px-2.5 py-1 rounded-full ${formData.status === 'published' ? 'text-green-600 bg-green-50 border-green-200' : 'text-white/50 bg-slate-800 border-slate-700'}`}>
                {formData.status}
              </span>
            </div>

            {/* Hero */}
            <section className="relative bg-[#020202] pt-24 pb-20 overflow-hidden shrink-0">
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] -translate-y-1/2" />
                <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#E61739]/8 rounded-full blur-[100px] -translate-y-1/2" />
              </div>
              <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="max-w-4xl mx-auto">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E61739]/10 text-[#E61739] text-[11px] font-black uppercase tracking-widest mb-8 border border-[#E61739]/30">
                    <Sparkles size={12} /> {formData.category || 'Uncategorised'}
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1] tracking-tight">
                    {formData.title || <span className="opacity-30 italic">Untitled article</span>}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 border-t border-white/10 pt-8 text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
                    {formData.author && (
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-[#E61739]/20 border border-[#E61739]/30 flex items-center justify-center text-[#E61739] font-black text-sm">
                          {formData.author.charAt(0).toUpperCase()}
                        </div>
                        <div className="text-white">{formData.author}</div>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar size={13} className="text-[#E61739]" />
                      {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Cover image */}
            {formData.imageUrl && (
              <section className="relative -mt-12 z-20 px-6 shrink-0">
                <div className="max-w-5xl mx-auto">
                  <div className="relative rounded-[3rem] overflow-hidden shadow-[0_48px_100px_-20px_rgba(0,0,0,0.3)] bg-black">
                    <img src={formData.imageUrl} alt={formData.title}
                      className="w-full h-full object-cover aspect-[16/9] opacity-85" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                </div>
              </section>
            )}

            {/* Content + sidebar */}
            <section className="bg-white flex-grow">
              <div className="max-w-7xl mx-auto px-6 py-20">
                {formData.blocks.length === 0 ? (
                  <div className="text-center py-20 text-slate-300">
                    <Eye size={36} className="mx-auto mb-4 opacity-40" />
                    <p className="text-base font-medium">No content blocks yet. Add blocks in the Content tab to see them here.</p>
                  </div>
                ) : (
                  <div className="grid lg:grid-cols-12 gap-16">
                    {/* Article body */}
                    <div className="lg:col-span-8 max-w-3xl" ref={previewRef}>
                      <div className="text-lg text-slate-600 leading-loose space-y-6">
                        {renderPreviewBlocks(formData.blocks)}
                      </div>
                      {formData.tags && (
                        <div className="mt-16 pt-10 border-t border-slate-100 flex flex-wrap gap-2">
                          {formData.tags.split(',').map(t => t.trim()).filter(Boolean).map((tag, i) => (
                            <span key={i} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                    {/* Sidebar */}
                    <div className="lg:col-span-4">
                      <div className="sticky top-24 space-y-6">
                        <div className="p-8 rounded-[3rem] bg-[#1D1D1F] text-white shadow-2xl">
                          <h4 className="text-xl font-bold mb-3">Optimize Your Intelligence Layer.</h4>
                          <p className="text-white/50 text-sm mb-8 leading-relaxed font-medium">Ready to build an AGI-ready operation? Talk to our architects today.</p>
                          <div className="w-full py-4 bg-[#E61739] rounded-2xl font-bold text-center text-sm">Consult an Architect →</div>
                        </div>
                        <div className="p-6 rounded-[2rem] bg-amber-50 border border-amber-100">
                          <p className="text-[11px] font-black uppercase tracking-widest text-amber-600 mb-1">Preview only</p>
                          <p className="text-xs text-amber-700 font-medium leading-relaxed">The sidebar CTA and related articles will appear here on the live site.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </section>
          </div>
        )}

        {viewState === 'editor' && (
          <form onSubmit={handleSave} className="flex-grow flex flex-col">
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
                {error && <span className="text-red-400 text-xs font-bold">{error}</span>}
                <button type="button" onClick={() => setViewState('preview')}
                  className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 hover:bg-white/10 text-white/70 hover:text-white rounded-lg font-bold text-sm transition-all">
                  <Eye size={15} /> Preview
                </button>
                <select value={formData.status} onChange={e => setFormData(p => ({ ...p, status: e.target.value }))}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-[#E61739] hover:bg-[#c51431] text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Save
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
                        {['AI Operations', 'Engineering', 'Case Studies', 'Company News', 'Industry Insights', 'Future of Work'].map(c => <option key={c}>{c}</option>)}
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
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Tags (comma separated)</label>
                    <input type="text" value={formData.tags} onChange={e => setFormData(p => ({ ...p, tags: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder="AI, Operations, Strategy" />
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

                  {/* Score + Checklist */}
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-black uppercase tracking-widest text-white/40">SEO Score</h3>
                      <div className={`text-2xl font-black ${seoScore >= 80 ? 'text-green-400' : seoScore >= 50 ? 'text-amber-400' : 'text-red-400'}`}>{seoScore}%</div>
                    </div>
                    <div className="w-full h-1.5 bg-white/5 rounded-full mb-5 overflow-hidden">
                      <div className={`h-full rounded-full transition-all duration-500 ${seoScore >= 80 ? 'bg-green-500' : seoScore >= 50 ? 'bg-amber-400' : 'bg-red-500'}`} style={{ width: `${seoScore}%` }} />
                    </div>
                    <div className="space-y-2">
                      {seoChecklist.map(item => (
                        <div key={item.label} className="flex items-center gap-3">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[10px] font-black
                            ${item.status === 'pass' ? 'bg-green-500/20 text-green-400' : item.status === 'warn' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/15 text-red-400'}`}>
                            {item.status === 'pass' ? '✓' : item.status === 'warn' ? '~' : '✗'}
                          </div>
                          <span className={`text-xs font-bold flex-1 ${item.status === 'pass' ? 'text-white/70' : item.status === 'warn' ? 'text-amber-400/70' : 'text-white/30'}`}>{item.label}</span>
                          {item.detail && <span className="text-[10px] text-white/25 font-mono">{item.detail}</span>}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Core SEO fields */}
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Focus Keywords <span className="text-white/20 normal-case tracking-normal font-normal">(first keyword = focus keyword)</span></label>
                    <input type="text" value={formData.keywords} onChange={e => setFormData(p => ({ ...p, keywords: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] font-mono text-sm" placeholder="agentic ai, offshore staffing, ai automation..." />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Meta Title</label>
                      <input type="text" value={formData.metaTitle} onChange={e => setFormData(p => ({ ...p, metaTitle: e.target.value }))}
                        className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] ${formData.metaTitle.length > 60 ? 'border-amber-500/50' : 'border-white/10'}`} placeholder="SEO title (30–60 chars)..." />
                      <p className={`text-[10px] ${formData.metaTitle.length > 60 ? 'text-amber-400' : formData.metaTitle.length >= 30 ? 'text-green-400' : 'text-white/30'}`}>{formData.metaTitle.length}/60 chars</p>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Canonical URL</label>
                      <input type="text" value={formData.canonicalUrl} onChange={e => setFormData(p => ({ ...p, canonicalUrl: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder={`https://kdci.ai/blogs/${formData.slug || 'post-slug'}/`} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Meta Description</label>
                    <textarea value={formData.metaDescription} onChange={e => setFormData(p => ({ ...p, metaDescription: e.target.value }))}
                      className={`w-full bg-[#1a1a1a] border rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] min-h-[80px] ${formData.metaDescription.length > 160 ? 'border-amber-500/50' : 'border-white/10'}`} placeholder="120–160 char description..." />
                    <p className={`text-[10px] ${formData.metaDescription.length > 160 ? 'text-amber-400' : formData.metaDescription.length >= 120 ? 'text-green-400' : 'text-white/30'}`}>{formData.metaDescription.length}/160 chars</p>
                  </div>

                  {/* Google Snippet Preview */}
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Google Snippet Preview</h3>
                    <div className="bg-white rounded-xl p-4 space-y-1 font-sans">
                      <div className="text-[18px] text-[#1a0dab] font-normal leading-snug truncate">
                        {formData.metaTitle || formData.title || <span className="text-[#1a0dab]/30 italic text-sm">Article title</span>}
                      </div>
                      <div className="text-[14px] text-[#006621] truncate">
                        {(formData.canonicalUrl || `https://kdci.ai/blogs/${formData.slug || 'post-slug'}/`).replace(/^https?:\/\//, '')}
                      </div>
                      <div className="text-[14px] text-[#545454] leading-snug" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {formData.metaDescription || formData.blocks.filter((b: Block) => b.type === 'rich_text').map((b: Block) => (b.content?.text || '').replace(/<[^>]+>/g, '')).join(' ').slice(0, 160) || 'Meta description will appear here. Add a meta description to control this snippet.'}
                      </div>
                    </div>
                  </div>

                  {/* OG / Social fields */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">OG Title</label>
                      <input type="text" value={formData.ogTitle} onChange={e => setFormData(p => ({ ...p, ogTitle: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder={formData.title || 'Defaults to post title'} />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">OG Image URL</label>
                      <input type="text" value={formData.ogImageUrl} onChange={e => setFormData(p => ({ ...p, ogImageUrl: e.target.value }))}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder={formData.imageUrl || 'Defaults to cover image'} />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">OG Description</label>
                    <textarea value={formData.ogDescription} onChange={e => setFormData(p => ({ ...p, ogDescription: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] min-h-[60px]" placeholder={formData.metaDescription || 'Defaults to meta description'} />
                  </div>

                  {/* Social Card Previews */}
                  <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                    <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Social Card Previews</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {/* Facebook OG */}
                      <div className="space-y-1.5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/25">Facebook / LinkedIn</p>
                        <div className="rounded-lg overflow-hidden border border-[#dddfe2] bg-[#f0f2f5] font-sans">
                          {(formData.ogImageUrl || formData.imageUrl) ? (
                            <img src={formData.ogImageUrl || formData.imageUrl} alt="" className="w-full h-32 object-cover" />
                          ) : (
                            <div className="w-full h-32 bg-[#dddfe2] flex items-center justify-center">
                              <span className="text-[10px] text-[#90949c] uppercase tracking-widest">No image</span>
                            </div>
                          )}
                          <div className="px-3 py-2 bg-white border-t border-[#dddfe2]">
                            <p className="text-[9px] uppercase text-[#90949c] tracking-wide truncate">kdci.ai</p>
                            <p className="text-[12px] font-bold text-[#1d2129] leading-snug line-clamp-2">{formData.ogTitle || formData.title || 'Article title'}</p>
                            <p className="text-[11px] text-[#606770] leading-snug line-clamp-2 mt-0.5">{formData.ogDescription || formData.metaDescription || formData.blocks.filter((b: Block) => b.type === 'rich_text').map((b: Block) => (b.content?.text || '').replace(/<[^>]+>/g, '')).join(' ').slice(0, 120)}</p>
                          </div>
                        </div>
                      </div>
                      {/* Twitter Card */}
                      <div className="space-y-1.5">
                        <p className="text-[9px] font-black uppercase tracking-widest text-white/25">Twitter / X</p>
                        <div className="rounded-2xl overflow-hidden border border-[#cfd9de] bg-white font-sans">
                          {(formData.ogImageUrl || formData.imageUrl) ? (
                            <img src={formData.ogImageUrl || formData.imageUrl} alt="" className="w-full h-32 object-cover" />
                          ) : (
                            <div className="w-full h-32 bg-[#e7e7e7] flex items-center justify-center">
                              <span className="text-[10px] text-[#8899a6] uppercase tracking-widest">No image</span>
                            </div>
                          )}
                          <div className="px-3 py-2">
                            <p className="text-[12px] font-bold text-[#0f1419] leading-snug line-clamp-1">{formData.ogTitle || formData.title || 'Article title'}</p>
                            <p className="text-[11px] text-[#536471] leading-snug line-clamp-2">{formData.ogDescription || formData.metaDescription || ''}</p>
                            <p className="text-[10px] text-[#536471] mt-1">kdci.ai</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* noIndex + JSON-LD */}
                  <div className="flex items-center gap-3 bg-[#1a1a1a] border border-white/5 rounded-xl px-4 py-3">
                    <input type="checkbox" id="noIndex" checked={formData.noIndex} onChange={e => setFormData(p => ({ ...p, noIndex: e.target.checked }))}
                      className="w-4 h-4 accent-[#E61739]" />
                    <label htmlFor="noIndex" className="text-xs font-bold text-white/50 cursor-pointer select-none">
                      No-index this post <span className="text-white/25 font-normal">(adds &lt;meta name="robots" content="noindex, nofollow"&gt;)</span>
                    </label>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-white/40">JSON-LD Override <span className="text-white/20 normal-case tracking-normal font-normal">(optional — replaces auto-generated BlogPosting schema)</span></label>
                    <textarea value={formData.jsonLd} onChange={e => setFormData(p => ({ ...p, jsonLd: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-green-400 focus:outline-none focus:border-[#E61739] min-h-[120px] font-mono text-xs" placeholder={'{\n  "@context": "https://schema.org",\n  "@type": "BlogPosting",\n  ...\n}'} />
                  </div>

                </div>
              )}

              {editorTab === 'hubspot' && (
                <div className="space-y-6">

                  {/* Global Form GUID banner */}
                  <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#ff7a59] mb-1">Global HubSpot Form GUID</div>
                        <p className="text-xs text-white/40 leading-relaxed">One shared form for all blog posts. Set the <code className="bg-white/10 px-1 py-0.5 rounded text-white/60 font-mono text-[10px]">HUBSPOT_FORM_GUID</code> secret in your Replit environment to configure this.</p>
                      </div>
                      <Activity size={18} className="text-[#ff7a59] shrink-0 mt-0.5" />
                    </div>
                    {hsFormGuid ? (
                      <div className="flex items-center gap-3 bg-black/30 border border-white/10 rounded-xl px-4 py-3">
                        <Check size={14} className="text-green-400 shrink-0" />
                        <code className="text-sm font-mono text-white/80 truncate flex-1">{hsFormGuid}</code>
                        <span className="text-[9px] font-black uppercase tracking-widest text-green-400 shrink-0">Configured</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-amber-500/5 border border-amber-500/20 rounded-xl px-4 py-3">
                        <AlertCircle size={14} className="text-amber-400 shrink-0" />
                        <span className="text-xs text-amber-400/80">No Form GUID set. Add <code className="font-mono">HUBSPOT_FORM_GUID</code> to your Replit secrets.</span>
                      </div>
                    )}
                  </div>

                  {/* UTM Campaign — auto-synced from slug */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">UTM Campaign <span className="text-[#E61739]">· Unique per post</span></label>
                      <span className="text-[9px] font-bold text-white/25 bg-white/5 px-2 py-0.5 rounded-full">auto-synced from slug</span>
                    </div>
                    <input
                      type="text"
                      value={formData.utmCampaign}
                      onChange={e => setFormData(p => ({ ...p, utmCampaign: e.target.value }))}
                      className="w-full bg-[#1a1a1a] border border-[#E61739]/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] font-mono text-sm"
                      placeholder="auto-populated from slug"
                    />
                    <p className="text-[10px] text-white/25 leading-relaxed">This value identifies which blog post a HubSpot form submission came from. It mirrors the slug but can be overridden.</p>
                  </div>

                  {/* Remaining UTM + event fields */}
                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { key: 'utmSource', label: 'UTM Source', placeholder: 'newsletter' },
                      { key: 'utmMedium', label: 'UTM Medium', placeholder: 'email' },
                      { key: 'hubspotEventName', label: 'HubSpot Event Name', placeholder: 'blog_view' },
                    ].map(f => (
                      <div key={f.key} className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-widest text-white/40">{f.label}</label>
                        <input type="text" value={(formData as any)[f.key]} onChange={e => setFormData(p => ({ ...p, [f.key]: e.target.value }))}
                          className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739]" placeholder={f.placeholder} />
                      </div>
                    ))}
                  </div>

                  {/* Embed snippet preview */}
                  {hsFormGuid && (
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-black uppercase tracking-widest text-white/40">Embed Snippet Preview</label>
                      <pre className="bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-[10px] text-green-400 font-mono overflow-x-auto whitespace-pre-wrap break-all leading-relaxed">{`hbspt.forms.create({
  portalId: "YOUR_PORTAL_ID",
  formId: "${hsFormGuid}",
  onFormSubmit: function() {
    window._hsq = window._hsq || [];
    window._hsq.push(['trackEvent', {
      id: '${formData.hubspotEventName || 'blog_view'}',
      value: { utm_campaign: '${formData.utmCampaign || formData.slug}' }
    }]);
  }
});`}</pre>
                    </div>
                  )}

                </div>
              )}
            </div>
          </form>
        )}
      </main>
    </div>
  );
};
