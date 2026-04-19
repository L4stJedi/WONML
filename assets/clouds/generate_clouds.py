#!/usr/bin/env python3
"""
Cloud System Generator for WONML Responsive Canvas
Creates cloud sprites and JSON configuration for proportional distribution.
Replaces hardcoded Y-positions (lines 3729-3735) with responsive cloud system.

Option B: Sprite-based clouds with procedural placement helper.
Clouds scale and distribute based on sky height and canvas width.
"""

from PIL import Image, ImageDraw
import json
import math

def generate_cloud_sprite(width, height, shape_type="cumulus"):
    """
    Generate a single cloud sprite with transparency.
    shape_type: 'cumulus' (puffy), 'stratus' (flat), 'cirrus' (wispy)
    """
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Cloud color: white with slight grayness
    cloud_color = (240, 245, 250, 255)

    if shape_type == "cumulus":
        # Puffy, rounded cloud
        # Multiple overlapping circles/ellipses
        positions = [
            ((width * 0.2, height * 0.5), (width * 0.25, height * 0.6)),
            ((width * 0.35, height * 0.35), (width * 0.4, height * 0.55)),
            ((width * 0.55, height * 0.3), (width * 0.65, height * 0.6)),
            ((width * 0.7, height * 0.4), (width * 0.8, height * 0.55)),
            ((width * 0.8, height * 0.5), (width * 0.9, height * 0.6)),
        ]
        for bbox in positions:
            draw.ellipse(bbox, fill=cloud_color)

    elif shape_type == "stratus":
        # Flat, layered cloud
        # Horizontal bands
        y_start = height * 0.3
        for i in range(3):
            y = y_start + i * (height * 0.15)
            draw.ellipse([(width * 0.05, y), (width * 0.95, y + height * 0.15)],
                        fill=cloud_color)

    elif shape_type == "cirrus":
        # Wispy, thin cloud
        # Elongated shapes
        draw.ellipse([(width * 0.1, height * 0.4), (width * 0.5, height * 0.6)],
                    fill=cloud_color)
        draw.ellipse([(width * 0.4, height * 0.35), (width * 0.8, height * 0.55)],
                    fill=cloud_color)
        draw.ellipse([(width * 0.6, height * 0.4), (width * 0.95, height * 0.6)],
                    fill=cloud_color)

    return img

def generate_all_clouds():
    """Generate 3 cloud sprite types at multiple sizes."""
    cloud_assets = []

    # Define cloud variants: (type, size_name, width, height)
    variants = [
        ("cumulus", "small", 40, 24),
        ("cumulus", "medium", 70, 40),
        ("cumulus", "large", 100, 56),
        ("stratus", "small", 50, 20),
        ("stratus", "medium", 80, 30),
        ("stratus", "large", 120, 45),
        ("cirrus", "small", 60, 18),
        ("cirrus", "medium", 90, 28),
        ("cirrus", "large", 130, 40),
    ]

    output_dir = "/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/assets/clouds"

    # Create output directory if needed
    import os
    os.makedirs(output_dir, exist_ok=True)

    for cloud_type, size_name, w, h in variants:
        img = generate_cloud_sprite(w, h, cloud_type)
        filename = f"cloud_{cloud_type}_{size_name}.png"
        filepath = f"{output_dir}/{filename}"
        img.save(filepath)
        cloud_assets.append({
            "filename": filename,
            "type": cloud_type,
            "size": size_name,
            "dimensions_px": {"w": w, "h": h}
        })
        print(f"Generated {filename}: {w}×{h}px ({cloud_type})")

    return cloud_assets

def generate_cloud_config():
    """
    Generate cloud configuration JSON with proportional positioning.
    Clouds occupy upper 60% of sky, distributed by percentage.
    """
    config = {
        "metadata": {
            "version": "1.0",
            "description": "Responsive cloud distribution config for Belgium campaign",
            "canvas_contract": {
                "width_px": [280, 600],
                "height_px": [320, 960],
                "ground_height_px": 90
            },
            "cloud_distribution": {
                "upper_bound_pct": 0.05,
                "lower_bound_pct": 0.60,
                "explanation": "Clouds occupy 5% to 60% of sky height. Upper 40% of sky is reserved for plane visibility."
            }
        },
        "cloud_tiers": [
            {
                "tier": 0,
                "name": "far_clouds",
                "parallax_speed_multiplier": 0.10,
                "opacity": 0.60,
                "size_scale": 0.8,
                "count": 2,
                "description": "Far clouds: move very slowly, appear in upper 15% of sky"
            },
            {
                "tier": 1,
                "name": "mid_clouds",
                "parallax_speed_multiplier": 0.20,
                "opacity": 0.75,
                "size_scale": 1.0,
                "count": 3,
                "description": "Mid clouds: moderate speed, appear in 20-40% of sky"
            },
            {
                "tier": 2,
                "name": "near_clouds",
                "parallax_speed_multiplier": 0.35,
                "opacity": 0.90,
                "size_scale": 1.3,
                "count": 2,
                "description": "Near clouds: fast speed, appear in 40-60% of sky"
            }
        ],
        "cloud_instances": [
            # Far tier (upper, lighter, slower)
            {
                "id": "cloud_far_01",
                "tier": 0,
                "x_pct": 0.15,
                "y_pct": 0.10,
                "sprite": "cloud_cirrus_small",
                "rotation_deg": 0
            },
            {
                "id": "cloud_far_02",
                "tier": 0,
                "x_pct": 0.75,
                "y_pct": 0.12,
                "sprite": "cloud_cirrus_small",
                "rotation_deg": 0
            },
            # Mid tier
            {
                "id": "cloud_mid_01",
                "tier": 1,
                "x_pct": 0.20,
                "y_pct": 0.25,
                "sprite": "cloud_cumulus_medium",
                "rotation_deg": 0
            },
            {
                "id": "cloud_mid_02",
                "tier": 1,
                "x_pct": 0.50,
                "y_pct": 0.30,
                "sprite": "cloud_cumulus_medium",
                "rotation_deg": 0
            },
            {
                "id": "cloud_mid_03",
                "tier": 1,
                "x_pct": 0.80,
                "y_pct": 0.28,
                "sprite": "cloud_stratus_small",
                "rotation_deg": 0
            },
            # Near tier (larger, more opaque, faster moving)
            {
                "id": "cloud_near_01",
                "tier": 2,
                "x_pct": 0.35,
                "y_pct": 0.45,
                "sprite": "cloud_cumulus_large",
                "rotation_deg": 0
            },
            {
                "id": "cloud_near_02",
                "tier": 2,
                "x_pct": 0.65,
                "y_pct": 0.50,
                "sprite": "cloud_cumulus_large",
                "rotation_deg": 0
            }
        ],
        "rendering_notes": {
            "canvas_scaling": "All X/Y percentages are relative to canvas dimensions. Engine scales X by canvas width, Y by sky height (H - 90).",
            "parallax": "Each cloud's horizontal position updates by: offset = parallax.cloudN * tier.speed_multiplier",
            "responsive": "Cloud sizes scale with sky height: displayRadius = baseRadius * (skyHeight / 550)",
            "tiling": "Clouds wrap horizontally when they move off-screen, reappearing on opposite side.",
            "opacity_blending": "Each tier has opacity for atmospheric depth. Tier 0 (far) is most transparent."
        }
    }

    config_path = "/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/config/clouds_belgium.json"
    with open(config_path, 'w') as f:
        json.dump(config, f, indent=2)

    print(f"\nGenerated cloud config: {config_path}")
    return config

if __name__ == "__main__":
    print("Generating cloud sprites...")
    assets = generate_all_clouds()

    print("\nGenerating cloud configuration...")
    config = generate_cloud_config()

    print("\nDone! Cloud system ready for integration.")
    print(f"Sprites: {len(assets)} cloud variants")
    print(f"Config: clouds_belgium.json with {len(config['cloud_instances'])} cloud instances")
