'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyNav() {
  const [visible, setVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);

      // Track active section
      const sections = ['hero', 'about', 'projects', 'skills', 'credentials', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.getBoundingClientRect().top <= 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (pathname === '/play') return null;

  const links = [
    { href: '#hero', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#skills', label: 'Skills' },
    { href: '#about', label: 'About' },
    { href: '#credentials', label: 'Credentials' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Sticky navigation"
      style={{
        position: 'fixed',
        top: '12px',
        left: '50%',
        transform: `translateX(-50%) translateY(${visible ? '0' : '-60px'})`,
        zIndex: 90,
        background: 'var(--bg-panel-solid)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        border: '1px solid var(--border)',
        borderRadius: '40px',
        padding: '6px 8px',
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
        boxShadow: 'var(--shadow-lg)',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {/* Name badge */}
      <span style={{
        color: 'var(--gold)',
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
        background: 'var(--border)',
        margin: '0 4px',
      }} />

      {links.map(link => {
        const sectionId = link.href.replace('#', '');
        const isActive = activeSection === sectionId;
        return (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => handleClick(e, link.href)}
            style={{
              color: isActive ? 'var(--gold)' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 600,
              padding: '6px 12px',
              borderRadius: '20px',
              textDecoration: 'none',
              transition: 'all 0.2s ease',
              background: isActive ? 'var(--ctx-hover-bg)' : 'transparent',
              whiteSpace: 'nowrap',
            }}
          >
            {link.label}
          </a>
        );
      })}
    </nav>
  );
}
