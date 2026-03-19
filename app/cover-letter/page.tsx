'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';

export default function CoverLetter() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', paddingTop: '32px' }}>
            <div className="content-backdrop">

              <header style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="page-title">COVER LETTER</h1>
                <p className="page-subtitle">SAMPLE TEMPLATE &mdash; FULL-STACK DEVELOPER</p>
              </header>

              {/* Cover Letter */}
              <section>
                <div
                  className="about-card"
                  style={{
                    backgroundColor: '#FFF',
                    padding: 'clamp(20px, 4vw, 40px) clamp(16px, 3vw, 32px)',
                    animation: 'none',
                    cursor: 'default',
                  }}
                >
                  <div style={{
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                    fontSize: '14px',
                    color: '#000',
                    lineHeight: '1.8',
                  }}>
                    {/* Header */}
                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ fontWeight: 700, margin: '0 0 4px', fontSize: '16px' }}>Vy Nguyen</p>
                      <p style={{ margin: '0 0 2px', color: '#555' }}>Toronto, ON</p>
                      <p style={{ margin: '0 0 2px', color: '#555' }}>vyn13217@gmail.com</p>
                      <p style={{ margin: '0 0 2px', color: '#555' }}>github.com/vynguyen175</p>
                      <p style={{ margin: '0 0 2px', color: '#555' }}>linkedin.com/in/vy-nguyen-71629729b</p>
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                      <p style={{ margin: '0 0 4px', color: '#888' }}>[Date]</p>
                      <p style={{ margin: '0 0 4px', color: '#888' }}>[Hiring Manager&apos;s Name]</p>
                      <p style={{ margin: '0 0 4px', color: '#888' }}>[Company Name]</p>
                      <p style={{ margin: '0 0 4px', color: '#888' }}>[Company Address]</p>
                    </div>

                    <p style={{ margin: '0 0 16px' }}>
                      <strong>Re: Full-Stack Developer Position</strong>
                    </p>

                    <p style={{ margin: '0 0 16px' }}>
                      Dear [Hiring Manager&apos;s Name],
                    </p>

                    <p style={{ margin: '0 0 16px' }}>
                      I am writing to express my strong interest in the Full-Stack Developer position at [Company Name]. As a Computer Programming and Analysis student at George Brown College with a 3.7 GPA (Dean&apos;s List), an AWS Cloud Practitioner certification, and a portfolio of 7+ deployed applications, I am confident that my technical skills and drive to build impactful products make me a strong fit for your team.
                    </p>

                    <p style={{ margin: '0 0 16px' }}>
                      Over the past three years, I have built production-grade applications across the full stack. Most notably, I developed a production website for Sushi Rock, a real Toronto restaurant, delivering online ordering, reservations, and multi-location support &mdash; working directly with the client to meet their business needs. I have also built Gameboxd, a social gaming platform (web + native Android), an AI-powered data visualization tool using Python and ML, and an inventory management system with ASP.NET Core and SQL Server. These projects demonstrate my ability to work across frameworks (React, Next.js, .NET, Python), ship under real constraints, and learn new technologies quickly.
                    </p>

                    <p style={{ margin: '0 0 16px' }}>
                      Beyond technical ability, I bring leadership and collaboration. I led a team of 4 at the Microsoft Hackathon and placed in the top 10 out of 50 teams. I have contributed bug fixes and documentation to Next.js (vercel/next.js), and I competed in IEEEXtreme 19.0, a 24-hour international programming competition. I am someone who takes ownership, communicates clearly, and is always looking to learn.
                    </p>

                    <p style={{ margin: '0 0 16px' }}>
                      I would welcome the opportunity to discuss how my skills and experience can contribute to [Company Name]. I am available for an interview at your convenience and can be reached at vyn13217@gmail.com.
                    </p>

                    <p style={{ margin: '0 0 4px' }}>
                      Thank you for your time and consideration.
                    </p>

                    <p style={{ margin: '24px 0 0' }}>
                      Sincerely,
                    </p>
                    <p style={{ margin: '4px 0 0', fontWeight: 700 }}>
                      Vy Nguyen
                    </p>
                  </div>
                </div>
              </section>

              {/* Note */}
              <div style={{
                textAlign: 'center',
                marginTop: '24px',
                padding: '16px',
              }}>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '12px',
                  fontWeight: 500,
                  margin: 0,
                  lineHeight: '1.6',
                }}>
                  This is a sample template. Each cover letter is customized per application to address the specific company and role.
                </p>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginTop: '16px', paddingBottom: '16px' }}>
                <Link href="/resume.pdf" target="_blank" className="nav-btn" style={{ backgroundColor: '#FFF' }}>
                  VIEW RESUME
                </Link>
                <Link href="/contact" className="nav-btn" style={{ backgroundColor: '#FFD700' }}>
                  CONTACT ME
                </Link>
              </div>

            </div>
          </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
