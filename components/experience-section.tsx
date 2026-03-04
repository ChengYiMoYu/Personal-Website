"use client"

import { useEffect, useRef, useState } from "react"
import { SectionHeader } from "./section-header"
import { InkBackground } from "./ink-background"

const experiences = [
  {
    period: "2025.7 — 2026.2",
    role: "产品经理（技术背景）",
    company: "腾讯科技",
    description:
      "腾讯CSIG云产品一部，主要负责内部AI提效、云产品出海专项建设和WEB3行业相关研究",
    tags: ["Vibe Coding", "产品介绍页PRD", "OMS海外建设", "Workflow", "WEB3", "数据分析"],
  },
  {
    period: "2025.3 — 2025.7",
    role: "AI产品经理",
    company: "阿里巴巴-智能信息（现千问C端事业群）",
    description:
      "主要负责RAG场景专项优化、Deepresearch问题发现和数据准备、图搜等MCP优化",
    tags: ["RAG", "Deep Research", "Function Call", "后训练", "SFT-RL-RM", "Query富集"],
  },
  {
    period: "2025.1 — 2025.3",
    role: "股票研究组实习生",
    company: "中柏资管（热联集团）",
    description:
      "负责AI技术解析和上下游应用分析（云厂商、ERP等），相关公司业务&财务基本面分析",
    tags: ["行业研究", "R1技术解析", "国内外云厂分析"],
  },
  {
    period: "2024.10 — 2025.1",
    role: "运营质量分析",
    company: "极氪智能科技",
    description:
      "负责竞品发布会（前中后）数据监测，消费者情绪研究，车企销售模式变动分析，舆情数据看板搭建",
    tags: ["PowerBI", "Tableau", "Python", "情绪分析", "发布会监测"],
  },
  {
    period: "2024.5 — 2024.8",
    role: "研究实习生",
    company: "浙商中拓-新能源研究院",
    description:
      "主要负责多晶硅和碳酸锂的上下游供需分析和常规日、周、月报撰写，多晶硅上市前研究准备",
    tags: ["多晶硅", "碳酸锂", "供需分析", "研究报告"],
  },
  {
    period: "2024.1 — 2024.3",
    role: "电商运营",
    company: "摇多米",
    description:
      "支付宝电商直播运营、商城建设与管理、活动（年货节）策划与选品调整、小红书运营（即夜）",
    tags: ["电商运营", "直播运营", "活动策划", "小红书"],
  },
  {
    period: "2023.2 — 2023.6",
    role: "风险管理实习生",
    company: "泰隆银行总行",
    description:
      "对接人行征信系统相关调整，更新行内征信系统需求PRD；数据中心应急预案撰写",
    tags: ["征信系统", "应急预案", "人民银行", "PRD撰写"],
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="relative py-32 overflow-hidden">
      <InkBackground />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <SectionHeader title="经历" subtitle="Experience" character="历" />

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-0 top-0 bottom-0 w-px bg-border md:left-[140px]"
            aria-hidden="true"
          />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <ExperienceItem key={i} experience={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ExperienceItem({
  experience,
  index,
}: {
  experience: (typeof experiences)[0]
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
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`group relative flex flex-col gap-4 py-8 pl-8 md:flex-row md:gap-0 md:pl-0 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Period */}
      <div className="w-[140px] shrink-0 pt-1 hidden md:block">
        <span className="text-xs tracking-wider text-muted-foreground font-mono">
          {experience.period}
        </span>
      </div>

      {/* Timeline dot */}
      <div className="absolute left-0 top-10 md:left-[140px] md:top-10 -translate-x-1/2">
        <div
          className={`h-2 w-2 rounded-full border border-foreground/30 transition-all duration-500 ${
            isVisible ? "bg-foreground/50 scale-100" : "bg-transparent scale-0"
          }`}
        />
      </div>

      {/* Content */}
      <div className="flex-1 md:pl-12">
        <span className="text-xs tracking-wider text-muted-foreground font-mono md:hidden">
          {experience.period}
        </span>
        <h3 className="text-base font-medium text-foreground mt-1 md:mt-0">
          {experience.role}
          <span className="text-muted-foreground font-light">
            {" "}
            · {experience.company}
          </span>
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          {experience.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {experience.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}
