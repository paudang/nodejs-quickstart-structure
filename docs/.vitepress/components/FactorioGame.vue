<template>
  <div class="factorio-wrapper">
    <div class="factory-header">
      <h1 class="factory-title">BACKEND FACTORY BUILDER</h1>
      <p class="status-panel">
        INCOMING TRAFFIC: <span class="traffic-text">1000 Req/s</span><br>
        <span class="sub-text">Build a pipeline capable of handling the load without crashing.</span>
      </p>
    </div>

    <!-- Inventory / Conveyor Belt -->
    <div class="inventory-panel">
      <h3>COMPONENT INVENTORY (Drag & Drop)</h3>
      <div class="inventory-grid">
        <div 
          v-for="item in inventory" 
          :key="item.id"
          class="inventory-item"
          :class="`type-${item.type}`"
          draggable="true"
          @dragstart="onDragStart($event, item)"
          v-show="!isItemPlaced(item.id)"
        >
          <span class="item-icon">{{ item.icon }}</span>
          <span class="item-name">{{ item.name }}</span>
          <span class="item-stat" v-if="item.displayStat">{{ item.displayStat }}</span>
        </div>
      </div>
    </div>

    <!-- The Assembly Line -->
    <div class="assembly-line">
      <!-- Row 1: Pipeline -->
      <div class="pipeline-row">
        <div class="traffic-source">
          <div class="source-icon">🌐</div>
          <div>CLIENT<br>1000/s</div>
        </div>

        <div class="arrow">➡️</div>

        <div 
          class="slot" 
          :class="{'has-item': slots.app, 'drop-zone': draggedType === 'app'}"
          @dragover.prevent
          @dragenter.prevent="draggedType === 'app' ? highlightSlot = 'app' : null"
          @dragleave="highlightSlot = null"
          @drop="onDrop($event, 'app')"
          @dblclick="removeSlot('app')"
        >
          <div class="slot-label">APP SERVER</div>
          <div v-if="slots.app" class="placed-item" :class="`type-app`">
            <span class="item-icon">{{ slots.app.icon }}</span>
            {{ slots.app.name }}
            <div class="remove-hint">(Double click to remove)</div>
          </div>
          <div v-else class="slot-placeholder">Drop App Server here</div>
        </div>

        <div class="arrow">➡️</div>

        <div 
          class="slot" 
          :class="{'has-item': slots.queue, 'drop-zone': draggedType === 'queue'}"
          @dragover.prevent
          @drop="onDrop($event, 'queue')"
          @dblclick="removeSlot('queue')"
        >
          <div class="slot-label">BROKER/QUEUE</div>
          <div v-if="slots.queue" class="placed-item" :class="`type-queue`">
            <span class="item-icon">{{ slots.queue.icon }}</span>
            {{ slots.queue.name }}
            <div class="remove-hint">(Double click to remove)</div>
          </div>
          <div v-else class="slot-placeholder">Drop Broker here</div>
        </div>

        <div class="arrow">➡️</div>

        <div 
          class="slot" 
          :class="{'has-item': slots.db, 'drop-zone': draggedType === 'db'}"
          @dragover.prevent
          @drop="onDrop($event, 'db')"
          @dblclick="removeSlot('db')"
        >
          <div class="slot-label">DATA VAULT</div>
          <div v-if="slots.db" class="placed-item" :class="`type-db`">
            <span class="item-icon">{{ slots.db.icon }}</span>
            {{ slots.db.name }}
            <div class="remove-hint">(Double click to remove)</div>
          </div>
          <div v-else class="slot-placeholder">Drop Database here</div>
        </div>

        <div class="arrow">➡️</div>

        <div 
          class="slot" 
          :class="{'has-item': slots.cache, 'drop-zone': draggedType === 'cache'}"
          @dragover.prevent
          @drop="onDrop($event, 'cache')"
          @dblclick="removeSlot('cache')"
        >
          <div class="slot-label">CACHE LAYER</div>
          <div v-if="slots.cache" class="placed-item" :class="`type-cache`">
            <span class="item-icon">{{ slots.cache.icon }}</span>
            {{ slots.cache.name }}
            <div class="remove-hint">(Double click to remove)</div>
          </div>
          <div v-else class="slot-placeholder">Drop Cache here</div>
        </div>
      </div>

      <!-- Row 2: Infra -->
      <div class="pipeline-row infra-row">
        <div 
          class="slot" 
          :class="{'has-item': slots.cicd, 'drop-zone': draggedType === 'cicd'}"
          @dragover.prevent
          @drop="onDrop($event, 'cicd')"
          @dblclick="removeSlot('cicd')"
        >
          <div class="slot-label">CI/CD PIPELINE</div>
          <div v-if="slots.cicd" class="placed-item" :class="`type-cicd`">
            <span class="item-icon">{{ slots.cicd.icon }}</span>
            {{ slots.cicd.name }}
            <div class="remove-hint">(Double click to remove)</div>
          </div>
          <div v-else class="slot-placeholder">Drop CI/CD here</div>
        </div>

        <div class="plus-icon">➕</div>

        <div 
          class="slot" 
          :class="{'has-item': slots.cloud, 'drop-zone': draggedType === 'cloud'}"
          @dragover.prevent
          @drop="onDrop($event, 'cloud')"
          @dblclick="removeSlot('cloud')"
        >
          <div class="slot-label">CLOUD INFRA</div>
          <div v-if="slots.cloud" class="placed-item" :class="`type-cloud`">
            <span class="item-icon">{{ slots.cloud.icon }}</span>
            {{ slots.cloud.name }}
            <div class="remove-hint">(Double click to remove)</div>
          </div>
          <div v-else class="slot-placeholder">Drop Cloud here</div>
        </div>
      </div>
    </div>

    <!-- Simulation Controls -->
    <div class="simulation-panel">
      <button 
        class="simulate-btn" 
        :disabled="!canSimulate || simStatus === 'running'"
        @click="runSimulation"
      >
        {{ simStatus === 'running' ? 'SIMULATING...' : 'RUN FACTORY' }}
      </button>

      <!-- Results -->
      <div v-if="simStatus === 'exploded'" class="result-box exploded">
        <h3>💥 FACTORY EXPLODED!</h3>
        <p>{{ failMessage }}</p>
        <button class="retry-btn" @click="resetSimulation">Fix Pipeline</button>
      </div>

      <div v-if="simStatus === 'success'" class="result-box success">
        <h3>✅ PIPELINE STABLE!</h3>
        <p>The architecture successfully buffered and processed 1000 Req/s!</p>
        
        <div class="command-box">
          <div class="command-header">
            <p>Extracting Blueprints...</p>
            <div class="pkg-tabs">
              <button :class="{ active: packageManager === 'npm' }" @click="packageManager = 'npm'">npx</button>
              <button :class="{ active: packageManager === 'yarn' }" @click="packageManager = 'yarn'">yarn</button>
              <button :class="{ active: packageManager === 'pnpm' }" @click="packageManager = 'pnpm'">pnpm</button>
            </div>
          </div>
          <code>{{ cliCommand }}</code>
          <button class="copy-btn" @click="copyCommand">{{ copied ? 'COPIED!' : 'COPY COMMAND' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import { useGenerator } from '../theme/composables/useGenerator.js';

const { form, cliCommand, showAdvanced, packageManager } = useGenerator();

const inventory = [
  { id: 'app_mvc', type: 'app', icon: '⛺', name: 'MVC Node', load: 300, displayStat: 'Cap: 300/s', config: { architecture: 'MVC', language: 'JavaScript' } },
  { id: 'app_clean', type: 'app', icon: '🏛️', name: 'Clean Node', load: 500, displayStat: 'Cap: 500/s', config: { architecture: 'Clean Architecture', language: 'TypeScript' } },
  
  { id: 'queue_rest', type: 'queue', icon: '🌐', name: 'REST API', multiplier: 1, displayStat: 'Sync x1', config: { communication: 'REST APIs', backgroundJobs: false } },
  { id: 'queue_kafka', type: 'queue', icon: '📬', name: 'Kafka Bus', multiplier: 3, displayStat: 'Async x3', config: { communication: 'Kafka', backgroundJobs: false } },
  { id: 'queue_bull', type: 'queue', icon: '🐂', name: 'BullMQ', multiplier: 2.5, displayStat: 'Queue x2.5', config: { communication: 'REST APIs', backgroundJobs: true } }, // caching handled by drop logic
  
  { id: 'db_pg', type: 'db', icon: '🐘', name: 'PostgreSQL', load: 500, displayStat: 'Cap: 500/s', config: { database: 'PostgreSQL', dbName: 'factory_db' } },
  { id: 'db_mongo', type: 'db', icon: '🍃', name: 'MongoDB', load: 600, displayStat: 'Cap: 600/s', config: { database: 'MongoDB', dbName: 'factory_db' } },

  { id: 'cache_redis', type: 'cache', icon: '🔴', name: 'Redis', multiplier: 1.5, displayStat: 'Boost x1.5', config: { caching: 'Redis' } },
  { id: 'cache_mem', type: 'cache', icon: '🧠', name: 'Memory', multiplier: 1.2, displayStat: 'Boost x1.2', config: { caching: 'Memory Cache' } },
  { id: 'cache_none', type: 'cache', icon: '❌', name: 'No Cache', multiplier: 1, displayStat: 'Boost x1', config: { caching: 'None' } },

  { id: 'ci_git', type: 'cicd', icon: '🐙', name: 'GitHub Action', displayStat: 'Security On', config: { ciProvider: 'GitHub Actions', includeSecurity: true } },
  { id: 'ci_gitlab', type: 'cicd', icon: '🦊', name: 'GitLab CI', displayStat: 'Security On', config: { ciProvider: 'GitLab CI', includeSecurity: true } },
  { id: 'ci_bitbucket', type: 'cicd', icon: '🪣', name: 'Bitbucket', displayStat: 'Security On', config: { ciProvider: 'Bitbucket Pipelines', includeSecurity: true } },
  { id: 'ci_circle', type: 'cicd', icon: '⭕', name: 'CircleCI', displayStat: 'Security On', config: { ciProvider: 'CircleCI', includeSecurity: true } },
  { id: 'ci_jenkins', type: 'cicd', icon: '🤵', name: 'Jenkins', displayStat: 'Security On', config: { ciProvider: 'Jenkins', includeSecurity: true } },
  { id: 'ci_none', type: 'cicd', icon: '❌', name: 'No CI/CD', displayStat: 'Manual Deploy', config: { ciProvider: 'None', includeSecurity: false } },

  { id: 'cloud_aws', type: 'cloud', icon: '☁️', name: 'AWS Prod', displayStat: 'Terraform', config: { terraform: 'Production', cloudProvider: 'AWS' } },
  { id: 'cloud_gcp', type: 'cloud', icon: '🌍', name: 'GCP Prod', displayStat: 'Terraform', config: { terraform: 'Production', cloudProvider: 'GCP' } },
  { id: 'cloud_none', type: 'cloud', icon: '❌', name: 'No Cloud', displayStat: 'No IaC', config: { terraform: 'None', cloudProvider: 'None' } },
];

const slots = reactive({
  app: null,
  queue: null,
  db: null,
  cache: null,
  cicd: null,
  cloud: null
});

const draggedType = ref(null);
const simStatus = ref('idle');
const failMessage = ref('');
const copied = ref(false);

const isItemPlaced = (id) => {
  return slots.app?.id === id || slots.queue?.id === id || slots.db?.id === id || 
         slots.cache?.id === id || slots.cicd?.id === id || slots.cloud?.id === id;
};

const onDragStart = (e, item) => {
  e.dataTransfer.setData('itemId', item.id);
  draggedType.value = item.type;
};

const onDrop = (e, slotName) => {
  draggedType.value = null;
  const itemId = e.dataTransfer.getData('itemId');
  const item = inventory.find(i => i.id === itemId);
  
  if (item && item.type === slotName) {
    slots[slotName] = item;
    simStatus.value = 'idle'; 
  }
};

const removeSlot = (slotName) => {
  slots[slotName] = null;
  simStatus.value = 'idle';
};

const canSimulate = computed(() => {
  return slots.app && slots.queue && slots.db && slots.cache && slots.cicd && slots.cloud;
});

const runSimulation = () => {
  if (!canSimulate.value) return;
  
  simStatus.value = 'running';
  
  // Enforce specific logic for game rules
  if (slots.queue.id === 'queue_bull' && slots.cache.id !== 'cache_redis') {
    simStatus.value = 'exploded';
    failMessage.value = `You selected BullMQ but did not provide Redis Cache! BullMQ REQUIRES Redis to store background jobs. The factory halted!`;
    return;
  }

  setTimeout(() => {
    const baseCapacity = (slots.app.load + slots.db.load) / 2;
    const totalCapacity = baseCapacity * slots.queue.multiplier * slots.cache.multiplier;
    
    if (totalCapacity < 1000) {
      simStatus.value = 'exploded';
      if (slots.queue.id === 'queue_rest') {
        failMessage.value = `Direct REST API causes synchronous blocking. Your pipeline only handles ${Math.floor(totalCapacity)} Req/s. It crashed under 1000 Req/s load!`;
      } else {
        failMessage.value = `Your architecture capacity (${Math.floor(totalCapacity)} Req/s) couldn't handle the load. Upgrade your nodes or caching layer!`;
      }
    } else {
      applyConfigToForm();
      simStatus.value = 'success';
    }
  }, 1000);
};

const applyConfigToForm = () => {
  form.projectName = 'factory-backend';
  form.auth = 'None';
  form.resilience = [];
  form.withELK = false;
  showAdvanced.value = true;

  const configs = [slots.app.config, slots.queue.config, slots.db.config, slots.cache.config, slots.cicd.config, slots.cloud.config];
  configs.forEach(conf => {
    Object.keys(conf).forEach(key => {
      form[key] = conf[key];
    });
  });
};

const resetSimulation = () => {
  simStatus.value = 'idle';
};

const copyCommand = () => {
  navigator.clipboard.writeText(cliCommand.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
};

// Resets
form.language = '';
form.architecture = '';
form.database = '';
form.caching = '';
form.communication = '';
form.ciProvider = '';
form.terraform = '';
form.cloudProvider = '';
</script>

<style scoped>
.factorio-wrapper {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  font-family: 'Inter', system-ui, sans-serif;
  max-width: 950px;
  margin: 0 auto;
}

.factory-header {
  text-align: center;
  margin-bottom: 2rem;
  border-bottom: 1px dashed var(--vp-c-divider);
  padding-bottom: 1.5rem;
}

.factory-title {
  color: var(--vp-c-brand-1);
  font-size: 2rem !important;
  text-transform: uppercase;
  margin: 0 0 1rem 0;
  letter-spacing: 1px;
  font-weight: 800;
}

.status-panel {
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border: 1px solid var(--vp-c-divider);
  display: inline-block;
  margin: 0;
  border-radius: 8px;
}

.traffic-text {
  color: var(--vp-c-danger-1);
  font-weight: bold;
  font-size: 1.2rem;
}

.sub-text {
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.inventory-panel {
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  margin-bottom: 2rem;
  border: 1px solid var(--vp-c-divider);
}

.inventory-panel h3 {
  margin: 0 0 1rem 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  text-transform: uppercase;
}

.inventory-grid {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.inventory-item {
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 8px;
  border: 2px solid var(--vp-c-divider);
  cursor: grab;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 120px;
  text-align: center;
  transition: transform 0.1s, box-shadow 0.2s;
}

.inventory-item:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.inventory-item:active {
  cursor: grabbing;
  transform: scale(0.95);
}

.item-icon {
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.item-name {
  font-size: 0.8rem;
  font-weight: bold;
  margin-bottom: 0.2rem;
  color: var(--vp-c-text-1);
}

.item-stat {
  font-size: 0.7rem;
  color: var(--vp-c-text-2);
}

.assembly-line {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  background: var(--vp-c-bg);
  padding: 2rem 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  margin-bottom: 2rem;
  overflow-x: auto;
}

.pipeline-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.infra-row {
  border-top: 1px dashed var(--vp-c-divider);
  padding-top: 2rem;
}

.traffic-source {
  text-align: center;
  color: var(--vp-c-danger-1);
  font-weight: bold;
  background: var(--vp-c-danger-soft);
  padding: 1rem;
  border: 2px solid var(--vp-c-danger-1);
  border-radius: 50%;
  width: 80px;
  height: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  font-size: 0.8rem;
}

.source-icon { font-size: 1.5rem; }

.arrow {
  font-size: 1.5rem;
  color: var(--vp-c-text-3);
}

.plus-icon {
  font-size: 2rem;
  color: var(--vp-c-text-3);
}

.slot {
  width: 130px;
  height: 130px;
  border: 2px dashed var(--vp-c-divider);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background: var(--vp-c-bg-alt);
  transition: all 0.2s;
}

.slot-label {
  position: absolute;
  top: -25px;
  font-size: 0.75rem;
  color: var(--vp-c-text-2);
  font-weight: bold;
  white-space: nowrap;
}

.slot-placeholder {
  color: var(--vp-c-text-3);
  font-size: 0.8rem;
  text-align: center;
  padding: 0 10px;
}

.slot.drop-zone {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-brand-soft);
}

.placed-item {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-weight: bold;
  text-align: center;
  padding: 5px;
  cursor: pointer;
  background: var(--vp-c-bg);
  border: 2px solid var(--vp-c-brand-1);
  color: var(--vp-c-brand-1);
  font-size: 0.8rem;
  line-height: 1.2;
}

.placed-item .item-icon {
  font-size: 1.5rem;
  margin-bottom: 0.2rem;
}

.remove-hint {
  font-size: 0.6rem;
  color: var(--vp-c-text-3);
  margin-top: 4px;
  font-weight: normal;
}

.simulation-panel {
  text-align: center;
}

.simulate-btn {
  background: var(--vp-c-brand-1);
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
  font-family: inherit;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.simulate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  background: var(--vp-c-brand-2);
}

.simulate-btn:disabled {
  background: var(--vp-c-bg-alt);
  color: var(--vp-c-text-3);
  box-shadow: none;
  cursor: not-allowed;
  border: 1px solid var(--vp-c-divider);
}

.result-box {
  margin-top: 2rem;
  padding: 2rem;
  border-radius: 12px;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes popIn {
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
}

.result-box h3 { margin: 0 0 1rem 0; font-size: 1.5rem; }

.result-box.exploded {
  background: var(--vp-c-danger-soft);
  border: 1px solid var(--vp-c-danger-1);
  color: var(--vp-c-danger-1);
}

.result-box.success {
  background: var(--vp-c-success-soft);
  border: 1px solid var(--vp-c-success-1);
  color: var(--vp-c-success-1);
}

.retry-btn {
  background: var(--vp-c-danger-1);
  color: #fff;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 8px;
  margin-top: 1rem;
}

.command-box {
  margin-top: 1.5rem;
  background: var(--vp-c-bg);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--vp-c-divider);
  text-align: left;
}

.command-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.command-header p {
  margin: 0;
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
  color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-alt);
  padding: 1rem;
  border-radius: 6px;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  word-break: break-all;
  margin: 0 0 1rem 0;
  font-size: 1rem;
}

.copy-btn {
  background: var(--vp-c-success-1);
  color: white;
  border: none;
  padding: 0.6rem 1.5rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 6px;
}
</style>
