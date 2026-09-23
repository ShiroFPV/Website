<script setup>
import SideRail from './components/SideRail.vue'
import FooterSection from './components/FooterSection.vue'
</script>

<template>
  <SideRail />
  <div class="shell has-rail">
    <main class="flex-1 relative z-10">
      <RouterView v-slot="{ Component }">
        <Transition name="page" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>
    <FooterSection />
  </div>
</template>

<style scoped>
.shell {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-base);
  padding-top: 56px; /* clears the mobile top bar */
}
@media (min-width: 1024px) {
  .shell { padding-top: 0; }
}
</style>
