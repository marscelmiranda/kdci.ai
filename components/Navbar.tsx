
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronRight, Menu, X, ArrowRight, Search, TrendingUp, ArrowUpRight } from 'lucide-react';
import { ViewType } from '../types';
import { TOP_SERVICES, INDUSTRIES, RESOURCES } from '../data';
import { Logo } from './Logo';

const SEARCH_ITEMS = [
  // Services
  ...TOP_SERVICES.map(s => ({ title: s.name, type: 'Service', view: s.id })),
  // Industries
  ...INDUSTRIES.map(i => ({ title: `${i.name} Operations`, type: 'Industry', view: i.id })),
  // Resources
  ...RESOURCES.map(r => ({ title: r.name, type: 'Resource', view: r.id })),
  // Key Pages
  { title: 'Careers & Jobs', type: 'Page', view: 'careers' },
  { title: 'About Company', type: 'Page', view: 'company' },
  { title: 'Contact Us', type: 'Page', view: 'contact' },
  { title: 'Publisher Dashboard', type: 'Portal', view: 'login' }, // Hidden gem for employees
];

const POPULAR_SEARCHES = [
  { label: 'Generative AI', view: 'solutions-hub' },
  { label: 'Staff Augmentation', view: 'staff-aug' },
  { label: 'Customer Support', view: 'customer-support' },
  { label: 'Software Engineers', view: 'software-dev' },
  { label: 'Data Entry', view: 'property-mgmt' },
];

export const Navbar = ({ activeView, setView }: { activeView: ViewType, setView: (v: ViewType) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  
  // Search State
  const [isSearchMounted, setIsSearchMounted] = useState(false); // Controls DOM existence
  const [isSearchVisible, setIsSearchVisible] = useState(false); // Controls CSS opacity/transition
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchMounted) {
      document.body.style.overflow = 'hidden';
      // Focus input after animation starts
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSearchMounted]);

  // Animation Handlers
  const handleOpenSearch = () => {
    setIsSearchMounted(true);
    // Small delay to ensure DOM is mounted before adding the visible class for transition
    setTimeout(() => setIsSearchVisible(true), 10);
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
    // Wait for the duration-300 transition to finish before unmounting
    setTimeout(() => {
      setIsSearchMounted(false);
      setSearchQuery(""); // Reset query on close
    }, 300);
  };

  const handleSearchNav = (view: string) => {
    setView(view as ViewType);
    handleCloseSearch();
  };

  // Handle ESC key to close search
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchMounted) handleCloseSearch();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchMounted]);

  const filteredResults = SEARCH_ITEMS.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6);

  // All pages now feature a dark hero section, so we default to dark hero style when not scrolled.
  const isDarkHero = !isScrolled && !isSearchMounted;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav border-b border-black/5 py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <button onClick={() => setView('home')} className="group z-50 relative">
            <Logo isDarkHero={isDarkHero} />
          </button>

          <div className={`hidden md:flex items-center gap-8 text-sm font-medium relative transition-colors ${isDarkHero ? 'text-white/80' : 'text-[#1D1D1F]/70'}`}>
            
            {/* Solutions Dropdown */}
            <div className="group py-2" onMouseEnter={() => setIsSolutionsOpen(true)} onMouseLeave={() => setIsSolutionsOpen(false)}>
              <button onClick={() => setView('solutions-hub')} className={`flex items-center gap-1.5 transition-colors ${isSolutionsOpen || activeView === 'solutions-hub' ? 'text-[#E61739]' : 'hover:text-[#E61739]'}`}>
                Solutions <ChevronDown size={14} className={`transition-transform duration-300 ${isSolutionsOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSolutionsOpen && (
                <div className="absolute top-full right-0 pt-3 w-[920px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-[2.5rem] border border-black/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
                    <div className="flex p-8 gap-8 text-left">
                      <div className="w-7/12">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#86868b] mb-6">Service Hub</h4>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {TOP_SERVICES.map((item, idx) => (
                            <button key={idx} onClick={() => { setView(item.id as ViewType); setIsSolutionsOpen(false); }} className="text-left p-4 rounded-2xl hover:bg-[#F5F5F7] transition-all group/sol flex items-start gap-4 border border-transparent hover:border-black/5">
                              <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#86868b] group-hover/sol:text-[#E61739] shadow-sm">
                                <item.icon size={20} />
                              </div>
                              <div>
                                <div className="text-[13px] font-bold text-[#1D1D1F] group-hover/sol:text-[#E61739] transition-colors">{item.name}</div>
                                <p className="text-[11px] text-[#86868b] font-medium leading-snug mt-1">{item.desc}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="w-5/12 border-l border-black/5 pl-8">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#86868b] mb-6">Vertical Expertise</h4>
                        <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                          {INDUSTRIES.slice(0, 14).map((ind, idx) => (
                            <button key={idx} onClick={() => { setView(ind.id as ViewType); setIsSolutionsOpen(false); }} className="text-left p-2.5 rounded-xl hover:bg-[#F5F5F7] transition-all group/ind flex items-center gap-3 border border-transparent hover:border-black/5">
                              <div className="w-7 h-7 shrink-0 rounded-lg bg-white border border-black/5 flex items-center justify-center text-black/20 group-hover:ind:text-[#E61739] shadow-xs">
                                <ind.icon size={14} />
                              </div>
                              <span className="text-[12px] font-bold text-[#424245] group-hover/ind:text-[#1D1D1F] transition-colors truncate">{ind.name}</span>
                            </button>
                          ))}
                        </div>
                        <button onClick={() => { setView('solutions-hub'); setIsSolutionsOpen(false); }} className="mt-6 ml-1 text-[10px] font-black uppercase tracking-widest text-[#E61739] flex items-center gap-2 hover:translate-x-1 transition-transform">
                          Explore All 20+ Verticals <ArrowRight size={12} />
                        </button>
                      </div>
                    </div>
                    <div className="bg-[#F5F5F7] p-5 text-center border-t border-black/5">
                      <p className="text-[11px] text-[#86868b] font-bold">Scaling a complex operation? — <button onClick={() => setView('contact')} className="text-[#E61739] hover:underline">Book an Architect Call</button></p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div className="group py-2" onMouseEnter={() => setIsResourcesOpen(true)} onMouseLeave={() => setIsResourcesOpen(false)}>
              <button className={`flex items-center gap-1.5 transition-colors ${isResourcesOpen ? 'text-[#E61739]' : 'hover:text-[#E61739]'}`}>
                Resources <ChevronDown size={14} className={`transition-transform duration-300 ${isResourcesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isResourcesOpen && (
                <div className="absolute top-full right-0 pt-3 w-[640px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-[2.5rem] border border-black/10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.2)] overflow-hidden">
                    <div className="p-8 text-left">
                      <h4 className="text-[10px] font-black uppercase tracking-widest text-[#86868b] mb-6">Knowledge Hub</h4>
                      <div className="grid grid-cols-2 gap-4">
                        {RESOURCES.map((res, idx) => (
                          <button key={idx} onClick={() => { setView(res.id as ViewType); setIsResourcesOpen(false); }} className="text-left p-4 rounded-2xl hover:bg-[#F5F5F7] transition-all group/res flex items-start gap-4 border border-transparent hover:border-black/5">
                            <div className="w-10 h-10 shrink-0 rounded-xl bg-white border border-black/5 flex items-center justify-center text-[#86868b] group-hover/res:text-[#E61739] shadow-sm">
                              <res.icon size={20} />
                            </div>
                            <div>
                              <div className="text-[13px] font-bold text-[#1D1D1F] group-hover/res:text-[#E61739] transition-colors">{res.name}</div>
                              <p className="text-[11px] text-[#86868b] font-medium leading-snug mt-1">{res.desc}</p>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#F5F5F7] p-5 text-center border-t border-black/5">
                      <p className="text-[11px] text-[#86868b] font-bold">New whitepaper: "The Future of AGI Operations 2025" — <button onClick={() => setView('contact')} className="text-[#E61739] hover:underline">Download Now</button></p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button onClick={() => setView('company')} className={`hover:text-[#E61739] transition-colors ${activeView === 'company' ? 'text-[#E61739]' : ''}`}>Company</button>
            <button onClick={() => setView('careers')} className={`hover:text-[#E61739] transition-colors ${activeView === 'careers' ? 'text-[#E61739]' : ''}`}>Careers</button>
            
            {/* Search Trigger */}
            <button 
              onClick={handleOpenSearch}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkHero ? 'hover:bg-white/10 text-white' : 'hover:bg-black/5 text-[#1D1D1F]'}`}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <button onClick={() => setView('contact')} className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md hover:shadow-lg ${isDarkHero ? 'bg-white text-black hover:bg-white/90' : 'bg-[#E61739] text-white hover:bg-[#c51431]'}`}>
              Contact Us
            </button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={handleOpenSearch}
              className={`transition-colors ${isDarkHero ? 'text-white' : 'text-[#1D1D1F]'}`}
            >
              <Search size={24} />
            </button>
            <button className={`transition-colors ${isDarkHero ? 'text-white' : 'text-[#1D1D1F]'}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 animate-in slide-in-from-top-2 shadow-xl">
            <div className="flex flex-col gap-5 text-sm font-bold text-[#1D1D1F]">
              <button className="flex items-center justify-between py-2 border-b border-black/5" onClick={() => { setView('solutions-hub'); setIsMobileMenuOpen(false); }}>Solutions <ChevronRight size={16} /></button>
              <button className="flex items-center justify-between py-2 border-b border-black/5 text-left" onClick={() => { setView('blog'); setIsMobileMenuOpen(false); }}>Resources <ChevronRight size={16} /></button>
              <button className="py-2 border-b border-black/5 text-left" onClick={() => { setView('company'); setIsMobileMenuOpen(false); }}>About Us</button>
              <button className="py-2 border-b border-black/5 text-left" onClick={() => { setView('careers'); setIsMobileMenuOpen(false); }}>Careers</button>
              <button onClick={() => { setView('contact'); setIsMobileMenuOpen(false); }} className="mt-4 w-full bg-[#E61739] text-white py-4 rounded-xl font-bold">Contact Us</button>
            </div>
          </div>
        )}
      </nav>

      {/* Full Screen Search Modal - Dark Themed with Smooth Fade In/Out */}
      {isSearchMounted && (
        <div 
          className={`fixed inset-0 z-[60] bg-[#1A1423]/90 backdrop-blur-md flex flex-col transition-all duration-300 ease-in-out ${isSearchVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'}`}
        >
          {/* Close Button Header */}
          <div className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-end">
            <button 
              onClick={handleCloseSearch}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all group"
            >
              <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-grow flex flex-col items-center pt-20 px-6 max-w-4xl mx-auto w-full">
            <h2 className={`text-4xl md:text-5xl font-heading font-bold text-white mb-8 text-center transition-all duration-500 delay-100 ${isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              What are you looking for?
            </h2>
            
            <div className={`relative w-full mb-16 transition-all duration-500 delay-200 ${isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <input 
                ref={searchInputRef}
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Type keywords..." 
                className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#E61739] transition-all text-center"
              />
              <button className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#E61739] transition-colors">
                <Search size={32} />
              </button>
            </div>

            {searchQuery ? (
              // Live Results
              <div className={`w-full transition-all duration-300 ${isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">Best Matches</h3>
                <div className="grid gap-4">
                  {filteredResults.length > 0 ? filteredResults.map((result, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSearchNav(result.view)}
                      className="flex items-center justify-between p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 group transition-all text-left"
                    >
                      <div>
                        <div className="text-xl font-bold text-white group-hover:text-[#E61739] transition-colors">{result.title}</div>
                        <div className="text-xs font-medium text-white/40 mt-1">{result.type}</div>
                      </div>
                      <ArrowUpRight size={20} className="text-white/20 group-hover:text-[#E61739] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                    </button>
                  )) : (
                    <div className="text-center py-12 text-white/40 font-medium text-lg">
                      No matches found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            ) : (
              // Popular Searches / Quick Links
              <div className={`w-full transition-all duration-500 delay-300 ${isSearchVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 text-center">Popular Searches</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSearchNav(item.view)}
                      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#E61739] hover:text-[#E61739] text-white/70 font-bold text-sm transition-all flex items-center gap-2 group"
                    >
                      <TrendingUp size={14} className="text-white/40 group-hover:text-[#E61739]" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
