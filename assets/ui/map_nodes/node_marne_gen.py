#!/usr/bin/env python3
"""
Marne 1914 Icon Generator
Taxi de la Marne silhouette - iconic Paris taxi that ferried troops
32x32 pixel art, flat cel-shaded, no gradients
"""

from PIL import Image, ImageDraw
import math

# Output image: 32x32, RGBA (transparent background)
img = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Colors - muted period palette
TAXI_COLOR = (0x3C, 0x3C, 0x48, 255)  # Dark blue-grey #3C3C48
WINDOW_COLOR = (0xA8, 0xC5, 0xD4, 255)  # Pale blue #A8C5D4
OUTLINE_COLOR = (0x1E, 0x1A, 0x14, 255)  # Dark brown/black #1E1A14
ACCENT_COLOR = (0xD4, 0x9A, 0x4A, 255)  # Brass/gold #D49A4A (taxi stripe)

# Center taxi body
cx, cy = 16, 16

# Taxi body: a boxy silhouette roughly 14px wide x 10px tall
# Simple rectangle with rounded corners effect, slightly tilted perspective

# Main body - simplified taxi cab shape
# Back axle/wheels area (wider)
body_back_x0 = 9
body_back_y0 = 13
body_back_x1 = 23
body_back_y1 = 18

# Cabin area (narrower top)
cabin_x0 = 10
cabin_y0 = 8
cabin_x1 = 22
cabin_y1 = 13

# Draw body outline
draw.rectangle(
    [body_back_x0 - 1, body_back_y0, body_back_x1 + 1, body_back_y1],
    outline=OUTLINE_COLOR, width=1
)
# Cabin outline
draw.rectangle(
    [cabin_x0 - 1, cabin_y0, cabin_x1 + 1, cabin_y1],
    outline=OUTLINE_COLOR, width=1
)

# Draw body fill
draw.rectangle([body_back_x0, body_back_y0, body_back_x1, body_back_y1], fill=TAXI_COLOR)
draw.rectangle([cabin_x0, cabin_y0, cabin_x1, cabin_y1], fill=TAXI_COLOR)

# Windows - two small panes on cabin
window1_x0 = 12
window1_y0 = 9
window1_x1 = 15
window1_y1 = 12

window2_x0 = 17
window2_y0 = 9
window2_x1 = 20
window2_y1 = 12

draw.rectangle([window1_x0, window1_y0, window1_x1, window1_y1], fill=WINDOW_COLOR)
draw.rectangle([window2_x0, window2_y0, window2_x1, window2_y1], fill=WINDOW_COLOR)

# Stripe/accent (brass band across top)
draw.rectangle([body_back_x0, 12, body_back_x1, 13], fill=ACCENT_COLOR)

# Front and back bumpers (small rectangles)
draw.rectangle([9, 18, 23, 19], fill=OUTLINE_COLOR)  # Back bumper
draw.rectangle([10, 7, 22, 8], fill=OUTLINE_COLOR)   # Front bumper

# Wheels - two small circles at base
wheel1_x = 12
wheel2_x = 20
wheel_y = 19
wheel_radius = 2

draw.ellipse(
    [wheel1_x - wheel_radius, wheel_y, wheel1_x + wheel_radius, wheel_y + wheel_radius + 1],
    fill=OUTLINE_COLOR
)
draw.ellipse(
    [wheel2_x - wheel_radius, wheel_y, wheel2_x + wheel_radius, wheel_y + wheel_radius + 1],
    fill=OUTLINE_COLOR
)

# Save as PNG
output_path = '/sessions/adoring-epic-planck/mnt/Desktop/My Team/Team Inbox/WONML/assets/ui/map_nodes/node_marne.png'
img.save(output_path, 'PNG')

print("Marne icon generated: node_marne.png (32x32)")
print(f"Image size: {img.size}")
print(f"Motif: Taxi de la Marne (iconic troop transport)")
print(f"Colors: Dark blue-grey taxi, pale blue windows, brass stripe")
print(f"Saved to: {output_path}")
