import { ProjectDetailLayout, ProjectSection, ProjectImage } from "@/components/project-detail-layout"

export default function PersonalWebsiteProjectPage() {
  const sections = [
    { id: "overview", title: "项目概述" },
    { id: "background", title: "项目背景" },
    { id: "architecture", title: "项目架构" },
    { id: "features", title: "实现步骤" },
    { id: "implementation", title: "项目成果" },
    { id: "results", title: "优化展望" },
  ]

  return (
    <ProjectDetailLayout
      title="个人网页实践"
      date="2026.3.4"
      tags={["Vercel", "Vibe Coding"]}
      githubUrl="https://github.com/ChengYiMoYu/Personal-Website.git"
      sections={sections}
    >
      <ProjectSection id="overview" title="项目概述">
        <p>
          本项目是一个利用 Vercel v0 的 UI 生成能力与 Cursor 智能代码编辑器深度协作完成的个人数字化名片。其核心价值在于探索“自然语言驱动”的开发新范式，解决传统开发中设计门槛高、逻辑堆砌慢的痛点。主要功能涵盖了响应式作品集展示、基于 Framer Motion 的交互式简历，以及集成自适应深色模式的现代化 UI。该项目直接面向需要快速建立品牌形象的开发者与设计师，实现了从创意构思到上线部署的无缝衔接。
        </p>
        <p>
          得益于 v0 的提示词生成与 Cursor 的实时逻辑补全，整个开发周期从传统的数周缩短至一天内。通过 Vercel 的自动化 CI/CD 流水线，项目实现了秒级更新与全球边缘加速部署。这不仅是一个个人网站，更是 AI 辅助编程（AI-Pair Programming）在复杂前端工程中高效率、高审美落地的实战样板。
        </p>
      </ProjectSection>

      <ProjectSection id="background" title="项目背景">
        <p>
          在人工智能席卷全球的当下，个人职业身份的呈现形式正经历着一场从“纸质文档”向“数字空间”的范式转移。传统的 PDF 或 Word 简历受限于扁平的排版和碎片化的信息，已难以承载一个个体全方位的审美取向、思维逻辑与过往积淀。在这个“人人皆可创作”的时代，我们发现简历不再仅仅是一份求职附件，它更应该是一个流动的、可感知的、具备个人魅力的数字橱窗。
        </p>
        <p>
          本项目诞生的初衷，正是为了解决传统职业展示手段的局限性。市场上现有的模板化建站平台（如 Wix 或 WordPress）虽然降低了门槛，但往往存在样式冗余、定制化成本高、难以体现极客审美等不足；而从零开始编写代码又会耗费大量精力在重复的基建工作上。
        </p>
        <ProjectImage
          src="/images/projects/项目背景.png"
          alt="项目背景配图"
          caption="图1：项目背景示意图"
        />
        <p>
          得益于 Vercel v0 与 Cursor 等 AI 原生开发工具的成熟，网页开发的“工程壁垒”被彻底打破。我们意识到，对于一个有想法、有审美的个人而言，现在正是利用 AI 辅助编程将脑海中的视觉蓝图快速转化为现实的最佳时机。本项目旨在打造一个集成“多维度作品集”、“深度交互简历”与“思考型博客”为一体的个人综合平台。通过网页这一载体，开发者可以跨越文字的限制，通过色彩布局、动画节奏与交互细节，更全面地对外展示自己的独特气质与专业厚度。这不仅是一个技术实践，更是一次在 AI 辅助下夺回“个人定义权”的艺术表达。
        </p>
      </ProjectSection>

      <ProjectSection id="architecture" title="项目架构">
        <p>
          项目的架构设计摒弃了传统的手工编码模式，转而采用一种<b>“AI 驱动的迭代开发流程”</b>。核心思路是通过结构化的 Prompt 引导 Vercel v0 生成高保真的 UI 原型，再利用 Cursor (Vibe coding IDE) 进行深度逻辑定制。这种架构选择不仅极大提高了视觉还原度，还通过 Next.js 的全栈能力确保了卓越的性能与 SEO 表现。
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li>前端框架：Next.js (App Router) + TypeScript</li>
          <li>样式/组件：Tailwind CSS + Shadcn U(Radix UI)</li>
          <li>设计生成：Vercel v0 (基于提示词的 UI 生成引擎)</li>
          <li>智能编码：Cursor / Vibe Coding IDE (4.6 Sonnet)</li>
          <li>版本控制：GitHub</li>
          <li>托管部署：Vercel</li>
        </ul>
        <ProjectImage
          src="/images/projects/个人网站流程图.drawio.png"
          alt="项目架构图"
          caption="图2：项目架构"
        />
      </ProjectSection>

      <ProjectSection id="features" title="实现步骤">
        <p>
          本项目的实现过程是一个典型的“人机协作”闭环。我们利用 AI 处理高重复性的工程任务，将人的精力集中在创意策划与交互逻辑的微调上。
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Step1：结构化 Prompt 引导与 v0 快速原型</h3>
        <p>
          首先，我们将需求拆解为“板块构成”、“视觉风格”和“交互思路”三个维度。通过编写结构化的 Prompt（例如：创建一个具有深色模式切换、平滑滚动效果且基于 Shadcn UI 的个人简历 Hero 区），利用 Vercel v0 在数秒内生成多个高保真 React 组件初稿。
        </p>
        <ProjectImage
          src="/images/projects/vervel_v0.png"
          alt="智能搜索功能"
          caption="图3：智能搜索界面"
        />

        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Step2：Cursor 逻辑注血与内容深度定制</h3>
        <p>
          将 v0 导出的代码包导入 Cursor。对每个板块的内容进行精确替换。重点解决了多级路由跳转、作品集过滤算法以及 framer-motion 复杂动效的逻辑联调，实现了从“静态模板”到“动态应用”的飞跃。
          对于各个板块可以调整哪些内容，可以参考以下Prompt，让AI生成内容填写模板：
        </p>
        <pre className="mt-4 rounded-lg bg-neutral-900 text-neutral-50 text-xs md:text-sm p-4 overflow-x-auto">
        <code>{`我准备把网站中关于我的图片和文字内容全部换成新的。为了确保我提供的素材能完美适配你的代码结构，请你先给我列一个『内容填写模板』。这个模板需要包含以下确认项:
1. 文字部分:列出所有我需要提供的字段（例如：标题、副标题、正文段落、社交链接等)，让我可以像填空一样填进去。
2. 图片规范:请明确告诉我，为了达到最佳视觉效果，我需要准备一张什么比例(如1:1或4:3）和具体尺寸的图片？
3. 文件命名:请规定好图片文件的命名方式(例如 about-profile.jpg)`}</code></pre>
        <ProjectImage
          src="/images/projects/内容替换示例.png"
          alt="内容替换md文件示例"
          caption="图4：内容替换md文件示例"
        />
        <ProjectImage
          src="/images/projects/cursor展示.png"
          alt="cursor页面调整和内容编写"
          caption="图5：cursor页面调整和内容编写"
        />

        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Step3：GitHub 集成与 Vercel 自动化部署</h3>
                <p>
                最后，通过 GitHub 进行版本管理。每当在 IDE 中完成逻辑修改并推送到仓库时，Vercel 部署钩子会自动触发构建流程，进行静态资源优化、图片压缩及全球 CDN 分发，确保网站在各种终端下都能秒速开启。
                </p>
                <ProjectImage
                  src="/images/projects/GitHub上传.png"
                  alt="GitHub上传"
                  caption="图6：将全部项目文件上传至Github"
                />
                <ProjectImage
                  src="/images/projects/vercel一键部署.png"
                  alt="vercel一键部署"
                  caption="图7：Vercel一键部署"
                />
      </ProjectSection>

      <ProjectSection id="implementation" title="项目成果">
        <p className="font-semibold">
          As you can see now, I have completed the personal website project.
        </p>
      </ProjectSection>

      <ProjectSection id="results" title="优化展望">
        <p>
          总结项目取得的成果和影响。可以包含数据指标、用户反馈、获得的认可等。
        </p>
        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">1：尝试使用Figma完成设计</h3>
                <p>
                相比于 Vercel v0 这种基于大语言模型概率预测的“盲盒式”生成，Figma 流程提供了一个确定性的视觉锚点。在 v0 的工作流中，你往往是在与 AI 玩一场文字游戏，试图通过捉摸不定的 Prompt 去逼近脑海中的画面，结果往往是得到一个充满“AI 味”的标准化模板；而引入 Figma 后，设计稿成为了网站的“单源真理”，Vibecoding 工具不再需要猜测你的审美倾向，而是扮演一个拥有像素级还原能力的超级工程师，将你独特的排版、微妙的呼吸感和复杂的混合模式精准地翻译成代码。
                </p>
                <ProjectImage
                  src="/images/projects/figma设计方案.png"
                  alt="figma设计方案"
                  caption="图8：小红书上的figma设计方案"
                />

        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">2：更加便捷的内容编写方案</h3>
                <p>
                目前的方案中，如果需要独立编写一篇项目分享，需要在cursor中的tsx文件中使用JavaScript XML完成内容的编写。且图片上传需要手动上传到public文件夹中，然后通过import导入。这样的方式导致上传复杂文档变得极其困难。目前的解决思路概括如下：“把写 JSX，变成写 Markdown/表单数据，让页面用通用模板去渲染。”
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>每篇项目分享是一份 content/projects/xxx.mdx 文件</li>
                  <li>文件顶部用 frontmatter 填基础信息（标题、日期、封面图等），下面正文就是 Markdown / MDX</li>
                  <li>页面 app/projects/[slug]/page.tsx 是一个通用模版，根据 slug 读取对应 .mdx 文件，自动渲染成你现在这种排版风格</li>
                </ul>
                <p>
                每篇项目只需要写一份 MDX 文件，比如 content/projects/personal-website.mdx：
                </p>
                <pre className="mt-4 rounded-lg bg-neutral-900 text-neutral-50 text-xs md:text-sm p-4 overflow-x-auto">
        <code>{`---
title: "个人网页实践"
date: "2026-02-15"
tags: ["Vercel", "Vibe Coding"]
cover: "/images/projects/personal-website/cover.jpg"
---

## 项目概述

这里写项目概述的文字……

## 项目背景

这里写项目背景……

![项目架构图](/images/projects/personal-website/architecture.png)

## 实现步骤

### Step1：结构化 Prompt 与 v0 快速原型

这里写步骤说明……

### Step2：Cursor 逻辑定制

这里写步骤说明……`}</code></pre>
        <h3 className="text-lg font-medium text-foreground mt-6 mb-3">3：个人网站中嵌入自己的AI数字人</h3>
                <p>
                在实现了个人网站之余，未来我会尝试嵌入一个自己的AI数字人（AI Digital Twin）。传统的个人简介是冷冰冰的文字。AI 数字人可以作为我的“全天候代理人”，用声音、语气和神态向访客打招呼，代替我回答一些常见问题，进一步拉近访客与我的距离。
                </p>
                <p>
                将个人网站从一份“简历”/“自我介绍”，变成了一个与我相识的窗口。
                </p>
        <h3 className="text-lg font-medium text-foreground mt-6 mb-3 text-center">期待未来的“Moyu”能与各位道友相见！</h3>
      </ProjectSection>
    </ProjectDetailLayout>
  )
}
