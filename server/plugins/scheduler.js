import { useScheduler } from '#scheduler'
import dayjs from 'dayjs'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import {
  ref,
  query,
  get,
  push,
  child,
  update,
  serverTimestamp
} from 'firebase/database'

export default defineNitroPlugin(() => {
  const firebaseConfig = {
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

  const app = initializeApp(firebaseConfig)

  const database = getDatabase(app)
  startScheduler(database)
})

function startScheduler(database) {
  const scheduler = useScheduler()

  scheduler
    .run(() => {
      const refer = query(ref(database, `user-amal`))
      const today = dayjs().hour(0).minute(0).second(0).valueOf()
      get(refer).then((snapshot) => {
        Object.values(snapshot.val()).map((item) => {
          const isSubmitted = Object.values(item)
            .map((item) => item.createdAt)
            .some((date) => {
              return date > today
            })
          if (!isSubmitted) {
            const newData = {
              uid: Object.values(item).map((item) => item.uid)[0],
              tahajud: 0,
              rawatib: 0,
              dhuha: 0,
              mengaji: 0,
              infaq: 0,
              createdAt: serverTimestamp()
            }
            const newPostKey = push(child(ref(database), 'amal')).key
            const updates = {}
            updates['/amal/' + newPostKey] = newData
            updates['/user-amal/' + newData.uid + '/' + newPostKey] = newData
            update(ref(database), updates)
          }
        })
      })
    })
    .dailyAt(23, 30)

  // create as many tasks as you want here
}
