<template>
  <div class="collaborator-banner">
    <div class="banner-content">
      <h3 class="banner-title">{{ title }}</h3>
      <div class="logos-container">
        <a href="https://upskills.dev" target="_blank" class="banner-link">
          <img src="/upskills.png" alt="Upskills Logo" class="banner-logo" />
        </a>
        <a href="https://github.com/marketplace/actions/archguard-ai-reviewer" target="_blank" class="banner-link">
          <div class="banner-text-logo">
            <span class="shield">🛡️</span> ArchGuard AI
          </div>
        </a>
      </div>
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
.logos-container {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 32px;
  flex-wrap: wrap;
}
.banner-logo {
  height: 48px;
  filter: grayscale(100%) opacity(60%);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.banner-link {
  text-decoration: none !important;
}
.banner-text-logo {
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  gap: 8px;
  filter: grayscale(100%) opacity(60%);
  transition: filter 0.3s ease, transform 0.3s ease;
}
.shield {
  font-size: 1.8rem;
}
.banner-link:hover .banner-logo,
.banner-link:hover .banner-text-logo {
  filter: grayscale(0%) opacity(100%);
  transform: scale(1.02);
  color: var(--vp-c-brand);
}
</style>
