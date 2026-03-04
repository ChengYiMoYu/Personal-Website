"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "./section-header"
import { InkBackground } from "./ink-background"

const learningItems = [
  {
    category: "前端工程",
    items: [
      { name: "React 高级模式与性能优化", status: "completed" },
      { name: "TypeScript 类型体操", status: "completed" },
      { name: "WebGL 与 Shader 编程", status: "in-progress" },
      { name: "Rust + WebAssembly", status: "planned" },
    ],
  },
  {
    category: "系统设计",
    items: [
      { name: "分布式系统基础", status: "completed" },
      { name: "微前端架构实践", status: "completed" },
      { name: "云原生与 Serverless", status: "in-progress" },
      { name: "大规模系统性能调优", status: "planned" },
    ],
  },
  {
    category: "AI 与数据",
    items: [
      { name: "机器学习基础与实践", status: "completed" },
      { name: "LLM 应用开发", status: "in-progress" },
      { name: "RAG 架构设计", status: "in-progress" },
      { name: "AI Agent 编排", status: "planned" },
    ],
  },
  {
    category: "设计与创意",
    items: [
      { name: "UI/UX 设计原则", status: "completed" },
      { name: "动态交互与动画设计", status: "completed" },
      { name: "信息可视化", status: "in-progress" },
      { name: "生成艺术", status: "planned" },
    ],
  },
]

const statusConfig = {
  completed: { label: "已完成", class: "bg-foreground/15 text-foreground/70" },
  "in-progress": { label: "进行中", class: "bg-foreground/8 text-foreground/50" },
  planned: { label: "计划中", class: "bg-foreground/4 text-muted-foreground" },
}

export function LearningSection() {
  return (
    <section id="learning" className="relative py-32 overflow-hidden">
      <InkBackground />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader title="学习成果" subtitle="Learning" character="学" />

        <div className="grid gap-6 sm:grid-cols-2">
          {learningItems.map((category, i) => (
            <LearningCard key={category.category} category={category} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

function LearningCard({
  category,
  index,
}: {
  category: (typeof learningItems)[0]
  index: number
}) {
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
      { threshold: 0.15 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const completed = category.items.filter((i) => i.status === "completed").length
  const total = category.items.length
  const progress = (completed / total) * 100

  return (
    <div
      ref={ref}
      className={`group rounded-lg border border-border bg-card p-6 transition-all duration-700 hover:border-foreground/20 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium tracking-wider text-foreground">
          {category.category}
        </h3>
        <span className="text-xs text-muted-foreground font-mono">
          {completed}/{total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-px bg-border">
        <div
          className="h-full bg-foreground/30 transition-all duration-1000"
          style={{ width: isVisible ? `${progress}%` : "0%" }}
        />
      </div>

      <ul className="mt-5 space-y-3">
        {category.items.map((item) => {
          const config = statusConfig[item.status as keyof typeof statusConfig]
          return (
            <li key={item.name} className="flex items-center justify-between gap-4">
              <span className="text-sm text-muted-foreground">{item.name}</span>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs ${config.class}`}
              >
                {config.label}
              </span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
