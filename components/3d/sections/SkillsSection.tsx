'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import GroundPlane from '../objects/GroundPlane';
import Crystal from '../objects/Crystal';
import MushroomGlow from '../objects/MushroomGlow';
import WarpPipe from '../objects/WarpPipe';
import ContentPanel from '../ContentPanel';
import * as THREE from 'three';

const SECTION_X = 90;

const skillCategories = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'C#', 'PostgreSQL', 'MongoDB', 'Express', 'REST APIs'] },
  { category: 'Tools & Platforms', items: ['Git', 'Docker', 'AWS', 'Vercel', 'VS Code', 'Figma'] },
  { category: 'AI / ML', items: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'] },
  { category: 'Mobile', items: ['Android', 'Swift', 'React Native', 'Kotlin'] },
];

function DustParticles() {
  const ref = useRef<THREE.Points>(null!);

  const { positions, velocities } = useMemo(() => {
    const count = 60;
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = Math.random() * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;
      vel[i * 3] = (Math.random() - 0.5) * 0.01;
      vel[i * 3 + 1] = Math.random() * 0.005 + 0.002;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01;
    }
    return { positions: pos, velocities: vel };
  }, []);

  useFrame(() => {
    if (!ref.current) return;
    const posAttr = ref.current.geometry.attributes.position;
    const arr = posAttr.array as Float32Array;
    for (let i = 0; i < arr.length / 3; i++) {
      arr[i * 3] += velocities[i * 3];
      arr[i * 3 + 1] += velocities[i * 3 + 1];
      arr[i * 3 + 2] += velocities[i * 3 + 2];
      if (arr[i * 3 + 1] > 12) arr[i * 3 + 1] = 0;
    }
    posAttr.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#9B59B6" size={0.08} transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function SkillsSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      <GroundPlane position={[0, -1, 0]} color="#1A0A2E" />

      <mesh position={[0, 12, -10]}><planeGeometry args={[60, 30]} /><meshBasicMaterial color="#0D0520" /></mesh>

      {/* More mushrooms spread around */}
      <MushroomGlow position={[-8, -0.7, 2]} color="#00FF88" scale={1.5} />
      <MushroomGlow position={[-4, -0.7, -3]} color="#FF00FF" scale={1} />
      <MushroomGlow position={[6, -0.7, 1]} color="#00CCFF" scale={1.2} />
      <MushroomGlow position={[10, -0.7, -2]} color="#FFFF00" scale={0.8} />
      <MushroomGlow position={[-12, -0.7, -1]} color="#FF6600" scale={0.7} />
      <MushroomGlow position={[13, -0.7, 0]} color="#00FF44" scale={0.9} />
      <MushroomGlow position={[-1, -0.7, 4]} color="#FF44FF" scale={0.6} />

      {/* More crystals */}
      <Crystal position={[-10, 1, -4]} color="#9B59B6" scale={1.5} />
      <Crystal position={[-6, 2, -5]} color="#3498DB" scale={1} />
      <Crystal position={[4, 1.5, -4]} color="#E74C3C" scale={1.2} />
      <Crystal position={[9, 2, -5]} color="#2ECC71" scale={0.9} />
      <Crystal position={[-3, 1, -6]} color="#F39C12" scale={0.8} />
      <Crystal position={[12, 1.8, -3]} color="#1ABC9C" scale={1.1} />

      <WarpPipe position={[-12, 0, 3]} scale={0.8} />
      <WarpPipe position={[12, 0, 3]} scale={0.8} />

      {/* Floating dust particles */}
      <DustParticles />

      <ContentPanel position={[0, 3, 2]} width="460px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>Power Up</h2>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>Collect all skills</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            {skillCategories.map(cat => (
              <div key={cat.category} style={{ padding: '12px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px' }}>
                <h4 style={{ color: '#F0C946', fontSize: '12px', fontWeight: 700, margin: '0 0 8px' }}>{cat.category}</h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {cat.items.map(skill => (
                    <span key={skill} style={{ padding: '3px 8px', background: 'rgba(240, 201, 70, 0.08)', border: '1px solid rgba(240, 201, 70, 0.15)', borderRadius: '6px', fontSize: '10px', color: '#CBD5E1', fontWeight: 500 }}>{skill}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
