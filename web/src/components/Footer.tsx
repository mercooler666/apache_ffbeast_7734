import React from 'react';
import type { PageRoute, ProductMode } from '../types';
import { ExternalLink, Mail, Send } from 'lucide-react';

interface FooterProps {
  mode?: ProductMode;
  onNavigate?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ mode = 'flight', onNavigate }) => {
  const isFlight = mode === 'flight';

  return (
    <footer className="liquid-glass border-t border-white/10 py-12 text-xs text-slate-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-400/30 to-sky-600/20 border border-sky-400/40 text-white font-bold text-xs flex items-center justify-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                FB
              </div>
              <span className="text-white font-bold text-sm tracking-tight">FFBEAST</span>
            </div>
            <p className="text-slate-400 leading-relaxed text-xs">
              Direct Drive Force Feedback экосистема для виртуальной авиации и автосимуляторов.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs">Инструменты</div>
            <ul className="space-y-1.5">
              {onNavigate && (
                <>
                  {isFlight ? (
                    <li><button onClick={() => onNavigate('profile-wizard')} className="hover:text-white transition-colors cursor-pointer">Генератор профилей DCS & WT</button></li>
                  ) : (
                    <li><a href="https://ffbeast.github.io/docs/en/wheel.html" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Документация руля Direct Drive</span><ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
                  )}
                  <li><button onClick={() => onNavigate('configurator')} className="hover:text-white transition-colors cursor-pointer">Калькулятор базы и BOM</button></li>
                </>
              )}
              <li><a href="#benchmark-comparison" className="hover:text-white transition-colors">Сравнение характеристик</a></li>
              <li><a href="https://ffbeast-devices.com/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Магазин готовых устройств</span><ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs">Сообщество и контакты</div>
            <ul className="space-y-1.5">
              <li><a href="https://t.me/FAQFFB" target="_blank" rel="noreferrer" className="hover:text-sky-300 transition-colors flex items-center gap-1 text-slate-300 font-medium"><Send className="w-3 h-3 text-sky-400" /><span>Telegram: FAQ FFB</span><ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="https://t.me/aldo_apache_7734" target="_blank" rel="noreferrer" className="hover:text-sky-300 transition-colors flex items-center gap-1 text-slate-300 font-medium"><Send className="w-3 h-3 text-sky-400" /><span>Telegram автора: @aldo_apache_7734</span><ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="https://discord.gg/5ZKD46zQSU" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>Discord сервер (1000+ участников)</span><ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="https://github.com/ffbeast" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1"><span>GitHub репозитории</span><ExternalLink className="w-3 h-3 text-slate-500" /></a></li>
              <li><a href="mailto:ffbeast.devices@gmail.com" className="hover:text-white transition-colors flex items-center gap-1"><Mail className="w-3 h-3 text-slate-500" /><span>ffbeast.devices@gmail.com</span></a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="text-white font-semibold text-xs">Pet-проект</div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Создано для максимального комфорта и аутентичного ощущения органов управления в DCS World и War Thunder.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 space-y-1">
              <div>© {new Date().getFullYear()} FFBeast. Разработано для пилотов и симрейсеров.</div>
              <div>
                Автор:{' '}
                <a 
                  href="https://t.me/aldo_apache_7734" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-sky-300 hover:text-sky-200 underline"
                >
                  Aldo_Apache_7734
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
