import { useRef, useMemo } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Float, Html } from "@react-three/drei"
import * as THREE from "three"

const ORBIT_RADIUS = 2.15
const Y_SCALE = 0.72
const DEPTH = 0.35
const NODE_COUNT = 6

const NODE_LABELS = [
  { label: "API", sublabel: "REST / SSE", angle: (Math.PI * 2) / 6 },
  { label: "DB", sublabel: "PostgreSQL", angle: (Math.PI * 2) / 3 },
  { label: "QUEUE", sublabel: "BullMQ", angle: Math.PI },
  { label: "WORKER", sublabel: "FastAPI", angle: (Math.PI * 4) / 3 },
  { label: "AI", sublabel: "Ollama", angle: (Math.PI * 5) / 3 },
  { label: "UI", sublabel: "React", angle: 0 },
]

const NODE_COLORS = ["#67E8F9", "#60A5FA", "#8B5CF6", "#A78BFA", "#A78BFA", "#67E8F9"]

function getNodePosition(angle: number): [number, number, number] {
  return [
    Math.cos(angle) * ORBIT_RADIUS,
    Math.sin(angle) * ORBIT_RADIUS * Y_SCALE,
    Math.sin(angle * 2) * DEPTH,
  ]
}

// ------------------------------------------------------------------ //
// OrbitNode — node with float animation, stem, and conditional label //
// ------------------------------------------------------------------ //
function OrbitNode({
  label, sublabel, color, angle, index, activeIndexRef,
}: {
  label: string
  sublabel: string
  color: string
  angle: number
  index: number
  activeIndexRef: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const visualFloatRef = useRef<THREE.Group>(null)
  const stemRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const labelRef = useRef<THREE.Group>(null)
  const floatOffset = (index * Math.PI * 2) / NODE_COUNT
  const position = getNodePosition(angle)

  useFrame(({ clock }) => {
    if (!groupRef.current || !visualFloatRef.current) return
    const t = clock.getElapsedTime()
    const activeIndex = activeIndexRef.current
    const isActive = index === activeIndex

    visualFloatRef.current.position.y = Math.sin(t * 0.5 + floatOffset) * 0.08

    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.4
      meshRef.current.rotation.x = Math.sin(t * 0.3 + floatOffset) * 0.25
      const targetScale = isActive ? 1.18 : 1.0
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }

    if (stemRef.current) {
      const mat = stemRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = isActive ? 0.35 : 0.12
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.8
      const mat = ringRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = isActive ? 0.35 : 0.0
    }

    if (labelRef.current) {
      labelRef.current.visible = isActive
    }
  })

  return (
    <group ref={groupRef} position={[position[0], position[1], position[2]]}>
      {/* Active pulse ring */}
      <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.24, 0.3, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Visual float group — only this moves, group stays at fixed orbit position */}
      <group ref={visualFloatRef}>
        {/* Core orb */}
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[0.17, 1]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.55}
            roughness={0.15}
            metalness={0.85}
          />
        </mesh>

        {/* Stem to core */}
        <mesh ref={stemRef} position={[0, -0.3, 0]}>
          <cylinderGeometry args={[0.01, 0.006, 0.22, 4]} />
          <meshBasicMaterial color={color} transparent opacity={0.12} />
        </mesh>

        {/* Label */}
        <group ref={labelRef} visible={false}>
          <Float speed={2} rotationIntensity={0} floatIntensity={0.12}>
            <Html center distanceFactor={8} style={{ pointerEvents: "none" }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "10px",
                color,
                textAlign: "center",
                whiteSpace: "nowrap",
                textShadow: `0 0 14px ${color}99`,
                userSelect: "none",
              }}>
                <div style={{ fontWeight: 700, letterSpacing: "0.1em" }}>{label}</div>
                <div style={{ fontSize: "7px", opacity: 0.65, letterSpacing: "0.05em" }}>{sublabel}</div>
              </div>
            </Html>
          </Float>
        </group>
      </group>
    </group>
  )
}

// --------------------------------------------------------------- //
// ConnectionLine — individual line with frame-by-frame opacity    //
// --------------------------------------------------------------- //
function ConnectionLine({
  start,
  end,
  lineType,
  fromIdx,
  toIdx,
  activeIndexRef,
}: {
  start: [number, number, number]
  end: [number, number, number]
  lineType: "radial" | "ring"
  fromIdx: number
  toIdx: number
  activeIndexRef: React.MutableRefObject<number>
}) {
  const thinRef = useRef<THREE.Mesh>(null)
  const thickRef = useRef<THREE.Mesh>(null)

  const midPoint: [number, number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2,
    (start[2] + end[2]) / 2,
  ]
  const dx = end[0] - start[0]
  const dy = end[1] - start[1]
  const dz = end[2] - start[2]
  const length = Math.sqrt(dx * dx + dy * dy + dz * dz)
  const dir = new THREE.Vector3(dx, dy, dz).normalize()
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir)

  useFrame(() => {
    const activeIndex = activeIndexRef.current
    let thinOpacity = 0.15
    let thickOpacity = 0.0
    let thickVisible = false

    if (lineType === "radial") {
      if (fromIdx === activeIndex) {
        thickOpacity = 0.6
        thickVisible = true
      } else {
        thinOpacity = 0.2
      }
    } else {
      const isActiveRing = fromIdx === activeIndex || toIdx === activeIndex
      thinOpacity = isActiveRing ? 0.28 : 0.07
    }

    if (thinRef.current) {
      const mat = thinRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = thinOpacity
    }
    if (thickRef.current) {
      const mat = thickRef.current.material as THREE.MeshBasicMaterial
      mat.opacity = thickOpacity
      thickRef.current.visible = thickVisible
    }
  })

  return (
    <group position={midPoint} quaternion={[q.x, q.y, q.z, q.w]}>
      {/* Thin line — always present */}
      <mesh ref={thinRef}>
        <cylinderGeometry args={[0.005, 0.005, length, 4]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.15} />
      </mesh>
      {/* Thick line — only visible when active */}
      <mesh ref={thickRef} visible={false}>
        <cylinderGeometry args={[0.009, 0.009, length, 4]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0} />
      </mesh>
    </group>
  )
}

// -------------------------------------------------------------- //
// ConnectionLines — computes all line data, renders with animation //
// -------------------------------------------------------------- //
function ConnectionLines({ activeIndexRef }: { activeIndexRef: React.MutableRefObject<number> }) {
  const lineData = useMemo(() => {
    const result: {
      start: [number, number, number]
      end: [number, number, number]
      lineType: "radial" | "ring"
      fromIdx: number
      toIdx: number
    }[] = []

    // Radial lines: from each node to core
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle = NODE_LABELS[i].angle
      result.push({
        start: getNodePosition(angle),
        end: [0, 0, 0],
        lineType: "radial",
        fromIdx: i,
        toIdx: -1,
      })
    }

    // Ring lines: between adjacent nodes
    for (let i = 0; i < NODE_COUNT; i++) {
      const angle1 = NODE_LABELS[i].angle
      const angle2 = NODE_LABELS[(i + 1) % NODE_COUNT].angle
      result.push({
        start: getNodePosition(angle1),
        end: getNodePosition(angle2),
        lineType: "ring",
        fromIdx: i,
        toIdx: (i + 1) % NODE_COUNT,
      })
    }

    return result
  }, [])

  return (
    <group>
      {lineData.map((line, i) => (
        <ConnectionLine
          key={i}
          start={line.start}
          end={line.end}
          lineType={line.lineType}
          fromIdx={line.fromIdx}
          toIdx={line.toIdx}
          activeIndexRef={activeIndexRef}
        />
      ))}
    </group>
  )
}

// -------------------------------------------------------------- //
// CentralCore — redesigned as "system reactor" with group ref    //
// -------------------------------------------------------------- //
function CentralCore() {
  const coreGroupRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const ring1Ref = useRef<THREE.Mesh>(null)
  const ring2Ref = useRef<THREE.Mesh>(null)
  const scannerRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!coreGroupRef.current) return
    const t = clock.getElapsedTime()

    coreGroupRef.current.rotation.y = t * 0.25
    coreGroupRef.current.rotation.x = Math.sin(t * 0.15) * 0.12

    if (glowRef.current) {
      glowRef.current.rotation.y = -t * 0.08
      const pulse = 1 + Math.sin(t * 1.2) * 0.07
      glowRef.current.scale.setScalar(pulse)
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.z = t * 0.12
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.x = t * 0.09
    }

    if (scannerRef.current) {
      scannerRef.current.rotation.y = t * 0.6
      scannerRef.current.rotation.x = Math.sin(t * 0.4) * 0.3
      const s = 0.85 + Math.sin(t * 2) * 0.12
      scannerRef.current.scale.setScalar(s)
    }
  })

  return (
    <group>
      {/* Outer glow shell — transparent sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[1.05, 32, 32]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>

      {/* Inner energy sphere */}
      <mesh>
        <sphereGeometry args={[0.38, 32, 32]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#67E8F9"
          emissiveIntensity={1.8}
          roughness={0.05}
          metalness={0.95}
        />
      </mesh>

      {/* Outer wireframe shell — wrapped in group for rotation */}
      <group ref={coreGroupRef}>
        <mesh>
          <icosahedronGeometry args={[0.55, 1]} />
          <meshBasicMaterial color="#67E8F9" wireframe transparent opacity={0.35} />
        </mesh>
      </group>

      {/* Orbital ring 1 */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, Math.PI / 6]}>
        <torusGeometry args={[1.1, 0.008, 8, 80]} />
        <meshBasicMaterial color="#67E8F9" transparent opacity={0.18} />
      </mesh>

      {/* Orbital ring 2 */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <torusGeometry args={[1.1, 0.005, 8, 80]} />
        <meshBasicMaterial color="#8B5CF6" transparent opacity={0.12} />
      </mesh>

      {/* Scanner ring */}
      <mesh ref={scannerRef} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.7, 0.004, 6, 48]} />
        <meshBasicMaterial color="#A78BFA" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

// -------------------------------------------------------------- //
// CameraRig — mouse-following camera                             //
// -------------------------------------------------------------- //
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

// -------------------------------------------------------------- //
// Particles — ambient particle field                             //
// -------------------------------------------------------------- //
function Particles() {
  const count = 60
  // Deterministic pseudo-random using index as seed — avoids ESLint impure-function warning
  const pseudoRandom = (seed: number) => {
    const x = Math.sin(seed * 9301 + 49297) * 233280
    return x - Math.floor(x)
  }

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const s1 = pseudoRandom(i * 3)
      const s2 = pseudoRandom(i * 3 + 1)
      const s3 = pseudoRandom(i * 3 + 2)
      const r = 3 + s1 * 4
      const theta = s2 * Math.PI * 2
      const phi = s3 * Math.PI
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.cos(phi) * 0.5
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)
    }
    return arr
  }, [])

  const ref = useRef<THREE.Points>(null)
  useFrame(({ clock }) => {
    if (!ref.current) return
    ref.current.rotation.y = clock.getElapsedTime() * 0.025
    ref.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.015) * 0.04
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#67E8F9" size={0.022} transparent opacity={0.35} sizeAttenuation />
    </points>
  )
}

// -------------------------------------------------------------- //
// SystemMap — rotating container for nodes + lines               //
// -------------------------------------------------------------- //
function SystemMap() {
  const systemGroupRef = useRef<THREE.Group>(null)
  const activeIndexRef = useRef(0)

  useFrame(({ clock }) => {
    if (!systemGroupRef.current) return
    const t = clock.getElapsedTime()
    systemGroupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15
    systemGroupRef.current.rotation.x = Math.sin(t * 0.15) * 0.05
    activeIndexRef.current = Math.floor(t / 2.5) % NODE_COUNT
  })

  return (
    <group ref={systemGroupRef}>
      <ConnectionLines activeIndexRef={activeIndexRef} />
      {NODE_LABELS.map((node, i) => (
        <OrbitNode
          key={node.label}
          label={node.label}
          sublabel={node.sublabel}
          color={NODE_COLORS[i]}
          angle={node.angle}
          index={i}
          activeIndexRef={activeIndexRef}
        />
      ))}
    </group>
  )
}

// -------------------------------------------------------------- //
// SystemCore — main exported component                           //
// -------------------------------------------------------------- //
export function SystemCore() {
  return (
    <group>
      <CameraRig />
      <CentralCore />
      <SystemMap />
      <Particles />
      <ambientLight intensity={0.12} />
      <pointLight position={[0, 0, 0]} color="#67E8F9" intensity={2.5} />
      <pointLight position={[3, 2, 3]} color="#8B5CF6" intensity={0.8} />
      <pointLight position={[-3, -2, -3]} color="#67E8F9" intensity={0.4} />
    </group>
  )
}
