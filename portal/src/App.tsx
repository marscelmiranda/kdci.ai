import React, { useState, useEffect } from 'react';
import { ViewType } from './types';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { getToken, getMe, clearToken } from './lib/api';

const App = () => {
  const [activeView, setActiveView] = useState<ViewType | null>(null);
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    const token = getToken();
    if (!token) { setActiveView('login'); return; }
    getMe()
      .then(u => { setUser({ name: u.name, email: u.email, role: u.role }); setActiveView('dashboard'); })
      .catch(() => { clearToken(); setActiveView('login'); });
  }, []);

  const setView = (v: ViewType) => {
    if (v === 'login') { clearToken(); setUser(null); }
    setActiveView(v);
    window.scrollTo(0, 0);
  };

  if (activeView === null) {
    return (
      <div className="min-h-screen bg-[#020202] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#E61739] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (activeView === 'login' || !getToken()) return <LoginPage setView={setView} setUser={setUser} />;
  if (activeView === 'dashboard') return <DashboardPage setView={setView} user={user} />;
  if (activeView === 'settings') return <SettingsPage setView={setView} user={user} />;

  return <LoginPage setView={setView} setUser={setUser} />;
};

export default App;
