<template>
  <div class="profile-ctn">
    <div class="profile-left">
      <a-form
        class="login-form"
        :model="formState"
        name="basic"
        autocomplete="off"
        @finish="onChangeProfile"
        @finishFailed="onFinishFailed"
        layout="vertical"
      >
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
          :rules="[{ required: true, message: 'Please input your lastName!' }]"
        >
          <a-input v-model:value="formState.lastName" />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" style="width: 100%" :loading="isLoading"
            >Update</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <div class="profile-right">
      <a-avatar shape="square" size="large">
        <template #icon>
          <UserOutlined v-if="auth_store.user && !auth_store.user.avatar" class="profile-img" />
          <img
            :src="auth_store.user.avatar"
            v-else-if="auth_store.user && auth_store.user.avatar"
            class="profile-img"
          />
        </template>
      </a-avatar>
      <a-upload
        :multiple="false"
        maxCount="1"
        accept="image/*"
        :before-upload="beforeUpload"
        :show-upload-list="false"
      >
        <a-button :loading="isUploading">
          <upload-outlined></upload-outlined>
          Upload
        </a-button>
      </a-upload>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, inject } from 'vue'
import type { i_change_profile } from '#/types/user_types'
import type { Gc as IGc } from '#/Gc'
import { set_noti_mess } from '#/stores/noti_store'
import { UploadOutlined } from '@ant-design/icons-vue'
import type { UploadChangeParam } from 'ant-design-vue'
import { message } from 'ant-design-vue'

const Gc = inject('Gc') as typeof IGc

const { auth_store } = Gc['stores']['auth_store']
const { change_profile_api, change_avatar_api } = Gc['services']['user_services']

const isLoading = ref<boolean>(false)

const formState = reactive<i_change_profile>({
  firstName: auth_store.value.user?.firstName || '',
  lastName: auth_store?.value.user?.lastName || '',
})

const onChangeProfile = async (values: i_change_profile): Promise<void> => {
  isLoading.value = true
  try {
    const res = await change_profile_api(values)
    set_noti_mess({
      error: false,
      message: res.status,
    })
    auth_store.value.user = res.data
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

const MAX_SIZE_MB = 2

const isUploading = ref<boolean>(false)

const beforeUpload = (file: File): boolean => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < MAX_SIZE_MB

  if (!isImage) {
    message.error('Chỉ được upload hình ảnh!')
    return false
  }

  if (!isLt2M) {
    message.error(`Ảnh phải nhỏ hơn ${MAX_SIZE_MB}MB!`)
    return false
  }

  handleChangeAvatar(file)
  return false // ngăn auto upload
}

const handleChangeAvatar = async (file: File): Promise<void> => {
  try {
    isUploading.value = true
    const formData = new FormData()
    formData.append('avatar', file)

    const res = await change_avatar_api(formData)
    set_noti_mess({
      error: false,
      message: res.status,
    })
    auth_store.value.user = res.data
  } catch (error) {
    console.error('Lỗi upload:', error)
  } finally {
    isUploading.value = false
  }
}
</script>

<style scoped>
.profile-ctn {
  display: flex;
}

.profile-left {
  width: 60%;
}

.profile-right {
  width: 40%;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: var(--space-md);
}

.ant-avatar-lg {
  width: 120px;
  height: 120px;
}

.profile-img {
  width: 100%;
}
</style>
