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
    <div className="py-8 sm:py-12 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb / Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div>
            {onNavigate && (
              <button
                onClick={() => onNavigate('home')}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white mb-2 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Вернуться на главную</span>
              </button>
            )}
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Конфигуратор железа и смета компонентов
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Рассчитайте нагрузки и компоненты под свой бюджет: от самостоятельной сборки до готовой базы.
            </p>
          </div>

          <button
            onClick={onOpenShop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Заказать готовый кит</span>
          </button>
        </div>

        {/* Configurator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Options (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Step 1: Build Level / Tier */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3.5 border border-white/15 shadow-2xl">
              <span className="text-xs font-semibold text-slate-300">
                1. Формат поставки и уровень готовности
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'diy', title: 'Open Source DIY', desc: 'Печать на 3D-принтере, резка металла. Минимальная цена.', badge: 'Экономно' },
                  { id: 'kit', title: 'Maker Kit', desc: 'Прошитая плата, датчики и жгуты. Быстрая сборка.', badge: 'Популярно' },
                  { id: 'rtr', title: 'Ready to Run', desc: 'Полностью собранная металлическая база с гарантией.', badge: 'Под ключ' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setTier(opt.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer relative ${
                      tier === opt.id
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{opt.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1 leading-snug">{opt.desc}</div>
                    <span className="inline-block mt-2 text-[10px] font-mono px-2 py-0.5 rounded-lg bg-white/10 text-slate-300 border border-white/15">
                      {opt.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Target Peak Torque */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3.5 border border-white/15 shadow-2xl">
              <span className="text-xs font-semibold text-slate-300">
                2. Крутящий момент и мощность
              </span>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: '10nm', title: '10.0 Нм', desc: 'Статор 20 мм. Компактный ход.' },
                  { id: '15nm', title: '15.0 Нм', desc: 'Статор 30 мм. Оптимальный выбор.' },
                  { id: '22nm', title: '22.0+ Нм', desc: 'Промышленный сервопривод.' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setPowerLevel(p.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      powerLevel === p.id
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-mono font-bold text-sm text-white">{p.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{p.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Controller Board */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3.5 border border-white/15 shadow-2xl">
              <span className="text-xs font-semibold text-slate-300">
                3. Плата контроллера
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'xdrive_dual', title: 'Makerbase XDrive', desc: 'Встроенная защита USB. Оптимально.' },
                  { id: 'odesc_36', title: 'ODESC 3.6 / 4.2', desc: 'Алюминиевый корпус-радиатор Flipsky.' },
                  { id: 'odrive_orig', title: 'Оригинальный ODrive', desc: 'Плата от разработчика ODrive Robotics.' }
                ].map(c => (
                  <button
                    key={c.id}
                    onClick={() => setControllerBoard(c.id as any)}
                    className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                      controllerBoard === c.id
                        ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-bold text-xs text-white">{c.title}</div>
                    <div className="text-[11px] text-slate-400 mt-1">{c.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 4: Extension & Mount (For Flight) */}
            {isFlight && (
              <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-3.5 border border-white/15 shadow-2xl">
                <span className="text-xs font-semibold text-slate-300">
                  4. Длина рычага ручки
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {[
                    { id: 'none', title: 'Без удлинителя (0 мм)', desc: 'Прямая посадка ручки. Быстрый ход.' },
                    { id: '100mm', title: 'Центральный (+100 мм)', desc: 'Стандартный кронштейн. Баланс.' },
                    { id: '200mm', title: 'Напольный (+200 мм)', desc: 'Реалистичный ход истребителя.' }
                  ].map(ex => (
                    <button
                      key={ex.id}
                      onClick={() => setExtension(ex.id as any)}
                      className={`p-3.5 rounded-2xl border text-left transition-colors cursor-pointer ${
                        extension === ex.id
                          ? 'bg-sky-500/20 border-sky-400 text-white shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      <div className="font-bold text-xs text-white">{ex.title}</div>
                      <div className="text-[11px] text-slate-400 mt-1">{ex.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* Sizing & BOM Output (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-5">
            <div className="liquid-glass rounded-3xl p-6 shadow-2xl space-y-5 border border-white/15">
              
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="text-xs font-bold text-white">
                  Смета комплектующих
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-500/20 px-2.5 py-0.5 rounded-lg border border-emerald-400/30">
                  Экономия ~${calculations.savings}
                </span>
              </div>

              {/* Price comparison */}
              <div className="text-center space-y-1.5 py-2">
                <div className="text-xs text-slate-400 font-mono">
                  Ориентировочная стоимость
                </div>
                <div className="text-4xl font-bold text-white font-mono tracking-tight">
                  ${calculations.currentCost}
                </div>
                <div className="text-xs text-slate-400">
                  Стоимость заводского аналога: <span className="line-through text-slate-500 font-mono font-medium">${calculations.commercialEquivalent}</span>
                </div>
              </div>

              {/* Cost items breakdown */}
              <div className="space-y-2 text-xs font-mono border-t border-white/10 pt-4">
                <div className="flex justify-between text-slate-300">
                  <span>Плата контроллера ({controllerBoard}):</span>
                  <span className="font-bold text-white">${calculations.boardCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>BLDC Мотор(ы):</span>
                  <span className="font-bold text-white">${calculations.motorCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Датчики (CUI AMT10E2 20K CPR):</span>
                  <span className="font-bold text-white">${calculations.encoderCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Лазерная резка стали + подшипники:</span>
                  <span className="font-bold text-white">${calculations.metalAndHardwareCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Блок питания 24–36V:</span>
                  <span className="font-bold text-white">${calculations.psuCost}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Лицензия на прошивку:</span>
                  <span className="font-bold text-emerald-400">${calculations.licenseCost}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 space-y-2.5">
                <button
                  onClick={onOpenShop}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl text-xs sm:text-sm font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg transition-colors cursor-pointer active:scale-[0.985]"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Купить кит или лицензию</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={handleExportBOM}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl text-xs font-medium liquid-glass hover:bg-white/15 text-white border border-white/20 transition-colors cursor-pointer active:scale-[0.985]"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Скачать спецификацию (BOM .txt)</span>
                </button>
              </div>

              {/* Trust badge */}
              <div className="pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Проверенные схемы и электроника сообщества</span>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
