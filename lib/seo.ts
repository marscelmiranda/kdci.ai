
export interface SEOMeta {
  title: string;
  description: string;
  canonical: string;
}

const BASE = 'https://kdci.ai';

const URL_PATHS: Record<string, string> = {
  home:                '/',
  'solutions-hub':     '/solutions/',
  'agentic-recruitment': '/solutions/ai-staffing-solutions/',
  'customer-support':  '/solutions/ai-customer-service-agents/',
  'creative-prod':     '/solutions/ai-graphic-design/',
  'staff-aug':         '/solutions/ai-workforce-augmentation/',
  'ai-consulting':     '/solutions/ai-consulting-and-strategy/',
  'ai-agent-monitoring': '/solutions/ai-agent-operations/',
  'ai-outbound':       '/solutions/ai-lead-generation/',
  company:             '/who-we-are/',
  contact:             '/contact-us/',
  careers:             '/careers/',
  blog:                '/blogs/',
  'case-studies':      '/case-studies/',
  faqs:                '/faqs/',
  glossary:            '/glossary/',
  ecommerce:           '/industries/ecommerce/',
  fintech:             '/industries/fintech/',
  healthcare:          '/industries/healthcare/',
  'marketing-ad':      '/industries/marketing/',
  retail:              '/industries/retail/',
  logistics:           '/industries/logistics/',
  travel:              '/industries/travel/',
  edtech:              '/industries/edtech/',
  legal:               '/industries/legal/',
  insurance:           '/industries/insurance/',
  media:               '/industries/media/',
  'consumer-tech':     '/industries/consumer-tech/',
  telecom:             '/industries/telecom/',
  auto:                '/industries/auto/',
  fashion:             '/industries/fashion/',
  energy:              '/industries/energy/',
  'prof-services':     '/industries/professional-services/',
  gov:                 '/industries/government/',
  'privacy-policy':    '/privacy-policy/',
  'terms-and-conditions': '/terms-and-conditions/',
};

export const SEO_CONFIG: Partial<Record<string, SEOMeta>> = {
  home: {
    title: 'End-to-End AI Managed Services Provider | KDCI.ai',
    description: 'KDCI.ai is an end-to-end AI managed services provider handling AI monitoring, consulting, workforce augmentation, and CX support across 20+ industries.',
    canonical: `${BASE}/`,
  },

  // ── Services ──────────────────────────────────────────────────────────
  'solutions-hub': {
    title: 'AI Solutions Partner for Global Businesses | KDCI.ai',
    description: 'KDCI.ai delivers AI solutions built on combining offshore specialists and agentic workflows to cut operational costs by up to 70% across 20+ industries.',
    canonical: `${BASE}/solutions/`,
  },
  'agentic-recruitment': {
    title: 'Hire AI-Ready Talent - AI Staffing Solutions | KDCI.ai',
    description: 'We provide end-to-end AI staffing solutions that connects you with prompt engineers, AI ops, data analysts, and AI-enabled VAs. Go live within 5 to 7 days.',
    canonical: `${BASE}/solutions/ai-staffing-solutions/`,
  },
  'customer-support': {
    title: 'CX Automation - AI Customer Service Agents | KDCI.ai',
    description: "Elevate every customer interaction with AI customer service agents that are faster, smarter, and always on, all without losing the human touch.",
    canonical: `${BASE}/solutions/ai-customer-service-agents/`,
  },
  'creative-prod': {
    title: 'AI-Powered Graphic Design Services | KDCI.ai',
    description: 'Full-service AI graphic design services. Get on-brand assets, faster turnaround, at a cost lower than a traditional agency. First delivery in 2 weeks.',
    canonical: `${BASE}/solutions/ai-graphic-design/`,
  },
  'staff-aug': {
    title: 'Offshore Staff Augmentation | KDCI',
    description: 'Extend your team with dedicated Filipino professionals. KDCI offshore staffing covers 200+ roles with all-in monthly pricing, AI-driven performance oversight, and fast 14–30 day onboarding.',
    canonical: `${BASE}/solutions/ai-workforce-augmentation/`,
  },
  'ai-consulting': {
    title: 'AI Consulting and Strategy Services | KDCI.ai',
    description: 'End-to-end AI consulting and strategy services, from readiness audit to live agent deployment within 42 days. KPI-backed. Built in-house. ROI-guaranteed.',
    canonical: `${BASE}/solutions/ai-consulting-and-strategy/`,
  },
  'ai-agent-monitoring': {
    title: 'AI Agent Operations for Always-On Performance | KDCI.ai',
    description: 'KDCI.ai runs the full AI agent operations lifecycle, from setup and go-live to prompt tuning, and continuous improvement. Platform-agnostic. Always on.',
    canonical: `${BASE}/solutions/ai-agent-operations/`,
  },
  'ai-outbound': {
    title: 'AI Lead Generation - Inbound & Outbound Sales | KDCI.ai',
    description: 'Grow your lead pipeline with AI-driven lead generation services. Target smarter, send out personalized content, and get higher conversion rates.',
    canonical: `${BASE}/solutions/ai-lead-generation/`,
  },

  // ── Industries ────────────────────────────────────────────────────────
  ecommerce: {
    title: 'E-Commerce Offshore Operations | KDCI',
    description: "Scale your online store faster with KDCI's e-commerce ops team. Expert offshore support for product listing, order management, customer service, and logistics operations.",
    canonical: `${BASE}/industries/ecommerce/`,
  },
  fintech: {
    title: 'Fintech Offshore Operations | KDCI',
    description: 'Future-ready fintech ops with KDCI. SOC-2 compliant offshore support and back-office teams purpose-built for financial technology companies moving at high velocity.',
    canonical: `${BASE}/industries/fintech/`,
  },
  healthcare: {
    title: 'Healthcare Offshore Operations | KDCI',
    description: 'HIPAA-compliant administrative and clinical support for digital health platforms and hospital networks. Patient-first offshore operations powered by KDCI.',
    canonical: `${BASE}/industries/healthcare/`,
  },
  'marketing-ad': {
    title: 'Marketing & Ad Agency Offshore Ops | KDCI',
    description: "Brand-first marketing operations with KDCI. Dedicated creative, ad ops, and content pods for agencies and in-house marketing teams that demand quality at scale.",
    canonical: `${BASE}/industries/marketing/`,
  },
  retail: {
    title: 'Omnichannel Retail Offshore Operations | KDCI',
    description: 'Unified retail ops across every channel with KDCI. Offshore support for customer service, inventory management, and catalog operations for modern retail brands.',
    canonical: `${BASE}/industries/retail/`,
  },
  logistics: {
    title: 'Logistics & Supply Chain Offshore Ops | KDCI',
    description: "Supply chain velocity with KDCI's logistics ops teams. Back-office efficiency and dispatch support for freight forwarders, 3PLs, and transportation networks.",
    canonical: `${BASE}/industries/logistics/`,
  },
  travel: {
    title: 'Travel & Hospitality Offshore Ops | KDCI',
    description: "Deliver 24/7 guest experiences with KDCI's travel ops team. Premium offshore support for booking management, reservations, and hospitality guest care.",
    canonical: `${BASE}/industries/travel/`,
  },
  edtech: {
    title: 'EdTech Offshore Operations | KDCI',
    description: "Student success at scale with KDCI's EdTech ops. Scalable offshore support, enrollment operations, and LMS management for online learning platforms.",
    canonical: `${BASE}/industries/edtech/`,
  },
  legal: {
    title: 'Legal Process Outsourcing | KDCI',
    description: 'Legal ops precision with KDCI. Confidential paralegal and administrative support for law firms and legal tech companies, delivered by expert offshore professionals.',
    canonical: `${BASE}/industries/legal/`,
  },
  insurance: {
    title: 'Insurance Offshore Operations | KDCI',
    description: 'Digital-first insurance ops with KDCI. Accelerate claims processing and policy administration for carriers and InsurTechs with expert offshore teams.',
    canonical: `${BASE}/industries/insurance/`,
  },
  media: {
    title: 'Media & Content Offshore Operations | KDCI',
    description: "Content velocity with KDCI's media ops teams. Managed content moderation and creative production for brand protection and content scaling at speed.",
    canonical: `${BASE}/industries/media/`,
  },
  'consumer-tech': {
    title: 'Consumer Tech Offshore Support | KDCI',
    description: 'Support your users 24/7 with KDCI. Technical support and community management for hardware brands, apps, and connected devices — powered by offshore experts.',
    canonical: `${BASE}/industries/consumer-tech/`,
  },
  telecom: {
    title: 'Telecom Offshore Operations | KDCI',
    description: "Connectivity at scale with KDCI's telecom ops. Customer retention and technical provisioning support for ISPs, mobile carriers, and network service providers.",
    canonical: `${BASE}/industries/telecom/`,
  },
  auto: {
    title: 'Automotive Offshore Operations | KDCI',
    description: "Dealer success powered by KDCI's automotive ops. Offshore customer care and dealer support purpose-built for the modern automotive ecosystem.",
    canonical: `${BASE}/industries/automotive/`,
  },
  fashion: {
    title: 'Fashion & Apparel Offshore Operations | KDCI',
    description: "Style and speed with KDCI's fashion ops. Brand-aligned offshore support and visual merchandising for fashion labels that demand quality and fast turnaround.",
    canonical: `${BASE}/industries/fashion/`,
  },
  energy: {
    title: 'Energy & Utilities Offshore Operations | KDCI',
    description: "Grid reliability with KDCI's utility ops teams. Customer service and field dispatch support for solar, renewable energy, and utility service providers.",
    canonical: `${BASE}/industries/energy/`,
  },
  'prof-services': {
    title: 'Professional Services Offshore Ops | KDCI',
    description: 'Executive leverage with KDCI. Offshore executive support and research for consulting, accounting, architecture, and professional services firms.',
    canonical: `${BASE}/industries/professional-services/`,
  },
  gov: {
    title: 'Government & Public Sector Offshore Ops | KDCI',
    description: 'Modernizing public service with KDCI. Secure administrative and constituent support for government agencies and public sector contractors.',
    canonical: `${BASE}/industries/government/`,
  },

  // ── Company & Other ───────────────────────────────────────────────────
  company: {
    title: 'AI Solutions Partner for Global Businesses | KDCI.ai',
    description: 'KDCI.ai delivers AI solutions built on combining offshore specialists and agentic workflows to cut operational costs by up to 70% across 20+ industries.',
    canonical: `${BASE}/who-we-are/`,
  },
  contact: {
    title: 'Contact KDCI.ai | Start Your Agentic AI Journey',
    description: 'Connect with our architects at KDCI.ai for AI agent setups, integrations, and deployment. Accelerate your business outcomes with agentic AI applications.',
    canonical: `${BASE}/contact-us/`,
  },
  careers: {
    title: 'Careers at KDCI.ai | Join the Agentic AI Revolution',
    description: 'Be part of KDCI.ai. Grow your career with us and transform how leading organizations operate and thrive by adopting cutting-edge AI solutions.',
    canonical: `${BASE}/careers/`,
  },
  insights: {
    title: 'AI Insights, Guides & Resource Hub | KDCI.ai',
    description: "Don't miss out on these resources in enterprise AI. Insights, e-books, guides, and emerging trends we see worth talking about. Published as we write them.",
    canonical: `${BASE}/insights/`,
  },
  blog: {
    title: 'AI Blogs, Insights, Trends & Best Practices | KDCI.ai',
    description: "Explore KDCI.ai's blog for expert perspectives on enterprise AI, agentic automation, and real-world implementation strategies. Stay ahead of the curve.",
    canonical: `${BASE}/blogs/`,
  },
  'case-studies': {
    title: 'Case Studies on Agentic and Enterprise AI | KDCI.ai',
    description: 'See how enterprises are achieving measurable results with agentic AI. Browse KDCI.ai\'s case studies on AI-driven automation, integration, and operations.',
    canonical: `${BASE}/case-studies/`,
  },
  guides: {
    title: 'Guides | Offshore Staffing Resources — KDCI',
    description: "Download KDCI's expert guides on offshore staffing, AI implementation, and business process outsourcing. Practical resources for scaling your business effectively.",
    canonical: `${BASE}/guides/`,
  },
  webinars: {
    title: 'Webinars | KDCI',
    description: "Join KDCI's live and on-demand webinars. Expert sessions on AI operations, offshore staffing, and operational excellence for modern business leaders.",
    canonical: `${BASE}/webinars/`,
  },
  ebooks: {
    title: 'Free AI Resources, eBooks & Guides | KDCI.ai',
    description: 'Download free eBooks and practical guides on agentic AI, enterprise automation, and digital transformation — curated by KDCI.ai\'s research team.',
    canonical: `${BASE}/ebooks/`,
  },
  faqs: {
    title: 'Frequently Asked Questions About Agentic AI | KDCI.ai',
    description: 'Got questions about agentic AI and enterprise automation? Find clear, expert answers to the most common questions about KDCI.ai\'s solutions and approach.',
    canonical: `${BASE}/faqs/`,
  },
  glossary: {
    title: 'Automation and AI Operations Glossary | KDCI.ai',
    description: 'Your reference for AI and automation terminology. We break down key concepts in agentic AI, operations, and enterprise technology in plain language.',
    canonical: `${BASE}/glossary/`,
  },
  'privacy-policy': {
    title: 'Privacy Policy | KDCI',
    description: "Read KDCI's privacy policy. Learn how we collect, use, and protect your personal information in compliance with applicable data protection laws.",
    canonical: `${BASE}/privacy-policy/`,
  },
  'terms-and-conditions': {
    title: 'Terms and Conditions | KDCI',
    description: "Read KDCI's terms and conditions governing use of our website and services.",
    canonical: `${BASE}/terms-and-conditions/`,
  },
};

export const DEFAULT_SEO: SEOMeta = SEO_CONFIG['home']!;

export function applySEO(view: string): void {
  const meta = SEO_CONFIG[view] ?? DEFAULT_SEO;

  document.title = meta.title;

  const setMeta = (selector: string, attr: string, value: string) => {
    const el = document.querySelector(selector);
    if (el) el.setAttribute(attr, value);
  };

  setMeta('meta[name="description"]', 'content', meta.description);
  setMeta('meta[property="og:title"]', 'content', meta.title);
  setMeta('meta[property="og:description"]', 'content', meta.description);
  setMeta('meta[property="og:url"]', 'content', meta.canonical);
  setMeta('meta[name="twitter:title"]', 'content', meta.title);
  setMeta('meta[name="twitter:description"]', 'content', meta.description);

  let canonicalEl = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (canonicalEl) {
    canonicalEl.href = meta.canonical;
  }

}
