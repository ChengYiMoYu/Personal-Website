"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { SectionHeader } from "./section-header"
import { InkBackground } from "./ink-background"
import { ArrowUpRight } from "lucide-react"

const thoughts = [
  {
    title: "论代码的审美",
    excerpt:
      "好的代码不仅仅是功能的实现。它应该像一篇好文章，有清晰的结构、恰当的节奏，以及让人愉悦的表达方式。当我们谈论代码之美时，我们在谈论什么？",
    date: "2025.02",
    category: "编程哲学",
    image: "https://images.unsplash.com/photo-1515879218367-8466d910auj7?w=600&h=400&fit=crop",
  },
  {
    title: "从水墨画到界面设计",
    excerpt:
      "传统水墨画中的留白、气韵与节奏感，如何被翻译为现代数字界面的设计语言？这是一次跨越千年的对话。",
    date: "2025.01",
    category: "设计思考",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=400&fit=crop",
  },
  {
    title: "AI 时代的开发者修炼",
    excerpt:
      "当 AI 可以生成大量代码时，开发者的核心竞争力在哪里？我认为答案在于更深层的系统思维、审美判断与创造性问题解决。",
    date: "2024.12",
    category: "行业观察",
    image: "https://images.unsplash.com/photo-1677442135136-760c813028c4?w=600&h=400&fit=crop",
  },
  {
    title: "慢下来，才能更快",
    excerpt:
      "在追求效率的时代，我重新发现了慢思考的价值。有些问题需要在散步中、在阅读中、在沉默中找到答案。",
    date: "2024.11",
    category: "个人成长",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
  },
  {
    title: "组件的哲学",
    excerpt:
      "好的组件抽象是一种思维艺术。它需要在通用性与专用性之间找到平衡，在灵活与简洁之间做出取舍。",
    date: "2024.10",
    category: "编程哲学",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
  },
]

// Ink ripple on click
function InkRipple({ active, x, y }: { active: boolean; x: number; y: number }) {
  if (!active) return null
  return (
    <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden rounded-lg">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute rounded-full border border-foreground/10"
          style={{
            left: x - 50 - i * 30,
            top: y - 50 - i * 30,
            width: 100 + i * 60,
            height: 100 + i * 60,
            animation: `inkRipple 1.2s ${i * 0.15}s ease-out forwards`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  )
}

export function ThoughtsSection() {
  return (
    <section id="thoughts" className="relative py-32 overflow-hidden">
      <InkBackground />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader title="思考" subtitle="Thoughts" character="思" />

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {thoughts.map((thought, i) => (
            <ThoughtCard key={thought.title} thought={thought} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ThoughtCard({
  thought,
  index,
}: {
  thought: (typeof thoughts)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [ripple, setRipple] = useState<{ active: boolean; x: number; y: number }>({
    active: false,
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const handleClick = useCallback((e: React.MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipple({ active: true, x, y })
    setTimeout(() => setRipple({ active: false, x: 0, y: 0 }), 1300)
  }, [])

  return (
    <article
      ref={ref}
      className={`group relative cursor-pointer overflow-hidden rounded-lg border border-border transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background image: grayscale by default, color on hover */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          isHovered ? "grayscale-0 opacity-25 scale-105" : "grayscale opacity-10 scale-100"
        }`}
        style={{ backgroundImage: `url(${thought.image})` }}
      />

      {/* Dark overlay */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isHovered ? "bg-background/70" : "bg-background/90"
      }`} />

      {/* Ink ripple */}
      <InkRipple active={ripple.active} x={ripple.x} y={ripple.y} />

      {/* Content */}
      <div className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs tracking-wider text-muted-foreground">
              {thought.date}
            </span>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">
              {thought.category}
            </span>
          </div>
          <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>

        <h3 className={`mt-5 text-base font-medium text-foreground transition-transform duration-500 ${
          isHovered ? "-translate-y-1" : "translate-y-0"
        }`}>
          {thought.title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-2 transition-transform duration-500 ${
          isHovered ? "-translate-y-1" : "translate-y-0"
        }`}>
          {thought.excerpt}
        </p>

        {/* "More details" float-up */}
        <div
          className={`mt-3 overflow-hidden transition-all duration-500 ${
            isHovered ? "max-h-8 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <span className="text-xs tracking-[0.2em] text-foreground/60">
            More details &rarr;
          </span>
        </div>
      </div>

      {/* Bottom brush stroke */}
      <div className="absolute bottom-0 left-0 h-px w-0 bg-foreground/30 transition-all duration-700 group-hover:w-full" />
    </article>
  )
}
