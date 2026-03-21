'use client';

import { useState } from 'react';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';

export default function Philosophy() {
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
                <h1 className="page-title">CAREER PHILOSOPHY</h1>
                <p className="page-subtitle">STATEMENT OF PURPOSE</p>
              </header>

              {/* Quote */}
              <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '24px',
                borderLeft: '6px solid var(--gold)',
                background: 'var(--gold-dim)',
                borderRadius: '0 8px 8px 0',
              }}>
                <p style={{
                  color: 'var(--gold-text)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: 'clamp(16px, 3vw, 22px)',
                  fontWeight: 700,
                  fontStyle: 'italic',
                  margin: 0,
                  marginBottom: '12px',
                  lineHeight: '1.6',
                }}>
                  &ldquo;We are the facilitators of our own creative evolution.&rdquo;
                </p>
                <p style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  margin: 0,
                  letterSpacing: '1px',
                }}>
                  &mdash; Bill Hicks
                </p>
              </div>

              {/* Philosophy Statement */}
              <section style={{ marginBottom: '40px' }}>
                <div
                  className="about-card"
                  style={{
                    padding: '32px',
                    cursor: 'default',
                  }}
                >
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8',
                    margin: 0,
                    marginBottom: '20px',
                    fontWeight: 500,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    I believe that software development is, at its core, a creative act of problem-solving. Three years ago, I wrote my first line of code out of pure curiosity. That curiosity quickly became conviction: I realized that building software gives me the ability to take an idea, break it down into its components, and construct something tangible that solves a real problem for real people. From building a production restaurant website for Sushi Rock to engineering an AI-powered data visualization platform, every project has reinforced my belief that the best developers are not just coders &mdash; they are communicators, critical thinkers, and lifelong learners. My role is not simply to write functions that compile; it is to understand the human need behind every feature, to ask the right questions before writing the first line, and to build systems that are as maintainable as they are functional.
                  </p>
                  <p style={{
                    fontSize: '15px',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.8',
                    margin: 0,
                    fontWeight: 500,
                    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  }}>
                    Looking ahead, I am driven by the intersection of full-stack development and artificial intelligence &mdash; the space where data-driven systems meet user-facing products. My experience at George Brown College, combined with my AWS certification, hackathon leadership, and open-source contributions to Next.js, has given me both the technical foundation and the collaborative mindset I need to contribute meaningfully from day one. I see my career not as a linear path but as an ongoing evolution: each project expands what I am capable of building, each collaboration sharpens how I think, and each failure teaches me something no textbook ever could. I am the facilitator of my own creative evolution, and I am ready to bring that energy, discipline, and hunger to a team that values growth as much as I do.
                  </p>
                </div>
              </section>

              {/* Core Beliefs */}
              <section>
                <h2 className="section-heading" style={{ marginBottom: '24px' }}>
                  CORE BELIEFS
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="focus-item">
                    <strong>Build to solve, not to impress.</strong> The best code is the code that makes someone&apos;s life easier.
                  </div>
                  <div className="focus-item">
                    <strong>Own the outcome.</strong> Take responsibility for the full lifecycle &mdash; from understanding requirements to deploying and maintaining the product.
                  </div>
                  <div className="focus-item">
                    <strong>Learn by shipping.</strong> Theory matters, but deploying real projects to real users is where the deepest learning happens.
                  </div>
                  <div className="focus-item">
                    <strong>Communicate clearly.</strong> Writing clean code and writing clear documentation are equally important skills.
                  </div>
                  <div className="focus-item">
                    <strong>Stay hungry.</strong> The tech landscape changes fast. The only sustainable advantage is the willingness to keep learning.
                  </div>
                </div>
              </section>

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                padding: '48px 16px 16px',
              }}>
                <span className="section-footer">
                  EVOLVING EVERY DAY
                </span>
              </div>

            </div>
          </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
