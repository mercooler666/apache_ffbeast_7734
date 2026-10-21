import type { 
  AircraftPreset, 
  HardwareRevision, 
  MotorType, 
  CurvePoint, 
  AircraftCategory,
  EffectId,
  EffectDefinition,
  SelectedEffectsMap,
  FlightStyle,
  AircraftEffortPoint,
  AircraftKeyMarker,
  AircraftEffortCurveData
} from '../types';

export const AIRCRAFT_DATABASE: AircraftPreset[] = [
  // ==========================================
  // DCS WORLD: MODERN JETS
  // ==========================================
  {
    id: 'dcs-f-15c',
    name: 'F-15C Eagle',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-15C',
    vMaxKmh: 1450,
    aoaStallDeg: 24.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin Pratt & Whitney F100-PW-220',
    description: 'Air superiority fighter with CAS hydro-mechanical pitch/roll ratio, afterburner roar, and high-G stall buffet'
  },
  {
    id: 'dcs-f-15e',
    name: 'F-15E Strike Eagle',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-15ESE',
    vMaxKmh: 1450,
    aoaStallDeg: 24.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin F100-PW-229',
    description: 'Heavy dual-role strike fighter with CAS augmentation and massive speedbrake buffeting'
  },
  {
    id: 'dcs-f-22',
    name: 'F-22A Raptor',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-22',
    vMaxKmh: 1500,
    aoaStallDeg: 35.0,
    rollPitchRatio: 0.70,
    hasAfterburner: true,
    hasAirbrake: false,
    engineType: 'Twin F119-PW-100 3D TVC',
    description: '5th-generation stealth air superiority fighter with 3D thrust vectoring and Apache combat flight feel'
  },
  {
    id: 'dcs-su-35',
    name: 'Su-35 Flanker-E',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Su-35',
    vMaxKmh: 1450,
    aoaStallDeg: 30.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin AL-41F1S with 3D TVC',
    description: 'Generation 4++ supermaneuverable fighter with KSU-35 fly-by-wire and thrust vectoring response'
  },
  {
    id: 'dcs-fa-18c',
    name: 'F/A-18C Hornet',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'FA-18C',
    vMaxKmh: 1350,
    aoaStallDeg: 25.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin F404 Turbofans',
    description: 'Fly-By-Wire carrier multirole fighter with synthetic artificial feel and G-limiting'
  },
  {
    id: 'dcs-f-16c',
    name: 'F-16C Viper Block 50',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-16C_50',
    vMaxKmh: 1450,
    aoaStallDeg: 22.0,
    rollPitchRatio: 0.70,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Single F110-GE-129',
    description: 'Fixed-force transducer side-stick FBW interceptor with ultra-stiff response'
  },
  {
    id: 'dcs-f-14a',
    name: 'F-14A Tomcat',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-14A',
    vMaxKmh: 1400,
    aoaStallDeg: 18.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin Pratt & Whitney TF30',
    description: 'Carrier-borne swing-wing interceptor with heavy mechanical-hydraulic feel springs'
  },
  {
    id: 'dcs-f-14b',
    name: 'F-14B Tomcat',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-14B',
    vMaxKmh: 1400,
    aoaStallDeg: 18.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin GE F110',
    description: 'Heavy carrier-borne swing-wing fighter with hydraulic feel springs and Mach trim'
  },
  {
    id: 'dcs-a-10c2',
    name: 'A-10C II Tank Killer',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'A-10C_2',
    vMaxKmh: 750,
    aoaStallDeg: 19.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Twin TF34-GE-100',
    description: 'Subsonic attack jet with heavy hydraulic boost, dual SAS, and GAU-8 30mm recoil vibrations'
  },
  {
    id: 'dcs-su-27',
    name: 'Su-27 Flanker',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Su-27',
    vMaxKmh: 1400,
    aoaStallDeg: 26.0,
    rollPitchRatio: 0.60,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin AL-31F',
    description: 'Supermaneuverable fighter with ARU longitudinal feel and dynamic Q-feel airspeed loading'
  },
  {
    id: 'dcs-su-33',
    name: 'Su-33 Flanker-D',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Su-33',
    vMaxKmh: 1350,
    aoaStallDeg: 26.0,
    rollPitchRatio: 0.60,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin AL-31F',
    description: 'Carrier-based naval fighter with canards, high lift wing, and heavier carrier approach feel'
  },
  {
    id: 'dcs-mig-29s',
    name: 'MiG-29S Fulcrum-C',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'MiG-29S',
    vMaxKmh: 1400,
    aoaStallDeg: 24.0,
    rollPitchRatio: 0.60,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin RD-33',
    description: 'Frontline fighter with hydraulic power boosters and high-alpha stall warning shakers'
  },
  {
    id: 'dcs-su-25t',
    name: 'Su-25T Frogfoot',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Su-25T',
    vMaxKmh: 850,
    aoaStallDeg: 19.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Twin R-195',
    description: 'Armored ground attack jet with heavy mechanical linkages and high aerodynamic resistance'
  },
  {
    id: 'dcs-m2000c',
    name: 'Mirage 2000C',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'M-2000C',
    vMaxKmh: 1450,
    aoaStallDeg: 28.0,
    rollPitchRatio: 0.70,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'SNECMA M53-P2',
    description: 'Delta-wing interceptor with advanced FBW elevon control and smooth synthetic feedback'
  },
  {
    id: 'dcs-jf17',
    name: 'JF-17 Thunder',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'JF-17',
    vMaxKmh: 1350,
    aoaStallDeg: 24.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'RD-93 Turbofan',
    description: 'Lightweight multirole fighter with full digital 3-axis Fly-By-Wire flight envelope limiting'
  },
  {
    id: 'dcs-av8b',
    name: 'AV-8B Night Attack V/STOL',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'AV8BNA',
    vMaxKmh: 1050,
    aoaStallDeg: 18.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Rolls-Royce Pegasus',
    description: 'Harrier jump jet with reaction control puffers in hover and hydraulic flight feel in cruise'
  },
  {
    id: 'dcs-ajs37',
    name: 'AJS-37 Viggen',
    category: 'modern_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'AJS37',
    vMaxKmh: 1400,
    aoaStallDeg: 25.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Volvo RM8A',
    description: 'Canard strike jet designed for ultra-low level supersonic dash with heavy high-speed stick'
  },

  // ==========================================
  // DCS WORLD: COLD WAR & TRAINERS
  // ==========================================
  {
    id: 'dcs-f4e',
    name: 'F-4E Phantom II',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-4E-45MC',
    vMaxKmh: 1450,
    aoaStallDeg: 19.0,
    rollPitchRatio: 0.60,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin J79-GE-17',
    description: 'Legendary heavy supersonic interceptor with artificial feel bellows, pitch augment, and heavy roll'
  },
  {
    id: 'dcs-f5e',
    name: 'F-5E Tiger II',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-5E-3',
    vMaxKmh: 1100,
    aoaStallDeg: 20.0,
    rollPitchRatio: 0.55,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin J85-GE-21',
    description: 'Nimble lightweight tactical fighter with direct hydraulic feel springs and fast roll rate'
  },
  {
    id: 'dcs-mig21bis',
    name: 'MiG-21bis Fishbed',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'MiG-21Bis',
    vMaxKmh: 1350,
    aoaStallDeg: 22.0,
    rollPitchRatio: 0.55,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Tumansky R-25-300',
    description: 'Mach 2 delta fighter with ARU-3V automatic gear ratio and very heavy stick at transonic speeds'
  },
  {
    id: 'dcs-mig19p',
    name: 'MiG-19P Farmer',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'MiG-19P',
    vMaxKmh: 1250,
    aoaStallDeg: 18.0,
    rollPitchRatio: 0.50,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin RD-9B',
    description: 'First Soviet supersonic jet with early unassisted hydraulic boosters and high stick loads'
  },
  {
    id: 'dcs-f86f',
    name: 'F-86F Sabre',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'F-86F Sabre',
    vMaxKmh: 1100,
    aoaStallDeg: 17.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'J47-GE-27',
    description: 'Korean war fighter with hydraulically boosted flying tail and smooth, precise control harmony'
  },
  {
    id: 'dcs-mig15bis',
    name: 'MiG-15bis Fagot',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'MiG-15bis',
    vMaxKmh: 1070,
    aoaStallDeg: 18.0,
    rollPitchRatio: 0.50,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Klimov VK-1',
    description: 'Classic swept-wing fighter with direct manual elevator cables and hydraulic aileron booster'
  },
  {
    id: 'dcs-l39c',
    name: 'L-39C Albatros',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'L-39C',
    vMaxKmh: 750,
    aoaStallDeg: 16.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'AI-25TL Turbofan',
    description: 'Standard military jet trainer with unboosted manual control pushrods and pure aerodynamic feel'
  },
  {
    id: 'dcs-mb339',
    name: 'MB-339A',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'MB-339',
    vMaxKmh: 900,
    aoaStallDeg: 17.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Rolls-Royce Viper Mk. 632',
    description: 'Italian military jet trainer and light attack aircraft with linear aerodynamic pushrod response'
  },
  {
    id: 'dcs-a4e',
    name: 'A-4E-C Skyhawk',
    category: 'cold_war_jet',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'A-4E-C',
    vMaxKmh: 1080,
    aoaStallDeg: 19.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Pratt & Whitney J52',
    description: 'Carrier attack jet with nimble roll rate, leading edge slats, and mechanical control feedback'
  },

  // ==========================================
  // DCS WORLD: WWII WARBIRDS
  // ==========================================
  {
    id: 'dcs-spitfire-ix',
    name: 'Spitfire LF Mk.IX',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'SpitfireLFMkIX',
    vMaxKmh: 650,
    aoaStallDeg: 15.0,
    rollPitchRatio: 0.50,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Rolls-Royce Merlin 66',
    description: 'Legendary elliptical-wing fighter with ultra-light elevator, propwash slipstream, and engine rumble'
  },
  {
    id: 'dcs-bf109k4',
    name: 'Bf 109 K-4 Kurfürst',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Bf-109K-4',
    vMaxKmh: 710,
    aoaStallDeg: 16.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Daimler-Benz DB 605DC',
    description: 'High-speed interceptor with automatic leading-edge slats and heavy high-speed stick forces'
  },
  {
    id: 'dcs-fw190d9',
    name: 'Fw 190 D-9 Dora',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'FW-190D9',
    vMaxKmh: 710,
    aoaStallDeg: 17.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Junkers Jumo 213A',
    description: 'High-altitude fighter with fast roll rate, electric stabilizer trim, and massive dive authority'
  },
  {
    id: 'dcs-fw190a8',
    name: 'Fw 190 A-8 Würger',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'FW-190A8',
    vMaxKmh: 650,
    aoaStallDeg: 16.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'BMW 801 Radial',
    description: 'Radial engine fighter with pushrod control linkages, heavy elevator, and 4x20mm cannon recoil'
  },
  {
    id: 'dcs-p51d',
    name: 'P-51D Mustang',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'P-51D',
    vMaxKmh: 750,
    aoaStallDeg: 17.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Packard V-1650 Merlin',
    description: 'Long-range escort fighter with laminar flow wing and strong aerodynamic control surface loading'
  },
  {
    id: 'dcs-p47d',
    name: 'P-47D-30 Thunderbolt',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'P-47D-30',
    vMaxKmh: 740,
    aoaStallDeg: 16.0,
    rollPitchRatio: 0.50,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Pratt & Whitney R-2800',
    description: 'Massive heavy fighter with hydraulic dive recovery flaps and heavy high-speed control feel'
  },
  {
    id: 'dcs-mosquito',
    name: 'Mosquito FB Mk.VI',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'MosquitoFBMkVI',
    vMaxKmh: 640,
    aoaStallDeg: 15.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin Rolls-Royce Merlin',
    description: 'Wooden wonder twin-engine strike aircraft with differential engine propwash and high stability'
  },
  {
    id: 'dcs-yak52',
    name: 'Yak-52 Trainer',
    category: 'prop_warbird',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'YAK-52 MS 1.0',
    vMaxKmh: 420,
    aoaStallDeg: 14.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Vedeneyev M14P Radial',
    description: 'Soviet aerobatic trainer with direct pushrod/cable linkages and realistic spin behavior'
  },

  // ==========================================
  // DCS WORLD: HELICOPTERS (ROTARY WING)
  // ==========================================
  {
    id: 'dcs-uh1h',
    name: 'UH-1H Iroquois (Huey)',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'UH-1H',
    vMaxKmh: 220,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Lycoming T53 Turboshaft',
    description: 'Iconic Vietnam utility helicopter: zero mechanical spring centering, hydraulic damping, blade vortex thumping',
    isHelicopter: true
  },
  {
    id: 'dcs-mi8',
    name: 'Mi-8MTV2 Magnificent Eight',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Mi-8MT',
    vMaxKmh: 250,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin Klimov TV3-117',
    description: 'Heavy medium-lift helicopter with irreversible hydraulic boosters and magnetic brake force trim',
    isHelicopter: true
  },
  {
    id: 'dcs-mi24p',
    name: 'Mi-24P Hind-F',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Mi-24P',
    vMaxKmh: 335,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin Klimov TV3-117',
    description: 'High-speed attack gunship with small wings providing lift at speed and heavy collective/cyclic damping',
    isHelicopter: true
  },
  {
    id: 'dcs-ka50',
    name: 'Ka-50 Black Shark III',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'Ka-50_3',
    vMaxKmh: 315,
    aoaStallDeg: 0,
    rollPitchRatio: 0.90,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin Klimov TV3-117',
    description: 'Single-seat coaxial attack helicopter with advanced autopilot hold channels and magnetic trimmer',
    isHelicopter: true
  },
  {
    id: 'dcs-ah64d',
    name: 'AH-64D Apache Longbow',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'AH-64D_BLK_II',
    vMaxKmh: 295,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin GE T700',
    description: 'Dedicated tank-hunter helicopter with SAS/SCAS digital flight stabilization and force trim release button',
    isHelicopter: true
  },
  {
    id: 'dcs-oh58d',
    name: 'OH-58D Kiowa Warrior',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'OH58D',
    vMaxKmh: 240,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Rolls-Royce T703',
    description: 'Armed reconnaissance helicopter with highly sensitive, low-inertia cyclic and mast-mounted sight',
    isHelicopter: true
  },
  {
    id: 'dcs-ch47f',
    name: 'CH-47F Chinook',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'CH-47F',
    vMaxKmh: 310,
    aoaStallDeg: 0,
    rollPitchRatio: 0.90,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin Honeywell T55',
    description: 'Tandem rotor heavy-lift helicopter with DAFCS flight control computer and very heavy cyclic damping',
    isHelicopter: true
  },
  {
    id: 'dcs-ah6j',
    name: 'AH-6J / OH-6A Little Bird',
    category: 'helicopter',
    simName: 'DCS World',
    simCode: 1,
    moduleCode: 'AH-6J',
    vMaxKmh: 240,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Allison 250 Turboshaft',
    description: 'Light attack and recon helicopter with ultra-fast agile cyclic and rotor blade pass harmonics',
    isHelicopter: true
  },

  // ==========================================
  // WAR THUNDER: TOP-TIER & MODERN JETS
  // ==========================================
  {
    id: 'wt-f16c',
    name: 'F-16C Block 50 (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'f_16c_block_50',
    vMaxKmh: 1450,
    aoaStallDeg: 22.0,
    rollPitchRatio: 0.70,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Turbofan',
    description: 'Top-tier FBW dogfighter with electronic limiters and M61A1 Vulcan recoil'
  },
  {
    id: 'wt-su27',
    name: 'Su-27 / Su-27SM (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'su_27',
    vMaxKmh: 1400,
    aoaStallDeg: 26.0,
    rollPitchRatio: 0.60,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin AL-31F',
    description: 'Heavy Soviet air superiority fighter with high G-onset and speedbrake buffet'
  },
  {
    id: 'wt-mig29smt',
    name: 'MiG-29SMT (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'mig_29smt',
    vMaxKmh: 1400,
    aoaStallDeg: 24.0,
    rollPitchRatio: 0.60,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin RD-33',
    description: 'Modernized Fulcrum with fly-by-wire rudder control and 30mm GSh-30-1 recoil'
  },
  {
    id: 'wt-gripen',
    name: 'JAS39C Gripen (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'jas39c',
    vMaxKmh: 1400,
    aoaStallDeg: 28.0,
    rollPitchRatio: 0.70,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Volvo RM12',
    description: 'Swedish delta-canard FBW fighter with extreme instantaneous pitch rates'
  },
  {
    id: 'wt-f15c',
    name: 'F-15C MSIP II (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'f_15c_msip2',
    vMaxKmh: 1450,
    aoaStallDeg: 23.0,
    rollPitchRatio: 0.65,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'Twin F100',
    description: 'Air superiority king with immense thrust and hydraulic stick centering'
  },
  {
    id: 'wt-m2000-5f',
    name: 'Mirage 2000-5F (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'mirage_2000_5f',
    vMaxKmh: 1450,
    aoaStallDeg: 28.0,
    rollPitchRatio: 0.70,
    hasAfterburner: true,
    hasAirbrake: true,
    engineType: 'SNECMA M53',
    description: 'French tailless delta interceptor with high roll rate and smooth FBW feel'
  },
  {
    id: 'wt-su25sm3',
    name: 'Su-25SM3 (War Thunder)',
    category: 'modern_jet',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'su_25sm3',
    vMaxKmh: 850,
    aoaStallDeg: 19.0,
    rollPitchRatio: 0.60,
    hasAfterburner: false,
    hasAirbrake: true,
    engineType: 'Twin R-195',
    description: 'Modernized attack jet with heavy pitch stick and high aerodynamic drag feel'
  },

  // ==========================================
  // WAR THUNDER: WWII WARBIRDS & COLD WAR
  // ==========================================
  {
    id: 'wt-yak3',
    name: 'Yak-3 / Yak-3P (War Thunder)',
    category: 'prop_warbird',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'yak_3',
    vMaxKmh: 650,
    aoaStallDeg: 16.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'VK-105PF2',
    description: 'Ultra-lightweight low-altitude dogfighter with super responsive elevator and rapid climb'
  },
  {
    id: 'wt-la7',
    name: 'La-7 (War Thunder)',
    category: 'prop_warbird',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'la_7',
    vMaxKmh: 680,
    aoaStallDeg: 17.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Ash-82FN Radial',
    description: 'Powerful Soviet fighter with automatic slats, heavy propwash, and cannon vibration'
  },
  {
    id: 'wt-bf109k4',
    name: 'Bf 109 K-4 (War Thunder)',
    category: 'prop_warbird',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'bf_109k_4',
    vMaxKmh: 710,
    aoaStallDeg: 16.0,
    rollPitchRatio: 0.55,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'DB 605',
    description: 'Late-war German interceptor with MW50 water-methanol boost and stiff high-speed controls'
  },
  {
    id: 'wt-spitfire-mk9',
    name: 'Spitfire F Mk IX (War Thunder)',
    category: 'prop_warbird',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'spitfire_ix',
    vMaxKmh: 650,
    aoaStallDeg: 15.0,
    rollPitchRatio: 0.50,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Merlin 60',
    description: 'Classic British turn-fighter with sharp elevator response and aerodynamic control stiffening'
  },
  {
    id: 'wt-a6m5',
    name: 'A6M5 Zero (War Thunder)',
    category: 'prop_warbird',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'a6m5',
    vMaxKmh: 565,
    aoaStallDeg: 14.0,
    rollPitchRatio: 0.50,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Nakajima Sakae',
    description: 'Extremely agile Japanese naval fighter with feather-light stick at low speeds and heavy high-speed lockup'
  },

  // ==========================================
  // WAR THUNDER: HELICOPTERS
  // ==========================================
  {
    id: 'wt-ka52',
    name: 'Ka-52 Alligator (War Thunder)',
    category: 'helicopter',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'ka_52',
    vMaxKmh: 315,
    aoaStallDeg: 0,
    rollPitchRatio: 0.90,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin VK-2500',
    description: 'Modern coaxial attack helicopter with auto-hover damping, force trim, and 30mm 2A42 cannon recoil',
    isHelicopter: true
  },
  {
    id: 'wt-mi28nm',
    name: 'Mi-28NM Havoc (War Thunder)',
    category: 'helicopter',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'mi_28nm',
    vMaxKmh: 320,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin VK-2500P',
    description: 'All-weather gunship with mast radar, heavy hydraulic feedback, and massive 30mm chin turret kick',
    isHelicopter: true
  },
  {
    id: 'wt-ah64d',
    name: 'AH-64D Apache (War Thunder)',
    category: 'helicopter',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'ah_64d',
    vMaxKmh: 295,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin T700-GE-701C',
    description: 'US Army tank killer with Longbow radar, stability augmentation damping, and 30mm chain gun recoil',
    isHelicopter: true
  },
  {
    id: 'wt-tiger-uht',
    name: 'EC-665 Tiger UHT (War Thunder)',
    category: 'helicopter',
    simName: 'War Thunder',
    simCode: 4,
    moduleCode: 'tiger_uht',
    vMaxKmh: 310,
    aoaStallDeg: 0,
    rollPitchRatio: 0.85,
    hasAfterburner: false,
    hasAirbrake: false,
    engineType: 'Twin MTR390',
    description: 'Eurocopter composite stealth scout/attack helicopter with agile rigid rotor cyclic response',
    isHelicopter: true
  }
];

export const MOTOR_RATINGS: Record<MotorType, { name: string; maxTorqueNm: number }> = {
  hoverboard_30mm: { name: 'Hoverboard BLDC (30mm stator)', maxTorqueNm: 15.0 },
  hoverboard_25mm: { name: 'Hoverboard BLDC (25mm stator)', maxTorqueNm: 12.7 },
  hoverboard_20mm: { name: 'Hoverboard BLDC (20mm stator)', maxTorqueNm: 10.9 },
  ac_servo_mige: { name: 'Industrial AC Servo Motor', maxTorqueNm: 22.0 }
};

export function generateParabolicCurve(maxIn: number, maxOut: number, points = 11): CurvePoint[] {
  const curve: CurvePoint[] = [];
  const step = maxIn / (points - 1);
  for (let i = 0; i < points; i++) {
    const valIn = Number((i * step).toFixed(1));
    const normalized = maxIn > 0 ? valIn / maxIn : 0;
    const valOut = Number(((normalized ** 2) * maxOut).toFixed(3));
    curve.push({ in: valIn, out: valOut });
  }
  return curve;
}

export function generateLinearCurve(maxIn: number, maxOut: number, points = 11): CurvePoint[] {
  const curve: CurvePoint[] = [];
  const step = maxIn / (points - 1);
  for (let i = 0; i < points; i++) {
    const valIn = Number((i * step).toFixed(1));
    const normalized = maxIn > 0 ? valIn / maxIn : 0;
    const valOut = Number((normalized * maxOut).toFixed(3));
    curve.push({ in: valIn, out: valOut });
  }
  return curve;
}

export function generateSCurve(maxIn: number, maxOut: number, points = 11): CurvePoint[] {
  const curve: CurvePoint[] = [];
  const step = maxIn / (points - 1);
  for (let i = 0; i < points; i++) {
    const valIn = Number((i * step).toFixed(1));
    const x = maxIn > 0 ? (valIn / maxIn - 0.5) * 6 : 0;
    const sig = 1 / (1 + Math.exp(-x));
    const valOut = Number((sig * maxOut).toFixed(3));
    curve.push({ in: valIn, out: valOut });
  }
  return curve;
}

/**
 * Generates the authentic 11-point symmetrical S-curve for FFB control response.
 * Features a tactile tight center detent (-2.97% to +2.97%) without slop,
 * smoothly transitioning to maximum holding force at extreme travel.
 */
export function generateRealForceSCurve(targetForceKg: number): CurvePoint[] {
  const rawRatios: [number, number][] = [
    [-100, -1.0],
    [-76, -0.768],
    [-51.5, -0.548],
    [-26, -0.315],
    [-2.97, -0.086],
    [0, 0],
    [2.97, 0.086],
    [26, 0.315],
    [51.5, 0.548],
    [76, 0.768],
    [100, 1.0]
  ];
  return rawRatios.map(([inVal, ratio]) => ({
    in: inVal,
    out: Number((ratio * targetForceKg).toFixed(3))
  }));
}

/**
 * Generates the authentic aircraft-specific aerodynamic loading curve.
 * Accurately models physical forces based on flight envelope:
 * - WWII Warbirds: Q ~ V^2 dynamic pressure with propeller wash slipstream at 0 km/h.
 * - Modern Supersonic Jets: ARU hydraulic Q-feel with transonic Mach wave stiffening step.
 * - FBW Fighters (F-16): Isometric side-stick force transducer response with G-command ramp.
 * - Helicopters: Cyclic force trim detent, ETL (Effective Translational Lift) transitional aerodynamic hump, and high-speed retreating blade stall damping.
 */
export function generateAircraftEffortCurve(
  aircraft: AircraftPreset,
  effectivePitchForceKg: number,
  _flightStyle: FlightStyle
): AircraftEffortCurveData {
  const isHeli = aircraft.isHelicopter || aircraft.category === 'helicopter';
  const isWarbird = aircraft.category === 'prop_warbird';
  const isFbw = aircraft.id === 'dcs-f-16c' || aircraft.name.toLowerCase().includes('f-16') || aircraft.name.toLowerCase().includes('viper');
  const vMax = aircraft.vMaxKmh || (isHeli ? 280 : isWarbird ? 750 : 1450);

  const pointsCount = 17;
  const points: AircraftEffortPoint[] = [];
  const keyMarkers: AircraftKeyMarker[] = [];
  let title = '';
  let subtitle = '';
  let physicsModel = '';
  let xAxisLabel = `Скорость полета IAS (0 — ${vMax} км/ч)`;
  let yAxisLabel = `Усилие на ручке (0 — ${effectivePitchForceKg} кг)`;

  if (isHeli) {
    title = `Характеристика усилий циклика: ${aircraft.name}`;
    subtitle = `Триммирование Force Trim + Smart Damper + Переходный режим ETL`;
    physicsModel = `Аэродинамический напор несущего винта и гидравлическое сопротивление`;
    xAxisLabel = `Скорость полета (0 — ${vMax} км/ч)`;
    yAxisLabel = `Сопротивление циклика (0 — ${effectivePitchForceKg} кг)`;

    const baseForce = Number((effectivePitchForceKg * 0.15).toFixed(2));
    const etlPeak = Number((effectivePitchForceKg * 0.38).toFixed(2));
    const cruiseForce = Number((effectivePitchForceKg * 0.62).toFixed(2));
    const maxHeliForce = effectivePitchForceKg;

    for (let i = 0; i < pointsCount; i++) {
      const v = Math.round((i / (pointsCount - 1)) * vMax);
      let f: number;
      if (v <= 25) {
        f = baseForce + (v / 25) * 0.1 * effectivePitchForceKg;
      } else if (v <= 55) {
        // ETL hump around 35-50 km/h
        const etlRatio = (v - 25) / 30;
        f = baseForce + 0.1 * effectivePitchForceKg + Math.sin(etlRatio * Math.PI) * 0.15 * effectivePitchForceKg;
      } else if (v <= 180) {
        const cruiseRatio = (v - 55) / 125;
        f = (baseForce + 0.12 * effectivePitchForceKg) + cruiseRatio * (cruiseForce - (baseForce + 0.12 * effectivePitchForceKg));
      } else {
        const highRatio = (v - 180) / (vMax - 180);
        f = cruiseForce + (highRatio ** 1.8) * (maxHeliForce - cruiseForce);
      }
      f = Math.min(effectivePitchForceKg, Math.max(0.1, Number(f.toFixed(2))));
      points.push({ speedKmh: v, forceKg: f });
    }

    keyMarkers.push(
      { icon: '🚁', phase: 'Висение (Hover)', speed: '0 км/ч', force: `${baseForce} кг`, note: 'Force Trim / Нейтраль автомата перекоса' },
      { icon: '🌪️', phase: 'Переход ETL', speed: '40–50 км/ч', force: `${etlPeak} кг`, note: 'Косая обдувка и вспухание вертолета' },
      { icon: '💨', phase: 'Крейсерский полет', speed: '180 км/ч', force: `${cruiseForce} кг`, note: 'Гидравлическое демпфирование ручки' },
      { icon: '⚠️', phase: 'Предел Vne', speed: `${vMax} км/ч`, force: `${maxHeliForce} кг`, note: 'Срыв на отступающей лопасти' }
    );
  } else if (isWarbird) {
    title = `Аэродинамическая кривая усилий: ${aircraft.name}`;
    subtitle = `Квадратичный скоростной напор (Q ~ V²) + Обдув оперения винтом`;
    physicsModel = `Аэродинамический шарнирный момент руля высоты`;

    const propwashForce = Number((effectivePitchForceKg * 0.16).toFixed(2));
    const takeoffSpeed = Math.round(vMax * 0.35); // ~260 km/h for P-51D
    const cruiseSpeed = Math.round(vMax * 0.65); // ~485 km/h
    
    for (let i = 0; i < pointsCount; i++) {
      const v = Math.round((i / (pointsCount - 1)) * vMax);
      const ratio = v / vMax;
      // F(V) = F0 + (Fmax - F0) * (V/Vmax)^2
      const f = Number((propwashForce + (effectivePitchForceKg - propwashForce) * (ratio ** 2)).toFixed(2));
      points.push({ speedKmh: v, forceKg: f });
    }

    const takeoffForce = Number((propwashForce + (effectivePitchForceKg - propwashForce) * ((takeoffSpeed / vMax) ** 2)).toFixed(2));
    const cruiseForce = Number((propwashForce + (effectivePitchForceKg - propwashForce) * ((cruiseSpeed / vMax) ** 2)).toFixed(2));

    keyMarkers.push(
      { icon: '🛩️', phase: 'Стоянка (Газовка)', speed: '0 км/ч', force: `${propwashForce} кг`, note: 'Обдув рулей струей от винта' },
      { icon: '🛫', phase: 'Взлет / Отрыв', speed: `${takeoffSpeed} км/ч`, force: `${takeoffForce} кг`, note: 'Начало эффективного набегающего потока' },
      { icon: '⚔️', phase: 'Боевой крейсер', speed: `${cruiseSpeed} км/ч`, force: `${cruiseForce} кг`, note: 'Оптимальная маневренность и загрузка' },
      { icon: '⚡', phase: 'Пикирование Vmax', speed: `${vMax} км/ч`, force: `${effectivePitchForceKg} кг`, note: 'Предельное затяжеление ручки (Lockup)' }
    );
  } else if (isFbw) {
    title = `Характеристика тензодатчика FBW: ${aircraft.name}`;
    subtitle = `Изометрический датчик силы по перегрузке (G-Demand & Roll Rate)`;
    physicsModel = `ЭДСУ / Fly-by-wire с пропорциональным тензо-откликом`;
    xAxisLabel = `Скоростной диапазон и перегрузка Ny (0 — ${vMax} км/ч / до 9G)`;
    yAxisLabel = `Прилагаемое физическое усилие (0 — ${effectivePitchForceKg} кг)`;

    for (let i = 0; i < pointsCount; i++) {
      const v = Math.round((i / (pointsCount - 1)) * vMax);
      const ratio = v / vMax;
      const f = Number((0.15 * effectivePitchForceKg + (effectivePitchForceKg * 0.85) * (ratio ** 1.35)).toFixed(2));
      points.push({ speedKmh: v, forceKg: f });
    }

    keyMarkers.push(
      { icon: '🕹️', phase: '1G Горизонт', speed: '300 км/ч', force: `${(effectivePitchForceKg * 0.18).toFixed(1)} кг`, note: 'Нейтральное удержание траектории' },
      { icon: '🔄', phase: '4G Маневр', speed: '650 км/ч', force: `${(effectivePitchForceKg * 0.45).toFixed(1)} кг`, note: 'Боевой разворот с контролем угла' },
      { icon: '💥', phase: '7G Форсажный вираж', speed: '950 км/ч', force: `${(effectivePitchForceKg * 0.78).toFixed(1)} кг`, note: 'Тяжелое натяжение сайдстика' },
      { icon: '🚀', phase: '9G Предел катапульты', speed: `${vMax} км/ч`, force: `${effectivePitchForceKg} кг`, note: 'Максимальный упор тензодатчика' }
    );
  } else {
    // Modern & Cold war supersonic jets (F-15C, Su-27, Su-35, MiG-29, F-14)
    title = `Кривая гидроусилий и АРУ (Q-Feel): ${aircraft.name}`;
    subtitle = `АРУ (Автомат регулирования усилий) + Трансзвуковой барьер (Mach Stiffening)`;
    physicsModel = `Гидравлический загружатель с компенсацией скоростного напора`;

    const baseSpring = Number((effectivePitchForceKg * 0.15).toFixed(2));
    const transSpeed = Math.round(vMax * 0.65); // ~950 km/h (transonic Mach 0.9 - 1.05)

    for (let i = 0; i < pointsCount; i++) {
      const v = Math.round((i / (pointsCount - 1)) * vMax);
      let f: number;
      if (v < transSpeed * 0.8) {
        // Subsonic
        const subRatio = v / (transSpeed * 0.8);
        f = baseSpring + (effectivePitchForceKg * 0.35) * (subRatio ** 1.8);
      } else if (v <= transSpeed * 1.15) {
        // Transonic Mach wave stiffening step
        const transRatio = (v - transSpeed * 0.8) / (transSpeed * 0.35);
        const transStep = 1 / (1 + Math.exp(-6 * (transRatio - 0.5)));
        f = baseSpring + (effectivePitchForceKg * 0.35) + transStep * (effectivePitchForceKg * 0.35);
      } else {
        // Supersonic dash
        const superRatio = (v - transSpeed * 1.15) / (vMax - transSpeed * 1.15);
        f = baseSpring + (effectivePitchForceKg * 0.70) + (superRatio ** 1.2) * (effectivePitchForceKg * 0.15);
      }
      f = Math.min(effectivePitchForceKg, Math.max(0.1, Number(f.toFixed(2))));
      points.push({ speedKmh: v, forceKg: f });
    }

    const maneuverSpeed = Math.round(vMax * 0.35);
    const mForce = points.find(p => p.speedKmh >= maneuverSpeed)?.forceKg || Number((effectivePitchForceKg * 0.35).toFixed(1));
    const tForce = points.find(p => p.speedKmh >= transSpeed)?.forceKg || Number((effectivePitchForceKg * 0.72).toFixed(1));

    keyMarkers.push(
      { icon: '🛫', phase: 'Взлет / Руление', speed: '0–250 км/ч', force: `${baseSpring} кг`, note: 'Базовая центровка пружины АРУ' },
      { icon: '🎯', phase: 'Дозвуковой маневр', speed: `${maneuverSpeed} км/ч`, force: `${mForce} кг`, note: 'Плавный отклик гидроусилителей' },
      { icon: '⚡', phase: 'Трансзвук (Mach 0.95)', speed: `${transSpeed} км/ч`, force: `${tForce} кг`, note: 'Скачок плотности и уплотнение ручки' },
      { icon: '🔥', phase: 'Сверхзвук (Vmax)', speed: `${vMax} км/ч`, force: `${effectivePitchForceKg} кг`, note: 'Предельный упор автомата загрузки' }
    );
  }

  return {
    title,
    subtitle,
    physicsModel,
    xAxisLabel,
    yAxisLabel,
    maxSpeedKmh: vMax,
    maxForceKg: effectivePitchForceKg,
    points,
    keyMarkers
  };
}

/**
 * Catalog of all 28 physical & aerodynamic effects supported by FFBeast Commander
 * according to instruction.pdf and high-fidelity flight control profiles.
 */
export const EFFECT_DEFINITIONS: EffectDefinition[] = [
  // 1. SPRINGS & CENTERING
  {
    id: 'simple_spring',
    name: 'Базовое центрирование (Эталонная S-кривая FFB)',
    group: 'springs',
    categoryTag: 'Центрирование',
    description: 'Двухсторонняя 11-точечная S-кривая с прогрессией усилия и четким околонулевым упором (-2.97%..+2.97%).',
    defaultEnabled: true
  },
  {
    id: 'airspeed_spring',
    name: 'Скоростной напор (Q-Feel V²)',
    group: 'springs',
    categoryTag: 'Аэродинамика',
    description: 'Параболическое увеличение тяжести ручки по мере роста приборной скорости полета (IAS).',
    isHelicopterOnly: false,
    defaultEnabled: true
  },
  {
    id: 'prop_thrust_spring',
    name: 'Обдув винтом (Prop Thrust)',
    group: 'springs',
    categoryTag: 'Винтовые',
    description: 'Упругость рулей высоты и элеронов от воздушного потока винта даже при нулевой скорости на полосе.',
    isWarbirdOnly: true,
    defaultEnabled: false
  },
  {
    id: 'aoa_spring',
    name: 'Загрузка по углу атаки (AoA Spring)',
    group: 'springs',
    categoryTag: 'Аэродинамика',
    description: 'Дополнительное нарастание сопротивления ручки при выходе на критические углы атаки.',
    defaultEnabled: true
  },
  {
    id: 'g_force_spring',
    name: 'Загрузка по перегрузке (G-Force Spring)',
    group: 'springs',
    categoryTag: 'Перегрузка',
    description: 'Физическое сопротивление вытягиванию ручки «на себя» пропорционально текущей перегрузке Ny.',
    defaultEnabled: true
  },

  // 2. HYDRAULICS & TRIM
  {
    id: 'smart_damper',
    name: 'Умный гидравлический демпфер (Smart Damper)',
    group: 'hydraulics',
    categoryTag: 'Гидравлика',
    description: 'Раздельное статическое и динамическое гидросопротивление: гасит автоколебания и дает плавный ход.',
    defaultEnabled: true
  },
  {
    id: 'trim',
    name: 'Аппаратный триммер FFBeast',
    group: 'hydraulics',
    categoryTag: 'Триммер',
    description: 'Поддержка кнопок электротриммирования, сброса триммера и аппаратного режима Force Release (снятие усилий).',
    defaultEnabled: true
  },
  {
    id: 'elevator_weight',
    name: 'Гравитационный вес руля высоты (Elevator Weight)',
    group: 'hydraulics',
    categoryTag: 'Гравитация',
    description: 'Имитация провисания руля высоты вниз под действием собственного веса на стоянке и перегрузках.',
    defaultEnabled: false
  },
  {
    id: 'local_aoa',
    name: 'Местный угол атаки оперения (Local AoA)',
    group: 'hydraulics',
    categoryTag: 'Аэродинамика',
    description: 'Учет скоса потока на горизонтальном оперении для ультраточного расчета усилий.',
    defaultEnabled: false
  },

  // 3. SHAKERS & VIBRATIONS
  {
    id: 'aoa_shaker',
    name: 'Тряска сваливания (AoA Stall Buffet)',
    group: 'shakers',
    categoryTag: 'Сваливание',
    description: 'Тактильная вибрация ручки при приближении к критическим углам атаки перед срывом потока.',
    defaultEnabled: true
  },
  {
    id: 'overspeed_shaker',
    name: 'Тряска предельной скорости (Mach / Overspeed)',
    group: 'shakers',
    categoryTag: 'Флаттер',
    description: 'Высокочастотная вибрация и флаттер при превышении допустимого числа Маха или Vne.',
    defaultEnabled: true
  },
  {
    id: 'afterburner_shaker',
    name: 'Гул и вибрация форсажа (Afterburner Shaker)',
    group: 'shakers',
    categoryTag: 'Двигатели',
    description: 'Низкочастотный гул и мощная вибрация при включении форсажных камер сгорания.',
    isJetOnly: true,
    defaultEnabled: true
  },
  {
    id: 'airbrake_shaker',
    name: 'Бафтинг тормозного щитка (Airbrake Shaker)',
    group: 'shakers',
    categoryTag: 'Тормоз',
    description: 'Турбулентная тряска от срыва воздушного потока с выпущенного аэродинамического тормоза.',
    defaultEnabled: true
  },
  {
    id: 'flaps_shaker',
    name: 'Вибрация механизации крыла (Flaps Shaker)',
    group: 'shakers',
    categoryTag: 'Закрылки',
    description: 'Вибрация набегающего потока при выпущенных закрылках и предкрылках на скорости.',
    defaultEnabled: true
  },
  {
    id: 'gear_shaker',
    name: 'Турбулентность шасси (Gear Shaker)',
    group: 'shakers',
    categoryTag: 'Шасси',
    description: 'Аэродинамическая вибрация от выпущенных стоек и створок шасси.',
    defaultEnabled: true
  },
  {
    id: 'on_ground_shaker',
    name: 'Неровности ВПП и грунта (On-Ground Shaker)',
    group: 'shakers',
    categoryTag: 'ВПП / Полоса',
    description: 'Тряска колес по стыкам бетонных плит, швам и неровностям грунта при разбеге и пробеге.',
    defaultEnabled: true
  },
  {
    id: 'gunfire_shaker',
    name: 'Пушечная отдача (Gunfire Recoil Shaker)',
    group: 'shakers',
    categoryTag: 'Оружие',
    description: 'Высокочастотные удары отдачи при стрельбе из автоматических пушек (GAU-8, ГШ-30, Vulcan).',
    defaultEnabled: true
  },
  {
    id: 'engine_shaker',
    name: 'Вибрация двигателей (Engine RPM Rumble)',
    group: 'shakers',
    categoryTag: 'Двигатели',
    description: 'Тактильная вибрация корпуса от оборотов поршневого мотора или турбины.',
    defaultEnabled: true
  },
  {
    id: 'rotor_shaker',
    name: 'Тряска несущего винта (Main Rotor 1/rev)',
    group: 'shakers',
    categoryTag: 'Вертолеты 🚁',
    description: 'Характерная циклическая вибрация прохождения лопастей несущего винта вертолета.',
    isHelicopterOnly: true,
    defaultEnabled: true
  },
  {
    id: 'vorterx_state_shaker',
    name: 'Вихревое кольцо вертолета (VRS Shaker)',
    group: 'shakers',
    categoryTag: 'Вертолеты 🚁',
    description: 'Вибрация и потеря эффективности ручки при попадании вертолета в режим вихревого кольца.',
    isHelicopterOnly: true,
    defaultEnabled: true
  },
  {
    id: 'lift_shimmy_shaker',
    name: 'Переходный режим косой обдувки (ETL / Shimmy)',
    group: 'shakers',
    categoryTag: 'Вертолеты 🚁',
    description: 'Вибрация циклика при переходе через скорость эффективной поступательной тяги (15–25 узлов).',
    isHelicopterOnly: true,
    defaultEnabled: true
  },
  {
    id: 'generic_shaker',
    name: 'Общий тактильный канал (Generic Shaker)',
    group: 'shakers',
    categoryTag: 'Общие',
    description: 'Универсальный канал виброотклика FFBeast для пользовательских событий симулятора.',
    defaultEnabled: true
  },

  // 4. JOLTS
  {
    id: 'landing_jolt',
    name: 'Удар касания полосы (Landing Touchdown Jolt)',
    group: 'jolts',
    categoryTag: 'Посадка',
    description: 'Резкий механический толчок в момент касания колесами ВПП или посадочной палубы авианосца.',
    defaultEnabled: true
  },
  {
    id: 'gear_jolt',
    name: 'Стук замков шасси (Gear Lock In/Out Jolt)',
    group: 'jolts',
    categoryTag: 'Шасси',
    description: 'Одиночный механический стук при фиксации стоек шасси на концевых замках.',
    defaultEnabled: true
  },
  {
    id: 'weapon_release_jolt',
    name: 'Толчок схода вооружения (Weapon Release Jolt)',
    group: 'jolts',
    categoryTag: 'Оружие',
    description: 'Тактильный импульс отдачи при сходе тяжелых ракет, бомб или подвесных баков.',
    defaultEnabled: true
  },
  {
    id: 'countermeasuers_jolt',
    name: 'Отстрел ловушек ЛТЦ / ДО (Countermeasures Jolt)',
    group: 'jolts',
    categoryTag: 'Ловушки',
    description: 'Микротолчок при отстреле кассет тепловых ловушек или дипольных отражателей.',
    defaultEnabled: true
  },
  {
    id: 'damage_jolt',
    name: 'Боевые повреждения планера (Damage Hit Jolt)',
    group: 'jolts',
    categoryTag: 'Повреждения',
    description: 'Ударная волна и гидроудар при попадании снарядов зенитной артиллерии или осколков ракет.',
    defaultEnabled: true
  },

  // 5. DIRECTX
  {
    id: 'direct_x',
    name: 'Прямые силы DirectX FFB (DirectInput)',
    group: 'directx',
    categoryTag: 'DirectInput',
    description: 'Стандартные силы DirectInput Constant / Periodic / Trimmer, генерируемые симулятором напрямую.',
    defaultEnabled: true
  }
];

/**
 * Computes default enabled states for all effects matching the selected aircraft characteristics
 */
export function getDefaultEffectsForAircraft(aircraft: AircraftPreset): SelectedEffectsMap {
  const map: Partial<SelectedEffectsMap> = {};
  const isHeli = aircraft.isHelicopter || aircraft.category === 'helicopter';
  const isWarbird = aircraft.category === 'prop_warbird';
  const isJet = !isHeli && !isWarbird;

  for (const def of EFFECT_DEFINITIONS) {
    if (def.isHelicopterOnly && !isHeli) {
      map[def.id] = false;
      continue;
    }
    if (def.isJetOnly && !isJet) {
      map[def.id] = false;
      continue;
    }
    if (def.isWarbirdOnly && !isWarbird) {
      map[def.id] = false;
      continue;
    }
    if (def.id === 'afterburner_shaker') {
      map[def.id] = aircraft.hasAfterburner;
      continue;
    }
    if (def.id === 'airbrake_shaker') {
      map[def.id] = aircraft.hasAirbrake;
      continue;
    }
    map[def.id] = def.defaultEnabled;
  }
  return map as SelectedEffectsMap;
}

export interface ProfileGeneratorConfig {
  aircraftQuery: string;
  revision: HardwareRevision;
  extensionMm: number;
  maxForceKg: number;
  motorType: MotorType;
  selectedEffects?: SelectedEffectsMap;
  flightStyle?: FlightStyle;
}

export interface ProfileResult {
  json: Record<string, any>;
  jsonString: string;
  aircraft: AircraftPreset;
  pitchForceKg: number;
  rollForceKg: number;
  effectivePitchForceKg: number;
  effectiveRollForceKg: number;
  flightStyle: FlightStyle;
  requiredTorqueNm: number;
  maxMotorTorqueNm: number;
  isSafe: boolean;
  springCurvePreview: CurvePoint[];
  aircraftEffortCurve: AircraftEffortCurveData;
  deflectionCurve: CurvePoint[];
  damperValue: number;
  enabledEffectsCount: number;
  totalEffectsCount: number;
  activeShakersCount: number;
  activeJoltsCount: number;
}

/**
 * Smart automatic classifier for any custom aircraft/helicopter entered by the user
 */
function deduceCustomAircraft(query: string): AircraftPreset {
  const q = query.toLowerCase();

  const isHeli = q.includes('heli') || q.includes('ka-') || q.includes('mi-8') || q.includes('mi-24') ||
    q.includes('mi-28') || q.includes('uh-') || q.includes('ah-') || q.includes('ch-') || q.includes('apache') ||
    q.includes('hind') || q.includes('huey') || q.includes('cobra') || q.includes('viper') || q.includes('tiger') ||
    q.includes('gazelle') || q.includes('lynx') || q.includes('chinook') || q.includes('kiowa') || q.includes('bo-105');

  const isProp = !isHeli && (
    q.includes('spitfire') || q.includes('bf-109') || q.includes('bf 109') || q.includes('fw-190') ||
    q.includes('fw 190') || q.includes('yak') || q.includes('la-') || q.includes('p-51') || q.includes('p-47') ||
    q.includes('zero') || q.includes('corsair') || q.includes('prop') || q.includes('stuka') || q.includes('mustang') ||
    q.includes('cessna') || q.includes('tempest') || q.includes('typhoon mk') || q.includes('il-2')
  );

  const isFbw = !isHeli && !isProp && (
    q.includes('f-16') || q.includes('f/a-18') || q.includes('fa-18') || q.includes('gripen') ||
    q.includes('mirage 2000') || q.includes('f-35') || q.includes('f-22') || q.includes('rafale') ||
    q.includes('eurofighter') || q.includes('typhoon') || q.includes('jf-17') || q.includes('su-57')
  );

  const simCode = q.includes('wt') || q.includes('war thunder') ? 4 : 1;
  const simName = simCode === 4 ? 'War Thunder' : 'DCS World';

  let category: AircraftCategory = 'modern_jet';
  let vMaxKmh = 1200;
  let aoaStallDeg = 22.0;

  if (isHeli) {
    category = 'helicopter';
    vMaxKmh = 270;
    aoaStallDeg = 0;
  } else if (isProp) {
    category = 'prop_warbird';
    vMaxKmh = 680;
    aoaStallDeg = 16.0;
  } else if (isFbw) {
    category = 'modern_jet';
    vMaxKmh = 1400;
    aoaStallDeg = 24.0;
  } else {
    category = 'cold_war_jet';
    vMaxKmh = 1250;
    aoaStallDeg = 20.0;
  }

  return {
    id: `custom-${q.replace(/[^a-z0-9]/g, '-')}`,
    name: query || 'Custom Aircraft',
    category,
    simName,
    simCode,
    moduleCode: (query || 'Custom_Aircraft').replace(/\s+/g, '_'),
    vMaxKmh,
    aoaStallDeg,
    rollPitchRatio: isHeli ? 0.85 : 0.60,
    hasAfterburner: !isHeli && !isProp,
    hasAirbrake: !isHeli,
    engineType: isHeli ? 'Turboshaft' : isProp ? 'Piston Propeller' : 'Turbofan/Turbojet',
    description: `Auto-configured profile for ${query} with simulated aerodynamic telemetry`,
    isHelicopter: isHeli
  };
}

export function generateFFBeastProfile(config: ProfileGeneratorConfig): ProfileResult {
  const query = config.aircraftQuery.toLowerCase().trim();
  let aircraft = AIRCRAFT_DATABASE.find(
    a => a.id === query || a.name.toLowerCase() === query || a.moduleCode.toLowerCase() === query
  );

  if (!aircraft) {
    aircraft = AIRCRAFT_DATABASE.find(
      a => a.name.toLowerCase().includes(query) || query.includes(a.name.toLowerCase())
    );
  }

  if (!aircraft) {
    aircraft = deduceCustomAircraft(config.aircraftQuery);
  }

  // Active effects resolution
  const activeEffectsMap = config.selectedEffects || getDefaultEffectsForAircraft(aircraft);
  const isEffActive = (id: EffectId): boolean => Boolean(activeEffectsMap[id]);

  let enabledCount = 0;
  for (const key of Object.keys(activeEffectsMap) as EffectId[]) {
    if (activeEffectsMap[key]) enabledCount++;
  }

  // Flight style scaling logic
  const flightStyle: FlightStyle = config.flightStyle || 'hardcore';

  let effectivePitchForceKg = config.maxForceKg;
  let shakerStrengthFactor = 1.0;
  let stickVibrationsEnabled = true;

  if (flightStyle === 'casual') {
    // "Казуал" - наполовину убрать усилия
    effectivePitchForceKg = Number((config.maxForceKg * 0.5).toFixed(1));
    shakerStrengthFactor = 0.6;
    stickVibrationsEnabled = true;
  } else if (flightStyle === 'aerobatic') {
    // "Пилотажник" - сбавить силу до минимума (уровня усилий баз VPC MongoosT ~1.8-2.0 кг) и убрать вибрации на ручке
    effectivePitchForceKg = 2.0;
    shakerStrengthFactor = 0.0;
    stickVibrationsEnabled = false;
  }

  // Gear ratio and arm length
  const gearRatio = config.revision === 'DirectDrive' ? 1.0 : 3.0; // V5 & V4 use 3:1 gear ratio
  const baseArmM = 0.18; // ~18 cm standard grip pivot
  const armLengthM = baseArmM + (config.extensionMm / 1000.0);

  const pitchForceKg = config.maxForceKg;
  const rollForceKg = Number((config.maxForceKg * aircraft.rollPitchRatio).toFixed(1));
  const effectiveRollForceKg = Number((effectivePitchForceKg * aircraft.rollPitchRatio).toFixed(1));

  // Required motor torque: Tau = (F * 9.81 * L) / gear_ratio (calculated on effective peak force)
  const requiredTorqueNm = Number(((effectivePitchForceKg * 9.81 * armLengthM) / gearRatio).toFixed(2));
  const maxMotorTorqueNm = MOTOR_RATINGS[config.motorType].maxTorqueNm;
  const isSafe = requiredTorqueNm <= maxMotorTorqueNm;

  // Damping values based on effective force
  const dampPitch = Math.min(85, Math.max(20, Math.round(18 + effectivePitchForceKg * 3.5)));
  const dampRoll = Math.min(80, Math.max(15, Math.round(15 + effectiveRollForceKg * 3.5)));

  const vMax = aircraft.vMaxKmh;

  const isShakerActive = (id: EffectId): boolean => {
    if (!stickVibrationsEnabled) return false;
    return isEffActive(id);
  };

  const buildAxis = (_axisName: string, maxAxisForce: number, dampVal: number) => {
    const effs: Record<string, any> = {};

    // 1. Direct X (standard direct input forces)
    if (isEffActive('direct_x')) {
      effs.direct_x = {
        active: true,
        force: 100,
        periodic: 100,
        total_effect_strength: 100,
        trimmer: 100
      };
    }

    // 2. Hardware Trim
    if (isEffActive('trim')) {
      effs.trim = {
        active: true,
        force_release_allowed: true,
        trim_buttons_allowed: true,
        trim_reset_allowed: true,
        hardware_trim_buttons: { minus: 0, plus: 0 },
        hardware_trim_mode: 0,
        hardware_trim_profile: 0,
        hardware_trim_speed: 10,
        hardware_trim_step: 1,
        total_effect_strength: 100
      };
    }

    // 3. Smart Damper (smooth hydraulic feel, controlled dynamic damping)
    if (isEffActive('smart_damper')) {
      effs.smart_damper = {
        active: true,
        dynamic_dampening: dampVal,
        static_dampening: Math.min(100, Math.max(65, Math.round(70 + maxAxisForce * 1.5))),
        total_effect_strength: 100
      };
    }

    // 4. Spring Centering (symmetrical 11-point S-curve)
    if (isEffActive('simple_spring')) {
      effs.simple_spring = {
        active: true,
        curve1: generateRealForceSCurve(maxAxisForce),
        dampening_contribution: 100,
        total_effect_strength: 100
      };
    }

    // 5. Airspeed dynamic pressure spring (Q-feel ~ V^2)
    if (isEffActive('airspeed_spring')) {
      effs.airspeed_spring = {
        active: true,
        curve1: generateParabolicCurve(vMax, maxAxisForce),
        dampening_contribution: 100,
        total_effect_strength: 100
      };
    }

    // 6. Prop thrust spring (wash effect)
    if (isEffActive('prop_thrust_spring')) {
      effs.prop_thrust_spring = {
        active: true,
        curve1: generateLinearCurve(100, Number((maxAxisForce * 0.35).toFixed(2))),
        dampening_contribution: 60,
        total_effect_strength: 100
      };
    }

    // 7. AoA spring
    if (isEffActive('aoa_spring')) {
      effs.aoa_spring = {
        active: true,
        curve1: generateSCurve(aircraft.aoaStallDeg > 0 ? aircraft.aoaStallDeg : 22, Number((maxAxisForce * 0.4).toFixed(2))),
        dampening_contribution: 50,
        total_effect_strength: 100
      };
    }

    // 8. G-Force spring
    if (isEffActive('g_force_spring')) {
      effs.g_force_spring = {
        active: true,
        curve1: generateLinearCurve(9.0, Number((maxAxisForce * 0.5).toFixed(2))),
        dampening_contribution: 60,
        total_effect_strength: 100
      };
    }

    // 9. Elevator Weight
    if (isEffActive('elevator_weight')) {
      effs.elevator_weight = {
        active: true,
        weight_force: 15,
        total_effect_strength: 80
      };
    }

    // 10. Local AoA
    if (isEffActive('local_aoa')) {
      effs.local_aoa = {
        active: true,
        factor: 50,
        total_effect_strength: 80
      };
    }

    // 11. Shakers & Vibrations (muted if flightStyle === 'aerobatic')
    if (isShakerActive('afterburner_shaker')) {
      effs.afterburner_shaker = {
        active: true,
        base_frequency: 20,
        frequency_mode: 0,
        curve1: [
          { in: 0, out: 0 }, { in: 10, out: 19 }, { in: 20, out: 36 }, { in: 30, out: 51 },
          { in: 40, out: 64 }, { in: 50, out: 75 }, { in: 60, out: 84 }, { in: 70, out: 91 },
          { in: 80, out: 96 }, { in: 90, out: 99 }, { in: 100, out: 100 }
        ],
        total_effect_strength: Math.max(1, Math.round(5 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('airbrake_shaker')) {
      effs.airbrake_shaker = {
        active: true,
        base_frequency: 20,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(6 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('flaps_shaker')) {
      effs.flaps_shaker = {
        active: true,
        base_frequency: 18,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(8 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('gear_shaker')) {
      effs.gear_shaker = {
        active: true,
        base_frequency: 16,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(5 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('aoa_shaker')) {
      effs.aoa_shaker = {
        active: true,
        base_frequency: 16,
        frequency_mode: 0,
        curve1: generateSCurve(aircraft.aoaStallDeg > 0 ? aircraft.aoaStallDeg : 22, 100),
        total_effect_strength: Math.max(1, Math.round(40 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('overspeed_shaker')) {
      effs.overspeed_shaker = {
        active: true,
        base_frequency: 24,
        frequency_mode: 0,
        curve1: generateLinearCurve(vMax, 100),
        total_effect_strength: Math.max(1, Math.round(50 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('on_ground_shaker')) {
      effs.on_ground_shaker = {
        active: true,
        base_frequency: 10,
        frequency_mode: 0,
        curve1: [
          { in: 10, out: 0 }, { in: 40, out: 20 }, { in: 80, out: 50 },
          { in: 150, out: 80 }, { in: 300, out: 100 }
        ],
        total_effect_strength: Math.max(1, Math.round(12 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('gunfire_shaker')) {
      effs.gunfire_shaker = {
        active: true,
        gunfire: [
          { active: true, base_frequency: 20, frequency_mode: 1, total_effect_strength: Math.max(1, Math.round(12 * shakerStrengthFactor)) },
          { active: false, base_frequency: 20, frequency_mode: 0, total_effect_strength: 0 },
          { active: false, base_frequency: 20, frequency_mode: 0, total_effect_strength: 0 },
          { active: false, base_frequency: 20, frequency_mode: 0, total_effect_strength: 0 },
          { active: false, base_frequency: 20, frequency_mode: 0, total_effect_strength: 0 }
        ]
      };
    }

    if (isShakerActive('engine_shaker')) {
      effs.engine_shaker = {
        active: true,
        base_frequency: 18,
        frequency_mode: 1,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(20 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('rotor_shaker')) {
      effs.rotor_shaker = {
        active: true,
        base_frequency: 14,
        frequency_mode: 1,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(25 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('vorterx_state_shaker')) {
      effs.vorterx_state_shaker = {
        active: true,
        base_frequency: 18,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(45 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('lift_shimmy_shaker')) {
      effs.lift_shimmy_shaker = {
        active: true,
        base_frequency: 15,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(20 * shakerStrengthFactor))
      };
    }

    if (isShakerActive('generic_shaker')) {
      effs.generic_shaker = {
        active: true,
        base_frequency: 20,
        frequency_mode: 0,
        total_effect_strength: Math.max(1, Math.round(10 * shakerStrengthFactor))
      };
    }

    // 12. Jolts (mechanical impulse forces)
    const joltFactor = flightStyle === 'aerobatic' ? 0.35 : 1.0;

    if (isEffActive('landing_jolt')) {
      effs.landing_jolt = {
        active: true,
        base_frequency: 20,
        frequency_mode: 0,
        curve1: [
          { in: 0, out: 0 }, { in: 1, out: 20 }, { in: 2, out: 40 },
          { in: 3, out: 60 }, { in: 4, out: 80 }, { in: 5, out: 100 }
        ],
        total_effect_strength: Math.max(1, Math.round(50 * joltFactor))
      };
    }

    if (isEffActive('gear_jolt')) {
      effs.gear_jolt = {
        active: true,
        base_frequency: 18,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(30 * joltFactor))
      };
    }

    if (isEffActive('weapon_release_jolt')) {
      effs.weapon_release_jolt = {
        active: true,
        base_frequency: 20,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(35 * joltFactor))
      };
    }

    if (isEffActive('countermeasuers_jolt')) {
      effs.countermeasuers_jolt = {
        active: true,
        base_frequency: 25,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(25 * joltFactor))
      };
    }

    if (isEffActive('damage_jolt')) {
      effs.damage_jolt = {
        active: true,
        base_frequency: 20,
        frequency_mode: 0,
        curve1: generateLinearCurve(100, 100),
        total_effect_strength: Math.max(1, Math.round(40 * joltFactor))
      };
    }

    return effs;
  };

  const json = {
    metadata: {
      comment: `Apache_RealForce_Profile_${flightStyle.toUpperCase()} (Rev: ${config.revision}, Ext: +${config.extensionMm}mm, Peak: ${effectivePitchForceKg}kg)`,
      flight_data_source: aircraft.simCode,
      flight_module: aircraft.moduleCode,
      version: {
        release_major: 25,
        release_minor: 1,
        release_patch: 4,
        release_type: 1
      }
    },
    effects: {
      ailerons: buildAxis('ailerons', effectiveRollForceKg, dampRoll),
      elevator: buildAxis('elevator', effectivePitchForceKg, dampPitch),
      rudder: {
        direct_x: isEffActive('direct_x') ? { active: true, force: 100, periodic: 100, total_effect_strength: 100, trimmer: 100 } : { active: false },
        smart_damper: isEffActive('smart_damper') ? { active: true, dynamic_dampening: Math.round(dampPitch * 0.75), static_dampening: 50, total_effect_strength: 100 } : { active: false },
        simple_spring: isEffActive('simple_spring') ? {
          active: true,
          curve1: generateRealForceSCurve(Number((effectivePitchForceKg * 0.75).toFixed(1))),
          dampening_contribution: 100,
          total_effect_strength: 100
        } : { active: false }
      },
      throttle_collective: {
        smart_damper: { active: true, dynamic_dampening: 45, static_dampening: 60, total_effect_strength: 100 },
        simple_spring: { active: false, curve1: [], total_effect_strength: 0 },
        trim: { active: false }
      }
    }
  };

  let activeShakersCount = 0;
  let activeJoltsCount = 0;
  for (const def of EFFECT_DEFINITIONS) {
    if (def.group === 'shakers' && isShakerActive(def.id)) activeShakersCount++;
    if (def.group === 'jolts' && isEffActive(def.id)) activeJoltsCount++;
  }

  const deflectionCurve = generateRealForceSCurve(effectivePitchForceKg);
  const aircraftEffortCurve = generateAircraftEffortCurve(aircraft, effectivePitchForceKg, flightStyle);

  const springCurvePreview = isEffActive('simple_spring')
    ? deflectionCurve
    : generateParabolicCurve(vMax, effectivePitchForceKg, 20);

  return {
    json,
    jsonString: JSON.stringify(json, null, 2),
    aircraft,
    pitchForceKg,
    rollForceKg,
    effectivePitchForceKg,
    effectiveRollForceKg,
    flightStyle,
    requiredTorqueNm,
    maxMotorTorqueNm,
    isSafe,
    springCurvePreview,
    aircraftEffortCurve,
    deflectionCurve,
    damperValue: dampPitch,
    enabledEffectsCount: enabledCount,
    totalEffectsCount: EFFECT_DEFINITIONS.length,
    activeShakersCount,
    activeJoltsCount
  };
}

export function triggerDownload(filename: string, content: string) {
  const blob = new Blob([content], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
