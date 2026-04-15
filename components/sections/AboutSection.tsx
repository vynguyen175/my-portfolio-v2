'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const cards = [
  {
    title: 'Who I Am',
    body: 'A curious developer who loves building things that matter. I thrive at the intersection of design and engineering, turning complex problems into elegant, user-friendly solutions.',
    icon: '',
  },
  {
    title: 'My Focus',
    body: 'Full-stack web development, AI/ML applications, and mobile experiences. I believe great software should feel effortless — every interaction thoughtful, every detail intentional.',
    icon: '',
  },
  {
    title: 'What I Value',
    body: 'Clean code, continuous learning, and collaboration. I approach every project with empathy for users and respect for the craft. Open-source contributor and lifelong student.',
    icon: '',
  },
];

export default function AboutSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const marioRotate = useTransform(scrollYProgress, [0, 1], [5, -5]);

  return (
    <section
      ref={ref}
      id="about"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--about-bg)',
        padding: '120px 40px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,201,70,0.15) 0%, transparent 70%)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '-5%',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229,37,33,0.08) 0%, transparent 70%)',
        }}
      />

      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 40,
          alignItems: 'center',
        }}
      >
        {/* Left: Photo — transparent background, blends naturally */}
        <motion.div
          style={{
            y: marioY,
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <img
            src="/sprites/me-sprites.png"
            alt="Vy Nguyen with Mario game sprites"
            style={{
              width: '100%',
              maxWidth: '520px',
              height: 'auto',
              objectFit: 'contain',
              animation: 'aboutFloat 4s ease-in-out infinite',
            }}
          />
          {/* Secret code hint */}
          <div style={{
            display: 'flex',
            gap: '6px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: '24px',
            opacity: 0.35,
          }}>
            {['↑', '↑', '↓', '↓', '←', '→', '←', '→', 'B', 'A'].map((key, i) => (
              <span key={i} style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '30px',
                height: '30px',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '6px',
                color: 'var(--section-text)',
                fontSize: '13px',
                fontWeight: 700,
                boxShadow: '0 2px 0 var(--border)',
              }}>
                {key}
              </span>
            ))}
          </div>
          <style>{`
            @keyframes aboutFloat {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-18px); }
            }
          `}</style>
        </motion.div>

        {/* Right: Content */}
        <div>
          <ScrollReveal>
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: 'rgba(229, 37, 33, 0.1)',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                color: '#E52521',
                marginBottom: 12,
                letterSpacing: 0.5,
              }}
            >
              About Me
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
              Building digital
              <br />
              experiences with{' '}
              <span style={{ color: '#E52521' }}>passion</span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <p
              style={{
                fontSize: 16,
                color: 'var(--section-text-sub)',
                lineHeight: 1.7,
                maxWidth: 520,
                margin: '0 0 40px',
              }}
            >
              I&apos;m a Computer Science student and full-stack developer from
              Toronto. I love turning ideas into polished products — from AI
              dashboards to mobile apps, restaurants websites to game engines.
            </p>
          </ScrollReveal>

          {/* Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {cards.map((card, i) => (
              <ScrollReveal key={card.title} delay={0.15 * (i + 2)} direction="left">
                <div
                  style={{
                    padding: '24px 28px',
                    background: 'var(--about-card-bg)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: 16,
                    border: '1px solid var(--about-card-border)',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontSize: 24 }}>{card.icon}</span>
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 800,
                        color: 'var(--section-text)',
                        margin: 0,
                      }}
                    >
                      {card.title}
                    </h3>
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--section-text-muted)',
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {card.body}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div:last-of-type {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
            text-align: center;
          }
        }
        @media (max-width: 768px) {
          #about {
            padding: 80px 20px !important;
          }
        }
        @media (max-width: 480px) {
          #about {
            padding: 60px 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
