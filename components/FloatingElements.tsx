'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const elements = [
  // Question blocks
  { type: 'block', top: '5%', left: '92%', size: 32, opacity: 0.12, speed: 0.3 },
  { type: 'block', top: '35%', left: '2%', size: 28, opacity: 0.1, speed: 0.5 },
  { type: 'block', top: '65%', left: '95%', size: 24, opacity: 0.11, speed: 0.4 },
  { type: 'block', top: '85%', left: '8%', size: 30, opacity: 0.08, speed: 0.6 },

  // Coins
  { type: 'coin', top: '12%', left: '88%', size: 20, opacity: 0.15, speed: 0.35 },
  { type: 'coin', top: '28%', left: '5%', size: 18, opacity: 0.12, speed: 0.45 },
  { type: 'coin', top: '52%', left: '93%', size: 16, opacity: 0.13, speed: 0.55 },
  { type: 'coin', top: '72%', left: '3%', size: 22, opacity: 0.1, speed: 0.4 },
  { type: 'coin', top: '90%', left: '90%', size: 18, opacity: 0.09, speed: 0.5 },

  // Stars
  { type: 'star', top: '20%', left: '96%', size: 22, opacity: 0.12, speed: 0.25 },
  { type: 'star', top: '48%', left: '1%', size: 20, opacity: 0.1, speed: 0.35 },
  { type: 'star', top: '78%', left: '97%', size: 18, opacity: 0.11, speed: 0.45 },
];

function QuestionBlock({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div style={{
      width: size, height: size, opacity,
      perspective: '200px',
      animation: 'blockBob 3s ease-in-out infinite',
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: 'linear-gradient(145deg, #FFE066 0%, #F0C946 40%, #C49B1A 100%)',
        borderRadius: size * 0.18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 900, fontSize: size * 0.5, color: '#7A5A00',
        boxShadow: `
          inset 0 ${size * 0.08}px 0 rgba(255,255,255,0.4),
          inset 0 -${size * 0.08}px 0 rgba(0,0,0,0.2),
          inset ${size * 0.06}px 0 0 rgba(255,255,255,0.15),
          inset -${size * 0.06}px 0 0 rgba(0,0,0,0.1),
          0 ${size * 0.15}px ${size * 0.3}px rgba(180,130,20,0.4),
          0 ${size * 0.05}px ${size * 0.1}px rgba(0,0,0,0.2)
        `,
        border: `1.5px solid rgba(180,130,20,0.6)`,
        textShadow: '0 1px 0 rgba(255,255,255,0.3), 0 -1px 0 rgba(0,0,0,0.2)',
        transform: 'rotateX(5deg) rotateY(-5deg)',
        transformStyle: 'preserve-3d',
      }}>
        ?
      </div>
    </div>
  );
}

function Coin({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div style={{
      width: size, height: size, opacity,
      animation: 'coinSpin3D 3s ease-in-out infinite',
      perspective: '150px',
    }}>
      <div style={{
        width: '100%', height: '100%',
        borderRadius: '50%',
        background: 'radial-gradient(circle at 35% 35%, #FFE066 0%, #F0C946 30%, #DAA520 60%, #B8860B 100%)',
        boxShadow: `
          inset 0 ${size * 0.1}px ${size * 0.15}px rgba(255,255,255,0.5),
          inset 0 -${size * 0.05}px ${size * 0.1}px rgba(0,0,0,0.3),
          0 ${size * 0.12}px ${size * 0.25}px rgba(180,130,20,0.5),
          0 ${size * 0.04}px ${size * 0.08}px rgba(0,0,0,0.2)
        `,
        border: '1px solid rgba(180,130,20,0.5)',
      }} />
    </div>
  );
}

function Star({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div style={{
      width: size, height: size, opacity,
      animation: 'starPulse3D 2.5s ease-in-out infinite',
      filter: `drop-shadow(0 ${size * 0.15}px ${size * 0.25}px rgba(240,201,70,0.5))`,
    }}>
      <div style={{
        width: '100%', height: '100%',
        background: 'radial-gradient(circle at 40% 35%, #FFE066 0%, #F0C946 40%, #DAA520 100%)',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        boxShadow: 'inset 0 -2px 4px rgba(0,0,0,0.2)',
      }} />
    </div>
  );
}

export default function FloatingElements() {
  const { scrollYProgress } = useScroll();

  return (
    <div style={{
      position: 'fixed', inset: 0,
      pointerEvents: 'none', zIndex: 2, overflow: 'hidden',
    }}>
      {elements.map((el, i) => (
        <FloatingItem key={i} el={el} scrollYProgress={scrollYProgress} />
      ))}

      <style>{`
        @keyframes coinSpin3D {
          0%, 100% { transform: scaleX(1) rotateY(0deg); }
          25% { transform: scaleX(0.3) rotateY(90deg); }
          50% { transform: scaleX(1) rotateY(180deg); }
          75% { transform: scaleX(0.3) rotateY(270deg); }
        }
        @keyframes starPulse3D {
          0%, 100% { transform: scale(1) rotateZ(0deg); }
          50% { transform: scale(1.2) rotateZ(15deg); }
        }
        @keyframes blockBob {
          0%, 100% { transform: translateY(0) rotateX(5deg) rotateY(-5deg); }
          50% { transform: translateY(-6px) rotateX(-3deg) rotateY(5deg); }
        }
      `}</style>
    </div>
  );
}

function FloatingItem({
  el,
  scrollYProgress,
}: {
  el: (typeof elements)[0];
  scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'];
}) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -300 * el.speed]);

  const Component =
    el.type === 'block' ? QuestionBlock : el.type === 'coin' ? Coin : Star;

  return (
    <motion.div style={{ position: 'absolute', top: el.top, left: el.left, y }}>
      <Component size={el.size} opacity={el.opacity} />
    </motion.div>
  );
}
