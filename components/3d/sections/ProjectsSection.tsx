'use client';

import { useState } from 'react';
import GroundPlane from '../objects/GroundPlane';
import Torch from '../objects/Torch';
import ContentPanel from '../ContentPanel';
import { projects } from '@/lib/projects';

const SECTION_X = 60;

function ProjectCard({ project, isActive, onClick }: {
  project: typeof projects[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <div onClick={onClick} style={{
      padding: '14px',
      background: isActive ? 'rgba(240, 201, 70, 0.12)' : 'rgba(255, 255, 255, 0.03)',
      border: `1px solid ${isActive ? 'rgba(240, 201, 70, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
      borderRadius: '10px', cursor: 'pointer', transition: 'all 0.2s ease',
    }}>
      <h4 style={{ color: '#E2E8F0', fontSize: '14px', fontWeight: 700, margin: '0 0 4px' }}>{project.title}</h4>
      <span style={{ display: 'inline-block', padding: '2px 8px', background: 'rgba(240, 201, 70, 0.1)', borderRadius: '12px', fontSize: '10px', color: '#F0C946', fontWeight: 600, marginBottom: '6px' }}>{project.category}</span>
      <p style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.5, margin: 0 }}>{project.description}</p>
      {isActive && (
        <div style={{ marginTop: '10px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '10px' }}>
            {project.techStack.slice(0, 5).map(tech => (
              <span key={tech} style={{ padding: '2px 6px', background: 'rgba(255, 255, 255, 0.06)', borderRadius: '4px', fontSize: '10px', color: '#94A3B8' }}>{tech}</span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 600, background: '#E2E8F0', color: '#0B1120', borderRadius: '6px', textDecoration: 'none' }}>Code</a>
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ padding: '5px 10px', fontSize: '11px', fontWeight: 600, background: '#F0C946', color: '#0B1120', borderRadius: '6px', textDecoration: 'none' }}>Live Demo</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<number | null>(null);

  return (
    <group position={[SECTION_X, 0, 0]}>
      <GroundPlane position={[0, -1, 0]} color="#6B5B3D" />

      <mesh position={[0, 4, -8]} castShadow><boxGeometry args={[30, 10, 1]} /><meshStandardMaterial color="#8B7355" roughness={0.9} /></mesh>

      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <mesh key={`brick-${row}-${col}`} position={[-13.5 + col * 3 + (row % 2 ? 1.5 : 0), row * 2, -7.4]}>
            <boxGeometry args={[2.8, 1.8, 0.2]} />
            <meshStandardMaterial color={row % 2 === col % 2 ? '#7A6845' : '#8B7355'} />
          </mesh>
        ))
      )}

      <mesh position={[0, -1.5, 5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[35, 10]} />
        <meshStandardMaterial color="#FF4500" emissive="#FF2200" emissiveIntensity={0.5} transparent opacity={0.6} />
      </mesh>

      <Torch position={[-8, 1, -6]} />
      <Torch position={[-3, 1, -6]} />
      <Torch position={[3, 1, -6]} />
      <Torch position={[8, 1, -6]} />

      <ContentPanel position={[0, 3, 2]} width="460px">
        <div>
          <h2 style={{ color: '#F0C946', fontSize: '24px', fontWeight: 800, margin: '0 0 4px' }}>Projects</h2>
          <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>Click a project to expand details</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '400px', overflowY: 'auto' }}>
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} isActive={activeProject === project.id} onClick={() => setActiveProject(activeProject === project.id ? null : project.id)} />
            ))}
          </div>
        </div>
      </ContentPanel>
    </group>
  );
}
