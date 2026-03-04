"use client"

import { useState, useEffect, useRef, useCallback } from "react"

const navItems = [
  { label: "关于", href: "#about" },
  { label: "经历", href: "#experience" },
  { label: "项目", href: "#projects" },
  { label: "学习", href: "#learning" },
  { label: "思考", href: "#thoughts" },
]

interface LogoButterfly {
  x: number; y: number
  vx: number; vy: number
  size: number
  opacity: number
  rotation: number
  rotSpeed: number
  wingPhase: number
  wingSpeed: number
  life: number
  maxLife: number
}

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [logoState, setLogoState] = useState<"idle" | "hover" | "scattered">("idle")
  const logoCanvasRef = useRef<HTMLCanvasElement>(null)
  const butterfliesRef = useRef<LogoButterfly[]>([])
  const animIdRef = useRef<number>(0)
  const logoStateRef = useRef<"idle" | "hover" | "scattered">("idle")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const el = document.getElementById(section)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 120) {
            setActiveSection(section)
            return
          }
        }
      }
      setActiveSection("")
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const spawnButterflies = useCallback((count: number, baseX: number, baseY: number, isClick: boolean) => {
    const newOnes: LogoButterfly[] = []
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 / count) * i + (Math.random() - 0.5) * 0.8
      const speed = isClick ? (Math.random() * 1.5 + 0.8) : (Math.random() * 1 + 0.3)
      newOnes.push({
        x: baseX + (Math.random() - 0.5) * 20,
        y: baseY + (Math.random() - 0.5) * 8,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isClick ? 0.5 : 0.3),
        size: Math.random() * 8 + (isClick ? 6 : 4),
        opacity: isClick ? 0.9 : 0.7,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.06,
        wingPhase: Math.random() * Math.PI * 2,
        wingSpeed: Math.random() * 0.08 + 0.05,
        life: 1,
        maxLife: isClick ? (Math.random() * 3 + 3) : (Math.random() * 2 + 1.5), // click: longer life
      })
    }
    butterfliesRef.current = [...butterfliesRef.current, ...newOnes]
  }, [])

  const drawButterfly = useCallback((ctx: CanvasRenderingContext2D, b: LogoButterfly) => {
    ctx.save()
    ctx.translate(b.x, b.y)
    ctx.rotate(b.rotation)
    const alpha = b.opacity * b.life
    ctx.globalAlpha = alpha
    const s = b.size
    const wingOpen = Math.sin(b.wingPhase) * 0.5 + 0.5

    // Glow
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2)
    grd.addColorStop(0, `rgba(255,255,255,${alpha * 0.12})`)
    grd.addColorStop(1, `rgba(255,255,255,0)`)
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.arc(0, 0, s * 2, 0, Math.PI * 2)
    ctx.fill()

    // Upper wings
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-s * 0.5 * wingOpen, -s * 0.6, -s * 0.8 * wingOpen, -s * 0.3, -s * 0.2 * wingOpen, s * 0.05)
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.6})`
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(s * 0.5 * wingOpen, -s * 0.6, s * 0.8 * wingOpen, -s * 0.3, s * 0.2 * wingOpen, s * 0.05)
    ctx.fill()

    // Lower wings
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(-s * 0.3 * wingOpen, s * 0.1, -s * 0.5 * wingOpen, s * 0.4, -s * 0.1 * wingOpen, s * 0.25)
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.4})`
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.bezierCurveTo(s * 0.3 * wingOpen, s * 0.1, s * 0.5 * wingOpen, s * 0.4, s * 0.1 * wingOpen, s * 0.25)
    ctx.fill()

    // Body
    ctx.beginPath()
    ctx.ellipse(0, 0, s * 0.04, s * 0.18, 0, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,255,255,${alpha * 0.7})`
    ctx.fill()

    ctx.restore()
  }, [])

  useEffect(() => {
    const canvas = logoCanvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const dpr = window.devicePixelRatio || 1
    const cw = 200
    const ch = 80
    canvas.width = cw * dpr
    canvas.height = ch * dpr
    ctx.scale(dpr, dpr)
    canvas.style.width = cw + "px"
    canvas.style.height = ch + "px"

    const animate = () => {
      ctx.clearRect(0, 0, cw, ch)
      const bfs = butterfliesRef.current
      for (let i = bfs.length - 1; i >= 0; i--) {
        const b = bfs[i]
        // Slow gentle drift
        b.vx += (Math.random() - 0.5) * 0.03
        b.vy -= 0.005
        b.x += b.vx
        b.y += b.vy
        b.rotation += b.rotSpeed
        b.wingPhase += b.wingSpeed
        b.life -= 1 / (b.maxLife * 60)
        b.life = Math.max(0, b.life)
        if (b.life <= 0) { bfs.splice(i, 1); continue }
        drawButterfly(ctx, b)
      }
      animIdRef.current = requestAnimationFrame(animate)
    }
    animIdRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animIdRef.current)
  }, [drawButterfly])

  const handleLogoEnter = () => {
    setLogoState("hover")
    logoStateRef.current = "hover"
    // Spawn a small wave of butterflies
    spawnButterflies(8, 50, 25, false)
  }

  const handleLogoLeave = () => {
    setLogoState("idle")
    logoStateRef.current = "idle"
  }

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault()
    setLogoState("scattered")
    logoStateRef.current = "scattered"
    // Spawn a spectacular burst of white butterflies
    spawnButterflies(18, 50, 25, true)
    // After butterflies fly away, reform
    setTimeout(() => {
      setLogoState("idle")
      logoStateRef.current = "idle"
    }, 2000)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleClick = (href: string) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:px-8">
        <div
          className="relative"
          onMouseEnter={handleLogoEnter}
          onMouseLeave={handleLogoLeave}
        >
          <a
            href="#"
            onClick={handleLogoClick}
            className={`relative z-10 text-xl font-bold tracking-[0.15em] text-foreground transition-all duration-700 ${
              logoState === "hover" ? "opacity-0 scale-90 blur-[2px]" :
              logoState === "scattered" ? "opacity-0 scale-75 blur-sm" : "opacity-100 scale-100"
            }`}
          >
            Moyu
          </a>
          <canvas
            ref={logoCanvasRef}
            className="pointer-events-none absolute -left-8 -top-5 z-20"
            aria-hidden="true"
          />
        </div>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <button
                onClick={() => handleClick(item.href)}
                className={`relative text-sm tracking-widest transition-colors duration-300 ${
                  activeSection === item.href.slice(1)
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
                {activeSection === item.href.slice(1) && (
                  <span className="absolute -bottom-1 left-0 h-px w-full bg-foreground animate-brush-draw" />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {mobileOpen && (
        <div className="border-b border-border bg-background/95 backdrop-blur-md md:hidden">
          <ul className="flex flex-col gap-4 px-6 py-6">
            {navItems.map((item) => (
              <li key={item.href}>
                <button
                  onClick={() => handleClick(item.href)}
                  className={`text-sm tracking-widest transition-colors ${
                    activeSection === item.href.slice(1)
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
