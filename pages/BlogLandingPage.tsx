
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Clock, Calendar, Search, BrainCircuit, Globe, 
  Terminal, FileText, User, Sparkles, Loader2
} from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { 
  IMG_BLOG_HERO, IMG_BLOG_1, IMG_BLOG_2, IMG_BLOG_3, IMG_BLOG_4, 
  IMG_BLOG_5, IMG_BLOG_6, IMG_ECOM_HERO, IMG_PROP_HERO, IMG_CX_HERO 
} from '../data';

interface Post {
  id: number | string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  img: string;
  author: string;
  isLive?: boolean;
}

const CATEGORY_ICON: Record<string, React.ElementType> = {
  'Engineering': Terminal,
  'Case Studies': FileText,
  'AI Operations': BrainCircuit,
  'Future of Work': Globe,
  'Company News': FileText,
  'Industry Insights': Globe,
};

const STATIC_POSTS: Post[] = [
  { id: 's1', title: "Why the Philippines is the New Epicenter for AI Engineering", excerpt: "Unpacking the talent shift as Manila transforms from a support hub into a global node for agentic AI development.", category: "Engineering", date: "Oct 12, 2024", readTime: "6 min read", img: IMG_BLOG_1, author: "Sarah Chen" },
  { id: 's2', title: "Scaling to 500+ Agents: A Case Study in Fintech Support", excerpt: "How a high-growth fintech reduced OpEx by 65% while improving CSAT using managed offshore intelligence.", category: "Case Studies", date: "Sep 28, 2024", readTime: "8 min read", img: IMG_BLOG_2, author: "Michael Ross" },
  { id: 's3', title: "Prompt Engineering vs. Software Engineering: The Merging Path", excerpt: "Why the developers of 2025 will spend as much time talking to code as they do writing it.", category: "AI Operations", date: "Sep 15, 2024", readTime: "5 min read", img: IMG_BLOG_3, author: "Devin Zhao" },
  { id: 's4', title: "The Future of CX: Moving Beyond Ticketing to Real-time Agency", excerpt: "Traditional support is dead. Agentic AI is allowing pods to resolve issues before the user even knows they exist.", category: "AI Operations", date: "Aug 30, 2024", readTime: "7 min read", img: IMG_BLOG_4, author: "Sarah Chen" },
  { id: 's5', title: "How Global Logistics Firms are Scaling with Managed Pods", excerpt: "Exploring the operational blueprint for managing high-volume data and tracking across multiple timezones.", category: "Case Studies", date: "Aug 12, 2024", readTime: "10 min read", img: IMG_BLOG_5, author: "Marcus Jordon" },
  { id: 's6', title: "Building the Modern Offshore Strategy for Mid-Market Firms", excerpt: "You don't need enterprise budgets to build enterprise-scale teams. A tactical guide to intelligent scaling.", category: "Future of Work", date: "Jul 25, 2024", readTime: "9 min read", img: IMG_BLOG_6, author: "Sarah Chen" },
  { id: 's7', title: "Cybersecurity in the AGI Era: Vetting Your Offshore Partner", excerpt: "Why SOC-2 compliance and industrial-grade security are the new baseline for global talent partners.", category: "Engineering", date: "Jul 10, 2024", readTime: "6 min read", img: IMG_ECOM_HERO, author: "Michael Ross" },
  { id: 's8', title: "PropTech Revolution: AI-Managed Leasing Desks in Manila", excerpt: "How real estate giants are using specialized offshore teams to handle the entire tenant lifecycle.", category: "AI Operations", date: "Jun 22, 2024", readTime: "5 min read", img: IMG_PROP_HERO, author: "Devin Zhao" },
  { id: 's9', title: "Measuring ROI in AI-Augmented Operations: The Hard Truth", excerpt: "Moving beyond 'headcount cost' to 'outcome velocity'. How to build a modern ROI model for your team.", category: "Future of Work", date: "Jun 05, 2024", readTime: "12 min read", img: IMG_CX_HERO, author: "Marcus Jordon" },
];

const FALLBACK_IMGS = [IMG_BLOG_1, IMG_BLOG_2, IMG_BLOG_3, IMG_BLOG_4, IMG_BLOG_5, IMG_BLOG_6];

export const BlogLandingPage = ({ setView, onSelectBlog }: { setView: (v: ViewType) => void; onSelectBlog?: (id: number | null) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [livePosts, setLivePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/blog')
      .then(r => r.ok ? r.json() : [])
      .then((data: any[]) => {
        setLivePosts(data.map((p, i) => ({
          id: p.id,
          title: p.title,
          excerpt: p.excerpt || '',
          category: p.category || 'AI Operations',
          date: p.published_at ? new Date(p.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '',
          readTime: '5 min read',
          img: p.cover_image || FALLBACK_IMGS[i % FALLBACK_IMGS.length],
          author: p.author || 'KDCI Editorial',
          isLive: true,
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const allPosts: Post[] = [...livePosts, ...STATIC_POSTS];
  const categories = ["All", ...Array.from(new Set(allPosts.map(p => p.category))).sort()];

  const featuredPost = allPosts[0];
  const filteredPosts = allPosts.slice(1).filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative pt-48 pb-32 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={IMG_BLOG_HERO} alt="Insights" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Insights Hub" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Operational</span><br/>
            <span className="text-[#E61739]">Intelligence.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            Strategic insights on AGI-ready operations, global talent strategy, and high-velocity business outcomes.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          {/* Filters */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-20">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar max-w-full">
              {categories.map((cat) => (
                <button key={cat} onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all border ${
                    activeCategory === cat
                      ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-lg'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-400 hover:text-slate-900'
                  }`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white transition-all placeholder:text-slate-400" />
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 size={36} className="animate-spin text-[#E61739]/40" />
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {activeCategory === "All" && !searchQuery && featuredPost && (
                <div className="mb-20">
                  <div onClick={() => { if (featuredPost.isLive && onSelectBlog) onSelectBlog(Number(featuredPost.id)); else if (onSelectBlog) onSelectBlog(null); setView('blog-detail'); }}
                    className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-16 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                    <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
                    {featuredPost.isLive && (
                      <div className="absolute top-8 right-8 px-3 py-1.5 rounded-full bg-[#E61739]/20 border border-[#E61739]/30 text-[#E61739] text-[10px] font-black uppercase tracking-widest">
                        New
                      </div>
                    )}
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                      <div className="md:w-2/3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E61739]/10 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-6 border border-[#E61739]/20">
                          <Sparkles size={12} /> Featured Insight
                        </div>
                        <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 group-hover:text-[#E61739] transition-colors leading-tight">
                          {featuredPost.title}
                        </h2>
                        <p className="text-white/60 text-lg mb-8 leading-relaxed">{featuredPost.excerpt}</p>
                        <div className="flex flex-wrap gap-6 mb-8 border-t border-white/10 pt-8">
                          {featuredPost.date && <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest"><Calendar size={14} /> {featuredPost.date}</div>}
                          <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest"><Clock size={14} /> {featuredPost.readTime}</div>
                          <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest"><User size={14} /> {featuredPost.author}</div>
                        </div>
                        <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-[#E61739] hover:text-white transition-all flex items-center gap-2">
                          Read Article <ArrowRight size={16} />
                        </button>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                        <div className="w-64 h-64 rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-700 shadow-2xl relative">
                          <img src={featuredPost.img} alt={featuredPost.title} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-[#E61739]/10 mix-blend-overlay"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Grid */}
              <div className="grid md:grid-cols-2 gap-12">
                {filteredPosts.map((post) => {
                  const Icon = CATEGORY_ICON[post.category] || FileText;
                  return (
                    <div key={post.id} onClick={() => { if (post.isLive && onSelectBlog) onSelectBlog(Number(post.id)); else if (onSelectBlog) onSelectBlog(null); setView('blog-detail'); }}
                      className="group flex flex-col h-full bg-[#F5F5F7] rounded-[3rem] p-10 border border-black/[0.03] hover:shadow-2xl hover:bg-white transition-all duration-500 cursor-pointer relative">
                      {post.isLive && (
                        <div className="absolute top-8 right-8 px-2.5 py-1 rounded-full bg-[#E61739]/10 border border-[#E61739]/20 text-[#E61739] text-[9px] font-black uppercase tracking-widest">New</div>
                      )}
                      <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-[#E61739] group-hover:scale-110 transition-transform">
                            <Icon size={24} />
                          </div>
                          <div>
                            <div className="text-xs font-black uppercase tracking-widest text-[#E61739]">{post.category}</div>
                            <div className="font-bold text-slate-900 text-xs text-slate-400">{post.date}</div>
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors leading-snug">{post.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-8 border-t border-black/5 mt-auto">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Clock size={12} /> {post.readTime}
                        </div>
                        <button className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          Read Story <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPosts.length === 0 && allPosts.length > 1 && (
                <div className="text-center py-20 text-slate-400">
                  <p className="text-xl font-medium">No articles found matching "{searchQuery}"</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }} className="mt-4 text-[#E61739] font-bold hover:underline">Clear Filters</button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto bg-[#1D1D1F] rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Weekly Intelligence.</h2>
            <p className="text-white/50 text-xl font-medium mb-10 max-w-2xl mx-auto">
              Join 15,000+ operations leaders receiving our proprietary AGI playbook. No fluff, just operational architecture.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
              <input type="email" placeholder="Work Email"
                className="px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/30 focus:outline-none focus:border-[#E61739] w-full font-bold" />
              <button className="px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold hover:bg-[#c51431] transition-all glow-red shadow-xl whitespace-nowrap">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
