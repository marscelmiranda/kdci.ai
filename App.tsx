
import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Users, TrendingUp, Layers, Zap, CheckCircle2, ChevronRight, ChevronDown, ChevronLeft, Menu, X, Code, Search, Building2, Palette, MessageSquare, BarChart3, Globe, ArrowRight, ShieldCheck, ZapOff, MousePointer2, ScanSearch, BrainCircuit, Timer, UserCheck, ClipboardCheck, Settings, Activity, UsersRound, Play, Loader2, Sparkles, Command, Database, Network, Orbit, Binary, Target, Rocket, Gauge, Lightbulb, Workflow, ShieldAlert, Shield, RefreshCw, Handshake, Briefcase, Monitor, Layout, Factory, ShoppingCart, HeartPulse, Scale, Hotel, Truck, GraduationCap, Megaphone, HardHat, Stethoscope, Coins, ShieldPlus, Star, Terminal, FileCode2, Bug, History, Flag, MapPin, Phone, Mail, Lightbulb as Vision, Zap as ZapIcon, Briefcase as JobIcon, Heart, Globe2, Layers as LayersIcon, Cpu as CpuIcon, LineChart, UserPlus, Quote, Clock, ExternalLink, Award, PenTool, Image, Video, Presentation, CheckCircle, BarChart, Server, Layers as Layers3, Coffee, Headphones, UserCog, Smile, ShieldQuestion, LifeBuoy, MessageCircle, BarChart4, Key, Home, Wrench, FileText, CreditCard, Building, Smartphone, ShieldHalf, Landmark, Plane, Gavel, Newspaper, Shirt, Flame, UserCircle, Check, Headset, Zap as ZapBolt, BarChart as ChartBar, ShieldCheck as ComplianceShield, StarHalf, DatabaseZap, ShieldEllipsis, Layers2, Globe2 as GlobeIcon, Terminal as TerminalIcon, Database as DatabaseIcon, FileCode2 as ApiIcon, Workflow as PipelineIcon, Users2, Plus, CheckCircle as CheckIcon, CircleCheck, Settings2, Trello, Slack as SlackIcon, Laptop, Store, Package, Boxes, Truck as LogisticsIcon, Tag, Star as StarIcon, BookOpen, CircleHelp, FileJson, Linkedin, Twitter, Instagram, Facebook, Lock, Fingerprint, Wallet, PieChart, FileSearch, AlertCircle, Cloud, Calendar, User
} from 'lucide-react';

import { ViewType } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BlogLandingPage } from './pages/BlogLandingPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { CompanyPage } from './pages/CompanyPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { PublisherDashboardPage } from './pages/PublisherDashboardPage';
import { CareerOpsPage } from './pages/CareerOpsPage';
import { BlogOpsPage } from './pages/BlogOpsPage';
import { ResourcesOpsPage } from './pages/ResourcesOpsPage';
import { PortfolioOpsPage } from './pages/PortfolioOpsPage';
import { CareersPage } from './pages/CareersPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsAndConditionsPage } from './pages/TermsAndConditionsPage';

// Services
import { SolutionsHubPage } from './pages/services/SolutionsHubPage';
import { SoftwareEngineeringPage } from './pages/services/SoftwareEngineeringPage';
import { CreativeProductionPage } from './pages/services/CreativeProductionPage';
import { CustomerSupportHubPage } from './pages/services/CustomerSupportHubPage';
import { CustomerSupportHubPageV2 } from './pages/services/CustomerSupportHubPageV2';
import { StaffAugmentationPage } from './pages/services/StaffAugmentationPage';
import { AgenticRecruitmentPage } from './pages/services/AgenticRecruitmentPage';
import { PropertyManagementPage } from './pages/services/PropertyManagementPage';

// Import Job Post Components and Data
import { JobPost } from './pages/careers/JobPost';
import { jobsData } from './pages/careers/jobsData';

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
import { AutoPage } from './pages/industries/AutoPage';
import { FashionPage } from './pages/industries/FashionPage';
import { EnergyPage } from './pages/industries/EnergyPage';
import { ProfServicesPage } from './pages/industries/ProfServicesPage';
import { GovPage } from './pages/industries/GovPage';

// Import Resource pages
import { CaseStudiesPage } from './pages/CaseStudiesPage';
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage';
import { GuidesPage } from './pages/GuidesPage';
import { WebinarsPage } from './pages/WebinarsPage';
import { EbooksPage } from './pages/EbooksPage';
import { FaqPage } from './pages/FaqPage';
import { GlossaryPage } from './pages/GlossaryPage';

const App = () => {
  const [activeView, setView] = useState<ViewType>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  // If viewing the login page, render it without Navbar/Footer for a clean auth experience
  if (activeView === 'login') {
    return <LoginPage setView={setView} />;
  }

  // If viewing the publisher dashboard, also render without public Navbar/Footer
  if (activeView === 'publisher-dashboard') {
    return <PublisherDashboardPage setView={setView} />;
  }

  if (activeView === 'publisher-settings') {
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

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeView={activeView} setView={setView} />
      
      <main>
        {activeView === 'home' && <HomePage setView={setView} />}
        
        {/* Services */}
        {activeView === 'solutions-hub' && <SolutionsHubPage setView={setView} />}
        {activeView === 'agentic-recruitment' && <AgenticRecruitmentPage setView={setView} />}
        {activeView === 'software-dev' && <SoftwareEngineeringPage setView={setView} />}
        {activeView === 'customer-support' && <CustomerSupportHubPage setView={setView} />}
        {activeView === 'customer-support-v2' && <CustomerSupportHubPageV2 setView={setView} />}
        {activeView === 'property-mgmt' && <PropertyManagementPage setView={setView} />}
        {activeView === 'creative-prod' && <CreativeProductionPage setView={setView} />}
        {activeView === 'staff-aug' && <StaffAugmentationPage setView={setView} />}
        
        {/* Industries */}
        {activeView === 'ecommerce' && <ECommercePage setView={setView} />}
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
        {activeView === 'auto' && <AutoPage setView={setView} />}
        {activeView === 'fashion' && <FashionPage setView={setView} />}
        {activeView === 'energy' && <EnergyPage setView={setView} />}
        {activeView === 'prof-services' && <ProfServicesPage setView={setView} />}
        {activeView === 'gov' && <GovPage setView={setView} />}

        {/* Company & Others */}
        {activeView === 'company' && <CompanyPage setView={setView} />}
        {activeView === 'contact' && <ContactPage setView={setView} />}
        {activeView === 'careers' && <CareersPage setView={setView} />}
        {activeView === 'privacy-policy' && <PrivacyPolicyPage setView={setView} />}
        {activeView === 'terms-and-conditions' && <TermsAndConditionsPage setView={setView} />}
        
        {/* Dynamic Job Posts Routing */}
        {activeView.startsWith('job-') && jobsData[activeView] && (
          <JobPost setView={setView} {...jobsData[activeView]} />
        )}

        {activeView === 'blog' && <BlogLandingPage setView={setView} />}
        {activeView === 'blog-detail' && <BlogDetailPage setView={setView} />}
        
        {/* Resource Pages */}
        {activeView === 'case-studies' && <CaseStudiesPage setView={setView} />}
        {activeView === 'case-study-detail' && <CaseStudyDetailPage setView={setView} />}
        {activeView === 'guides' && <GuidesPage setView={setView} />}
        {activeView === 'webinars' && <WebinarsPage setView={setView} />}
        {activeView === 'ebooks' && <EbooksPage setView={setView} />}
        {activeView === 'faqs' && <FaqPage setView={setView} />}
        {activeView === 'glossary' && <GlossaryPage setView={setView} />}
      </main>
      
      <Footer setView={setView} />
    </div>
  );
};

export default App;
