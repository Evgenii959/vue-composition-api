// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['./layouts/default.vue', '@/src/styles.css'],
  modules: ['@pinia/nuxt', '@nuxtjs/tailwindcss'],
  tailwindcss: {
    exposeConfig: true,
    configPath: './tailwind.config.js',
    viewer: true,
    // and more...
  },
  components: true,
  devtools: { enabled: false },
  spaLoadingTemplate: false,
  compatibilityDate: '2024-09-13',
});