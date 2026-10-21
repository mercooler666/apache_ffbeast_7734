export type ProductMode = 'flight' | 'racing';

export type PageRoute = 'home' | 'profile-wizard' | 'configurator';

export type SimulatorType = 'DCS World' | 'War Thunder' | 'MSFS 2024/2020';

export type AircraftCategory = 
  | 'modern_jet'
  | 'cold_war_jet'
  | 'prop_warbird'
  | 'helicopter'
  | 'general_aviation';

export type ControlArchitecture = 
  | 'mechanical' 
  | 'hydromechanical_boosted' 
  | 'fly_by_wire' 
  | 'helicopter_force_trim';

export interface AircraftPreset {
  id: string;
  name: string;
  category: AircraftCategory;
  simName: SimulatorType;
  simCode: number; // 1 for DCS, 2 for MSFS, 4 for War Thunder
  moduleCode: string;
  vMaxKmh: number;
  aoaStallDeg: number;
  rollPitchRatio: number; // e.g. 0.65 means ailerons are 65% of elevator effort
  hasAfterburner: boolean;
  hasAirbrake: boolean;
  engineType: string;
  description: string;
  isHelicopter?: boolean;

  // Authentic RLE Flight Manual Specifications
  controlArchitecture?: ControlArchitecture;
  controlSystemName?: string;
  rlePitchForceKg?: number;
  rleRollForceKg?: number;
  rleGGradient?: string;
  rleStickTravel?: string;
  rleDocument?: string;
  aoaBuffetOnsetDeg?: number;
  vStallKmh?: number;
  trimMethod?: string;
  ffbEffectBreakdown?: {
    pitchSpringEffect: string;
    dampeningEffect: string;
    trimEffect: string;
    shakerEffects: string;
    joltsEffects: string;
  };
}

export type HardwareRevision = 'V5' | 'V4' | 'DirectDrive';

export type MotorType = 
  | 'hoverboard_30mm'
  | 'hoverboard_25mm'
  | 'hoverboard_20mm'
  | 'ac_servo_mige';

export interface CurvePoint {
  in: number;
  out: number;
}

export type EffectGroup = 'springs' | 'hydraulics' | 'shakers' | 'jolts' | 'directx';

export type EffectId = 
  | 'simple_spring'
  | 'airspeed_spring'
  | 'prop_thrust_spring'
  | 'aoa_spring'
  | 'g_force_spring'
  | 'smart_damper'
  | 'trim'
  | 'elevator_weight'
  | 'local_aoa'
  | 'aoa_shaker'
  | 'overspeed_shaker'
  | 'afterburner_shaker'
  | 'airbrake_shaker'
  | 'flaps_shaker'
  | 'gear_shaker'
  | 'on_ground_shaker'
  | 'gunfire_shaker'
  | 'engine_shaker'
  | 'rotor_shaker'
  | 'vorterx_state_shaker'
  | 'lift_shimmy_shaker'
  | 'generic_shaker'
  | 'landing_jolt'
  | 'gear_jolt'
  | 'weapon_release_jolt'
  | 'countermeasuers_jolt'
  | 'damage_jolt'
  | 'direct_x';

export interface EffectDefinition {
  id: EffectId;
  name: string;
  group: EffectGroup;
  description: string;
  categoryTag?: string;
  isHelicopterOnly?: boolean;
  isJetOnly?: boolean;
  isWarbirdOnly?: boolean;
  defaultEnabled: boolean;
}

export type SelectedEffectsMap = Record<EffectId, boolean>;

export type FlightStyle = 'hardcore' | 'casual' | 'aerobatic';

export interface AircraftEffortPoint {
  speedKmh: number;
  forceKg: number;
  label?: string;
  phase?: string;
  isKeyMarker?: boolean;
}

export interface AircraftKeyMarker {
  icon: string;
  phase: string;
  speed: string;
  force: string;
  note: string;
}

export interface AircraftEffortCurveData {
  title: string;
  subtitle: string;
  physicsModel: string;
  xAxisLabel: string;
  yAxisLabel: string;
  maxSpeedKmh: number;
  maxForceKg: number;
  points: AircraftEffortPoint[];
  keyMarkers: AircraftKeyMarker[];
}

