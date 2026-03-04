"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Menu, X } from "lucide-react"

interface ProjectDetailLayoutProps {
  title: string
  date: string
  tags: string[]
  githubUrl?: string
  children: React.ReactNode
  sections: { id: string; title: string }[]
}

export function ProjectDetailLayout({
  title,
  date,
  tags,
  githubUrl,
  children,
  sections,
}: ProjectDetailLayoutProps) {
  const [activeSection, setActiveSection] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }))

      const current = sectionElements.find((s) => {
        if (!s.element) return false
        const rect = s.element.getBoundingClientRect()
        return rect.top <= 150 && rect.bottom >= 150
      })

      if (current) {
        setActiveSection(current.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
      setSidebarOpen(false)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/#projects"
            className="group flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            <span className="font-light tracking-wide">Moyu</span>
          </Link>

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                GitHub
              </a>
            )}
          </nav>
        </div>
      </header>

      {/* Sidebar - Desktop (hover to show) */}
      <aside className="fixed left-0 top-16 hidden h-[calc(100vh-4rem)] w-64 lg:block z-40 group/sidebar">
        {/* Hover trigger area */}
        <div className="absolute left-0 top-0 w-12 h-full" />
        
        {/* Sidebar content */}
        <div className="absolute left-0 top-0 h-full w-64 -translate-x-full transition-transform duration-300 group-hover/sidebar:translate-x-0">
          <div className="h-full border-r border-border bg-background/70 backdrop-blur-md shadow-lg">
            <div className="p-6">
              <h3 className="mb-4 text-xs font-medium tracking-wider text-muted-foreground">
                目录
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left text-sm transition-colors ${
                      activeSection === section.id
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`h-px w-4 transition-all ${
                          activeSection === section.id ? "bg-foreground w-6" : "bg-border"
                        }`}
                      />
                      {section.title}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <aside
        className={`fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background transition-transform lg:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6">
          <h3 className="mb-4 text-xs font-medium tracking-wider text-muted-foreground">
            目录
          </h3>
          <nav className="space-y-2">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`block w-full text-left text-sm transition-colors ${
                  activeSection === section.id
                    ? "text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <span className="flex items-center gap-2">
                  <span
                    className={`h-px w-4 transition-all ${
                      activeSection === section.id ? "bg-foreground w-6" : "bg-border"
                    }`}
                  />
                  {section.title}
                </span>
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main content */}
      <main className="pt-16">
        <article className="mx-auto max-w-3xl px-6 py-16">
          {/* Title section */}
          <header className="mb-12 border-b border-border pb-8">
            <h1 className="text-3xl font-light tracking-tight text-foreground md:text-4xl">
              {title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <time className="font-mono text-xs">{date}</time>
              <span className="text-border">·</span>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-border px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {children}
          </div>
        </article>
      </main>
    </div>
  )
}

interface ProjectSectionProps {
  id: string
  title: string
  children: React.ReactNode
}

export function ProjectSection({ id, title, children }: ProjectSectionProps) {
  return (
    <section id={id} className="mb-16 scroll-mt-24">
      <h2 className="mb-6 text-2xl font-light text-foreground">{title}</h2>
      <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  )
}

interface ProjectImageProps {
  src: string
  alt: string
  caption?: string
}

export function ProjectImage({ src, alt, caption }: ProjectImageProps) {
  return (
    <figure className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border bg-card">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
