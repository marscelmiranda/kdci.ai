import React, { createContext, useContext, useState } from 'react';

export interface CmsStudy {
  id: string;
  date: string;
  title: string;
  subtitle: string;
  heroImageUrl: string;
  clientName: string;
  category1: string;
  category2: string;
  category3: string;
  stat1Value: string; stat1Label: string;
  stat2Value: string; stat2Label: string;
  stat3Value: string; stat3Label: string;
  inBrief: string;
  challengeHeading: string;
  challengeBody: string;
  challengeItem1: string;
  challengeItem2: string;
  challengeItem3: string;
  challengeItem4: string;
  challengeItem5: string;
  solutionHeading: string;
  solutionBody1: string;
  solutionBody2: string;
  quoteText: string;
  quoteAttribution: string;
  quoteTitle: string;
  outcomeHeading: string;
  outcomeBody: string;
  outcomeMetric1Value: string; outcomeMetric1Label: string;
  outcomeMetric2Value: string; outcomeMetric2Label: string;
  sidebarIndustry: string;
  sidebarServices: string;
  sidebarRegion: string;
  sidebarTechStack: string;
  readNext1Category: string; readNext1Title: string; readNext1Excerpt: string;
  readNext2Category: string; readNext2Title: string; readNext2Excerpt: string;
  author: string;
  status: 'Published' | 'Draft' | 'Archived';
  slug: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImageUrl: string;
  jsonLd: string;
  noIndex: boolean;
  hubspotEventName: string;
  hubspotFormGuid: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
}

const SEED_STUDIES: CmsStudy[] = [
  {
    id: 'seed-1', date: 'Nov 5, 2024', status: 'Published',
    title: 'AI-Powered Fraud Detection at 50,000 Transactions/Day',
    subtitle: 'How a high-growth APAC payments platform cut fraud losses by $8.2M annually with a hybrid AI + human review layer.',
    heroImageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800&h=420',
    clientName: 'APAC Payments Platform',
    category1: 'Case Study', category2: 'Fintech', category3: 'AI Ops',
    stat1Value: '94%', stat1Label: 'Fraud Catch Rate',
    stat2Value: '$8.2M', stat2Label: 'Annual Loss Prevention',
    stat3Value: '<2ms', stat3Label: 'Detection Latency',
    inBrief: 'A Series C payments platform processing 50,000 daily transactions needed real-time fraud decisioning that could scale with their user growth without ballooning headcount.',
    challengeHeading: 'The Challenge',
    challengeBody: 'Legacy rule-based fraud filters were generating 12% false-positive rates, blocking legitimate customers while still missing sophisticated fraud rings.',
    challengeItem1: '12% false-positive rate blocking valid transactions',
    challengeItem2: 'Manual review queues exceeding 48-hour SLA',
    challengeItem3: 'Fraud losses accelerating as transaction volume grew',
    challengeItem4: '', challengeItem5: '',
    solutionHeading: 'The Solution',
    solutionBody1: 'KDCI deployed a 3-tier hybrid model: an ML anomaly layer for sub-2ms pre-screening, a 24/7 specialist review team for grey-zone cases, and a closed-loop retraining pipeline fed by adjudication outcomes.',
    solutionBody2: '',
    quoteText: 'The KDCI team integrated with our stack in under two weeks. Fraud losses dropped before we finished onboarding.',
    quoteAttribution: 'Head of Risk & Compliance',
    quoteTitle: 'APAC Payments Platform',
    outcomeHeading: 'The Outcome',
    outcomeBody: 'Within 90 days, false positives dropped to under 1.2%, fraud catch rates hit 94%, and the client avoided an estimated $8.2M in annual losses.',
    outcomeMetric1Value: '$8.2M', outcomeMetric1Label: 'Annual Loss Prevention',
    outcomeMetric2Value: '94%', outcomeMetric2Label: 'Fraud Catch Rate',
    sidebarIndustry: 'Fintech',
    sidebarServices: 'AI Ops, Fraud Detection, Back Office',
    sidebarRegion: 'Asia-Pacific',
    sidebarTechStack: 'Python, Kafka, Sift, Zendesk',
    readNext1Category: 'Insurance', readNext1Title: 'Automating Claims Triage with AI + Offshore Adjusters', readNext1Excerpt: 'Cutting claim cycle time in half with an intelligent triage layer.',
    readNext2Category: 'E-Commerce', readNext2Title: 'Reducing Cart Abandonment with AI-Powered Live Chat', readNext2Excerpt: 'A DTC brand recovered abandoned carts and drove repeat purchases.',
    author: 'Sarah Chen', slug: 'ai-fraud-detection-apac-payments',
    metaTitle: 'AI Fraud Detection Case Study | KDCI', metaDescription: '', keywords: '',
    canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false,
    hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: '',
  },
  {
    id: 'seed-2', date: 'Oct 22, 2024', status: 'Published',
    title: 'Contract Review at Scale for a Big Law Technology Practice',
    subtitle: 'Offshore legal ops delivered 3x contract review throughput at 70% lower cost without sacrificing accuracy.',
    heroImageUrl: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800&h=420',
    clientName: 'Big Law Technology Practice',
    category1: 'Case Study', category2: 'Legal', category3: 'Back Office',
    stat1Value: '70%', stat1Label: 'Cost Reduction',
    stat2Value: '3x', stat2Label: 'Review Throughput',
    stat3Value: '99%', stat3Label: 'Accuracy Rate',
    inBrief: 'A U.S.-based technology-focused law firm needed to scale contract review for a surge of enterprise SaaS and M&A deals without adding expensive associate headcount.',
    challengeHeading: 'The Challenge',
    challengeBody: 'Associates were spending 60% of billable hours on first-pass contract review — low-leverage work that created burnout and capped firm capacity.',
    challengeItem1: 'Associate time consumed by low-leverage review work',
    challengeItem2: 'Turnaround times lagging client expectations',
    challengeItem3: 'Hiring pipeline insufficient for deal volume spikes',
    challengeItem4: '', challengeItem5: '',
    solutionHeading: 'The Solution',
    solutionBody1: 'KDCI built a dedicated offshore legal ops pod — trained, bar-adjacent paralegals with NDAs and ISO-compliant workflows — handling first-pass review, redlining, and clause extraction.',
    solutionBody2: '',
    quoteText: 'Our partners were skeptical. Now they ask for the KDCI team by name. The quality is indistinguishable from junior associate work at a fraction of the cost.',
    quoteAttribution: 'Managing Partner',
    quoteTitle: 'Technology Practice Lead',
    outcomeHeading: 'The Outcome',
    outcomeBody: 'The firm tripled its contract review capacity, reduced cost-per-contract by 70%, and freed associates to focus on high-value advisory and client relationship work.',
    outcomeMetric1Value: '70%', outcomeMetric1Label: 'Cost Per Contract Reduction',
    outcomeMetric2Value: '3x', outcomeMetric2Label: 'Review Throughput',
    sidebarIndustry: 'Legal',
    sidebarServices: 'Back Office, Staff Augmentation, Legal Ops',
    sidebarRegion: 'North America',
    sidebarTechStack: 'NetDocuments, Ironclad, MS Teams',
    readNext1Category: 'Technology', readNext1Title: 'Building a Dedicated Engineering Pod for Legacy Migration', readNext1Excerpt: 'Deploying a 15-person dev team to modernize a monolithic architecture.',
    readNext2Category: 'Fintech', readNext2Title: 'AI-Powered Fraud Detection at 50,000 Transactions/Day', readNext2Excerpt: 'Cutting fraud losses by $8.2M with a hybrid AI + human review layer.',
    author: 'Michael Ross', slug: 'legal-ops-contract-review-scale',
    metaTitle: 'Legal Ops Contract Review Case Study | KDCI', metaDescription: '', keywords: '',
    canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false,
    hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: '',
  },
  {
    id: 'seed-3', date: '-', status: 'Draft',
    title: 'Multilingual Content Ops for a Global SaaS Enterprise',
    subtitle: '', heroImageUrl: '', clientName: 'Enterprise SaaS Platform',
    category1: 'Case Study', category2: 'Technology', category3: '',
    stat1Value: '', stat1Label: '', stat2Value: '', stat2Label: '', stat3Value: '', stat3Label: '',
    inBrief: '', challengeHeading: 'The Challenge', challengeBody: '', challengeItem1: '', challengeItem2: '', challengeItem3: '', challengeItem4: '', challengeItem5: '',
    solutionHeading: 'The Solution', solutionBody1: '', solutionBody2: '',
    quoteText: '', quoteAttribution: '', quoteTitle: '',
    outcomeHeading: 'The Outcome', outcomeBody: '', outcomeMetric1Value: '', outcomeMetric1Label: '', outcomeMetric2Value: '', outcomeMetric2Label: '',
    sidebarIndustry: 'Technology', sidebarServices: '', sidebarRegion: '', sidebarTechStack: '',
    readNext1Category: '', readNext1Title: '', readNext1Excerpt: '', readNext2Category: '', readNext2Title: '', readNext2Excerpt: '',
    author: 'Jason Park', slug: 'multilingual-content-ops-saas',
    metaTitle: '', metaDescription: '', keywords: '', canonicalUrl: '', ogTitle: '', ogDescription: '', ogImageUrl: '', jsonLd: '', noIndex: false,
    hubspotEventName: '', hubspotFormGuid: '', utmSource: '', utmMedium: '', utmCampaign: '',
  },
];

const STORAGE_KEY = 'kdci_cms_case_studies_v1';

const loadFromStorage = (): CmsStudy[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved) as CmsStudy[];
  } catch {}
  return SEED_STUDIES;
};

interface CaseStudiesContextValue {
  studies: CmsStudy[];
  setStudies: (studies: CmsStudy[]) => void;
}

const CaseStudiesContext = createContext<CaseStudiesContextValue>({
  studies: SEED_STUDIES,
  setStudies: () => {},
});

export const CaseStudiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [studies, setStudiesState] = useState<CmsStudy[]>(loadFromStorage);

  const setStudies = (s: CmsStudy[]) => {
    setStudiesState(s);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
  };

  return (
    <CaseStudiesContext.Provider value={{ studies, setStudies }}>
      {children}
    </CaseStudiesContext.Provider>
  );
};

export const useCaseStudies = () => useContext(CaseStudiesContext);
