<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <div class="pt-24 pb-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

      <div class="mb-8">
        <RouterLink to="/debugging" class="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
          <span>←</span> Back to Debugging
        </RouterLink>
      </div>

      <div class="mb-10">
        <div class="inline-flex items-center gap-2 glass-card px-3 py-1.5 rounded-full mb-4 text-xs" style="color: #d7b7ff;">
          <span class="w-2 h-2 rounded-full" style="background: #ff8fd4;"></span>
          Receiver / Serial RX
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          Receiver <span class="gradient-text">Not Being Detected</span>
        </h1>
        <p class="text-gray-400 leading-relaxed">
          Your receiver is bound, wired up, powered on — but Betaflight's Receiver tab shows absolutely nothing moving. This is almost always a Ports tab conflict that's easy to miss.
        </p>
      </div>

      <div class="space-y-6">

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>⚠️</span> MSP and Serial RX on the Same UART
          </h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            If you have both <strong class="text-white">Configuration / MSP</strong> and <strong class="text-white">Serial RX</strong> enabled on the same UART, they'll conflict and your receiver signal gets killed. MSP needs to be <strong class="text-white">disabled</strong> on the UART you're using for your receiver.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed">
            Betaflight won't warn you about this — it'll just silently not work, which is great for your sanity (it's not).
          </p>
          <div class="mt-4 rounded-xl p-4 space-y-3" style="background: rgba(255,143,212,0.08); border: 1px solid rgba(255,143,212,0.2);">
            <div class="flex items-center gap-3 text-sm">
              <span class="text-red-400 font-bold">✗</span>
              <span class="text-gray-300">UART1: <span class="text-red-400">MSP ON</span> + Serial RX ON → receiver won't work</span>
            </div>
            <div class="flex items-center gap-3 text-sm">
              <span style="color: #7dd3ff;" class="font-bold">✓</span>
              <span class="text-gray-300">UART1: <span style="color: #7dd3ff;">MSP OFF</span> + Serial RX ON → works fine</span>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🔧</span> How to Fix It
          </h2>
          <ol class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">1</span>
              <span>Go to Betaflight Configurator → <strong class="text-white">Ports</strong> tab.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">2</span>
              <span>Find the UART where Serial RX is enabled.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">3</span>
              <span>Make sure <strong class="text-white">Configuration / MSP is turned off</strong> on that same UART. It can be on other UARTs — just not this one.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">4</span>
              <span>Save → Reboot.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">5</span>
              <span>Go to the Receiver tab and check if your sticks are moving.</span>
            </li>
          </ol>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>✅</span> Quick Checks
          </h2>
          <ul class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Make sure the receiver is actually <strong class="text-white">bound</strong> to your radio — solid LED usually means bound, flashing means it's searching.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Confirm the correct RC protocol is selected in the <strong class="text-white">Configuration</strong> tab (CRSF, SBUS, iBus, etc.).</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Check your RX/TX wiring too — see the <RouterLink to="/debugging/uart-no-signal" class="underline hover:opacity-80" style="color: #b48bff;">UART wiring page</RouterLink> if needed.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>If using ELRS, make sure the receiver firmware matches your TX module version. Version mismatch = no bind.</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-10 flex justify-between text-sm">
        <RouterLink to="/debugging/uart-no-signal" class="text-gray-400 hover:text-white transition-colors">
          ← UART no signal
        </RouterLink>
        <RouterLink to="/debugging/no-osd-digital" class="hover:opacity-80 transition-opacity" style="color: #b48bff;">
          No OSD (Digital) →
        </RouterLink>
      </div>

    </div>
  </div>
</template>
