'use client';

interface HamburgerButtonProps {
  onClick: () => void;
}

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="nav-btn hamburger-btn"
      aria-label="Open navigation menu"
      style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: 45,
        backgroundColor: '#FFD700',
        padding: '12px 16px',
        fontSize: '24px',
      }}
    >
      &#9776;
    </button>
  );
}
