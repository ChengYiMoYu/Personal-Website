"use client"

import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { LearningSection } from "@/components/learning-section"
import { ThoughtsSection } from "@/components/thoughts-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="relative min-h-screen ink-texture">
      <Navigation />

      <main>
        <HeroSection />

        {/* Ink wash divider */}
        <div className="relative h-px w-full">
          <div className="absolute inset-0 bg-border" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            aria-hidden="true"
          >
            <div className="h-1.5 w-1.5 rounded-full bg-foreground/20" />
          </div>
        </div>

        <AboutSection />

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="h-px bg-border" />
        </div>

        <ExperienceSection />

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="h-px bg-border" />
        </div>

        <ProjectsSection />

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="h-px bg-border" />
        </div>

        <LearningSection />

        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="h-px bg-border" />
        </div>

        <ThoughtsSection />
      </main>

      <Footer />
    </div>
  )
}
