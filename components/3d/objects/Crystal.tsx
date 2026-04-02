'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CrystalProps { position: [number, number, number]; color?: string; scale?: number; }

export default function Crystal({ position, color = '#9B59B6', scale = 1 }: CrystalProps) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.5; });

  return (
    <group position={position} scale={scale}>
      <mesh ref={ref} castShadow>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} roughness={0.1} metalness={0.5} transparent opacity={0.85} />
      </mesh>
      <pointLight color={color} intensity={1} distance={5} decay={2} />
    </group>
  );
}
