
export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  tagline: string;
  icon: string;
}

export interface PricingPlan {
  name: string;
  type: string;
  price: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export interface SiteMapNode {
  title: string;
  path: string;
  subPages?: SiteMapNode[];
}

export type ViewType = 
  | 'home' 
  | 'solutions-hub' 
  | 'agentic-recruitment' 
  | 'software-dev' 
  | 'property-mgmt' 
  | 'creative-prod' 
  | 'customer-support' 
  | 'customer-support-v2'
  | 'staff-aug' 
  | 'ecommerce'
  | 'outcome-models'
  | 'company'
  | 'contact'
  | 'login'
  | 'publisher-dashboard'
  | 'cms-career-ops'
  | 'cms-blog-ops'
  | 'cms-resources-ops'
  | 'cms-portfolio-ops'
  | 'careers'
  | 'job-prompt-engineer'
  | 'job-full-stack-dev'
  | 'job-devops-architect'
  | 'job-data-scientist'
  | 'job-qa-automation'
  | 'job-python-backend'
  | 'job-ml-engineer'
  | 'job-ui-ux-designer'
  | 'job-motion-graphics'
  | 'job-art-director'
  | 'job-video-editor'
  | 'job-customer-success'
  | 'job-tech-support'
  | 'job-ops-manager'
  | 'job-fraud-analyst'
  | 'job-wfm-analyst'
  | 'job-solutions-architect'
  | 'job-account-executive'
  | 'job-hr-bp'
  | 'job-tech-recruiter'
  | 'job-finance-controller'
  | 'blog'
  | 'blog-detail'
  | 'case-studies'
  | 'case-study-detail'
  | 'guides'
  | 'webinars'
  | 'ebooks'
  | 'faqs'
  | 'glossary'
  | 'privacy-policy'
  | 'terms-and-conditions'
  | 'fintech'
  | 'healthcare'
  | 'marketing-ad'
  | 'retail'
  | 'logistics'
  | 'travel'
  | 'edtech'
  | 'legal'
  | 'insurance'
  | 'media'
  | 'consumer-tech'
  | 'telecom'
  | 'auto'
  | 'fashion'
  | 'energy'
  | 'prof-services'
  | 'gov'
  | 'ai-consulting'
  | 'creative-prod-v2';
