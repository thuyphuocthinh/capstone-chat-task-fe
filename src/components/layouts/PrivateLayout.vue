<template>
  <a-layout class="layout">
    <NavBarLayout></NavBarLayout>
    <a-layout-content>
      <div class="content-layout">
        <div class="content-left">
          <TabLeftLayout></TabLeftLayout>
        </div>
        <div class="content-right">
          <router-view></router-view>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { NavBarLayout, TabLeftLayout } from '.'
import { inject } from 'vue'
import type { Gc as IGc } from '#/Gc'
const Gc = inject('Gc') as typeof IGc

const { useRoute } = Gc['router']

const route = useRoute()
</script>

<style scoped>
.layout {
  height: 100vh;
  width: 100vw;
}

.content-layout {
  display: flex;
  align-items: center;
}

.content-left {
  width: 82px;
}

.content-right {
  width: calc(100vw - 82px);
}
</style>
