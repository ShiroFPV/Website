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
          OSD / Digital Video
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          No OSD <span class="gradient-text">(Digital)</span>
        </h1>
        <p class="text-gray-400 leading-relaxed">
          You've got a digital FPV system (DJI, Walksnail, HDZero, etc.) and the OSD just isn't showing up in your goggles. Video is fine but no telemetry overlay. This is almost always a Ports tab thing.
        </p>
      </div>

      <div class="space-y-6">

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🖥️</span> Enable VTX (MSP + DisplayPort) in Ports
          </h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            For digital OSD to work, Betaflight needs to be able to send display data to your VTX unit over MSP. This means the UART connected to your VTX needs <strong class="text-white">MSP + DisplayPort</strong> enabled under the Peripherals column in the Ports tab.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed">
            The "Configuration / MSP" toggle on the left side of that same row also needs to be <strong class="text-white">active</strong>. Both need to be on.
          </p>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🔧</span> How to Fix It
          </h2>
          <ol class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">1</span>
              <span>Open Betaflight Configurator → <strong class="text-white">Ports</strong> tab.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">2</span>
              <span>Find the UART your VTX is connected to.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">3</span>
              <span>Under <strong class="text-white">Peripherals</strong>, select <strong class="text-white">VTX (MSP + DisplayPort)</strong>.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">4</span>
              <span>Also make sure <strong class="text-white">Configuration / MSP</strong> is enabled on that same UART.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="font-mono font-bold text-xs mt-0.5 px-1.5 py-0.5 rounded" style="background: rgba(180,139,255,0.2); color: #b48bff;">5</span>
              <span>Save → Reboot → check your goggles.</span>
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
              <span>Make sure <strong class="text-white">OSD is enabled</strong> in Betaflight's OSD tab (there's a master toggle at the top).</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Check that your VTX is actually connected to the UART you think it is — easy to get confused if you have multiple wiring options.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Verify RX/TX wires are correctly crossed (FC RX → VTX TX, FC TX → VTX RX).</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>For Walksnail/Avatar specifically, make sure your goggles and camera firmware versions are compatible.</span>
            </li>
          </ul>
        </div>

      </div>

      <div class="mt-10 flex justify-between text-sm">
        <RouterLink to="/debugging/receiver-not-detected" class="text-gray-400 hover:text-white transition-colors">
          ← Receiver not detected
        </RouterLink>
        <RouterLink to="/debugging/no-osd-analog" class="hover:opacity-80 transition-opacity" style="color: #b48bff;">
          No OSD (Analog) →
        </RouterLink>
      </div>

    </div>
  </div>
</template>
