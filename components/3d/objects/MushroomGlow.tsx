'use client';

interface MushroomGlowProps { position: [number, number, number]; color?: string; scale?: number; }

export default function MushroomGlow({ position, color = '#00FF88', scale = 1 }: MushroomGlowProps) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.3, 0]} castShadow><cylinderGeometry args={[0.1, 0.15, 0.6, 8]} /><meshStandardMaterial color="#E8DCC8" /></mesh>
      <mesh position={[0, 0.7, 0]} castShadow><sphereGeometry args={[0.35, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshStandardMaterial color={color} emissive={color} emissiveIntensity={1} /></mesh>
      <pointLight position={[0, 0.8, 0]} color={color} intensity={0.8} distance={4} decay={2} />
    </group>
  );
}
