import { ViewType } from '../types';

export const VIEW_TO_PATH: Partial<Record<ViewType, string>> = {
  'home': '/',
  // Solutions
  'solutions-hub': '/solutions/',
  'agentic-recruitment': '/solutions/ai-staffing-solutions/',
  'customer-support': '/solutions/ai-consulting-and-strategy/',
  'creative-prod': '/solutions/ai-graphic-design/',
  'staff-aug': '/solutions/staff-augmentation/',
  'ai-consulting': '/solutions/ai-consultation-and-strategy/',
  'ai-agent-monitoring': '/solutions/ai-agent-operations/',
  'ai-outbound': '/solutions/ai-demand-generation/',
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
};

export const getPath = (view: ViewType): string => VIEW_TO_PATH[view] ?? '/';
