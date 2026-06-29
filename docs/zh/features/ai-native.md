# 面向 AI 开发 (AI-Native)

该生成器是为 AI 编程时代量身打造的。我们为 AI 助手 (如 **Cursor**、**ChatGPT** 和 **Claude**) 提供了专门优化的项目上下文 rules，帮助 AI 深度理解您的项目。

## .cursorrules (针对 Cursor 用户)

当您在 **Cursor** 编辑器中打开生成的项目时，它会自动读取根目录下的 `.cursorrules` 文件。

- **自动约束**：指导 AI 始终遵循选定的架构模式 (MVC 或清洁架构)。
- **质量校验**：指示 AI 在编写新代码时维护至少 80% 的测试覆盖率。
- **上下文感知**：预先配置了您选择的具体技术栈信息 (例如“这是一个使用 PostgreSQL 的 TypeScript MVC 项目”)。

## AI Skill 模板 (prompts/ 目录)

查看您项目根目录下的 `prompts/` 文件夹，其中包含了一系列经过大厂生产环境打磨的 Prompt 模板：

- **project-context.md**：发给任何大模型的 Master Prompt，能帮大模型瞬间看懂整个项目仓库的代码规范。
- **add-feature.md**：引导 AI 编写、新增业务特性的 Prompt，确保新增的代码逻辑与原有代码风格保持一致。
- **troubleshoot.md**：辅助 AI 快速定位该特定技术栈中的常见 Bug 并提供合理的修复建议。

## 开发小窍门：定制您的 AI Rules

您完全可以 (而且非常推荐！) 更新 `.cursorrules` 中 **Project Goal** 部分的占位符内容，来详细描述您的真实业务领域。这能极大提升 AI 为您提供的业务代码建议的贴合度与准确性。
