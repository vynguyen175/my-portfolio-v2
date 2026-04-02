'use client';

import { useState, useCallback, useEffect } from 'react';
import dynamic from 'next/dynamic';
import GradientMesh from './GradientMesh';
import ScrollProgress from './ScrollProgress';
import StickyNav from './StickyNav';
import ScrollToTop from './ScrollToTop';
import CustomCursor from './CustomCursor';
import ContextMenu from './ContextMenu';

const LoadingScreen = dynamic(() => import('./LoadingScreen'), { ssr: false });

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [isRoot, setIsRoot] = useState(false);

  // Check sessionStorage after mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setIsRoot(window.location.pathname === '/');
    if (sessionStorage.getItem('loaded')) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading && mounted) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [loading, mounted]);

  const handleComplete = useCallback(() => {
    window.scrollTo(0, 0);
    sessionStorage.setItem('loaded', '1');
    setLoading(false);
  }, []);

  const showLoader = loading && mounted;

  // On the root 3D route, only keep cursor and context menu — World3D handles the rest
  if (isRoot) {
    return (
      <>
        <CustomCursor />
        <ContextMenu />
        {children}
      </>
    );
  }

  return (
    <>
      {showLoader && <LoadingScreen onComplete={handleComplete} />}
      {!showLoader && mounted && (
        <>
          <ScrollProgress />
          <StickyNav />
        </>
      )}
      <CustomCursor />
      <ContextMenu />
      <ScrollToTop />
      <GradientMesh />
      <div style={{
        opacity: (!mounted || showLoader) ? 0 : 1,
        transition: mounted ? 'opacity 0.5s ease 0.2s' : 'none',
      }}>
        {children}
      </div>
    </>
  );
}
