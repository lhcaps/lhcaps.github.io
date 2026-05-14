/**
 * HaloDecoration — rotating orbit rings around the core sphere.
 * Pure CSS + inline. No Canvas, no WebGL.
 */
export function HaloDecoration() {
  return (
    <div
      className="absolute inset-0 pointer-events-none halo-rings"
      aria-hidden="true"
    >
      {/* Orbit ring 1 — violet */}
      <div
        className="halo-ring-1"
        style={{
          left: '50%',
          top: '50%',
          borderRadius: '50%',
          border: '1px dashed rgba(167,139,250,0.18)',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit-spin-1 30s linear infinite',
        }}
      />

      {/* Orbit ring 2 — cyan */}
      <div
        className="halo-ring-2"
        style={{
          left: '50%',
          top: '50%',
          borderRadius: '50%',
          border: '0.5px dashed rgba(103,232,249,0.15)',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit-spin-2 20s linear infinite reverse',
        }}
      />

      {/* Orbit ring 3 — tight */}
      <div
        className="halo-ring-3"
        style={{
          left: '50%',
          top: '50%',
          borderRadius: '50%',
          border: '0.5px dashed rgba(103,232,249,0.10)',
          transform: 'translate(-50%, -50%)',
          animation: 'orbit-spin-3 14s linear infinite',
        }}
      />

      {/* Orbiting dots on each ring */}
      <div className="absolute w-1.5 h-1.5 rounded-full halo-dot-1" style={{ animation: 'orbit-dot-1 30s linear infinite' }} />
      <div className="absolute w-1 h-1 rounded-full halo-dot-2" style={{ animation: 'orbit-dot-2 20s linear infinite' }} />
      <div className="absolute w-0.75 h-0.75 rounded-full halo-dot-3" style={{ animation: 'orbit-dot-3 14s linear infinite reverse' }} />

      <style>{`
        .halo-ring-1 { width: 320px; height: 320px; }
        .halo-ring-2 { width: 240px; height: 240px; }
        .halo-ring-3 { width: 160px; height: 160px; }

        .halo-dot-1 {
          left: calc(50% - 160px);
          top: 50%;
          margin-left: -4px;
          margin-top: -4px;
          background: #A78BFA;
          box-shadow: 0 0 6px #A78BFA, 0 0 12px #A78BFA80;
        }
        .halo-dot-2 {
          left: calc(50% + 120px);
          top: 50%;
          margin-left: -2px;
          margin-top: -2px;
          background: #67E8F9;
          box-shadow: 0 0 4px #67E8F9, 0 0 8px #67E8F980;
        }
        .halo-dot-3 {
          left: calc(50% - 80px);
          top: 50%;
          margin-left: -2px;
          margin-top: -2px;
          background: #67E8F9;
          box-shadow: 0 0 3px #67E8F9;
        }

        @keyframes orbit-spin-1 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-spin-2 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-spin-3 {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to   { transform: translate(-50%, -50%) rotate(360deg); }
        }
        @keyframes orbit-dot-1 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-dot-2 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        @keyframes orbit-dot-3 {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        @media (max-width: 639px) {
          .halo-ring-1 { width: 200px !important; height: 200px !important; }
          .halo-ring-2 { width: 150px !important; height: 150px !important; }
          .halo-ring-3 { width: 100px !important; height: 100px !important; }
          .halo-dot-1 { left: calc(50% - 100px) !important; margin-left: -3px !important; margin-top: -3px !important; }
          .halo-dot-2 { left: calc(50% + 75px) !important; margin-left: -2px !important; margin-top: -2px !important; }
          .halo-dot-3 { left: calc(50% - 50px) !important; margin-left: -1px !important; margin-top: -1px !important; }
        }
      `}</style>
    </div>
  )
}
