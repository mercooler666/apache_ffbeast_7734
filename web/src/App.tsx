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
    <div className="min-h-screen bg-slate-50 text-slate-800 selection:bg-sky-500 selection:text-white flex flex-col justify-between">
      {/* Navigation Header */}
      <Navbar
        mode={mode}
        setMode={setMode}
        currentPage={currentPage}
        onNavigate={navigateTo}
        openShop={handleOpenShop}
        openDownloads={handleOpenDownloads}
      />

      {/* Main Content Area Based on Current Page */}
      <main className="flex-grow">
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
