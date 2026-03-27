'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Only show on pages with enough scroll content
  if (pathname === '/play') return null;

  const links = [
    { href: '/', label: 'Home' },
    { href: '/projects', label: 'Projects' },
    { href: '/skills', label: 'Skills' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav
      aria-label="Sticky navigation"
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : '-60px'})`,
        zIndex: 90,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '40px',
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.4)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Name badge */}
      <span style={{
        color: '#F0C946',
        fontWeight: 800,
        fontSize: '12px',
        padding: '6px 14px',
        letterSpacing: '-0.3px',
        whiteSpace: 'nowrap',
      }}>
        VN
      </span>

      <div style={{
        width: '1px',
        height: '16px',
        background: 'rgba(255, 255, 255, 0.1)',
        margin: '0 4px',
      }} />

      {links.map(link => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              color: isActive ? '#F0C946' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '20px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              background: isActive ? 'rgba(240, 201, 70, 0.1)' : 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
