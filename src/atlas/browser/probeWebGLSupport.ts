export function probeWebGLSupport(documentRef: Document = document): boolean {
  const canvas = documentRef.createElement("canvas")

  try {
    const context = canvas.getContext("webgl2") ?? canvas.getContext("webgl")
    if (!context) return false

    const loseContext = context.getExtension("WEBGL_lose_context")
    if (!loseContext) return false

    loseContext.loseContext()
    return true
  } catch {
    return false
  } finally {
    canvas.remove()
  }
}
