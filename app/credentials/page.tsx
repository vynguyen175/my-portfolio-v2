'use client';

import { useEffect } from 'react';

export default function Redirect() {
  useEffect(() => {
    window.location.replace('/#credentials');
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#0B1120',
      color: '#94A3B8',
      fontSize: '14px',
    }}>
      Redirecting...
    </div>
  );
}
