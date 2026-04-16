'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { useTheme } from '@/contexts/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const marioY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const marioRotate = useTransform(scrollYProgress, [0, 1], [0, -10]);
  const cloudY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [photoTilt, setPhotoTilt] = useState({ x: 0, y: 0 });
  const photoRef = useRef<HTMLDivElement>(null);

  const handlePhotoMove = (e: React.MouseEvent) => {
    if (!photoRef.current) return;
    const rect = photoRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setPhotoTilt({ x: y * -15, y: x * 15 });
  };

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
      }}
    >
      {/* Sky — day or night */}
      <div style={{
        position: 'absolute', inset: 0,
        background: isDark
          ? `linear-gradient(180deg, #0a0e1a 0%, #0f1628 15%, #141e38 30%, #182548 45%, #1a2d55 60%, #1e3560 75%, #1a2d50 90%, #162440 100%)`
          : `linear-gradient(180deg, #1B4F8A 0%, #3A7BD5 15%, #5B9DE6 30%, #7AB8F0 45%, #9ECFF5 60%, #C5E3FA 72%, #DFF0FB 82%, #F0F7FD 90%, #FEFEFE 100%)`,
        transition: 'background 0.6s ease',
      }} />

      {/* Sun (light) or Moon (dark) */}
      {isDark ? (
        <>
          {/* Moon */}
          <div style={{
            position: 'absolute',
            top: '8%',
            right: '15%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 35%, #FFFDE8 0%, #F5F0C8 40%, #E8E0A0 100%)',
            boxShadow: '0 0 60px rgba(255,250,200,0.3), 0 0 120px rgba(255,250,200,0.15)',
            pointerEvents: 'none',
          }} />
          {/* Moon craters */}
          <div style={{
            position: 'absolute',
            top: 'calc(8% + 20px)',
            right: 'calc(15% + 25px)',
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            background: 'rgba(200,190,140,0.3)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            top: 'calc(8% + 45px)',
            right: 'calc(15% + 10px)',
            width: '10px',
            height: '10px',
            borderRadius: '50%',
            background: 'rgba(200,190,140,0.25)',
            pointerEvents: 'none',
          }} />

          {/* Stars */}
          {Array.from({ length: 60 }).map((_, i) => (
            <div key={`star-${i}`} style={{
              position: 'absolute',
              top: `${Math.random() * 65}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2.5 + 1}px`,
              height: `${Math.random() * 2.5 + 1}px`,
              background: '#fff',
              borderRadius: '50%',
              opacity: Math.random() * 0.7 + 0.2,
              animation: `heroStarTwinkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
              pointerEvents: 'none',
            }} />
          ))}

          {/* Moon glow */}
          <div style={{
            position: 'absolute',
            top: '5%',
            right: '12%',
            width: '200px',
            height: '200px',
            background: 'radial-gradient(circle, rgba(255,250,200,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }} />
        </>
      ) : (
        <>
          {/* Sun glow */}
          <div style={{
            position: 'absolute',
            top: '8%',
            right: '15%',
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,248,220,0.6) 0%, rgba(255,223,140,0.2) 30%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }} />
          {/* Atmospheric haze near horizon */}
          <div style={{
            position: 'absolute',
            bottom: '20vh',
            left: 0,
            right: 0,
            height: '15vh',
            background: 'linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.15) 100%)',
            pointerEvents: 'none',
          }} />
        </>
      )}

      {/* Clouds — volumetric (dimmed in dark mode) */}
      {[
        { top: '6%', startX: -10, speed: 80, scaleX: 1.4, scaleY: 1, opacity: 0.95, size: 280 },
        { top: '18%', startX: 55, speed: 100, scaleX: 1, scaleY: 0.9, opacity: 0.85, size: 220 },
        { top: '12%', startX: 25, speed: 120, scaleX: 0.7, scaleY: 0.7, opacity: 0.5, size: 160 },
        { top: '30%', startX: 70, speed: 90, scaleX: 0.9, scaleY: 0.8, opacity: 0.4, size: 200 },
        { top: '8%', startX: 85, speed: 110, scaleX: 1.1, scaleY: 0.85, opacity: 0.7, size: 240 },
        { top: '35%', startX: 5, speed: 95, scaleX: 0.6, scaleY: 0.6, opacity: 0.3, size: 140 },
      ].map((cloud, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: cloud.top,
            left: `${cloud.startX}%`,
            opacity: isDark ? cloud.opacity * 0.15 : cloud.opacity,
            transform: `scaleX(${cloud.scaleX}) scaleY(${cloud.scaleY})`,
            animation: `cloudDrift${i % 5} ${cloud.speed}s linear infinite`,
            pointerEvents: 'none',
          }}
        >
          {/* Photorealistic cloud — heavy blur layering */}
          <div style={{
            position: 'relative',
            width: `${cloud.size}px`,
            height: `${cloud.size * 0.5}px`,
          }}>
            {/* Core mass */}
            <div style={{
              position: 'absolute', bottom: '5%', left: '8%', width: '84%', height: '60%',
              background: 'white',
              borderRadius: '200px',
              filter: `blur(${cloud.size * 0.04}px)`,
            }} />
            {/* Center dome */}
            <div style={{
              position: 'absolute', bottom: '20%', left: '20%', width: '45%', height: '100%',
              background: 'white',
              borderRadius: '50%',
              filter: `blur(${cloud.size * 0.035}px)`,
            }} />
            {/* Left bump */}
            <div style={{
              position: 'absolute', bottom: '15%', left: '0%', width: '40%', height: '75%',
              background: 'rgba(255,255,255,0.95)',
              borderRadius: '50%',
              filter: `blur(${cloud.size * 0.04}px)`,
            }} />
            {/* Right bump */}
            <div style={{
              position: 'absolute', bottom: '12%', left: '50%', width: '42%', height: '80%',
              background: 'rgba(255,255,255,0.93)',
              borderRadius: '50%',
              filter: `blur(${cloud.size * 0.038}px)`,
            }} />
            {/* Top highlight */}
            <div style={{
              position: 'absolute', bottom: '50%', left: '28%', width: '30%', height: '50%',
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '50%',
              filter: `blur(${cloud.size * 0.05}px)`,
            }} />
            {/* Bottom shadow */}
            <div style={{
              position: 'absolute', bottom: '0%', left: '12%', width: '76%', height: '35%',
              background: 'rgba(180,200,230,0.2)',
              borderRadius: '200px',
              filter: `blur(${cloud.size * 0.06}px)`,
            }} />
          </div>
        </div>
      ))}

      {/* Rolling hills — layered with depth */}
      {/* Distant hills */}
      <div style={{
        position: 'absolute',
        bottom: '14vh',
        left: '-5%',
        right: '-5%',
        height: '18vh',
        background: isDark
          ? 'linear-gradient(180deg, #1a3a1a 0%, #142e14 100%)'
          : 'linear-gradient(180deg, #8DB87C 0%, #7AAD68 100%)',
        borderRadius: '60% 50% 0 0 / 100% 100% 0 0',
        opacity: isDark ? 0.7 : 0.5,
        filter: 'blur(2px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '12vh',
        left: '20%',
        right: '-10%',
        height: '16vh',
        background: isDark
          ? 'linear-gradient(180deg, #153015 0%, #0f240f 100%)'
          : 'linear-gradient(180deg, #6EA55A 0%, #5C9348 100%)',
        borderRadius: '55% 45% 0 0 / 100% 100% 0 0',
        opacity: isDark ? 0.8 : 0.6,
        filter: 'blur(1px)',
      }} />

      {/* Main foreground hill */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-5%',
        right: '-5%',
        height: '22vh',
        background: isDark
          ? 'linear-gradient(180deg, #1a4a1a 0%, #143814 15%, #0f2e0f 35%, #0a240a 55%, #061a06 100%)'
          : 'linear-gradient(180deg, #4CAF50 0%, #43A047 15%, #388E3C 35%, #2E7D32 55%, #1B5E20 100%)',
        borderRadius: '45% 55% 0 0 / 25% 30% 0 0',
        boxShadow: isDark
          ? 'inset 0 8px 20px rgba(30,80,30,0.3), inset 0 -5px 15px rgba(0,20,0,0.3)'
          : 'inset 0 8px 20px rgba(100,200,100,0.3), inset 0 -5px 15px rgba(0,50,0,0.2)',
      }} />
      {/* Left foreground hill */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: '-8%',
        width: '55%',
        height: '18vh',
        background: isDark
          ? 'linear-gradient(180deg, #143814 0%, #0f2e0f 30%, #0a240a 60%, #061a06 100%)'
          : 'linear-gradient(180deg, #43A047 0%, #388E3C 30%, #2E7D32 60%, #1B5E20 100%)',
        borderRadius: '50% 60% 0 0 / 100% 100% 0 0',
      }} />
      {/* Right foreground hill */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: '-5%',
        width: '50%',
        height: '16vh',
        background: isDark
          ? 'linear-gradient(180deg, #1e501e 0%, #1a4a1a 25%, #143814 50%, #0a240a 100%)'
          : 'linear-gradient(180deg, #66BB6A 0%, #4CAF50 25%, #43A047 50%, #2E7D32 100%)',
        borderRadius: '55% 40% 0 0 / 100% 100% 0 0',
      }} />
      {/* Grass texture — noise-like pattern for realism */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '22vh',
        backgroundImage: isDark ? 'none' : `
          radial-gradient(ellipse 1.5px 8px at 15% 8%, rgba(60,180,60,0.4) 0%, transparent 100%),
          radial-gradient(ellipse 1px 6px at 30% 12%, rgba(80,200,80,0.3) 0%, transparent 100%),
          radial-gradient(ellipse 2px 9px at 48% 6%, rgba(50,170,50,0.35) 0%, transparent 100%),
          radial-gradient(ellipse 1px 7px at 62% 10%, rgba(70,190,70,0.3) 0%, transparent 100%),
          radial-gradient(ellipse 1.5px 8px at 78% 7%, rgba(60,180,60,0.35) 0%, transparent 100%),
          radial-gradient(ellipse 1px 5px at 90% 14%, rgba(80,200,80,0.25) 0%, transparent 100%),
          radial-gradient(ellipse 2px 6px at 5% 18%, rgba(40,160,40,0.3) 0%, transparent 100%)
        `,
        backgroundSize: '40px 30px',
        backgroundRepeat: 'repeat',
        pointerEvents: 'none',
        zIndex: 1,
      }} />
      {/* Light dappling on grass */}
      {!isDark && (
        <>
          <div style={{
            position: 'absolute',
            bottom: '12vh',
            left: '8%',
            width: '30%',
            height: '10vh',
            background: 'radial-gradient(ellipse, rgba(150,255,100,0.15) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(15px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '8vh',
            right: '12%',
            width: '25%',
            height: '8vh',
            background: 'radial-gradient(ellipse, rgba(170,255,120,0.12) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(12px)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '6vh',
            left: '40%',
            width: '20%',
            height: '6vh',
            background: 'radial-gradient(ellipse, rgba(130,240,90,0.1) 0%, transparent 70%)',
            borderRadius: '50%',
            filter: 'blur(10px)',
            pointerEvents: 'none',
          }} />
        </>
      )}

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
            {['Vy', 'Nguyen'].map((word, i) => (
              <span key={word} style={{ display: i === 0 ? 'inline' : 'block' }}>
                {word.split('').map((char, j) => (
                  <motion.span
                    key={`${word}-${j}`}
                    initial={{ opacity: 0, y: 80, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                      duration: 0.6,
                      delay: 0.15 + (i * word.length + j) * 0.04,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{
                      display: 'inline-block',
                      transformOrigin: 'bottom',
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
                {i === 0 && <span>&nbsp;</span>}
              </span>
            ))}
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
            #1 team in Canada at IEEEXtreme 19.0, hackathon winner, open-source contributor. Based in Toronto.
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
                className="glass"
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--section-text)',
                  transition: 'all 0.3s ease',
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
            className="hero-cta-row"
            style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
          >
            <a href="#projects" className="glass-btn hero-cta" style={{ background: 'rgba(240,201,70,0.85)', color: '#1a1a2e', border: '1px solid rgba(240,201,70,0.9)', boxShadow: '0 4px 20px rgba(240,201,70,0.3)' }}>
              View Projects
            </a>
            <a href="/resume.pdf" target="_blank" className="glass-btn hero-cta" style={{ color: 'var(--section-text)' }}>
              Resume
            </a>
            <a href="/play" className="glass-btn hero-cta" style={{ background: 'rgba(229,37,33,0.8)', color: '#fff', border: '1px solid rgba(229,37,33,0.9)', boxShadow: '0 4px 20px rgba(229,37,33,0.25)', whiteSpace: 'nowrap' }}>
              Play Mario Game
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
            className="hero-photo-wrapper"
            style={{
              position: 'relative',
              width: 'clamp(260px, 30vw, 380px)',
              height: 'clamp(260px, 30vw, 380px)',
            }}
          >
            {/* 3D tilt photo container */}
            <div
              ref={photoRef}
              onMouseMove={handlePhotoMove}
              onMouseLeave={() => setPhotoTilt({ x: 0, y: 0 })}
              style={{
                position: 'absolute',
                inset: '-6px',
                borderRadius: '50%',
                transform: `perspective(600px) rotateX(${photoTilt.x}deg) rotateY(${photoTilt.y}deg)`,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.15s ease-out',
              }}
            >
            {/* Gold ring border */}
            <div style={{
              position: 'absolute',
              inset: '0px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F0C946, #FFD700, #E5A800, #F0C946)',
              boxShadow: '0 8px 30px rgba(240, 201, 70, 0.4), 0 0 60px rgba(240, 201, 70, 0.15)',
            }} />
            {/* White inner ring */}
            <div style={{
              position: 'absolute',
              inset: '6px',
              borderRadius: '50%',
              background: 'white',
            }} />
            {/* Photo */}
            <img
              src="/me-1.jpg"
              alt="Vy Nguyen"
              style={{
                position: 'absolute',
                inset: '10px',
                width: 'calc(100% - 20px)',
                height: 'calc(100% - 20px)',
                borderRadius: '50%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
              }}
            />
            </div>
            {/* Small Mario floating next to photo */}
            <motion.img
              src="/sprites/mario-jump.png"
              alt="Mario jumping in celebration"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="hero-mario-sprite"
              style={{
                position: 'absolute',
                bottom: '-10px',
                right: '-20px',
                width: '80px',
                height: 'auto',
                filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.25))',
                zIndex: 2,
              }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="hero-scroll-indicator"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        style={{
          position: 'absolute',
          bottom: '26vh',
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
        @keyframes heroStarTwinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.9; }
        }
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
        @media (max-width: 900px) {
          #hero {
            align-items: flex-start !important;
            padding-top: 80px !important;
          }
          #hero > div:last-of-type {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            text-align: center;
            padding: 0 24px !important;
            gap: 28px !important;
          }
          /* Reorder: photo first, text second */
          #hero > div:last-of-type > div:first-child {
            order: 2 !important;
          }
          #hero > div:last-of-type > div:last-child {
            order: 1 !important;
          }
          #hero > div:last-of-type > div:first-child p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
          #hero > div:last-of-type > div:first-child > div {
            justify-content: center !important;
          }
          #hero .hero-photo-wrapper {
            width: 180px !important;
            height: 180px !important;
          }
          #hero .hero-mario-sprite {
            width: 50px !important;
            right: -8px !important;
            bottom: -5px !important;
          }
          #hero .hero-scroll-indicator {
            display: none !important;
          }
        }
        @media (max-width: 480px) {
          #hero {
            padding-top: 60px !important;
          }
          #hero > div:last-of-type {
            padding: 0 16px !important;
            gap: 20px !important;
          }
          #hero .hero-photo-wrapper {
            width: 150px !important;
            height: 150px !important;
          }
          #hero .hero-mario-sprite {
            width: 40px !important;
            right: -5px !important;
          }
          #hero .hero-cta-row {
            flex-direction: column !important;
            width: 100% !important;
          }
          #hero .hero-cta {
            width: 100% !important;
            text-align: center !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  );
}
