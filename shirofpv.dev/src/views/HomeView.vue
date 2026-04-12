<script setup>
import HeroSection from '../components/HeroSection.vue'
import ProjectCard from '../components/ProjectCard.vue'
import { projects } from '../data/projects.js'
import { RouterLink } from 'vue-router'

const featuredProjects = projects.slice(0, 3)
</script>

<template>
  <div>
    <HeroSection />

    <section class="py-20 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8 sm:mb-12">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 sm:mb-4">
            Featured <span class="gradient-text">Projects</span>
          </h2>
          <p class="text-sm sm:text-base text-gray-400 max-w-xl mx-auto leading-relaxed">
            Open-source hardware and firmware projects designed to push FPV performance forward.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
          <ProjectCard
            v-for="project in featuredProjects"
            :key="project.id"
            :project="project"
          />
        </div>

        <div class="text-center">
          <RouterLink to="/projects" class="btn-primary text-white inline-block">
            See All Projects
          </RouterLink>
        </div>
      </div>
    </section>

    <section class="py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div class="absolute inset-0 opacity-5" style="background: linear-gradient(135deg, #b48bff, #ff8fd4, #7dd3ff); background-size: 300% 300%; animation: gradientShift 12s ease infinite;"></div>

      <div class="max-w-4xl mx-auto text-center relative z-10">
        <div class="glass-card rounded-2xl p-6 sm:p-8 md:p-10">
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">
            Who is <span class="gradient-text">ShiroFPV</span>?
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed mb-6 sm:mb-8">
            FPV pilot and open-source hardware designer passionate about trying to push the limits of flight controller development.
            Designing custom PCBs with AT32 microcontroller and sharing it all with the community.
          </p>
          <RouterLink to="/about" class="btn-outline inline-block">
            Learn More
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
