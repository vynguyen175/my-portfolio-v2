'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';
import { FaGithub, FaLinkedin, FaDownload } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const featuredProjects = projects.filter(p => [7, 4, 5].includes(p.id));

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>

          {/* === HERO SECTION === */}
          <section
            aria-label="Introduction"
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '24px 16px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <div className="content-backdrop" style={{ maxWidth: '600px', width: '100%' }}>
              {/* Mario sprite */}
              <img
                src="/sprites/mario-idle.png"
                alt="Mario pixel art character"
                style={{
                  height: '72px',
                  objectFit: 'contain',
                  marginBottom: '20px',
                  animation: 'float 2s ease-in-out infinite',
                }}
              />

              {/* Name */}
              <h1 style={{
                color: '#FFD700',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(36px, 8vw, 64px)',
                fontWeight: 900,
                margin: 0,
                marginBottom: '8px',
                letterSpacing: '3px',
                animation: 'glow 3s ease-in-out infinite',
              }}>
                VY NGUYEN
              </h1>

              {/* Title */}
              <p style={{
                color: '#FFF',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(15px, 3.5vw, 22px)',
                fontWeight: 700,
                margin: 0,
                marginBottom: '12px',
                textShadow: '2px 2px 0px rgba(0,0,0,0.3)',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}>
                FULL-STACK DEVELOPER
              </p>

              {/* Tagline */}
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(13px, 2.5vw, 15px)',
                fontWeight: 500,
                margin: 0,
                marginBottom: '28px',
                textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                maxWidth: '460px',
                lineHeight: '1.6',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                Full-stack developer with 3 years of hands-on experience building web apps, AI tools, and everything in between. AWS Certified, hackathon winner, and open-source contributor based in Toronto.
              </p>

              {/* Social links */}
              <nav aria-label="Social links" style={{ display: 'flex', gap: '10px', marginBottom: '24px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer"
                  className="social-btn" style={{ backgroundColor: '#FFD700' }} aria-label="GitHub profile">
                  <FaGithub size={22} />
                </Link>
                <Link href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer"
                  className="social-btn" style={{ backgroundColor: '#4ECDC4' }} aria-label="LinkedIn profile">
                  <FaLinkedin size={22} />
                </Link>
                <Link href="mailto:vyn13217@gmail.com"
                  className="social-btn" style={{ backgroundColor: '#FF6B6B' }} aria-label="Send email">
                  <MdEmail size={22} />
                </Link>
              </nav>

              {/* Navigation buttons */}
              <nav aria-label="Main navigation" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '16px' }}>
                <Link href="/projects" className="nav-btn" style={{ backgroundColor: '#FFD700' }}>Projects</Link>
                <Link href="/skills" className="nav-btn" style={{ backgroundColor: '#4ECDC4' }}>Skills</Link>
                <Link href="/about" className="nav-btn" style={{ backgroundColor: '#FF6B6B' }}>About</Link>
                <Link href="/contact" className="nav-btn" style={{ backgroundColor: '#A8E6CF' }}>Contact</Link>
              </nav>

              {/* Resume download */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <Link href="/resume.pdf" target="_blank" className="nav-btn" style={{
                  backgroundColor: '#FFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <FaDownload size={14} />
                  Resume
                </Link>
                <Link href="/play" className="nav-btn" style={{
                  backgroundColor: 'transparent',
                  color: '#FFD700',
                  border: '3px solid #FFD700',
                  fontSize: '12px',
                }}>
                  Play Mario Game
                </Link>
              </div>
            </div>

            {/* Scroll indicator */}
            <div style={{
              position: 'absolute',
              bottom: '32px',
              left: 0,
              right: 0,
              display: 'flex',
              justifyContent: 'center',
            }}>
              <span style={{
                color: 'rgba(255,255,255,0.6)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                animation: 'bounce 2s ease-in-out infinite',
              }}>
                SCROLL DOWN
              </span>
            </div>
          </section>

          {/* === FEATURED PROJECTS === */}
          <section
            aria-label="Featured projects"
            style={{
              padding: '64px 16px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div className="content-backdrop">
              <h2 style={{
                color: '#FFD700',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: 900,
                textAlign: 'center',
                marginBottom: '40px',
                textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
                letterSpacing: '2px',
              }}>
                FEATURED PROJECTS
              </h2>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                gap: '24px',
              }}>
                {featuredProjects.map((project) => (
                  <article key={project.id} className="project-card-home">
                    <div>
                      <h3 style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '17px',
                        fontWeight: 900,
                        color: '#000',
                        margin: 0,
                        marginBottom: '8px',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                      }}>
                        {project.title}
                      </h3>

                      <div style={{
                        display: 'inline-block',
                        backgroundColor: 'rgba(255,255,255,0.7)',
                        border: '2px solid #000',
                        padding: '3px 8px',
                        borderRadius: '3px',
                        fontSize: '11px',
                        fontWeight: 700,
                        marginBottom: '12px',
                        boxShadow: '2px 2px 0px rgba(0,0,0,0.15)',
                      }}>
                        {project.category}
                      </div>

                      <p style={{
                        fontSize: '13px',
                        color: '#000',
                        lineHeight: '1.6',
                        marginBottom: '16px',
                        fontWeight: 600,
                      }}>
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0' }}>
                          {project.techStack.slice(0, 5).map((tech) => (
                            <span key={tech} className="tech-badge-home">{tech}</span>
                          ))}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="action-button-home" style={{ background: '#000', color: '#FFD700' }}>
                          CODE
                        </Link>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="action-button-home" style={{ background: '#4ECDC4', color: '#000' }}>
                          LIVE
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/projects" className="nav-btn" style={{ backgroundColor: '#FFD700' }}>
                  VIEW ALL PROJECTS
                </Link>
              </div>
            </div>
          </section>

          {/* === SKILLS PREVIEW === */}
          <section
            aria-label="Skills overview"
            style={{
              padding: '64px 16px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div className="content-backdrop">
              <h2 style={{
                color: '#FFD700',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: 900,
                textAlign: 'center',
                marginBottom: '32px',
                textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
                letterSpacing: '2px',
              }}>
                SKILLS
              </h2>

              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
              }}>
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS', 'Git'].map((skill) => (
                  <span key={skill} style={{
                    backgroundColor: '#FFF',
                    border: '3px solid #000',
                    padding: '10px 18px',
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '13px',
                    fontWeight: 700,
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.25)',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '28px' }}>
                <Link href="/skills" className="nav-btn" style={{ backgroundColor: '#4ECDC4' }}>
                  ALL SKILLS
                </Link>
              </div>
            </div>
          </section>

          {/* === CTA / CONTACT === */}
          <section
            aria-label="Contact"
            style={{
              padding: '64px 16px',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            <div className="content-backdrop" style={{ textAlign: 'center' }}>
              <h2 style={{
                color: '#FFD700',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(26px, 5vw, 40px)',
                fontWeight: 900,
                marginBottom: '16px',
                textShadow: '3px 3px 0px rgba(0,0,0,0.3)',
                letterSpacing: '2px',
              }}>
                LET&apos;S WORK TOGETHER
              </h2>
              <p style={{
                color: 'rgba(255,255,255,0.9)',
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(13px, 2.5vw, 16px)',
                fontWeight: 500,
                marginBottom: '28px',
                textShadow: '1px 1px 0px rgba(0,0,0,0.3)',
                maxWidth: '460px',
                margin: '0 auto 28px',
                lineHeight: '1.6',
              }}>
                I&apos;m seeking opportunities where I can contribute to impactful products and grow as a developer. Let&apos;s build something great together.
              </p>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Link href="/contact" className="nav-btn" style={{ backgroundColor: '#FF6B6B' }}>
                  GET IN TOUCH
                </Link>
                <Link href="/resume.pdf" target="_blank" className="nav-btn" style={{
                  backgroundColor: '#FFF',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                }}>
                  <FaDownload size={14} />
                  Resume
                </Link>
              </div>

              {/* Social links footer */}
              <nav aria-label="Social links" style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Link href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer"
                  className="social-btn" style={{ backgroundColor: '#FFD700' }} aria-label="GitHub profile">
                  <FaGithub size={20} />
                </Link>
                <Link href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer"
                  className="social-btn" style={{ backgroundColor: '#4ECDC4' }} aria-label="LinkedIn profile">
                  <FaLinkedin size={20} />
                </Link>
                <Link href="mailto:vyn13217@gmail.com"
                  className="social-btn" style={{ backgroundColor: '#FF6B6B' }} aria-label="Send email">
                  <MdEmail size={20} />
                </Link>
              </nav>
            </div>
          </section>

        </main>
      </PageTransition>
    </MarioBackground>
  );
}
