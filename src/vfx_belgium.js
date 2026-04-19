/**
 * vfx_belgium.js
 * Procedural VFX module for WONML (Wings Over No Man's Land)
 * Belgium vertical slice — 5 combat animations rendered via canvas 2D
 *
 * Exports 5 render functions:
 * - renderFlakBurst(ctx, x, y, t, options)
 * - renderSmokeTrail(ctx, emitter, dt, options)
 * - renderFireStates(ctx, x, y, w, h, t, stage)
 * - renderMuzzleFlash(ctx, x, y, angle, t, options)
 * - renderDeathExplosion(ctx, x, y, t, options)
 *
 * All functions are pure (mutate only ctx or particle arrays passed in).
 * No global state.
 * Uses `t` (elapsed ms since VFX started) for animation.
 * Palette: #B82020 (WW1 red-brown), #1E1A14 (deep soil/shadow)
 */

// ============================================================================
// FLAK BURST — Anti-aircraft shell explosion, 1917 Archie puff
// Total duration: 747ms (8 frames @ 12fps = 83ms per frame, with holds)
// ============================================================================

function renderFlakBurst(ctx, x, y, t, options = {}) {
  if (t < 0 || t > 800) return; // Safety clamp

  const colors = {
    red: options.redColor || '#B82020',
    dark: options.darkColor || '#1E1A14'
  };

  // Frame timing (ms)
  // Frame 0: 0–83ms
  // Frame 1: 83–166ms
  // Frame 2: 166–498ms (2-frame hold)
  // Frame 3–4: 498–830ms (2-frame hold each)
  // Frame 5–6: 664–830ms (1-frame hold each)
  // Frame 7: 747–830ms (1-frame hold)

  let frame = -1;
  let localT = t;

  if (t < 83) frame = 0;
  else if (t < 166) frame = 1;
  else if (t < 498) frame = 2;
  else if (t < 664) frame = 3;
  else if (t < 830) frame = 4;

  if (frame === -1) return; // Past animation

  ctx.save();
  ctx.translate(x, y);

  if (frame === 0) {
    // Small dense point, dark fuzzy core
    drawGradientCircle(ctx, 0, 0, 8, 12, colors.dark, colors.dark, 0.8);
  } else if (frame === 1) {
    // Round burst ~60px diameter, jagged edge
    // Red outer ring, dark core
    drawJaggedRing(ctx, 0, 0, 30, 35, colors.red, 1.0, 8);
    drawGradientCircle(ctx, 0, 0, 10, 20, colors.dark, colors.dark, 0.6);
  } else if (frame === 2) {
    // ~90px bloom, soft perimeter, central void
    drawJaggedRing(ctx, 0, 0, 35, 45, colors.red, 0.7, 12);
    drawShadowBands(ctx, 0, 0, 40, colors.dark, 0.4, 6);
  } else if (frame === 3) {
    // Same 90px, edges soften, fuzz dominant
    drawJaggedRing(ctx, 0, 0, 35, 45, colors.red, 0.5, 14);
    drawShadowBands(ctx, 0, 0, 40, colors.dark, 0.2, 8);
  } else if (frame === 4) {
    // Bloom shrinks to ~70px, interior mostly transparent
    drawJaggedRing(ctx, 0, 0, 28, 38, colors.red, 0.3, 16);
  }

  ctx.restore();
}

// ============================================================================
// SMOKE TRAIL — Continuous emission from damaged aircraft
// Total: 6 frames @ 16fps = 62ms per frame, seamless loop
// ============================================================================

function renderSmokeTrail(ctx, emitter, dt, options = {}) {
  // emitter: { x, y, vx, vy, particles: [] }
  // particles: [{ x, y, vx, vy, age, life }, ...]
  // dt: delta time since last frame (ms)

  if (!emitter || !emitter.particles) return emitter;

  const colors = {
    dark: options.darkColor || '#1E1A14',
    red: options.redColor || '#B82020'
  };

  const emission = {
    rate: 2, // particles per frame
    vx: emitter.vx || 0,
    vy: emitter.vy || 0,
    variance: 0.5
  };

  // Update existing particles
  for (let i = emitter.particles.length - 1; i >= 0; i--) {
    const p = emitter.particles[i];
    p.age += dt;
    p.x += p.vx * (dt / 1000);
    p.y += p.vy * (dt / 1000);
    p.vy += 0.05; // gravity

    if (p.age > p.life) {
      emitter.particles.splice(i, 1);
    }
  }

  // Emit new particles
  for (let i = 0; i < emission.rate; i++) {
    const angle = Math.random() * Math.PI * 2;
    const spread = 1 + Math.random() * emission.variance;
    emitter.particles.push({
      x: emitter.x,
      y: emitter.y,
      vx: emission.vx + Math.cos(angle) * spread,
      vy: emission.vy + Math.sin(angle) * spread,
      age: 0,
      life: 300 // ms
    });
  }

  // Draw particles
  ctx.save();
  for (const p of emitter.particles) {
    const life = Math.max(0, p.life - p.age);
    const alpha = (life / p.life) * 0.6; // Peak 60% opacity
    const size = 3 + (p.age / p.life) * 4; // Grow as dispersed

    ctx.fillStyle = `rgba(30, 26, 20, ${alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();

  return emitter;
}

// ============================================================================
// FIRE STATES — 3-stage damage progression (Idle → Light → Heavy)
// Each stage: 4 frames @ 8fps = 125ms per frame, loopable
// ============================================================================

function renderFireStates(ctx, x, y, w, h, t, stage) {
  // stage: 0 (idle/smoke), 1 (light fire), 2 (heavy fire)
  // t: elapsed ms since entering this stage
  // w, h: aircraft bounds (typically 96×96 or smaller)

  if (stage < 0 || stage > 2) return;

  const colors = {
    red: '#B82020',
    dark: '#1E1A14'
  };

  // Frame timing at 8fps = 125ms per frame
  const frameTime = 125;
  let frame = Math.floor((t % (frameTime * 4)) / frameTime); // 0–3, looping

  ctx.save();
  ctx.translate(x + w / 2, y + h / 2); // Center on aircraft

  if (stage === 0) {
    // Idle: small wisp, gentle breathing
    const wisp_widths = [20, 28, 20, 20];
    const wisp_heights = [24, 32, 24, 24];
    const opacities = [0.2, 0.25, 0.15, 0.15];

    const ww = wisp_widths[frame];
    const hh = wisp_heights[frame];
    const alpha = opacities[frame];

    ctx.fillStyle = `rgba(30, 26, 20, ${alpha})`;
    ctx.beginPath();
    ctx.ellipse(0, -15, ww / 2, hh / 2, 0.2, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 1) {
    // Light fire: orange-red flames, localized
    const flame_widths = [30, 40, 25, 25];
    const flame_heights = [40, 50, 35, 35];
    const opacities = [0.8, 0.9, 0.6, 0.6];

    const fw = flame_widths[frame];
    const fh = flame_heights[frame];
    const alpha = opacities[frame];

    // Jagged flame outline
    ctx.fillStyle = `rgba(184, 32, 32, ${alpha})`;
    drawJaggedFlame(ctx, 0, -10, fw, fh, 4);

    // Dark shadow on left
    ctx.fillStyle = `rgba(30, 26, 20, ${alpha * 0.5})`;
    ctx.beginPath();
    ctx.ellipse(-fw / 3, -10, fw / 4, fh / 3, -0.3, 0, Math.PI * 2);
    ctx.fill();
  } else if (stage === 2) {
    // Heavy fire: massive flame, engulfs fuselage
    const flame_widths = [50, 60, 45, 45];
    const flame_heights = [60, 70, 55, 55];
    const opacities = [1.0, 1.0, 0.8, 0.8];

    const fw = flame_widths[frame];
    const fh = flame_heights[frame];
    const alpha = opacities[frame];

    // Heavy red flame
    ctx.fillStyle = `rgba(184, 32, 32, ${alpha})`;
    drawJaggedFlame(ctx, 0, -5, fw, fh, 6);

    // Heavy dark shadow bands
    ctx.fillStyle = `rgba(30, 26, 20, ${alpha * 0.6})`;
    for (let i = 0; i < 3; i++) {
      const offset = -fh / 3 + i * fh / 2;
      ctx.beginPath();
      ctx.ellipse(-fw / 4 + i * 5, offset, fw / 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

// ============================================================================
// MUZZLE FLASH — Instant gun discharge, chemical shock flash
// Total: 4 frames @ 24fps = 42ms per frame = 168ms total
// ============================================================================

function renderMuzzleFlash(ctx, x, y, angle, t, options = {}) {
  if (t < 0 || t > 170) return;

  const colors = {
    red: options.redColor || '#B82020',
    dark: options.darkColor || '#1E1A14'
  };

  const frameTime = 42;
  let frame = Math.floor(t / frameTime); // 0–3

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  if (frame === 0) {
    // Tiny spike, 8×12px, 2–3 diagonal rays
    drawMuzzleRays(ctx, 0, 0, 4, 6, colors.red, 1.0, 3);
  } else if (frame === 1) {
    // Bloom to ~28×36px, 4–5 irregular rays
    drawMuzzleRays(ctx, 0, 0, 14, 18, colors.red, 1.0, 5);
    ctx.fillStyle = `rgba(30, 26, 20, 0.3)`;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 2) {
    // Compact back to ~16×20px, fading
    drawMuzzleRays(ctx, 0, 0, 8, 10, colors.red, 0.5, 4);
  } else if (frame === 3) {
    // Barely visible fleck
    ctx.fillStyle = `rgba(184, 32, 32, 0.1)`;
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ============================================================================
// DEATH EXPLOSION — Aircraft destruction finale
// Total: 10 frames @ 10fps = 100ms per frame = 1000ms total
// ============================================================================

function renderDeathExplosion(ctx, x, y, t, options = {}) {
  if (t < 0 || t > 1010) return;

  const colors = {
    red: options.redColor || '#B82020',
    dark: options.darkColor || '#1E1A14'
  };

  const frameTime = 100;
  let frame = Math.floor(t / frameTime); // 0–9

  ctx.save();
  ctx.translate(x, y);

  if (frame === 0) {
    // Shockwave ignition: ~100px bloom, jagged perimeter
    drawJaggedRing(ctx, 0, 0, 45, 55, colors.red, 1.0, 12);
    ctx.fillStyle = `rgba(30, 26, 20, 0.5)`;
    ctx.beginPath();
    ctx.arc(0, 0, 25, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 1) {
    // Expansion peak: ~140px bloom, spikes radiate
    drawJaggedRing(ctx, 0, 0, 60, 75, colors.red, 1.0, 16);
    ctx.fillStyle = `rgba(30, 26, 20, 0.4)`;
    drawShadowBands(ctx, 0, 0, 65, colors.dark, 0.4, 8);
    drawDebrisSpikes(ctx, 0, 0, 65, 12);
  } else if (frame === 2) {
    // Slow diffuse: ~130px, definition softens
    drawJaggedRing(ctx, 0, 0, 55, 70, colors.red, 0.7, 14);
    ctx.fillStyle = `rgba(30, 26, 20, 0.3)`;
    drawShadowBands(ctx, 0, 0, 60, colors.dark, 0.25, 10);
  } else if (frame === 3) {
    // Continued diffuse
    drawJaggedRing(ctx, 0, 0, 55, 70, colors.red, 0.6, 16);
    ctx.fillStyle = `rgba(30, 26, 20, 0.2)`;
    drawShadowBands(ctx, 0, 0, 55, colors.dark, 0.15, 12);
  } else if (frame === 4) {
    // Linger: ~110px, very soft
    drawJaggedRing(ctx, 0, 0, 45, 60, colors.red, 0.4, 16);
    ctx.fillStyle = `rgba(30, 26, 20, 0.15)`;
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 5) {
    // Continued linger
    drawJaggedRing(ctx, 0, 0, 40, 55, colors.red, 0.3, 18);
    ctx.fillStyle = `rgba(30, 26, 20, 0.1)`;
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 6) {
    // Smoke aftermath: ~80px diffused haze
    ctx.fillStyle = `rgba(30, 26, 20, 0.5)`;
    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(184, 32, 32, 0.15)`;
    ctx.beginPath();
    ctx.arc(0, 0, 30, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 7) {
    // Heavy smoke plume
    ctx.fillStyle = `rgba(30, 26, 20, 0.45)`;
    ctx.beginPath();
    ctx.ellipse(0, 5, 35, 45, 0.1, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 8) {
    // Smoke persists
    ctx.fillStyle = `rgba(30, 26, 20, 0.35)`;
    ctx.beginPath();
    ctx.ellipse(0, 10, 30, 40, 0.15, 0, Math.PI * 2);
    ctx.fill();
  } else if (frame === 9) {
    // Final release: ~40px faint haze
    ctx.fillStyle = `rgba(30, 26, 20, 0.2)`;
    ctx.beginPath();
    ctx.arc(0, 0, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

// ============================================================================
// HELPER FUNCTIONS (Pure drawing utilities)
// ============================================================================

function drawGradientCircle(ctx, x, y, innerR, outerR, innerColor, outerColor, alpha) {
  const grad = ctx.createRadialGradient(x, y, innerR, x, y, outerR);
  grad.addColorStop(0, innerColor + Math.floor(alpha * 255).toString(16).padStart(2, '0'));
  grad.addColorStop(1, outerColor + '00');
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(x, y, outerR, 0, Math.PI * 2);
  ctx.fill();
}

function drawJaggedRing(ctx, x, y, innerR, outerR, color, alpha, jaggedness) {
  ctx.fillStyle = `rgba(184, 32, 32, ${alpha})`;
  if (color === '#1E1A14') {
    ctx.fillStyle = `rgba(30, 26, 20, ${alpha})`;
  }
  const avgR = (innerR + outerR) / 2;
  const variation = (outerR - innerR) / 2;

  ctx.beginPath();
  for (let i = 0; i < 360; i += 360 / jaggedness) {
    const angle = (i * Math.PI) / 180;
    const randVar = (Math.random() - 0.5) * variation;
    const r = avgR + randVar;
    const px = x + Math.cos(angle) * r;
    const py = y + Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();
}

function drawShadowBands(ctx, x, y, radius, color, alpha, count) {
  ctx.fillStyle = `rgba(30, 26, 20, ${alpha})`;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const bandWidth = radius * 0.15;
    const bandHeight = radius * 0.5;
    ctx.save();
    ctx.translate(x + Math.cos(angle) * radius * 0.3, y + Math.sin(angle) * radius * 0.3);
    ctx.rotate(angle);
    ctx.beginPath();
    ctx.ellipse(0, 0, bandWidth, bandHeight, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

function drawJaggedFlame(ctx, x, y, w, h, jaggedness) {
  ctx.beginPath();
  // Crown (top jagged points)
  for (let i = 0; i <= jaggedness; i++) {
    const px = x - w / 2 + (i / jaggedness) * w;
    const offset = Math.sin((i / jaggedness) * Math.PI) * h * 0.8;
    if (i === 0) ctx.moveTo(px, y - h / 2);
    ctx.quadraticCurveTo(px, y - h / 2 - offset, px + w / (jaggedness * 2), y - h / 2 - offset * 0.7);
  }
  // Right edge
  ctx.lineTo(x + w / 2, y + h / 2);
  // Bottom
  ctx.quadraticCurveTo(x, y + h / 3, x - w / 2, y + h / 2);
  // Left edge (completes to top-left)
  ctx.closePath();
  ctx.fill();
}

function drawMuzzleRays(ctx, x, y, w, h, color, alpha, rayCount) {
  ctx.fillStyle = `rgba(184, 32, 32, ${alpha})`;
  if (color === '#1E1A14') {
    ctx.fillStyle = `rgba(30, 26, 20, ${alpha})`;
  }

  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const len = Math.hypot(w, h) * 0.6;
    const rayW = 2 + Math.random() * 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.fillRect(0, -rayW / 2, len, rayW);
    ctx.restore();
  }
}

function drawDebrisSpikes(ctx, x, y, radius, count) {
  ctx.strokeStyle = `rgba(30, 26, 20, 0.6)`;
  ctx.lineWidth = 1.5;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const len = radius * (0.8 + Math.random() * 0.4);
    const px = x + Math.cos(angle) * radius;
    const py = y + Math.sin(angle) * radius;
    const ex = x + Math.cos(angle) * len;
    const ey = y + Math.sin(angle) * len;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.lineTo(ex, ey);
    ctx.stroke();
  }
}

// ============================================================================
// EXPORTS
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    renderFlakBurst,
    renderSmokeTrail,
    renderFireStates,
    renderMuzzleFlash,
    renderDeathExplosion
  };
}
