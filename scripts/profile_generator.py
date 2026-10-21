"""
FFBeast Profile Generator Engine
Generates compliant FFBeast JSON profiles based on:
1. Aircraft Name & Flight Model category (FBW, Hydromechanical, Prop/Warbird, Helicopter)
2. Hardware Revision & Mechanics (V4, V5, Direct Drive, stick extension length)
3. Maximum Target Effort / Peak Force (kg)
"""

import json
import math
from typing import Dict, Any, List

# Known aircraft aerodynamic presets
AIRCRAFT_DATABASE = {
    # FBW Jets
    "fa-18c": {
        "name": "F/A-18C Hornet",
        "category": "fbw_jet",
        "sim": 1, # DCS
        "module": "FA-18C_hornet",
        "v_max": 1300, # km/h
        "aoa_stall": 25.0,
        "roll_pitch_ratio": 0.65, # Ailerons lighter than elevator
        "has_afterburner": True,
        "has_airbrake": True,
        "engine_type": "twin_turbofan"
    },
    "f-16c": {
        "name": "F-16C Viper",
        "category": "fbw_jet",
        "sim": 1,
        "module": "F-16C_50",
        "v_max": 1400,
        "aoa_stall": 22.0,
        "roll_pitch_ratio": 0.70,
        "has_afterburner": True,
        "has_airbrake": True,
        "engine_type": "single_turbofan"
    },
    # Hydromechanical Jets
    "su-27": {
        "name": "Su-27 Flanker",
        "category": "hydro_jet",
        "sim": 1,
        "module": "Su-27",
        "v_max": 1400,
        "aoa_stall": 26.0,
        "roll_pitch_ratio": 0.60,
        "has_afterburner": True,
        "has_airbrake": True,
        "engine_type": "twin_turbofan"
    },
    "f-14": {
        "name": "F-14 Tomcat",
        "category": "hydro_jet",
        "sim": 1,
        "module": "F-14B",
        "v_max": 1400,
        "aoa_stall": 18.0,
        "roll_pitch_ratio": 0.65,
        "has_afterburner": True,
        "has_airbrake": True,
        "engine_type": "twin_turbofan"
    },
    # Propeller Warbirds & GA
    "spitfire": {
        "name": "Spitfire LF Mk.IX",
        "category": "prop_warbird",
        "sim": 1,
        "module": "SpitfireLFMkIX",
        "v_max": 650, # km/h
        "aoa_stall": 15.0,
        "roll_pitch_ratio": 0.50,
        "has_afterburner": False,
        "has_airbrake": False,
        "engine_type": "piston_prop"
    },
    "bf-109": {
        "name": "Bf 109 K-4",
        "category": "prop_warbird",
        "sim": 1,
        "module": "Bf-109K-4",
        "v_max": 700,
        "aoa_stall": 16.0,
        "roll_pitch_ratio": 0.55,
        "has_afterburner": False,
        "has_airbrake": False,
        "engine_type": "piston_prop"
    },
    "p-51d": {
        "name": "P-51D Mustang",
        "category": "prop_warbird",
        "sim": 1,
        "module": "P-51D",
        "v_max": 750,
        "aoa_stall": 17.0,
        "roll_pitch_ratio": 0.55,
        "has_afterburner": False,
        "has_airbrake": False,
        "engine_type": "piston_prop"
    },
    # Helicopters
    "uh-1h": {
        "name": "UH-1H Huey",
        "category": "helicopter",
        "sim": 1,
        "module": "UH-1H",
        "v_max": 220,
        "aoa_stall": 0,
        "roll_pitch_ratio": 0.85,
        "has_afterburner": False,
        "has_airbrake": False,
        "engine_type": "turboshaft"
    },
    "mi-8": {
        "name": "Mi-8MTV2",
        "category": "helicopter",
        "sim": 1,
        "module": "Mi-8MT",
        "v_max": 250,
        "aoa_stall": 0,
        "roll_pitch_ratio": 0.85,
        "has_afterburner": False,
        "has_airbrake": False,
        "engine_type": "turboshaft"
    },
    "mi-24p": {
        "name": "Mi-24P Hind",
        "category": "helicopter",
        "sim": 1,
        "module": "Mi-24P",
        "v_max": 330,
        "aoa_stall": 0,
        "roll_pitch_ratio": 0.85,
        "has_afterburner": False,
        "has_airbrake": False,
        "engine_type": "turboshaft"
    }
}

REVISION_PARAMS = {
    "V5": {"gear_ratio": 3.0, "default_base_arm_m": 0.18, "max_torque_nm": 15.0},
    "V4": {"gear_ratio": 3.0, "default_base_arm_m": 0.18, "max_torque_nm": 15.0},
    "DirectDrive": {"gear_ratio": 1.0, "default_base_arm_m": 0.18, "max_torque_nm": 15.0}
}


def generate_parabolic_curve(max_in: float, max_out: float, points: int = 11) -> List[Dict[str, float]]:
    """Generates a progressive quadratic/parabolic curve: out = (in / max_in)^2 * max_out"""
    curve = []
    step = max_in / (points - 1)
    for i in range(points):
        val_in = round(i * step, 1)
        normalized = val_in / max_in if max_in > 0 else 0
        val_out = round((normalized ** 2) * max_out, 3)
        curve.append({"in": val_in, "out": val_out})
    return curve


def generate_linear_curve(max_in: float, max_out: float, points: int = 11) -> List[Dict[str, float]]:
    """Generates a linear curve: out = (in / max_in) * max_out"""
    curve = []
    step = max_in / (points - 1)
    for i in range(points):
        val_in = round(i * step, 1)
        normalized = val_in / max_in if max_in > 0 else 0
        val_out = round(normalized * max_out, 3)
        curve.append({"in": val_in, "out": val_out})
    return curve


def generate_s_curve(max_in: float, max_out: float, points: int = 11) -> List[Dict[str, float]]:
    """Generates an S-curve for stall/buffet shaker effects"""
    curve = []
    step = max_in / (points - 1)
    for i in range(points):
        val_in = round(i * step, 1)
        x = (val_in / max_in - 0.5) * 6 if max_in > 0 else 0 # map to [-3, 3]
        sig = 1 / (1 + math.exp(-x))
        val_out = round(sig * max_out, 3)
        curve.append({"in": val_in, "out": val_out})
    return curve


def build_profile(
    aircraft_key_or_name: str,
    revision: str = "V5",
    extension_mm: float = 0,
    max_force_kg: float = 6.0,
    motor_type: str = "hoverboard_30mm"
) -> Dict[str, Any]:
    """
    Main builder for FFBeast profile JSON.
    """
    # Find aircraft data
    key_clean = aircraft_key_or_name.lower().strip()
    aircraft_data = None
    for k, v in AIRCRAFT_DATABASE.items():
        if k in key_clean or v["name"].lower() in key_clean or key_clean in v["name"].lower():
            aircraft_data = v
            break

    # Fallback to generic jet if unknown
    if not aircraft_data:
        aircraft_data = {
            "name": aircraft_key_or_name.title(),
            "category": "hydro_jet",
            "sim": 1,
            "module": aircraft_key_or_name.replace(" ", "_"),
            "v_max": 900,
            "aoa_stall": 20.0,
            "roll_pitch_ratio": 0.60,
            "has_afterburner": True,
            "has_airbrake": True,
            "engine_type": "twin_turbofan"
        }

    # Physical mechanics
    rev_info = REVISION_PARAMS.get(revision, REVISION_PARAMS["V5"])
    arm_length_m = rev_info["default_base_arm_m"] + (extension_mm / 1000.0)
    gear_ratio = rev_info["gear_ratio"]

    # Target force on Pitch (elevator) and Roll (ailerons)
    elevator_max_force_kg = max_force_kg
    ailerons_max_force_kg = max_force_kg * aircraft_data["roll_pitch_ratio"]

    # In FFBeast Commander:
    # 1. Total effect strength for springs is kept at 100
    # 2. Curve points define the maximum force in kilograms (or scaled units)
    # 3. Dynamic dampening scales with maximum spring force to prevent oscillation
    damp_pitch = int(min(85, max(15, 20 + elevator_max_force_kg * 4)))
    damp_roll = int(min(80, max(12, 15 + ailerons_max_force_kg * 4)))

    category = aircraft_data["category"]

    def build_axis_effects(axis_name: str, max_axis_force: float, damp_val: int):
        effs = {}
        v_max = aircraft_data["v_max"]

        # DirectX pass-through (standard FFB)
        effs["direct_x"] = {
            "active": True,
            "force": 100,
            "periodic": 100,
            "total_effect_strength": 100,
            "trimmer": 100
        }

        # Trimming
        effs["trim"] = {
            "active": True,
            "hardware_trim_buttons": {"minus": 0, "plus": 0},
            "hardware_trim_mode": 0,
            "hardware_trim_profile": 0,
            "hardware_trim_speed": 10,
            "hardware_trim_step": 1,
            "total_effect_strength": 100
        }

        # Smart Damper (hydraulic feel and stability)
        effs["smart_damper"] = {
            "active": True,
            "dynamic_dampening": damp_val,
            "static_dampening": int(damp_val * 0.7),
            "total_effect_strength": 100
        }

        # Springs according to category
        if category == "fbw_jet":
            # FBW Jet: fixed displacement artificial feel spring (simple_spring)
            effs["simple_spring"] = {
                "active": True,
                "curve1": generate_linear_curve(100, max_axis_force),
                "dampening_contribution": 100,
                "total_effect_strength": 100
            }
        elif category in ["hydro_jet", "prop_warbird"]:
            # Aerodynamic Q-feel airspeed spring (scales with v^2)
            effs["airspeed_spring"] = {
                "active": True,
                "curve1": generate_parabolic_curve(v_max, max_axis_force),
                "dampening_contribution": 100,
                "total_effect_strength": 100
            }
            if category == "prop_warbird":
                # Prop airflow wash over control surfaces at low speeds
                effs["prop_thrust_spring"] = {
                    "active": True,
                    "curve1": generate_linear_curve(100, max_axis_force * 0.35),
                    "dampening_contribution": 50,
                    "total_effect_strength": 100
                }
        elif category == "helicopter":
            # Helicopter: minimal or zero centering spring, pure hydraulic damper
            effs["simple_spring"] = {
                "active": False,
                "curve1": generate_linear_curve(100, max_axis_force * 0.15),
                "dampening_contribution": 100,
                "total_effect_strength": 50
            }

        # Shakers / Jolts (Vibrations)
        # AoA / Stall buffet
        if aircraft_data["aoa_stall"] > 0:
            effs["aoa_shaker"] = {
                "active": True,
                "base_frequency": 16,
                "max_frequency": 30,
                "frequency_mode": 1,
                "curve1": generate_s_curve(v_max, 15.0), # speed dependency
                "curve2": generate_s_curve(aircraft_data["aoa_stall"] * 1.5, 20.0), # AoA dependency
                "total_effect_strength": 50
            }

        # Afterburner shaker
        if aircraft_data.get("has_afterburner"):
            effs["afterburner_shaker"] = {
                "active": True,
                "base_frequency": 28,
                "frequency_mode": 0,
                "curve1": generate_linear_curve(100, 5.0),
                "total_effect_strength": 50
            }

        # Airbrake shaker
        if aircraft_data.get("has_airbrake"):
            effs["airbrake_shaker"] = {
                "active": True,
                "base_frequency": 18,
                "frequency_mode": 0,
                "curve1": generate_linear_curve(v_max, 4.0),
                "total_effect_strength": 50
            }

        # Landing impact jolt
        effs["landing_jolt"] = {
            "active": True,
            "base_frequency": 12,
            "frequency_mode": 0,
            "curve1": generate_linear_curve(10, 8.0),
            "total_effect_strength": 60
        }

        # Runway ground roll vibration
        effs["on_ground_shaker"] = {
            "active": True,
            "base_frequency": 20,
            "frequency_mode": 1,
            "curve1": generate_linear_curve(v_max * 0.4, 4.0),
            "total_effect_strength": 40
        }

        # Gunfire recoil shaker
        effs["gunfire_shaker"] = {
            "active": True,
            "base_frequency": 22,
            "frequency_mode": 0,
            "curve1": generate_linear_curve(100, 6.0),
            "total_effect_strength": 50
        }

        return effs

    # Assemble full structure
    profile = {
        "metadata": {
            "comment": f"Auto-generated by FFBeast Smart Wizard for {aircraft_data['name']} (Revision: {revision}, Extension: +{extension_mm}mm, Target Force: {max_force_kg}kg)",
            "flight_data_source": aircraft_data.get("sim", 1),
            "flight_module": aircraft_data.get("module", "Generic_Aircraft")
        },
        "effects": {
            "ailerons": build_axis_effects("ailerons", ailerons_max_force_kg, damp_roll),
            "elevator": build_axis_effects("elevator", elevator_max_force_kg, damp_pitch),
            "rudder": {
                "direct_x": {"active": True, "force": 100, "periodic": 100, "total_effect_strength": 100, "trimmer": 100},
                "smart_damper": {"active": True, "dynamic_dampening": int(damp_pitch * 0.8), "static_dampening": 20, "total_effect_strength": 100},
                "airspeed_spring": {
                    "active": category != "helicopter",
                    "curve1": generate_parabolic_curve(aircraft_data["v_max"], max_force_kg * 0.7),
                    "dampening_contribution": 100,
                    "total_effect_strength": 100
                }
            },
            "throttle_collective": {
                "smart_damper": {"active": True, "dynamic_dampening": 40, "static_dampening": 30, "total_effect_strength": 100},
                "simple_spring": {"active": False, "curve1": [], "total_effect_strength": 0},
                "trim": {"active": False}
            }
        }
    }

    return profile


if __name__ == "__main__":
    # Test generation for F/A-18C Hornet with V5 and 6kg force
    profile = build_profile("F/A-18C Hornet", revision="V5", extension_mm=100, max_force_kg=7.5)
    output_filename = "output_profile_FA18C.json"
    with open(output_filename, "w", encoding="utf-8") as f:
        json.dump(profile, f, indent=4)
    print(f"Successfully generated profile: {output_filename}")
    print("Metadata:", profile["metadata"])
    print("Ailerons effects:", list(profile["effects"]["ailerons"].keys()))
