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
    <div v-if="label" class="ph-meta">
      <span v-if="index" class="idx">{{ index }}</span>
      <span class="rule ph-rule"></span>
      <span class="label">{{ label }}</span>
    </div>

    <h1 class="display ph-title">
      {{ title }}<span v-if="accent" class="grad-text">{{ accent }}</span>
    </h1>

    <p v-if="sub" class="ph-sub">{{ sub }}</p>
    <slot />
  </header>
</template>

<style scoped>
.ph { margin-bottom: clamp(30px, 4vw, 52px); }

.ph-meta { display: flex; align-items: center; gap: 12px; margin-bottom: 18px; }
.ph-rule { flex: 0 0 44px; }

.ph-title {
  font-size: clamp(2rem, 4.6vw, 3.3rem);
  color: var(--text-primary);
  margin-bottom: 14px;
}

.ph-sub {
  max-width: 56ch;
  color: var(--text-secondary);
  line-height: 1.66;
  font-size: 0.98rem;
}
</style>
