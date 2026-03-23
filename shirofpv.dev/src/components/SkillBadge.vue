<script setup>
defineProps({
  skill: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<template>
  <div class="glass-card px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl flex items-center gap-2 text-xs sm:text-sm font-medium text-gray-200 transition-all duration-200 hover:scale-105 cursor-default min-h-[40px] sm:min-h-[44px]"
    style="border-color: rgba(139,92,246,0.2);">
    <span v-if="icon" class="text-sm sm:text-base flex-shrink-0">{{ icon }}</span>
    <span>{{ skill }}</span>
  </div>
</template>
