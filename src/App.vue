<script setup>
import TheHeader from './components/TheHeader.vue'
import TheNav from './components/TheNav.vue'
</script>
<template>
  <div class="flex min-h-screen flex-col">
    <TheHeader />
    <main class="flex flex-grow flex-col"></main>
    <TheNav />
  </div>
</template>
<style scoped></style>