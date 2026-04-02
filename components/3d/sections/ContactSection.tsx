'use client';

import GroundPlane from '../objects/GroundPlane';
import Flagpole from '../objects/Flagpole';
import ContentPanel from '../ContentPanel';
import ContactForm from '@/components/ContactForm';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

const SECTION_X = 150;

export default function ContactSection() {
  return (
    <group position={[SECTION_X, 0, 0]}>
      <GroundPlane position={[0, -1, 0]} color="#2D5A27" />

      <mesh position={[0, 8, -25]}><planeGeometry args={[60, 30]} /><meshBasicMaterial color="#FF8C42" /></mesh>

      <mesh position={[10, 3, -6]} castShadow><boxGeometry args={[6, 6, 4]} /><meshStandardMaterial color="#C4A882" /></mesh>
      <mesh position={[10, 6.5, -6]} castShadow><coneGeometry args={[4, 3, 4]} /><meshStandardMaterial color="#E52521" /></mesh>
      <mesh position={[10, 1, -3.9]}><planeGeometry args={[2, 3]} /><meshStandardMaterial color="#2D1810" /></mesh>

      <Flagpole position={[-6, 3, -2]} />

      <pointLight position={[0, 5, 5]} color="#FFB347" intensity={2} distance={20} />
      <pointLight position={[10, 5, -3]} color="#FF6347" intensity={1} distance={15} />

      <ContentPanel position={[-1, 3, 2]} width="420px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>Get In Touch</h2>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>Let&apos;s connect &amp; collaborate</p>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {[
              { icon: FaGithub, url: 'https://github.com/vynguyen175', label: 'GitHub' },
              { icon: FaLinkedin, url: 'https://www.linkedin.com/in/vy-nguyen-71629729b/', label: 'LinkedIn' },
              { icon: MdEmail, url: 'mailto:vyn13217@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, url, label }) => (
              <a key={label} href={url} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 14px',
                background: 'rgba(240, 201, 70, 0.08)', border: '1px solid rgba(240, 201, 70, 0.15)',
                borderRadius: '8px', color: '#F0C946', fontSize: '12px', fontWeight: 600, textDecoration: 'none',
              }}>
                <Icon size={16} />{label}
              </a>
            ))}
          </div>

          <ContactForm />
        </div>
      </ContentPanel>
    </group>
  );
}
