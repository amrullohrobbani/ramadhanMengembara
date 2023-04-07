import { useNuxtApp, useState } from 'nuxt/app'
import { ref, onValue } from 'firebase/database'
import { inRange } from 'lodash'

export default async function () {
  const { $database } = useNuxtApp()
  const users = useState('users')

  const usersRef = ref($database, `users`)
  onValue(usersRef, (snapshot) => {
    if (snapshot.exists()) {
      users.value = snapshot.val()
    }
  })
  const image1 = new URL(
    '~/assets/img/t_common_icon_no_1.webp',
    import.meta.url
  ).href
  const image2 = new URL(
    '~/assets/img/t_common_icon_no_2.webp',
    import.meta.url
  ).href
  const image3 = new URL(
    '~/assets/img/t_common_icon_no_3.webp',
    import.meta.url
  ).href

  const ranking = (number) => {
    switch (number) {
      case 1:
        return image1
      case 2:
        return image2
      case 3:
        return image3
      default:
        break
    }
  }

  const level = (exp) => {
    switch (true) {
      case inRange(exp, 0, 154):
        return 1
      case inRange(exp, 155, 308):
        return 2
      case inRange(exp, 309, 462):
        return 3
      case inRange(exp, 463, 616):
        return 4
      case inRange(exp, 617, 770):
        return 5
      case inRange(exp, 771, 924):
        return 6
      case inRange(exp, 925, 1078):
        return 7
      case inRange(exp, 1079, 1232):
        return 8
      case inRange(exp, 1233, 1386):
        return 9
      case inRange(exp, 1387, 1540):
        return 10
      case inRange(exp, 1541, 1694):
        return 11
      case inRange(exp, 1695, 1848):
        return 12
      case inRange(exp, 1849, 2002):
        return 13
      case inRange(exp, 2003, 2156):
        return 14
      case inRange(exp, 2157, 2310):
        return 15
      case inRange(exp, 2311, 2464):
        return 16
      case inRange(exp, 2465, 2618):
        return 17
      case inRange(exp, 2619, 2772):
        return 18
      case inRange(exp, 2773, 2926):
        return 19
      case inRange(exp, 2927, 3080):
        return 20
      case inRange(exp, 3081, 3234):
        return 21
      case inRange(exp, 3235, 3388):
        return 22
      case inRange(exp, 3389, 3542):
        return 23
      case inRange(exp, 3543, 3696):
        return 24
      case inRange(exp, 3697, 3850):
        return 25
      case inRange(exp, 3851, 4004):
        return 26
      case inRange(exp, 4005, 4158):
        return 27
      case inRange(exp, 4159, 4312):
        return 28
      case inRange(exp, 4313, 4466):
        return 29
      case inRange(exp, 4467, 4620):
        return 30
      case inRange(exp, 4621, 4820):
        return 31
      case inRange(exp, 4821, 5020):
        return 32
      case inRange(exp, 5021, 5220):
        return 33
      case inRange(exp, 5221, 5420):
        return 34
      case exp > 5420:
        return 'Immortal'
    }
  }

  return {
    users,
    ranking,
    level
  }
}
