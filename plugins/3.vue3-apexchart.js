import { defineNuxtPlugin } from 'nuxt/app'
import { defineAsyncComponent } from 'vue'

const VueApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'))

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.component('apexchart', VueApexCharts)
})
