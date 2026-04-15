'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { projects, Project } from '@/lib/projects';
import ScrollReveal from '@/components/ScrollReveal';

/* ─── Project Card (grid item) ─── */
function ProjectCard({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
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
        onClick={() => onOpen(project)}
        onMouseEnter={() => setHovered(true)}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ y: hovered ? -8 : 0, scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background: 'var(--surface)',
          backdropFilter: 'blur(12px)',
          borderRadius: 20,
          border: '1px solid var(--border)',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: hovered
            ? '0 20px 60px rgba(240, 201, 70, 0.15), 0 0 0 1px rgba(240, 201, 70, 0.2)'
            : '0 4px 24px rgba(0,0,0,0.2)',
          transition: 'box-shadow 0.3s ease, border 0.3s ease, transform 0.15s ease-out',
          transform: `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d' as const,
        }}
      >
        {/* Image */}
        {project.images.length > 0 && (
          <div style={{ width: '100%', aspectRatio: '16/10', overflow: 'hidden', position: 'relative' }}>
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
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.7) 100%)',
            }} />
            {/* Image count badge */}
            {project.images.length > 1 && (
              <span style={{
                position: 'absolute',
                top: 12,
                right: 12,
                padding: '4px 10px',
                background: 'rgba(0,0,0,0.6)',
                backdropFilter: 'blur(8px)',
                borderRadius: 8,
                fontSize: 11,
                fontWeight: 700,
                color: '#fff',
              }}>
                {project.images.length} photos
              </span>
            )}
            {/* Title overlay on image */}
            <div style={{ position: 'absolute', bottom: 16, left: 20, right: 20 }}>
              <h3 style={{
                fontSize: 20,
                fontWeight: 800,
                color: '#fff',
                margin: 0,
                lineHeight: 1.2,
                textShadow: '0 2px 8px rgba(0,0,0,0.4)',
              }}>
                {project.title}
              </h3>
            </div>
          </div>
        )}

        <div style={{ padding: '16px 20px 20px' }}>
          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
            <span style={{
              padding: '3px 10px',
              background: 'rgba(240, 201, 70, 0.15)',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 700,
              color: '#F0C946',
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
              {project.category}
            </span>
            <span style={{
              padding: '3px 10px',
              background: 'var(--surface)',
              borderRadius: 20,
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--section-text-muted)',
            }}>
              {project.semester}
            </span>
          </div>

          <p style={{
            fontSize: 13,
            color: 'var(--section-text-muted)',
            lineHeight: 1.6,
            margin: '0 0 14px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical' as const,
            overflow: 'hidden',
          }}>
            {project.description}
          </p>

          {/* Tech tags — show first 4 */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 14 }}>
            {project.techStack.slice(0, 4).map((tech) => (
              <span key={tech} style={{
                padding: '3px 8px',
                background: 'var(--surface)',
                borderRadius: 6,
                fontSize: 10,
                color: 'var(--section-text-muted)',
                fontWeight: 600,
              }}>
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span style={{
                padding: '3px 8px',
                borderRadius: 6,
                fontSize: 10,
                color: 'var(--section-text-muted)',
                fontWeight: 600,
              }}>
                +{project.techStack.length - 4}
              </span>
            )}
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12 }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 12, fontWeight: 600, color: 'var(--section-text-sub)',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
              >
                <FaGithub size={14} /> Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  fontSize: 12, fontWeight: 600, color: '#F0C946',
                  textDecoration: 'none', transition: 'color 0.2s',
                }}
              >
                <FaExternalLinkAlt size={12} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
}

/* ─── Project Detail Modal ─── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const [imgIdx, setImgIdx] = useState(0);

  const next = useCallback(() => {
    setImgIdx((i) => (i + 1) % project.images.length);
  }, [project.images.length]);

  const prev = useCallback(() => {
    setImgIdx((i) => (i - 1 + project.images.length) % project.images.length);
  }, [project.images.length]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose, next, prev]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 30 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="project-modal-content"
        style={{
          background: 'var(--bg-panel-solid)',
          borderRadius: 24,
          border: '1px solid var(--border)',
          maxWidth: 900,
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          boxShadow: '0 40px 100px rgba(0,0,0,0.5)',
        }}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'sticky',
            top: 16,
            float: 'right',
            marginRight: 16,
            zIndex: 10,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(0,0,0,0.5)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            color: '#fff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FaTimes size={14} />
        </button>

        {/* Image gallery */}
        {project.images.length > 0 && (
          <div style={{ position: 'relative', width: '100%', background: '#000' }}>
            <img
              src={project.images[imgIdx]}
              alt={`${project.title} screenshot ${imgIdx + 1}`}
              style={{
                width: '100%',
                maxHeight: '450px',
                objectFit: 'contain',
                display: 'block',
              }}
            />
            {/* Gallery nav */}
            {project.images.length > 1 && (
              <>
                <button onClick={prev} style={{
                  position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FaChevronLeft size={14} />
                </button>
                <button onClick={next} style={{
                  position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.5)', border: 'none', color: '#fff', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FaChevronRight size={14} />
                </button>
                {/* Dots */}
                <div style={{
                  position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
                  display: 'flex', gap: 6,
                }}>
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      style={{
                        width: i === imgIdx ? 20 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: i === imgIdx ? '#F0C946' : 'rgba(255,255,255,0.4)',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Content */}
        <div style={{ padding: '28px 32px 32px' }}>
          {/* Header */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
            <span style={{
              padding: '4px 12px', background: 'rgba(240, 201, 70, 0.15)', borderRadius: 20,
              fontSize: 11, fontWeight: 700, color: '#F0C946', letterSpacing: 0.5, textTransform: 'uppercase',
            }}>
              {project.category}
            </span>
            <span style={{
              padding: '4px 12px', background: 'var(--surface)', borderRadius: 20,
              fontSize: 11, fontWeight: 600, color: 'var(--section-text-muted)',
            }}>
              {project.semester}
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(24px, 4vw, 36px)',
            fontWeight: 900,
            color: 'var(--section-text)',
            margin: '0 0 8px',
            lineHeight: 1.2,
          }}>
            {project.title}
          </h2>

          <p style={{
            fontSize: 15,
            color: 'var(--section-text-sub)',
            lineHeight: 1.7,
            margin: '0 0 24px',
          }}>
            {project.description}
          </p>

          {/* Links */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, fontSize: 13, fontWeight: 600, color: 'var(--section-text-sub)',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}>
                <FaGithub size={16} /> View Code
              </a>
            )}
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 20px', background: 'rgba(240, 201, 70, 0.15)', border: '1px solid rgba(240, 201, 70, 0.3)',
                borderRadius: 12, fontSize: 13, fontWeight: 600, color: '#F0C946',
                textDecoration: 'none', transition: 'all 0.2s ease',
              }}>
                <FaExternalLinkAlt size={14} /> Live Demo
              </a>
            )}
          </div>

          {/* Tech stack */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
            {project.techStack.map((tech) => (
              <span key={tech} style={{
                padding: '6px 14px', background: 'var(--surface)', borderRadius: 10,
                fontSize: 12, color: 'var(--section-text-sub)', fontWeight: 600,
                border: '1px solid var(--border)',
              }}>
                {tech}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: 'var(--border)', marginBottom: 28 }} />

          {/* Full write-up */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <WriteUpSection title="Problem Statement" content={project.longDescription} />
            <WriteUpSection title="Approach" content={project.approach} />
            <WriteUpSection title="Technical Decisions" content={project.technicalDecisions} />

            <div>
              <h4 style={{
                fontSize: 12, fontWeight: 700, color: '#F0C946',
                margin: '0 0 10px', textTransform: 'uppercase', letterSpacing: 1,
              }}>
                Key Learnings
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {project.keyLearnings.map((learning, i) => (
                  <div key={i} style={{
                    padding: '12px 16px',
                    background: 'rgba(240, 201, 70, 0.06)',
                    border: '1px solid rgba(240, 201, 70, 0.1)',
                    borderRadius: 10,
                    fontSize: 13,
                    color: 'var(--section-text-sub)',
                    lineHeight: 1.6,
                  }}>
                    {learning}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function WriteUpSection({ title, content }: { title: string; content: string }) {
  return (
    <div>
      <h4 style={{
        fontSize: 12, fontWeight: 700, color: '#F0C946',
        margin: '0 0 6px', textTransform: 'uppercase', letterSpacing: 1,
      }}>
        {title}
      </h4>
      <p style={{
        fontSize: 14, color: 'var(--section-text-sub)', lineHeight: 1.7, margin: 0,
      }}>
        {content}
      </p>
    </div>
  );
}

/* ─── Projects Section ─── */
export default function ProjectsSection() {
  const ref = useRef(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
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
          top: 0, left: 0, right: 0, height: 60,
          background: 'repeating-linear-gradient(90deg, #8B4513 0px, #8B4513 58px, #654321 58px, #654321 60px)',
          opacity: 0.15,
        }}
      />

      {/* Floating Mario with star */}
      <motion.div
        style={{
          y: marioY,
          position: 'absolute', top: '8%', right: '3%', zIndex: 5, opacity: 0.25,
        }}
      >
        <img
          src="/sprites/mario-star.png"
          alt="Mario holding a power star"
          style={{
            width: 200, height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(240, 201, 70, 0.3))',
          }}
        />
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <ScrollReveal>
          <div style={{
            display: 'inline-block', padding: '6px 16px',
            background: 'rgba(240, 201, 70, 0.15)', borderRadius: 20,
            fontSize: 13, fontWeight: 700, color: '#F0C946', marginBottom: 12, letterSpacing: 0.5,
          }}>
            Projects
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 900,
            color: 'var(--section-text)', lineHeight: 1.1,
            margin: '0 0 16px', letterSpacing: -1,
          }}>
            Things I&apos;ve{' '}
            <span style={{
              background: 'linear-gradient(135deg, #F0C946, #FFD700, #FF6B6B)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
            }}>built</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p style={{
            fontSize: 16, color: 'var(--section-text-muted)', lineHeight: 1.7,
            maxWidth: 520, margin: '0 0 60px',
          }}>
            A selection of projects spanning web apps, AI/ML, e-commerce, and
            game development. Click any project to see the full write-up.
          </p>
        </ScrollReveal>

        {/* Project grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(340px, 100%), 1fr))',
          gap: 28,
        }}>
          {projects.filter((p) => p.featured).map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onOpen={setSelectedProject}
            />
          ))}
        </div>

        {/* Peach victory GIF */}
        <ScrollReveal delay={0.3}>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '80px' }}>
            <img
              src="/sprites/peach-victory.gif"
              alt="Princess Peach victory pose"
              style={{
                width: 'clamp(200px, 25vw, 350px)', height: 'auto',
                imageRendering: 'pixelated',
                filter: 'drop-shadow(0 10px 30px rgba(240, 201, 70, 0.3))',
              }}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          #projects {
            padding: 80px 20px !important;
          }
        }
        @media (max-width: 480px) {
          #projects {
            padding: 60px 16px !important;
          }
          .project-modal-content {
            border-radius: 16px !important;
          }
          .project-modal-content > div:last-child {
            padding: 20px 16px 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
