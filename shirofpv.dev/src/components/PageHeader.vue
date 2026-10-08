<script setup>
defineProps({
  index: { type: String, default: '' },
  label: { type: String, default: '' },
  title: { type: String, required: true },
  accent: { type: String, default: '' },
  sub: { type: String, default: '' },
})
</script>

<template>
  <header class="ph">
    <p v-if="label" class="ph-label">{{ label }}</p>
    <h1 class="display ph-title">
      {{ title }}<span v-if="accent">{{ accent }}</span>
    </h1>
    <p v-if="sub" class="ph-sub">{{ sub }}</p>
    <slot />
  </header>
</template>

<style scoped>
.ph { margin-bottom: clamp(40px, 5vw, 64px); }
.ph-label { font-size: 0.85rem; color: var(--text-muted); margin-bottom: 18px; }
.ph-title {
  font-size: clamp(2rem, 4.2vw, 3rem);
  letter-spacing: -0.03em;
  color: var(--text-primary);
  margin-bottom: 18px;
}
.ph-sub { max-width: 54ch; color: var(--text-secondary); line-height: 1.65; font-size: 1rem; }
</style>
