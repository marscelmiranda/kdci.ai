import React, { useState, useEffect } from 'react';
import {
  ArrowRight, Clock, Calendar, Search, BrainCircuit, Globe,
  Terminal, FileText, User, Sparkles,
} from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { IMG_BLOG_HERO } from '../data';
import { getBlogPosts, type BlogPost } from '../contentStore';

const CATEGORY_ICON: Record<string, React.ElementType> = {
  'Engineering':    Terminal,
  'Case Studies':   FileText,
  'AI Operations':  BrainCircuit,
  'Future of Work': Globe,
};

export const BlogLandingPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery]       = useState("");
  const [allPosts, setAllPosts]             = useState<BlogPost[]>([]);
  const [loading, setLoading]               = useState(true);

  useEffect(() => {
    getBlogPosts()
      .then(data => setAllPosts(data))
      .finally(() => setLoading(false));
  }, []);

  const categories = ["All", ...Array.from(new Set(allPosts.map(p => p.category))).sort()];
  const featuredPost = allPosts.find(p => p.featured) ?? allPosts[0];
  const nonFeatured  = allPosts.filter(p => p !== featuredPost);

  const filteredPosts = nonFeatured.filter(post => {
    const matchesCategory = activeCategory === "All" || post.category === activeCategory;
    const matchesSearch   = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
              <input type="text" placeholder="Search..." value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white transition-all placeholder:text-slate-400" />
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"/>
            </div>
          )}

          {!loading && (
            <>
              {/* Featured Post */}
              {featuredPost && activeCategory === "All" && !searchQuery && (
                <div className="mb-20">
                  <div onClick={() => setView('blog-detail')}
                    className="bg-[#1D1D1F] rounded-[4rem] p-12 md:p-16 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all">
                    <div className="mesh-container opacity-20 pointer-events-none"><div className="blob blob-purple"></div></div>
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
                          <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest"><Calendar size={14} /> {featuredPost.date}</div>
                          <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest"><Clock size={14} /> {featuredPost.read_time}</div>
                          <div className="flex items-center gap-3 text-white/50 text-xs font-bold uppercase tracking-widest"><User size={14} /> {featuredPost.author}</div>
                        </div>
                        <button className="px-8 py-3 bg-white text-black rounded-xl font-bold hover:bg-[#E61739] hover:text-white transition-all flex items-center gap-2">
                          Read Article <ArrowRight size={16} />
                        </button>
                      </div>
                      <div className="md:w-1/3 flex justify-center">
                        <div className="w-64 h-64 rounded-[2.5rem] overflow-hidden border border-white/10 group-hover:scale-105 transition-transform duration-700 shadow-2xl relative">
                          {(featuredPost.img || featuredPost.image_url)
                            ? <img src={featuredPost.img || featuredPost.image_url} alt={featuredPost.title} className="w-full h-full object-cover" />
                            : <div className="w-full h-full bg-white/5 flex items-center justify-center text-white/20"><FileText size={48} /></div>
                          }
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
                  const Icon = CATEGORY_ICON[post.category] ?? FileText;
                  return (
                    <div key={post.id} onClick={() => setView('blog-detail')}
                      className="group flex flex-col h-full bg-[#F5F5F7] rounded-[3rem] p-10 border border-black/[0.03] hover:shadow-2xl hover:bg-white transition-all duration-500 cursor-pointer">
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
                        {(post.img || post.image_url) && (
                          <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                            <img src={post.img || post.image_url} alt="" className="w-full h-full object-cover" />
                          </div>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-[#E61739] transition-colors leading-snug">{post.title}</h3>
                      <p className="text-slate-500 font-medium leading-relaxed mb-8 flex-grow">{post.excerpt}</p>
                      <div className="flex items-center justify-between pt-8 border-t border-black/5 mt-auto">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                          <Clock size={12} /> {post.read_time}
                        </div>
                        <button className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-widest group-hover:translate-x-1 transition-transform">
                          Read Story <ArrowRight size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {filteredPosts.length === 0 && !loading && (
                <div className="text-center py-20 text-slate-400">
                  <p className="text-xl font-medium">No articles found{searchQuery ? ` matching "${searchQuery}"` : ''}.</p>
                  <button onClick={() => { setSearchQuery(""); setActiveCategory("All"); }}
                    className="mt-4 text-[#E61739] font-bold hover:underline">Clear Filters</button>
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
              <button className="px-8 py-4 bg-[#E61739] text-white rounded-2xl font-bold hover:bg-[#c51431] transition-all glow-red shadow-xl whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
