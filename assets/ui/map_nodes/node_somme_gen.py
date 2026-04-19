#!/usr/bin/env python3
"""
Somme 1916 Icon Generator
Mark I Tank silhouette - iconic first tank in combat at Flers-Courcelette
32x32 pixel art, flat cel-shaded, no gradients
"""

from PIL import Image, ImageDraw
import math

# Output image: 32x32, RGBA (transparent background)
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Colors - utilitarian tank palette
TANK_COLOR = (0x5A, 0x5A, 0x52, 255)    # Olive-drab #5A5A52
TRACK_COLOR = (0x2A, 0x2A, 0x22, 255)   # Dark olive/black #2A2A22
OUTLINE_COLOR = (0x1E, 0x1A, 0x14, 255) # Dark brown/black #1E1A14

# Center
cx, cy = 16, 16

# Mark I Tank - profile view (side-on silhouette)
# Notable features: tall body, sponsons (side protrusions for guns), tracked treads

# Main hull - wide rectangular body
hull_x0, hull_y0 = 8, 12
hull_x1, hull_y1 = 24, 19

# Turret/superstructure - smaller rectangle on top center
turret_x0, turret_y0 = 11, 9
turret_x1, turret_y1 = 21, 12

# Draw hull outline
draw.rectangle([hull_x0 - 1, hull_y0 - 1, hull_x1 + 1, hull_y1 + 1], outline=OUTLINE_COLOR, width=1)
# Draw turret outline
draw.rectangle([turret_x0 - 1, turret_y0 - 1, turret_x1 + 1, turret_y1 + 1], outline=OUTLINE_COLOR, width=1)

# Fill hull and turret
draw.rectangle([hull_x0, hull_y0, hull_x1, hull_y1], fill=TANK_COLOR)
draw.rectangle([turret_x0, turret_y0, turret_x1, turret_y1], fill=TANK_COLOR)

# Sponsons (side gun protrusions) - small rectangles on hull sides
# Left sponson
draw.rectangle([7, 14, 9, 17], fill=TANK_COLOR)
draw.rectangle([6, 14, 9, 17], outline=OUTLINE_COLOR, width=1)
# Right sponson
draw.rectangle([23, 14, 25, 17], fill=TANK_COLOR)
draw.rectangle([23, 14, 26, 17], outline=OUTLINE_COLOR, width=1)

# Tank gun/cannon - small protrusion from front of turret
draw.rectangle([10, 10, 12, 11], fill=TANK_COLOR)
draw.rectangle([9, 9, 13, 12], outline=OUTLINE_COLOR, width=1)

# Tracks/treads - parallel lines at base showing caterpillar tracks
# Front tracks
draw.rectangle([8, 19, 24, 20], fill=TRACK_COLOR)
# Rear tracks
draw.rectangle([8, 20, 24, 21], fill=TRACK_COLOR)

# Track wheels/detail - small circles along the sides to suggest tread
for x in [10, 14, 18, 22]:
    draw.ellipse([x - 1, 19, x + 1, 21], fill=OUTLINE_COLOR)

# Drive sprocket details - larger circles at front and back
draw.ellipse([7, 18, 10, 22], outline=OUTLINE_COLOR, width=1)
draw.ellipse([22, 18, 25, 22], outline=OUTLINE_COLOR, width=1)

# Save as PNG
output_path = '/sessions/adoring-epic-planck/mnt/Desktop/My Team/Team Inbox/WONML/assets/ui/map_nodes/node_somme.png'
img.save(output_path, 'PNG')

print("Somme icon generated: node_somme.png (32x32)")
print(f"Image size: {img.size}")
print(f"Motif: Mark I Tank silhouette (first tank combat, Flers-Courcelette)")
print(f"Colors: Olive-drab hull, dark olive tracks")
print(f"Saved to: {output_path}")
