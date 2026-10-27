import React from 'react';
import type { ProductMode } from '../types';
import { Check } from 'lucide-react';

interface ComparisonSectionProps {
  mode: ProductMode;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ mode }) => {
  const isFlight = mode === 'flight';

  return (
    <section id="benchmark-comparison" className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full liquid-glass-subtle text-xs font-mono text-sky-400 mb-2">
            <span className="mac-led-cyan" />
            <span>Инженерный бенчмарк</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Сравнение характеристик
          </h2>
          <p className="text-sm text-slate-300 mt-1">
            Честное сопоставление физических возможностей FFBeast с коммерческими аналогами.
          </p>
        </div>

        {/* macOS Liquid Glass Comparison Table */}
        <div className="liquid-glass rounded-3xl overflow-hidden shadow-2xl border border-white/15">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/10 text-slate-300 font-mono text-xs">
                  <th className="py-4 px-5 font-semibold">Характеристика</th>
                  <th className="py-4 px-5 font-bold text-white bg-sky-500/20 border-x border-sky-400/30">
                    FFBEAST {isFlight ? 'V5 / Direct Drive' : 'Racing DD'}
                  </th>
                  <th className="py-4 px-5 font-semibold text-slate-300">
                    {isFlight ? 'Moza AB9 Base' : 'Moza R16 / R21'}
                  </th>
                  <th className="py-4 px-5 font-semibold text-slate-300">
                    {isFlight ? 'Virpil VPC Atlas Base' : 'Fanatec ClubSport DD+'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300">
                
                {/* Row 1: Type of mechanism */}
                <tr>
                  <td className="py-4 px-5 font-semibold text-white">Тип привода</td>
                  <td className="py-4 px-5 font-semibold text-sky-300 bg-sky-500/10 border-x border-sky-400/20">
                    {isFlight ? 'Dual BLDC (Прямой привод / 3:1)' : 'Прямой привод (Direct Drive)'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Dual BLDC серво' : 'Direct Drive'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Dual BLDC Direct Drive' : 'Direct Drive'}
                  </td>
                </tr>

                {/* Row 2: Peak Torque */}
                <tr>
                  <td className="py-4 px-5 font-semibold text-white">Крутящий момент</td>
                  <td className="py-4 px-5 font-bold text-emerald-400 font-mono bg-sky-500/10 border-x border-sky-400/20">
                    {isFlight ? 'до 15.0 Нм (V5) / 12.0 Нм (DD)' : 'до 25.0 Нм'}
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-400">
                    {isFlight ? '9.0 Нм (предел моторов)' : '16 – 21 Нм'}
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-400">
                    {isFlight ? '~10.0 – 12.0 Нм' : '15 Нм'}
                  </td>
                </tr>

                {/* Row 3: Extensions & Lever arms */}
                <tr>
                  <td className="py-4 px-5 font-semibold text-white">
                    {isFlight ? 'Работа с удлинителями (+100..200 мм)' : 'Угол вращения'}
                  </td>
                  <td className="py-4 px-5 font-semibold text-sky-300 bg-sky-500/10 border-x border-sky-400/20">
                    {isFlight ? (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>До +200 мм (до 14.5 кгс на хвате)</span>
                      </div>
                    ) : 'Без ограничений'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Не более +100 мм (падение силы)' : 'Без ограничений'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Поддержка удлинителей VPC' : 'Без ограничений'}
                  </td>
                </tr>

                {/* Row 4: Telemetry & FFB Engine */}
                <tr>
                  <td className="py-4 px-5 font-semibold text-white">Телеметрия симуляторов</td>
                  <td className="py-4 px-5 bg-sky-500/10 border-x border-sky-400/20">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>{isFlight ? '28 эффектов: V², АРУ, Обдув, AoA, Трим' : 'Полная телеметрия iRacing, ACC, AC'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Закрытый софт Moza Cockpit' : 'Moza Pit House'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Закрытое ПО Virpil FFB' : 'FanaLab'}
                  </td>
                </tr>

                {/* Row 5: Ecosystem & Grips */}
                <tr>
                  <td className="py-4 px-5 font-semibold text-white">Совместимость ручек</td>
                  <td className="py-4 px-5 font-semibold text-white bg-sky-500/10 border-x border-sky-400/20">
                    {isFlight 
                      ? 'Thrustmaster + Virpil (Нативно) + VKB' 
                      : 'Любые рули 70mm PCD Quick Release'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Только ручки Moza' : 'Только экосистема Moza'}
                  </td>
                  <td className="py-4 px-5 text-slate-400">
                    {isFlight ? 'Экосистема Virpil' : 'Экосистема Fanatec'}
                  </td>
                </tr>

                {/* Row 6: Final Price */}
                <tr className="bg-white/5">
                  <td className="py-4 px-5 font-bold text-white">Стоимость базы</td>
                  <td className="py-4 px-5 bg-sky-500/20 border-x border-sky-400/30">
                    <div className="text-xl font-bold text-emerald-400 font-mono">
                      {isFlight ? '$250 – $480' : '$180 – $350'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {isFlight ? 'DIY / Maker Kit / Сборка' : 'Direct Drive'}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xl font-bold text-slate-300 font-mono">
                      {isFlight ? '$550 – $650' : '$800 – $1,200'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">База без доставки</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xl font-bold text-slate-300 font-mono">
                      {isFlight ? '$800 – $1,100+' : '$999'}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">Премиум-сегмент ЕС</div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
};
