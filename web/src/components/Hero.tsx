import React from 'react';
import type { ProductMode, PageRoute } from '../types';
import { ShieldCheck, Zap, Gauge, ArrowRight, Wrench, Sparkles, ShoppingBag, ExternalLink } from 'lucide-react';

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
    <div className="relative overflow-hidden pt-10 pb-16 md:py-20 bg-gradient-to-b from-sky-50/70 via-white to-slate-50 border-b border-slate-200">
      
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-sky-200/40 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[350px] h-[350px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Value Proposition & Copy */}
          <div className="lg:col-span-7 text-left space-y-6">
            
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-sky-200 text-xs font-semibold text-slate-700 shadow-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
              <span className="font-bold text-sky-900">
                {isFlight ? 'Активная телеметрия для DCS World, War Thunder и MSFS' : 'Direct Drive база руля 15-25 Нм на BLDC'}
              </span>
              <span className="text-slate-300">|</span>
              <span className="text-amber-600 font-bold">1/4 цены коммерческих баз</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
              {isFlight ? (
                <>
                  Профессиональный <br />
                  <span className="bg-gradient-to-r from-sky-600 via-blue-700 to-indigo-800 bg-clip-text text-transparent">
                    Active FFB джойстик
                  </span> <br />
                  для авиасимуляторов.
                </>
              ) : (
                <>
                  Мощный промышленный <br />
                  <span className="bg-gradient-to-r from-red-600 via-amber-600 to-orange-600 bg-clip-text text-transparent">
                    Direct Drive руль
                  </span> <br />
                  без переплаты за бренд.
                </>
              )}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
              {isFlight
                ? "Забудьте о пружинах и кулачках, всегда тянущих ручку с одной силой. FFBeast симулирует реальную физику: скоростной напор воздуха (V²), обдув винтом, срыв потока (AoA buffet), отдачу пушки и гидравлический триммер."
                : "Хватит мириться с вялыми ременными рулями или переплачивать тысячи долларов за брендовые 5 Нм базы. Соберите или закажите 15-25 Нм Direct Drive на проверенной электронике ODrive и BLDC двигателях."}
            </p>

            {/* Quick Feature Pillars (Light Cards) */}
            <div className="grid grid-cols-3 gap-3 pt-2 max-w-lg">
              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Gauge className="w-4 h-4 text-sky-600" />
                  <span>Крутящий момент</span>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {isFlight ? 'до 15 Нм' : 'до 25 Нм'}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">FOC без коггинга</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <Zap className="w-4 h-4 text-amber-600" />
                  <span>Задержка DSP</span>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">&lt; 1 мс</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Частота 1000 Гц</div>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Экономия</span>
                </div>
                <div className="text-2xl font-black text-emerald-600 font-mono">до 75%</div>
                <div className="text-[11px] text-slate-500 mt-0.5">vs Brunner / Moza</div>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              {isFlight ? (
                <>
                  <button
                    onClick={() => onNavigate('profile-wizard')}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 shadow-xl shadow-sky-600/25 transition cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
                    <span>Конструктор профилей (DCS & WT)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => onNavigate('configurator')}
                    className="flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wide text-slate-800 bg-white hover:bg-slate-50 border border-slate-300 shadow-sm transition cursor-pointer"
                  >
                    <Wrench className="w-4 h-4 text-sky-600" />
                    <span>Калькулятор сборки железа</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => onNavigate('configurator')}
                  className="flex items-center gap-2 px-6 py-4 rounded-xl text-sm font-bold tracking-wide text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-xl shadow-red-600/25 transition cursor-pointer"
                >
                  <Wrench className="w-4 h-4 text-white" />
                  <span>Калькулятор сборки руля (BOM)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              <button
                onClick={onOpenShop}
                className="flex items-center gap-1.5 px-4 py-4 rounded-xl text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 transition cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Готовые базы</span>
              </button>
            </div>

            {/* Compatible Grips & Simulators */}
            <div className="pt-4 border-t border-slate-200">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                {isFlight ? 'Совместимость с ручками и симуляторами:' : 'Поддерживаемые симуляторы и быстросъемы:'}
              </span>
              <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-700">
                {isFlight ? (
                  <>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">Thrustmaster (Native)</span>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">Virpil VPC (Native)</span>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">VKB (Pass-through)</span>
                    <span className="px-3 py-1 rounded-lg bg-sky-100/70 text-sky-900 border border-sky-200">DCS World</span>
                    <span className="px-3 py-1 rounded-lg bg-sky-100/70 text-sky-900 border border-sky-200">War Thunder</span>
                    <span className="px-3 py-1 rounded-lg bg-sky-100/70 text-sky-900 border border-sky-200">MSFS 2024/2020</span>
                    <span className="px-3 py-1 rounded-lg bg-sky-100/70 text-sky-900 border border-sky-200">IL-2 Sturmovik</span>
                  </>
                ) : (
                  <>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">Assetto Corsa / ACC</span>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">iRacing</span>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">BeamNG.drive</span>
                    <span className="px-3 py-1 rounded-lg bg-white border border-slate-200 shadow-xs">rFactor 2</span>
                    <span className="px-3 py-1 rounded-lg bg-red-100/70 text-red-900 border border-red-200">70mm PCD Quick Release</span>
                  </>
                )}
              </div>
            </div>

          </div>

          {/* Right Column: Hardware Showcase / Interactive Visual (Links to ffbeast.github.io documentation) */}
          <div className="lg:col-span-5 relative">
            <a
              href={isFlight ? "https://ffbeast.github.io/docs/en/joystick.html" : "https://ffbeast.github.io/docs/en/wheel.html"}
              target="_blank"
              rel="noopener noreferrer"
              className="block group cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500 rounded-3xl"
              title={isFlight ? "Открыть документацию по джойстику на ffbeast.github.io (откроется в новой вкладке)" : "Открыть документацию по рулевой базе на ffbeast.github.io (откроется в новой вкладке)"}
            >
              <div className="relative rounded-3xl p-2 bg-gradient-to-b from-sky-200/60 via-white to-slate-200 shadow-2xl transition-all duration-300 group-hover:shadow-sky-500/25 group-hover:scale-[1.015]">
                <div className="bg-white rounded-[22px] overflow-hidden border border-slate-200 p-6 relative">
                  
                  {/* Status Badge in Showcase */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-800 group-hover:text-sky-600 transition-colors">
                        {isFlight ? 'FFBeast Base V5 (All-Metal)' : 'FFBeast DD Base (15 Nm)'}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-sky-800 bg-sky-50 group-hover:bg-sky-100 px-2.5 py-1 rounded-full border border-sky-200 group-hover:border-sky-300 font-semibold transition-colors shadow-xs">
                      <span>ffbeast.github.io</span>
                      <ExternalLink className="w-3 h-3 text-sky-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Main Media Preview */}
                  <div className="aspect-[4/3] rounded-2xl bg-slate-900 border border-slate-200 flex items-center justify-center overflow-hidden relative shadow-inner">
                    {isFlight ? (
                      <img
                        src="./assets/images/joystick_rotating.gif"
                        alt="FFBeast Flight Controls Base Rotating"
                        className="w-full h-full object-contain filter contrast-110 group-hover:scale-105 transition-transform duration-500"
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
                        alt="FFBeast Direct Drive Wheel"
                        className="w-full h-full object-cover filter brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('ffbeast.github.io')) {
                            target.src = 'https://ffbeast.github.io/assets/images/wheel_crop.jpg';
                          }
                        }}
                      />
                    )}

                    {/* Overlay live specs badge */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl p-3 flex items-center justify-between text-xs text-slate-800 shadow-md">
                      <div>
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Механический узел</div>
                        <div className="text-slate-900 font-black">{isFlight ? 'Стальной подвес + 9 подшипников' : 'Стальной вал Direct Drive'}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Точность датчика</div>
                        <div className="text-sky-600 font-mono font-black">20,480 CPR (AMT10E2)</div>
                      </div>
                    </div>
                  </div>

                  {/* Sub features bar */}
                  <div className="grid grid-cols-2 gap-3 mt-4 text-xs">
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Физика DirectInput</div>
                      <div className="font-bold text-slate-900 mt-0.5">Скоростной напор + Шейкеры + Трим</div>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
                      <div className="text-slate-500 text-[10px] uppercase font-bold tracking-wider">Питание</div>
                      <div className="font-bold text-slate-900 mt-0.5">24V - 48V (MeanWell / Серверный)</div>
                    </div>
                  </div>

                  {/* Link indicator footer */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-xs font-bold text-sky-600 group-hover:text-sky-700">
                    <span>Открыть документацию на официальном сайте ffbeast.github.io</span>
                    <ExternalLink className="w-3.5 h-3.5" />
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
