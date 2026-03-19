import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const alt = 'Vy Nguyen - Full-Stack Developer Portfolio';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(180deg, #0a1929 0%, #1a237e 50%, #0d47a1 100%)',
          position: 'relative',
        }}
      >
        {/* Ground */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '130px',
            background: '#8b7355',
            display: 'flex',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '70px',
            background: '#6B5344',
            display: 'flex',
          }}
        />

        {/* Lucky box left */}
        <div
          style={{
            position: 'absolute',
            left: '160px',
            top: '340px',
            width: '50px',
            height: '50px',
            background: '#E6A817',
            border: '4px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#FFF',
          }}
        >
          ?
        </div>

        {/* Lucky box right */}
        <div
          style={{
            position: 'absolute',
            right: '160px',
            top: '340px',
            width: '50px',
            height: '50px',
            background: '#E6A817',
            border: '4px solid #000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#FFF',
          }}
        >
          ?
        </div>

        {/* Content card */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 64px',
            borderRadius: '16px',
            background: 'rgba(0,0,0,0.55)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {/* Name */}
          <div
            style={{
              fontSize: '64px',
              fontWeight: 900,
              color: '#FFD700',
              letterSpacing: '4px',
              marginBottom: '12px',
              display: 'flex',
            }}
          >
            VY NGUYEN
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: '26px',
              fontWeight: 700,
              color: '#FFFFFF',
              letterSpacing: '3px',
              marginBottom: '20px',
              display: 'flex',
            }}
          >
            FULL-STACK DEVELOPER
          </div>

          {/* Tech stack */}
          <div
            style={{
              fontSize: '16px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '1px',
              marginBottom: '16px',
              display: 'flex',
            }}
          >
            React / Next.js / TypeScript / Python / AI-ML / AWS
          </div>

          {/* Location */}
          <div
            style={{
              fontSize: '14px',
              fontWeight: 500,
              color: 'rgba(255,255,255,0.5)',
              letterSpacing: '2px',
              display: 'flex',
            }}
          >
            TORONTO, CANADA
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
