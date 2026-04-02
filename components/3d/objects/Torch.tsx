'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TorchProps { position: [number, number, number]; }

export default function Torch({ position }: TorchProps) {
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    if (lightRef.current) lightRef.current.intensity = 2 + Math.sin(clock.elapsedTime * 8 + position[0]) * 0.5;
  });

  return (
    <group position={position}>
      <mesh castShadow><cylinderGeometry args={[0.08, 0.12, 1.5, 8]} /><meshStandardMaterial color="#4A3000" /></mesh>
      <mesh position={[0, 0.9, 0]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#FF6600" emissive="#FF4400" emissiveIntensity={3} /></mesh>
      <pointLight ref={lightRef} position={[0, 1, 0]} color="#FF6600" intensity={2} distance={8} decay={2} />
    </group>
  );
}
