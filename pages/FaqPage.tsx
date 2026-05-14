
import React, { useState, useMemo } from 'react';
import { Plus, Minus, Search, ArrowRight, Users, Terminal, Layers, FileText, Palette, BrainCircuit, Building2, UserCheck } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200&h=800";

const SERVICE_CATEGORIES = [
  {
    id: 'cx',
    label: 'Customer Support',
    icon: Users,
    questions: [
      { q: "What customer support channels can KDCI cover?", a: "We support voice, email, live chat, social media DMs, SMS, and in-app messaging. Our agents are trained across multiple channels simultaneously, so you get a true omnichannel operation from a single managed team." },
      { q: "What are your typical CSAT and FCR benchmarks?", a: "Across our managed CX pods, we consistently deliver 4.7–4.9/5 CSAT and 85–92% First Contact Resolution. We publish monthly QA scorecards for full transparency." },
      { q: "Can KDCI handle 24/7 support coverage?", a: "Yes. We run three overlapping shifts from Metro Manila, giving you uninterrupted coverage across all time zones without the complexity of managing multiple vendors." },
      { q: "How quickly can we ramp up a support team?", a: "Our standard ramp is 14 days for a 5-agent pod. We maintain a pre-vetted bench of trained candidates, so we can often exceed that speed for urgent scaling needs." },
      { q: "Do your agents handle escalations and complex complaints?", a: "Absolutely. We train a dedicated Tier 2 and Tier 3 layer within each pod. Complex escalations are routed automatically using AI triage and handled by senior agents with specialized domain knowledge." },
      { q: "Can KDCI integrate with our existing helpdesk platform?", a: "Yes. Our agents are proficient in Zendesk, Freshdesk, Salesforce Service Cloud, Intercom, Gorgias, HubSpot Service Hub, Kustomer, and most major platforms. We can be operational in your stack within days." },
      { q: "How do you maintain quality across a large team?", a: "We use our proprietary QA system that samples 15% of all interactions weekly, scoring them against a calibrated rubric. Agents receive weekly coaching, and Team Leads review results daily." },
      { q: "Can agents upsell and cross-sell during support interactions?", a: "Yes. We run dedicated 'support-to-sales' training programs. Our retail and e-commerce clients see an average 18–25% lift in revenue from support interactions through proactive upselling." },
      { q: "What languages can KDCI support?", a: "Our primary language is English (neutral accent). We also have agents proficient in Spanish, French, Mandarin, Japanese, and German. For specialized language needs, we can source and train within 4–6 weeks." },
      { q: "How do you handle spikes in volume (holiday, campaign surges)?", a: "We build flexible surge capacity into every contract. You can request additional seats with 72-hour notice for up to 30% above your base headcount. For larger surges, we plan together 30 days in advance." },
    ]
  },
  {
    id: 'eng',
    label: 'Software Engineering',
    icon: Terminal,
    questions: [
      { q: "What tech stacks and languages does KDCI's engineering team cover?", a: "Our engineers are proficient in React, Vue, Angular, Node.js, Python, Java, Go, Ruby on Rails, .NET, Swift, Kotlin, and more. We also have specialists in DevOps (AWS, GCP, Azure), data engineering, and ML/AI pipelines." },
      { q: "What is the 'Pod Model' for engineering teams?", a: "A Pod is a self-contained delivery unit — typically 3–8 engineers led by a Tech Lead, with an embedded QA Engineer and optionally a Product Manager. Pods operate like an internal squad within your org chart." },
      { q: "How do KDCI engineers integrate with our existing team?", a: "Seamlessly. Our engineers join your Slack, attend your standups, commit to your GitHub/GitLab, and work within your sprint cycles. We are timezone-aligned and communicate proactively." },
      { q: "How do you vet software engineers?", a: "Our engineering selection process has four stages: a technical logic screen, a domain-specific coding test, a live pair-programming session with a KDCI senior engineer, and a cultural-fit interview. We accept under 2% of applicants." },
      { q: "Can KDCI take on a full project end-to-end, or only staff augmentation?", a: "Both. We offer pure staff augmentation (engineers embedded in your team), managed delivery pods (self-directed squads), and full project outsourcing (we scope, build, and deliver with defined milestones)." },
      { q: "How do you handle IP and code ownership?", a: "All code produced by KDCI engineers is assigned to you via our standard MSA. We sign NDA and IP assignment clauses from day one, and your codebase never leaves your repositories." },
      { q: "What is your experience with legacy system modernization?", a: "It's one of our specialties. We have delivered monolith-to-microservices migrations, mainframe data extractions, and cloud-lift-and-shift projects for enterprises across Logistics, Healthcare, and Fintech verticals." },
      { q: "Can KDCI support startup-speed development (MVP in weeks)?", a: "Yes. We have a dedicated startup pod structure optimized for rapid prototyping. Our fastest MVP delivery was a full-stack web app with API integrations in 11 business days." },
      { q: "Do you provide dedicated QA engineers?", a: "Yes. Every engineering pod includes at least one embedded QA engineer. We write automated regression suites in Playwright, Cypress, or Selenium and run CI/CD-integrated pipelines on every PR." },
      { q: "How is engineering performance tracked and reported?", a: "We provide weekly sprint velocity reports, bug-rate tracking, PR merge rates, and deployment frequency dashboards. You get full visibility into output quality, not just activity." },
    ]
  },
  {
    id: 'staffaug',
    label: 'Staff Augmentation',
    icon: Layers,
    questions: [
      { q: "What roles can KDCI source for staff augmentation?", a: "We cover a broad spectrum: software engineers, QA engineers, data analysts, digital marketers, graphic designers, video editors, accountants, virtual assistants, customer support agents, HR coordinators, and more." },
      { q: "How long does it take to source and onboard a new team member?", a: "For most roles, our time-to-placement is 5–10 business days. For highly specialized technical roles, expect 2–3 weeks. We maintain a pre-vetted talent bench to accelerate common requests." },
      { q: "Who manages the day-to-day work of augmented staff?", a: "In our standard augmentation model, your team manages daily tasks, priorities, and deliverables. KDCI handles HR, payroll, compliance, equipment, facilities, and performance management in the background." },
      { q: "Can I replace a staff member if they're not a good fit?", a: "Yes, within the first 30 days we provide a free replacement with no questions asked. After that period, we work collaboratively to address performance concerns through our managed HR process." },
      { q: "Do augmented staff work exclusively for my company?", a: "Yes. All KDCI staff augmentation placements are 100% dedicated to your account. They use your tools, represent your brand, and do not work for other clients." },
      { q: "What equipment and workspace does KDCI provide?", a: "We provide a fully equipped workstation (PC or Mac depending on role), high-speed primary and backup internet, a professional headset, an ergonomic workspace, and 24/7 IT support — all included in the monthly rate." },
      { q: "How is compensation structured for the offshore staff?", a: "KDCI pays all salaries, benefits (HMO, 13th month pay, paid leaves), SSS, and government contributions in the Philippines. You pay one all-inclusive monthly fee to KDCI in USD." },
      { q: "Can I scale staff up or down based on business needs?", a: "Yes. Our contracts allow for flexible scaling with 30-day notice for reductions and near-immediate scale-up from our bench. Enterprise clients can negotiate on-demand surge provisions." },
      { q: "What is your staff retention rate?", a: "Our annual staff retention rate is 92%, significantly above the Philippine BPO industry average of 70%. We invest in career development, competitive compensation, and a strong team culture." },
      { q: "Can I conduct my own interviews and select the candidates?", a: "Absolutely. We present a shortlist of 3–5 pre-screened candidates per role and you conduct final interviews. You make the hire decision — we handle the rest." },
    ]
  },
  {
    id: 'backoffice',
    label: 'Back Office Operations',
    icon: FileText,
    questions: [
      { q: "What types of back office functions does KDCI handle?", a: "We manage data entry, document processing, claims administration, invoice processing, accounts payable/receivable support, compliance documentation, report generation, CRM data hygiene, and administrative coordination." },
      { q: "How do you ensure data accuracy in high-volume processing tasks?", a: "We use a dual-key verification system for critical data entry, automated validation rules, and random sample audits. Our documented accuracy rate across all data operations is 99.6%." },
      { q: "Can KDCI handle document-heavy workflows like contracts or claims?", a: "Yes. We have dedicated document processing teams experienced in legal contracts, insurance claims, freight documentation, medical records, and financial statements. We use OCR + human review for maximum accuracy." },
      { q: "Is KDCI equipped to handle confidential business data?", a: "Yes. We are SOC-2 ready and ISO 27001 certified. All data processing occurs in secure, monitored environments with strict access controls, audit logging, and NDAs signed at every level of engagement." },
      { q: "Can you automate parts of our back office with AI?", a: "Yes. We layer AI tools onto existing workflows — intelligent document classification, automated data extraction via OCR, anomaly detection in financial data, and smart routing of work items. We don't just automate; we augment." },
      { q: "How do you handle peak volume periods (end of month, quarter close)?", a: "We build surge capacity into back office contracts. For cyclical peaks, we pre-plan staffing adjustments 3–4 weeks in advance. Ad-hoc surges up to 25% above base can be accommodated with 48 hours notice." },
      { q: "Can KDCI integrate with our ERP or accounting software?", a: "Yes. Our teams are trained on SAP, Oracle, NetSuite, QuickBooks, Xero, Microsoft Dynamics, and most major platforms. We can also operate through secure remote desktop or VDI environments." },
      { q: "What industries do your back office teams specialize in?", a: "We have deep vertical expertise in Fintech, Healthcare (HIPAA-compliant), Real Estate, Logistics, Insurance, and Professional Services. Each vertical has a dedicated knowledge base and trained specialist team." },
      { q: "How are back office KPIs tracked and reported?", a: "We deliver weekly performance dashboards covering throughput, error rate, turnaround time, and SLA compliance. Monthly business reviews include trend analysis and continuous improvement recommendations." },
      { q: "Do you offer a pilot or proof-of-concept engagement?", a: "Yes. We offer a 30-day pilot for new back office engagements where we run a defined workflow in parallel with your existing process. This lets you validate quality and speed before full transition." },
    ]
  },
  {
    id: 'creative',
    label: 'Creative Production',
    icon: Palette,
    questions: [
      { q: "What creative services does KDCI's production team provide?", a: "We offer graphic design, video editing and production, motion graphics, UI/UX design, social media content creation, copywriting, email design, ad creative (static and animated), and brand identity work." },
      { q: "How does a managed creative pod work?", a: "A Creative Pod is a dedicated team of 2–6 creatives (Art Director, Designers, Video Editors, Copywriter) assigned exclusively to your account. They operate as your in-house team, just offshore." },
      { q: "What design tools does your team use?", a: "Our designers work in Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects), Canva Pro, Webflow, and Framer. We adapt to whatever's in your existing workflow." },
      { q: "Can KDCI maintain our brand guidelines at scale?", a: "Absolutely. We conduct a brand onboarding session in week one, build a shared asset library, and implement a style guide review step into every deliverable. Brand consistency is a core KPI for our creative teams." },
      { q: "How do we manage revisions and feedback loops?", a: "We use a structured feedback process via Frame.io for video, Figma comments for design, and a project board (Asana, ClickUp, or Notion) for all task tracking. Most feedback cycles complete in under 24 hours." },
      { q: "How quickly can KDCI produce content at scale?", a: "Our creative pods can produce 50–200+ social media assets per month, 10–30 video edits per month, and unlimited copy drafts depending on pod size. We're built for high-velocity creative output." },
      { q: "Do your creatives have experience with performance marketing assets?", a: "Yes. We have a dedicated performance creative unit that specializes in direct-response ad creative for Meta, TikTok, Google, and YouTube. We understand hooks, CTAs, and creative testing frameworks." },
      { q: "Can KDCI handle video production from raw footage?", a: "Yes. Our video editors work from your raw footage, stock footage, and motion graphics briefs. We produce polished edits for social, YouTube, webinars, product demos, and brand films." },
      { q: "How do we share files and assets with the creative team?", a: "We work through whatever system you prefer — Google Drive, Dropbox, Frame.io, WeTransfer, or your DAM. We also maintain a KDCI-hosted asset management environment if you don't have one." },
      { q: "What's the minimum team size for a creative engagement?", a: "You can start with a single dedicated creative (e.g., one Graphic Designer or one Video Editor) at a monthly flat rate. Most clients scale to full pods within 90 days after validating the initial hire." },
    ]
  },
  {
    id: 'ai',
    label: 'AI Operations',
    icon: BrainCircuit,
    questions: [
      { q: "What is 'AI Operations' and how does KDCI deliver it?", a: "AI Operations (AI Ops) is the integration of intelligent automation into business workflows — using large language models, OCR, computer vision, and process automation layered with human oversight. KDCI designs, deploys, and manages these hybrid human-AI systems for clients." },
      { q: "Do I need to have my own AI tools for KDCI to work with?", a: "No. We bring our own AI stack including LLM integrations, workflow automation platforms, and proprietary QA tools. We can also integrate with your existing AI infrastructure or tools like OpenAI, Anthropic, or Google AI." },
      { q: "Can KDCI build custom AI agents for my business processes?", a: "Yes. Our AI engineering team designs and deploys custom agentic workflows using LangChain, CrewAI, and similar frameworks. We build agents for tasks like automated research, document review, outreach sequencing, and data synthesis." },
      { q: "How do you handle AI hallucinations and accuracy in automated workflows?", a: "We implement human-in-the-loop checkpoints at every critical step. Our AI agents generate outputs that are reviewed and approved by trained human operators before execution, ensuring accuracy without sacrificing speed." },
      { q: "What business processes are best suited for AI augmentation?", a: "High-volume, rule-based tasks with structured inputs are ideal: document classification, data extraction, content generation, email routing, lead scoring, report generation, and first-response customer support triage." },
      { q: "Can you help us identify automation opportunities in our current operations?", a: "Yes. We offer a free 2-hour Operations Audit session where our AI solutions architects map your existing workflows and identify the highest-ROI automation opportunities, ranked by effort and impact." },
      { q: "How is AI performance monitored over time?", a: "We track accuracy rates, task completion rates, time savings, and error rates through a monthly AI Ops performance report. Models are retrained or updated as your data and processes evolve." },
      { q: "Is agentic AI safe to deploy in regulated industries like Fintech or Healthcare?", a: "Yes, with the right safeguards. We implement strict data governance, encrypted pipelines, audit logs, and human approval gates for any sensitive outputs. We have deployed AI Ops solutions for HIPAA and SOC-2 environments." },
      { q: "What is the typical ROI timeline for an AI Ops engagement?", a: "Most clients see measurable ROI within 60–90 days. Common outcomes include 40–80% reduction in manual processing time, 30–50% cost reduction versus purely human teams, and near-zero error rates on automated tasks." },
      { q: "How does KDCI stay current with rapidly evolving AI technology?", a: "Our AI Labs team conducts weekly model evaluations, attends major AI research conferences, and has direct partnerships with leading AI vendors. We proactively upgrade client workflows when superior tools become available." },
    ]
  },
  {
    id: 'proptech',
    label: 'Property Management',
    icon: Building2,
    questions: [
      { q: "What property management tasks can KDCI's team handle remotely?", a: "We handle tenant inquiries, lease administration, maintenance request coordination, tenant onboarding and verification, rental payment tracking, vendor communication, move-in/move-out documentation, and portfolio reporting." },
      { q: "Is KDCI experienced with property management software platforms?", a: "Yes. Our teams are trained on AppFolio, Buildium, Yardi, Rent Manager, DoorLoop, RealPage, and Property Meld, among others. We adapt to your existing PropTech stack." },
      { q: "How does KDCI handle after-hours maintenance emergencies?", a: "We staff 24/7 maintenance coordination desks that receive and triage emergency calls, dispatch your approved vendor network, and provide tenants with real-time status updates — at a fraction of the cost of a local after-hours team." },
      { q: "Can KDCI support tenant screening and verification?", a: "Yes. We process tenant applications, coordinate background and credit check submissions through your screening platform, verify employment and references, and produce a structured recommendation report for your review." },
      { q: "How do you handle lease renewals and rent escalations?", a: "We manage the full renewal workflow: sending renewal notices at your configured lead time, collecting responses, preparing lease amendment documents, and updating your property management system upon execution." },
      { q: "Can KDCI manage communication with vendors and contractors?", a: "Yes. We coordinate your approved vendor list, issue work orders, track completion, process invoices against work orders, and maintain a maintenance log for each property — keeping your operations audit-ready at all times." },
      { q: "Is KDCI familiar with compliance requirements for residential and commercial property?", a: "Our teams are trained on common regulatory requirements including habitability standards, security deposit regulations, lease disclosure requirements, and Fair Housing Act compliance. We flag compliance risks and escalate to your team." },
      { q: "How does KDCI handle high-volume leasing for large portfolios?", a: "We scale dedicated leasing desk teams proportional to your portfolio size. For portfolios of 1,000+ units, we implement AI-assisted inquiry triage and automated scheduling to handle volume without sacrificing response time." },
      { q: "Can KDCI prepare financial reports for property portfolios?", a: "Yes. Our back office layer produces monthly income and expense reports, occupancy summaries, rent roll reports, and variance analyses — formatted to your specifications and ready for investor or owner distribution." },
      { q: "What is your data security approach for tenant personal information?", a: "Tenant PII is handled under strict data governance protocols. We apply role-based access controls, encrypted storage, and access audit logging. All team members handling tenant data sign comprehensive data handling agreements." },
    ]
  },
  {
    id: 'recruitment',
    label: 'Agentic Recruitment',
    icon: UserCheck,
    questions: [
      { q: "What is 'Agentic Recruitment' and how is it different from traditional RPO?", a: "Agentic Recruitment combines AI-driven sourcing and screening with expert human recruiters to dramatically accelerate hiring. Unlike traditional RPO that relies purely on human effort, our system automates outreach, resume scoring, and initial qualification — delivering a curated shortlist in days, not weeks." },
      { q: "What types of roles does KDCI's Agentic Recruitment cover?", a: "We specialize in technical roles (software engineers, data scientists, DevOps), operations roles (project managers, team leads, operations analysts), creative roles, and executive/leadership positions. We source globally with deep expertise in Southeast Asia, Latin America, and Eastern Europe." },
      { q: "How fast can KDCI deliver a shortlist of qualified candidates?", a: "For mid-level roles, our AI sourcing layer identifies and pre-screens candidates within 48–72 hours. A curated shortlist of 3–5 interview-ready candidates typically lands in your inbox within 5 business days." },
      { q: "Does KDCI handle the full recruitment lifecycle or just sourcing?", a: "We offer end-to-end: job brief → AI sourcing → initial screening → skills assessment → coordinated interviews → offer management → onboarding coordination. Or we can plug into specific stages of your existing process." },
      { q: "How does the AI screening component work?", a: "Our AI layer parses resumes against your job requirements, scores candidates on defined criteria, and runs an automated async video or text screening. Human recruiters then review the AI-scored results and validate the shortlist." },
      { q: "What is your placement success rate and time-to-fill?", a: "Our average time-to-fill for technical roles is 11 business days. Our 90-day retention rate for placements is 96%. We offer a free replacement guarantee within the first 60 days if a placement doesn't work out." },
      { q: "Can KDCI run high-volume hiring campaigns?", a: "Yes. We have delivered hiring sprints of 50–200+ roles within 30–60 day windows for clients with aggressive scaling needs. Our AI infrastructure scales linearly with volume without sacrificing quality." },
      { q: "How do you source passive candidates who aren't actively job-hunting?", a: "Our AI agents conduct multi-channel outreach across LinkedIn, GitHub, Behance, and industry communities with personalized messaging. We consistently achieve 35–45% response rates from passive candidates — 3x the industry average." },
      { q: "Does KDCI help with employer branding for talent attraction?", a: "Yes. We offer an employer brand audit and can produce targeted content (team stories, culture posts, job-specific landing pages) to improve candidate response rates and quality of applicants for your open roles." },
      { q: "How are recruiter fees structured — contingency or retained?", a: "We offer both models. For retained search (executive or specialized roles), we charge a 33% upfront engagement fee. For volume or mid-level roles, we operate on a success-based placement fee. Monthly flat-rate RPO subscriptions are also available for ongoing hiring pipelines." },
    ]
  },
];

export const FaqPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeCategory, setActiveCategory] = useState('cx');
  const [openIndex, setOpenIndex]           = useState<number | null>(null);
  const [searchQuery, setSearchQuery]       = useState('');

  const currentCategory = SERVICE_CATEGORIES.find(c => c.id === activeCategory)!;

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return currentCategory.questions;
    const q = searchQuery.toLowerCase();
    return currentCategory.questions.filter(item =>
      item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q)
    );
  }, [searchQuery, activeCategory, currentCategory]);

  const handleCategoryChange = (id: string) => {
    setActiveCategory(id);
    setOpenIndex(null);
    setSearchQuery('');
  };

  return (
    <div className="min-h-screen bg-white">

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-16 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="FAQ" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black" />
        </div>
        <div className="mesh-container opacity-40">
          <div className="blob blob-purple" />
          <div className="blob blob-magenta opacity-30" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Help Center" />
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-white tracking-tight leading-[1.1] drop-shadow-2xl mb-4">
            <span className="text-shine-white">Frequently Asked</span><br />
            <span className="text-[#E61739]">Questions.</span>
          </h1>
          <p className="text-white/60 text-lg font-medium max-w-2xl mx-auto">
            Everything you need to know about our services, pricing, talent, and operations.
          </p>
        </div>
      </section>

      {/* ── BODY ── */}
      <section className="py-16 bg-[#F5F5F7]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ── LEFT NAV ── */}
            <aside className="lg:w-72 shrink-0">
              <div className="sticky top-28 bg-white rounded-[2rem] border border-black/[0.04] p-3 shadow-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 px-4 pt-3 pb-2">Service Categories</p>
                <nav className="flex flex-col gap-1">
                  {SERVICE_CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    const active = activeCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryChange(cat.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          active
                            ? 'bg-[#E61739] text-white shadow-md'
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <Icon size={18} className={active ? 'text-white' : 'text-slate-400'} />
                        <span className="font-bold text-sm">{cat.label}</span>
                        <span className={`ml-auto text-[10px] font-black px-2 py-0.5 rounded-full ${active ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-400'}`}>
                          10
                        </span>
                      </button>
                    );
                  })}
                </nav>
              </div>
            </aside>

            {/* ── RIGHT CONTENT ── */}
            <div className="flex-1 min-w-0">

              {/* Search */}
              <div className="relative mb-8">
                <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder={`Search in ${currentCategory.label}...`}
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white focus:border-[#E61739]/40 transition-all placeholder:text-slate-400 outline-none"
                />
              </div>

              {/* Category header */}
              <div className="flex items-center gap-4 mb-6">
                {(() => { const Icon = currentCategory.icon; return (
                  <div className="w-12 h-12 bg-[#E61739] rounded-2xl flex items-center justify-center text-white shrink-0">
                    <Icon size={22} />
                  </div>
                ); })()}
                <div>
                  <h2 className="text-2xl font-bold text-slate-900 leading-tight">{currentCategory.label}</h2>
                  <p className="text-sm text-slate-400 font-medium">{filtered.length} question{filtered.length !== 1 ? 's' : ''}</p>
                </div>
              </div>

              {/* Accordion */}
              {filtered.length === 0 ? (
                <div className="bg-white rounded-[2rem] p-16 text-center text-slate-400 font-medium border border-black/[0.04]">
                  No questions match your search.
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((item, i) => {
                    const isOpen = openIndex === i;
                    return (
                      <div
                        key={i}
                        className={`rounded-2xl border transition-all duration-300 ${isOpen ? 'bg-white border-[#E61739]/20 shadow-md' : 'bg-white border-black/[0.04] hover:border-slate-200 hover:shadow-sm'}`}
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : i)}
                          className="w-full text-left px-7 py-5 flex items-start justify-between gap-6"
                        >
                          <span className={`text-base font-bold leading-snug pt-0.5 ${isOpen ? 'text-[#E61739]' : 'text-slate-900'}`}>
                            {item.q}
                          </span>
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${isOpen ? 'bg-[#E61739] text-white' : 'bg-slate-100 text-slate-500'}`}>
                            {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                          </div>
                        </button>
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                          <p className="px-7 pb-6 text-slate-500 font-medium leading-relaxed text-sm">{item.a}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto bg-[#020202] rounded-[5rem] overflow-hidden relative border border-white/5 group">
          <div className="mesh-container opacity-20 pointer-events-none">
            <div className="blob blob-purple opacity-30" />
            <div className="blob blob-magenta opacity-30" />
          </div>
          <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
            <div className="flex-1 px-12 py-[58px] md:px-20 md:py-[68px] flex flex-col justify-center">
              <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight leading-tight">
                Still have<br /><span className="text-shine-red">questions?</span>
              </h2>
              <p className="text-lg md:text-xl text-white/60 mb-10 font-medium leading-relaxed max-w-lg">
                Can't find what you're looking for? Our solutions team is ready to help.
              </p>
              <div>
                <button
                  onClick={() => setView('contact')}
                  className="px-10 py-5 bg-[#E61739] text-white rounded-[2rem] font-bold text-lg hover:bg-[#c51431] transition-all glow-red shadow-2xl inline-flex items-center gap-3 group/cta"
                >
                  Talk to Our Team <ArrowRight size={20} className="group-hover/cta:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
            <div className="lg:w-[777px] shrink-0 relative min-h-[260px]">
              <img src="/kdci-challenge.png" alt="KDCI Team" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '0% top' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
