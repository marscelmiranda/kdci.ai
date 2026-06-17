import React, { useEffect, useState } from 'react';
import { ViewType } from '../types';
import { PortalSidebar } from '../components/PortalSidebar';
import {
  Briefcase, FileText, BookOpen, BookMarked,
  Image as ImageIcon, Users, UserCircle2,
  ChevronRight, Lock, Eye, EyeOff, Loader2, AlertCircle,
  CheckCircle2, ShieldQuestion, X, ClipboardList,
} from 'lucide-react';
import { getMe, forgotPassword, verifySecret, resetPassword } from '../lib/api';

// ── Types ────────────────────────────────────────────────────────────────────

interface DashboardCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  actionText: string;
  color: string;
  onClick: () => void;
}

// ── Dashboard Card ────────────────────────────────────────────────────────────

const DashboardCard = ({ title, description, icon, actionText, color, onClick }: DashboardCardProps) => (
  <div className="bg-[#1a1a1a] border border-white/5 rounded-[2rem] p-6 flex flex-col h-full hover:bg-[#222] transition-all group relative overflow-hidden">
    <div className={`absolute top-0 right-0 p-20 ${color} opacity-5 blur-[80px] rounded-full pointer-events-none`} />
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 shrink-0 rounded-2xl bg-white/5 flex items-center justify-center text-white/70 border border-white/5 group-hover:scale-110 group-hover:text-white transition-all duration-500">
          {icon}
        </div>
        <h3 className="text-xl font-heading font-bold text-white">{title}</h3>
      </div>
      <p className="text-white/50 text-sm mb-8 flex-grow leading-relaxed">{description}</p>
      <button
        onClick={onClick}
        className="w-full mt-auto py-3 rounded-xl bg-white/5 border border-white/10 text-xs font-black uppercase tracking-widest text-white/60 hover:bg-[#E61739] hover:text-white hover:border-[#E61739] transition-all flex items-center justify-center gap-2"
      >
        <span className="group-hover:translate-x-1 transition-transform">{actionText}</span>
        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────

export const PublisherDashboardPage = ({ setView, userRole }: { setView: (v: ViewType) => void; userRole: string }) => {
  const [userEmail, setUserEmail] = useState('');

  // Change-password modal state
  const [cpOpen, setCpOpen]                   = useState(false);
  const [cpStep, setCpStep]                   = useState<1 | 2 | 3>(1);
  const [cpSecretQuestion, setCpSecretQuestion] = useState('');
  const [cpCode, setCpCode]                   = useState('');
  const [cpSecretAnswer, setCpSecretAnswer]   = useState('');
  const [cpNewPassword, setCpNewPassword]     = useState('');
  const [cpConfirmPassword, setCpConfirmPassword] = useState('');
  const [cpShowPw, setCpShowPw]               = useState(false);
  const [cpLoading, setCpLoading]             = useState(false);
  const [cpError, setCpError]                 = useState<string | null>(null);

  useEffect(() => {
    document.body.style.backgroundColor = '#0a0a0a';
    return () => { document.body.style.backgroundColor = ''; };
  }, []);

  // Fetch user email for change-password flow
  useEffect(() => {
    getMe().then(u => { setUserEmail(u.email); }).catch(() => {});
  }, []);

  // Change-password modal helpers
  const openChangePassword = async () => {
    setCpError(null); setCpStep(1); setCpSecretAnswer('');
    setCpNewPassword(''); setCpConfirmPassword(''); setCpCode(''); setCpSecretQuestion('');
    setCpLoading(true); setCpOpen(true);
    try {
      const res = await forgotPassword(userEmail);
      setCpCode(res.code ?? '');
      setCpSecretQuestion(res.secret_question ?? '');
    } catch (err: any) {
      setCpError(err.message ?? 'Could not start password change. Try again.');
    } finally {
      setCpLoading(false);
    }
  };

  const handleCpVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpSecretAnswer.trim()) { setCpError('Please answer the security question.'); return; }
    setCpError(null); setCpLoading(true);
    try {
      await verifySecret(userEmail, cpSecretAnswer.trim());
      setCpStep(2);
    } catch (err: any) {
      setCpError(err.message ?? 'Incorrect answer. Try again.');
    } finally {
      setCpLoading(false);
    }
  };

  const handleCpSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cpNewPassword.length < 8) { setCpError('Password must be at least 8 characters.'); return; }
    if (cpNewPassword !== cpConfirmPassword) { setCpError('Passwords do not match.'); return; }
    setCpError(null); setCpLoading(true);
    try {
      await resetPassword(userEmail, cpCode, cpNewPassword);
      setCpStep(3);
    } catch (err: any) {
      setCpError(err.message ?? 'Password update failed. Try again.');
    } finally {
      setCpLoading(false);
    }
  };

  // Role-based visibility
  const show = (card: 'careers' | 'blogs' | 'resources' | 'portfolio' | 'casestudies' | 'approvals' | 'profile' | 'manpower') => {
    if (userRole === 'marketing')   return ['blogs', 'resources', 'casestudies', 'profile'].includes(card);
    if (userRole === 'recruitment') return ['careers', 'manpower', 'profile'].includes(card);
    if (userRole === 'manager')     return ['manpower', 'profile'].includes(card);
    if (userRole === 'admin')       return true;
    return !['approvals', 'manpower'].includes(card);
  };


  return (
    <div className="h-screen bg-[#0a0a0a] text-white font-sans flex overflow-hidden">
      <PortalSidebar setView={setView} activeNav="dashboard" />

      <main className="flex-1 min-w-0 overflow-y-auto p-8 md:p-12">

        {/* Page header */}
        <div className="mb-8 md:mb-10">
          <h1 className="text-2xl md:text-4xl font-heading font-bold">
            Welcome to your portal.
          </h1>
          <p className="text-white/40 text-sm font-medium mt-2">
            Manage your content pipeline and talent acquisition.
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {show('careers') && (
            <DashboardCard
              title="Career Ops"
              description="Manage all open job requisitions, view active applicant pipelines, and publish new roles."
              icon={<Briefcase size={24} />}
              actionText="Manage Careers"
              color="bg-blue-600"
              onClick={() => setView('career-ops')}
            />
          )}
          {show('manpower') && (
            <DashboardCard
              title="Manpower Requests"
              description="Submit staffing requests for new hires. Recruiters will review, self-assign, and publish approved roles to the Careers page."
              icon={<ClipboardList size={24} />}
              actionText="Submit Request"
              color="bg-amber-600"
              onClick={() => setView('manpower-requests')}
            />
          )}
          {show('blogs') && (
            <DashboardCard
              title="Blogs"
              description="Create, edit, and publish new articles, news, and insights to the main blog portal."
              icon={<FileText size={24} />}
              actionText="Manage Blogs"
              color="bg-purple-600"
              onClick={() => setView('blog-ops')}
            />
          )}
          {show('resources') && (
            <DashboardCard
              title="Resources"
              description="Publish actionable ebooks, technical case studies, and engaging webinar materials."
              icon={<BookOpen size={24} />}
              actionText="Manage Resources"
              color="bg-green-600"
              onClick={() => setView('resources-ops')}
            />
          )}
          {show('portfolio') && (
            <DashboardCard
              title="Portfolio"
              description="Showcase creative work, recent client deployments, and highly-visual case results."
              icon={<ImageIcon size={24} />}
              actionText="Manage Portfolio"
              color="bg-orange-600"
              onClick={() => setView('portfolio-ops')}
            />
          )}
          {show('casestudies') && (
            <DashboardCard
              title="Case Studies"
              description="Write, publish, and manage client success stories displayed on the public case studies page."
              icon={<BookMarked size={24} />}
              actionText="Manage Case Studies"
              color="bg-teal-600"
              onClick={() => setView('case-studies-ops')}
            />
          )}
          {show('approvals') && (
            <DashboardCard
              title="User Approvals"
              description="Review and approve pending team member accounts, manage access and unlock locked accounts."
              icon={<Users size={24} />}
              actionText="Manage Users"
              color="bg-red-600"
              onClick={() => setView('admin-approvals')}
            />
          )}
          {show('profile') && (
            <DashboardCard
              title="My Profile"
              description="View and update your employee profile, work information, contact details, and org chart position."
              icon={<UserCircle2 size={24} />}
              actionText="View Profile"
              color="bg-indigo-600"
              onClick={() => setView('profile')}
            />
          )}
        </div>
      </main>

      {/* ═══════════════════════════════════════════════════════
          CHANGE PASSWORD MODAL
      ═══════════════════════════════════════════════════════ */}
      {cpOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
          <div className="bg-[#111] border border-white/10 rounded-3xl w-full max-w-md p-8 relative shadow-2xl">
            <button
              onClick={() => setCpOpen(false)}
              className="absolute top-5 right-5 text-white/30 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <div className="mb-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#E61739] mb-1">
                {cpStep === 3 ? 'Done' : `Step ${cpStep} of 2`}
              </p>
              <h2 className="text-xl font-heading font-bold text-white">
                {cpStep === 1 && 'Verify Your Identity'}
                {cpStep === 2 && 'Set New Password'}
                {cpStep === 3 && 'Password Updated'}
              </h2>
              {cpStep < 3 && (
                <div className="flex gap-2 mt-3">
                  {[1, 2].map(i => (
                    <div key={i} className={`h-1 w-8 rounded-full transition-all ${i <= cpStep ? 'bg-[#E61739]' : 'bg-white/10'}`} />
                  ))}
                </div>
              )}
            </div>

            {cpError && (
              <div className="mb-4 flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl px-4 py-3 text-sm font-medium">
                <AlertCircle size={16} className="shrink-0" />{cpError}
              </div>
            )}

            {/* Step 1 — Security question */}
            {cpStep === 1 && (
              <form onSubmit={handleCpVerify} className="space-y-5">
                {cpLoading && !cpSecretQuestion ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="animate-spin text-[#E61739]" size={28} />
                  </div>
                ) : (
                  <>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">
                        <ShieldQuestion size={12} /> Security Question
                      </div>
                      <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm font-medium text-white/80">
                        {cpSecretQuestion || '—'}
                      </div>
                      <input
                        type="text"
                        required
                        placeholder="Your answer..."
                        value={cpSecretAnswer}
                        onChange={e => setCpSecretAnswer(e.target.value)}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#E61739] transition-all"
                      />
                      <p className="text-[10px] text-white/30 ml-1">Answer is not case-sensitive.</p>
                    </div>
                    <button
                      type="submit"
                      disabled={cpLoading}
                      className="w-full py-3.5 bg-[#E61739] text-white rounded-xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                    >
                      {cpLoading ? <Loader2 className="animate-spin" size={18} /> : 'Verify & Continue'}
                    </button>
                  </>
                )}
              </form>
            )}

            {/* Step 2 — New password */}
            {cpStep === 2 && (
              <form onSubmit={handleCpSave} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type={cpShowPw ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={cpNewPassword}
                      onChange={e => setCpNewPassword(e.target.value)}
                      className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-white placeholder:text-white/20 focus:outline-none focus:border-[#E61739] transition-all"
                    />
                    <button type="button" onClick={() => setCpShowPw(!cpShowPw)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white">
                      {cpShowPw ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black uppercase tracking-widest text-white/40 ml-1">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={16} />
                    <input
                      type="password"
                      required
                      placeholder="••••••••"
                      value={cpConfirmPassword}
                      onChange={e => setCpConfirmPassword(e.target.value)}
                      className={`w-full pl-11 pr-10 py-3 bg-white/5 border rounded-xl text-sm font-bold text-white placeholder:text-white/20 focus:outline-none transition-all ${
                        cpConfirmPassword && cpNewPassword !== cpConfirmPassword
                          ? 'border-red-500/50 focus:border-red-500'
                          : cpConfirmPassword && cpNewPassword === cpConfirmPassword
                          ? 'border-green-500/50 focus:border-green-500'
                          : 'border-white/10 focus:border-[#E61739]'
                      }`}
                    />
                    {cpConfirmPassword && cpNewPassword === cpConfirmPassword && (
                      <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-green-400" size={16} />
                    )}
                  </div>
                </div>
                <button
                  type="submit"
                  disabled={cpLoading}
                  className="w-full py-3.5 bg-[#E61739] text-white rounded-xl font-bold text-sm hover:bg-[#c51431] transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {cpLoading ? <Loader2 className="animate-spin" size={18} /> : 'Save New Password'}
                </button>
              </form>
            )}

            {/* Step 3 — Success */}
            {cpStep === 3 && (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto">
                  <CheckCircle2 size={32} className="text-green-400" />
                </div>
                <p className="text-white/60 text-sm">Your password has been updated successfully.</p>
                <button
                  onClick={() => setCpOpen(false)}
                  className="w-full py-3.5 bg-white/5 border border-white/10 text-white rounded-xl font-bold text-sm hover:bg-white/10 transition-all"
                >
                  Done
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
