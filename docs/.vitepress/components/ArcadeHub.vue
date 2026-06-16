<template>
  <div class="arcade-hub-wrapper">
    <div v-if="!selectedGame" class="hub-screen">
      <div class="hub-header">
        <h1>THE GENERATOR MULTIVERSE</h1>
        <p>Choose your preferred interactive experience to generate your backend infrastructure.</p>
      </div>

      <div class="game-cards">
        <div class="game-card" @click="selectGame('SkillTree')">
          <div class="card-icon">🌳</div>
          <div class="card-content">
            <h3>The Architecture Skill Tree</h3>
            <p>A comprehensive RPG-style tech tree. Unlock enterprise features systematically.</p>
            <div class="tags">
              <span class="tag">Educational</span>
              <span class="tag">Full Config</span>
            </div>
          </div>
        </div>

        <div class="game-card" @click="selectGame('Factorio')">
          <div class="card-icon">🏭</div>
          <div class="card-content">
            <h3>Backend Factorio</h3>
            <p>Drag and drop nodes to build a pipeline capable of handling 1000 Req/s load.</p>
            <div class="tags">
              <span class="tag">Puzzle</span>
              <span class="tag">Drag & Drop</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="game-view">
      <div class="nav-bar">
        <button class="back-btn" @click="selectedGame = null">
          <span class="arrow">←</span> BACK TO ARCADE HUB
        </button>
      </div>
      
      <div class="game-frame">
        <SkillTreeGame v-if="selectedGame === 'SkillTree'" />
        <FactorioGame v-if="selectedGame === 'Factorio'" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import SkillTreeGame from './SkillTreeGame.vue';
import FactorioGame from './FactorioGame.vue';

const selectedGame = ref(null);

const selectGame = (gameType) => {
  selectedGame.value = gameType;
};
</script>

<style scoped>
.arcade-hub-wrapper {
  margin-top: 2rem;
  font-family: 'Inter', system-ui, sans-serif;
}

.hub-screen {
  animation: fadeIn 0.4s ease-out;
}

.hub-header {
  text-align: center;
  margin-bottom: 3rem;
}

.hub-header h1 {
  font-size: 2.5rem !important;
  background: -webkit-linear-gradient(45deg, #0070f3, #00b4d8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
}

.hub-header p {
  color: var(--vp-c-text-2);
  font-size: 1.1rem;
}

.game-cards {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.game-card {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  padding: 1.5rem 2.5rem;
  display: flex;
  align-items: center;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  position: relative;
  overflow: hidden;
}

.game-card::before {
  content: '';
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0));
  opacity: 0;
  transition: opacity 0.3s;
}

.game-card:hover {
  transform: translateX(10px);
  border-color: #0070f3;
  box-shadow: 0 10px 25px rgba(0, 112, 243, 0.1);
}

.game-card:hover::before {
  opacity: 1;
}

.card-icon {
  font-size: 4rem;
  margin-right: 2rem;
  transition: transform 0.3s;
}

.game-card:hover .card-icon {
  transform: scale(1.1) rotate(5deg);
}

.card-content {
  flex: 1;
}

.game-card h3 {
  font-size: 1.4rem !important;
  margin-bottom: 0.5rem;
  color: var(--vp-c-text-1);
}

.game-card p {
  font-size: 0.95rem;
  color: var(--vp-c-text-2);
  margin-bottom: 1rem;
  line-height: 1.5;
}

.tags {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  margin-left: -0.7rem;
}

.tag {
  background: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-text);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.nav-bar {
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-start;
}

.back-btn {
  background: var(--vp-c-bg-alt);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s;
}

.back-btn:hover {
  background: var(--vp-c-brand);
  color: white;
  border-color: var(--vp-c-brand);
}

.game-frame {
  animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
</style>
