'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CoreHalo } from './CoreHalo'

interface CoreHaloCanvasProps {
  className?: string
}

export function CoreHaloCanvas({ className = '' }: CoreHaloCanvasProps) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CoreHalo />
        </Suspense>
      </Canvas>
    </div>
  )
}
