'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChevronDown } from 'react-icons/fa';
import { projects } from '@/lib/projects';
import ScrollReveal from '@/components/ScrollReveal';

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <ScrollReveal delay={0.1 * index} direction={index % 2 === 0 ? 'left' : 'right'}>
      <motion.div
        ref={cardRef}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          y: hovered ? -8 : 0,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--surface)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
          border: `1px solid ${expanded ? 'rgba(240, 201, 70, 0.3)' : 'var(--border)'}`,
          overflow: 'hidden',
          boxShadow: hovered
            ? '0 20px 60px rgba(240, 201, 70, 0.15), 0 0 0 1px rgba(240, 201, 70, 0.2)'
            : '0 4px 24px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.3s ease, border 0.3s ease, transform 0.15s ease-out',
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d' as const,
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
          <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
            <span
              style={{
                display: 'inline-block',
                padding: '4px 12px',
                background: 'rgba(240, 201, 70, 0.15)',
                borderRadius: 20,
                fontSize: 11,
                fontWeight: 700,
                color: '#F0C946',
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}
            >
              {project.category}
            </span>
            <span style={{
              padding: '4px 12px',
              background: 'var(--surface)',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--section-text-muted)',
            }}>
              {project.semester}
            </span>
          </div>

          <h3
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: 'var(--section-text)',
              margin: '0 0 8px',
              lineHeight: 1.2,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontSize: 14,
              color: 'var(--section-text-muted)',
              lineHeight: 1.6,
              margin: '0 0 16px',
            }}
          >
            {project.description}
          </p>

          {/* Expand/collapse button */}
          <button
            onClick={() => setExpanded(!expanded)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 14px',
              background: expanded ? 'rgba(240, 201, 70, 0.15)' : 'var(--surface)',
              border: `1px solid ${expanded ? 'rgba(240, 201, 70, 0.3)' : 'var(--border)'}`,
              borderRadius: 10,
              fontSize: 12,
              fontWeight: 600,
              color: expanded ? '#F0C946' : 'var(--section-text-sub)',
              cursor: 'pointer',
              marginBottom: 16,
              transition: 'all 0.2s ease',
            }}
          >
            {expanded ? 'Show Less' : 'Full Write-Up'}
            <motion.span
              animate={{ rotate: expanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              style={{ display: 'flex' }}
            >
              <FaChevronDown size={10} />
            </motion.span>
          </button>

          {/* Expandable details */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                style={{ overflow: 'hidden', marginBottom: 16 }}
              >
                <div style={{
                  padding: '16px',
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 14,
                }}>
                  {/* Problem Statement */}
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 700, color: '#F0C946', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Problem Statement
                    </h4>
                    <p style={{ fontSize: 13, color: 'var(--section-text-sub)', lineHeight: 1.6, margin: 0 }}>
                      {project.longDescription}
                    </p>
                  </div>

                  {/* Approach */}
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 700, color: '#F0C946', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Approach
                    </h4>
                    <p style={{ fontSize: 13, color: 'var(--section-text-sub)', lineHeight: 1.6, margin: 0 }}>
                      {project.approach}
                    </p>
                  </div>

                  {/* Technical Decisions */}
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 700, color: '#F0C946', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Technical Decisions
                    </h4>
                    <p style={{ fontSize: 13, color: 'var(--section-text-sub)', lineHeight: 1.6, margin: 0 }}>
                      {project.technicalDecisions}
                    </p>
                  </div>

                  {/* Key Learnings */}
                  <div>
                    <h4 style={{ fontSize: 11, fontWeight: 700, color: '#F0C946', margin: '0 0 4px', textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      Key Learnings
                    </h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                      {project.keyLearnings.map((learning, i) => (
                        <div key={i} style={{
                          padding: '8px 12px',
                          background: 'rgba(240, 201, 70, 0.06)',
                          border: '1px solid rgba(240, 201, 70, 0.1)',
                          borderRadius: 8,
                          fontSize: 12,
                          color: 'var(--section-text-sub)',
                          lineHeight: 1.5,
                        }}>
                          {learning}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tech tags */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 6,
              marginBottom: 20,
            }}
          >
            {project.techStack.map((tech) => (
              <span
                key={tech}
                style={{
                  padding: '4px 10px',
                  background: 'var(--surface)',
                  borderRadius: 8,
                  fontSize: 11,
                  color: 'var(--section-text-muted)',
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
                  color: 'var(--section-text-sub)',
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
        background: 'var(--projects-bg)',
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
          alt="Mario holding a power star"
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
              color: 'var(--section-text)',
              lineHeight: 1.1,
              margin: '0 0 16px',
              letterSpacing: -1,
            }}
          >
            Things I&apos;ve{' '}
            <span style={{
              background: 'linear-gradient(135deg, #F0C946, #FFD700, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>built</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            style={{
              fontSize: 16,
              color: 'var(--section-text-muted)',
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
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
            gap: 28,
          }}
        >
          {projects.filter((p) => p.featured).map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Peach victory GIF */}
        <ScrollReveal delay={0.3}>
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '80px',
          }}>
            <img
              src="/sprites/peach-victory.gif"
              alt="Princess Peach victory pose"
              style={{
                width: 'clamp(200px, 25vw, 350px)',
                height: 'auto',
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 10px 30px rgba(240, 201, 70, 0.3))',
              }}
            />
          </div>
        </ScrollReveal>
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
        @media (max-width: 480px) {
          #projects {
            padding: 60px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
