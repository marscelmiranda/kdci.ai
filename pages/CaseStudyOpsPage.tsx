import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { useCaseStudies, CmsStudy } from '../store/caseStudiesStore';
import {
  LayoutGrid, Briefcase, FileText, BookOpen, Image as ImageIcon,
  Bell, Search, Plus, LogOut, Settings, ChevronLeft, Edit2, Trash2,
  Eye, Save, X, User, Check, Activity, ExternalLink, BarChart2,
  Quote, Tag, Globe, Layers, AlignLeft, Award, ChevronRight
} from 'lucide-react';

const emptyForm = (): Omit<CmsStudy, 'id' | 'date'> => ({
  title: '',
  subtitle: '',
  heroImageUrl: '',
  clientName: '',
  category1: 'Case Study',
  category2: '',
  category3: '',
  stat1Value: '',
  stat1Label: '',
  stat2Value: '',
  stat2Label: '',
  stat3Value: '',
  stat3Label: '',
  inBrief: '',
  challengeHeading: 'The Challenge',
  challengeBody: '',
  challengeItem1: '',
  challengeItem2: '',
  challengeItem3: '',
  challengeItem4: '',
  challengeItem5: '',
  solutionHeading: 'The Solution',
  solutionBody1: '',
  solutionBody2: '',
  quoteText: '',
  quoteAttribution: '',
  quoteTitle: '',
  outcomeHeading: 'The Outcome',
  outcomeBody: '',
  outcomeMetric1Value: '',
  outcomeMetric1Label: '',
  outcomeMetric2Value: '',
  outcomeMetric2Label: '',
  sidebarIndustry: '',
  sidebarServices: '',
  sidebarRegion: '',
  sidebarTechStack: '',
  readNext1Category: '',
  readNext1Title: '',
  readNext1Excerpt: '',
  readNext2Category: '',
  readNext2Title: '',
  readNext2Excerpt: '',
  author: '',
  status: 'Draft',
  slug: '',
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
  utmCampaign: '',
});

type FormData = ReturnType<typeof emptyForm>;

export const CaseStudyOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const { studies, setStudies } = useCaseStudies();
  const [viewState, setViewState] = useState<'list' | 'editor'>('list');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editorTab, setEditorTab] = useState<'content' | 'seo' | 'hubspot'>('content');
  const [formData, setFormData] = useState<FormData>(emptyForm());
  const [saveError, setSaveError] = useState('');
  const [savedToast, setSavedToast] = useState(false);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);

  useEffect(() => {
    const originalBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = originalBg; };
  }, []);

  useEffect(() => {
    if (formData.title && !formData.slug) {
      setFormData(prev => ({
        ...prev,
        slug: prev.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      }));
    }
  }, [formData.title]);

  const field = (key: keyof FormData, value: string | boolean) =>
    setFormData(prev => ({ ...prev, [key]: value }));

  const handleCreateNew = () => {
    setEditingId(null);
    setFormData(emptyForm());
    setViewState('editor');
    setEditorTab('content');
  };

  const handleEdit = (s: CmsStudy) => {
    setEditingId(s.id);
    const { id, date, ...rest } = s;
    setFormData({ ...emptyForm(), ...rest });
    setViewState('editor');
    setEditorTab('content');
  };

  const handleDelete = (id: string) => setDeleteTargetId(id);
  const confirmDelete = () => {
    if (deleteTargetId) setStudies(studies.filter(s => s.id !== deleteTargetId));
    setDeleteTargetId(null);
  };

  const handleSave = (e?: React.FormEvent) => {
    e?.preventDefault();
    setSaveError('');
    if (!formData.title.trim()) {
      setSaveError('Case Study Title is required before saving.');
      setEditorTab('content');
      return;
    }
    const now = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    if (editingId) {
      setStudies(studies.map(s => s.id === editingId ? {
        ...formData,
        id: s.id,
        date: formData.status === 'Published' && s.status !== 'Published' ? now : s.date,
      } : s));
    } else {
      const newStudy: CmsStudy = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        date: formData.status === 'Published' ? now : '-',
      };
      setStudies([newStudy, ...studies]);
    }
    setSavedToast(true);
    setTimeout(() => setSavedToast(false), 2500);
    setViewState('list');
  };

  const handleNavClick = (id: string) => {
    if (id === 'overview') setView('publisher-dashboard');
    else if (id === 'careers') setView('cms-career-ops');
    else if (id === 'blog') setView('cms-blog-ops');
    else if (id === 'resources') setView('cms-resources-ops');
    else if (id === 'portfolio') setView('cms-portfolio-ops');
    else if (id === 'case-studies') setView('cms-case-studies-ops');
  };

  const seoChecklist = [
    { label: 'Meta title specified and ≤ 60 chars', done: formData.metaTitle.length > 0 && formData.metaTitle.length <= 60 },
    { label: 'Meta description 120–160 chars', done: formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160 },
    { label: 'Meta keywords specified', done: formData.keywords.length > 0 },
    { label: 'URL Slug populated', done: formData.slug.length > 0 },
    { label: 'Canonical URL populated', done: formData.canonicalUrl.length > 0 },
    { label: 'OG title & description populated', done: formData.ogTitle.length > 0 && formData.ogDescription.length > 0 },
    { label: 'Hero image URL added', done: formData.heroImageUrl.length > 0 },
    { label: 'JSON-LD structured data included', done: formData.jsonLd.length > 0 },
  ];

  const contentChecklist = [
    { label: 'Hero title entered', done: formData.title.length > 0 },
    { label: 'Hero subtitle entered', done: formData.subtitle.length > 0 },
    { label: 'Hero image URL added', done: formData.heroImageUrl.length > 0 },
    { label: 'At least 1 hero stat filled', done: formData.stat1Value.length > 0 },
    { label: '"In Brief" summary filled', done: formData.inBrief.length > 0 },
    { label: 'Challenge body filled', done: formData.challengeBody.length > 0 },
    { label: 'Solution body filled', done: formData.solutionBody1.length > 0 },
    { label: 'Pull quote added', done: formData.quoteText.length > 0 },
    { label: 'Outcome metrics added', done: formData.outcomeMetric1Value.length > 0 },
    { label: 'Sidebar industry filled', done: formData.sidebarIndustry.length > 0 },
    { label: 'Read Next stories filled', done: formData.readNext1Title.length > 0 },
  ];

  const hubspotChecklist = [
    { label: 'UTM Source specified', done: formData.utmSource.length > 0 },
    { label: 'UTM Medium specified', done: formData.utmMedium.length > 0 },
    { label: 'UTM Campaign specified', done: formData.utmCampaign.length > 0 },
    { label: 'Event tracking name specified', done: formData.hubspotEventName.length > 0 },
  ];

  const titleColor = formData.metaTitle.length === 0 ? 'text-white/40' : formData.metaTitle.length <= 60 ? 'text-green-500' : 'text-red-500';
  const descColor = formData.metaDescription.length === 0 ? 'text-white/40' : (formData.metaDescription.length >= 120 && formData.metaDescription.length <= 160) ? 'text-green-500' : formData.metaDescription.length < 120 ? 'text-yellow-500' : 'text-red-500';

  const inputCls = "w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739] transition-all placeholder:text-white/20";
  const smInputCls = "w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#E61739] transition-all placeholder:text-white/20";
  const labelCls = "text-[10px] font-black uppercase tracking-widest text-white/40 ml-1 block mb-1";
  const sectionCls = "bg-[#111] border border-white/5 rounded-2xl p-6 space-y-5";

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutGrid },
    { id: 'careers', label: 'Career Ops', icon: Briefcase },
    { id: 'blog', label: 'Blogs & Insights', icon: FileText },
    { id: 'case-studies', label: 'Case Studies', icon: Award },
    { id: 'resources', label: 'Resources', icon: BookOpen },
    { id: 'portfolio', label: 'Creative Portfolio', icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans">

      {/* Saved Toast */}
      {savedToast && (
        <div className="fixed top-6 right-6 z-[999] flex items-center gap-3 bg-green-500 text-white px-5 py-3 rounded-xl shadow-2xl font-bold text-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <Check size={16} /> Case study saved successfully!
        </div>
      )}

      {/* Sidebar */}
      <aside className="w-72 shrink-0 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-[#0a0a0a]">
        <div className="p-8 pb-4">
          <Logo isDarkHero={true} />
          <div className="mt-4 px-3 py-1.5 rounded-lg bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[10px] font-black uppercase tracking-widest w-fit">
            Publisher Portal
          </div>
        </div>
        <nav className="flex-grow px-4 py-6 space-y-1">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                item.id === 'case-studies' ? 'bg-white/10 text-white shadow-sm' : 'text-white/40 hover:text-white hover:bg-white/5'
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
          <button onClick={() => setView('home')} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-[#E61739] hover:bg-[#E61739]/10 transition-all">
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-grow flex flex-col min-h-screen relative overflow-hidden">

        {/* ── LIST VIEW ── */}
        {viewState === 'list' && (
          <div className="p-8 md:p-12 overflow-y-auto flex-grow animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex justify-between items-center mb-10">
              <div>
                <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                  <span onClick={() => setView('publisher-dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                  <ChevronRight size={10} />
                  <span className="text-[#E61739]">Case Studies</span>
                </div>
                <h1 className="text-3xl font-heading font-bold text-white">Case Studies</h1>
              </div>
              <button onClick={handleCreateNew} className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red">
                <Plus size={16} /> New Case Study
              </button>
            </div>

            <div className="flex items-center gap-4 mb-8">
              <div className="relative flex-grow max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                <input type="text" placeholder="Search by title or industry..." className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-[#E61739]" />
              </div>
            </div>

            <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-[10px] font-black uppercase tracking-widest text-white/40 bg-white/[0.02]">
                    <th className="px-8 py-5">Title</th>
                    <th className="px-8 py-5">Industry</th>
                    <th className="px-8 py-5">Author</th>
                    <th className="px-8 py-5">Status</th>
                    <th className="px-8 py-5">Published</th>
                    <th className="px-8 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {studies.map(s => (
                    <tr key={s.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-5"><div className="font-bold text-white line-clamp-1">{s.title}</div></td>
                      <td className="px-8 py-5"><span className="px-3 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-bold text-white/70">{s.sidebarIndustry}</span></td>
                      <td className="px-8 py-5 text-sm text-white/70"><div className="flex items-center gap-2"><User size={12} className="text-white/30" />{s.author}</div></td>
                      <td className="px-8 py-5">
                        <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${s.status === 'Published' ? 'bg-green-500/10 text-green-500 border-green-500/20' : s.status === 'Draft' ? 'bg-white/5 text-white/50 border-white/10' : 'bg-red-500/10 text-red-500 border-red-500/20'}`}>{s.status}</span>
                      </td>
                      <td className="px-8 py-5 text-sm text-white/40 font-mono">{s.date}</td>
                      <td className="px-8 py-5 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button type="button" onClick={() => setView('case-studies')} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-white" title="Preview on site"><Eye size={16} /></button>
                          <button onClick={() => handleEdit(s)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-[#E61739]"><Edit2 size={16} /></button>
                          <button onClick={() => handleDelete(s.id)} className="p-2 rounded-lg hover:bg-white/10 text-white/50 hover:text-red-500"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ── EDITOR VIEW ── */}
        {viewState === 'editor' && (
          <form noValidate onSubmit={handleSave} className="flex-grow flex flex-col min-h-screen animate-in fade-in slide-in-from-right-8 duration-500">

            {/* Top Toolbar */}
            <header className="bg-[#1a1a1a] border-b border-white/5 p-4 flex justify-between items-center sticky top-0 z-20">
              <div className="flex items-center gap-4">
                <button type="button" onClick={() => setViewState('list')} className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg"><ChevronLeft size={20} /></button>
                <div className="px-4 py-2 bg-black/20 border border-white/10 rounded-lg text-sm text-white/70 font-mono min-w-[240px] truncate">
                  {formData.title || 'Untitled Case Study'}
                </div>
                <div className="flex gap-2">
                  {(['content', 'seo', 'hubspot'] as const).map(tab => (
                    <button key={tab} type="button" onClick={() => setEditorTab(tab)}
                      className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${editorTab === tab ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white hover:bg-white/5'}`}>
                      {tab === 'content' ? 'Content Builder' : tab === 'seo' ? 'SEO & Meta' : 'HubSpot Tracking'}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-4">
                <select value={formData.status} onChange={e => field('status', e.target.value)} className="bg-black/20 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none">
                  <option value="Draft">Draft</option>
                  <option value="Published">Published</option>
                  <option value="Archived">Archived</option>
                </select>
                <button type="button" onClick={() => handleSave()} className="px-6 py-2 bg-[#E61739] text-white rounded-lg font-bold text-sm shadow-lg flex items-center gap-2 hover:bg-[#c51431] transition-colors"><Save size={16} /> Save</button>
              </div>
            </header>

            {/* Save Error Banner */}
            {saveError && (
              <div className="bg-red-500/10 border-b border-red-500/30 px-8 py-3 flex items-center gap-3">
                <X size={14} className="text-red-400 shrink-0" />
                <span className="text-red-400 text-sm font-medium">{saveError}</span>
                <button type="button" onClick={() => setSaveError('')} className="ml-auto text-red-400/60 hover:text-red-400"><X size={12} /></button>
              </div>
            )}

            <div className="flex flex-grow overflow-hidden relative">

              {/* Left — Main Area */}
              <div className="flex-grow overflow-y-auto p-8 lg:p-12 pb-32">
                <div className="max-w-4xl mx-auto space-y-8">

                  {/* ── CONTENT TAB ── */}
                  {editorTab === 'content' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">

                      {/* Hero Section */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><ImageIcon size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Hero Section</h3>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Case Study Title *</label>
                          <input type="text" value={formData.title} onChange={e => field('title', e.target.value)} placeholder="E.g. Scaling Support from 0 to 500 Agents" className={`w-full bg-transparent border-0 border-b-2 px-0 py-4 text-white focus:ring-0 focus:outline-none transition-all font-heading font-bold text-3xl placeholder:text-white/10 ${saveError && !formData.title.trim() ? 'border-red-500 focus:border-red-500' : 'border-white/10 focus:border-[#E61739]'}`} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Subtitle / Lead Paragraph</label>
                          <textarea rows={2} value={formData.subtitle} onChange={e => field('subtitle', e.target.value)} placeholder="How a high-growth neobank maintained 98% CSAT while hyper-scaling..." className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Hero Background Image URL</label>
                          <input type="text" value={formData.heroImageUrl} onChange={e => field('heroImageUrl', e.target.value)} placeholder="https://images.unsplash.com/..." className={inputCls} />
                          {formData.heroImageUrl && <img src={formData.heroImageUrl} alt="Hero preview" className="w-full h-32 object-cover rounded-xl border border-white/10 mt-2" />}
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Category Tags (used in hero breadcrumb row)</label>
                          <div className="grid grid-cols-3 gap-3">
                            <input type="text" value={formData.category1} onChange={e => field('category1', e.target.value)} placeholder="Primary tag" className={smInputCls} />
                            <input type="text" value={formData.category2} onChange={e => field('category2', e.target.value)} placeholder="Secondary tag" className={smInputCls} />
                            <input type="text" value={formData.category3} onChange={e => field('category3', e.target.value)} placeholder="Tertiary tag" className={smInputCls} />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Hero Stat Pills (up to 3)</label>
                          <div className="grid grid-cols-3 gap-3">
                            {([1, 2, 3] as const).map(n => (
                              <div key={n} className="space-y-2">
                                <input type="text" value={formData[`stat${n}Value` as keyof FormData] as string} onChange={e => field(`stat${n}Value` as keyof FormData, e.target.value)} placeholder={`Value (e.g. 65%)`} className={smInputCls} />
                                <input type="text" value={formData[`stat${n}Label` as keyof FormData] as string} onChange={e => field(`stat${n}Label` as keyof FormData, e.target.value)} placeholder={`Label (e.g. Cost Savings)`} className={smInputCls} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Executive Summary */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400"><AlignLeft size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Executive Summary <span className="text-white/30 normal-case font-normal">"In Brief"</span></h3>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Summary Paragraph (appears in the red-bordered callout box)</label>
                          <textarea rows={4} value={formData.inBrief} onChange={e => field('inBrief', e.target.value)} placeholder="Facing exponential user growth, a Tier-1 Fintech unicorn needed to expand support capacity..." className={inputCls} />
                        </div>
                      </div>

                      {/* Challenge */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-yellow-500/10 flex items-center justify-center text-yellow-400"><Layers size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Challenge Section</h3>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Section Heading</label>
                          <input type="text" value={formData.challengeHeading} onChange={e => field('challengeHeading', e.target.value)} className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Body Text</label>
                          <textarea rows={4} value={formData.challengeBody} onChange={e => field('challengeBody', e.target.value)} placeholder="The client saw their user base triple in a single quarter..." className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Numbered Challenge Items (leave blank to omit)</label>
                          <div className="space-y-2">
                            {([1, 2, 3, 4, 5] as const).map(n => (
                              <div key={n} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/5 flex items-center justify-center text-[#E61739] text-xs font-bold shrink-0">{n}</div>
                                <input type="text" value={formData[`challengeItem${n}` as keyof FormData] as string} onChange={e => field(`challengeItem${n}` as keyof FormData, e.target.value)} placeholder={`Challenge item ${n}`} className={smInputCls} />
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Solution */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400"><Settings size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Solution Section</h3>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Section Heading</label>
                          <input type="text" value={formData.solutionHeading} onChange={e => field('solutionHeading', e.target.value)} className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Body Paragraph 1</label>
                          <textarea rows={4} value={formData.solutionBody1} onChange={e => field('solutionBody1', e.target.value)} placeholder="KDCI didn't just supply headcount; we architected a scalable support ecosystem..." className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Body Paragraph 2 (optional)</label>
                          <textarea rows={3} value={formData.solutionBody2} onChange={e => field('solutionBody2', e.target.value)} placeholder="Simultaneously, we deployed our proprietary AI Triage Layer..." className={inputCls} />
                        </div>
                      </div>

                      {/* Pull Quote */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400"><Quote size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Pull Quote</h3>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Quote Text</label>
                          <textarea rows={3} value={formData.quoteText} onChange={e => field('quoteText', e.target.value)} placeholder="e.g. KDCI mirrored our internal culture so perfectly that our customers could not tell the difference..." className={inputCls} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelCls}>Attribution Name</label>
                            <input type="text" value={formData.quoteAttribution} onChange={e => field('quoteAttribution', e.target.value)} placeholder="VP of Operations" className={smInputCls} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelCls}>Attribution Title</label>
                            <input type="text" value={formData.quoteTitle} onChange={e => field('quoteTitle', e.target.value)} placeholder="Client Partner" className={smInputCls} />
                          </div>
                        </div>
                      </div>

                      {/* Outcome */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><BarChart2 size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Outcome Section</h3>
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Section Heading</label>
                          <input type="text" value={formData.outcomeHeading} onChange={e => field('outcomeHeading', e.target.value)} className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Outcome Body Text</label>
                          <textarea rows={3} value={formData.outcomeBody} onChange={e => field('outcomeBody', e.target.value)} placeholder="Within 6 months, the operation scaled from 0 to 500 active seats..." className={inputCls} />
                        </div>
                        <div className="space-y-2">
                          <label className={labelCls}>Outcome Metric Cards (2 cards)</label>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="p-4 bg-[#1a1a1a] rounded-xl border border-white/10 space-y-3">
                              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Card 1</div>
                              <input type="text" value={formData.outcomeMetric1Value} onChange={e => field('outcomeMetric1Value', e.target.value)} placeholder="Value (e.g. $12M)" className={smInputCls} />
                              <input type="text" value={formData.outcomeMetric1Label} onChange={e => field('outcomeMetric1Label', e.target.value)} placeholder="Label (e.g. Annualized Savings)" className={smInputCls} />
                            </div>
                            <div className="p-4 bg-[#1a1a1a] rounded-xl border border-white/10 space-y-3">
                              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Card 2</div>
                              <input type="text" value={formData.outcomeMetric2Value} onChange={e => field('outcomeMetric2Value', e.target.value)} placeholder="Value (e.g. &lt;30s)" className={smInputCls} />
                              <input type="text" value={formData.outcomeMetric2Label} onChange={e => field('outcomeMetric2Label', e.target.value)} placeholder="Label (e.g. First Response Time)" className={smInputCls} />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Sidebar / At a Glance */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-slate-500/10 flex items-center justify-center text-slate-400"><Tag size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Sidebar — "At a Glance"</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className={labelCls}>Industry</label>
                            <input type="text" value={formData.sidebarIndustry} onChange={e => field('sidebarIndustry', e.target.value)} placeholder="Fintech / Banking" className={smInputCls} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelCls}>Services</label>
                            <input type="text" value={formData.sidebarServices} onChange={e => field('sidebarServices', e.target.value)} placeholder="CX, Fraud Ops, KYC" className={smInputCls} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelCls}>Client Region</label>
                            <input type="text" value={formData.sidebarRegion} onChange={e => field('sidebarRegion', e.target.value)} placeholder="North America" className={smInputCls} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelCls}>Tech Stack (comma-separated)</label>
                            <input type="text" value={formData.sidebarTechStack} onChange={e => field('sidebarTechStack', e.target.value)} placeholder="Zendesk, Intercom, Jira" className={smInputCls} />
                          </div>
                        </div>
                      </div>

                      {/* Read Next */}
                      <div className={sectionCls}>
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400"><Globe size={14} /></div>
                          <h3 className="text-sm font-bold text-white/80 uppercase tracking-widest">Read Next (2 Related Stories)</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          {[1, 2].map(n => (
                            <div key={n} className="p-4 bg-[#1a1a1a] rounded-xl border border-white/10 space-y-3">
                              <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Story {n}</div>
                              <input type="text" value={formData[`readNext${n}Category` as keyof FormData] as string} onChange={e => field(`readNext${n}Category` as keyof FormData, e.target.value)} placeholder="Industry / Category" className={smInputCls} />
                              <input type="text" value={formData[`readNext${n}Title` as keyof FormData] as string} onChange={e => field(`readNext${n}Title` as keyof FormData, e.target.value)} placeholder="Case study headline" className={smInputCls} />
                              <input type="text" value={formData[`readNext${n}Excerpt` as keyof FormData] as string} onChange={e => field(`readNext${n}Excerpt` as keyof FormData, e.target.value)} placeholder="Short excerpt" className={smInputCls} />
                            </div>
                          ))}
                        </div>
                      </div>

                    </div>
                  )}

                  {/* ── SEO TAB ── */}
                  {editorTab === 'seo' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                      <div className="bg-white rounded-2xl p-6 text-black border border-gray-200">
                        <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2"><ExternalLink size={14} /> Live Google SERP Preview</div>
                        <div className="space-y-1">
                          <div className="text-sm text-gray-800">https://kdci.co/case-studies/{formData.slug || 'your-url-slug'}</div>
                          <h3 className="text-xl text-[#1a0dab] font-sans hover:underline cursor-pointer break-words">{formData.metaTitle || formData.title || 'Your Meta Title Will Appear Here'}</h3>
                          <p className="text-sm text-[#4d5156] leading-snug break-words">{formData.metaDescription || 'Your meta description will appear here. Make it compelling and between 120–160 characters.'}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <div className="space-y-2">
                            <div className="flex justify-between items-end">
                              <label className={labelCls}>Meta Title</label>
                              <span className={`text-xs font-mono font-bold ${titleColor}`}>{formData.metaTitle.length}/60</span>
                            </div>
                            <input type="text" value={formData.metaTitle} onChange={e => field('metaTitle', e.target.value)} className={inputCls} />
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-end">
                              <label className={labelCls}>Meta Description</label>
                              <span className={`text-xs font-mono font-bold ${descColor}`}>{formData.metaDescription.length}/160</span>
                            </div>
                            <textarea rows={3} value={formData.metaDescription} onChange={e => field('metaDescription', e.target.value)} className={inputCls} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelCls}>Keywords (comma separated)</label>
                            <input type="text" value={formData.keywords} onChange={e => field('keywords', e.target.value)} className={inputCls} />
                          </div>
                          <div className="space-y-2">
                            <label className={labelCls}>Canonical URL (optional)</label>
                            <input type="text" value={formData.canonicalUrl} onChange={e => field('canonicalUrl', e.target.value)} placeholder="https://..." className={inputCls} />
                          </div>
                          <div className="pt-2 flex items-center gap-3">
                            <input type="checkbox" id="noindex" checked={formData.noIndex} onChange={e => field('noIndex', e.target.checked)} className="w-5 h-5 accent-[#E61739]" />
                            <label htmlFor="noindex" className="text-sm font-bold text-white/70">No-Index (Hide from Search Engines)</label>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div className="p-6 bg-[#1a1a1a] rounded-2xl border border-white/5 space-y-4">
                            <h3 className="text-sm font-bold border-b border-white/10 pb-4">Social Media (Open Graph)</h3>
                            <div className="space-y-2">
                              <label className={labelCls}>OG Title</label>
                              <input type="text" value={formData.ogTitle} onChange={e => field('ogTitle', e.target.value)} className={smInputCls} />
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>OG Description</label>
                              <textarea rows={2} value={formData.ogDescription} onChange={e => field('ogDescription', e.target.value)} className={smInputCls} />
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>OG Image URL</label>
                              <input type="text" value={formData.ogImageUrl} onChange={e => field('ogImageUrl', e.target.value)} className={smInputCls} />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className={`${labelCls} flex items-center justify-between`}>
                              JSON-LD Structured Data <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-500 rounded text-[8px] font-bold normal-case">Advanced</span>
                            </label>
                            <textarea rows={6} value={formData.jsonLd} onChange={e => field('jsonLd', e.target.value)} placeholder={"{ '@context': 'https://schema.org', '@type': 'Article' ... }"} className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-xs text-green-400 font-mono focus:outline-none focus:border-[#E61739]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* ── HUBSPOT TAB ── */}
                  {editorTab === 'hubspot' && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
                      <div className="p-6 bg-[#ff7a59]/10 border border-[#ff7a59]/20 rounded-2xl">
                        <h3 className="text-[#ff7a59] font-bold mb-2 flex items-center gap-2"><Activity size={18} /> HubSpot Integration Set Up</h3>
                        <p className="text-sm text-[#ff7a59]/80">You must have the HubSpot tracking code installed in the site head to capture these events and forms. Ensure CTA blocks use the exact Form GUID defined below.</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold border-b border-white/10 pb-4">Behavioral Event Tracking</h3>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <label className={labelCls}>Custom Event Name (_hsq.push)</label>
                              <input type="text" value={formData.hubspotEventName} onChange={e => field('hubspotEventName', e.target.value)} placeholder="e.g. read_fintech_case_study_cta_click" className={inputCls} />
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>HubSpot Form GUID</label>
                              <input type="text" value={formData.hubspotFormGuid} onChange={e => field('hubspotFormGuid', e.target.value)} placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx" className={inputCls} />
                            </div>
                            <button type="button" className="px-4 py-2 border border-[#ff7a59] text-[#ff7a59] rounded-lg text-xs font-bold hover:bg-[#ff7a59] hover:text-white transition-all">Fire Test Event</button>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <h3 className="text-lg font-bold border-b border-white/10 pb-4">UTM Parameter Builder</h3>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <label className={labelCls}>UTM Source</label>
                                <input type="text" value={formData.utmSource} onChange={e => field('utmSource', e.target.value)} placeholder="e.g. linkedin" className={smInputCls} />
                              </div>
                              <div className="space-y-2">
                                <label className={labelCls}>UTM Medium</label>
                                <input type="text" value={formData.utmMedium} onChange={e => field('utmMedium', e.target.value)} placeholder="e.g. social" className={smInputCls} />
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className={labelCls}>UTM Campaign</label>
                              <input type="text" value={formData.utmCampaign} onChange={e => field('utmCampaign', e.target.value)} placeholder="e.g. q4_enterprise_push" className={smInputCls} />
                            </div>
                            <div className="p-4 bg-black/40 rounded-xl border border-white/10">
                              <div className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-2">Live Generated URL</div>
                              <div className="text-xs font-mono text-green-400 break-all">
                                https://kdci.co/case-studies/{formData.slug || 'slug'}?utm_source={formData.utmSource || '…'}&utm_medium={formData.utmMedium || '…'}&utm_campaign={formData.utmCampaign || '…'}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Right — Checklists + Meta Sidebar */}
              <div className="w-80 shrink-0 border-l border-white/5 bg-[#0a0a0a] overflow-y-auto hidden xl:block">
                <div className="p-6 space-y-8">

                  {/* Post Details */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Case Study Details</h4>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/40">Client Name</label>
                      <input type="text" value={formData.clientName} onChange={e => field('clientName', e.target.value)} placeholder="e.g. Fortune 500 Retailer" className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder:text-white/20" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/40">URL Slug</label>
                      <input type="text" value={formData.slug} onChange={e => field('slug', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/40">Author</label>
                      <input type="text" value={formData.author} onChange={e => field('author', e.target.value)} className="w-full bg-[#1a1a1a] border border-white/10 rounded-lg px-3 py-2 text-xs text-white" />
                    </div>
                    {formData.heroImageUrl && (
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-white/40">Hero Image Preview</label>
                        <img src={formData.heroImageUrl} alt="Hero" className="w-full h-auto aspect-video object-cover rounded-lg border border-white/10" />
                      </div>
                    )}
                  </div>

                  {/* Content Completeness Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">Content Checklist</h4>
                    <div className="space-y-2">
                      {contentChecklist.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <div className={`mt-0.5 w-3 h-3 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-green-500' : 'bg-white/10'}`}>
                            {item.done && <Check size={8} className="text-black" />}
                          </div>
                          <span className={`text-xs ${item.done ? 'text-white' : 'text-white/40'}`}>{item.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2">
                      <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-white/30 mb-1">
                        <span>Completeness</span>
                        <span>{Math.round((contentChecklist.filter(i => i.done).length / contentChecklist.length) * 100)}%</span>
                      </div>
                      <div className="w-full bg-white/5 rounded-full h-1.5">
                        <div className="bg-green-500 h-1.5 rounded-full transition-all duration-500" style={{ width: `${Math.round((contentChecklist.filter(i => i.done).length / contentChecklist.length) * 100)}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* SEO Checklist */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-white/40 border-b border-white/5 pb-2">SEO Checklist</h4>
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
                  <div className="space-y-3">
                    <h4 className="text-xs font-black uppercase tracking-widest text-[#ff7a59]/60 border-b border-white/5 pb-2">HubSpot Checklist</h4>
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

      {/* Delete confirmation modal */}
      {deleteTargetId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#1a1a1a] border border-white/10 rounded-3xl p-10 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-6">
              <Trash2 size={24} className="text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Delete Case Study?</h3>
            <p className="text-white/50 text-sm mb-8 leading-relaxed">
              This will permanently remove the entry from your CMS. Published studies will no longer appear on the site.
            </p>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setDeleteTargetId(null)}
                className="flex-1 py-3 rounded-xl border border-white/10 text-white/70 font-bold text-sm hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 py-3 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm transition-all"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
