import "+/css/base.css";
import Antd from 'ant-design-vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '#/router'
import { SetupGc } from "#/Gc";
import vue3GoogleLogin from 'vue3-google-login'
import { fetch_user_profile } from "#/auth";

import { init_data_stores } from "#/stores";

declare global {
	interface Window {
		_Gc_?: () => any;
	}
}


const init_app = async (): Promise<void> => {
  try {
    await fetch_user_profile();
  } catch (e) {
    console.log(e);
  }

  try {
    await init_data_stores();
  } catch (e) {
    console.log(e)
  }

  const app = createApp(App)
  app.use(Antd);
  app.use(Vue3Toastify, {
    autoClose: 3000
  } as ToastContainerOptions,)
  app.use(createPinia())
  app.use(router)
  app.use(SetupGc);
  app.use(vue3GoogleLogin, {
    clientId: import.meta.env.VITE_GOOGLE_CLIENT_ID
  })
  app.mount('#app')
}

init_app();

