import React from 'react';
import type { ProductMode } from '../types';
import { Wind, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SoftwareShowcaseProps {
  mode: ProductMode;
}

export const SoftwareShowcase: React.FC<SoftwareShowcaseProps> = ({ mode }) => {
  const isFlight = mode === 'flight';

  return (
    <section className="py-14 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {isFlight ? 'FFBeast Commander: физика полета в реальном времени' : 'DirectInput & DSP сверхнизкой задержки'}
          </h2>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">
            {isFlight
              ? 'В отличие от пружинных джойстиков со статичным усилием, софт FFBeast считывает телеметрию симулятора с частотой 1000 Гц и рассчитывает реальные аэродинамические силы на ручке и педалях.'
              : 'Управление мотором по алгоритмам FOC с микросекундным откликом, встроенные виртуальные центрирующие пружины и точная передача сцепления шин с трассой.'}
          </p>
        </div>

        {/* Liquid Glass Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Card 1 */}
          <div className="liquid-glass rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-sky-100 flex items-center justify-center text-sky-800">
              <Wind className="w-5 h-5 text-sky-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isFlight ? 'Скоростной напор (Парабола V²)' : 'Линейные и нелинейные кривые FFB'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFlight
                ? 'На 150 км/ч ручка мягкая и послушная. При разгоне до 800 км/ч в пикировании рули наливаются тяжестью пропорционально скоростному напору строго по законам аэродинамики.'
                : 'Настраивайте прогрессивные кривые момента, устраняйте мертвые зоны и задавайте виртуальные упоры с углом поворота до 1080 градусов.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="liquid-glass rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isFlight ? 'Тряска предсрывного бафтинга' : 'Микровибрации дорожного полотна'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFlight
                ? 'Отчетливая пульсация на ручке при выходе на критические углы атаки (AoA) или перегрузку предупреждает о скором срыве потока до включения приборного зуммера.'
                : 'Тактильная отдача работы ABS, виброотклик от поребриков, гравийных зон и моментальной потери сцепления передних колес в заносе.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="liquid-glass rounded-3xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800">
              <ShieldCheck className="w-5 h-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold text-slate-900">
              {isFlight ? 'Умное демпфирование (Smart Damper)' : 'Подавление инерции и дребезга'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
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
