import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from "vue";
import { middleware_router } from './middleware_router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      name: "login",
      component: (): Component => import("@/auth").then((modules) => modules.AuthLogin)
    },
    {
      path: "/register",
      name: "register",
      component: (): Component => import("@/auth").then((modules) => modules.AuthRegister)
    },
    {
      path: "/forgot-password",
      name: "forgot-password",
      component: (): Component => import("@/auth").then((modules) => modules.ForgotPassword)
    },
    {
      path: "/verify-otp",
      name: "verify-otp",
      component: (): Component => import("@/auth").then((modules) => modules.VefifyOtp)
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: (): Component => import("@/auth").then((modules) => modules.ResetPassword)
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: (): Component => import("@/auth").then((modules) => modules.VerifyEmail)
    },
    {
      path: "/:pathMatch(.*)*",
      component: import("@/common").then((modules) => modules.NotFoundPage)
    },

    {
      path: "/workspaces",
      name: "workspace",
      component: import("@/workspaces").then((modules) => modules.WorkspacePage)
    }
  ],
})

export default router

new middleware_router(router)
