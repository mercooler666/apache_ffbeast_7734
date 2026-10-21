import React from 'react';
import type { ProductMode, PageRoute } from '../types';
import { Plane, Car, Wrench, Download, ShoppingBag, ExternalLink, Sparkles, Home } from 'lucide-react';

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
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center font-black text-xl tracking-tighter transition-all duration-300 shadow-md ${
              isFlight 
                ? 'bg-gradient-to-br from-sky-500 to-blue-700 text-white shadow-sky-500/25' 
                : 'bg-gradient-to-br from-red-500 to-amber-600 text-white shadow-red-500/25'
            }`}>
              FB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">FFBEAST</span>
                <span className="text-[10px] uppercase px-2 py-0.5 rounded-full font-mono font-bold tracking-widest text-sky-800 bg-sky-100 border border-sky-200">
                  AEROSPACE FFB
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium">Direct Drive Force Feedback Controls</div>
            </div>
          </div>

          {/* Mode Switcher: Flight vs Racing */}
          <div className="hidden lg:flex bg-slate-100 p-1 rounded-xl items-center border border-slate-200/80 shadow-inner">
            <button
              onClick={() => setMode('flight')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                isFlight
                  ? 'bg-white text-sky-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Plane className="w-3.5 h-3.5" />
              <span>FLIGHT CONTROLS</span>
            </button>
            <button
              onClick={() => setMode('racing')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer ${
                !isFlight
                  ? 'bg-white text-red-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>RACING WHEEL</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
            
            <button
              onClick={() => onNavigate('home')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'home' 
                  ? 'text-sky-700 bg-sky-50 font-bold border border-sky-100' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Главная</span>
            </button>

            <button
              onClick={() => onNavigate('profile-wizard')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer relative ${
                currentPage === 'profile-wizard' 
                  ? 'text-sky-700 bg-sky-50 font-bold border border-sky-100' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Sparkles className="w-4 h-4 text-sky-600" />
              <span>Конструктор профилей</span>
              <span className="bg-sky-500 text-white text-[9px] font-mono px-1.5 py-0.2 rounded-full font-bold">
                DCS & WT
              </span>
            </button>

            <button
              onClick={() => onNavigate('configurator')}
              className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 cursor-pointer ${
                currentPage === 'configurator' 
                  ? 'text-sky-700 bg-sky-50 font-bold border border-sky-100' 
                  : 'hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <Wrench className="w-4 h-4 text-slate-500" />
              <span>Конфигуратор железа</span>
            </button>

            <button
              onClick={openDownloads}
              className="px-3 py-2 rounded-xl hover:text-slate-900 hover:bg-slate-50 transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4 text-slate-500" />
              <span>Прошивки</span>
            </button>

          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <a
              href="https://discord.gg/5ZKD46zQSU"
              target="_blank"
              rel="noreferrer"
              className="hidden xl:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition"
            >
              <span>Discord (1K+)</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>

            <button
              onClick={openShop}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold tracking-wider uppercase transition shadow-md bg-sky-600 hover:bg-sky-500 text-white shadow-sky-600/20 cursor-pointer"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Магазин & Киты</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};
