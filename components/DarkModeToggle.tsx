'use client';

import { useTheme } from '@/contexts/ThemeContext';
import { FaSun, FaMoon } from 'react-icons/fa';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="social-btn"
      style={{
        position: 'fixed',
        top: '16px',
        right: '16px',
        zIndex: 45,
        width: '44px',
        height: '44px',
        backdropFilter: 'blur(12px)',
        background: 'rgba(15, 23, 42, 0.8)',
      }}
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <FaMoon color="#94A3B8" size={18} />
      ) : (
        <FaSun color="#F0C946" size={18} />
      )}
    </button>
  );
}
