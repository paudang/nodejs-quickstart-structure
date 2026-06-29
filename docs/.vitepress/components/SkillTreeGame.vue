<template>
  <div class="skill-tree-wrapper">
    <div class="tree-header">
      <h1 class="title">{{ t.skillTree }}</h1>
      <p class="subtitle">{{ t.designBackend }}</p>
    </div>

    <div class="tree-container">
      <div 
        v-for="(tier, index) in tiers" 
        :key="tier.id" 
        class="tree-tier"
        :class="{ 'locked': currentIndex < index }"
      >
        <div class="tier-label">
          <span class="tier-num">{{ index + 1 }}</span>
          <span class="tier-title">{{ tier.title }}</span>
        </div>
        
        <div class="nodes-row">
          <div 
            v-for="(node, nIndex) in tier.nodes" 
            :key="nIndex"
            class="skill-node"
            :class="{ 
              'active': isNodeActive(node),
              'locked-node': currentIndex < index
            }"
            @click="selectNode(index, tier, node)"
          >
            <div class="node-icon">{{ node.icon }}</div>
            <div class="node-info">
              <h4>{{ node.name }}</h4>
              <p>{{ node.desc }}</p>
            </div>
            <!-- Checkmark -->
            <div class="check-mark" v-if="isNodeActive(node)">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
        </div>
        
        <div class="connector-line" v-if="index < tiers.length - 1" :class="{ 'active-line': currentIndex > index }"></div>
      </div>
    </div>

    <div class="forge-section" :class="{ 'ready': isComplete }">
      <button class="forge-btn" @click="forgeCode" :disabled="!isComplete">
        {{ t.generateConfig }}
      </button>

      <div class="command-box" v-if="showResult">
        <div class="command-header">
          <p>{{ t.runCommand }}</p>
          <div class="pkg-tabs">
            <button :class="{ active: packageManager === 'npm' }" @click="packageManager = 'npm'">npx</button>
            <button :class="{ active: packageManager === 'yarn' }" @click="packageManager = 'yarn'">yarn</button>
            <button :class="{ active: packageManager === 'pnpm' }" @click="packageManager = 'pnpm'">pnpm</button>
          </div>
        </div>
        <code>{{ cliCommand }}</code>
        <button class="copy-btn" @click="copyCommand">
          {{ copied ? t.copied : t.copyCommand }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import { useGenerator } from '../theme/composables/useGenerator.js';
import { useData } from 'vitepress';

const { form, cliCommand, showAdvanced, packageManager } = useGenerator();
const { lang } = useData();

const currentIndex = ref(0);
const showResult = ref(false);
const copied = ref(false);

const i18n = {
  'en-US': {
    skillTree: 'The Architecture Skill Tree',
    designBackend: 'Design your backend systematically from the ground up.',
    generateConfig: 'GENERATE CONFIGURATION',
    runCommand: 'Run this command in your terminal:',
    copied: 'COPIED!',
    copyCommand: 'COPY COMMAND',
    tierFoundation: 'Foundation',
    tierArchitecture: 'Architecture',
    tierViewEngine: 'View Engine',
    tierDataStorage: 'Data Storage',
    tierCaching: 'Caching Layer',
    tierApis: 'Network APIs',
    tierFeatures: 'Enterprise Features (Select Multiple)',
    tierCicd: 'CI/CD Pipeline',
    tierIac: 'Infrastructure (Terraform)',
    tierCloud: 'Cloud Provider'
  },
  'vi-VN': {
    skillTree: 'Cây Kỹ Năng Kiến Trúc',
    designBackend: 'Thiết kế hệ thống backend của bạn một cách hệ thống ngay từ đầu.',
    generateConfig: 'TẠO CẤU HÌNH DỰ ÁN',
    runCommand: 'Chạy lệnh này trong terminal của bạn:',
    copied: 'ĐÃ SAO CHÉP!',
    copyCommand: 'SAO CHÉP LỆNH',
    tierFoundation: 'Nền tảng',
    tierArchitecture: 'Kiến trúc',
    tierViewEngine: 'View Engine (Giao diện)',
    tierDataStorage: 'Lưu trữ Dữ liệu',
    tierCaching: 'Tầng Caching (Bộ đệm)',
    tierApis: 'Cổng giao tiếp mạng (APIs)',
    tierFeatures: 'Tính năng Doanh nghiệp (Chọn nhiều)',
    tierCicd: 'Quy trình CI/CD',
    tierIac: 'Cơ sở hạ tầng (Terraform)',
    tierCloud: 'Nhà cung cấp Đám mây'
  },
  'vi': {
    skillTree: 'Cây Kỹ Năng Kiến Trúc',
    designBackend: 'Thiết kế hệ thống backend của bạn một cách hệ thống ngay từ đầu.',
    generateConfig: 'TẠO CẤU HÌNH DỰ ÁN',
    runCommand: 'Chạy lệnh này trong terminal của bạn:',
    copied: 'ĐÃ SAO CHÉP!',
    copyCommand: 'SAO CHÉP LỆNH',
    tierFoundation: 'Nền tảng',
    tierArchitecture: 'Kiến trúc',
    tierViewEngine: 'View Engine (Giao diện)',
    tierDataStorage: 'Lưu trữ Dữ liệu',
    tierCaching: 'Tầng Caching (Bộ đệm)',
    tierApis: 'Cổng giao tiếp mạng (APIs)',
    tierFeatures: 'Tính năng Doanh nghiệp (Chọn nhiều)',
    tierCicd: 'Quy trình CI/CD',
    tierIac: 'Cơ sở hạ tầng (Terraform)',
    tierCloud: 'Nhà cung cấp Đám mây'
  },
  'zh-CN': {
    skillTree: '架构技能树',
    designBackend: '从头开始系统地设计您的后端。',
    generateConfig: '生成配置',
    runCommand: '在终端中运行以下命令：',
    copied: '已复制！',
    copyCommand: '复制命令',
    tierFoundation: '基础',
    tierArchitecture: '架构',
    tierViewEngine: '模板引擎',
    tierDataStorage: '数据存储',
    tierCaching: '缓存层',
    tierApis: '网络 API',
    tierFeatures: '企业功能 (可多选)',
    tierCicd: 'CI/CD 流程',
    tierIac: '基础设施 (Terraform)',
    tierCloud: '云服务商'
  },
  'zh': {
    skillTree: '架构技能树',
    designBackend: '从头开始系统地设计您的后端。',
    generateConfig: '生成配置',
    runCommand: '在终端中运行以下命令：',
    copied: '已复制！',
    copyCommand: '复制命令',
    tierFoundation: '基础',
    tierArchitecture: '架构',
    tierViewEngine: '模板引擎',
    tierDataStorage: '数据存储',
    tierCaching: '缓存层',
    tierApis: '网络 API',
    tierFeatures: '企业功能 (可多选)',
    tierCicd: 'CI/CD 流程',
    tierIac: '基础设施 (Terraform)',
    tierCloud: '云服务商'
  }
};

const t = computed(() => i18n[lang.value] || i18n['en-US']);

const tiers = computed(() => {
  const result = [
    {
      id: 'lang', title: t.value.tierFoundation, multiple: false,
      nodes: [
        { key: 'language', value: 'TypeScript', icon: '🟦', name: 'TypeScript', desc: 'Type Safety' },
        { key: 'language', value: 'JavaScript', icon: '🟨', name: 'JavaScript', desc: 'Dynamic Fast' }
      ]
    },
    {
      id: 'arch', title: t.value.tierArchitecture, multiple: false,
      nodes: [
        { key: 'architecture', value: 'Clean Architecture', icon: '🏛️', name: 'Clean Arch', desc: 'Decoupled' },
        { key: 'architecture', value: 'MVC', icon: '📦', name: 'MVC', desc: 'Rapid Dev' }
      ]
    }
  ];

  if (form.architecture === 'MVC') {
    result.push({
      id: 'view', title: t.value.tierViewEngine, multiple: false,
      nodes: [
        { key: 'viewEngine', value: 'Pug', icon: '🐶', name: 'Pug', desc: 'Indentation' },
        { key: 'viewEngine', value: 'EJS', icon: '📝', name: 'EJS', desc: 'HTML-like' },
        { key: 'viewEngine', value: 'None', icon: '❌', name: 'None', desc: 'API Only' }
      ]
    });
  }

  result.push({
    id: 'db', title: t.value.tierDataStorage, multiple: false,
    nodes: [
      { key: 'database', value: 'PostgreSQL', icon: '🐘', name: 'PostgreSQL', desc: 'Relational' },
      { key: 'database', value: 'MySQL', icon: '🐬', name: 'MySQL', desc: 'Classic SQL' },
      { key: 'database', value: 'MongoDB', icon: '🍃', name: 'MongoDB', desc: 'NoSQL' },
      { key: 'database', value: 'None', icon: '❌', name: 'None', desc: 'Stateless' }
    ]
  });

  result.push({
    id: 'cache', title: t.value.tierCaching, multiple: false,
    nodes: [
      { key: 'caching', value: 'Redis', icon: '🔴', name: 'Redis', desc: 'Distributed' },
      { key: 'caching', value: 'Memory Cache', icon: '🧠', name: 'Memory', desc: 'Local RAM' },
      { key: 'caching', value: 'None', icon: '❌', name: 'None', desc: 'No Cache' }
    ]
  });

  result.push({
    id: 'api', title: t.value.tierApis, multiple: false,
    nodes: [
      { key: 'communication', value: 'REST APIs', icon: '🌐', name: 'REST APIs', desc: 'Standard HTTP' },
      { key: 'communication', value: 'GraphQL', icon: '🔗', name: 'GraphQL', desc: 'Flexible Queries' },
      { key: 'communication', value: 'Kafka', icon: '📬', name: 'Kafka', desc: 'Event Stream' }
    ]
  });

  result.push({
    id: 'feat', title: t.value.tierFeatures, multiple: true,
    nodes: [
      { key: 'auth', value: 'OAuth2 - Google/GitHub - JWT', toggleValue: 'None', icon: '🔐', name: 'OAuth2', desc: 'Social Login' },
      { key: 'auth', value: 'JWT Authentication', toggleValue: 'None', icon: '🔑', name: 'JWT Only', desc: 'Standard Auth' },
      { key: 'resilience', value: ['Timeout', 'Retry', 'CircuitBreaker'], toggleValue: [], icon: '🛡️', name: 'Resilience', desc: 'Fault Tolerance' },
      { key: 'backgroundJobs', value: true, toggleValue: false, icon: '⚡', name: 'BullMQ', desc: 'Task Queue' },
      { key: 'withELK', value: true, toggleValue: false, icon: '📊', name: 'ELK Logs', desc: 'Central Logging' }
    ]
  });

  result.push({
    id: 'ci', title: t.value.tierCicd, multiple: false,
    nodes: [
      { key: 'ciProvider', value: 'GitHub Actions', icon: '🐙', name: 'GitHub', desc: 'Native CI' },
      { key: 'ciProvider', value: 'GitLab CI', icon: '🦊', name: 'GitLab', desc: 'GitLab CI' },
      { key: 'ciProvider', value: 'Jenkins', icon: '🕴️', name: 'Jenkins', desc: 'Self Hosted' },
      { key: 'ciProvider', value: 'CircleCI', icon: '⭕', name: 'CircleCI', desc: 'Fast Builds' },
      { key: 'ciProvider', value: 'Bitbucket Pipelines', icon: '🪣', name: 'Bitbucket', desc: 'Atlassian' },
      { key: 'ciProvider', value: 'None', icon: '❌', name: 'None', desc: 'Manual Deploy' }
    ]
  });

  result.push({
    id: 'iac', title: t.value.tierIac, multiple: false,
    nodes: [
      { key: 'terraform', value: 'Standard', icon: '🏗️', name: 'Standard', desc: 'Single VM' },
      { key: 'terraform', value: 'Production', icon: '🏭', name: 'Production', desc: 'HA + WAF + LB' },
      { key: 'terraform', value: 'None', icon: '❌', name: 'None', desc: 'No IaC' }
    ]
  });

  if (form.terraform !== 'None') {
    result.push({
      id: 'cloud', title: t.value.tierCloud, multiple: false,
      nodes: [
        { key: 'cloudProvider', value: 'AWS', icon: '☁️', name: 'AWS Cloud', desc: 'Amazon' },
        { key: 'cloudProvider', value: 'GCP', icon: '🌍', name: 'Google Cloud', desc: 'GCP' },
        { key: 'cloudProvider', value: 'Azure', icon: '🔷', name: 'Azure Cloud', desc: 'Microsoft' }
      ]
    });
  }

  return result;
});

const isComplete = computed(() => currentIndex.value >= tiers.value.length - 1);

const isNodeActive = (node) => {
  if (Array.isArray(node.value)) {
    return Array.isArray(form[node.key]) && form[node.key].length > 0;
  }
  return form[node.key] === node.value;
};

const selectNode = (index, tier, node) => {
  if (currentIndex.value < index) return;

  showResult.value = false;

  if (tier.multiple) {
    showAdvanced.value = true;
    
    if (isNodeActive(node)) {
      form[node.key] = node.toggleValue;
    } else {
      // Logic constraint: Can only pick ONE auth type
      if (node.key === 'auth') {
        form.auth = node.value;
      } else {
        form[node.key] = node.value;
      }
      
      // Auto enable Redis if BullMQ
      if (node.key === 'backgroundJobs') {
        form.caching = 'Redis';
      }
    }
    
    // Auto advance if they just clicked the tier
    if (currentIndex.value === index) currentIndex.value++;
  } else {
    form[node.key] = node.value;
    
    // Auto fill core dbName if database selected
    if (node.key === 'database' && node.value !== 'None') form.dbName = 'core_db';
    
    // Auto include security if CI/CD selected
    if (node.key === 'ciProvider') {
      form.includeSecurity = (node.value !== 'None');
    }

    // Auto advanced mode
    if (node.key === 'terraform' && node.value !== 'None') {
      showAdvanced.value = true;
    }

    // Advance to next tier
    if (currentIndex.value === index) {
      currentIndex.value++;
    }
  }
};

const forgeCode = () => {
  showResult.value = true;
};

const copyCommand = () => {
  navigator.clipboard.writeText(cliCommand.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
};

// Initialization
form.language = '';
form.architecture = '';
form.viewEngine = 'None';
form.database = '';
form.dbName = '';
form.caching = '';
form.communication = '';
form.auth = 'None';
form.resilience = [];
form.ciProvider = 'None';
form.includeSecurity = false;
form.terraform = 'None';
form.withELK = false;
form.backgroundJobs = false;
form.cloudProvider = 'None';
</script>

<style scoped>
.skill-tree-wrapper {
  max-width: 1000px;
  margin: 2rem auto;
  padding: 3rem 2rem;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  font-family: 'Inter', system-ui, sans-serif;
}

.tree-header {
  text-align: center;
  margin-bottom: 4rem;
}

.title {
  font-size: 2.5rem !important;
  margin: 0 0 0.5rem 0;
  font-weight: 800;
  color: var(--vp-c-text-1);
  letter-spacing: -1px;
}

.subtitle {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
}

.tree-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.tree-tier {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: opacity 0.3s;
}

.tree-tier.locked {
  opacity: 0.4;
  pointer-events: none;
  filter: grayscale(80%);
}

.tier-label {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 2rem;
  background: var(--vp-c-bg-alt);
  padding: 0.6rem 2rem;
  border-radius: 30px;
  border: 1px solid var(--vp-c-divider);
  z-index: 2;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.tier-num {
  background: var(--vp-c-brand-3);
  color: white;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-weight: bold;
  font-size: 0.9rem;
}

.tier-title {
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  text-transform: uppercase;
}

.nodes-row {
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  z-index: 2;
}

.skill-node {
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 1.5rem 1rem;
  width: 170px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: 0 2px 4px rgba(0,0,0,0.02);
}

.skill-node:hover:not(.locked-node) {
  border-color: var(--vp-c-brand-2);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.06);
}

.skill-node.active {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
  box-shadow: 0 0 0 1px var(--vp-c-brand-1);
}

.node-icon {
  font-size: 2.2rem;
  margin-bottom: 0.8rem;
  transition: transform 0.2s;
}

.skill-node.active .node-icon {
  transform: scale(1.1);
}

.node-info h4 {
  margin: 0 0 0.5rem 0 !important;
  color: var(--vp-c-text-1);
  font-size: 0.95rem !important;
  font-weight: 600;
}

.node-info p {
  margin: 0;
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  line-height: 1.4;
}

.check-mark {
  position: absolute;
  top: -12px;
  right: -12px;
  background: var(--vp-c-brand-1);
  color: white;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.check-mark svg {
  width: 16px;
  height: 16px;
}

@keyframes popIn {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

.connector-line {
  width: 3px;
  height: 40px;
  background: var(--vp-c-divider);
  margin: 1.5rem 0;
  transition: background 0.3s;
  border-radius: 2px;
}

.connector-line.active-line {
  background: var(--vp-c-brand-1);
}

.forge-section {
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.5;
  transition: opacity 0.5s;
}

.forge-section.ready {
  opacity: 1;
}

.forge-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 1.2rem 3rem;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.forge-btn .icon {
  width: 20px;
  height: 20px;
}

.forge-btn:hover:not(:disabled) {
  background: var(--vp-c-brand-2);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.2);
}

.forge-btn:disabled {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  box-shadow: none;
  cursor: not-allowed;
  border: 1px solid var(--vp-c-divider);
}

.command-box {
  margin-top: 2.5rem;
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  padding: 2rem;
  border-radius: 12px;
  width: 100%;
  animation: slideUp 0.4s ease-out;
  display: flex;
  flex-direction: column;
}

@keyframes slideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.command-header p {
  color: var(--vp-c-text-2);
  margin: 0;
  font-weight: 600;
}

.pkg-tabs {
  display: flex;
  gap: 0.5rem;
  background: var(--vp-c-bg-alt);
  padding: 0.2rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
}

.pkg-tabs button {
  background: transparent;
  border: none;
  color: var(--vp-c-text-2);
  padding: 0.3rem 0.8rem;
  font-size: 0.8rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.pkg-tabs button:hover {
  color: var(--vp-c-text-1);
}

.pkg-tabs button.active {
  background: var(--vp-c-brand-1);
  color: white;
}

.command-box code {
  display: block;
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-brand-1);
  padding: 1.5rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 1rem;
  margin-bottom: 1.5rem;
  border-left: 4px solid var(--vp-c-brand-1);
  word-break: break-all;
  width: 100%;
  text-align: left;
}

.copy-btn {
  background: var(--vp-c-brand-3);
  color: white;
  border: none;
  padding: 0.8rem 2.5rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s;
  align-self: center;
}

.copy-btn:hover {
  background: var(--vp-c-brand-2);
}
</style>
