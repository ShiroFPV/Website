<script setup>
defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="card">
    <div class="card-top">
      <span class="card-tags">{{ project.tags.join(' · ') }}</span>
      <span v-if="project.featured" class="card-flag">Featured</span>
    </div>
    <h3 class="card-title">{{ project.title }}</h3>
    <p class="card-desc">{{ project.description }}</p>
    <span class="card-link">View on GitHub <span aria-hidden="true">↗</span></span>
  </a>
</template>

<style scoped>
.card {
  display: flex; flex-direction: column;
  height: 100%;
  padding: 22px;
  background: transparent;
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  transition: border-color 0.2s ease;
}
.card:hover { background: var(--surface); }

.card-top { display: flex; justify-content: space-between; gap: 12px; margin-bottom: 32px; }
.card-tags { font-size: 0.8rem; color: var(--text-muted); }
.card-flag { font-size: 0.78rem; color: var(--text-secondary); }

.card-title {
  font-weight: 500;
  font-size: 1.05rem;
  line-height: 1.3;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin-bottom: 10px;
}
.card-desc { flex: 1; font-size: 0.88rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 24px; }
.card-link { font-size: 0.88rem; color: var(--text-primary); transition: color 0.2s; }
.card-link { color: var(--text-secondary); }
</style>
