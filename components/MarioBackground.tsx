'use client';

import { useEffect, useRef } from 'react';
import { useThemeSafe } from '@/hooks/useThemeSafe';
import {
  generateCloudSprite,
  generateBushSprite,
  generateGroundTile,
  generatePipe,
} from '@/lib/spriteGenerator';

interface MarioBackgroundProps {
  backgroundColor?: string;
  children?: React.ReactNode;
}

function MarioBackgroundContent({ children }: { children: React.ReactNode }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useThemeSafe();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Draw gradient background based on theme
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (theme === 'light') {
        gradient.addColorStop(0, '#5c94fc');
        gradient.addColorStop(1, '#3a7bd5');
      } else {
        gradient.addColorStop(0, '#0a1929');
        gradient.addColorStop(0.5, '#1a237e');
        gradient.addColorStop(1, '#0d47a1');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars in dark mode
      if (theme === 'dark') {
        ctx.fillStyle = '#ffffff';
        const starCount = 50;
        for (let i = 0; i < starCount; i++) {
          const x = (i * 137.5) % canvas.width;
          const y = (i * 73.3) % (canvas.height * 0.6);
          const size = Math.sin(i * 0.5) * 1.5 + 1;
          ctx.fillRect(x, y, size, size);
        }
      }

      // Draw clouds (fewer, only at edges)
      const cloudCanvas = generateCloudSprite();
      const clouds = [
        { x: 50, y: 80 },
        { x: canvas.width - 200, y: 120 },
      ];
      clouds.forEach(cloud => {
        if (cloud.x < canvas.width) ctx.drawImage(cloudCanvas, cloud.x, cloud.y);
      });

      // Draw bushes (fewer, near ground edges only)
      const bushCanvas = generateBushSprite();
      const bushes = [
        { x: 30, y: canvas.height - 200 },
        { x: canvas.width - 120, y: canvas.height - 210 },
      ];
      bushes.forEach(bush => {
        if (bush.x < canvas.width) ctx.drawImage(bushCanvas, bush.x, bush.y);
      });

      // Minimal decorative blocks - pushed to edges
      const pipeCanvas = generatePipe();
      const groundLevel = canvas.height - 150;
      ctx.drawImage(pipeCanvas, 60, groundLevel - 100);
      if (canvas.width > 900) {
        ctx.drawImage(pipeCanvas, canvas.width - 100, groundLevel - 110);
      }

      // Draw ground
      const groundY = canvas.height - 100;
      ctx.fillStyle = theme === 'dark' ? '#2c2416' : '#8b7355';
      ctx.fillRect(0, groundY, canvas.width, 100);

      ctx.fillStyle = theme === 'dark' ? '#1a1410' : '#6B5344';
      ctx.fillRect(0, groundY + 60, canvas.width, 40);

      const groundTileCanvas = generateGroundTile();
      const tileW = 48;
      for (let x = 0; x < canvas.width + tileW; x += tileW) {
        ctx.drawImage(groundTileCanvas, x, groundY);
      }
    };

    draw();

    const handleResize = () => draw();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme]);

  return (
    <div className="relative min-h-screen overflow-y-auto">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none"
        style={{ zIndex: 0 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function MarioBackground({ backgroundColor = 'from-blue-200 to-yellow-100', children }: MarioBackgroundProps) {
  return (
    <MarioBackgroundContent>{children}</MarioBackgroundContent>
  );
}
