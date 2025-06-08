<template>
  <div class="header-ctn">
    <div class="header-left">
      <div class="header-item workspace-btn" @click="router.push(`/workspaces?page=1`)">
        <img src="+/icons/i_workspace.svg" />
      </div>
      <div class="header-item app-name">Slack</div>
    </div>

    <div class="header-right">
      <div class="header-item notification-btn">
        <img src="+/icons/i_notification.svg" />
        <span class="notification-count"> 9+ </span>
      </div>

      <div class="header-item profile-btn">
        <a-avatar style="background-color: #64b5f6">
          <template #icon>
            <a-dropdown placement="bottomRight" arrow>
              <UserOutlined v-if="!auth_store.user?.avatar" />
              <img v-else :src="auth_store.user?.avatar" />
              <template #overlay>
                <a-menu class="dropdown-menu">
                  <div class="dropdown-menu__welcome">
                    Hi, {{ auth_store.user?.firstName + ' ' + auth_store.user?.lastName }}
                  </div>
                  <a-menu-item @click="setShowPopUp">
                    <a href="javascript:;">Profile</a>
                  </a-menu-item>
                  <a-menu-item @click="showLogoutConfirm">
                    <a href="javascript:;">Logout</a>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </a-avatar>
      </div>
    </div>

    <PopupContainer
      v-if="isShowPopUp"
      :width="700"
      title="Profile"
      :footer="false"
      :cancelFunc="setHidePopUp"
    >
      <ProfileTabs />
    </PopupContainer>
  </div>
</template>

<script setup lang="ts">
import { UserOutlined } from '@ant-design/icons-vue'
import { auth_store } from '#/stores/auth_store'
import { log_out } from '#/auth'
import { inject, ref } from 'vue'
import type { Gc as IGc } from '#/Gc'
import { PopupContainer } from '@/common'
import { ProfileTabs } from '@/profiles'

const Gc = inject('Gc') as typeof IGc
const { useConfirm } = Gc['modules']['modal_confirm']
const { useRouter } = Gc['router']
const router = useRouter()

const showLogoutConfirm = (): void => {
  const confirm = useConfirm()
  confirm({
    title: 'Do you want to logout?',
    content: 'Are you sure you want to logout?',
    onOk: async () => {
      await log_out()
    },
    isDanger: true,
  })
}

const isShowPopUp = ref<boolean>(false)
const setShowPopUp = (): void => {
  isShowPopUp.value = true
}
const setHidePopUp = (): void => {
  isShowPopUp.value = false
}
</script>

<style scoped>
.header-ctn {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: var(--color-white);
  height: 60px;
  background-color: var(--color-primary-dark) !important;
  padding: 0 var(--space-xl);
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
}

.workspace-btn {
  width: 22px;
  cursor: pointer;
}

.workspace-btn img {
  width: 20px;
}

.app-name {
  font-size: 18px;
  font-weight: 600;
}

.notification-btn {
  position: relative;
  cursor: pointer;
  top: 3px;
}

.notification-btn img {
  width: 22px;
  height: 22px;
}

.notification-count {
  position: absolute;
  background-color: var(--color-danger);
  color: var(--color-white);
  font-size: var(--font-xs);
  width: 20px;
  height: 20px;
  border-radius: var(--radius-rounded);
  display: flex;
  align-items: center;
  justify-content: center;
  top: -8px;
  right: -6px;
}

.profile-btn:hover {
  cursor: pointer;
}

.profile-btn .ant-avatar {
  width: 30px;
  height: 30px;
}

.dropdown-menu {
  width: 200px;
}

.dropdown-menu__welcome {
  text-align: center;
  font-weight: 600;
  padding: var(--space-xs) 0;
}
</style>
