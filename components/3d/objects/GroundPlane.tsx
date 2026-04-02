'use client';

interface GroundPlaneProps {
  position: [number, number, number];
  width?: number;
  depth?: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
}

export default function GroundPlane({ position, width = 35, depth = 20, color, emissive, emissiveIntensity = 0 }: GroundPlaneProps) {
  return (
    <mesh position={position} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[width, depth]} />
      <meshStandardMaterial color={color} emissive={emissive || color} emissiveIntensity={emissiveIntensity} roughness={0.8} />
    </mesh>
  );
}
