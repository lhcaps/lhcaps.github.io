/**
 * CoreSphere — CSS-only glowing sphere.
 * No Canvas, no WebGL. Pure radial gradient + box-shadow layers + pulse animation.
 */
interface CoreSphereProps {
  size?: number
}

export function CoreSphere({ size = 96 }: CoreSphereProps) {
  return (
    <div
      className="absolute left-1/2 top-1/2 pointer-events-none"
      style={{
        width: size,
        height: size,
        transform: 'translate(-50%, -50%)',
      }}
      aria-hidden="true"
    >
      {/* Core orb */}
      <div
        className="absolute inset-0 rounded-full core-orb"
        style={{
          background: 'radial-gradient(circle at 35% 30%, #ffffff 0%, #67E8F9 35%, #0ea5e9 70%, transparent 100%)',
          animation: 'core-pulse 4s ease-in-out infinite',
          boxShadow: `
            0 0 20px rgba(103,232,249,0.6),
            0 0 40px rgba(103,232,249,0.4),
            0 0 80px rgba(103,232,249,0.15),
            0 0 120px rgba(103,232,249,0.06)
          `,
        }}
      />

      {/* Outer halo ring — thin */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-12px',
          border: '1px solid rgba(103,232,249,0.2)',
          animation: 'halo-rotate 12s linear infinite',
          boxShadow: '0 0 12px rgba(103,232,249,0.12) inset',
        }}
      />

      {/* Mid halo */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-28px',
          border: '1px solid rgba(167,139,250,0.12)',
          animation: 'halo-rotate 20s linear infinite reverse',
        }}
      />

      {/* Outer diffuse glow */}
      <div
        className="absolute rounded-full"
        style={{
          inset: '-48px',
          background: 'radial-gradient(circle, rgba(103,232,249,0.08) 0%, transparent 70%)',
          animation: 'core-pulse 4s ease-in-out infinite',
        }}
      />

      <style>{`
        .core-orb { width: 96px !important; height: 96px !important; }
        @keyframes core-pulse {
          0%, 100% {
            transform: scale(1);
            filter: brightness(1);
          }
          50% {
            transform: scale(1.06);
            filter: brightness(1.15);
          }
        }
        @keyframes halo-rotate {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @media (max-width: 639px) {
          .core-orb { width: 64px !important; height: 64px !important; }
        }
      `}</style>
    </div>
  )
}
