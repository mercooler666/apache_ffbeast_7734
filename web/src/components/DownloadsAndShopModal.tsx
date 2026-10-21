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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white border border-slate-200 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setTab('shop')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                tab === 'shop'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Официальный магазин & Лицензии</span>
            </button>

            <button
              onClick={() => setTab('downloads')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                tab === 'downloads'
                  ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                  : 'text-slate-600 hover:text-slate-900 bg-white border border-slate-200'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Центр прошивок и софта</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {tab === 'shop' ? (
            <div className="space-y-6">
              
              {/* Ready-to-Run Hardware Alert */}
              <div className="bg-gradient-to-r from-sky-50 via-blue-50 to-indigo-50 border border-sky-200 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-slate-900 font-bold text-base flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-sky-600" />
                    <span>Нужна готовая собранная база Plug & Play?</span>
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
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition shrink-0 shadow-sm"
                  >
                    <span>FFBeast Devices Store</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <a
                    href="https://ffbeast.gvl224.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-semibold bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 transition shrink-0"
                  >
                    <span>Мастерская GVL224</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Digital Licenses & CAD Packages Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Product 1: Flight Controls License */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-sky-800 bg-sky-100 px-2 py-0.5 rounded border border-sky-200">
                        ЛИЦЕНЗИЯ ПРОШИВКИ
                      </span>
                      <span className="text-xs font-mono text-slate-500">Single Device ID</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-2">Flight Controls Pro License</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Разблокирует полную функциональность прошивки для Джойстика, Педалей или РОШ на ODrive/ODESC. 
                      Активирует телеметрию для DCS, War Thunder и MSFS.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Моментальная доставка</div>
                      <div className="text-emerald-700 text-xs font-bold">Бесплатный тестовый режим</div>
                    </div>
                    <a
                      href="https://buy.stripe.com/1PiaRFAUMJA5adUcnrWNXyPX"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition flex items-center gap-1 shadow-sm"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Купить ключ</span>
                    </a>
                  </div>
                </div>

                {/* Product 2: Wheel Premium License */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-red-800 bg-red-100 px-2 py-0.5 rounded border border-red-200">
                        ЛИЦЕНЗИЯ РУЛЯ
                      </span>
                      <span className="text-xs font-mono text-slate-500">Бессрочная поддержка</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-2">FFB Wheel Premium License</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Расширенные настройки, прямое подключение кнопок и энкодеров к ODrive, 
                      пользовательский USB API протокол и динамическое демпфирование до 25 Нм.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] text-slate-500 uppercase font-mono">Моментальная доставка</div>
                      <div className="text-emerald-700 text-xs font-bold">Бесплатный Light режим</div>
                    </div>
                    <a
                      href="https://buy.stripe.com/1P4ox3AUMJA5adUcFstvg88p"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition flex items-center gap-1 shadow-sm"
                    >
                      <Key className="w-3.5 h-3.5" />
                      <span>Купить ключ</span>
                    </a>
                  </div>
                </div>

                {/* Product 3: Laser Cut DXF & 3D Print Bundle */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
                        ЧЕРТЕЖИ CAD
                      </span>
                      <span className="text-xs font-mono text-slate-500">DXF + STL</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-2">Flight Controls DIY Bundle</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Полный комплект чертежей для лазерной резки металла (DXF) + 3D модели (STL) 
                      и переходники для ручек Thrustmaster и VKB.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Готово под лазерную резку</span>
                    <a
                      href="https://buy.stripe.com/1PianWAUMJA5adUcTSKcbpXH"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-600 hover:bg-amber-500 text-white transition flex items-center gap-1 shadow-sm"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Купить DXF комплект</span>
                    </a>
                  </div>
                </div>

                {/* Product 4: Full STEP Assembly */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded border border-blue-200">
                        3D СБОРКА
                      </span>
                      <span className="text-xs font-mono text-slate-500">Полный STEP</span>
                    </div>
                    <div className="text-lg font-bold text-slate-900 mt-2">Полная 3D сборка (STEP)</div>
                    <p className="text-xs text-slate-600 mt-1">
                      Полная 3D модель механизма в формате STEP для инженеров и сборщиков кокпитов, 
                      желающих изменить габариты, крепления или дизайн.
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-xs text-slate-600 font-medium">Autodesk / SolidWorks</span>
                    <a
                      href="https://buy.stripe.com/1PiaqJAUMJA5adUcmymHENK4"
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1 shadow-sm"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Купить STEP модель</span>
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
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileArchive className="w-7 h-7 text-sky-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>FFBeast Flight Controls Полный пакет</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-100 text-sky-900 border border-sky-200 font-bold">
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-sky-600 hover:bg-sky-500 text-white transition shrink-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать (ZIP)</span>
                  </a>
                </div>

                {/* Racing Wheel Release */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileArchive className="w-7 h-7 text-red-600" />
                    <div>
                      <div className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <span>FFBeast Direct Drive Wheel Пакет</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-100 text-red-900 border border-red-200 font-bold">
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition shrink-0 shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать (ZIP)</span>
                  </a>
                </div>

                {/* Testing Utilities */}
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-7 h-7 text-amber-600" />
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
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 transition shrink-0 shadow-xs"
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
