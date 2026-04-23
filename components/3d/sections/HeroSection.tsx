'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import GroundPlane from '../objects/GroundPlane';
import FloatingCloud from '../objects/FloatingCloud';
import QuestionBlock from '../objects/QuestionBlock';
import WarpPipe from '../objects/WarpPipe';
import ContentPanel from '../ContentPanel';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import * as THREE from 'three';

const SECTION_X = 0;

function FloatingCoin({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.elapsedTime * 3;
      ref.current.position.y = position[1] + Math.sin(clock.elapsedTime * 1.5 + position[0]) * 0.3;
    }
  });
  return (
    <mesh ref={ref} position={position} castShadow>
      <cylinderGeometry args={[0.3, 0.3, 0.06, 16]} />
      <meshStandardMaterial color="#FFD700" emissive="#F0C946" emissiveIntensity={0.6} metalness={0.9} roughness={0.1} />
    </mesh>
  );
}

export default function HeroSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      <GroundPlane position={[0, -1, 0]} color="#228B22" />

      {/* Rolling hills - smoother and more varied */}
      <mesh position={[-5, -0.3, -3]} castShadow>
        <sphereGeometry args={[3, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#2EA82E" />
      </mesh>
      <mesh position={[8, -0.5, -5]} castShadow>
        <sphereGeometry args={[4, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#1E8C1E" />
      </mesh>
      <mesh position={[-12, -0.4, -6]} castShadow>
        <sphereGeometry args={[5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#25A025" />
      </mesh>
      <mesh position={[14, -0.6, -7]} castShadow>
        <sphereGeometry args={[3.5, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#1A7A1A" />
      </mesh>
      <mesh position={[0, -0.8, -8]} castShadow>
        <sphereGeometry args={[6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshToonMaterial color="#1B8B1B" />
      </mesh>

      {/* Clouds at different depths */}
      <FloatingCloud position={[-8, 8, -10]} scale={1.5} speed={0.2} />
      <FloatingCloud position={[5, 10, -15]} scale={2} speed={0.15} />
      <FloatingCloud position={[12, 7, -8]} scale={1} speed={0.25} />
      <FloatingCloud position={[-14, 9, -18]} scale={2.5} speed={0.1} />
      <FloatingCloud position={[0, 11, -20]} scale={1.8} speed={0.12} />
      <FloatingCloud position={[15, 12, -22]} scale={1.3} speed={0.18} />

      {/* Floating coins */}
      <FloatingCoin position={[-6, 3, -1]} />
      <FloatingCoin position={[6, 3.5, -2]} />
      <FloatingCoin position={[10, 2.5, 0]} />

      <QuestionBlock position={[-3, 4, -2]} />
      <QuestionBlock position={[0, 5, -3]} />
      <QuestionBlock position={[3, 4.5, -2]} />

      <WarpPipe position={[13, 0, 2]} />

      <ContentPanel position={[0, 3, 2]} width="380px">
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ color: '#F0C946', fontSize: '36px', fontWeight: 800, margin: '0 0 4px', letterSpacing: '-1px' }}>
            Vy Nguyen
          </h1>
          <p style={{ color: '#94A3B8', fontSize: '14px', fontWeight: 500, margin: '0 0 16px' }}>
            Full-Stack Developer &bull; AI Enthusiast &bull; Toronto
          </p>
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 20px' }}>
            3 years building web apps, AI tools, and cross-platform products. AWS Certified, hackathon winner.
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
