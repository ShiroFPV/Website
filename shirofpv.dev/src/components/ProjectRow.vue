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
    <span class="row-tags">
      <span v-for="t in project.tags.slice(0, 3)" :key="t" class="tag">{{ t }}</span>
    </span>
    <span class="row-arrow" aria-hidden="true">→</span>
  </a>
</template>

<style scoped>
.row {
  position: relative;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-areas: "i body arrow" ". tags tags";
  gap: 4px 18px;
  align-items: center;
  padding: 22px 14px 22px 4px;
  border-bottom: 1px solid var(--border-subtle);
  transition: background 0.25s ease, padding-left 0.25s ease;
}
@media (min-width: 860px) {
  .row {
    grid-template-columns: auto minmax(0, 1fr) auto auto;
    grid-template-areas: "i body tags arrow";
    gap: 26px;
  }
}

.row::before {
  content: ""; position: absolute; left: 0; top: 0; bottom: 0; width: 2px;
  background: linear-gradient(180deg, var(--violet-light), var(--pink));
  transform: scaleY(0); transform-origin: top;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}
.row:hover { background: rgba(255, 255, 255, 0.022); padding-left: 16px; }
.row:hover::before { transform: scaleY(1); }

.row-i { grid-area: i; align-self: start; padding-top: 4px; transition: color 0.25s; }
.row:hover .row-i { color: var(--pink); }

.row-body { grid-area: body; display: flex; flex-direction: column; gap: 5px; min-width: 0; }
.row-title {
  font-family: var(--font-display); font-weight: 600; letter-spacing: -0.02em;
  font-size: clamp(1.08rem, 2vw, 1.4rem); color: var(--text-primary);
}
.row-desc { font-size: 0.87rem; line-height: 1.55; color: var(--text-muted); max-width: 62ch; }

.row-tags { grid-area: tags; display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  font-family: var(--font-mono); font-size: 0.58rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: var(--text-secondary);
  border: 1px solid var(--border-subtle); border-radius: 2px;
  padding: 3px 7px; white-space: nowrap;
}

.row-arrow {
  grid-area: arrow; display: none;
  font-family: var(--font-mono); color: var(--text-muted);
  transition: transform 0.25s ease, color 0.25s ease;
}
@media (min-width: 860px) { .row-arrow { display: block; } }
.row:hover .row-arrow { color: var(--pink); transform: translateX(4px); }
</style>
