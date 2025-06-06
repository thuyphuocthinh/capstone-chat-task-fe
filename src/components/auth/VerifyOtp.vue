<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { reactive, inject, ref } from 'vue'
import type { i_otp } from '#/types/auth_types'
import type { Gc as IGc } from '#/Gc'
import { set_noti_mess } from '@/core/stores/noti_store'
const Gc = inject('Gc') as typeof IGc
const { verify_otp_api } = Gc['services']['auth_services']

const formState = reactive<i_otp>({
  otp: '',
})

const isLoading = ref<boolean>(false)

const onFinish = async (values: i_otp): Promise<void> => {
  try {
    isLoading.value = true
    const res = await verify_otp_api(values)
    set_noti_mess({
      error: false,
      message: res.message,
    })
  } catch (e) {
    console.log(e)
  } finally {
    setTimeout(() => {
      isLoading.value = false
    }, 500)
  }
}

const onFinishFailed = (errorInfo: any): void => {
  console.log('Failed:', errorInfo)
}
</script>

<template>
  <a-layout class="layout" :style="{ backgroundImage: `url(${bgImage})` }">
    <a-layout class="layout-ctn">
      <a-layout-sider class="layout-left" width="60%">
        <img src="+/img/auth_background.jpg" class="image" />
      </a-layout-sider>
      <a-layout class="layout-right" width="40%">
        <a-layout-content class="login-ctn">
          <a-typography-title :level="2">Verify OTP</a-typography-title>
          <a-form
            class="login-form"
            :model="formState"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            layout="vertical"
          >
            <a-form-item
              label="OTP"
              name="otp"
              :rules="[{ required: true, message: 'Please input otp!' }]"
            >
              <a-input v-model:value="formState.otp" />
            </a-form-item>

            <div class="forgot-pw">
              <a-form-item>
                <router-link to="/register" class="login-form-forgot">Register</router-link>
              </a-form-item>

              <a-form-item>
                <router-link to="/login" class="login-form-forgot">Login</router-link>
              </a-form-item>
            </div>

            <a-form-item>
              <a-button type="primary" html-type="submit" style="width: 100%" :loading="isLoading"
                >Submit</a-button
              >
            </a-form-item>
          </a-form>
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
