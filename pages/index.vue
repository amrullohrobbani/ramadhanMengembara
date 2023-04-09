<template>
  <div data-theme="night" class="overflow-x-hidden">
    <NavbarTop></NavbarTop>
    <div class="hero min-h-screen mx-auto bg-base-content">
      <div class="flex w-full flex-col md:flex-row">
        <div
          class="flex w-full flex-initial m-0 md:m-5 h-screen w-screen md:w-full overflow-x-auto"
        >
          <div class="w-full m-3">
            <table v-if="userList" class="table w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th colspan="3">Top Player</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr v-for="(user, index) in userList" :key="user?.uid">
                  <td>
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
                        <div class="font-bold">{{ user?.username }}</div>
                      </div>
                    </div>
                  </td>
                  <th>
                    <div class="flex items-center space-x-3">
                      <div>lvl. {{ level(user?.exp) }}</div>
                      <div class="flex items-center flex-initial w-28">
                        <EmblemComponents :exp="user?.exp" />
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
        </div>
        <div class="flex flex-col w-full flex-initial m-0 md:m-5 h-screen">
          <div class="flex m-3 w-full">
            {{ top4Amalan }}
            <table class="table table-zebra w-full">
              <!-- head -->
              <thead>
                <tr>
                  <th colspan="4">My Top 3 Amalan</th>
                </tr>
              </thead>
              <tbody>
                <!-- row 1 -->
                <tr>
                  <th>1</th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                  <td>
                    <img
                      v-if="[1, 2, 3].includes(index + 1)"
                      :src="ranking(index + 1)"
                      :alt="index + 1"
                    />
                  </td>
                </tr>
                <!-- row 2 -->
                <tr>
                  <th>2</th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                  <td>Purple</td>
                </tr>
                <!-- row 3 -->
                <tr>
                  <th>3</th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                  <td>Red</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="flex m-3 w-full">
            <div class="card card-compac w-full bg-base-100 shadow-xl">
              <div class="card-body">
                <apexchart
                  width="500"
                  type="line"
                  :options="chartOptions"
                  :series="series"
                ></apexchart>
              </div>
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
        <form @submit.prevent="handleSubmit()">
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

const { ranking, level } = await useUsers()
const users = useState('users')
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
    id: 'vuechart-example'
  },
  xaxis: {
    categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
  }
})
const series = ref([
  {
    name: 'series-1',
    data: [30, 40, 35, 50, 49, 60, 70, 91]
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

const { submitAmal, top4Amal } = await useAmal()

const handleSubmit = () => {
  payload.value.uid = profile.value.uid
  submitAmal(payload.value)
    .then(() => alert('Berhasil Menyimpan Data'))
    .catch((err) => alert(err))
}

const top4Amalan = top4Amal()
</script>
