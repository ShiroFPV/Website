<script setup>
import { RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue'

const visible = ref(false)

onMounted(() => {
  setTimeout(() => { visible.value = true }, 100)
})
</script>

<template>
  <section class="relative min-h-screen flex items-center overflow-hidden pt-16">
    <div class="orb orb-purple w-[36rem] h-[36rem]" style="top: -5%; left: -4%; pointer-events: none;"></div>
    <div class="orb orb-blue w-80 h-80" style="bottom: 8%; right: 6%; pointer-events: none;"></div>

    <div
      class="relative z-10 w-full px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto transition-all duration-700"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <div class="lg:grid lg:grid-cols-5 lg:gap-12 lg:items-center">

        <div class="lg:col-span-3 text-center lg:text-left">
          <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-2 rounded-full mb-4 sm:mb-6 text-xs sm:text-sm font-medium" style="color: #d7b7ff;">
            <span class="w-2 h-2 rounded-full animate-pulse" style="background: #ff8fd4;"></span>
            still soldering things at 2am
          </div>

          <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-4 sm:mb-6 leading-tight tracking-tight">
            <span class="gradient-text">ShiroFPV</span>
          </h1>

          <p class="text-base sm:text-lg md:text-xl text-gray-300 mb-4 font-light leading-relaxed max-w-xl mx-auto lg:mx-0">
            I design flight controllers, write firmware, and occasionally fly the things.<br />
            <span style="color: #d7b7ff;">Open-source, because hoarding schematics is cringe.</span>
          </p>

          <div class="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4 mt-8 sm:mt-10">
            <RouterLink to="/projects" class="btn-primary text-white text-base w-full sm:w-auto text-center">
              See what I've built
            </RouterLink>
            <a
              href="https://support.shirofpv.dev"
              target="_blank"
              rel="noopener noreferrer"
              class="btn-outline text-base w-full sm:w-auto text-center"
            >
              🔧 Debug your FC
            </a>
          </div>
        </div>

        <div class="hidden lg:block lg:col-span-2 mt-8 lg:mt-0">
          <div class="glass-card rounded-2xl p-5" style="border-color: rgba(180,139,255,0.2);">
            <p class="text-xs font-mono mb-4" style="color: #d7b7ff;">// status.log</p>
            <ul class="space-y-3 text-sm">
              <li class="flex items-start gap-3">
                <span class="font-mono text-xs mt-0.5 flex-shrink-0" style="color: #ff8fd4;">currently:</span>
                <span class="text-gray-300">fighting an AT32 bug that refuses to die</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="font-mono text-xs mt-0.5 flex-shrink-0" style="color: #7dd3ff;">shipping:</span>
                <span class="text-gray-300">FC v2 (soon™)</span>
              </li>
              <li class="flex items-start gap-3">
                <span class="font-mono text-xs mt-0.5 flex-shrink-0" style="color: #b48bff;">mood:</span>
                <span class="text-gray-300">it flies… mostly</span>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
