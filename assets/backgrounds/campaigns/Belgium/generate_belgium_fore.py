#!/usr/bin/env python3
"""
Belgium Fore (Near) Layer Generator
Generates seamlessly tileable near-foreground silhouettes (trees, trenches, bunkers).
Per Nico's spec: 900×260px base, top 30% fades to alpha for smooth blending.
Single variant shared across S1/S3/S5 (detail-rich foreground).
"""

from PIL import Image, ImageDraw
import math

def generate_belgium_fore_s1():
    """
    Foreground: Very near terrain with dramatic silhouettes.
    - Gnarled tree trunks and branches (left foreground)
    - Trench system with barbed wire silhouettes
    - Bunker entrance (right)
    - Grass and mud at ground level
    Main silhouette in bottom 70%, top 30% fades to transparent.
    """
    width, height = 900, 260
    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # Palette: very dark silhouettes, muddy tones
    color_tree = (32, 28, 24, 255)         # charcoal brown (tree trunks)
    color_trench = (56, 48, 40, 255)       # dark trench brown
    color_bunker = (48, 40, 32, 255)       # bunker gray-brown
    color_grass = (72, 88, 56, 255)        # dark grass
    color_mud = (60, 52, 44, 255)          # mud tone

    # Main silhouette zone: bottom 70% (from y=78 to y=260)
    silhouette_top = int(height * 0.30)    # 78px
    silhouette_base = height

    # === LEFT FOREGROUND: Gnarled Tree ===
    # Large tree trunk with dramatic branches
    trunk_x = 50
    trunk_base = silhouette_base - 10

    # Main trunk (tapering)
    trunk_points = [
        (trunk_x - 30, trunk_base),
        (trunk_x - 25, trunk_base - 100),
        (trunk_x - 15, trunk_base - 150),
        (trunk_x - 8, trunk_base - 180),
        (trunk_x + 8, trunk_base - 180),
        (trunk_x + 15, trunk_base - 150),
        (trunk_x + 25, trunk_base - 100),
        (trunk_x + 30, trunk_base),
    ]
    draw.polygon(trunk_points, fill=color_tree)

    # Major branches (left and right)
    for bx, by, bangle in [(-80, -120, 30), (80, -140, -25)]:
        bx_end = trunk_x + bx + int(40 * math.cos(math.radians(bangle)))
        by_end = trunk_base + by + int(40 * math.sin(math.radians(bangle)))
        draw.line([(trunk_x, trunk_base + by), (bx_end, by_end)], fill=color_tree, width=6)
        # Twigs
        for tw in range(-15, 16, 8):
            tw_x = bx_end + tw
            tw_y = by_end + int(tw * 0.3)
            draw.line([(bx_end, by_end), (tw_x, tw_y)], fill=color_tree, width=2)

    # === CENTER: Trench System ===
    # Main trench line (jagged, deep)
    trench_start = 200
    trench_points = [
        (trench_start, silhouette_base),
        (trench_start + 30, silhouette_base - 40),     # Down into trench
        (trench_start + 60, silhouette_base - 50),
        (trench_start + 100, silhouette_base - 45),
        (trench_start + 140, silhouette_base - 60),    # Deeper
        (trench_start + 180, silhouette_base - 50),
        (trench_start + 220, silhouette_base - 65),
        (trench_start + 260, silhouette_base - 40),
        (trench_start + 280, silhouette_base),         # Back up to ground
    ]
    draw.polygon(trench_points + [(trench_start + 280, height), (trench_start, height)],
                fill=color_trench)

    # Barbed wire silhouettes (zigzag lines above trench)
    for wx in range(trench_start + 20, trench_start + 280, 40):
        wy_base = silhouette_base - 55
        # Zigzag wire
        for i in range(3):
            draw.line([(wx, wy_base), (wx + 8, wy_base - 6)], fill=color_tree, width=1)
            draw.line([(wx + 8, wy_base - 6), (wx + 16, wy_base)], fill=color_tree, width=1)
            wy_base -= 8

    # === RIGHT FOREGROUND: Bunker/Fortified Position ===
    bunker_x = 650
    bunker_base = silhouette_base - 5
    bunker_height = 60

    # Main bunker structure (rectangular)
    draw.rectangle([bunker_x - 50, bunker_base - bunker_height, bunker_x + 50, bunker_base],
                  fill=color_bunker)

    # Bunker entrance/firing port (dark rectangular opening)
    draw.rectangle([bunker_x - 30, bunker_base - 30, bunker_x + 30, bunker_base - 10],
                  fill=(16, 12, 8, 255))  # nearly black

    # Sandbags stacked on top
    for i, sx in enumerate(range(bunker_x - 40, bunker_x + 40, 20)):
        draw.rectangle([sx, bunker_base - bunker_height - 12, sx + 18, bunker_base - bunker_height],
                      fill=color_mud)

    # Gun barrel pointing out
    draw.line([(bunker_x + 40, bunker_base - 20), (bunker_x + 80, bunker_base - 25)],
             fill=color_tree, width=4)

    # === GROUND/GRASS DETAIL ===
    # Rough ground line at base
    ground_y = silhouette_base
    ground_points = []
    for gx in range(0, width + 20, 40):
        goff = 3 if (gx // 40) % 2 == 0 else -3
        ground_points.append((gx, ground_y + goff))
    ground_points.append((width, height))
    ground_points.append((0, height))
    draw.polygon(ground_points, fill=color_grass)

    # === TOP FADE (30% of height, 0-78px) ===
    # Linear alpha gradient from fully transparent at top to fully opaque at 30% line
    fade_height = silhouette_top
    for y in range(fade_height):
        # Fade from transparent (alpha=0) at y=0 to opaque (alpha=255) at y=fade_height
        alpha_fade = int(255 * (y / fade_height))
        for x in range(width):
            px = img.getpixel((x, y))
            if px[3] > 0:  # Only modify drawn pixels
                img.putpixel((x, y), (px[0], px[1], px[2], alpha_fade))

    output_path = "/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/assets/backgrounds/campaigns/Belgium/BelgiumFore_S1_rework.png"
    img.save(output_path)
    print("Generated BelgiumFore_S1_rework.png: 900×260px, detailed foreground with alpha fade")

if __name__ == "__main__":
    generate_belgium_fore_s1()
    print("Belgium fore-layer generated.")
