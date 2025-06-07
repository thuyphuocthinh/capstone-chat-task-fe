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
  <template v-if="isVerified">
    <a-result
      status="success"
      title="Successfully Verification!"
      sub-title="Please login again to continue."
    >
      <template #extra>
        <a-button key="console" type="primary" @click="to_login">Login to continute</a-button>
      </template>
    </a-result>
  </template>
  <template v-else>
    <a-result status="error" title="Verification failed" sub-title="Please check and try again.">
      <template #extra>
        <a-button key="console" type="primary" @click="to_register">Register again</a-button>
      </template>
    </a-result>
  </template>
</template>

<style scoped>
@import '+/css/auth.css';
</style>
