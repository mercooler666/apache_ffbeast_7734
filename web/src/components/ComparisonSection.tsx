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
                    <span className="w-2.5 h-2.5 rounded-full bg-sky-600 animate-pulse" />
                    <span>FFBEAST {isFlight ? 'FLIGHT (V5 / DD)' : 'RACING'}</span>
                  </div>
                </th>
                <th className="py-4 px-6 font-bold text-slate-800">
                  {isFlight ? 'MOZA AB9 FFB Base' : 'Moza R16 / R21'}
                </th>
                <th className="py-4 px-6 font-bold text-slate-800">
                  {isFlight ? 'Virpil VPC Atlas FFB Base' : 'Fanatec ClubSport DD+'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              
              {/* Row 1: Type of mechanism */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Тип привода и механика</td>
                <td className="py-4 px-6 font-bold text-sky-700 bg-sky-50/40 border-x border-sky-100">
                  {isFlight ? 'Dual BLDC (Прямой привод / Редуктор 3:1)' : 'Активный прямой привод (Dual BLDC)'}
                </td>
                <td className="py-4 px-6 font-medium">
                  {isFlight ? 'Dual BLDC сервопривод' : 'Direct Drive'}
                </td>
                <td className="py-4 px-6 font-medium text-slate-600">
                  {isFlight ? 'Dual BLDC Direct Drive' : 'Direct Drive'}
                </td>
              </tr>

              {/* Row 2: Peak Torque */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Пиковый крутящий момент</td>
                <td className="py-4 px-6 font-black text-emerald-600 font-mono bg-sky-50/40 border-x border-sky-100">
                  {isFlight ? 'до 15.0 Нм (V5) / до 12.0 Нм (DD)' : 'до 25.0 Нм'}
                </td>
                <td className="py-4 px-6 font-mono font-bold text-slate-700">
                  {isFlight ? '9.0 Нм (предел моторов)' : '16 - 21 Нм'}
                </td>
                <td className="py-4 px-6 font-mono font-bold text-slate-700">
                  {isFlight ? '~10.0 - 12.0 Нм' : '15 Нм'}
                </td>
              </tr>

              {/* Row 3: Extensions & Lever arms */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">
                  {isFlight ? 'Работа с удлинителями (+100..+200 мм)' : 'Угол вращения'}
                </td>
                <td className="py-4 px-6 font-bold text-sky-700 bg-sky-50/40 border-x border-sky-100">
                  {isFlight ? (
                    <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                      <Check className="w-4 h-4 shrink-0" />
                      <span>Полная поддержка до +200 мм (до 12 кг на хвате)</span>
                    </div>
                  ) : 'Без ограничений (Infinity)'}
                </td>
                <td className="py-4 px-6 text-slate-600">
                  {isFlight ? 'Не рекомендуется длиннее +100 мм (падение силы до ~3.5 кг)' : 'Без ограничений'}
                </td>
                <td className="py-4 px-6 text-slate-600">
                  {isFlight ? 'Поддержка удлинителей VPC (до +150 мм)' : 'Без ограничений'}
                </td>
              </tr>

              {/* Row 4: Telemetry & FFB Engine */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Телеметрия симуляторов</td>
                <td className="py-4 px-6 bg-sky-50/40 border-x border-sky-100">
                  <div className="flex items-center gap-1.5 text-emerald-600 font-bold">
                    <Check className="w-4 h-4 shrink-0" />
                    <span>{isFlight ? 'Полная открытая (28 эффектов: V², АРУ, Обдув, AoA, Трим)' : 'Полная телеметрия iRacing, ACC, AC'}</span>
                  </div>
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Закрытый софт Moza Cockpit (базовые эффекты)' : 'Moza Pit House'}
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Фирменное закрытое ПО Virpil FFB' : 'FanaLab'}
                </td>
              </tr>

              {/* Row 5: Ecosystem & Grips */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Экосистема ручек / баранок</td>
                <td className="py-4 px-6 font-bold text-slate-900 bg-sky-50/40 border-x border-sky-100">
                  {isFlight 
                    ? 'Thrustmaster + Virpil (Нативно) + VKB + GVL224' 
                    : 'Любые рули 70mm PCD Quick Release'}
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Только ручки Moza (переходник TM за доплату)' : 'Только экосистема Moza'}
                </td>
                <td className="py-4 px-6">
                  {isFlight ? 'Только фирменная экосистема Virpil (Grip connector)' : 'Только экосистема Fanatec'}
                </td>
              </tr>

              {/* Row 6: Openness and Repairability */}
              <tr>
                <td className="py-4 px-6 font-bold text-slate-900">Открытость и ремонтопригодность</td>
                <td className="py-4 px-6 text-sky-700 font-bold bg-sky-50/40 border-x border-sky-100">
                  100% открытый BOM, стандартные детали, 3D STL и DXF чертежи
                </td>
                <td className="py-4 px-6 text-slate-400">Закрытый коммерческий блок / сервис в Азии</td>
                <td className="py-4 px-6 text-slate-400">Закрытый коммерческий блок / сервис в ЕС</td>
              </tr>

              {/* Row 7: Final Price */}
              <tr className="bg-slate-50/80">
                <td className="py-5 px-6 font-black text-slate-900 text-base">Итоговая стоимость базы</td>
                <td className="py-5 px-6 bg-sky-100/60 border-x border-sky-100">
                  <div className="text-2xl font-black text-emerald-600 font-mono">
                    {isFlight ? '$250 - $480' : '$180 - $350'}
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    {isFlight ? 'Варианты DIY / Maker Kit / Готовая сборка' : 'Полноценный Direct Drive'}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-2xl font-black text-slate-700 font-mono">
                    {isFlight ? '$550 - $650' : '$800 - $1,200'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isFlight ? 'Только база, без доставки и растаможки' : 'Только база'}
                  </div>
                </td>
                <td className="py-5 px-6">
                  <div className="text-2xl font-black text-slate-700 font-mono">
                    {isFlight ? '$800 - $1,100+' : '$999'}
                  </div>
                  <div className="text-[11px] text-slate-400 mt-0.5">
                    {isFlight ? 'Ожидаемая цена премиум-сегмента ЕС' : 'База без руля'}
                  </div>
                </td>
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
