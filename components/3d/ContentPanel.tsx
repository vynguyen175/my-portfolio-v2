'use client';

import { Html } from '@react-three/drei';
import { ReactNode } from 'react';

interface ContentPanelProps {
  position: [number, number, number];
  children: ReactNode;
  width?: string;
  rotation?: [number, number, number];
}

export default function ContentPanel({
  position,
  children,
  width = '420px',
  rotation = [0, 0, 0],
}: ContentPanelProps) {
  return (
    <Html
      position={position}
      rotation={rotation}
      transform
      distanceFactor={10}
      style={{
        width,
        pointerEvents: 'auto',
      }}
    >
      <div
        style={{
          background: 'rgba(11, 17, 32, 0.75)',
          backdropFilter: 'blur(16px)',
          border: '1px solid rgba(240, 201, 70, 0.2)',
          borderRadius: '16px',
          padding: '28px',
          color: '#E2E8F0',
          fontFamily: 'var(--font-geist-sans), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 80px rgba(240, 201, 70, 0.05)',
        }}
      >
        {children}
      </div>
    </Html>
  );
}
