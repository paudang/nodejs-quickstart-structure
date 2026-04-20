<template>
  <div class="generator-card config-sidebar">
    <h3 class="generator-card-title" style="display: flex; justify-content: space-between; align-items: center;">
      <div style="display: flex; align-items: center; gap: 8px;">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path><circle cx="12" cy="12" r="3"></circle></svg>
        Configuration
      </div>
      <a href="https://github.com/paudang/nodejs-quickstart-structure" target="_blank" class="github-star-link" title="Star on GitHub">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="star-icon"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        <span>Star</span>
      </a>
    </h3>
    
    <div class="form-grid">
      <div class="form-group">
        <label class="form-label">Project Name</label>
        <input type="text" class="form-control" :class="{ 'error': !!errors.projectName }" v-model="form.projectName" @input="validateName" />
        <span class="error-text" v-if="errors.projectName">{{ errors.projectName }}</span>
      </div>
      
      <div class="form-group">
        <label class="form-label">Language</label>
        <select class="form-control" v-model="form.language">
          <option>TypeScript</option>
          <option>JavaScript</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Architecture</label>
        <select class="form-control" v-model="form.architecture">
          <option>Clean Architecture</option>
          <option>MVC</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">View Engine</label>
        <select class="form-control" v-model="form.viewEngine" :disabled="form.architecture !== 'MVC'">
          <option>None</option>
          <option>EJS</option>
          <option>Pug</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Database</label>
        <select class="form-control" v-model="form.database">
          <option>None</option>
          <option>MySQL</option>
          <option>PostgreSQL</option>
          <option>MongoDB</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Database Name</label>
        <input type="text" class="form-control" :class="{ 'error': !!errors.dbName }" v-model="form.dbName" :disabled="form.database === 'None'" @input="validateName" />
        <span class="error-text" v-if="errors.dbName">{{ errors.dbName }}</span>
      </div>

      <div class="form-group">
        <label class="form-label">Communication</label>
        <select class="form-control" v-model="form.communication">
          <option>REST APIs</option>
          <option>GraphQL</option>
          <option>Kafka</option>
        </select>
      </div>

      <div class="form-group">
        <label class="form-label">Caching</label>
        <select class="form-control" v-model="form.caching">
          <option>None</option>
          <option>Redis</option>
          <option>Memory Cache</option>
        </select>
      </div>

      <div class="form-group" style="grid-column: 1 / -1;">
        <label class="form-label">CI/CD Provider</label>
        <select class="form-control" v-model="form.ciProvider">
          <option>None</option>
          <option>GitHub Actions</option>
          <option>Jenkins</option>
          <option>GitLab CI</option>
          <option>CircleCI</option>
          <option>Bitbucket Pipelines</option>
        </select>
      </div>
    </div>

    <div class="checkbox-group">
      <input type="checkbox" id="security-check" v-model="form.includeSecurity" :disabled="form.ciProvider === 'None'" />
      <label for="security-check">Enable Enterprise Security Hardening (Snyk + SonarCloud)</label>
    </div>
    
    <div style="margin-top: 1rem; border-top: 1px solid var(--vp-c-divider); padding-top: 1rem;">
      <div 
        @click="showAdvanced = !showAdvanced" 
        style="display: flex; align-items: center; gap: 8px; cursor: pointer; font-weight: 500; font-size: 0.9em; color: var(--vp-c-brand);"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" :style="{ transform: showAdvanced ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }"><polyline points="9 18 15 12 9 6"></polyline></svg>
        Advanced Options
      </div>
      <div v-show="showAdvanced" style="margin-top: 1rem;" class="form-grid">
        <div class="form-group" style="grid-column: 1 / -1;">
          <label class="form-label">Authentication</label>
          <select class="form-control" v-model="form.auth">
            <option value="None">None</option>
            <option value="JWT Authentication (Ready)">JWT Authentication (Ready)</option>
            <option value="OAuth2 - Google/GitHub (Coming Soon)" disabled>OAuth2 - Google/GitHub (Coming Soon)</option>
          </select>
        </div>
      </div>
    </div>

    <button class="btn-primary" @click="generateCommand" :disabled="hasErrors">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2l.5-.5a5.4 5.4 0 0 0 1-4.09V11c0-.55-.45-1-1-1h-3.91c-1.57.04-3.07.64-4.09 1.5l-.5.5Z"></path><path d="m12 12 7-7"></path><path d="m14 8 4-4"></path><path d="m16 10 4-4"></path></svg>
      Confirm and Generate
    </button>
  </div>
</template>

<script setup>
import { useGenerator } from '../composables/useGenerator';

const { form, errors, hasErrors, showAdvanced, validateName, generateCommand } = useGenerator();
</script>
