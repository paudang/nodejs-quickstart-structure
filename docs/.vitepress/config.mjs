import { defineConfig } from 'vitepress'

export default defineConfig({
  title: "Node.js Quickstart Structure",
  description: "Production-ready Node.js structure generator",
  base: '/nodejs-quickstart-structure/',
  head: [
    ['meta', { property: 'og:image', content: 'https://paudang.github.io/nodejs-quickstart-structure/og-image.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:title', content: 'Node.js Quickstart Structure' }],
    ['meta', { property: 'og:description', content: 'Scaffold production-ready Node.js microservices in seconds.' }],
    ['meta', { property: 'og:site_name', content: 'Node.js Quickstart Structure' }],
    ['meta', { property: 'og:locale', content: 'en_US' }],
    ['meta', { property: 'og:url', content: 'https://paudang.github.io/nodejs-quickstart-structure/' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Node.js Quickstart Structure' }],
    ['meta', { name: 'twitter:description', content: 'Scaffold production-ready Node.js microservices in seconds.' }],
    ['meta', { name: 'twitter:image', content: 'https://paudang.github.io/nodejs-quickstart-structure/og-image.png' }]
  ],
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Roadmap', link: 'https://trello.com/b/TPTo8ylF/nodejs-quickstart-structure-product' },
      { text: 'Changelog', link: 'https://github.com/paudang/nodejs-quickstart-structure/blob/main/CHANGELOG.md' }
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
          { text: 'AI-Native Development', link: '/features/ai-native' },
        ]
      },
      {
        text: 'Testing & DevOps',
        items: [
          { text: 'Testing (Unit & E2E)', link: '/guide/testing' },
          { text: 'Enterprise Security Setup', link: '/guide/security-hardening' },
          { text: 'Deployment (Docker/PM2)', link: '/guide/deployment' },
          { text: 'Troubleshooting FAQ', link: '/guide/troubleshooting' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/paudang/nodejs-quickstart-structure' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/nodejs-quickstart-structure' }
    ],

    footer: {
      message: 'Released under the ISC License.',
      copyright: 'Copyright © 2026-present'
    }
  }
})
