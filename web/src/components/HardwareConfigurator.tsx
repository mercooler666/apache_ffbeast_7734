import React, { useState } from 'react';
import type { ProductMode, PageRoute } from '../types';
import { ShoppingBag, Download, ArrowRight, ShieldCheck, ArrowLeft } from 'lucide-react';

interface HardwareConfiguratorProps {
  mode: ProductMode;
  onNavigate?: (route: PageRoute) => void;
  onOpenShop: () => void;
}

export const HardwareConfigurator: React.FC<HardwareConfiguratorProps> = ({ mode, onNavigate, onOpenShop }) => {
  const isFlight = mode === 'flight';

  // Config state
  const [tier, setTier] = useState<'diy' | 'kit' | 'rtr'>('diy');
  const [powerLevel, setPowerLevel] = useState<'10nm' | '15nm' | '22nm'>('15nm');
  const [controllerBoard, setControllerBoard] = useState<'xdrive_dual' | 'odesc_36' | 'odrive_orig'>('xdrive_dual');
  const [extension, setExtension] = useState<'none' | '100mm' | '200mm'>('100mm');

  // Pricing calculation
  const calculations = React.useMemo(() => {
    let boardCost = 65;
    if (controllerBoard === 'odesc_36') boardCost = 85;
    if (controllerBoard === 'odrive_orig') boardCost = 145;

    let motorCost = 25;
    if (powerLevel === '15nm') motorCost = isFlight ? 35 : 20;
    if (powerLevel === '22nm') motorCost = 140;

    const encoderCost = isFlight ? 55 : 30;
    const psuCost = 35;
    const metalAndHardwareCost = isFlight ? 90 : 45;
    const licenseCost = isFlight ? 45 : 35;

    const totalDiyCost = boardCost + motorCost + encoderCost + psuCost + metalAndHardwareCost + licenseCost;
    
    const commercialEquivalent = isFlight ? 1850 : 850;
    const kitCost = Math.round(totalDiyCost * 1.45);
    const rtrCost = isFlight ? 650 : 480;

    const currentCost = tier === 'diy' ? totalDiyCost : tier === 'kit' ? kitCost : rtrCost;
    const savings = commercialEquivalent - currentCost;

    return {
      boardCost,
      motorCost,
      encoderCost,
      psuCost,
      metalAndHardwareCost,
      licenseCost,
      currentCost,
      commercialEquivalent,
      savings
    };
  }, [tier, powerLevel, controllerBoard, extension, isFlight]);

  const handleExportBOM = () => {
    const lines = [
      `FFBeast Спецификация железа (BOM) - ${isFlight ? 'Flight Controls' : 'Racing Wheel'}`,
      `Уровень сборки: ${tier.toUpperCase()}`,
      `Целевой крутящий момент: ${powerLevel}`,
      `Плата управления: ${controllerBoard}`,
      `----------------------------------------`,
      `1. Контроллер (${controllerBoard}): $${calculations.boardCost}`,
      `2. BLDC Мотор(ы): $${calculations.motorCost}`,
      `3. Энкодеры CUI AMT10E2: $${calculations.encoderCost}`,
      `4. Блок питания (24-36V): $${calculations.psuCost}`,
      `5. Подшипники, шкивы, ремни и крепеж: $${calculations.metalAndHardwareCost}`,
      `6. Лицензия на прошивку: $${calculations.licenseCost}`,
      `----------------------------------------`,
      `Итоговая ориентировочная смета DIY: $${calculations.currentCost}`,
      `Стоимость брендовых аналогов: $${calculations.commercialEquivalent}`,
      `Ваша экономия: $${calculations.savings}`,
      `Сгенерировано онлайн-конфигуратором FFBeast`
    ].join('\n');

    const blob = new Blob([lines], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `FFBeast_${isFlight ? 'Flight' : 'Wheel'}_BOM.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 mb-2 cursor-pointer transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Вернуться на главную</span>
              </button>
            )}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Интерактивный конфигуратор железа и калькулятор сметы
              </h1>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm mt-1">
              Рассчитайте компоненты под свой бюджет: от самостоятельной сборки до полностью готовой заводской базы с гарантией.
            </p>
          </div>

          <button
            onClick={onOpenShop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-md shadow-sky-600/20 transition cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Заказать готовый кит</span>
          </button>
        </div>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Options (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Build Level / Tier */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Шаг 1: Формат поставки и уровень готовности
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'diy', title: 'Open Source DIY', desc: 'Печать на 3D-принтере, заказ резки металла. Минимальная цена.', badge: 'Экономно' },
                  { id: 'kit', title: 'Maker Kit', desc: 'Прошитая плата, датчики и жгуты проводов. Сборка за 1 вечер.', badge: 'Хит' },
                  { id: 'rtr', title: 'Ready to Run', desc: 'Полностью собранная металлическая база с гарантией.', badge: 'Под ключ' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTier(opt.id as any)}
                    className={`p-4 rounded-2xl border text-left transition relative cursor-pointer ${
                      tier === opt.id
                        ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-sm text-slate-900">{opt.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1 leading-snug">{opt.desc}</div>
                    <span className="inline-block mt-2 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-sky-800">
                      {opt.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Peak Torque */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Шаг 2: Крутящий момент и мощность
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: '10nm', title: '10.0 Нм', desc: 'Статор 20 мм. Компактный и мягкий ход.' },
                  { id: '15nm', title: '15.0 Нм', desc: 'Статор 30 мм. Золотой стандарт (Рекомендуется).' },
                  { id: '22nm', title: '22.0+ Нм', desc: 'Промышленный AC Сервопривод. Экстремальная мощь.' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPowerLevel(p.id as any)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      powerLevel === p.id
                        ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-mono font-black text-base text-slate-900">{p.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Controller Board */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                Шаг 3: Плата контроллера
              </span>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'xdrive_dual', title: 'Makerbase XDrive', desc: 'Встроенная защита USB от статики. Оптимальный выбор.' },
                  { id: 'odesc_36', title: 'ODESC 3.6 / 4.2', desc: 'Алюминиевый корпус-радиатор Flipsky.' },
                  { id: 'odrive_orig', title: 'Оригинальный ODrive', desc: 'Эталонная плата от разработчика ODrive Robotics.' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setControllerBoard(c.id as any)}
                    className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                      controllerBoard === c.id
                        ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                        : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900">{c.title}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Extension & Mount (For Flight) */}
            {isFlight && (
              <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500">
                  Шаг 4: Длина рычага и посадка
                </span>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: 'none', title: 'Настольный (0 мм)', desc: 'Прямая посадка ручки. Быстрый отклик.' },
                    { id: '100mm', title: 'Центральный (+100 мм)', desc: 'Стандартный кронштейн. Оптимальный баланс.' },
                    { id: '200mm', title: 'Напольный (+200 мм)', desc: 'Реалистичный ход настоящего истребителя.' }
                  ].map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setExtension(ex.id as any)}
                      className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                        extension === ex.id
                          ? 'bg-sky-50 border-sky-500 text-slate-900 shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                      }`}
                    >
                      <div className="font-bold text-xs text-slate-900">{ex.title}</div>
                      <div className="text-[11px] text-slate-500 mt-1">{ex.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sizing & BOM Output (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Смета компонентов
                </div>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Экономия ~${calculations.savings}
                </span>
              </div>

              {/* Price comparison */}
              <div className="py-6 text-center space-y-2">
                <div className="text-xs font-mono uppercase text-slate-500 font-bold tracking-wider">
                  Итоговая смета на компоненты
                </div>
                <div className="text-5xl font-black text-slate-900 font-mono tracking-tight">
                  ${calculations.currentCost}
                </div>
                <div className="text-xs text-slate-500">
                  Стоимость заводского аналога: <span className="line-through text-slate-400 font-bold">${calculations.commercialEquivalent}</span>
                </div>
              </div>

              {/* Cost items breakdown */}
              <div className="space-y-2.5 text-xs font-mono border-t border-slate-100 pt-5">
                <div className="flex justify-between text-slate-700">
                  <span>Плата контроллера ({controllerBoard}):</span>
                  <span className="font-bold text-slate-900">${calculations.boardCost}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>BLDC Моторы:</span>
                  <span className="font-bold text-slate-900">${calculations.motorCost}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Датчики (CUI AMT10E2 20K CPR):</span>
                  <span className="font-bold text-slate-900">${calculations.encoderCost}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Лазерная резка стали/алюм. + подшипники:</span>
                  <span className="font-bold text-slate-900">${calculations.metalAndHardwareCost}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Блок питания 24–36V:</span>
                  <span className="font-bold text-slate-900">${calculations.psuCost}</span>
                </div>
                <div className="flex justify-between text-slate-700">
                  <span>Лицензия на прошивку:</span>
                  <span className="font-bold text-emerald-600">${calculations.licenseCost}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-6 space-y-3">
                <button
                  onClick={onOpenShop}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl text-sm font-bold bg-sky-600 hover:bg-sky-500 text-white shadow-lg shadow-sky-600/25 transition cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Купить кит или лицензию</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExportBOM}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Скачать спецификацию (BOM .txt)</span>
                </button>
              </div>

              {/* Trust badge */}
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-center gap-2 text-[11px] text-slate-500 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% проверенные схемы и электроника сообщества</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
