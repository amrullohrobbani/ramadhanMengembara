export default function sumTotal(convertedResult) {
  let total = 0
  let multipliers = {
    rawatib: 2,
    dhuha: 2,
    infaq: 3,
    tahajud: 5,
    mengaji: 3
  }

  for (let prop in convertedResult) {
    if (multipliers[prop] && prop !== 'uid' && prop !== 'createdAt') {
      total += convertedResult[prop] * multipliers[prop]
    }
  }

  return total
}
