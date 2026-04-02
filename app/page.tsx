'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const World3D = dynamic(() => import('@/components/3d/World3D'), { ssr: false });
const MobileFallback = dynamic(() => import('@/components/3d/MobileFallback'), { ssr: false });

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!mounted) return null;

  return isMobile ? <MobileFallback /> : <World3D />;
}
