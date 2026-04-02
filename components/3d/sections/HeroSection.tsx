'use client';

import GroundPlane from '../objects/GroundPlane';
import FloatingCloud from '../objects/FloatingCloud';
import QuestionBlock from '../objects/QuestionBlock';
import WarpPipe from '../objects/WarpPipe';
import ContentPanel from '../ContentPanel';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SECTION_X = 0;

export default function HeroSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      <GroundPlane position={[0, -1, 0]} color="#228B22" />

      {/* Rolling hills */}
      <mesh position={[-5, -0.3, -3]} castShadow>
        <sphereGeometry args={[3, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#2EA82E" />
      </mesh>
      <mesh position={[8, -0.5, -5]} castShadow>
        <sphereGeometry args={[4, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1E8C1E" />
      </mesh>

      <FloatingCloud position={[-8, 8, -10]} scale={1.5} speed={0.2} />
      <FloatingCloud position={[5, 10, -15]} scale={2} speed={0.15} />
      <FloatingCloud position={[12, 7, -8]} scale={1} speed={0.25} />

      <QuestionBlock position={[-3, 4, -2]} />
      <QuestionBlock position={[0, 5, -3]} />
      <QuestionBlock position={[3, 4.5, -2]} />

      <WarpPipe position={[13, 0, 2]} />

      <mesh position={[0, 10, -25]}>
        <planeGeometry args={[60, 30]} />
        <meshBasicMaterial color="#5BA3E6" />
      </mesh>

      <ContentPanel position={[0, 3, 2]} width="380px">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#F0C946', fontSize: '36px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-1px' }}>
            Vy Nguyen
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', fontWeight: 500, margin: '0 0 16px' }}>
            Full-Stack Developer &bull; AI Enthusiast &bull; Toronto
          </p>
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px' }}>
            3 years building web apps, AI tools, and cross-platform products. AWS Certified, hackathon winner, open-source contributor.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
            <a href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946', padding: '6px' }}><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946', padding: '6px' }}><FaLinkedin size={20} /></a>
            <a href="mailto:vyn13217@gmail.com" style={{ color: '#F0C946', padding: '6px' }}><MdEmail size={20} /></a>
          </div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="/Vy Nguyen - Resume.pdf" target="_blank" style={{ padding: '8px 16px', background: 'rgba(240, 201, 70, 0.15)', border: '1px solid rgba(240, 201, 70, 0.3)', borderRadius: '8px', color: '#F0C946', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>Resume</a>
            <a href="/play" style={{ padding: '8px 16px', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '8px', color: '#CBD5E1', fontSize: '12px', fontWeight: 600, textDecoration: 'none' }}>Play Mario Game</a>
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
