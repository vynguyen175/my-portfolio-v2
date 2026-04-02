'use client';

import { Suspense, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { NavigationProvider } from './NavigationContext';
import WorldScene from './WorldScene';
import SectionNav from './SectionNav';
import LoadingScreen from '../LoadingScreen';
import KonamiCode from '../KonamiCode';
import DarkModeToggle from '../DarkModeToggle';

function World3DInner() {
  return (
    <Canvas
      camera={{ position: [0, 3, 18], fov: 55 }}
      shadows
      gl={{ antialias: true, alpha: false, toneMapping: 3 }}
      dpr={[1, 2]}
    >
      <Suspense fallback={null}>
        <WorldScene />
        <EffectComposer>
          <Bloom
            luminanceThreshold={0.4}
            luminanceSmoothing={0.9}
            intensity={0.6}
            mipmapBlur
          />
          <Vignette eskil={false} offset={0.1} darkness={0.4} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}

export default function World3D() {
  const [loading, setLoading] = useState(() => {
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('loaded');
    }
    return true;
  });

  const handleComplete = useCallback(() => {
    sessionStorage.setItem('loaded', '1');
    setLoading(false);
  }, []);

  return (
    <NavigationProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0B1120' }}>
        {loading ? (
          <LoadingScreen onComplete={handleComplete} />
        ) : (
          <>
            <World3DInner />
            <SectionNav />
            <KonamiCode />
            <div style={{ position: 'absolute', top: '24px', right: '24px', zIndex: 100 }}>
              <DarkModeToggle />
            </div>
          </>
        )}
      </div>
    </NavigationProvider>
  );
}
