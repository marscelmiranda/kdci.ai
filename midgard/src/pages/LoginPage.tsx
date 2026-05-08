import React, { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Logo } from '../components/Logo';
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck, AlertCircle } from 'lucide-react';
import { login, setToken } from '../lib/api';

export const LoginPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#020202';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { token } = await login(email.trim(), password);
      setToken(token);
      setView('dashboard');
    } catch (err: any) {
      setError(err.message ?? 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#020202] flex items-center justify-center relative overflow-hidden px-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-600/30 rounded-full blur-[100px] animate-blob-float"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-pink-600/30 rounded-full blur-[100px] animate-blob-float-reverse"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white rounded-[2.5rem] p-10 shadow-2xl border border-white/10">
          <div className="text-center mb-10">
            <div className="flex justify-center mb-6 scale-90">
              <Logo isDarkHero={false} />
            </div>
            <h1 className="text-2xl font-heading font-bold text-slate-900">Midgard</h1>
            <p className="text-slate-500 text-sm mt-2 font-medium">Secure access for KDCI team members.</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 text-sm font-medium">
              <AlertCircle size={16} className="shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="email"
                  required
                  placeholder="name@kdci.co"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:outline-none focus:border-[#E61739] focus:ring-4 focus:ring-[#E61739]/10 transition-all placeholder:text-slate-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#1D1D1F] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2 group disabled:opacity-70 shadow-lg"
            >
              {loading
                ? <Loader2 className="animate-spin" size={18} />
                : <>Sign In <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" /></>
              }
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
            <a href="#" className="text-xs font-bold text-slate-400 hover:text-[#E61739] transition-colors">Forgot Password?</a>
            <div className="mt-6 flex items-center justify-center gap-2 text-[10px] font-bold text-green-600 bg-green-50 py-2 px-4 rounded-full w-fit mx-auto border border-green-100">
              <ShieldCheck size={12} /> SSO Enabled
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
