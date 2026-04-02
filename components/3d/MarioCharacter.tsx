'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigation } from './NavigationContext';
import * as THREE from 'three';

function MarioModel() {
  return (
    <group scale={0.8}>
      {/* Head - smooth sphere */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshToonMaterial color="#FFB8A0" />
      </mesh>

      {/* Hat */}
      <group position={[0, 1.85, 0]}>
        {/* Hat dome */}
        <mesh castShadow>
          <sphereGeometry args={[0.48, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshToonMaterial color="#E52521" />
        </mesh>
        {/* Hat brim */}
        <mesh position={[0, -0.02, 0.15]} castShadow>
          <cylinderGeometry args={[0.35, 0.4, 0.08, 16]} />
          <meshToonMaterial color="#E52521" />
        </mesh>
        {/* M circle */}
        <mesh position={[0, 0.15, 0.42]} rotation={[0.3, 0, 0]}>
          <circleGeometry args={[0.15, 16]} />
          <meshToonMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {/* Eyes */}
      <mesh position={[-0.15, 1.65, 0.38]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 1.65, 0.38]}>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      {/* Pupils */}
      <mesh position={[-0.15, 1.65, 0.45]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>
      <mesh position={[0.15, 1.65, 0.45]}>
        <sphereGeometry args={[0.045, 8, 8]} />
        <meshBasicMaterial color="#1a1a2e" />
      </mesh>

      {/* Nose */}
      <mesh position={[0, 1.5, 0.45]} castShadow>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshToonMaterial color="#E8967A" />
      </mesh>

      {/* Mustache */}
      <mesh position={[0, 1.38, 0.4]} castShadow>
        <capsuleGeometry args={[0.06, 0.35, 4, 8]} />
        <meshToonMaterial color="#4A2800" />
      </mesh>

      {/* Body / Shirt (red) */}
      <mesh position={[0, 0.85, 0]} castShadow>
        <capsuleGeometry args={[0.35, 0.3, 4, 16]} />
        <meshToonMaterial color="#E52521" />
      </mesh>

      {/* Overalls (blue) */}
      <mesh position={[0, 0.45, 0]} castShadow>
        <capsuleGeometry args={[0.33, 0.35, 4, 16]} />
        <meshToonMaterial color="#2E5CB8" />
      </mesh>

      {/* Overall straps */}
      <mesh position={[-0.15, 0.75, 0.25]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.08]} />
        <meshToonMaterial color="#2E5CB8" />
      </mesh>
      <mesh position={[0.15, 0.75, 0.25]} castShadow>
        <boxGeometry args={[0.1, 0.4, 0.08]} />
        <meshToonMaterial color="#2E5CB8" />
      </mesh>

      {/* Gold buttons */}
      <mesh position={[-0.15, 0.7, 0.32]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#F0C946" emissive="#F0C946" emissiveIntensity={0.5} metalness={0.8} />
      </mesh>
      <mesh position={[0.15, 0.7, 0.32]}>
        <sphereGeometry args={[0.04, 8, 8]} />
        <meshStandardMaterial color="#F0C946" emissive="#F0C946" emissiveIntensity={0.5} metalness={0.8} />
      </mesh>

      {/* Gloves (white) */}
      <mesh position={[-0.45, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.45, 0.7, 0]} castShadow>
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshToonMaterial color="#FFFFFF" />
      </mesh>

      {/* Arms */}
      <mesh position={[-0.38, 0.8, 0]} rotation={[0, 0, 0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
        <meshToonMaterial color="#E52521" />
      </mesh>
      <mesh position={[0.38, 0.8, 0]} rotation={[0, 0, -0.3]} castShadow>
        <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
        <meshToonMaterial color="#E52521" />
      </mesh>
    </group>
  );
}

export default function MarioCharacter() {
  const groupRef = useRef<THREE.Group>(null!);
  const { targetX } = useNavigation();
  const currentX = useRef(0);
  const bobTime = useRef(0);
  const leftLegRef = useRef<THREE.Group>(null!);
  const rightLegRef = useRef<THREE.Group>(null!);
  const legAngle = useRef(0);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const speed = 0.04;
    const dx = targetX - currentX.current;

    if (Math.abs(dx) > 0.1) {
      currentX.current += dx * speed;
      groupRef.current.rotation.y = dx > 0 ? 0 : Math.PI;

      legAngle.current += delta * 12;
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(legAngle.current) * 0.5;
        rightLegRef.current.rotation.x = Math.sin(legAngle.current + Math.PI) * 0.5;
      }
      groupRef.current.position.y = Math.abs(Math.sin(legAngle.current * 2)) * 0.1;
    } else {
      bobTime.current += delta;
      groupRef.current.position.y = Math.sin(bobTime.current * 2) * 0.05;
      if (leftLegRef.current) leftLegRef.current.rotation.x *= 0.9;
      if (rightLegRef.current) rightLegRef.current.rotation.x *= 0.9;
    }

    groupRef.current.position.x = currentX.current;
    groupRef.current.position.z = 6;
  });

  return (
    <group ref={groupRef}>
      <MarioModel />

      {/* Left leg */}
      <group ref={leftLegRef} position={[-0.15, 0.15, 0]}>
        <mesh position={[0, -0.1, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.2, 4, 8]} />
          <meshToonMaterial color="#2E5CB8" />
        </mesh>
        <mesh position={[0, -0.35, 0.03]} castShadow>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshToonMaterial color="#6B3E26" />
        </mesh>
      </group>

      {/* Right leg */}
      <group ref={rightLegRef} position={[0.15, 0.15, 0]}>
        <mesh position={[0, -0.1, 0]} castShadow>
          <capsuleGeometry args={[0.1, 0.2, 4, 8]} />
          <meshToonMaterial color="#2E5CB8" />
        </mesh>
        <mesh position={[0, -0.35, 0.03]} castShadow>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshToonMaterial color="#6B3E26" />
        </mesh>
      </group>

      {/* Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.25, 0]}>
        <circleGeometry args={[0.4, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}
