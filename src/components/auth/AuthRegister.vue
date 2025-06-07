<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { reactive, inject, ref } from 'vue'
import type { i_register } from '#/types/auth_types'
import type { Gc as IGc } from '#/Gc'
import { set_noti_mess } from '#/stores/noti_store'
const Gc = inject('Gc') as typeof IGc
const { register_api } = Gc['services']['auth_services']

const isLoading = ref<boolean>(false)

const formState = reactive<i_register>({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
})

const reset = (): void => {
  formState.email = ''
  formState.firstName = ''
  formState.lastName = ''
  formState.password = ''
}

const onFinish = async (values: i_register): Promise<void> => {
  isLoading.value = true
  try {
    const res = await register_api(values)
    set_noti_mess({
      error: false,
      message: res.message,
    })
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
</script>

<template>
  <a-typography-title :level="2">Register</a-typography-title>
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
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item
      label="First name"
      name="firstName"
      :rules="[{ required: true, message: 'Please input your firstname!' }]"
    >
      <a-input v-model:value="formState.firstName" />
    </a-form-item>

    <a-form-item
      label="Last name"
      name="lastName"
      :rules="[{ required: true, message: 'Please input your lastname!' }]"
    >
      <a-input v-model:value="formState.lastName" />
    </a-form-item>

    <div class="forgot-pw">
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
.forgot-pw {
  justify-content: flex-end;
}
</style>
