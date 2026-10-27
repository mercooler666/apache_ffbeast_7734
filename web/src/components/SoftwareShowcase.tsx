import React from 'react';
import type { ProductMode } from '../types';
import { Wind, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SoftwareShowcaseProps {
  mode: ProductMode;
}

export const SoftwareShowcase: React.FC<SoftwareShowcaseProps> = ({ mode }) => {
  const isFlight = mode === 'flight';

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-subtle text-xs font-mono text-emerald-400 mb-2">
            <span className="mac-led-green" />
            <span>Телеметрия 1000 Гц</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            {isFlight ? 'FFBeast Commander: физика полета в реальном времени' : 'DirectInput & DSP сверхнизкой задержки'}
          </h2>
          <p className="text-sm text-slate-300 mt-1 leading-relaxed">
            {isFlight
              ? 'В отличие от пружинных джойстиков со статичным усилием, софт FFBeast считывает телеметрию симулятора с частотой 1000 Гц и рассчитывает реальные аэродинамические силы на ручке и педалях.'
              : 'Управление мотором по алгоритмам FOC с микросекундным откликом, встроенные виртуальные центрирующие пружины и точная передача сцепления шин с трассой.'}
          </p>
        </div>

        {/* Liquid Glass Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1 */}
          <div className="liquid-glass rounded-3xl p-6 space-y-3.5 border border-white/15 shadow-2xl">
            <div className="w-11 h-11 rounded-2xl bg-sky-500/20 border border-sky-400/30 flex items-center justify-center text-sky-300">
              <Wind className="w-5 h-5 text-sky-400" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isFlight ? 'Скоростной напор (Парабола V²)' : 'Линейные и нелинейные кривые FFB'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFlight
                ? 'На 150 км/ч ручка мягкая и послушная. При разгоне до 800 км/ч в пикировании рули наливаются тяжестью пропорционально скоростному напору строго по законам аэродинамики.'
                : 'Настраивайте прогрессивные кривые момента, устраняйте мертвые зоны и задавайте виртуальные упоры с углом поворота до 1080 градусов.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass rounded-3xl p-6 space-y-3.5 border border-white/15 shadow-2xl">
            <div className="w-11 h-11 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-300">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isFlight ? 'Тряска предсрывного бафтинга' : 'Микровибрации дорожного полотна'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFlight
                ? 'Отчетливая пульсация на ручке при выходе на критические углы атаки (AoA) или перегрузку предупреждает о скором срыве потока до включения приборного зуммера.'
                : 'Тактильная отдача работы ABS, виброотклик от поребриков, гравийных зон и моментальной потери сцепления передних колес в заносе.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="liquid-glass rounded-3xl p-6 space-y-3.5 border border-white/15 shadow-2xl">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>
            <h3 className="text-base font-bold text-white">
              {isFlight ? 'Умное демпфирование (Smart Damper)' : 'Подавление инерции и дребезга'}
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isFlight
                ? 'Симулирует вязкое сопротивление гидравлических бустеров. При резком отпускании ручка плавно возвращается в центр без паразитных автоколебаний и раскачки.'
                : 'Устраняет зубцовый эффект мотора и инерционные раскачки, сохраняя чистый, прозрачный фидбек от шин в поворотах.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
