'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MushroomGlowProps { position: [number, number, number]; color?: string; scale?: number; }

export default function MushroomGlow({ position, color = '#00FF88', scale = 1 }: MushroomGlowProps) {
  const capRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (capRef.current) {
      const mat = capRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 1 + Math.sin(clock.elapsedTime * 2 + position[0] * 3) * 0.5;
    }
  });

  return (
    <group position={position} scale={scale}>
      {/* Stem */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 0.6, 8]} />
        <meshToonMaterial color="#E8DCC8" />
      </mesh>
      {/* Cap */}
      <mesh ref={capRef} position={[0, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.2} />
      </mesh>
      {/* Spots */}
      <mesh position={[0.15, 0.8, 0.2]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[-0.1, 0.82, 0.18]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      <pointLight position={[0, 0.8, 0]} color={color} intensity={1} distance={5} decay={2} />
    </group>
  );
}
