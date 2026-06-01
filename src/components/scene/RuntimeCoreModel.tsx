import { useGLTF } from "@react-three/drei"

export function RuntimeCoreModel() {
  const { scene } = useGLTF("/models/runtime-core.glb")
  return <primitive object={scene} />
}

useGLTF.preload("/models/runtime-core.glb")
