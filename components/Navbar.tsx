import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  ArrowRight,
  Search,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { ViewType } from "../types";
import { TOP_SERVICES, INDUSTRIES, RESOURCES } from "../data";
import { Logo } from "./Logo";
import { getPath } from "../lib/routes";

const UNLISTED_RESOURCE_IDS = new Set(["webinars", "guides"]);
const NAV_RESOURCES = RESOURCES.filter((r) => !UNLISTED_RESOURCE_IDS.has(r.id));

type SearchItem = { title: string; type: string; view: string; slug?: string };

const STATIC_SEARCH_ITEMS: SearchItem[] = [
  ...TOP_SERVICES.map((s) => ({ title: s.name, type: "Service", view: s.id })),
  ...INDUSTRIES.map((i) => ({
    title: `${i.name} Operations`,
    type: "Industry",
    view: i.id,
  })),
  ...NAV_RESOURCES.map((r) => ({
    title: r.name,
    type: "Resource",
    view: r.id,
  })),
  { title: "Careers & Jobs", type: "Page", view: "careers" },
  { title: "About Company", type: "Page", view: "company" },
  { title: "Contact Us", type: "Page", view: "contact" },
  { title: "Publisher Dashboard", type: "Portal", view: "login" },
];

const POPULAR_SEARCHES = [
  { label: "Generative AI", view: "solutions-hub" },
  { label: "AI Lead Generation", view: "ai-outbound" },
  { label: "Customer Experience", view: "customer-support" },
];

const highlightAI = (text: string) =>
  text.split(/(AI)/).map((part, i) =>
    part === "AI" ? (
      <span key={i} className="text-[#E61739]">
        {part}
      </span>
    ) : (
      part
    ),
  );

export const Navbar = ({
  activeView,
  setView,
}: {
  activeView: ViewType;
  setView: (v: ViewType) => void;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isResourcesOpen, setIsResourcesOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileInsightsOpen, setIsMobileInsightsOpen] = useState(false);

  const [isSearchMounted, setIsSearchMounted] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [dynamicItems, setDynamicItems] = useState<SearchItem[]>([]);
  const blogsFetched = useRef(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isSearchMounted) {
      document.body.style.overflow = "hidden";
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isSearchMounted]);

  const handleOpenSearch = () => {
    setIsSearchMounted(true);
    setTimeout(() => setIsSearchVisible(true), 10);
    if (!blogsFetched.current) {
      blogsFetched.current = true;
      fetch('/api/blog')
        .then(r => r.ok ? r.json() : [])
        .then((posts: any[]) => {
          setDynamicItems(posts.map(p => ({
            title: p.title,
            type: 'Blog Post',
            view: 'blog-detail',
            slug: p.slug || String(p.id),
          })));
        })
        .catch(() => {});
    }
  };

  const handleCloseSearch = () => {
    setIsSearchVisible(false);
    setTimeout(() => {
      setIsSearchMounted(false);
      setSearchQuery("");
    }, 300);
  };

  const handleSearchNav = (view: string, slug?: string) => {
    if (slug && view === 'blog-detail') {
      handleCloseSearch();
      window.location.href = `/blogs/${slug}/`;
      return;
    }
    setView(view as ViewType);
    handleCloseSearch();
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isSearchMounted) handleCloseSearch();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isSearchMounted]);

  const allSearchItems = [...STATIC_SEARCH_ITEMS, ...dynamicItems];
  const filteredResults = allSearchItems.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()),
  ).slice(0, 8);

  const isDarkHero = !isScrolled && !isSearchMounted;

  const nav = (e: React.MouseEvent, view: ViewType, ...closers: (() => void)[]) => {
    e.preventDefault();
    setView(view);
    closers.forEach(fn => fn());
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "glass-nav border-b border-black/5 py-3" : "bg-transparent py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <a
            href="/"
            onClick={e => nav(e, "home")}
            className="group z-50 relative"
          >
            <Logo isDarkHero={isDarkHero} />
          </a>

          {/* Desktop Nav */}
          <div
            className={`hidden md:flex items-center gap-8 text-sm font-medium relative transition-colors ${isDarkHero ? "text-white/80" : "text-[#1D1D1F]/70"}`}
          >
            {/* Solutions Dropdown */}
            <div
              className="group py-2"
              onMouseEnter={() => setIsSolutionsOpen(true)}
              onMouseLeave={() => setIsSolutionsOpen(false)}
            >
              <a
                href="/solutions/"
                onClick={e => nav(e, "solutions-hub")}
                className={`flex items-center gap-1.5 transition-colors ${isSolutionsOpen || activeView === "solutions-hub" ? "text-[#E61739]" : "hover:text-[#E61739]"}`}
              >
                What We Do{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isSolutionsOpen ? "rotate-180" : ""}`}
                />
              </a>
              {isSolutionsOpen && (
                <div className="absolute top-full left-0 pt-3 w-[380px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-[1.5rem] border border-black/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] overflow-hidden">
                    <div className="p-3">
                      {TOP_SERVICES.map((item, idx) => (
                        <a
                          key={idx}
                          href={getPath(item.id as ViewType)}
                          onClick={e => nav(e, item.id as ViewType, () => setIsSolutionsOpen(false))}
                          className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 hover:bg-[#F5F5F7] transition-colors group/sol"
                        >
                          <div className="w-7 h-7 shrink-0 rounded-lg bg-[#F5F5F7] group-hover/sol:bg-[#E61739]/10 flex items-center justify-center text-[#86868b] group-hover/sol:text-[#E61739] transition-all">
                            <item.icon size={14} />
                          </div>
                          <span className="text-[13px] font-semibold text-[#1D1D1F] group-hover/sol:text-[#E61739] transition-colors">
                            {highlightAI(item.name)}
                          </span>
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-black/5 px-4 py-3 flex items-center justify-between bg-[#F9F9F9]">
                      <p className="text-[11px] text-[#86868b] font-medium">
                        Not sure where to start?
                      </p>
                      <a
                        href="/contact-us/"
                        onClick={e => nav(e, "contact", () => setIsSolutionsOpen(false))}
                        className="text-[11px] font-bold text-[#E61739] flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Talk to us <ArrowRight size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Resources / Insights Dropdown */}
            <div
              className="relative group py-2"
              onMouseEnter={() => setIsResourcesOpen(true)}
              onMouseLeave={() => setIsResourcesOpen(false)}
            >
              <a
                href="/insights/"
                onClick={e => nav(e, "insights", () => setIsResourcesOpen(false))}
                className={`flex items-center gap-1.5 transition-colors ${isResourcesOpen || activeView === "insights" ? "text-[#E61739]" : "hover:text-[#E61739]"}`}
              >
                Insights{" "}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${isResourcesOpen ? "rotate-180" : ""}`}
                />
              </a>
              {isResourcesOpen && (
                <div className="absolute top-full left-0 pt-3 w-[480px] animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white rounded-[1.5rem] border border-black/10 shadow-[0_24px_60px_-12px_rgba(0,0,0,0.18)] overflow-hidden">
                    <div className="p-3 grid grid-cols-2 gap-x-2">
                      {/* Left column */}
                      <div>
                        {NAV_RESOURCES.slice(0, 4).map((res, idx) => (
                          <a
                            key={idx}
                            href={getPath(res.id as ViewType)}
                            onClick={e => nav(e, res.id as ViewType, () => setIsResourcesOpen(false))}
                            className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 hover:bg-[#F5F5F7] transition-colors group/res"
                          >
                            <div className="w-7 h-7 shrink-0 rounded-lg bg-[#F5F5F7] group-hover/res:bg-[#E61739]/10 flex items-center justify-center text-[#86868b] group-hover/res:text-[#E61739] transition-all">
                              <res.icon size={14} />
                            </div>
                            <span className="text-[13px] font-semibold text-[#1D1D1F] group-hover/res:text-[#E61739] transition-colors">
                              {res.name}
                            </span>
                          </a>
                        ))}
                      </div>
                      {/* Right column */}
                      <div>
                        {NAV_RESOURCES.slice(4).map((res, idx) => (
                          <a
                            key={idx}
                            href={getPath(res.id as ViewType)}
                            onClick={e => nav(e, res.id as ViewType, () => setIsResourcesOpen(false))}
                            className="w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 hover:bg-[#F5F5F7] transition-colors group/res"
                          >
                            <div className="w-7 h-7 shrink-0 rounded-lg bg-[#F5F5F7] group-hover/res:bg-[#E61739]/10 flex items-center justify-center text-[#86868b] group-hover/res:text-[#E61739] transition-all">
                              <res.icon size={14} />
                            </div>
                            <span className="text-[13px] font-semibold text-[#1D1D1F] group-hover/res:text-[#E61739] transition-colors">
                              {res.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="border-t border-black/5 px-4 py-3 flex items-center justify-between bg-[#F9F9F9]">
                      <p className="text-[11px] text-[#86868b] font-medium">
                        Looking for something specific?
                      </p>
                      <a
                        href="/contact-us/"
                        onClick={e => nav(e, "contact", () => setIsResourcesOpen(false))}
                        className="text-[11px] font-bold text-[#E61739] flex items-center gap-1 hover:gap-2 transition-all"
                      >
                        Ask us <ArrowRight size={10} />
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <a
              href="/who-we-are/"
              onClick={e => nav(e, "company")}
              className={`hover:text-[#E61739] transition-colors ${activeView === "company" ? "text-[#E61739]" : ""}`}
            >
              Who We Are
            </a>
            <a
              href="/careers/"
              onClick={e => nav(e, "careers")}
              className={`hover:text-[#E61739] transition-colors ${activeView === "careers" ? "text-[#E61739]" : ""}`}
            >
              Careers
            </a>

            {/* Search Trigger */}
            <button
              onClick={handleOpenSearch}
              className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${isDarkHero ? "hover:bg-white/10 text-white" : "hover:bg-black/5 text-[#1D1D1F]"}`}
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            <a
              href="/contact-us/"
              onClick={e => nav(e, "contact")}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all shadow-md hover:shadow-lg ${isDarkHero ? "bg-white text-black hover:bg-white/90" : "bg-[#E61739] text-white hover:bg-[#c51431]"}`}
            >
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={handleOpenSearch}
              className={`transition-colors ${isDarkHero ? "text-white" : "text-[#1D1D1F]"}`}
            >
              <Search size={24} />
            </button>
            <button
              className={`transition-colors ${isDarkHero ? "text-white" : "text-[#1D1D1F]"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-black/5 p-6 animate-in slide-in-from-top-2 shadow-xl max-h-[80vh] overflow-y-auto">
            <div className="flex flex-col text-sm font-bold text-[#1D1D1F]">
              {/* What We Do */}
              <div className="border-b border-black/5 pb-2">
                <a
                  href="/solutions/"
                  onClick={e => nav(e, "solutions-hub", () => setIsMobileMenuOpen(false))}
                  className="flex items-center justify-between py-3 w-full"
                >
                  <span>What We Do</span>
                  <ArrowRight size={14} className="text-[#E61739]" />
                </a>
                <div className="flex flex-col gap-1 pl-3">
                  {TOP_SERVICES.map((item, idx) => (
                    <a
                      key={idx}
                      href={getPath(item.id as ViewType)}
                      onClick={e => nav(e, item.id as ViewType, () => setIsMobileMenuOpen(false))}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F7] text-left w-full group"
                    >
                      <div className="w-7 h-7 shrink-0 rounded-lg bg-[#F5F5F7] group-hover:bg-[#E61739]/10 flex items-center justify-center text-[#86868b] group-hover:text-[#E61739] transition-all">
                        <item.icon size={14} />
                      </div>
                      <span className="text-[13px] font-semibold text-[#1D1D1F] group-hover:text-[#E61739] transition-colors">
                        {item.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Insights accordion */}
              <button
                className="flex items-center justify-between py-3 border-b border-black/5"
                onClick={() => setIsMobileInsightsOpen(!isMobileInsightsOpen)}
              >
                Insights
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isMobileInsightsOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isMobileInsightsOpen && (
                <div className="flex flex-col gap-1 py-2 pl-3 border-b border-black/5">
                  {NAV_RESOURCES.map((res, idx) => (
                    <a
                      key={idx}
                      href={getPath(res.id as ViewType)}
                      onClick={e => nav(e, res.id as ViewType, () => { setIsMobileMenuOpen(false); setIsMobileInsightsOpen(false); })}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-[#F5F5F7] text-left w-full group"
                    >
                      <div className="w-7 h-7 shrink-0 rounded-lg bg-[#F5F5F7] group-hover:bg-[#E61739]/10 flex items-center justify-center text-[#86868b] group-hover:text-[#E61739] transition-all">
                        <res.icon size={14} />
                      </div>
                      <span className="text-[13px] font-semibold text-[#1D1D1F] group-hover:text-[#E61739] transition-colors">
                        {res.name}
                      </span>
                    </a>
                  ))}
                </div>
              )}

              <a
                href="/who-we-are/"
                onClick={e => nav(e, "company", () => setIsMobileMenuOpen(false))}
                className="block py-3 border-b border-black/5 text-left"
              >
                Who We Are
              </a>
              <a
                href="/careers/"
                onClick={e => nav(e, "careers", () => setIsMobileMenuOpen(false))}
                className="block py-3 border-b border-black/5 text-left"
              >
                Careers
              </a>
              <a
                href="/contact-us/"
                onClick={e => nav(e, "contact", () => setIsMobileMenuOpen(false))}
                className="mt-4 w-full bg-[#E61739] text-white py-4 rounded-xl font-bold flex items-center justify-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Full Screen Search Modal */}
      {isSearchMounted && (
        <div
          className={`fixed inset-0 z-[60] bg-[#1A1423]/90 backdrop-blur-md flex flex-col transition-all duration-300 ease-in-out ${isSearchVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}`}
        >
          <div className="max-w-7xl mx-auto w-full px-6 py-6 flex justify-end">
            <button
              onClick={handleCloseSearch}
              className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all group"
            >
              <X
                size={24}
                className="group-hover:rotate-90 transition-transform duration-300"
              />
            </button>
          </div>

          <div className="flex-grow flex flex-col items-center pt-20 px-6 max-w-4xl mx-auto w-full">
            <h2
              className={`text-4xl md:text-5xl font-heading font-bold text-white mb-8 text-center transition-all duration-500 delay-100 ${isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              What are you looking for?
            </h2>

            <div
              className={`relative w-full mb-16 transition-all duration-500 delay-200 ${isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && filteredResults.length > 0) {
                    handleSearchNav(filteredResults[0].view, filteredResults[0].slug);
                  }
                }}
                placeholder="Type keywords..."
                className="w-full bg-transparent border-b-2 border-white/20 py-6 text-3xl md:text-5xl font-medium text-white placeholder:text-white/20 focus:outline-none focus:border-[#E61739] transition-all text-center"
              />
              <button
                type="button"
                onClick={() => filteredResults.length > 0 ? handleSearchNav(filteredResults[0].view) : undefined}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/40 hover:text-[#E61739] transition-colors"
              >
                <Search size={32} />
              </button>
            </div>

            {searchQuery ? (
              <div
                className={`w-full transition-all duration-300 ${isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6">
                  Best Matches
                </h3>
                <div className="grid gap-4">
                  {filteredResults.length > 0 ? (
                    filteredResults.map((result, idx) => (
                      <a
                        key={idx}
                        href={result.slug ? `/blogs/${result.slug}/` : getPath(result.view as ViewType)}
                        onClick={e => { e.preventDefault(); handleSearchNav(result.view, result.slug); }}
                        className="flex items-center justify-between p-6 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 group transition-all text-left"
                      >
                        <div>
                          <div className="text-xl font-bold text-white group-hover:text-[#E61739] transition-colors">
                            {result.title}
                          </div>
                          <div className="text-xs font-medium text-white/40 mt-1">
                            {result.type}
                          </div>
                        </div>
                        <ArrowUpRight
                          size={20}
                          className="text-white/20 group-hover:text-[#E61739] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"
                        />
                      </a>
                    ))
                  ) : (
                    <div className="text-center py-12 text-white/40 font-medium text-lg">
                      No matches found for "{searchQuery}"
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div
                className={`w-full transition-all duration-500 delay-300 ${isSearchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <h3 className="text-xs font-black uppercase tracking-widest text-white/40 mb-6 text-center">
                  Popular Searches
                </h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {POPULAR_SEARCHES.map((item, idx) => (
                    <a
                      key={idx}
                      href={getPath(item.view as ViewType)}
                      onClick={e => { e.preventDefault(); handleSearchNav(item.view); }}
                      className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:border-[#E61739] hover:text-[#E61739] text-white/70 font-bold text-sm transition-all flex items-center gap-2 group"
                    >
                      <TrendingUp size={14} className="text-white/40 group-hover:text-[#E61739] transition-colors" />
                      {item.label}
                    </a>
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
