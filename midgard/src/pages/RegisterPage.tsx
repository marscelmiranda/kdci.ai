import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { User, Mail, Lock, ArrowRight, Loader2, AlertCircle, CheckCircle2, ChevronLeft, Eye, EyeOff, Shield, AtSign } from 'lucide-react';
import { register } from '../lib/api';

const SECRET_QUESTIONS = [
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your elementary school?",
  "What was the make of your first car?",
];

const getStrength = (pw: string) => {
  if (!pw) return { score: 0, label: '', bar: '', text: '' };
  let s = 0;
  if (pw.length >= 8) s++;
  if (pw.length >= 12) s++;
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
  if (/[0-9]/.test(pw)) s++;
  if (/[^A-Za-z0-9]/.test(pw)) s++;
  if (s <= 1) return { score: s, label: 'Weak',       bar: 'bg-red-500',     text: 'text-red-500' };
  if (s === 2) return { score: s, label: 'Fair',       bar: 'bg-orange-400',  text: 'text-orange-500' };
  if (s === 3) return { score: s, label: 'Good',       bar: 'bg-yellow-400',  text: 'text-yellow-600' };
  if (s === 4) return { score: s, label: 'Strong',     bar: 'bg-green-500',   text: 'text-green-600' };
  return               { score: s, label: 'Very Strong', bar: 'bg-emerald-500', text: 'text-emerald-600' };
};

export const RegisterPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [form, setForm] = useState({
    full_name: '', email: '', username: '', password: '', confirm: '',
    secret_question: SECRET_QUESTIONS[0], secret_answer: '',
  });
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = '#020202';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const strength = getStrength(form.password);

  const triggerShake = (msg: string) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8) { triggerShake('Password must be at least 8 characters.'); return; }
    if (form.password !== form.confirm) { triggerShake('Passwords do not match.'); return; }
    if (!form.secret_answer.trim()) { triggerShake('Please answer your security question.'); return; }
    setLoading(true);
    try {
      await register({
        full_name: form.full_name, email: form.email, username: form.username,
        password: form.password, secret_question: form.secret_question, secret_answer: form.secret_answer,
      });
      setSuccess(true);
    } catch (err: any) {
      triggerShake(err.message ?? 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <>
        <style>{`@keyframes shake{0%,100%{transform:translateX(0)}15%,55%,85%{transform:translateX(-7px)}35%,70%{transform:translateX(7px)}}.shake{animation:shake 0.45s ease-in-out}`}</style>
        <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center px-6">
          <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-blob-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[100px] animate-blob-float-reverse"></div>
          </div>
          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl text-center">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-green-100">
                <CheckCircle2 size={32} className="text-green-500" />
              </div>
              <h2 className="text-2xl font-heading font-bold text-slate-900 mb-3">Request Submitted</h2>
              <p className="text-slate-500 text-sm leading-relaxed mb-8 max-w-xs mx-auto">
                Your account has been submitted for administrator approval. You will be notified once approved.
              </p>
              <button onClick={() => setView('login')}
                className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group">
                Back to Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{`@keyframes shake{0%,100%{transform:translateX(0)}15%,55%,85%{transform:translateX(-7px)}35%,70%{transform:translateX(7px)}}.shake{animation:shake 0.45s ease-in-out}`}</style>
      <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center px-6 py-12">
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-blob-float"></div>
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[100px] animate-blob-float-reverse"></div>
        </div>
        <div className="relative z-10 w-full max-w-md">
          <div className={`bg-white rounded-[2.5rem] p-10 shadow-2xl ${shake ? 'shake' : ''}`}>

            <div className="text-center mb-8">
              <button onClick={() => setView('login')}
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#E61739] transition-colors mx-auto mb-6">
                <ChevronLeft size={12} /> Back to Sign In
              </button>
              <div className="flex justify-center mb-5 scale-90"><Logo isDarkHero={false} /></div>
              <h1 className="text-2xl font-heading font-bold text-slate-900">Create Account</h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">Join the KDCI Midgard platform.</p>
            </div>

            {error && (
              <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
                <AlertCircle size={16} className="shrink-0" />{error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" required placeholder="Juan dela Cruz" value={form.full_name}
                    onChange={e => setForm(p => ({ ...p, full_name: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="email" required placeholder="name@kdci.co" value={form.email}
                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Username</label>
                <div className="relative">
                  <AtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" required placeholder="username" value={form.username}
                    onChange={e => setForm(p => ({ ...p, username: e.target.value.replace(/[^a-z0-9_]/gi, '').toLowerCase() }))}
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold font-mono text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type={showPw ? 'text' : 'password'} required placeholder="••••••••" value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
                  <button type="button" onClick={() => setShowPw(!showPw)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {form.password && (
                  <div className="space-y-1.5 mt-1.5">
                    <div className="flex gap-1">
                      {[1,2,3,4,5].map(i => (
                        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-300 ${i <= strength.score ? strength.bar : 'bg-slate-100'}`} />
                      ))}
                    </div>
                    <div className="flex justify-between">
                      <p className={`text-[10px] font-black uppercase tracking-widest ${strength.text}`}>{strength.label}</p>
                      <p className="text-[10px] text-slate-400">Min 8 chars, mixed + numbers + symbols</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="password" required placeholder="••••••••" value={form.confirm}
                    onChange={e => setForm(p => ({ ...p, confirm: e.target.value }))}
                    className={`w-full pl-11 pr-10 py-3 bg-slate-50 border rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 ${
                      form.confirm && form.password !== form.confirm ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
                      : form.confirm && form.password === form.confirm ? 'border-green-300 focus:border-green-400 focus:ring-green-500/10'
                      : 'border-slate-200 focus:border-[#E61739] focus:ring-[#E61739]/10'
                    }`} />
                  {form.confirm && form.password === form.confirm && (
                    <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={16} />
                  )}
                </div>
              </div>

              <div className="pt-1 pb-0.5">
                <div className="flex items-center gap-3">
                  <div className="h-px bg-slate-100 flex-grow"></div>
                  <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-slate-400"><Shield size={10} /> Security Question</div>
                  <div className="h-px bg-slate-100 flex-grow"></div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Security Question</label>
                <select value={form.secret_question} onChange={e => setForm(p => ({ ...p, secret_question: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all">
                  {SECRET_QUESTIONS.map(q => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Your Answer</label>
                <input type="text" required placeholder="Your answer..." value={form.secret_answer}
                  onChange={e => setForm(p => ({ ...p, secret_answer: e.target.value }))}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
                <p className="text-[10px] text-slate-400 ml-1">Answer is not case-sensitive.</p>
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg mt-2">
                {loading ? <Loader2 className="animate-spin" size={18} /> : <>Create Account <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
              </button>
            </form>

            <p className="mt-6 text-center text-xs text-slate-400">
              Already have an account?{' '}
              <button onClick={() => setView('login')} className="font-bold text-[#E61739] hover:underline">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
