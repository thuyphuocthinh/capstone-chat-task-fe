<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { reactive, h, inject, ref } from 'vue'
import { GoogleOutlined } from '@ant-design/icons-vue'
import type { Gc as IGc } from '#/Gc'
import type { i_login } from '#/types/auth_types'
const Gc = inject('Gc') as typeof IGc
const { log_in } = Gc['auth']

const isLoading = ref<boolean>(false)

const formData = reactive<i_login>({
  email: '',
  password: '',
})

const reset = (): void => {
  formData.email = ''
  formData.password = ''
}

const onFinish = async (values: i_login): Promise<void> => {
  try {
    isLoading.value = true
    await log_in(values)
    reset()
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

/** Google Login */
const handleGoogleCallback = (): void => {}
/** Google Login */
</script>

<template>
  <a-layout class="layout" :style="{ backgroundImage: `url(${bgImage})` }">
    <a-layout class="layout-ctn">
      <a-layout-sider class="layout-left" width="60%">
        <img src="+/img/auth_background.jpg" class="image" />
      </a-layout-sider>
      <a-layout class="layout-right" width="40%">
        <a-layout-content class="login-ctn">
          <a-typography-title :level="2">Login</a-typography-title>
          <a-form
            class="login-form"
            :model="formData"
            name="basic"
            autocomplete="off"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            layout="vertical"
          >
            <a-form-item
              label="Email"
              name="email"
              :rules="[
                { required: true, message: 'Please input your email!' },
                { type: 'email', message: 'The input is not valid E-mail!' },
              ]"
            >
              <a-input v-model:value="formData.email" />
            </a-form-item>

            <a-form-item
              label="Password"
              name="password"
              :rules="[
                { required: true, message: 'Please input your password!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    'Password must be at least 8 characters and include both uppercase and lowercase letters.',
                },
              ]"
            >
              <a-input-password v-model:value="formData.password" />
            </a-form-item>

            <div class="forgot-pw">
              <a-form-item>
                <router-link to="/register" class="login-form-forgot">Register</router-link>
              </a-form-item>

              <a-form-item>
                <router-link to="/forgot-password" class="login-form-forgot"
                  >Forgot password</router-link
                >
              </a-form-item>
            </div>

            <a-form-item>
              <a-button type="primary" html-type="submit" style="width: 100%" :loading="isLoading"
                >Submit</a-button
              >
            </a-form-item>
          </a-form>
          <a-typography-title :level="5">Or using</a-typography-title>
          <GoogleLogin :callback="handleGoogleCallback" />
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
