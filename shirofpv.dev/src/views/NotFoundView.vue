<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
    <div class="text-center max-w-lg">
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-6 text-xs sm:text-sm" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full animate-pulse" style="background: #ff8fd4;"></span>
        signal lost
      </div>

      <h1 class="text-6xl sm:text-7xl md:text-8xl font-black mb-4 leading-none">
        <span class="gradient-text">404</span>
      </h1>

      <p class="text-base sm:text-lg text-gray-300 leading-relaxed mb-2">
        This page flew out of range.
      </p>
      <p class="text-sm text-gray-500 mb-8">
        Failsafe engaged — let's get you back to solid ground.
      </p>

      <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
        <RouterLink to="/" class="btn-primary text-white text-sm w-full sm:w-auto text-center">
          Back home
        </RouterLink>
        <RouterLink to="/debugging" class="btn-outline text-sm w-full sm:w-auto text-center">
          🔧 Debug your FC
        </RouterLink>
      </div>
    </div>
  </div>
</template>
