import { useRef, useMemo } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { Float, Html } from "@react-three/drei"
import * as THREE from "three"

const ORBIT_RADIUS = 2.6
const NODE_COUNT = 6

const NODE_LABELS = [
  { label: "API", sublabel: "REST / SSE", angle: 0 },
  { label: "DB", sublabel: "PostgreSQL", angle: (Math.PI * 2) / 6 },
  { label: "QUEUE", sublabel: "BullMQ", angle: (Math.PI * 2) / 3 },
  { label: "WORKER", sublabel: "FastAPI", angle: (Math.PI * 2) / 2 },
  { label: "AI", sublabel: "Ollama", angle: (Math.PI * 2) / 1.5 },
  { label: "UI", sublabel: "React", angle: (Math.PI * 5) / 3 },
]

const NODE_COLORS = ["#67E8F9", "#60A5FA", "#4ADE80", "#FB923C", "#A78BFA", "#F472B6"]

function OrbitNode({
  label, sublabel, color, angle, index,
}: {
  label: string; sublabel: string; color: string; angle: number; index: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const floatOffset = (index * Math.PI * 2) / NODE_COUNT

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    const t = clock.getElapsedTime()
    const x = Math.cos(angle + t * 0.3) * ORBIT_RADIUS
    const z = Math.sin(angle + t * 0.3) * ORBIT_RADIUS
    const y = Math.sin(t * 0.5 + floatOffset) * 0.15
    meshRef.current.position.set(x, y, z)
  })

  return (
    <group ref={meshRef}>
      <mesh>
        <icosahedronGeometry args={[0.18, 1]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.6} roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.22, 0.26, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.25} side={THREE.DoubleSide} />
      </mesh>
      <Float speed={1.5} rotationIntensity={0} floatIntensity={0.3}>
        <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", color, textAlign: "center", whiteSpace: "nowrap", textShadow: `0 0 8px ${color}80`, userSelect: "none" }}>
            <div style={{ fontWeight: 700, letterSpacing: "0.08em" }}>{label}</div>
            <div style={{ fontSize: "7px", opacity: 0.6, letterSpacing: "0.05em" }}>{sublabel}</div>
          </div>
        </Html>
      </Float>
    </group>
  )
}

function ConnectionLines() {
  const lines = useMemo(() => {
    const result: [number, number, number][][] = []
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = (i * Math.PI * 2) / NODE_COUNT
      result.push([[Math.cos(angle) * ORBIT_RADIUS, 0, Math.sin(angle) * ORBIT_RADIUS], [0, 0, 0]])
    }
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle1 = (i * Math.PI * 2) / NODE_COUNT
      const angle2 = ((i + 1) * Math.PI * 2) / NODE_COUNT
      result.push([[Math.cos(angle1) * ORBIT_RADIUS, 0, Math.sin(angle1) * ORBIT_RADIUS], [Math.cos(angle2) * ORBIT_RADIUS, 0, Math.sin(angle2) * ORBIT_RADIUS]])
    }
    return result
  }, [])

  return (
    <group>
      {lines.map((line, i) => {
        const midPoint: [number, number, number] = [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2, (line[0][2] + line[1][2]) / 2]
        const length = Math.sqrt((line[1][0] - line[0][0]) ** 2 + (line[1][1] - line[0][1]) ** 2 + (line[1][2] - line[0][2]) ** 2)
        const dir = new THREE.Vector3(line[1][0] - line[0][0], line[1][1] - line[0][1], line[1][2] - line[0][2]).normalize()
        const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)
        return (
          <mesh key={i} position={midPoint} quaternion={[q.x, q.y, q.z, q.w]}>
            <cylinderGeometry args={[0.006, 0.006, length, 4]} />
            <meshBasicMaterial color="#67E8F9" transparent opacity={i < NODE_COUNT ? 0.3 : 0.12} />
          </mesh>
        )
      })}
    </group>
  )
}

function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!coreRef.current) return
    const t = clock.getElapsedTime()
    coreRef.current.rotation.y = t * 0.3
    coreRef.current.rotation.x = Math.sin(t * 0.2) * 0.15
    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.15
      const pulse = 1 + Math.sin(t * 1.5) * 0.1
      glowRef.current.scale.setScalar(pulse)
    }
  })

  return (
    <group>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.55, 1]} />
        <meshStandardMaterial color="#67E8F9" emissive="#67E8F9" emissiveIntensity={0.8} roughness={0.1} metalness={0.9} />
      </mesh>
      <mesh ref={coreRef}>
        <octahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color="#67E8F9" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.9, 32, 32]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.1, 0.008, 8, 64]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.15} />
      </mesh>
      <mesh rotation={[0, 0, Math.PI / 4]}>
        <torusGeometry args={[1.1, 0.005, 8, 64]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.1} />
      </mesh>
    </group>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const targetRef = useRef(new THREE.Vector3(0, 0, 7))

  useFrame(({ pointer }) => {
    const mouseX = pointer.x * 0.5
    const mouseY = pointer.y * 0.3
    targetRef.current.set(mouseX * 0.5, mouseY * 0.3, 7)
    camera.position.lerp(targetRef.current, 0.02)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function Particles() {
  const count = 80
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.5
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.03
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.02) * 0.05
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#67E8F9" size={0.025} transparent opacity={0.4} sizeAttenuation />
    </points>
  )
}

export function SystemCore() {
  return (
    <group>
      <CameraRig />
      <CentralCore />
      <ConnectionLines />
      {NODE_LABELS.map((node, i) => (
        <OrbitNode key={node.label} label={node.label} sublabel={node.sublabel} color={NODE_COLORS[i]} angle={node.angle} index={i} />
      ))}
      <Particles />
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} color="#67E8F9" intensity={2} />
      <pointLight position={[3, 2, 3]} color="#8B5CF6" intensity={0.8} />
      <pointLight position={[-3, -2, -3]} color="#67E8F9" intensity={0.4} />
    </group>
  )
}

interface SceneCanvasProps {
  className?: string
}

export function SceneCanvas({ className }: SceneCanvasProps) {
  return (
    <div className={className}>
      <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
        <SystemCore />
      </Canvas>
    </div>
  )
}
