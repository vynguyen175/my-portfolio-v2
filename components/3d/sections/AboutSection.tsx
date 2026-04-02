'use client';

import FloatingCloud from '../objects/FloatingCloud';
import ContentPanel from '../ContentPanel';

const SECTION_X = 30;

export default function AboutSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      {/* Cloud platforms */}
      <FloatingCloud position={[-4, -0.5, 0]} scale={3} speed={0.05} />
      <FloatingCloud position={[4, -0.8, 1]} scale={2.5} speed={0.08} />
      <FloatingCloud position={[0, -0.3, -2]} scale={3.5} speed={0.03} />

      {/* Layered background clouds */}
      <FloatingCloud position={[-10, 6, -8]} scale={2} speed={0.15} />
      <FloatingCloud position={[8, 8, -12]} scale={2.5} speed={0.1} />
      <FloatingCloud position={[-6, 10, -15]} scale={1.8} speed={0.2} />
      <FloatingCloud position={[12, 5, -6]} scale={1.5} speed={0.18} />
      <FloatingCloud position={[-14, 7, -18]} scale={3} speed={0.08} />
      <FloatingCloud position={[6, 12, -20]} scale={2.2} speed={0.06} />
      <FloatingCloud position={[-2, 9, -14]} scale={1.6} speed={0.14} />

      {/* Multi-layered sunset sky */}
      <mesh position={[0, 12, -25]}><planeGeometry args={[60, 15]} /><meshBasicMaterial color="#FF9BE4" /></mesh>
      <mesh position={[0, 2, -25]}><planeGeometry args={[60, 12]} /><meshBasicMaterial color="#FF6B6B" /></mesh>
      <mesh position={[0, -5, -25]}><planeGeometry args={[60, 10]} /><meshBasicMaterial color="#FF8C42" /></mesh>

      {/* Warm sunset light */}
      <directionalLight position={[SECTION_X, 8, -5]} color="#FFB347" intensity={0.6} />
      <pointLight position={[0, 3, 5]} color="#FF9BE4" intensity={0.3} distance={15} />

      <ContentPanel position={[-2, 3, 0]} width="440px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 16px' }}>About Me</h2>
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px' }}>
            I started coding 3 years ago and haven&apos;t stopped since. What began as curiosity turned into a passion for building real applications — from full-stack web apps and mobile platforms to AI-powered tools. Based in Toronto with an AWS certification, hackathon wins, and 7+ deployed projects.
          </p>
          <h3 style={{ color: '#F0C946', fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>My Focus</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '16px' }}>
            {[
              { label: 'Full-Stack Dev', desc: 'Modern frameworks & technologies' },
              { label: 'AI & ML', desc: 'Intelligent systems & data-driven apps' },
              { label: 'UI/UX Design', desc: 'Intuitive & beautiful experiences' },
            ].map(item => (
              <div key={item.label} style={{ padding: '8px 12px', background: 'rgba(240, 201, 70, 0.08)', border: '1px solid rgba(240, 201, 70, 0.15)', borderRadius: '8px', fontSize: '12px' }}>
                <strong style={{ color: '#F0C946' }}>{item.label}:</strong>{' '}
                <span style={{ color: '#94A3B8' }}>{item.desc}</span>
              </div>
            ))}
          </div>
          <h3 style={{ color: '#F0C946', fontSize: '14px', fontWeight: 700, margin: '0 0 8px' }}>What I Value</h3>
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
            Clean, readable code. Continuous learning. Clear communication, taking ownership, and being the kind of teammate who makes everyone around them better.
          </p>
        </div>
      </ContentPanel>
    </group>
  );
}
