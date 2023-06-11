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
  serverTimestamp,
  remove,
  get
} from 'firebase/database'
import dayjs from 'dayjs'

export default async function () {
  const topAmalan = useState('topAmalan')
  const myProgress = useState('myProgress')
  const countExp = (params) => {
    const sum = params.reduce((accumulator, currentValue) => {
      return accumulator.exp + currentValue.value
    })
    return sum
  }

  const submitAmal = async (payload) => {
    const { $database } = useNuxtApp()
    const userRef = query(
      ref($database, `amal`),
      orderByChild('uid'),
      equalTo(payload.uid)
    )
    await get(userRef).then((snapshot) => {
      const snapshotAvailable =
        snapshot.exists() &&
        dayjs(snapshot.val()[Object.keys(snapshot.val())[0]].createdAt).isSame(
          dayjs(),
          'day'
        )
      if (!snapshotAvailable) {
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
          .then(() => {
            updateExp()
            return Promise.resolve('Berhasil Menambahkan Data')
          })
          .catch((err) => {
            throw err
          })
      } else {
        updateExp()
        throw new Error('Sudah submit hari ini')
      }
    })
  }

  const deleteAmal = async () => {
    const { $database } = await useNuxtApp()
    const userRef = ref($database, `user-amal`)
    remove(userRef)
      .then(() => {
        console.log('Section deleted successfully.')
      })
      .catch((error) => {
        console.error('Error deleting section:', error)
      })
  }

  const topAmal = () => {
    const { $database } = useNuxtApp()
    const refer = ref($database, `amal`)
    onValue(refer, (snapshot) => {
      if (snapshot.exists()) {
        const object = snapshot.val()
        let result = {}
        for (let key in object) {
          let obj = object[key]
          for (let prop in obj) {
            if (prop !== 'uid' && prop !== 'createdAt') {
              if (result[prop] === undefined) {
                result[prop] = obj[prop]
              } else {
                result[prop] += obj[prop]
              }
            }
          }
        }
        let sortedResult = Object.fromEntries(
          Object.entries(result).sort((a, b) => b[1] - a[1])
        )
        topAmalan.value = sortedResult
        return sortedResult
      } else {
        return []
      }
    })
  }

  const amalanProgress = () => {
    const profile = useState('profile')
    const { $database } = useNuxtApp()
    const refer = ref($database, `user-amal/${profile.value?.uid}`)
    onValue(refer, (snapshot) => {
      if (snapshot.exists()) {
        const object = snapshot.val()
        myProgress.value = Object.values(object).map((item) => {
          return sumTotal(item)
        })
        return object
      } else {
        return []
      }
    })
  }

  const updateExp = async () => {
    const profile = useState('profile')
    const { $database } = useNuxtApp()
    const refer = query(ref($database, `user-amal/${profile.value?.uid}`))
    await get(refer)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const object = snapshot.val()
          const progress = Object.values(object).map((item) => {
            return sumTotal(item)
          })
          const totalExp = progress.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          )
          const userRef = ref($database, `users//${profile.value?.uid}`)
          update(userRef, { exp: totalExp })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return {
    countExp,
    submitAmal,
    topAmal,
    amalanProgress,
    deleteAmal
  }
}
