'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import MarioGame from '@/components/MarioGame';

function KeyboardInstructions() {
  const keyStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    border: '2px solid #333',
    borderRadius: '6px',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    boxShadow: '0 2px 0 #666',
  };

  const spaceKeyStyle: React.CSSProperties = {
    ...keyStyle,
    width: '100px',
  };

  const labelStyle: React.CSSProperties = {
    fontSize: '12px',
    color: '#fff',
    marginTop: '4px',
    textShadow: '1px 1px 2px rgba(0,0,0,0.8)',
  };

  const groupStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '30px',
        alignItems: 'flex-end',
        zIndex: 1000,
        fontFamily: '"Press Start 2P", monospace, Arial',
      }}
    >
      <div style={groupStyle}>
        <div style={{ display: 'flex', gap: '4px' }}>
          <div style={keyStyle}>&#8592;</div>
          <div style={keyStyle}>&#8594;</div>
        </div>
        <span style={labelStyle}>MOVE</span>
      </div>
      <div style={groupStyle}>
        <div style={spaceKeyStyle}>SPACE</div>
        <span style={labelStyle}>JUMP</span>
      </div>
    </div>
  );
}

function MobileNotice() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: '#0a1929',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px',
      textAlign: 'center',
      zIndex: 2000,
    }}>
      <img
        src="/sprites/mario-idle.png"
        alt="Mario"
        style={{
          height: '80px',
          objectFit: 'contain',
          marginBottom: '24px',
          animation: 'float 2s ease-in-out infinite',
        }}
      />
      <h2 style={{
        color: '#FFD700',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '24px',
        fontWeight: 900,
        marginBottom: '16px',
        letterSpacing: '2px',
      }}>
        BEST ON DESKTOP
      </h2>
      <p style={{
        color: 'rgba(255,255,255,0.8)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '1.6',
        maxWidth: '360px',
        marginBottom: '32px',
      }}>
        This Mario game uses keyboard controls (arrow keys + spacebar) and is best experienced on a desktop or laptop.
      </p>
      <Link
        href="/"
        className="nav-btn"
        style={{
          backgroundColor: '#FFD700',
        }}
      >
        BACK TO HOME
      </Link>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
      `}</style>
    </div>
  );
}

export default function Play() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileNotice />;
  }

  return (
    <div style={{ margin: 0, padding: 0, width: '100%', height: '100%', overflow: 'hidden' }}>
      <Link
        href="/"
        className="nav-btn"
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 1000,
          backgroundColor: '#FFD700',
          border: '4px solid #000',
          letterSpacing: '1px',
        }}
      >
        BACK TO HOME
      </Link>
      <MarioGame />
      <KeyboardInstructions />
    </div>
  );
}
