'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface QuestionBlockProps {
  position: [number, number, number];
  scale?: number;
}

export default function QuestionBlock({ position, scale = 1 }: QuestionBlockProps) {
  const ref = useRef<THREE.Group>(null!);
  const baseY = position[1];

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.position.y = baseY + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.15;
    }
  });

  return (
    <group ref={ref} position={position} scale={scale}>
      {/* Block body */}
      <mesh castShadow>
        <boxGeometry args={[1, 1, 1]} />
        <meshToonMaterial color="#F0C946" />
      </mesh>
      {/* Face detail */}
      <mesh position={[0, 0, 0.51]}>
        <planeGeometry args={[0.9, 0.9]} />
        <meshToonMaterial color="#D4A830" />
      </mesh>
      {/* Question mark */}
      <mesh position={[0, 0, 0.52]}>
        <planeGeometry args={[0.4, 0.5]} />
        <meshStandardMaterial color="#8B6508" emissive="#8B6508" emissiveIntensity={0.4} />
      </mesh>
      {/* Inner glow */}
      <pointLight color="#F0C946" intensity={0.5} distance={3} />
    </group>
  );
}
