<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl hidden lg:flex"
        >Ramadhan Mengembara</a
      >
      <a class="btn btn-ghost normal-case text-xl md:hidden flex">RM</a>
    </div>
    <div class="flex-none">
      <label tabindex="0" class="btn btn-ghost btn-circle">
        <div class="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-award"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.669.864 8 0 6.331.864l-1.858.282-.842 1.68-1.337 1.32L2.6 6l-.306 1.854 1.337 1.32.842 1.68 1.858.282L8 12l1.669-.864 1.858-.282.842-1.68 1.337-1.32L13.4 6l.306-1.854-1.337-1.32-.842-1.68L9.669.864zm1.196 1.193.684 1.365 1.086 1.072L12.387 6l.248 1.506-1.086 1.072-.684 1.365-1.51.229L8 10.874l-1.355-.702-1.51-.229-.684-1.365-1.086-1.072L3.614 6l-.25-1.506 1.087-1.072.684-1.365 1.51-.229L8 1.126l1.356.702 1.509.229z"
            />
            <path
              d="M4 11.794V16l4-1 4 1v-4.206l-2.018.306L8 13.126 6.018 12.1 4 11.794z"
            />
          </svg>
          <span class="badge badge-sm indicator-item">{{
            level(profile?.exp)
          }}</span>
        </div>
      </label>
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="profile?.profile_picture" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a class="justify-between">
              {{ profile?.username }}
            </a>
          </li>
          <li><a>Settings</a></li>
          <li><a @click="googleSignOut">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useState } from 'nuxt/app'
import { useFirebaseAuth, useUsers } from '#imports'

const profile = useState('profile')

const { level } = await useUsers()
const { googleSignOut } = useFirebaseAuth()
</script>
