---
layout: home

hero:
  name: "Node.js Quickstart Generator"
  text: "Khởi tạo kiến trúc chuẩn Production trong tích tắc"
  tagline: "Tạo sẵn khung dự án MVC hoặc Clean Architecture với Auth, Kafka, GraphQL, và Terraform Đa đám mây."
  actions:
    - theme: brand
      text: Bắt đầu ngay
      link: "#configurator"
    - theme: alt
      text: Tài liệu hướng dẫn
      link: /vi/guide/getting-started
    - theme: sponsor
      text: ☕ Tài trợ
      link: https://ko-fi.com/paudang
  
features:
  - title: 2.69 Triệu Tổ Hợp
    details: Lựa chọn Ngôn ngữ (TS/JS), Kiến trúc (MVC/Clean), Auth, Giao tiếp (REST/GraphQL/Kafka), Background Jobs, CI/CD/Bảo mật, Cơ chế Resilience, Quan sát hệ thống (ELK), và Terraform.
  - title: Sẵn sàng cho AI-Native
    details: Cấu hình sẵn .cursorrules và các prompt Agent Skill giúp tăng tốc năng suất lập trình cùng các công cụ AI.
  - title: Tiêu chuẩn Production
    details: Tích hợp sẵn kiểm thử E2E, graceful shutdown, health checks, và các header bảo mật chuyên nghiệp.
  - title: "Enterprise DevSecOps"
    details: Bảo mật nghiêm ngặt với Snyk & SonarCloud, kèm theo Docker multi-stage và Flyway migration.
  - title: "Thống kê cộng đồng"
    details: "Tác động thực tế tới hệ sinh thái: [Live Metrics] (Nghiên cứu kiến trúc chuyên sâu)."
  - title: "🎮 Trải nghiệm Configurator Trực quan"
    details: "Thiết kế ngay kiến trúc hệ thống bên dưới, hoặc bước vào Vũ trụ Generator để giải trí với các tựa game Arcade!"
    link: /vi/play
---

<script setup>
import { onMounted } from 'vue'
import SmartConfigurator from '../.vitepress/components/SmartConfigurator.vue'

onMounted(async () => {
  // Find all feature cards
  const features = document.querySelectorAll('.VPFeature')
  const communityFeature = Array.from(features).find(f => f.querySelector('.title')?.textContent.includes('Thống kê cộng đồng'))
  
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
        details.innerHTML = `${downloads}+ Lượt tải trên npm và ${clones}+ Git Clones (Nghiên cứu kiến trúc chuyên sâu).`
      }
    } catch (error) {
      console.error('Failed to fetch live stats:', error)
    }
  }
})
</script>
<div id="configurator" style="padding: 40px 0;">
  <h2 style="text-align: center; margin-bottom: 20px; border: none;"> Cấu hình Dự án của bạn</h2>
  <SmartConfigurator />
  <GeneratorApp style="margin-top: 20px" />
</div>

<CollaboratorBanner />

---
