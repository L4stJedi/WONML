#!/usr/bin/env python3
"""
Flanders Poppy Icon Generator
32x32 pixel art, flat cel-shaded, no gradients
"""

from PIL import Image, ImageDraw
import math

# Output image: 32x32, RGBA (transparent background)
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Colors (exact hex values)
PETAL_COLOR = (0xB8, 0x20, 0x20, 255)  # #B82020 (bright red)
CENTER_COLOR = (0x1E, 0x1A, 0x14, 255) # #1E1A14 (dark brown/black)
OUTLINE_COLOR = (0x1E, 0x1A, 0x14, 255) # #1E1A14

# Center of canvas
cx, cy = 16, 16

# Center circle: 4px radius + 1.5px outline
center_radius = 4
outline_width = 1  # Approximate 1.5px as 1px in pixel art

# Draw center circle with outline
# Outer circle (outline)
draw.ellipse(
    [cx - center_radius - outline_width, cy - center_radius - outline_width,
     cx + center_radius + outline_width, cy + center_radius + outline_width],
    fill=OUTLINE_COLOR
)
# Inner circle (center)
draw.ellipse(
    [cx - center_radius, cy - center_radius,
     cx + center_radius, cy + center_radius],
    fill=CENTER_COLOR
)

# Petal parameters
# 4 petals radiating from center, roughly oval 7-8px wide, 10px tall
petal_width = 7
petal_height = 10
petal_distance = 6  # Distance from center to petal base

# 4 petals at 0°, 90°, 180°, 270°
angles = [0, 90, 180, 270]

for angle_deg in angles:
    # Convert to radians
    angle_rad = math.radians(angle_deg)

    # Calculate petal position
    # Petal points upward (or in the direction of angle), radiates from center
    px = cx + petal_distance * math.cos(angle_rad)
    py = cy + petal_distance * math.sin(angle_rad)

    # Create a bounding box for an ellipse rotated to point in the angle direction
    # For simplicity, we'll draw 4 oval petals oriented N, E, S, W

    if angle_deg == 0:  # Right
        # Petal extends to the right
        x0 = px
        y0 = cy - petal_width // 2
        x1 = px + petal_height
        y1 = cy + petal_width // 2
    elif angle_deg == 90:  # Up
        # Petal extends upward
        x0 = cx - petal_width // 2
        y0 = py - petal_height
        x1 = cx + petal_width // 2
        y1 = py
    elif angle_deg == 180:  # Left
        # Petal extends to the left
        x0 = px - petal_height
        y0 = cy - petal_width // 2
        x1 = px
        y1 = cy + petal_width // 2
    elif angle_deg == 270:  # Down
        # Petal extends downward
        x0 = cx - petal_width // 2
        y0 = py
        x1 = cx + petal_width // 2
        y1 = py + petal_height

    # Draw petal outline first
    draw.ellipse([x0 - outline_width, y0 - outline_width, x1 + outline_width, y1 + outline_width],
                 fill=OUTLINE_COLOR)
    # Draw petal fill
    draw.ellipse([x0, y0, x1, y1], fill=PETAL_COLOR)

# Save as PNG, nearest-neighbor (no antialiasing)
output_path = '/sessions/adoring-epic-planck/mnt/My Team/Team Inbox/WONML/assets/ui/map_nodes/node_belgium.png'
img.save(output_path, 'PNG')

print("Poppy icon generated: node_belgium.png (32x32)")
print(f"Image size: {img.size}")
print(f"Petal color: {PETAL_COLOR}")
print(f"Center color: {CENTER_COLOR}")
print(f"Saved to: {output_path}")
