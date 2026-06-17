
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Clock, Calendar, Share2, Linkedin, Twitter, 
  Link as LinkIcon, Download, Quote, CheckCircle2,
  ChevronLeft, Sparkles, BrainCircuit, Users, Database,
  TrendingUp, ShieldCheck, Loader2, AlertCircle, FileText, Globe, Terminal
} from 'lucide-react';
import { useAuthorAvatars, getAvatarUrl } from '../hooks/useAuthorAvatars';
import { AuthorAvatar } from '../components/AuthorAvatar';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { AUTHOR_1, IMG_BLOG_HERO, IMG_BLOG_1, IMG_BLOG_3 } from '../data';
import { applyDetailSEO } from '../lib/seo';

interface LivePost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  cover_image: string;
  cover_image_alt: string;
  tags: string[];
  status: string;
  published_at: string;
  updated_at: string;
  meta_title: string;
  meta_description: string;
  keywords: string;
  canonical_url: string;
  og_title: string;
  og_description: string;
  og_image_url: string;
  json_ld: string;
  no_index: boolean;
}

function wrapTables(html: string): string {
  return html
    .replace(/<table/gi, '<div class="rte-table-wrapper"><table')
    .replace(/<\/table>/gi, '</table></div>');
}

function wrapIframes(html: string): string {
  return html
    .replace(/<iframe([^>]*)>/gi, '<div class="rte-video-wrapper"><iframe$1>')
    .replace(/<\/iframe>/gi, '</iframe></div>');
}

function generateTableHTML(data: any): string {
  if (!data?.rows) return '';
  const ts = data.tableStyles || {};
  const border = (ts.borderStyle && ts.borderStyle !== 'none')
    ? `${ts.borderWidth || 1}px ${ts.borderStyle || 'solid'} ${ts.borderColor || '#cbd5e1'}`
    : 'none';
  const tableStyle = `width:${ts.width || '100%'};border-collapse:collapse;font-size:${ts.fontSize || 14}px;`;
  const headerRows: any[] = data.rows.filter((r: any) => r.isHeader);
  const bodyRows: any[] = data.rows.filter((r: any) => !r.isHeader);

  const renderCell = (cell: any, rowIdx: number) => {
    if (cell.colSpan === 0) return '';
    const tag = cell.isHeader ? 'th' : 'td';
    const cs = cell.style || {};
    const padding = cs.padding ? `${cs.padding}px` : '8px';
    const styles = [
      `border:${border}`,
      `padding:${padding}`,
      `text-align:${cs.textAlign || 'left'}`,
      `font-weight:${cs.fontWeight || (cell.isHeader ? 'bold' : 'normal')}`,
      cs.fontSize ? `font-size:${cs.fontSize}px` : '',
      cs.bgColor ? `background:${cs.bgColor}` : '',
      cs.color ? `color:${cs.color}` : '',
    ].filter(Boolean).join(';');
    const colSpanAttr = cell.colSpan > 1 ? ` colspan="${cell.colSpan}"` : '';
    return `    <${tag}${colSpanAttr} style="${styles}">${cell.content}</${tag}>`;
  };

  const renderRow = (row: any, rowIdx: number) => {
    const isZebra = ts.zebraStripe && !row.isHeader && rowIdx % 2 === 1;
    const rowBg = row.bgColor || (isZebra ? (ts.zebraColor || '#f8fafc') : '');
    const rowStyle = rowBg ? ` style="background:${rowBg}"` : '';
    const cells = row.cells.map((c: any, ci: number) => renderCell(c, ci)).filter(Boolean).join('\n');
    return `  <tr${rowStyle}>\n${cells}\n  </tr>`;
  };

  const stickyStyle = ts.stickyHeader ? ' style="position:sticky;top:0;z-index:1"' : '';
  const thead = headerRows.length > 0
    ? `<thead${stickyStyle}>\n${headerRows.map((r: any, i: number) => renderRow(r, i)).join('\n')}\n</thead>`
    : '';
  const tbody = bodyRows.length > 0
    ? `<tbody>\n${bodyRows.map((r: any, i: number) => renderRow(r, i)).join('\n')}\n</tbody>`
    : '';

  return `<table style="${tableStyle}">\n${thead}\n${tbody}\n</table>`;
}

const renderBlocks = (contentStr: string) => {
  let blocks: any[] = [];
  try {
    const parsed = JSON.parse(contentStr);
    if (Array.isArray(parsed)) blocks = parsed;
    else blocks = [{ type: 'rich_text', content: { text: contentStr } }];
  } catch {
    blocks = [{ type: 'rich_text', content: { text: contentStr } }];
  }

  return blocks.map((block: any, i: number) => {
    switch (block.type) {
      case 'rich_text':
        return (
          <div key={i}
            className="rte-content"
            dangerouslySetInnerHTML={{ __html: wrapIframes(wrapTables(block.content?.text || '')) }}
          />
        );
      case 'html':
        return <div key={i} className="max-w-full overflow-x-auto [&_img]:max-w-full [&_table]:max-w-full [&_iframe]:max-w-full" dangerouslySetInnerHTML={{ __html: block.content?.code || '' }} />;
      case 'image':
        return block.content?.url ? (
          <div key={i} className="my-8">
            <img loading="lazy" src={block.content.url} alt={block.content.caption || ''} className="w-full rounded-3xl object-cover" />
            {block.content.caption && <p className="text-center text-sm text-slate-400 mt-3">{block.content.caption}</p>}
          </div>
        ) : null;
      case 'pull_quote':
        return (
          <div key={i} className="my-12 border-l-4 border-[#E61739] pl-10 py-4 relative">
            <Quote size={60} className="absolute -top-6 -left-6 text-slate-50 opacity-80 -z-10" />
            <div className="text-2xl font-heading font-bold text-slate-900 leading-tight rte-content" dangerouslySetInnerHTML={{ __html: block.content?.quote || '' }} />
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
                  <img loading="lazy" src={col.url} alt={col.caption || ''} className="w-full rounded-2xl object-cover" />
                  {col.caption && <p className="text-center text-xs text-slate-400 mt-2">{col.caption}</p>}
                </div>
              ) : null;
              return <div key={side} className="rte-content" dangerouslySetInnerHTML={{ __html: wrapIframes(wrapTables(col.text || '')) }} />;
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
      case 'video': {
        const vc = block.content || {};
        const ar = vc.aspectRatio === '4/3' ? '75%' : vc.aspectRatio === '1/1' ? '100%' : vc.aspectRatio === 'custom'
          ? `${(((vc.customAspectH || 9) / (vc.customAspectW || 16)) * 100).toFixed(2)}%` : '56.25%';
        const alignClass = vc.alignment === 'left' ? 'mr-auto' : vc.alignment === 'right' ? 'ml-auto' : 'mx-auto';
        const shadow = vc.boxShadow ? 'shadow-2xl' : '';
        const radius = `${vc.borderRadius ?? 8}px`;
        const maxW = vc.maxWidth || '100%';
        const embedParams = (sourceType: string, videoId: string) => {
          const p = new URLSearchParams({
            ...(vc.autoplay ? { autoplay: '1', ...(sourceType === 'youtube' ? { mute: '1' } : { muted: '1' }) } : {}),
            ...(vc.loop ? sourceType === 'youtube' ? { loop: '1', playlist: videoId } : { loop: '1' } : {}),
            controls: vc.showControls === false ? '0' : '1',
            ...(sourceType === 'youtube' ? { rel: '0' } : { byline: '0', portrait: '0', title: '0' }),
          });
          const base = sourceType === 'youtube'
            ? `https://www.youtube.com/embed/${videoId}`
            : `https://player.vimeo.com/video/${videoId}`;
          return `${base}?${p}`;
        };
        if (vc.sourceType === 'file' && vc.fileObjectUrl) {
          return (
            <div key={i} className={`my-8 ${alignClass}`} style={{ maxWidth: maxW }}>
              <video src={vc.fileObjectUrl} poster={vc.posterUrl || vc.thumbnailDataUrl}
                autoPlay={vc.autoplay} loop={!!vc.loop} muted={vc.autoplay || !!vc.muted}
                controls={vc.showControls !== false} playsInline
                className={`w-full ${shadow}`} style={{ borderRadius: radius }} />
              {vc.caption && <p className="text-center text-sm text-slate-400 mt-3">{vc.caption}</p>}
            </div>
          );
        }
        if ((vc.sourceType === 'youtube' || vc.sourceType === 'vimeo') && vc.videoId) {
          return (
            <div key={i} className={`my-8 ${alignClass}`} style={{ maxWidth: maxW }}>
              <div className={`relative overflow-hidden ${shadow}`} style={{ paddingTop: ar, borderRadius: radius }}>
                <iframe src={embedParams(vc.sourceType, vc.videoId)}
                  className="absolute inset-0 w-full h-full" frameBorder="0"
                  allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen title="Video" />
              </div>
              {vc.caption && <p className="text-center text-sm text-slate-400 mt-3">{vc.caption}</p>}
            </div>
          );
        }
        return null;
      }
      case 'table': {
        const tableData = typeof block.content?.tableData === 'string'
          ? JSON.parse(block.content.tableData)
          : block.content?.tableData;
        if (!tableData?.rows) return null;
        return (
          <div key={i} className="my-6 overflow-x-auto max-w-full">
            <div dangerouslySetInnerHTML={{ __html: generateTableHTML(tableData) }} />
          </div>
        );
      }
      case 'divider':
        return <hr key={i} className="my-10 border-slate-100" />;
      default:
        return null;
    }
  });
};

export const BlogDetailPage = ({ setView, blogId, blogSlug }: { setView: (v: ViewType) => void; blogId: number | null; blogSlug?: string | null }) => {
  const [post, setPost] = useState<LivePost | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const avatarMap = useAuthorAvatars();

  const identifier = blogSlug || blogId;

  useEffect(() => {
    if (!identifier) return;
    setLoading(true);
    setError(null);
    fetch(`/api/blog/${identifier}`)
      .then(r => r.ok ? r.json() : Promise.reject('Post not found'))
      .then((data) => {
        setPost(data);
        const canonicalUrl = (data.canonical_url || '').trim() || `https://kdci.ai/blogs/${data.slug}/`;
        const metaTitle = (data.meta_title || data.title || '').trim();
        const metaDesc = (data.meta_description || data.excerpt || '').slice(0, 160);
        const ogImg = (data.og_image_url || data.cover_image || '').trim() || undefined;
        const ogTitle = (data.og_title || data.title || '').trim();
        const ogDesc = (data.og_description || metaDesc).trim();

        applyDetailSEO({
          title: metaTitle,
          description: metaDesc,
          url: canonicalUrl,
          image: ogImg,
        });

        // Override OG title/desc with dedicated fields if set
        const setMeta = (sel: string, val: string) => { const el = document.querySelector(sel); if (el) el.setAttribute('content', val); };
        if (ogTitle) setMeta('meta[property="og:title"]', ogTitle.includes('KDCI') ? ogTitle : `${ogTitle} | KDCI.ai`);
        if (ogDesc) setMeta('meta[property="og:description"]', ogDesc);

        // noIndex
        let robotsMeta = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
        if (data.no_index) {
          if (!robotsMeta) {
            robotsMeta = document.createElement('meta');
            robotsMeta.setAttribute('name', 'robots');
            document.head.appendChild(robotsMeta);
          }
          robotsMeta.setAttribute('content', 'noindex, nofollow');
        } else if (robotsMeta) {
          robotsMeta.remove();
        }

        // JSON-LD BlogPosting
        document.querySelector('script[type="application/ld+json"][data-blog]')?.remove();
        let schema: object;
        if ((data.json_ld || '').trim()) {
          try { schema = JSON.parse(data.json_ld); } catch { schema = {}; }
        } else {
          schema = {
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: metaTitle || data.title,
            description: metaDesc,
            author: { '@type': 'Person', name: data.author || 'KDCI' },
            datePublished: data.published_at,
            dateModified: data.updated_at || data.published_at,
            image: ogImg,
            url: canonicalUrl,
            publisher: { '@type': 'Organization', name: 'KDCI.ai', url: 'https://kdci.ai' },
            keywords: data.keywords || (data.tags || []).join(', '),
          };
        }
        const ldScript = document.createElement('script');
        ldScript.type = 'application/ld+json';
        ldScript.setAttribute('data-blog', '1');
        ldScript.textContent = JSON.stringify(schema);
        document.head.appendChild(ldScript);
      })
      .catch(() => setError('Could not load this article.'))
      .finally(() => setLoading(false));
  }, [identifier]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 size={40} className="animate-spin text-[#E61739]/40" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 text-slate-400">
        <AlertCircle size={40} />
        <p className="font-medium">{error}</p>
        <button onClick={() => setView('blog')} className="text-[#E61739] font-bold hover:underline">Back to Insights</button>
      </div>
    );
  }

  // Live post from DB
  if (post) {
    const pubDate = post.published_at
      ? new Date(post.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
      : '';
    const coverImg = post.cover_image || IMG_BLOG_HERO;

    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <section className="relative bg-[#020202] pt-40 pb-20 overflow-hidden">
          <div className="mesh-container opacity-30">
            <div className="blob blob-purple"></div>
            <div className="blob blob-magenta opacity-20"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto">
              <button onClick={() => setView('blog')}
                className="flex items-center gap-2 text-white/40 hover:text-[#E61739] font-black uppercase tracking-[0.2em] text-[10px] mb-12 transition-colors group">
                <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
              </button>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E61739]/10 text-[#E61739] text-[11px] font-black uppercase tracking-widest mb-8 border border-[#E61739]/30">
                <Sparkles size={14} /> {post.category}
              </div>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-10 leading-[1.1] tracking-tight">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="text-white/60 text-xl leading-relaxed mb-10">{post.excerpt}</p>
              )}
              <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-10 text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
                <div className="flex items-center gap-3">
                  <AuthorAvatar
                    name={post.author || 'KDCI Editorial'}
                    avatarUrl={getAvatarUrl(avatarMap, post.author || '')}
                    size={40}
                    theme="dark"
                  />
                  <div>
                    <div className="text-white">{post.author || 'KDCI Editorial'}</div>
                    <div className="text-[9px] opacity-60">KDCI Operations</div>
                  </div>
                </div>
                {pubDate && (
                  <>
                    <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
                    <div className="flex items-center gap-2"><Calendar size={14} className="text-[#E61739]" /> {pubDate}</div>
                  </>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Cover Image */}
        <section className="relative -mt-16 z-20 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_48px_100px_-20px_rgba(0,0,0,0.3)] group bg-black">
              <img loading="lazy" src={coverImg} alt={post.title}
                className="w-full h-full object-cover aspect-[16/9] opacity-80 group-hover:scale-105 transition-transform duration-[3s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="bg-white relative">
          <div className="max-w-7xl mx-auto px-6 py-24">
            <div className="grid lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8 max-w-3xl">
                <div className="text-lg text-slate-600 leading-loose space-y-6">
                  {renderBlocks(post.content || '')}
                </div>
                {post.tags && post.tags.length > 0 && (
                  <div className="mt-20 pt-12 border-t border-slate-100 flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">{tag}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="lg:col-span-4 relative">
                <div className="sticky top-24 space-y-8">
                  <div className="p-8 rounded-[3rem] bg-[#1D1D1F] text-white shadow-2xl relative overflow-hidden group">
                    <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                    <div className="relative z-10">
                      <h4 className="text-2xl font-heading font-bold mb-4">Let us know what you're building.</h4>
                      <p className="text-white/50 text-sm mb-10 leading-relaxed font-medium">
                        Whether you're a startup finding your footing or an enterprise ready to scale, our architects are ready to walk you through the right agentic AI solutions for your team.
                      </p>
                      <button onClick={() => setView('contact')} className="w-full py-5 bg-[#E61739] hover:bg-[#c51431] rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl glow-red">
                        Send us your inquiry <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                  <div className="p-8 rounded-[3rem] border border-slate-200 bg-[#F5F5F7] group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] shrink-0"><Download size={22} /></div>
                      <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">Whitepaper</div>
                        <h5 className="text-base font-bold text-slate-900 leading-tight">The Future of AGI Ops 2025</h5>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 group-hover:text-[#E61739] transition-colors">Download PDF <ArrowRight size={12} /></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 px-6 bg-slate-50 border-t border-slate-200">
          <div className="max-w-7xl mx-auto text-center">
            <button onClick={() => setView('blog')} className="text-[#E61739] font-black uppercase tracking-widest text-[11px] hover:underline flex items-center gap-2 mx-auto">
              <ChevronLeft size={14} /> View All Insights
            </button>
          </div>
        </section>
      </div>
    );
  }

  // Static/placeholder article (no blogId)
  return (
    <div className="min-h-screen bg-white">
      <section className="relative bg-[#020202] pt-40 pb-20 overflow-hidden">
        <div className="mesh-container opacity-30">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <button onClick={() => setView('blog')}
              className="flex items-center gap-2 text-white/40 hover:text-[#E61739] font-black uppercase tracking-[0.2em] text-[10px] mb-12 transition-colors group">
              <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Insights
            </button>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E61739]/10 text-[#E61739] text-[11px] font-black uppercase tracking-widest mb-8 border border-[#E61739]/30">
              <Sparkles size={14} /> Strategic Analysis
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-10 leading-[1.1] tracking-tight">
              The Intelligence Layer: How <span className="text-shine-red">AGI is Redefining</span> Global Operations.
            </h1>
            <div className="flex flex-wrap items-center gap-8 border-t border-white/10 pt-10 text-white/50 text-xs font-bold uppercase tracking-[0.15em]">
               <div className="flex items-center gap-3">
                  <img loading="lazy" src={AUTHOR_1} alt="Elena Vance, KDCI AI content and operations author" className="w-10 h-10 rounded-full border border-white/20" />
                  <div><div className="text-white">Elena Vance</div><div className="text-[9px] opacity-60">Director of AI Strategy</div></div>
               </div>
               <div className="h-8 w-[1px] bg-white/10 hidden sm:block"></div>
               <div className="flex items-center gap-2"><Calendar size={14} className="text-[#E61739]" /> October 24, 2024</div>
               <div className="flex items-center gap-2"><Clock size={14} className="text-[#E61739]" /> 8 Min Read</div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative -mt-16 z-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_48px_100px_-20px_rgba(0,0,0,0.3)] group bg-black">
             <img loading="lazy" src={IMG_BLOG_HERO} alt="KDCI blog on AGI operations and AI-managed business workflow automation" className="w-full h-full object-cover aspect-[16/9] opacity-80 group-hover:scale-105 transition-transform duration-[3s] ease-out" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      <section className="bg-white relative">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-8 max-w-3xl">
              <article className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-slate-600 prose-p:leading-loose prose-p:mb-8">
                 <p className="text-2xl font-medium text-slate-800 leading-relaxed mb-12 first-letter:text-7xl first-letter:font-black first-letter:text-[#E61739] first-letter:mr-3 first-letter:float-left">
                    For over a decade, global offshoring was defined by a single metric: labor arbitrage. Success meant finding the lowest cost-per-seat and managing it through human effort. But as we enter 2025, that model is collapsing. The new era of operations is defined by the "Intelligence Layer"—a synthesis of elite talent and autonomous agents.
                 </p>
                 <h2 className="text-3xl font-heading font-bold text-slate-900 mt-16 mb-8">The Death of the Call Center Model</h2>
                 <p>Traditional BPO structures are built on headcount. If you have more tickets, you hire more people. This linear scaling creates massive operational friction and overhead.</p>
                 <p>At KDCI, we are seeing a shift toward "Outcome Units." Instead of renting hours, enterprises are building pods that leverage <strong>Agentic AI</strong> to handle the 70% of tasks that are repetitive.</p>
                 <div className="my-16 bg-slate-900 p-12 rounded-[3.5rem] text-white relative overflow-hidden">
                    <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                    <div className="relative z-10">
                      <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Sparkles className="text-[#E61739]" /> Three Pillars of the Intelligence Layer:</h3>
                      <div className="grid md:grid-cols-3 gap-10">
                        <div className="space-y-3"><div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E61739] border border-white/10"><BrainCircuit size={24}/></div><div className="font-bold text-white text-base">Autonomous Triage</div><p className="text-xs text-white/50 leading-relaxed">Instant intent detection and categorization for every inbound request.</p></div>
                        <div className="space-y-3"><div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E61739] border border-white/10"><Users size={24}/></div><div className="font-bold text-white text-base">Embedded Experts</div><p className="text-xs text-white/50 leading-relaxed">Top 1% domain specialists acting as the "Human-in-the-Loop".</p></div>
                        <div className="space-y-3"><div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-[#E61739] border border-white/10"><Database size={24}/></div><div className="font-bold text-white text-base">Real-time Feedback</div><p className="text-xs text-white/50 leading-relaxed">Continuous learning loops that update SOPs based on performance.</p></div>
                      </div>
                    </div>
                 </div>
                 <h2 className="text-3xl font-heading font-bold text-slate-900 mt-16 mb-8">Why the Philippines?</h2>
                 <p>The Philippines is uniquely positioned to lead this transformation. It's no longer about just English proficiency; it's about tech-savviness and cultural alignment with Western innovation.</p>
                 <div className="my-16 border-l-4 border-[#E61739] pl-10 py-4 relative">
                    <Quote size={60} className="absolute -top-6 -left-6 text-slate-50 opacity-80 -z-10" />
                    <p className="text-3xl font-heading font-bold text-slate-900 leading-tight mb-8">"Automation doesn't replace people; it elevates them."</p>
                    <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">MJ</div>
                       <div><div className="text-slate-900 font-bold text-sm">Marcus Jordon</div><div className="text-slate-400 text-[10px] font-black uppercase tracking-widest">VP of Operations, KDCI.ai</div></div>
                    </div>
                 </div>
              </article>
            </div>
            <div className="lg:col-span-4 relative">
               <div className="sticky top-24 space-y-8">
                  <div className="p-8 rounded-[3rem] bg-[#1D1D1F] text-white shadow-2xl relative overflow-hidden group">
                     <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                     <div className="relative z-10">
                        <h4 className="text-2xl font-heading font-bold mb-4">Let us know what you're building.</h4>
                        <p className="text-white/50 text-sm mb-10 leading-relaxed font-medium">Whether you're a startup finding your footing or an enterprise ready to scale, our architects are ready to walk you through the right agentic AI solutions for your team.</p>
                        <button onClick={() => setView('contact')} className="w-full py-5 bg-[#E61739] hover:bg-[#c51431] rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-xl glow-red">Send us your inquiry <ArrowRight size={18} /></button>
                     </div>
                  </div>
                  <div className="p-8 rounded-[3rem] border border-slate-200 bg-[#F5F5F7] group cursor-pointer hover:bg-white hover:shadow-xl transition-all">
                     <div className="flex items-start gap-5">
                        <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] shrink-0"><Download size={22} /></div>
                        <div>
                           <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">Whitepaper</div>
                           <h5 className="text-base font-bold text-slate-900 leading-tight">The Future of AGI Ops 2025</h5>
                           <div className="mt-4 flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 group-hover:text-[#E61739] transition-colors">Download PDF <ArrowRight size={12} /></div>
                        </div>
                     </div>
                  </div>
                  <div className="p-8 rounded-[3rem] border border-slate-100 bg-white shadow-sm">
                     <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">Key Takeaways</h4>
                     <ul className="space-y-4">
                        {["BPO models based on headcount are becoming obsolete.", "Hybrid pods (AI + Elite Humans) yield 3x higher velocity.", "Philippines is transitioning from 'Service' to 'Engineering' hub."].map((t, i) => (
                           <li key={i} className="flex gap-3 text-xs font-medium text-slate-600 leading-relaxed"><CheckCircle2 size={16} className="text-green-500 shrink-0" />{t}</li>
                        ))}
                     </ul>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-[#F5F5F7] border-t border-slate-200">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-end justify-between mb-16">
               <h3 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 tracking-tight">Read Next.</h3>
               <button onClick={() => setView('blog')} className="text-[11px] font-black uppercase tracking-widest text-[#E61739] hover:underline">View All Insights</button>
            </div>
            <div className="grid md:grid-cols-2 gap-10">
               <article onClick={() => setView('blog-detail')} className="group cursor-pointer bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden min-h-[200px]"><img loading="lazy" src={IMG_BLOG_1} alt="KDCI AI blog related article preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                  <div className="md:w-3/5 p-10 flex flex-col h-full">
                     <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Engineering</div>
                     <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors leading-tight">Why the Philippines is the New Epicenter for AI Engineering</h4>
                     <div className="mt-auto flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Story <ArrowRight size={14} className="text-[#E61739]" /></div>
                  </div>
               </article>
               <article onClick={() => setView('blog-detail')} className="group cursor-pointer bg-white rounded-[3.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row h-full">
                  <div className="md:w-2/5 relative overflow-hidden min-h-[200px]"><img loading="lazy" src={IMG_BLOG_3} alt="KDCI AI blog related article preview" className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" /></div>
                  <div className="md:w-3/5 p-10 flex flex-col h-full">
                     <div className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-4">Case Studies</div>
                     <h4 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors leading-tight">Scaling to 500+ Agents: A Case Study in Fintech</h4>
                     <div className="mt-auto flex items-center gap-2 text-slate-900 font-bold text-[10px] uppercase tracking-widest group-hover:translate-x-1 transition-transform">Read Story <ArrowRight size={14} className="text-[#E61739]" /></div>
                  </div>
               </article>
            </div>
         </div>
      </section>
    </div>
  );
};
