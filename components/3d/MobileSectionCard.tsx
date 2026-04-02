'use client';

import { ReactNode } from 'react';

interface MobileSectionCardProps {
  title: string;
  subtitle?: string;
  bgGradient: string;
  children: ReactNode;
}

export default function MobileSectionCard({ title, subtitle, bgGradient, children }: MobileSectionCardProps) {
  return (
    <section style={{
      minHeight: '100vh',
      width: '100vw',
      flexShrink: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px 16px',
      background: bgGradient,
      position: 'relative',
      scrollSnapAlign: 'start',
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        background: 'rgba(11, 17, 32, 0.8)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(240, 201, 70, 0.2)',
        borderRadius: '16px',
        padding: '24px',
        maxHeight: '80vh',
        overflowY: 'auto',
      }}>
        <h2 style={{ color: '#F0C946', fontSize: '22px', fontWeight: 800, margin: '0 0 4px' }}>{title}</h2>
        {subtitle && <p style={{ color: '#94A3B8', fontSize: '12px', margin: '0 0 16px' }}>{subtitle}</p>}
        {children}
      </div>
    </section>
  );
}
