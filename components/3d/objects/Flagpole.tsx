'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlagpoleProps { position: [number, number, number]; }

export default function Flagpole({ position }: FlagpoleProps) {
  const flagRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => { if (flagRef.current) flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 3) * 0.1; });

  return (
    <group position={position}>
      <mesh castShadow><cylinderGeometry args={[0.05, 0.05, 8, 8]} /><meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} /></mesh>
      <mesh position={[0, 4.1, 0]} castShadow><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#FFD700" metalness={0.8} roughness={0.2} /></mesh>
      <mesh ref={flagRef} position={[0.5, 3.2, 0]} castShadow><planeGeometry args={[1, 0.7]} /><meshStandardMaterial color="#E52521" side={THREE.DoubleSide} /></mesh>
      <mesh position={[0, -3.9, 0]} castShadow><boxGeometry args={[0.5, 0.2, 0.5]} /><meshStandardMaterial color="#228B22" /></mesh>
    </group>
  );
}
