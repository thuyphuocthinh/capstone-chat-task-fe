<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { reactive, h, inject, ref } from 'vue'
import type { Gc as IGc } from '#/Gc'
import type { i_reset_password } from '#/types/auth_types'
const Gc = inject('Gc') as typeof IGc
const { reset_password_api } = Gc['services']['auth_services']

const isLoading = ref<boolean>(false)

const formData = reactive<i_reset_password>({
  confirmPassword: '',
  password: '',
  email: '',
})

const reset = (): void => {
  formData.email = ''
  formData.password = ''
  formData.confirmPassword = ''
}

const onFinish = async (values: i_reset_password): Promise<void> => {
  try {
    isLoading.value = true
    await reset_password_api(values)
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

const validateConfirmPassword = (_: any, value: string) => {
  if (!value || value === formData.password) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Passwords do not match!'))
}
</script>

<template>
  <a-typography-title :level="2">Reset Password</a-typography-title>
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

    <a-form-item
      label="Confirm password"
      name="confirmPassword"
      :rules="[
        { required: true, message: 'Please confirm your password!' },
        {
          validator: validateConfirmPassword,
        },
      ]"
    >
      <a-input-password v-model:value="formData.confirmPassword" />
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
</template>

<style scoped>
@import '+/css/auth.css';
</style>
