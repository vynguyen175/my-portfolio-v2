'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';

export default function Projects() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [imageIndexes, setImageIndexes] = useState<{ [key: number]: number }>({});

  const categoryColors: { [key: string]: string } = {
    'AI / Machine Learning': 'transparent',
    'E-Commerce': 'transparent',
    'Web Application': 'transparent',
    'Data Visualization': 'transparent',
    'Frontend': 'transparent',
    'Backend': 'transparent',
    'Full Stack': 'transparent',
    'Game Development': 'transparent',
  };

  const getCategoryColor = (category: string) => categoryColors[category] || 'transparent';

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '32px' }}>
          <div className="content-backdrop">
            {/* Title */}
          <header style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 className="page-title">
              PROJECTS
            </h1>
            <p className="page-subtitle">
              WHAT I&apos;VE BUILT
            </p>
          </header>

          {/* Projects */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '32px',
            padding: '0 8px',
            marginBottom: '64px',
          }}>
              {projects.map((project, idx) => {
                const isImageRight = idx % 2 !== 0;

                const imageSection = project.images.length > 0 ? (
                  <div style={{
                    flex: '1 1 45%',
                    minWidth: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    borderRight: !isImageRight ? '1px solid var(--border)' : 'none',
                    borderLeft: isImageRight ? '1px solid var(--border)' : 'none',
                  }}>
                    <img
                      src={project.images[imageIndexes[project.id] || 0]}
                      alt={`${project.title} screenshot ${(imageIndexes[project.id] || 0) + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        minHeight: 'clamp(200px, 40vw, 300px)',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                    {project.images.length > 1 && (
                      <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '8px 12px',
                        background: 'rgba(0,0,0,0.8)',
                      }}>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = imageIndexes[project.id] || 0;
                            setImageIndexes({
                              ...imageIndexes,
                              [project.id]: current === 0 ? project.images.length - 1 : current - 1,
                            });
                          }}
                          aria-label="Previous screenshot"
                          style={{
                            background: 'none',
                            border: '2px solid var(--gold)',
                            color: 'var(--gold)',
                            padding: '4px 10px',
                            cursor: 'pointer',
                            fontWeight: 900,
                            fontSize: '14px',
                            borderRadius: '2px',
                          }}
                        >
                          &lt;
                        </button>
                        <span style={{
                          color: 'var(--gold)',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}>
                          {(imageIndexes[project.id] || 0) + 1} / {project.images.length}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            const current = imageIndexes[project.id] || 0;
                            setImageIndexes({
                              ...imageIndexes,
                              [project.id]: current === project.images.length - 1 ? 0 : current + 1,
                            });
                          }}
                          aria-label="Next screenshot"
                          style={{
                            background: 'none',
                            border: '2px solid var(--gold)',
                            color: 'var(--gold)',
                            padding: '4px 10px',
                            cursor: 'pointer',
                            fontWeight: 900,
                            fontSize: '14px',
                            borderRadius: '2px',
                          }}
                        >
                          &gt;
                        </button>
                      </div>
                    )}
                  </div>
                ) : null;

                const contentSection = (
                  <div style={{
                    flex: '1 1 55%',
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}>
                    <div>
                      <h3 style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '20px',
                        fontWeight: 900,
                        color: 'var(--text-primary)',
                        margin: 0,
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {project.title}
                      </h3>

                      <div className="tech-badge" style={{
                        display: 'inline-block',
                        marginBottom: '12px',
                      }}>
                        {project.category}
                      </div>

                      <p style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: '1.6',
                        marginBottom: '8px',
                        fontWeight: 600
                      }}>
                        {project.description}
                      </p>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedProject(expandedProject === project.id ? null : project.id);
                        }}
                        aria-expanded={expandedProject === project.id}
                        className="nav-btn"
                        style={{
                          fontSize: '11px',
                          padding: '5px 12px',
                          marginBottom: '12px',
                        }}
                      >
                        {expandedProject === project.id ? 'Show Less' : 'Full Write-Up'}
                      </button>

                      {expandedProject === project.id && (
                        <div style={{
                          padding: '16px',
                          background: 'var(--surface)',
                          border: '1px solid var(--border)',
                          borderRadius: 'var(--radius-sm)',
                          marginBottom: '12px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '16px',
                        }}>
                          {/* Course & Semester */}
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            <span className="tech-badge" style={{ margin: 0 }}>{project.course}</span>
                            <span className="tech-badge" style={{ margin: 0 }}>{project.semester}</span>
                          </div>

                          {/* Problem Statement */}
                          <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Problem Statement
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                              {project.longDescription}
                            </p>
                          </div>

                          {/* Approach */}
                          <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Approach
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                              {project.approach}
                            </p>
                          </div>

                          {/* Technical Decisions */}
                          <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Technical Decisions
                            </h4>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', lineHeight: 1.7, margin: 0 }}>
                              {project.technicalDecisions}
                            </p>
                          </div>

                          {/* Key Learnings */}
                          <div>
                            <h4 style={{ color: 'var(--text-primary)', fontSize: '12px', fontWeight: 700, marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                              Key Learnings
                            </h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                              {project.keyLearnings.map((learning, li) => (
                                <div key={li} className="focus-item" style={{ margin: 0, fontSize: '12px', padding: '10px 14px' }}>
                                  {learning}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
                          {project.techStack.map((tech, i) => (
                            <span
                              key={tech}
                              className="tech-badge"
                              style={{ animationDelay: `${idx * 0.1 + i * 0.03}s` }}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                      <Link
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button button-github"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        CODE
                      </Link>
                      <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button button-live"
                        aria-label={`View ${project.title} live demo`}
                      >
                        LIVE
                      </Link>
                    </div>
                  </div>
                );

                return (
                  <article
                    key={project.id}
                    className={`project-card${isImageRight ? ' image-right' : ''}`}
                    style={{
                      backgroundColor: getCategoryColor(project.category),
                    }}
                  >
                    {imageSection}
                    {contentSection}
                  </article>
                );
              })}
          </div>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            padding: '48px 16px',
            marginTop: '32px',
          }}>
            <span className="section-footer" style={{ letterSpacing: '2px', textTransform: 'uppercase' }}>
              MORE PROJECTS COMING SOON
            </span>
          </div>
          </div>
        </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
