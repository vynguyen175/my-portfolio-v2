'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
];

export default function SectionNav() {
  const [active, setActive] = useState('hero');
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          setActive(visible[0].target.id);
        }
      },
      { threshold: [0.3, 0.5, 0.7] },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-end',
      }}
    >
      {sections.map(({ id, label }) => {
        const isActive = active === id;
        const isHovered = hovered === id;

        return (
          <div
            key={id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              cursor: 'pointer',
            }}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => scrollTo(id)}
          >
            {/* Label */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#fff',
                    background: 'rgba(0,0,0,0.6)',
                    backdropFilter: 'blur(8px)',
                    padding: '4px 10px',
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                    letterSpacing: 0.5,
                  }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Dot */}
            <motion.div
              animate={{
                scale: isActive ? 1 : 0.7,
                background: isActive ? '#F0C946' : 'rgba(255,255,255,0.3)',
              }}
              whileHover={{ scale: 1 }}
              transition={{ duration: 0.3 }}
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                border: isActive
                  ? '2px solid rgba(240, 201, 70, 0.5)'
                  : '2px solid rgba(255,255,255,0.2)',
                boxShadow: isActive ? '0 0 12px rgba(240, 201, 70, 0.4)' : 'none',
                transition: 'border 0.3s ease, box-shadow 0.3s ease',
              }}
            />
          </div>
        );
      })}

      <style>{`
        @media (max-width: 768px) {
          nav[style] {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
