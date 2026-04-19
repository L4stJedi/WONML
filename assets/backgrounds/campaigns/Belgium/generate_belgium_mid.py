#!/usr/bin/env python3
"""
Belgium Mid-Layer Generator
Generates seamlessly tileable mid-distance silhouettes (cities, hills, industrial structures).
Per Nico's spec: 860×280px base, can tile seamlessly at W=375,430,600.
Variants: S1 (rural), S3 (industrial), S5 (contested).
"""

from PIL import Image, ImageDraw
import math

def generate_belgium_mid_s1():
    """
    S1: Rural variant - rolling hills, sparse buildings, church steeple
    Soft silhouettes, muted greens and browns.
    """
    width, height = 860, 280
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Palette: muted greens, browns, grays
    color_hill1 = (108, 145, 87, 255)      # muted green
    color_hill2 = (142, 125, 92, 255)      # warm brown
    color_town = (94, 81, 71, 255)         # dark brown
    color_church = (64, 56, 48, 255)       # very dark brown

    # Draw rolling hills baseline at 60% height
    baseline = int(height * 0.6)

    # Left section: gently rolling hills
    points_left = [
        (0, height),
        (0, baseline - 20),
        (80, baseline - 35),
        (160, baseline - 25),
        (240, baseline - 40),
        (320, baseline - 30),
    ]
    draw.polygon(points_left, fill=color_hill1)

    # Middle section: sparse town silhouette (church + houses)
    town_x = 400
    church_base = baseline - 15

    # Church steeple (main focus)
    steeple_peak = church_base - 70
    draw.polygon([
        (town_x - 5, church_base),
        (town_x - 15, church_base - 20),
        (town_x, steeple_peak),
        (town_x + 15, church_base - 20),
        (town_x + 5, church_base),
    ], fill=color_church)

    # Church body
    draw.rectangle([town_x - 25, church_base - 20, town_x + 25, church_base], fill=color_town)

    # Surrounding houses (small blocks)
    for i, ox in enumerate([-60, -30, 30, 60]):
        house_h = 15 + i * 3
        draw.rectangle([town_x + ox - 15, church_base - house_h, town_x + ox + 15, church_base],
                      fill=color_town)

    # Right section: rolling away hills
    points_right = [
        (520, baseline - 35),
        (600, baseline - 20),
        (680, baseline - 40),
        (760, baseline - 25),
        (860, baseline - 35),
        (860, height),
    ]
    draw.polygon(points_right, fill=color_hill2)

    # Add light transparency gradient at top (30% fades to transparent)
    fade_height = int(height * 0.3)
    for y in range(fade_height):
        alpha_fade = int(255 * (1.0 - (fade_height - y) / fade_height))
        # Draw semi-transparent line to create gradient
        for x in range(width):
            px = img.getpixel((x, y))
            if px[3] > 0:  # Only fade existing pixels
                img.putpixel((x, y), (px[0], px[1], px[2], alpha_fade))

    output_path = "/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/assets/backgrounds/campaigns/Belgium/BelgiumMid_S1_rework.png"
    img.save(output_path)
    print("Generated BelgiumMid_S1_rework.png: 860×280px, rural variant")

def generate_belgium_mid_s3():
    """
    S3: Industrial variant - factories, trenches, fortified positions
    Darker, more angular silhouettes with industrial structures.
    """
    width, height = 860, 280
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Palette: darker grays, industrial tones
    color_factory = (64, 64, 64, 255)      # dark gray
    color_trench = (92, 88, 76, 255)       # trench brown
    color_sky_silhouette = (48, 44, 40, 255)  # very dark

    baseline = int(height * 0.65)

    # Left: industrial complex with smokestacks
    factory_base = baseline - 10
    # Factory building
    draw.rectangle([20, factory_base - 50, 120, factory_base], fill=color_factory)
    # Smokestacks (3 of them)
    for sx in [40, 70, 100]:
        draw.rectangle([sx - 4, factory_base - 80, sx + 4, factory_base - 50], fill=color_sky_silhouette)

    # Middle: trenches and fortified line
    trench_x = 380
    # Main trench line (jagged)
    trench_points = [
        (320, baseline),
        (340, baseline - 25),
        (380, baseline - 35),
        (420, baseline - 25),
        (440, baseline - 30),
        (480, baseline - 20),
        (520, baseline),
    ]
    draw.polygon([(p[0], p[1]) for p in trench_points] +
                 [(520, height), (320, height)], fill=color_trench)

    # Fortified bunkers (rectangular blocks)
    for bx in [350, 410, 480]:
        draw.rectangle([bx - 15, baseline - 25, bx + 15, baseline], fill=color_factory)

    # Right: industrial sprawl
    sprawl_x = 640
    # Large factory silhouette
    draw.rectangle([600, baseline - 60, 720, baseline], fill=color_factory)
    # Additional stacks
    for sx in [620, 660, 700]:
        draw.rectangle([sx - 3, baseline - 90, sx + 3, baseline - 60], fill=color_sky_silhouette)

    # Tall transmission tower
    draw.line([(760, baseline - 80), (760, baseline)], fill=color_sky_silhouette, width=2)
    draw.line([(750, baseline - 50), (770, baseline - 50)], fill=color_sky_silhouette, width=1)

    # Right edge fades
    points_right = [
        (760, baseline - 40),
        (860, baseline - 25),
        (860, baseline),
        (860, height),
        (320, height),
    ]

    # Add top fade
    fade_height = int(height * 0.3)
    for y in range(fade_height):
        alpha_fade = int(255 * (1.0 - (fade_height - y) / fade_height))
        for x in range(width):
            px = img.getpixel((x, y))
            if px[3] > 0:
                img.putpixel((x, y), (px[0], px[1], px[2], alpha_fade))

    output_path = "/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/assets/backgrounds/campaigns/Belgium/BelgiumMid_S3_rework.png"
    img.save(output_path)
    print("Generated BelgiumMid_S3_rework.png: 860×280px, industrial variant")

def generate_belgium_mid_s5():
    """
    S5: Contested variant - burnt buildings, damaged structures, active warfare scars
    Rough, broken silhouettes with ruins.
    """
    width, height = 860, 280
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Palette: charred blacks, burnt oranges, dark grays
    color_ruin = (56, 48, 40, 255)         # charred
    color_burnt = (96, 72, 48, 255)        # burnt brown
    color_smoke = (80, 80, 80, 255)        # smoke gray

    baseline = int(height * 0.62)

    # Left: collapsed buildings with jagged tops
    ruin_points_left = [
        (0, baseline),
        (20, baseline - 55),
        (35, baseline - 25),
        (60, baseline - 70),
        (80, baseline - 15),
        (110, baseline - 50),
        (140, baseline - 30),
        (160, baseline),
    ]
    draw.polygon(ruin_points_left + [(160, height), (0, height)], fill=color_ruin)

    # Center: heavily damaged town with broken church
    church_x = 420
    # Broken steeple (crooked)
    steeple_base = baseline - 20
    draw.line([(church_x, steeple_base), (church_x + 8, steeple_base - 60)], fill=color_ruin, width=8)

    # Ruined buildings (irregular blocks)
    ruin_centers = [
        (350, baseline - 35),
        (420, baseline - 25),
        (500, baseline - 40),
        (560, baseline - 20),
    ]
    for cx, cy in ruin_centers:
        # Irregular rectangle to simulate damage
        draw.rectangle([cx - 20, cy, cx + 20, baseline], fill=color_burnt)
        # Add jagged top edge
        for i in range(-1, 2):
            draw.line([(cx + i * 15, cy - 5), (cx + i * 15, cy)], fill=color_ruin, width=2)

    # Right: distant burning
    burn_x = 720
    draw.rectangle([680, baseline - 45, 760, baseline], fill=color_ruin)
    # Flame-like silhouette
    draw.polygon([
        (700, baseline - 30),
        (710, baseline - 50),
        (720, baseline - 35),
        (730, baseline - 55),
        (740, baseline - 30),
    ], fill=color_burnt)

    # Smoke clouds (semi-transparent gray)
    img_smoke = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw_smoke = ImageDraw.Draw(img_smoke)
    for sy in range(0, baseline - 40, 20):
        draw_smoke.ellipse([660, sy, 780, sy + 30], fill=color_smoke)
    img.paste(Image.composite(img_smoke, img, img_smoke), (0, 0))

    # Top fade
    fade_height = int(height * 0.35)
    for y in range(fade_height):
        alpha_fade = int(255 * (1.0 - (fade_height - y) / fade_height))
        for x in range(width):
            px = img.getpixel((x, y))
            if px[3] > 0:
                img.putpixel((x, y), (px[0], px[1], px[2], alpha_fade))

    output_path = "/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/assets/backgrounds/campaigns/Belgium/BelgiumMid_S5_rework.png"
    img.save(output_path)
    print("Generated BelgiumMid_S5_rework.png: 860×280px, contested variant")

if __name__ == "__main__":
    generate_belgium_mid_s1()
    generate_belgium_mid_s3()
    generate_belgium_mid_s5()
    print("All Belgium mid-layer variants generated.")
