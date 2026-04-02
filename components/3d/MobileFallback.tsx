'use client';

import { useRef, useState, useEffect } from 'react';
import MobileSectionCard from './MobileSectionCard';
import ContactForm from '@/components/ContactForm';
import { projects } from '@/lib/projects';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { SECTIONS } from './NavigationContext';

export default function MobileFallback() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.clientWidth;
      const idx = Math.round(scrollLeft / width);
      setCurrentIndex(idx);
      window.history.replaceState(null, '', `#${SECTIONS[idx]?.id || 'hero'}`);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0B1120' }}>
      {/* Nav dots */}
      <nav style={{
        position: 'fixed', top: '12px', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', gap: '6px', padding: '6px 12px',
        background: 'rgba(11, 17, 32, 0.8)', backdropFilter: 'blur(8px)',
        borderRadius: '20px', border: '1px solid rgba(240, 201, 70, 0.15)', zIndex: 100,
      }}>
        {SECTIONS.map((section, i) => (
          <button key={section.id}
            onClick={() => { containerRef.current?.scrollTo({ left: i * window.innerWidth, behavior: 'smooth' }); }}
            style={{
              width: '8px', height: '8px', borderRadius: '50%', border: 'none', cursor: 'pointer',
              background: i === currentIndex ? '#F0C946' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </nav>

      {/* Horizontal scroll container */}
      <div ref={containerRef} style={{
        width: '100vw', height: '100vh', display: 'flex',
        overflowX: 'auto', overflowY: 'hidden',
        scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch',
      }}>
        {/* Hero */}
        <MobileSectionCard title="Vy Nguyen" subtitle="Full-Stack Developer" bgGradient="linear-gradient(135deg, #0B1120, #1A3A5C)">
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 16px' }}>
            3 years building web apps, AI tools, and cross-platform products. AWS Certified, hackathon winner, open-source contributor. Based in Toronto.
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            <a href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaGithub size={22} /></a>
            <a href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaLinkedin size={22} /></a>
            <a href="mailto:vyn13217@gmail.com" style={{ color: '#F0C946' }}><MdEmail size={22} /></a>
          </div>
        </MobileSectionCard>

        {/* About */}
        <MobileSectionCard title="About Me" bgGradient="linear-gradient(135deg, #1A0A2E, #4A1942)">
          <p style={{ color: '#CBD5E1', fontSize: '13px', lineHeight: 1.7, margin: '0 0 12px' }}>
            I started coding 3 years ago and haven&apos;t stopped since. What began as curiosity turned into a passion for building real applications.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {['Full-Stack Dev', 'AI & ML', 'UI/UX Design'].map(item => (
              <div key={item} style={{
                padding: '8px 12px', background: 'rgba(240, 201, 70, 0.08)',
                border: '1px solid rgba(240, 201, 70, 0.15)', borderRadius: '8px',
                fontSize: '12px', color: '#F0C946', fontWeight: 600,
              }}>{item}</div>
            ))}
          </div>
        </MobileSectionCard>

        {/* Projects */}
        <MobileSectionCard title="Projects" subtitle="What I've Built" bgGradient="linear-gradient(135deg, #1A0A0A, #3A1A0A)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {projects.slice(0, 4).map(project => (
              <div key={project.id} style={{
                padding: '12px', background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '10px',
              }}>
                <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 4px' }}>{project.title}</h4>
                <p style={{ color: '#94A3B8', fontSize: '11px', lineHeight: 1.5, margin: '0 0 8px' }}>{project.description}</p>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, background: '#E2E8F0', color: '#0B1120', borderRadius: '6px', textDecoration: 'none' }}>Code</a>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                    style={{ padding: '4px 10px', fontSize: '10px', fontWeight: 600, background: '#F0C946', color: '#0B1120', borderRadius: '6px', textDecoration: 'none' }}>Live</a>
                </div>
              </div>
            ))}
          </div>
        </MobileSectionCard>

        {/* Skills */}
        <MobileSectionCard title="Power Up" subtitle="Collect All Skills" bgGradient="linear-gradient(135deg, #0D0520, #1A0A2E)">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'C#', 'PostgreSQL', 'MongoDB', 'Docker', 'AWS', 'Git', 'Tailwind CSS', 'TensorFlow', 'Pandas'].map(skill => (
              <span key={skill} style={{
                padding: '6px 10px', background: 'rgba(240, 201, 70, 0.08)',
                border: '1px solid rgba(240, 201, 70, 0.15)', borderRadius: '8px',
                fontSize: '11px', color: '#CBD5E1', fontWeight: 500,
              }}>{skill}</span>
            ))}
          </div>
        </MobileSectionCard>

        {/* Credentials */}
        <MobileSectionCard title="Credentials" bgGradient="linear-gradient(135deg, #050515, #0A0A2A)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>George Brown College</h4>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Advanced Diploma in CPA | GPA: 3.7</p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>AWS Certified Cloud Practitioner</h4>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Amazon Web Services — 2025</p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px' }}>
              <h4 style={{ color: '#E2E8F0', fontSize: '13px', fontWeight: 700, margin: '0 0 2px' }}>Microsoft Hackathon — Top 10</h4>
              <p style={{ color: '#94A3B8', fontSize: '11px', margin: 0 }}>Led team of 4, placed top 10/50</p>
            </div>
          </div>
        </MobileSectionCard>

        {/* Contact */}
        <MobileSectionCard title="Get In Touch" subtitle="Let's connect" bgGradient="linear-gradient(135deg, #1A0A0A, #3A1510)">
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', justifyContent: 'center' }}>
            <a href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaGithub size={20} /></a>
            <a href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer" style={{ color: '#F0C946' }}><FaLinkedin size={20} /></a>
            <a href="mailto:vyn13217@gmail.com" style={{ color: '#F0C946' }}><MdEmail size={20} /></a>
          </div>
          <ContactForm />
        </MobileSectionCard>
      </div>
    </div>
  );
}
