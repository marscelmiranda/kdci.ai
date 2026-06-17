import React, { useState, useEffect } from 'react';
import { ImagePicker } from '../components/ImagePicker';
import { ViewType } from '../types';
import { PortalTopBar } from '../components/PortalTopBar';
import { RichTextEditor } from '../components/RichTextEditor';
import {
  LayoutGrid, Briefcase, FileText, BookOpen, BookMarked,
  Image as ImageIcon, Search, Plus, LogOut, Settings,
  ChevronLeft, Edit2, Eye, Trash2, Save, User, Check,
  AlertCircle, Users, UserCircle2, Loader2
} from 'lucide-react';
import { getAllCases, createCase, updateCase, deleteCase } from '../lib/api';

interface CaseStudyRow {
  id: string;
  title: string;
  sidebar_industry: string;
  client: string;
  author: string;
  status: 'published' | 'draft' | 'archived';
  published_at: string | null;
}

const emptyForm = () => ({
  title: '', slug: '',
  subtitle: '', hero_image_url: '', client: '',
  category1: 'Case Study', category2: '', category3: '',
  stat1_value: '', stat1_label: '', stat2_value: '', stat2_label: '', stat3_value: '', stat3_label: '',
  in_brief: '',
  challenge_heading: 'The Challenge', challenge_body: '',
  challenge_item1: '', challenge_item2: '', challenge_item3: '', challenge_item4: '', challenge_item5: '',
  solution_heading: 'The Solution', solution_body1: '', solution_body2: '',
  quote_text: '', quote_attribution: '', quote_title: '',
  outcome_heading: 'The Outcome', outcome_body: '',
  outcome_metric1_value: '', outcome_metric1_label: '',
  outcome_metric2_value: '', outcome_metric2_label: '',
  sidebar_industry: '', sidebar_services: '', sidebar_region: '', sidebar_tech_stack: '',
  read_next1_category: '', read_next1_title: '', read_next1_excerpt: '',
  read_next2_category: '', read_next2_title: '', read_next2_excerpt: '',
  author: '', status: 'draft',
  meta_title: '', meta_description: '', keywords: '', canonical_url: '',
  og_title: '', og_description: '', og_image_url: '', json_ld: '', no_index: false,
  hubspot_event_name: '', hubspot_form_guid: '', utm_source: '', utm_medium: '', utm_campaign: '',
  hero_image_alt: '',
});

type FormData = ReturnType<typeof emptyForm>;

export const CaseStudiesOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [cases, setCases] = useState<CaseStudyRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'hubspot'>('content');
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState<FormData>(emptyForm());

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  useEffect(() => {
    if (formData.title && !editingId) {
      const slug = formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      setFormData(prev => ({ ...prev, slug }));
    }
  }, [formData.title]);

  const loadCases = () => {
    setLoading(true);
    getAllCases()
      .then((data: any[]) => {
        setCases(data.map((r: any) => ({
          id: String(r.id),
          title: r.title || '',
          sidebar_industry: r.sidebar_industry || r.industry || '',
          client: r.client || '',
          author: r.author || '',
          status: r.status as CaseStudyRow['status'],
          published_at: r.published_at,
        })));
      })
      .catch(() => setError('Failed to load case studies'))
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadCases(); }, []);

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('dashboard');
    else if (id === 'careers') setView('career-ops');
    else if (id === 'blog') setView('blog-ops');
    else if (id === 'resources') setView('resources-ops');
    else if (id === 'portfolio') setView('portfolio-ops');
    else if (id === 'case-studies') setView('case-studies-ops');
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

  const handleEdit = async (c: CaseStudyRow) => {
    setEditingId(c.id);
    setError(null);
    try {
      const full: any = await (await fetch(`/api/cases/${c.id}`)).json();
      setFormData({
        title: full.title || '',
        slug: full.slug || '',
        subtitle: full.subtitle || '',
        hero_image_url: full.hero_image_url || '',
        client: full.client || '',
        category1: full.category1 || 'Case Study',
        category2: full.category2 || '',
        category3: full.category3 || '',
        stat1_value: full.stat1_value || '', stat1_label: full.stat1_label || '',
        stat2_value: full.stat2_value || '', stat2_label: full.stat2_label || '',
        stat3_value: full.stat3_value || '', stat3_label: full.stat3_label || '',
        in_brief: full.in_brief || '',
        challenge_heading: full.challenge_heading || 'The Challenge',
        challenge_body: full.challenge_body || '',
        challenge_item1: full.challenge_item1 || '',
        challenge_item2: full.challenge_item2 || '',
        challenge_item3: full.challenge_item3 || '',
        challenge_item4: full.challenge_item4 || '',
        challenge_item5: full.challenge_item5 || '',
        solution_heading: full.solution_heading || 'The Solution',
        solution_body1: full.solution_body1 || '',
        solution_body2: full.solution_body2 || '',
        quote_text: full.quote_text || '',
        quote_attribution: full.quote_attribution || '',
        quote_title: full.quote_title || '',
        outcome_heading: full.outcome_heading || 'The Outcome',
        outcome_body: full.outcome_body || '',
        outcome_metric1_value: full.outcome_metric1_value || '',
        outcome_metric1_label: full.outcome_metric1_label || '',
        outcome_metric2_value: full.outcome_metric2_value || '',
        outcome_metric2_label: full.outcome_metric2_label || '',
        sidebar_industry: full.sidebar_industry || '',
        sidebar_services: full.sidebar_services || '',
        sidebar_region: full.sidebar_region || '',
        sidebar_tech_stack: full.sidebar_tech_stack || '',
        read_next1_category: full.read_next1_category || '',
        read_next1_title: full.read_next1_title || '',
        read_next1_excerpt: full.read_next1_excerpt || '',
        read_next2_category: full.read_next2_category || '',
        read_next2_title: full.read_next2_title || '',
        read_next2_excerpt: full.read_next2_excerpt || '',
        author: full.author || '',
        status: full.status || 'draft',
        meta_title: full.meta_title || '',
        meta_description: full.meta_description || '',
        keywords: full.keywords || '',
        canonical_url: full.canonical_url || '',
        og_title: full.og_title || '',
        og_description: full.og_description || '',
        og_image_url: full.og_image_url || '',
        json_ld: full.json_ld || '',
        no_index: full.no_index || false,
        hubspot_event_name: full.hubspot_event_name || '',
        hubspot_form_guid: full.hubspot_form_guid || '',
        utm_source: full.utm_source || '',
        utm_medium: full.utm_medium || '',
        utm_campaign: full.utm_campaign || '',
        hero_image_alt: full.hero_image_alt || '',
      });
    } catch {
      setFormData({ ...emptyForm(), title: c.title, client: c.client, author: c.author, status: c.status });
    }
    setViewState('editor');
    setEditorTab('content');
  };

  const set = (key: keyof FormData, val: any) => setFormData(prev => ({ ...prev, [key]: val }));

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      if (editingId) {
        await updateCase(editingId, formData);
      } else {
        await createCase(formData);
      }
      await loadCases();
      setViewState('list');
    } catch (err: any) {
      setError(err.message ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this case study?')) return;
    try {
      await deleteCase(id);
      setCases(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      alert('Delete failed: ' + err.message);
    }
  };

  const statusBadge = (status: string) => {
    if (status === 'published') return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (status === 'archived') return 'bg-red-500/10 text-red-500 border-red-500/20';
    return 'bg-white/5 text-white/50 border-white/10';
  };

  const filteredCases = cases.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.sidebar_industry.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const seoChecklist = [
    { label: 'Meta title ≤ 60 chars', done: formData.meta_title.length > 0 && formData.meta_title.length <= 60 },
    { label: 'Meta description 120–160 chars', done: formData.meta_description.length >= 120 && formData.meta_description.length <= 160 },
    { label: 'Keywords specified', done: formData.keywords.length > 0 },
    { label: 'Slug populated', done: formData.slug.length > 0 },
    { label: 'Open Graph populated', done: formData.og_title.length > 0 && formData.og_description.length > 0 },
    { label: 'Hero image added', done: formData.hero_image_url.length > 0 },
  ];

  const NAV_ITEMS = [
    { id: 'overview',     label: 'Overview',           icon: LayoutGrid  },
    { id: 'careers',      label: 'Career Ops',         icon: Briefcase   },
    { id: 'blog',         label: 'Blogs & Insights',   icon: FileText    },
    { id: 'case-studies', label: 'Case Studies',       icon: BookMarked  },
    { id: 'resources',    label: 'Resources',          icon: BookOpen    },
    { id: 'portfolio',    label: 'Creative Portfolio', icon: ImageIcon   },
    { id: 'admin',        label: 'User Approvals',     icon: Users       },
    { id: 'profile',      label: 'My Profile',         icon: UserCircle2 },
  ];

  const inputCls = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] text-sm";
  const textareaCls = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#E61739] text-sm resize-y";
  const labelCls = "block text-[10px] font-black uppercase tracking-widest text-white/40 mb-1.5";
  const sectionHeadingCls = "text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4 mt-8";

  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
      <PortalTopBar setView={setView} activeNav="case-studies-ops" />

      <main className="flex-1 overflow-y-auto flex flex-col">

        {/* ── LIST VIEW ── */}
        {viewState === 'list' && (
          <div className="p-4 sm:p-8 md:p-12 overflow-y-auto flex-grow">

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                  <ChevronLeft size={10} className="rotate-180" />
                  <span className="text-[#E61739]">Case Studies</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white">Case Studies</h1>
              </div>
              <button onClick={handleCreateNew} className="self-start sm:self-auto px-5 py-2.5 sm:px-6 sm:py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg whitespace-nowrap">
                <Plus size={16} /> New Case Study
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
                <input type="text" placeholder="Search by title, client, or industry…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
              </div>
            </div>

            {/* ── Loading / Empty ── */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 size={28} className="animate-spin text-[#E61739]/60" />
              </div>
            )}
            {!loading && filteredCases.length === 0 && (
              <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl px-8 py-16 text-center text-white/30 text-sm">
                No case studies yet. Click "New Case Study" to create one.
              </div>
            )}

            {/* ── Mobile: card list (hidden md+) ── */}
            {!loading && filteredCases.length > 0 && (
              <div className="md:hidden flex flex-col gap-3">
                {filteredCases.map(c => (
                  <div key={c.id} className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="font-bold text-white text-sm leading-snug line-clamp-2 flex-1">{c.title}</div>
                      <span className={`shrink-0 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${statusBadge(c.status)}`}>{c.status}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-white/50">
                      <span className="text-white/60">{c.client || '—'}</span>
                      {c.sidebar_industry && <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 font-semibold text-white/70">{c.sidebar_industry}</span>}
                      <span className="font-mono text-white/30">{c.published_at ? new Date(c.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}</span>
                    </div>
                    <div className="flex items-center gap-2 pt-1 border-t border-white/5">
                      <button onClick={() => handleEdit(c)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white text-xs font-semibold transition-all">
                        <Eye size={13} /> Preview
                      </button>
                      <button onClick={() => handleEdit(c)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-[#E61739] text-xs font-semibold transition-all">
                        <Edit2 size={13} /> Edit
                      </button>
                      <button onClick={() => handleDelete(c.id)} className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white/5 hover:bg-red-500/10 text-white/60 hover:text-red-400 text-xs font-semibold transition-all">
                        <Trash2 size={13} /> Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Desktop: table (hidden below md) ── */}
            {!loading && filteredCases.length > 0 && (
              <div className="hidden md:block bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                      <th className="px-8 py-5">Title</th>
                      <th className="px-8 py-5">Client</th>
                      <th className="px-8 py-5">Industry</th>
                      <th className="px-8 py-5">Status</th>
                      <th className="px-8 py-5">Published</th>
                      <th className="px-8 py-5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {filteredCases.map((c) => (
                      <tr key={c.id} className="hover:bg-white/5 transition-colors group">
                        <td className="px-8 py-5"><div className="font-bold text-white line-clamp-1 max-w-xs">{c.title}</div></td>
                        <td className="px-8 py-5 text-sm text-white/60">{c.client || '—'}</td>
                        <td className="px-8 py-5"><span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/70">{c.sidebar_industry || '—'}</span></td>
                        <td className="px-8 py-5"><span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${statusBadge(c.status)}`}>{c.status}</span></td>
                        <td className="px-8 py-5 text-sm text-white/40 font-mono">
                          {c.published_at ? new Date(c.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                        </td>
                        <td className="px-8 py-5 text-right">
                          <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(c)} title="Preview" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white"><Eye size={16} /></button>
                            <button onClick={() => handleEdit(c)} title="Edit" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739]"><Edit2 size={16} /></button>
                            <button onClick={() => handleDelete(c.id)} title="Delete" className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500"><Trash2 size={16} /></button>
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

        {/* ── EDITOR VIEW ── */}
        {viewState === 'editor' && (
          <form onSubmit={handleSave} className="flex-grow flex flex-col">
            <header className="bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setViewState('list')} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={20} /></button>
                <div className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white/70 font-mono min-w-[200px] truncate">{formData.title || 'Untitled Case Study'}</div>
                <div className="flex gap-2">
                  {(['content', 'seo', 'hubspot'] as const).map((tab) => (
                    <button key={tab} type="button" onClick={() => setEditorTab(tab)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${editorTab === tab ? 'bg-[#E61739] text-white' : 'text-white/40 hover:text-white hover:bg-white/10'}`}>
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3">
                {error && <span className="text-red-400 text-xs font-bold">{error}</span>}
                <select value={formData.status} onChange={e => set('status', e.target.value)}
                  className="bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E61739]">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
                <button type="submit" disabled={saving} className="px-6 py-2 bg-[#E61739] hover:bg-[#c51431] text-white rounded-lg font-bold text-sm transition-all flex items-center gap-2 shadow-lg disabled:opacity-60">
                  {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
                  {formData.status === 'published' ? 'Publish' : 'Save'}
                </button>
              </div>
            </header>

            <div className="p-8 overflow-y-auto space-y-6 flex-grow">

              {/* ── CONTENT TAB ── */}
              {editorTab === 'content' && (
                <>
                  {/* Hero */}
                  <p className={sectionHeadingCls}>Hero & Identity</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className={labelCls}>Title *</label>
                      <input required type="text" value={formData.title} onChange={e => set('title', e.target.value)} className={inputCls} placeholder="Case study headline…" /></div>
                    <div><label className={labelCls}>Slug</label>
                      <input type="text" value={formData.slug} onChange={e => set('slug', e.target.value)} className={`${inputCls} font-mono`} placeholder="url-slug" /></div>
                  </div>
                  <div><label className={labelCls}>Subtitle / Hero Tagline</label>
                    <input type="text" value={formData.subtitle} onChange={e => set('subtitle', e.target.value)} className={inputCls} placeholder="One-line outcome summary shown below the title…" /></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <ImagePicker
                        label="Hero Image"
                        value={formData.hero_image_url}
                        onChange={url => set('hero_image_url', url)}
                        altText={formData.hero_image_alt}
                        onAltChange={alt => set('hero_image_alt', alt)}
                      />
                    </div>
                    <div><label className={labelCls}>Client / Company Name</label>
                      <input type="text" value={formData.client} onChange={e => set('client', e.target.value)} className={inputCls} placeholder="e.g. Acme Corp" /></div>
                  </div>

                  {/* Categories */}
                  <p className={sectionHeadingCls}>Breadcrumb Categories</p>
                  <div className="grid grid-cols-3 gap-6">
                    <div><label className={labelCls}>Tag 1 (primary)</label>
                      <input type="text" value={formData.category1} onChange={e => set('category1', e.target.value)} className={inputCls} placeholder="Case Study" /></div>
                    <div><label className={labelCls}>Tag 2</label>
                      <input type="text" value={formData.category2} onChange={e => set('category2', e.target.value)} className={inputCls} placeholder="e.g. Fintech" /></div>
                    <div><label className={labelCls}>Tag 3</label>
                      <input type="text" value={formData.category3} onChange={e => set('category3', e.target.value)} className={inputCls} placeholder="e.g. AI Ops" /></div>
                  </div>

                  {/* Stats Bar */}
                  <p className={sectionHeadingCls}>Hero Stats (shown in hero banner)</p>
                  <div className="grid grid-cols-3 gap-6">
                    {([1, 2, 3] as const).map(n => (
                      <div key={n} className="space-y-3 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Stat {n}</div>
                        <div><label className={labelCls}>Value</label>
                          <input type="text" value={(formData as any)[`stat${n}_value`]} onChange={e => set(`stat${n}_value` as keyof FormData, e.target.value)} className={inputCls} placeholder="e.g. 94%" /></div>
                        <div><label className={labelCls}>Label</label>
                          <input type="text" value={(formData as any)[`stat${n}_label`]} onChange={e => set(`stat${n}_label` as keyof FormData, e.target.value)} className={inputCls} placeholder="e.g. Fraud Catch Rate" /></div>
                      </div>
                    ))}
                  </div>

                  {/* In Brief */}
                  <p className={sectionHeadingCls}>In Brief</p>
                  <RichTextEditor
                    key={`in_brief_${editingId ?? 'new'}`}
                    value={formData.in_brief}
                    onChange={html => set('in_brief', html)}
                    placeholder="Executive summary shown in a highlighted card at the top of the body…"
                    minHeight="100px"
                  />

                  {/* Challenge */}
                  <p className={sectionHeadingCls}>Who We Worked With / The Challenge</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className={labelCls}>Section Heading</label>
                      <input type="text" value={formData.challenge_heading} onChange={e => set('challenge_heading', e.target.value)} className={inputCls} /></div>
                    <div><label className={labelCls}>Author</label>
                      <input type="text" value={formData.author} onChange={e => set('author', e.target.value)} className={inputCls} placeholder="Writer name" /></div>
                  </div>
                  <div><label className={labelCls}>Challenge Body</label>
                    <RichTextEditor
                      key={`challenge_body_${editingId ?? 'new'}`}
                      value={formData.challenge_body}
                      onChange={html => set('challenge_body', html)}
                      placeholder="Describe the core problem or challenge the client faced…"
                      minHeight="140px"
                    /></div>
                  <div className="space-y-3">
                    <label className={labelCls}>Challenge Bullet Points (leave blank to omit)</label>
                    {([1, 2, 3, 4, 5] as const).map(n => (
                      <input key={n} type="text" value={(formData as any)[`challenge_item${n}`]} onChange={e => set(`challenge_item${n}` as keyof FormData, e.target.value)} className={inputCls} placeholder={`Point ${n}…`} />
                    ))}
                  </div>

                  {/* Solution */}
                  <p className={sectionHeadingCls}>What We Did / The Solution</p>
                  <div><label className={labelCls}>Section Heading</label>
                    <input type="text" value={formData.solution_heading} onChange={e => set('solution_heading', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Solution Body (paragraph 1)</label>
                    <RichTextEditor
                      key={`solution_body1_${editingId ?? 'new'}`}
                      value={formData.solution_body1}
                      onChange={html => set('solution_body1', html)}
                      placeholder="Describe what KDCI built or deployed…"
                      minHeight="140px"
                    /></div>
                  <div><label className={labelCls}>Solution Body (paragraph 2, optional)</label>
                    <RichTextEditor
                      key={`solution_body2_${editingId ?? 'new'}`}
                      value={formData.solution_body2}
                      onChange={html => set('solution_body2', html)}
                      placeholder="Additional detail, second paragraph…"
                      minHeight="100px"
                    /></div>

                  {/* Pull Quote */}
                  <p className={sectionHeadingCls}>Client Quote (optional)</p>
                  <div><label className={labelCls}>Quote Text</label>
                    <textarea rows={3} value={formData.quote_text} onChange={e => set('quote_text', e.target.value)} className={textareaCls} placeholder="The client's words…" /></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className={labelCls}>Attribution (name / role)</label>
                      <input type="text" value={formData.quote_attribution} onChange={e => set('quote_attribution', e.target.value)} className={inputCls} placeholder="e.g. Head of Risk & Compliance" /></div>
                    <div><label className={labelCls}>Company / Title Line</label>
                      <input type="text" value={formData.quote_title} onChange={e => set('quote_title', e.target.value)} className={inputCls} placeholder="e.g. APAC Payments Platform" /></div>
                  </div>

                  {/* Outcome */}
                  <p className={sectionHeadingCls}>The Outcome / Results</p>
                  <div><label className={labelCls}>Section Heading</label>
                    <input type="text" value={formData.outcome_heading} onChange={e => set('outcome_heading', e.target.value)} className={inputCls} /></div>
                  <div><label className={labelCls}>Outcome Body</label>
                    <RichTextEditor
                      key={`outcome_body_${editingId ?? 'new'}`}
                      value={formData.outcome_body}
                      onChange={html => set('outcome_body', html)}
                      placeholder="What changed as a result of the engagement…"
                      minHeight="140px"
                    /></div>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Outcome Metric 1</div>
                      <div><label className={labelCls}>Value</label>
                        <input type="text" value={formData.outcome_metric1_value} onChange={e => set('outcome_metric1_value', e.target.value)} className={inputCls} placeholder="e.g. $8.2M" /></div>
                      <div><label className={labelCls}>Label</label>
                        <input type="text" value={formData.outcome_metric1_label} onChange={e => set('outcome_metric1_label', e.target.value)} className={inputCls} placeholder="e.g. Annual Loss Prevention" /></div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Outcome Metric 2</div>
                      <div><label className={labelCls}>Value</label>
                        <input type="text" value={formData.outcome_metric2_value} onChange={e => set('outcome_metric2_value', e.target.value)} className={inputCls} placeholder="e.g. 94%" /></div>
                      <div><label className={labelCls}>Label</label>
                        <input type="text" value={formData.outcome_metric2_label} onChange={e => set('outcome_metric2_label', e.target.value)} className={inputCls} placeholder="e.g. Fraud Catch Rate" /></div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <p className={sectionHeadingCls}>Sidebar — At a Glance</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div><label className={labelCls}>Industry</label>
                      <input type="text" value={formData.sidebar_industry} onChange={e => set('sidebar_industry', e.target.value)} className={inputCls} placeholder="e.g. Fintech" /></div>
                    <div><label className={labelCls}>Region</label>
                      <input type="text" value={formData.sidebar_region} onChange={e => set('sidebar_region', e.target.value)} className={inputCls} placeholder="e.g. Asia-Pacific" /></div>
                    <div><label className={labelCls}>Services (comma-separated)</label>
                      <input type="text" value={formData.sidebar_services} onChange={e => set('sidebar_services', e.target.value)} className={inputCls} placeholder="e.g. AI Ops, Back Office" /></div>
                    <div><label className={labelCls}>Tech Stack (comma-separated)</label>
                      <input type="text" value={formData.sidebar_tech_stack} onChange={e => set('sidebar_tech_stack', e.target.value)} className={inputCls} placeholder="e.g. Python, Kafka, Zendesk" /></div>
                  </div>

                  {/* Read Next */}
                  <p className={sectionHeadingCls}>Read Next (optional)</p>
                  <div className="grid grid-cols-2 gap-6">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Read Next 1</div>
                      <div><label className={labelCls}>Category</label>
                        <input type="text" value={formData.read_next1_category} onChange={e => set('read_next1_category', e.target.value)} className={inputCls} placeholder="e.g. Insurance" /></div>
                      <div><label className={labelCls}>Title</label>
                        <input type="text" value={formData.read_next1_title} onChange={e => set('read_next1_title', e.target.value)} className={inputCls} placeholder="Case study title…" /></div>
                      <div><label className={labelCls}>Excerpt</label>
                        <textarea rows={2} value={formData.read_next1_excerpt} onChange={e => set('read_next1_excerpt', e.target.value)} className={textareaCls} placeholder="Short description…" /></div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Read Next 2</div>
                      <div><label className={labelCls}>Category</label>
                        <input type="text" value={formData.read_next2_category} onChange={e => set('read_next2_category', e.target.value)} className={inputCls} placeholder="e.g. E-Commerce" /></div>
                      <div><label className={labelCls}>Title</label>
                        <input type="text" value={formData.read_next2_title} onChange={e => set('read_next2_title', e.target.value)} className={inputCls} placeholder="Case study title…" /></div>
                      <div><label className={labelCls}>Excerpt</label>
                        <textarea rows={2} value={formData.read_next2_excerpt} onChange={e => set('read_next2_excerpt', e.target.value)} className={textareaCls} placeholder="Short description…" /></div>
                    </div>
                  </div>
                </>
              )}

              {/* ── SEO TAB ── */}
              {editorTab === 'seo' && (
                <>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-6">
                      <div><label className={labelCls}>Meta Title <span className={formData.meta_title.length > 60 ? 'text-red-400' : 'text-white/20'}>{formData.meta_title.length}/60</span></label>
                        <input type="text" value={formData.meta_title} onChange={e => set('meta_title', e.target.value)} className={inputCls} placeholder="SEO page title…" /></div>
                      <div><label className={labelCls}>Meta Description <span className={formData.meta_description.length > 160 ? 'text-red-400' : 'text-white/20'}>{formData.meta_description.length}/160</span></label>
                        <textarea rows={3} value={formData.meta_description} onChange={e => set('meta_description', e.target.value)} className={textareaCls} placeholder="Search engine description…" /></div>
                      <div><label className={labelCls}>Keywords</label>
                        <input type="text" value={formData.keywords} onChange={e => set('keywords', e.target.value)} className={inputCls} placeholder="comma, separated, keywords" /></div>
                      <div><label className={labelCls}>Canonical URL</label>
                        <input type="text" value={formData.canonical_url} onChange={e => set('canonical_url', e.target.value)} className={inputCls} placeholder="https://…" /></div>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <div onClick={() => set('no_index', !formData.no_index)} className={`w-5 h-5 rounded border flex items-center justify-center transition-all ${formData.no_index ? 'bg-[#E61739] border-[#E61739]' : 'border-white/20'}`}>
                          {formData.no_index && <Check size={12} />}
                        </div>
                        <span className="text-sm text-white/60 font-medium">Noindex (hide from search engines)</span>
                      </label>
                    </div>
                    <div className="space-y-6">
                      <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">Open Graph</div>
                      <div><label className={labelCls}>OG Title</label>
                        <input type="text" value={formData.og_title} onChange={e => set('og_title', e.target.value)} className={inputCls} placeholder="Social share title…" /></div>
                      <div><label className={labelCls}>OG Description</label>
                        <textarea rows={3} value={formData.og_description} onChange={e => set('og_description', e.target.value)} className={textareaCls} placeholder="Social share description…" /></div>
                      <div><label className={labelCls}>OG Image URL</label>
                        <input type="text" value={formData.og_image_url} onChange={e => set('og_image_url', e.target.value)} className={inputCls} placeholder="https://…" /></div>
                      <div><label className={labelCls}>JSON-LD Schema</label>
                        <textarea rows={5} value={formData.json_ld} onChange={e => set('json_ld', e.target.value)} className={`${textareaCls} font-mono text-xs text-green-400`} placeholder='{"@context": "https://schema.org", …}' /></div>
                    </div>
                  </div>
                  <div className="mt-8 p-6 bg-white/5 rounded-[1.5rem] border border-white/10">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-4">SEO Checklist</div>
                    <div className="grid grid-cols-2 gap-3">
                      {seoChecklist.map((item, i) => (
                        <div key={i} className={`flex items-center gap-3 text-sm font-medium ${item.done ? 'text-green-400' : 'text-white/30'}`}>
                          <div className={`w-4 h-4 rounded-full flex items-center justify-center ${item.done ? 'bg-green-500/20' : 'bg-white/5'}`}>
                            {item.done && <Check size={10} />}
                          </div>
                          {item.label}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* ── HUBSPOT TAB ── */}
              {editorTab === 'hubspot' && (
                <div className="grid grid-cols-2 gap-6 max-w-2xl">
                  <div><label className={labelCls}>HubSpot Event Name</label>
                    <input type="text" value={formData.hubspot_event_name} onChange={e => set('hubspot_event_name', e.target.value)} className={inputCls} placeholder="case_study_view" /></div>
                  <div><label className={labelCls}>HubSpot Form GUID</label>
                    <input type="text" value={formData.hubspot_form_guid} onChange={e => set('hubspot_form_guid', e.target.value)} className={inputCls} placeholder="xxxxxxxx-xxxx-…" /></div>
                  <div><label className={labelCls}>UTM Source</label>
                    <input type="text" value={formData.utm_source} onChange={e => set('utm_source', e.target.value)} className={inputCls} placeholder="e.g. linkedin" /></div>
                  <div><label className={labelCls}>UTM Medium</label>
                    <input type="text" value={formData.utm_medium} onChange={e => set('utm_medium', e.target.value)} className={inputCls} placeholder="e.g. social" /></div>
                  <div className="col-span-2"><label className={labelCls}>UTM Campaign</label>
                    <input type="text" value={formData.utm_campaign} onChange={e => set('utm_campaign', e.target.value)} className={inputCls} placeholder="e.g. q1_case_study_push" /></div>
                </div>
              )}

            </div>
          </form>
        )}
      </main>
    </div>
  );
};
