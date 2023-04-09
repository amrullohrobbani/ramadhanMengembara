import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { navigateTo, useNuxtApp, useState } from 'nuxt/app'
import { ref, set, onValue } from 'firebase/database'

export default function () {
  const { $auth, $database } = useNuxtApp()
  const provider = new GoogleAuthProvider()

  const profile = useState('profile')

  function writeUserData(userId, name, email, imageUrl) {
    set(ref($database, 'users/' + userId), {
      username: name,
      email: email,
      profile_picture: imageUrl,
      exp: 0
    })
  }

  const googleSignIn = () => {
    signInWithPopup($auth, provider)
      .then((result) => {
        const userRef = ref($database, `users/${result.user.uid}`)
        onValue(userRef, (snapshot) => {
          if (!snapshot.exists()) {
            const user = result.user
            writeUserData(user.uid, user.displayName, user.email, user.photoURL)
            profile.value = {
              uid: result.user.uid,
              username: user.displayName,
              email: user.email,
              profile_picture: user.photoURL,
              exp: 0
            }
          } else {
            profile.value = { ...snapshot.val(), uid: result.user.uid }
          }
        })
        return navigateTo('/')
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code
        const errorMessage = error.message
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error)
        console.log(errorCode, errorMessage, credential)
      })
  }

  const googleSignOut = async () => {
    await signOut($auth)
      .then(() => {
        return navigateTo('/login')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return {
    googleSignIn,
    googleSignOut,
    profile
  }
}
