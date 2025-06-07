import type { Router } from "vue-router";
import { auth_store } from "#/stores/auth_store";
import { watch } from "vue";

export class middleware_router {
  private router

  constructor(router: Router) {
    this.router = router
    this.registerMiddleware()
    this.watchAuth()
  }

  registerMiddleware(): void {
    this.router.beforeEach((to) => {
      const publicPaths = ["/login", "/register", "/verify-otp", "/reset-password", "/forgot-password", "/verify-email"]
      const isPublic = publicPaths.includes(to.path)

      if (isPublic && !auth_store.value.logged_in) {
        return true
      }

      if (!auth_store.value.logged_in) {
        return "/login"
      }

      return true
    })
  }

  watchAuth(): void {
    watch(
      () => auth_store.value.logged_in,
      (loggedIn) => {
        if (!loggedIn) {
          this.router.push("/login")
        }
      }
    )
  }
}
