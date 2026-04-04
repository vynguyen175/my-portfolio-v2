'use client';

import { useState, useEffect } from 'react';

const CHARACTERS = [
  { emoji: '🍄', label: 'Mushroom' },
  { emoji: '⭐', label: 'Star' },
  { emoji: '🪙', label: 'Coin' },
  { emoji: '🔥', label: 'Fire' },
  { emoji: '🐢', label: 'Shell' },
  { emoji: '🌸', label: 'Flower' },
];

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => setExiting(true), 300);
      return () => clearTimeout(timer);
    }
  }, [progress]);

  useEffect(() => {
    if (exiting) {
      const timer = setTimeout(onComplete, 800);
      return () => clearTimeout(timer);
    }
  }, [exiting, onComplete]);

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'var(--bg-body)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.4, 0, 0, 1)',
      opacity: exiting ? 0 : 1,
      transform: exiting ? 'scale(1.1)' : 'scale(1)',
      pointerEvents: exiting ? 'none' : 'auto',
    }}>
      {/* Gradient mesh background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        opacity: 0.4,
      }}>
        <div style={{
          position: 'absolute',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--glow-gold), transparent 70%)',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          animation: 'loadingPulse 3s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, var(--mesh-blue), transparent 70%)',
          top: '60%',
          left: '30%',
          transform: 'translate(-50%, -50%)',
          animation: 'loadingPulse 4s ease-in-out infinite 1s',
        }} />
      </div>

      {/* Orbiting characters */}
      <div style={{
        position: 'relative',
        width: '200px',
        height: '200px',
        marginBottom: '40px',
      }}>
        {/* Center ? block — 3D */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '68px',
          height: '68px',
          background: 'linear-gradient(145deg, #FFE066 0%, #F0C946 35%, #C49B1A 100%)',
          borderRadius: '14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: `
            0 0 50px var(--glow-gold),
            0 8px 24px rgba(180,130,20,0.5),
            0 2px 8px rgba(0,0,0,0.3),
            inset 0 3px 0 rgba(255,255,255,0.4),
            inset 0 -3px 0 rgba(0,0,0,0.2),
            inset 3px 0 0 rgba(255,255,255,0.15),
            inset -3px 0 0 rgba(0,0,0,0.1)
          `,
          border: '2px solid rgba(180,130,20,0.6)',
          animation: 'questionBlockBounce 1.5s ease-in-out infinite',
        }}>
          <span style={{
            fontSize: '30px',
            fontWeight: 900,
            color: '#7A5A00',
            textShadow: '0 2px 0 rgba(255,255,255,0.35), 0 -1px 0 rgba(0,0,0,0.15)',
            fontFamily: 'var(--font-geist-sans)',
          }}>?</span>
        </div>

        {/* Orbiting items — 3D glassmorphic bubbles */}
        {CHARACTERS.map((char, i) => (
          <div
            key={char.label}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '44px',
              height: '44px',
              marginLeft: '-22px',
              marginTop: '-22px',
              animation: `orbit 4s linear infinite`,
              animationDelay: `${-(i * 4) / CHARACTERS.length}s`,
            }}
          >
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '44px',
                height: '44px',
                fontSize: '24px',
                animation: `counterOrbit 4s linear infinite`,
                animationDelay: `${-(i * 4) / CHARACTERS.length}s`,
                background: 'radial-gradient(circle at 35% 30%, rgba(255,255,255,0.25) 0%, rgba(255,255,255,0.05) 50%, rgba(0,0,0,0.1) 100%)',
                borderRadius: '50%',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: `
                  0 4px 12px rgba(0,0,0,0.3),
                  0 8px 24px rgba(0,0,0,0.15),
                  inset 0 2px 4px rgba(255,255,255,0.2),
                  inset 0 -2px 4px rgba(0,0,0,0.15)
                `,
                backdropFilter: 'blur(4px)',
                filter: 'drop-shadow(0 2px 6px rgba(240,201,70,0.2))',
              }}
              aria-label={char.label}
            >
              {char.emoji}
            </span>
          </div>
        ))}
      </div>

      {/* Mario running sprite */}
      <div style={{ marginBottom: '32px', height: '40px' }}>
        <img
          src="/sprites/mario-run.png"
          alt="Mario running"
          style={{
            height: '40px',
            objectFit: 'contain',
            imageRendering: 'pixelated',
            animation: 'marioRun 0.8s steps(1) infinite',
          }}
        />
      </div>

      {/* Progress bar */}
      <div style={{
        width: '220px',
        height: '6px',
        background: 'var(--surface)',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, var(--gold), #FFD700)',
          borderRadius: '3px',
          transition: 'width 0.1s linear',
          boxShadow: `0 0 10px var(--progress-shadow)`,
        }} />
      </div>

      {/* Loading text */}
      <p style={{
        color: 'var(--text-muted)',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: 0,
      }}>
        {progress < 100 ? 'Loading world...' : 'Let\'s-a go!'}
      </p>

      <style>{`
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(85px); }
          to { transform: rotate(360deg) translateX(85px); }
        }
        @keyframes counterOrbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
        @keyframes questionBlockBounce {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.08); }
        }
        @keyframes loadingPulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.4; }
          50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.6; }
        }
        @keyframes marioRun {
          0% { transform: scaleX(1); }
          50% { transform: scaleX(-1); }
        }
      `}</style>
    </div>
  );
}
