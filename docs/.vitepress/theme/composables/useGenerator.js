import { reactive, ref, computed, watch } from 'vue';

// Shared state
const form = reactive({
  projectName: 'nodejs-service',
  language: 'TypeScript',
  architecture: 'MVC',
  viewEngine: 'Pug',
  database: 'MySQL',
  dbName: 'demo',
  communication: 'REST APIs',
  caching: 'None',
  ciProvider: 'GitHub Actions',
  includeSecurity: false,
  auth: 'None',
  terraform: 'None',
  cloudProvider: 'AWS',
  resilience: [],
  withELK: false,
  backgroundJobs: false
});

const errors = reactive({
  projectName: '',
  dbName: ''
});

const showModal = ref(false);
const copied = ref(false);
const showAdvanced = ref(false);
const packageManager = ref('npm');

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

watch(() => form.caching, (newVal) => {
  if (newVal !== 'Redis') {
    form.backgroundJobs = false;
  }
});

watch(() => form.ciProvider, (newVal) => {
  if (newVal === 'None') form.includeSecurity = false;
});

watch(() => form.backgroundJobs, (newVal) => {
  if (newVal) {
    form.caching = 'Redis';
  }
});

watch(() => form.terraform, (newVal, oldVal) => {
  if (oldVal === 'None' && newVal !== 'None') {
    form.cloudProvider = 'AWS';
  }
});

const cliCommand = computed(() => {
  let baseCmd = 'npx nodejs-quickstart-structure@latest init';
  if (packageManager.value === 'pnpm') {
    baseCmd = 'pnpm dlx nodejs-quickstart-structure@latest init';
  } else if (packageManager.value === 'yarn') {
    baseCmd = 'yarn dlx nodejs-quickstart-structure@latest init';
  }

  let cmd = baseCmd;
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

  const isAdvanced = showAdvanced.value || form.auth !== 'None';

  if (form.auth === 'JWT Authentication') {
    cmd += ` --auth JWT`;
  } else if (form.auth === 'OAuth2 - Google/GitHub - JWT') {
    cmd += ` --auth JWT --social-auth Google GitHub`;
  } else if (form.auth === 'None') {
    cmd += ` --auth None`;
  }

  if (form.terraform && form.terraform !== 'None') {
    cmd += ` --terraform "${form.terraform}"`;
    cmd += ` --cloud-provider "${form.cloudProvider}"`;
  } else if (isAdvanced && form.terraform === 'None') {
    cmd += ` --terraform None`;
  }

  if (form.ciProvider !== 'None') {
    if (form.includeSecurity) {
      cmd += ` --include-security`;
    } else {
      cmd += ` --no-include-security`;
    }
  }

  if (form.resilience && form.resilience.length > 0) {
    cmd += ` --resilience ${form.resilience.join(' ')}`;
  } else if (isAdvanced && form.resilience.length === 0) {
    cmd += ` --resilience None`;
  }

  if (isAdvanced && form.withELK) {
    cmd += ` --with-elk`;
  } else if (isAdvanced && !form.withELK) {
    cmd += ` --no-with-elk`;
  }

  if (isAdvanced && form.backgroundJobs) {
    cmd += ` --background-jobs`;
  } else if (isAdvanced && !form.backgroundJobs) {
    cmd += ` --no-background-jobs`;
  }

  cmd += isAdvanced ? ' --advanced-options' : ' --no-advanced-options';

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
    showAdvanced,
    validateName,
    hasErrors,
    ext,
    needsInfra,
    cliCommand,
    packageManager,
    generateCommand,
    copyCommand
  };
}
