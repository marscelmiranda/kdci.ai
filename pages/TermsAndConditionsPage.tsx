
import React from 'react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { Scale, FileSignature, ShieldAlert, CreditCard, Users, Globe, Lock, Gavel } from 'lucide-react';

export const TermsAndConditionsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#020202]">
        <div className="mesh-container opacity-30">
           <div className="blob blob-purple"></div>
           <div className="blob blob-magenta opacity-20"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <Breadcrumbs setView={setView} currentName="Terms & Conditions" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-tight">
            Terms of <span className="text-[#E61739]">Service.</span>
          </h1>
          <p className="text-white/60 text-lg font-medium">
            Effective Date: January 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-slate max-w-none prose-headings:font-heading prose-headings:font-bold prose-headings:text-[#1D1D1F] prose-a:text-[#E61739] prose-a:no-underline hover:prose-a:underline">
            
            <div className="bg-[#F5F5F7] p-8 rounded-3xl border border-black/5 mb-12">
              <p className="text-sm font-medium text-slate-600 mb-0">
                Welcome to KDCI! These Terms and Conditions ("Terms") govern your use of our website located at www.kdci.co (the "Site") and any related services provided by KDCI Operations LLC ("KDCI", "we", "us", or "our"). By accessing or using our Site and Services, you agree to be bound by these Terms.
              </p>
            </div>

            <h2 id="services" className="flex items-center gap-3 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Globe size={18} /></div>
              1. Services Provided
            </h2>
            <p>KDCI provides managed offshore staffing, creative production, software development, and AI-augmented operational services (collectively, the "Services"). The specific details, deliverables, and service level agreements (SLAs) for any engagement will be outlined in a separate Statement of Work (SOW) or Master Services Agreement (MSA) signed by both parties.</p>

            <h2 id="use-of-site" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Users size={18} /></div>
              2. Use of Site & User Conduct
            </h2>
            <p>You agree to use the Site only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the Site. Prohibited behavior includes harassing or causing distress to any person, transmitting obscene or offensive content, or disrupting the normal flow of dialogue within our Site.</p>

            <h2 id="intellectual-property" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><FileSignature size={18} /></div>
              3. Intellectual Property
            </h2>
            <p><strong>Client Ownership:</strong> Unless otherwise specified in an SOW, all work product, deliverables, and intellectual property created by KDCI personnel specifically for a Client under a paid engagement shall be considered "work made for hire" and owned by the Client upon full payment.</p>
            <p><strong>KDCI Ownership:</strong> The content on this Site, including text, graphics, logos, images, and software, is the property of KDCI and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written consent.</p>

            <h2 id="payment" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><CreditCard size={18} /></div>
              4. Fees and Payment
            </h2>
            <p>For clients engaging our Services, fees will be invoiced in accordance with the schedule set forth in your MSA or SOW. Late payments may be subject to interest charges. All fees are exclusive of applicable taxes, which are the responsibility of the Client.</p>

            <h2 id="confidentiality" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Lock size={18} /></div>
              5. Confidentiality
            </h2>
            <p>KDCI acknowledges that in the course of providing Services, we may have access to your confidential information. We agree to maintain the confidentiality of such information using the same degree of care we use to protect our own confidential information, but in no event less than a reasonable degree of care. Standard NDAs are available upon request.</p>

            <h2 id="liability" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><ShieldAlert size={18} /></div>
              6. Limitation of Liability
            </h2>
            <p>To the fullest extent permitted by law, KDCI shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from (a) your access to or use of or inability to access or use the Site; or (b) any conduct or content of any third party on the Site.</p>

            <h2 id="governing-law" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Gavel size={18} /></div>
              7. Governing Law
            </h2>
            <p>These Terms shall be governed and construed in accordance with the laws of the Republic of the Philippines, without regard to its conflict of law provisions. Any disputes arising from these Terms or the use of the Site shall be resolved in the competent courts of Pasig City, Philippines.</p>

            <h2 id="changes" className="flex items-center gap-3 mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">
              <div className="w-8 h-8 rounded-lg bg-[#E61739]/10 flex items-center justify-center text-[#E61739]"><Scale size={18} /></div>
              8. Changes to Terms
            </h2>
            <p>We reserve the right, at our sole discretion, to modify or replace these Terms at any time. By continuing to access or use our Site after those revisions become effective, you agree to be bound by the revised terms.</p>

            <h2 id="contact" className="mt-12 text-2xl md:text-3xl font-heading font-bold text-slate-900">9. Contact Us</h2>
            <p>If you have any questions about these Terms, please contact us:</p>
            <address className="not-italic bg-slate-50 p-6 rounded-2xl border border-slate-200 text-sm font-medium text-slate-700">
              <strong>KDCI Legal Department</strong><br />
              3008 One Corporate Centre<br />
              Julia Vargas Avenue, Ortigas Center<br />
              Pasig City 1605, Metro Manila<br />
              Philippines<br />
              <a href="mailto:legal@kdci.co" className="mt-2 block">legal@kdci.co</a>
            </address>
          </div>
        </div>
      </section>
    </div>
  );
};
