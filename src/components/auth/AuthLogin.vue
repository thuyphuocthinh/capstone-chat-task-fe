<script setup lang="ts">
import { reactive, inject, ref } from 'vue'
import type { Gc as IGc } from '#/Gc'
import type { i_login } from '#/types/auth_types'
const Gc = inject('Gc') as typeof IGc
const { log_in, google_log_in } = Gc['auth']
const { useRouter } = Gc['router']
import type { i_google_login_credentials } from '#/types/auth_types'

const router = useRouter()
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
    router.push('/test-workspace')
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
const handleGoogleCallback = async (response: i_google_login_credentials): Promise<void> => {
  try {
    await google_log_in({
      token: response.credential,
    })
    router.push('/test-workspace')
  } catch (e) {
    console.log(e)
  }
}
/** Google Login */
</script>

<template>
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
        <router-link to="/forgot-password" class="login-form-forgot">Forgot password</router-link>
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
</template>

<style scoped>
@import '+/css/auth.css';
</style>
