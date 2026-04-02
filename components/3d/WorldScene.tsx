'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
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
  new THREE.Color('#87CEEB'), // Hero - bright blue sky
  new THREE.Color('#FF9BE4'), // About - sunset pink
  new THREE.Color('#1A0A0A'), // Projects - dark castle
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
    cameraTargetRef.current.set(targetX, 3, 18);
    lookAtRef.current.set(targetX, 1, 0);

    camera.position.lerp(cameraTargetRef.current, 0.035);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const desiredLookAt = lookAtRef.current.clone().sub(camera.position).normalize();
    currentLookAt.lerp(desiredLookAt, 0.06);
    camera.lookAt(
      camera.position.x + currentLookAt.x * 10,
      camera.position.y + currentLookAt.y * 10,
      camera.position.z + currentLookAt.z * 10,
    );

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
      {/* Better lighting */}
      <ambientLight intensity={0.3} />
      <hemisphereLight args={['#87CEEB', '#228B22', 0.6]} />
      <directionalLight
        position={[50, 40, 30]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={200}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      {/* Subtle environment reflections */}
      <Environment preset="sunset" environmentIntensity={0.15} />

      {/* All 6 sections */}
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <CredentialsSection />
      <ContactSection />

      {/* Mario */}
      <MarioCharacter />

      <fog ref={fogRef} attach="fog" args={['#87CEEB', 40, 100]} />
    </>
  );
}
