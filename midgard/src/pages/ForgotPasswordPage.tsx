import React, { useState, useEffect, useRef } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import {
  Mail, ArrowRight, Loader2, AlertCircle, CheckCircle2,
  ChevronLeft, Lock, Eye, EyeOff, RefreshCw, ShieldQuestion
} from 'lucide-react';
import { forgotPassword, verifyCode, verifySecret, resetPassword } from '../lib/api';

export const ForgotPasswordPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [email, setEmail] = useState('');
  const [simulatedCode, setSimulatedCode] = useState<string | null>(null);
  const [secretQuestion, setSecretQuestion] = useState('');
  const [codeDigits, setCodeDigits] = useState(['', '', '', '', '', '']);
  const [secretAnswer, setSecretAnswer] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shake, setShake] = useState(false);
  const codeRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    document.body.style.backgroundColor = '#020202';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const triggerShake = (msg: string) => {
    setError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleStep1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await forgotPassword(email.trim());
      setSimulatedCode(res.code ?? null);
      setSecretQuestion(res.secret_question ?? '');
      setStep(2);
    } catch (err: any) {
      triggerShake(err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleStep2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const code = codeDigits.join('');
    if (code.length < 6) { triggerShake('Please enter the full 6-digit code.'); return; }
    setLoading(true);
    try {
      await verifyCode(email.trim(), code);
      await verifySecret(email.trim(), secretAnswer.trim());
      setStep(3);
    } catch (err: any) {
      triggerShake(err.message ?? 'Verification failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleStep3 = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (newPassword.length < 8) { triggerShake('Password must be at least 8 characters.'); return; }
    if (newPassword !== confirmPassword) { triggerShake('Passwords do not match.'); return; }
    setLoading(true);
    try {
      await resetPassword(email.trim(), codeDigits.join(''), newPassword);
      setStep(4);
    } catch (err: any) {
      triggerShake(err.message ?? 'Reset failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleCodeInput = (index: number, value: string) => {
    const digit = value.replace(/\D/g, '').slice(-1);
    const next = [...codeDigits];
    next[index] = digit;
    setCodeDigits(next);
    if (digit && index < 5) codeRefs.current[index + 1]?.focus();
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) codeRefs.current[index - 1]?.focus();
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      setCodeDigits(paste.split(''));
      codeRefs.current[5]?.focus();
      e.preventDefault();
    }
  };

  const stepLabels = ['Email', 'Verify', 'New Password'];

  const card = (content: React.ReactNode) => (
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
              <button onClick={() => step === 1 ? setView('login') : setStep(s => Math.max(1, s - 1) as any)}
                className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-[#E61739] transition-colors mx-auto mb-6">
                <ChevronLeft size={12} /> {step === 1 ? 'Back to Sign In' : 'Back'}
              </button>
              <div className="flex justify-center mb-5 scale-90"><Logo isDarkHero={false} /></div>
              <h1 className="text-2xl font-heading font-bold text-slate-900">Reset Password</h1>
              <p className="text-slate-500 text-sm mt-2 font-medium">Step {step < 4 ? step : 3} of 3 — {stepLabels[Math.min(step - 1, 2)]}</p>
              {step < 4 && (
                <div className="flex justify-center gap-2 mt-4">
                  {[1,2,3].map(i => (
                    <div key={i} className={`h-1 w-8 rounded-full transition-all ${i <= Math.min(step, 3) ? 'bg-[#E61739]' : 'bg-slate-100'}`} />
                  ))}
                </div>
              )}
            </div>
            {error && (
              <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
                <AlertCircle size={16} className="shrink-0" />{error}
              </div>
            )}
            {content}
          </div>
        </div>
      </div>
    </>
  );

  if (step === 1) return card(
    <form onSubmit={handleStep1} className="space-y-5">
      <p className="text-sm text-slate-500 text-center -mt-2 mb-4">Enter your registered email and we'll generate a verification code.</p>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="email" required placeholder="name@kdci.co" value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
        </div>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg">
        {loading ? <Loader2 className="animate-spin" size={18} /> : <>Send Code <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
      </button>
    </form>
  );

  if (step === 2) return card(
    <form onSubmit={handleStep2} className="space-y-6">
      {simulatedCode && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-center">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-600 mb-1">Simulated — No Email Sent</p>
          <p className="text-2xl font-black font-mono tracking-[0.3em] text-amber-700">{simulatedCode}</p>
          <p className="text-[10px] text-amber-500 mt-1">Code expires in 15 minutes</p>
        </div>
      )}
      <div className="space-y-2">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Enter 6-Digit Code</label>
        <div className="flex gap-2 justify-center" onPaste={handleCodePaste}>
          {codeDigits.map((d, i) => (
            <input
              key={i}
              ref={el => { codeRefs.current[i] = el; }}
              type="text" inputMode="numeric" maxLength={1} value={d}
              onChange={e => handleCodeInput(i, e.target.value)}
              onKeyDown={e => handleCodeKeyDown(i, e)}
              className={`w-11 h-14 text-center text-xl font-black border-2 rounded-xl focus:outline-none transition-all ${d ? 'border-[#E61739] bg-[#E61739]/5 text-[#E61739]' : 'border-slate-200 bg-slate-50 text-slate-900'} focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10`}
            />
          ))}
        </div>
      </div>
      {secretQuestion && (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">
            <ShieldQuestion size={12} /> Security Question
          </div>
          <p className="text-sm font-bold text-slate-700 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">{secretQuestion}</p>
          <input type="text" required placeholder="Your answer..." value={secretAnswer}
            onChange={e => setSecretAnswer(e.target.value)}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
          <p className="text-[10px] text-slate-400 ml-1">Answer is not case-sensitive.</p>
        </div>
      )}
      <button type="submit" disabled={loading}
        className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg">
        {loading ? <Loader2 className="animate-spin" size={18} /> : <>Verify & Continue <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
      </button>
    </form>
  );

  if (step === 3) return card(
    <form onSubmit={handleStep3} className="space-y-5">
      <p className="text-sm text-slate-500 text-center -mt-2 mb-2">Create a new password for your account.</p>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">New Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type={showPw ? 'text' : 'password'} required placeholder="••••••••" value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            className="w-full pl-11 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400" />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Confirm Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input type="password" required placeholder="••••••••" value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            className={`w-full pl-11 pr-10 py-3 bg-slate-50 border rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:ring-4 transition-all placeholder:text-slate-400 ${
              confirmPassword && newPassword !== confirmPassword ? 'border-red-300 focus:border-red-400 focus:ring-red-500/10'
              : confirmPassword && newPassword === confirmPassword ? 'border-green-300 focus:border-green-400 focus:ring-green-500/10'
              : 'border-slate-200 focus:border-[#E61739] focus:ring-[#E61739]/10'
            }`} />
          {confirmPassword && newPassword === confirmPassword && (
            <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500" size={16} />
          )}
        </div>
      </div>
      <button type="submit" disabled={loading}
        className="w-full py-4 bg-[#E61739] text-white rounded-xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg">
        {loading ? <Loader2 className="animate-spin" size={18} /> : <>Reset Password <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>}
      </button>
    </form>
  );

  return card(
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto border-2 border-green-100">
        <CheckCircle2 size={32} className="text-green-500" />
      </div>
      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-2">Password Reset!</h2>
        <p className="text-slate-500 text-sm">Your password has been updated. You can now sign in with your new password.</p>
      </div>
      <button onClick={() => setView('login')}
        className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group">
        Back to Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
};
