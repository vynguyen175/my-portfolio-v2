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
        background: 'var(--hero-bg)',
      }}
    >
      {/* Realistic floating clouds — horizontal drift */}
      {[
        { top: '8%', startX: -5, speed: 40, scale: 1.2, opacity: 0.9 },
        { top: '22%', startX: 60, speed: 55, scale: 0.8, opacity: 0.7 },
        { top: '50%', startX: 10, speed: 48, scale: 1, opacity: 0.5 },
        { top: '15%', startX: 35, speed: 60, scale: 0.6, opacity: 0.6 },
        { top: '38%', startX: 75, speed: 45, scale: 0.9, opacity: 0.4 },
      ].map((cloud, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: cloud.top,
            left: `${cloud.startX}%`,
            opacity: cloud.opacity,
            transform: `scale(${cloud.scale})`,
            animation: `cloudDrift${i} ${cloud.speed}s linear infinite`,
            pointerEvents: 'none',
          }}
        >
          {/* 3D cloud shape */}
          <div style={{ position: 'relative', width: '180px', height: '80px', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.08))' }}>
            {/* Base */}
            <div style={{
              position: 'absolute', bottom: 0, left: '8%', width: '84%', height: '50%',
              background: 'linear-gradient(180deg, #FFFFFF 0%, #E8F0FE 100%)',
              borderRadius: '50px',
              boxShadow: 'inset 0 4px 8px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(180,200,230,0.3)',
            }} />
            {/* Left puff */}
            <div style={{
              position: 'absolute', bottom: '25%', left: '5%', width: '35%', height: '65%',
              background: 'radial-gradient(circle at 40% 35%, #FFFFFF 0%, #EDF2FC 60%, #DCE6F5 100%)',
              borderRadius: '50%',
              boxShadow: 'inset 0 4px 10px rgba(255,255,255,0.8), inset 0 -3px 6px rgba(180,200,230,0.2)',
            }} />
            {/* Center puff (tallest) */}
            <div style={{
              position: 'absolute', bottom: '20%', left: '25%', width: '40%', height: '90%',
              background: 'radial-gradient(circle at 45% 30%, #FFFFFF 0%, #F0F5FF 50%, #DCE6F5 100%)',
              borderRadius: '50%',
              boxShadow: 'inset 0 6px 12px rgba(255,255,255,0.9), inset 0 -4px 8px rgba(170,190,220,0.25)',
            }} />
            {/* Right puff */}
            <div style={{
              position: 'absolute', bottom: '22%', left: '50%', width: '38%', height: '75%',
              background: 'radial-gradient(circle at 50% 35%, #FFFFFF 0%, #EDF2FC 55%, #D8E4F3 100%)',
              borderRadius: '50%',
              boxShadow: 'inset 0 5px 10px rgba(255,255,255,0.85), inset 0 -3px 6px rgba(180,200,230,0.2)',
            }} />
            {/* Small top puff */}
            <div style={{
              position: 'absolute', bottom: '55%', left: '35%', width: '25%', height: '45%',
              background: 'radial-gradient(circle at 50% 30%, #FFFFFF 0%, #F0F5FF 100%)',
              borderRadius: '50%',
              boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.9)',
            }} />
            {/* Bottom shadow */}
            <div style={{
              position: 'absolute', bottom: '-8%', left: '15%', width: '70%', height: '20%',
              background: 'radial-gradient(ellipse, rgba(150,180,220,0.15) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />
          </div>
        </div>
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
          background: `linear-gradient(180deg, var(--hero-hill3) 0%, var(--hero-hill1) 100%)`,
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
          background: 'var(--hero-hill2)',
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
          background: 'var(--hero-hill3)',
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
              color: 'var(--section-text)',
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
              color: 'var(--section-text-sub)',
              lineHeight: 1.7,
              maxWidth: 420,
              margin: '0 0 28px',
              fontWeight: 500,
            }}
          >
            3 years building web apps, AI tools, and cross-platform products.
            Hackathon winner, open-source contributor. Based in
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
            <a
              href="/play"
              style={{
                padding: '14px 28px',
                borderRadius: 12,
                background: '#E52521',
                color: '#fff',
                fontSize: 14,
                fontWeight: 700,
                textDecoration: 'none',
                boxShadow: '0 4px 15px rgba(229, 37, 33, 0.35)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              🎮 Play Mario Game
            </a>
          </motion.div>
        </motion.div>

        {/* Right: Your photo */}
        <motion.div
          style={{
            y: marioY,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 60 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'relative',
              width: 'clamp(260px, 30vw, 380px)',
              height: 'clamp(260px, 30vw, 380px)',
            }}
          >
            {/* Gold ring border */}
            <div style={{
              position: 'absolute',
              inset: '-6px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F0C946, #FFD700, #E5A800, #F0C946)',
              boxShadow: '0 8px 30px rgba(240, 201, 70, 0.4), 0 0 60px rgba(240, 201, 70, 0.15)',
            }} />
            {/* White inner ring */}
            <div style={{
              position: 'absolute',
              inset: '0px',
              borderRadius: '50%',
              background: 'white',
            }} />
            {/* Photo */}
            <img
              src="/me-1.jpg"
              alt="Vy Nguyen"
              style={{
                position: 'absolute',
                inset: '4px',
                width: 'calc(100% - 8px)',
                height: 'calc(100% - 8px)',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
              }}
            />
            {/* Small Mario floating next to photo */}
            <motion.img
              src="/sprites/mario-jump.png"
              alt="Mario jumping in celebration"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-30px',
                width: '100px',
                height: 'auto',
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
                zIndex: 2,
              }}
            />
            {/* Star decoration */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              style={{
                position: 'absolute',
                top: '-15px',
                right: '10px',
                fontSize: '28px',
                filter: 'drop-shadow(0 2px 8px rgba(240, 201, 70, 0.5))',
              }}
            >
              ⭐
            </motion.div>
          </motion.div>
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
        @keyframes cloudDrift0 {
          0% { transform: scale(1.2) translateX(0); }
          100% { transform: scale(1.2) translateX(110vw); }
        }
        @keyframes cloudDrift1 {
          0% { transform: scale(0.8) translateX(0); }
          100% { transform: scale(0.8) translateX(-110vw); }
        }
        @keyframes cloudDrift2 {
          0% { transform: scale(1) translateX(0); }
          100% { transform: scale(1) translateX(110vw); }
        }
        @keyframes cloudDrift3 {
          0% { transform: scale(0.6) translateX(0); }
          100% { transform: scale(0.6) translateX(-110vw); }
        }
        @keyframes cloudDrift4 {
          0% { transform: scale(0.9) translateX(0); }
          100% { transform: scale(0.9) translateX(110vw); }
        }
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
