'use client';

import GroundPlane from '../objects/GroundPlane';
import Crystal from '../objects/Crystal';
import MushroomGlow from '../objects/MushroomGlow';
import WarpPipe from '../objects/WarpPipe';
import ContentPanel from '../ContentPanel';

const SECTION_X = 90;

const skillCategories = [
  { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML/CSS', 'JavaScript'] },
  { category: 'Backend', items: ['Node.js', 'Python', 'C#', 'PostgreSQL', 'MongoDB', 'Express', 'REST APIs'] },
  { category: 'Tools & Platforms', items: ['Git', 'Docker', 'AWS', 'Vercel', 'VS Code', 'Figma'] },
  { category: 'AI / ML', items: ['Python', 'Streamlit', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow'] },
  { category: 'Mobile', items: ['Android', 'Swift', 'React Native', 'Kotlin'] },
];

export default function SkillsSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      <GroundPlane position={[0, -1, 0]} color="#1A0A2E" />

      <mesh position={[0, 12, -10]}><planeGeometry args={[60, 30]} /><meshBasicMaterial color="#0D0520" /></mesh>

      <MushroomGlow position={[-8, -0.7, 2]} color="#00FF88" scale={1.5} />
      <MushroomGlow position={[-4, -0.7, -3]} color="#FF00FF" scale={1} />
      <MushroomGlow position={[6, -0.7, 1]} color="#00CCFF" scale={1.2} />
      <MushroomGlow position={[10, -0.7, -2]} color="#FFFF00" scale={0.8} />

      <Crystal position={[-10, 1, -4]} color="#9B59B6" scale={1.5} />
      <Crystal position={[-6, 2, -5]} color="#3498DB" scale={1} />
      <Crystal position={[4, 1.5, -4]} color="#E74C3C" scale={1.2} />
      <Crystal position={[9, 2, -5]} color="#2ECC71" scale={0.9} />

      <WarpPipe position={[-12, 0, 3]} scale={0.8} />
      <WarpPipe position={[12, 0, 3]} scale={0.8} />

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
