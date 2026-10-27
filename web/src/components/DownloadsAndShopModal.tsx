import React, { useState } from 'react';
import { Download, ShoppingBag, ExternalLink, X, FileArchive, Key, Layers, Terminal } from 'lucide-react';

interface DownloadsAndShopModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'downloads' | 'shop';
}

export const DownloadsAndShopModal: React.FC<DownloadsAndShopModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'shop'
}) => {
  const [tab, setTab] = useState<'shop' | 'downloads'>(defaultTab);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/50 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[90vh] liquid-glass rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-white/60">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200/80 bg-white/60">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setTab('shop')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                tab === 'shop'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white/70 border border-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Магазин & Лицензии</span>
            </button>

            <button
              onClick={() => setTab('downloads')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                tab === 'downloads'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900 bg-white/70 border border-slate-200'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Прошивки & Софт</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-white/80 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {tab === 'shop' ? (
            <div className="space-y-6">
              
              {/* Ready-to-Run Hardware Card */}
              <div className="liquid-glass rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-slate-900 font-bold text-sm flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-sky-700" />
                    <span>Готовые собранные базы Plug & Play</span>
                  </div>
                  <div className="text-xs text-slate-600 mt-1 max-w-xl">
                    Закажите готовые базы джойстиков и рулей в металлическом корпусе, 
                    протестированные и откалиброванные с заводской гарантией.
                  </div>
                </div>

                <div className="flex gap-2">
                  <a
                    href="https://ffbeast-devices.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-600 text-white transition-colors shrink-0 shadow-xs"
                  >
                    <span>FFBeast Devices</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://ffbeast.gvl224.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition-colors shrink-0"
                  >
                    <span>GVL224</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Digital Licenses & CAD Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Product 1: Flight Controls License */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold text-sky-900 bg-sky-100/80 px-2 py-0.5 rounded border border-sky-200">
                        Лицензия прошивки
                      </span>
                      <span className="text-xs font-mono text-slate-500">Single Device ID</span>
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-2">Flight Controls Pro License</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Полная функциональность прошивки для РУС, Педалей или РОШ на ODrive/ODESC. 
                      Активирует расчет телеметрии для DCS World, War Thunder и MSFS.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-emerald-800 text-xs font-semibold">Бесплатный тестовый режим</span>
                    <a
                      href="https://buy.stripe.com/1PiaRFAUMJA5adUcnrWNXyPX"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-600 text-white transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Купить ключ</span>
                    </a>
                  </div>
                </div>

                {/* Product 2: Wheel Premium License */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold text-slate-800 bg-slate-200/70 px-2 py-0.5 rounded border border-slate-300">
                        Лицензия руля
                      </span>
                      <span className="text-xs font-mono text-slate-500">Бессрочная</span>
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-2">FFB Wheel Premium License</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Расширенные настройки, прямое подключение кнопок и энкодеров к ODrive, 
                      пользовательский USB API протокол и демпфирование до 25 Нм.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-emerald-800 text-xs font-semibold">Бесплатный Light режим</span>
                    <a
                      href="https://buy.stripe.com/1P4ox3AUMJA5adUcFstvg88p"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Купить ключ</span>
                    </a>
                  </div>
                </div>

                {/* Product 3: Laser Cut DXF & 3D Print Bundle */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold text-amber-900 bg-amber-100/80 px-2 py-0.5 rounded border border-amber-200">
                        Чертежи CAD
                      </span>
                      <span className="text-xs font-mono text-slate-500">DXF + STL</span>
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-2">Flight Controls DIY Bundle</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Чертежи для лазерной резки металла (DXF) + 3D модели (STL) 
                      и переходники для ручек Thrustmaster и VKB.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Под лазерную резку</span>
                    <a
                      href="https://buy.stripe.com/1PianWAUMJA5adUcTSKcbpXH"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-amber-700 hover:bg-amber-600 text-white transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Купить DXF</span>
                    </a>
                  </div>
                </div>

                {/* Product 4: Full STEP Assembly */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-mono font-semibold text-slate-800 bg-slate-200/70 px-2 py-0.5 rounded border border-slate-300">
                        3D Сборка
                      </span>
                      <span className="text-xs font-mono text-slate-500">Полный STEP</span>
                    </div>
                    <div className="text-base font-bold text-slate-900 mt-2">Полная 3D сборка (STEP)</div>
                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                      Полная 3D модель механизма в формате STEP для инженеров и сборщиков кокпитов, 
                      желающих изменить габариты, крепления или дизайн.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Autodesk / SolidWorks</span>
                    <a
                      href="https://buy.stripe.com/1PiaqJAUMJA5adUcmymHENK4"
                      target="_blank"
                      rel="noreferrer"
                      className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Купить STEP</span>
                    </a>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-xs text-slate-600">
                Официальные релизы прошивок и управляющего программного обеспечения для Windows.
              </div>

              {/* Downloads List */}
              <div className="space-y-3">
                
                {/* Flight Release */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileArchive className="w-6 h-6 text-sky-700" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>FFBeast Flight Controls Полный пакет</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-200 font-semibold">
                          RC.25.1.4.Full
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Прошивка .hex/.bin + FFBeast Commander + FFBeast Setup + профили ручек VPC/Thrustmaster
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://ffbeast.github.io/assets/firmware/ffbeast-flight-controls-RC.25.1.4.Full.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-sky-700 hover:bg-sky-600 text-white transition-colors shrink-0 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать (ZIP)</span>
                  </a>
                </div>

                {/* Racing Wheel Release */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileArchive className="w-6 h-6 text-slate-700" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>FFBeast Direct Drive Wheel Пакет</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-200 text-slate-800 border border-slate-300 font-semibold">
                          RC.26.1.1.Full
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Прошивка Direct Drive + Wheel Setup App + примеры USB API
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://ffbeast.github.io/assets/firmware/ffbeast-wheel-RC.26.1.1.Full.zip"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white transition-colors shrink-0 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать (ZIP)</span>
                  </a>
                </div>

                {/* Testing Utilities */}
                <div className="liquid-glass-subtle rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-6 h-6 text-amber-700" />
                    <div>
                      <div className="text-sm font-bold text-slate-900">Диагностический пакет утилит</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        ForceTest.exe, JoystickTest.exe, VKB JoyTester, USBDeview
                      </div>
                    </div>
                  </div>
                  <a
                    href="https://ffbeast.github.io/assets/firmware/ForceTest.exe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition-colors shrink-0 shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>ForceTest.exe</span>
                  </a>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
