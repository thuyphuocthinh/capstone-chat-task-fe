import "@/assets/css/base.css";
import Antd from 'ant-design-vue';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import 'ant-design-vue/dist/reset.css';
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from '#/router'
import { SetupGc } from "#/Gc";

declare global {
	interface Window {
		_Gc_?: () => any;
	}
}


const init_app = async (): Promise<void> => {
  const app = createApp(App)
  app.use(Antd);
  app.use(Vue3Toastify, {
    autoClose: 3000
  } as ToastContainerOptions,)
  app.use(createPinia())
  app.use(router)
  app.use(SetupGc);
  app.mount('#app')
}

init_app();

