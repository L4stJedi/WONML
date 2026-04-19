#!/usr/bin/env python3
"""
Verdun 1916 Icon Generator
Crossed sword and shield with French cockade - represents fortress defense
32x32 pixel art, flat cel-shaded, no gradients
Dark, grim palette appropriate to the 10-month attrition battle
"""

from PIL import Image, ImageDraw
import math

# Output image: 32x32, RGBA (transparent background)
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Colors - dark, grim palette
SHIELD_COLOR = (0x4A, 0x4A, 0x5C, 255)  # Dark slate #4A4A5C
SWORD_COLOR = (0x8B, 0x8B, 0x8B, 255)   # Dark silver #8B8B8B
COCKADE_COLOR = (0xC8, 0x20, 0x20, 255) # French red (tri-color middle) #C82020
OUTLINE_COLOR = (0x1E, 0x1A, 0x14, 255) # Dark brown/black #1E1A14

# Center
cx, cy = 16, 16

# Shield - shield-shaped polygon in center
# Shield outline (pointed bottom, rounded top)
shield_points = [
    (cx, cy - 7),      # top point
    (cx + 6, cy - 6),  # top-right curve
    (cx + 7, cy - 1),  # right side
    (cx + 7, cy + 3),  # bottom-right
    (cx, cy + 8),      # bottom point
    (cx - 7, cy + 3),  # bottom-left
    (cx - 7, cy - 1),  # left side
    (cx - 6, cy - 6),  # top-left curve
]

# Draw shield outline
draw.polygon(shield_points, outline=OUTLINE_COLOR, fill=SHIELD_COLOR)

# Sword 1 - diagonal from top-left to bottom-right
# Tilted about 45 degrees through center
sword1_x0, sword1_y0 = 8, 6
sword1_x1, sword1_y1 = 24, 22
draw.line(
    [(sword1_x0, sword1_y0), (sword1_x1, sword1_y1)],
    fill=OUTLINE_COLOR, width=2
)
draw.line(
    [(sword1_x0 + 1, sword1_y0), (sword1_x1 + 1, sword1_y1)],
    fill=SWORD_COLOR, width=1
)

# Sword 2 - diagonal from top-right to bottom-left (crossing the first)
sword2_x0, sword2_y0 = 24, 6
sword2_x1, sword2_y1 = 8, 22
draw.line(
    [(sword2_x0, sword2_y0), (sword2_x1, sword2_y1)],
    fill=OUTLINE_COLOR, width=2
)
draw.line(
    [(sword2_x0 - 1, sword2_y0), (sword2_x1 - 1, sword2_y1)],
    fill=SWORD_COLOR, width=1
)

# French cockade - small tri-color circle in top-right corner of shield
cockade_cx = cx + 6
cockade_cy = cy - 5
cockade_radius = 2

# Draw outer outline
draw.ellipse(
    [cockade_cx - cockade_radius - 1, cockade_cy - cockade_radius - 1,
     cockade_cx + cockade_radius + 1, cockade_cy + cockade_radius + 1],
    fill=OUTLINE_COLOR
)

# Draw cockade - red (French blue and white are hard to read at 2px)
# Just use the red center to represent the French tri-color
draw.ellipse(
    [cockade_cx - cockade_radius, cockade_cy - cockade_radius,
     cockade_cx + cockade_radius, cockade_cy + cockade_radius],
    fill=COCKADE_COLOR
)

# Save as PNG
output_path = '/sessions/adoring-epic-planck/mnt/Desktop/My Team/Team Inbox/WONML/assets/ui/map_nodes/node_verdun.png'
img.save(output_path, 'PNG')

print("Verdun icon generated: node_verdun.png (32x32)")
print(f"Image size: {img.size}")
print(f"Motif: Crossed sword and shield with French cockade")
print(f"Colors: Dark slate shield, dark silver swords, bright red cockade")
print(f"Saved to: {output_path}")
