<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { computed, h, inject, onBeforeMount, ref } from 'vue'
import type { Gc as IGc } from '#/Gc'
const Gc = inject('Gc') as typeof IGc
const { verify_register_email_api } = Gc['services']['auth_services']
const { useRoute, useRouter } = Gc['router']
const route = useRoute()
const router = useRouter()
const isVerified = ref<boolean>(false)

const email = computed(() => String(route.params.email))

const handle_verify = async (): Promise<void> => {
  try {
    if (email.value) {
      await verify_register_email_api(email.value)
      isVerified.value = true
    }
  } catch (e) {
    console.log(e)
    isVerified.value = false
  }
}

const to_register = (): void => {
  router.push('/register')
}

const to_login = (): void => {
  router.push('/login')
}

onBeforeMount(async () => {
  await handle_verify()
})
</script>

<template>
  <a-layout class="layout" :style="{ backgroundImage: `url(${bgImage})` }">
    <a-layout class="layout-ctn">
      <a-layout-sider class="layout-left" width="60%">
        <img src="+/img/auth_background.jpg" class="image" />
      </a-layout-sider>
      <a-layout class="layout-right" width="40%">
        <a-layout-content class="login-ctn">
          <template v-if="isVerified">
            <a-result
              status="success"
              title="Successfully Verification!"
              sub-title="Please login again to continue."
            >
              <template #extra>
                <a-button key="console" type="primary" @click="to_login"
                  >Login to continute</a-button
                >
              </template>
            </a-result>
          </template>
          <template v-else>
            <a-result
              status="error"
              title="Verification failed"
              sub-title="Please check and try again."
            >
              <template #extra>
                <a-button key="console" type="primary" @click="to_register"
                  >Register again</a-button
                >
              </template>
            </a-result>
          </template>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>

<style scoped>
.layout {
  height: 100%;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.layout-left,
.layout-right {
  height: 100%;
}

.layout-ctn {
  display: flex;
  align-items: center;
}

.login-ctn {
  background: #fff;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
}

.login-form {
  width: 70%;
}

.forgot-pw {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.google-btn {
  width: 20%;
}

@media screen and (max-width: 992px) {
  .layout {
    background: url('@/assets/img/auth_background.jpg');
    background-position: center center;
    background-size: cover;
    background-repeat: no-repeat;
    height: 100vh;
  }

  .layout-ctn {
    flex-direction: column;
  }

  .layout-left {
    display: none;
  }

  .layout-right {
    width: 100% !important;
  }

  .login-form {
    width: 80%;
  }

  .google-btn {
    width: 80%;
  }
}
</style>
