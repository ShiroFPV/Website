<script setup>
defineProps({
  project: { type: Object, required: true },
  index: { type: String, default: '' },
})
</script>

<template>
  <a :href="project.link" target="_blank" rel="noopener noreferrer" class="row">
    <span v-if="index" class="row-i idx">{{ index }}</span>
    <span class="row-body">
      <span class="row-title">{{ project.title }}</span>
      <span class="row-desc">{{ project.description }}</span>
    </span>
    <span class="row-tags">{{ project.tags.slice(0, 3).join(' · ') }}</span>
    <span class="row-arrow" aria-hidden="true">↗</span>
  </a>
</template>

<style scoped>
.row {
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "i body arrow" ". tags tags";
  gap: 6px 20px;
  align-items: baseline;
  padding: 26px 0;
  border-bottom: 1px solid var(--border-subtle);
}
@media (min-width: 860px) {
  .row {
    grid-template-columns: 48px minmax(0, 1fr) 220px 24px;
    grid-template-areas: "i body tags arrow";
    gap: 24px;
  }
}

.row-i { grid-area: i; }
.row-body { grid-area: body; display: flex; flex-direction: column; gap: 6px; min-width: 0; }
.row-title {
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.4vw, 1.75rem);
  letter-spacing: -0.02em;
  color: var(--text-primary);
  transition: color 0.2s ease;
}
.row-desc { font-size: 0.92rem; line-height: 1.55; color: var(--text-muted); max-width: 60ch; }
.row-tags { grid-area: tags; font-size: 0.82rem; color: var(--text-secondary); }

.row-arrow { grid-area: arrow; color: var(--text-muted); transition: color 0.2s ease, transform 0.2s ease; }
.row:hover .row-title { color: var(--copper-light); }
.row:hover .row-arrow { color: var(--copper-light); transform: translate(2px, -2px); }
</style>
