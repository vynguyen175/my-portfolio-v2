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
      distanceFactor={8}
      style={{
        width,
        pointerEvents: 'auto',
      }}
      occlude={false}
    >
      <div
        style={{
          background: 'rgba(11, 17, 32, 0.85)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(240, 201, 70, 0.25)',
          borderRadius: '20px',
          padding: '32px',
          color: '#E2E8F0',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.5), 0 0 100px rgba(240, 201, 70, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
        }}
      >
        {children}
      </div>
    </Html>
  );
}
