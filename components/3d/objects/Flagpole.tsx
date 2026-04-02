'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FlagpoleProps { position: [number, number, number]; }

export default function Flagpole({ position }: FlagpoleProps) {
  const flagRef = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => { if (flagRef.current) flagRef.current.rotation.y = Math.sin(clock.elapsedTime * 3) * 0.15; });

  return (
    <group position={position}>
      {/* Pole */}
      <mesh castShadow><cylinderGeometry args={[0.05, 0.05, 8, 8]} /><meshToonMaterial color="#AAAAAA" /></mesh>
      {/* Top ball */}
      <mesh position={[0, 4.1, 0]} castShadow>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshStandardMaterial color="#FFD700" emissive="#FFD700" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Flag */}
      <mesh ref={flagRef} position={[0.5, 3.2, 0]} castShadow>
        <planeGeometry args={[1, 0.7]} />
        <meshToonMaterial color="#E52521" side={THREE.DoubleSide} />
      </mesh>
      {/* Base */}
      <mesh position={[0, -3.9, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.35, 0.3, 8]} />
        <meshToonMaterial color="#228B22" />
      </mesh>
    </group>
  );
}
