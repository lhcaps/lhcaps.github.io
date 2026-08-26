import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "@fontsource-variable/geologica/wght.css"
import "@fontsource/fragment-mono/400.css"
import App from "./App"
import "./index.css"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
