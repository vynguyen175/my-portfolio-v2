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
      <mesh castShadow><sphereGeometry args={[1, 16, 16]} /><meshStandardMaterial color="#FFFFFF" roughness={1} /></mesh>
      <mesh position={[-0.8, -0.2, 0]} castShadow><sphereGeometry args={[0.7, 16, 16]} /><meshStandardMaterial color="#FFFFFF" roughness={1} /></mesh>
      <mesh position={[0.8, -0.1, 0]} castShadow><sphereGeometry args={[0.8, 16, 16]} /><meshStandardMaterial color="#FFFFFF" roughness={1} /></mesh>
      <mesh position={[0.2, 0.5, 0]} castShadow><sphereGeometry args={[0.6, 16, 16]} /><meshStandardMaterial color="#FFFFFF" roughness={1} /></mesh>
    </group>
  );
}
