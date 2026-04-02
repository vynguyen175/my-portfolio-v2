# 3D Mario World Portfolio Redesign

## Overview

Replace the current multi-page portfolio with a single-page 3D side-scrolling world built with React Three Fiber. Users navigate by swiping/scrolling left and right. A 3D Mario character walks between sections. Content appears on floating glassmorphic panels within the 3D environment. Mobile gets a lighter 2D fallback with the same navigation pattern.

## Tech Stack Additions

- `@react-three/fiber` — React renderer for Three.js
- `@react-three/drei` — Helpers (clouds, 3D text, Html overlays, camera controls, environment)
- `three` — Core 3D engine
- `@types/three` — TypeScript types

Existing stack remains: Next.js 16, React 19, Framer Motion, Tailwind CSS, Phaser (for easter egg game only).

## Architecture

### Single-Page 3D Experience

- The entire 3D world lives in a single `<Canvas>` component at the `/` route
- A `WorldScene` component manages camera, lighting, and all 6 sections laid out along the X-axis
- Each section is a React Three Fiber component positioned at intervals (30 units apart) along the X-axis
- Content panels use Drei's `<Html>` component to render actual React components in 3D space
- Mario is a `<MarioCharacter />` component that moves along the X-axis with the camera
- Navigation state managed via React context or Zustand

### Routing

- Replace Next.js multi-page routing with single-page experience at `/`
- URL hash tracks current section (`/#about`, `/#projects`) for shareability and direct linking
- Old routes (`/about`, `/projects`, etc.) redirect to `/#about`, `/#projects`, etc.
- `/play` route remains separate for the Phaser game (easter egg)
- `/api/contact` route remains for form submission

### Mobile Fallback

- Detect device capability (screen size + touch)
- Desktop: Full 3D Three.js world
- Mobile: 2D version with parallax clouds, animated Mario sprites, swipe navigation, glassmorphic panels
- Same content, same section order, same navigation pattern — just no WebGL overhead

## World Layout

Total world: 6 sections, 30 units apart, ~150 units total along X-axis.

Camera positioned at fixed Z distance, slight angle (3D side-scroller perspective). Background elements parallax at slower rate than foreground.

### Section 1: Home/Hero (X: 0) — Overworld

- Green rolling hills ground geometry
- Floating clouds (Drei `<Cloud>`) drifting slowly
- Question mark blocks floating above, bobbing animation
- Warp pipe at right edge hinting to continue
- **Content:** 3D text name, title, intro, CTA buttons

### Section 2: About (X: 30) — Cloud Kingdom

- Cloud platforms as ground
- Sunset gradient sky (blue → pink → orange)
- Volumetric clouds surrounding the area
- **Content:** Bio panel, photo, philosophy (merged from old About + Philosophy pages)

### Section 3: Projects (X: 60) — Castle/Fortress

- Stone/brick castle platforms
- Lava glow from below (emissive plane)
- Torch point lights flickering on pillars
- **Content:** Project cards as floating panels (includes Capstone)

### Section 4: Skills (X: 90) — Underground

- Dark environment with glowing mushroom models
- Crystal formations with colored emissive light
- Green pipes in ground
- **Content:** Skill categories on floating panels

### Section 5: Credentials (X: 120) — Star Road

- Star-field background with twinkling points
- Rainbow/translucent platforms
- Star collectible models floating
- **Content:** Education, certs, achievements

### Section 6: Contact (X: 150) — Flagpole Castle

- Classic castle with flagpole model
- Warm lighting
- Confetti particles on arrival
- **Content:** Contact form, social links

## Navigation

### Controls

- **Desktop:** Arrow keys, scroll wheel, or clickable nav indicators
- **Mobile (2D):** Swipe left/right
- **Direct jump:** Minimal floating nav dots/labels at top of screen

### Camera Movement

- Smooth spring animation (lerp) between sections — no hard snaps
- Camera follows Mario with slight delay for cinematic feel
- Background parallax: distant elements move slower than foreground

### Mario Character

- 3D low-poly stylized Mario model
- Idle animation when stopped
- Run animation during transitions
- Jump animation when arriving at section platforms
- Positioned in foreground, slightly left of content panels

## Visual Design

### Shared Elements

- Glassmorphic floating panels with gold accent borders (`#F0C946`)
- Semi-transparent backgrounds with backdrop blur
- Ambient particles per section (dust, sparkles, theme-specific)
- Smooth color gradient transitions between zone environments
- Dark/light theme support via environment lighting changes

### Transitions Between Zones

- Gradual environment blending (sky color, ground texture, lighting)
- No hard cuts — smooth interpolation as camera moves
- Particle systems fade in/out per zone

## Existing Features to Preserve

- Dark/light theme toggle (affects 3D lighting + panel styling)
- Konami Code easter egg
- Contact form functionality (Resend API)
- Resume PDF download link
- Play Mario Game link (to `/play` Phaser game)
- Loading screen (adapt to 3D asset loading)
- Custom cursor on desktop
- Scroll progress indicator (adapt to section progress)

## Sections Consolidated

| Old Route | New Location |
|-----------|-------------|
| `/` (Home) | Section 1: Hero |
| `/about` | Section 2: About |
| `/philosophy` | Section 2: About (merged) |
| `/projects` | Section 3: Projects |
| `/capstone` | Section 3: Projects (included) |
| `/skills` | Section 4: Skills |
| `/credentials` | Section 5: Credentials |
| `/contact` | Section 6: Contact |
| `/cover-letter` | Downloadable link in nav/footer |
| `/play` | Separate route (unchanged) |

## Performance Considerations

- Lazy-load section geometry/textures as camera approaches
- Use instanced meshes for repeated elements (clouds, stars, crystals)
- LOD (level of detail) for distant objects
- Compress textures, use glTF for 3D models
- Monitor frame rate, reduce effects if below 30fps
- Preload next/previous section assets based on current position

## Out of Scope

- VR/AR support
- Multiplayer/social features
- Backend changes (beyond existing contact API)
- New content creation (using existing portfolio content)
