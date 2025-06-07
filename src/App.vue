<script setup lang="ts">
import { inject } from 'vue'
import type { Gc as IGc } from '#/Gc'
import AuthLayout from '@/layouts/AuthLayout.vue'
import PrivateLayout from '@/layouts/PrivateLayout.vue'
const Gc = inject('Gc') as typeof IGc
const { auth_logged_in } = Gc['auth']
</script>

<template>
  <div class="app-ctn">
    <auth-layout v-if="!auth_logged_in" />
    <private-layout v-else></private-layout>
  </div>
</template>

<style scoped>
.app-ctn {
  height: 100%;
}
</style>
