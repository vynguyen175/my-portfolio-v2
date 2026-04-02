'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const credentials = [
  {
    type: 'Education',
    items: [
      {
        title: 'Computer Science',
        subtitle: 'George Brown College',
        detail: 'Toronto, ON',
        year: '2023 - 2026',
      },
    ],
  },
  {
    type: 'Certifications',
    items: [
      {
        title: 'AWS Certified Cloud Practitioner',
        subtitle: 'Amazon Web Services',
        detail: 'Cloud computing fundamentals, architecture, security',
        year: '2025',
      },
    ],
  },
  {
    type: 'Awards & Achievements',
    items: [
      {
        title: 'Hackathon Winner',
        subtitle: 'George Brown College Hackathon',
        detail: 'Built a winning project under time constraints',
        year: '2024',
      },
      {
        title: 'Open Source Contributor',
        subtitle: 'Active GitHub Presence',
        detail: 'Contributing to community projects and maintaining own repos',
        year: 'Ongoing',
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
        background: 'linear-gradient(180deg, #050515 0%, #0A0A2E 50%, #0F0F35 100%)',
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
          alt=""
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
              color: '#fff',
              lineHeight: 1.1,
              margin: '0 0 16px',
              letterSpacing: -1,
            }}
          >
            Education &{' '}
            <span style={{ color: '#F0C946' }}>achievements</span>
          </h2>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.5)',
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
                  {section.items.map((item, itemIdx) => (
                    <ScrollReveal key={item.title} delay={0.1 * (sectionIdx + itemIdx + 1)} direction="left">
                      <div
                        style={{
                          padding: '24px 28px',
                          background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                          borderRadius: 16,
                          border: '1px solid rgba(240, 201, 70, 0.1)',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: 20,
                          flexWrap: 'wrap',
                        }}
                      >
                        <div style={{ flex: 1 }}>
                          <h4
                            style={{
                              fontSize: 18,
                              fontWeight: 800,
                              color: '#fff',
                              margin: '0 0 6px',
                            }}
                          >
                            {item.title}
                          </h4>
                          <p
                            style={{
                              fontSize: 14,
                              fontWeight: 600,
                              color: 'rgba(255,255,255,0.6)',
                              margin: '0 0 4px',
                            }}
                          >
                            {item.subtitle}
                          </p>
                          <p
                            style={{
                              fontSize: 13,
                              color: 'rgba(255,255,255,0.4)',
                              margin: 0,
                            }}
                          >
                            {item.detail}
                          </p>
                        </div>
                        <span
                          style={{
                            padding: '6px 14px',
                            background: 'rgba(240, 201, 70, 0.1)',
                            borderRadius: 10,
                            fontSize: 12,
                            fontWeight: 700,
                            color: '#F0C946',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {item.year}
                        </span>
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
