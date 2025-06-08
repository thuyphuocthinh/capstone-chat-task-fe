<template>
  <a-tabs v-model:activeKey="activeKey" :destroyInactiveTabPane="true">
    <a-tab-pane key="1" tab="Profile">
      <Profile />
    </a-tab-pane>
    <a-tab-pane key="2" tab="Password">
      <ChangePassword />
    </a-tab-pane>
  </a-tabs>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Profile from './Profile.vue'
import ChangePassword from './ChangePassword.vue'

const activeKey = ref('1')
</script>

<style scoped></style>
