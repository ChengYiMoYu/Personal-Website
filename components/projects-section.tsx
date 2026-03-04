"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { SectionHeader } from "./section-header"
import { InkBackground } from "./ink-background"
import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

const projects = [
  {
    title: "个人网页实践",
    description:
      "基于水墨美学的个人网页，融合东方审美与现代 Web 技术。",
    tags: ["Vercel", "Vibe Coding", "Personal Website"],
    year: "2026.2",
    featured: true,
    image: "https://preview.qiantucdn.com/58pic/Wl/tq/fP/3H/n86xd0lbomrahw7i5je4cyqsu2p93fgt_PIC2018.png!qt_h320",
    link: "/projects/personal_website",
  },
  {
    title: "智流笔记",
    description:
      "AI 驱动的智能笔记应用，支持自然语言搜索、自动标签与知识图谱可视化。",
    tags: ["Next.js", "AI SDK", "PostgreSQL"],
    year: "2024",
    featured: true,
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600&h=400&fit=crop",
    link: "/projects/example",
  },
  {
    title: "光影画廊",
    description:
      "摄影作品在线展示平台，采用瀑布流布局与 WebGL 渲染，带来沉浸式浏览体验。",
    tags: ["Three.js", "WebGL", "Node.js"],
    year: "2024",
    featured: false,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
    link: "/projects/example",
  },
  {
    title: "节气日历",
    description:
      "将中国二十四节气融入现代日历应用，结合天气数据提供个性化生活建议。",
    tags: ["React Native", "API", "Design"],
    year: "2023",
    featured: false,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    link: "/projects/example",
  },
  {
    title: "代码禅园",
    description:
      "面向开发者的冥想与专注力训练工具。通过编程挑战与呼吸练习，帮助开发者保持心流状态。",
    tags: ["Vue.js", "Web Audio", "Canvas"],
    year: "2023",
    featured: false,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=300&fit=crop",
    link: "/projects/example",
  },
  {
    title: "数据山水",
    description:
      "数据可视化实验项目，将数据集以中国山水画的形式呈现，探索信息艺术的可能性。",
    tags: ["D3.js", "Canvas", "Python"],
    year: "2022",
    featured: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    link: "/projects/example",
  },
]

// Ink ripple effect component
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

export function ProjectsSection() {
  return (
    <section id="projects" className="relative py-32 overflow-hidden">
      <InkBackground />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader title="项目" subtitle="Projects" character="造" />

        {/* Featured projects */}
        <div className="mb-12 grid gap-6 md:grid-cols-2">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} featured />
            ))}
        </div>

        {/* Other projects grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects
            .filter((p) => !p.featured)
            .map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: (typeof projects)[0]
  index: number
  featured?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
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
    <Link
      href={project.link || "#"}
      ref={ref}
      className={`group relative block cursor-pointer overflow-hidden rounded-lg border border-border transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 120}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Background image with grayscale/color transition */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
          isHovered ? "grayscale-0 opacity-30 scale-105" : "grayscale opacity-15 scale-100"
        }`}
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {/* Dark overlay */}
      <div className={`absolute inset-0 transition-colors duration-500 ${
        isHovered ? "bg-background/70" : "bg-background/85"
      }`} />

      {/* Ink ripple */}
      <InkRipple active={ripple.active} x={ripple.x} y={ripple.y} />

      {/* Content */}
      <div className={`relative z-10 ${featured ? "p-8" : "p-6"}`}>
        <div className="flex items-start justify-between">
          <span className="font-mono text-xs tracking-wider text-muted-foreground">
            {project.year}
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
        </div>

        <h3 className={`mt-6 font-medium text-foreground transition-transform duration-500 ${
          featured ? "text-lg" : "text-sm"
        } ${isHovered ? "-translate-y-1" : "translate-y-0"}`}>
          {project.title}
        </h3>
        <p className={`mt-3 leading-relaxed text-muted-foreground transition-transform duration-500 ${
          featured ? "text-sm" : "text-xs line-clamp-2"
        } ${isHovered ? "-translate-y-1" : "translate-y-0"}`}>
          {project.description}
        </p>

        <div className={`mt-4 flex flex-wrap gap-2 ${featured ? "" : "gap-1.5"}`}>
          {(featured ? project.tags : project.tags.slice(0, 2)).map((tag) => (
            <span
              key={tag}
              className={`rounded-full border border-border px-3 py-1 text-xs text-muted-foreground transition-transform duration-500 ${
                isHovered ? "-translate-y-1" : "translate-y-0"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* "More details" float-up text */}
        <div
          className={`mt-4 overflow-hidden transition-all duration-500 ${
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
    </Link>
  )
}
