'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigation } from './NavigationContext';
import * as THREE from 'three';

function MarioBody() {
  return (
    <group>
      {/* Body (red) */}
      <mesh position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.8, 0.8, 0.6]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>
      {/* Head (skin) */}
      <mesh position={[0, 1.3, 0]} castShadow>
        <boxGeometry args={[0.7, 0.6, 0.6]} />
        <meshStandardMaterial color="#FFB8A0" />
      </mesh>
      {/* Hat (red) */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <boxGeometry args={[0.8, 0.2, 0.7]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>
      {/* Hat brim */}
      <mesh position={[0, 1.6, 0.2]} castShadow>
        <boxGeometry args={[0.9, 0.1, 0.3]} />
        <meshStandardMaterial color="#E52521" />
      </mesh>
      {/* Mustache */}
      <mesh position={[0, 1.1, 0.3]}>
        <boxGeometry args={[0.5, 0.1, 0.1]} />
        <meshStandardMaterial color="#4A2800" />
      </mesh>
      {/* Eyes (white) */}
      <mesh position={[-0.15, 1.35, 0.3]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.3]}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Pupils */}
      <mesh position={[-0.15, 1.35, 0.33]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      <mesh position={[0.15, 1.35, 0.33]}>
        <boxGeometry args={[0.08, 0.08, 0.02]} />
        <meshStandardMaterial color="#000000" />
      </mesh>
      {/* Overalls (blue) */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <boxGeometry args={[0.75, 0.5, 0.55]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>
      {/* M emblem on hat */}
      <mesh position={[0, 1.7, 0.36]}>
        <boxGeometry args={[0.25, 0.15, 0.02]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      {/* Buttons (gold) */}
      <mesh position={[-0.15, 0.55, 0.31]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
      <mesh position={[0.15, 0.55, 0.31]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
    </group>
  );
}

export default function MarioCharacter() {
  const groupRef = useRef<THREE.Group>(null!);
  const { targetX, isMoving } = useNavigation();
  const currentX = useRef(0);
  const bobTime = useRef(0);
  const legAngle = useRef(0);
  const leftLegRef = useRef<THREE.Mesh>(null!);
  const rightLegRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    const speed = 0.04;
    const dx = targetX - currentX.current;

    if (Math.abs(dx) > 0.1) {
      currentX.current += dx * speed;
      groupRef.current.rotation.y = dx > 0 ? 0 : Math.PI;

      legAngle.current += delta * 10;
      if (leftLegRef.current && rightLegRef.current) {
        leftLegRef.current.rotation.x = Math.sin(legAngle.current) * 0.6;
        rightLegRef.current.rotation.x = Math.sin(legAngle.current + Math.PI) * 0.6;
      }
      groupRef.current.position.y = Math.abs(Math.sin(legAngle.current)) * 0.15;
    } else {
      bobTime.current += delta;
      groupRef.current.position.y = Math.sin(bobTime.current * 2) * 0.05;
      if (leftLegRef.current) leftLegRef.current.rotation.x = 0;
      if (rightLegRef.current) rightLegRef.current.rotation.x = 0;
    }

    groupRef.current.position.x = currentX.current;
    groupRef.current.position.z = 5;
  });

  return (
    <group ref={groupRef}>
      <MarioBody />
      {/* Left leg */}
      <mesh ref={leftLegRef} position={[-0.2, -0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.35]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>
      {/* Left shoe */}
      <mesh position={[-0.2, -0.4, 0.05]} castShadow>
        <boxGeometry args={[0.32, 0.15, 0.45]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Right leg */}
      <mesh ref={rightLegRef} position={[0.2, -0.15, 0]} castShadow>
        <boxGeometry args={[0.3, 0.4, 0.35]} />
        <meshStandardMaterial color="#1E3A8A" />
      </mesh>
      {/* Right shoe */}
      <mesh position={[0.2, -0.4, 0.05]} castShadow>
        <boxGeometry args={[0.32, 0.15, 0.45]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      {/* Shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.47, 0]}>
        <circleGeometry args={[0.5, 16]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
