# WONML Roadmap

## Vision

`Wings Over No Man's Land` should become a charming WW1 arcade flying game with:

- simple one-tap flight
- automatic combat
- strong comic-vector art direction
- historical campaign flavor
- satisfying aircraft progression
- long-term pilot identity and replay value

The core rule is to stay readable, mobile-friendly, and fun before becoming bigger.

## Product Pillars

- `Arcade first`: keep the controls simple, responsive, and readable on mobile.
- `WW1 identity`: the game should feel like its own Great War air-arcade world, not just a reskin.
- `Browser first`: build and tune the fun in web tech, then package for iOS and Android later.
- `Offline friendly`: players should always be able to fly even without network.
- `Cosmetic-first monetization`: sell or reward liveries and style, not power.

## Current Direction

The game already leans toward:

- portrait mobile play
- side-view comic-vector aircraft
- faction choice
- auto-fire combat
- campaign-style backgrounds
- progression through aircraft tiers
- Hangar and service record systems

This should remain the foundation.

## Final Game Shape

### Core Flight Loop

Each mission/run should follow this pattern:

1. choose faction, aircraft, and later campaign
2. fly through a themed WW1 airspace
3. dodge threats and terrain hazards
4. auto-fire at enemies when lined up
5. earn score, progression, and career credit
6. unlock aircraft, liveries, and later medals/ranks

### Factions

Planned playable nations:

- Germany
- Britain
- France
- Italy
- Russia
- America

Germany and Britain remain the first priority until the full loop is stable.

### Campaign Structure

Campaigns should unlock in historical order and remain replayable once cleared:

1. German invasion of Belgium and France
2. First Battle of the Marne
3. First Battle of Ypres
4. Gallipoli Campaign
5. Gorlice-Tarnow Offensive
6. Verdun
7. Somme
8. Nivelle Offensive / Second Battle of the Aisne
9. Third Battle of Ypres / Passchendaele
10. German Spring Offensive

Each campaign should eventually have:

- its own sky and landscape mood
- fitting aircraft era
- fitting threats and obstacles
- a short intro banner

## Campaign Enemy Ladder

The campaigns should escalate in pressure and mood without using the absolute final boss too early.

Core rule:

- early campaigns use `local bosses`
- middle campaigns use `formations`, `ace escorts`, and `heavier aircraft`
- the final campaign uses the `ultimate zeppelin encounter`

This keeps the war feeling like it grows darker and larger over time.

### Boss Philosophy

Do not use the ultimate zeppelin as the boss of the first campaign.
Instead, use these boss tiers:

- `Campaign 1-2`: tougher higher-tier fighter or two-plane ace formation
- `Campaign 3-5`: armed reconnaissance plane, bomber leader, or escorted heavy aircraft
- `Campaign 6-8`: large bombers, attack formations, heavier flak zones, armored balloons
- `Campaign 9-10`: zeppelins, major bomber groups, elite escorts, final protected flagship encounter

### Additional Enemies and Obstacles To Add

Good future additions beyond the current set:

- armed observation / reconnaissance aircraft that can shoot backward after passing the player
- two-seater scouts
- bomber formations
- ace escort pairs
- searchlight beams for late dusk/fog missions
- smoke curtains / battlefield haze bands
- barrage cable fields
- spotter kites / tethered field targets
- damaged-airspace debris bursts after artillery strikes
- wind gust zones in stormier later campaigns

These should be introduced slowly and only when the existing obstacle set feels polished.

### Ten Campaign Structure

#### 1. German Invasion of Belgium and France

Mood:

- bright late summer countryside
- open skies
- war has just begun

Enemy ladder:

- same-tier fighters
- early reconnaissance aircraft
- first armed observation plane

Obstacles:

- light flak
- light cloud cover
- British or German observation balloons depending on player side

Boss:

- `Local Ace Patrol`
- a higher-tier fighter with slightly more health, optionally joined by one weaker wingman

Goal:

- teach the core loop without overwhelming the player

#### 2. First Battle of the Marne

Mood:

- more organized battlefield
- more smoke and road movement below

Enemy ladder:

- same-tier fighters
- reconnaissance planes that shoot back
- first light bomber threat

Obstacles:

- flak zones
- denser clouds
- balloons over strategic crossings

Boss:

- `Recon Leader`
- a tougher armed reconnaissance aircraft with one escort

Goal:

- introduce “enemies can still threaten you after passing”

#### 3. First Battle of Ypres

Mood:

- gloomier sky
- muddier front
- more damaged terrain

Enemy ladder:

- improved fighter waves
- recon shooters
- first escort pair behavior

Obstacles:

- heavier flak
- lower clouds
- more frequent balloons
- first smoke curtain bands

Boss:

- `Ace Pair`
- two coordinated fighters, one tougher leader and one lighter escort

Goal:

- make the first real dogfight-feeling climax

#### 4. Gallipoli Campaign

Mood:

- brighter but harsher light
- coastal or dusty terrain
- more exposed airspace

Enemy ladder:

- fighters
- reconnaissance planes
- early bomber pass

Obstacles:

- lighter cloud cover
- uneven flak pockets
- wind gust bands
- balloons over ridgelines

Boss:

- `Heavy Scout`
- a durable two-seater or armed scout with rear fire behavior

Goal:

- vary the war visually and mechanically without needing the darkest tone yet

#### 5. Gorlice-Tarnow Offensive

Mood:

- wider front
- rougher terrain
- more military activity

Enemy ladder:

- faster fighter waves
- armed reconnaissance aircraft
- bomber leader with escorts

Obstacles:

- more disciplined flak belts
- smoke bands
- balloon clusters

Boss:

- `Bombing Flight Leader`
- one tougher bomber-class target protected by two fighters

Goal:

- teach the player to manage escorts and the heavy target together

#### 6. Verdun

Mood:

- darker sky
- scarred earth
- heavy smoke
- entrenched devastation

Enemy ladder:

- aggressive fighter swarms
- recon shooters
- bombers
- elite escorts

Obstacles:

- dense flak
- smoke curtains
- heavy cloud banks
- balloons in defended zones

Boss:

- `Fortress Bomber`
- a large bomber or bomber pair that needs several passes to bring down

Goal:

- feel like the war has become brutal and industrial

#### 7. Somme

Mood:

- trench maze below
- heavy artillery scars
- low visibility in parts

Enemy ladder:

- coordinated fighter waves
- armed recon
- bombers
- ace escort groups

Obstacles:

- heavy flak
- fog banks
- balloons near trench sectors
- searchlight-style visibility lanes for low-light missions later if needed

Boss:

- `Observation Breaker`
- an armored observation balloon protected by escort fighters and flak bursts

Goal:

- make balloons feel like real defended strategic targets

#### 8. Nivelle Offensive / Second Battle of the Aisne

Mood:

- broken front
- shifting weather
- unstable visibility

Enemy ladder:

- faster enemy fighters
- more armed recon
- improved bomber waves

Obstacles:

- layered cloud banks
- smoke curtains
- flak belts
- cable hazard fields or tether zones

Boss:

- `Elite Strike Flight`
- a small formation led by a tougher ace aircraft with upgraded health

Goal:

- push formation reading and positioning

#### 9. Third Battle of Ypres / Passchendaele

Mood:

- dark, wet, muddy
- fog of war
- oppressive sky

Enemy ladder:

- elite fighters
- heavy reconnaissance pressure
- bombers
- first zeppelin appearances if appropriate to side

Obstacles:

- dense fog bands
- thick flak
- balloons in poor visibility
- low cloud ceiling

Boss:

- `Escorted Zeppelin`
- the first true zeppelin boss, but smaller and less protected than the final one

Goal:

- foreshadow the endgame without spending the ultimate set piece yet

#### 10. German Spring Offensive

Mood:

- darkest battlefield
- burned terrain
- heavy fog and smoke
- full war-machine pressure

Enemy ladder:

- elite fighter formations
- armed observation aircraft
- bombers / Handley Page heavy threat for German players
- zeppelins for Allied players
- ace escorts

Obstacles:

- intense flak belts
- fog banks
- smoke curtains
- defended balloons
- overlapping pressure from visibility and enemy fire

Boss:

- `Flagship Zeppelin`
- the absolute final boss: a major zeppelin protected by an escort squadron and layered attack pressure

Goal:

- deliver the war’s biggest air threat as the final climax

### Endgame Mode

After finishing the campaign path, unlock:

- `Free Flight`

Free Flight should mix threats, atmospheres, and aircraft eras from all unlocked campaigns, and let the player choose any unlocked aircraft.

## Gameplay Systems

### Flight and Damage

Keep:

- `tap / space = climb`
- auto-fire
- readable collision model

Damage model should stay:

- top border = damage hit
- first hit = smoke and slightly worse handling
- second hit = fire + smoke and noticeably worse handling
- third hit = death
- ground hit = instant death

### Enemies

Enemy types should grow in layers:

- fighters
- bombers
- zeppelins
- later ace encounters / elite variants

Use opposite-faction silhouettes:

- German player faces Allied aircraft
- Allied player faces German aircraft

Heavy late threats:

- Allied side can face zeppelins
- German side can face Handley Page bombers

### Obstacles and Targets

Current or planned obstacle/target pool:

- flak bursts
- observation balloons
- clouds
- zeppelins
- bombers
- campaign-specific visibility/weather layers

Design rules:

- flak should feel surprising, not static
- balloons should be faction-specific
- clouds should match the newer design language
- visibility challenges should make reading the sky harder without becoming unfair

### Burst / XP

XP should remain tied to combat utility, not only repair systems.

Current direction:

- kills build XP
- XP powers temporary offensive abilities

Planned XP ability ladder:

- `Double Burst`
- `Wider Spread`
- later possibly `Focused Burst`
- later possibly `Incendiary Burst`

Gun jamming can still exist later, but should be a separate emergency mechanic rather than the only use for XP.

## Progression

### Aircraft Trees

The player should begin with lower-tier aircraft and work upward over time.

Standard aircraft belong in the main service tree.
Ace liveries and special skins belong outside the main power ladder.

Rules:

- `_std` = standard progression aircraft
- ace/event/supporter liveries = cosmetic variants
- no pay-to-win aircraft stats

### Replay and Mastery

Once a campaign is unlocked, players should be able to:

- replay it
- improve their score
- earn better medals / stars / performance marks

This helps the game feel like a career rather than a single straight line.

## Meta Layer

### Hangar

The Hangar should keep growing into:

- service aircraft gallery
- special liveries gallery
- short historical notes
- personal service record per aircraft

Eventually expand it with:

- unlock conditions
- campaign usage
- medals earned in that aircraft

### Pilot Career

Future feature:

- selectable pilot characters
- ranks
- medals
- service history
- campaign progression record

This should become the player’s long-term identity layer.

### Pilot Portraits

Possible later feature:

- use a prepared prompt workflow so players can turn their own face photo into a stylized pilot portrait
- portraits should match the game’s comic-vector style
- fixed format and consistent framing are required

### Squadrons

Future production feature:

- player-created squadrons
- shared insignia / logos
- shared visual identity
- potentially squadron-based recognition or standings later

This gives social identity without requiring full multiplayer combat.

### Custom Liveries

Later production feature:

- player-created or shared liveries
- squadron-themed liveries
- event liveries

This should only happen after the standard art pipeline is stable.

## Monetization

Monetization should stay light and fair.

Allowed direction:

- cosmetic liveries
- supporter/event aircraft finishes
- donations
- in-game currency
- light ads, preferably rewarded ads over aggressive forced ads

Avoid:

- selling stronger planes directly
- heavy ad spam
- anything that breaks the arcade fairness

## Technical Direction

### Prototype Phase

The prototype should focus on:

- fun flight
- readable combat
- stable pacing
- consistent art integration
- one or two campaigns that feel convincing

### Production Architecture

Target architecture later:

- offline-first local save as the gameplay source of truth
- synchronization for leaderboard, squadron identity, cosmetics, and selected social data
- gameplay never blocked by connection loss

### Platform Strategy

The planned path remains:

1. build in browser
2. polish mobile feel
3. package for iOS and Android
4. add platform services only after the game loop is solid

## Phase Plan

### Phase 1: Fun Prototype

Goal:

- prove the core game is fun

Focus:

- smooth flight feel
- fair collisions
- readable enemy waves
- flak, balloons, bombers, zeppelins
- better campaign atmosphere

Exit criteria:

- a player can understand the loop immediately
- the first campaign is fun to replay
- art and effects feel coherent enough for outside testing

### Phase 2: Content Foundation

Goal:

- make the game world feel real

Focus:

- more aircraft
- more obstacles/targets
- more complete campaign art
- stronger faction identity
- improved effects and feedback

Exit criteria:

- Germany and Britain feel like full mini-factions
- at least several campaign stages have custom atmosphere

### Phase 3: Progression and Hangar

Goal:

- give players reasons to keep returning

Focus:

- aircraft unlocks
- Hangar polish
- pilot record tracking
- medals / stars / campaign performance

Exit criteria:

- the player has a clear sense of long-term progress

### Phase 4: Campaign Map

Goal:

- turn separate runs into a war journey

Focus:

- historical front map
- campaign selection
- sequential unlocks
- replay of previous fronts

Exit criteria:

- the game has a visible beginning-to-end structure

### Phase 5: Mobile Release Readiness

Goal:

- prepare a shipping-quality browser build for packaging

Focus:

- offline stability
- touch polish
- asset loading polish
- audio behavior
- icon, branding, menus, settings

Exit criteria:

- the web build behaves like a real mobile app

### Phase 6: Online and Social Features

Goal:

- add connected identity without harming offline play

Focus:

- synced leaderboard
- squadron identity
- pilot profile sync
- later cosmetic sync / sharing

Exit criteria:

- online features enhance the game without becoming required to enjoy it

## Immediate Next Priorities

These are the best next steps right now:

1. finish the upgraded obstacle/target art pipeline
2. stabilize campaign presentation
3. keep tuning the combat readability

Recommended near-term work:

- add `Handley Page O/400`
- redo zeppelins in the current style
- continue observation balloon integration/tuning
- redesign clouds to the new art language and reintroduce them carefully
- keep improving flak timing and visual quality
- keep aircraft trees organized and historically readable

## Working Rules

When making new features, prefer:

- one working version first
- then polish
- then breadth

Avoid:

- overbuilding social systems before the prototype is fun
- introducing too many factions at once
- letting art style drift between asset batches

## Short Summary

`WONML` should become:

- a stylized WW1 mobile arcade flyer
- with campaign progression, faction aircraft trees, and a strong Hangar/career identity
- playable offline
- synchronized online where useful
- expanded later with squadrons, medals, ranks, custom portraits, shared insignia, and Free Flight
