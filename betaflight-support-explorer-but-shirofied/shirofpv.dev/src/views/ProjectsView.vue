<script setup>
import { ref, computed } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'

const selectedTag = ref(null)

const allTags = computed(() => {
  const tags = new Set()
  projects.forEach(p => p.tags.forEach(t => tags.add(t)))
  return Array.from(tags)
})

const filteredProjects = computed(() => {
  if (!selectedTag.value) return projects
  return projects.filter(p => p.tags.includes(selectedTag.value))
})

function selectTag(tag) {
  selectedTag.value = selectedTag.value === tag ? null : tag
}
</script>

<template>
  <div class="pt-24 pb-16">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <!-- Header -->
      <div class="text-center mb-8 sm:mb-12">
        <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm" style="color: #d7b7ff;">
          <span class="w-2 h-2 rounded-full" style="background: #7dd3ff;"></span>
          My Work
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 sm:mb-4">
          Open Source <span class="gradient-text">Projects</span>
        </h1>
        <p class="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
          Flight controllers, PCB designs, and firmware projects — all open source and freely available.
        </p>
      </div>

      <!-- Tag filter -->
      <div class="flex flex-wrap gap-2 sm:gap-3 justify-center mb-8 sm:mb-10">
        <button
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200"
          :class="selectedTag === null
            ? 'text-white'
            : 'glass-card text-gray-400 hover:text-white'"
          :style="selectedTag === null ? 'background: linear-gradient(135deg, #b48bff, #ff8fd4); color: white;' : ''"
          @click="selectedTag = null"
        >
          All
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200"
          :class="selectedTag === tag
            ? 'text-white'
            : 'glass-card text-gray-400 hover:text-white'"
          :style="selectedTag === tag ? 'background: linear-gradient(135deg, #b48bff, #ff8fd4); color: white;' : ''"
          @click="selectTag(tag)"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Project grid -->
      <Transition mode="out-in" name="page">
        <div
          :key="selectedTag"
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          <ProjectCard
            v-for="project in filteredProjects"
            :key="project.id"
            :project="project"
          />
        </div>
      </Transition>

      <!-- Empty state -->
      <div v-if="filteredProjects.length === 0" class="text-center py-16">
        <p class="text-gray-400">No projects match that filter.</p>
      </div>

    </div>
  </div>
</template>
