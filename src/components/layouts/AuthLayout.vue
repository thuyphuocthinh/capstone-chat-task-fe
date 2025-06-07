<template>
  <a-layout class="layout">
    <a-layout class="layout-ctn">
      <a-layout-sider class="layout-left" width="60%">
        <img src="+/img/auth_background.jpg" class="image" />
      </a-layout-sider>
      <a-layout class="layout-right" width="40%">
        <a-layout-content class="login-ctn">
          <router-view></router-view>
        </a-layout-content />
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<script setup lang="ts"></script>

<style scoped>
@import "+/css/auth.css"
</style>
