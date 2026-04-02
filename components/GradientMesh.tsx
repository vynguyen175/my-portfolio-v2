'use client';

export default function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Primary gold blob */}
      <div style={{
        position: 'absolute',
        width: 'min(600px, 80vw)',
        height: 'min(600px, 80vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--mesh-gold), transparent 70%)',
        top: '10%',
        right: '-10%',
        animation: 'meshFloat1 20s ease-in-out infinite',
      }} />

      {/* Blue accent blob */}
      <div style={{
        position: 'absolute',
        width: 'min(500px, 70vw)',
        height: 'min(500px, 70vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--mesh-blue), transparent 70%)',
        bottom: '10%',
        left: '-5%',
        animation: 'meshFloat2 25s ease-in-out infinite',
      }} />

      {/* Green accent blob */}
      <div style={{
        position: 'absolute',
        width: 'min(400px, 60vw)',
        height: 'min(400px, 60vw)',
        borderRadius: '50%',
        background: 'radial-gradient(circle, var(--mesh-green), transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'meshFloat3 18s ease-in-out infinite',
      }} />

      {/* Noise texture overlay */}
      <div className="mesh-noise" />
    </div>
  );
}
