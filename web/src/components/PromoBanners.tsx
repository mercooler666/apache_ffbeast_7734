import React from 'react';
import type { PageRoute } from '../types';
import { Sparkles, Wrench, ArrowRight, Plane, ShieldCheck } from 'lucide-react';

interface PromoBannersProps {
  onNavigate: (route: PageRoute) => void;
}

export const PromoBanners: React.FC<PromoBannersProps> = ({ onNavigate }) => {
  return (
    <section className="py-12 bg-gradient-to-b from-white via-sky-50/50 to-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-sky-600 bg-sky-100/70 px-3 py-1 rounded-full border border-sky-200">
            Interactive Tools Suite
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
            Полный набор инструментов для пилотов и мейкеров
          </h2>
          <p className="text-sm text-slate-600 mt-1.5">
            Переходите в специализированные мастер-разделы для точной настройки физики и подбора механики.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Banner 1: Smart Profile Wizard */}
          <div className="relative group bg-white rounded-3xl p-8 border border-sky-200 shadow-xl shadow-sky-900/5 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-600" />
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-sky-100/60 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center font-bold shadow-sm">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-xs font-bold text-sky-700">
                  <Plane className="w-3.5 h-3.5" />
                  <span>DCS World & War Thunder</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Генератор FFB профилей (Real Force)
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Автоматический расчет и генерация калиброванного <code className="text-sky-700 font-bold bg-sky-50 px-1.5 py-0.5 rounded">.json</code> файла 
                  с эталонной физикой <strong>Real Force</strong>. Поддержка F-15C, Su-35, F-22A, F/A-18C, Su-27 и всех модулей DCS & War Thunder. 
                  Индивидуальный выбор 28 эффектов галочками, стили полета (Хардкор, Казуал, Пилотажник) и экспорт в FFBeast Commander.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-medium text-slate-700">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">100+ Модулей</div>
                  <div className="text-[11px] text-slate-500">Включая F-15C & Su-35</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">28 Эффектов</div>
                  <div className="text-[11px] text-slate-500">Выбор галочками</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">3 Режима сил</div>
                  <div className="text-[11px] text-slate-500">Хардкор / Казуал / Пилотаж</div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={() => onNavigate('profile-wizard')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-gradient-to-r from-sky-600 to-blue-700 hover:from-sky-500 hover:to-blue-600 text-white shadow-lg shadow-sky-600/25 transition cursor-pointer"
              >
                <span>Создать профиль самолета</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Banner 2: Hardware Sizing & BOM Configurator */}
          <div className="relative group bg-white rounded-3xl p-8 border border-slate-200 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 flex flex-col justify-between overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-amber-600" />
            <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-amber-100/50 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center font-bold shadow-sm">
                  <Wrench className="w-6 h-6" />
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Экономия до $1,400</span>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                  Калькулятор сборки железа (BOM)
                </h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Спроектируйте свою базу джойстика или руля. Выберите уровень мощности (10–22 Нм), 
                  плату управления (ODrive / XDrive / ODESC), датчики AMT10E2 и получите точный расчет сметы с выгрузкой списка покупок.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 text-xs font-medium text-slate-700">
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">3 Формата</div>
                  <div className="text-[11px] text-slate-500">DIY / Kit / Ready</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">Проверка совместимости</div>
                  <div className="text-[11px] text-slate-500">Защита от ошибок</div>
                </div>
                <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  <div className="font-bold text-slate-900">Готовый BOM</div>
                  <div className="text-[11px] text-slate-500">Выгрузка в .TXT</div>
                </div>
              </div>
            </div>

            <div className="pt-6 relative z-10">
              <button
                onClick={() => onNavigate('configurator')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-lg transition cursor-pointer"
              >
                <span>Рассчитать конфигурацию железа</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
