<template>
  <a-modal centered :open="true" @cancel="cancelFunc" :footer="footer" :width="width">
    <div class="popup-container">
      <p class="popup-title">{{ title }}</p>
      <component v-if="icon" :is="icon" class="popup-icon" />
      <slot />
    </div>
  </a-modal>
</template>

<script lang="ts" setup>
defineProps<{
  cancelFunc(): void
  icon?: string
  width?: number
  title: string
  footer?: boolean
}>()
</script>

<style scoped>
.popup-icon {
  font-size: 32px;
  color: #1890ff;
  display: block;
  margin: 0 auto 16px;
  text-align: center;
}

.popup-title {
  font-weight: 600;
  font-size: var(--font-md);
}
</style>
