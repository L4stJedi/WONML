# WONML Asset Naming

## Goal

Keep the asset tree sustainable as `WONML` grows.

These rules are intentionally simple and close to the current project, so we can follow them without needing a large rename pass.

## Folder Rules

- use lowercase folder names for technical categories
- keep nation folders lowercase:
  - `germany`
  - `britain`
  - `france`
  - `italy`
  - `russia`
  - `america`
- keep shared asset groups lowercase:
  - `backgrounds`
  - `branding`
  - `audio`
  - `animations`
  - `obstacles`
  - `source`

Examples:

- `assets/planes/germany`
- `assets/backgrounds/menu`
- `assets/backgrounds/map`
- `assets/animations`

## File Rules

- avoid spaces in filenames
- prefer ASCII-only names
- use `.png` for sprites and static art
- use `.mp4` for video effects

## Naming Style

Use compact PascalCase base names for gameplay assets.

Examples:

- `CampaignMap.png`
- `MainMenu.png`
- `BritishRoundel.png`
- `AircoDH1.png`
- `AlbatrosDV_std.png`

## Variant Suffixes

Use suffixes only when they add meaning.

Recommended meanings:

- `_std` = standard progression aircraft
- short ace/livery suffixes are acceptable for existing files
- keep future suffixes short and stable

Examples:

- `FokkerEIII_std.png`
- `SopwithPup_std.png`
- `AlbatrosDV_caro.png`

## Source Asset Mirroring

When possible:

- keep the gameplay-ready asset in `assets/...`
- keep the original or oversized source copy in `assets/source/...`

Example:

- runtime: `assets/backgrounds/map/CampaignMap.png`
- source: `assets/source/backgrounds/map/CampaignMap.png`

## What We Standardize Going Forward

From this point on:

- new folders should be lowercase
- new filenames should not contain spaces
- new map files should use names like `CampaignMap.png`
- new effect files should live in `assets/animations`

## Legacy Note

Older files may still use mixed historical abbreviations or older naming styles.
That is acceptable for now.

Rule:

- do not mass-rename old assets unless the code is being updated at the same time
- use the cleaner convention for all new files and any touched files
