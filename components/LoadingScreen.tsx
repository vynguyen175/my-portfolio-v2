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
      background: '#0B1120',
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
          background: 'radial-gradient(circle, rgba(240, 201, 70, 0.3), transparent 70%)',
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
          background: 'radial-gradient(circle, rgba(96, 165, 250, 0.2), transparent 70%)',
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
        {/* Center ? block */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '64px',
          height: '64px',
          background: 'linear-gradient(135deg, #F0C946, #D4A830)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 40px rgba(240, 201, 70, 0.4), inset 0 2px 0 rgba(255, 255, 255, 0.3), inset 0 -2px 0 rgba(0, 0, 0, 0.2)',
          border: '3px solid #B8922A',
          animation: 'questionBlockBounce 1.5s ease-in-out infinite',
        }}>
          <span style={{
            fontSize: '28px',
            fontWeight: 900,
            color: '#0B1120',
            textShadow: '0 1px 0 rgba(255,255,255,0.3)',
            fontFamily: 'var(--font-geist-sans)',
          }}>?</span>
        </div>

        {/* Orbiting items */}
        {CHARACTERS.map((char, i) => {
          const angle = (360 / CHARACTERS.length) * i;
          return (
            <div
              key={char.label}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '36px',
                height: '36px',
                marginLeft: '-18px',
                marginTop: '-18px',
                animation: `orbit 4s linear infinite`,
                animationDelay: `${-(i * 4) / CHARACTERS.length}s`,
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  fontSize: '22px',
                  animation: `counterOrbit 4s linear infinite`,
                  animationDelay: `${-(i * 4) / CHARACTERS.length}s`,
                  filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.5))',
                }}
                aria-label={char.label}
              >
                {char.emoji}
              </span>
            </div>
          );
        })}
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
        background: 'rgba(255, 255, 255, 0.08)',
        borderRadius: '3px',
        overflow: 'hidden',
        marginBottom: '16px',
      }}>
        <div style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #F0C946, #FFD700)',
          borderRadius: '3px',
          transition: 'width 0.1s linear',
          boxShadow: '0 0 10px rgba(240, 201, 70, 0.4)',
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
