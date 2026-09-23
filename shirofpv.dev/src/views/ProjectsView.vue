<script setup>
import { ref, computed } from 'vue'
import PageHeader from '../components/PageHeader.vue'
import ProjectRow from '../components/ProjectRow.vue'
import { projects } from '../data/projects.js'

const selectedTag = ref(null)

const allTags = computed(() => {
  const tags = new Set()
  projects.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags)
})

const filtered = computed(() =>
  !selectedTag.value ? projects : projects.filter(p => p.tags.includes(selectedTag.value)),
)

const num = (i) => String(i + 1).padStart(2, '0')
function selectTag(tag) { selectedTag.value = selectedTag.value === tag ? null : tag }
</script>

<template>
  <div class="pg">
    <div class="page-shell">
      <PageHeader
        index="03"
        label="Everything"
        title="Open source "
        accent="projects"
        sub="Flight controllers, PCB designs, and firmware — all open source and not going anywhere."
      />

      <div class="filters">
        <span class="label filters-label">filter</span>
        <div class="chips">
          <button class="chip" :class="{ on: selectedTag === null }" @click="selectedTag = null">
            All <span class="chip-n">{{ projects.length }}</span>
          </button>
          <button
            v-for="tag in allTags" :key="tag"
            class="chip" :class="{ on: selectedTag === tag }"
            @click="selectTag(tag)"
          >{{ tag }}</button>
        </div>
      </div>

      <Transition mode="out-in" name="page">
        <ul :key="selectedTag" class="rows">
          <li v-for="(p, i) in filtered" :key="p.id">
            <ProjectRow :project="p" :index="num(i)" />
          </li>
        </ul>
      </Transition>

      <p v-if="filtered.length === 0" class="empty">
        Nothing matches <span class="grad-text">{{ selectedTag }}</span>. Try another filter.
      </p>
    </div>
  </div>
</template>

<style scoped>
.pg { padding: clamp(48px, 7vw, 92px) 20px clamp(56px, 7vw, 92px); }
@media (min-width: 640px) { .pg { padding-inline: 32px; } }

.filters {
  display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px;
  padding-bottom: 20px; margin-bottom: 4px;
}
.filters-label { flex: 0 0 auto; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; }

.chip {
  font-family: var(--font-mono); font-size: 0.62rem; letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  border: 1px solid var(--border-subtle);
  border-radius: 2px;
  padding: 5px 9px;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.chip:hover { color: var(--text-primary); border-color: var(--border-strong); }
.chip.on {
  color: var(--pink);
  border-color: var(--border-hot);
  background: var(--pink-soft);
}
.chip-n { opacity: 0.6; margin-left: 3px; }

.rows { border-top: 1px solid var(--border-subtle); }

.empty {
  padding: 48px 0; color: var(--text-muted);
  font-family: var(--font-mono); font-size: 0.85rem;
}
</style>
