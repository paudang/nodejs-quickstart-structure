import { reactive, ref, computed, watch } from 'vue';

// Shared state
const form = reactive({
  projectName: 'nodejs-service',
  language: 'TypeScript',
  architecture: 'Clean Architecture',
  viewEngine: 'None',
  database: 'MongoDB',
  dbName: 'demo',
  communication: 'Kafka',
  caching: 'Redis',
  ciProvider: 'GitHub Actions',
  includeSecurity: true
});

const errors = reactive({
  projectName: '',
  dbName: ''
});

const showModal = ref(false);
const copied = ref(false);

const nameRegex = /^[a-zA-Z0-9-_]+$/;

// Actions and computed
const validateName = () => {
  if (form.projectName === '') {
    errors.projectName = 'Project name cannot be empty.';
  } else if (!nameRegex.test(form.projectName)) {
    errors.projectName = 'May only include letters, numbers, underscores and dashes.';
  } else {
    errors.projectName = '';
  }

  if (form.database !== 'None') {
    if (form.dbName === '') {
      errors.dbName = 'Database name cannot be empty.';
    } else if (!nameRegex.test(form.dbName)) {
      errors.dbName = 'May only include letters, numbers, underscores and dashes.';
    } else {
      errors.dbName = '';
    }
  } else {
    errors.dbName = '';
  }
};

const hasErrors = computed(() => !!errors.projectName || !!errors.dbName || form.projectName === '' || (form.database !== 'None' && form.dbName === ''));

const ext = computed(() => form.language === 'TypeScript' ? 'ts' : 'js');
const needsInfra = computed(() => form.database !== 'None' || form.caching !== 'None' || form.communication === 'Kafka');

// Watchers mapping CLI constraints
watch(() => form.architecture, (newVal) => {
  if (newVal !== 'MVC') form.viewEngine = 'None';
});

watch(() => form.database, (newVal) => {
  if (newVal === 'None') {
    form.dbName = '';
    errors.dbName = '';
  } else {
    validateName();
  }
});

watch(() => form.ciProvider, (newVal) => {
  if (newVal === 'None') form.includeSecurity = false;
});

const cliCommand = computed(() => {
  let cmd = `npx nodejs-quickstart-structure@latest init`;
  cmd += ` -n "${form.projectName}"`;
  cmd += ` -l "${form.language}"`;
  cmd += ` -a "${form.architecture}"`;
  
  if (form.architecture === 'MVC') {
    cmd += ` --view-engine "${form.viewEngine}"`;
  }
  
  cmd += ` -d "${form.database}"`;
  if (form.database !== 'None' && form.dbName) {
    cmd += ` --db-name "${form.dbName}"`;
  }
  
  cmd += ` -c "${form.communication}"`;
  cmd += ` --caching "${form.caching}"`;
  cmd += ` --ci-provider "${form.ciProvider}"`;
  
  if (form.ciProvider !== 'None') {
    if (form.includeSecurity) {
      cmd += ` --include-security`;
    } else {
      cmd += ` --no-include-security`;
    }
  }
  
  return cmd;
});

const generateCommand = () => {
  if (hasErrors.value) return;
  copied.value = false;
  showModal.value = true;
};

const copyCommand = () => {
  navigator.clipboard.writeText(cliCommand.value);
  copied.value = true;
  setTimeout(() => { copied.value = false; }, 2000);
};

export function useGenerator() {
  return {
    form,
    errors,
    showModal,
    copied,
    validateName,
    hasErrors,
    ext,
    needsInfra,
    cliCommand,
    generateCommand,
    copyCommand
  };
}
