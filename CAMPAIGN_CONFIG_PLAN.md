# WONML Campaign Config Plan

## Goal

Turn the current `LEVELS` array into a real campaign system with:

- 10 historical campaigns
- multiple stages per campaign
- campaign-specific enemy ladders
- campaign-specific obstacle ladders
- one local boss per campaign
- one final endboss for the whole war path

This plan is written to fit the current single-file architecture in
[index.html](/Users/karelkadlec/Documents/New project/WONML/index.html).

## Current State

Right now the game effectively has:

- one campaign atmosphere: `Belgium`
- four stages in one flat `LEVELS` array
- same-tier fighters as regular enemies
- flak, balloons, clouds, and zeppelins as obstacle/target types
- a simple level progression by score threshold

This works for the prototype, but it is too flat for a 10-campaign war journey.

## Target Structure

Replace the flat level idea with:

- `CAMPAIGNS`
- each campaign contains `stages`
- each campaign has its own:
  - intro text
  - background layers
  - fighter ladder
  - heavy enemy ladder
  - obstacle schedule
  - boss definition

### Proposed Data Shape

```js
const CAMPAIGNS = [
  {
    id: "belgium",
    order: 1,
    name: "German Invasion of Belgium and France",
    shortName: "Belgium, August 1914",
    introTitle: "Belgium, August 1914",
    introSubtitle: "The war has just begun. Welcome to Flanders, pilot.",
    mood: "bright",
    mapRegion: "western_front_opening",
    backgrounds: {
      sky: BELGIUM_SKY,
      far: [BELGIUM_1, BELGIUM_2, BELGIUM_3],
      mid: null,
      fore: null
    },
    fighterLadder: {
      germany: ["e3std", "albatrosdvstd"],
      britain: ["dh1", "dh2"]
    },
    heavyEnemies: {
      germany: [],
      britain: ["dh9"]
    },
    enemyPool: [
      "fighter",
      "armed-recon"
    ],
    obstaclePool: [
      "light-flak",
      "cloud",
      "balloon"
    ],
    boss: {
      id: "local-ace-patrol",
      type: "ace-fighter",
      hp: 5,
      escorts: 1
    },
    stages: [
      {
        id: "opening_patrol",
        name: "Opening Patrol",
        scoreStart: 0,
        scoreEnd: 45,
        obstacleMix: ["none"],
        enemyMix: ["fighter"],
        bossAtEnd: false
      },
      {
        id: "flak_screen",
        name: "Flak Screen",
        scoreStart: 45,
        scoreEnd: 90,
        obstacleMix: ["light-flak"],
        enemyMix: ["fighter", "armed-recon"],
        bossAtEnd: false
      },
      {
        id: "cloud_bank",
        name: "Cloud Bank",
        scoreStart: 90,
        scoreEnd: 145,
        obstacleMix: ["cloud"],
        enemyMix: ["fighter", "armed-recon"],
        bossAtEnd: false
      },
      {
        id: "observation_line",
        name: "Observation Line",
        scoreStart: 145,
        scoreEnd: 185,
        obstacleMix: ["balloon", "light-flak"],
        enemyMix: ["fighter", "armed-recon"],
        bossAtEnd: true
      }
    ]
  }
];
```

## Core Design Rules

### 1. Do Not Use The Ultimate Boss Too Early

The ultimate zeppelin should only appear as the final war climax.

Boss ladder:

- campaigns `1-2`: local ace or ace patrol
- campaigns `3-5`: armed recon leader, heavy scout, escorted bomber
- campaigns `6-8`: fortress bomber, armored balloon, elite strike group
- campaigns `9`: first escorted zeppelin
- campaign `10`: final flagship zeppelin with escorts

### 2. Escalate Through Mood As Well As Threat

The war should get darker, more destroyed, and more crowded over time:

- early war: bright countryside, open air, simple threat reading
- middle war: heavier smoke, more formations, more defended targets
- late war: fog, trench hell, heavy bombardment, darker palette

### 3. Enemies Should Feel Distinct From Obstacles

Separate into:

- `fighters`: same-tier or one-tier-up aircraft
- `armed-recon`: two-seaters / observers that can still shoot after passing
- `bombers`: slower, tougher, higher value
- `bosses`: unique heavier targets or formations

Obstacles and battlefield hazards:

- `flak`
- `clouds`
- `balloons`
- `smoke-curtains`
- `fog-banks`
- later `wind-gusts`
- later `barrage-cables`

### 4. Bosses Should Be Event Encounters

Boss fights should not simply be "a normal enemy with more HP".

Each boss should feel different by combining:

- more HP
- escorts
- special spawn timing
- denser flak around the encounter
- unique intro text

## Campaign-By-Campaign Build Order

### 1. German Invasion of Belgium and France

Theme:

- bright fields
- early war
- first combat lessons

Regular enemies:

- same-tier fighters
- first armed recon plane

Obstacles:

- light flak
- simple cloud banks
- faction-specific observation balloons

Boss:

- `Local Ace Patrol`
- one tougher higher-tier fighter with one escort

### 2. First Battle of the Marne

Theme:

- more battlefield activity
- larger troop movement below

Regular enemies:

- fighters
- armed recon
- first light bomber pass

Obstacles:

- flak zones
- denser clouds
- balloons over crossings

Boss:

- `Recon Leader`
- tougher observer aircraft plus escort

### 3. First Battle of Ypres

Theme:

- darker skies
- wetter, muddier front

Regular enemies:

- improved fighters
- armed recon
- escort pairs

Obstacles:

- heavier flak
- lower cloud ceiling
- smoke curtains

Boss:

- `Ace Pair`
- two-plane coordinated fighter encounter

### 4. Gallipoli Campaign

Theme:

- coastal / dusty environment
- brighter light but harsher conditions

Regular enemies:

- fighters
- armed recon
- early bomber passes

Obstacles:

- wind gust bands
- patchy flak
- balloons on ridgelines

Boss:

- `Heavy Scout`
- durable two-seater with rear-fire pressure

### 5. Gorlice-Tarnow Offensive

Theme:

- wide front
- more organized military movement

Regular enemies:

- faster fighters
- armed recon
- bomber leader with escorts

Obstacles:

- disciplined flak belts
- smoke bands
- balloon clusters

Boss:

- `Bombing Flight Leader`
- one heavy target plus two escorts

### 6. Verdun

Theme:

- scarred earth
- smoke and industrialized war

Regular enemies:

- aggressive fighters
- bombers
- elite escorts

Obstacles:

- dense flak
- smoke curtains
- heavy cloud banks
- defended balloons

Boss:

- `Fortress Bomber`
- large bomber or bomber pair

### 7. Somme

Theme:

- trench maze
- low visibility
- relentless attrition

Regular enemies:

- coordinated fighters
- armed recon
- bombers

Obstacles:

- heavy flak
- fog banks
- defended balloons

Boss:

- `Observation Breaker`
- armored observation balloon with escorts

### 8. Nivelle Offensive / Second Battle of the Aisne

Theme:

- shifting weather
- unstable battlefield visibility

Regular enemies:

- faster fighters
- armed recon
- bomber waves

Obstacles:

- layered clouds
- smoke curtains
- flak belts
- cable hazard fields later

Boss:

- `Elite Strike Flight`
- ace-led attack formation

### 9. Third Battle of Ypres / Passchendaele

Theme:

- wet, dark, oppressive
- mud and fog of war

Regular enemies:

- elite fighters
- heavy recon pressure
- bombers

Obstacles:

- dense fog
- low cloud ceiling
- thick flak
- defended balloons

Boss:

- `Escorted Zeppelin`
- first zeppelin boss, smaller than final flagship

### 10. German Spring Offensive

Theme:

- darkest battlefield
- burned ground
- full-war climax

Regular enemies:

- elite formations
- armed observation planes
- heavy bombers / Handley Page threat for German players
- zeppelin pressure for Allied players

Obstacles:

- intense flak belts
- fog banks
- smoke curtains
- defended balloons

Boss:

- `Flagship Zeppelin`
- final zeppelin protected by a squadron

## New Enemy Types To Add

These are the next enemy classes worth implementing.

### Armed Observation / Recon Aircraft

Purpose:

- keep pressure after passing the player
- add rear-fire threat

Behavior:

- slower than fighters
- can fire backward for a short time after passing
- moderate HP

### Heavy Scout / Two-Seater

Purpose:

- bridge between recon plane and bomber

Behavior:

- more HP than fighter
- less than bomber
- optional escort

### Bomber Leader

Purpose:

- early boss and heavy target before zeppelins dominate

Behavior:

- slow
- higher HP
- worth more score / XP

### Ace Formation

Purpose:

- boss variety without new giant assets

Behavior:

- 2-3 fighters with coordinated spawn pattern
- leader has extra HP

## Obstacle Types To Add Later

### Smoke Curtain

- semi-transparent horizontal or layered obstacle
- reduces readability instead of causing guaranteed death

### Fog Band

- denser late-war visibility block
- narrower sightline

### Wind Gust Zone

- changes flight feel briefly
- best used in Gallipoli or stormier stages

### Barrage Cable Field

- late-war hazard
- should be rare and telegraphed

## Implementation Steps In Code

### Step 1: Introduce Campaign Containers

Replace:

- `LEVELS`

With:

- `CAMPAIGNS`
- `currentCampaignIndex`
- `currentStageIndex`

Then add helper accessors:

```js
function getCurrentCampaign() {}
function getCurrentStage() {}
function getCurrentCampaignIntro() {}
```

### Step 2: Move Stage Threshold Logic Into Stage Config

Replace hardcoded stage progression with:

```js
function getStageIndexForScore(campaign, score) {}
```

This lets each campaign have its own pacing and number of stages.

### Step 3: Separate Enemy Roles From Specific Aircraft

Keep enemy roles like:

- `fighter`
- `armed-recon`
- `bomber`
- `boss`

Then resolve the actual sprite based on:

- current campaign
- current faction
- stage

This will prevent future code from becoming one long pile of special cases.

### Step 4: Add Boss Spawn Logic

Add:

```js
let bossSpawnedThisCampaign = false;
let activeBoss = null;
```

Then create:

```js
function maybeSpawnBoss(timestamp) {}
```

Bosses should appear:

- near the end of the last stage
- once per campaign run

### Step 5: Add Obstacle Mix Tables

Instead of one obstacle type per stage, allow:

```js
obstacleMix: ["balloon", "light-flak", "cloud"]
```

Then weight or ramp them by stage progress.

### Step 6: Add Enemy Mix Tables

Each stage should specify:

```js
enemyMix: ["fighter", "fighter", "armed-recon", "bomber"]
```

This makes it easy to ramp heavier enemy classes without rewriting spawn code.

## Immediate Build Order

This is the clean order to implement:

1. turn `Belgium` into `Campaign 1` under the new campaign structure
2. add `armed-recon` enemy type
3. add `boss` spawn support
4. add `Campaign 2` and `Campaign 3`
5. then continue campaign-by-campaign instead of trying to build all ten at once

## Recommendation

The best next coding move is not to implement all ten campaigns immediately.

Instead:

1. refactor the code from `LEVELS` to `CAMPAIGNS`
2. make `Belgium` work under the new structure
3. support one boss encounter cleanly
4. then scale outward

That will keep the architecture clean and stop the project from turning into a patchwork of special cases.
