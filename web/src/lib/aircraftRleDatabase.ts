import type { ControlArchitecture } from '../types';

export interface AircraftRleData {
  controlArchitecture: ControlArchitecture;
  controlSystemName: string;
  rlePitchForceKg: number;
  rleRollForceKg: number;
  rleRudderForceKg?: number;
  rleGGradient: string;
  rleStickTravel: string;
  rleDocument: string;
  aoaBuffetOnsetDeg: number;
  vStallKmh: number;
  trimMethod: string;
  ffbEffectBreakdown: {
    pitchSpringEffect: string;
    dampeningEffect: string;
    trimEffect: string;
    shakerEffects: string;
    joltsEffects: string;
    rudderPedalEffect?: string;
  };
}

export const AIRCRAFT_RLE_SPECS: Record<string, AircraftRleData> = {
  // ===================== 4 УНИВЕРСАЛЬНЫХ АРХЕТИПА (ЭТАЛОНЫ) =====================
  'universal-heavy-jet': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Универсальное необратимое гидробустерное управление с пружинным загружателем АРУ-В/CAS (Эталонная кинематика)',
    rlePitchForceKg: 14.5,
    rleRollForceKg: 7.5,
    rleRudderForceKg: 20.0,
    rleGGradient: '2.5 – 3.8 кгс/G',
    rleStickTravel: '+140 мм / -100 мм, ±90 мм крен, ±100 мм педали',
    rleDocument: 'РЛЭ Су-27СК Кн. 1 / USAF T.O. 1F-15C-1 (Сводный эталон тяжелого джета)',
    aoaBuffetOnsetDeg: 18.0,
    vStallKmh: 215,
    trimMethod: 'МЭТ / CAS Electric trim со смещением нейтрали пружинного загружателя',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (S-кривая загружателя) + airspeed_spring (скоростной напор V² с полкой АРУ)',
      dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 65% для РУС и 80% для педалей)',
      trimEffect: 'trim (Hardware Trim смещение нейтрали)',
      shakerEffects: 'aoa_stall_shaker (порог 18.0° срыв потока), afterburner_shaker, airbrake_shaker, flaps_shaker, gunfire_shaker',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt, damage_jolt',
      rudderPedalEffect: 'Полная калибровка педалей: скоростной напор на киле, толчки передней стойки, демпфирование 80%'
    }
  },
  'universal-fbw-jet': {
    controlArchitecture: 'fly_by_wire',
    controlSystemName: 'Универсальная цифровая комплексная ЭДСУ / Fly-By-Wire (Эталонная кинематика)',
    rlePitchForceKg: 12.5,
    rleRollForceKg: 6.8,
    rleRudderForceKg: 16.5,
    rleGGradient: '2.0 – 2.8 кгс/G (G-force feel gradient)',
    rleStickTravel: '+125 мм / -85 мм, ±75 мм крен, ±80 мм педали',
    rleDocument: 'NATOPS Flight Manual F/A-18C / USAF T.O. 1F-16C-1 (Сводный эталон FBW)',
    aoaBuffetOnsetDeg: 19.0,
    vStallKmh: 220,
    trimMethod: 'Электронный триммер FCC/FLCS (Auto-trim в крейсерском полете)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (прогрессивная загрузка ЭДСУ) + g_force_spring (градиент по перегрузке)',
      dampeningEffect: 'smart_damper (Static: 50%, Dynamic: 55% адаптивное демпфирование)',
      trimEffect: 'trim (Hardware Trim нейтрали)',
      shakerEffects: 'aoa_stall_shaker (порог 19.0° синтетический шейкер FLCS), afterburner_shaker, gunfire_shaker',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt',
      rudderPedalEffect: 'Адаптивный отклик педалей с ограничением скольжения по скорости (Rudder limiter)'
    }
  },
  'universal-prop-warbird': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Универсальная обратимая механическая тягово-тросовая проводка WWII (Эталонная кинематика)',
    rlePitchForceKg: 21.0,
    rleRollForceKg: 11.5,
    rleRudderForceKg: 28.0,
    rleGGradient: '3.5 – 5.5 кгс/G (бобвейт и аэродинамическое затяжеление)',
    rleStickTravel: '+150 мм / -110 мм, ±95 мм крен, ±110 мм педали',
    rleDocument: 'USAAF Pilot Flight Manual P-51D Mustang / L.Dv.T. 2109 Bf 109K-4 (Сводный эталон WWII)',
    aoaBuffetOnsetDeg: 15.0,
    vStallKmh: 155,
    trimMethod: 'Механические триммерные колеса (смещение рулей и нейтрали РУС/педалей)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring (квадратичный рост скоростного напора V²) + prop_thrust_spring (обдувка винтом на 0 км/ч)',
      dampeningEffect: 'smart_damper (Static: 35%, Dynamic: 70% кинематика тросов)',
      trimEffect: 'elevator_weight (рули провисают на стоянке под собственным весом!) + trim',
      shakerEffects: 'aoa_stall_shaker (порог 15.0° срыв потока на крыле), gunfire_shaker, engine_shaker (вибрация мотора)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt',
      rudderPedalEffect: 'Активный обдув киля струей винта (P-factor на разбеге), тяжелое сопротивление педалей на скорости'
    }
  },
  'universal-helicopter': {
    controlArchitecture: 'helicopter_force_trim',
    controlSystemName: 'Универсальное вертолетное управление с Force Trim и гидроусилителями (Эталонная кинематика)',
    rlePitchForceKg: 3.8,
    rleRollForceKg: 2.8,
    rleRudderForceKg: 5.0,
    rleGGradient: 'Отсутствует (вертолетная кинематика)',
    rleStickTravel: 'Круговой ход циклика ~250 мм, ход педалей ~240 мм',
    rleDocument: 'Инструкция экипажу вертолета Ми-8МТВ / TM 55-1520-210-10 UH-1H (Сводный эталон Force Trim)',
    aoaBuffetOnsetDeg: 0,
    vStallKmh: 0,
    trimMethod: 'Force Trim Release: зажатие кнопки на РПУ полностью снимает нагрузку на РУС и педалях, отпускание фиксирует новый центр',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (легкая центрирующая пружина) с полным отключением через Force Release',
      dampeningEffect: 'smart_damper (Static: 65%, Dynamic: 25% вязкое гидравлическое трение циклика и педалей)',
      trimEffect: 'trim (Hardware Trim: force_release_allowed: true для РУС и педалей!)',
      shakerEffects: 'rotor_shaker (лопастная частота несущего винта), etl_shaker (косая обдувка 30-50 км/ч), vorterx_state_shaker (вихревое кольцо)',
      joltsEffects: 'landing_jolt (касание лыжами или колесами)',
      rudderPedalEffect: 'Педали путевого управления: полное снятие усилий по Force Trim, лопастная вибрация хвостового винта'
    }
  },

  // ===================== СУ-27 / СУ-33 =====================
  'dcs-su-27': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Необратимое бустерное управление с гидроусилителями БУ-250А, автоматом регулировки усилий АРУ-В и системой дистанционного управления СДУ-10',
    rlePitchForceKg: 14.5,
    rleRollForceKg: 7.0,
    rleRudderForceKg: 22.0,
    rleGGradient: '2.5 – 3.8 кгс/ед. перегрузки (закон АРУ-В)',
    rleStickTravel: '+145 мм к себе / -105 мм от себя, ±95 мм крен',
    rleDocument: 'РЛЭ самолета Су-27СК, Книга 1 / Практическая аэродинамика Су-27 (ЦАГИ / ВВИА им. Жуковского)',
    aoaBuffetOnsetDeg: 18.5,
    vStallKmh: 210,
    trimMethod: 'МЭТ-4У (электромеханический механизм со смещением нейтрали пружинного загружателя АРУ)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (нелинейная S-кривая механизма АРУ-В) + airspeed_spring (динамический скоростной напор)',
      dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 60% демпфирование сервоприводов БУ-250А)',
      trimEffect: 'trim (Hardware Trim: физическое смещение нейтрали пружин МЭТ-4У)',
      shakerEffects: 'aoa_stall_shaker (порог 18.5° срыв вихрей с наплывов крыла), afterburner_shaker (АЛ-31Ф), gunfire_shaker (ГШ-30-1)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (Р-27/Р-73)',
      rudderPedalEffect: 'Педали: скоростной напор киля 22 кгс, толчки передней стойки, демпфирование 80%'
    }
  },
  'dcs-su-33': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Бустерное гидроуправление с ПГО (переднее горизонтальное оперение), АРУ-В и морской балансировкой',
    rlePitchForceKg: 15.0,
    rleRollForceKg: 7.2,
    rleRudderForceKg: 22.5,
    rleGGradient: '2.7 – 4.0 кгс/G',
    rleStickTravel: '+145 мм / -105 мм, ±95 мм',
    rleDocument: 'РЛЭ самолета Су-33 (Т-10К) / Аэродинамика палубной авиации ОКБ Сухого',
    aoaBuffetOnsetDeg: 18.0,
    vStallKmh: 195,
    trimMethod: 'МЭТ-4У + режим САУ палубной посадки',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (АРУ-В с учетом ПГО) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 58%, Dynamic: 62%)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 18.0°), afterburner_shaker, gunfire_shaker',
      joltsEffects: 'landing_jolt (жесткий удар о палубу авианосца без выравнивания), gear_jolt',
      rudderPedalEffect: 'Педали: скоростной напор руля направления, усиленный демпфер 80%'
    }
  },

  // ===================== СУ-35 =====================
  'dcs-su-35': {
    controlArchitecture: 'fly_by_wire',
    controlSystemName: 'Четырехканальная цифровая комплексная система управления КСУ-35 с интеграцией УВТ (всеракурсный вектор тяги)',
    rlePitchForceKg: 12.0,
    rleRollForceKg: 6.5,
    rleGGradient: '2.2 – 3.0 кгс/ед. перегрузки',
    rleStickTravel: '+130 мм / -95 мм, ±85 мм',
    rleDocument: 'Техническое описание аэродинамики Су-35С (ОКБ Сухого / КнААЗ)',
    aoaBuffetOnsetDeg: 24.0,
    vStallKmh: 190,
    trimMethod: 'Интегрированный в КСУ-35 электротриммер с балансировочной перенастройкой нейтрали',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (электронный загрузочный механизм КСУ-35)',
      dampeningEffect: 'smart_damper (Static: 45%, Dynamic: 55% адаптивное ЭДСУ демпфирование)',
      trimEffect: 'trim (Hardware Trim смещение нейтрали)',
      shakerEffects: 'aoa_stall_shaker (порог 24.0° сверхманевренность), afterburner_shaker (АЛ-41Ф1С УВТ), gunfire_shaker (ГШ-30-1)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== F-15C / F-15E =====================
  'dcs-f-15c': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Mechanical linkage with dual irreversible hydraulic actuators, pitch/roll ratio changers, and CAS (Control Augmentation System)',
    rlePitchForceKg: 15.5,
    rleRollForceKg: 7.8,
    rleGGradient: '1.8 – 2.5 kgf/G (4.0 – 5.5 lbs/G)',
    rleStickTravel: '+127 mm aft / -89 mm fwd, ±82 mm roll',
    rleDocument: 'USAF T.O. 1F-15A-1-1 / NASA TP-1538 Handling Qualities of the F-15',
    aoaBuffetOnsetDeg: 18.0,
    vStallKmh: 230,
    trimMethod: 'Electric pitch/roll trim actuator shifting feel spring cartridge neutral',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (CAS feel spring cartridge) + airspeed_spring (динамический скоростной напор)',
      dampeningEffect: 'smart_damper (Static: 50%, Dynamic: 50% гидродемпферы гидроусилителей)',
      trimEffect: 'trim (Hardware Trim со смещением нейтрали пружин)',
      shakerEffects: 'aoa_stall_shaker (порог 18.0° предвестник сваливания), afterburner_shaker (2x F100-PW-220), gunfire_shaker (M61A1 Vulcan 6000 выстр/мин)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (AIM-120/AIM-9)'
    }
  },
  'dcs-f-15e': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Dual hydraulic boost with digital CAS, heavy conformal fuel tanks (CFT) weight compensation, and auto-pitch trim',
    rlePitchForceKg: 16.5,
    rleRollForceKg: 8.5,
    rleGGradient: '2.0 – 2.8 kgf/G',
    rleStickTravel: '+127 mm / -89 mm, ±82 mm',
    rleDocument: 'USAF T.O. 1F-15E-1 Flight Manual',
    aoaBuffetOnsetDeg: 17.5,
    vStallKmh: 245,
    trimMethod: 'Electric trim cartridge with strike auto-trim',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (утяжеленный CAS) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 55%)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 17.5°), afterburner_shaker (F100-PW-229), airbrake_shaker (огромный спидбрейк)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (GBU / JDAM тяжелые подвески)'
    }
  },

  // ===================== F-16C VIPER =====================
  'dcs-f-16c': {
    controlArchitecture: 'fly_by_wire',
    controlSystemName: 'Force-sensing side-stick controller (FLCS) with ultra-short travel (3-6 mm) and quad-redundant digital Fly-By-Wire',
    rlePitchForceKg: 11.5,
    rleRollForceKg: 7.5,
    rleGGradient: '1.4 – 1.8 kgf/G (3.2 – 4.0 lbs/G)',
    rleStickTravel: '3 – 6 мм (тензометрический мини-ход side-stick)',
    rleDocument: 'USAF T.O. 1F-16C-1 Flight Manual / General Dynamics F-16 FLCS Engineering Specification',
    aoaBuffetOnsetDeg: 16.0,
    vStallKmh: 240,
    trimMethod: 'FLCS Pitch/Roll trim bias switches (электронное смещение нулевого баланса в компьютере ЭДСУ)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (жесткий линейный градиент тензометрического датчика F-16)',
      dampeningEffect: 'smart_damper (Static: 70%, Dynamic: 40% мгновенная фиксация нейтрали без раскачки)',
      trimEffect: 'trim (Hardware Trim электронный трим)',
      shakerEffects: 'aoa_stall_shaker (порог 16.0° синтетический шейкер FLCS), afterburner_shaker (F110-GE-129), gunfire_shaker (M61A1 Vulcan)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== F/A-18C HORNET =====================
  'dcs-fa-18c': {
    controlArchitecture: 'fly_by_wire',
    controlSystemName: 'Mechanical feel spring and damper assembly connected to quad-redundant digital Flight Control Computers (FCC)',
    rlePitchForceKg: 13.5,
    rleRollForceKg: 7.0,
    rleGGradient: '2.0 – 2.8 kgf/G (4.5 – 6.2 lbs/G)',
    rleStickTravel: '+120 mm / -80 mm, ±75 mm',
    rleDocument: 'US Navy NATOPS Flight Manual F/A-18C/D (NAVAIR A1-F18AC-NFM-000)',
    aoaBuffetOnsetDeg: 19.0,
    vStallKmh: 225,
    trimMethod: 'Series electric trim actuator in feel assembly with Auto-Trim in CAS flight mode',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (S-кривая загрузочного блока FCC) + gforce_spring (градиент по G)',
      dampeningEffect: 'smart_damper (Static: 50%, Dynamic: 55% гидродемпфер проводки)',
      trimEffect: 'trim (Hardware Trim нейтрали FCC)',
      shakerEffects: 'aoa_stall_shaker (порог 19.0° срыв вихрей с наплывов LEX), afterburner_shaker, gunfire_shaker',
      joltsEffects: 'landing_jolt (жесткое касание палубы без выравнивания), gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== F-14A / F-14B TOMCAT =====================
  'dcs-f-14a': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Reversible control runs to irreversible hydraulic actuators, mechanical feel springs, pitch bobweights, and Mach trim system',
    rlePitchForceKg: 16.0,
    rleRollForceKg: 8.0,
    rleGGradient: '2.5 – 3.5 kgf/G',
    rleStickTravel: '+140 mm / -90 mm, ±85 mm',
    rleDocument: 'US Navy NATOPS Flight Manual F-14A (NAVAIR 01-F14AAA-1)',
    aoaBuffetOnsetDeg: 14.5,
    vStallKmh: 230,
    trimMethod: 'Electric Mach trim actuator and 4-way trim hat on stick',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (тяжелый блок пружин загрузки) + airspeed_spring (скоростной напор)',
      dampeningEffect: 'smart_damper (Static: 60%, Dynamic: 65% тяжелое гидравлическое демпфирование)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 14.5° предвестник сваливания Wing Rocking), afterburner_shaker (TF30 compressor surge rumble)',
      joltsEffects: 'landing_jolt (палубный удар), gear_jolt, weapon_release_jolt (AIM-54 Phoenix)'
    }
  },
  'dcs-f-14b': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Upgraded feel springs, dual hydraulic boost, pitch rate damping, and F110 high-thrust trim bias',
    rlePitchForceKg: 16.0,
    rleRollForceKg: 8.0,
    rleGGradient: '2.5 – 3.5 kgf/G',
    rleStickTravel: '+140 mm / -90 mm, ±85 mm',
    rleDocument: 'US Navy NATOPS Flight Manual F-14B (NAVAIR 01-F14AAB-1)',
    aoaBuffetOnsetDeg: 15.0,
    vStallKmh: 225,
    trimMethod: 'Electric Mach trim & stick trim hat',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 60%, Dynamic: 65%)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 15.0°), afterburner_shaker (F110-GE-400), gunfire_shaker',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== F-22A RAPTOR =====================
  'dcs-f-22': {
    controlArchitecture: 'fly_by_wire',
    controlSystemName: 'Side-stick controller with multi-axis force transducers, full-authority quad digital FBW, and 3D thrust vectoring integration',
    rlePitchForceKg: 11.0,
    rleRollForceKg: 6.0,
    rleGGradient: '1.5 – 2.0 kgf/G',
    rleStickTravel: 'Короткоходный side-stick (10–15 мм)',
    rleDocument: 'Lockheed Martin F-22 Aerodynamic Design and Flight Control Specification',
    aoaBuffetOnsetDeg: 30.0,
    vStallKmh: 180,
    trimMethod: 'Automatic FCS auto-trim (летчик не триммирует вручную в полете)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (прогрессивная характеристика загрузки side-stick)',
      dampeningEffect: 'smart_damper (Static: 60%, Dynamic: 45%)',
      trimEffect: 'trim (Hardware Trim нейтрали)',
      shakerEffects: 'aoa_stall_shaker (порог 30.0° режим кобры и пост-сваливания), afterburner_shaker (2x F119), gunfire_shaker (M61A2)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (внутренние отсеки вооружения)'
    }
  },

  // ===================== A-10C II =====================
  'dcs-a-10c2': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Dual hydraulic power systems (Left/Right) with mechanical linkage, SAS (Stability Augmentation System), and manual reversion capability',
    rlePitchForceKg: 15.0,
    rleRollForceKg: 8.0,
    rleGGradient: '2.8 – 4.0 kgf/G',
    rleStickTravel: '+135 mm / -95 mm, ±85 мм',
    rleDocument: 'USAF T.O. 1A-10C-1 Flight Manual',
    aoaBuffetOnsetDeg: 15.5,
    vStallKmh: 210,
    trimMethod: 'Electric 4-way trim hat on stick grip with manual reversion cable trim tabs',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (пружинный загружатель) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 50% гидродемпферы)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 15.5° предвестник сваливания), gunfire_shaker (GAU-8/A 30mm Avenger 3900 выстр/мин — 4 тонны реактивной отдачи на носу!), engine_shaker',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (тяжелые бомбы Mk-84 / AGM-65)'
    }
  },

  // ===================== МИГ-29С =====================
  'dcs-mig-29s': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Необратимое бустерное управление (БУ-270) с автоматом регулировки усилий АРУ-29 и пружинными механизмами загрузки',
    rlePitchForceKg: 14.0,
    rleRollForceKg: 7.0,
    rleGGradient: '2.3 – 3.2 кгс/G',
    rleStickTravel: '+135 мм / -100 мм, ±85 мм',
    rleDocument: 'Практическая аэродинамика самолета МиГ-29 (РЛЭ Книга 1) / ВВИА им. Жуковского',
    aoaBuffetOnsetDeg: 19.0,
    vStallKmh: 220,
    trimMethod: 'МЭТ (электромеханический механизм со смещением центра пружинного загружателя)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (загружатель АРУ-29) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 50%, Dynamic: 55% гидродемпферы БУ-270)',
      trimEffect: 'trim (Hardware Trim со смещением нейтрали)',
      shakerEffects: 'aoa_stall_shaker (порог 19.0°), afterburner_shaker (2x РД-33), gunfire_shaker (ГШ-30-1)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== СУ-25Т =====================
  'dcs-su-25t': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Смешанная проводка: бустерное управление в канале элеронов (БУ-45) и механическая тяговая проводка руля высоты с гидроусилителями БУ-45А и автоматом загрузки',
    rlePitchForceKg: 17.5,
    rleRollForceKg: 8.5,
    rleGGradient: '3.0 – 4.5 кгс/G',
    rleStickTravel: '+145 мм / -100 мм, ±90 мм',
    rleDocument: 'РЛЭ самолета Су-25 (Т-8), Книга 1 / Практическая аэродинамика ОКБ Сухого',
    aoaBuffetOnsetDeg: 16.5,
    vStallKmh: 200,
    trimMethod: 'Электромеханический триммер МЭТ на ручке',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (тяжелая пружинная загрузка) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 60%, Dynamic: 55% сопротивление бронированной проводки)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 16.5°), gunfire_shaker (ВПУ ГШ-2-30), airbrake_shaker (тормозные щитки на законцовках крыла)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== ПОРШНЕВЫЕ WARBIRDS: P-51D MUSTANG =====================
  'dcs-p51d': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Прямая обратимая механическая тягово-тросовая проводка без сервоусилителей. Триммерные пластины на рулях, триммерные колеса в кабине, бобвейт в канале тангажа',
    rlePitchForceKg: 22.0,
    rleRollForceKg: 12.0,
    rleGGradient: '3.5 – 5.5 кгс/G (бобвейт создает сопротивление по перегрузке)',
    rleStickTravel: '+155 мм к себе / -115 мм от себя, ±105 мм элероны',
    rleDocument: 'Pilot Training Manual for the P-51 Mustang (AAF Manual 51-127-5) / NACA Report No. 829',
    aoaBuffetOnsetDeg: 15.0,
    vStallKmh: 160,
    trimMethod: 'Механические триммерные колеса (смещение рулей и физической точки нейтрали РУС)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring (квадратичный рост скоростного напора V²: от легкой ручки на 200 км/ч до тяжелой на 650 км/ч) + prop_thrust_spring (обдувка винтом на разбеге 0 км/ч)',
      dampeningEffect: 'smart_damper (Static: 35%, Dynamic: 70% кинематическое сопротивление длинных тросовых проводок)',
      trimEffect: 'elevator_weight (руль высоты провисает вниз на стоянке под собственным весом!) + trim',
      shakerEffects: 'aoa_stall_shaker (порог 15.0° предвестник сваливания), gunfire_shaker (6x Browning M2 .50 cal), engine_shaker (Packard Merlin V-1650-7 V12)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (бомбы 500/1000 фунтов)'
    }
  },

  // ===================== BF 109 K-4 =====================
  'dcs-bf109k4': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Непосредственная трубчатая тяговая проводка на роликах без гидроусилителей. Знаменитое физическое «затяжеление рулей» на больших скоростях',
    rlePitchForceKg: 24.0,
    rleRollForceKg: 14.0,
    rleGGradient: '4.0 – 6.0 кгс/G',
    rleStickTravel: '+130 мм / -95 мм, ±80 мм (ограничено узким бортом кабины)',
    rleDocument: 'Bf 109 K-4 Flugzeug-Handbuch (D.(Luft)T.2109 K-4/Fl) / RAE Farnborough Handling Trials',
    aoaBuffetOnsetDeg: 14.5,
    vStallKmh: 155,
    trimMethod: 'Переставной цельноповоротный стабилизатор (штурвал триммера изменяет угол всего оперения)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring (тяжелейшее затяжеление на V > 550 км/ч) + prop_thrust_spring (мощный обдув винта DB-605DC)',
      dampeningEffect: 'smart_damper (Static: 40%, Dynamic: 75% трение проводки)',
      trimEffect: 'elevator_weight + trim',
      shakerEffects: 'aoa_stall_shaker (порог 14.5° выброс предкрылков Хэндли-Пейджа), gunfire_shaker (мотор-пушка MK 108 30мм + 2x MG 131), engine_shaker (Daimler-Benz DB 605)',
      joltsEffects: 'landing_jolt (узкобазное шасси с сильным крутящим моментом), gear_jolt'
    }
  },

  // ===================== FW 190 D-9 =====================
  'dcs-fw190d9': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Жесткая трубчатая тяговая проводка на шарикоподшипниках с пружинными сервокомпенсаторами элеронов (Flettner)',
    rlePitchForceKg: 19.5,
    rleRollForceKg: 9.5,
    rleGGradient: '3.2 – 4.5 кгс/G',
    rleStickTravel: '+140 мм / -100 мм, ±90 мм',
    rleDocument: 'Fw 190 D-9 Bedienungsvorschrift-Fl / RAE Technical Report No. Aero 1993',
    aoaBuffetOnsetDeg: 16.0,
    vStallKmh: 170,
    trimMethod: 'Электрический переставной стабилизатор с кнопочным управлением',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring + prop_thrust_spring (обдув Jumo 213A)',
      dampeningEffect: 'smart_damper (Static: 35%, Dynamic: 65%)',
      trimEffect: 'elevator_weight + trim',
      shakerEffects: 'aoa_stall_shaker (порог 16.0° срыв на законцовках), gunfire_shaker (2x MG 151/20 + 2x MG 131), engine_shaker',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== СПИТФАЙР LF MK. IX =====================
  'dcs-spitfire-ix': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Тросовая проводка с шарнирным ломающимся штурвалом-лопатой (Spitfire Spade Grip). Невероятно легкий тангаж и тяжелые элероны на высокой скорости',
    rlePitchForceKg: 16.0,
    rleRollForceKg: 15.0,
    rleGGradient: '2.5 – 3.8 кгс/G (легкий тангаж)',
    rleStickTravel: '+135 мм / -95 мм, ±85 мм (ручка со шарнирным кольцом Spade)',
    rleDocument: 'Pilot\'s Notes for Spitfire IX, XI & XVI (A.P. 1565J, P & L-P.N.)',
    aoaBuffetOnsetDeg: 14.0,
    vStallKmh: 145,
    trimMethod: 'Механические колеса триммеров высоты и направления',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring + prop_thrust_spring (обдув винта Rotol / Rolls-Royce Merlin 66)',
      dampeningEffect: 'smart_damper (Static: 30%, Dynamic: 60%)',
      trimEffect: 'elevator_weight + trim',
      shakerEffects: 'aoa_stall_shaker (порог 14.0° срыв на эллиптическом крыле), gunfire_shaker (2x Hispano 20mm + 4x Browning .303), engine_shaker',
      joltsEffects: 'landing_jolt, gear_jolt'
    }
  },

  // ===================== ВЕРТОЛЕТ UH-1H HUEY =====================
  'dcs-uh1h': {
    controlArchitecture: 'helicopter_force_trim',
    controlSystemName: 'Гидравлические приводы циклического шага с пружинными градиентными механизмами и электромагнитной муфтой Force Trim Release',
    rlePitchForceKg: 3.5,
    rleRollForceKg: 2.5,
    rleGGradient: 'Отсутствует (вертолетная кинематика)',
    rleStickTravel: 'Круговой ход циклика ~250 мм',
    rleDocument: 'US Army TM 55-1520-210-10 Operator\'s Manual for UH-1H/V Helicopter',
    aoaBuffetOnsetDeg: 0,
    vStallKmh: 0,
    trimMethod: 'Force Trim Release: зажатие кнопки на РПУ полностью снимает нагрузку, отпускание фиксирует новый центр',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (легкая центрирующая пружина градиентного механизма) с отключением через Force Release',
      dampeningEffect: 'smart_damper (Static: 65%, Dynamic: 20% вязкое гидравлическое трение циклика)',
      trimEffect: 'trim (Hardware Trim с Force Release: зажал -> перевел ручку -> отпустил -> ручка осталась на месте)',
      shakerEffects: 'rotor_shaker (лопастная частота двухлопастного винта ~10.8 Гц), etl_shaker (горб переходного режима косой обдувки 30-45 км/ч), vorterx_state_shaker (вихревое кольцо при быстром вертикальном снижении)',
      joltsEffects: 'landing_jolt (пружинящее касание лыжного шасси о землю)'
    }
  },

  // ===================== ВЕРТОЛЕТ МИ-8МТВ2 =====================
  'dcs-mi-8': {
    controlArchitecture: 'helicopter_force_trim',
    controlSystemName: 'Необратимое гидробустерное управление (КАУ-30Б) с пружинными загружателями и электромагнитными тормозами ЭМТ-2М',
    rlePitchForceKg: 4.0,
    rleRollForceKg: 3.0,
    rleGGradient: 'Отсутствует (вертолетная кинематика)',
    rleStickTravel: 'Ход ручки продольно 290 мм, поперечно 240 мм',
    rleDocument: 'Инструкция экипажу вертолета Ми-8МТ (Ми-17) / Техническое описание гидросистемы и КАУ-30Б',
    aoaBuffetOnsetDeg: 0,
    vStallKmh: 0,
    trimMethod: 'Кнопка триммера на РПУ (размыкание электромагнитных тормозов ЭМТ-2М для свободного перемещения)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (пружинный загружатель) с полным снятием сопротивления при нажатом триммере',
      dampeningEffect: 'smart_damper (Static: 60%, Dynamic: 25% гидросопротивление)',
      trimEffect: 'trim (Hardware Trim с Force Release: отпустил кнопку — загружатель зафиксировал текущую точку ручки)',
      shakerEffects: 'rotor_shaker (частота 5-лопастного винта ~16.2 Гц), etl_shaker (косая обдувка 35-50 км/ч), vorterx_state_shaker (ВКР)',
      joltsEffects: 'landing_jolt (трехопорное колесное шасси)'
    }
  },

  // ===================== ВЕРТОЛЕТ AH-64D APACHE =====================
  'dcs-ah-64d': {
    controlArchitecture: 'helicopter_force_trim',
    controlSystemName: 'Fly-by-wire Flight Management Computer (FMC) + Digital Decoupler Actuators (DDA) with dual hydraulic boost and Force Trim magnetic brakes',
    rlePitchForceKg: 4.2,
    rleRollForceKg: 3.0,
    rleGGradient: 'Отсутствует',
    rleStickTravel: 'Ход циклика ±120 мм',
    rleDocument: 'US Army TM 1-1520-251-10 Operator\'s Manual for AH-64D Longbow Apache',
    aoaBuffetOnsetDeg: 0,
    vStallKmh: 0,
    trimMethod: 'Force Trim Release switch & 4-way direction trim switch on cyclic grip',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring с автоматической координацией FMC',
      dampeningEffect: 'smart_damper (Static: 65%, Dynamic: 30%)',
      trimEffect: 'trim (Hardware Trim Force Release)',
      shakerEffects: 'rotor_shaker (4-лопастной винт), etl_shaker (переход косой обдувки 15-25 узлов), gunfire_shaker (30mm M230 Chain Gun 625 выстр/мин)',
      joltsEffects: 'landing_jolt, weapon_release_jolt (AGM-114 Hellfire / Hydra 70)'
    }
  },

  // ===================== ВЕРТОЛЕТ КА-50 =====================
  'dcs-ka-50': {
    controlArchitecture: 'helicopter_force_trim',
    controlSystemName: 'Четырехканальная цифровая САУ-800, необратимые гидроусилители и электромагнитные тормоза ЭМТ-2М соосного несущего винта',
    rlePitchForceKg: 3.8,
    rleRollForceKg: 2.8,
    rleGGradient: 'Отсутствует',
    rleStickTravel: 'Ход ручки продольно 260 мм, поперечно 210 мм',
    rleDocument: 'Руководство по летной эксплуатации вертолета Ка-50 (ОКБ Камова / САУ-800)',
    aoaBuffetOnsetDeg: 0,
    vStallKmh: 0,
    trimMethod: 'Кнопка триммера на РПУ (снятие усилий и одновременное запоминание углов стабилизации автопилотом)',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring с Force Release',
      dampeningEffect: 'smart_damper (Static: 60%, Dynamic: 25%)',
      trimEffect: 'trim (Hardware Trim с Force Release)',
      shakerEffects: 'rotor_shaker (соосная схема 2х3 лопасти), etl_shaker, gunfire_shaker (пушка 2А42 30мм)',
      joltsEffects: 'landing_jolt, weapon_release_jolt (Вихрь / С-8)'
    }
  },

  // ===================== ХОЛОДНАЯ ВОЙНА: F-4E PHANTOM II =====================
  'dcs-f4e': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Dual 3000 psi hydraulic systems with pitch feel bellows (Q-bellows), dynamic pressure feel springs, and pitch SAS',
    rlePitchForceKg: 17.5,
    rleRollForceKg: 8.5,
    rleGGradient: '2.5 – 3.8 kgf/G',
    rleStickTravel: '+130 mm / -90 mm, ±80 mm',
    rleDocument: 'USAF T.O. 1F-4E-1 Flight Manual (McDonnell Douglas)',
    aoaBuffetOnsetDeg: 13.5,
    vStallKmh: 240,
    trimMethod: 'Electric stabilizer trim hat with mechanical reversion backup',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (Q-feel bellows сильфон скоростного напора) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 65%)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 13.5° сильный срыв потока на крыле со стреловидностью 45°), afterburner_shaker (2x J79-GE-17), gunfire_shaker (M61A1)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt (AIM-7 Sparrow / тяжелые бомбы)'
    }
  },

  // ===================== ХОЛОДНАЯ ВОЙНА: МИГ-21БИС =====================
  'dcs-mig21bis': {
    controlArchitecture: 'hydromechanical_boosted',
    controlSystemName: 'Бустерное гидроуправление рулем высоты (БУ-51М) с автоматом регулировки усилий АРУ-3ВМ и пружинным загружателем',
    rlePitchForceKg: 15.0,
    rleRollForceKg: 7.5,
    rleGGradient: '2.4 – 3.5 кгс/G',
    rleStickTravel: '+130 мм / -90 мм, ±80 мм',
    rleDocument: 'Практическая аэродинамика самолета МиГ-21бис (РЛЭ Книга 1) / ВВИА им. Жуковского',
    aoaBuffetOnsetDeg: 15.0,
    vStallKmh: 235,
    trimMethod: 'Электромеханический механизм триммирования МЭТ-4У на ручке',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'simple_spring (пружинный загружатель АРУ-3ВМ) + airspeed_spring',
      dampeningEffect: 'smart_damper (Static: 50%, Dynamic: 55%)',
      trimEffect: 'trim (Hardware Trim)',
      shakerEffects: 'aoa_stall_shaker (порог 15.0° бафтинг дельтовидного крыла), afterburner_shaker (Р-25-300 ЧР), gunfire_shaker (ГШ-23Л)',
      joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt'
    }
  },

  // ===================== УЧЕБНЫЙ L-39C ALBATROS =====================
  'dcs-l39c': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Прямая жесткая трубчатая тяговая проводка без бустеров. Пружинный загружатель в канале тангажа и триммерная пластина',
    rlePitchForceKg: 14.0,
    rleRollForceKg: 7.0,
    rleGGradient: '2.2 – 3.2 кгс/G',
    rleStickTravel: '+135 мм / -95 мм, ±85 мм',
    rleDocument: 'Руководство по летной эксплуатации самолета L-39C Albatros (Aero Vodochody)',
    aoaBuffetOnsetDeg: 14.5,
    vStallKmh: 165,
    trimMethod: 'Электромеханический триммер на ручке со смещением триммерной пластины',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring (прямой скоростной напор V²) + simple_spring (пружинный загружатель)',
      dampeningEffect: 'smart_damper (Static: 45%, Dynamic: 50%)',
      trimEffect: 'elevator_weight + trim',
      shakerEffects: 'aoa_stall_shaker (порог 14.5° отчетливая тряска перед сваливанием), gunfire_shaker',
      joltsEffects: 'landing_jolt, gear_jolt'
    }
  },

  // ===================== ЯК-52 =====================
  'dcs-yak52': {
    controlArchitecture: 'mechanical',
    controlSystemName: 'Прямая тягово-тросовая небустерная проводка. Прямой контакт руля с ладонью летчика через шарнирные моменты',
    rlePitchForceKg: 15.5,
    rleRollForceKg: 8.0,
    rleGGradient: '2.5 – 3.8 кгс/G',
    rleStickTravel: '+140 мм / -100 мм, ±90 мм',
    rleDocument: 'Руководство по летной эксплуатации самолета Як-52 (ДОСААФ СССР / ОКБ Яковлева)',
    aoaBuffetOnsetDeg: 13.5,
    vStallKmh: 120,
    trimMethod: 'Механический штурвал триммера руля высоты в левой части кабины',
    ffbEffectBreakdown: {
      pitchSpringEffect: 'airspeed_spring (квадратичный скоростной напор) + prop_thrust_spring (обдув винта М-14П)',
      dampeningEffect: 'smart_damper (Static: 35%, Dynamic: 60%)',
      trimEffect: 'elevator_weight (руль высоты опускается на стоянке) + trim',
      shakerEffects: 'aoa_stall_shaker (порог 13.5° срыв на прямом крыле), engine_shaker (9-цилиндровый радиальный мотор М-14П)',
      joltsEffects: 'landing_jolt (жесткие пневматики полуубираемого шасси)'
    }
  }
};

/**
 * Returns authentic RLE data for a given aircraft ID.
 * Falls back to intelligent category defaults if specific aircraft is not directly mapped.
 */
export function getAircraftRleData(aircraftId: string, category: string, isHelicopter?: boolean): AircraftRleData {
  let data: AircraftRleData;

  if (AIRCRAFT_RLE_SPECS[aircraftId]) {
    data = { ...AIRCRAFT_RLE_SPECS[aircraftId] };
  } else if (isHelicopter || category === 'helicopter') {
    data = {
      controlArchitecture: 'helicopter_force_trim',
      controlSystemName: 'Вертолетная гидросистема с пружинными механизмами загрузки и электромагнитным тормозом Force Trim',
      rlePitchForceKg: 4.0,
      rleRollForceKg: 2.8,
      rleRudderForceKg: 5.0,
      rleGGradient: 'Отсутствует (вертолетная кинематика)',
      rleStickTravel: 'Ход циклика ~240 мм',
      rleDocument: 'Руководство по летной эксплуатации вертолета (РЛЭ / NATOPS)',
      aoaBuffetOnsetDeg: 0,
      vStallKmh: 0,
      trimMethod: 'Force Trim Release (снятие усилий кнопкой на ручке)',
      ffbEffectBreakdown: {
        pitchSpringEffect: 'simple_spring с Force Release',
        dampeningEffect: 'smart_damper (Static: 65%, Dynamic: 25%)',
        trimEffect: 'trim (Hardware Trim: force_release_allowed: true для РУС и педалей)',
        shakerEffects: 'rotor_shaker, etl_shaker, vorterx_state_shaker',
        joltsEffects: 'landing_jolt',
        rudderPedalEffect: 'Педали путевого управления: полное снятие усилий по Force Trim, лопастная вибрация хвостового винта'
      }
    };
  } else if (category === 'prop_warbird') {
    data = {
      controlArchitecture: 'mechanical',
      controlSystemName: 'Прямая обратимая механическая проводка управления без гидроусилителей с аэродинамической компенсацией',
      rlePitchForceKg: 20.0,
      rleRollForceKg: 11.0,
      rleRudderForceKg: 28.0,
      rleGGradient: '3.5 – 5.0 кгс/G',
      rleStickTravel: '+140 мм / -100 мм, ±90 мм',
      rleDocument: 'Руководство по летной эксплуатации самолета (РЛЭ / Pilot Flight Operating Instructions)',
      aoaBuffetOnsetDeg: 15.0,
      vStallKmh: 150,
      trimMethod: 'Механические триммерные колеса (смещение нейтрали РУС)',
      ffbEffectBreakdown: {
        pitchSpringEffect: 'airspeed_spring (V²) + prop_thrust_spring (обдув винтом)',
        dampeningEffect: 'smart_damper (Static: 35%, Dynamic: 65%)',
        trimEffect: 'elevator_weight + trim',
        shakerEffects: 'aoa_stall_shaker, gunfire_shaker, engine_shaker',
        joltsEffects: 'landing_jolt, gear_jolt',
        rudderPedalEffect: 'Педали: прямое аэродинамическое затяжеление руля направления до 28 кгс, обдув винта'
      }
    };
  } else if (aircraftId.includes('f-16') || aircraftId.includes('viper') || aircraftId.includes('f-22') || (category === 'modern_jet' && aircraftId.includes('fa-18'))) {
    data = {
      controlArchitecture: 'fly_by_wire',
      controlSystemName: 'Цифровая система дистанционного управления (ЭДСУ / FBW) с искусственным загрузочным механизмом',
      rlePitchForceKg: 13.0,
      rleRollForceKg: 7.0,
      rleRudderForceKg: 17.0,
      rleGGradient: '2.0 – 2.8 кгс/G',
      rleStickTravel: 'Короткоходный загрузочный механизм',
      rleDocument: 'USAF / USN Flight Control System Engineering Specification',
      aoaBuffetOnsetDeg: 18.0,
      vStallKmh: 220,
      trimMethod: 'Электронный триммер ЭДСУ',
      ffbEffectBreakdown: {
        pitchSpringEffect: 'simple_spring (характеристика загружателя FBW)',
        dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 50%)',
        trimEffect: 'trim (Hardware Trim)',
        shakerEffects: 'aoa_stall_shaker, afterburner_shaker, gunfire_shaker',
        joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt',
        rudderPedalEffect: 'Адаптивный отклик педалей с ограничением скольжения по скорости (Rudder limiter)'
      }
    };
  } else {
    // Classic jet fighter with hydraulic boosters
    data = {
      controlArchitecture: 'hydromechanical_boosted',
      controlSystemName: 'Необратимое гидробустерное управление с автоматом регулировки усилий (АРУ) и пружинными загружателями',
      rlePitchForceKg: 14.5,
      rleRollForceKg: 7.5,
      rleRudderForceKg: 20.0,
      rleGGradient: '2.4 – 3.6 кгс/G',
      rleStickTravel: '+135 мм / -95 мм, ±85 мм',
      rleDocument: 'Руководство по летной эксплуатации (РЛЭ / NATOPS Flight Manual)',
      aoaBuffetOnsetDeg: 18.0,
      vStallKmh: 220,
      trimMethod: 'Электромеханический механизм триммирования (МЭТ) со смещением центра пружинного загружателя',
      ffbEffectBreakdown: {
        pitchSpringEffect: 'simple_spring (загружатель АРУ) + airspeed_spring',
        dampeningEffect: 'smart_damper (Static: 55%, Dynamic: 55%)',
        trimEffect: 'trim (Hardware Trim)',
        shakerEffects: 'aoa_stall_shaker, afterburner_shaker, gunfire_shaker',
        joltsEffects: 'landing_jolt, gear_jolt, weapon_release_jolt',
        rudderPedalEffect: 'Педали: скоростной напор на киле, толчки передней стойки, демпфирование 80%'
      }
    };
  }

  // Ensure rleRudderForceKg is defined if omitted in individual preset
  if (!data.rleRudderForceKg) {
    if (data.controlArchitecture === 'helicopter_force_trim') {
      data.rleRudderForceKg = 5.0;
    } else if (data.controlArchitecture === 'mechanical') {
      data.rleRudderForceKg = Math.round(data.rlePitchForceKg * 1.35 * 10) / 10;
    } else {
      data.rleRudderForceKg = Math.round(data.rlePitchForceKg * 1.4 * 10) / 10;
    }
  }

  if (!data.ffbEffectBreakdown.rudderPedalEffect) {
    data.ffbEffectBreakdown.rudderPedalEffect = data.controlArchitecture === 'helicopter_force_trim'
      ? 'Путевое управление: электромагнитное снятие усилий Force Trim, вибрации хвостового винта'
      : `Педали: скоростной напор руля направления (${data.rleRudderForceKg} кгс), демпфер 80%, толчки передней стойки`;
  }

  return data;
}
