import React from 'react';
import type { ProductMode, PageRoute } from '../types';
import { Gauge, Zap, Sparkles, Wrench, ShoppingBag, ExternalLink, ArrowRight, Layers, Activity } from 'lucide-react';

interface HeroProps {
  mode: ProductMode;
  onNavigate: (route: PageRoute) => void;
  onOpenShop: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  mode,
  onNavigate,
  onOpenShop
}) => {
  const isFlight = mode === 'flight';

  return (
    <div className="relative pt-6 pb-14 md:py-16 overflow-hidden">
      
      {/* macOS Liquid Glass ambient lighting orbs (inspired by Apple Vision & macOS wallpapers) */}
      <div className="absolute top-0 right-1/4 w-[550px] h-[550px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none -z-10" />
      <div className="absolute bottom-6 left-10 w-[450px] h-[450px] bg-amber-500/8 rounded-full blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Top status indicator pill (like Image 1 reference header) */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full liquid-glass-pill text-xs font-mono text-slate-300">
              <span className="mac-led-green" />
              <span>DCS World & War Thunder • Real Force Telemetry</span>
            </div>

            {/* macOS High-Contrast Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.12]">
              {isFlight
                ? 'Профессиональный активный FFB джойстик для симуляторов'
                : 'Промышленный Direct Drive руль без наценок за бренд'}
            </h1>

            {/* Single-Sentence Description: concrete, real physics */}
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
              {isFlight
                ? 'Прямой привод на бесщеточных двигателях ODrive с аппаратным расчетом скоростного напора воздуха (V²), предсрывного бафтинга крыла, обдува винтом и вертолетного снятия усилий Force Trim.'
                : 'Прямой привод 15–25 Нм на проверенных бесщеточных сервомоторах с частотой опроса 1000 Гц и мгновенной физической отдачей дорожного полотна.'}
            </p>

            {/* Specs Grid: macOS Liquid Glass Cards with Specular Rims */}
            <div className="grid grid-cols-3 gap-3 pt-1 max-w-lg">
              <div className="liquid-glass rounded-3xl p-3.5 sm:p-4 shadow-xl">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                  <Gauge className="w-3.5 h-3.5 text-sky-400" />
                  <span>Крутящий момент</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">
                  {isFlight ? 'до 15 Нм' : 'до 25 Нм'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">FOC без коггинга</div>
              </div>

              <div className="liquid-glass rounded-3xl p-3.5 sm:p-4 shadow-xl">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                  <span>Задержка DSP</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-white font-mono">&lt; 1 мс</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Частота 1000 Гц</div>
              </div>

              <div className="liquid-glass rounded-3xl p-3.5 sm:p-4 shadow-xl">
                <div className="flex items-center gap-1.5 text-slate-400 text-xs font-medium mb-1">
                  <Layers className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Управление</span>
                </div>
                <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">
                  {isFlight ? '3 оси FFB' : 'Direct Drive'}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">{isFlight ? 'РУС + Педали' : 'Стальной вал'}</div>
              </div>
            </div>

            {/* Primary Action Buttons: macOS Liquid Glass Tactile Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              {isFlight ? (
                <>
                  <button
                    onClick={() => onNavigate('profile-wizard')}
                    className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-sky-500/90 to-blue-600/90 hover:from-sky-500 hover:to-blue-600 border border-sky-400/40 shadow-lg shadow-sky-950/50 transition-colors cursor-pointer active:scale-[0.985]"
                  >
                    <Sparkles className="w-4 h-4 text-sky-200" />
                    <span>Сгенерировать профиль (DCS & WT)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('configurator')}
                    className="flex items-center gap-2 px-5 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold text-white liquid-glass hover:bg-white/15 transition-colors cursor-pointer active:scale-[0.985]"
                  >
                    <Wrench className="w-4 h-4 text-amber-400" />
                    <span>Калькулятор сборки</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('configurator')}
                  className="flex items-center gap-2 px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600/90 to-red-700/90 hover:from-red-600 hover:to-red-700 border border-red-500/40 shadow-lg transition-colors cursor-pointer active:scale-[0.985]"
                >
                  <Wrench className="w-4 h-4" />
                  <span>Калькулятор сборки руля (BOM)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onOpenShop}
                className="flex items-center gap-1.5 px-4 py-3.5 rounded-2xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4 text-slate-400" />
                <span>Готовые киты</span>
              </button>
            </div>

            {/* Hardware & Simulator Compatibility (Liquid Glass Badges) */}
            <div className="pt-3 border-t border-white/10">
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                {isFlight ? 'Совместимость с ручками и симуляторами:' : 'Поддерживаемые симуляторы:'}
              </span>
              <div className="flex flex-wrap gap-1.5 text-xs text-slate-300 font-medium">
                {isFlight ? (
                  <>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">Thrustmaster (Native)</span>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">Virpil VPC (Native)</span>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">VKB (Pass-through)</span>
                    <span className="px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-400/30">DCS World</span>
                    <span className="px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-400/30">War Thunder</span>
                    <span className="px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-400/30">MSFS 2024</span>
                    <span className="px-2.5 py-1 rounded-xl bg-sky-500/15 text-sky-300 border border-sky-400/30">Ил-2 Штурмовик</span>
                  </>
                ) : (
                  <>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">Assetto Corsa / ACC</span>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">iRacing</span>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">BeamNG.drive</span>
                    <span className="px-2.5 py-1 rounded-xl liquid-glass-subtle">rFactor 2</span>
                    <span className="px-2.5 py-1 rounded-xl bg-red-500/15 text-red-300 border border-red-400/30">70mm PCD Quick Release</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Hardware Showcase / macOS Liquid Glass Visual */}
          <div className="lg:col-span-5">
            <a
              href={isFlight ? "https://ffbeast.github.io/docs/en/joystick.html" : "https://ffbeast.github.io/docs/en/wheel.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="block group cursor-pointer focus-visible:outline-none rounded-3xl"
              title={isFlight ? "Открыть документацию по джойстику на ffbeast.github.io" : "Открыть документацию по рулевой базе на ffbeast.github.io"}
            >
              <div className="liquid-glass rounded-3xl p-3 sm:p-4 shadow-2xl transition-transform duration-200 group-hover:scale-[1.01] border border-white/20">
                <div className="bg-black/40 rounded-2xl overflow-hidden border border-white/10 p-5 space-y-4">
                  
                  {/* Status Bar */}
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="mac-led-green" />
                      <span className="font-bold text-white">
                        {isFlight ? 'FFBeast Base V5 (All-Metal)' : 'FFBeast DD Base (15 Nm)'}
                      </span>
                    </div>
                    <span className="text-[11px] text-sky-300 bg-sky-500/15 px-2.5 py-0.5 rounded-lg border border-sky-400/30 flex items-center gap-1 font-semibold">
                      <span>ffbeast.github.io</span>
                      <ExternalLink className="w-3 h-3" />
                    </span>
                  </div>

                  {/* Media Viewport */}
                  <div className="aspect-[4/3] rounded-2xl bg-black/60 border border-white/10 flex items-center justify-center overflow-hidden relative shadow-inner">
                    {isFlight ? (
                      <img
                        src="./assets/images/joystick_rotating.gif"
                        alt="Механическая база FFBeast V5 в сборе"
                        className="w-full h-full object-contain filter contrast-110"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('ffbeast.github.io')) {
                            target.src = 'https://ffbeast.github.io/assets/images/joystick_rotating.gif';
                          }
                        }}
                      />
                    ) : (
                      <img
                        src="./assets/images/wheel_crop.jpg"
                        alt="Direct Drive руль FFBeast"
                        className="w-full h-full object-cover filter brightness-95"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('ffbeast.github.io')) {
                            target.src = 'https://ffbeast.github.io/assets/images/wheel_crop.jpg';
                          }
                        }}
                      />
                    )}

                    {/* Live Specs Overlay - macOS Liquid Glass Banner */}
                    <div className="absolute bottom-3 left-3 right-3 liquid-glass rounded-2xl p-2.5 flex items-center justify-between text-xs text-white border border-white/20">
                      <div>
                        <div className="text-[10px] text-slate-400 font-medium">Механический узел</div>
                        <div className="text-white font-bold">{isFlight ? 'Стальной подвес, 9 подшипников' : 'Стальной вал Direct Drive'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-medium">Датчик положения</div>
                        <div className="text-sky-300 font-mono font-bold">20 480 CPR (AMT10E2)</div>
                      </div>
                    </div>
                  </div>

                  {/* Specs Columns */}
                  <div className="grid grid-cols-2 gap-2.5 text-xs">
                    <div className="liquid-glass-subtle rounded-xl p-2.5">
                      <div className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                        <Activity className="w-3 h-3 text-sky-400" />
                        <span>DirectInput FFB</span>
                      </div>
                      <div className="font-semibold text-white mt-0.5">Скоростной напор + Бафтинг</div>
                    </div>
                    <div className="liquid-glass-subtle rounded-xl p-2.5">
                      <div className="text-slate-400 text-[10px] font-medium flex items-center gap-1">
                        <Zap className="w-3 h-3 text-amber-400" />
                        <span>Питание</span>
                      </div>
                      <div className="font-semibold text-white mt-0.5">24V – 48V (MeanWell)</div>
                    </div>
                  </div>

                  {/* Footnote */}
                  <div className="text-center text-[11px] text-slate-400 flex items-center justify-center gap-1">
                    <span>Официальная инженерная документация</span>
                    <ExternalLink className="w-3 h-3 text-sky-400" />
                  </div>

                </div>
              </div>
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};
