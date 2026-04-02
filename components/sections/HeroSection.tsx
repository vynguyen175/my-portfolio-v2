'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

export default function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const marioRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const socials = [
    { icon: FaGithub, href: 'https://github.com/vynguyen175' },
    { icon: FaLinkedin, href: 'https://www.linkedin.com/in/vy-nguyen-71629729b/' },
    { icon: MdEmail, href: 'mailto:vyn13217@gmail.com' },
  ];

  return (
    <section
      ref={ref}
      id="hero"
      style={{
        minHeight: '100vh',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #87CEEB 0%, #5BA3E6 60%, #4A90D9 100%)',
      }}
    >
      {/* Floating clouds */}
      {[
        { top: '10%', left: '5%', w: 200, h: 80, opacity: 0.7, blur: 2 },
        { top: '20%', right: '8%', w: 160, h: 65, opacity: 0.5, blur: 3 },
        { top: '55%', left: '12%', w: 180, h: 70, opacity: 0.4, blur: 2 },
        { top: '15%', left: '40%', w: 120, h: 50, opacity: 0.35, blur: 4 },
        { top: '40%', right: '20%', w: 140, h: 55, opacity: 0.3, blur: 3 },
      ].map((cloud, i) => (
        <motion.div
          key={i}
          style={{
            y: cloudY,
            position: 'absolute',
            top: cloud.top,
            left: cloud.left,
            right: (cloud as Record<string, unknown>).right as string | undefined,
            opacity: cloud.opacity,
          }}
        >
          <div
            style={{
              width: cloud.w,
              height: cloud.h,
              background: 'white',
              borderRadius: cloud.w / 2,
              filter: `blur(${cloud.blur}px)`,
              boxShadow: '0 10px 40px rgba(255,255,255,0.3)',
            }}
          />
        </motion.div>
      ))}

      {/* Question blocks decoration */}
      <motion.div
        style={{ y: cloudY }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          style={{
            position: 'absolute',
            top: '18%',
            right: '35%',
            width: 40,
            height: 40,
            background: 'linear-gradient(180deg, #F0C946 0%, #D4A017 100%)',
            borderRadius: 6,
            border: '3px solid #8B6914',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 900,
            fontSize: 18,
            color: '#8B6914',
            boxShadow: '0 4px 15px rgba(240, 201, 70, 0.4)',
          }}
        >
          ?
        </div>
      </motion.div>

      {/* Green hills at bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '25vh',
          background: 'linear-gradient(180deg, #2EA82E 0%, #228B22 100%)',
          borderRadius: '50% 50% 0 0 / 30% 30% 0 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: '-10%',
          width: '60%',
          height: '20vh',
          background: '#1E8C1E',
          borderRadius: '50% 50% 0 0',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: '-5%',
          width: '50%',
          height: '18vh',
          background: '#34B534',
          borderRadius: '50% 50% 0 0',
        }}
      />

      {/* Content grid */}
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 40px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          alignItems: 'center',
          gap: 40,
          width: '100%',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Left: text */}
        <motion.div style={{ y: textY }}>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                display: 'inline-block',
                padding: '6px 16px',
                background: 'rgba(240, 201, 70, 0.9)',
                borderRadius: 20,
                fontSize: 13,
                fontWeight: 700,
                color: '#1a1a2e',
                marginBottom: 16,
                letterSpacing: 0.5,
              }}
            >
              Full-Stack Developer
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 'clamp(48px, 8vw, 80px)',
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1.05,
              margin: '0 0 16px',
              textShadow: '0 4px 20px rgba(0,0,0,0.15)',
              letterSpacing: -2,
            }}
          >
            Vy
            <br />
            Nguyen
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: 16,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.7,
              maxWidth: 420,
              margin: '0 0 28px',
              fontWeight: 500,
            }}
          >
            3 years building web apps, AI tools, and cross-platform products.
            AWS Certified, hackathon winner, open-source contributor. Based in
            Toronto.
          </motion.p>

          {/* Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: 12, marginBottom: 24 }}
          >
            {socials.map(({ icon: Icon, href }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  backdropFilter: 'blur(8px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(255,255,255,0.3)',
                }}
              >
                <Icon size={20} />
              </a>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a
              href="#projects"
              style={{
                padding: '14px 28px',
                borderRadius: 12,
                background: '#F0C946',
                color: '#1a1a2e',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(240, 201, 70, 0.4)',
                transition: 'all 0.3s ease',
              }}
            >
              View Projects
            </a>
            <a
              href="/Vy Nguyen - Resume.pdf"
              target="_blank"
              style={{
                padding: '14px 28px',
                borderRadius: 12,
                background: 'rgba(255,255,255,0.15)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease',
              }}
            >
              Resume
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Mario */}
        <motion.div
          style={{
            y: marioY,
            rotate: marioRotate,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.img
            src="/sprites/mario-jump.png"
            alt="Mario jumping"
            initial={{ opacity: 0, scale: 0.7, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 'clamp(280px, 35vw, 450px)',
              height: 'auto',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))',
            }}
          />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '8vh',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 24,
            height: 40,
            borderRadius: 12,
            border: '2px solid rgba(255,255,255,0.5)',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 6,
          }}
        >
          <div
            style={{
              width: 4,
              height: 8,
              borderRadius: 2,
              background: 'rgba(255,255,255,0.7)',
            }}
          />
        </motion.div>
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #hero > div:last-of-type {
            grid-template-columns: 1fr !important;
            text-align: center;
            padding: 0 20px !important;
          }
        }
      `}</style>
    </section>
  );
}
