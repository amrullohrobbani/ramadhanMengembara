<template>
  <div data-theme="night" class="overflow-x-hidden">
    <NavbarTop></NavbarTop>
    <div
      class="h-auto md:h-screen pt-[4rem] mx-auto bg-base-content overflow-y-hidden"
    >
      <div class="flex w-full flex-col md:flex-row h-full">
        <div
          class="flex flex-initial m-0 md:ml-5 md:my-5 w-screen md:w-full overflow-x-auto"
        >
          <table v-if="userList" class="table w-full table-pin-rows rounded">
            <thead>
              <tr>
                <th colspan="3">Top Player</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(user, index) in userList" :key="user?.uid">
                <td class="text-center">
                  <img
                    v-if="[1, 2, 3].includes(index + 1)"
                    :src="ranking(index + 1)"
                    :alt="index + 1"
                  />
                  <h2 v-else>
                    {{ index + 1 }}
                  </h2>
                </td>
                <td>
                  <div class="flex items-center space-x-3">
                    <div class="avatar">
                      <div class="mask mask-squircle w-12 h-12">
                        <img :src="user?.profile_picture" alt="Avatar" />
                      </div>
                    </div>
                    <div>
                      <div class="font-bold capitalize">
                        {{ user?.username }}
                      </div>
                    </div>
                  </div>
                </td>
                <th>
                  <div class="flex items-center space-x-3">
                    <div>lvl. {{ level(user?.exp) }}</div>
                    <div class="flex items-center flex-initial w-28">
                      <img :src="`/${rank(level(user?.exp))}Icon.svg`" alt="" />
                    </div>
                    <div>
                      <div class="font-bold">{{ user?.exp }}</div>
                    </div>
                  </div>
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex w-full m-0 md:m-5 grid grid-cols-1 pr-0 md:pr-3">
          <div class="flex mr-3 w-full h-full overflow-y-auto">
            <table class="table table-zebra w-full table-pin-rows">
              <!-- head -->
              <thead>
                <tr>
                  <th colspan="3">Top Amalan</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key, index) in topAmalan" :key="key">
                  <th>{{ index + 1 }}</th>
                  <td class="capitalize">{{ key }}</td>
                  <td>{{ value }} {{ satuan[key] }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex mt-4 mr-3 w-full">
            <div
              class="card card-compac w-full h-full pt-5 bg-base-100 shadow-xl"
            >
              <apexchart
                height="250"
                type="line"
                :options="chartOptions"
                :series="series"
              ></apexchart>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- The button to open modal -->
    <label for="my-modal" class="btn btn-circle fixed bottom-5 right-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        class="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
        />
      </svg>
    </label>

    <!-- Put this part before </body> tag -->
    <input id="my-modal" type="checkbox" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Submit your Amalan today</h3>
        <form @submit.stop.prevent="handleSubmit()">
          <div class="form-control">
            <label class="label">
              <span class="label-text">Tahajud</span>
            </label>
            <label class="input-group w-full m-3">
              <input
                v-model="payload.tahajud"
                type="number"
                placeholder="10"
                class="input input-bordered w-full"
              />
              <span>Raka'at</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Rawatib</span>
            </label>
            <label class="input-group w-full m-3">
              <input
                v-model="payload.rawatib"
                type="number"
                placeholder="10"
                class="input input-bordered w-full"
              />
              <span>Raka'at</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Dhuha</span>
            </label>
            <label class="input-group w-full m-3">
              <input
                v-model="payload.dhuha"
                type="number"
                placeholder="10"
                class="input input-bordered w-full"
              />
              <span>Raka'at</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Mengaji</span>
            </label>
            <label class="input-group w-full m-3">
              <input
                v-model="payload.mengaji"
                type="number"
                placeholder="10"
                class="input input-bordered w-full"
              />
              <span>Juz</span>
            </label>
          </div>
          <div class="form-control">
            <label class="label">
              <span class="label-text">Infaq</span>
            </label>
            <label class="input-group w-full m-3">
              <input
                v-model="payload.infaq"
                type="number"
                placeholder="10"
                class="input input-bordered w-full"
              />
              <span>Kali</span>
            </label>
          </div>
          <div class="modal-action">
            <label for="my-modal" class="btn">Cancel</label>
            <button type="submit" class="btn btn-primary">Done!</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useUsers, useAmal } from '#imports'
import { useState } from 'nuxt/app'
import { ref, computed } from 'vue'
import { startWindToast } from '@mariojgt/wind-notify/packages/index.js'

useHead({
  title: 'Ramadhan Mengembara'
})

const { ranking, level, rank } = await useUsers()
const users = useState('users')
const myProgress = useState('myProgress', () => [])
const userList = computed(() => {
  if (users?.value) {
    return Object.values(users.value).sort((a, b) => {
      return b.exp - a.exp
    })
  }
  return undefined
})
const profile = useState('profile')

const chartOptions = ref({
  chart: {
    id: 'vuechart-example',
    toolbar: {
      show: false
    }
  }
})
const series = computed(() => [
  {
    name: 'My Progress',
    data: myProgress.value
  }
])

const payload = ref({
  uid: undefined,
  tahajud: 0,
  rawatib: 0,
  dhuha: 0,
  mengaji: 0,
  infaq: 0
})

const { submitAmal, topAmal, amalanProgress } = await useAmal()
const topAmalan = useState('topAmalan')

const handleSubmit = () => {
  payload.value.uid = profile.value.uid
  submitAmal(payload.value)
    .then(() => {
      startWindToast('', 'Berhasil Submit', 'success', 60, 'bottom')
    })
    .catch((err) => {
      startWindToast('', err, 'error', 60, 'bottom')
    })
}

watch(users, () => {
  topAmal()
  amalanProgress()
})

const satuan = {
  rawatib: "raka'at",
  dhuha: "raka'at",
  infaq: 'kali',
  tahajud: "raka'at",
  mengaji: 'Juz'
}
</script>

<style scoped>
@tailwind base;

/* Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: var(--secondary) var(--primary);
}

/* Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 15px;
}

*::-webkit-scrollbar-track {
  background: var(--primary);
  border-radius: 5px;
}

*::-webkit-scrollbar-thumb {
  background-color: var(--secondary);
  border-radius: 14px;
  border: 3px solid var(--primary);
}
</style>
