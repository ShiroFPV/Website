<script setup>
defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const tagColors = {
  'STM32': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'AT32': 'bg-sky-500/20 text-sky-300 border-sky-500/30',
  'Betaflight': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  'Open Source': 'bg-green-500/20 text-green-300 border-green-500/30',
  'Webdesign': 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  'Frontend': 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/30',
  'Portfolio': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
  'Software': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  'Modification': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  'Python': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'Code': 'bg-lime-500/20 text-lime-300 border-lime-500/30',
  'Converter': 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  'Windows': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Utilities': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
  'ReadME': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Profile': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'Design': 'bg-red-500/20 text-red-300 border-red-500/30',
  'PCB Design': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
  'KiCad': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  'Hardware': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
  'Latest': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  'C (not much at all)': 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
  'Sensors': 'bg-teal-500/20 text-teal-300 border-teal-500/30',
}

function getTagClass(tag) {
  return tagColors[tag] || 'bg-gray-500/20 text-gray-300 border-gray-500/30'
}
</script>

<template>
  <article class="glass-card card-hover rounded-2xl overflow-hidden flex flex-col">
    <div
      class="relative h-40 sm:h-44 flex items-center justify-center overflow-hidden"
      style="background: linear-gradient(135deg, rgba(180,139,255,0.15) 0%, rgba(255,143,212,0.15) 50%, rgba(191,233,255,0.12) 100%);"
    >
      <div class="absolute w-24 h-24 rounded-full opacity-20 blur-2xl" style="background: #b48bff; top: -10px; left: -10px;"></div>
      <div class="absolute w-16 h-16 rounded-full opacity-20 blur-2xl" style="background: #ff8fd4; bottom: -5px; right: -5px;"></div>

      <div class="relative z-10 flex flex-col items-center gap-2">
        <svg class="w-10 sm:w-12 h-10 sm:h-12 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="color: #d7b7ff;">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" />
        </svg>
        <span v-if="project.featured" class="text-xs font-semibold px-2 py-0.5 rounded-full" style="background: linear-gradient(90deg, #b48bff, #ff8fd4); color: white;">Featured</span>
      </div>
    </div>

    <div class="p-4 sm:p-5 flex flex-col flex-1">
      <h3 class="text-base sm:text-lg font-bold text-white mb-2">{{ project.title }}</h3>
      <p class="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1 mb-4">{{ project.description }}</p>

      <div class="flex flex-wrap gap-1.5 sm:gap-2 mb-4">
        <span
          v-for="tag in project.tags"
          :key="tag"
          class="text-xs px-2 py-0.5 sm:py-1 rounded-md border font-medium"
          :class="getTagClass(tag)"
        >
          {{ tag }}
        </span>
      </div>

      <a
        :href="project.link"
        target="_blank"
        rel="noopener noreferrer"
        class="project-link inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-200"
        style="color: #d7b7ff;"
      >
        View Project
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  </article>
</template>

<style scoped>
.project-link:hover {
  color: #ff8fd4 !important;
}
</style>
