# Machine Gun SFX — Generation Manifest v1
**Date:** 2026-04-19  
**Owner:** Caruso (Sound Designer)  
**Status:** Awaiting generation by Charlie

---

## Purpose

This manifest links each ElevenLabs prompt (in `MG_ELEVENLABS_PROMPT_PACK_v1.md`) to its expected runtime filename (per `MACHINEGUNS_PACK_SPEC_v1.md`).

Use this table when generating audio files. Paste the prompt into ElevenLabs, generate 3–4 takes, select the best candidate, export to `.wav`, and save with the **exact filename** listed below.

---

## File Generation Table

| Asset | Prompt Source | Filename | Duration Target | Status | Notes |
|---|---|---|---|---|---|
| Vickers Short Burst | `MG_ELEVENLABS_PROMPT_PACK_v1.md` — Asset 1 | `sfx_mg_vickers_burst_a.wav` | 220 ms | Pending | 4–5 rounds, 7 RPS, dry, metallic, sharp attack |
| Vickers Long Burst | `MG_ELEVENLABS_PROMPT_PACK_v1.md` — Asset 2 | `sfx_mg_vickers_burst_b.wav` | 550 ms | Pending | 7–10 rounds, 7 RPS, sustained aggression, consistent rhythm |
| Spandau Short Burst | `MG_ELEVENLABS_PROMPT_PACK_v1.md` — Asset 3 | `sfx_mg_spandau_burst_a.wav` | 200 ms | Pending | 4–5 rounds, 8 RPS, aggressive bark, high-freq bite |
| Spandau Long Burst | `MG_ELEVENLABS_PROMPT_PACK_v1.md` — Asset 4 | `sfx_mg_spandau_burst_b.wav` | 480 ms | Pending | 8–10 rounds, 8 RPS, sustained aggression, feed-block ticking |
| Distant Fire Layer | `MG_ELEVENLABS_PROMPT_PACK_v1.md` — Asset 5 | `sfx_mg_distant_fire_layer_a.wav` | 800 ms | Pending | 8–12 irregular pops, acoustic distance, subtle reverb, looping candidate |

---

## Generation Workflow

1. Open `MG_ELEVENLABS_PROMPT_PACK_v1.md`.
2. For each asset row above, copy the prompt text from the corresponding asset section.
3. Paste into ElevenLabs SFX or Google Gemini SoundFX.
4. Generate 3–4 takes. Listen to each; select the take that best matches the brief (sharp transient, clear mechanical rhythm, no artefacts).
5. Export selected take as `.wav` (16-bit or 24-bit, 44.1 kHz or 48 kHz).
6. Save to this directory (`/Users/karelkadlec/Desktop/My Team/Team Inbox/WONML/assets/audio/sfx/machineguns/`) using the **exact filename** from the table above.
7. Tick the **Status** column to "Generated" once the file exists in the folder.

---

## Target Specifications (Per Spec v1)

- **Format:** `.wav`, 16-bit or 24-bit, 44.1 kHz or 48 kHz, mono or stereo (native to ElevenLabs output).
- **No compression:** Deliver raw, uncompressed `.wav` files for post-production flexibility.
- **Naming:** Use exact filenames above. Do not rename or add suffixes.
- **Destination:** `/Users/karelkadlec/Desktop/My Team/Team Inbox/WONML/assets/audio/sfx/machineguns/`
- **Verification:** Once all 5 files are staged, Caruso will generate `TEAM_DELIVERABLE_Caruso_MachineGun_ApprovalMatrix_v1.md` and notify downstream gates (Nico, Fixer).

---

## Charlie's QA Checklist (Before Staging)

- [ ] All 5 files generated from corresponding prompts in `MG_ELEVENLABS_PROMPT_PACK_v1.md`.
- [ ] Each file is `.wav` (not MP3, not FLAC, not other formats).
- [ ] Each filename matches the table exactly (no extra characters, no version suffixes).
- [ ] Duration is within ±50 ms of target (220 ms, 550 ms, 200 ms, 480 ms, 800 ms).
- [ ] Transient attack is sharp and present (especially critical for burst variants).
- [ ] Timbre matches brief (Vickers = metallic, hollow; Spandau = aggressive bark; Distant = thin, popping).
- [ ] No reverb or unwanted ambience (except distant_fire_layer_a, which should have subtle distance reverb).
- [ ] No clipping, no compression artefacts, no digital noise.
- [ ] All files tail to silence naturally; no abrupt cutoff.

---

## After Generation

Once all 5 files are staged in `/Users/karelkadlec/Desktop/My Team/Team Inbox/WONML/assets/audio/sfx/machineguns/`:

1. **Caruso:** Generate approval matrix (`TEAM_DELIVERABLE_Caruso_MachineGun_ApprovalMatrix_v1.md`).
2. **Jarvis:** Publish `PING_Jarvis_Caruso_MG_PromptPack_Ready.md` to route files to Nico and Fixer gates.
3. **Nico (Tech Gate):** QA for format, size, latency, runtime viability.
4. **Fixer (Campaign Gate):** QA for level fit, readability, escalation fit.
5. **Caruso (Final):** Update approval matrix with gate verdicts and mark `Ready to insert` or `Blocked`.

---

*— Caruso, Sound Designer / Audio Producer, Sky Aces Studio*
