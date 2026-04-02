'use client';

interface WarpPipeProps {
  position: [number, number, number];
  scale?: number;
}

export default function WarpPipe({ position, scale = 1 }: WarpPipeProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 2, 16]} />
        <meshStandardMaterial color="#228B22" />
      </mesh>
      <mesh position={[0, 1.1, 0]} castShadow>
        <cylinderGeometry args={[0.75, 0.75, 0.3, 16]} />
        <meshStandardMaterial color="#2EA82E" />
      </mesh>
      <mesh position={[0, 1.26, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.55, 16]} />
        <meshStandardMaterial color="#0A3D0A" />
      </mesh>
    </group>
  );
}
