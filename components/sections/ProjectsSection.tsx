'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import { projects } from '@/lib/projects';
import ScrollReveal from '@/components/ScrollReveal';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <ScrollReveal delay={0.1 * index} direction={index % 2 === 0 ? 'left' : 'right'}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        animate={{
          y: hovered ? -8 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
          border: '1px solid rgba(255,255,255,0.1)',
          overflow: 'hidden',
          boxShadow: hovered
            ? '0 20px 60px rgba(240, 201, 70, 0.15), 0 0 0 1px rgba(240, 201, 70, 0.2)'
            : '0 4px 24px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.3s ease',
        }}
      >
        {/* Image preview */}
        {project.images.length > 0 && (
          <div
            style={{
              width: '100%',
              height: 200,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <img
              src={project.images[0]}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                transform: hovered ? 'scale(1.05)' : 'scale(1)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, transparent 50%, rgba(26,26,46,0.8) 100%)',
              }}
            />
          </div>
        )}

        <div style={{ padding: '24px 28px' }}>
          {/* Category badge */}
          <div
            style={{
              display: 'inline-block',
              padding: '4px 12px',
              background: 'rgba(240, 201, 70, 0.15)',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              color: '#F0C946',
              marginBottom: 12,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}
          >
            {project.category}
          </div>

          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: '#fff',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: 14,
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.6,
              margin: '0 0 16px',
            }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginBottom: 20,
            }}
          >
            {project.techStack.slice(0, 5).map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '4px 10px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 8,
                  fontSize: 11,
                  color: 'rgba(255,255,255,0.5)',
                  fontWeight: 600,
                }}
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'rgba(255,255,255,0.7)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                <FaGithub size={16} />
                Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#F0C946',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
              >
                <FaExternalLinkAlt size={14} />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      ref={ref}
      id="projects"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #1a1a2e 0%, #0B1120 50%, #0D0D1F 100%)',
        padding: '120px 40px',
      }}
    >
      {/* Brick pattern decoration */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 58px, #654321 58px, #654321 60px)',
          opacity: 0.15,
        }}
      />

      {/* Floating Mario with star */}
      <motion.div
        style={{
          y: marioY,
          position: 'absolute',
          top: '8%',
          right: '3%',
          zIndex: 5,
          opacity: 0.25,
        }}
      >
        <img
          src="/sprites/mario-star.png"
          alt=""
          style={{
            width: 200,
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(240, 201, 70, 0.3))',
          }}
        />
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <ScrollReveal>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(240, 201, 70, 0.15)',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              color: '#F0C946',
              marginBottom: 12,
              letterSpacing: 0.5,
            }}
          >
            Projects
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 900,
              color: '#fff',
              lineHeight: 1.1,
              margin: '0 0 16px',
              letterSpacing: -1,
            }}
          >
            Things I&apos;ve{' '}
            <span style={{ color: '#F0C946' }}>built</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.5)',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 0 60px',
            }}
          >
            A selection of projects spanning web apps, AI/ML, e-commerce, and
            game development. Each one taught me something new.
          </p>
        </ScrollReveal>

        {/* Project grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: 28,
          }}
        >
          {projects.filter((p) => p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #projects {
            padding: 80px 20px !important;
          }
          #projects > div > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
