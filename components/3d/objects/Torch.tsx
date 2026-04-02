'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TorchProps { position: [number, number, number]; }

export default function Torch({ position }: TorchProps) {
  const lightRef = useRef<THREE.PointLight>(null!);
  const flameRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * 8 + position[0];
    if (lightRef.current) lightRef.current.intensity = 3 + Math.sin(t) * 0.8;
    if (flameRef.current) {
      const mat = flameRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 4 + Math.sin(t) * 1.5;
      flameRef.current.scale.y = 1 + Math.sin(t * 1.3) * 0.15;
    }
  });

  return (
    <group position={position}>
      {/* Handle */}
      <mesh castShadow><cylinderGeometry args={[0.08, 0.12, 1.5, 8]} /><meshToonMaterial color="#4A3000" /></mesh>
      {/* Flame */}
      <mesh ref={flameRef} position={[0, 0.9, 0]}>
        <sphereGeometry args={[0.18, 12, 12]} />
        <meshStandardMaterial color="#FF6600" emissive="#FF4400" emissiveIntensity={4} />
      </mesh>
      {/* Flame inner */}
      <mesh position={[0, 0.95, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#FFCC00" emissive="#FFAA00" emissiveIntensity={5} />
      </mesh>
      <pointLight ref={lightRef} position={[0, 1, 0]} color="#FF6600" intensity={3} distance={10} decay={2} />
    </group>
  );
}
