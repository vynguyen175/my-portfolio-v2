'use client';
import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Star3DProps { position: [number, number, number]; scale?: number; }

export default function Star3D({ position, scale = 0.5 }: Star3DProps) {
  const ref = useRef<THREE.Mesh>(null!);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const outerRadius = 1;
    const innerRadius = 0.4;
    const points = 5;
    for (let i = 0; i < points * 2; i++) {
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      const angle = (i * Math.PI) / points - Math.PI / 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      if (i === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.closePath();
    return new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: true, bevelSize: 0.05, bevelThickness: 0.05 });
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 1.5;
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 2 + position[0]) * 0.2;
    }
  });

  return (
    <mesh ref={ref} geometry={geometry} position={position} scale={scale} castShadow>
      <meshStandardMaterial color="#FFD700" emissive="#F0C946" emissiveIntensity={0.5} metalness={0.8} roughness={0.2} />
    </mesh>
  );
}
