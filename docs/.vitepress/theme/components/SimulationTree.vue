<template>
  <div class="generator-card simulation-area">
    <h3 class="generator-card-title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
      Structure Simulation
    </h3>
    <div class="tree-container" v-if="form.projectName">
      <div class="tree-item" style="--depth: 0">
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        {{ form.projectName }}
      </div>
      
      <!-- CI/CD Workflows -->
      <template v-if="form.ciProvider === 'GitHub Actions'">
        <div class="tree-item clickable" style="--depth: 1" @click="toggle('github')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.github }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          .github
        </div>
        <div v-show="expanded.github">
          <div class="tree-item clickable" style="--depth: 2" @click="toggle('workflows')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.workflows }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            workflows
          </div>
          <div v-show="expanded.workflows">
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            ci.yml
          </div>
          <div class="tree-item" style="--depth: 3" v-if="form.includeSecurity">
            <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            security.yml
          </div>
          </div>
        </div>
      </template>

      <template v-if="form.ciProvider === 'CircleCI'">
         <div class="tree-item clickable" style="--depth: 1" @click="toggle('circleci')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.circleci }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          .circleci
        </div>
        <div v-show="expanded.circleci">
          <div class="tree-item" style="--depth: 2">
            <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            config.yml
          </div>
        </div>
      </template>
      
      <!-- Root Files -->
      <div class="tree-item clickable" style="--depth: 1" @click="toggle('husky')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.husky }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        .husky
      </div>
      <div v-show="expanded.husky">
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          pre-commit
        </div>
      </div>

      <!-- Database Scripts -->
      <template v-if="form.database === 'MongoDB'">
        <div class="tree-item clickable" style="--depth: 1" @click="toggle('migrations')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.migrations }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          migrations
        </div>
        <div v-show="expanded.migrations">
          <div class="tree-item" style="--depth: 2">
            <svg class="tree-item-icon " viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            initial-setup.js
          </div>
        </div>
      </template>

      <template v-if="form.database === 'MySQL' || form.database === 'PostgreSQL'">
        <div class="tree-item clickable" style="--depth: 1" @click="toggle('flyway')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.flyway }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          flyway
          <span class="tree-comment"># Database migrations management</span>
        </div>
        <div v-show="expanded.flyway">
          <div class="tree-item clickable" style="--depth: 2" @click="toggle('flyway_sql')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.flyway_sql }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            sql
          </div>
          <div v-show="expanded.flyway_sql">
            <div class="tree-item" style="--depth: 3">
              <svg class="tree-item-icon icon-file-sql" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              V1__initial_setup.sql
            </div>
          </div>
        </div>
      </template>

      <!-- AI Prompts -->
      <div class="tree-item clickable" style="--depth: 1" @click="toggle('prompts')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.prompts }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        prompts
        <span class="tree-comment"># AI agent system prompts</span>
      </div>
      <div v-show="expanded.prompts">
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          project-context.md
        </div>
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          add-feature.md
        </div>
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          troubleshoot.md
        </div>
      </div>

      <!-- Scripts Module -->
      <div class="tree-item clickable" style="--depth: 1" @click="toggle('scripts')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.scripts }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        scripts
      </div>
      <div v-show="expanded.scripts">
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          run-e2e.js
          <span class="tree-comment"># E2E test orchestrator (starts server and runs tests)</span>
        </div>
      </div>

      <!-- Source Code Base -->
      <div class="tree-item clickable" style="--depth: 1" @click="toggle('src')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.src }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        src
      </div>
      <div v-show="expanded.src">

      <div class="tree-item clickable" style="--depth: 2" @click="toggle('errors')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.errors }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        errors
      </div>
      <div v-show="expanded.errors">
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        ApiError.{{ ext }}
      </div>
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        BadRequestError.{{ ext }}
      </div>
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        NotFoundError.{{ ext }}
      </div>
      </div>

      <!-- Config (only MVC outside Clean Infrastructure) -->
      <template v-if="form.architecture === 'MVC'">
        <div class="tree-item clickable" style="--depth: 2" @click="toggle('config')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.config }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          config
          <span class="tree-comment"># System-wide configurations (DB, Cache, Swagger)</span>
        </div>
        <div v-show="expanded.config">
        <div class="tree-item" style="--depth: 3">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          env.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 3" v-if="form.database !== 'None'">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          database.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 3" v-if="form.caching !== 'None'">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          {{ form.caching === 'Redis' ? 'redisClient.' + ext : 'memoryCache.' + ext }}
        </div>
        <div class="tree-item" style="--depth: 3" v-if="form.communication === 'REST APIs' || form.communication === 'Kafka'">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          swagger.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 3" v-if="form.communication === 'Kafka'">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          kafka.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 3" v-if="form.communication === 'REST APIs' || form.communication === 'Kafka'">
          <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          swagger.yml
        </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" @click="toggle('controllers')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.controllers }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          controllers
          <span class="tree-comment"># Request handling & input validation</span>
        </div>
        <div v-show="expanded.controllers">
        <div class="tree-item" style="--depth: 3">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          userController.{{ ext }}
        </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" @click="toggle('models')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.models }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          models
          <span class="tree-comment"># Data schemas & business entities</span>
        </div>
        <div v-show="expanded.models">
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            User.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" v-if="form.communication === 'Kafka'" @click="toggle('services')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.services }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          services
          <span class="tree-comment"># Business logic services (Kafka Producers, etc.)</span>
        </div>
        <div v-show="expanded.services" v-if="form.communication === 'Kafka'">
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            kafkaService.{{ ext }}
          </div>
        </div>

        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          routes
          <span class="tree-comment"># Express API routing endpoints</span>
        </div>

        <div class="tree-item clickable" style="--depth: 2" v-if="form.communication === 'GraphQL'" @click="toggle('graphql_mvc')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.graphql_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          graphql
          <span class="tree-comment"># GraphQL schemas and resolvers</span>
        </div>
        <div v-show="expanded.graphql_mvc" v-if="form.communication === 'GraphQL'">
          <div class="tree-item clickable" style="--depth: 3" @click="toggle('resolvers_mvc')">
             <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.resolvers_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
             <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
             resolvers
          </div>
          <div v-show="expanded.resolvers_mvc">
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              user.resolvers.{{ ext }}
            </div>
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              index.{{ ext }}
            </div>
          </div>
          <div class="tree-item clickable" style="--depth: 3" @click="toggle('typeDefs_mvc')">
             <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.typeDefs_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
             <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
             typeDefs
          </div>
          <div v-show="expanded.typeDefs_mvc">
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              user.types.{{ ext }}
            </div>
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              index.{{ ext }}
            </div>
          </div>
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            context.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            index.{{ ext }}
          </div>
        </div>

        <template v-if="form.communication === 'Kafka'">
          <div class="tree-item clickable" style="--depth: 2" @click="toggle('messaging')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.messaging }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            messaging
            <span class="tree-comment"># Event contracts & schemas</span>
          </div>
          <div v-show="expanded.messaging">
            <div class="tree-item" style="--depth: 3">
              <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
              schemas
            </div>
            <div class="tree-item" style="--depth: 3">
              <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
              consumers
            </div>
            <div class="tree-item" style="--depth: 3">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              baseConsumer.{{ ext }}
            </div>
          </div>
        </template>

        <div class="tree-item" style="--depth: 2" v-if="form.viewEngine !== 'None'">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          views
        </div>
      </template>

      <!-- Clean Architecture -->
      <template v-if="form.architecture === 'Clean Architecture'">
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          domain
          <span class="tree-comment"># Core business logic and enterprise rules</span>
        </div>

        <div class="tree-item clickable" style="--depth: 2" @click="toggle('infrastructure')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.infrastructure }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          infrastructure
        </div>
        <div v-show="expanded.infrastructure">
        
        <div class="tree-item clickable" style="--depth: 3" v-if="form.caching !== 'None'" @click="toggle('caching_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.caching_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          caching
        </div>
        <div v-show="expanded.caching_clean">
        <div class="tree-item" style="--depth: 4" v-if="form.caching !== 'None'">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          {{ form.caching === 'Redis' ? 'redisClient.' + ext : 'memoryCache.' + ext }}
        </div>
        </div>

        <div class="tree-item clickable" style="--depth: 3" @click="toggle('log_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.log_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          log
        </div>
        <div v-show="expanded.log_clean">
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            logger.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 3" v-if="form.language === 'JavaScript' || form.communication === 'Kafka'" @click="toggle('config_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.config_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          config
        </div>
        <div v-show="expanded.config_clean" v-if="form.language === 'JavaScript' || form.communication === 'Kafka'">
          <div class="tree-item" style="--depth: 4" v-if="form.language === 'JavaScript'">
            <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            env.js
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.communication === 'Kafka'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            kafka.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 3" @click="toggle('database_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.database_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          database
        </div>
        <div v-show="expanded.database_clean">
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            models
            <span class="tree-comment"># Data schemas & business entities</span>
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.database !== 'None'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            database.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 3" @click="toggle('repositories_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.repositories_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          repositories
          <span class="tree-comment"># Data access</span>
        </div>
        <div v-show="expanded.repositories_clean">
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            UserRepository.{{ ext }}
          </div>
        </div>

        <div class="tree-item" style="--depth: 3" v-if="form.communication === 'Kafka'">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          messaging
          <span class="tree-comment"># Event-driven messaging implementation</span>
        </div>

        <div class="tree-item clickable" style="--depth: 3" v-if="form.language === 'JavaScript'" @click="toggle('webserver_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.webserver_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          webserver
        </div>
        <div v-show="expanded.webserver_clean" v-if="form.language === 'JavaScript'">
          <div class="tree-item clickable" style="--depth: 4" @click="toggle('middleware_clean')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.middleware_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            middleware
          </div>
          <div v-show="expanded.middleware_clean">
            <div class="tree-item" style="--depth: 5">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               errorMiddleware.{{ ext }}
            </div>
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            server.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.communication === 'REST APIs' || form.communication === 'Kafka'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            swagger.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.communication === 'REST APIs' || form.communication === 'Kafka'">
            <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            swagger.yml
          </div>
        </div>
        </div>
        <div class="tree-item clickable" style="--depth: 2" @click="toggle('interfaces')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.interfaces }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          interfaces
        </div>
        <div v-show="expanded.interfaces">
        <div class="tree-item" style="--depth: 3">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          controllers
          <span class="tree-comment"># Request handling & input validation</span>
        </div>

        <div class="tree-item" style="--depth: 3">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          routes
          <span class="tree-comment"># Express API routing endpoints</span>
        </div>

        <div class="tree-item clickable" style="--depth: 3" v-if="form.communication === 'GraphQL'" @click="toggle('graphql_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.graphql_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          graphql
          <span class="tree-comment"># GraphQL schemas and resolvers</span>
        </div>
        <div v-show="expanded.graphql_clean" v-if="form.communication === 'GraphQL'">
          <div class="tree-item clickable" style="--depth: 4" @click="toggle('resolvers_clean')">
             <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.resolvers_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
             <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
             resolvers
          </div>
          <div v-show="expanded.resolvers_clean">
            <div class="tree-item" style="--depth: 5">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               user.resolvers.{{ ext }}
            </div>
            <div class="tree-item" style="--depth: 5">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               index.{{ ext }}
            </div>
          </div>
          <div class="tree-item clickable" style="--depth: 4" @click="toggle('typeDefs_clean')">
             <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.typeDefs_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
             <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
             typeDefs
          </div>
          <div v-show="expanded.typeDefs_clean">
            <div class="tree-item" style="--depth: 5">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               user.types.{{ ext }}
            </div>
            <div class="tree-item" style="--depth: 5">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               index.{{ ext }}
            </div>
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            context.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            index.{{ ext }}
          </div>
        </div>
        
        <!-- Messaging Shared Area -->
        <template v-if="form.communication === 'Kafka'">
          <div class="tree-item clickable" style="--depth: 3" @click="toggle('messaging_clean')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.messaging_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            messaging
            <span class="tree-comment"># Event contracts & schemas</span>
          </div>
          <div v-show="expanded.messaging_clean">
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
              schemas
            </div>
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
              consumers
            </div>
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              baseConsumer.{{ ext }}
            </div>
          </div>
        </template>

        </div>
        <div class="tree-item" style="--depth: 2">
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          usecases
          <span class="tree-comment"># Application business rules & use cases</span>
        </div>
        
        <div class="tree-item clickable" style="--depth: 2" v-if="form.language === 'TypeScript'" @click="toggle('config_root_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.config_root_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          config
          <span class="tree-comment"># System-wide configurations</span>
        </div>
        <div v-show="expanded.config_root_clean" v-if="form.language === 'TypeScript'">
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon icon-file-ts" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            env.ts
          </div>
          <div class="tree-item" style="--depth: 3" v-if="form.communication === 'REST APIs' || form.communication === 'Kafka'">
            <svg class="tree-item-icon icon-file-ts" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            swagger.ts
          </div>
          <div class="tree-item" style="--depth: 3" v-if="form.communication === 'REST APIs' || form.communication === 'Kafka'">
            <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            swagger.yml
          </div>
        </div>
      </template>

      <!-- Common Utils -->
      <div class="tree-item clickable" style="--depth: 2" @click="toggle('utils')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.utils }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        utils
      </div>

      <div v-show="expanded.utils">
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        errorMessages.{{ ext }}
      </div>
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        httpCodes.{{ ext }}
      </div>
      <div class="tree-item" style="--depth: 3" v-if="form.communication === 'Kafka'">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        kafkaEvents.{{ ext }}
      </div>
      <div class="tree-item" style="--depth: 3" v-if="form.architecture === 'MVC'">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        logger.{{ ext }}
      </div>
      <div class="tree-item" style="--depth: 3" v-if="form.language === 'TypeScript'">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        errorMiddleware.ts
        <span class="tree-comment"># Global error handling (Architect standard)</span>
      </div>
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        gracefulShutdown.{{ ext }}
        <span class="tree-comment"># Safe process termination on SIGTERM/SIGINT</span>
      </div>
      </div>

      <div class="tree-item" style="--depth: 2">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        index.{{ ext }}
        <span class="tree-comment"># Application entry file</span>
      </div>
      
      </div>

      <!-- Tests Module -->
      <div class="tree-item clickable" style="--depth: 1" @click="toggle('tests')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.tests }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        tests
      </div>
      <div v-show="expanded.tests">
      <div class="tree-item clickable" style="--depth: 2" @click="toggle('e2e')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.e2e }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        e2e
        <span class="tree-comment"># High-level integration tests (Testing full flows)</span>
      </div>
      <div v-show="expanded.e2e">
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        e2e.users.test.{{ ext }}
      </div>
      </div>
      <div class="tree-item" style="--depth: 2">
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        unit
        <span class="tree-comment"># Testing isolated business logic</span>
      </div>
      <div class="tree-item" style="--depth: 2" v-if="form.language === 'TypeScript'">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        tsconfig.json
      </div>
      </div>
      <div class="tree-item" style="--depth: 1" v-if="form.language === 'TypeScript'">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        tsconfig.json
      </div>
      
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        package.json
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .cursorrules
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .gitattributes
        <span class="tree-comment"># Git repository configurations</span>
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .lintstagedrc
        <span class="tree-comment"># Pre-commit formatting and linting rules</span>
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        README.md
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .env.example
        <span class="tree-comment"># Environment variables</span>
      </div>
      
      <div class="tree-item" style="--depth: 1" v-if="form.database === 'MongoDB'">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        migrate-mongo-config.js
      </div>
      
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        eslint.config.mjs
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        jest.config.js
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        jest.e2e.config.js
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        ecosystem.config.js
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        Dockerfile
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .dockerignore
      </div>

      <div class="tree-item" style="--depth: 1" v-if="needsInfra">
        <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        docker-compose.yml
        <span class="tree-comment"># Local multi-container infrastructure</span>
      </div>

      <!-- CI/CD Workflows -->
      <template v-if="form.ciProvider === 'GitLab CI'">
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          .gitlab-ci.yml
        </div>
      </template>
      
      <template v-if="form.ciProvider === 'Bitbucket Pipelines'">
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          bitbucket-pipelines.yml
        </div>
      </template>

      <template v-if="form.ciProvider === 'Jenkins'">
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          Jenkinsfile
        </div>
      </template>

      <template v-if="form.includeSecurity && form.ciProvider !== 'None'">
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          SECURITY.md
        </div>
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          sonar-project.properties
          <span class="tree-comment"># Code quality and security analysis config</span>
        </div>
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          .snyk
          <span class="tree-comment"># Security policy for vulnerability scanning</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useGenerator } from '../composables/useGenerator';
import { reactive } from 'vue';

const { form, ext, needsInfra } = useGenerator();

const expanded = reactive({
  github: false,
  husky: false,
  migrations: false,
  flyway: false,
  prompts: false,
  scripts: false,
  src: true,
  infrastructure: true,
  interfaces: true,
  tests: false,
  e2e: false,
  config: true,
  controllers: true,
  models: true,
  workflows: false,
  utils: false,
  errors: false,
  config_clean: true,
  webserver_clean: true,
  middleware_clean: true,
  log_clean: true,
  config_root_clean: true,
  database_clean: true,
  messaging: true,
  messaging_clean: true,
  usecases: true,
  flyway_sql: true,
  graphql_mvc: true,
  resolvers_mvc: true,
  typeDefs_mvc: true,
  graphql_clean: true,
  resolvers_clean: true,
  typeDefs_clean: true,
  services: true,
  unit_tests: true,
  services_test: true,
  repositories_clean: true,
  circleci: true
});

const toggle = (folder) => {
  expanded[folder] = !expanded[folder];
};
</script>

<style scoped>
.tree-comment {
  margin-left: 12px;
  color: var(--vp-c-text-3);
  font-size: 0.85em;
  font-style: italic;
  font-family: var(--vp-font-family-mono);
  opacity: 0.8;
  white-space: nowrap;
}
.clickable {
  cursor: pointer;
  user-select: none;
}
.clickable:hover {
  color: var(--vp-c-brand-1);
}
.tree-toggle-icon {
  width: 14px;
  height: 14px;
  margin-right: 6px;
  display: inline-block;
  transition: transform 0.2s ease;
  flex-shrink: 0;
  vertical-align: text-bottom;
}
.tree-toggle-icon.expanded {
  transform: rotate(90deg);
}

/* Create a ghost space mimicking exactly the chevron's width for non-clickable items (except depth 0) so their icons align vertically */
.tree-item:not(.clickable):not([style*="--depth: 0"])::before {
  content: "";
  display: inline-block;
  width: 14px;
  height: 14px;
  margin-right: 6px;
  flex-shrink: 0;
}
</style>
