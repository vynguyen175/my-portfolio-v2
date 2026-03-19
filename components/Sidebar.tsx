'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'HOME' },
    { href: '/projects', label: 'PROJECTS' },
    { href: '/capstone', label: 'CAPSTONE' },
    { href: '/skills', label: 'SKILLS' },
    { href: '/about', label: 'ABOUT' },
    { href: '/credentials', label: 'CREDENTIALS' },
    { href: '/philosophy', label: 'PHILOSOPHY' },
    { href: '/contact', label: 'CONTACT' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          aria-hidden="true"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 40
          }}
        />
      )}

      {/* Sidebar */}
      <aside
        role="navigation"
        aria-label="Main menu"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 'min(240px, 85vw)',
          height: '100%',
          backgroundColor: '#8B7355',
          border: '6px solid #000',
          zIndex: 50,
          padding: 'clamp(12px, 3vw, 20px)',
          overflow: 'auto',
          boxShadow: '6px 0px 0px rgba(0,0,0,0.3)',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          boxSizing: 'border-box'
        }}
      >
        {/* Mario Sprite */}
        <div style={{
          textAlign: 'center',
          marginBottom: '24px',
          padding: '16px 0',
          borderBottom: '4px solid #000'
        }}>
          <img
            src="/sprites/mario-idle.png"
            alt="Mario"
            style={{
              height: '80px',
              objectFit: 'contain',
              animation: 'float 2s ease-in-out infinite'
            }}
          />
        </div>

        {/* Navigation */}
        <nav aria-label="Site navigation" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  textDecoration: 'none',
                  backgroundColor: isActive ? '#FFD700' : '#FFA500',
                  border: '3px solid #000',
                  padding: '12px 10px',
                  borderRadius: '4px',
                  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#000',
                  textAlign: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isActive ? '4px 4px 0px rgba(0,0,0,0.4)' : '3px 3px 0px rgba(0,0,0,0.3)',
                  transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
                  display: 'block'
                }}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Divider */}
          <div style={{ borderTop: '3px solid #000', margin: '4px 0' }} />

          {/* Resume & Cover Letter */}
          <Link
            href="/resume.pdf"
            target="_blank"
            onClick={onClose}
            style={{
              textDecoration: 'none',
              backgroundColor: '#FFF',
              border: '3px solid #000',
              padding: '12px 10px',
              borderRadius: '4px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12px',
              fontWeight: 800,
              color: '#000',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
              display: 'block'
            }}
          >
            RESUME
          </Link>

          <Link
            href="/cover-letter"
            onClick={onClose}
            style={{
              textDecoration: 'none',
              backgroundColor: pathname === '/cover-letter' ? '#FFD700' : '#FFF',
              border: '3px solid #000',
              padding: '12px 10px',
              borderRadius: '4px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '12px',
              fontWeight: 800,
              color: '#000',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: '3px 3px 0px rgba(0,0,0,0.3)',
              display: 'block'
            }}
          >
            COVER LETTER
          </Link>

          {/* Play Game */}
          <Link
            href="/play"
            onClick={onClose}
            style={{
              textDecoration: 'none',
              backgroundColor: 'transparent',
              border: '3px solid #FFD700',
              padding: '10px 10px',
              borderRadius: '4px',
              fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
              fontSize: '11px',
              fontWeight: 700,
              color: '#FFD700',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'block'
            }}
          >
            PLAY GAME
          </Link>
        </nav>
      </aside>
    </>
  );
}
