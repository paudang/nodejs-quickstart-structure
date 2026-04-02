<template>
  <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="modal-title">Ready for Launch 🚀</h3>
      <p style="margin-bottom: 12px; color: var(--vp-c-text-2);">Generate your new microservice by running this command in your terminal:</p>
      
      <div class="command-box">
        {{ cliCommand }}
      </div>
      
      <div class="star-prompt">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon-modal"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>Enjoying the tool? <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank" class="star-link-text">Star us on GitHub</a> to show support!</span>
      </div>
      
      <div class="modal-actions">
        <button class="btn-secondary" @click="closeModal">Close</button>
        <button class="btn-primary" style="width: auto; margin-top: 0;" @click="copyCommand">
          {{ copied ? 'Copied!' : 'Copy Command' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useGenerator } from '../composables/useGenerator';

const { showModal, cliCommand, copyCommand, copied } = useGenerator();

const closeModal = () => {
    showModal.value = false;
};
</script>
