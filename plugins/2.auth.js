import { onAuthStateChanged } from 'firebase/auth'
import {
  defineNuxtPlugin,
  addRouteMiddleware,
  useNuxtApp,
  navigateTo,
  useState
} from 'nuxt/app'
import { ref, onValue } from 'firebase/database'

export default defineNuxtPlugin(() => {
  addRouteMiddleware(
    'auth',
    async (to) => {
      if (process.client) {
        const { $auth, $database } = useNuxtApp()
        const profile = useState('profile')

        onAuthStateChanged($auth, (currentUser) => {
          const user = currentUser
          if (!user && to.path === '/') {
            return navigateTo('/login')
          }
          if (user && to.path === '/login') {
            return navigateTo('/')
          }
          if (user && profile.value === undefined) {
            const userRef = ref($database, `users/${user.uid}`)
            onValue(userRef, (snapshot) => {
              if (snapshot.exists()) {
                profile.value = { ...snapshot.val(), uid: user.uid }
              }
            })
          }
        })
      }
    },
    { global: true }
  )
})
