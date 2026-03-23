<template>
  <div class="bg-slate-900 border border-slate-700 rounded-lg p-6 text-white shadow-xl">
    <h2 class="text-xl font-bold mb-4 flex items-center gap-2">
      <span class="text-blue-500">⚡</span> config.h Generator (BF 4.5+)
    </h2>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div class="flex flex-col gap-1">
        <label class="text-xs text-slate-400 font-bold uppercase">Support ID / Build Key</label>
        <input v-model="supportId" type="text" placeholder="1a5a860c..." class="bg-slate-800 border border-slate-600 p-2 rounded outline-none focus:border-blue-500 transition" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-slate-400 font-bold uppercase">Board Name</label>
        <input v-model="meta.boardName" type="text" placeholder="SHIRO_F4" class="bg-slate-800 border border-slate-600 p-2 rounded outline-none focus:border-blue-500 transition" />
      </div>
      <div class="flex flex-col gap-1">
        <label class="text-xs text-slate-400 font-bold uppercase">Manufacturer ID</label>
        <input v-model="meta.manufacturerId" type="text" placeholder="SHRO" class="bg-slate-800 border border-slate-600 p-2 rounded outline-none focus:border-blue-500 transition" />
      </div>
    </div>
    <div class="flex items-center gap-2 mb-2">
      
      <div :class="apiOnline ? 'bg-green-500' : 'bg-red-500'" class="w-2 h-2 rounded-full animate-pulse"></div>
      <span class="text-[10px] uppercase font-bold text-slate-500">
        Proxy Status: {{ apiOnline ? 'Online' : 'Checking...' }}
      </span>
    </div>
    <button @click="generate" :disabled="loading" class="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-md font-bold transition disabled:opacity-50">
      {{ loading ? 'Processing API Data...' : 'Build Configuration' }}
    </button>

    <div v-if="output" class="mt-6 animate-in fade-in slide-in-from-top-4">
      <div class="flex justify-between items-center mb-2">
        <span class="text-xs font-mono text-slate-400">Generated File Content:</span>
        <div class="flex gap-2">
          <button @click="copy" class="text-xs bg-slate-700 px-3 py-1 rounded hover:bg-slate-600">Copy Code</button>
          <button @click="download" class="text-xs bg-green-700 px-3 py-1 rounded hover:bg-green-600 font-bold">Download config.h</button>
        </div>
      </div>
      <pre class="bg-black p-4 rounded-md border border-slate-700 text-[10px] font-mono overflow-x-auto max-h-80 leading-relaxed">{{ output }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { generateConfigH } from '../data/configGenerator';

const supportId = ref('');
const output = ref('');
const loading = ref(false);
const apiOnline = ref(false); // Status LED state
const meta = reactive({ boardName: '', manufacturerId: '' });

// Heartbeat check to see if your Worker is alive
const checkStatus = async () => {
  try {
    const res = await fetch('https://api.shirofpv.dev/');
    // If we get a response (even a 400), the worker is powered on
    apiOnline.value = res.status !== 404; 
  } catch {
    apiOnline.value = false;
  }
};

onMounted(() => {
  checkStatus();
});

async function fetchFromProxy(id) {
  const workerUrl = `https://api.shirofpv.dev/?id=${id}`;
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