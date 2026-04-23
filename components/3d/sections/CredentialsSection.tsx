'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import Star3D from '../objects/Star3D';
import ContentPanel from '../ContentPanel';
import * as THREE from 'three';

const SECTION_X = 120;

function TwinklingStar({ position, size = 0.08 }: { position: [number, number, number]; size?: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(clock.elapsedTime * 3 + position[0] * 10) * 0.5;
      // Subtle scale pulsing for sparkle effect
      const s = 1 + Math.sin(clock.elapsedTime * 4 + position[1] * 5) * 0.3;
      ref.current.scale.setScalar(s);
    }
  });
  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={[size, 4, 4]} />
      <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={1} />
    </mesh>
  );
}

function RainbowPlatform({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.MeshStandardMaterial;
      const hue = (clock.elapsedTime * 0.1 + position[0] * 0.05) % 1;
      mat.color.setHSL(hue, 0.8, 0.55);
      mat.emissive.setHSL(hue, 0.8, 0.3);
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <boxGeometry args={[4, 0.3, 3]} />
      <meshStandardMaterial color="#FF69B4" emissive="#FF69B4" emissiveIntensity={0.4} transparent opacity={0.85} />
    </mesh>
  );
}

export default function CredentialsSection() {
  const stars = Array.from({ length: 100 }, (_, i) => ({
    position: [(Math.random() - 0.5) * 50, Math.random() * 15 + 2, -10 - Math.random() * 20] as [number, number, number],
    size: Math.random() * 0.06 + 0.04,
  }));

  return (
    <group position={[SECTION_X, 0, 0]}>
      <mesh position={[0, 8, -25]}><planeGeometry args={[60, 30]} /><meshBasicMaterial color="#050515" /></mesh>

      {/* Twinkling stars with varying sizes */}
      {stars.map((star, i) => (<TwinklingStar key={i} position={star.position} size={star.size} />))}

      {/* Vivid rainbow platforms */}
      <RainbowPlatform position={[-5, -0.5, 0]} />
      <RainbowPlatform position={[2, -0.8, 1]} />
      <RainbowPlatform position={[8, -0.3, -1]} />
      <RainbowPlatform position={[-10, -0.6, 2]} />

      {/* Collectible stars */}
      <Star3D position={[-8, 4, -3]} scale={0.6} />
      <Star3D position={[-2, 6, -5]} scale={0.4} />
      <Star3D position={[5, 5, -4]} scale={0.5} />
      <Star3D position={[10, 3, -2]} scale={0.7} />
      <Star3D position={[0, 7, -6]} scale={0.3} />

      {/* Subtle space glow */}
      <pointLight position={[0, 5, 5]} color="#6644FF" intensity={0.4} distance={20} />

      <ContentPanel position={[0, 3, 2]} width="440px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 16px' }}>Credentials</h2>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', marginBottom: '10px' }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>George Brown College — Toronto, ON</h4>
            <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 4px', fontWeight: 600 }}>Advanced Diploma in Computer Programming and Analysis</p>
            <p style={{ color: '#64748B', fontSize: '11px', margin: 0 }}>Dean&apos;s List Honors | GPA: 3.7 | Expected April 2026</p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', marginBottom: '10px' }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>AWS Certified Cloud Practitioner</h4>
            <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Amazon Web Services — 2025</p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px', marginBottom: '10px' }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>Microsoft Hackathon — Top 10</h4>
            <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Led team of 4, placed top 10 out of 50 teams</p>
          </div>

          <div style={{ padding: '14px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
            <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 6px' }}>Activities</h4>
            <p style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.6, margin: 0 }}>
              IEEEXtreme 19.0 (2025) &bull; Peer Mentoring at George Brown
            </p>
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
