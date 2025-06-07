import { createRouter, createWebHistory } from 'vue-router'
import type { Component } from "vue";
import { middleware_router } from './middleware_router';

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
    },
    {
      path: "/verify-otp",
      name: "verify-otp",
      component: (): Component => import("@/components/auth").then((modules) => modules.VefifyOtp)
    },
    {
      path: "/reset-password",
      name: "reset-password",
      component: (): Component => import("@/components/auth").then((modules) => modules.ResetPassword)
    },
    {
      path: "/verify-email",
      name: "verify-email",
      component: (): Component => import("@/components/auth").then((modules) => modules.VerifyEmail)
    },
    {
      path: "/:pathMatch(.*)*",
      component: import("@/components/common").then((modules) => modules.NotFoundPage)
    },

    {
      path: "/test-workspace",
      component: import("@/components/workspaces").then((modules) => modules.TestWorkspace)
    }
  ],
})

export default router

new middleware_router(router)
