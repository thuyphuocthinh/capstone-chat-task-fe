<template>
  <div class="header-ctn">
    <div class="header-left">
      <div class="header-item workspace-btn">
        <img src="+/icons/i_menu.svg" />
      </div>
      <div class="header-item app-name">Slack</div>
    </div>

    <div class="header-right"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.header-ctn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-white);
  height: 60px;
  background-color: var(--color-primary-dark) !important;
  padding: 0 var(--space-xl);
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.workspace-btn {
  width: 22px;
  cursor: pointer;
}

.workspace-btn img {
  width: 16px;
}

.app-name {
  font-size: 18px;
  font-weight: 600;
}
</style>
