import React from 'react';
import type { PageRoute } from '../types';
import { ExternalLink, Mail, Send } from 'lucide-react';

interface FooterProps {
  onNavigate?: (route: PageRoute) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 text-xs text-slate-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-700 text-white font-black text-sm flex items-center justify-center shadow-sm">
                FB
              </div>
              <span className="text-slate-900 font-extrabold text-base tracking-wider">FFBEAST</span>
            </div>
            <p className="text-slate-500 leading-relaxed text-xs">
              Профессиональная экосистема Direct Drive Force Feedback для виртуальной авиации и автосимуляторов.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2">
            <div className="text-slate-900 font-bold uppercase tracking-wider text-xs">Инструменты и сервисы</div>
            <ul className="space-y-1.5">
              {onNavigate && (
                <>
                  <li><button onClick={() => onNavigate('profile-wizard')} className="hover:text-sky-600 transition cursor-pointer">Конструктор профилей DCS & WT</button></li>
                  <li><button onClick={() => onNavigate('configurator')} className="hover:text-sky-600 transition cursor-pointer">Калькулятор сборки и BOM</button></li>
                </>
              )}
              <li><a href="#comparison" className="hover:text-sky-600 transition">Сравнение с конкурентами</a></li>
              <li><a href="https://ffbeast-devices.com/" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition flex items-center gap-1"><span>Магазин готовых устройств</span><ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-2">
            <div className="text-slate-900 font-bold uppercase tracking-wider text-xs">Сообщество и поддержка</div>
            <ul className="space-y-1.5">
              <li><a href="https://t.me/FAQFFB" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition flex items-center gap-1 font-semibold text-sky-700"><Send className="w-3 h-3 text-sky-500" /><span>Telegram канал FAQ FFB</span><ExternalLink className="w-3 h-3 text-sky-400" /></a></li>
              <li><a href="https://t.me/aldo_apache_7734" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition flex items-center gap-1 font-semibold text-sky-700"><Send className="w-3 h-3 text-sky-500" /><span>Telegram: @aldo_apache_7734</span><ExternalLink className="w-3 h-3 text-sky-400" /></a></li>
              <li><a href="https://discord.gg/5ZKD46zQSU" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition flex items-center gap-1"><span>Discord сервер (1,000+ участников)</span><ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="https://github.com/ffbeast" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition flex items-center gap-1"><span>GitHub репозитории</span><ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="https://ffbeast.gvl224.com/" target="_blank" rel="noreferrer" className="hover:text-sky-600 transition flex items-center gap-1"><span>Кастомные ручки GVL224</span><ExternalLink className="w-3 h-3 text-slate-400" /></a></li>
              <li><a href="mailto:ffbeast.devices@gmail.com" className="hover:text-sky-600 transition flex items-center gap-1"><Mail className="w-3 h-3 text-slate-400" /><span>ffbeast.devices@gmail.com</span></a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-2">
            <div className="text-slate-900 font-bold uppercase tracking-wider text-xs">Лицензирование</div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Базовые прошивки и чертежи доступны для персонального некоммерческого использования. Для коммерческого производства кокпитов свяжитесь с автором проекта.
            </p>
            <div className="pt-2 text-[11px] text-slate-400 font-medium space-y-1">
              <div>© {new Date().getFullYear()} Проект FFBeast. Разработано для пилотов и симрейсеров.</div>
              <div className="text-sky-700 font-bold">
                Сделано и разработано by{' '}
                <a 
                  href="https://t.me/aldo_apache_7734" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:underline font-extrabold text-sky-800"
                >
                  Aldo_Apache_7734
                </a>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <a
              href="https://t.me/aldo_apache_7734"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 border border-sky-200 text-slate-800 font-bold text-xs shadow-xs hover:bg-sky-100 transition cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
              <span>Сделано и разработано by <span className="text-sky-700 font-extrabold underline decoration-sky-300">Aldo_Apache_7734</span></span>
              <ExternalLink className="w-3 h-3 text-sky-500" />
            </a>
          </div>
          <div className="flex items-center gap-1 text-slate-500 font-medium">
            <span>Электроника:</span>
            <span className="text-sky-700 font-mono font-bold">ODrive DSP FOC & BLDC</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
