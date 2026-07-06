<template>
  <div class="collaborator-banner">
    <div class="banner-content">
      <h3 class="banner-title">{{ title }}</h3>
      <a href="https://upskills.dev" target="_blank" class="banner-link">
        <img src="/upskills.png" alt="Upskills Logo" class="banner-logo" />
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';

const route = useRoute();
const title = computed(() => {
  if (route.path.startsWith('/vi')) return 'Hợp tác cùng';
  if (route.path.startsWith('/zh')) return '合作伙伴';
  return 'In Collaboration With';
});
</script>

<style scoped>
.collaborator-banner {
  margin: 60px auto 40px auto;
  text-align: center;
}
.banner-title {
  margin: 0 0 24px 0;
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--vp-c-text-2);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
.banner-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.banner-logo {
  height: 48px;
  filter: grayscale(100%) opacity(60%);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.banner-link:hover .banner-logo {
  filter: grayscale(0%) opacity(100%);
  transform: scale(1.02);
}
</style>
