'use client';

import { useState } from 'react';
import MarioBackground from '@/components/MarioBackground';
import Sidebar from '@/components/Sidebar';
import HamburgerButton from '@/components/HamburgerButton';
import PageTransition from '@/components/PageTransition';
import TiltCard from '@/components/TiltCard';
import AnimatedElement from '@/components/AnimatedElement';

export default function Skills() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const skillCategories = [
    {
      category: "Frontend",
      items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML/CSS", "JavaScript", "Java", "JavaFX"],
      bgColor: "transparent"
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "C#", "PostgreSQL", "MongoDB", "Express", "REST APIs"],
      bgColor: "transparent"
    },
    {
      category: "Tools & Platforms",
      items: ["Git", "Docker", "AWS", "Vercel", "VS Code", "Figma"],
      bgColor: "transparent"
    },
    {
      category: "AI / Machine Learning",
      items: ["Python", "Streamlit", "Pandas", "NumPy", "Scikit-learn", "TensorFlow"],
      bgColor: "transparent"
    },
    {
      category: "Mobile",
      items: ["Android", "Swift", "React Native", "Kotlin"],
      bgColor: "transparent"
    },
    {
      category: "Data Science",
      items: ["Data Analysis", "Statistics", "Visualization", "ML Models"],
      bgColor: "transparent"
    }
  ];

  return (
    <MarioBackground>
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <HamburgerButton onClick={() => setSidebarOpen(!sidebarOpen)} />

      <PageTransition>
        <main style={{ minHeight: '100vh', padding: '16px', position: 'relative', zIndex: 10 }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', paddingTop: '32px' }}>
            <div className="content-backdrop">
              {/* Title */}
              <header style={{ textAlign: 'center', marginBottom: '32px' }}>
                <h1 className="page-title">POWER UP</h1>
                <p className="page-subtitle">COLLECT ALL SKILLS</p>
              </header>

              {/* Skills Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gridAutoRows: '1fr',
                gap: '20px',
                padding: '0 8px'
              }}>
                {skillCategories.map((category, idx) => (
                  <AnimatedElement key={category.category} variant="slideUp" delay={idx * 100}>
                    <TiltCard
                      className="skill-box p-4 md:p-6"
                      style={{ height: '100%' }}
                    >
                      <h2 className="section-heading" style={{
                        fontSize: 'clamp(16px, 4vw, 22px)',
                        marginBottom: '20px',
                      }}>
                        {category.category}
                      </h2>

                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                        {category.items.map((skill) => (
                          <span
                            key={skill}
                            className="skill-item"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </TiltCard>
                  </AnimatedElement>
                ))}
              </div>

              {/* Footer */}
              <div style={{
                textAlign: 'center',
                padding: '32px 16px',
                marginTop: '48px',
              }}>
                <span className="section-footer">
                  ALL SKILLS UNLOCKED
                </span>
              </div>
            </div>
          </div>
        </main>
      </PageTransition>
    </MarioBackground>
  );
}
