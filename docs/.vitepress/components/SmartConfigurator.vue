<script setup>
import { ref } from 'vue';
import { useGenerator } from '../theme/composables/useGenerator';
import { parsePrompt } from '../theme/composables/nlp';

const prompt = ref('');
const isThinking = ref(false);
const logs = ref([]);
const aiResponse = ref('');

const { form, showAdvanced } = useGenerator();

const processPrompt = async () => {
  if (!prompt.value.trim() || isThinking.value) return;
  
  isThinking.value = true;
  logs.value = [];
  aiResponse.value = '';
  
  // Use the imported NLP parser
  const result = parsePrompt(prompt.value);

  // Fake delay for UI "thinking" effect
  for (const log of result.logs) {
    logs.value.push(log);
    await new Promise(r => setTimeout(r, 200));
  }

  // Update the shared reactive form with the parsed config
  Object.assign(form, result.config);

  if (result.advancedNeeded) {
    showAdvanced.value = true;
  }

  aiResponse.value = result.responseHtml;
  isThinking.value = false;

  // Smooth scroll down to the configuration form to direct user attention
  setTimeout(() => {
    const generatorForm = document.querySelector('.generator-card');
    if (generatorForm) {
      generatorForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, 300);
};
</script>

<template>
  <div class="ai-configurator">
    <div class="input-container">
      <div class="input-wrapper">
        <span class="sparkle-icon">✨</span>
        <input 
          v-model="prompt" 
          @keydown.enter.prevent="processPrompt"
          placeholder="Smart Prompt: Generate a scalable project without Redis but with Postgres..."
          class="ai-input"
          :disabled="isThinking"
        />
        <button @click="processPrompt" :disabled="isThinking || !prompt.trim()" class="generate-btn">
          <span v-if="!isThinking">Generate</span>
          <span v-else>Processing...</span>
        </button>
      </div>
    </div>

    <!-- Thinking Logs -->
    <div v-if="isThinking" class="thinking-logs">
      <div v-for="(log, idx) in logs" :key="idx" class="log-line">
        {{ log }}
      </div>
      <span class="cursor-blink">...</span>
    </div>

    <!-- Response -->
    <div v-if="aiResponse && !isThinking" class="ai-response">
      <strong>Smart Engine:</strong> <span v-html="aiResponse"></span>
      <div class="ai-disclaimer">
        <span class="info-icon">ℹ️</span>
        AI parsing may not be 100% accurate. Please review and adjust the settings below.
      </div>
    </div>
  </div>
</template>

<style scoped>
.ai-configurator {
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  padding: 20px;
  margin: 0;
  font-family: var(--vp-font-family-base);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.input-container {
  display: flex;
  flex-direction: column;
}

.input-wrapper {
  display: flex;
  align-items: center;
  border: 2px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  padding: 4px 4px 4px 12px;
  transition: all 0.3s ease;
}

.input-wrapper:focus-within {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.sparkle-icon {
  font-size: 1.2rem;
  margin-right: 8px;
  animation: pulse 2s infinite;
}

.ai-input {
  flex: 1;
  border: none;
  background: transparent;
  padding: 10px;
  color: var(--vp-c-text-1);
  font-size: 1rem;
  outline: none;
  min-width: 0;
}

.ai-input:disabled {
  opacity: 0.7;
}

.generate-btn {
  background-color: #3b82f6; /* Primary blue */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s, transform 0.1s;
  white-space: nowrap;
}

.generate-btn:disabled {
  background-color: #93c5fd;
  cursor: not-allowed;
}

.generate-btn:hover:not(:disabled) {
  background-color: #2563eb;
}

.generate-btn:active:not(:disabled) {
  transform: scale(0.98);
}

.thinking-logs {
  margin-top: 16px;
  padding: 12px;
  background: #1e1e20;
  border-radius: 6px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  color: #a8b1ff;
  border-left: 3px solid #3b82f6;
}

.log-line {
  margin-bottom: 4px;
  animation: slideIn 0.3s ease-out;
}

.ai-response {
  margin-top: 20px;
  padding: 16px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  font-size: 0.95rem;
  line-height: 1.6;
  border-left: 4px solid var(--vp-c-brand-1);
}

.ai-disclaimer {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px dashed var(--vp-c-divider);
  font-size: 0.85rem;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 6px;
}

.info-icon {
  font-size: 1rem;
}

.ai-response ul {
  margin-top: 8px;
  padding-left: 20px;
}

.ai-response li {
  margin-bottom: 4px;
}

.cursor-blink {
  animation: blink 1s step-end infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

@keyframes blink {
  50% { opacity: 0; }
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(5px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
