'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useNavigation } from './NavigationContext';
import * as THREE from 'three';

export default function WorldScene() {
  const { targetX, setIsMoving } = useNavigation();
  const cameraTargetRef = useRef(new THREE.Vector3(0, 3, 20));
  const lookAtRef = useRef(new THREE.Vector3(0, 1, 0));

  useFrame(({ camera }) => {
    cameraTargetRef.current.set(targetX, 3, 20);
    lookAtRef.current.set(targetX, 1, 0);

    camera.position.lerp(cameraTargetRef.current, 0.03);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const desiredLookAt = lookAtRef.current.clone().sub(camera.position).normalize();
    currentLookAt.lerp(desiredLookAt, 0.05);
    camera.lookAt(
      camera.position.x + currentLookAt.x * 10,
      camera.position.y + currentLookAt.y * 10,
      camera.position.z + currentLookAt.z * 10,
    );

    const dist = Math.abs(camera.position.x - cameraTargetRef.current.x);
    if (dist < 0.1) setIsMoving(false);
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[50, 30, 20]} intensity={0.8} castShadow shadow-mapSize={[1024, 1024]} />

      {/* Placeholder ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[75, -1, 0]} receiveShadow>
        <planeGeometry args={[200, 40]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>

      {/* Section position markers (temporary) */}
      {[0, 30, 60, 90, 120, 150].map((x, i) => (
        <mesh key={i} position={[x, 1, 0]}>
          <boxGeometry args={[3, 3, 3]} />
          <meshStandardMaterial color={['#F0C946', '#FF9BE4', '#8B4513', '#4A0080', '#FFD700', '#FF6347'][i]} />
        </mesh>
      ))}

      <fog attach="fog" args={['#0B1120', 30, 80]} />
    </>
  );
}
