'use client';

import { useEffect, useCallback } from 'react';
import { useNavigation, SECTIONS } from './NavigationContext';

export default function SectionNav() {
  const { currentIndex, goToSection, goNext, goPrev, isMoving } = useNavigation();

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isMoving) return;
    if (e.key === 'ArrowRight' || e.key === 'd') goNext();
    if (e.key === 'ArrowLeft' || e.key === 'a') goPrev();
  }, [goNext, goPrev, isMoving]);

  const handleWheel = useCallback((e: WheelEvent) => {
    if (isMoving) return;
    if (Math.abs(e.deltaY) < 30) return;
    if (e.deltaY > 0) goNext();
    else goPrev();
  }, [goNext, goPrev, isMoving]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleKeyDown, handleWheel]);

  return (
    <nav style={{
      position: 'absolute', top: '24px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: '8px', padding: '8px 16px',
      background: 'rgba(11, 17, 32, 0.7)', backdropFilter: 'blur(12px)',
      borderRadius: '24px', border: '1px solid rgba(240, 201, 70, 0.15)', zIndex: 100,
    }}>
      {SECTIONS.map((section, i) => (
        <button key={section.id} onClick={() => goToSection(i)}
          aria-label={`Go to ${section.label}`}
          aria-current={i === currentIndex ? 'true' : undefined}
          style={{
            width: i === currentIndex ? 'auto' : '10px', height: '10px',
            padding: i === currentIndex ? '4px 12px' : '0', borderRadius: '12px',
            border: 'none', cursor: 'pointer',
            background: i === currentIndex ? '#F0C946' : 'rgba(255, 255, 255, 0.3)',
            color: i === currentIndex ? '#0B1120' : 'transparent',
            fontSize: '11px', fontWeight: 700, transition: 'all 0.3s ease',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
          {i === currentIndex ? section.label : ''}
        </button>
      ))}
    </nav>
  );
}
