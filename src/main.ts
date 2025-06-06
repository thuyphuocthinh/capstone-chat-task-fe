import "@/assets/css/base.css";
import Antd from 'ant-design-vue';
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
  app.use(createPinia())
  app.use(router)
  app.use(SetupGc);
  app.mount('#app')
}

init_app();

