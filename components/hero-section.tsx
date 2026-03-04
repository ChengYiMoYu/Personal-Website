"use client"

import { useEffect, useRef, useCallback } from "react"
import { InkBackground } from "./ink-background"

/**
 * Dragon Eyes: two blurry, glowing eyes that float behind everything,
 * subtly breathing with a slow pulse.
 */
function DragonEyes() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const init = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return () => {}
    const ctx = canvas.getContext("2d")
    if (!ctx) return () => {}

    const dpr = window.devicePixelRatio || 1
    let W = window.innerWidth
    let H = window.innerHeight

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W * dpr
      canvas.height = H * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      canvas.style.width = W + "px"
      canvas.style.height = H + "px"
    }
    resize()
    window.addEventListener("resize", resize)

    // Eye configuration
    const getEyePositions = () => {
      const centerX = W * 0.5
      const centerY = H * 0.38
      const gap = Math.min(W * 0.18, 180)
      const eyeW = Math.min(W * 0.06, 60)
      const eyeH = eyeW * 0.5
      return { centerX, centerY, gap, eyeW, eyeH }
    }

    let animId: number
    // Blink state: random intervals, quick close/open
    let lastBlinkTime = 0
    let nextBlinkDelay = 3000 + Math.random() * 4000
    let blinkProgress = 1 // 1 = fully open, 0 = fully closed

    const animate = (time: number) => {
      ctx.clearRect(0, 0, W, H)
      const { centerX, centerY, gap, eyeW, eyeH } = getEyePositions()

      // Blink logic
      const sinceLastBlink = time - lastBlinkTime
      if (sinceLastBlink > nextBlinkDelay && blinkProgress >= 1) {
        // Start a new blink
        lastBlinkTime = time
        nextBlinkDelay = 3000 + Math.random() * 5000
      }
      const blinkElapsed = time - lastBlinkTime
      const blinkDuration = 320 // total blink in ms
      if (blinkElapsed < blinkDuration) {
        // 0 -> 0.5: closing, 0.5 -> 1: opening
        const t = blinkElapsed / blinkDuration
        if (t < 0.5) {
          blinkProgress = 1 - t * 2 // 1 -> 0
        } else {
          blinkProgress = (t - 0.5) * 2 // 0 -> 1
        }
        // Ease
        blinkProgress = blinkProgress * blinkProgress * (3 - 2 * blinkProgress)
      } else {
        blinkProgress = 1
      }

      // Breathing pulse
      const breathe = Math.sin(time * 0.0008) * 0.15 + 0.85
      // Slow drift
      const driftX = Math.sin(time * 0.0003) * 4
      const driftY = Math.cos(time * 0.0005) * 3

      const drawEye = (ex: number, ey: number) => {
        const px = ex + driftX
        const py = ey + driftY

        // Overall opacity fades with blink
        const blinkAlpha = 0.3 + blinkProgress * 0.7

        // Outermost glow halo - very large and diffuse
        const outerGlow = ctx.createRadialGradient(
          px, py, 0,
          px, py, eyeW * 5
        )
        outerGlow.addColorStop(0, `rgba(180, 200, 180, ${0.025 * breathe * blinkAlpha})`)
        outerGlow.addColorStop(0.3, `rgba(160, 185, 160, ${0.012 * breathe * blinkAlpha})`)
        outerGlow.addColorStop(1, "rgba(160, 185, 160, 0)")
        ctx.fillStyle = outerGlow
        ctx.fillRect(px - eyeW * 5, py - eyeW * 5, eyeW * 10, eyeW * 10)

        // Mid glow
        const midGlow = ctx.createRadialGradient(
          px, py, 0,
          px, py, eyeW * 2.5
        )
        midGlow.addColorStop(0, `rgba(200, 220, 200, ${0.06 * breathe * blinkAlpha})`)
        midGlow.addColorStop(0.5, `rgba(180, 210, 180, ${0.025 * breathe * blinkAlpha})`)
        midGlow.addColorStop(1, "rgba(180, 210, 180, 0)")
        ctx.fillStyle = midGlow
        ctx.fillRect(px - eyeW * 2.5, py - eyeW * 2.5, eyeW * 5, eyeW * 5)

        // Eye shape - narrow, fierce slit (dragon-like)
        ctx.save()
        ctx.translate(px, py)

        // Apply blink: scale Y to squash the eye closed
        ctx.scale(1, blinkProgress)

        // Eye outline glow
        const scaleBreath = 1 + (breathe - 0.85) * 0.5
        const w = eyeW * scaleBreath
        const h = eyeH * scaleBreath

        // Draw the eye shape as two arcs meeting at points (almond shape)
        ctx.beginPath()
        ctx.moveTo(-w, 0)
        ctx.quadraticCurveTo(0, -h, w, 0)
        ctx.quadraticCurveTo(0, h, -w, 0)
        ctx.closePath()

        // Fill with glowing gradient
        const eyeGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, w * 0.8)
        eyeGrad.addColorStop(0, `rgba(220, 240, 215, ${0.12 * breathe})`)
        eyeGrad.addColorStop(0.5, `rgba(190, 215, 185, ${0.07 * breathe})`)
        eyeGrad.addColorStop(1, `rgba(160, 190, 155, ${0.02 * breathe})`)
        ctx.fillStyle = eyeGrad
        ctx.fill()

        // Iris - circular, human-like
        const irisR = Math.min(w, h) * 0.55
        const irisPulse = Math.sin(time * 0.001) * 0.05 + 1

        // Iris outer ring
        ctx.beginPath()
        ctx.arc(0, 0, irisR * irisPulse, 0, Math.PI * 2)
        const irisGrad = ctx.createRadialGradient(0, 0, irisR * 0.15, 0, 0, irisR * irisPulse)
        irisGrad.addColorStop(0, `rgba(120, 160, 120, ${0.06 * breathe})`)
        irisGrad.addColorStop(0.35, `rgba(160, 200, 160, ${0.12 * breathe})`)
        irisGrad.addColorStop(0.7, `rgba(180, 220, 175, ${0.10 * breathe})`)
        irisGrad.addColorStop(1, `rgba(140, 190, 140, ${0.04 * breathe})`)
        ctx.fillStyle = irisGrad
        ctx.fill()

        // Iris texture - subtle radial lines
        const lineCount = 18
        for (let i = 0; i < lineCount; i++) {
          const angle = (i / lineCount) * Math.PI * 2 + time * 0.00005
          const innerR = irisR * 0.25
          const outerR = irisR * irisPulse * 0.92
          ctx.beginPath()
          ctx.moveTo(Math.cos(angle) * innerR, Math.sin(angle) * innerR)
          ctx.lineTo(Math.cos(angle) * outerR, Math.sin(angle) * outerR)
          ctx.strokeStyle = `rgba(200, 235, 200, ${0.04 * breathe})`
          ctx.lineWidth = 0.6
          ctx.stroke()
        }

        // Pupil - round, dark center (human-like)
        const pupilR = irisR * 0.35 * (1 + (1 - irisPulse) * 2)
        ctx.beginPath()
        ctx.arc(0, 0, pupilR, 0, Math.PI * 2)
        const pupilGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, pupilR)
        pupilGrad.addColorStop(0, `rgba(10, 15, 10, ${0.3 * breathe})`)
        pupilGrad.addColorStop(0.6, `rgba(20, 30, 20, ${0.22 * breathe})`)
        pupilGrad.addColorStop(1, `rgba(60, 90, 60, ${0.08 * breathe})`)
        ctx.fillStyle = pupilGrad
        ctx.fill()

        // Specular highlight - small bright dot offset from center (gives life)
        const specX = -pupilR * 0.45
        const specY = -pupilR * 0.4
        const specR = pupilR * 0.22
        ctx.beginPath()
        ctx.arc(specX, specY, specR, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 250, ${0.18 * breathe * blinkProgress})`
        ctx.fill()

        // Second smaller highlight
        const spec2X = pupilR * 0.3
        const spec2Y = pupilR * 0.25
        ctx.beginPath()
        ctx.arc(spec2X, spec2Y, specR * 0.5, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 250, ${0.08 * breathe * blinkProgress})`
        ctx.fill()

        ctx.restore()

        // Eyelid seam line: visible during and briefly after blink
        if (blinkProgress < 0.95) {
          ctx.save()
          ctx.translate(px, py)
          const lidAlpha = (1 - blinkProgress) * 0.35
          const lidW = w * 1.15
          ctx.beginPath()
          ctx.moveTo(-lidW, 0)
          ctx.quadraticCurveTo(0, -2 * (1 - blinkProgress), lidW, 0)
          ctx.strokeStyle = `rgba(200, 225, 200, ${lidAlpha})`
          ctx.lineWidth = 1.2
          ctx.stroke()
          ctx.restore()
        }
      }

      // Draw two eyes
      drawEye(centerX - gap / 2, centerY)
      drawEye(centerX + gap / 2, centerY)

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animId)
    }
  }, [])

  useEffect(() => {
    const cleanup = init()
    return cleanup
  }, [init])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0"
      aria-hidden="true"
    />
  )
}

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background effects */}
      <InkBackground />
      <DragonEyes />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <h1
          className="animate-fade-up -mt-4 text-2xl font-light leading-relaxed tracking-wide text-foreground md:text-3xl lg:text-4xl"
          style={{ animationDelay: "0.3s", opacity: 0 }}
        >
          <span className="text-balance">
            {"以墨为介，记录行路所思"}
          </span>
        </h1>
        <p
          className="animate-fade-up mx-auto mt-6 max-w-xl text-sm leading-relaxed tracking-wider text-muted-foreground md:text-base"
          style={{ animationDelay: "0.5s", opacity: 0 }}
        >
          {"探索项目实践、记录成长经历、分享学习成果、沉淀个人思考"}
        </p>
        <div
          className="animate-fade-up mt-16"
          style={{ animationDelay: "0.8s", opacity: 0 }}
        >
          <button
            onClick={() =>
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
            }
            className="group inline-flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            aria-label="向下探索"
          >
            <span className="text-xs tracking-[0.3em]">{"向下探索"}</span>
            <svg
              width="16" height="24" viewBox="0 0 16 24" fill="none"
              className="animate-bounce"
            >
              <path d="M8 0v20m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
