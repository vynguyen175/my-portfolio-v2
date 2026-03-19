'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';

export default function Credentials() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '32px' }}>
            <div className="content-backdrop">

              <header style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="page-title">CREDENTIALS</h1>
                <p className="page-subtitle">CERTIFICATIONS, AWARDS & RECOGNITION</p>
              </header>

              {/* Education */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{
                  color: '#FFD700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  marginBottom: '24px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                }}>
                  EDUCATION
                </h2>
                <div
                  className="about-card"
                  style={{ backgroundColor: '#FF6B6B', padding: '24px', animation: 'none', cursor: 'default' }}
                >
                  <h3 style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: '#000',
                    margin: 0,
                    marginBottom: '8px',
                  }}>
                    George Brown College &mdash; Toronto, ON
                  </h3>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#000', margin: '0 0 4px' }}>
                    Advanced Diploma in Computer Programming and Analysis
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#000', margin: '0 0 12px' }}>
                    Expected Graduation: April 2026
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {['OOP', 'Data Structures & Algorithms', 'Applied ML', 'Full Stack Dev', 'Mobile App Dev', 'Software Testing & QA', 'Database Management', 'Agile/Scrum'].map((course) => (
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

              {/* Academic Awards */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{
                  color: '#FFD700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  marginBottom: '24px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                }}>
                  ACADEMIC AWARDS
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div
                    className="about-card"
                    style={{ backgroundColor: '#FFE66D', padding: '24px', animation: 'none', cursor: 'default' }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#000', margin: '0 0 8px' }}>
                      Dean&apos;s List Honors
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#000', margin: 0 }}>
                      GPA: 3.7 &mdash; Consistent academic excellence across all semesters at George Brown College.
                    </p>
                  </div>
                  <div
                    className="about-card"
                    style={{ backgroundColor: '#FFE66D', padding: '24px', animation: 'none', cursor: 'default' }}
                  >
                    <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#000', margin: '0 0 8px' }}>
                      Microsoft Hackathon &mdash; Top 10 Placement
                    </h3>
                    <p style={{ fontSize: '13px', fontWeight: 600, color: '#000', margin: 0 }}>
                      Led a team of 4 developers. Placed top 10 out of 50 teams. Coordinated architecture, task delegation, and final presentation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Professional Certifications */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{
                  color: '#FFD700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  marginBottom: '24px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                }}>
                  PROFESSIONAL CERTIFICATIONS
                </h2>
                <div
                  className="about-card"
                  style={{ backgroundColor: '#4ECDC4', padding: '24px', animation: 'none', cursor: 'default' }}
                >
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: '#000', margin: '0 0 8px' }}>
                    AWS Certified Cloud Practitioner
                  </h3>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: '#000', margin: '0 0 8px' }}>
                    Amazon Web Services &mdash; 2025
                  </p>
                  <p style={{ fontSize: '12px', fontWeight: 500, color: '#000', margin: 0, lineHeight: '1.6' }}>
                    Validates foundational understanding of AWS Cloud concepts, services, security, architecture, pricing, and support. Demonstrates ability to work with cloud infrastructure and deploy scalable applications.
                  </p>
                </div>
              </section>

              {/* Competitions & Activities */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{
                  color: '#FFD700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  marginBottom: '24px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                }}>
                  COMPETITIONS & ACTIVITIES
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="focus-item" style={{ animation: 'none' }}>
                    <strong>IEEEXtreme 19.0 (2025)</strong> &mdash; 24-hour international programming competition. Solved algorithmic challenges under time pressure with a team of 3.
                  </div>
                  <div className="focus-item" style={{ animation: 'none' }}>
                    <strong>Open Source Contributor &mdash; Next.js (vercel/next.js)</strong> &mdash; Contributed bug fixes and documentation improvements to one of the most popular React frameworks.
                  </div>
                </div>
              </section>

              {/* Community & Volunteer Work */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{
                  color: '#FFD700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  marginBottom: '24px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                }}>
                  COMMUNITY & VOLUNTEER WORK
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="focus-item" style={{ animation: 'none' }}>
                    <strong>Open Source Contributions</strong> &mdash; Active contributor to the Next.js framework (vercel/next.js). Submitted pull requests for bug fixes and documentation improvements, collaborating with the global developer community.
                  </div>
                  <div className="focus-item" style={{ animation: 'none' }}>
                    <strong>Peer Mentoring</strong> &mdash; Helped fellow students at George Brown College with programming assignments, debugging, and project architecture decisions.
                  </div>
                </div>
              </section>

              {/* Letters of Recommendation */}
              <section style={{ marginBottom: '32px' }}>
                <h2 style={{
                  color: '#FFD700',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(20px, 4vw, 28px)',
                  fontWeight: 800,
                  marginBottom: '24px',
                  textShadow: '2px 2px 0px rgba(0,0,0,0.2)',
                  letterSpacing: '1px',
                }}>
                  LETTERS OF RECOMMENDATION
                </h2>
                <div
                  className="about-card"
                  style={{
                    backgroundColor: '#A8E6CF',
                    padding: '24px',
                    animation: 'none',
                    cursor: 'default',
                    textAlign: 'center',
                  }}
                >
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 600,
                    color: '#000',
                    margin: 0,
                    lineHeight: '1.6',
                  }}>
                    Letters of recommendation are available upon request. References include professors from George Brown College and professional contacts from freelance client work.
                  </p>
                  <div style={{ marginTop: '16px' }}>
                    <Link href="/contact" className="nav-btn" style={{ backgroundColor: '#FFD700' }}>
                      REQUEST A REFERENCE
                    </Link>
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                padding: '32px 16px 16px',
                animation: 'float 1s ease-in-out infinite',
              }}>
                <span className="section-footer">
                  ALWAYS LEVELING UP
                </span>
              </div>

            </div>
          </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
