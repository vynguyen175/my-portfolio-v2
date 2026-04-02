'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

const elements = [
  // Question blocks
  { type: 'block', top: '5%', left: '92%', size: 32, opacity: 0.08, speed: 0.3 },
  { type: 'block', top: '35%', left: '2%', size: 28, opacity: 0.06, speed: 0.5 },
  { type: 'block', top: '65%', left: '95%', size: 24, opacity: 0.07, speed: 0.4 },
  { type: 'block', top: '85%', left: '8%', size: 30, opacity: 0.05, speed: 0.6 },

  // Coins
  { type: 'coin', top: '12%', left: '88%', size: 20, opacity: 0.1, speed: 0.35 },
  { type: 'coin', top: '28%', left: '5%', size: 18, opacity: 0.08, speed: 0.45 },
  { type: 'coin', top: '52%', left: '93%', size: 16, opacity: 0.09, speed: 0.55 },
  { type: 'coin', top: '72%', left: '3%', size: 22, opacity: 0.07, speed: 0.4 },
  { type: 'coin', top: '90%', left: '90%', size: 18, opacity: 0.06, speed: 0.5 },

  // Stars
  { type: 'star', top: '20%', left: '96%', size: 22, opacity: 0.08, speed: 0.25 },
  { type: 'star', top: '48%', left: '1%', size: 20, opacity: 0.06, speed: 0.35 },
  { type: 'star', top: '78%', left: '97%', size: 18, opacity: 0.07, speed: 0.45 },
];

function QuestionBlock({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(180deg, #F0C946, #D4A017)',
        borderRadius: size * 0.15,
        border: `2px solid #8B6914`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 900,
        fontSize: size * 0.45,
        color: '#8B6914',
        opacity,
      }}
    >
      ?
    </div>
  );
}

function Coin({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #F0C946, #FFD700, #DAA520)',
        border: `2px solid #B8860B`,
        opacity,
        animation: 'coinSpin 3s ease-in-out infinite',
      }}
    />
  );
}

function Star({ size, opacity }: { size: number; opacity: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        opacity,
        background: '#F0C946',
        clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
        animation: 'starPulse 2.5s ease-in-out infinite',
      }}
    />
  );
}

export default function FloatingElements() {
  const { scrollYProgress } = useScroll();

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {elements.map((el, i) => {
        return <FloatingItem key={i} el={el} scrollYProgress={scrollYProgress} />;
      })}

      <style>{`
        @keyframes coinSpin {
          0%, 100% { transform: scaleX(1); }
          50% { transform: scaleX(0.3); }
        }
        @keyframes starPulse {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.15); filter: brightness(1.3); }
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
    <motion.div
      style={{
        position: 'absolute',
        top: el.top,
        left: el.left,
        y,
      }}
    >
      <Component size={el.size} opacity={el.opacity} />
    </motion.div>
  );
}
