import React, { createContext, useContext, useState, useEffect } from 'react';

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

function rowToCmsStudy(row: any): CmsStudy {
  const dbStatus = (row.status || '').toLowerCase();
  const status: CmsStudy['status'] =
    dbStatus === 'published' ? 'Published' :
    dbStatus === 'archived'  ? 'Archived'  : 'Draft';
  return {
    id: String(row.id),
    title: row.title || '',
    slug: row.slug || '',
    subtitle: row.subtitle || row.excerpt || '',
    heroImageUrl: row.hero_image_url || row.cover_image || '',
    clientName: row.client || '',
    category1: row.category1 || 'Case Study',
    category2: row.category2 || '',
    category3: row.category3 || '',
    stat1Value: row.stat1_value || '', stat1Label: row.stat1_label || '',
    stat2Value: row.stat2_value || '', stat2Label: row.stat2_label || '',
    stat3Value: row.stat3_value || '', stat3Label: row.stat3_label || '',
    inBrief: row.in_brief || '',
    challengeHeading: row.challenge_heading || 'The Challenge',
    challengeBody: row.challenge_body || row.challenge || '',
    challengeItem1: row.challenge_item1 || '',
    challengeItem2: row.challenge_item2 || '',
    challengeItem3: row.challenge_item3 || '',
    challengeItem4: row.challenge_item4 || '',
    challengeItem5: row.challenge_item5 || '',
    solutionHeading: row.solution_heading || 'The Solution',
    solutionBody1: row.solution_body1 || row.solution || '',
    solutionBody2: row.solution_body2 || '',
    quoteText: row.quote_text || '',
    quoteAttribution: row.quote_attribution || '',
    quoteTitle: row.quote_title || '',
    outcomeHeading: row.outcome_heading || 'The Outcome',
    outcomeBody: row.outcome_body || row.results || '',
    outcomeMetric1Value: row.outcome_metric1_value || '',
    outcomeMetric1Label: row.outcome_metric1_label || '',
    outcomeMetric2Value: row.outcome_metric2_value || '',
    outcomeMetric2Label: row.outcome_metric2_label || '',
    sidebarIndustry: row.sidebar_industry || row.industry || '',
    sidebarServices: row.sidebar_services || '',
    sidebarRegion: row.sidebar_region || '',
    sidebarTechStack: row.sidebar_tech_stack || '',
    readNext1Category: row.read_next1_category || '',
    readNext1Title: row.read_next1_title || '',
    readNext1Excerpt: row.read_next1_excerpt || '',
    readNext2Category: row.read_next2_category || '',
    readNext2Title: row.read_next2_title || '',
    readNext2Excerpt: row.read_next2_excerpt || '',
    author: row.author || '',
    status,
    date: row.published_at
      ? new Date(row.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
      : '—',
    metaTitle: row.meta_title || '',
    metaDescription: row.meta_description || '',
    keywords: row.keywords || '',
    canonicalUrl: row.canonical_url || '',
    ogTitle: row.og_title || '',
    ogDescription: row.og_description || '',
    ogImageUrl: row.og_image_url || '',
    jsonLd: row.json_ld || '',
    noIndex: row.no_index || false,
    hubspotEventName: row.hubspot_event_name || '',
    hubspotFormGuid: row.hubspot_form_guid || '',
    utmSource: row.utm_source || '',
    utmMedium: row.utm_medium || '',
    utmCampaign: row.utm_campaign || '',
  };
}

interface CaseStudiesContextValue {
  studies: CmsStudy[];
  loading: boolean;
  refetch: () => void;
}

const CaseStudiesContext = createContext<CaseStudiesContextValue>({
  studies: [],
  loading: true,
  refetch: () => {},
});

export const CaseStudiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [studies, setStudies] = useState<CmsStudy[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchStudies = () => {
    setLoading(true);
    fetch('/api/cases')
      .then(r => r.json())
      .then((data: any[]) => setStudies(Array.isArray(data) ? data.map(rowToCmsStudy) : []))
      .catch(() => setStudies([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchStudies(); }, []);

  return (
    <CaseStudiesContext.Provider value={{ studies, loading, refetch: fetchStudies }}>
      {children}
    </CaseStudiesContext.Provider>
  );
};

export const useCaseStudies = () => useContext(CaseStudiesContext);
