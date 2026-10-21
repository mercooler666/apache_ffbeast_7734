import React from 'react';
import type { ProductMode } from '../types';
import { Check, Award } from 'lucide-react';

interface ComparisonSectionProps {
  mode: ProductMode;
}

export const ComparisonSection: React.FC<ComparisonSectionProps> = ({ mode }) => {
  const isFlight = mode === 'flight';

  return (
    <section id="comparison" className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-slate-200 text-xs font-bold text-slate-700 shadow-xs mb-3">
            <Award className="w-3.5 h-3.5 text-amber-500" />
            <span>Сравнение с конкурентами</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Почему вирпилы и симрейсеры выбирают FFBeast
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Честное сопоставление характеристик с дорогими коммерческими аналогами.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-3xl border border-slate-200 bg-white shadow-xl">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-mono">
                <th className="py-4 px-6 font-bold">Характеристика</th>
                <th className="py-4 px-6 font-black text-sky-900 bg-sky-50/80 border-x border-sky-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                    <span>FFBEAST {isFlight ? 'FLIGHT' : 'RACING'}</span>
                  </div>
                </th>
                <th className="py-4 px-6 font-semibold">
                  {isFlight ? 'Brunner CLS-E' : 'Moza R16 / R21'}
                </th>
                <th className="py-4 px-6 font-semibold">
                  {isFlight ? 'Стандартные кулачки (Virpil/VKB)' : 'Fanatec ClubSport DD+'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              
              {/* Row 1 */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Тип механизма</td>
                <td className="py-4 px-6 font-bold text-sky-700 bg-sky-50/40 border-x border-sky-100">
                  Активный прямой привод (Dual BLDC)
                </td>
                <td className="py-4 px-6">Активный FFB</td>
                <td className="py-4 px-6 text-slate-400">
                  {isFlight ? 'Пассивные пружины (нет телеметрии)' : 'Direct Drive'}
                </td>
              </tr>

              {/* Row 2 */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Пиковый крутящий момент</td>
                <td className="py-4 px-6 font-black text-emerald-600 font-mono bg-sky-50/40 border-x border-sky-100">
                  {isFlight ? 'до 15.0 Нм' : 'до 25.0 Нм'}
                </td>
                <td className="py-4 px-6 font-mono">
                  {isFlight ? '4.0 - 8.0 Нм' : '16 - 21 Нм'}
                </td>
                <td className="py-4 px-6 font-mono text-slate-400">
                  {isFlight ? 'Статичная пружина' : '15 Нм'}
                </td>
              </tr>

              {/* Row 3 */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Телеметрия симуляторов</td>
                <td className="py-4 px-6 bg-sky-50/40 border-x border-sky-100">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>Полная (Скорость V², Обдув, Срыв AoA, Отдача, Трим)</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Закрытый софт (платная подписка)' : 'Moza Pit House'}
                </td>
                <td className="py-4 px-6 text-slate-400">
                  {isFlight ? 'Отсутствует (только пружина)' : 'FanaLab'}
                </td>
              </tr>

              {/* Row 4 */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Экосистема ручек / баранок</td>
                <td className="py-4 px-6 font-bold text-slate-900 bg-sky-50/40 border-x border-sky-100">
                  {isFlight 
                    ? 'Thrustmaster + Virpil (Родная) + VKB (Кабель)' 
                    : 'Любые рули 70mm PCD Quick Release'}
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Только фирменные ручки Brunner' : 'Только экосистема Moza'}
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Привязка к бренду' : 'Только экосистема Fanatec'}
                </td>
              </tr>

              {/* Row 5 */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Открытость и модификации</td>
                <td className="py-4 px-6 text-sky-700 font-bold bg-sky-50/40 border-x border-sky-100">
                  Открытый BOM, 3D печать STL, лазерная резка DXF
                </td>
                <td className="py-4 px-6 text-slate-400">Закрытый блок / слёт гарантии</td>
                <td className="py-4 px-6 text-slate-400">Закрытый блок</td>
              </tr>

              {/* Row 6 */}
              <tr className="bg-slate-50/80">
                <td className="py-5 px-6 font-black text-slate-900 text-base">Итоговая стоимость базы</td>
                <td className="py-5 px-6 bg-sky-100/60 border-x border-sky-100">
                  <div className="text-2xl font-black text-emerald-600 font-mono">
                    {isFlight ? '$250 - $480' : '$180 - $350'}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {isFlight ? 'Варианты DIY / Maker Kit' : 'Полноценный Direct Drive'}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-2xl font-black text-slate-700 font-mono">
                    {isFlight ? '$1,650 - $2,800' : '$800 - $1,200'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Только база, без учета доставки</div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-2xl font-black text-slate-500 font-mono">
                    {isFlight ? '$400 - $600' : '$999'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Пассивные пружины или закрытый бренд</div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
