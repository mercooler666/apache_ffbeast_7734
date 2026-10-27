import React, { useState } from 'react';
import type { ProductMode, PageRoute } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { PromoBanners } from './components/PromoBanners';
import { HardwareConfigurator } from './components/HardwareConfigurator';
import { ProfileGenerator } from './components/ProfileGenerator';
import { ComparisonSection } from './components/ComparisonSection';
import { SoftwareShowcase } from './components/SoftwareShowcase';
import { DownloadsAndShopModal } from './components/DownloadsAndShopModal';
import { Footer } from './components/Footer';
import { Compass, Sliders, BarChart3, Download, Home } from 'lucide-react';

export const App: React.FC = () => {
  const [mode, setMode] = useState<ProductMode>('flight');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [isShopModalOpen, setIsShopModalOpen] = useState<boolean>(false);
  const [shopDefaultTab, setShopDefaultTab] = useState<'shop' | 'downloads'>('shop');

  const handleOpenShop = () => {
    setShopDefaultTab('shop');
    setIsShopModalOpen(true);
  };

  const handleOpenDownloads = () => {
    setShopDefaultTab('downloads');
    setIsShopModalOpen(true);
  };

  const navigateTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#080c14] text-slate-100 selection:bg-sky-500 selection:text-white flex flex-col justify-between relative pb-20 sm:pb-24">
      {/* Navigation Header - Floating macOS Liquid Glass Bar */}
      <Navbar
        mode={mode}
        setMode={setMode}
        currentPage={currentPage}
        onNavigate={navigateTo}
        openShop={handleOpenShop}
        openDownloads={handleOpenDownloads}
      />

      {/* Main Content Area Based on Current Page */}
      <main className="flex-grow relative z-10">
        {currentPage === 'home' && (
          <>
            {/* Hero Section */}
            <Hero
              mode={mode}
              onNavigate={navigateTo}
              onOpenShop={handleOpenShop}
            />

            {/* Prominent Banners for Profile Wizard & Hardware Configurator */}
            <PromoBanners mode={mode} onNavigate={navigateTo} />

            {/* Aerodynamics & Telemetry Showcase */}
            <SoftwareShowcase mode={mode} />

            {/* Competitor Benchmark Comparison */}
            <ComparisonSection mode={mode} />
          </>
        )}

        {currentPage === 'profile-wizard' && (
          <ProfileGenerator onNavigate={navigateTo} />
        )}

        {currentPage === 'configurator' && (
          <HardwareConfigurator
            mode={mode}
            onNavigate={navigateTo}
            onOpenShop={handleOpenShop}
          />
        )}
      </main>

      {/* Floating macOS Liquid Bottom Dock (Reference-style dock) */}
      <aside aria-label="Быстрая навигация" className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40">
        <nav className="liquid-glass-pill liquid-glint px-2 py-1.5 rounded-full flex items-center gap-1 shadow-2xl">
          <button
            onClick={() => navigateTo('home')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              currentPage === 'home'
                ? 'bg-white/20 text-white shadow-xs border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Home className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden sm:inline">Главная</span>
          </button>

          <button
            onClick={() => navigateTo('profile-wizard')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              currentPage === 'profile-wizard'
                ? 'bg-white/20 text-white shadow-xs border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Compass className="w-3.5 h-3.5 text-sky-400" />
            <span>Генератор FFB</span>
          </button>

          <button
            onClick={() => navigateTo('configurator')}
            className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              currentPage === 'configurator'
                ? 'bg-white/20 text-white shadow-xs border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>Конфигуратор</span>
          </button>

          <button
            onClick={() => {
              if (currentPage !== 'home') navigateTo('home');
              setTimeout(() => {
                const el = document.getElementById('benchmark-comparison');
                el?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full text-xs font-semibold text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden md:inline">Сравнение</span>
          </button>

          <div className="w-[1px] h-5 bg-white/20 mx-1 hidden sm:block" />

          <button
            onClick={handleOpenDownloads}
            className="flex items-center gap-1.5 px-3 py-2 rounded-full text-xs font-semibold text-sky-300 hover:text-sky-200 hover:bg-sky-500/20 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Файлы</span>
          </button>
        </nav>
      </aside>

      {/* Footer */}
      <Footer mode={mode} onNavigate={navigateTo} />

      {/* Downloads & Shop Modal */}
      <DownloadsAndShopModal
        isOpen={isShopModalOpen}
        onClose={() => setIsShopModalOpen(false)}
        defaultTab={shopDefaultTab}
      />
    </div>
  );
};

export default App;
