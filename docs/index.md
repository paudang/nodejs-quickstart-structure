---
layout: home

hero:
  name: "Node.js Quickstart Generator"
  text: "Production-ready structure in seconds"
  tagline: "Scaffold MVC or Clean Architecture with Authentication, Kafka, GraphQL, and more."
  actions:
    - theme: brand
      text:  Quickstart
      link: "#configurator"
    - theme: alt
      text:  Documentation
      link: /guide/getting-started
  
features:
  - title: 7,920+ Combinations
    details: Language (TS/JS), Architecture (MVC/Clean), Auth, Communication (REST/GraphQL/Kafka), and CI/CD/Security.
  - title: AI-Native Ready
    details: Pre-configured .cursorrules and Agent Skill prompts to boost your productivity with AI tools.
  - title: Production Standards
    details: Built-in E2E tests, graceful shutdown, health checks, and security headers.
  - title: "Enterprise DevSecOps "
    details: Hardened with Snyk & SonarCloud, plus multi-stage Docker and Flyway migrations out of the box.
  - title: "Community Insights "
    details: "Real-time ecosystem impact: [Live Metrics] (Deep architectural research)."
  - title: "Next Gen: Web UI (Live Now) "
    details: Try our browser-based generator featuring real-time visualization and unified configuration below.
---

<script setup>
import { onMounted } from 'vue'

onMounted(async () => {
  // Find all feature cards
  const features = document.querySelectorAll('.VPFeature')
  const communityFeature = Array.from(features).find(f => f.querySelector('.title')?.textContent.includes('Community Insights'))
  
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
        details.innerHTML = `${downloads}+ Downloads on npm and ${clones}+ Git Clones (Deep architectural research).`
      }
    } catch (error) {
      console.error('Failed to fetch live stats:', error)
    }
  }
})
</script>

<div id="configurator" style="padding: 40px 0;">
  <h2 style="text-align: center; margin-bottom: 20px; border: none;"> Configure Your Project</h2>
  <GeneratorApp />
</div>

---
