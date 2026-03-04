"use client"

import { useEffect, useRef, useState } from "react"

interface SectionHeaderProps {
  title: string
  subtitle?: string
  character: string
}

export function SectionHeader({ title, subtitle, character }: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className="mb-16 flex items-end gap-6">
      <span
        className={`text-6xl font-black text-foreground/5 leading-none select-none transition-all duration-1000 md:text-8xl ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {character}
      </span>
      <div
        className={`transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <h2 className="text-xl font-medium tracking-wider text-foreground md:text-2xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-xs tracking-[0.3em] text-muted-foreground uppercase">
            {subtitle}
          </p>
        )}
        {/* Brush stroke underline */}
        <div
          className={`mt-3 h-px bg-foreground/20 origin-left transition-transform duration-1000 delay-500 ${
            isVisible ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ width: "120px" }}
        />
      </div>
    </div>
  )
}
