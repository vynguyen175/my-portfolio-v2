'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const credentials = [
  {
    type: 'Education',
    items: [
      {
        title: 'Computer Programming & Analysis',
        subtitle: 'George Brown College',
        detail: 'Advanced Diploma — Dean\'s List Honors | GPA: 3.7',
        year: '2023 - 2026',
      },
    ],
  },
  {
    type: 'Awards & Achievements',
    items: [
      {
        title: 'IEEEXtreme 19.0 — #1 Team in Canada',
        subtitle: 'Team GitPushForce | Ranked 72 globally out of 19,000+ participants',
        detail: '24-hour international programming competition hosted by IEEE. Ranked #1 among all Canadian teams and IEEE Region 7.',
        year: '2025',
        image: '/certificates/ieee-certificate.png',
        link: '/certificates/ieee-certificate.pdf',
      },
      {
        title: 'Hackathon Winner',
        subtitle: 'George Brown College Hackathon',
        detail: 'Built a winning project under time constraints',
        year: '2024',
      },
      {
        title: 'Open Source Contributor',
        subtitle: 'Next.js (vercel/next.js)',
        detail: 'Contributed bug fixes and documentation improvements',
        year: 'Ongoing',
      },
    ],
  },
  {
    type: 'Certifications',
    items: [
      {
        title: 'Scrum Fundamentals Certified (SFC)',
        subtitle: 'SCRUMstudy',
        detail: 'Certificate ID: 1133190',
        year: '2025',
        image: '/certificates/scrum-certificate.png',
      },
    ],
  },
];

export default function CredentialsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="credentials"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--credentials-bg)',
        padding: '120px 40px',
      }}
    >
      {/* Animated stars */}
      {Array.from({ length: 40 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            background: '#fff',
            borderRadius: '50%',
            opacity: Math.random() * 0.7 + 0.1,
            animation: `starTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Floating Mario */}
      <motion.div
        style={{
          y: marioY,
          position: 'absolute',
          top: '15%',
          right: '5%',
          zIndex: 5,
          opacity: 0.2,
        }}
      >
        <img
          src="/sprites/mario-standing.png"
          alt="Mario standing confidently"
          style={{
            width: 160,
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(240, 201, 70, 0.2))',
          }}
        />
      </motion.div>

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <ScrollReveal>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(240, 201, 70, 0.15)',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              color: '#F0C946',
              marginBottom: 12,
              letterSpacing: 0.5,
            }}
          >
            Credentials
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2
            style={{
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 900,
              color: 'var(--section-text)',
              lineHeight: 1.1,
              margin: '0 0 16px',
              letterSpacing: -1,
            }}
          >
            Education &{' '}
            <span style={{
              background: 'linear-gradient(135deg, #F0C946, #FFD700, #FF6B6B)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>achievements</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            style={{
              fontSize: 16,
              color: 'var(--section-text-muted)',
              lineHeight: 1.7,
              maxWidth: 520,
              margin: '0 0 60px',
            }}
          >
            My academic journey, certifications, and milestones along the way.
          </p>
        </ScrollReveal>

        {/* Credentials sections */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 50 }}>
          {credentials.map((section, sectionIdx) => (
            <ScrollReveal key={section.type} delay={0.1 * sectionIdx}>
              <div>
                <h3
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: '#F0C946',
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    margin: '0 0 24px',
                    paddingBottom: 12,
                    borderBottom: '1px solid rgba(240, 201, 70, 0.15)',
                  }}
                >
                  {section.type}
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {section.items.map((item: Record<string, string | undefined>, itemIdx: number) => (
                    <ScrollReveal key={item.title} delay={0.1 * (sectionIdx + itemIdx + 1)} direction="left">
                      <div
                        style={{
                          padding: '24px 28px',
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                          borderRadius: 16,
                          border: '1px solid rgba(240, 201, 70, 0.1)',
                          transition: 'all 0.3s ease',
                          cursor: 'default',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(240, 201, 70, 0.4)';
                          (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(240, 201, 70, 0.1), inset 0 1px 0 rgba(255,255,255,0.05)';
                          (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.borderColor = '';
                          (e.currentTarget as HTMLElement).style.boxShadow = '';
                          (e.currentTarget as HTMLElement).style.transform = '';
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 20,
                          flexWrap: 'wrap',
                        }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: 18, fontWeight: 800, color: 'var(--section-text)', margin: '0 0 6px' }}>
                              {item.title}
                            </h4>
                            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--section-text-sub)', margin: '0 0 4px' }}>
                              {item.subtitle}
                            </p>
                            <p style={{ fontSize: 13, color: 'var(--section-text-muted)', margin: 0 }}>
                              {item.detail}
                            </p>
                            {/* View certificate link */}
                            {(item.image || item.link) && (
                              <a
                                href={item.image || item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                  display: 'inline-block',
                                  marginTop: 10,
                                  padding: '5px 14px',
                                  background: 'rgba(240, 201, 70, 0.12)',
                                  border: '1px solid rgba(240, 201, 70, 0.25)',
                                  borderRadius: 8,
                                  fontSize: 12,
                                  fontWeight: 600,
                                  color: '#F0C946',
                                  textDecoration: 'none',
                                  transition: 'all 0.2s ease',
                                }}
                              >
                                View Certificate
                              </a>
                            )}
                          </div>
                          <span style={{
                            padding: '6px 14px',
                            background: 'rgba(240, 201, 70, 0.1)',
                            borderRadius: 10,
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#F0C946',
                            whiteSpace: 'nowrap',
                          }}>
                            {item.year}
                          </span>
                        </div>

                        {/* Certificate image preview */}
                        {item.image && (
                          <a href={item.image} target="_blank" rel="noopener noreferrer" style={{ display: 'block', marginTop: 16 }}>
                            <img
                              src={item.image}
                              alt={`${item.title} certificate`}
                              style={{
                                width: '100%',
                                maxHeight: '280px',
                                objectFit: 'contain',
                                borderRadius: 10,
                                border: '1px solid rgba(240, 201, 70, 0.15)',
                                transition: 'all 0.3s ease',
                              }}
                            />
                          </a>
                        )}
                      </div>
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes starTwinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        @media (max-width: 768px) {
          #credentials {
            padding: 80px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
