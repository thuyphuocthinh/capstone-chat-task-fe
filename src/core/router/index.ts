import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from "vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: (): Component => import("@/components/auth").then((modules) => modules.AuthLogin)
    },
    {
      path: "/register",
      name: "register",
      component: (): Component => import("@/components/auth").then((modules) => modules.AuthRegister)
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: (): Component => import("@/components/auth").then((modules) => modules.ForgotPassword)
    }
  ],
})

export default router
