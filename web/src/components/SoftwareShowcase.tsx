import React from 'react';
import type { ProductMode } from '../types';
import { Activity, Wind, AlertTriangle, ShieldCheck } from 'lucide-react';

interface SoftwareShowcaseProps {
  mode: ProductMode;
}

export const SoftwareShowcase: React.FC<SoftwareShowcaseProps> = ({ mode }) => {
  const isFlight = mode === 'flight';

  return (
    <section className="py-16 bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-800 mb-3">
            <Activity className="w-3.5 h-3.5 text-sky-600" />
            <span>Физический движок телеметрии</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {isFlight ? 'FFBeast Commander: Настоящая аэродинамика' : 'DirectInput & DSP сверхнизкой задержки'}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
            {isFlight
              ? 'В отличие от обычных пружинных джойстиков со статичным усилием, софт FFBeast считывает телеметрию симулятора с частотой 1000 Гц и рассчитывает реальные аэродинамические силы на ручке.'
              : 'Управление мотором по алгоритмам FOC с микросекундным откликом, встроенные виртуальные центрирующие пружины и точная передача сцепления шин с трассой.'}
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-sky-100 border border-sky-200 flex items-center justify-center text-sky-700 shadow-xs">
              <Wind className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isFlight ? 'Скоростной напор (Парабола V²)' : 'Линейные и нелинейные кривые FFB'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFlight
                ? 'На 150 км/ч ручка мягкая и послушная. Разгонитесь до 800 км/ч в пикировании — и рули наливаются тяжестью пропорционально динамическому скоростному давлению.'
                : 'Настраивайте прогрессивные кривые момента, устраняйте мертвые зоны и задавайте виртуальные механические упоры с углом поворота до 1080 градусов.'}
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 border border-amber-200 flex items-center justify-center text-amber-700 shadow-xs">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isFlight ? 'Тряска предсрывного баффеттинга' : 'Микровибрации дорожного полотна'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFlight
                ? 'Почувствуйте отчетливую пульсацию на ручке при выходе на критические углы атаки (AoA) или максимальные перегрузки, предупреждающую о сваливании до приборного зуммера.'
                : 'Тактильная отдача работы ABS, виброотклик от поребриков, гравийных зон и моментальной потери сцепления передних колес в заносе.'}
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-50/80 border border-slate-200 rounded-3xl p-7 space-y-3 shadow-xs hover:shadow-md transition">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              {isFlight ? 'Умное гидродемпфирование (Smart Damper)' : 'Подавление инерции и дребезга'}
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {isFlight
                ? 'Симулирует вязкое сопротивление гидравлических бустеров. При резком отпускании ручка плавно и уверенно возвращается в центр без паразитных автоколебаний и ударов.'
                : 'Устраняет зубцовый эффект мотора и инерционные раскачки, сохраняя чистый, прозрачный фидбек от шин в поворотах.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
};
