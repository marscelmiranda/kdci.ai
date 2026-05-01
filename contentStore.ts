/**
 * contentStore.ts
 * ─────────────────────────────────────────────────────────────────
 * Single source of truth for all CMS content.
 * All functions are async and read/write from Supabase.
 * Seed data is used as fallback if Supabase returns nothing,
 * so the site never looks empty on first load.
 * ─────────────────────────────────────────────────────────────────
 */

import { supabase } from './supabaseClient';
import {
  Globe, Cpu, Shield, TrendingUp, BrainCircuit, Layers, Palette,
  FileText, BarChart3, Users, Smartphone, ShoppingCart, Activity,
  Building2, BookOpen, Video, Briefcase, Terminal,
} from 'lucide-react';

// ─── Icon resolver ───────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Globe, Cpu, Shield, TrendingUp, BrainCircuit, Layers, Palette,
  FileText, BarChart3, Users, Smartphone, ShoppingCart, Activity,
  Building2, BookOpen, Video, Briefcase, Terminal,
};
export function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? FileText;
}

// ─────────────────────────────────────────────────────────────────
// TYPES — match Supabase table columns exactly
// ─────────────────────────────────────────────────────────────────

export interface Job {
  id: number;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  tags: string[];
  deadline: string;
  active: boolean;
  status: string;
  applicants: number;
  view_type: string;
  created_at: string;
}

export interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  date: string;
  read_time: string;
  img: string;
  image_url: string;
  author: string;
  featured: boolean;
  status: string;
  body: string;
  tags: string;
  blocks: any[];
  seo: any;
  hubspot: any;
  views: number;
  created_at: string;
}

export interface CaseStudy {
  id: number;
  client: string;
  industry: string;
  icon_name: string;
  title: string;
  description: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  status: string;
  body: string;
  created_at: string;
}

export interface Ebook {
  id: number;
  title: string;
  description: string;
  pages: string;
  icon_name: string;
  color: string;
  pdf_url: string;
  status: string;
  created_at: string;
}

export interface Guide {
  id: number;
  title: string;
  category: string;
  read_time: string;
  description: string;
  icon_name: string;
  featured: boolean;
  status: string;
  body: string;
  created_at: string;
}

export interface Webinar {
  id: number;
  title: string;
  date: string;
  time: string;
  speakers: string[];
  description: string;
  thumb: string;
  duration: string;
  is_upcoming: boolean;
  registration_url: string;
  status: string;
  created_at: string;
}

export interface HubSpotForm {
  id: number;
  key: string;
  label: string;
  guid: string;
  page: string;
  enabled: boolean;
}

// ─────────────────────────────────────────────────────────────────
// SEED DATA — fallback so site never looks empty
// ─────────────────────────────────────────────────────────────────

const SEED_JOBS: Job[] = [
  { id:1,  title:'Senior AI Prompt Engineer',        department:'AI & Data',    location:'Manila (Hybrid)',  type:'Full-Time', salary:'', description:'Lead prompt engineering for our agentic AI products.', requirements:'LLM, Python, NLP',          tags:['LLM','Python','NLP'],          deadline:'', active:true, status:'Active', applicants:42,  view_type:'job-prompt-engineer',    created_at:'2024-10-01' },
  { id:2,  title:'Full-Stack Developer (React/Node)', department:'Engineering',  location:'Remote',           type:'Full-Time', salary:'', description:'Build and maintain scalable SaaS products.',          requirements:'TypeScript, AWS, SaaS',     tags:['TypeScript','AWS','SaaS'],     deadline:'', active:true, status:'Active', applicants:18,  view_type:'job-full-stack-dev',     created_at:'2024-10-01' },
  { id:3,  title:'Senior UI/UX Designer',             department:'Creative',     location:'Manila (Hybrid)',  type:'Full-Time', salary:'', description:'Own the design system and user research practice.',    requirements:'Figma, Design Systems',     tags:['Figma','Design Systems'],      deadline:'', active:true, status:'Active', applicants:8,   view_type:'job-ui-ux-designer',     created_at:'2024-10-01' },
  { id:4,  title:'Customer Success Manager (SaaS)',   department:'CX & Support', location:'Remote',           type:'Full-Time', salary:'', description:'Drive retention and expansion for our SaaS clients.',  requirements:'Retention, Onboarding',     tags:['Retention','Onboarding'],      deadline:'', active:true, status:'Active', applicants:24,  view_type:'job-customer-success',   created_at:'2024-10-01' },
  { id:5,  title:'Solutions Architect',               department:'Sales',        location:'US (Remote)',      type:'Full-Time', salary:'', description:'Lead technical pre-sales with enterprise clients.',     requirements:'Pre-sales, Technical',      tags:['Pre-sales','Technical'],       deadline:'', active:true, status:'Active', applicants:11,  view_type:'job-solutions-architect',created_at:'2024-10-01' },
  { id:6,  title:'DevOps Architect',                  department:'Engineering',  location:'Manila (On-site)', type:'Full-Time', salary:'', description:'Own cloud infrastructure and CI/CD pipelines.',        requirements:'Docker, Kubernetes, CI/CD', tags:['Docker','Kubernetes','CI/CD'], deadline:'', active:true, status:'Active', applicants:0,   view_type:'job-devops-architect',   created_at:'2024-10-01' },
];

const SEED_BLOG: BlogPost[] = [
  { id:1, title:'Why the Philippines is the New Epicenter for AI Engineering', slug:'philippines-ai-engineering', excerpt:"Unpacking the talent shift as Manila transforms from a support hub into a global node for agentic AI development.", category:'Engineering',    date:'Oct 12, 2024', read_time:'6 min read',  img:'', image_url:'', author:'Sarah Chen',    featured:true,  status:'Published', body:'', tags:'AI, Engineering', blocks:[], seo:{}, hubspot:{}, views:2450, created_at:'2024-10-12' },
  { id:2, title:'Scaling to 500+ Agents: A Case Study in Fintech Support',    slug:'scaling-500-agents-fintech', excerpt:"How a high-growth fintech reduced OpEx by 65% while improving CSAT using managed offshore intelligence.",           category:'Case Studies',   date:'Sep 28, 2024', read_time:'8 min read',  img:'', image_url:'', author:'Michael Ross',  featured:false, status:'Published', body:'', tags:'Fintech',        blocks:[], seo:{}, hubspot:{}, views:1890, created_at:'2024-09-28' },
  { id:3, title:'Prompt Engineering vs. Software Engineering: The Merging Path',slug:'prompt-vs-software-engineering',excerpt:"Why the developers of 2025 will spend as much time talking to code as they do writing it.",              category:'AI Operations',  date:'Sep 15, 2024', read_time:'5 min read',  img:'', image_url:'', author:'Devin Zhao',    featured:false, status:'Published', body:'', tags:'AI',             blocks:[], seo:{}, hubspot:{}, views:1200, created_at:'2024-09-15' },
  { id:4, title:'The Future of CX: Moving Beyond Ticketing to Real-time Agency',slug:'future-cx-realtime-agency',  excerpt:"Traditional support is dead. Agentic AI is allowing pods to resolve issues before the user even knows they exist.", category:'AI Operations',  date:'Aug 30, 2024', read_time:'7 min read',  img:'', image_url:'', author:'Sarah Chen',    featured:false, status:'Published', body:'', tags:'CX, AI',         blocks:[], seo:{}, hubspot:{}, views:980,  created_at:'2024-08-30' },
  { id:5, title:'How Global Logistics Firms are Scaling with Managed Pods',    slug:'logistics-scaling-managed-pods',excerpt:"Exploring the operational blueprint for managing high-volume data and tracking across multiple timezones.",    category:'Case Studies',   date:'Aug 12, 2024', read_time:'10 min read', img:'', image_url:'', author:'Marcus Jordon', featured:false, status:'Published', body:'', tags:'Logistics',      blocks:[], seo:{}, hubspot:{}, views:3100, created_at:'2024-08-12' },
  { id:6, title:'Building the Modern Offshore Strategy for Mid-Market Firms',  slug:'offshore-strategy-midmarket',  excerpt:"You don't need enterprise budgets to build enterprise-scale teams. A tactical guide to intelligent scaling.",        category:'Future of Work', date:'Jul 25, 2024', read_time:'9 min read',  img:'', image_url:'', author:'Sarah Chen',    featured:false, status:'Published', body:'', tags:'Strategy',       blocks:[], seo:{}, hubspot:{}, views:760,  created_at:'2024-07-25' },
];

const SEED_CASE_STUDIES: CaseStudy[] = [
  { id:1, client:'Fintech Unicorn',        industry:'Financial Services', icon_name:'Smartphone',   title:'Scaling Support from 0 to 500 Agents in 6 Months',        description:'How a high-growth neobank maintained 98% CSAT while hyper-scaling their customer operations offshore.',  metrics:[{label:'Cost Savings',value:'65%'},{label:'CSAT Score',value:'4.8/5'},{label:'Ramp Time',value:'14 Days'}],  tags:['Customer Support','AI Ops','Fintech'],           status:'published', body:'', created_at:'2024-10-01' },
  { id:2, client:'Global Logistics Leader',industry:'Supply Chain',       icon_name:'Globe',        title:'Automating 10,000 Weekly Waybills with AI + Humans',         description:'Implementing a human-in-the-loop OCR workflow to digitize shipping documentation with 99.9% accuracy.',   metrics:[{label:'Accuracy',value:'99.9%'},{label:'Manual Work',value:'-80%'},{label:'Turnaround',value:'<1 Hr'}],    tags:['Data Entry','Logistics','Automation'],           status:'published', body:'', created_at:'2024-09-01' },
  { id:3, client:'SaaS Enterprise',        industry:'Technology',         icon_name:'Building2',    title:'Building a Dedicated Engineering Pod for Legacy Migration',   description:'Deploying a 15-person specialized dev team to modernize a monolithic architecture to microservices.',      metrics:[{label:'Velocity',value:'3x'},{label:'Bug Rate',value:'-40%'},{label:'Uptime',value:'99.99%'}],           tags:['Software Dev','Staff Aug','SaaS'],               status:'published', body:'', created_at:'2024-08-01' },
  { id:4, client:'D2C Fashion Brand',      industry:'Retail',             icon_name:'ShoppingCart', title:'24/7 Social Commerce Support & Community Management',         description:'Turning customer support into a revenue channel through proactive social engagement and chat sales.',       metrics:[{label:'Sales Lift',value:'+25%'},{label:'Response',value:'<30s'},{label:'ROI',value:'400%'}],            tags:['Social Media','Sales','Retail'],                 status:'published', body:'', created_at:'2024-07-01' },
  { id:5, client:'PropTech Platform',      industry:'Real Estate',        icon_name:'Building2',    title:'Streamlining Tenant Verification & Leasing Admin',            description:'Centralizing back-office operations for a property management platform managing 50k+ units.',               metrics:[{label:'Processing',value:'2x Faster'},{label:'Savings',value:'$1.2M'},{label:'Errors',value:'0%'}],      tags:['PropTech','Back Office','Admin'],                status:'published', body:'', created_at:'2024-06-01' },
  { id:6, client:'Healthcare Network',     industry:'Healthcare',         icon_name:'Activity',     title:'HIPAA-Compliant Patient Intake & Scheduling',                 description:'Secure, empathetic patient coordination support for a multi-state hospital network.',                       metrics:[{label:'No-Shows',value:'-30%'},{label:'Answer Rate',value:'99%'},{label:'Compliance',value:'100%'}],     tags:['Healthcare','Voice Support','HIPAA'],            status:'published', body:'', created_at:'2024-05-01' },
];

const SEED_EBOOKS: Ebook[] = [
  { id:1, title:'State of Global AI Operations 2025',    description:'An in-depth analysis of how 500+ enterprise leaders are integrating agentic AI into their workforce strategy.',        pages:'45 Pages', icon_name:'Globe',      color:'bg-blue-500',   pdf_url:'', status:'published', created_at:'2024-10-01' },
  { id:2, title:'The Ultimate Guide to QA Automation',   description:'Moving beyond manual testing: A framework for building self-healing regression suites with offshore teams.',           pages:'32 Pages', icon_name:'Cpu',        color:'bg-purple-500', pdf_url:'', status:'published', created_at:'2024-09-01' },
  { id:3, title:'Fintech Compliance: The Offshore Playbook',description:'Navigating GDPR, SOC-2, and PCI-DSS when working with distributed financial operations teams.',                    pages:'28 Pages', icon_name:'Shield',     color:'bg-green-500',  pdf_url:'', status:'published', created_at:'2024-08-01' },
  { id:4, title:'ROI of Managed Creative Pods',          description:'Calculating the velocity and cost impact of switching from freelancers to dedicated creative units.',                  pages:'18 Pages', icon_name:'TrendingUp', color:'bg-orange-500', pdf_url:'', status:'published', created_at:'2024-07-01' },
];

const SEED_GUIDES: Guide[] = [
  { id:1, title:'The Ultimate Guide to AI-Augmented Offshoring',           category:'Strategic Playbook', read_time:'15 min read',          description:'A comprehensive blueprint for integrating agentic AI into your remote team workflows to 3x productivity.',         icon_name:'BrainCircuit', featured:true,  status:'published', body:'', created_at:'2024-10-01' },
  { id:2, title:'Building a 24/7 Customer Support Operation from Scratch', category:'Operational Guide',  read_time:'10 min read',          description:'Step-by-step framework for setting up shifts, tooling, and QA processes for round-the-clock coverage.',              icon_name:'Users',        featured:false, status:'published', body:'', created_at:'2024-09-01' },
  { id:3, title:'Scaling Engineering Teams: The Pod Model Explained',      category:'Technical Guide',    read_time:'12 min read',          description:"Why the 'Pod' structure outperforms individual staff augmentation for software development projects.",              icon_name:'Layers',       featured:false, status:'published', body:'', created_at:'2024-08-01' },
  { id:4, title:'Quality Assurance in the Age of Generative AI',           category:'Quality Control',    read_time:'8 min read',           description:'How to adapt your QA frameworks when using LLMs for content and code generation.',                                  icon_name:'FileText',     featured:false, status:'published', body:'', created_at:'2024-07-01' },
  { id:5, title:"The CFO's Guide to Outsourcing ROI",                      category:'Finance',            read_time:'10 min read',          description:'Moving beyond simple labor arbitrage to calculating total value creation and velocity impact.',                      icon_name:'BarChart3',    featured:false, status:'published', body:'', created_at:'2024-06-01' },
  { id:6, title:'Managing Remote Creative Teams: A Style Guide Template',  category:'Creative Ops',       read_time:'Downloadable Template',description:'Standardize your visual identity across borders with this customizable SOP template.',                               icon_name:'Palette',      featured:false, status:'published', body:'', created_at:'2024-05-01' },
];

const SEED_WEBINARS: Webinar[] = [
  { id:1, title:'The Rise of Agentic AI: Transforming Operations in 2025', date:'October 24, 2024', time:'10:00 AM PST', speakers:['Dr. Elena Vance, AI Strategy','Marcus Jordon, VP Ops'], description:"Join us for a deep dive into the next generation of AI agents that don't just chat, but execute complex workflows independently.", thumb:'', duration:'', is_upcoming:true,  registration_url:'', status:'published', created_at:'2024-10-01' },
  { id:2, title:'Scaling Engineering Teams: Offshore vs. Nearshore',       date:'Sep 12, 2024',     time:'',            speakers:[],                                                        description:'', thumb:'https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=600&h=400', duration:'45 min', is_upcoming:false, registration_url:'', status:'published', created_at:'2024-09-12' },
  { id:3, title:'CX Automation: Balancing Bots and Humans',                date:'Aug 28, 2024',     time:'',            speakers:[],                                                        description:'', thumb:'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=600&h=400', duration:'55 min', is_upcoming:false, registration_url:'', status:'published', created_at:'2024-08-28' },
  { id:4, title:'Fintech Compliance in a Distributed World',               date:'Jul 15, 2024',     time:'',            speakers:[],                                                        description:'', thumb:'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600&h=400', duration:'60 min', is_upcoming:false, registration_url:'', status:'published', created_at:'2024-07-15' },
  { id:5, title:'Building a 24/7 Global Brand Strategy',                   date:'Jun 30, 2024',     time:'',            speakers:[],                                                        description:'', thumb:'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400', duration:'40 min', is_upcoming:false, registration_url:'', status:'published', created_at:'2024-06-30' },
];

// ─────────────────────────────────────────────────────────────────
// JOBS
// ─────────────────────────────────────────────────────────────────
export async function getJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs').select('*').eq('active', true).order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_JOBS;
  return data;
}

export async function getAllJobs(): Promise<Job[]> {
  const { data, error } = await supabase
    .from('jobs').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_JOBS;
  return data;
}

export async function saveJob(job: Partial<Job>): Promise<void> {
  if (job.id) {
    const { id, created_at, ...rest } = job as Job;
    const { error } = await supabase.from('jobs').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('jobs').insert(job);
    if (error) throw error;
  }
}

export async function deleteJob(id: number): Promise<void> {
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────────
// BLOG POSTS
// ─────────────────────────────────────────────────────────────────
export async function getBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts').select('*').eq('status', 'Published').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_BLOG;
  return data;
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const { data, error } = await supabase
    .from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_BLOG;
  return data;
}

export async function saveBlogPost(post: Partial<BlogPost>): Promise<void> {
  if (post.id) {
    const { id, created_at, ...rest } = post as BlogPost;
    const { error } = await supabase.from('blog_posts').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('blog_posts').insert(post);
    if (error) throw error;
  }
}

export async function deleteBlogPost(id: number): Promise<void> {
  const { error } = await supabase.from('blog_posts').delete().eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────────
// CASE STUDIES
// ─────────────────────────────────────────────────────────────────
export async function getCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('case_studies').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_CASE_STUDIES;
  return data;
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  const { data, error } = await supabase
    .from('case_studies').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_CASE_STUDIES;
  return data;
}

export async function saveCaseStudy(item: Partial<CaseStudy>): Promise<void> {
  if (item.id) {
    const { id, created_at, ...rest } = item as CaseStudy;
    const { error } = await supabase.from('case_studies').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('case_studies').insert(item);
    if (error) throw error;
  }
}

export async function deleteCaseStudy(id: number): Promise<void> {
  const { error } = await supabase.from('case_studies').delete().eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────────
// EBOOKS
// ─────────────────────────────────────────────────────────────────
export async function getEbooks(): Promise<Ebook[]> {
  const { data, error } = await supabase
    .from('ebooks').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_EBOOKS;
  return data;
}

export async function getAllEbooks(): Promise<Ebook[]> {
  const { data, error } = await supabase
    .from('ebooks').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_EBOOKS;
  return data;
}

export async function saveEbook(item: Partial<Ebook>): Promise<void> {
  if (item.id) {
    const { id, created_at, ...rest } = item as Ebook;
    const { error } = await supabase.from('ebooks').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('ebooks').insert(item);
    if (error) throw error;
  }
}

export async function deleteEbook(id: number): Promise<void> {
  const { error } = await supabase.from('ebooks').delete().eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────────
// GUIDES
// ─────────────────────────────────────────────────────────────────
export async function getGuides(): Promise<Guide[]> {
  const { data, error } = await supabase
    .from('guides').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_GUIDES;
  return data;
}

export async function getAllGuides(): Promise<Guide[]> {
  const { data, error } = await supabase
    .from('guides').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_GUIDES;
  return data;
}

export async function saveGuide(item: Partial<Guide>): Promise<void> {
  if (item.id) {
    const { id, created_at, ...rest } = item as Guide;
    const { error } = await supabase.from('guides').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('guides').insert(item);
    if (error) throw error;
  }
}

export async function deleteGuide(id: number): Promise<void> {
  const { error } = await supabase.from('guides').delete().eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────────
// WEBINARS
// ─────────────────────────────────────────────────────────────────
export async function getWebinars(): Promise<Webinar[]> {
  const { data, error } = await supabase
    .from('webinars').select('*').eq('status', 'published').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_WEBINARS;
  return data;
}

export async function getAllWebinars(): Promise<Webinar[]> {
  const { data, error } = await supabase
    .from('webinars').select('*').order('created_at', { ascending: false });
  if (error || !data?.length) return SEED_WEBINARS;
  return data;
}

export async function saveWebinar(item: Partial<Webinar>): Promise<void> {
  if (item.id) {
    const { id, created_at, ...rest } = item as Webinar;
    const { error } = await supabase.from('webinars').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('webinars').insert(item);
    if (error) throw error;
  }
}

export async function deleteWebinar(id: number): Promise<void> {
  const { error } = await supabase.from('webinars').delete().eq('id', id);
  if (error) throw error;
}

// ─────────────────────────────────────────────────────────────────
// HUBSPOT FORMS
// ─────────────────────────────────────────────────────────────────
export async function getHubSpotForms(): Promise<HubSpotForm[]> {
  const { data, error } = await supabase
    .from('hubspot_forms').select('*').order('id', { ascending: true });
  if (error) return [];
  return data ?? [];
}

export async function saveHubSpotForm(form: Partial<HubSpotForm>): Promise<void> {
  if (form.id) {
    const { id, ...rest } = form as HubSpotForm;
    const { error } = await supabase.from('hubspot_forms').update(rest).eq('id', id);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('hubspot_forms').insert(form);
    if (error) throw error;
  }
}

// ─────────────────────────────────────────────────────────────────
// DASHBOARD STATS
// ─────────────────────────────────────────────────────────────────
export async function getDashboardStats() {
  const [jobs, posts, cases] = await Promise.all([
    supabase.from('jobs').select('id, active', { count: 'exact' }),
    supabase.from('blog_posts').select('id, status', { count: 'exact' }),
    supabase.from('case_studies').select('id, status', { count: 'exact' }),
  ]);
  return {
    activeJobs:      (jobs.data ?? []).filter((j: any) => j.active).length,
    publishedPosts:  (posts.data ?? []).filter((p: any) => p.status === 'Published').length,
    draftPosts:      (posts.data ?? []).filter((p: any) => p.status === 'Draft').length,
    publishedCases:  (cases.data ?? []).filter((c: any) => c.status === 'published').length,
  };
}
