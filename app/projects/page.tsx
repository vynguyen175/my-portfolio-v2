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
    'AI / Machine Learning': '#FFFF00',
    'E-Commerce': '#FFFF00',
    'Web Application': '#FFFF00',
    'Data Visualization': '#FFFF00',
    'Frontend': '#FFFF00',
    'Backend': '#FFFF00',
    'Full Stack': '#FFFF00',
    'Game Development': '#FFFF00',
  };

  const getCategoryColor = (category: string) => categoryColors[category] || '#FFFF00';

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
            <h1 style={{
              textShadow: '0 0 20px rgba(255, 255, 0, 0.6), 6px 6px 0px rgba(0,0,0,0.4)',
              color: '#FFFF00',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 'clamp(32px, 6vw, 56px)',
              fontWeight: 900,
              margin: 0,
              marginBottom: '8px',
              letterSpacing: '3px',
              textTransform: 'uppercase'
            }}>
              PROJECTS
            </h1>
            <p style={{
              color: '#FFFF00',
              textShadow: '0 0 10px rgba(255, 255, 0, 0.5), 2px 2px 0px rgba(0,0,0,0.3)',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: 'clamp(14px, 3vw, 18px)',
              fontWeight: 700,
              margin: 0,
              letterSpacing: '2px',
              textTransform: 'uppercase'
            }}>
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
                    borderRight: !isImageRight ? '4px solid #000' : 'none',
                    borderLeft: isImageRight ? '4px solid #000' : 'none',
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
                            border: '2px solid #FFD700',
                            color: '#FFD700',
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
                          color: '#FFD700',
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
                            border: '2px solid #FFD700',
                            color: '#FFD700',
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
                        color: '#000',
                        margin: 0,
                        marginBottom: '8px',
                        textShadow: '2px 2px 0px rgba(0,0,0,0.1)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}>
                        {project.title}
                      </h3>

                      <div style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        border: '2px solid #000',
                        padding: '4px 8px',
                        borderRadius: '2px',
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '11px',
                        fontWeight: 700,
                        marginBottom: '12px',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.2)'
                      }}>
                        {project.category}
                      </div>

                      <p style={{
                        fontSize: '13px',
                        color: '#000',
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
                        style={{
                          background: 'rgba(0,0,0,0.1)',
                          border: '2px solid #000',
                          padding: '4px 10px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                          borderRadius: '2px',
                          marginBottom: '12px',
                          transition: 'all 0.2s ease',
                          boxShadow: '2px 2px 0px rgba(0,0,0,0.15)',
                        }}
                      >
                        {expandedProject === project.id ? 'SHOW LESS' : 'READ MORE'}
                      </button>

                      {expandedProject === project.id && (
                        <p style={{
                          fontSize: '12px',
                          color: '#000',
                          lineHeight: '1.7',
                          marginBottom: '12px',
                          fontWeight: 500,
                          padding: '12px',
                          background: 'rgba(255,255,255,0.5)',
                          border: '2px solid #000',
                          borderRadius: '2px',
                        }}>
                          {project.longDescription}
                        </p>
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
