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
          UART / Wiring
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          No Signal from a <span class="gradient-text">UART Device</span>
        </h1>
        <p class="text-gray-400 leading-relaxed">
          Classic one. You wired up your receiver, VTX, GPS — whatever — plug it in and nothing. No signal, device not showing up, zilch. Nine times out of ten it's the RX/TX lines being the wrong way round.
        </p>
      </div>

      <div class="space-y-6">

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-3 flex items-center gap-2">
            <span>🔄</span> RX and TX Are Crossed — On Purpose
          </h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            This trips everyone up at least once. The FC's <strong class="text-white">RX pin needs to connect to the device's TX pin</strong>, and the FC's <strong class="text-white">TX pin goes to the device's RX pin</strong>. You're crossing them, not matching them.
          </p>
          <p class="text-gray-400 text-sm leading-relaxed">
            Think of it like a conversation — one end talks (TX), the other listens (RX). If both ends are trying to talk on the same wire, nobody hears anything.
          </p>
          <div class="mt-4 rounded-xl p-4" style="background: rgba(180,139,255,0.1); border: 1px solid rgba(180,139,255,0.25);">
            <div class="font-mono text-sm text-center space-y-1">
              <div><span style="color: #b48bff;">FC RX</span> <span class="text-gray-400">→</span> <span style="color: #ff8fd4;">Device TX</span></div>
              <div><span style="color: #ff8fd4;">FC TX</span> <span class="text-gray-400">→</span> <span style="color: #b48bff;">Device RX</span></div>
            </div>
          </div>
        </div>

        <div class="glass-card rounded-2xl p-6">
          <h2 class="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <span>✅</span> Quick Checks
          </h2>
          <ul class="space-y-3 text-gray-300 text-sm">
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Double-check the silkscreen on both the FC and the device — labels can be tiny and easy to misread.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Make sure the correct UART is enabled in Betaflight's Ports tab for whatever protocol you're using (Serial RX, SmartAudio, MSP, etc.).</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Always <strong class="text-white">save and reboot</strong> after changing anything in the Ports tab — changes don't take effect until you do.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Try a different cable if possible. Broken wires in JST connectors are more common than you'd think.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="mt-0.5" style="color: #b48bff;">•</span>
              <span>Verify the device is actually getting power — check 5V/3.3V pads depending on what it needs.</span>
            </li>
          </ul>
        </div>

        <div class="glass-card rounded-2xl p-6" style="border-color: rgba(255,143,212,0.2);">
          <h2 class="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <span>💡</span> Still nothing?
          </h2>
          <p class="text-gray-400 text-sm leading-relaxed">
            If you've crossed the wires correctly, the port is enabled, and you've rebooted — consider that the device itself might be fried or that you're on the wrong UART entirely. Try a different UART port on the FC and see if that changes anything.
          </p>
        </div>

      </div>

      <div class="mt-10 flex justify-between text-sm">
        <RouterLink to="/debugging" class="text-gray-400 hover:text-white transition-colors">
          ← All issues
        </RouterLink>
        <RouterLink to="/debugging/receiver-not-detected" class="hover:opacity-80 transition-opacity" style="color: #b48bff;">
          Receiver not detected →
        </RouterLink>
      </div>

    </div>
  </div>
</template>
