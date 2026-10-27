import React from 'react';
import type { PageRoute, ProductMode } from '../types';
import { Sparkles, Wrench, ArrowRight, ExternalLink } from 'lucide-react';

interface PromoBannersProps {
  mode?: ProductMode;
  onNavigate: (route: PageRoute) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ mode = 'flight', onNavigate }) => {
  const isFlight = mode === 'flight';

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-subtle text-xs font-mono text-sky-400 mb-2">
            <span className="mac-led-cyan" />
            <span>Инженерные инструменты</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isFlight 
              ? 'Инструменты калибровки и сборки'
              : 'Инженерная документация и подбор компонентов'}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            {isFlight
              ? 'Выберите самолет для генерации файла конфигурации или рассчитайте нагрузки механической базы.'
              : 'Расчет параметров прямого привода и спецификации для самостоятельной сборки.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Console 1: Profile Wizard */}
          {isFlight ? (
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 border border-white/15 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-sky-500/20 text-sky-300 border border-sky-400/30 flex items-center justify-center font-bold">
                    <Sparkles className="w-5 h-5 text-sky-400" />
                  </div>
                  <span className="text-xs font-mono text-sky-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    DCS & War Thunder
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Генератор FFB профилей (Real Force)
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Автоматический расчет и генерация калиброванного <code className="text-sky-300 font-mono font-semibold bg-white/10 px-1.5 py-0.5 rounded border border-white/15">.json</code> файла 
                    с физикой <strong>Real Force</strong>. Поддержка F-15C, Су-27, Су-35, F/A-18C, поршневых Warbirds и вертолетов. 
                    Выбор 28 эффектов галочками, стили полета (Реалистичный, Казуал 50%, Пилотажник) и экспорт для FFBeast Commander.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="liquid-glass-subtle p-3 rounded-2xl">
                    <div className="font-bold text-white font-mono">100+ Модулей</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">DCS & War Thunder</div>
                  </div>
                  <div className="liquid-glass-subtle p-3 rounded-2xl">
                    <div className="font-bold text-white font-mono">28 Эффектов</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">РУС + Педали</div>
                  </div>
                  <div className="liquid-glass-subtle p-3 rounded-2xl">
                    <div className="font-bold text-emerald-400 font-mono">3 Режима сил</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">1:1 РЛЭ / 50% / Пилотаж</div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  onClick={() => onNavigate('profile-wizard')}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-gradient-to-r from-sky-500/90 to-blue-600/90 hover:from-sky-500 hover:to-blue-600 text-white shadow-lg border border-sky-400/40 transition-colors cursor-pointer active:scale-[0.985]"
                >
                  <span>Создать профиль самолета</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 border border-white/15 shadow-2xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-white/10 text-slate-300 border border-white/15 flex items-center justify-center font-bold">
                    <Wrench className="w-5 h-5 text-slate-300" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                    Direct Drive Docs
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    Документация и калибровка Direct Drive руля
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                    Полный технический гайд по сборке и настройке рулевой базы FFBeast. 
                    Схемы распиновки контроллера ODrive, установка энкодера AMT10E2, крепления 70mm PCD Quick Release 
                    и интеграция с Assetto Corsa, iRacing, BeamNG.drive и rFactor 2.
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="liquid-glass-subtle p-3 rounded-2xl">
                    <div className="font-bold text-white font-mono">15+ Нм Момент</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Mige / BLDC</div>
                  </div>
                  <div className="liquid-glass-subtle p-3 rounded-2xl">
                    <div className="font-bold text-white font-mono">70mm PCD</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Стандарт QR</div>
                  </div>
                  <div className="liquid-glass-subtle p-3 rounded-2xl">
                    <div className="font-bold text-white font-mono">DirectInput FFB</div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Нулевая задержка</div>
                  </div>
                </div>
              </div>

              <div>
                <a
                  href="https://ffbeast.github.io/docs/en/wheel.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors cursor-pointer active:scale-[0.985]"
                >
                  <span>Документация руля на ffbeast.github.io</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}

          {/* Console 2: Hardware Sizing & BOM Configurator */}
          <div className="liquid-glass rounded-3xl p-6 sm:p-7 flex flex-col justify-between space-y-6 border border-white/15 shadow-2xl">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center font-bold">
                  <Wrench className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-xs font-mono text-amber-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/15">
                  {isFlight ? 'Базы V5, V4 & Direct Drive' : 'ODrive 3.6 & BLDC'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-bold text-white">
                  {isFlight 
                    ? 'Калькулятор механики и подбор моторов' 
                    : 'BOM калькулятор комплектующих руля'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1.5 leading-relaxed">
                  {isFlight
                    ? 'Интерактивный расчет необходимого крутящего момента мотора (Нм) в зависимости от длины удлинителя ручки (мм) и целевой перегрузки. Проверка запаса по току, нагреву и выбор моторов Hoverboard или Mige.'
                    : 'Спецификация комплектующих для самостоятельной сборки: контроллер ODrive, плата энкодера AMT10E2, шкивы, ремни и блок питания.'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 text-xs">
                <div className="liquid-glass-subtle p-3 rounded-2xl">
                  <div className="font-bold text-white font-mono">{isFlight ? 'Ревизии V4 / V5' : 'Direct Drive'}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{isFlight ? '3:1 Редуктор / DD' : '15-25 Нм'}</div>
                </div>
                <div className="liquid-glass-subtle p-3 rounded-2xl">
                  <div className="font-bold text-emerald-400 font-mono">Безопасность</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Контроль перегрева</div>
                </div>
                <div className="liquid-glass-subtle p-3 rounded-2xl">
                  <div className="font-bold text-sky-400 font-mono">BOM Смета</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Цены и ссылки</div>
                </div>
              </div>
            </div>

            <div>
              <button
                onClick={() => onNavigate('configurator')}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-semibold liquid-glass hover:bg-white/15 text-white border border-white/20 transition-colors cursor-pointer active:scale-[0.985]"
              >
                <span>Открыть калькулятор базы</span>
                <ArrowRight className="w-4 h-4 text-slate-300" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
