"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "./section-header"
import { InkBackground } from "./ink-background"
import Image from "next/image"

const education = [
  {
    degree: "Master",
    school: "Zhejiang University, Hangzhou, China",
    detail: "Financial Technology(ZIBS IMF), Supervisor: Prof. Hui Shao, 2024.09-2026.06",
  },
  {
    degree: "Bachelor",
    school: "Hangzhou Dianzi University, Hangzhou, China",
    detail: "Computer Science and Technology, 2019.09-2023.06",
  },
]

const soulImages = [
  { src: "/images/soul-1.jpg", alt: "Life moment 1" },
  { src: "/images/soul-2.jpg", alt: "Life moment 2" },
  { src: "/images/soul-3.jpg", alt: "Life moment 3" },
  { src: "/images/soul-4.jpg", alt: "Life moment 4" },
  { src: "/images/soul-5.jpg", alt: "Life moment 5" },
  { src: "/images/soul-6.jpg", alt: "Life moment 6" },
  { src: "/images/soul-7.jpg", alt: "Life moment 7" },
  { src: "/images/soul-8.jpg", alt: "Life moment 8" },
  { src: "/images/soul-9.jpg", alt: "Life moment 9" },
  { src: "/images/soul-10.jpg", alt: "Life moment 10" },
]

export function AboutSection() {
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
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="relative py-32 overflow-hidden">
      <InkBackground />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader title="关于我" subtitle="About" character="己" />

        <div ref={ref} className="space-y-20">
          {/* Row 1: Photo (left) + Education (right) */}
          <div className="flex flex-col md:flex-row items-start gap-12 md:gap-16">
            {/* Circular photo */}
            <div
              className={`shrink-0 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="group relative h-56 w-56 lg:h-64 lg:w-64 rounded-full overflow-hidden border-2 border-border/50">
                <Image
                  src="/images/profile.jpg"
                  alt="Profile photo"
                  fill
                  className="object-cover grayscale opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                />
                {/* Scan line on hover */}
                <div className="absolute inset-0 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div
                    className="absolute left-0 right-0 h-px bg-foreground/10"
                    style={{ animation: "scanDown 2s ease-in-out infinite" }}
                  />
                </div>
                {/* Glow ring */}
                <div className="absolute -inset-1 rounded-full border border-foreground/0 transition-all duration-700 group-hover:border-foreground/10 group-hover:scale-105" />
              </div>
            </div>

            {/* Education timeline */}
            <div
              className={`flex-1 transition-all duration-700 delay-200 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-8">
                {education.map((item, i) => (
                  <div
                    key={item.degree}
                    className={`flex items-start gap-4 transition-all duration-600`}
                    style={{ transitionDelay: `${300 + i * 150}ms` }}
                  >
                    {/* Timeline dot + dashed line */}
                    <div className="flex items-center gap-3 shrink-0 pt-1">
                      <div className="h-3 w-3 rounded-full border border-foreground/30" />
                      <div className="w-12 border-t border-dashed border-foreground/20" />
                    </div>

                    {/* Degree label */}
                    <div className="flex items-center gap-3 shrink-0 pt-0.5">
                      <span className="text-base font-semibold text-foreground tracking-wide min-w-[72px]">
                        {item.degree}
                      </span>
                      <span className="text-foreground/30">{"-->"}</span>
                    </div>

                    {/* School + details */}
                    <div className="flex-1">
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {item.school}
                      </p>
                      <p className="mt-0.5 text-sm text-muted-foreground leading-relaxed">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Row 2: Self-intro (left) + Soul Gallery (right) */}
          <div className="flex flex-col md:flex-row gap-12 md:gap-16">
            {/* Left: Self intro */}
            <div
              className={`md:w-2/5 transition-all duration-700 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-2xl font-light text-foreground leading-snug">
                Hi，
              </h3>
              <h3 className="text-2xl font-light text-foreground mt-1 leading-snug">
                我是程浚楷 (也可以叫我Moyu)
              </h3>

              <p className="mt-8 text-sm leading-loose text-foreground/70">
                Greetings, fellow travelers of the Way. I'm Junkai (Moyu) Cheng. My "cyber-destiny" (BaZi) is an INTJ Capricorn. Currently, I am pursuing a Master's in FinTech at the{" "}
                <span className="text-foreground underline underline-offset-4 decoration-foreground/30">
                  Zhejiang University International Business School (ZIBS)
                </span>
                . My research and academic focus lie at the intersection of AI technologies, Reinforcement Learning in capital markets, and Cloud Computing.
              </p>

              <p className="mt-5 text-sm leading-loose text-foreground/70">
                Driven by a deep fascination with secondary markets, I made the pivot from Computer Science to Finance during my graduate studies. I am privileged to conduct my research under the guidance of{" "}
                <span className="text-foreground underline underline-offset-4 decoration-foreground/30">
                  Professor Hui Shao
                </span>
                , where I strive to bridge the gap between theory and practice, pushing the boundaries of Quantitative Finance.
              </p>

              <p className="mt-5 text-sm leading-loose text-foreground/70">
                Beyond the classroom, I have explored various roles through internships to find my true North. Having seen the "thousand sails" of the industry, I've set my sights on AI-driven roles—a path that allows me to synergize my technical strengths with my personal passions. I am eager to contribute my talents to the exciting technological tides of our era.
              </p>

              <p className="mt-5 text-sm leading-loose text-foreground/70">
                I strive to perceive the world through an objective and egalitarian lens, while embracing life with sincerity and passion. My ultimate goal is to make a meaningful impact within my sphere of influence.
              </p>

              <p className="mt-5 text-sm leading-loose text-foreground/70">
                If you'd like to connect, collaborate, or simply exchange ideas, I'd love to hear from you! You can reach me via:
              </p>

              <p className="mt-3 text-sm leading-loose text-foreground/70">
                <span className="text-foreground">Email:</span> chengyimoyu@163.com<br />
                <span className="text-foreground">WeChat:</span> chengyimoyu110
              </p>
            </div>

            {/* Right: Soul gallery */}
            <div
              className={`md:w-3/5 transition-all duration-700 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h4 className="text-xl font-light text-foreground mb-6 tracking-wide">
                My Soul, My Life
              </h4>

              <div className="grid grid-cols-3 gap-3">
                {soulImages.map((img, i) => (
                  <div
                    key={i}
                    className="group relative aspect-[4/5] overflow-hidden rounded-sm border border-border/30 bg-card"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover grayscale opacity-70 transition-all duration-700 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-background/20 transition-opacity duration-500 group-hover:opacity-0" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
