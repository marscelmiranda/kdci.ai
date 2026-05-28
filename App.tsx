
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Cpu, Users, TrendingUp, Layers, Zap, CheckCircle2, ChevronRight, ChevronDown, ChevronLeft, Menu, X, Code, Search, Building2, Palette, MessageSquare, BarChart3, Globe, ArrowRight, ShieldCheck, ZapOff, MousePointer2, ScanSearch, BrainCircuit, Timer, UserCheck, ClipboardCheck, Settings, Activity, UsersRound, Play, Loader2, Sparkles, Command, Database, Network, Orbit, Binary, Target, Rocket, Gauge, Lightbulb, Workflow, ShieldAlert, Shield, RefreshCw, Handshake, Briefcase, Monitor, Layout, Factory, ShoppingCart, HeartPulse, Scale, Hotel, Truck, GraduationCap, Megaphone, HardHat, Stethoscope, Coins, ShieldPlus, Star, Terminal, FileCode2, Bug, History, Flag, MapPin, Phone, Mail, Lightbulb as Vision, Zap as ZapIcon, Briefcase as JobIcon, Heart, Globe2, Layers as LayersIcon, Cpu as CpuIcon, LineChart, UserPlus, Quote, Clock, ExternalLink, Award, PenTool, Image, Video, Presentation, CheckCircle, BarChart, Server, Layers as Layers3, Coffee, Headphones, UserCog, Smile, ShieldQuestion, LifeBuoy, MessageCircle, BarChart4, Key, Home, Wrench, FileText, CreditCard, Building, Smartphone, ShieldHalf, Landmark, Plane, Gavel, Newspaper, Shirt, Flame, UserCircle, Check, Headset, Zap as ZapBolt, BarChart as ChartBar, ShieldCheck as ComplianceShield, StarHalf, DatabaseZap, ShieldEllipsis, Layers2, Globe2 as GlobeIcon, Terminal as TerminalIcon, Database as DatabaseIcon, FileCode2 as ApiIcon, Workflow as PipelineIcon, Users2, Plus, CheckCircle as CheckIcon, CircleCheck, Settings2, Trello, Slack as SlackIcon, Laptop, Store, Package, Boxes, Truck as LogisticsIcon, Tag, Star as StarIcon, BookOpen, CircleHelp, FileJson, Linkedin, Twitter, Instagram, Facebook, Lock, Fingerprint, Wallet, PieChart, FileSearch, AlertCircle, Cloud, Calendar, User
} from 'lucide-react';

import { ViewType } from './types';
import { CaseStudiesProvider } from './store/caseStudiesStore';
import { applySEO } from './lib/seo';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CookieBanner } from './components/CookieBanner';
import { HomePage } from './pages/HomePage';
import { HomePageV2 } from './pages/HomePageV2';
import { BlogsPage } from './pages/BlogsPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { WhoWeArePage } from './pages/WhoWeArePage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { PublisherDashboardPage } from './pages/PublisherDashboardPage';
import { CareerOpsPage } from './pages/CareerOpsPage';
import { BlogOpsPage } from './pages/BlogOpsPage';
import { ResourcesOpsPage } from './pages/ResourcesOpsPage';
import { PortfolioOpsPage } from './pages/PortfolioOpsPage';
import { CaseStudyOpsPage } from './pages/CaseStudyOpsPage';
import { CareersPage } from './pages/CareersPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

// Solutions
import { SolutionsHubPage } from './pages/solutions/SolutionsHubPage';
import { AIGraphicDesignPage } from './pages/solutions/AIGraphicDesignPage';
import { AIInCustomerServicePage } from './pages/solutions/AIInCustomerServicePage';
import { StaffAugmentationPage } from './pages/solutions/StaffAugmentationPage';
import { AIStaffingSolutionsPage } from './pages/solutions/AIStaffingSolutionsPage';
import { AIConsultingAndStrategyPage } from './pages/solutions/AIConsultingAndStrategyPage';
import { AIAgentOperationsPage } from './pages/solutions/AIAgentOperationsPage';
import { AILeadGenerationPage } from './pages/solutions/AILeadGenerationPage';

// Import Job Post Components and Data
import { JobPost } from './pages/careers/JobPost';
import { jobsData } from './pages/careers/jobsData';
import { JobDetailPage } from './pages/careers/JobDetailPage';

// Industries (Verticals)
import { ECommercePage } from './pages/industries/ECommercePage';
import { FintechPage } from './pages/industries/FintechPage';
import { HealthcarePage } from './pages/industries/HealthcarePage';
import { MarketingPage } from './pages/industries/MarketingPage';
import { RetailPage } from './pages/industries/RetailPage';
import { LogisticsPage } from './pages/industries/LogisticsPage';
import { TravelPage } from './pages/industries/TravelPage';
import { EdTechPage } from './pages/industries/EdTechPage';
import { LegalPage } from './pages/industries/LegalPage';
import { InsurancePage } from './pages/industries/InsurancePage';
import { MediaPage } from './pages/industries/MediaPage';
import { ConsumerTechPage } from './pages/industries/ConsumerTechPage';
import { TelecomPage } from './pages/industries/TelecomPage';
import { AutomotivePage } from './pages/industries/AutomotivePage';
import { FashionPage } from './pages/industries/FashionPage';
import { EnergyPage } from './pages/industries/EnergyPage';
import { ProfessionalServicesPage } from './pages/industries/ProfessionalServicesPage';
import { GovernmentPage } from './pages/industries/GovernmentPage';

// Import Resource pages
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { GuidesPage } from './pages/GuidesPage';
import { WebinarsPage } from './pages/WebinarsPage';
import { EbooksPage } from './pages/EbooksPage';
import { EbookDetailPage } from './pages/EbookDetailPage';
import { FaqsPage } from './pages/FaqsPage';
import { GlossaryPage } from './pages/GlossaryPage';
import { InsightsPage } from './pages/InsightsPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { ComingSoonPage } from './pages/ComingSoonPage';

// ── URL ↔ ViewType mapping ──────────────────────────────────────────────────
const VIEW_TO_PATH: Partial<Record<ViewType, string>> = {
  'home': '/',
  'home-v2': '/home-v2/',
  // Services
  'solutions-hub': '/solutions/',
  'agentic-recruitment': '/solutions/ai-staffing-solutions/',
  'customer-support': '/solutions/ai-customer-service-agents/',
  'creative-prod': '/solutions/ai-graphic-design/',
  'staff-aug': '/solutions/staff-augmentation/',
  'ai-consulting': '/solutions/ai-consulting-and-strategy/',
  'ai-agent-monitoring': '/solutions/ai-agent-operations/',
  'ai-outbound': '/solutions/ai-lead-generation/',
  'outcome-models': '/solutions/outcome-models/',
  // Industries
  'ecommerce': '/industries/ecommerce/',
  'fintech': '/industries/fintech/',
  'healthcare': '/industries/healthcare/',
  'marketing-ad': '/industries/marketing/',
  'retail': '/industries/retail/',
  'logistics': '/industries/logistics/',
  'travel': '/industries/travel/',
  'edtech': '/industries/edtech/',
  'legal': '/industries/legal/',
  'insurance': '/industries/insurance/',
  'media': '/industries/media/',
  'consumer-tech': '/industries/consumer-tech/',
  'telecom': '/industries/telecom/',
  'auto': '/industries/automotive/',
  'fashion': '/industries/fashion/',
  'energy': '/industries/energy/',
  'prof-services': '/industries/professional-services/',
  'gov': '/industries/government/',
  // Resources
  'insights': '/insights/',
  'blog': '/blogs/',
  'case-studies': '/case-studies/',
  'guides': '/guides/',
  'webinars': '/webinars/',
  'ebooks': '/ebooks/',
  'faqs': '/faqs/',
  'glossary': '/glossary/',
  // Company
  'company': '/who-we-are/',
  'contact': '/contact-us/',
  'careers': '/careers/',
  'privacy-policy': '/privacy-policy/',
  'terms-and-conditions': '/terms-and-conditions/',
  // Auth / CMS
  'login': '/login/',
  'publisher-dashboard': '/cms/',
  'cms-career-ops': '/cms/career-ops/',
  'cms-blog-ops': '/cms/blog-ops/',
  'cms-resources-ops': '/cms/resources-ops/',
  'cms-portfolio-ops': '/cms/portfolio-ops/',
  'cms-case-studies-ops': '/cms/case-studies-ops/',
  // Job posts
  'job-prompt-engineer': '/careers/prompt-engineer/',
  'job-full-stack-dev': '/careers/full-stack-developer/',
  'job-devops-architect': '/careers/devops-architect/',
  'job-data-scientist': '/careers/data-scientist/',
  'job-qa-automation': '/careers/qa-automation/',
  'job-python-backend': '/careers/python-backend/',
  'job-ml-engineer': '/careers/ml-engineer/',
  'job-ui-ux-designer': '/careers/ui-ux-designer/',
  'job-motion-graphics': '/careers/motion-graphics/',
  'job-art-director': '/careers/art-director/',
  'job-video-editor': '/careers/video-editor/',
  'job-customer-success': '/careers/customer-success/',
  'job-tech-support': '/careers/tech-support/',
  'job-ops-manager': '/careers/ops-manager/',
  'job-fraud-analyst': '/careers/fraud-analyst/',
  'job-wfm-analyst': '/careers/wfm-analyst/',
  'job-solutions-architect': '/careers/solutions-architect/',
  'job-account-executive': '/careers/account-executive/',
  'job-hr-bp': '/careers/hr-bp/',
  'job-tech-recruiter': '/careers/tech-recruiter/',
  'job-finance-controller': '/careers/finance-controller/',
  // Utility
  'not-found': '/404/',
  'coming-soon': '/coming-soon/',
};

// Reverse map: path → ViewType (both with and without trailing slash)
const PATH_TO_VIEW: Record<string, ViewType> = {};
for (const [view, path] of Object.entries(VIEW_TO_PATH)) {
  PATH_TO_VIEW[path] = view as ViewType;
  if (path !== '/') PATH_TO_VIEW[path.replace(/\/$/, '')] = view as ViewType;
}

function pathToView(pathname: string): ViewType | null {
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return PATH_TO_VIEW[withSlash] ?? PATH_TO_VIEW[pathname] ?? null;
}
// ────────────────────────────────────────────────────────────────────────────

const BLOG_SLUG_RE        = /^\/blogs\/([^/]+)\/?$/;
const CASE_STUDY_SLUG_RE  = /^\/case-studies\/([^/]+)\/?$/;
const EBOOK_SLUG_RE       = /^\/ebooks\/([^/]+)\/?$/;

const App = () => {
  const [activeView, setActiveView] = useState<ViewType>(() => {
    const view = pathToView(window.location.pathname);
    if (view) return view;
    if (BLOG_SLUG_RE.test(window.location.pathname))       return 'blog-detail';
    if (CASE_STUDY_SLUG_RE.test(window.location.pathname)) return 'case-study-detail';
    if (EBOOK_SLUG_RE.test(window.location.pathname))      return 'ebook-detail';
    return 'not-found';
  });
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<number | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(() => {
    const m = window.location.pathname.match(BLOG_SLUG_RE);
    return m ? m[1] : null;
  });
  const [selectedCaseStudyId, setSelectedCaseStudyId] = useState<string | null>(null);
  const [selectedCaseStudySlug, setSelectedCaseStudySlug] = useState<string | null>(() => {
    const m = window.location.pathname.match(CASE_STUDY_SLUG_RE);
    return m ? m[1] : null;
  });
  const [selectedEbookId, setSelectedEbookId] = useState<number | null>(null);
  const [selectedEbookSlug, setSelectedEbookSlug] = useState<string | null>(() => {
    const m = window.location.pathname.match(EBOOK_SLUG_RE);
    return m ? m[1] : null;
  });

  // Navigate: update both React state and browser URL
  const setView = useCallback((view: ViewType) => {
    const path = VIEW_TO_PATH[view];
    if (path && window.location.pathname !== path) {
      window.history.pushState({ view }, '', path);
    }
    setActiveView(view);
  }, []);

  // Sync state when user hits back/forward
  useEffect(() => {
    const onPop = () => {
      const view = pathToView(window.location.pathname);
      if (view) { setActiveView(view); return; }
      const bm = window.location.pathname.match(BLOG_SLUG_RE);
      if (bm) { setSelectedBlogSlug(bm[1]); setActiveView('blog-detail'); return; }
      const cm = window.location.pathname.match(CASE_STUDY_SLUG_RE);
      if (cm) { setSelectedCaseStudySlug(cm[1]); setActiveView('case-study-detail'); return; }
      const em = window.location.pathname.match(EBOOK_SLUG_RE);
      if (em) { setSelectedEbookSlug(em[1]); setActiveView('ebook-detail'); return; }
      setActiveView('not-found');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    applySEO(activeView);
  }, [activeView]);

  // If viewing the login page, render it without Navbar/Footer for a clean auth experience
  if (activeView === 'login') {
    return <LoginPage setView={setView} />;
  }

  // If viewing the publisher dashboard, also render without public Navbar/Footer
  if (activeView === 'publisher-dashboard') {
    return <PublisherDashboardPage setView={setView} />;
  }

  // CMS Views
  if (activeView === 'cms-career-ops') {
    return <CareerOpsPage setView={setView} />;
  }
  
  if (activeView === 'cms-blog-ops') {
    return <BlogOpsPage setView={setView} />;
  }

  if (activeView === 'cms-resources-ops') {
    return <ResourcesOpsPage setView={setView} />;
  }

  if (activeView === 'cms-portfolio-ops') {
    return <PortfolioOpsPage setView={setView} />;
  }

  if (activeView === 'cms-case-studies-ops') {
    return <CaseStudyOpsPage setView={setView} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeView={activeView} setView={setView} />
      
      <main>
        {activeView === 'home' && (
          <HomePage setView={setView} />
        )}

        {activeView === 'home-v2' && (
          <HomePageV2
            setView={setView}
            onNavigateToContent={(type, slug) => {
              if (type === 'blog') {
                setSelectedBlogSlug(slug);
                window.history.pushState({ view: 'blog-detail', slug }, '', `/blogs/${slug}/`);
                setActiveView('blog-detail');
              } else if (type === 'case-study') {
                setSelectedCaseStudySlug(slug);
                window.history.pushState({ view: 'case-study-detail', slug }, '', `/case-studies/${slug}/`);
                setActiveView('case-study-detail');
              } else if (type === 'ebook') {
                setSelectedEbookSlug(slug);
                window.history.pushState({ view: 'ebook-detail', slug }, '', `/ebooks/${slug}/`);
                setActiveView('ebook-detail');
              }
            }}
          />
        )}

        {/* Solutions */}
        {activeView === 'solutions-hub' && <SolutionsHubPage setView={setView} />}
        {activeView === 'agentic-recruitment' && <AIStaffingSolutionsPage setView={setView} />}
        {activeView === 'customer-support' && <AIInCustomerServicePage setView={setView} />}
        {activeView === 'creative-prod' && <AIGraphicDesignPage setView={setView} />}
        {/* activeView === 'staff-aug' && <StaffAugmentationPage setView={setView} /> */}
        {activeView === 'ai-consulting' && <AIConsultingAndStrategyPage setView={setView} />}
        {activeView === 'ai-agent-monitoring' && <AIAgentOperationsPage setView={setView} />}
        {activeView === 'ai-outbound' && <AILeadGenerationPage setView={setView} />}
        
        {/* Industries */}
        {activeView === 'ecommerce' && <ComingSoonPage setView={setView} />}
        {activeView === 'fintech' && <FintechPage setView={setView} />}
        {activeView === 'healthcare' && <HealthcarePage setView={setView} />}
        {activeView === 'marketing-ad' && <MarketingPage setView={setView} />}
        {activeView === 'retail' && <RetailPage setView={setView} />}
        {activeView === 'logistics' && <LogisticsPage setView={setView} />}
        {activeView === 'travel' && <TravelPage setView={setView} />}
        {activeView === 'edtech' && <EdTechPage setView={setView} />}
        {activeView === 'legal' && <LegalPage setView={setView} />}
        {activeView === 'insurance' && <InsurancePage setView={setView} />}
        {activeView === 'media' && <MediaPage setView={setView} />}
        {activeView === 'consumer-tech' && <ConsumerTechPage setView={setView} />}
        {activeView === 'telecom' && <TelecomPage setView={setView} />}
        {activeView === 'auto' && <AutomotivePage setView={setView} />}
        {activeView === 'fashion' && <FashionPage setView={setView} />}
        {activeView === 'energy' && <EnergyPage setView={setView} />}
        {activeView === 'prof-services' && <ProfessionalServicesPage setView={setView} />}
        {activeView === 'gov' && <GovernmentPage setView={setView} />}

        {/* Company & Others */}
        {activeView === 'company' && <WhoWeArePage setView={setView} />}
        {activeView === 'contact' && <ContactPage setView={setView} />}
        {activeView === 'careers' && (
          <CareersPage
            setView={setView}
            onSelectJob={(id) => { setSelectedJobId(id); setView('job-detail'); }}
          />
        )}
        {activeView === 'job-detail' && selectedJobId !== null && (
          <JobDetailPage setView={setView} jobId={selectedJobId} />
        )}
        {activeView === 'privacy-policy' && <PrivacyPolicyPage setView={setView} />}
        {activeView === 'terms-and-conditions' && <TermsAndConditionsPage setView={setView} />}
        
        {/* Dynamic Job Posts Routing */}
        {activeView.startsWith('job-') && jobsData[activeView] && (
          <JobPost setView={setView} {...jobsData[activeView]} />
        )}

        {activeView === 'insights' && (
          <InsightsPage
            setView={setView}
            onNavigateToContent={(type, slug) => {
              if (type === 'blog') {
                setSelectedBlogSlug(slug);
                window.history.pushState({ view: 'blog-detail', slug }, '', `/blogs/${slug}/`);
                setActiveView('blog-detail');
              } else if (type === 'case-study') {
                setSelectedCaseStudySlug(slug);
                window.history.pushState({ view: 'case-study-detail', slug }, '', `/case-studies/${slug}/`);
                setActiveView('case-study-detail');
              } else if (type === 'ebook') {
                setSelectedEbookSlug(slug);
                window.history.pushState({ view: 'ebook-detail', slug }, '', `/ebooks/${slug}/`);
                setActiveView('ebook-detail');
              }
            }}
          />
        )}

        {activeView === 'blog' && (
          <BlogsPage
            setView={setView}
            onSelectBlog={(id, slug) => {
              setSelectedBlogId(id);
              setSelectedBlogSlug(slug || null);
              if (slug) {
                window.history.pushState({ view: 'blog-detail', slug }, '', `/blogs/${slug}/`);
                setActiveView('blog-detail');
              } else {
                setView('blog-detail');
              }
            }}
          />
        )}
        {activeView === 'blog-detail' && <BlogDetailPage setView={setView} blogId={selectedBlogId} blogSlug={selectedBlogSlug} />}
        
        {/* Resource Pages */}
        {activeView === 'case-studies' && (
          <CaseStudiesPage
            setView={setView}
            onStudyClick={(id, slug) => {
              setSelectedCaseStudyId(id);
              setSelectedCaseStudySlug(slug || null);
              if (slug) {
                window.history.pushState({ view: 'case-study-detail', slug }, '', `/case-studies/${slug}/`);
                setActiveView('case-study-detail');
              } else {
                setView('case-study-detail');
              }
            }}
          />
        )}
        {activeView === 'case-study-detail' && <CaseStudyDetailPage setView={setView} studyId={selectedCaseStudyId} studySlug={selectedCaseStudySlug} />}
        {activeView === 'guides' && <GuidesPage setView={setView} />}
        {activeView === 'webinars' && <WebinarsPage setView={setView} />}
        {activeView === 'ebooks' && (
          <EbooksPage
            setView={setView}
            onSelectEbook={(id, slug) => {
              setSelectedEbookId(id);
              setSelectedEbookSlug(slug || null);
              if (slug) {
                window.history.pushState({ view: 'ebook-detail', slug }, '', `/ebooks/${slug}/`);
                setActiveView('ebook-detail');
              } else {
                setView('ebook-detail');
              }
            }}
          />
        )}
        {activeView === 'ebook-detail' && <EbookDetailPage setView={setView} ebookId={selectedEbookId} ebookSlug={selectedEbookSlug} />}
        {activeView === 'faqs' && <FaqsPage setView={setView} />}
        {activeView === 'glossary' && <GlossaryPage setView={setView} />}

        {/* Utility pages */}
        {activeView === 'not-found' && <NotFoundPage setView={setView} />}
        {activeView === 'coming-soon' && <ComingSoonPage setView={setView} />}
      </main>
      
      <Footer setView={setView} />
      <CookieBanner setView={setView} />
    </div>
  );
};

const AppWithProviders = () => (
  <CaseStudiesProvider>
    <App />
  </CaseStudiesProvider>
);

export default AppWithProviders;
