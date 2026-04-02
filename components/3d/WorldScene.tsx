'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigation } from './NavigationContext';
import MarioCharacter from './MarioCharacter';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import CredentialsSection from './sections/CredentialsSection';
import ContactSection from './sections/ContactSection';
import * as THREE from 'three';

const SKY_COLORS = [
  new THREE.Color('#5BA3E6'), // Hero - blue
  new THREE.Color('#FF9BE4'), // About - sunset pink
  new THREE.Color('#2A1A0A'), // Projects - dark castle
  new THREE.Color('#0D0520'), // Skills - deep underground
  new THREE.Color('#050515'), // Credentials - space
  new THREE.Color('#FF8C42'), // Contact - warm sunset
];

export default function WorldScene() {
  const { targetX, setIsMoving } = useNavigation();
  const cameraTargetRef = useRef(new THREE.Vector3(0, 3, 20));
  const lookAtRef = useRef(new THREE.Vector3(0, 1, 0));
  const fogRef = useRef<THREE.Fog>(null!);

  useFrame(({ camera, scene }) => {
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

    // Detect arrival
    const dist = Math.abs(camera.position.x - cameraTargetRef.current.x);
    if (dist < 0.1) setIsMoving(false);

    // Dynamic sky/fog color blending
    const sectionProgress = camera.position.x / 30;
    const idx = Math.floor(Math.max(0, Math.min(sectionProgress, 4.99)));
    const t = Math.max(0, Math.min(sectionProgress - idx, 1));
    const currentColor = SKY_COLORS[idx].clone().lerp(SKY_COLORS[Math.min(idx + 1, 5)], t);

    if (fogRef.current) {
      fogRef.current.color.copy(currentColor);
    }
    scene.background = currentColor;
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[50, 30, 20]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* All 6 sections */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CredentialsSection />
      <ContactSection />

      {/* Mario */}
      <MarioCharacter />

      <fog ref={fogRef} attach="fog" args={['#5BA3E6', 30, 80]} />
    </>
  );
}
