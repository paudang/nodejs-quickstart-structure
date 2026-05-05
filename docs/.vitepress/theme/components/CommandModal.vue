<template>
  <div class="modal-overlay" v-if="showModal" @click.self="closeModal">
    <div class="modal-content">
      <h3 class="modal-title">Ready for Launch</h3>
      <p style="margin-bottom: 12px; color: var(--vp-c-text-2);">Generate your new microservice by running this command in your terminal:</p>
      
      <div class="command-box">
        {{ cliCommand }}
      </div>

      <div v-if="form.auth === 'OAuth2 - Google/GitHub - JWT'" class="social-auth-tip" style="background: rgba(var(--vp-c-warning-1-rgb), 0.15); padding: 14px; border-radius: 10px; border: 1px solid var(--vp-c-warning-1); margin-top: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
        <div style="display: flex; align-items: start; gap: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--vp-c-warning-1)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="flex-shrink: 0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          <div style="font-size: 0.85rem; line-height: 1.4; color: var(--vp-c-warning-2);">
            <strong>OAuth2 Configuration Required:</strong><br/>
            After generating, remember to set your <code>GOOGLE_CLIENT_ID</code> and <code>GITHUB_CLIENT_ID</code> in the <code>.env</code> file.
          </div>
        </div>
      </div>
      
      <div class="star-prompt" style="background: rgba(var(--vp-c-brand-1-rgb), 0.1); padding: 12px; border-radius: 8px; border: 1px solid var(--vp-c-brand-1); margin-top: 16px;">
        <div style="display: flex; align-items: start; gap: 10px;">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="color: var(--vp-c-brand-1); flex-shrink: 0;"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
          <div style="font-size: 0.9rem; line-height: 1.4;">
            <strong style="color: var(--vp-c-brand-1);">Support the Mission!</strong><br/>
            If this tool saved you 4+ hours of work, please 
            <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank" style="text-decoration: underline; font-weight: bold;">Give us a Star</a> 
            to help us grow!
          </div>
        </div>
      </div>
      
      <div class="modal-actions" style="margin-top: 16px;">
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

const { showModal, cliCommand, copyCommand, copied, form } = useGenerator();

const closeModal = () => {
    showModal.value = false;
};
</script>
