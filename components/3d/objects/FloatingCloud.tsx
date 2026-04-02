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
      {/* Main puffs */}
      <mesh castShadow><sphereGeometry args={[1, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      <mesh position={[-0.8, -0.2, 0]} castShadow><sphereGeometry args={[0.7, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      <mesh position={[0.8, -0.1, 0]} castShadow><sphereGeometry args={[0.8, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      <mesh position={[0.2, 0.5, 0]} castShadow><sphereGeometry args={[0.6, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      {/* Extra puffs for rounder look */}
      <mesh position={[-0.4, 0.3, 0.2]} castShadow><sphereGeometry args={[0.55, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      <mesh position={[0.5, 0.2, -0.2]} castShadow><sphereGeometry args={[0.5, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.9} /></mesh>
      <mesh position={[-1.2, -0.3, 0.1]} castShadow><sphereGeometry args={[0.45, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.85} /></mesh>
      <mesh position={[1.3, -0.25, -0.1]} castShadow><sphereGeometry args={[0.5, 16, 16]} /><meshToonMaterial color="#FFFFFF" transparent opacity={0.85} /></mesh>
    </group>
  );
}
