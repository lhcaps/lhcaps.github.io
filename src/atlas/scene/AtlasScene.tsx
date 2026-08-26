import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { Euler, Quaternion, Vector3, type Group, type Mesh } from "three"
import { HANDOFF_MS, RECONFIGURE_MS, createSceneTransitionPlan, motionPhaseAt, shouldInvalidate } from "@/atlas/core/motion"
import { positionForSceneSlot } from "@/atlas/core/sceneSlots"
import type { SystemDefinition, TopologyRoute } from "@/content/types"
import { SCENE_COLORS } from "@/styles/tokens"

interface AtlasSceneProps {
  system: SystemDefinition
  visible: boolean
  onReady: () => void
  onFailure: () => void
}

interface ContextGuardProps {
  onReady: () => void
  onFailure: () => void
}

function ContextGuard({ onReady, onFailure }: ContextGuardProps) {
  const gl = useThree((state) => state.gl)

  useEffect(() => {
    const canvas = gl.domElement
    const handleContextLoss = (event: Event) => {
      event.preventDefault()
      onFailure()
    }
    canvas.addEventListener("webglcontextlost", handleContextLoss)
    onReady()
    return () => canvas.removeEventListener("webglcontextlost", handleContextLoss)
  }, [gl, onFailure, onReady])

  return null
}

function RouteBeam({ route, system, active }: { route: TopologyRoute; system: SystemDefinition; active: boolean }) {
  const fromNode = system.topology.nodes.find((node) => node.id === route.from)
  const toNode = system.topology.nodes.find((node) => node.id === route.to)
  if (!fromNode || !toNode) return null

  const from = new Vector3(...positionForSceneSlot(fromNode.sceneSlot))
  const to = new Vector3(...positionForSceneSlot(toNode.sceneSlot))
  const direction = new Vector3().subVectors(to, from)
  const length = direction.length()
  const quaternion = new Quaternion().setFromUnitVectors(new Vector3(0, 1, 0), direction.normalize())
  const midpoint = new Vector3().addVectors(from, to).multiplyScalar(0.5)
  const rotation = new Euler().setFromQuaternion(quaternion)

  return (
    <mesh position={midpoint} rotation={rotation}>
      <cylinderGeometry args={[active ? 0.035 : 0.018, active ? 0.035 : 0.018, length, 8]} />
      <meshBasicMaterial color={active ? SCENE_COLORS.rust : SCENE_COLORS.line} transparent opacity={active ? 0.95 : 0.5} />
    </mesh>
  )
}

function SystemGeometry({ system, visible }: Pick<AtlasSceneProps, "system" | "visible">) {
  const groupRef = useRef<Group>(null)
  const focusRef = useRef<Mesh>(null)
  const transitionStartedAt = useRef(0)
  const previousSystemId = useRef<string | null>(null)
  const previousVisible = useRef<boolean | null>(null)
  const invalidate = useThree((state) => state.invalidate)
  const activeRoute = system.topology.routes.find((route) => route.id === system.topology.activeHandoff.routeId)

  useEffect(() => {
    const group = groupRef.current
    if (!group) return

    const firstRender = previousSystemId.current === null
    const systemChanged = previousSystemId.current !== system.id
    const wasVisible = previousVisible.current
    previousSystemId.current = system.id
    previousVisible.current = visible

    const plan = createSceneTransitionPlan({
      firstRender,
      systemChanged,
      visible,
      wasVisible,
    })

    if (!plan.animate) {
      group.scale.setScalar(1)
      focusRef.current?.scale.setScalar(1.16)
      transitionStartedAt.current = -1
      if (visible && wasVisible === false) invalidate()
      return
    }

    transitionStartedAt.current = performance.now()
    group.scale.setScalar(0.94)
    focusRef.current?.scale.setScalar(1)
    invalidate()
  }, [invalidate, system.id, visible])

  useFrame(({ invalidate: requestFrame }) => {
    if (!visible || transitionStartedAt.current < 0 || !groupRef.current) return

    const elapsed = Math.max(0, performance.now() - transitionStartedAt.current)
    const phase = motionPhaseAt(elapsed)
    const progress = Math.min(1, elapsed / (RECONFIGURE_MS + HANDOFF_MS))
    groupRef.current.scale.setScalar(0.94 + progress * 0.06)

    if (focusRef.current) {
      const handoffProgress = Math.max(0, Math.min(1, (elapsed - RECONFIGURE_MS) / HANDOFF_MS))
      focusRef.current.scale.setScalar(1 + handoffProgress * 0.16)
    }

    if (shouldInvalidate(phase, visible)) requestFrame()
    else transitionStartedAt.current = -1
  })

  return (
    <group ref={groupRef}>
      {system.topology.routes.map((route) => (
        <RouteBeam key={route.id} route={route} system={system} active={route.id === activeRoute?.id} />
      ))}
      {system.topology.nodes.map((node) => {
        const active = node.id === system.topology.activeHandoff.focusNodeId
        return (
          <mesh
            key={node.id}
            position={positionForSceneSlot(node.sceneSlot)}
            ref={active ? focusRef : undefined}
          >
            <boxGeometry args={[active ? 0.72 : 0.56, active ? 0.34 : 0.25, 0.18]} />
            <meshStandardMaterial
              color={active ? SCENE_COLORS.rust : SCENE_COLORS.raisedPaper}
              emissive={active ? SCENE_COLORS.rust : SCENE_COLORS.ink}
              emissiveIntensity={active ? 0.15 : 0.02}
              roughness={0.82}
              metalness={0.02}
            />
          </mesh>
        )
      })}
    </group>
  )
}

export default function AtlasScene({ system, visible, onReady, onFailure }: AtlasSceneProps) {
  return (
    <Canvas
      aria-hidden="true"
      camera={{ position: [0, 0, 8], fov: 42 }}
      data-testid="atlas-canvas"
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
      tabIndex={-1}
    >
      <ContextGuard onReady={onReady} onFailure={onFailure} />
      <ambientLight intensity={1.8} />
      <directionalLight intensity={2.2} position={[3, 4, 6]} />
      <SystemGeometry system={system} visible={visible} />
    </Canvas>
  )
}
