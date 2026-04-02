<template>
  <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="modal-title">Ready for Launch 🚀</h3>
      <p style="margin-bottom: 12px; color: var(--vp-c-text-2);">Generate your new microservice by running this command in your terminal:</p>
      
      <div class="command-box">
        {{ cliCommand }}
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
