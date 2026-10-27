import React from 'react';
import type { ProductMode, PageRoute } from '../types';
import { Plane, Car, Wrench, Download, ShoppingBag, ExternalLink, Sparkles, Send } from 'lucide-react';

interface NavbarProps {
  mode: ProductMode;
  setMode: (mode: ProductMode) => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  openShop: () => void;
  openDownloads: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  mode,
  setMode,
  currentPage,
  onNavigate,
  openShop,
  openDownloads
}) => {
  const isFlight = mode === 'flight';

  return (
    <header className="sticky top-0 z-50 px-3 sm:px-6 lg:px-8 pt-3 pb-2">
      <div className="max-w-7xl mx-auto liquid-navbar-frosted liquid-glint rounded-2xl sm:rounded-3xl px-4 sm:px-6 py-2.5 flex items-center justify-between shadow-2xl">
        
        {/* Logo & Brand Identity (macOS Liquid Glass brand badge) */}
        <div 
          className="flex items-center gap-3 cursor-pointer select-none transition-transform active:scale-[0.98]" 
          onClick={() => onNavigate('home')}
          title="На главную FFBEAST"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              onNavigate('home');
            }
          }}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center font-bold text-xs sm:text-sm tracking-tight text-white bg-gradient-to-br from-sky-400/30 to-sky-600/20 border border-sky-400/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)] transition-colors">
            FB
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm sm:text-base text-white tracking-tight">FFBEAST</span>
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-mono text-sky-300">
                <span className="mac-led-green" />
                <span>{isFlight ? 'Aero FFB' : 'Racing DD'}</span>
              </div>
            </div>
            <div className="text-[10px] sm:text-[11px] text-slate-400 font-medium">Direct drive force feedback controls</div>
          </div>
        </div>

        {/* Mode Switcher: Flight vs Racing (macOS Liquid Segmented Capsule) */}
        <div className="hidden lg:flex liquid-glass-subtle p-1 rounded-full items-center">
          <button
            onClick={() => setMode('flight')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              isFlight
                ? 'bg-white/20 text-white shadow-xs border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Plane className="w-3.5 h-3.5 text-sky-400" />
            <span>Flight controls</span>
          </button>
          <button
            onClick={() => setMode('racing')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
              !isFlight
                ? 'bg-white/20 text-white shadow-xs border border-white/30'
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-red-400" />
            <span>Racing wheel</span>
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-slate-300">
          {isFlight && (
            <button
              onClick={() => onNavigate('profile-wizard')}
              className={`px-3 py-1.5 sm:py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'profile-wizard' 
                  ? 'text-white bg-white/20 font-semibold shadow-xs border border-white/30' 
                  : 'hover:text-white hover:bg-white/10'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              <span>Генератор FFB</span>
            </button>
          )}

          <button
            onClick={() => onNavigate('configurator')}
            className={`px-3 py-1.5 sm:py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
              currentPage === 'configurator' 
                ? 'text-white bg-white/20 font-semibold shadow-xs border border-white/30' 
                : 'hover:text-white hover:bg-white/10'
            }`}
          >
            <Wrench className="w-3.5 h-3.5 text-amber-400" />
            <span className="hidden sm:inline">Конфигуратор</span>
          </button>

          <button
            onClick={openDownloads}
            className="px-3 py-1.5 sm:py-2 rounded-xl hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">ПО & Файлы</span>
          </button>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <a
            href="https://t.me/FAQFFB"
            target="_blank"
            rel="noreferrer"
            className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/15 border border-white/15 transition-colors"
            title="Telegram сообщество FAQ FFB"
          >
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>Telegram FAQ</span>
            <ExternalLink className="w-3 h-3 text-slate-500" />
          </a>

          <button
            onClick={openShop}
            className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-lg bg-gradient-to-r from-sky-500/80 to-blue-600/80 hover:from-sky-500 hover:to-blue-600 border border-sky-400/40 text-white cursor-pointer active:scale-[0.98]"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Магазин & Киты</span>
            <span className="sm:hidden">Киты</span>
          </button>
        </div>

      </div>
    </header>
  );
};
