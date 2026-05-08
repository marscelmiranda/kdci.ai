import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { PublisherDashboardPage } from './pages/PublisherDashboardPage';
import { BlogOpsPage } from './pages/BlogOpsPage';
import { CareerOpsPage } from './pages/CareerOpsPage';
import { ResourcesOpsPage } from './pages/ResourcesOpsPage';
import { PortfolioOpsPage } from './pages/PortfolioOpsPage';
import { AdminApprovalsPage } from './pages/AdminApprovalsPage';
import { getToken, getMe, clearToken } from './lib/api';

const PUBLIC_VIEWS: ViewType[] = ['login', 'register', 'forgot-password'];

const App = () => {
  const [activeView, setActiveView] = useState<ViewType | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) { setActiveView('login'); return; }
    getMe()
      .then(() => setActiveView('dashboard'))
      .catch(() => { clearToken(); setActiveView('login'); });
  }, []);

  const setView = (v: ViewType) => {
    if (v === 'login') clearToken();
    setActiveView(v);
    window.scrollTo(0, 0);
  };

  const guardedSetView = (v: ViewType) => {
    if (!PUBLIC_VIEWS.includes(v) && !getToken()) { setActiveView('login'); return; }
    setView(v);
  };

  if (activeView === null) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (activeView === 'login') return <LoginPage setView={setView} />;
  if (activeView === 'register') return <RegisterPage setView={setView} />;
  if (activeView === 'forgot-password') return <ForgotPasswordPage setView={setView} />;

  if (!getToken()) return <LoginPage setView={setView} />;

  if (activeView === 'dashboard') return <PublisherDashboardPage setView={guardedSetView} />;
  if (activeView === 'blog-ops') return <BlogOpsPage setView={guardedSetView} />;
  if (activeView === 'career-ops') return <CareerOpsPage setView={guardedSetView} />;
  if (activeView === 'resources-ops') return <ResourcesOpsPage setView={guardedSetView} />;
  if (activeView === 'portfolio-ops') return <PortfolioOpsPage setView={guardedSetView} />;
  if (activeView === 'admin-approvals') return <AdminApprovalsPage setView={guardedSetView} />;

  return <LoginPage setView={setView} />;
};

export default App;
