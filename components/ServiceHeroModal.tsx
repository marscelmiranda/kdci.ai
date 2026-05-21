import React, { useState, useRef, useEffect } from 'react';
import { X, Star, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { Captcha, CaptchaHandle } from './Captcha';

export interface ServiceHeroModalConfig {
  tag: string;
  title: string;
  subtitle: string;
  inquiryType: string;
  source: string;
  specificField?: {
    label: string;
    placeholder: string;
    fieldKey: string;
  };
  notesPlaceholder: string;
  submitLabel: string;
  successTitle: string;
  successMessage: string;
}

interface Props {
  config: ServiceHeroModalConfig;
  onClose: () => void;
}

export const ServiceHeroModal = ({ config, onClose }: Props) => {
  const [form, setForm] = useState({ name: '', company: '', email: '', phone: '', specific: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');
  const captchaRef = useRef<CaptchaHandle>(null);
  const firstRef = useRef<HTMLInputElement>(null);

  const lightInp = "w-full bg-white border-2 border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#E61739] focus:ring-2 focus:ring-[#E61739]/10 transition-all shadow-sm";

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    setTimeout(() => firstRef.current?.focus(), 80);
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (captchaRef.current?.isBot()) return;
    setSubmitting(true);
    setError('');
    const payload: Record<string, string> = {
      name: form.name,
      company: form.company,
      email: form.email,
      phone: form.phone,
      notes: form.notes,
      inquiryType: config.inquiryType,
      source: config.source,
    };
    if (config.specificField && form.specific) {
      payload[config.specificField.fieldKey] = form.specific;
    }
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Failed');
      setDone(true);
    } catch {
      setError('Something went wrong. Please try again or email us at info@kdci.co.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4"
      style={{ animation: 'fadeInUp 0.25s ease both' }}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <div
        className="relative z-10 w-full max-w-2xl bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-2xl"
        style={{ maxHeight: '90vh', overflowY: 'auto' }}
      >
        <div className="flex items-center justify-between px-8 pt-8 pb-6 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-[#E61739] text-[10px] font-black uppercase tracking-widest mb-2">
              <Star size={10} /> {config.tag}
            </div>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">{config.title}</h2>
            <p className="text-slate-400 text-sm font-medium mt-1">{config.subtitle}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-700 transition-all shrink-0 ml-4"
          >
            <X size={16} />
          </button>
        </div>

        <div className="px-8 py-8 bg-slate-50/60">
          {done ? (
            <div className="flex flex-col items-center text-center gap-5 py-10">
              <div className="w-16 h-16 bg-[#E61739] rounded-2xl flex items-center justify-center shadow-xl">
                <CheckCircle2 size={30} className="text-white" />
              </div>
              <h3 className="text-xl font-black text-slate-900">{config.successTitle}</h3>
              <p className="text-slate-500 text-sm font-medium max-w-xs leading-relaxed" style={{ textWrap: 'balance' }}>
                {config.successMessage}
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-8 py-3 bg-slate-100 rounded-2xl text-slate-700 text-sm font-bold hover:bg-slate-200 transition-all"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Full Name</label>
                  <input
                    ref={firstRef}
                    required
                    className={lightInp}
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Company</label>
                  <input
                    required
                    className={lightInp}
                    placeholder="Acme Inc."
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Work Email</label>
                  <input
                    required
                    type="email"
                    className={lightInp}
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Phone (optional)</label>
                  <input
                    className={lightInp}
                    placeholder="+1 555 000 0000"
                    value={form.phone}
                    onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  />
                </div>
              </div>
              {config.specificField && (
                <div>
                  <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">
                    {config.specificField.label}
                  </label>
                  <input
                    className={lightInp}
                    placeholder={config.specificField.placeholder}
                    value={form.specific}
                    onChange={e => setForm(f => ({ ...f, specific: e.target.value }))}
                  />
                </div>
              )}
              <div>
                <label className="text-xs text-slate-700 font-black uppercase tracking-widest block mb-1.5">Additional Notes</label>
                <textarea
                  rows={3}
                  className={lightInp + ' resize-none'}
                  placeholder={config.notesPlaceholder}
                  value={form.notes}
                  onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                />
              </div>
              <Captcha ref={captchaRef} onVerify={() => {}} theme="light" />
              {error && (
                <p className="text-red-500 text-[13px] font-semibold bg-red-50 border border-red-100 rounded-xl px-4 py-3">
                  {error}
                </p>
              )}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold text-sm hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-[2] py-4 bg-[#E61739] text-white rounded-2xl font-bold text-base hover:bg-[#c51431] disabled:opacity-60 transition-all shadow-lg flex items-center justify-center gap-2 group"
                >
                  {submitting
                    ? <><Loader2 size={16} className="animate-spin" /> Sending…</>
                    : <>{config.submitLabel} <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" /></>
                  }
                </button>
              </div>
              <p className="text-slate-400 text-[11px] text-center font-medium">No commitment · Response within 24 hours</p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
