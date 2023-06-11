<template>
  <div class="navbar bg-base-100 fixed top-0 z-50">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-xl hidden lg:flex"
        >Ramadhan Mengembara</a
      >
      <a class="btn btn-ghost normal-case text-xl md:hidden flex">RM</a>
    </div>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="1" class="btn btn-ghost btn-circle">
          <div class="indicator">
            <span class="badge badge-sm indicator-item">{{
              level(profile?.exp)
            }}</span>
            <img :src="`/${rank(level(profile?.exp))}Icon.svg`" alt="" />
          </div>
        </label>
        <ul
          tabindex="0"
          class="menu menu-compact dropdown-content mt-3 p-3 shadow bg-base-100 rounded-box w-52"
        >
          <div>
            <div>
              {{ profile?.username }}
            </div>
            <div>Rank {{ rank(level(profile?.exp)) }}</div>
            <div>Level {{ level(profile?.exp) }}</div>
            <div>Experience {{ profile?.exp }}</div>
          </div>
        </ul>
      </div>
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

const { level, rank } = await useUsers()
const { googleSignOut } = useFirebaseAuth()
</script>
