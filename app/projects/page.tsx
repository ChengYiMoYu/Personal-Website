import { ProjectDetailLayout, ProjectSection, ProjectImage } from "@/components/project-detail-layout"

export default function ExampleProjectPage() {
  const sections = [
    { id: "overview", title: "项目概述" },
    { id: "background", title: "项目背景" },
    { id: "architecture", title: "技术架构" },
    { id: "features", title: "核心功能" },
    { id: "implementation", title: "实现细节" },
    { id: "results", title: "项目成果" },
  ]

  return (
    <ProjectDetailLayout
      title="示例项目标题"
      date="2024.12.15"
      tags={["React", "TypeScript", "Next.js"]}
      githubUrl="https://github.com/yourusername/project"
      sections={sections}
    >
      <ProjectSection id="overview" title="项目概述">
        <p>
          这里是项目的简短介绍。用100-200字描述项目的核心价值、主要功能和技术特点。
          可以包含项目的背景、目标用户、解决的问题等关键信息。
        </p>
        <p>
          第二段可以补充更多细节，比如项目的规模、使用的核心技术栈、开发周期等。
          保持语言简洁明了，让读者快速了解项目的全貌。
        </p>
      </ProjectSection>

      <ProjectSection id="background" title="项目背景">
        <p>
          描述项目的起源和背景。为什么要做这个项目？遇到了什么问题需要解决？
          市场上现有的解决方案有什么不足？
        </p>
        <ProjectImage
          src="/images/projects/project-1-detail-1.jpg"
          alt="项目背景配图"
          caption="图1：项目背景示意图"
        />
        <p>
          可以继续补充更多背景信息，比如用户调研结果、市场分析、竞品分析等。
        </p>
      </ProjectSection>

      <ProjectSection id="architecture" title="技术架构">
        <p>
          介绍项目的技术架构设计。使用了哪些技术栈？为什么选择这些技术？
          系统的整体架构是怎样的？
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>前端框架：React + TypeScript + Next.js</li>
          <li>状态管理：Zustand / Redux</li>
          <li>UI组件库：Tailwind CSS + Radix UI</li>
          <li>后端服务：Node.js + Express</li>
          <li>数据库：PostgreSQL</li>
          <li>部署平台：Vercel / AWS</li>
        </ul>
        <ProjectImage
          src="/images/projects/project-1-detail-2.jpg"
          alt="技术架构图"
          caption="图2：系统技术架构"
        />
      </ProjectSection>

      <ProjectSection id="features" title="核心功能">
        <p>
          详细介绍项目的核心功能模块。每个功能解决了什么问题？如何使用？
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">功能一：智能搜索</h3>
        <p>
          支持自然语言搜索，用户可以用日常语言描述需求，系统会智能理解并返回相关结果。
          采用了先进的NLP技术和向量检索算法。
        </p>
        <ProjectImage
          src="/images/projects/project-1-detail-3.jpg"
          alt="智能搜索功能"
          caption="图3：智能搜索界面"
        />

        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">功能二：数据可视化</h3>
        <p>
          提供丰富的数据可视化图表，支持多种图表类型和交互方式。
          用户可以自定义图表样式，导出高清图片。
        </p>
        <ProjectImage
          src="/images/projects/project-1-detail-4.jpg"
          alt="数据可视化功能"
          caption="图4：数据可视化看板"
        />
      </ProjectSection>

      <ProjectSection id="implementation" title="实现细节">
        <p>
          分享项目开发过程中遇到的技术难点和解决方案。这部分可以展示你的技术深度。
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">难点一：性能优化</h3>
        <p>
          在处理大量数据时，页面渲染性能成为瓶颈。通过以下方案解决：
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>使用虚拟滚动技术，只渲染可见区域的数据</li>
          <li>实现增量加载和懒加载策略</li>
          <li>优化React组件渲染，使用memo和useMemo</li>
          <li>采用Web Worker处理复杂计算</li>
        </ul>

        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">难点二：实时同步</h3>
        <p>
          多用户协作场景下的数据实时同步是一个挑战。最终采用WebSocket + CRDT算法实现了
          无冲突的实时协作编辑功能。
        </p>
      </ProjectSection>

      <ProjectSection id="results" title="项目成果">
        <p>
          总结项目取得的成果和影响。可以包含数据指标、用户反馈、获得的认可等。
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>上线3个月，累计用户超过10,000人</li>
          <li>日活跃用户达到2,000+，用户留存率65%</li>
          <li>获得Product Hunt当日推荐第3名</li>
          <li>GitHub获得500+ stars</li>
          <li>被多家科技媒体报道</li>
        </ul>
        <ProjectImage
          src="/images/projects/project-1-detail-5.jpg"
          alt="项目成果展示"
          caption="图5：用户增长数据"
        />
        <p className="mt-6">
          项目的成功验证了技术方案的可行性，也为后续的产品迭代奠定了基础。
          未来计划增加更多AI功能，进一步提升用户体验。
        </p>
      </ProjectSection>
    </ProjectDetailLayout>
  )
}
