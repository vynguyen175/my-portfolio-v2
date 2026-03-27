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
        background: 'radial-gradient(circle, rgba(240, 201, 70, 0.08), transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(96, 165, 250, 0.06), transparent 70%)',
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
        background: 'radial-gradient(circle, rgba(52, 211, 153, 0.04), transparent 70%)',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        animation: 'meshFloat3 18s ease-in-out infinite',
      }} />

      {/* Noise texture overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat',
        backgroundSize: '128px 128px',
      }} />
    </div>
  );
}
