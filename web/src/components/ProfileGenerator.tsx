import React, { useState, useMemo, useEffect } from 'react';
import { 
  AIRCRAFT_DATABASE, 
  EFFECT_DEFINITIONS,
  getDefaultEffectsForAircraft,
  generateFFBeastProfile, 
  triggerDownload, 
  MOTOR_RATINGS 
} from '../lib/profileEngine';
import type { ProfileResult } from '../lib/profileEngine';
import type { 
  HardwareRevision, 
  MotorType, 
  PageRoute, 
  EffectGroup, 
  EffectId, 
  SelectedEffectsMap,
  AircraftPreset,
  FlightStyle
} from '../types';
import { 
  Download, 
  Copy, 
  Check, 
  Plane, 
  ShieldAlert, 
  ShieldCheck, 
  Layers, 
  Sliders, 
  Info,
  Search,
  ArrowLeft,
  Crosshair,
  Sparkles,
  RotateCcw,
  CheckSquare,
  Square,
  Activity,
  Wrench,
  CheckCircle2,
  Compass,
  Gauge,
  Shield,
  ZapOff,
  Wind,
  BookOpen,
  Cpu,
  FileText
} from 'lucide-react';
import confetti from 'canvas-confetti';

const UNIVERSAL_ARCHETYPES = [
  {
    id: 'universal-heavy-jet',
    name: 'Тяжелый бустерный джет',
    subtext: 'Су-27 / Су-33 / F-15 / МиГ-29',
    icon: '⚡',
    pitchKg: '14.5 кгс',
    pedalKg: '20.0 кгс',
    badge: 'Эталон'
  },
  {
    id: 'universal-fbw-jet',
    name: 'Цифровой Fly-By-Wire',
    subtext: 'F/A-18C / F-16C / Mirage 2000',
    icon: '💻',
    pitchKg: '12.5 кгс',
    pedalKg: '16.5 кгс',
    badge: 'Эталон'
  },
  {
    id: 'universal-prop-warbird',
    name: 'Поршневой Warbird WWII',
    subtext: 'P-51D / Bf 109 / Spitfire / Fw 190',
    icon: '🛩️',
    pitchKg: '21.0 кгс',
    pedalKg: '28.0 кгс',
    badge: 'Эталон'
  },
  {
    id: 'universal-helicopter',
    name: 'Вертолет (Force Trim)',
    subtext: 'Ми-8 / UH-1H / AH-64 / Ка-50',
    icon: '🚁',
    pitchKg: '3.8 кгс',
    pedalKg: '5.0 кгс',
    badge: 'Эталон'
  }
];

export const JUSTFLY_AIRCRAFT_MAP: Record<string, { file: string; title: string; note: string }> = {
  'dcs-su-27': {
    file: './profiles/DCS_Su_27_From_JustFlyIt.json',
    title: 'Su-27 Flanker',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для Су-27'
  },
  'dcs-mig-29s': {
    file: './profiles/DCS_MiG_29_From_JustFlyIt.json',
    title: 'MiG-29S Fulcrum',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для МиГ-29'
  },
  'dcs-fa-18c': {
    file: './profiles/DCS_FA_18C_From_JustFlyIt.json',
    title: 'F/A-18C Hornet',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для F/A-18C'
  },
  'dcs-f-5e': {
    file: './profiles/DCS_F_5E_From_JustFlyIt.json',
    title: 'F-5E Tiger II',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для F-5E'
  },
  'dcs-mi-8': {
    file: './profiles/DCS_Mi_8_From_JustFlyIt.json',
    title: 'Ми-8МТВ2',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для Ми-8'
  },
  'dcs-mi-24p': {
    file: './profiles/DCS_Mi_24_From_JustFlyIt.json',
    title: 'Ми-24П Hind',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для Ми-24П'
  },
  'dcs-uh-1h': {
    file: './profiles/DCS_UH_1_From_JustFlyIt.json',
    title: 'UH-1H Huey',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для UH-1H'
  },
  'dcs-spitfire-ix': {
    file: './profiles/DCS_Spitfire_From_JustFlyIt.json',
    title: 'Spitfire LF Mk IX',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для Спитфайра'
  },
  'dcs-p-47d': {
    file: './profiles/DCS_P_47D_From_JustFlyIt.json',
    title: 'P-47D-30 Thunderbolt',
    note: 'Оригинальный профиль JustFly (Максим Савельев) для P-47D'
  },
  'dcs-f-14b': {
    file: './profiles/DCS_F_14_From_FFBeast.json',
    title: 'F-14 Tomcat',
    note: 'Официальный эталонный профиль FFBeast Community'
  },
  'dcs-f-16c': {
    file: './profiles/DCS_F_16C_From_FFBeast.json',
    title: 'F-16C Viper',
    note: 'Официальный эталонный профиль FFBeast Community'
  }
};

interface ProfileGeneratorProps {
  onNavigate?: (route: PageRoute) => void;
}

export const ProfileGenerator: React.FC<ProfileGeneratorProps> = ({ onNavigate }) => {
  // Selection states (Default to regular aircraft, archetypes can be toggled on/off)
  const [selectedAircraftId, setSelectedAircraftId] = useState<string>('dcs-su-27');
  const [lastRegularAircraftId, setLastRegularAircraftId] = useState<string>('dcs-su-27');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [simFilter, setSimFilter] = useState<'all' | 'justfly' | 'DCS World' | 'War Thunder' | 'helicopters' | 'props'>('all');
  const [revision, setRevision] = useState<HardwareRevision>('V5');
  const [extensionMm, setExtensionMm] = useState<number>(100);
  const [maxForceKg, setMaxForceKg] = useState<number>(14.5);
  const [motorType, setMotorType] = useState<MotorType>('hoverboard_30mm');
  const [copied, setCopied] = useState<boolean>(false);

  // Flight Style: Реалистичный (100% сил РЛЭ), Казуал (50% мягкости), Пилотажник (минимум сил ~2.0 кг и 0 вибраций)
  const [flightStyle, setFlightStyle] = useState<FlightStyle>('hardcore');

  // Active effect group tab for filtering the checklist
  const [activeEffectTab, setActiveEffectTab] = useState<'all' | EffectGroup>('all');

  // Find currently selected aircraft preset
  const selectedAircraft = useMemo<AircraftPreset>(() => {
    return AIRCRAFT_DATABASE.find(a => a.id === selectedAircraftId) || AIRCRAFT_DATABASE[0];
  }, [selectedAircraftId]);

  // Selected effects state (initialized with intelligent defaults for selected aircraft)
  const [selectedEffects, setSelectedEffects] = useState<SelectedEffectsMap>(() => {
    const initialAircraft = AIRCRAFT_DATABASE.find(a => a.id === 'dcs-su-27') || AIRCRAFT_DATABASE[0];
    return getDefaultEffectsForAircraft(initialAircraft);
  });

  // Track whether profile has been generated or settings modified since last generation
  const [hasGenerated, setHasGenerated] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [generatedProfile, setGeneratedProfile] = useState<ProfileResult | null>(null);

  // Update default effects when aircraft selection changes
  const handleSelectAircraft = (ac: AircraftPreset) => {
    setSelectedAircraftId(ac.id);
    if (!ac.id.startsWith('universal-')) {
      setLastRegularAircraftId(ac.id);
    }
    setSearchQuery('');
    const newDefaults = getDefaultEffectsForAircraft(ac);
    setSelectedEffects(newDefaults);
    if (ac.rlePitchForceKg) {
      setMaxForceKg(ac.rlePitchForceKg);
    }
    setIsDirty(true);
  };

  // Toggle universal archetype (select or deselect back to regular aircraft)
  const handleToggleArchetype = (archId: string) => {
    if (selectedAircraftId === archId) {
      // Deselect! Revert to last regular aircraft
      const fallback = AIRCRAFT_DATABASE.find(a => a.id === lastRegularAircraftId && !a.id.startsWith('universal-'))
        || AIRCRAFT_DATABASE.find(a => a.id === 'dcs-su-27')
        || AIRCRAFT_DATABASE.find(a => a.id === 'dcs-f-15c')
        || AIRCRAFT_DATABASE[0];
      if (fallback) {
        handleSelectAircraft(fallback);
      }
    } else {
      const target = AIRCRAFT_DATABASE.find(a => a.id === archId);
      if (target) {
        handleSelectAircraft(target);
      }
    }
  };

  // Filtered aircraft list with comprehensive search
  const filteredAircraft = useMemo(() => {
    return AIRCRAFT_DATABASE.filter(ac => {
      // Filter by category or sim
      if (simFilter === 'justfly' && !JUSTFLY_AIRCRAFT_MAP[ac.id]) return false;
      if (simFilter === 'DCS World' && ac.simName !== 'DCS World') return false;
      if (simFilter === 'War Thunder' && ac.simName !== 'War Thunder') return false;
      if (simFilter === 'helicopters' && !ac.isHelicopter && ac.category !== 'helicopter') return false;
      if (simFilter === 'props' && ac.category !== 'prop_warbird') return false;

      // Filter by search query (checks name, module code, id and description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        return (
          ac.name.toLowerCase().includes(q) ||
          ac.moduleCode.toLowerCase().includes(q) ||
          ac.id.toLowerCase().includes(q) ||
          ac.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [simFilter, searchQuery]);

  // Effects count calculations
  const enabledCount = useMemo(() => {
    return Object.values(selectedEffects).filter(Boolean).length;
  }, [selectedEffects]);

  // Filtered effect definitions based on category tab
  const visibleEffects = useMemo(() => {
    if (activeEffectTab === 'all') return EFFECT_DEFINITIONS;
    return EFFECT_DEFINITIONS.filter(def => def.group === activeEffectTab);
  }, [activeEffectTab]);

  // Effect toggle handler
  const handleToggleEffect = (id: EffectId) => {
    setSelectedEffects(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    setIsDirty(true);
  };

  // Batch effect controls
  const handleSelectAllEffects = () => {
    const next: Partial<SelectedEffectsMap> = {};
    for (const def of EFFECT_DEFINITIONS) {
      next[def.id] = true;
    }
    setSelectedEffects(next as SelectedEffectsMap);
    setIsDirty(true);
  };

  const handleDeselectAllEffects = () => {
    const next: Partial<SelectedEffectsMap> = {};
    for (const def of EFFECT_DEFINITIONS) {
      next[def.id] = false;
    }
    setSelectedEffects(next as SelectedEffectsMap);
    setIsDirty(true);
  };

  const handleResetToDefaults = () => {
    const defaults = getDefaultEffectsForAircraft(selectedAircraft);
    setSelectedEffects(defaults);
    setIsDirty(true);
  };

  // Perform Generation (Action 1)
  const handleGenerate = () => {
    const query = searchQuery.trim() || selectedAircraftId;
    const result = generateFFBeastProfile({
      aircraftQuery: query,
      revision,
      extensionMm,
      maxForceKg,
      motorType,
      selectedEffects,
      flightStyle
    });
    setGeneratedProfile(result);
    setHasGenerated(true);
    setIsDirty(false);
  };

  // Auto-generate initial profile on first load so user immediately sees valid preview
  useEffect(() => {
    if (!hasGenerated) {
      handleGenerate();
    }
  }, []);

  // Active profile to display in visualizer (either generated or preview)
  const displayResult = useMemo<ProfileResult>(() => {
    if (generatedProfile && !isDirty) return generatedProfile;
    const query = searchQuery.trim() || selectedAircraftId;
    return generateFFBeastProfile({
      aircraftQuery: query,
      revision,
      extensionMm,
      maxForceKg,
      motorType,
      selectedEffects,
      flightStyle
    });
  }, [generatedProfile, isDirty, searchQuery, selectedAircraftId, revision, extensionMm, maxForceKg, motorType, selectedEffects, flightStyle]);

  // Perform Download (Action 2)
  const handleDownload = () => {
    if (!displayResult) return;
    const safeName = displayResult.aircraft.name.replace(/[^a-zA-Z0-9_-]/g, '_');
    const simPrefix = displayResult.aircraft.simName === 'War Thunder' ? 'WT' : 'DCS';
    const filename = `${simPrefix}_${safeName}_${revision}_${displayResult.effectivePitchForceKg}kg_Apache_${flightStyle}.json`;
    triggerDownload(filename, displayResult.jsonString);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.8 }
    });
  };

  // Copy JSON to clipboard
  const handleCopy = () => {
    if (!displayResult) return;
    navigator.clipboard.writeText(displayResult.jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dual-mode visualization: 'aero' (Airspeed vs Force for chosen aircraft) vs 'deflection' (mechanical S-curve -100%..+100%)
  const [graphMode, setGraphMode] = useState<'aero' | 'deflection'>('aero');

  const aeroCurve = displayResult.aircraftEffortCurve;
  const deflectionCurve = displayResult.deflectionCurve;

  const svgWidth = 480;
  const svgHeight = 220;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 22;
  const padBottom = 34;
  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  // 1. Aero points calculation (Airspeed IAS vs Effective Force)
  const aeroVMax = aeroCurve.maxSpeedKmh || 1000;
  const aeroFMax = aeroCurve.maxForceKg || 12;

  const aeroCoords = aeroCurve.points.map(pt => {
    const xRatio = Math.min(1, Math.max(0, pt.speedKmh / aeroVMax));
    const yRatio = Math.min(1, Math.max(0, pt.forceKg / aeroFMax));
    const x = padLeft + xRatio * plotW;
    const y = (svgHeight - padBottom) - yRatio * plotH;
    return { ...pt, x, y };
  });

  const aeroPolyline = aeroCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');
  const aeroAreaPoints = `${padLeft},${svgHeight - padBottom} ` +
    aeroCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ') +
    ` ${svgWidth - padRight},${svgHeight - padBottom}`;

  // 2. Deflection points calculation (-100% to +100%, -F to +F)
  const deflFMax = displayResult.effectivePitchForceKg;
  const deflCoords = deflectionCurve.map(pt => {
    const xRatio = (pt.in - (-100)) / 200;
    const yRatio = (pt.out - (-deflFMax)) / (deflFMax * 2 || 1);
    const x = padLeft + xRatio * plotW;
    const y = (svgHeight - padBottom) - yRatio * plotH;
    return { ...pt, x, y };
  });
  const deflPolyline = deflCoords.map(c => `${c.x.toFixed(1)},${c.y.toFixed(1)}`).join(' ');

  const styleLabel = flightStyle === 'hardcore' ? 'Реалистичный (100% РЛЭ)' : flightStyle === 'casual' ? 'Казуал (50% мягкости)' : 'Пилотажник (Aldo Apache Approved)';

  return (
    <div className="py-10 min-h-screen">
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
              Генератор FFB профилей (DCS World & War Thunder)
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Профессиональная калибровка усилий Real Force. Выберите самолет, настройте параметры и скачайте готовый <code className="text-sky-300 font-mono font-semibold bg-white/10 px-1.5 py-0.5 rounded border border-white/15">.json</code> для программы FFBeast Commander.
            </p>
          </div>

          {/* Quick Header Download if already generated */}
          {hasGenerated && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleDownload}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold bg-sky-600 hover:bg-sky-500 text-white shadow-lg transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Скачать .JSON ({displayResult.effectivePitchForceKg} кг)</span>
              </button>
            </div>
          )}
        </div>

        {/* Wizard Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column (Inputs, Hardware, Checkboxes, Flight Style & Generate Button) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Aircraft Selection & Filters */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4 border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Plane className="w-4 h-4 text-sky-400" />
                  <span>1. Выберите летательный аппарат</span>
                </div>
                <span className="text-[11px] font-mono font-semibold text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-lg border border-sky-400/30">
                  {selectedAircraft.simName} • {selectedAircraft.category.replace('_', ' ')}
                </span>
              </div>

              {/* Universal Archetypes Quick Selector - macOS Liquid Glass */}
              <div className="liquid-glass-subtle rounded-2xl p-4 space-y-3 border border-white/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Быстрый выбор: 4 Универсальных архетипа (Эталоны)</span>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-auto">
                    {selectedAircraftId.startsWith('universal-') && (
                      <button
                        type="button"
                        onClick={() => handleToggleArchetype(selectedAircraftId)}
                        className="text-[10px] font-semibold text-amber-200 hover:text-white bg-amber-500/30 hover:bg-amber-500/40 px-2.5 py-0.5 rounded-lg border border-amber-400/50 transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                        title="Отменить выбор архетипа и вернуться к конкретному самолету"
                      >
                        <span>✕ Сбросить выбор</span>
                      </button>
                    )}
                    <span className="text-[10px] font-mono text-slate-300 bg-white/10 px-2 py-0.5 rounded-lg border border-white/15">
                      РУС + Педали FFB
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                  {UNIVERSAL_ARCHETYPES.map(arch => {
                    const isSelected = selectedAircraftId === arch.id;
                    return (
                      <button
                        key={arch.id}
                        type="button"
                        onClick={() => handleToggleArchetype(arch.id)}
                        className={`p-3 rounded-xl border text-left transition-colors cursor-pointer flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-amber-500/20 border-amber-400 text-white shadow-lg ring-1 ring-amber-400/40'
                            : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1.5">
                            <span className="text-base">{arch.icon}</span>
                            <span
                              className={`text-[9px] font-mono px-1.5 py-0.5 rounded border ${
                                isSelected
                                  ? 'bg-amber-400/30 text-amber-200 border-amber-400/50 font-bold'
                                  : 'bg-white/10 text-slate-300 border-white/15'
                              }`}
                            >
                              {isSelected ? '✓ Выбран' : arch.badge}
                            </span>
                          </div>
                          <div className={`font-bold text-xs leading-tight ${isSelected ? 'text-amber-200' : 'text-white'}`}>
                            {arch.name}
                          </div>
                          <div className={`text-[10px] mt-0.5 line-clamp-1 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`}>
                            {arch.subtext}
                          </div>
                        </div>

                        <div className="mt-2.5 pt-2 border-t border-white/10 flex flex-col gap-1">
                          <div className="text-[10px] font-mono flex items-center justify-between">
                            <span className={isSelected ? 'text-amber-300' : 'text-slate-400'}>РУС: {arch.pitchKg}</span>
                            <span className={`font-semibold ${isSelected ? 'text-white' : 'text-slate-200'}`}>Пед: {arch.pedalKg}</span>
                          </div>
                          {isSelected && (
                            <div className="text-[9px] text-amber-300 font-medium text-center pt-0.5">
                              Нажмите еще раз для отмены ✕
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Simulator Filter Tabs */}
              <div className="flex flex-wrap gap-1.5 p-1.5 rounded-2xl text-xs font-semibold liquid-glass-subtle border border-white/10">
                {[
                  { id: 'all', label: 'Все модули' },
                  { id: 'justfly', label: '🌟 JustFly (М. Савельев)' },
                  { id: 'DCS World', label: 'DCS World' },
                  { id: 'War Thunder', label: 'War Thunder' },
                  { id: 'helicopters', label: 'Вертолеты 🚁' },
                  { id: 'props', label: 'Поршневые WWII' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setSimFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-xl transition cursor-pointer ${
                      simFilter === tab.id
                        ? 'bg-white/20 text-white shadow-xs font-bold border border-white/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search input with live filter */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Поиск самолета (например: f-15, f-22, su-35, su-27, f-16, mi-24, apache...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-2xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:bg-white/10 transition"
                />
              </div>

              {/* Aircraft Grid List (Scrollable) */}
              <div className="max-h-56 overflow-y-auto pr-1 grid grid-cols-2 gap-2">
                {filteredAircraft.length > 0 ? (
                  filteredAircraft.map(ac => (
                    <button
                      key={ac.id}
                      onClick={() => handleSelectAircraft(ac)}
                      className={`text-left p-3 rounded-2xl border text-xs transition cursor-pointer ${
                        selectedAircraftId === ac.id && !searchQuery
                          ? 'bg-sky-500/20 border-sky-400 text-white font-bold shadow-lg'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="font-bold truncate text-white">{ac.name}</span>
                        {JUSTFLY_AIRCRAFT_MAP[ac.id] && (
                          <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30 shrink-0">
                            JustFly
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5 flex items-center justify-between">
                        <span>{ac.simName}</span>
                        <span className="font-mono text-sky-400 font-semibold">{ac.vMaxKmh} км/ч</span>
                      </div>
                    </button>
                  ))
                ) : (
                  <div className="col-span-2 text-center py-6 text-xs text-slate-400 bg-white/5 rounded-2xl border border-dashed border-white/15">
                    <Crosshair className="w-6 h-6 mx-auto text-slate-400 mb-1" />
                    <div>Не найдено точного совпадения в базе.</div>
                    <div className="text-[11px] text-sky-300 font-bold mt-1">
                      Будет автоматически сгенерирован умный профиль для: «{searchQuery}»
                    </div>
                  </div>
                )}
              </div>

              {/* Module Description card */}
              <div className="text-xs text-slate-300 liquid-glass-subtle p-3.5 rounded-2xl border border-white/10 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{selectedAircraft.name}</span>
                    <span className="text-[11px] text-sky-300 font-mono font-bold bg-white/10 px-2 py-0.5 rounded border border-white/15">
                      Module: {selectedAircraft.moduleCode}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-slate-300 leading-snug">
                    {selectedAircraft.description}
                  </p>
                </div>
              </div>

              {/* Engineering RLE Passport Card - Liquid Glass */}
              <div className="liquid-glass rounded-2xl p-4 sm:p-5 space-y-3.5 border border-white/15">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-2.5">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-sky-400" />
                    <span className="text-xs font-bold text-white">
                      Инженерный паспорт ЛА (РЛЭ / NATOPS / ТО)
                    </span>
                  </div>
                  {selectedAircraft.controlArchitecture && (
                    <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                      {selectedAircraft.controlArchitecture === 'mechanical' && 'Прямая механика'}
                      {selectedAircraft.controlArchitecture === 'hydromechanical_boosted' && 'Бустерная гидравлика'}
                      {selectedAircraft.controlArchitecture === 'fly_by_wire' && 'ЭДСУ / Fly-By-Wire'}
                      {selectedAircraft.controlArchitecture === 'helicopter_force_trim' && 'Вертолетная (Force Trim)'}
                    </span>
                  )}
                </div>

                {/* Real RLE Document Source */}
                {selectedAircraft.rleDocument && (
                  <div className="text-[11px] text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10 flex items-start gap-2.5 shadow-2xs">
                    <FileText className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-slate-400 font-medium block text-[10px]">Документация и первоисточник:</span>
                      <strong className="text-white font-semibold">{selectedAircraft.rleDocument}</strong>
                    </div>
                  </div>
                )}

                {/* System Name */}
                {selectedAircraft.controlSystemName && (
                  <div className="text-[11px] text-slate-300 bg-white/5 p-3 rounded-xl border border-white/10 shadow-2xs leading-snug">
                    <span className="text-slate-400 font-medium text-[10px] block mb-0.5">Система управления:</span>
                    <span className="text-slate-200">{selectedAircraft.controlSystemName}</span>
                  </div>
                )}

                {/* Specs Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-0.5 text-[11px]">
                  <div className="liquid-glass-subtle p-2.5 rounded-xl border border-white/10 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Усилие РУС</span>
                    <strong className="text-emerald-400 font-mono text-xs">{selectedAircraft.rlePitchForceKg || maxForceKg} кгс</strong>
                    <span className="text-[9px] text-slate-400 block">тангаж (крен: {selectedAircraft.rleRollForceKg || (maxForceKg * 0.6).toFixed(1)} кгс)</span>
                  </div>

                  <div className="liquid-glass-subtle p-2.5 rounded-xl border border-white/10 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Педали (РН)</span>
                    <strong className="text-sky-400 font-mono text-xs">
                      {selectedAircraft.rleRudderForceKg || (selectedAircraft.isHelicopter ? 5.0 : Math.round((selectedAircraft.rlePitchForceKg || maxForceKg) * 1.4 * 10) / 10)} кгс
                    </strong>
                    <span className="text-[9px] text-slate-400 block">путевой канал (yaw)</span>
                  </div>

                  <div className="liquid-glass-subtle p-2.5 rounded-xl border border-white/10 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Градиент / Ход</span>
                    <strong className="text-amber-400 font-mono text-xs truncate block">{selectedAircraft.rleGGradient || '2.5 – 3.5 кгс/G'}</strong>
                    <span className="text-[9px] text-slate-400 block truncate">{selectedAircraft.rleStickTravel || 'Стандарт'}</span>
                  </div>

                  <div className="liquid-glass-subtle p-2.5 rounded-xl border border-white/10 shadow-2xs">
                    <span className="text-[10px] text-slate-400 block">Бафтинг (срыв)</span>
                    <strong className="text-red-400 font-mono text-xs">α ≥ {selectedAircraft.aoaBuffetOnsetDeg || (selectedAircraft.aoaStallDeg * 0.8).toFixed(1)}°</strong>
                    <span className="text-[9px] text-slate-400 block">сваливание {selectedAircraft.aoaStallDeg}°</span>
                  </div>
                </div>

                {/* How FFBeast Achieves 1:1 Physics */}
                {selectedAircraft.ffbEffectBreakdown && (
                  <div className="pt-3 border-t border-white/10">
                    <div className="text-[10px] font-bold text-sky-300 mb-2 flex items-center gap-1.5">
                      <Cpu className="w-3.5 h-3.5 text-sky-400" />
                      <span>Какими эффектами FFBeast воспроизводится физика 1:1:</span>
                    </div>
                    <div className="space-y-2 text-[11px] text-slate-300 bg-white/5 p-3.5 rounded-xl border border-white/10 shadow-2xs">
                      <div className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold shrink-0">⚙️ Пружины:</span>
                        <span className="text-slate-300">{selectedAircraft.ffbEffectBreakdown.pitchSpringEffect}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold shrink-0">💧 Демпферы:</span>
                        <span className="text-slate-300">{selectedAircraft.ffbEffectBreakdown.dampeningEffect}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold shrink-0">🎚️ Триммер:</span>
                        <span className="text-slate-300">{selectedAircraft.ffbEffectBreakdown.trimEffect}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold shrink-0">⚡ Шейкеры:</span>
                        <span className="text-slate-300">{selectedAircraft.ffbEffectBreakdown.shakerEffects}</span>
                      </div>
                      <div className="flex items-start gap-1.5">
                        <span className="text-sky-400 font-mono font-bold shrink-0">💥 Импульсы:</span>
                        <span className="text-slate-300">{selectedAircraft.ffbEffectBreakdown.joltsEffects}</span>
                      </div>
                      {selectedAircraft.ffbEffectBreakdown.rudderPedalEffect && (
                        <div className="flex items-start gap-1.5 pt-2 border-t border-white/10">
                          <span className="text-emerald-400 font-mono font-bold shrink-0">🦶 Педали FFB:</span>
                          <span className="text-emerald-300 font-medium">{selectedAircraft.ffbEffectBreakdown.rudderPedalEffect}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Step 2: Hardware Mechanics */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4 border border-white/15 shadow-2xl">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <Layers className="w-4 h-4 text-amber-400" />
                <span>2. Механика и конфигурация вашего джойстика</span>
              </div>

              {/* Revision Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Ревизия механической базы:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['V5', 'V4', 'DirectDrive'] as HardwareRevision[]).map(rev => (
                    <button
                      key={rev}
                      onClick={() => {
                        setRevision(rev);
                        setIsDirty(true);
                      }}
                      className={`py-2 px-3 rounded-xl border text-xs font-mono font-bold transition-colors cursor-pointer ${
                        revision === rev
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 shadow-lg ring-1 ring-amber-400/40'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {rev === 'V5' ? 'V5 (Редуктор 3:1)' : rev === 'V4' ? 'V4 (Редуктор 3:1)' : 'Direct Drive (1:1)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stick Extension Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Длина удлинителя ручки (кронштейна):
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { mm: 0, label: '0 мм (Без удл.)' },
                    { mm: 75, label: '+75 мм' },
                    { mm: 100, label: '+100 мм' },
                    { mm: 200, label: '+200 мм (Пол)' }
                  ].map(ext => (
                    <button
                      key={ext.mm}
                      onClick={() => {
                        setExtensionMm(ext.mm);
                        setIsDirty(true);
                      }}
                      className={`py-2 px-1 rounded-xl border text-xs transition-colors text-center cursor-pointer ${
                        extensionMm === ext.mm
                          ? 'bg-amber-500/20 border-amber-400 text-amber-300 font-bold shadow-lg ring-1 ring-amber-400/40'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10'
                      }`}
                    >
                      {ext.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Motor Model Selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Установленный тип мотора:
                </label>
                <select
                  value={motorType}
                  onChange={(e) => {
                    setMotorType(e.target.value as MotorType);
                    setIsDirty(true);
                  }}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono font-medium"
                >
                  {Object.entries(MOTOR_RATINGS).map(([key, val]) => (
                    <option key={key} value={key} className="bg-slate-900 text-white">
                      {val.name} (Пиковый крутящий момент ~{val.maxTorqueNm} Нм)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Step 3: Base Maximum Effort Slider */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4 border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Sliders className="w-4 h-4 text-emerald-400" />
                  <span>3. Базовый уровень максимальных сил (потенциал базы)</span>
                </div>
                <div className="text-xl font-bold font-mono text-emerald-400">
                  {maxForceKg.toFixed(1)} кг
                </div>
              </div>

              <input
                type="range"
                min="2.0"
                max="12.0"
                step="0.5"
                value={maxForceKg}
                onChange={(e) => {
                  setMaxForceKg(parseFloat(e.target.value));
                  setIsDirty(true);
                }}
                className="w-full accent-emerald-400 cursor-pointer h-2 bg-white/10 rounded-lg"
              />

              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>2.0 кг (Гражданский)</span>
                <span>6.0 кг (Стандартный истребитель)</span>
                <span>12.0 кг (Максимальный штурвал)</span>
              </div>
            </div>

            {/* Step 4: Effect Selection Checkboxes (All Effects from instruction.pdf) */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4 border border-white/15 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Activity className="w-4 h-4 text-sky-400" />
                  <span>4. Выбор активных эффектов (инструкция FFBeast)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full border border-sky-400/30">
                    {enabledCount} из {EFFECT_DEFINITIONS.length} активно
                  </span>
                </div>
              </div>

              {/* Quick action buttons */}
              <div className="flex items-center justify-between flex-wrap gap-2 pt-1 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSelectAllEffects}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Выбрать все
                  </button>
                  <button
                    onClick={handleDeselectAllEffects}
                    className="text-[11px] font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                  >
                    Снять все
                  </button>
                </div>
                <button
                  onClick={handleResetToDefaults}
                  className="inline-flex items-center gap-1.5 text-[11px] font-bold text-sky-300 hover:text-white bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/30 px-2.5 py-1 rounded-lg transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Сбросить к рекомендуемым</span>
                </button>
              </div>

              {/* Category tabs */}
              <div className="flex flex-wrap gap-1 liquid-glass-subtle p-1 rounded-xl text-[11px] font-semibold border border-white/10">
                {[
                  { id: 'all', label: 'Все эффекты' },
                  { id: 'springs', label: 'Пружины' },
                  { id: 'hydraulics', label: 'Демпфер и триммер' },
                  { id: 'shakers', label: 'Шейкеры и вибро' },
                  { id: 'jolts', label: 'Толчки (Jolts)' },
                  { id: 'directx', label: 'DirectX FFB' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveEffectTab(tab.id as any)}
                    className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer ${
                      activeEffectTab === tab.id
                        ? 'bg-white/20 text-white shadow-xs font-bold border border-white/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Scrollable list of effect checkboxes */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {visibleEffects.map(def => {
                  const isChecked = !!selectedEffects[def.id];
                  return (
                    <div
                      key={def.id}
                      onClick={() => handleToggleEffect(def.id)}
                      className={`p-3 rounded-2xl border transition-colors cursor-pointer flex items-start gap-3 ${
                        isChecked
                          ? 'bg-sky-500/15 border-sky-400/40 shadow-sm'
                          : 'bg-white/5 border-white/10 opacity-70 hover:opacity-100 hover:bg-white/10'
                      }`}
                    >
                      <button
                        type="button"
                        className="mt-0.5 text-sky-400 focus:outline-none"
                      >
                        {isChecked ? (
                          <CheckSquare className="w-4 h-4 text-sky-400" />
                        ) : (
                          <Square className="w-4 h-4 text-slate-500" />
                        )}
                      </button>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`text-xs font-bold ${isChecked ? 'text-white' : 'text-slate-300'}`}>
                            {def.name}
                          </span>
                          <span className="text-[10px] font-mono text-slate-400 bg-white/10 border border-white/15 px-1.5 py-0.5 rounded">
                            {def.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                          {def.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 5: Как вы будете летать? (Стиль пилотирования и сил) */}
            <div className="liquid-glass rounded-3xl p-5 sm:p-6 space-y-4 border border-white/15 shadow-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-bold text-white">
                  <Compass className="w-4 h-4 text-sky-400" />
                  <span>5. Как вы будете летать? (Стиль пилотирования)</span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-300 bg-sky-500/20 px-2.5 py-0.5 rounded-full border border-sky-400/30">
                  {styleLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {/* Option 1: Реалистичный (Максимальный реализм РЛЭ) */}
                <div
                  onClick={() => {
                    setFlightStyle('hardcore');
                    setIsDirty(true);
                  }}
                  className={`p-4 rounded-2xl border transition-colors cursor-pointer flex flex-col justify-between ${
                    flightStyle === 'hardcore'
                      ? 'bg-sky-500/20 border-sky-400 text-white shadow-xl ring-1 ring-sky-400/40'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-sky-400" />
                        <span className="text-xs font-bold text-white">
                          Реалистичный
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        1:1 РЛЭ (Реализм)
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">
                      {maxForceKg.toFixed(1)} кг (1:1)
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Максимально реалистичный режим: точные усилия и поведение органов управления строго по РЛЭ и технической документации самолета. Честная аэродинамика скоростного напора, бустеров и ЭДСУ, правильный бафтинг на срывных углах атаки без искусственного выкручивания сил.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Физика:</span>
                    <strong className="text-sky-300 font-bold">1:1 по РЛЭ (Честный реализм)</strong>
                  </div>
                </div>

                {/* Option 2: Казуал (50% мягкости) */}
                <div
                  onClick={() => {
                    setFlightStyle('casual');
                    setIsDirty(true);
                  }}
                  className={`p-4 rounded-2xl border transition-colors cursor-pointer flex flex-col justify-between ${
                    flightStyle === 'casual'
                      ? 'bg-amber-500/20 border-amber-400 text-white shadow-xl ring-1 ring-amber-400/40'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Shield className="w-4 h-4 text-amber-400" />
                        <span className="text-xs font-bold text-white">
                          Казуал
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30">
                        50% мягкости
                      </span>
                    </div>
                    <div className="text-lg font-bold text-white mb-1">
                      {(maxForceKg * 0.5).toFixed(1)} кг
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Режим с 50% мягкости: усилия на ручке и педалях снижены наполовину для максимального комфорта и мягкого управления. Все аэродинамические эффекты и обратная связь сохраняются, но ощущаются плавно и без усталости рук даже при многочасовых вылетах.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Нагрузка:</span>
                    <strong className="text-amber-300 font-bold">50% мягкости</strong>
                  </div>
                </div>

                {/* Option 3: Пилотажник */}
                <div
                  onClick={() => {
                    setFlightStyle('aerobatic');
                    setIsDirty(true);
                  }}
                  className={`p-4 rounded-2xl border transition-colors cursor-pointer flex flex-col justify-between ${
                    flightStyle === 'aerobatic'
                      ? 'bg-emerald-500/20 border-emerald-400 text-white shadow-xl ring-1 ring-emerald-400/40'
                      : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <ZapOff className="w-4 h-4 text-emerald-400" />
                        <span className="text-xs font-bold text-white">
                          Пилотажник
                        </span>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        Aldo Apache Approved
                      </span>
                    </div>
                    <div className="text-lg font-bold text-emerald-400 mb-1">
                      2.0 кг
                    </div>
                    <p className="text-[11px] text-slate-300 leading-snug">
                      Специальный пилотажный режим для максимально четкого управления без армрестлинга: легкие усилия 2.0 кг и максимально минимальные вибрации (~8%) для филигранной точности траектории.
                    </p>
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center justify-between">
                    <span>Вибрации:</span>
                    <strong className="text-emerald-400 font-bold">~8% Минимальные</strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 6: Primary Action - Сгенерировать профиль & Скачать */}
            <div className="liquid-glass-dark rounded-3xl p-6 border border-sky-400/30 text-white space-y-4 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-sky-300" />
                    <h3 className="text-base font-bold text-white">Шаг 6: Генерация профиля</h3>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">
                    Рассчитает кинематику под усилие <strong className="text-white font-mono">{displayResult.effectivePitchForceKg} кг</strong> ({styleLabel}), применит Smart Damper и подготовит профиль к выгрузке.
                  </p>
                </div>

                <button
                  onClick={handleGenerate}
                  className="px-6 py-3.5 rounded-2xl bg-white text-slate-950 hover:bg-slate-100 font-bold text-sm shadow-lg transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-sky-700" />
                  <span>{hasGenerated && !isDirty ? 'Сгенерировать заново' : 'Сгенерировать профиль'}</span>
                </button>
              </div>

              {/* Кнопка "Скачать" появляется сразу ПОСЛЕ генерации */}
              {hasGenerated && !isDirty && (
                <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white/5 p-4 rounded-2xl transition-colors">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>Профиль успешно сгенерирован и откалиброван!</span>
                    </div>
                    <div className="text-[11px] text-slate-300 mt-0.5">
                      Файл готов к загрузке в папку <code className="bg-black/50 px-1 py-0.5 rounded text-sky-300 font-mono">effect_profiles/</code> программы FFBeast Commander.
                    </div>
                  </div>

                  <button
                    onClick={handleDownload}
                    className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm shadow-xl shadow-emerald-950/40 transition-colors cursor-pointer shrink-0 flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>Скачать .JSON профиль ({displayResult.effectivePitchForceKg} кг)</span>
                  </button>
                </div>
              )}

              {isDirty && hasGenerated && (
                <div className="text-[11px] text-amber-300 flex items-center gap-1.5 pt-1">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Параметры были изменены. Нажмите «Сгенерировать профиль», чтобы обновить JSON перед скачиванием.</span>
                </div>
              )}
            </div>

          </div>

          {/* Right Column (Visualizer, Download Button & Concise Summary) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Status / Download Primary Card */}
            <div className="liquid-glass-mac rounded-3xl p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 block tracking-wide uppercase">
                    Результат калибровки
                  </span>
                  <div className="text-lg font-bold text-white mt-0.5 tracking-tight">
                    {displayResult.aircraft.name}
                  </div>
                </div>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 mac-led-green" />
                  <span>Real Force FFB</span>
                </span>
              </div>

              {/* Big Download Button */}
              <button
                onClick={() => {
                  if (isDirty) {
                    handleGenerate();
                  }
                  handleDownload();
                }}
                className="w-full flex items-center justify-center gap-2.5 py-4 px-5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm shadow-[0_10px_25px_-5px_rgba(16,185,129,0.35)] transition-all cursor-pointer active:scale-[0.99]"
              >
                <Download className="w-5 h-5" />
                <span>Скачать .JSON профиль ({displayResult.effectivePitchForceKg} кг)</span>
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs font-mono">
                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Тангаж</span>
                  <strong className="text-white text-sm">{displayResult.effectivePitchForceKg} кг</strong>
                </div>
                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Крен</span>
                  <strong className="text-white text-sm">{displayResult.effectiveRollForceKg} кг</strong>
                </div>
                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Педали</span>
                  <strong className="text-cyan-300 text-sm">{displayResult.effectiveRudderForceKg} кг</strong>
                </div>
                <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                  <span className="text-[10px] text-slate-400 block mb-0.5">Стиль</span>
                  <strong className="text-white text-xs truncate block">{flightStyle === 'hardcore' ? 'Реалистичный' : flightStyle === 'casual' ? 'Казуал (50%)' : 'Пилотажник'}</strong>
                </div>
              </div>

              {/* Safety load warning */}
              <div className={`p-3.5 rounded-2xl border flex items-start gap-2.5 text-xs ${
                displayResult.isSafe 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-200' 
                  : 'bg-rose-500/10 border-rose-500/30 text-rose-200'
              }`}>
                {displayResult.isSafe ? (
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="font-semibold text-slate-200">
                    Момент мотора: {displayResult.requiredTorqueNm} Нм / {displayResult.maxMotorTorqueNm} Нм (Безопасный режим)
                  </div>
                </div>
              </div>

              {/* JustFly Authentic Author Profile Card */}
              {JUSTFLY_AIRCRAFT_MAP[displayResult.aircraft.id] && (
                <div className="bg-gradient-to-br from-cyan-950/40 via-sky-950/30 to-slate-900/60 border border-cyan-400/30 rounded-2xl p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Калибровка JustFly (Максим Савельев)</span>
                    </span>
                    <span className="text-[10px] font-mono text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded-full border border-cyan-400/30 font-semibold">
                      Реальный пилот
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Для этого борта доступен оригинальный профиль от Максима Савельева (JustFlyIt) с реальной летной кинематикой без искусственной аркадной тряски.
                  </p>
                  <a
                    href={JUSTFLY_AIRCRAFT_MAP[displayResult.aircraft.id].file}
                    download
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md transition-all cursor-pointer active:scale-[0.98]"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать оригинальный .JSON от JustFly</span>
                  </a>
                </div>
              )}
            </div>

            {/* Dynamic Aircraft Effort Visualizer */}
            <div className="liquid-glass-mac rounded-3xl p-6 space-y-4">
              
              {/* Mode switch tabs & Header */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 mac-led-cyan" />
                    <span className="text-sm font-bold text-white">
                      {graphMode === 'aero' ? aeroCurve.title : 'Механическая S-кривая FFB отклика'}
                    </span>
                  </div>

                  <span className="text-[11px] font-mono text-cyan-300 font-bold bg-cyan-500/15 px-2.5 py-1 rounded-xl border border-cyan-500/30 shrink-0 self-start sm:self-auto">
                    Тангаж: ±{displayResult.effectivePitchForceKg} кг
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <p className="text-[11px] text-slate-400">
                    {graphMode === 'aero' 
                      ? aeroCurve.subtitle 
                      : 'Околонулевой упор (Detent ±2.97%) и прогрессия к упорам'}
                  </p>

                  {/* Dual Mode Switcher */}
                  <div className="flex items-center gap-1 p-1 bg-white/[0.04] border border-white/10 rounded-2xl shrink-0">
                    <button
                      type="button"
                      onClick={() => setGraphMode('aero')}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        graphMode === 'aero'
                          ? 'bg-white/20 text-white shadow-xs border border-white/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Wind className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Скоростной напор</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setGraphMode('deflection')}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                        graphMode === 'deflection'
                          ? 'bg-white/20 text-white shadow-xs border border-white/30'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <Activity className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Ход ручки</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* SVG Canvas */}
              <div className="bg-[#050912]/90 rounded-2xl p-4 shadow-inner relative overflow-hidden border border-white/10">
                <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-56 overflow-visible">
                  <defs>
                    <linearGradient id="aeroGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#0284C7" stopOpacity="0.03" />
                    </linearGradient>
                  </defs>

                  {graphMode === 'aero' ? (
                    <>
                      {/* Horizontal grid lines */}
                      {[0.25, 0.5, 0.75, 1.0].map(ratio => {
                        const y = (svgHeight - padBottom) - ratio * plotH;
                        return (
                          <line key={`h-${ratio}`} x1={padLeft} y1={y} x2={svgWidth - padRight} y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                        );
                      })}
                      {/* Vertical grid lines */}
                      {[0.25, 0.5, 0.75, 1.0].map(ratio => {
                        const x = padLeft + ratio * plotW;
                        return (
                          <line key={`v-${ratio}`} x1={x} y1={padTop} x2={x} y2={svgHeight - padBottom} stroke="#1E293B" strokeDasharray="3 3" />
                        );
                      })}

                      {/* Axes lines */}
                      <line x1={padLeft} y1={padTop} x2={padLeft} y2={svgHeight - padBottom} stroke="#475569" strokeWidth="1.5" />
                      <line x1={padLeft} y1={svgHeight - padBottom} x2={svgWidth - padRight} y2={svgHeight - padBottom} stroke="#475569" strokeWidth="1.5" />

                      {/* Y-axis ticks */}
                      <text x={padLeft - 8} y={padTop + 4} fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                        {aeroFMax.toFixed(1)} кг
                      </text>
                      <text x={padLeft - 8} y={(svgHeight - padBottom) - 0.5 * plotH + 4} fill="#94A3B8" fontSize="9" textAnchor="end" fontFamily="monospace">
                        {(aeroFMax * 0.5).toFixed(1)}
                      </text>
                      <text x={padLeft - 8} y={svgHeight - padBottom + 3} fill="#64748B" fontSize="9" textAnchor="end" fontFamily="monospace">
                        0
                      </text>

                      {/* X-axis ticks */}
                      <text x={padLeft} y={svgHeight - 12} fill="#64748B" fontSize="9" textAnchor="start" fontFamily="monospace">
                        0 км/ч
                      </text>
                      <text x={padLeft + 0.33 * plotW} y={svgHeight - 12} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        {Math.round(aeroVMax * 0.33)}
                      </text>
                      <text x={padLeft + 0.66 * plotW} y={svgHeight - 12} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        {Math.round(aeroVMax * 0.66)}
                      </text>
                      <text x={svgWidth - padRight} y={svgHeight - 12} fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="end" fontFamily="monospace">
                        {aeroVMax} км/ч
                      </text>

                      {/* Curve Area Fill */}
                      <polygon points={aeroAreaPoints} fill="url(#aeroGradient)" />

                      {/* Curve Polyline */}
                      <polyline
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={aeroPolyline}
                      />

                      {/* Data points */}
                      {aeroCoords.map((pt, idx) => (
                        <circle
                          key={idx}
                          cx={pt.x}
                          cy={pt.y}
                          r="3.5"
                          fill="#0284C7"
                          stroke="#BAE6FD"
                          strokeWidth="1.5"
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {/* Deflection crosshair and grid */}
                      <line x1={padLeft} y1={padTop} x2={svgWidth - padRight} y2={padTop} stroke="#1E293B" strokeDasharray="3 3" />
                      <line x1={padLeft} y1={svgHeight / 2} x2={svgWidth - padRight} y2={svgHeight / 2} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1={svgWidth / 2} y1={padTop} x2={svgWidth / 2} y2={svgHeight - padBottom} stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                      <line x1={padLeft} y1={svgHeight - padBottom} x2={svgWidth - padRight} y2={svgHeight - padBottom} stroke="#1E293B" strokeDasharray="3 3" />

                      {/* Outer axes */}
                      <line x1={padLeft} y1={padTop} x2={padLeft} y2={svgHeight - padBottom} stroke="#475569" strokeWidth="1.5" />
                      <line x1={padLeft} y1={svgHeight / 2} x2={svgWidth - padRight} y2={svgHeight / 2} stroke="#475569" strokeWidth="1.5" />

                      {/* Axis labels */}
                      <text x={svgWidth - padRight} y={svgHeight / 2 - 8} fill="#94A3B8" fontSize="10" textAnchor="end" fontFamily="monospace">
                        Ход (+100%)
                      </text>
                      <text x={padLeft + 6} y={svgHeight / 2 - 8} fill="#94A3B8" fontSize="10" textAnchor="start" fontFamily="monospace">
                        (-100%)
                      </text>
                      <text x={svgWidth / 2 + 8} y={padTop + 12} fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="monospace">
                        +{deflFMax} кг
                      </text>
                      <text x={svgWidth / 2 + 8} y={svgHeight - padBottom - 6} fill="#38BDF8" fontSize="10" fontWeight="bold" textAnchor="start" fontFamily="monospace">
                        -{deflFMax} кг
                      </text>

                      {/* Polyline S-Curve */}
                      <polyline
                        fill="none"
                        stroke="#38BDF8"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        points={deflPolyline}
                      />

                      {/* Curve point markers */}
                      {deflCoords.map((pt, idx) => (
                        <circle
                          key={idx}
                          cx={pt.x}
                          cy={pt.y}
                          r="3.5"
                          fill="#0284C7"
                          stroke="#BAE6FD"
                          strokeWidth="1.5"
                        />
                      ))}
                    </>
                  )}
                </svg>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] text-slate-300 font-mono mt-2 pt-2 border-t border-white/10">
                  <span>
                    {graphMode === 'aero' ? (
                      <>Обдув / Статика: <strong className="text-cyan-300">{aeroCoords[0]?.forceKg} кг</strong></>
                    ) : (
                      <>Detent упор: <strong className="text-cyan-300">±{(deflFMax * 0.086).toFixed(2)} кг</strong></>
                    )}
                  </span>
                  <span>Smart Damper: <strong className="text-amber-300">{displayResult.damperValue}%</strong></span>
                  <span>Пик: <strong className="text-emerald-300">{displayResult.effectivePitchForceKg} кг</strong></span>
                </div>
              </div>

              {/* Key Milestones on Flight Envelope */}
              {graphMode === 'aero' && (
                <div className="space-y-2 pt-1">
                  <div className="flex items-center justify-between text-xs font-bold text-white">
                    <div className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Поведение джойстика на режимах полета ({displayResult.aircraft.name}):</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {aeroCurve.keyMarkers.map((marker, idx) => (
                      <div key={idx} className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                            <span className="flex items-center gap-1">
                              <span>{marker.icon}</span>
                              <span className="font-semibold text-slate-300 truncate">{marker.phase}</span>
                            </span>
                            <span className="font-mono text-cyan-300 font-bold shrink-0">{marker.speed}</span>
                          </div>
                          <div className="text-sm font-bold text-white font-mono">
                            {marker.force}
                          </div>
                        </div>
                        <div className="text-[10px] text-slate-400 leading-tight mt-1.5 pt-1.5 border-t border-white/10 truncate" title={marker.note}>
                          {marker.note}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Краткая сводка эффектов */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                  <Gauge className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Краткая сводка эффектов профиля:</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                    <span className="text-slate-400 block text-[10px] mb-0.5">Центрирование:</span>
                    <strong className="text-slate-200">
                      S-кривая (±{displayResult.effectivePitchForceKg} кг)
                    </strong>
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                    <span className="text-slate-400 block text-[10px] mb-0.5">Гидравлика:</span>
                    <strong className="text-slate-200">
                      Smart Damper ({displayResult.damperValue}% динам.)
                    </strong>
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                    <span className="text-slate-400 block text-[10px] mb-0.5">Вибрации на ручке:</span>
                    {flightStyle === 'aerobatic' ? (
                      <strong className="text-emerald-400 flex items-center gap-1">
                        <ZapOff className="w-3 h-3" />
                        Отключены (Пилотаж)
                      </strong>
                    ) : (
                      <strong className="text-slate-200">
                        {displayResult.activeShakersCount} активных шейкеров
                      </strong>
                    )}
                  </div>

                  <div className="bg-white/[0.04] border border-white/10 p-3 rounded-2xl">
                    <span className="text-slate-400 block text-[10px] mb-0.5">Импульсы (Jolts):</span>
                    <strong className="text-slate-200">
                      {displayResult.activeJoltsCount} активных толчков
                    </strong>
                  </div>
                </div>
              </div>

              {/* Active Effects Pill Grid */}
              <div className="pt-2">
                <span className="text-xs font-bold text-slate-300 block mb-2">
                  Активные эффекты в JSON ({displayResult.enabledEffectsCount}):
                </span>
                <div className="flex flex-wrap gap-1.5 text-[10px] font-mono max-h-24 overflow-y-auto pr-1">
                  {EFFECT_DEFINITIONS.filter(def => !!selectedEffects[def.id]).map(def => {
                    const isMutedShaker = flightStyle === 'aerobatic' && def.group === 'shakers';
                    return (
                      <span 
                        key={def.id}
                        className={`px-2.5 py-1 rounded-xl border font-semibold ${
                          isMutedShaker 
                            ? 'bg-white/5 text-slate-500 border-white/10 line-through' 
                            : 'bg-white/10 text-cyan-200 border-cyan-400/30'
                        }`}
                      >
                        {def.id}
                      </span>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Generated JSON Output Box */}
            <div className="liquid-glass-mac rounded-3xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-white">Сгенерированный файл</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">
                    {displayResult.aircraft.simName === 'War Thunder' ? 'WT' : 'DCS'}_{displayResult.aircraft.moduleCode}_{revision}_{displayResult.effectivePitchForceKg}kg.json
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 text-slate-200 border border-white/15 transition-all cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Скопировано!' : 'Копировать'}</span>
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold bg-cyan-600 hover:bg-cyan-500 text-white shadow-xs transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Скачать</span>
                  </button>
                </div>
              </div>

              {/* JSON preview */}
              <pre className="bg-[#050912]/90 text-cyan-200 p-4 rounded-2xl text-[11px] font-mono h-56 overflow-auto border border-white/10 leading-relaxed shadow-inner">
                {displayResult.jsonString}
              </pre>

              {/* Instructions */}
              <div className="bg-white/[0.04] border border-white/10 p-4 rounded-2xl text-xs text-slate-300 space-y-2">
                <div className="font-bold text-white flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-cyan-400" />
                  <span>Как применить профиль в FFBeast Commander:</span>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div>1. Нажмите кнопку <strong className="text-white">«Скачать .JSON»</strong>.</div>
                  <div>2. Поместите файл в папку <code className="text-cyan-300 font-bold bg-white/10 px-2 py-0.5 rounded border border-white/15">FFBeast Commander/effect_profiles/</code>.</div>
                  <div>3. В приложении FFBeast Commander выберите модуль и нажмите <strong className="text-white">Load Profile</strong>.</div>
                </div>

                <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">Нужны сразу все авторские профили?</span>
                  <a
                    href="./profiles/JustFly_FFBeast_Profiles_Pack.zip"
                    download="JustFly_FFBeast_Profiles_Pack.zip"
                    className="text-cyan-300 hover:text-cyan-200 font-semibold underline flex items-center gap-1"
                  >
                    <Download className="w-3 h-3" />
                    <span>Скачать архив JustFly (ZIP, 17 файлов)</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
