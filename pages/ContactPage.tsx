
import React, { useState, useRef } from 'react';
import { 
  CheckCircle2, 
  Loader2, 
  ArrowRight, 
  Mail, 
  Phone, 
  MapPin, 
  Upload, 
  Globe2,
  AlertCircle
} from 'lucide-react';
import { ViewType } from '../types';
import { Breadcrumbs } from '../components/Shared';
import { Captcha, CaptchaHandle } from '../components/Captcha';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';

interface FormData {
  inquiryType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  role: string;
  country: string;
  message: string;
}

const EMPTY: FormData = {
  inquiryType: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  role: '',
  country: '',
  message: '',
};

export const ContactPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY);
  const captchaRef = useRef<CaptchaHandle>(null);

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaRef.current?.isBot()) return;

    setFormState('submitting');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setFormState('success');
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send your message. Please try again.');
      setFormState('error');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleReset = () => {
    setForm(EMPTY);
    setFileName(null);
    setErrorMsg('');
    setFormState('idle');
  };

  const labelClasses = "text-[11px] font-black uppercase tracking-widest text-muted-foreground ml-1 mb-1.5 block";
  const requiredAsterisk = <span className="text-primary ml-0.5">*</span>;

  const inquiryOptions = [
    "Prospective Client / New Business",
    "Current Client Support",
    "Careers & Job Applications",
    "Employee Support (HR / IT)",
    "Partnerships & Alliances",
    "Vendors & Procurement",
    "Investors & Analysts",
    "Media & Press",
    "Research & Academia",
    "Former Employees or Clients"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-kdci-dark pt-28 pb-36 px-6 border-b border-white/5 relative overflow-hidden text-center">
        <div className="mesh-container opacity-20">
          <div className="blob blob-magenta"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Breadcrumbs setView={setView} currentName="Contact" />
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-3 tracking-tight">
            Get in <span className="text-primary">Touch.</span>
          </h1>
          <p className="text-white/40 text-base md:text-lg font-medium max-w-xl mx-auto">
            Thanks for your interest in KDCI Operations. Select an option below, and we'll connect you with the right team.
          </p>
        </div>
      </section>

      {/* Main */}
      <section className="relative z-20 -mt-24 pb-24 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-start">

          {/* LEFT: Form */}
          <div className="lg:col-span-8">
            <Card className="shadow-2xl">
              <CardContent className="p-8 md:p-12">
                {formState === 'success' ? (
                  <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">Message Transmitted.</h3>
                    <p className="text-muted-foreground mb-8 max-w-xs mx-auto font-medium">Our solutions team will reach out within 1 business day.</p>
                    <Button onClick={handleReset} variant="link" className="text-primary font-black uppercase tracking-widest">New Inquiry</Button>
                  </div>
                ) : (
                  <form className="space-y-6" onSubmit={handleSubmit}>

                    {/* Error banner */}
                    {formState === 'error' && (
                      <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-5 py-4">
                        <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm font-medium text-red-700">{errorMsg}</p>
                      </div>
                    )}

                    {/* Inquiry Type */}
                    <div>
                      <label className={labelClasses}>What best describes your inquiry?{requiredAsterisk}</label>
                      <div className="relative">
                        <select
                          required
                          value={form.inquiryType}
                          onChange={set('inquiryType')}
                          className="flex h-14 w-full items-center justify-between rounded-xl border border-input bg-background px-5 py-3 text-sm font-bold placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
                        >
                          <option value="" disabled>Select an option</option>
                          {inquiryOptions.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </div>
                      </div>
                    </div>

                    {/* Name */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>First Name{requiredAsterisk}</label>
                        <Input required type="text" placeholder="Jane" value={form.firstName} onChange={set('firstName')} />
                      </div>
                      <div>
                        <label className={labelClasses}>Last Name{requiredAsterisk}</label>
                        <Input required type="text" placeholder="Doe" value={form.lastName} onChange={set('lastName')} />
                      </div>
                    </div>

                    {/* Email + Phone */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Work Email Address{requiredAsterisk}</label>
                        <Input required type="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} />
                      </div>
                      <div>
                        <label className={labelClasses}>Phone Number</label>
                        <Input type="tel" placeholder="+1 (555) 000-0000" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>

                    {/* Company + Role */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className={labelClasses}>Company/Organization{requiredAsterisk}</label>
                        <Input required type="text" placeholder="Company Inc." value={form.company} onChange={set('company')} />
                      </div>
                      <div>
                        <label className={labelClasses}>Your Role/Function</label>
                        <Input type="text" placeholder="e.g. VP Operations" value={form.role} onChange={set('role')} />
                      </div>
                    </div>

                    {/* Country */}
                    <div>
                      <label className={labelClasses}>Country/Region{requiredAsterisk}</label>
                      <Input required type="text" placeholder="United States" value={form.country} onChange={set('country')} />
                    </div>

                    {/* Message */}
                    <div>
                      <label className={labelClasses}>How can we help you?{requiredAsterisk}</label>
                      <Textarea required placeholder="Briefly describe your requirements..." value={form.message} onChange={set('message')} />
                    </div>

                    {/* File Attachment */}
                    <div className="relative group">
                      <Input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                      <div className="flex items-center justify-between px-5 py-4 bg-slate-50 border border-dashed border-input rounded-xl group-hover:border-primary/40 group-hover:bg-slate-100/50 transition-all">
                        <div className="flex items-center gap-3">
                          <Upload size={18} className="text-muted-foreground group-hover:text-primary" />
                          <span className="text-xs font-bold text-muted-foreground">{fileName || 'Attach Document (Optional)'}</span>
                        </div>
                        <Badge variant="secondary" className="group-hover:bg-white">Browse</Badge>
                      </div>
                    </div>

                    {/* Consent */}
                    <div className="flex items-start gap-4 py-2 px-1">
                      <div className="flex items-center h-5 mt-1">
                        <input
                          id="privacy-consent"
                          name="privacy-consent"
                          type="checkbox"
                          required
                          className="w-5 h-5 text-primary border-slate-300 rounded-md focus:ring-primary/20 transition-all cursor-pointer"
                        />
                      </div>
                      <label htmlFor="privacy-consent" className="text-[12px] text-muted-foreground font-medium leading-relaxed cursor-pointer select-none">
                        I agree to the use or processing of my personal information by KDCI for the purpose of fulfilling this request and in accordance with KDCI's{' '}
                        <button type="button" onClick={() => setView('privacy-policy')} className="text-primary font-black hover:underline">Privacy Statement</button>.
                      </label>
                    </div>

                    <Captcha ref={captchaRef} onVerify={() => {}} theme="light" />

                    <Button
                      disabled={formState === 'submitting'}
                      type="submit"
                      size="lg"
                      className="w-full text-lg gap-3"
                    >
                      {formState === 'submitting' ? (
                        <><Loader2 className="animate-spin" size={24} /> Sending…</>
                      ) : (
                        <>Submit Request <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /></>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT: Info */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="border-slate-200 shadow-lg">
              <CardContent className="p-8">
                <h4 className="text-[11px] font-black uppercase tracking-widest text-primary mb-6">Direct Lines</h4>
                <div className="space-y-5">
                  <div className="flex gap-4 items-center group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-muted-foreground border border-slate-200 transition-all group-hover:text-primary group-hover:bg-white group-hover:border-primary/20 group-hover:shadow-lg">
                      <Mail size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Email</div>
                      <a href="mailto:info@kdci.co" className="text-sm font-bold text-foreground hover:text-primary transition-colors">info@kdci.co</a>
                    </div>
                  </div>
                  <div className="flex gap-4 items-center group">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-muted-foreground border border-slate-200 transition-all group-hover:text-primary group-hover:bg-white group-hover:border-primary/20 group-hover:shadow-lg">
                      <Phone size={20} />
                    </div>
                    <div>
                      <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Voice</div>
                      <span className="text-sm font-bold text-foreground">+1 (650) 412-1400</span>
                    </div>
                  </div>
                </div>

                <div className="pt-8 mt-8 border-t border-slate-100">
                  <h4 className="text-[11px] font-black uppercase tracking-widest text-primary mb-6">Global Presence</h4>
                  <div className="space-y-6">
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-muted-foreground border border-slate-200 shrink-0 transition-all group-hover:text-primary group-hover:bg-white group-hover:border-primary/20 group-hover:shadow-lg">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Philippines Hub</div>
                        <p className="text-[14px] font-bold text-foreground leading-snug mt-1">
                          3008 One Corporate Centre, Julia Vargas Avenue, Ortigas Center, Pasig City 1605, Metro Manila, Philippines
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-4 group">
                      <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center text-muted-foreground border border-slate-200 shrink-0 transition-all group-hover:text-primary group-hover:bg-white group-hover:border-primary/20 group-hover:shadow-lg">
                        <Globe2 size={20} />
                      </div>
                      <div>
                        <div className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">US Operations</div>
                        <p className="text-[14px] font-bold text-foreground leading-snug mt-1">
                          552 E Carson St. Suite 104, Carson, CA 90745, USA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900 text-white shadow-2xl relative overflow-hidden group border-0">
              <div className="mesh-container opacity-20 pointer-events-none transition-opacity group-hover:opacity-30"><div className="blob blob-purple"></div></div>
              <CardContent className="relative z-10 text-center p-10">
                <h4 className="text-xl font-bold mb-3">Architect Availability</h4>
                <p className="text-white/50 text-sm leading-relaxed mb-6">Our solutions architects are online for triage calls.</p>
                <div className="flex items-center justify-center gap-3 bg-white/5 py-3 rounded-2xl border border-white/10">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-white/80">Response Time: &lt; 2hrs</span>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
};
