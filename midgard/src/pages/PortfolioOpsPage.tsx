import React from 'react';
import { ViewType } from '../types';
import { PortalTopBar } from '../components/PortalTopBar';
import { ChevronLeft, Plus } from 'lucide-react';

export const PortfolioOpsPage = ({ setView }: { setView: (v: ViewType) => void }) => {
  return (
    <div className="h-screen bg-[#0a0a0a] text-white flex flex-col font-sans overflow-hidden">
      <PortalTopBar setView={setView} activeNav="portfolio-ops" />

      <main className="flex-1 overflow-y-auto p-8 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-10">
            <div>
              <div className="flex items-center gap-2 text-white/40 text-[10px] font-black uppercase tracking-widest mb-2">
                <span onClick={() => setView('dashboard')} className="hover:text-white cursor-pointer transition-colors">Dashboard</span>
                <ChevronLeft size={10} className="rotate-180" />
                <span className="text-[#E61739]">Portfolio Ops</span>
              </div>
              <h1 className="text-3xl font-heading font-bold text-white">Manage Creative Portfolio</h1>
            </div>
            <button className="px-6 py-3 bg-[#E61739] hover:bg-[#c51431] text-white rounded-xl font-bold text-sm transition-all flex items-center gap-2 shadow-lg glow-red">
              <Plus size={16} /> Create Entry
            </button>
          </div>

          <div className="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white mb-2">Portfolio Data</h2>
              <p className="text-white/40 mb-6 text-sm">Add and manage components on the Creative Portfolio layout.</p>
              <button className="px-4 py-2 border border-white/10 rounded-lg text-sm font-bold text-white/60 hover:text-white hover:bg-white/5 transition-all">
                Update Pages
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
