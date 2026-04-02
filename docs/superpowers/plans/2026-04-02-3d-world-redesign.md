# 3D Mario World Portfolio Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the multi-page portfolio with a single-page 3D side-scrolling world using React Three Fiber, where a 3D Mario character walks between 6 themed sections with floating glassmorphic content panels.

**Architecture:** A single `<Canvas>` at the `/` route renders the entire 3D world. Six section components are laid out along the X-axis at 30-unit intervals. Navigation state (managed via React context) controls camera position and Mario's movement. Drei's `<Html>` component renders content panels as real React components in 3D space. Mobile devices get a 2D fallback with swipe navigation.

**Tech Stack:** Next.js 16, React 19, React Three Fiber, Three.js, Drei, Framer Motion, Tailwind CSS 4

**Spec:** `docs/superpowers/specs/2026-04-02-3d-world-redesign-design.md`

---

## File Structure

### New Files

```
components/3d/
  World3D.tsx              — Root Canvas + scene setup (lighting, fog, environment)
  WorldScene.tsx           — Positions all sections, manages camera animation
  MarioCharacter.tsx       — 3D Mario model with idle/run/jump animations
  NavigationContext.tsx     — React context for current section, navigation actions
  SectionNav.tsx           — Floating nav dots overlay (HTML, not 3D)
  ContentPanel.tsx         — Reusable Drei Html wrapper with glassmorphic styling
  sections/
    HeroSection.tsx        — Section 1: Overworld (X: 0)
    AboutSection.tsx       — Section 2: Cloud Kingdom (X: 30)
    ProjectsSection.tsx    — Section 3: Castle/Fortress (X: 60)
    SkillsSection.tsx      — Section 4: Underground (X: 90)
    CredentialsSection.tsx — Section 5: Star Road (X: 120)
    ContactSection.tsx     — Section 6: Flagpole Castle (X: 150)
  objects/
    QuestionBlock.tsx      — Animated ? block mesh
    WarpPipe.tsx           — Green pipe mesh
    FloatingCloud.tsx      — Cloud cluster using Drei Cloud
    GroundPlane.tsx        — Reusable ground with material variants
    Torch.tsx              — Flickering torch with point light
    Crystal.tsx            — Glowing crystal mesh
    Star3D.tsx             — Star collectible mesh
    Flagpole.tsx           — End-of-level flagpole + castle
    MushroomGlow.tsx       — Glowing mushroom mesh
  MobileFallback.tsx       — 2D swipe-based alternative for mobile
  MobileSectionCard.tsx    — Individual mobile section card

app/page.tsx               — Rewritten: renders World3D (desktop) or MobileFallback (mobile)
```

### Modified Files

```
app/layout.tsx             — Remove AppShell wrapping for root, keep for /play
app/not-found.tsx          — Update links to hash navigation
components/AppShell.tsx    — Add conditional: skip 3D-incompatible overlays on /
components/LoadingScreen.tsx — Adapt to track 3D asset loading progress
package.json               — Add three, @react-three/fiber, @react-three/drei, @types/three
next.config.ts             — Add transpilePackages for three/R3F if needed
```

### Preserved Unchanged

```
app/play/                  — Phaser game stays as-is
app/api/contact/route.ts   — Contact API stays as-is
components/ContactForm.tsx — Reused inside ContactSection's Html panel
components/KonamiCode.tsx  — Reused in World3D overlay
components/CustomCursor.tsx — Reused
components/DarkModeToggle.tsx — Reused in SectionNav
contexts/ThemeContext.tsx   — Reused, drives 3D lighting changes
lib/projects.ts            — Reused for project data
```

### Old Page Routes to Redirect

```
app/about/page.tsx         — Redirect to /#about
app/projects/page.tsx      — Redirect to /#projects
app/skills/page.tsx        — Redirect to /#skills
app/credentials/page.tsx   — Redirect to /#credentials
app/contact/page.tsx       — Redirect to /#contact
app/philosophy/page.tsx    — Redirect to /#about
app/capstone/page.tsx      — Redirect to /#projects
app/cover-letter/page.tsx  — Redirect to /#hero (with resume link)
```

---

## Task 1: Install Dependencies and Verify R3F Works

**Files:**
- Modify: `package.json`
- Create: `components/3d/World3D.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Install R3F dependencies**

Run:
```bash
npm install three @react-three/fiber @react-three/drei
npm install -D @types/three
```

Expected: Clean install, no peer dependency errors.

- [ ] **Step 2: Create a minimal World3D component**

Create `components/3d/World3D.tsx`:

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function TestScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default function World3D() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0B1120' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <TestScene />
      </Canvas>
    </div>
  );
}
```

- [ ] **Step 3: Replace app/page.tsx temporarily for testing**

Replace `app/page.tsx` with:

```tsx
'use client';

import dynamic from 'next/dynamic';

const World3D = dynamic(() => import('@/components/3d/World3D'), { ssr: false });

export default function Home() {
  return <World3D />;
}
```

- [ ] **Step 4: Verify it renders**

Run: `npm run dev`

Open browser to `http://localhost:3000`. Expected: A gold rotating cube on dark background. You can orbit with mouse.

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json components/3d/World3D.tsx app/page.tsx
git commit -m "feat: install R3F and verify 3D rendering works"
```

---

## Task 2: Navigation Context

**Files:**
- Create: `components/3d/NavigationContext.tsx`

- [ ] **Step 1: Create the navigation context**

Create `components/3d/NavigationContext.tsx`:

```tsx
'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export interface Section {
  id: string;
  label: string;
  x: number;
}

export const SECTIONS: Section[] = [
  { id: 'hero', label: 'Home', x: 0 },
  { id: 'about', label: 'About', x: 30 },
  { id: 'projects', label: 'Projects', x: 60 },
  { id: 'skills', label: 'Skills', x: 90 },
  { id: 'credentials', label: 'Credentials', x: 120 },
  { id: 'contact', label: 'Contact', x: 150 },
];

interface NavigationContextType {
  currentIndex: number;
  currentSection: Section;
  targetX: number;
  isMoving: boolean;
  setIsMoving: (moving: boolean) => void;
  goToSection: (index: number) => void;
  goNext: () => void;
  goPrev: () => void;
}

const NavigationContext = createContext<NavigationContextType | null>(null);

export function NavigationProvider({ children }: { children: React.ReactNode }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMoving, setIsMoving] = useState(false);

  const goToSection = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, SECTIONS.length - 1));
    if (clamped !== currentIndex && !isMoving) {
      setCurrentIndex(clamped);
      setIsMoving(true);
      // Update URL hash
      window.history.replaceState(null, '', `#${SECTIONS[clamped].id}`);
    }
  }, [currentIndex, isMoving]);

  const goNext = useCallback(() => {
    goToSection(currentIndex + 1);
  }, [currentIndex, goToSection]);

  const goPrev = useCallback(() => {
    goToSection(currentIndex - 1);
  }, [currentIndex, goToSection]);

  // Read initial hash on mount
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (hash) {
      const idx = SECTIONS.findIndex(s => s.id === hash);
      if (idx !== -1) {
        setCurrentIndex(idx);
      }
    }
  }, []);

  const currentSection = SECTIONS[currentIndex];
  const targetX = currentSection.x;

  return (
    <NavigationContext.Provider value={{
      currentIndex,
      currentSection,
      targetX,
      isMoving,
      setIsMoving,
      goToSection,
      goNext,
      goPrev,
    }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within NavigationProvider');
  }
  return context;
}
```

- [ ] **Step 2: Commit**

```bash
git add components/3d/NavigationContext.tsx
git commit -m "feat: add navigation context with section state and URL hash sync"
```

---

## Task 3: Camera System and World Scene

**Files:**
- Create: `components/3d/WorldScene.tsx`
- Modify: `components/3d/World3D.tsx`

- [ ] **Step 1: Create WorldScene with camera animation**

Create `components/3d/WorldScene.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigation } from './NavigationContext';
import * as THREE from 'three';

export default function WorldScene() {
  const { targetX, setIsMoving } = useNavigation();
  const cameraTargetRef = useRef(new THREE.Vector3(0, 3, 20));
  const lookAtRef = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(({ camera }) => {
    // Smooth camera follow
    cameraTargetRef.current.set(targetX, 3, 20);
    lookAtRef.current.set(targetX, 1, 0);

    camera.position.lerp(cameraTargetRef.current, 0.03);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const desiredLookAt = lookAtRef.current.clone().sub(camera.position).normalize();
    currentLookAt.lerp(desiredLookAt, 0.05);
    camera.lookAt(
      camera.position.x + currentLookAt.x * 10,
      camera.position.y + currentLookAt.y * 10,
      camera.position.z + currentLookAt.z * 10,
    );

    // Detect when camera has arrived (close enough)
    const dist = Math.abs(camera.position.x - cameraTargetRef.current.x);
    if (dist < 0.1) {
      setIsMoving(false);
    }
  });

  return (
    <>
      {/* Global lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 30, 20]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Placeholder ground extending the full world */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[75, -1, 0]} receiveShadow>
        <planeGeometry args={[200, 40]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Section position markers (temporary, will be replaced by real sections) */}
      {[0, 30, 60, 90, 120, 150].map((x, i) => (
        <mesh key={i} position={[x, 1, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={['#F0C946', '#FF9BE4', '#8B4513', '#4A0080', '#FFD700', '#FF6347'][i]} />
        </mesh>
      ))}

      {/* Fog for depth */}
      <fog attach="fog" args={['#0B1120', 30, 80]} />
    </>
  );
}
```

- [ ] **Step 2: Update World3D to use NavigationProvider and WorldScene**

Replace `components/3d/World3D.tsx`:

```tsx
'use client';

import { Canvas } from '@react-three/fiber';
import { NavigationProvider } from './NavigationContext';
import WorldScene from './WorldScene';
import SectionNav from './SectionNav';

export default function World3D() {
  return (
    <NavigationProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0B1120' }}>
        <Canvas
          camera={{ position: [0, 3, 20], fov: 60 }}
          shadows
          gl={{ antialias: true, alpha: false }}
          dpr={[1, 2]}
        >
          <WorldScene />
        </Canvas>
        <SectionNav />
      </div>
    </NavigationProvider>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add components/3d/WorldScene.tsx components/3d/World3D.tsx
git commit -m "feat: add camera system with smooth lerp between sections"
```

---

## Task 4: Section Navigation UI + Input Handling

**Files:**
- Create: `components/3d/SectionNav.tsx`

- [ ] **Step 1: Create the floating nav overlay**

Create `components/3d/SectionNav.tsx`:

```tsx
'use client';

import { useEffect, useCallback } from 'react';
import { useNavigation, SECTIONS } from './NavigationContext';

export default function SectionNav() {
  const { currentIndex, goToSection, goNext, goPrev, isMoving } = useNavigation();

  // Keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isMoving) return;
    if (e.key === 'ArrowRight' || e.key === 'd') goNext();
    if (e.key === 'ArrowLeft' || e.key === 'a') goPrev();
  }, [goNext, goPrev, isMoving]);

  // Scroll wheel navigation
  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMoving) return;
    // Debounce: only trigger on significant scroll
    if (Math.abs(e.deltaY) < 30) return;
    if (e.deltaY > 0) goNext();
    else goPrev();
  }, [goNext, goPrev, isMoving]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleKeyDown, handleWheel]);

  return (
    <nav
      style={{
        position: 'absolute',
        top: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        padding: '8px 16px',
        background: 'rgba(11, 17, 32, 0.7)',
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        border: '1px solid rgba(240, 201, 70, 0.15)',
        zIndex: 100,
      }}
    >
      {SECTIONS.map((section, i) => (
        <button
          key={section.id}
          onClick={() => goToSection(i)}
          aria-label={`Go to ${section.label}`}
          aria-current={i === currentIndex ? 'true' : undefined}
          style={{
            width: i === currentIndex ? 'auto' : '10px',
            height: '10px',
            padding: i === currentIndex ? '4px 12px' : '0',
            borderRadius: '12px',
            border: 'none',
            cursor: 'pointer',
            background: i === currentIndex ? '#F0C946' : 'rgba(255, 255, 255, 0.3)',
            color: i === currentIndex ? '#0B1120' : 'transparent',
            fontSize: '11px',
            fontWeight: 700,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {i === currentIndex ? section.label : ''}
        </button>
      ))}
    </nav>
  );
}
```

- [ ] **Step 2: Verify navigation works**

Run: `npm run dev`

Expected: Click dots to jump between placeholder cubes. Arrow keys and scroll wheel also work. Camera smoothly lerps. URL hash updates.

- [ ] **Step 3: Commit**

```bash
git add components/3d/SectionNav.tsx
git commit -m "feat: add section nav dots with keyboard, scroll, and click navigation"
```

---

## Task 5: Mario Character

**Files:**
- Create: `components/3d/MarioCharacter.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create MarioCharacter with procedural low-poly mesh**

Create `components/3d/MarioCharacter.tsx`:

```tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigation } from './NavigationContext';
import * as THREE from 'three';

function MarioBody() {
  // Low-poly Mario built from primitives
  return (
    <group>
      {/* Body (red) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>

      {/* Head (skin) */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshStandardMaterial color="#FFB8A0" />
      </mesh>

      {/* Hat (red) */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.7]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>
      {/* Hat brim */}
      <mesh position={[0, 1.6, 0.2]} castShadow>
        <boxGeometry args={[0.9, 0.1, 0.3]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>

      {/* Mustache */}
      <mesh position={[0, 1.1, 0.3]}>
        <boxGeometry args={[0.5, 0.1, 0.1]} />
        <meshStandardMaterial color="#4A2800" />
      </mesh>

      {/* Eyes (white) */}
      <mesh position={[-0.15, 1.35, 0.3]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.3]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.15, 1.35, 0.33]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.33]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Overalls (blue) */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.75, 0.5, 0.55]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>

      {/* M emblem on hat */}
      <mesh position={[0, 1.7, 0.36]}>
        <boxGeometry args={[0.25, 0.15, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>

      {/* Buttons (gold) */}
      <mesh position={[-0.15, 0.55, 0.31]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
      <mesh position={[0.15, 0.55, 0.31]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
    </group>
  );
}

export default function MarioCharacter() {
  const groupRef = useRef<THREE.Group>(null!);
  const { targetX, isMoving } = useNavigation();
  const currentX = useRef(0);
  const bobTime = useRef(0);
  const legAngle = useRef(0);
  const leftLegRef = useRef<THREE.Mesh>(null!);
  const rightLegRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const speed = 0.04;
    const dx = targetX - currentX.current;

    if (Math.abs(dx) > 0.1) {
      currentX.current += dx * speed;

      // Face direction of movement
      groupRef.current.rotation.y = dx > 0 ? 0 : Math.PI;

      // Run animation: leg swing
      legAngle.current += delta * 10;
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(legAngle.current) * 0.6;
        rightLegRef.current.rotation.x = Math.sin(legAngle.current + Math.PI) * 0.6;
      }

      // Bob up and down while running
      groupRef.current.position.y = Math.abs(Math.sin(legAngle.current)) * 0.15;
    } else {
      // Idle bob
      bobTime.current += delta;
      groupRef.current.position.y = Math.sin(bobTime.current * 2) * 0.05;

      // Reset legs
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
    }

    groupRef.current.position.x = currentX.current;
    groupRef.current.position.z = 5; // In front of content
  });

  return (
    <group ref={groupRef}>
      <MarioBody />

      {/* Left leg */}
      <mesh ref={leftLegRef} position={[-0.2, -0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.35]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>

      {/* Left shoe */}
      <mesh position={[-0.2, -0.4, 0.05]} castShadow>
        <boxGeometry args={[0.32, 0.15, 0.45]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Right leg */}
      <mesh ref={rightLegRef} position={[0.2, -0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.35]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>

      {/* Right shoe */}
      <mesh position={[0.2, -0.4, 0.05]} castShadow>
        <boxGeometry args={[0.32, 0.15, 0.45]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>

      {/* Shadow beneath Mario */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.47, 0]}>
        <circleGeometry args={[0.5, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Add MarioCharacter to WorldScene**

In `components/3d/WorldScene.tsx`, add the import and render:

Add to imports:
```tsx
import MarioCharacter from './MarioCharacter';
```

Add inside the return, after the section markers:
```tsx
<MarioCharacter />
```

- [ ] **Step 3: Verify Mario renders and moves**

Run: `npm run dev`

Expected: Low-poly Mario appears in the scene. When navigating between sections (arrow keys, scroll, click dots), Mario runs toward the target section with leg animation and direction facing. Idle bobbing when stopped.

- [ ] **Step 4: Commit**

```bash
git add components/3d/MarioCharacter.tsx components/3d/WorldScene.tsx
git commit -m "feat: add procedural low-poly Mario character with run and idle animations"
```

---

## Task 6: Reusable 3D Objects

**Files:**
- Create: `components/3d/objects/QuestionBlock.tsx`
- Create: `components/3d/objects/WarpPipe.tsx`
- Create: `components/3d/objects/FloatingCloud.tsx`
- Create: `components/3d/objects/GroundPlane.tsx`
- Create: `components/3d/objects/Torch.tsx`
- Create: `components/3d/objects/Crystal.tsx`
- Create: `components/3d/objects/Star3D.tsx`
- Create: `components/3d/objects/Flagpole.tsx`
- Create: `components/3d/objects/MushroomGlow.tsx`

- [ ] **Step 1: Create QuestionBlock**

Create `components/3d/objects/QuestionBlock.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface QuestionBlockProps {
  position: [number, number, number];
  scale?: number;
}

export default function QuestionBlock({ position, scale = 1 }: QuestionBlockProps) {
  const ref = useRef<THREE.Group>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Block body */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
      {/* Dark border lines */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshStandardMaterial color="#D4A830" />
      </mesh>
      {/* Question mark */}
      <mesh position={[0, 0, 0.52]}>
        <planeGeometry args={[0.4, 0.5]} />
        <meshStandardMaterial color="#8B6508" />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 2: Create WarpPipe**

Create `components/3d/objects/WarpPipe.tsx`:

```tsx
'use client';

interface WarpPipeProps {
  position: [number, number, number];
  scale?: number;
}

export default function WarpPipe({ position, scale = 1 }: WarpPipeProps) {
  return (
    <group position={position} scale={scale}>
      {/* Pipe body */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 2, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      {/* Pipe lip */}
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.3, 16]} />
        <meshStandardMaterial color="#2EA82E" />
      </mesh>
      {/* Inner dark circle */}
      <mesh position={[0, 1.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshStandardMaterial color="#0A3D0A" />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 3: Create FloatingCloud**

Create `components/3d/objects/FloatingCloud.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FloatingCloudProps {
  position: [number, number, number];
  scale?: number;
  speed?: number;
}

export default function FloatingCloud({ position, scale = 1, speed = 0.3 }: FloatingCloudProps) {
  const ref = useRef<THREE.Group>(null!);
  const baseX = position[0];

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.x = baseX + Math.sin(clock.elapsedTime * speed) * 2;
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * speed * 0.5) * 0.3;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Center puff */}
      <mesh castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
      {/* Left puff */}
      <mesh position={[-0.8, -0.2, 0]} castShadow>
        <sphereGeometry args={[0.7, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
      {/* Right puff */}
      <mesh position={[0.8, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
      {/* Top puff */}
      <mesh position={[0.2, 0.5, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial color="#FFFFFF" roughness={1} />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 4: Create GroundPlane**

Create `components/3d/objects/GroundPlane.tsx`:

```tsx
'use client';

interface GroundPlaneProps {
  position: [number, number, number];
  width?: number;
  depth?: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export default function GroundPlane({
  position,
  width = 35,
  depth = 20,
  color,
  emissive,
  emissiveIntensity = 0,
}: GroundPlaneProps) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial
        color={color}
        emissive={emissive || color}
        emissiveIntensity={emissiveIntensity}
        roughness={0.8}
      />
    </mesh>
  );
}
```

- [ ] **Step 5: Create Torch**

Create `components/3d/objects/Torch.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TorchProps {
  position: [number, number, number];
}

export default function Torch({ position }: TorchProps) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 8 + position[0]) * 0.5;
    }
  });

  return (
    <group position={position}>
      {/* Torch base */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.12, 1.5, 8]} />
        <meshStandardMaterial color="#4A3000" />
      </mesh>
      {/* Flame glow */}
      <mesh position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial
          color="#FF6600"
          emissive="#FF4400"
          emissiveIntensity={3}
        />
      </mesh>
      <pointLight
        ref={lightRef}
        position={[0, 1, 0]}
        color="#FF6600"
        intensity={2}
        distance={8}
        decay={2}
      />
    </group>
  );
}
```

- [ ] **Step 6: Create Crystal**

Create `components/3d/objects/Crystal.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

export default function Crystal({ position, color = '#9B59B6', scale = 1 }: CrystalProps) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 0.5;
    }
  });

  return (
    <group position={position} scale={scale}>
      <mesh ref={ref} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
          roughness={0.1}
          metalness={0.5}
          transparent
          opacity={0.85}
        />
      </mesh>
      <pointLight color={color} intensity={1} distance={5} decay={2} />
    </group>
  );
}
```

- [ ] **Step 7: Create Star3D**

Create `components/3d/objects/Star3D.tsx`:

```tsx
'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Star3DProps {
  position: [number, number, number];
  scale?: number;
}

export default function Star3D({ position, scale = 0.5 }: Star3DProps) {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 5;

    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();

    const extrudeSettings = { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 1.5;
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale} castShadow>
      <meshStandardMaterial
        color="#FFD700"
        emissive="#F0C946"
        emissiveIntensity={0.5}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}
```

- [ ] **Step 8: Create MushroomGlow**

Create `components/3d/objects/MushroomGlow.tsx`:

```tsx
'use client';

interface MushroomGlowProps {
  position: [number, number, number];
  color?: string;
  scale?: number;
}

export default function MushroomGlow({ position, color = '#00FF88', scale = 1 }: MushroomGlowProps) {
  return (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
        <meshStandardMaterial color="#E8DCC8" />
      </mesh>
      {/* Cap */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1}
        />
      </mesh>
      <pointLight position={[0, 0.8, 0]} color={color} intensity={0.8} distance={4} decay={2} />
    </group>
  );
}
```

- [ ] **Step 9: Create Flagpole**

Create `components/3d/objects/Flagpole.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlagpoleProps {
  position: [number, number, number];
}

export default function Flagpole({ position }: FlagpoleProps) {
  const flagRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 3) * 0.1;
    }
  });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh castShadow>
        <cylinderGeometry args={[0.05, 0.05, 8, 8]} />
        <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Ball on top */}
      <mesh position={[0, 4.1, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Flag */}
      <mesh ref={flagRef} position={[0.5, 3.2, 0]} castShadow>
        <planeGeometry args={[1, 0.7]} />
        <meshStandardMaterial color="#E52521" side={THREE.DoubleSide} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -3.9, 0]} castShadow>
        <boxGeometry args={[0.5, 0.2, 0.5]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
    </group>
  );
}
```

- [ ] **Step 10: Commit**

```bash
git add components/3d/objects/
git commit -m "feat: add all reusable 3D objects (blocks, pipes, clouds, torches, crystals, stars, flagpole, mushrooms)"
```

---

## Task 7: Content Panel Component

**Files:**
- Create: `components/3d/ContentPanel.tsx`

- [ ] **Step 1: Create the glassmorphic content panel wrapper**

Create `components/3d/ContentPanel.tsx`:

```tsx
'use client';

import { Html } from '@react-three/drei';
import { ReactNode } from 'react';

interface ContentPanelProps {
  position: [number, number, number];
  children: ReactNode;
  width?: string;
  rotation?: [number, number, number];
}

export default function ContentPanel({
  position,
  children,
  width = '420px',
  rotation = [0, 0, 0],
}: ContentPanelProps) {
  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      distanceFactor={10}
      style={{
        width,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          background: 'rgba(11, 17, 32, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(240, 201, 70, 0.2)',
          borderRadius: '16px',
          padding: '28px',
          color: '#E2E8F0',
          fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(240, 201, 70, 0.05)',
        }}
      >
        {children}
      </div>
    </Html>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/3d/ContentPanel.tsx
git commit -m "feat: add glassmorphic ContentPanel wrapper using Drei Html"
```

---

## Task 8: Section 1 — Hero/Overworld

**Files:**
- Create: `components/3d/sections/HeroSection.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create HeroSection**

Create `components/3d/sections/HeroSection.tsx`:

```tsx
'use client';

import GroundPlane from '../objects/GroundPlane';
import FloatingCloud from '../objects/FloatingCloud';
import QuestionBlock from '../objects/QuestionBlock';
import WarpPipe from '../objects/WarpPipe';
import ContentPanel from '../ContentPanel';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SECTION_X = 0;

export default function HeroSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Ground: green hills */}
      <GroundPlane position={[0, -1, 0]} color="#228B22" />

      {/* Rolling hills */}
      <mesh position={[-5, -0.3, -3]} castShadow>
        <sphereGeometry args={[3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2EA82E" />
      </mesh>
      <mesh position={[8, -0.5, -5]} castShadow>
        <sphereGeometry args={[4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1E8C1E" />
      </mesh>

      {/* Clouds */}
      <FloatingCloud position={[-8, 8, -10]} scale={1.5} speed={0.2} />
      <FloatingCloud position={[5, 10, -15]} scale={2} speed={0.15} />
      <FloatingCloud position={[12, 7, -8]} scale={1} speed={0.25} />

      {/* Question blocks */}
      <QuestionBlock position={[-3, 4, -2]} />
      <QuestionBlock position={[0, 5, -3]} />
      <QuestionBlock position={[3, 4.5, -2]} />

      {/* Warp pipe at right edge */}
      <WarpPipe position={[13, 0, 2]} />

      {/* Sky gradient background */}
      <mesh position={[0, 10, -25]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#5BA3E6" />
      </mesh>

      {/* Content panel */}
      <ContentPanel position={[0, 3, 2]} width="380px">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{
            color: '#F0C946',
            fontSize: '36px',
            fontWeight: 800,
            margin: '0 0 4px',
            letterSpacing: '-1px',
          }}>
            Vy Nguyen
          </h1>
          <p style={{
            color: '#94A3B8',
            fontSize: '14px',
            fontWeight: 500,
            margin: '0 0 16px',
          }}>
            Full-Stack Developer &bull; AI Enthusiast &bull; Toronto
          </p>
          <p style={{
            color: '#CBD5E1',
            fontSize: '13px',
            lineHeight: 1.7,
            margin: '0 0 20px',
          }}>
            3 years building web apps, AI tools, and cross-platform products.
            AWS Certified, hackathon winner, open-source contributor.
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
            <a href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer"
              style={{ color: '#F0C946', padding: '6px' }}>
              <FaGithub size={20} />
            </a>
            <a href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer"
              style={{ color: '#F0C946', padding: '6px' }}>
              <FaLinkedin size={20} />
            </a>
            <a href="mailto:vyn13217@gmail.com"
              style={{ color: '#F0C946', padding: '6px' }}>
              <MdEmail size={20} />
            </a>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/Vy Nguyen - Resume.pdf" target="_blank"
              style={{
                padding: '8px 16px',
                background: 'rgba(240, 201, 70, 0.15)',
                border: '1px solid rgba(240, 201, 70, 0.3)',
                borderRadius: '8px',
                color: '#F0C946',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
              }}>
              Resume
            </a>
            <a href="/play"
              style={{
                padding: '8px 16px',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                borderRadius: '8px',
                color: '#CBD5E1',
                fontSize: '12px',
                fontWeight: 600,
                textDecoration: 'none',
              }}>
              Play Mario Game
            </a>
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
```

- [ ] **Step 2: Add HeroSection to WorldScene**

In `components/3d/WorldScene.tsx`:

Add import:
```tsx
import HeroSection from './sections/HeroSection';
```

Replace the placeholder section markers and ground with:
```tsx
<HeroSection />
```

Remove the temporary placeholder cubes and the full-width ground plane.

- [ ] **Step 3: Verify**

Run: `npm run dev`

Expected: Section 1 shows green hills, floating clouds, question blocks, warp pipe, and the content panel with name/bio/links.

- [ ] **Step 4: Commit**

```bash
git add components/3d/sections/HeroSection.tsx components/3d/WorldScene.tsx
git commit -m "feat: add Hero/Overworld section with clouds, blocks, and content panel"
```

---

## Task 9: Section 2 — About/Cloud Kingdom

**Files:**
- Create: `components/3d/sections/AboutSection.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create AboutSection**

Create `components/3d/sections/AboutSection.tsx`:

```tsx
'use client';

import FloatingCloud from '../objects/FloatingCloud';
import ContentPanel from '../ContentPanel';

const SECTION_X = 30;

export default function AboutSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Cloud platforms as ground */}
      <FloatingCloud position={[-4, -0.5, 0]} scale={3} speed={0.05} />
      <FloatingCloud position={[4, -0.8, 1]} scale={2.5} speed={0.08} />
      <FloatingCloud position={[0, -0.3, -2]} scale={3.5} speed={0.03} />

      {/* Surrounding clouds */}
      <FloatingCloud position={[-10, 6, -8]} scale={2} speed={0.15} />
      <FloatingCloud position={[8, 8, -12]} scale={2.5} speed={0.1} />
      <FloatingCloud position={[-6, 10, -15]} scale={1.8} speed={0.2} />
      <FloatingCloud position={[12, 5, -6]} scale={1.5} speed={0.18} />

      {/* Sunset gradient sky */}
      <mesh position={[0, 8, -25]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#FF9BE4" />
      </mesh>
      <mesh position={[0, -2, -24]}>
        <planeGeometry args={[60, 15]} />
        <meshBasicMaterial color="#FF6B6B" />
      </mesh>

      {/* Warm directional light for sunset feel */}
      <directionalLight position={[SECTION_X, 8, -5]} color="#FFB347" intensity={0.6} />

      {/* Content: About panel */}
      <ContentPanel position={[-2, 3, 0]} width="440px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 16px' }}>
            About Me
          </h2>
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px' }}>
            I started coding 3 years ago and haven&apos;t stopped since. What began as curiosity turned into a passion for building real applications — from full-stack web apps and mobile platforms to AI-powered tools. Based in Toronto with an AWS certification, hackathon wins, and 7+ deployed projects.
          </p>

          <h3 style={{ color: '#F0C946', fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>
            My Focus
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {[
              { label: 'Full-Stack Dev', desc: 'Modern frameworks & technologies' },
              { label: 'AI & ML', desc: 'Intelligent systems & data-driven apps' },
              { label: 'UI/UX Design', desc: 'Intuitive & beautiful experiences' },
            ].map(item => (
              <div key={item.label} style={{
                padding: '8px 12px',
                background: 'rgba(240, 201, 70, 0.08)',
                border: '1px solid rgba(240, 201, 70, 0.15)',
                borderRadius: '8px',
                fontSize: '12px',
              }}>
                <strong style={{ color: '#F0C946' }}>{item.label}:</strong>{' '}
                <span style={{ color: '#94A3B8' }}>{item.desc}</span>
              </div>
            ))}
          </div>

          <h3 style={{ color: '#F0C946', fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>
            What I Value
          </h3>
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
            Clean, readable code. Continuous learning. Clear communication, taking ownership, and being the kind of teammate who makes everyone around them better.
          </p>
        </div>
      </ContentPanel>
    </group>
  );
}
```

- [ ] **Step 2: Add to WorldScene**

Add import and render `<AboutSection />` in WorldScene.

- [ ] **Step 3: Commit**

```bash
git add components/3d/sections/AboutSection.tsx components/3d/WorldScene.tsx
git commit -m "feat: add About/Cloud Kingdom section with sunset sky and bio panel"
```

---

## Task 10: Section 3 — Projects/Castle

**Files:**
- Create: `components/3d/sections/ProjectsSection.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create ProjectsSection**

Create `components/3d/sections/ProjectsSection.tsx`:

```tsx
'use client';

import { useState } from 'react';
import GroundPlane from '../objects/GroundPlane';
import Torch from '../objects/Torch';
import ContentPanel from '../ContentPanel';
import { projects } from '@/lib/projects';

const SECTION_X = 60;

function ProjectCard({ project, isActive, onClick }: {
  project: typeof projects[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        padding: '14px',
        background: isActive ? 'rgba(240, 201, 70, 0.12)' : 'rgba(255, 255, 255, 0.03)',
        border: `1px solid ${isActive ? 'rgba(240, 201, 70, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
        borderRadius: '10px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
    >
      <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>
        {project.title}
      </h4>
      <span style={{
        display: 'inline-block',
        padding: '2px 8px',
        background: 'rgba(240, 201, 70, 0.1)',
        borderRadius: '12px',
        fontSize: '10px',
        color: '#F0C946',
        fontWeight: 600,
        marginBottom: '6px',
      }}>
        {project.category}
      </span>
      <p style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>
        {project.description}
      </p>

      {isActive && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
            {project.techStack.slice(0, 5).map(tech => (
              <span key={tech} style={{
                padding: '2px 6px',
                background: 'rgba(255, 255, 255, 0.06)',
                borderRadius: '4px',
                fontSize: '10px',
                color: '#94A3B8',
              }}>
                {tech}
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              style={{
                padding: '5px 10px', fontSize: '11px', fontWeight: 600,
                background: '#E2E8F0', color: '#0B1120', borderRadius: '6px',
                textDecoration: 'none',
              }}>
              Code
            </a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
              style={{
                padding: '5px 10px', fontSize: '11px', fontWeight: 600,
                background: '#F0C946', color: '#0B1120', borderRadius: '6px',
                textDecoration: 'none',
              }}>
              Live Demo
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Castle stone ground */}
      <GroundPlane position={[0, -1, 0]} color="#6B5B3D" />

      {/* Castle wall backdrop */}
      <mesh position={[0, 4, -8]} castShadow>
        <boxGeometry args={[30, 10, 1]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} />
      </mesh>

      {/* Brick pattern overlay */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <mesh key={`brick-${row}-${col}`} position={[-13.5 + col * 3 + (row % 2 ? 1.5 : 0), row * 2, -7.4]}>
            <boxGeometry args={[2.8, 1.8, 0.2]} />
            <meshStandardMaterial color={row % 2 === col % 2 ? '#7A6845' : '#8B7355'} />
          </mesh>
        ))
      )}

      {/* Lava glow below */}
      <mesh position={[0, -1.5, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[35, 10]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF2200" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      {/* Torches */}
      <Torch position={[-8, 1, -6]} />
      <Torch position={[-3, 1, -6]} />
      <Torch position={[3, 1, -6]} />
      <Torch position={[8, 1, -6]} />

      {/* Content panel */}
      <ContentPanel position={[0, 3, 2]} width="460px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>
            Projects
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>
            Click a project to expand details
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            maxHeight: '400px',
            overflowY: 'auto',
          }}>
            {projects.map(project => (
              <ProjectCard
                key={project.id}
                project={project}
                isActive={activeProject === project.id}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              />
            ))}
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
```

- [ ] **Step 2: Add to WorldScene**

Add import and render `<ProjectsSection />`.

- [ ] **Step 3: Commit**

```bash
git add components/3d/sections/ProjectsSection.tsx components/3d/WorldScene.tsx
git commit -m "feat: add Projects/Castle section with torches, lava glow, and expandable project cards"
```

---

## Task 11: Section 4 — Skills/Underground

**Files:**
- Create: `components/3d/sections/SkillsSection.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create SkillsSection**

Create `components/3d/sections/SkillsSection.tsx`:

```tsx
'use client';

import GroundPlane from '../objects/GroundPlane';
import Crystal from '../objects/Crystal';
import MushroomGlow from '../objects/MushroomGlow';
import WarpPipe from '../objects/WarpPipe';
import ContentPanel from '../ContentPanel';

const SECTION_X = 90;

const skillCategories = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'C#', 'PostgreSQL', 'MongoDB', 'Express', 'REST APIs'] },
  { category: 'Tools & Platforms', items: ['Git', 'Docker', 'AWS', 'Vercel', 'VS Code', 'Figma'] },
  { category: 'AI / ML', items: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'] },
  { category: 'Mobile', items: ['Android', 'Swift', 'React Native', 'Kotlin'] },
];

export default function SkillsSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Dark underground ground */}
      <GroundPlane position={[0, -1, 0]} color="#1A0A2E" />

      {/* Cave ceiling */}
      <mesh position={[0, 12, -10]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#0D0520" />
      </mesh>

      {/* Glowing mushrooms */}
      <MushroomGlow position={[-8, -0.7, 2]} color="#00FF88" scale={1.5} />
      <MushroomGlow position={[-4, -0.7, -3]} color="#FF00FF" scale={1} />
      <MushroomGlow position={[6, -0.7, 1]} color="#00CCFF" scale={1.2} />
      <MushroomGlow position={[10, -0.7, -2]} color="#FFFF00" scale={0.8} />

      {/* Crystals */}
      <Crystal position={[-10, 1, -4]} color="#9B59B6" scale={1.5} />
      <Crystal position={[-6, 2, -5]} color="#3498DB" scale={1} />
      <Crystal position={[4, 1.5, -4]} color="#E74C3C" scale={1.2} />
      <Crystal position={[9, 2, -5]} color="#2ECC71" scale={0.9} />

      {/* Pipes */}
      <WarpPipe position={[-12, 0, 3]} scale={0.8} />
      <WarpPipe position={[12, 0, 3]} scale={0.8} />

      {/* Content panel */}
      <ContentPanel position={[0, 3, 2]} width="460px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>
            Power Up
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>
            Collect all skills
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '10px',
          }}>
            {skillCategories.map(cat => (
              <div key={cat.category} style={{
                padding: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '10px',
              }}>
                <h4 style={{ color: '#F0C946', fontSize: '12px', fontWeight: 700, margin: '0 0 8px' }}>
                  {cat.category}
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cat.items.map(skill => (
                    <span key={skill} style={{
                      padding: '3px 8px',
                      background: 'rgba(240, 201, 70, 0.08)',
                      border: '1px solid rgba(240, 201, 70, 0.15)',
                      borderRadius: '6px',
                      fontSize: '10px',
                      color: '#CBD5E1',
                      fontWeight: 500,
                    }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
```

- [ ] **Step 2: Add to WorldScene**

Add import and render `<SkillsSection />`.

- [ ] **Step 3: Commit**

```bash
git add components/3d/sections/SkillsSection.tsx components/3d/WorldScene.tsx
git commit -m "feat: add Skills/Underground section with glowing mushrooms, crystals, and skill grid"
```

---

## Task 12: Section 5 — Credentials/Star Road

**Files:**
- Create: `components/3d/sections/CredentialsSection.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create CredentialsSection**

Create `components/3d/sections/CredentialsSection.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Star3D from '../objects/Star3D';
import ContentPanel from '../ContentPanel';
import * as THREE from 'three';

const SECTION_X = 120;

function TwinklingStar({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 3 + position[0] * 10) * 0.5;
    }
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[0.08, 4, 4]} />
      <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
    </mesh>
  );
}

function RainbowPlatform({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      const hue = (clock.elapsedTime * 0.1 + position[0] * 0.05) % 1;
      mat.color.setHSL(hue, 0.6, 0.5);
      mat.emissive.setHSL(hue, 0.6, 0.2);
    }
  });

  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[4, 0.3, 3]} />
      <meshStandardMaterial
        color="#FF69B4"
        emissive="#FF69B4"
        emissiveIntensity={0.3}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

export default function CredentialsSection() {
  // Generate star field
  const stars = Array.from({ length: 80 }, (_, i) => ({
    position: [
      (Math.random() - 0.5) * 50,
      Math.random() * 15 + 2,
      -10 - Math.random() * 20,
    ] as [number, number, number],
  }));

  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Dark sky */}
      <mesh position={[0, 8, -25]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#050515" />
      </mesh>

      {/* Twinkling stars */}
      {stars.map((star, i) => (
        <TwinklingStar key={i} position={star.position} />
      ))}

      {/* Rainbow platforms */}
      <RainbowPlatform position={[-5, -0.5, 0]} />
      <RainbowPlatform position={[2, -0.8, 1]} />
      <RainbowPlatform position={[8, -0.3, -1]} />

      {/* Floating star collectibles */}
      <Star3D position={[-8, 4, -3]} scale={0.6} />
      <Star3D position={[-2, 6, -5]} scale={0.4} />
      <Star3D position={[5, 5, -4]} scale={0.5} />
      <Star3D position={[10, 3, -2]} scale={0.7} />

      {/* Content panel */}
      <ContentPanel position={[0, 3, 2]} width="440px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 16px' }}>
            Credentials
          </h2>

          {/* Education */}
          <div style={{
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            marginBottom: '10px',
          }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>
              George Brown College — Toronto, ON
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 4px', fontWeight: 600 }}>
              Advanced Diploma in Computer Programming and Analysis
            </p>
            <p style={{ color: '#64748B', fontSize: '11px', margin: 0 }}>
              Dean&apos;s List Honors | GPA: 3.7 | Expected April 2026
            </p>
          </div>

          {/* Certifications */}
          <div style={{
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            marginBottom: '10px',
          }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>
              AWS Certified Cloud Practitioner
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>
              Amazon Web Services — 2025
            </p>
          </div>

          {/* Awards */}
          <div style={{
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
            marginBottom: '10px',
          }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>
              Microsoft Hackathon — Top 10
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>
              Led team of 4, placed top 10 out of 50 teams
            </p>
          </div>

          {/* Activities */}
          <div style={{
            padding: '14px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '10px',
          }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 6px' }}>
              Activities
            </h4>
            <p style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.6, margin: 0 }}>
              IEEEXtreme 19.0 (2025) &bull; Open Source Contributor — Next.js (vercel/next.js) &bull; Peer Mentoring at George Brown
            </p>
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
```

- [ ] **Step 2: Add to WorldScene**

Add import and render `<CredentialsSection />`.

- [ ] **Step 3: Commit**

```bash
git add components/3d/sections/CredentialsSection.tsx components/3d/WorldScene.tsx
git commit -m "feat: add Credentials/Star Road section with star field, rainbow platforms, and achievement cards"
```

---

## Task 13: Section 6 — Contact/Flagpole Castle

**Files:**
- Create: `components/3d/sections/ContactSection.tsx`
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Create ContactSection**

Create `components/3d/sections/ContactSection.tsx`:

```tsx
'use client';

import GroundPlane from '../objects/GroundPlane';
import Flagpole from '../objects/Flagpole';
import ContentPanel from '../ContentPanel';
import ContactForm from '@/components/ContactForm';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SECTION_X = 150;

export default function ContactSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Warm ground */}
      <GroundPlane position={[0, -1, 0]} color="#2D5A27" />

      {/* Sky */}
      <mesh position={[0, 8, -25]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#FF8C42" />
      </mesh>

      {/* Castle structure */}
      <mesh position={[10, 3, -6]} castShadow>
        <boxGeometry args={[6, 6, 4]} />
        <meshStandardMaterial color="#C4A882" />
      </mesh>
      {/* Castle top */}
      <mesh position={[10, 6.5, -6]} castShadow>
        <coneGeometry args={[4, 3, 4]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>
      {/* Castle door */}
      <mesh position={[10, 1, -3.9]}>
        <planeGeometry args={[2, 3]} />
        <meshStandardMaterial color="#2D1810" />
      </mesh>

      {/* Flagpole */}
      <Flagpole position={[-6, 3, -2]} />

      {/* Warm lighting */}
      <pointLight position={[0, 5, 5]} color="#FFB347" intensity={2} distance={20} />
      <pointLight position={[10, 5, -3]} color="#FF6347" intensity={1} distance={15} />

      {/* Content panel */}
      <ContentPanel position={[-1, 3, 2]} width="420px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>
            Get In Touch
          </h2>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>
            Let&apos;s connect &amp; collaborate
          </p>

          {/* Social links */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {[
              { icon: FaGithub, url: 'https://github.com/vynguyen175', label: 'GitHub' },
              { icon: FaLinkedin, url: 'https://www.linkedin.com/in/vy-nguyen-71629729b/', label: 'LinkedIn' },
              { icon: MdEmail, url: 'mailto:vyn13217@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, url, label }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  background: 'rgba(240, 201, 70, 0.08)',
                  border: '1px solid rgba(240, 201, 70, 0.15)',
                  borderRadius: '8px',
                  color: '#F0C946',
                  fontSize: '12px',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}>
                <Icon size={16} />
                {label}
              </a>
            ))}
          </div>

          {/* Contact form */}
          <ContactForm />
        </div>
      </ContentPanel>
    </group>
  );
}
```

- [ ] **Step 2: Add to WorldScene**

Add import and render `<ContactSection />`.

- [ ] **Step 3: Verify all 6 sections work**

Run: `npm run dev`

Navigate through all 6 sections using arrow keys and dots. Verify:
- Each section has its unique environment
- Content panels are readable and interactive
- Mario walks between sections
- Camera smoothly follows

- [ ] **Step 4: Commit**

```bash
git add components/3d/sections/ContactSection.tsx components/3d/WorldScene.tsx
git commit -m "feat: add Contact/Flagpole Castle section with castle, flagpole, and contact form"
```

---

## Task 14: Environment Transitions and Polish

**Files:**
- Modify: `components/3d/WorldScene.tsx`

- [ ] **Step 1: Add dynamic sky/fog color blending based on camera position**

In `components/3d/WorldScene.tsx`, add sky/fog color interpolation inside the `useFrame` callback:

```tsx
// Add refs at component level
const fogRef = useRef<THREE.Fog>(null!);

// Inside useFrame, after camera position update:
const progress = camera.position.x / 150; // 0 to 1 across entire world
const skyColors = [
  new THREE.Color('#5BA3E6'), // Hero - blue
  new THREE.Color('#FF9BE4'), // About - sunset pink
  new THREE.Color('#2A1A0A'), // Projects - dark castle
  new THREE.Color('#0D0520'), // Skills - deep underground
  new THREE.Color('#050515'), // Credentials - space
  new THREE.Color('#FF8C42'), // Contact - warm sunset
];

// Find which two sections we're between
const sectionProgress = (camera.position.x / 30);
const idx = Math.floor(Math.max(0, Math.min(sectionProgress, 4.99)));
const t = sectionProgress - idx;
const currentColor = skyColors[idx].clone().lerp(skyColors[Math.min(idx + 1, 5)], t);

if (fogRef.current) {
  fogRef.current.color.copy(currentColor);
}

// Also update scene background
scene.background = currentColor;
```

Update the fog element to use a ref:
```tsx
<fog ref={fogRef} attach="fog" args={['#5BA3E6', 30, 80]} />
```

Add `scene` to the useFrame destructuring:
```tsx
useFrame(({ camera, scene }) => {
```

- [ ] **Step 2: Verify transitions**

Run: `npm run dev`

Navigate between sections. The background/fog color should smoothly blend between section themes as the camera moves.

- [ ] **Step 3: Commit**

```bash
git add components/3d/WorldScene.tsx
git commit -m "feat: add smooth environment color transitions between sections"
```

---

## Task 15: Loading Screen Adaptation

**Files:**
- Modify: `components/3d/World3D.tsx`

- [ ] **Step 1: Add a loading state to World3D**

Update `components/3d/World3D.tsx` to show the existing loading screen while the Canvas initializes:

```tsx
'use client';

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { NavigationProvider } from './NavigationContext';
import WorldScene from './WorldScene';
import SectionNav from './SectionNav';
import LoadingScreen from '../LoadingScreen';

function World3DInner() {
  return (
    <Canvas
      camera={{ position: [0, 3, 20], fov: 60 }}
      shadows
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <WorldScene />
      </Suspense>
    </Canvas>
  );
}

export default function World3D() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('loaded');
    }
    return true;
  });

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('loaded', '1');
    setLoading(false);
  }, []);

  return (
    <NavigationProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0B1120' }}>
        {loading ? (
          <LoadingScreen onComplete={handleComplete} />
        ) : (
          <>
            <World3DInner />
            <SectionNav />
          </>
        )}
      </div>
    </NavigationProvider>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add components/3d/World3D.tsx
git commit -m "feat: integrate loading screen with 3D world initialization"
```

---

## Task 16: App Layout Integration

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `components/AppShell.tsx`

- [ ] **Step 1: Update app/page.tsx with mobile detection**

Replace `app/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const World3D = dynamic(() => import('@/components/3d/World3D'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  // Mobile fallback will be added in Task 18
  // For now, render 3D on all devices
  return <World3D />;
}
```

- [ ] **Step 2: Update AppShell to handle 3D route**

In `components/AppShell.tsx`, we need to skip the overlay components (StickyNav, ScrollProgress, GradientMesh, ScrollToTop) when on the root route with 3D:

Add at the top of the component body:
```tsx
const [isRoot, setIsRoot] = useState(false);

useEffect(() => {
  setIsRoot(window.location.pathname === '/');
}, []);
```

Wrap the overlay components with a conditional:
```tsx
{!isRoot && (
  <>
    {!showLoader && mounted && (
      <>
        <ScrollProgress />
        <StickyNav />
      </>
    )}
    <ScrollToTop />
    <GradientMesh />
  </>
)}
```

Keep `CustomCursor`, `ContextMenu`, and `LoadingScreen` (the 3D world handles its own loading, but AppShell's still applies to other routes like `/play`).

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx components/AppShell.tsx
git commit -m "feat: integrate 3D world as root page, skip overlay components on 3D route"
```

---

## Task 17: Route Redirects

**Files:**
- Modify: `app/about/page.tsx`
- Modify: `app/projects/page.tsx`
- Modify: `app/skills/page.tsx`
- Modify: `app/credentials/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/philosophy/page.tsx` (if exists)
- Modify: `app/capstone/page.tsx` (if exists)

- [ ] **Step 1: Replace each old page with a redirect**

For each page file, replace the content with a redirect component. Example for `app/about/page.tsx`:

```tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutRedirect() {
  const router = useRouter();

  useEffect(() => {
    window.location.replace('/#about');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B1120',
      color: '#94A3B8',
      fontSize: '14px',
    }}>
      Redirecting...
    </div>
  );
}
```

Repeat for each route:
- `app/projects/page.tsx` → `/#projects`
- `app/skills/page.tsx` → `/#skills`
- `app/credentials/page.tsx` → `/#credentials`
- `app/contact/page.tsx` → `/#contact`
- `app/philosophy/page.tsx` → `/#about` (if file exists)
- `app/capstone/page.tsx` → `/#projects` (if file exists)
- `app/cover-letter/page.tsx` → `/#hero` (if file exists)

- [ ] **Step 2: Commit**

```bash
git add app/about/page.tsx app/projects/page.tsx app/skills/page.tsx app/credentials/page.tsx app/contact/page.tsx
git commit -m "feat: redirect old page routes to hash-based 3D world sections"
```

---

## Task 18: Mobile 2D Fallback

**Files:**
- Create: `components/3d/MobileFallback.tsx`
- Create: `components/3d/MobileSectionCard.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create MobileSectionCard**

Create `components/3d/MobileSectionCard.tsx`:

```tsx
'use client';

import { ReactNode } from 'react';

interface MobileSectionCardProps {
  title: string;
  subtitle?: string;
  bgGradient: string;
  children: ReactNode;
}

export default function MobileSectionCard({ title, subtitle, bgGradient, children }: MobileSectionCardProps) {
  return (
    <section style={{
      minHeight: '100vh',
      width: '100vw',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: bgGradient,
      position: 'relative',
      scrollSnapAlign: 'start',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(11, 17, 32, 0.8)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(240, 201, 70, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <h2 style={{ color: '#F0C946', fontSize: '22px', fontWeight: 800, margin: '0 0 4px' }}>
          {title}
        </h2>
        {subtitle && (
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>{subtitle}</p>
        )}
        {children}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create MobileFallback**

Create `components/3d/MobileFallback.tsx`:

```tsx
'use client';

import { useRef, useState, useEffect } from 'react';
import MobileSectionCard from './MobileSectionCard';
import ContactForm from '@/components/ContactForm';
import { projects } from '@/lib/projects';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SECTIONS } from './NavigationContext';

export default function MobileFallback() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const idx = Math.round(scrollLeft / width);
      setCurrentIndex(idx);
      window.history.replaceState(null, '', `#${SECTIONS[idx]?.id || 'hero'}`);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0B1120' }}>
      {/* Nav dots */}
      <nav style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '6px',
        padding: '6px 12px',
        background: 'rgba(11, 17, 32, 0.8)',
        backdropFilter: 'blur(8px)',
        borderRadius: '20px',
        border: '1px solid rgba(240, 201, 70, 0.15)',
        zIndex: 100,
      }}>
        {SECTIONS.map((section, i) => (
          <button
            key={section.id}
            onClick={() => {
              containerRef.current?.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' });
            }}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              border: 'none',
              cursor: 'pointer',
              background: i === currentIndex ? '#F0C946' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </nav>

      {/* Horizontal scroll container */}
      <div
        ref={containerRef}
        style={{
          width: '100vw',
          height: '100vh',
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {/* Hero */}
        <MobileSectionCard title="Vy Nguyen" subtitle="Full-Stack Developer" bgGradient="linear-gradient(135deg, #0B1120, #1A3A5C)">
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px' }}>
            3 years building web apps, AI tools, and cross-platform products. AWS Certified, hackathon winner, open-source contributor. Based in Toronto.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <a href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaGithub size={22} /></a>
            <a href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaLinkedin size={22} /></a>
            <a href="mailto:vyn13217@gmail.com" style={{ color: '#F0C946' }}><MdEmail size={22} /></a>
          </div>
        </MobileSectionCard>

        {/* About */}
        <MobileSectionCard title="About Me" bgGradient="linear-gradient(135deg, #1A0A2E, #4A1942)">
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 12px' }}>
            I started coding 3 years ago and haven&apos;t stopped since. What began as curiosity turned into a passion for building real applications.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Full-Stack Dev', 'AI & ML', 'UI/UX Design'].map(item => (
              <div key={item} style={{
                padding: '8px 12px', background: 'rgba(240, 201, 70, 0.08)',
                border: '1px solid rgba(240, 201, 70, 0.15)', borderRadius: '8px',
                fontSize: '12px', color: '#F0C946', fontWeight: 600,
              }}>
                {item}
              </div>
            ))}
          </div>
        </MobileSectionCard>

        {/* Projects */}
        <MobileSectionCard title="Projects" subtitle="What I've Built" bgGradient="linear-gradient(135deg, #1A0A0A, #3A1A0A)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.slice(0, 4).map(project => (
              <div key={project.id} style={{
                padding: '12px', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px',
              }}>
                <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>{project.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.5, margin: '0 0 8px' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, background: '#E2E8F0', color: '#0B1120', borderRadius: '6px', textDecoration: 'none' }}>Code</a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, background: '#F0C946', color: '#0B1120', borderRadius: '6px', textDecoration: 'none' }}>Live</a>
                </div>
              </div>
            ))}
          </div>
        </MobileSectionCard>

        {/* Skills */}
        <MobileSectionCard title="Power Up" subtitle="Collect All Skills" bgGradient="linear-gradient(135deg, #0D0520, #1A0A2E)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'C#', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Tailwind CSS', 'TensorFlow', 'Pandas'].map(skill => (
              <span key={skill} style={{
                padding: '6px 10px', background: 'rgba(240, 201, 70, 0.08)',
                border: '1px solid rgba(240, 201, 70, 0.15)', borderRadius: '8px',
                fontSize: '11px', color: '#CBD5E1', fontWeight: 500,
              }}>
                {skill}
              </span>
            ))}
          </div>
        </MobileSectionCard>

        {/* Credentials */}
        <MobileSectionCard title="Credentials" bgGradient="linear-gradient(135deg, #050515, #0A0A2A)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>George Brown College</h4>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Advanced Diploma in CPA | GPA: 3.7</p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>AWS Certified Cloud Practitioner</h4>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Amazon Web Services — 2025</p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>Microsoft Hackathon — Top 10</h4>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Led team of 4, placed top 10/50</p>
            </div>
          </div>
        </MobileSectionCard>

        {/* Contact */}
        <MobileSectionCard title="Get In Touch" subtitle="Let's connect" bgGradient="linear-gradient(135deg, #1A0A0A, #3A1510)">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
            <a href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaLinkedin size={20} /></a>
            <a href="mailto:vyn13217@gmail.com" style={{ color: '#F0C946' }}><MdEmail size={20} /></a>
          </div>
          <ContactForm />
        </MobileSectionCard>
      </div>
    </div>
  );
}
```

- [ ] **Step 3: Update app/page.tsx to render mobile fallback**

Update `app/page.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const World3D = dynamic(() => import('@/components/3d/World3D'), { ssr: false });
const MobileFallback = dynamic(() => import('@/components/3d/MobileFallback'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileFallback /> : <World3D />;
}
```

- [ ] **Step 4: Verify mobile fallback**

Open DevTools, toggle device toolbar to a phone viewport. Expected: Horizontal swipe navigation between sections with glassmorphic cards. No 3D rendering overhead.

- [ ] **Step 5: Commit**

```bash
git add components/3d/MobileFallback.tsx components/3d/MobileSectionCard.tsx app/page.tsx
git commit -m "feat: add mobile 2D fallback with horizontal swipe navigation"
```

---

## Task 19: Preserve Existing Features

**Files:**
- Modify: `components/3d/World3D.tsx`
- Modify: `components/3d/SectionNav.tsx`

- [ ] **Step 1: Add KonamiCode and DarkModeToggle to World3D overlay**

In `components/3d/World3D.tsx`, add overlays after the SectionNav:

```tsx
import KonamiCode from '../KonamiCode';
import DarkModeToggle from '../DarkModeToggle';
```

Add after `<SectionNav />`:
```tsx
<KonamiCode />
<div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 100 }}>
  <DarkModeToggle />
</div>
```

- [ ] **Step 2: Commit**

```bash
git add components/3d/World3D.tsx
git commit -m "feat: preserve Konami Code easter egg and dark mode toggle in 3D world"
```

---

## Task 20: Final Cleanup and Build Verification

**Files:**
- Modify: `components/3d/WorldScene.tsx` (remove any remaining placeholder code)

- [ ] **Step 1: Remove any remaining temporary/placeholder code**

Review `WorldScene.tsx` and remove:
- The temporary colored cubes (from Task 3)
- The temporary full-width green ground plane
- Any `OrbitControls` from testing

Ensure the WorldScene only renders:
```tsx
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import CredentialsSection from './sections/CredentialsSection';
import ContactSection from './sections/ContactSection';
import MarioCharacter from './MarioCharacter';

// Inside return:
<HeroSection />
<AboutSection />
<ProjectsSection />
<SkillsSection />
<CredentialsSection />
<ContactSection />
<MarioCharacter />
```

Plus lighting, fog, and the useFrame camera logic.

- [ ] **Step 2: Run production build**

Run:
```bash
npm run build
```

Expected: Clean build with no errors. Warnings about dynamic imports are OK.

- [ ] **Step 3: Run and test production build**

Run:
```bash
npm start
```

Test:
1. Desktop: All 6 sections render, Mario walks, camera follows, nav dots work, content panels interactive
2. Mobile: 2D fallback with swipe navigation
3. Keyboard navigation (arrow keys, scroll wheel)
4. URL hash navigation (visit `/#projects` directly)
5. Contact form submission
6. Dark mode toggle
7. Konami Code easter egg
8. `/play` route still works

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: complete 3D Mario world portfolio — cleanup and build verification"
```

---

## Summary

| Task | Description | Files |
|------|-------------|-------|
| 1 | Install deps, verify R3F | package.json, World3D.tsx |
| 2 | Navigation context | NavigationContext.tsx |
| 3 | Camera system | WorldScene.tsx, World3D.tsx |
| 4 | Nav UI + input | SectionNav.tsx |
| 5 | Mario character | MarioCharacter.tsx |
| 6 | 3D objects (9 objects) | objects/*.tsx |
| 7 | Content panel | ContentPanel.tsx |
| 8 | Hero section | HeroSection.tsx |
| 9 | About section | AboutSection.tsx |
| 10 | Projects section | ProjectsSection.tsx |
| 11 | Skills section | SkillsSection.tsx |
| 12 | Credentials section | CredentialsSection.tsx |
| 13 | Contact section | ContactSection.tsx |
| 14 | Environment transitions | WorldScene.tsx |
| 15 | Loading screen | World3D.tsx |
| 16 | App layout integration | layout.tsx, page.tsx, AppShell.tsx |
| 17 | Route redirects | about/projects/skills/etc page.tsx |
| 18 | Mobile fallback | MobileFallback.tsx, MobileSectionCard.tsx |
| 19 | Preserve features | World3D.tsx (konami, theme toggle) |
| 20 | Cleanup + build | Final verification |
