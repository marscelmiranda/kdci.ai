
import React, { useState } from 'react';
import { Search, BookA, Hash, Filter } from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';

const HERO_IMG = "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=1200&h=800";

const terms = [
  // A
  { term: "Ad Hoc", def: "Tasks or projects done on an as-needed basis, often without a predefined schedule or long-term plan." },
  { term: "Agentic AI", def: "AI systems capable of autonomous action, decision-making, and tool use to achieve goals without constant human intervention." },
  { term: "Artificial Intelligence (AI)", def: "The simulation of human intelligence processes by computer systems, including learning, reasoning, and self-correction." },
  { term: "Attrition Rate", def: "The rate at which employees leave a workforce over a given period, a key metric in BPO stability." },
  { term: "Automation", def: "The use of technology to perform tasks with reduced human assistance." },
  
  // B
  { term: "Back Office Outsourcing", def: "Outsourcing internal business functions such as data entry, accounting, HR, and IT support, which are not client-facing." },
  { term: "Bench", def: "A pool of talented employees who are hired and trained but not yet assigned to a specific client project, ensuring rapid deployment." },
  { term: "BPO (Business Process Outsourcing)", def: "The contracting of non-primary business activities and functions to a third-party provider." },
  { term: "Business Continuity Planning (BCP)", def: "A strategy ensuring that business operations can continue with minimal disruption during unexpected events or disasters." },
  
  // C
  { term: "Call Center", def: "A centralized office used for receiving or transmitting a large volume of enquiries by telephone." },
  { term: "Cloud Computing", def: "The delivery of computing services—including servers, storage, databases, networking, software—over the Internet." },
  { term: "Co-sourcing", def: "A business arrangement where a company partners with a vendor to manage a function together, sharing risks and management responsibilities." },
  { term: "Customer Experience (CX)", def: "The aggregate of all interactions a customer has with a brand, from discovery to support." },
  { term: "Customer Relationship Management (CRM)", def: "Technology for managing all your company's relationships and interactions with customers and potential customers." },

  // D
  { term: "Data Mining", def: "The process of discovering patterns in large data sets involving methods at the intersection of machine learning, statistics, and database systems." },
  { term: "Data Security", def: "Protective measures employed to secure data from unapproved access and to preserve data confidentiality, integrity, and availability." },
  { term: "Dedicated Team Model", def: "An engagement model where an outsourced team works exclusively for a single client, similar to an in-house team." },
  { term: "Digital Transformation", def: "The integration of digital technology into all areas of a business, fundamentally changing how you operate and deliver value to customers." },

  // E
  { term: "E-commerce Outsourcing", def: "Contracting out specialized tasks related to online retail, such as listing management, order fulfillment, and customer support." },
  { term: "Employer of Record (EOR)", def: "A third-party organization that takes on the legal responsibilities of employing staff on behalf of another company." },
  { term: "Enterprise Resource Planning (ERP)", def: "Software used by organizations to manage day-to-day business activities such as accounting, procurement, project management, and manufacturing." },
  { term: "Escalation", def: "The process of moving a customer query or issue to a higher-level agent or supervisor for resolution." },

  // F
  { term: "Front Office Outsourcing", def: "Outsourcing customer-facing services such as contact centers, sales, and help desks." },
  { term: "FTE (Full-Time Equivalent)", def: "A unit that indicates the workload of an employed person in a way that makes workloads comparable across various contexts." },

  // G
  { term: "GDPR (General Data Protection Regulation)", def: "A legal framework that sets guidelines for the collection and processing of personal information from individuals who live in the European Union." },
  { term: "Global In-House Center (GIC)", def: "A captive center located in a low-cost country, owned and operated by the parent company rather than a third-party vendor." },

  // H
  { term: "Help Desk", def: "A resource intended to provide the customer or end user with information and support related to a company's products and services." },
  { term: "Human-in-the-Loop (HITL)", def: "A model of human interaction with AI where humans provide feedback or validation to improve the model's accuracy." },
  { term: "Hybrid Model", def: "An operational structure combining onshore, nearshore, and offshore teams, or remote and in-office work." },

  // I
  { term: "Inbound Call Center", def: "A call center that primarily handles incoming calls from customers, often for support or inquiries." },
  { term: "Infrastructure as a Service (IaaS)", def: "A form of cloud computing that provides virtualized computing resources over the internet." },
  { term: "ISO Certification", def: "Certification from the International Organization for Standardization, indicating a company follows global standards for quality, safety, and efficiency." },

  // K
  { term: "KPI (Key Performance Indicator)", def: "A measurable value that demonstrates how effectively a company is achieving key business objectives." },
  { term: "KPO (Knowledge Process Outsourcing)", def: "Outsourcing of core, information-related business activities which are competitively important or form an integral part of a company's value chain." },

  // L
  { term: "Labor Arbitrage", def: "The practice of searching for and using the lowest cost labor available, often by moving operations to countries with lower wages." },
  { term: "LPO (Legal Process Outsourcing)", def: "The practice of a law firm or corporation obtaining legal support services from an outside law firm or legal support services company." },

  // M
  { term: "Managed Pod", def: "A KDCI-specific model where a dedicated team operates with its own internal leadership and QA structure, embedded within your company." },
  { term: "Managed Services", def: "The practice of outsourcing the responsibility for maintaining, and anticipating need for, a range of processes and functions." },
  { term: "Multichannel", def: "Providing support or sales across multiple distinct channels (email, phone, chat) that may not necessarily be integrated." },

  // N
  { term: "Nearshoring", def: "The practice of transferring a business operation to a nearby country, often sharing a border or time zone." },
  { term: "NPS (Net Promoter Score)", def: "A market research metric that is based on a single survey question asking respondents to rate the likelihood that they would recommend a company, product, or service." },

  // O
  { term: "Offshoring", def: "The practice of basing some of a company's processes or services overseas, so as to take advantage of lower costs." },
  { term: "Omnichannel", def: "A cross-channel content strategy that improves the user experience and drives better relationships across all points of contact." },
  { term: "Onshoring", def: "Relocating business processes to a lower-cost location inside the same national borders." },
  { term: "Outbound Call Center", def: "A call center where agents make outgoing calls to prospective or existing customers." },
  { term: "Outsourcing", def: "The business practice of hiring a party outside a company to perform services or create goods that were traditionally performed in-house." },

  // P
  { term: "Process Improvement", def: "The proactive task of identifying, analyzing, and improving upon existing business processes within an organization." },
  { term: "Project Management", def: "The application of processes, methods, skills, knowledge, and experience to achieve specific project objectives." },

  // Q
  { term: "QA (Quality Assurance)", def: "A way of preventing mistakes and defects in manufactured products and avoiding problems when delivering products or services to customers." },
  { term: "QC (Quality Control)", def: "A procedure or set of procedures intended to ensure that a manufactured product or performed service adheres to a defined set of quality criteria." },

  // R
  { term: "RPA (Robotic Process Automation)", def: "Software technology that makes it easy to build, deploy, and manage software robots that emulate humans actions." },
  { term: "RPO (Recruitment Process Outsourcing)", def: "A form of business process outsourcing where an employer transfers all or part of its recruitment processes to an external service provider." },
  { term: "Remote Work", def: "A working style that allows professionals to work outside of a traditional office environment." },

  // S
  { term: "Scalability", def: "The capacity to be changed in size or scale, especially the ability of a business system to handle growing amounts of work." },
  { term: "Seat Leasing", def: "A BPO model where the client rents the physical office space and infrastructure, but manages the staff directly." },
  { term: "Shared Services Center (SSC)", def: "A centralized unit within a corporation that provides services to the other business units." },
  { term: "SLA (Service Level Agreement)", def: "A commitment between a service provider and a client. Particular aspects of the service – quality, availability, responsibilities – are agreed between the service provider and the service user." },
  { term: "SOP (Standard Operating Procedure)", def: "A set of step-by-step instructions compiled by an organization to help workers carry out complex routine operations." },
  { term: "Staff Augmentation", def: "An outsourcing strategy where external personnel are used to temporarily augment the capacity of your organization." },

  // T
  { term: "Talent Acquisition", def: "The process of finding and acquiring skilled human labor for organizational needs and to meet any labor requirement." },
  { term: "Telemarketing", def: "The direct marketing of goods or services to potential customers over the telephone or the internet." },
  { term: "Time and Materials (T&M)", def: "A contract type where the employer agrees to pay the contractor based upon the time spent by the contractor's employees and for materials used." },
  { term: "Total Cost of Ownership (TCO)", def: "A financial estimate intended to help buyers and owners determine the direct and indirect costs of a product or system." },
  { term: "Turnover Rate", def: "The percentage of employees in a workforce that leave during a certain period of time." },

  // U
  { term: "Upselling", def: "A sales technique where a seller invites the customer to purchase more expensive items, upgrades, or other add-ons." },

  // V
  { term: "Virtual Assistant (VA)", def: "A generally self-employed individual who provides professional administrative, technical, or creative assistance to clients remotely." },
  { term: "VoIP (Voice over Internet Protocol)", def: "A technology that allows you to make voice calls using a broadband Internet connection instead of a regular (or analog) phone line." },

  // W
  { term: "Workflow Automation", def: "The design, execution, and automation of processes based on workflow rules where human tasks, data or files are routed between people or systems based on pre-defined business rules." },
  { term: "Workforce Management (WFM)", def: "An institutional process that maximizes performance levels and competency for an organization." },

  // Z
  { term: "Zero Trust Security", def: "A security framework requiring all users, whether in or outside the organization's network, to be authenticated, authorized, and continuously validated." }
];

export const GlossaryPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [search, setSearch] = useState("");
  const [activeLetter, setActiveLetter] = useState("All");

  const letters = ["All", ...Array.from(new Set(terms.map(t => t.term.charAt(0).toUpperCase()))).sort()];

  const filteredTerms = terms
    .filter(t => {
      const matchesSearch = t.term.toLowerCase().includes(search.toLowerCase()) || t.def.toLowerCase().includes(search.toLowerCase());
      const matchesLetter = activeLetter === "All" || t.term.charAt(0).toUpperCase() === activeLetter;
      return matchesSearch && matchesLetter;
    })
    .sort((a, b) => a.term.localeCompare(b.term));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative pt-24 pb-7 overflow-hidden bg-[#020202]">
        <div className="absolute inset-0 z-0">
          <img src={HERO_IMG} alt="Glossary" className="w-full h-full object-cover opacity-20 object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
        </div>
        <div className="mesh-container opacity-40">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-30"></div>
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Glossary" />
          <h1 className="text-5xl md:text-8xl font-heading font-bold text-white mb-8 tracking-tight leading-[1] drop-shadow-2xl">
            <span className="text-shine-white">Operational</span><br/>
            <span className="text-[#E61739]">Lexicon.</span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-white/60 font-medium leading-relaxed mb-12">
            The definitive guide to AI and outsourcing terminology. Understand the language of modern operations.
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="pt-8 pb-32 bg-white min-h-[50vh]">
        <div className="max-w-6xl mx-auto px-6">
          
          {/* Controls Container */}
          <div className="flex flex-col md:flex-row gap-8 mb-16 items-center justify-between sticky top-24 z-30 bg-white/95 backdrop-blur-xl p-6 rounded-[2rem] border border-slate-100 shadow-xl">
             
             {/* Alphabet Filter */}
             <div className="w-full md:w-auto overflow-x-auto no-scrollbar">
               <div className="flex items-center gap-1">
                 {letters.map(letter => (
                   <button
                     key={letter}
                     onClick={() => setActiveLetter(letter)}
                     className={`w-9 h-9 md:w-10 md:h-10 rounded-xl flex items-center justify-center text-xs font-bold transition-all ${
                       activeLetter === letter 
                         ? 'bg-[#E61739] text-white shadow-lg scale-110' 
                         : 'bg-slate-50 text-slate-400 hover:bg-slate-100 hover:text-slate-900'
                     }`}
                   >
                     {letter}
                   </button>
                 ))}
               </div>
             </div>

             {/* Search Bar */}
             <div className="relative w-full md:w-80">
               <input 
                 type="text" 
                 placeholder="Search definitions..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full py-3 pl-12 pr-6 rounded-xl bg-slate-50 border-none text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-[#E61739]/20 focus:bg-white transition-all font-bold text-sm" 
               />
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {filteredTerms.length > 0 ? filteredTerms.map((t, idx) => (
              <div key={idx} className="group p-8 rounded-[2.5rem] bg-[#F5F5F7] border border-black/[0.03] hover:bg-white hover:shadow-2xl transition-all duration-300 flex flex-col h-full">
                <div className="flex items-start justify-between mb-4">
                   <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#E61739] transition-colors">{t.term}</h3>
                   <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-slate-300 text-xs font-black shadow-sm group-hover:bg-[#E61739] group-hover:text-white transition-colors">
                      {t.term.charAt(0)}
                   </div>
                </div>
                <p className="text-slate-500 font-medium leading-relaxed text-sm">{t.def}</p>
              </div>
            )) : (
              <div className="col-span-full text-center py-20 text-slate-400">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                   <Filter size={32} className="opacity-20" />
                </div>
                <p className="text-xl font-medium">No terms found matching "{search}"</p>
                <button onClick={() => { setSearch(""); setActiveLetter("All"); }} className="mt-4 text-[#E61739] font-bold hover:underline">Clear Filters</button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
