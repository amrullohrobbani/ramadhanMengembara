import { useNuxtApp } from 'nuxt/app'
import { ref, set } from 'firebase/database'

const { $database } = useNuxtApp()

export default async function () {
  const countExp = (params) => {
    const sum = params.reduce((accumulator, currentValue) => {
      return accumulator.exp + currentValue.value
    })
    return sum
  }

  const submitAmal = (payload) => {
    set(ref($database, 'amal/' + payload.userId), {
      username: payload.name,
      email: payload.email,
      profile_picture: payload.imageUrl,
      exp: 0
    })
    return payload
  }
  return {
    countExp,
    submitAmal
  }
}
