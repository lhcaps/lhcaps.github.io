import { Canvas } from "@react-three/fiber"

interface RuntimeCanvasProps {
  children: React.ReactNode
  reducedMotion: boolean
}

export function RuntimeCanvas({ children, reducedMotion }: RuntimeCanvasProps) {
  return (
    <Canvas
      camera={{ position: [0, 1.2, 7], fov: 42 }}
      dpr={[1, reducedMotion ? 1 : 1.5]}
      performance={{ min: 0.5 }}
      gl={{
        antialias: !reducedMotion,
        powerPreference: "high-performance",
      }}
    >
      <color attach="background" args={["#0c1425"]} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 4, 5]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 2, 4]} intensity={1.0} color="#60a5fa" />
      <pointLight position={[-3, -1, 3]} intensity={0.5} color="#22c55e" />
      <pointLight position={[3, -1, 3]} intensity={0.3} color="#a78bfa" />
      {children}
    </Canvas>
  )
}
