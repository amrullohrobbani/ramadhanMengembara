<template>
  <div class="flex items-center flex-initial w-full">
    <herald-icon v-if="inRange(levelInd, 1, 5)" />

    <guardian-icon v-else-if="inRange(levelInd, 6, 10)" />

    <crusader-icon v-else-if="inRange(levelInd, 11, 15)" />

    <archon-icon v-else-if="inRange(levelInd, 16, 20)" />

    <legend-icon v-else-if="inRange(levelInd, 21, 25)" />

    <ancient-icon v-else-if="inRange(levelInd, 26, 30)" />

    <divine-icon v-else-if="inRange(levelInd, 31, 35)" />

    <immortal-icon v-else-if="levelInd > 35" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useUsers } from '#imports'
import { inRange } from 'lodash'

const props = defineProps({
  exp: {
    type: Number,
    default: undefined
  }
})
const { level } = await useUsers()
const levelInd = computed(() => {
  return level(props?.exp)
})
</script>
