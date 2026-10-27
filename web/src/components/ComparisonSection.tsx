import React from 'react';
import type { ProductMode } from '../types';
import { Check } from 'lucide-react';

interface ComparisonSectionProps {
  mode: ProductMode;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ mode }) => {
  const isFlight = mode === 'flight';

  return (
    <section id="comparison" className="py-14 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Сравнение характеристик
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Честное сопоставление физических возможностей FFBeast с коммерческими аналогами.
          </p>
        </div>

        {/* Liquid Glass Comparison Table */}
        <div className="liquid-glass rounded-3xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-white/70 text-slate-600 font-mono text-xs">
                  <th className="py-3.5 px-5 font-semibold">Характеристика</th>
                  <th className="py-3.5 px-5 font-bold text-sky-900 bg-sky-50/70 border-x border-sky-100">
                    FFBEAST {isFlight ? 'V5 / Direct Drive' : 'Racing DD'}
                  </th>
                  <th className="py-3.5 px-5 font-semibold text-slate-800">
                    {isFlight ? 'Moza AB9 Base' : 'Moza R16 / R21'}
                  </th>
                  <th className="py-3.5 px-5 font-semibold text-slate-800">
                    {isFlight ? 'Virpil VPC Atlas Base' : 'Fanatec ClubSport DD+'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/90 text-slate-700">
                
                {/* Row 1: Type of mechanism */}
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-slate-900">Тип привода</td>
                  <td className="py-3.5 px-5 font-semibold text-sky-800 bg-sky-50/40 border-x border-sky-100">
                    {isFlight ? 'Dual BLDC (Прямой привод / 3:1)' : 'Прямой привод (Direct Drive)'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Dual BLDC серво' : 'Direct Drive'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Dual BLDC Direct Drive' : 'Direct Drive'}
                  </td>
                </tr>

                {/* Row 2: Peak Torque */}
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-slate-900">Крутящий момент</td>
                  <td className="py-3.5 px-5 font-bold text-emerald-800 font-mono bg-sky-50/40 border-x border-sky-100">
                    {isFlight ? 'до 15.0 Нм (V5) / 12.0 Нм (DD)' : 'до 25.0 Нм'}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-700">
                    {isFlight ? '9.0 Нм (предел моторов)' : '16 – 21 Нм'}
                  </td>
                  <td className="py-3.5 px-5 font-mono text-slate-700">
                    {isFlight ? '~10.0 – 12.0 Нм' : '15 Нм'}
                  </td>
                </tr>

                {/* Row 3: Extensions & Lever arms */}
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-slate-900">
                    {isFlight ? 'Работа с удлинителями (+100..200 мм)' : 'Угол вращения'}
                  </td>
                  <td className="py-3.5 px-5 font-semibold text-sky-800 bg-sky-50/40 border-x border-sky-100">
                    {isFlight ? (
                      <div className="flex items-center gap-1.5 text-emerald-800">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>До +200 мм (до 14.5 кгс на хвате)</span>
                      </div>
                    ) : 'Без ограничений'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Не более +100 мм (падение силы)' : 'Без ограничений'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Поддержка удлинителей VPC' : 'Без ограничений'}
                  </td>
                </tr>

                {/* Row 4: Telemetry & FFB Engine */}
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-slate-900">Телеметрия симуляторов</td>
                  <td className="py-3.5 px-5 bg-sky-50/40 border-x border-sky-100">
                    <div className="flex items-center gap-1.5 text-emerald-800 font-semibold">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{isFlight ? '28 эффектов: V², АРУ, Обдув, AoA, Трим' : 'Полная телеметрия iRacing, ACC, AC'}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Закрытый софт Moza Cockpit' : 'Moza Pit House'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Закрытое ПО Virpil FFB' : 'FanaLab'}
                  </td>
                </tr>

                {/* Row 5: Ecosystem & Grips */}
                <tr>
                  <td className="py-3.5 px-5 font-semibold text-slate-900">Совместимость ручек</td>
                  <td className="py-3.5 px-5 font-semibold text-slate-900 bg-sky-50/40 border-x border-sky-100">
                    {isFlight 
                      ? 'Thrustmaster + Virpil (Нативно) + VKB' 
                      : 'Любые рули 70mm PCD Quick Release'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Только ручки Moza' : 'Только экосистема Moza'}
                  </td>
                  <td className="py-3.5 px-5 text-slate-600">
                    {isFlight ? 'Экосистема Virpil' : 'Экосистема Fanatec'}
                  </td>
                </tr>

                {/* Row 6: Final Price */}
                <tr className="bg-white/60">
                  <td className="py-4 px-5 font-bold text-slate-900">Стоимость базы</td>
                  <td className="py-4 px-5 bg-sky-100/60 border-x border-sky-100">
                    <div className="text-xl font-bold text-emerald-800 font-mono">
                      {isFlight ? '$250 – $480' : '$180 – $350'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {isFlight ? 'DIY / Maker Kit / Сборка' : 'Direct Drive'}
                    </div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xl font-bold text-slate-700 font-mono">
                      {isFlight ? '$550 – $650' : '$800 – $1,200'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">База без доставки</div>
                  </td>
                  <td className="py-4 px-5">
                    <div className="text-xl font-bold text-slate-700 font-mono">
                      {isFlight ? '$800 – $1,100+' : '$999'}
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">Премиум-сегмент ЕС</div>
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
