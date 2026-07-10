import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Node.js Quickstart Generator",
  description: "The AI-Native Node.js scaffolding tool for production-ready microservices.",
  ignoreDeadLinks: true,
  base: process.env.NODE_ENV === 'production' && !process.env.NETLIFY ? '/nodejs-quickstart-structure/' : '/',
  sitemap: {
    hostname: 'https://nodejs-quickstart-generator.netlify.app'
  },
  head: [
    ['link', { rel: 'icon', href: '/favicon.png' }],
    ['meta', { property: 'og:image', content: 'https://nodejs-quickstart-generator.netlify.app/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:title', content: 'Node.js Quickstart Generator | nodejs-quickstart-structure' }],
    ['meta', { property: 'og:description', content: 'Scaffold production-ready Node.js microservices with Clean Architecture, Kafka, and GraphQL in seconds.' }],
    ['meta', { property: 'og:site_name', content: 'Node.js Quickstart Generator' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:url', content: 'https://nodejs-quickstart-generator.netlify.app/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Node.js Quickstart Generator | AI-Native Scaffolding' }],
    ['meta', { name: 'twitter:description', content: 'The fastest way to build production-ready Node.js apps with built-in best practices.' }],
    ['meta', { name: 'twitter:image', content: 'https://nodejs-quickstart-generator.netlify.app/og-image.png' }]
  ],
  locales: {
    root: {
      label: '🇬🇧 English',
      lang: 'en-US',
      title: "Node.js Quickstart Generator",
      description: "The AI-Native Node.js scaffolding tool for production-ready microservices.",
      themeConfig: {
        outline: {
          label: 'On this page'
        },
        returnToTopLabel: 'Return to top',
        nav: [
          { text: 'Home', link: '/' },
          { text: '🎮 Play Game', link: '/play' },
          { text: 'Articles', link: '/guide/articles' },
          { text: 'Roadmap', link: 'https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product' },
          { text: 'Changelog', link: 'https://github.com/paudang/nodejs-quickstart-structure/blob/main/CHANGELOG.md' },
          { text: '☕ Sponsor', link: 'https://ko-fi.com/paudang' }
        ],
        editLink: {
          pattern: 'https://github.com/paudang/nodejs-quickstart-structure/edit/main/docs/:path',
          text: 'Edit this page on GitHub'
        },
        sidebar: [
          {
            text: 'Getting Started',
            items: [
              { text: 'Introduction', link: '/guide/introduction' },
              { text: 'Quick Start', link: '/guide/getting-started' },
            ]
          },
          {
            text: 'Project Blueprints',
            items: [
              { text: 'Local Development', link: '/blueprints/local-dev' },
              { text: 'Docker & PM2 Deployment', link: '/blueprints/docker-pm2' },
              { text: 'Testing & API Guide', link: '/blueprints/testing-api' },
              { text: 'CI/CD Setup Guide', link: '/blueprints/ci-cd-setup' },
              { text: 'Authentication', link: '/blueprints/authentication' },
            ]
          },
          {
            text: 'Architecture',
            items: [
              { text: 'MVC Pattern', link: '/architecture/mvc' },
              { text: 'Clean Architecture', link: '/architecture/clean-architecture' },
            ]
          },
          {
            text: 'Features',
            items: [
              { text: 'Communication (REST/GraphQL/Kafka)', link: '/features/communication' },
              { text: 'Database & Migrations', link: '/features/database' },
              { text: 'Caching Strategy', link: '/features/caching' },
              { text: 'Application Resilience', link: '/features/resilience' },
              { text: 'Background Jobs (BullMQ)', link: '/features/background-jobs' },
              { text: 'API Gateway (Nginx/Kong)', link: '/features/api-gateway' },
              { text: 'AI-Native Development', link: '/features/ai-native' },
            ]
          },
          {
            text: 'Infrastructure',
            items: [
              { text: 'Terraform (AWS/GCP/Azure)', link: '/infrastructure/terraform' },
              { text: 'Observability (ELK Stack)', link: '/infrastructure/elk-stack' },
            ]
          },
          {
            text: 'Testing & DevOps',
            items: [
              { text: 'Testing (Unit & E2E)', link: '/guide/testing' },
              { text: 'Enterprise Security Setup', link: '/guide/security-hardening' },
              { text: 'ArchGuard AI Code Review', link: '/guide/archguard-ai' },
              { text: 'Deployment (Docker/PM2)', link: '/guide/deployment' },
              { text: 'Troubleshooting FAQ', link: '/guide/troubleshooting' },
            ]
          },
          {
            text: 'Articles & Deep Dives',
            items: [
              { text: 'All Articles', link: '/guide/articles' }
            ]
          }
        ],
        footer: {
          message: 'Released under the ISC License. <br> Architected by Technical Writers on <a href="https://systemweakness.com/" target="_blank" style="color: var(--vp-c-brand); font-weight: 500;">System Weakness</a>. <span class="footer-badges" style="margin-left: 8px;"> <a href="https://www.npmjs.com/package/nodejs-quickstart-structure" target="_blank"><img src="https://img.shields.io/npm/dt/nodejs-quickstart-structure?style=social" alt="NPM Downloads"></a> <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank"><img src="https://img.shields.io/github/stars/paudang/nodejs-quickstart-structure?style=social" alt="GitHub Stars"></a> </span>',
          copyright: 'Copyright © 2026-present Pau Dang'
        }
      }
    },
    vi: {
      label: '🇻🇳 Tiếng Việt',
      lang: 'vi-VN',
      title: "Node.js Quickstart Generator",
      description: "Công cụ tạo khung ứng dụng Node.js tích hợp AI sẵn sàng cho môi trường production.",
      themeConfig: {
        outline: {
          label: 'Mục lục trang này'
        },
        sidebarMenuLabel: 'Danh mục',
        returnToTopLabel: 'Quay lại đầu trang',
        nav: [
          { text: 'Trang chủ', link: '/vi/' },
          { text: '🎮 Chơi game', link: '/vi/play' },
          { text: 'Bài viết', link: '/vi/guide/articles' },
          { text: 'Lộ trình', link: 'https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product' },
          { text: 'Lịch sử thay đổi', link: 'https://github.com/paudang/nodejs-quickstart-structure/blob/main/CHANGELOG.md' },
          { text: '☕ Tài trợ', link: 'https://ko-fi.com/paudang' }
        ],
        editLink: {
          pattern: 'https://github.com/paudang/nodejs-quickstart-structure/edit/main/docs/:path',
          text: 'Chỉnh sửa trang này trên GitHub'
        },
        sidebar: [
          {
            text: 'Bắt đầu',
            items: [
              { text: 'Giới thiệu', link: '/vi/guide/introduction' },
              { text: 'Bắt đầu nhanh', link: '/vi/guide/getting-started' },
            ]
          },
          {
            text: 'Bản mẫu dự án (Blueprints)',
            items: [
              { text: 'Phát triển nội bộ (Local)', link: '/vi/blueprints/local-dev' },
              { text: 'Triển khai Docker & PM2', link: '/vi/blueprints/docker-pm2' },
              { text: 'Hướng dẫn Kiểm thử & API', link: '/vi/blueprints/testing-api' },
              { text: 'Hướng dẫn thiết lập CI/CD', link: '/vi/blueprints/ci-cd-setup' },
              { text: 'Xác thực (Authentication)', link: '/vi/blueprints/authentication' },
            ]
          },
          {
            text: 'Kiến trúc (Architecture)',
            items: [
              { text: 'Mô hình MVC', link: '/vi/architecture/mvc' },
              { text: 'Kiến trúc sạch (Clean Architecture)', link: '/vi/architecture/clean-architecture' },
            ]
          },
          {
            text: 'Tính năng chính',
            items: [
              { text: 'Giao tiếp (REST/GraphQL/Kafka)', link: '/vi/features/communication' },
              { text: 'Cơ sở dữ liệu & Migration', link: '/vi/features/database' },
              { text: 'Chiến lược Caching', link: '/vi/features/caching' },
              { text: 'Khả năng phục hồi (Resilience)', link: '/vi/features/resilience' },
              { text: 'Background Jobs (BullMQ)', link: '/vi/features/background-jobs' },
              { text: 'API Gateway (Nginx/Kong)', link: '/vi/features/api-gateway' },
              { text: 'Phát triển AI-Native', link: '/vi/features/ai-native' },
            ]
          },
          {
            text: 'Hạ tầng (Infrastructure)',
            items: [
              { text: 'Terraform (AWS/GCP/Azure)', link: '/vi/infrastructure/terraform' },
              { text: 'Quan sát hệ thống (ELK Stack)', link: '/vi/infrastructure/elk-stack' },
            ]
          },
          {
            text: 'Kiểm thử & DevOps',
            items: [
              { text: 'Kiểm thử (Unit & E2E)', link: '/vi/guide/testing' },
              { text: 'Bảo mật cấp Doanh nghiệp', link: '/vi/guide/security-hardening' },
              { text: 'ArchGuard AI Code Review', link: '/vi/guide/archguard-ai' },
              { text: 'Triển khai (Docker/PM2)', link: '/vi/guide/deployment' },
              { text: 'Giải quyết sự cố (FAQ)', link: '/vi/guide/troubleshooting' },
            ]
          },
          {
            text: 'Bài viết chuyên sâu',
            items: [
              { text: 'Tất cả bài viết', link: '/vi/guide/articles' }
            ]
          }
        ],
        footer: {
          message: 'Phát hành theo giấy phép ISC. <br> Kiến trúc bởi các Technical Writer trên <a href="https://systemweakness.com/" target="_blank" style="color: var(--vp-c-brand); font-weight: 500;">System Weakness</a>. <span class="footer-badges" style="margin-left: 8px;"> <a href="https://www.npmjs.com/package/nodejs-quickstart-structure" target="_blank"><img src="https://img.shields.io/npm/dt/nodejs-quickstart-structure?style=social" alt="NPM Downloads"></a> <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank"><img src="https://img.shields.io/github/stars/paudang/nodejs-quickstart-structure?style=social" alt="GitHub Stars"></a> </span>',
          copyright: 'Bản quyền © 2026-nay thuộc về Pau Dang'
        }
      }
    },
    zh: {
      label: '🇨🇳 简体中文',
      lang: 'zh-CN',
      title: "Node.js Quickstart Generator",
      description: "AI原生Node.js生产级微服务脚手架生成工具。",
      themeConfig: {
        outline: {
          label: '本页大纲'
        },
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        nav: [
          { text: '首页', link: '/zh/' },
          { text: '🎮 开始游戏', link: '/zh/play' },
          { text: '文章', link: '/zh/guide/articles' },
          { text: '路线图', link: 'https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product' },
          { text: '更新日志', link: 'https://github.com/paudang/nodejs-quickstart-structure/blob/main/CHANGELOG.md' },
          { text: '☕ 赞助', link: 'https://ko-fi.com/paudang' }
        ],
        editLink: {
          pattern: 'https://github.com/paudang/nodejs-quickstart-structure/edit/main/docs/:path',
          text: '在 GitHub 上编辑此页'
        },
        sidebar: [
          {
            text: '起步',
            items: [
              { text: '简介', link: '/zh/guide/introduction' },
              { text: '快速开始', link: '/zh/guide/getting-started' },
            ]
          },
          {
            text: '项目实战指南 (Blueprints)',
            items: [
              { text: '本地开发', link: '/zh/blueprints/local-dev' },
              { text: 'Docker & PM2 部署', link: '/zh/blueprints/docker-pm2' },
              { text: '测试 & API 指令', link: '/zh/blueprints/testing-api' },
              { text: 'CI/CD 配置指南', link: '/zh/blueprints/ci-cd-setup' },
              { text: '身份验证', link: '/zh/blueprints/authentication' },
            ]
          },
          {
            text: '架构设计',
            items: [
              { text: 'MVC 模式', link: '/zh/architecture/mvc' },
              { text: '整洁架构 (Clean Architecture)', link: '/zh/architecture/clean-architecture' },
            ]
          },
          {
            text: '核心特性',
            items: [
              { text: '通信机制 (REST/GraphQL/Kafka)', link: '/zh/features/communication' },
              { text: '数据库 & 迁移管理', link: '/zh/features/database' },
              { text: '缓存策略', link: '/zh/features/caching' },
              { text: '高可用容错机制 (Resilience)', link: '/zh/features/resilience' },
              { text: '后台任务队列 (BullMQ)', link: '/zh/features/background-jobs' },
              { text: 'API 网关 (Nginx/Kong)', link: '/zh/features/api-gateway' },
              { text: 'AI 原生开发', link: '/zh/features/ai-native' },
            ]
          },
          {
            text: '基础设施 (Infrastructure)',
            items: [
              { text: 'Terraform (AWS/GCP/Azure)', link: '/zh/infrastructure/terraform' },
              { text: '可观测性 (ELK 堆栈)', link: '/zh/infrastructure/elk-stack' },
            ]
          },
          {
            text: '测试 & DevOps',
            items: [
              { text: '测试 (单元 & E2E)', link: '/zh/guide/testing' },
              { text: '企业级安全加固', link: '/zh/guide/security-hardening' },
              { text: 'ArchGuard AI 代码审查', link: '/zh/guide/archguard-ai' },
              { text: '项目部署 (Docker/PM2)', link: '/zh/guide/deployment' },
              { text: '常见问题答疑 (FAQ)', link: '/zh/guide/troubleshooting' },
            ]
          },
          {
            text: '深度解析文章',
            items: [
              { text: '全部文章', link: '/zh/guide/articles' }
            ]
          }
        ],
        footer: {
          message: '遵循 ISC 开源协议发布。<br> 由 <a href="https://systemweakness.com/" target="_blank" style="color: var(--vp-c-brand); font-weight: 500;">System Weakness</a> 上的技术专家架构。 <span class="footer-badges" style="margin-left: 8px;"> <a href="https://www.npmjs.com/package/nodejs-quickstart-structure" target="_blank"><img src="https://img.shields.io/npm/dt/nodejs-quickstart-structure?style=social" alt="NPM Downloads"></a> <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank"><img src="https://img.shields.io/github/stars/paudang/nodejs-quickstart-structure?style=social" alt="GitHub Stars"></a> </span>',
          copyright: '版权所有 © 2026-至今 Pau Dang'
        }
      }
    }
  },
  themeConfig: {
    i18nRouting: false,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/paudang/nodejs-quickstart-structure' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/nodejs-quickstart-structure' }
    ]
  },
  vite: {
    build: {
      target: 'esnext'
    },
    optimizeDeps: {
      esbuildOptions: {
        target: 'esnext'
      }
    }
  }
})
