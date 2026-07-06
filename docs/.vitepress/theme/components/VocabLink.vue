<template>
  <a :href="`https://upskills.dev/tools/webdev-vocabulary?category=${category}&term=${term}`" target="_blank" class="vocab-link">
    <span class="vocab-text">{{ text }}</span>
    <span class="vocab-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
    </span>
  </a>
</template>

<script setup>
defineProps({
  category: {
    type: String,
    required: true
  },
  term: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.vocab-link {
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  padding: 0 6px;
  margin: 0 2px;
  border-radius: 6px;
  color: var(--vp-c-brand-1, var(--vp-c-brand));
  background-color: var(--vp-c-default-soft);
  text-decoration: none !important;
  font-weight: 600;
  transition: all 0.2s ease;
  border-bottom: 2px solid transparent;
}
.vocab-link:hover {
  background-color: var(--vp-c-brand-soft);
  border-bottom-color: var(--vp-c-brand-1, var(--vp-c-brand));
  transform: translateY(-1px);
}
.vocab-icon {
  opacity: 0.6;
  transition: transform 0.2s ease, opacity 0.2s ease;
}
.vocab-link:hover .vocab-icon {
  transform: translate(2px, -2px);
  opacity: 1;
}
</style>
