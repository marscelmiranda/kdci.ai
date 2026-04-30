
import React from 'react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { ShieldCheck, Lock, Eye, Server, FileText } from 'lucide-react';

export const PrivacyPolicyPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#020202]">
        <div className="mesh-container opacity-30">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-20"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Privacy Policy" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Privacy <span className="text-[#E61739]">Statement.</span>
          </h1>
          <p className="text-white/60 text-lg font-medium">
            Last Updated: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#1D1D1F] prose-a:text-[#E61739] prose-a:no-underline hover:prose-a:underline">
            
            <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/5 mb-12">
              <p className="text-sm font-medium text-slate-600 mb-0">
                At KDCI (collectively "we", "us", or "our"), we respect your privacy and are committed to protecting your personal data. This Privacy Policy outlines how we collect, use, disclose, and safeguard your information when you visit our website, engage our services, or apply for a position.
              </p>
            </div>

            <h2 id="collection" className="flex items-center gap-3 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Eye size={18} /></div>
              1. Information We Collect
            </h2>
            <p>We may collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, when you participate in activities on the Website, or otherwise when you contact us.</p>
            <ul>
              <li><strong>Personal Identity Information:</strong> Name, email address, phone number, job title, and company name.</li>
              <li><strong>Recruitment Data:</strong> If you apply for a job, we collect resumes, CVs, employment history, and educational background.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and operating system collected via cookies and similar technologies.</li>
              <li><strong>Usage Data:</strong> Information about how you use our website, such as pages visited and time spent on the site.</li>
            </ul>

            <h2 id="use" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Server size={18} /></div>
              2. How We Use Your Information
            </h2>
            <p>We use personal information collected via our Website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.</p>
            <ul>
              <li><strong>Service Delivery:</strong> To provide and manage the services you request, including customer support and account management.</li>
              <li><strong>Communication:</strong> To send you administrative information, marketing communications (where consented), and updates about our terms and policies.</li>
              <li><strong>Recruitment:</strong> To evaluate your candidacy for employment and manage our hiring processes.</li>
              <li><strong>Improvement:</strong> To analyze usage trends and improve our website's functionality and user experience.</li>
              <li><strong>Security:</strong> To protect our website and services from fraud, abuse, and security threats.</li>
            </ul>

            <h2 id="sharing" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><FileText size={18} /></div>
              3. Sharing of Information
            </h2>
            <p>We do not sell your personal information. We may share your data with:</p>
            <ul>
              <li><strong>Service Providers:</strong> Third-party vendors who perform services for us (e.g., cloud hosting, analytics, CRM) and are bound by confidentiality agreements.</li>
              <li><strong>Legal Obligations:</strong> If required to do so by law or in response to valid requests by public authorities (e.g., a court or a government agency).</li>
              <li><strong>Business Transfers:</strong> In connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
            </ul>

            <h2 id="security" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Lock size={18} /></div>
              4. Data Security
            </h2>
            <p>
              We adhere to enterprise-grade security standards, including SOC-2 readiness and ISO 27001 compliance protocols. We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure.
            </p>

            <h2 id="rights" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><ShieldCheck size={18} /></div>
              5. Your Privacy Rights
            </h2>
            <p>Depending on your location (e.g., GDPR for EU residents, CCPA for California residents), you may have certain rights regarding your personal information, including:</p>
            <ul>
              <li>The right to request access to and obtain a copy of your personal information.</li>
              <li>The right to request rectification or erasure of your personal information.</li>
              <li>The right to restrict the processing of your personal information.</li>
              <li>The right to data portability.</li>
            </ul>
            <p>To exercise these rights, please contact our Data Protection Officer at <a href="mailto:privacy@kdci.co">privacy@kdci.co</a>.</p>

            <h2 id="cookies" className="mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">6. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar tracking technologies to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our <a href="#">Cookie Policy</a>.</p>

            <h2 id="contact" className="mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">7. Contact Us</h2>
            <p>If you have questions or comments about this policy, you may email us at <a href="mailto:info@kdci.co">info@kdci.co</a> or by post to:</p>
            <address className="not-italic bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm font-medium text-slate-700">
              <strong>KDCI Operations</strong><br />
              3008 One Corporate Centre<br />
              Julia Vargas Avenue, Ortigas Center<br />
              Pasig City 1605, Metro Manila<br />
              Philippines
            </address>
          </div>
        </div>
      </section>
    </div>
  );
};
