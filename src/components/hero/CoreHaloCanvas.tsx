import { useState, useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { CoreHalo } from './CoreHalo'

interface CoreHaloCanvasProps {
  className?: string
}

function WebGLFallback({ className }: { className?: string }) {
  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(103,232,249,0.06) 0%, transparent 65%)',
      }}
    />
  )
}

export function CoreHaloCanvas({ className = '' }: CoreHaloCanvasProps) {
  const [webglSupported, setWebglSupported] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      if (!gl) setWebglSupported(false)
    } catch {
      setWebglSupported(false)
    }
  }, [])

  if (!webglSupported) {
    return <WebGLFallback className={className} />
  }

  return (
    <div ref={canvasRef} className={className} aria-hidden="true">
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
