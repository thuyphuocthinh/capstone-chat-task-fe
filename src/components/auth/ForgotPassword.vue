<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { reactive, inject, ref } from 'vue'
import type { i_forgot_password } from '#/types/auth_types'
import type { Gc as IGc } from '#/Gc'
import { set_noti_mess } from '#/stores/noti_store'
const Gc = inject('Gc') as typeof IGc
const { forgot_password_api } = Gc['services']['auth_services']
const { useRouter } = Gc['router']

const router = useRouter()

const formState = reactive<i_forgot_password>({
  email: '',
})

const isLoading = ref<boolean>(false)

const onFinish = async (values: i_forgot_password): Promise<void> => {
  try {
    isLoading.value = true
    const res = await forgot_password_api(values)
    set_noti_mess({
      error: false,
      message: res.message,
    })
    router.push('/verify-otp')
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
  <a-typography-title :level="2">Forgot password</a-typography-title>
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
      label="Email"
      name="email"
      :rules="[
        { required: true, message: 'Please input your email!' },
        { type: 'email', message: 'The input is not valid E-mail!' },
      ]"
    >
      <a-input v-model:value="formState.email" />
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
</template>

<style scoped>
@import '+/css/auth.css';
</style>
