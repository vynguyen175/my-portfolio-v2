'use client';

import { Canvas } from '@react-three/fiber';
import { NavigationProvider } from './NavigationContext';
import WorldScene from './WorldScene';
import SectionNav from './SectionNav';

export default function World3D() {
  return (
    <NavigationProvider>
      <div style={{ width: '100vw', height: '100vh', position: 'relative', background: '#0B1120' }}>
        <Canvas camera={{ position: [0, 3, 20], fov: 60 }} shadows gl={{ antialias: true, alpha: false }} dpr={[1, 2]}>
          <WorldScene />
        </Canvas>
        <SectionNav />
      </div>
    </NavigationProvider>
  );
}
