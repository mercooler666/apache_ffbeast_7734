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
    <nav className="sticky top-0 z-50 liquid-glass border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          
          {/* Logo & Brand Identity (Hallmark: confident typography, no AI slop eyebrows) */}
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
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm tracking-tight text-white transition-colors ${
              isFlight 
                ? 'bg-sky-700 shadow-xs' 
                : 'bg-red-700 shadow-xs'
            }`}>
              FB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base text-slate-900">FFBEAST</span>
                <span className="text-xs text-slate-500 font-mono">
                  {isFlight ? 'Aviation FFB' : 'Racing DD'}
                </span>
              </div>
              <div className="text-[11px] text-slate-500">Direct drive force feedback controls</div>
            </div>
          </div>

          {/* Mode Switcher: Flight vs Racing (Liquid Glass Pill) */}
          <div className="hidden lg:flex liquid-glass-pill p-1 rounded-xl items-center border border-slate-200/80">
            <button
              onClick={() => setMode('flight')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                isFlight
                  ? 'bg-white text-sky-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5 text-sky-700" />
              <span>Flight controls</span>
            </button>
            <button
              onClick={() => setMode('racing')}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                !isFlight
                  ? 'bg-white text-red-800 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-3.5 h-3.5 text-red-600" />
              <span>Racing wheel</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium text-slate-600">
            {isFlight && (
              <button
                onClick={() => onNavigate('profile-wizard')}
                className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                  currentPage === 'profile-wizard' 
                    ? 'text-sky-900 bg-white font-semibold shadow-xs border border-slate-200' 
                    : 'hover:text-slate-900 hover:bg-white/60'
                }`}
              >
                <Sparkles className="w-4 h-4 text-sky-600" />
                <span>Генератор профилей</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('configurator')}
              className={`px-3 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'configurator' 
                  ? 'text-sky-900 bg-white font-semibold shadow-xs border border-slate-200' 
                  : 'hover:text-slate-900 hover:bg-white/60'
              }`}
            >
              <Wrench className="w-4 h-4 text-slate-500" />
              <span>Конфигуратор базы</span>
            </button>

            <button
              onClick={openDownloads}
              className="px-3 py-2 rounded-xl hover:text-slate-900 hover:bg-white/60 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Прошивки & ПО</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/FAQFFB"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-xl text-slate-700 hover:text-slate-900 bg-white/70 hover:bg-white border border-slate-200 transition-colors"
              title="Telegram сообщество FAQ FFB"
            >
              <Send className="w-3.5 h-3.5 text-sky-600" />
              <span>Telegram FAQ</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            <button
              onClick={openShop}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-colors shadow-xs bg-slate-900 hover:bg-slate-800 text-white cursor-pointer active:scale-[0.98]"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Магазин & Киты</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
