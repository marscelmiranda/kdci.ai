import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import { LoginPage } from './pages/LoginPage';
import { PublisherDashboardPage } from './pages/PublisherDashboardPage';
import { BlogOpsPage } from './pages/BlogOpsPage';
import { CareerOpsPage } from './pages/CareerOpsPage';
import { ResourcesOpsPage } from './pages/ResourcesOpsPage';
import { PortfolioOpsPage } from './pages/PortfolioOpsPage';

const App = () => {
  const [activeView, setView] = useState<ViewType>('login');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeView]);

  if (activeView === 'login') return <LoginPage setView={setView} />;
  if (activeView === 'dashboard') return <PublisherDashboardPage setView={setView} />;
  if (activeView === 'blog-ops') return <BlogOpsPage setView={setView} />;
  if (activeView === 'career-ops') return <CareerOpsPage setView={setView} />;
  if (activeView === 'resources-ops') return <ResourcesOpsPage setView={setView} />;
  if (activeView === 'portfolio-ops') return <PortfolioOpsPage setView={setView} />;

  return <LoginPage setView={setView} />;
};

export default App;
