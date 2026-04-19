# Machine Gun Audio Approval Matrix — Skeleton v1
**Date:** 2026-04-19  
**Status:** Staged, awaiting gate verdicts  
**Owner:** Caruso (Sound Designer)

---

## Overview

This matrix tracks each machine-gun SFX file through three sequential approval gates:

1. **Luca (Historical accuracy):** Period-correct weapon traits, behaviour, timbre
2. **Nico (Tech gate):** Format, file size, runtime integration, FMOD readiness
3. **Fixer (Campaign fit):** Level readability, escalation alignment, gameplay feedback fit

**Final verdict:** Caruso marks each file as **Ready to insert** (green) or **Blocked** (red) after all gates complete.

---

## File-by-File Approval Matrix

| File | Luca (Historical) | Nico (Tech) | Fixer (Campaign Fit) | Verdict | Notes |
|---|---|---|---|---|---|
| `sfx_mg_vickers_burst_a.wav` | | | | | Vickers short, 4–5 rounds, 220ms, 7 RPS |
| `sfx_mg_vickers_burst_b.wav` | | | | | Vickers long, 8–10 rounds, 550ms, sustained aggression |
| `sfx_mg_spandau_burst_a.wav` | | | | | Spandau short, 4–5 rounds, 200ms, 8 RPS, high-freq bite |
| `sfx_mg_spandau_burst_b.wav` | | | | | Spandau long, 8–10 rounds, 480ms, feed-block ticking |
| `sfx_mg_distant_fire_layer_a.wav` | | | | | Distant background, 800ms, 8–12 irregular pops, looping |

---

## Gate Definitions

### Luca Gate (Historical Accuracy)

**Approval criteria:**
- Vickers bursts: metallic clack, ~7 RPS (143 ms between shots), C-gear irregularity present
- Spandau bursts: aggressive bark, ~8 RPS (120 ms between shots), higher pitch than Vickers, feed-block ticking audible
- Distant layer: organic irregular spacing, period-appropriate distance attenuation
- No anachronisms: no modern weapon character, no electronics-era smoothness

**Pass condition:** Luca confirms all weapon traits match RFC memoirs and historical records  
**Fail condition:** Character mismatches weapon type, rate of fire implausible, or anachronistic elements present  
**Assign verdict:** ✓ PASS | ✗ FAIL

---

### Nico Gate (Tech Integration)

**Approval criteria:**
- Format: `.wav`, 16-bit or 24-bit, 44.1 kHz or 48 kHz, mono or stereo acceptable
- Duration: within ±50 ms of target (220, 550, 200, 480, 800 ms)
- Transient attack: sharp (<10 ms rise time for burst start)
- File size: under 1 MB each (mobile footprint requirement)
- No artefacts: no digital clipping, no compression artefacts, no unwanted reverb
- Timing precision: suitable for sample-accurate playback in FMOD

**Pass condition:** All files meet format specs, load cleanly in FMOD, ready for Web Audio integration  
**Fail condition:** Format issues, payload too large, timing imprecision, or playback artefacts  
**Assign verdict:** ✓ PASS | ✗ FAIL

---

### Fixer Gate (Campaign & Level Fit)

**Approval criteria:**
- **Belgium Campaign (1):** Vickers short (player fire) sets baseline, distant layer adds subtle threat, no Spandau yet
- **Marne Campaign (2):** Both Vickers variants present, distant layer increases slightly, Spandau enemies appear but don't fire (audio forward-compatible)
- **Escalation:** Spandau audio presence increases campaign-by-campaign, distant layer grows in intensity toward Somme (Campaign 6)
- **Readability:** Player can distinguish own gun from enemy fire, distant layer never masks gameplay-critical cues
- **Feedback quality:** Bursts feel satisfying and period-appropriate at expected mix levels

**Pass condition:** All files fit campaign progression, enhance gameplay clarity, support difficulty escalation  
**Fail condition:** Readability issues, wrong tone for campaign, or mix balance problems  
**Assign verdict:** ✓ PASS | ✗ FAIL

---

## Status Tracking

### Luca's Verdict
- **Assigned to:** Luca Corleone Ferretti
- **Review date:** [pending]
- **Verdict:**
  - `sfx_mg_vickers_burst_a.wav`: 
  - `sfx_mg_vickers_burst_b.wav`: 
  - `sfx_mg_spandau_burst_a.wav`: 
  - `sfx_mg_spandau_burst_b.wav`: 
  - `sfx_mg_distant_fire_layer_a.wav`: 
- **Comments:**

---

### Nico's Verdict
- **Assigned to:** Nico Corleone (Tech Integration)
- **Review date:** [pending]
- **Verdict:**
  - `sfx_mg_vickers_burst_a.wav`: 
  - `sfx_mg_vickers_burst_b.wav`: 
  - `sfx_mg_spandau_burst_a.wav`: 
  - `sfx_mg_spandau_burst_b.wav`: 
  - `sfx_mg_distant_fire_layer_a.wav`: 
- **Comments:**

---

### Fixer's Verdict
- **Assigned to:** Fixer (Campaign Design)
- **Review date:** [pending]
- **Verdict:**
  - `sfx_mg_vickers_burst_a.wav`: 
  - `sfx_mg_vickers_burst_b.wav`: 
  - `sfx_mg_spandau_burst_a.wav`: 
  - `sfx_mg_spandau_burst_b.wav`: 
  - `sfx_mg_distant_fire_layer_a.wav`: 
- **Comments:**

---

## Caruso Final Verdict

**Overall status:** [Pending gates]

| File | Final Verdict |
|---|---|
| `sfx_mg_vickers_burst_a.wav` | |
| `sfx_mg_vickers_burst_b.wav` | |
| `sfx_mg_spandau_burst_a.wav` | |
| `sfx_mg_spandau_burst_b.wav` | |
| `sfx_mg_distant_fire_layer_a.wav` | |

**Caruso's notes:**  
[To be filled after gates complete]

**Charlie deployment status:**  
[ ] Ready to insert into game build  
[ ] Blocked — awaiting revisions (see notes above)

---

*Managed by: Caruso, Sky Aces Studio*  
*Reference: MACHINEGUNS_PACK_SPEC_v1.md, GENERATION_MANIFEST.md*  
*Wings Over No Man's Land — Critical Audio Path*
