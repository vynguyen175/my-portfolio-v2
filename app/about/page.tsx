'use client';

import { useState } from 'react';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';

export default function About() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '32px' }}>
          <div className="content-backdrop" style={{ marginBottom: '32px' }}>
            {/* Title */}
          <header style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 className="page-title">ABOUT ME</h1>
            <p className="page-subtitle">FULL-STACK DEVELOPER & AI ENTHUSIAST</p>
          </header>

          {/* Top 3 Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: '24px',
            padding: '0 8px',
            marginBottom: '24px'
          }}>
            {/* Who I Am Card */}
            <section
              className="about-card"
              style={{
                backgroundColor: '#FF6B6B',
                padding: '24px',
                animationDelay: '0s'
              }}
            >
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                marginBottom: '16px',
                textShadow: '1px 1px 0px rgba(255,255,255,0.4)',
                letterSpacing: '0.5px'
              }}>
                WHO I AM
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#000',
                lineHeight: '1.6',
                margin: 0,
                fontWeight: 500
              }}>
                I started coding 3 years ago and haven&apos;t stopped since. What began as curiosity turned into a passion for building real applications - from full-stack web apps and mobile platforms to AI-powered tools. Based in Toronto with an AWS certification, hackathon wins, and 7+ deployed projects, I bring energy, drive, and a strong portfolio to every team I join.
              </p>
            </section>

            {/* My Focus Card */}
            <section
              className="about-card"
              style={{
                backgroundColor: '#4ECDC4',
                padding: '24px',
                animationDelay: '0.1s'
              }}
            >
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                marginBottom: '16px',
                textShadow: '1px 1px 0px rgba(255,255,255,0.4)',
                letterSpacing: '0.5px'
              }}>
                MY FOCUS
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="focus-item" style={{ animationDelay: '0.1s' }}>
                  <strong>Full-Stack Dev:</strong> Modern frameworks & technologies
                </span>
                <span className="focus-item" style={{ animationDelay: '0.13s' }}>
                  <strong>AI & ML:</strong> Intelligent systems & data-driven apps
                </span>
                <span className="focus-item" style={{ animationDelay: '0.16s' }}>
                  <strong>UI/UX Design:</strong> Intuitive & beautiful experiences
                </span>
                <span className="focus-item" style={{ animationDelay: '0.19s' }}>
                  <strong>Data Science:</strong> Analytics & recommendation systems
                </span>
              </div>
            </section>

            {/* What I Value Card */}
            <section
              className="about-card"
              style={{
                backgroundColor: '#A8E6CF',
                padding: '24px',
                animationDelay: '0.2s'
              }}
            >
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                marginBottom: '16px',
                textShadow: '1px 1px 0px rgba(255,255,255,0.4)',
                letterSpacing: '0.5px'
              }}>
                WHAT I VALUE
              </h2>
              <p style={{
                fontSize: '14px',
                color: '#000',
                lineHeight: '1.6',
                margin: 0,
                fontWeight: 500
              }}>
                I believe in writing clean, readable code and building things that actually solve problems. I value continuous learning - every project I build teaches me something new. I care about clear communication, taking ownership of my work, and being the kind of teammate who makes everyone around them better.
              </p>
            </section>
          </div>

          {/* Experience Card - Full Width */}
          <section style={{ padding: '0 8px', marginBottom: '48px' }}>
            <div
              className="about-card"
              style={{
                backgroundColor: '#FFE66D',
                padding: '24px',
                animationDelay: '0.3s',
              }}
            >
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                marginBottom: '16px',
                textShadow: '1px 1px 0px rgba(255,255,255,0.4)',
                letterSpacing: '0.5px'
              }}>
                EXPERIENCE
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div className="focus-item">
                  <strong>Freelance Developer - Sushi Rock (2024)</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                    Built a production website for a real Toronto restaurant with online ordering, reservations, and multi-location support. Worked directly with the client to deliver on their business needs.
                  </p>
                </div>
                <div className="focus-item">
                  <strong>Microsoft Hackathon - Team Lead (2025)</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                    Led a team of 4 developers, placed top 10 out of 50 teams. Coordinated architecture decisions, task delegation, and final presentation.
                  </p>
                </div>
                <div className="focus-item">
                  <strong>Open Source Contributor - Next.js (vercel/next.js)</strong>
                  <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                    Contributed bug fixes and documentation improvements to one of the most popular React frameworks.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Education Card - Full Width */}
          <section style={{ padding: '0 8px', marginBottom: '24px' }}>
            <div
              className="about-card"
              style={{
                backgroundColor: '#FF6B6B',
                padding: '24px',
                animationDelay: '0.4s',
              }}
            >
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                marginBottom: '16px',
                textShadow: '1px 1px 0px rgba(255,255,255,0.4)',
                letterSpacing: '0.5px'
              }}>
                EDUCATION
              </h2>
              <p style={{
                fontSize: '15px',
                fontWeight: 700,
                color: '#000',
                margin: 0,
                marginBottom: '4px'
              }}>
                George Brown College - Toronto, ON
              </p>
              <p style={{
                fontSize: '13px',
                fontWeight: 600,
                color: '#000',
                margin: 0,
                marginBottom: '4px'
              }}>
                Advanced Diploma in Computer Programming and Analysis
              </p>
              <p style={{
                fontSize: '13px',
                color: '#000',
                margin: 0,
                marginBottom: '8px'
              }}>
                Dean&apos;s List Honors | GPA: 3.7 | Expected April 2026
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {['OOP', 'Data Structures & Algorithms', 'Applied ML', 'Full Stack Dev', 'Mobile App Dev', 'Software Testing & QA'].map((course) => (
                  <span key={course} style={{
                    border: '2px solid #000',
                    background: 'white',
                    padding: '6px 10px',
                    fontSize: '11px',
                    fontWeight: 700,
                    borderRadius: '2px',
                    boxShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  }}>
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* Certifications & Activities Card */}
          <section style={{ padding: '0 8px', marginBottom: '48px' }}>
            <div
              className="about-card"
              style={{
                backgroundColor: '#4ECDC4',
                padding: '24px',
                animationDelay: '0.5s',
              }}
            >
              <h2 style={{
                fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                fontSize: 'clamp(18px, 4vw, 24px)',
                fontWeight: 800,
                color: '#000',
                margin: 0,
                marginBottom: '16px',
                textShadow: '1px 1px 0px rgba(255,255,255,0.4)',
                letterSpacing: '0.5px'
              }}>
                CERTIFICATIONS & ACTIVITIES
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="focus-item" style={{ animationDelay: '0.1s' }}>
                  <strong>AWS Certified Cloud Practitioner</strong> - Amazon Web Services (2025)
                </span>
                <span className="focus-item" style={{ animationDelay: '0.13s' }}>
                  <strong>IEEEXtreme 19.0</strong> - 24-hour international programming competition (2025)
                </span>
              </div>
            </div>
          </section>

          {/* Footer */}
          <div style={{
            textAlign: 'center',
            padding: '48px 16px',
            animation: 'float 1s ease-in-out infinite'
          }}>
            <span className="section-footer">
              READY TO COLLABORATE
            </span>
          </div>
          </div>
        </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
