"use client"

import { useEffect, useRef, useCallback } from "react"

/**
 * Shared ink-wash background with:
 * - Random light dots with glow
 * - Shooting stars / meteor streaks
 * - Calligraphy brush strokes - natural solid ink, no gradients, organic 行书 feel
 */
export function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const initBackground = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return () => {}
    const ctx = canvas.getContext("2d")
    if (!ctx) return () => {}

    const dpr = window.devicePixelRatio || 1
    let W = canvas.parentElement?.clientWidth || window.innerWidth
    let H = canvas.parentElement?.clientHeight || window.innerHeight

    const resize = () => {
      W = canvas.parentElement?.clientWidth || window.innerWidth
      H = canvas.parentElement?.clientHeight || window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      canvas.style.width = W + "px"
      canvas.style.height = H + "px"
    }
    resize()
    window.addEventListener("resize", resize)

    // ========= Light Dots =========
    interface LightDot {
      x: number; y: number; size: number; baseOpacity: number; phase: number; speed: number
    }
    const dots: LightDot[] = []
    for (let i = 0; i < 40; i++) {
      dots.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: Math.random() * 1.5 + 0.5,
        baseOpacity: Math.random() * 0.12 + 0.02,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.002 + 0.001,
      })
    }

    // ========= Shooting Stars =========
    interface ShootingStar {
      x: number; y: number; vx: number; vy: number; life: number; maxLife: number; size: number
    }
    const stars: ShootingStar[] = []
    let starTimer = 0
    const spawnStar = () => {
      stars.push({
        x: Math.random() * W * 0.8 + W * 0.1,
        y: -5,
        vx: (Math.random() - 0.3) * 3,
        vy: Math.random() * 2 + 1.5,
        life: 1,
        maxLife: Math.random() * 1.5 + 1,
        size: Math.random() * 1.5 + 0.5,
      })
    }

    // ========= Natural Calligraphy Brush Strokes =========
    interface BrushPoint {
      x: number; y: number; width: number; alpha: number
    }
    interface CalligraphyStroke {
      points: BrushPoint[]
      drawnIndex: number
      drawSpeed: number
      phase: "drawing" | "holding" | "fading"
      holdTimer: number
      fadeOpacity: number
    }
    const strokes: CalligraphyStroke[] = []
    let strokeTimer = 0

    function spawnCalligraphyStroke() {
      const startX = Math.random() * W
      const startY = Math.random() * H * 0.8 + H * 0.1
      const count = Math.floor(Math.random() * 40) + 30
      const points: BrushPoint[] = []

      let cx = startX
      let cy = startY
      const mainAngle = (Math.random() - 0.5) * 0.9
      let angle = mainAngle
      const baseWidth = Math.random() * 5 + 5

      for (let i = 0; i < count; i++) {
        const t = i / (count - 1)

        // Pressure curve: 起笔 thin -> 行笔 thick -> 收笔 thin with 笔锋
        let pressure: number
        if (t < 0.08) {
          pressure = 0.15 + (t / 0.08) * 0.55
        } else if (t < 0.15) {
          pressure = 0.7 + ((t - 0.08) / 0.07) * 0.3
        } else if (t > 0.88) {
          pressure = ((1 - t) / 0.12) * 0.35
        } else {
          pressure = 0.75 + Math.sin(t * Math.PI * 3) * 0.15 + (Math.random() - 0.5) * 0.1
        }

        // Organic jitter
        const jitterX = (Math.random() - 0.5) * 1.5
        const jitterY = (Math.random() - 0.5) * 1.5

        // Flowing angle change for 行书 feel
        angle += (Math.random() - 0.5) * 0.15 + Math.sin(i * 0.15) * 0.04
        const step = Math.random() * 8 + 6

        cx += Math.cos(angle) * step + jitterX
        cy += Math.sin(angle) * step * 0.4 + jitterY

        const width = baseWidth * pressure
        const alpha = pressure > 0.2 ? 0.16 : pressure * 0.8

        points.push({ x: cx, y: cy, width, alpha })
      }

      strokes.push({
        points,
        drawnIndex: 0,
        drawSpeed: Math.random() * 0.6 + 0.4,
        phase: "drawing",
        holdTimer: 0,
        fadeOpacity: 1,
      })
    }

    function drawCalligraphyStroke(stroke: CalligraphyStroke) {
      const pts = stroke.points
      const drawn = Math.floor(stroke.drawnIndex)
      if (drawn < 2) return

      const globalAlpha = stroke.fadeOpacity

      // Draw stroke as a filled shape using the width at each point
      ctx.save()
      ctx.globalAlpha = globalAlpha

      // Build upper and lower edges based on width at each point
      for (let i = 1; i < drawn && i < pts.length; i++) {
        const p0 = pts[i - 1]
        const p1 = pts[i]

        ctx.beginPath()
        ctx.moveTo(p0.x, p0.y)
        ctx.lineTo(p1.x, p1.y)
        ctx.strokeStyle = `rgba(200, 195, 185, ${p1.alpha})`
        ctx.lineWidth = p1.width
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.stroke()
      }

      // Ink splash dot at the start (起笔顿笔)
      if (drawn > 3) {
        const sp = pts[0]
        ctx.beginPath()
        ctx.arc(sp.x, sp.y, pts[1].width * 0.7, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 195, 185, ${0.12 * globalAlpha})`
        ctx.fill()
      }

      ctx.restore()
    }

    let animId: number

    const animate = (time: number) => {
      ctx.clearRect(0, 0, W, H)

      // -- Light dots --
      for (const d of dots) {
        const o = d.baseOpacity * (0.5 + 0.5 * Math.sin(time * d.speed + d.phase))
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 195, 185, ${o})`
        ctx.fill()
        ctx.beginPath()
        ctx.arc(d.x, d.y, d.size * 3, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(200, 195, 185, ${o * 0.12})`
        ctx.fill()
      }

      // -- Shooting stars --
      starTimer += 16
      if (starTimer > 4000 + Math.random() * 5000) {
        spawnStar()
        starTimer = 0
      }
      for (let i = stars.length - 1; i >= 0; i--) {
        const s = stars[i]
        s.x += s.vx
        s.y += s.vy
        s.life -= 0.012 / s.maxLife
        if (s.life <= 0) { stars.splice(i, 1); continue }
        const tailLen = 35
        ctx.beginPath()
        ctx.moveTo(s.x, s.y)
        ctx.lineTo(s.x - s.vx * tailLen * s.life, s.y - s.vy * tailLen * s.life)
        ctx.strokeStyle = `rgba(220, 215, 200, ${s.life * 0.5})`
        ctx.lineWidth = s.size
        ctx.stroke()
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(240, 235, 220, ${s.life * 0.8})`
        ctx.fill()
      }

      // -- Calligraphy strokes --
      strokeTimer += 16
      if (strokeTimer > 6000 + Math.random() * 8000) {
        spawnCalligraphyStroke()
        strokeTimer = 0
      }
      for (let i = strokes.length - 1; i >= 0; i--) {
        const st = strokes[i]
        if (st.phase === "drawing") {
          st.drawnIndex += st.drawSpeed
          if (st.drawnIndex >= st.points.length) {
            st.drawnIndex = st.points.length
            st.phase = "holding"
          }
        } else if (st.phase === "holding") {
          st.holdTimer += 16
          if (st.holdTimer > 2000) {
            st.phase = "fading"
          }
        } else if (st.phase === "fading") {
          st.fadeOpacity -= 0.006
          if (st.fadeOpacity <= 0) {
            strokes.splice(i, 1)
            continue
          }
        }
        drawCalligraphyStroke(st)
      }

      animId = requestAnimationFrame(animate)
    }
    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  useEffect(() => {
    const cleanup = initBackground()
    return cleanup
  }, [initBackground])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}
