<template>
  <div class="workspace-ctn">
    <!-- search -->
    <div class="workspace-search">
      <a-input-search v-model:value="value" placeholder="input search loading deault" loading />
    </div>
    <!-- list -->
    <div class="workspace-list"></div>
    <!-- pagination -->
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const value = ref<string>('')
</script>

<style scoped></style>
