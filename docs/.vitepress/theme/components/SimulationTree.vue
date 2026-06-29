<template>
  <div class="generator-card simulation-area">
    <h3 class="generator-card-title">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path></svg>
      {{ t.structureSimulation }}
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
          <span class="tree-comment">{{ t.dbMigration }}</span>
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

      <!-- Terraform Infrastructure -->
      <template v-if="form.terraform !== 'None'">
        <div class="tree-item clickable" style="--depth: 1" @click="toggle('terraform')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.terraform }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          terraform
          <span class="tree-comment">{{ t.tfIaC }}</span>
        </div>
        <div v-show="expanded.terraform">
          <div class="tree-item clickable" style="--depth: 2" @click="toggle('tf_modules')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.tf_modules }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            modules
            <span class="tree-comment">{{ t.tfModules }}</span>
          </div>
          <div v-show="expanded.tf_modules">
             <div class="tree-item" style="--depth: 3" v-for="m in ['vpc', 'security', 'compute', 'database', 'cache'].filter(x => (x !== 'cache' || form.caching !== 'None') && (x !== 'database' || form.database !== 'None'))" :key="m">
                <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
                {{ m }}
             </div>
          </div>
          <div class="tree-item" style="--depth: 2">
            <svg class="tree-item-icon" style="color: #623ce4;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            main.tf
            <span class="tree-comment">{{ t.tfMain }}</span>
          </div>
          <div class="tree-item" style="--depth: 2">
            <svg class="tree-item-icon" style="color: #623ce4;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            variables.tf
            <span class="tree-comment">{{ t.tfVars }}</span>
          </div>
          <div class="tree-item" style="--depth: 2">
            <svg class="tree-item-icon" style="color: #623ce4;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            outputs.tf
            <span class="tree-comment">{{ t.tfOutputs }}</span>
          </div>
        </div>
      </template>

      <!-- AI Prompts -->
      <div class="tree-item clickable" style="--depth: 1" @click="toggle('prompts')">
        <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.prompts }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        prompts
        <span class="tree-comment">{{ t.promptsComment }}</span>
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
          <span class="tree-comment">{{ t.runE2eComment }}</span>
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
          <span class="tree-comment">{{ t.configMvcComment }}</span>
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
          <span class="tree-comment">{{ t.controllersComment }}</span>
        </div>
        <div v-show="expanded.controllers">
        <div class="tree-item" style="--depth: 3">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          userController.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 3" v-if="form.auth !== 'None'">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          authController.{{ ext }}
        </div>
        </div>
        
        <div class="tree-item clickable" style="--depth: 2" v-if="form.auth !== 'None'" @click="toggle('middleware_mvc')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.middleware_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          middleware
        </div>
        <div v-show="expanded.middleware_mvc" v-if="form.auth !== 'None'">
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            authMiddleware.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" @click="toggle('models')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.models }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          models
          <span class="tree-comment">{{ t.modelsComment }}</span>
        </div>
        <div v-show="expanded.models">
          <div class="tree-item" style="--depth: 3">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            User.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" v-if="form.communication === 'Kafka' || form.auth !== 'None'" @click="toggle('services')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.services }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          services
          <span class="tree-comment">{{ t.servicesComment }}</span>
        </div>
        <div v-show="expanded.services" v-if="form.communication === 'Kafka' || form.auth !== 'None'">
          <div class="tree-item" style="--depth: 3" v-if="form.communication === 'Kafka'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            kafkaService.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 3" v-if="form.auth !== 'None'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            jwtService.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 3" v-if="form.auth === 'OAuth2 - Google/GitHub - JWT'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            socialAuthService.{{ ext }}
          </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" @click="toggle('routes_mvc')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.routes_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          routes
          <span class="tree-comment">{{ t.routesComment }}</span>
        </div>
        <div v-show="expanded.routes_mvc">
          <div class="tree-item" style="--depth: 3">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              api.{{ ext }}
           </div>
           <div class="tree-item" style="--depth: 3">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              healthRoute.{{ ext }}
           </div>
          
           <div class="tree-item" style="--depth: 3" v-if="form.auth !== 'None'">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              authRoutes.{{ ext }}
           </div>
        </div>

        <div class="tree-item clickable" style="--depth: 2" v-if="form.communication === 'GraphQL'" @click="toggle('graphql_mvc')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.graphql_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          graphql
          <span class="tree-comment">{{ t.graphqlComment }}</span>
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
            <span class="tree-comment">{{ t.messagingSchemasComment }}</span>
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
          <span class="tree-comment">{{ t.domainComment }}</span>
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

        <div class="tree-item clickable" style="--depth: 3" v-if="form.backgroundJobs" @click="toggle('queues_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.queues_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          queues
        </div>
        <div v-show="expanded.queues_clean" v-if="form.backgroundJobs">
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            emailQueue.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            emailWorker.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            queueBoard.{{ ext }}
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

          <div class="tree-item clickable" style="--depth: 3" v-if="form.auth !== 'None'" @click="toggle('auth_infra')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.auth_infra }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            auth
          </div>
          <div v-show="expanded.auth_infra" v-if="form.auth !== 'None'">
            <div class="tree-item" style="--depth: 4">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              jwtService.{{ ext }}
            </div>
            <div class="tree-item" style="--depth: 4" v-if="form.auth === 'OAuth2 - Google/GitHub - JWT'">
              <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
              socialAuthService.{{ ext }}
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
            <span class="tree-comment">{{ t.modelsComment }}</span>
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
          <span class="tree-comment">{{ t.repositoriesComment }}</span>
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
          <span class="tree-comment">{{ t.messagingImplComment }}</span>
        </div>

        <div class="tree-item clickable" style="--depth: 3" v-if="form.language === 'JavaScript' || form.auth !== 'None'" @click="toggle('webserver_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.webserver_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          webserver
          <span class="tree-comment" v-if="form.language === 'TypeScript'">{{ t.webserverComment }}</span>
        </div>
        <div v-show="expanded.webserver_clean" v-if="form.language === 'JavaScript' || form.auth !== 'None'">
          <div class="tree-item clickable" style="--depth: 4" v-if="form.language === 'JavaScript' || form.auth !== 'None'" @click="toggle('middleware_clean')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.middleware_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            middleware
          </div>
          <div v-show="expanded.middleware_clean" v-if="form.language === 'JavaScript' || form.auth !== 'None'">
            <div class="tree-item" style="--depth: 5" v-if="form.language === 'JavaScript'">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               errorMiddleware.{{ ext }}
            </div>
            <div class="tree-item" style="--depth: 5" v-if="form.auth !== 'None'">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               authMiddleware.{{ ext }}
            </div>
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.language === 'JavaScript'">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            server.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.language === 'JavaScript' && (form.communication === 'REST APIs' || form.communication === 'Kafka')">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            swagger.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4" v-if="form.language === 'JavaScript' && (form.communication === 'REST APIs' || form.communication === 'Kafka')">
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
          <div class="tree-item clickable" style="--depth: 3" @click="toggle('controllers_clean')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.controllers_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            controllers
            <span class="tree-comment">{{ t.controllersComment }}</span>
          </div>
          <div v-show="expanded.controllers_clean">
            <div class="tree-item clickable" style="--depth: 4" v-if="form.auth !== 'None'" @click="toggle('auth_controllers')">
              <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.auth_controllers }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
              <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
              auth
            </div>
            <div v-show="expanded.auth_controllers" v-if="form.auth !== 'None'">
              <div class="tree-item" style="--depth: 5">
                <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                authController.{{ ext }}
              </div>
            </div>
            <div class="tree-item" style="--depth: 4">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               userController.{{ ext }}
            </div>
          </div>

          <div class="tree-item clickable" style="--depth: 3" @click="toggle('routes_clean')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.routes_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            routes
            <span class="tree-comment">{{ t.routesComment }}</span>
          </div>
          <div v-show="expanded.routes_clean">
             <div class="tree-item" style="--depth: 4">
                <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                healthRoute.{{ ext }}
             </div>
             <div class="tree-item" style="--depth: 4">
                <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                userRoutes.{{ ext }}
             </div>
             <div class="tree-item" style="--depth: 4" v-if="form.auth !== 'None'">
                <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
                authRoutes.{{ ext }}
             </div>
          </div>

        <div class="tree-item clickable" style="--depth: 3" v-if="form.communication === 'GraphQL'" @click="toggle('graphql_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.graphql_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          graphql
          <span class="tree-comment">{{ t.graphqlComment }}</span>
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
            <span class="tree-comment">{{ t.messagingSchemasComment }}</span>
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
        <div class="tree-item clickable" style="--depth: 2" @click="toggle('usecases')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.usecases }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          usecases
          <span class="tree-comment">{{ t.usecasesComment }}</span>
        </div>
        <div v-show="expanded.usecases">
          <div class="tree-item clickable" style="--depth: 3" v-if="form.auth === 'OAuth2 - Google/GitHub - JWT'" @click="toggle('usecases_auth')">
            <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.usecases_auth }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
            auth
          </div>
          <div v-show="expanded.usecases_auth" v-if="form.auth === 'OAuth2 - Google/GitHub - JWT'">
             <div class="tree-item" style="--depth: 4">
               <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
               socialLoginUseCase.{{ ext }}
             </div>
          </div>
          <div class="tree-item" style="--depth: 3">
             <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
             createUser.{{ ext }}
          </div>
        </div>
        
        <div class="tree-item clickable" style="--depth: 2" v-if="form.language === 'TypeScript'" @click="toggle('config_root_clean')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.config_root_clean }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          config
          <span class="tree-comment">{{ t.configCleanComment }}</span>
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
        <div class="tree-item clickable" style="--depth: 3" v-if="form.backgroundJobs && form.architecture === 'MVC'" @click="toggle('queues_mvc')">
          <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.queues_mvc }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
          <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
          queues
        </div>
        <div v-show="expanded.queues_mvc" v-if="form.backgroundJobs && form.architecture === 'MVC'">
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            emailQueue.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            emailWorker.{{ ext }}
          </div>
          <div class="tree-item" style="--depth: 4">
            <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
            queueBoard.{{ ext }}
          </div>
        </div>
      <div class="tree-item clickable" style="--depth: 3" v-if="form.resilience && form.resilience.length > 0" @click="toggle('resilience')">
      <svg class="tree-toggle-icon" :class="{ 'expanded': expanded.resilience }" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      <svg class="tree-item-icon icon-folder" viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-8l-2-2H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"/></svg>
        resilience
      </div>
      <div v-show="expanded.resilience" v-if="form.resilience && form.resilience.length > 0">
        <div class="tree-item" style="--depth: 4" v-if="form.resilience.includes('Timeout')">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          timeout.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 4" v-if="form.resilience.includes('Retry')">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          retry.{{ ext }}
        </div>
        <div class="tree-item" style="--depth: 4" v-if="form.resilience.includes('CircuitBreaker')">
          <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          circuitBreaker.{{ ext }}
        </div>
      </div>
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
        <span class="tree-comment">{{ t.errorMiddlewareComment }}</span>
      </div>
      <div class="tree-item" style="--depth: 3">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        gracefulShutdown.{{ ext }}
        <span class="tree-comment">{{ t.gracefulShutdownComment }}</span>
      </div>
      </div>

      <div class="tree-item" style="--depth: 2">
        <svg class="tree-item-icon" :class="form.language === 'TypeScript' ? 'icon-file-ts' : 'icon-file-js'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        index.{{ ext }}
        <span class="tree-comment">{{ t.appEntryComment }}</span>
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
        <span class="tree-comment">{{ t.e2eComment }}</span>
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
        <span class="tree-comment">{{ t.unitComment }}</span>
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
      <div class="tree-item" style="--depth: 1" v-if="form.language === 'TypeScript'">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        tsconfig.eslint.json
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
        <span class="tree-comment">{{ t.gitAttributesComment }}</span>
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .lintstagedrc
        <span class="tree-comment">{{ t.lintStagedComment }}</span>
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-json" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .prettierrc
        <span class="tree-comment">{{ t.prettierComment }}</span>
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        README.md
      </div>
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        .env.example
        <span class="tree-comment">{{ t.envExampleComment }}</span>
      </div>
      
      <div class="tree-item" style="--depth: 1" v-if="form.database === 'MongoDB'">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        migrate-mongo-config.js
      </div>
      
      <div class="tree-item" style="--depth: 1">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        eslint.config.mjs
        <span class="tree-comment">{{ t.eslintComment }}</span>
      </div>
      <div class="tree-item" style="--depth: 1" v-if="form.language === 'JavaScript'">
        <svg class="tree-item-icon icon-file-js" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        babel.config.js
        <span class="tree-comment">{{ t.babelComment }}</span>
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
        <span class="tree-comment">{{ t.dockerComposeComment }}</span>
      </div>
      
      <div class="tree-item" style="--depth: 1" v-if="form.withELK">
        <svg class="tree-item-icon icon-file-yml" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
        docker-compose.elk.yml
        <span class="tree-comment">{{ t.elkComment }}</span>
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
          <span class="tree-comment">{{ t.sonarComment }}</span>
        </div>
        <div class="tree-item" style="--depth: 1">
          <svg class="tree-item-icon icon-file-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline></svg>
          .snyk
          <span class="tree-comment">{{ t.snykComment }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { useGenerator } from '../composables/useGenerator';
import { reactive, computed } from 'vue';
import { useData } from 'vitepress';

const { lang } = useData();
const { form, ext, needsInfra } = useGenerator();

const i18n = {
  'en-US': {
    structureSimulation: 'Structure Simulation',
    dbMigration: '# Database migrations management',
    tfIaC: '# Infrastructure as Code (AWS Modular)',
    tfModules: '# Reusable infrastructure components',
    tfMain: '# Root orchestration and module linking',
    tfVars: '# Infrastructure input parameters',
    tfOutputs: '# Deployment results (URLs, IPs, Endpoints)',
    promptsComment: '# AI agent system prompts',
    runE2eComment: '# E2E test orchestrator (starts server and runs tests)',
    configMvcComment: '# System-wide configurations (DB, Cache, Swagger)',
    controllersComment: '# Request handling & input validation',
    modelsComment: '# Data schemas & business entities',
    servicesComment: '# Business logic and authentication services',
    routesComment: '# Express API routing endpoints',
    graphqlComment: '# GraphQL schemas and resolvers',
    messagingSchemasComment: '# Event contracts & schemas',
    domainComment: '# Core business logic and enterprise rules',
    repositoriesComment: '# Data access',
    messagingImplComment: '# Event-driven messaging implementation',
    webserverComment: '# Infrastructure for auth middleware',
    usecasesComment: '# Application business rules & use cases',
    configCleanComment: '# System-wide configurations',
    errorMiddlewareComment: '# Global error handling (Architect standard)',
    gracefulShutdownComment: '# Safe process termination on SIGTERM/SIGINT',
    appEntryComment: '# Application entry file',
    e2eComment: '# High-level integration tests (Testing full flows)',
    unitComment: '# Testing isolated business logic',
    gitAttributesComment: '# Git repository configurations',
    lintStagedComment: '# Pre-commit formatting and linting rules',
    prettierComment: '# Code style preferences',
    envExampleComment: '# Environment variables',
    eslintComment: '# Enforces code quality and style.',
    babelComment: '# Transpiles modern JavaScript for Node',
    dockerComposeComment: '# Local multi-container infrastructure',
    elkComment: '# ELK Stack configuration',
    sonarComment: '# Code quality and security analysis config',
    snykComment: '# Security policy for vulnerability scanning'
  },
  'vi-VN': {
    structureSimulation: 'Mô phỏng cấu trúc thư mục',
    dbMigration: '# Quản lý migration cơ sở dữ liệu',
    tfIaC: '# Cơ sở hạ tầng dưới dạng mã (AWS Modular)',
    tfModules: '# Các thành phần hạ tầng có thể tái sử dụng',
    tfMain: '# Điều phối chính và liên kết các module',
    tfVars: '# Các tham số đầu vào của hạ tầng',
    tfOutputs: '# Kết quả triển khai (URL, IP, Điểm cuối)',
    promptsComment: '# Các prompt hệ thống cho AI agent',
    runE2eComment: '# Trình điều phối test E2E (khởi động server và chạy test)',
    configMvcComment: '# Cấu hình toàn hệ thống (DB, Cache, Swagger)',
    controllersComment: '# Xử lý yêu cầu & xác thực dữ liệu đầu vào',
    modelsComment: '# Schema dữ liệu & thực thể nghiệp vụ',
    servicesComment: '# Logic nghiệp vụ và dịch vụ xác thực',
    routesComment: '# Các điểm cuối định tuyến Express API',
    graphqlComment: '# GraphQL schema và resolver',
    messagingSchemasComment: '# Hợp đồng sự kiện & schema',
    domainComment: '# Logic nghiệp vụ cốt lõi & quy tắc doanh nghiệp',
    repositoriesComment: '# Truy cập dữ liệu',
    messagingImplComment: '# Triển khai nhắn tin dựa trên sự kiện',
    webserverComment: '# Hạ tầng cho middleware xác thực',
    usecasesComment: '# Quy tắc nghiệp vụ ứng dụng & các use case',
    configCleanComment: '# Cấu hình toàn hệ thống',
    errorMiddlewareComment: '# Xử lý lỗi toàn cục (Chuẩn kiến trúc)',
    gracefulShutdownComment: '# Tắt tiến trình an toàn khi nhận SIGTERM/SIGINT',
    appEntryComment: '# File đầu vào của ứng dụng',
    e2eComment: '# Kiểm thử tích hợp cấp cao (Kiểm thử toàn bộ luồng)',
    unitComment: '# Kiểm thử logic nghiệp vụ cô lập',
    gitAttributesComment: '# Cấu hình kho lưu trữ Git',
    lintStagedComment: '# Quy tắc định dạng và lint trước khi commit',
    prettierComment: '# Tùy chọn phong cách code',
    envExampleComment: '# Biến môi trường',
    eslintComment: '# Thực thi chất lượng và phong cách code.',
    babelComment: '# Biên dịch JavaScript hiện đại cho Node',
    dockerComposeComment: '# Cơ sở hạ tầng đa container cục bộ',
    elkComment: '# Cấu hình ELK Stack',
    sonarComment: '# Cấu hình phân tích bảo mật và chất lượng code',
    snykComment: '# Chính sách bảo mật quét lỗ hổng'
  },
  'zh-CN': {
    structureSimulation: '项目结构模拟',
    dbMigration: '# 数据库迁移管理',
    tfIaC: '# 基础设施即代码 (AWS模块化)',
    tfModules: '# 可重用的基础设施组件',
    tfMain: '# 根编排与模块链接',
    tfVars: '# 基础设施输入参数',
    tfOutputs: '# 部署结果 (URL, IP, 端点)',
    promptsComment: '# AI 代理系统提示词',
    runE2eComment: '# E2E 测试编排器 (启动服务器并运行测试)',
    configMvcComment: '# 系统范围配置 (数据库, 缓存, Swagger)',
    controllersComment: '# 请求处理与输入验证',
    modelsComment: '# 数据模式与业务实体',
    servicesComment: '# 业务逻辑与身份验证服务',
    routesComment: '# Express API 路由端点',
    graphqlComment: '# GraphQL 模式与解析器',
    messagingSchemasComment: '# 事件契约与模式',
    domainComment: '# 核心业务逻辑与企业规则',
    repositoriesComment: '# 数据访问',
    messagingImplComment: '# 事件驱动消息传递实现',
    webserverComment: '# 身份验证中间件的基础设施',
    usecasesComment: '# 应用业务规则与用例',
    configCleanComment: '# 系统范围配置',
    errorMiddlewareComment: '# 全局错误处理 (架构标准)',
    gracefulShutdownComment: '# 收到 SIGTERM/SIGINT 时安全终止进程',
    appEntryComment: '# 应用入口文件',
    e2eComment: '# 高级集成测试 (测试完整流程)',
    unitComment: '# 测试隔离的业务逻辑',
    gitAttributesComment: '# Git 仓库配置',
    lintStagedComment: '# 提交前格式化与联检规则',
    prettierComment: '# 代码风格偏好',
    envExampleComment: '# 环境变量',
    eslintComment: '# 强制执行代码质量和风格。',
    babelComment: '# 为 Node 转译现代 JavaScript',
    dockerComposeComment: '# 本地多容器基础设施',
    elkComment: '# ELK 堆栈配置',
    sonarComment: '# 代码质量和安全分析配置',
    snykComment: '# 漏洞扫描安全策略'
  }
};

const t = computed(() => i18n[lang.value] || i18n['en-US']);

const expanded = reactive({
  github: true,
  workflows: true,
  circleci: true,
  husky: true,
  migrations: true,
  flyway: true,
  flyway_sql: true,
  terraform: true,
  tf_modules: true,
  prompts: false,
  scripts: true,
  src: true,
  errors: true,
  config: true,
  queues_mvc: true,
  queues_clean: true,
  config_clean: true,
  database_clean: true,
  infrastructure: true,
  interfaces: true,
  tests: false,
  e2e: false,
  config: true,
  controllers: true,
  models: true,
  workflows: false,
  utils: true,
  resilience: true,
  errors: false,
  config_clean: true,
  webserver_clean: true,
  middleware_clean: true,
  middleware_mvc: true,
  routes_mvc: true,
  routes_clean: true,
  controllers_clean: true,
  auth_infra: true,
  auth_controllers: true,
  log_clean: true,
  config_root_clean: true,
  database_clean: true,
  messaging: true,
  messaging_clean: true,
  usecases: true,
  usecases_auth: true,
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
  circleci: true,
  terraform: false,
  tf_modules: false
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
