import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  ssr: false,
  modules: ['@nuxtjs/tailwindcss', 'nuxt-scheduler'],
  runtimeConfig: {
    public: {
      apiKey: 'AIzaSyB0As_6odp2Zy4VPW7-LSJ8NE3AS6fZrsU',
      authDomain: 'ramadhanmengembara.firebaseapp.com',
      projectId: 'ramadhanmengembara',
      storageBucket: 'ramadhanmengembara.appspot.com',
      messagingSenderId: '476691484028',
      appId: '1:476691484028:web:302bcf05674601a1f6e8f9',
      measurementId: 'G-04EXBMJXY9',
      databaseURL:
        'https://ramadhanmengembara-default-rtdb.asia-southeast1.firebasedatabase.app'
    }
  }
})
