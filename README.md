## 项目简介

这是一个基于 **Next.js App Router** 的个人网站 / 作品集项目，结合 **Vercel v0** 生成的 UI 与 **Cursor** 的智能编码能力，实现了「自然语言驱动」的前端开发流程。  
网站包含首页、关于我、项目列表、项目详情等页面，支持深色模式、响应式布局和现代化动效，是一个可持续扩展的个人数字名片。

## 技术栈

- **框架**: Next.js 16（App Router）
- **语言**: TypeScript, React 19
- **样式**: Tailwind CSS 4
- **组件库**: Radix UI + Shadcn 风格组件
- **图标**: lucide-react
- **构建与部署**: Vercel
- **其它**: react-hook-form, date-fns, recharts 等

## 快速开始

### 安装依赖

```bash
npm install
# 或
pnpm install
# 或
yarn
```

### 本地开发

```bash
npm run dev
```

然后在浏览器打开：

- 主页：`http://localhost:3000`
- 项目列表页：`http://localhost:3000/projects`
- 个人网站项目详情页示例：`http://localhost:3000/projects/personal_website`

### 构建与生产环境

```bash
# 构建
npm run build

# 本地预览生产构建
npm run start
```

部署推荐使用 Vercel，直接连接 GitHub 仓库后可自动构建发布。

## 主要目录结构

```bash
app/
  globals.css                # 全局样式（含 Tailwind 配置入口）
  layout.tsx                 # 根布局
  page.tsx                   # 首页

  projects/
    page.tsx                 # 项目列表页
    personal_website/
      page.tsx               # 「个人网页实践」项目详情页示例

components/
  about-section.tsx          # 关于我板块
  projects-section.tsx       # 首页 / 项目页的项目列表模块
  project-detail-layout.tsx  # 项目详情通用布局（标题 / 日期 / 左侧目录等）
  footer.tsx                 # 页脚组件

public/
  images/
    projects/
      personal_website/      # 个人网站项目相关图片（封面、截图等）
      个人网站流程图.drawio.png
      个人网站流程图.jpg
```

## 页面说明与内容编辑

### 关于我页面（`about-section.tsx`）

- 包含头像、简介、自我介绍文字、「My Soul, My Life」图片墙等内容。
- 若要替换为自己的信息：
  - 修改组件中的文案字段（标题、副标题、段落等）。
  - 将头像 / 个人照片放入 `public/images/...`，并更新组件中对应的 `src` 路径。
  - 右侧图片墙支持多张图片布局，可以按需要增删图片项。

### 项目列表页（`app/projects/page.tsx` + `components/projects-section.tsx`）

- `projects-section.tsx` 中维护了项目卡片的数据数组，例如：

```ts
{
  title: "墨境设计系统",
  description: "……",
  tags: ["React", "TypeScript", "Storybook"],
  year: "2025",
  featured: true,
  image: "/images/projects/personal_website/cover2.jpg",
  link: "/projects/personal_website",
}
```

- **新增或替换项目卡片**：
  - 在 `projects-section.tsx` 的项目列表数组中添加 / 修改对象。
  - `image` 字段填写封面图路径（建议放在 `public/images/projects/<你的项目>/` 下）。
  - `link` 字段指向项目详情页路由，如 `/projects/<project_slug>`。

### 项目详情页（`app/projects/personal_website/page.tsx`）

- 使用 `ProjectDetailLayout` + 多个 `ProjectSection` 组件构成。
- 顶部 `sections` 数组用于控制左侧目录（章节锚点）：

```ts
const sections = [
  { id: "overview", title: "项目概述" },
  { id: "background", title: "项目背景" },
  { id: "architecture", title: "项目架构" },
  { id: "features", title: "实现步骤" },
  { id: "implementation", title: "项目成果" },
  { id: "results", title: "优化展望" },
]
```

- 内容结构示例：

```tsx
<ProjectDetailLayout
  title="个人网页实践"
  date="2026.2.15"
  tags={["Vercel", "Vibe Coding"]}
  githubUrl="https://github.com/yourusername/project"
  sections={sections}
>
  <ProjectSection id="overview" title="项目概述">
    <p>……你的项目概述……</p>
  </ProjectSection>

  <ProjectSection id="architecture" title="项目架构">
    <p>……文字介绍……</p>
    <ProjectImage
      src="/images/projects/个人网站流程图.drawio.png"
      alt="项目架构图"
      caption="图：项目架构"
    />
  </ProjectSection>

  {/* 更多章节 */}
</ProjectDetailLayout>
```

- **插入图片**：  
  - 将图片放入 `public/images/projects/<project_name>/`。  
  - 通过 `<ProjectImage src="/images/projects/<project_name>/xxx.png" ... />` 引用即可，无需 `import`。

- **插入代码块**（在项目分享中展示一段代码）：

```tsx
<pre className="mt-4 rounded-lg bg-neutral-900 text-neutral-50 text-xs md:text-sm p-4 overflow-x-auto">
  <code>{`const greeting = 'Hello, world!'

export function Home() {
  return <div>{greeting}</div>
}`}</code>
</pre>
```

注意：代码放在 `` ` `` 包裹的字符串中，遇到 `${}` 需要转义为 `\${}`。

## 添加自己的项目步骤建议

1. **准备图片**
   - 建议尺寸：例如 1600×900（16:9）或 1200×900（4:3），JPG/PNG 均可。
   - 放到：`public/images/projects/<你的项目名>/` 下，并按模块命名：
     - `cover.jpg`：项目封面
     - `architecture.png`：架构图
     - `feature-1.png` / `feature-2.png` 等

2. **创建项目详情页**
   - 在 `app/projects/` 下新建一个文件夹，如 `my_project`。
   - 在其中创建 `page.tsx`，复制 `personal_website/page.tsx` 的结构，替换为你自己的文字、图片路径和章节。

3. **挂接到项目列表卡片**
   - 在 `components/projects-section.tsx` 的项目数组中新增一项：
     - `image` 指向你的封面路径。
     - `link` 对应你刚创建的路由，如 `/projects/my_project`。
   - 保存后，刷新浏览器，点击卡片就会跳转到对应详情页。

## 内容维护与「内容填写模板」

为了让后续替换内容更轻松，本项目配有 `内容填写模板.md`，其中列出了各个板块需要准备的字段（标题、副标题、段落、标签、图片路径命名规范等）。  
推荐流程：

1. 先在 `内容填写模板.md` 中按「填空题」形式写好文本与图片规划。  
2. 再将对应内容复制到 `about-section.tsx`、`projects-section.tsx` 和各个项目详情页中。  
3. 图片按模板约定的命名与路径放入 `public/images/`，即可在页面中显示。

## 后续优化方向

- 引入 MDX 或 CMS（如 Notion / Sanity）来管理项目文档，减少手写 JSX 的成本。
- 根据 MDX 标题自动生成左侧目录，实现完全内容驱动的项目详情模板。
- 增加多语言版本（中文 / 英文切换）。

