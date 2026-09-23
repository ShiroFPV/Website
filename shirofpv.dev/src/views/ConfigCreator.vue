<template>
  <div class="pt-24 pb-16">
    <div class="page-shell-narrow px-4 sm:px-6 lg:px-8">

      <div class="mb-8 sm:mb-10">
        <div class="inline-flex items-center gap-2 glass-card px-3 sm:px-4 py-1.5 sm:py-2 rounded-full mb-4 text-xs sm:text-sm" style="color: var(--accent-light);">
          <span class="w-2 h-2 rounded-full" style="background: var(--accent);"></span>
          Config Generator
        </div>
        <h1 class="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-3">
          Build a <span class="gradient-text">config.h</span>
        </h1>
        <p class="text-sm sm:text-base text-gray-400 max-w-xl leading-relaxed">
          Pull board metadata from a Betaflight Support ID / build key and generate a ready-to-flash config.h for BF 4.5+.
        </p>
      </div>

      <div class="glass-card rounded-2xl p-5 sm:p-6 md:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-400 font-semibold uppercase tracking-wide">Support ID / Build Key</label>
            <input
              v-model="supportId"
              type="text"
              placeholder="1a5a860c..."
              class="config-field px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-400 font-semibold uppercase tracking-wide">Board Name</label>
            <input
              v-model="meta.boardName"
              type="text"
              placeholder="SHIRO_F4"
              class="config-field px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
          <div class="flex flex-col gap-1.5">
            <label class="text-xs text-gray-400 font-semibold uppercase tracking-wide">Manufacturer ID</label>
            <input
              v-model="meta.manufacturerId"
              type="text"
              placeholder="SHRO"
              class="config-field px-3 py-2.5 rounded-xl text-sm text-white placeholder-gray-500 outline-none transition-colors"
            />
          </div>
        </div>

        <div class="flex items-center justify-between gap-3 mb-5">
          <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] uppercase font-semibold tracking-wide text-gray-500" style="background: rgba(255,255,255,0.04);">
            <span :class="apiOnline ? 'bg-emerald-500' : 'bg-red-500'" class="w-1.5 h-1.5 rounded-full"></span>
            Proxy: {{ apiOnline ? 'Online' : 'Checking...' }}
          </div>
        </div>

        <button
          @click="generate"
          :disabled="loading"
          class="config-btn-primary w-full py-3 rounded-xl font-semibold text-sm text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Processing API Data...' : 'Build Configuration' }}
        </button>

        <div v-if="output" class="mt-6">
          <div class="flex items-center justify-between rounded-t-xl px-4 py-2.5" style="background: var(--surface-hover); border: 1px solid var(--border-subtle); border-bottom: none;">
            <span class="text-xs font-mono text-gray-400 flex items-center gap-2">
              <span aria-hidden="true">📄</span> config.h
            </span>
            <div class="flex items-center gap-1.5">
              <button @click="copy" class="text-xs px-2.5 py-1 rounded-md text-gray-400 hover:text-white hover:bg-white/5 transition-colors">Copy</button>
              <button @click="download" class="config-btn-primary text-xs px-2.5 py-1 rounded-md font-semibold text-white transition-colors">Download</button>
            </div>
          </div>
          <pre
            class="text-[11px] font-mono overflow-x-auto max-h-96 leading-relaxed text-gray-300 p-4 rounded-b-xl"
            style="background: var(--bg-base); border: 1px solid var(--border-subtle); border-top: none;"
          >{{ output }}</pre>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { generateConfigH } from '../data/configGenerator';

const supportId = ref('');
const output = ref('');
const loading = ref(false);
const apiOnline = ref(false);
const meta = reactive({ boardName: '', manufacturerId: '' });

const checkStatus = async () => {
  try {
    const res = await fetch('https://api.shirofpv.com/');
    apiOnline.value = res.status !== 404;
  } catch {
    apiOnline.value = false;
  }
};

onMounted(() => {
  checkStatus();
});

async function fetchFromProxy(id) {
  const workerUrl = `https://api.shirofpv.com/?id=${id}`;
  const response = await fetch(workerUrl);
  if (!response.ok) throw new Error("Worker or Betaflight API unreachable");
  return await response.json();
}

const generate = async () => {
  if (!supportId.value) return alert("Please enter a Support ID!");

  loading.value = true;
  try {
    const apiData = await fetchFromProxy(supportId.value);
    output.value = generateConfigH(apiData, meta);
  } catch (error) {
    output.value = `/* ERROR: ${error.message} */`;
  } finally {
    loading.value = false;
  }
};

const copy = () => {
  navigator.clipboard.writeText(output.value);
  alert("Copied!");
};

const download = () => {
  const blob = new Blob([output.value], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'config.h'; a.click();
  URL.revokeObjectURL(url);
};
</script>

<style scoped>
.config-field {
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-subtle);
}

.config-field:focus {
  border-color: var(--accent);
}

.config-btn-primary {
  background: var(--accent);
}

.config-btn-primary:hover:not(:disabled) {
  background: var(--accent-light);
}
</style>
