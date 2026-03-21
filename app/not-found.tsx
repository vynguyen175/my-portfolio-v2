'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function NotFound() {
  const [pipeY, setPipeY] = useState(-200);
  const [marioY, setMarioY] = useState(-150);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Mario falls down
    setTimeout(() => setMarioY(0), 100);
    setTimeout(() => setPipeY(0), 300);
    setTimeout(() => setShowContent(true), 800);
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0B1120',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 16px',
      textAlign: 'center',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Pipe */}
      <div style={{
        transform: `translateY(${pipeY}px)`,
        transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
        marginBottom: '24px',
      }}>
        <div style={{
          width: '80px',
          height: '40px',
          background: '#2D8B2D',
          border: '3px solid #1A5C1A',
          borderRadius: '4px 4px 0 0',
          position: 'relative',
        }}>
          <div style={{
            width: '90px',
            height: '16px',
            background: '#35A535',
            border: '3px solid #1A5C1A',
            borderRadius: '4px',
            position: 'absolute',
            top: '-3px',
            left: '-8px',
          }} />
        </div>
      </div>

      {/* Mario falling */}
      <img
        src="/sprites/mario-idle.png"
        alt="Mario"
        style={{
          height: '64px',
          objectFit: 'contain',
          transform: `translateY(${marioY}px)`,
          transition: 'transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
          marginBottom: '32px',
          opacity: marioY === 0 ? 1 : 0.5,
        }}
      />

      {/* Content */}
      <div style={{
        opacity: showContent ? 1 : 0,
        transform: showContent ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.5s ease',
      }}>
        <h1 style={{
          color: '#F0C946',
          fontSize: 'clamp(48px, 10vw, 96px)',
          fontWeight: 900,
          margin: '0 0 8px',
          letterSpacing: '-2px',
          lineHeight: 1,
        }}>
          404
        </h1>

        <p style={{
          color: '#F1F5F9',
          fontSize: 'clamp(18px, 4vw, 24px)',
          fontWeight: 700,
          margin: '0 0 12px',
        }}>
          Wrong Pipe!
        </p>

        <p style={{
          color: '#94A3B8',
          fontSize: '14px',
          margin: '0 0 32px',
          lineHeight: 1.6,
          maxWidth: '360px',
        }}>
          This page doesn&apos;t exist. Mario took a wrong turn.
        </p>

        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/" className="nav-btn nav-btn-primary">
            Back to Home
          </Link>
          <Link href="/projects" className="nav-btn">
            View Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
