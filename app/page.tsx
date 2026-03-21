'use client';

import { useState } from 'react';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';
import { FaGithub, FaLinkedin, FaArrowRight } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import TypeWriter from '@/components/TypeWriter';
import Terminal from '@/components/Terminal';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const featuredProjects = projects.filter(p => [7, 4, 5].includes(p.id));

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', position: 'relative', zIndex: 10 }}>

          {/* === HERO === */}
          <section style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px 16px',
            textAlign: 'center',
            position: 'relative',
          }}>
            <div className="content-backdrop" style={{ maxWidth: '620px', width: '100%' }}>
              <img
                src="/sprites/mario-idle.png"
                alt="Mario"
                style={{
                  height: '56px',
                  objectFit: 'contain',
                  marginBottom: '24px',
                  animation: 'float 3s ease-in-out infinite',
                  opacity: 0.85,
                }}
              />

              <h1 style={{
                color: '#F0C946',
                fontSize: 'clamp(32px, 7vw, 56px)',
                fontWeight: 800,
                margin: '0 0 6px',
                letterSpacing: '-1px',
                lineHeight: 1.1,
                animation: 'glow 4s ease-in-out infinite',
              }}>
                Vy Nguyen
              </h1>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(14px, 3vw, 18px)',
                fontWeight: 500,
                margin: '0 0 20px',
                letterSpacing: '0.5px',
                minHeight: '1.5em',
              }}>
                <TypeWriter
                  words={[
                    'Full-Stack Developer',
                    'AI Enthusiast',
                    'Open Source Contributor',
                    'Problem Solver',
                    'AWS Certified',
                  ]}
                  typingSpeed={70}
                  deletingSpeed={35}
                  pauseDuration={2200}
                />
              </p>

              <p style={{
                color: 'var(--text-secondary)',
                fontSize: 'clamp(13px, 2.5vw, 15px)',
                fontWeight: 400,
                margin: '0 0 32px',
                maxWidth: '440px',
                lineHeight: 1.7,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
                3 years building web apps, AI tools, and cross-platform products. AWS Certified, hackathon winner, open-source contributor. Based in Toronto.
              </p>

              {/* Social */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', justifyContent: 'center' }}>
                <Link href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="GitHub">
                  <FaGithub size={18} />
                </Link>
                <Link href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="LinkedIn">
                  <FaLinkedin size={18} />
                </Link>
                <Link href="mailto:vyn13217@gmail.com" className="social-btn" aria-label="Email">
                  <MdEmail size={18} />
                </Link>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '12px' }}>
                <Link href="/projects" className="nav-btn nav-btn-primary">
                  View Projects
                </Link>
                <Link href="/resume.pdf" target="_blank" className="nav-btn">
                  Resume
                </Link>
                <Link href="/contact" className="nav-btn">
                  Contact
                </Link>
              </div>
              <Link href="/play" className="nav-btn" style={{
                fontSize: '11px',
                padding: '7px 14px',
                opacity: 0.7,
              }}>
                Play Mario Game
              </Link>
            </div>

            <div style={{
              position: 'absolute', bottom: '32px', left: 0, right: 0,
              display: 'flex', justifyContent: 'center',
            }}>
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '12px',
                fontWeight: 500,
                letterSpacing: '1px',
                animation: 'bounce 2.5s ease-in-out infinite',
              }}>
                Scroll down
              </span>
            </div>
          </section>

          {/* === TERMINAL === */}
          <section style={{ padding: '0 16px 80px', maxWidth: '700px', margin: '0 auto' }}>
            <Terminal />
          </section>

          {/* === FEATURED PROJECTS === */}
          <section style={{ padding: '80px 16px', maxWidth: '1100px', margin: '0 auto' }}>
            <div className="content-backdrop">
              <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <h2 className="section-heading" style={{ color: 'var(--gold-text)', marginBottom: '8px' }}>
                  Featured Projects
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  A selection of my recent work
                </p>
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
                gap: '20px',
              }}>
                {featuredProjects.map((project) => (
                  <article key={project.id} className="project-card-home">
                    <div>
                      <h3 style={{
                        fontSize: '16px',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        margin: '0 0 6px',
                      }}>
                        {project.title}
                      </h3>

                      <span style={{
                        display: 'inline-block',
                        background: 'var(--gold-dim)',
                        padding: '2px 8px',
                        borderRadius: '20px',
                        fontSize: '11px',
                        fontWeight: 600,
                        marginBottom: '12px',
                        color: 'var(--gold-text)',
                      }}>
                        {project.category}
                      </span>

                      <p style={{
                        fontSize: '13px',
                        color: 'var(--text-secondary)',
                        lineHeight: 1.6,
                        marginBottom: '16px',
                      }}>
                        {project.description}
                      </p>
                    </div>

                    <div>
                      <div style={{ marginBottom: '14px', display: 'flex', flexWrap: 'wrap', gap: '0' }}>
                        {project.techStack.slice(0, 5).map((tech) => (
                          <span key={tech} className="tech-badge-home">{tech}</span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
                        <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                          className="action-button-home" style={{ background: 'var(--text-primary)', color: '#0B1120' }}>
                          Code
                        </Link>
                        <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                          className="action-button-home" style={{ background: 'var(--gold)', color: '#0B1120' }}>
                          Live Demo
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '32px' }}>
                <Link href="/projects" className="nav-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  View All Projects <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </section>

          {/* === SKILLS === */}
          <section style={{ padding: '0 16px 80px', maxWidth: '1100px', margin: '0 auto' }}>
            <div className="content-backdrop">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h2 className="section-heading" style={{ color: 'var(--gold-text)', marginBottom: '8px' }}>
                  Tech Stack
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>
                  Technologies I work with daily
                </p>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
                {['React', 'Next.js', 'TypeScript', 'Node.js', 'Python', 'PostgreSQL', 'Docker', 'AWS', 'Tailwind CSS', 'Git'].map((skill) => (
                  <span key={skill} className="skill-item" style={{ maxWidth: 'none' }}>
                    {skill}
                  </span>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: '24px' }}>
                <Link href="/skills" className="nav-btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  All Skills <FaArrowRight size={12} />
                </Link>
              </div>
            </div>
          </section>

          {/* === CTA === */}
          <section style={{ padding: '0 16px 80px', maxWidth: '700px', margin: '0 auto' }}>
            <div className="content-backdrop" style={{ textAlign: 'center' }}>
              <h2 className="section-heading" style={{ color: 'var(--gold-text)', marginBottom: '12px' }}>
                Let&apos;s Work Together
              </h2>
              <p style={{
                color: 'var(--text-secondary)',
                fontSize: '14px',
                lineHeight: 1.7,
                maxWidth: '440px',
                margin: '0 auto 28px',
              }}>
                I&apos;m seeking opportunities to build impactful products and grow as a developer. Let&apos;s connect.
              </p>

              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
                <Link href="/contact" className="nav-btn nav-btn-primary">
                  Get in Touch
                </Link>
                <Link href="/resume.pdf" target="_blank" className="nav-btn">
                  Download Resume
                </Link>
              </div>

              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <Link href="https://github.com/vynguyen175" target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="GitHub">
                  <FaGithub size={16} />
                </Link>
                <Link href="https://www.linkedin.com/in/vy-nguyen-71629729b/" target="_blank" rel="noopener noreferrer"
                  className="social-btn" aria-label="LinkedIn">
                  <FaLinkedin size={16} />
                </Link>
                <Link href="mailto:vyn13217@gmail.com" className="social-btn" aria-label="Email">
                  <MdEmail size={16} />
                </Link>
              </div>
            </div>
          </section>

          {/* Easter egg hint */}
          <div style={{
            textAlign: 'center',
            padding: '0 16px 64px',
            maxWidth: '500px',
            margin: '0 auto',
          }}>
            <div className="content-backdrop" style={{ padding: '24px 20px' }}>
              <div style={{
                display: 'flex',
                gap: '6px',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}>
                {['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'].map((key, i) => (
                  <span key={i} style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '32px',
                    height: '32px',
                    background: 'rgba(240, 201, 70, 0.1)',
                    border: '1px solid rgba(240, 201, 70, 0.25)',
                    borderRadius: '6px',
                    color: 'var(--gold-text)',
                    fontSize: '14px',
                    fontWeight: 700,
                    boxShadow: '0 2px 0 rgba(240, 201, 70, 0.15)',
                  }}>
                    {key}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </main>
      </PageTransition>
    </MarioBackground>
  );
}
