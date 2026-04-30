
import { ViewType } from '../../types';

export interface JobData {
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
  description2?: string;
  responsibilities: string[];
  techStack: string[];
  experience: string[];
}

export const jobsData: Record<string, JobData> = {
  'job-prompt-engineer': {
    title: "Senior AI Prompt Engineer",
    department: "AI & Data",
    location: "Manila (Hybrid)",
    type: "Full-Time",
    description: "KDCI is seeking a Senior AI Prompt Engineer to lead our \"Agentic Intelligence\" division. You will not just be writing prompts; you will be designing complex cognitive architectures that allow our AI workforce to reason, critique, and execute tasks with 99% accuracy.",
    description2: "You will work directly with our Software Engineering and Operations teams to build scalable RAG pipelines, optimize hallucination rates, and fine-tune large language models (GPT-4, Gemini, Claude 3) for enterprise-grade performance.",
    responsibilities: [
      "Design, test, and iterate on complex system prompts to steer LLM behavior for specific operational verticals (Fintech, Legal, Healthcare).",
      "Architect and maintain RAG (Retrieval-Augmented Generation) pipelines to ensure models have access to real-time, domain-specific context.",
      "Develop rigorous evaluation frameworks to measure and reduce hallucination rates in production agents.",
      "Collaborate with backend engineers to integrate AI agents into existing workflows (Slack bots, CRM automations, API layers).",
      "Create 'Chain-of-Thought' reasoning templates to improve model performance on multi-step logic tasks.",
      "Stay bleeding-edge on model capabilities, actively experimenting with new releases from OpenAI, Google, and Anthropic."
    ],
    techStack: ["Python (Proficient)", "TypeScript (Familiar)", "LangChain / Haystack", "OpenAI API / Anthropic SDK", "Vector Databases (Pinecone/Weaviate)"],
    experience: ["3+ Years in Data Science or NLP", "Deep understanding of Transformers", "Experience deploying agents in prod", "Strong logic & linguistics skills"]
  },
  'job-full-stack-dev': {
    title: "Full-Stack Developer (React/Node)",
    department: "Engineering",
    location: "Remote",
    type: "Full-Time",
    description: "We are looking for an elite Full-Stack Developer to join our high-velocity product teams. You will be embedded directly into client pods, building scalable SaaS platforms and internal tools that power global enterprises.",
    description2: "This role requires a deep understanding of modern JavaScript ecosystems. You won't just be closing tickets; you'll be architecting solutions that handle high-concurrency and data-intensive workloads.",
    responsibilities: [
      "Develop and maintain robust web applications using React.js, Node.js, and TypeScript.",
      "Design and implement RESTful APIs and GraphQL endpoints for seamless frontend-backend integration.",
      "Optimize application performance for maximum speed and scalability.",
      "Collaborate with UI/UX designers to translate Figma prototypes into pixel-perfect, responsive code.",
      "Write clean, maintainable code with comprehensive unit and integration tests.",
      "Participate in code reviews and contribute to engineering best practices."
    ],
    techStack: ["React.js / Next.js", "Node.js / Express / NestJS", "TypeScript", "PostgreSQL / MongoDB", "AWS / Google Cloud"],
    experience: ["4+ Years Full-Stack experience", "Experience with Microservices", "CI/CD pipeline familiarity", "Strong problem-solving skills"]
  },
  'job-devops-architect': {
    title: "DevOps Architect",
    department: "Engineering",
    location: "Manila (On-site)",
    type: "Full-Time",
    description: "KDCI is seeking a DevOps Architect to design and manage our cloud infrastructure. You will be responsible for ensuring high availability, security, and scalability for our internal platforms and client deployments.",
    description2: "You will lead the implementation of Infrastructure as Code (IaC) and build automated CI/CD pipelines to streamline our software delivery lifecycle.",
    responsibilities: [
      "Design and deploy scalable, secure, and highly available cloud infrastructure on AWS/Azure/GCP.",
      "Implement Infrastructure as Code using Terraform or CloudFormation.",
      "Build and maintain CI/CD pipelines using Jenkins, GitLab CI, or GitHub Actions.",
      "Manage container orchestration using Kubernetes (EKS/AKS/GKE) and Docker.",
      "Monitor system performance and reliability using tools like Prometheus, Grafana, and ELK Stack.",
      "Enforce security best practices and compliance standards (SOC-2, HIPAA)."
    ],
    techStack: ["AWS / Azure / GCP", "Kubernetes / Docker", "Terraform / Ansible", "Jenkins / GitHub Actions", "Linux Administration"],
    experience: ["5+ Years in DevOps/SRE", "Proven experience scaling clusters", "Strong networking knowledge", "Security-first mindset"]
  },
  'job-data-scientist': {
    title: "Data Scientist - Predictive Analytics",
    department: "AI & Data",
    location: "Remote",
    type: "Full-Time",
    description: "Join our AI & Data division to build predictive models that drive operational efficiency. You will analyze vast datasets to uncover trends, optimize workforce allocation, and predict customer behavior.",
    description2: "This role sits at the intersection of statistics, machine learning, and business strategy. You will turn raw data into actionable intelligence for our enterprise clients.",
    responsibilities: [
      "Develop predictive models for churn prediction, demand forecasting, and lead scoring.",
      "Clean, preprocess, and explore large datasets to identify patterns and anomalies.",
      "Build and deploy machine learning models using Python (Scikit-learn, TensorFlow, PyTorch).",
      "Visualize data insights using Tableau, PowerBI, or custom Python dashboards.",
      "Collaborate with operations leaders to operationalize model outputs.",
      " continuously monitor model performance and retrain as necessary."
    ],
    techStack: ["Python (Pandas, NumPy)", "SQL / NoSQL", "Scikit-learn / TensorFlow", "Tableau / PowerBI", "Jupyter Notebooks"],
    experience: ["3+ Years in Data Science", "Strong statistical background", "Experience with time-series data", "Ability to explain complex data to non-technical stakeholders"]
  },
  'job-qa-automation': {
    title: "QA Automation Lead",
    department: "Engineering",
    location: "Manila (Hybrid)",
    type: "Full-Time",
    description: "We are looking for a QA Automation Lead to define our quality engineering strategy. You will build automated testing frameworks that ensure our software products meet the highest standards of reliability and performance.",
    responsibilities: [
      "Design and implement automated testing frameworks for web and mobile applications.",
      "Write and maintain scripts for regression, integration, and performance testing.",
      "Lead a team of QA engineers, establishing best practices and code standards.",
      "Integrate automated tests into CI/CD pipelines for continuous feedback.",
      "Analyze bug reports and collaborate with developers to resolve issues quickly.",
      "Conduct load testing and stress testing for high-traffic applications."
    ],
    techStack: ["Selenium / Cypress / Playwright", "Java / Python / JavaScript", "Appium (Mobile)", "Jira / TestRail", "Jenkins / GitLab CI"],
    experience: ["5+ Years in QA Automation", "Leadership experience", "Strong coding skills", "Experience with API testing"]
  },
  'job-python-backend': {
    title: "Python Backend Developer",
    department: "Engineering",
    location: "Remote",
    type: "Full-Time",
    description: "We need a Python Backend Developer to build high-performance APIs and data processing pipelines. You will work on complex backend systems that power AI applications and enterprise SaaS platforms.",
    responsibilities: [
      "Develop and maintain scalable backend services using Python (Django/FastAPI).",
      "Design and optimize database schemas (PostgreSQL, Redis).",
      "Build efficient APIs for frontend consumption and third-party integrations.",
      "Implement asynchronous task queues using Celery or similar tools.",
      "Ensure code quality through code reviews and automated testing.",
      "Troubleshoot and resolve production issues in a timely manner."
    ],
    techStack: ["Python 3+", "Django / FastAPI / Flask", "PostgreSQL", "Redis / Celery", "Docker"],
    experience: ["3+ Years Python development", "Strong understanding of ORM", "API design experience", "Cloud deployment familiarity"]
  },
  'job-ml-engineer': {
    title: "Machine Learning Engineer",
    department: "AI & Data",
    location: "Remote",
    type: "Full-Time",
    description: "We are seeking a Machine Learning Engineer to productize our AI models. You will bridge the gap between data science and software engineering, deploying scalable ML solutions into production environments.",
    responsibilities: [
      "Design and build machine learning pipelines for training and inference.",
      "Deploy ML models to production using Docker, Kubernetes, and cloud services.",
      "Optimize model performance for latency and throughput.",
      "Monitor model drift and implement retraining strategies.",
      "Work with data scientists to translate research prototypes into production code.",
      "Maintain and improve MLOps infrastructure."
    ],
    techStack: ["Python", "TensorFlow / PyTorch", "Kubeflow / MLflow", "Docker / Kubernetes", "AWS SageMaker / GCP Vertex AI"],
    experience: ["3+ Years in ML Engineering", "Experience deploying models at scale", "Strong software engineering fundamentals", "Familiarity with MLOps best practices"]
  },
  'job-ui-ux-designer': {
    title: "Senior UI/UX Designer",
    department: "Creative",
    location: "Manila (Hybrid)",
    type: "Full-Time",
    description: "We are looking for a Senior UI/UX Designer to craft intuitive and visually stunning digital experiences. You will lead the design process for web and mobile applications, from user research to high-fidelity prototyping.",
    responsibilities: [
      "Create user-centered designs by understanding business requirements and user feedback.",
      "Create user flows, wireframes, prototypes, and mockups.",
      "Design UI elements and tools such as navigation menus, search boxes, tabs, and widgets.",
      "Develop UI mockups and prototypes that clearly illustrate how sites function and look like.",
      "Identify and troubleshoot UX problems (e.g. responsiveness).",
      "Collaborate effectively with product, engineering, and management teams."
    ],
    techStack: ["Figma", "Adobe XD", "Sketch", "Prototyping tools", "HTML/CSS knowledge is a plus"],
    experience: ["5+ Years in UI/UX Design", "Strong portfolio of web/mobile projects", "Experience with Design Systems", "User research experience"]
  },
  'job-motion-graphics': {
    title: "Motion Graphics Artist",
    department: "Creative",
    location: "Remote",
    type: "Full-Time",
    description: "Join our creative studio as a Motion Graphics Artist. You will create engaging animated content for social media, digital ads, and brand campaigns for global clients.",
    responsibilities: [
      "Create high-quality motion graphics and animations for various digital platforms.",
      "Edit video footage and add visual effects/motion elements.",
      "Collaborate with art directors and copywriters to develop creative concepts.",
      "Ensure all motion assets align with brand guidelines.",
      "Stay updated on the latest motion design trends and techniques.",
      "Manage multiple projects and meet tight deadlines."
    ],
    techStack: ["Adobe After Effects", "Adobe Premiere Pro", "Cinema 4D / Blender", "Illustrator / Photoshop"],
    experience: ["3+ Years in Motion Design", "Strong demo reel required", "Experience with 2D and 3D animation", "Storyboarding skills"]
  },
  'job-art-director': {
    title: "Digital Art Director",
    department: "Creative",
    location: "Remote",
    type: "Full-Time",
    description: "We are seeking a visionary Digital Art Director to lead creative campaigns. You will oversee the visual direction of projects, guide designers, and ensure high-quality output that resonates with audiences.",
    responsibilities: [
      "Conceptualize and execute creative campaigns across digital channels.",
      "Lead and mentor a team of graphic designers and motion artists.",
      "Collaborate with marketing and strategy teams to align creative with business goals.",
      "Present creative concepts to clients and stakeholders.",
      "Ensure consistency in visual identity across all touchpoints.",
      "Stay ahead of design trends and inspire the team with new ideas."
    ],
    techStack: ["Adobe Creative Suite", "Figma", "Project Management tools", "Keynote / PowerPoint"],
    experience: ["7+ Years in Creative/Design", "Leadership experience", "Strong portfolio of campaigns", "Client-facing experience"]
  },
  'job-video-editor': {
    title: "Video Editor (Short Form)",
    department: "Creative",
    location: "Manila (On-site)",
    type: "Full-Time",
    description: "We need a Video Editor specializing in short-form content. You will produce snappy, engaging videos for TikTok, Instagram Reels, and YouTube Shorts that drive high engagement.",
    responsibilities: [
      "Edit raw footage into engaging short-form videos (15-60 seconds).",
      "Add captions, transitions, effects, and music to enhance storytelling.",
      "Optimize videos for different social media platforms.",
      "Collaborate with content creators and social media managers.",
      "Keep up with viral trends and editing styles.",
      "Manage video assets and archives."
    ],
    techStack: ["Adobe Premiere Pro", "CapCut", "After Effects (Basic)", "DaVinci Resolve"],
    experience: ["2+ Years in Video Editing", "Portfolio of short-form content", "Understanding of social algorithms", "Fast turnaround speed"]
  },
  'job-customer-success': {
    title: "Customer Success Manager (SaaS)",
    department: "CX & Support",
    location: "Remote",
    type: "Full-Time",
    description: "As a Customer Success Manager, you will be the trusted advisor to our SaaS clients. You will drive adoption, retention, and growth by ensuring customers achieve their desired outcomes with our platform.",
    responsibilities: [
      "Onboard new customers and guide them to their 'aha' moment.",
      "Build strong relationships with key stakeholders and decision-makers.",
      "Monitor customer health scores and proactively address risks.",
      "Identify upsell and cross-sell opportunities.",
      "Conduct regular business reviews (QBRs) with clients.",
      "Advocate for customer needs within the product team."
    ],
    techStack: ["Salesforce / HubSpot", "Gainsight / Catalyst", "Intercom / Zendesk", "Jira"],
    experience: ["3+ Years in SaaS Customer Success", "Proven retention track record", "Strong communication skills", "Strategic thinking"]
  },
  'job-tech-support': {
    title: "Tier 3 Technical Support Engineer",
    department: "CX & Support",
    location: "Manila (On-site)",
    type: "Full-Time",
    description: "We are looking for a Tier 3 Technical Support Engineer to handle complex technical issues. You will be the final escalation point for our support team, resolving deep technical problems and bugs.",
    responsibilities: [
      "Troubleshoot and resolve complex technical issues related to code, database, or infrastructure.",
      "Reproduce bugs and provide detailed reports to the engineering team.",
      "Create and maintain technical documentation and knowledge base articles.",
      "Mentor Tier 1 and Tier 2 support agents.",
      "Participate in on-call rotation for critical incidents.",
      "Write scripts to automate common support tasks."
    ],
    techStack: ["SQL", "Log analysis tools (Splunk, Datadog)", "API testing (Postman)", "Basic coding (Python/JS)", "Linux CLI"],
    experience: ["4+ Years in Technical Support", "Experience with SaaS products", "Strong debugging skills", "Excellent written communication"]
  },
  'job-ops-manager': {
    title: "Operations Manager (E-commerce)",
    department: "Operations",
    location: "Manila (Hybrid)",
    type: "Full-Time",
    description: "We need an Operations Manager to oversee e-commerce workflows for our global retail clients. You will manage teams responsible for listing, order processing, and inventory management.",
    responsibilities: [
      "Oversee daily e-commerce operations including catalog management and order fulfillment.",
      "Manage and mentor a team of e-commerce specialists.",
      "Optimize operational processes to improve efficiency and accuracy.",
      "Monitor KPIs and report on performance to clients.",
      "Coordinate with logistics partners and suppliers.",
      "Ensure compliance with marketplace policies (Amazon, Shopify)."
    ],
    techStack: ["Shopify / Amazon Seller Central", "ERP systems (NetSuite)", "Inventory management tools", "Excel / Google Sheets (Advanced)"],
    experience: ["5+ Years in E-commerce Ops", "Team management experience", "Process improvement skills", "Data analysis proficiency"]
  },
  'job-fraud-analyst': {
    title: "Fraud Analyst (Fintech)",
    department: "Operations",
    location: "Manila (Secure Site)",
    type: "Full-Time",
    description: "Join our secure operations center as a Fraud Analyst. You will monitor transactions, detect suspicious activity, and prevent financial loss for our fintech clients.",
    responsibilities: [
      "Monitor real-time transactions for potential fraud patterns.",
      "Investigate suspicious alerts and determine appropriate action.",
      "Review KYC documents and verify user identities.",
      "Analyze fraud trends and suggest rule improvements.",
      "Handle chargeback disputes and representment.",
      "Maintain strict confidentiality and compliance with financial regulations."
    ],
    techStack: ["Fraud detection platforms", "SQL", "Identity verification tools", "Case management systems"],
    experience: ["2+ Years in Fraud/Risk", "Knowledge of payment systems", "Attention to detail", "Analytical mindset"]
  },
  'job-wfm-analyst': {
    title: "Workforce Management Analyst",
    department: "Operations",
    location: "Remote",
    type: "Full-Time",
    description: "We are seeking a WFM Analyst to optimize our global workforce. You will forecast volumes, schedule staff, and monitor real-time adherence to ensure we meet client SLAs.",
    responsibilities: [
      "Forecast call/ticket volumes based on historical data and trends.",
      "Create optimized schedules to meet service level requirements.",
      "Monitor real-time adherence and intraday performance.",
      "Analyze workforce metrics and provide recommendations for improvement.",
      "Manage leave requests and schedule changes.",
      "Configure and maintain WFM software tools."
    ],
    techStack: ["IEX / Verint / Calabrio", "Excel (Advanced)", "Contact Center Platforms", "Data Visualization tools"],
    experience: ["3+ Years in WFM", "Strong analytical skills", "Experience in BPO/Contact Center", "Understanding of Erlang C"]
  },
  'job-solutions-architect': {
    title: "Solutions Architect",
    department: "Sales",
    location: "US (Remote)",
    type: "Full-Time",
    description: "As a Solutions Architect, you will partner with our sales team to design technical solutions for enterprise prospects. You will bridge the gap between business needs and our operational capabilities.",
    responsibilities: [
      "Lead technical discovery sessions with prospective clients.",
      "Design custom operational solutions leveraging our talent and AI stack.",
      "Create technical proposals, diagrams, and presentations.",
      "Demonstrate our platform capabilities and AI tools.",
      "Answer technical RFPs and security questionnaires.",
      "Ensure smooth handover from sales to implementation teams."
    ],
    techStack: ["Cloud Architecture", "API Integration", "AI/ML concepts", "Presentation tools", "CRM (Salesforce)"],
    experience: ["5+ Years in Pre-sales/Solutions Engineering", "BPO/Outsourcing knowledge", "Strong presentation skills", "Technical background"]
  },
  'job-account-executive': {
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "US (Remote)",
    type: "Full-Time",
    description: "We are looking for a hunter to drive new business growth. As an Enterprise AE, you will close large-scale managed service contracts with mid-market and enterprise companies.",
    responsibilities: [
      "Identify and prospect high-value enterprise accounts.",
      "Manage the full sales cycle from outreach to close.",
      "Conduct consultative sales meetings with C-level executives.",
      "Negotiate contract terms and pricing.",
      "Collaborate with Solutions Architects to build winning proposals.",
      "Exceed quarterly and annual revenue targets."
    ],
    techStack: ["Salesforce", "LinkedIn Sales Navigator", "Outreach/Salesloft", "ZoomInfo"],
    experience: ["5+ Years in B2B Sales", "Experience selling Services or SaaS", "Track record of quota attainment", "Strong network"]
  },
  'job-hr-bp': {
    title: "HR Business Partner",
    department: "Corporate",
    location: "Manila (On-site)",
    type: "Full-Time",
    description: "The HR Business Partner will serve as a strategic consultant to our business units. You will align HR strategies with business goals and drive employee engagement and performance.",
    responsibilities: [
      "Partner with leadership to develop workforce strategies.",
      "Manage employee relations, performance management, and disciplinary actions.",
      "Drive talent management and succession planning initiatives.",
      "Implement HR policies and ensure compliance with labor laws.",
      "Analyze HR metrics to identify trends and areas for improvement.",
      "Champion company culture and employee engagement programs."
    ],
    techStack: ["HRIS (Workday/BambooHR)", "Performance Mgmt tools", "MS Office / G Suite"],
    experience: ["5+ Years in HRBP role", "Strong knowledge of PH Labor Law", "Employee relations experience", "Strategic mindset"]
  },
  'job-tech-recruiter': {
    title: "Technical Recruiter",
    department: "Corporate",
    location: "Manila (Hybrid)",
    type: "Full-Time",
    description: "We need a Technical Recruiter to find the top 1% of engineering talent. You will source, screen, and hire developers, data scientists, and DevOps engineers for our elite pods.",
    responsibilities: [
      "Source candidates through various channels (LinkedIn, GitHub, etc.).",
      "Conduct technical screening interviews to assess skills and fit.",
      "Manage the end-to-end recruitment process.",
      "Build a pipeline of qualified technical candidates.",
      "Collaborate with hiring managers to understand role requirements.",
      "Provide a great candidate experience."
    ],
    techStack: ["ATS (Greenhouse/Lever)", "LinkedIn Recruiter", "GitHub / Stack Overflow", "Assessment tools"],
    experience: ["3+ Years in Tech Recruitment", "Understanding of tech stacks", "Sourcing expertise", "Agency or corporate experience"]
  },
  'job-finance-controller': {
    title: "Finance Controller",
    department: "Corporate",
    location: "Manila (On-site)",
    type: "Full-Time",
    description: "The Finance Controller will oversee all accounting and financial reporting activities. You will ensure the accuracy of financial records and provide strategic financial guidance to the executive team.",
    responsibilities: [
      "Manage all accounting operations (GL, AP, AR, Payroll).",
      "Prepare timely and accurate monthly financial statements.",
      "Coordinate regulatory reporting and tax compliance.",
      "Manage the annual budgeting and forecasting process.",
      "Oversee internal controls and audit procedures.",
      "Provide financial analysis to support business decisions."
    ],
    techStack: ["NetSuite / QuickBooks / Xero", "Excel (Expert)", "BI tools"],
    experience: ["7+ Years in Finance/Accounting", "CPA license required", "Leadership experience", "BPO industry experience preferred"]
  }
};
