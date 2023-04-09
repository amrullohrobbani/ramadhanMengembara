import { useNuxtApp, useState } from 'nuxt/app'
import {
  ref,
  push,
  child,
  update,
  onValue,
  orderByChild,
  query,
  equalTo,
  serverTimestamp
} from 'firebase/database'

export default async function () {
  const countExp = (params) => {
    const sum = params.reduce((accumulator, currentValue) => {
      return accumulator.exp + currentValue.value
    })
    return sum
  }

  const submitAmal = async (payload) => {
    const { $database } = await useNuxtApp()
    const userRef = query(
      ref($database, `amal`),
      orderByChild('uid'),
      equalTo(payload.uid)
    )
    await onValue(userRef, (snapshot) => {
      if (!snapshot.exists()) {
        const newData = {
          uid: payload.uid,
          tahajud: payload.tahajud,
          rawatib: payload.rawatib,
          dhuha: payload.dhuha,
          mengaji: payload.mengaji,
          infaq: payload.infaq,
          createdAt: serverTimestamp()
        }
        const newPostKey = push(child(ref($database), 'amal')).key
        const updates = {}
        updates['/amal/' + newPostKey] = newData
        updates['/user-amal/' + payload.uid + '/' + newPostKey] = newData
        update(ref($database), updates)
          .then((response) => {
            return response
          })
          .catch((err) => {
            throw err
          })
      } else {
        console.log('Sudah submit hari ini')
        return 'Sudah submit hari ini'
      }
    })
  }

  const top4Amal = async () => {
    const profile = useState('profile')
    const { $database } = await useNuxtApp()
    const userRef = query(
      ref($database, `amal`),
      orderByChild('uid'),
      equalTo(profile.uid)
    )
    await onValue(userRef, (snapshot) => {
      if (snapshot.exists()) {
        return snapshot()
      } else {
        return []
      }
    })
  }

  return {
    countExp,
    submitAmal,
    top4Amal
  }
}
