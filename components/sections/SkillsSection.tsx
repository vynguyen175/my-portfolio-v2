'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';

const skillCategories = [
  {
    name: 'Frontend',
    color: '#E52521',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'HTML5/CSS3', 'Framer Motion', 'Three.js'],
  },
  {
    name: 'Backend',
    color: '#2E5CB8',
    skills: ['Node.js', 'ASP.NET Core', 'C#', 'Python', 'REST APIs', 'Express.js', 'Java'],
  },
  {
    name: 'Data & AI/ML',
    color: '#F0C946',
    skills: ['Pandas', 'Scikit-learn', 'NumPy', 'Streamlit', 'Machine Learning', 'Data Visualization', 'Recommendation Systems'],
  },
  {
    name: 'Databases & Cloud',
    color: '#2EA82E',
    skills: ['MongoDB', 'SQL Server', 'Entity Framework', 'Vercel', 'Railway', 'Git/GitHub'],
  },
  {
    name: 'Mobile & Tools',
    color: '#9B59B6',
    skills: ['Android (Java)', 'Gradle', 'VS Code', 'Visual Studio', 'Figma', 'Linux', 'Agile/Scrum'],
  },
];

export default function SkillsSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section
      ref={ref}
      id="skills"
      style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--skills-bg)',
        padding: '120px 40px',
      }}
    >
      {/* Pipe decorations */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '10%',
          width: 60,
          height: 100,
          background: 'linear-gradient(90deg, #2EA82E, #228B22, #2EA82E)',
          borderRadius: '8px 8px 0 0',
          opacity: 0.2,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '15%',
          width: 60,
          height: 140,
          background: 'linear-gradient(90deg, #2EA82E, #228B22, #2EA82E)',
          borderRadius: '8px 8px 0 0',
          opacity: 0.15,
        }}
      />

      {/* Floating Mario */}
      <motion.div
        style={{
          y: marioY,
          position: 'absolute',
          bottom: '10%',
          left: '3%',
          zIndex: 5,
          opacity: 0.2,
        }}
      >
        <img
          src="/sprites/mario-jump2.png"
          alt=""
          style={{
            width: 180,
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(155, 89, 182, 0.3))',
          }}
        />
      </motion.div>

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <ScrollReveal>
          <div
            style={{
              display: 'inline-block',
              padding: '6px 16px',
              background: 'rgba(155, 89, 182, 0.2)',
              borderRadius: 20,
              fontSize: 13,
              fontWeight: 700,
              color: '#BB8FCE',
              marginBottom: 12,
              letterSpacing: 0.5,
            }}
          >
            Skills
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
            My <span style={{ color: '#BB8FCE' }}>toolkit</span>
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
            Technologies and tools I use to bring ideas to life. Always expanding,
            always learning.
          </p>
        </ScrollReveal>

        {/* Skill categories */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {skillCategories.map((cat, catIdx) => (
            <ScrollReveal key={cat.name} delay={0.1 * catIdx}>
              <div>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: cat.color,
                    margin: '0 0 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: cat.color,
                      boxShadow: `0 0 12px ${cat.color}66`,
                    }}
                  />
                  {cat.name}
                </h3>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {cat.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: 0.05 * skillIdx,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '8px 18px',
                          background: `${cat.color}15`,
                          border: `1px solid ${cat.color}30`,
                          borderRadius: 12,
                          fontSize: 14,
                          fontWeight: 600,
                          color: 'var(--section-text-sub)',
                          transition: 'all 0.3s ease',
                        }}
                      >
                        {skill}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #skills {
            padding: 80px 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
