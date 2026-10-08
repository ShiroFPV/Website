<script setup>
defineProps({
  skill: { type: String, required: true },
  icon: { type: String, default: '' },
})
</script>

<template>
  <span class="skill">
    <span v-if="icon" aria-hidden="true">{{ icon }}</span>
    {{ skill }}
  </span>
</template>

<style scoped>
.skill {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 14px;
  font-size: 0.88rem;
  color: var(--text-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 999px;
}
</style>
