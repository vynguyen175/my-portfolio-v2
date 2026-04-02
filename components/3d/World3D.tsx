'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function TestScene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <mesh>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#F0C946" />
      </mesh>
      <OrbitControls />
    </>
  );
}

export default function World3D() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#0B1120' }}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <TestScene />
      </Canvas>
    </div>
  );
}
