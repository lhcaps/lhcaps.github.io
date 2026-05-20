import { ReactNode } from "react"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = "" }: ContainerProps) {
  return (
    <div className={`mx-auto w-full max-w-[1180px] px-5 sm:px-6 md:px-8 ${className}`}>
      {children}
    </div>
  )
}
