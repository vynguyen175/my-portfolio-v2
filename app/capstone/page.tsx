'use client';

import { useState } from 'react';
import Link from 'next/link';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';

export default function Capstone() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const requirements = [
    {
      category: 'Functional Requirements',
      items: [
        'Users can create accounts, log in, and manage their profiles',
        'Users can search, browse, and discover games from a curated database',
        'Users can add games to their personal library with status tracking (playing, completed, backlog)',
        'Users can rate games (1-5 stars) and write text reviews',
        'Users can follow other users and view their activity feeds',
        'Users can filter and sort their library by genre, status, rating, and platform',
        'Cross-platform parity: core features available on both web and Android',
      ],
    },
    {
      category: 'Non-Functional Requirements',
      items: [
        'Response time under 2 seconds for all page loads',
        'Mobile-responsive design (web) and native Android experience',
        'Data consistency across web and mobile platforms via shared MongoDB backend',
        'Secure authentication and user data protection',
        'Scalable architecture to support growing user base',
        'Accessible UI following WCAG 2.1 AA guidelines',
      ],
    },
  ];

  const phases = [
    {
      title: 'REQUIREMENTS ANALYSIS & DESIGN',
      status: 'Complete',
      statusColor: 'var(--gold-dim)',
      color: 'transparent',
      items: [
        'Business Requirements Document (BRD) - Social gaming platform for tracking and reviewing games',
        'Functional & Non-Functional Requirements - Defined user stories and acceptance criteria',
        'Use Case Diagrams - User registration, game discovery, library management, social features',
        'Entity-Relationship Diagram - Users, Games, Reviews, Libraries, Followers collections',
        'System Architecture - Next.js frontend + MongoDB backend (web), Java + MongoDB (Android)',
      ],
    },
    {
      title: 'WIREFRAMES & MOCKUPS',
      status: 'Complete',
      statusColor: 'var(--gold-dim)',
      color: 'transparent',
      items: [
        'Low-fidelity wireframes for all core screens (home, search, game detail, library, profile)',
        'High-fidelity UI mockups with dark theme gaming aesthetic',
        'User flow diagrams for onboarding, game discovery, and review workflows',
        'Responsive design specs for mobile, tablet, and desktop breakpoints',
        'Android native layout XML designs mirroring web UI patterns',
      ],
    },
    {
      title: 'PROJECT PLAN',
      status: 'Complete',
      statusColor: 'var(--gold-dim)',
      color: 'transparent',
      items: [
        'Agile sprints: 2-week iterations across 4 development phases',
        'Sprint 1-2: Core backend (MongoDB schemas, API routes, auth)',
        'Sprint 3-4: Web frontend (Next.js pages, game search, library UI)',
        'Sprint 5-6: Social features (reviews, followers, activity feed)',
        'Sprint 7-8: Android native app (Java, mirroring web functionality)',
        'Sprint 9: Testing, bug fixes, deployment, documentation',
      ],
    },
    {
      title: 'SYSTEM IMPLEMENTATION',
      status: 'Complete',
      statusColor: 'var(--gold-dim)',
      color: 'transparent',
      items: [
        'Web frontend: Next.js 14, TypeScript, React, Tailwind CSS',
        'Mobile app: Native Android with Java, Gradle build system',
        'Database: MongoDB with Mongoose ODM, shared data models',
        'Authentication: Session-based auth with secure password hashing',
        'Deployment: Vercel (web), APK distribution (Android)',
        'Testing: Manual testing across browsers and Android devices',
      ],
    },
  ];

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', paddingTop: '32px' }}>
            <div className="content-backdrop">

              <header style={{ textAlign: 'center', marginBottom: '48px' }}>
                <h1 className="page-title">CAPSTONE PROJECT</h1>
                <p className="page-subtitle">GAMEBOXD &mdash; SOCIAL GAMING PLATFORM</p>
              </header>

              {/* Status Banner */}
              <div style={{
                textAlign: 'center',
                marginBottom: '40px',
                padding: '16px 24px',
                background: 'var(--gold-dim)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '16px',
                flexWrap: 'wrap',
              }}>
                <p style={{
                  color: 'var(--gold-text)',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '14px',
                  fontWeight: 700,
                  margin: 0,
                  letterSpacing: '1px',
                }}>
                  STATUS: DEPLOYED & LIVE
                </p>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <Link
                    href="https://gameboxd-web-app.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-btn-primary"
                    style={{ padding: '8px 14px', fontSize: '11px' }}
                  >
                    LIVE DEMO
                  </Link>
                  <Link
                    href="https://github.com/vynguyen175/Gameboxd-Web-App"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-btn"
                    style={{ padding: '8px 14px', fontSize: '11px' }}
                  >
                    SOURCE CODE
                  </Link>
                </div>
              </div>

              {/* Project Summary */}
              <section style={{ marginBottom: '24px' }}>
                <div
                  className="about-card"
                  style={{ padding: '24px', cursor: 'default' }}
                >
                  <h2 className="section-heading">
                    PROJECT SUMMARY
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0, fontWeight: 500 }}>
                    Gameboxd is a social platform for gamers &mdash; a Letterboxd-inspired application where users can discover games, build their personal library, rate and review titles, and follow friends to see what they&apos;re playing. The project was built as both a Next.js web application and a native Android app, sharing a MongoDB backend. This dual-platform approach was the core technical challenge, requiring careful design of shared data models and consistent user experiences across web and mobile. The project demonstrates full-stack capabilities across two distinct technology stacks: React/TypeScript for web and Java for native Android.
                  </p>
                </div>
              </section>

              {/* Project Vision */}
              <section style={{ marginBottom: '24px' }}>
                <div
                  className="about-card"
                  style={{ padding: '24px', cursor: 'default' }}
                >
                  <h2 className="section-heading">
                    PROJECT VISION
                  </h2>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', margin: '0 0 12px', fontWeight: 500 }}>
                    The gaming community lacks a dedicated, social-first platform for tracking and discussing games &mdash; one that feels as polished as Letterboxd does for film. Gameboxd fills that gap by giving gamers a home to organize their gaming life, share opinions, and discover new titles through their social network.
                  </p>
                  <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0, fontWeight: 500 }}>
                    The vision was to build something I&apos;d actually use daily, while pushing myself to deliver the same product on two platforms. This forced me to think about platform-agnostic data modeling, consistent UX across web and native, and the real tradeoffs between a React SPA and a native Android app.
                  </p>
                </div>
              </section>

              {/* Requirements */}
              <section style={{ marginBottom: '32px' }}>
                <h2 className="section-heading" style={{ marginBottom: '24px' }}>
                  PROJECT REQUIREMENTS
                </h2>
                {requirements.map((req) => (
                  <div key={req.category} style={{ marginBottom: '16px' }}>
                    <div
                      className="about-card"
                      style={{ padding: '24px', cursor: 'default' }}
                    >
                      <h3 style={{
                        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                        fontSize: '15px',
                        fontWeight: 800,
                        color: 'var(--text-primary)',
                        margin: '0 0 12px',
                      }}>
                        {req.category}
                      </h3>
                      <ul style={{
                        margin: 0,
                        padding: '0 0 0 18px',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        lineHeight: '1.8',
                      }}>
                        {req.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </section>

              {/* Development Phases */}
              <section style={{ marginBottom: '32px' }}>
                <h2 className="section-heading" style={{ marginBottom: '24px' }}>
                  DEVELOPMENT PHASES
                </h2>

                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                  gap: '20px',
                }}>
                  {phases.map((phase) => (
                    <div
                      key={phase.title}
                      className="about-card"
                      style={{ padding: '24px', cursor: 'default' }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <h3 style={{
                          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                          fontSize: '15px',
                          fontWeight: 800,
                          color: 'var(--text-primary)',
                          margin: 0,
                          letterSpacing: '0.5px',
                          flex: 1,
                        }}>
                          {phase.title}
                        </h3>
                        <span className="tech-badge" style={{
                          flexShrink: 0,
                          marginLeft: '8px',
                        }}>
                          {phase.status.toUpperCase()}
                        </span>
                      </div>
                      <ul style={{
                        margin: 0,
                        padding: '0 0 0 18px',
                        fontSize: '12px',
                        fontWeight: 500,
                        color: 'var(--text-secondary)',
                        lineHeight: '1.8',
                      }}>
                        {phase.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Status Reports */}
              <section style={{ marginBottom: '32px' }}>
                <h2 className="section-heading" style={{ marginBottom: '24px' }}>
                  STATUS REPORTS
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="focus-item">
                    <strong>Sprint 1-2: Backend & Data Layer</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                      Designed MongoDB schemas for Users, Games, Reviews, and Libraries. Built REST API routes with Next.js API routes. Set up authentication flow with session management. Seeded database with game data.
                    </p>
                  </div>
                  <div className="focus-item">
                    <strong>Sprint 3-4: Web Frontend</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                      Built all core pages: home feed, game search/discovery, individual game detail pages, user library with filtering, and profile pages. Implemented responsive design with Tailwind CSS. Connected all frontend components to backend APIs.
                    </p>
                  </div>
                  <div className="focus-item">
                    <strong>Sprint 5-6: Social Features</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                      Added rating and review system, follow/unfollow functionality, and activity feed showing friends&apos; recent activity. This phase involved the most complex database queries (aggregation pipelines for feeds).
                    </p>
                  </div>
                  <div className="focus-item">
                    <strong>Sprint 7-8: Android Native App</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                      Rebuilt the core experience as a native Android app using Java and Gradle. Designed Android-native layouts mirroring the web UI. Connected to the same MongoDB backend to ensure data consistency across platforms.
                    </p>
                  </div>
                  <div className="focus-item">
                    <strong>Sprint 9: Testing & Deployment</strong>
                    <p style={{ margin: '4px 0 0', fontSize: '12px', lineHeight: '1.5' }}>
                      Performed cross-browser testing (Chrome, Firefox, Safari) and Android device testing. Fixed responsive layout issues. Deployed web app to Vercel. Final code review and documentation.
                    </p>
                  </div>
                </div>
              </section>

              {/* Tech Stack */}
              <section style={{ marginBottom: '32px' }}>
                <h2 className="section-heading" style={{ marginBottom: '24px' }}>
                  TECH STACK
                </h2>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))',
                  gap: '16px',
                }}>
                  <div
                    className="about-card"
                    style={{ padding: '20px', cursor: 'default' }}
                  >
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px' }}>
                      WEB APPLICATION
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {['Next.js', 'TypeScript', 'React', 'Tailwind CSS', 'MongoDB', 'Mongoose', 'Vercel'].map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                  <div
                    className="about-card"
                    style={{ padding: '20px', cursor: 'default' }}
                  >
                    <h3 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)', margin: '0 0 12px' }}>
                      ANDROID APPLICATION
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {['Java', 'Android SDK', 'Gradle', 'MongoDB', 'XML Layouts', 'Material Design'].map((tech) => (
                        <span key={tech} className="tech-badge">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Key Learnings */}
              <section style={{ marginBottom: '32px' }}>
                <h2 className="section-heading" style={{ marginBottom: '24px' }}>
                  KEY LEARNINGS
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="focus-item">
                    <strong>Cross-platform data modeling</strong> &mdash; Designing MongoDB schemas that work efficiently for both a Next.js API and a Java Android client required thinking about data access patterns upfront.
                  </div>
                  <div className="focus-item">
                    <strong>Web vs. native tradeoffs</strong> &mdash; Learned firsthand why some features are easier on web (routing, responsive layouts) and others on native (offline access, performance). Informed my understanding of when to choose which platform.
                  </div>
                  <div className="focus-item">
                    <strong>Social feature complexity</strong> &mdash; Activity feeds and follower graphs are deceptively hard. MongoDB aggregation pipelines were essential for building performant feed queries.
                  </div>
                  <div className="focus-item">
                    <strong>End-to-end ownership</strong> &mdash; From requirements gathering to deployment, this project gave me experience with the full software development lifecycle.
                  </div>
                </div>
              </section>

              {/* Links */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', paddingBottom: '16px' }}>
                <Link
                  href="https://gameboxd-web-app.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-btn"
                  style={{}}
                >
                  TRY GAMEBOXD
                </Link>
                <Link
                  href="https://github.com/vynguyen175/Gameboxd-Web-App"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-btn"
                  style={{}}
                >
                  VIEW SOURCE
                </Link>
                <Link href="/projects" className="nav-btn" style={{}}>
                  ALL PROJECTS
                </Link>
              </div>

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                padding: '32px 16px 16px',
              }}>
                <span className="section-footer">
                  LEVEL COMPLETE
                </span>
              </div>

            </div>
          </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
