<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
import TheTimeline from './pages/TheTimeline.vue'
import TheActivities from './pages/TheActivities.vue'
import TheProgress from './pages/TheProgress.vue'

</script>
<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex flex-grow flex-col">
      <TheTimeline />
      <TheActivities />
      <TheProgress />
    </main>
    <TheNav />
  </div>
</template>
<style scoped></style>
