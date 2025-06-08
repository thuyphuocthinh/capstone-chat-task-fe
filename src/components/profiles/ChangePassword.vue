<script setup lang="ts">
import { reactive, inject, ref, onBeforeUnmount, onUnmounted } from 'vue'
import type { i_change_password } from '#/types/user_types'
import type { Gc as IGc } from '#/Gc'
import type { FormInstance } from 'ant-design-vue'
import { set_noti_mess } from '#/stores/noti_store'

const Gc = inject('Gc') as typeof IGc
const { register_api } = Gc['services']['auth_services']

const isLoading = ref<boolean>(false)
const formRef = ref<FormInstance>()

const formState = reactive<i_change_password>({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

const reset = (): void => {
  formState.currentPassword = ''
  formState.newPassword = ''
  formState.confirmPassword = ''
}

const onFinish = async (values: i_change_password): Promise<void> => {
  isLoading.value = true
  try {
    // const res = await register_api(values)
    // set_noti_mess({
    //   error: false,
    //   message: res.message,
    // })
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
  if (!value || value === formState.newPassword) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Passwords do not match!'))
}

onUnmounted(() => {
  if (formRef.value) {
    formRef?.value.clearValidate(['currentPassword', 'newPassword', 'confirmPassword'])
  }
})
</script>

<template>
  <a-form
    class="login-form"
    :model="formState"
    ref="formRef"
    name="basic"
    autocomplete="off"
    @finish="onFinish"
    @finishFailed="onFinishFailed"
    layout="vertical"
  >
    <a-form-item
      label="Current password"
      name="currentPassword"
      :rules="[
        { required: true, message: 'Please input your current password!' },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          message:
            'Password must be at least 8 characters and include both uppercase and lowercase letters.',
        },
      ]"
    >
      <a-input-password v-model:value="formState.currentPassword" />
    </a-form-item>
    <a-form-item
      label="New password"
      name="newPassword"
      :rules="[
        { required: true, message: 'Please input your new password!' },
        {
          pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          message:
            'Password must be at least 8 characters and include both uppercase and lowercase letters.',
        },
      ]"
    >
      <a-input-password v-model:value="formState.newPassword" />
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
      <a-input-password v-model:value="formState.confirmPassword" />
    </a-form-item>

    <a-form-item>
      <a-button type="primary" html-type="submit" style="width: 100%" :loading="isLoading"
        >Update</a-button
      >
    </a-form-item>
  </a-form>
</template>

<style scoped>
.login-form {
  width: 80%;
  margin: auto;
}
</style>
