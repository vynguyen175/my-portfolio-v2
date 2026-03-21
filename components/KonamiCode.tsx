'use client';

import { useEffect, useState, useRef, useCallback } from 'react';

const KONAMI_SEQUENCE = [
  'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
  'b', 'a',
];

interface Coin {
  id: number;
  x: number;
  delay: number;
}

export default function KonamiCode() {
  const sequenceRef = useRef<string[]>([]);
  const activatedRef = useRef(false);
  const [activated, setActivated] = useState(false);
  const [marioX, setMarioX] = useState(-100);
  const [coins, setCoins] = useState<Coin[]>([]);
  const [showMessage, setShowMessage] = useState(false);

  const triggerEasterEgg = useCallback(() => {
    if (activatedRef.current) return;
    activatedRef.current = true;
    setActivated(true);

    // Spawn coins
    const newCoins: Coin[] = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 1.5,
    }));
    setCoins(newCoins);

    // Animate Mario running across
    setMarioX(-100);
    let start: number | null = null;
    const duration = 2500;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      const newX = -100 + progress * (window.innerWidth + 200);
      setMarioX(newX);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);

    // Show message after Mario passes
    setTimeout(() => setShowMessage(true), 1500);

    // Clean up after animation
    setTimeout(() => {
      activatedRef.current = false;
      setActivated(false);
      setShowMessage(false);
      setCoins([]);
      setMarioX(-100);
      sequenceRef.current = [];
    }, 6000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activatedRef.current) return;

      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      const next = [...sequenceRef.current, key].slice(-KONAMI_SEQUENCE.length);
      sequenceRef.current = next;

      if (next.length === KONAMI_SEQUENCE.length &&
          next.every((k, i) => k === KONAMI_SEQUENCE[i])) {
        sequenceRef.current = [];
        triggerEasterEgg();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerEasterEgg]);

  if (!activated) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999,
      pointerEvents: showMessage ? 'auto' : 'none',
      overflow: 'hidden',
    }}>
      {/* Coin rain */}
      {coins.map(coin => (
        <div
          key={coin.id}
          style={{
            position: 'absolute',
            left: `${coin.x}%`,
            top: '-40px',
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #F0C946, #E5A800)',
            border: '2px solid #B8860B',
            boxShadow: '0 0 12px rgba(240, 201, 70, 0.6)',
            animation: `coinFall 2s ${coin.delay}s ease-in forwards`,
          }}
        />
      ))}

      {/* Mario running */}
      <img
        src="/sprites/mario-run.png"
        alt="Mario running"
        style={{
          position: 'absolute',
          bottom: '80px',
          left: `${marioX}px`,
          height: '64px',
          objectFit: 'contain',
          filter: 'drop-shadow(0 0 8px rgba(240, 201, 70, 0.4))',
        }}
      />

      {/* Secret message */}
      {showMessage && (
        <div
          onClick={() => {
            activatedRef.current = false;
            setActivated(false);
            setShowMessage(false);
            setCoins([]);
            sequenceRef.current = [];
          }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(11, 17, 32, 0.85)',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.5s ease',
            cursor: 'pointer',
          }}
        >
          <div style={{
            textAlign: 'center',
            maxWidth: '500px',
            padding: '48px 32px',
            background: 'rgba(15, 23, 42, 0.9)',
            border: '1px solid rgba(240, 201, 70, 0.3)',
            borderRadius: '16px',
            boxShadow: '0 0 60px rgba(240, 201, 70, 0.15)',
          }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>
              &#11088;
            </div>
            <h2 style={{
              color: '#F0C946',
              fontSize: '24px',
              fontWeight: 800,
              marginBottom: '12px',
              letterSpacing: '-0.5px',
            }}>
              You Found the Secret!
            </h2>
            <p style={{
              color: '#94A3B8',
              fontSize: '14px',
              lineHeight: 1.7,
              marginBottom: '8px',
            }}>
              You just entered the Konami Code. That tells me you&apos;re curious, detail-oriented, and probably a lot of fun to work with.
            </p>
            <p style={{
              color: '#64748B',
              fontSize: '13px',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}>
              I build things with the same attention to detail — from hidden easter eggs to production-grade applications.
            </p>
            <div style={{
              display: 'inline-block',
              background: 'rgba(240, 201, 70, 0.1)',
              border: '1px solid rgba(240, 201, 70, 0.2)',
              borderRadius: '8px',
              padding: '12px 20px',
              color: '#F0C946',
              fontSize: '13px',
              fontWeight: 600,
            }}>
              Click anywhere to close
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes coinFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          80% { opacity: 1; }
          100% { transform: translateY(calc(100vh + 40px)) rotate(720deg); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
