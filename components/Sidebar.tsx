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
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/capstone', label: 'Capstone' },
    { href: '/skills', label: 'Skills' },
    { href: '/about', label: 'About' },
    { href: '/credentials', label: 'Credentials' },
    { href: '/philosophy', label: 'Philosophy' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
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
            backgroundColor: 'var(--overlay)',
            backdropFilter: 'blur(4px)',
            zIndex: 40,
          }}
        />
      )}

      <aside
        role="navigation"
        aria-label="Main menu"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          width: 'min(260px, 85vw)',
          height: '100%',
          background: 'var(--bg-panel-solid)',
          backdropFilter: 'blur(20px)',
          borderRight: '1px solid var(--border)',
          zIndex: 50,
          padding: '24px 20px',
          overflow: 'auto',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          boxSizing: 'border-box',
        }}
      >
        {/* Mario Sprite */}
        <div style={{
          textAlign: 'center',
          marginBottom: '32px',
          padding: '20px 0',
          borderBottom: '1px solid var(--border)',
        }}>
          <img
            src="/sprites/mario-idle.png"
            alt="Mario"
            style={{
              height: '64px',
              objectFit: 'contain',
              animation: 'float 3s ease-in-out infinite',
              opacity: 0.9,
            }}
          />
        </div>

        <nav aria-label="Site navigation" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                style={{
                  textDecoration: 'none',
                  background: isActive ? 'var(--ctx-hover-bg)' : 'transparent',
                  borderLeft: isActive ? '2px solid var(--gold)' : '2px solid transparent',
                  padding: '10px 14px',
                  borderRadius: '0 6px 6px 0',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                  display: 'block',
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <div style={{ borderTop: '1px solid var(--border)', margin: '12px 0' }} />

          <Link
            href="/resume.pdf"
            target="_blank"
            onClick={onClose}
            style={{
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              transition: 'all 0.15s ease',
              display: 'block',
              borderLeft: '2px solid transparent',
            }}
          >
            Resume
          </Link>

          <Link
            href="/cover-letter"
            onClick={onClose}
            style={{
              textDecoration: 'none',
              background: pathname === '/cover-letter' ? 'var(--ctx-hover-bg)' : 'transparent',
              borderLeft: pathname === '/cover-letter' ? '2px solid var(--gold)' : '2px solid transparent',
              padding: '10px 14px',
              borderRadius: '0 6px 6px 0',
              fontSize: '13px',
              fontWeight: pathname === '/cover-letter' ? 700 : 500,
              color: pathname === '/cover-letter' ? 'var(--gold)' : 'var(--text-secondary)',
              transition: 'all 0.15s ease',
              display: 'block',
            }}
          >
            Cover Letter
          </Link>

          <div style={{ borderTop: '1px solid var(--border)', margin: '12px 0' }} />

          <Link
            href="/play"
            onClick={onClose}
            style={{
              textDecoration: 'none',
              padding: '10px 14px',
              borderRadius: '6px',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--text-muted)',
              transition: 'all 0.15s ease',
              display: 'block',
              borderLeft: '2px solid transparent',
            }}
          >
            Play Mario Game
          </Link>
        </nav>
      </aside>
    </>
  );
}
