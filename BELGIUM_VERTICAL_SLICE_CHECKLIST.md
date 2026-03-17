# Belgium Vertical Slice Checklist

## Purpose

`Belgium` should become the first near-release-quality campaign in `WONML`.

This file is the practical checklist for that.

Rule:

- make `Belgium` strong enough to represent the whole game
- keep the other campaigns as structured drafts for now

## Definition Of Done

Belgium is "vertical-slice ready" when it has:

- a polished campaign intro
- a stable campaign map entry
- coherent sky and landscape presentation
- readable enemy escalation
- satisfying local boss encounter
- campaign-appropriate obstacles
- good score / XP / reward flow
- solid mobile readability
- no obvious placeholder-feeling elements

## Phase 1: Campaign Spine

### 1. Campaign Map Entry

- Belgium marker placed correctly on the campaign map
- Belgium unlocked by default
- Belgium selected state feels clear
- starting Belgium from the map works reliably

### 2. Intro Presentation

- intro title and subtitle feel final enough
- intro timing feels cinematic but not slow
- intro text fits both factions well enough

### 3. Stage Structure

Belgium should keep these four stages for now:

1. `Opening Patrol`
2. `Flak Screen`
3. `Cloud Bank`
4. `Observation Line`

Checklist:

- each stage has a distinct feel
- transitions between stages are readable
- stage names feel appropriate

## Phase 2: Visual Polish

### 4. Sky And Landscape

- Belgium sky layer feels correct
- Belgium far background loop feels clean
- no visible seams or checkerboard artifacts
- no obvious stretching or bad crop lines
- default framing looks good on phone

### 5. Atmosphere

- early-war tone feels brighter and less devastated than later campaigns
- no late-war trench-hell mood in Belgium
- colors feel coherent with the menu and aircraft style

### 6. Campaign Targets And Obstacles

- flak art reads well and feels surprising
- observation balloons fit the style
- new clouds fit the design language before re-enabling lethal cloud play
- obstacle visuals are readable against the sky

## Phase 3: Gameplay Quality

### 7. Opening Pacing

- stage 1 feels like a tutorial runway
- first enemies do not crowd too early
- first flak stage ramps in gently

### 8. Enemy Ladder

Belgium enemy order should be:

- same-tier fighters
- armed observation / reconnaissance plane
- stronger local ace boss

Checklist:

- regular enemies feel readable
- higher-tier threat appears late enough
- enemy silhouettes are easy to distinguish

### 9. Boss Encounter

Belgium boss should be:

- a `local ace patrol`
- not a zeppelin
- not the absolute final war threat

Checklist:

- boss has more HP than regular enemies
- boss feels special
- boss does not feel unfair
- boss is visually clear

### 10. Damage And Combat Feel

- first hit smoke feels good
- second hit fire feels good
- top border causes damage, not cheap death
- ground hit remains instant death
- burst mode feels useful but not dominant

### 11. Scoring And Reward Loop

- misses hurt, but not too harshly
- kills feel rewarding
- XP gain feels understandable
- burst usage feels worth saving for

## Phase 4: UI And Readability

### 12. Menu Integration

- Belgium appears properly on the campaign map
- splash screen still reads clearly
- faction choice remains obvious

### 13. HUD Quality

- top HUD remains readable on mobile
- life badges read clearly
- burst state is understandable
- hint text does not clutter the screen

### 14. Aircraft Presentation

- aircraft sizes feel believable
- plane-select rows show the art well
- Hangar presentation remains strong

## Phase 5: Stability

### 15. Device Quality

- iPhone rendering is sharp
- no obvious video-effect boxes
- map and campaign transitions do not break input

### 16. Asset Quality

- no checkerboard leftovers
- no broken file paths
- no missing critical sprite loads

### 17. Run Quality

Do at least these checks:

- one full Belgium run as Germany
- one full Belgium run as Britain
- one run where you intentionally hit the top border
- one run where you intentionally hit the ground
- one run where you use burst mode several times

## What Can Stay Draft-Quality For Now

These do not need to be final before Belgium is considered a good vertical slice:

- later campaign map polish
- full squadron system
- pilot career / medals / ranks
- all ten campaign art sets
- all later bosses
- monetization
- online sync beyond leaderboard

## Other Campaign Draft Standard

For campaigns after Belgium, the first pass only needs:

- correct historical order
- map marker
- campaign title
- rough atmosphere direction
- rough enemy ladder
- rough obstacle ladder
- placeholder boss concept

That is enough until Belgium is strong.

## Recommended Work Order

Work in this order:

1. finish campaign map marker placement
2. stabilize Belgium map start flow
3. finalize Belgium sky / far background presentation
4. finalize Belgium enemy ladder
5. add / polish Belgium local boss
6. finalize Belgium obstacle set
7. tune score / XP / burst loop
8. run mobile readability pass
9. test both factions

## Exit Decision

When Belgium feels polished enough, then:

- freeze Belgium as the quality benchmark
- draft campaign 2 and campaign 3 under the same structure
- only then continue outward campaign by campaign
