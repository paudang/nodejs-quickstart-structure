---
layout: home

hero:
  name: "Node.js Quickstart Generator"
  text: "秒级生成生产级后端微服务架构"
  tagline: "极速脚手架生成 MVC 或整洁架构 (Clean Architecture)，内置 Auth、Kafka、GraphQL 及多云 Terraform。"
  actions:
    - theme: brand
      text: 立即开始
      link: "#configurator"
    - theme: alt
      text: 查阅指南
      link: /zh/guide/getting-started
    - theme: sponsor
      text: ☕ 赞助支持
      link: https://ko-fi.com/paudang
  
features:
  - title: 141万种架构组合
    details: 支持语言选择 (TS/JS)、架构模式 (MVC/Clean)、身份验证、通信机制 (REST/GraphQL/Kafka)、后台队列、CI/CD及安全配置、高可用容错机制、可观测性 (ELK) 与 Terraform。
  - title: 针对AI编程专门优化
    details: 预先配置 .cursorrules 及 Agent Skill 系统级提示词，显著提升AI协助编程的生产力。
  - title: 企业生产环境标准
    details: 开箱即用的 E2E 自动化测试、平滑停机 (Graceful shutdown)、健康检查及安全响应头。
  - title: "企业级 DevSecOps"
    details: 内置 Snyk & SonarCloud 强大的代码安全检查，并自带分阶段 Docker 与 Flyway 迁移配置。
  - title: "实时社区影响力"
    details: "开源生态实际反响：[Live Metrics] (深度架构研究)。"
  - title: "🎮 交互式生成配置台"
    details: "在下方一键设计并模拟项目目录架构，或者进入生成器宇宙畅玩街机游戏！"
    link: /zh/play
---

<script setup>
import { onMounted } from 'vue'
import SmartConfigurator from '../.vitepress/components/SmartConfigurator.vue'

onMounted(async () => {
  // Find all feature cards
  const features = document.querySelectorAll('.VPFeature')
  const communityFeature = Array.from(features).find(f => f.querySelector('.title')?.textContent.includes('实时社区影响力'))
  
  if (communityFeature) {
    const details = communityFeature.querySelector('.details')
    
    try {
      // Fetch Stats
      const [npmRes, gitRes] = await Promise.all([
        fetch('https://api.npmjs.org/downloads/point/2020-01-01:2030-01-01/nodejs-quickstart-structure'),
        fetch('https://raw.githubusercontent.com/paudang/nodejs-quickstart-structure/output/total_stats.json')
      ])
      
      const npmData = await npmRes.json()
      const gitData = await gitRes.json()
      
      const downloads = (npmData.downloads || 4856).toLocaleString()
      const clones = (gitData.total_clones || 7107).toLocaleString()

      if (details) {
        details.innerHTML = `npm 下载量突破 ${downloads}+，Git 克隆数达 ${clones}+ (深度架构研究)。`
      }
    } catch (error) {
      console.error('Failed to fetch live stats:', error)
    }
  }
})
</script>
<div id="configurator" style="padding: 40px 0;">
  <h2 style="text-align: center; margin-bottom: 20px; border: none;"> 在线配置您的专属项目</h2>
  <SmartConfigurator />
  <GeneratorApp style="margin-top: 20px" />
</div>

---
