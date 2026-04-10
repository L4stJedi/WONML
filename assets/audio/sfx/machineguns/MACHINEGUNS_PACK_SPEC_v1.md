# Machine-Guns Pack Spec v1
**Date:** 2026-04-10  
**Owner:** Jarvis (orchestration spec)  
**Contributors:** Caruso, Luca, Nico, Fixer

## Required Candidate Files (First Pass)
- `sfx_mg_vickers_burst_a.wav`
- `sfx_mg_vickers_burst_b.wav`
- `sfx_mg_spandau_burst_a.wav`
- `sfx_mg_spandau_burst_b.wav`
- `sfx_mg_distant_fire_layer_a.wav` (optional ambience layer)

## Purpose Mapping
- Vickers variants: British-aligned fire profile.
- Spandau variants: German-aligned fire profile.
- Distant layer: optional battlefield depth, never masking gameplay-critical cues.

## Gate Sequence (Mandatory)
1. **Luca gate**: historically plausible weapon traits.
2. **Nico gate**: runtime format and payload safety.
3. **Fixer gate**: campaign/level readability and escalation fit.
4. **Caruso matrix**: final `Ready to insert` or `Blocked`.

## Acceptance Notes
- Distinct audible character between Vickers and Spandau.
- Lightweight browser/mobile footprint.
- Fast trigger response for gameplay feedback.
- No BGM overwrite; additive SFX only.
