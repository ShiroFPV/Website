<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'

const visible = ref(false)

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})
</script>

<template>
  <section class="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
    <!-- Animated gradient background -->
    <div
      class="absolute inset-0"
      style="background: linear-gradient(135deg, #0d0916 0%, #160b26 25%, #1a0a2e 50%, #0d0916 75%, #0d0916 100%); background-size: 300% 300%; animation: gradientShift 10s ease infinite;"
    ></div>

    <!-- Floating orbs -->
    <div class="orb orb-purple w-96 h-96" style="top: 10%; left: 5%;"></div>
    <div class="orb orb-pink w-72 h-72" style="bottom: 15%; right: 8%;"></div>
    <div class="orb orb-blue w-64 h-64" style="top: 50%; left: 60%;"></div>
    <div class="orb orb-purple w-48 h-48" style="bottom: 30%; left: 20%;"></div>

    <!-- Subtle grid overlay -->
    <div
      class="absolute inset-0 opacity-5"
      style="background-image: linear-gradient(rgba(180,139,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(180,139,255,0.3) 1px, transparent 1px); background-size: 50px 50px;"
    ></div>

    <!-- Content -->
    <div
      class="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto transition-all duration-700"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <!-- Tagline chip -->
      <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm font-medium" style="color: #d7b7ff;">
        <span class="w-2 h-2 rounded-full animate-pulse" style="background: #ff8fd4;"></span>
        FPV Hardware Designer &amp; Pilot
      </div>

      <!-- Main heading -->
      <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
        <span class="gradient-text">ShiroFPV</span>
      </h1>

      <p class="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 mb-4 font-light leading-relaxed max-w-2xl mx-auto">
        Open-source flight controllers &amp; hardware design.<br />
        <span style="color: #d7b7ff;">Building the future of FPV, one board at a time. (maybe)</span>
      </p>

      <!-- CTA buttons -->
            <!-- CTA buttons -->
      <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
        <RouterLink to="/projects" class="btn-primary text-white text-base w-full sm:w-auto text-center">
          View Projects
        </RouterLink>
        <a
          href="https://support.shirofpv.dev"
          target="_blank"
          rel="noopener noreferrer"
          class="btn-outline text-base w-full sm:w-auto text-center"
        >
          🔧 Support Explorer
        </a>
      </div>
    </div>
  </section>
</template>
