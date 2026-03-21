'use client';

interface HamburgerButtonProps {
  onClick: () => void;
}

export default function HamburgerButton({ onClick }: HamburgerButtonProps) {
  return (
    <button
      onClick={onClick}
      className="hamburger-btn"
      aria-label="Open navigation menu"
      style={{
        position: 'fixed',
        top: '16px',
        left: '16px',
        zIndex: 45,
      }}
    >
      &#9776;
    </button>
  );
}
