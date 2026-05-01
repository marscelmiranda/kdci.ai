import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, ChevronLeft, AlertCircle, CheckCircle2 } from 'lucide-react';
import { signIn, sendPasswordReset } from '../authStore';

export const LoginPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  // Forgot password state
  const [showReset, setShowReset]       = useState(false);
  const [resetEmail, setResetEmail]     = useState('');
  const [resetSent, setResetSent]       = useState(false);
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError]     = useState<string | null>(null);

  useEffect(() => {
    const orig = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#020202';
    return () => { document.body.style.backgroundColor = orig; };
  }, []);

  // ── Sign in ────────────────────────────────────────────────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { user, error: authError } = await signIn(email, password);
    setLoading(false);
    if (authError || !user) {
      setError('Invalid email or password. Please try again.');
      return;
    }
    setView('publisher-dashboard');
  };

  // ── Password reset ─────────────────────────────────────────────
  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setResetError(null);
    setResetLoading(true);
    const { error: resetErr } = await sendPasswordReset(resetEmail);
    setResetLoading(false);
    if (resetErr) {
      setResetError(resetErr);
      return;
    }
    setResetSent(true);
  };

  return (
    <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center relative overflow-hidden px-6">
      {/* Background mesh */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-blob-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[100px] animate-blob-float animation-delay-2000"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/10 animate-in fade-in zoom-in duration-500">

          <div className="text-center mb-10">
            <div className="flex justify-center mb-6 scale-90">
              <Logo isDarkHero={false} />
            </div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">
              {showReset ? 'Reset Password' : 'Employee Portal'}
            </h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">
              {showReset ? 'Enter your work email to receive a reset link.' : 'Secure access for KDCI team members.'}
            </p>
          </div>

          {/* ── FORGOT PASSWORD VIEW ── */}
          {showReset ? (
            <>
              {resetSent ? (
                <div className="text-center py-4">
                  <div className="w-14 h-14 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 size={28} />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">Check your inbox</h3>
                  <p className="text-sm text-slate-500 mb-6">
                    We sent a reset link to <strong>{resetEmail}</strong>. It expires in 1 hour.
                  </p>
                  <button onClick={() => { setShowReset(false); setResetSent(false); setResetEmail(''); }}
                    className="text-xs font-black uppercase tracking-widest text-[#E61739] hover:underline">
                    Back to Sign In
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReset} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="email" required value={resetEmail} onChange={e => setResetEmail(e.target.value)}
                        placeholder="name@kdci.co"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400"/>
                    </div>
                  </div>

                  {resetError && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs font-bold">
                      <AlertCircle size={14} className="shrink-0"/>{resetError}
                    </div>
                  )}

                  <button type="submit" disabled={resetLoading}
                    className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg">
                    {resetLoading ? <Loader2 className="animate-spin" size={18}/> : <>Send Reset Link <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/></>}
                  </button>

                  <button type="button" onClick={() => { setShowReset(false); setResetError(null); }}
                    className="w-full text-center text-xs font-black text-slate-400 hover:text-[#E61739] transition-colors uppercase tracking-widest">
                    Back to Sign In
                  </button>
                </form>
              )}
            </>
          ) : (
            /* ── SIGN IN VIEW ── */
            <>
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="email" required value={email} onChange={e => { setEmail(e.target.value); setError(null); }}
                      placeholder="name@kdci.co"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400"/>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="password" required value={password} onChange={e => { setPassword(e.target.value); setError(null); }}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400"/>
                  </div>
                </div>

                {/* Error message */}
                {error && (
                  <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3 text-xs font-bold">
                    <AlertCircle size={14} className="shrink-0"/>{error}
                  </div>
                )}

                <button type="submit" disabled={loading}
                  className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg">
                  {loading ? <Loader2 className="animate-spin" size={18}/> : <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform"/></>}
                </button>
              </form>

              <div className="my-8 flex items-center gap-4">
                <div className="h-px bg-slate-100 flex-grow"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Or Access With</span>
                <div className="h-px bg-slate-100 flex-grow"></div>
              </div>

              <button className="w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-slate-700 hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                <img src="https://www.svgrepo.com/show/452062/microsoft.svg" alt="Microsoft" className="w-5 h-5" />
                Microsoft 365
              </button>

              <div className="mt-8 text-center">
                <button onClick={() => { setShowReset(true); setError(null); setResetEmail(email); }}
                  className="text-xs font-bold text-slate-400 hover:text-[#E61739] transition-colors">
                  Forgot Password?
                </button>
                <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 py-2 px-4 rounded-full w-fit mx-auto border border-green-100">
                  <ShieldCheck size={12} /> SSO Enabled
                </div>
              </div>
            </>
          )}
        </div>

        <div className="text-center mt-8">
          <button onClick={() => setView('home')}
            className="text-white/40 text-xs font-bold hover:text-white transition-colors flex items-center gap-2 mx-auto uppercase tracking-widest">
            <ChevronLeft size={12} /> Back to KDCI.ai
          </button>
        </div>
      </div>
    </div>
  );
};
