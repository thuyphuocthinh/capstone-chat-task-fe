<script setup lang="ts">
import bgImage from '+/img/auth_background.jpg'
import { reactive } from 'vue'

interface FormState {
  email: string
  password: string
  remember: boolean
}

const formState = reactive<FormState>({
  email: '',
  password: '',
  remember: true,
})
const onFinish = (values: any): void => {
  console.log('Success:', values)
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
          <a-typography-title :level="2">Login</a-typography-title>
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
              :rules="[{ required: true, message: 'Please input your password!' }]"
            >
              <a-input-password v-model:value="formState.password" />
            </a-form-item>

            <a-form-item>
              <a-button type="primary" html-type="submit" style="width: 100%">Submit</a-button>
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

@media screen and (max-width: 992px) {
  .layout {
    /* background: url('+/img/auth_background.jpg'); */
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
}
</style>
