
import React, { useState, useMemo } from 'react';
import { Plus, Minus, Search, ArrowRight, Users, Monitor, Cpu, Palette, TrendingUp, UserCheck } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=1200&h=800";

const SERVICE_CATEGORIES = [
  {
    id: 'ai-monitoring',
    label: 'AI Agent Monitoring',
    icon: Monitor,
    questions: [
      { q: "What exactly counts as an 'AI agent' for monitoring purposes?", a: "Any automated system using a large language model (LLM) to handle customer interactions, internal queries, data processing, or decision support — including chatbots, voice agents, email bots, support agents on Intercom or Zendesk, and custom-built LLM workflows." },
      { q: "How do you detect prompt drift?", a: "We run daily automated evaluation benchmarks against a set of baseline test cases established at kickoff. When accuracy scores fall below threshold — or when hallucination rates, escalation rates, or latency spikes are detected — our system flags the agent for human review and retraining." },
      { q: "What's the response time when an issue is detected?", a: "Critical issues (agent failures, integration outages) are escalated within 4 business hours. Performance drift triggers a review within one business day, with optimization executed and tested within the same week." },
      { q: "Do you need admin access to our AI platforms?", a: "We need read access to your agent configurations and, for optimization, the ability to update prompt templates. We document every change and require client approval for any structural modifications to an agent's logic." },
      { q: "What AI platforms and helpdesks do you support?", a: "We support agents built on OpenAI, Anthropic, Google Gemini, and most LLM platforms. For integrations, we work with Intercom, Zendesk, Freshdesk, HubSpot, Salesforce, and custom API-based setups." },
      { q: "How is pricing calculated — is it per agent?", a: "Pricing is tier-based, not strictly per-agent. Each tier covers a range (1–2, 3–5, or unlimited agents) and includes a standard set of services. For high-volume deployments, we build custom pricing around the complexity of your stack." },
      { q: "What happens if an agent goes down completely?", a: "Full agent failures are treated as critical incidents. Your AI Ops Specialist is notified immediately, investigates root cause, and coordinates with your team or vendor to restore service. You receive an incident report within 24 hours." },
      { q: "Can you monitor voice AI agents (e.g. Retell AI, Vapi)?", a: "Yes. We monitor voice agents for call completion rate, resolution rate, transfer rate, and sentiment patterns. We also review call transcripts to catch accuracy issues that automated scoring may miss." },
      { q: "How is sensitive customer data handled during monitoring?", a: "All monitoring is conducted on anonymized or aggregated performance data wherever possible. If transcript review is required, we follow your data handling policy and can operate under NDA and DPA agreements." },
      { q: "What's included in the monthly scorecard?", a: "The monthly scorecard includes: agent-by-agent accuracy scores, drift trend charts, escalation rate analysis, integration health status, prompt optimization summary, benchmark comparisons to your industry baseline, and a prioritized recommendation list for the next 30 days." },
    ]
  },
  {
    id: 'ai-consulting',
    label: 'AI Consulting & Implementation',
    icon: Cpu,
    questions: [
      { q: "What does AI Consulting & Implementation actually include?", a: "It covers the full lifecycle: discovery and process audit, AI strategy design, custom agent or workflow builds, integration into your existing systems, staff training, and ongoing optimisation. We don't just advise — we build and run the solution alongside your team until outcomes are proven." },
      { q: "How long does it take to go from consultation to a live AI solution?", a: "Most clients are live with their first AI workflow within 21 business days. Discovery and scoping takes 3–5 days, build and configuration takes 10–14 days, and deployment with UAT takes 3–5 days. Complex multi-agent systems may take 4–6 weeks depending on integration depth." },
      { q: "Do we need an existing AI strategy before KDCI can help us?", a: "No. Most clients come to us without one. Our first step is always a free 2-hour Operations Audit where we map your current workflows, identify the highest-ROI automation opportunities, and present a prioritised AI roadmap before any contract is signed." },
      { q: "What AI platforms and frameworks does KDCI work with?", a: "We work with OpenAI (GPT-4o), Anthropic (Claude), Google Gemini, Mistral, and open-source LLMs. For agentic frameworks we use LangChain, CrewAI, n8n, Make, and Zapier. We also integrate with your existing stack — CRMs, ERPs, helpdesks, and data warehouses." },
      { q: "Can KDCI build custom AI agents for our specific workflows?", a: "Yes. Our AI engineering team designs and deploys purpose-built agents for tasks like automated research, document classification, outreach sequencing, data extraction, report generation, and first-response triage. Every agent is built to your specific data schema and approval requirements." },
      { q: "How do you handle hallucinations and accuracy in automated workflows?", a: "We implement human-in-the-loop checkpoints at every critical decision point. AI agents generate outputs that are reviewed by trained human operators before execution. We also run accuracy benchmarks weekly and retrain or reprompt when performance drifts below agreed thresholds." },
      { q: "What business processes are most suited for AI augmentation?", a: "High-volume, rule-based tasks with structured inputs deliver the fastest ROI: document classification, data extraction, content generation at scale, email routing, lead scoring, invoice processing, and first-response support triage. We also handle complex multi-step research and synthesis workflows." },
      { q: "How is AI performance monitored after implementation?", a: "We track accuracy rates, task completion rates, processing speed, and error rates through a monthly AI performance report. Dashboards are delivered weekly during the first 90 days. Models are retrained or updated as your data evolves or new LLM versions outperform the current stack." },
      { q: "Is agentic AI safe to deploy in regulated industries like Fintech or Healthcare?", a: "Yes, with the right safeguards. We implement strict data governance, encrypted pipelines, audit logs, and human approval gates for any sensitive outputs. We have deployed AI solutions in HIPAA-compliant healthcare environments and SOC-2 certified Fintech infrastructure." },
      { q: "What ROI should we expect and over what timeframe?", a: "Most clients see measurable ROI within 60–90 days of go-live. Typical outcomes: 40–80% reduction in manual processing time, 30–50% cost reduction versus purely human teams, and near-zero error rates on automated tasks. We define success metrics at kickoff and report against them monthly." },
    ]
  },
  {
    id: 'cx',
    label: 'AI-Augmented Customer Experience',
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
    id: 'creative',
    label: 'AI Creative Studio',
    icon: Palette,
    questions: [
      { q: "What makes KDCI's AI Creative Studio different from a traditional design agency?", a: "Our Manila team runs AI tools — Midjourney, Adobe Firefly, Runway ML, CapCut AI — at every stage of production. That means faster delivery, lower cost per asset, and consistent brand output without sacrificing quality. Traditional agencies bill hourly and have slower turnaround cycles. We operate on a production cadence model." },
      { q: "What's included in each pricing tier?", a: "Content Pack ($2,500/mo + $1K setup): 20 social posts, 4 carousels, and monthly brand assets — ideal for brands that need consistent social output. Creative Retainer ($4,500/mo + $1.5K setup): dedicated designer, unlimited requests, 5-day turnaround. Full Studio ($7,500/mo + $2.5K setup): full team covering brand, ads, video, and social with a 3-day priority SLA." },
      { q: "How quickly can we get started?", a: "We begin brand discovery within 48 hours of sign-off. Your first content batch is delivered by the end of Week 2. Full production cadence is live by Month 1. We're structured to move fast without skipping brand alignment." },
      { q: "How does AI-generated imagery work without going off-brand?", a: "We build a brand prompt library in Week 1 — documenting your colour palette, visual style, subject matter rules, and tone. Every AI image generated goes through a brand consistency review before delivery. You'll never receive outputs that don't match your visual identity." },
      { q: "Can you handle video and motion content?", a: "Yes. Our Full Studio tier includes a dedicated motion and video team. We use Runway ML for AI-assisted video, CapCut AI for short-form editing, and Adobe Premiere/After Effects for polished cuts. ElevenLabs handles voiceover where required." },
      { q: "What's the minimum commitment?", a: "All plans require a 3-month minimum. This ensures we have enough runway to complete onboarding, establish a production rhythm, and deliver measurable results. Most clients stay well beyond the minimum — our average engagement is over 18 months." },
      { q: "Can we start on a Content Pack and upgrade later?", a: "Absolutely — and this is the most common path. Many clients start with the Content Pack to validate quality and cadence, then move to the Creative Retainer or Full Studio as their creative needs scale. The upgrade is seamless because your brand guide and team are already in place." },
      { q: "What industries do you specialise in?", a: "Our highest-volume verticals are E-Commerce & Retail, Real Estate, SaaS & Tech, Hospitality, Professional Services, and Startups. We have pre-built template systems and production playbooks for each that accelerate onboarding significantly." },
      { q: "How do we manage revisions and feedback loops?", a: "We use a structured feedback process — Frame.io for video reviews, Figma comments for design assets, and a shared project board (Asana, ClickUp, or Notion) for all task tracking. Revision requests submitted before 12pm Manila time are typically turned around within the same business day." },
      { q: "What design tools does your team use?", a: "Our team works in Figma, Adobe Creative Suite (Photoshop, Illustrator, InDesign, Premiere Pro, After Effects), Canva Pro, Midjourney, Adobe Firefly, Runway ML, and CapCut AI. We adapt to whatever's already in your workflow and can operate within your existing DAM or asset library." },
    ]
  },
  {
    id: 'outbound',
    label: 'AI Outbound & Lead Generation',
    icon: TrendingUp,
    questions: [
      { q: "What exactly is 'fully managed' outbound?", a: "It means we handle every component: ICP definition, prospect sourcing, Clay enrichment, sequence writing, domain setup, inbox warm-up, LinkedIn campaign management, reply handling, meeting booking, CRM updates, and weekly reporting. You review and approve the ICP and sequences, then we run the engine. Your only job is to show up to the meetings we book." },
      { q: "Why is there a 6-week ramp before full performance?", a: "Cold email deliverability depends on sender reputation. Sending high volumes from a new domain immediately will land in spam. We use a structured warm-up protocol — starting with small batches, gradually increasing volume, monitoring bounce and spam rates — before scaling to full contact volume. Skipping this destroys your domain reputation. We don't skip it." },
      { q: "How many meetings should we expect?", a: "Meetings booked depend on ICP quality, deal size, and market saturation. Typical benchmarks for our managed programmes: 8–15 meetings/month on the Launch Package, 15–30 on the Growth Engine, and 25–45+ on the Full Outbound Team. These are ranges — actual results depend on your market and offer." },
      { q: "What's the difference between the Growth Engine and Full Outbound Team?", a: "The Growth Engine ($5,000/mo) runs 1,500 contacts/week across email and LinkedIn with multi-sequence testing — ideal for teams with a defined ICP who want to scale outbound. The Full Outbound Team ($8,000/mo) adds a dedicated SDR and researcher, 3,000+ contacts/week, Clay enrichment on every contact, and a weekly strategy call — it's a full outbound function, not just a campaign." },
      { q: "Do you handle LinkedIn outreach as well as email?", a: "Yes — LinkedIn outreach is included from the Growth Engine tier upward. We use LinkedIn Sales Navigator to run connection requests, personalised InMail sequences, and profile engagement campaigns, coordinated with email so the outreach is multi-channel rather than repetitive." },
      { q: "What CRM do you update and how?", a: "We natively integrate with HubSpot and Salesforce. Every qualified reply, booked meeting, and status change is logged in your CRM in real time. If you use a different CRM, we discuss integration options during onboarding — most standard CRMs can be connected via Zapier." },
      { q: "Can we review and approve the sequences before launch?", a: "Yes — always. We write the first sequence and present it for your review and approval before a single email is sent. You can request edits, approve, or reject. We iterate until you're satisfied. The same applies to LinkedIn scripts and A/B test variants." },
      { q: "What's the minimum commitment?", a: "All plans require a 3-month minimum. This gives the ramp period time to complete and delivers enough performance data to optimise. Most clients continue beyond 3 months — outbound compounds as we learn what resonates with your ICP and refine the sequences accordingly." },
      { q: "How do you personalise email sequences at scale?", a: "We use Clay to pull live data signals for every contact — recent funding rounds, new hire announcements, job postings, product launches, LinkedIn activity — and feed those signals into AI-written sentence-level personalization. Every email reads like it was researched manually, even at 3,000 contacts per week." },
      { q: "What happens if deliverability drops during a campaign?", a: "We monitor bounce rates, spam complaint rates, and inbox placement daily. If deliverability falls below our threshold, we pause sending immediately, investigate root cause (list quality, domain reputation, content triggers), remediate, and relaunch only after we've confirmed the issue is resolved. We never sacrifice your domain health for short-term volume." },
    ]
  },
  {
    id: 'workforce',
    label: 'AI Workforce Augmentation',
    icon: UserCheck,
    questions: [
      { q: "What makes KDCI.ai specialists different from a typical VA or offshore hire?", a: "Every specialist in our talent pool is AI-trained before placement — they arrive proficient in Claude, GPT-4o, Zapier, Midjourney, HubSpot, Notion AI, and other tools relevant to your role. You're not training someone on AI from scratch; you're embedding someone who already uses these tools in their daily workflow." },
      { q: "How fast can a specialist be live and productive?", a: "Our standard onboarding timeline runs 5–7 business days from role brief to first productive day. Day 1–2: brief call and KPI definition. Day 3–5: candidate matching from our talent pool. Day 6–7: your interviews and hire confirmation. Week 2: full onboarding and setup. Week 3: first productive week with daily check-ins." },
      { q: "What does the 2-week replacement guarantee mean?", a: "If a placed specialist isn't the right fit for any reason within the first 3 months, we find and onboard a replacement within 2 weeks at zero additional cost. No conditions, no rebooking fees." },
      { q: "What's included in the monthly fee?", a: "Everything. The flat monthly rate covers the specialist's salary, HR administration, payroll processing, Philippine statutory benefits, compliance documentation, and KDCI.ai's management layer. There are no hidden markups or additional HR costs on your end." },
      { q: "What's the difference between Part-Time and Full-Time plans?", a: "Part-Time ($2,000/mo) gives you 20 hours per week at a fixed schedule — ideal for focused AI ops or research roles. Full-Time ($3,500/mo) is a fully embedded team member at 40 hours per week. Both plans include all AI tools, HR management, and the 2-week replacement guarantee." },
      { q: "How does the Team (3+ seats) plan work?", a: "Team pricing starts at $2,800/seat/month for 3 or more dedicated specialists, offering a volume discount over the individual full-time rate. At 5+ seats, a dedicated team lead is included to coordinate output, run daily standups, and manage KPI reporting across the team." },
      { q: "What types of roles can we hire for?", a: "Our most in-demand AI-augmented roles include: Prompt Engineers, AI Ops Specialists, Data Analysts, AI-Enabled Executive VAs, Content Ops Managers, Social Media AI Specialists, CRM Admins (HubSpot/Salesforce), Research Analysts, and Catalog & Listing Managers. If your role isn't listed, contact us — we likely have a match in our talent pool." },
      { q: "Is there a minimum commitment?", a: "All plans require a 3-month minimum. This ensures we have time to complete onboarding, validate performance, and deliver measurable results. Our average placement tenure is 14 months — most clients scale to additional seats well before the minimum expires." },
      { q: "Do specialists work exclusively for our company?", a: "Yes. Every KDCI.ai specialist is 100% dedicated to your account. They work your hours, use your tools, follow your processes, and represent your brand. They are not shared across multiple clients — they are effectively your employee, just managed and supported by KDCI.ai." },
      { q: "Can we conduct our own interviews before confirming a hire?", a: "Absolutely. We present a shortlist of 3–5 pre-screened, AI-proficiency-tested candidates. You conduct your own interviews, ask your own questions, and make the final hire decision. We handle the offer, onboarding, HR setup, and ongoing management from there." },
    ]
  },
];

export const FaqsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [activeCategory, setActiveCategory] = useState('ai-monitoring');
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
          <img src={HERO_IMG} alt="KDCI AI solutions frequently asked questions and offshore staffing knowledge base" className="w-full h-full object-cover opacity-20 object-center" />
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
              <img src="/kdci-challenge.webp" alt="KDCI AI solutions team ready to answer your offshore staffing questions" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: '0% top' }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#020202] via-[#020202]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020202]/60 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
