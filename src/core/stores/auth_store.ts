import {ref, watch} from "vue";
import type { i_auth_store } from "#/types/auth_types";

export const KEY_LOCALSTORAGE = {
  access_token: "access_token",
  refresh_token: "refresh_token"
}

export const get_token_storage = (key: string): string | null => {
  const token = localStorage.getItem(key);
  return token;
}

export const set_token_storage = (key: string, token: string | null): void => {
  if(token) {
    localStorage.setItem(key, token);
  } else {
    localStorage.removeItem(key);
  }
}

export const auth_store = ref<i_auth_store>({
  user: null,
  logged_in: false,
  access_token: get_token_storage(KEY_LOCALSTORAGE.access_token),
  refresh_token: get_token_storage(KEY_LOCALSTORAGE.refresh_token)
})

export const clear_auth_store_data = (): void => {
  auth_store.value.user = null;
  auth_store.value.logged_in = false;
  auth_store.value.access_token = null;
  auth_store.value.refresh_token = null;
}


watch(() => auth_store.value.access_token, (newVal) => {
  set_token_storage(KEY_LOCALSTORAGE.access_token, newVal)
})

watch(() => auth_store.value.refresh_token, (newVal) => {
  set_token_storage(KEY_LOCALSTORAGE.refresh_token, newVal);
})

window.addEventListener("storage", (e) => {
  try {
    if(e.key == KEY_LOCALSTORAGE.access_token || e.key == KEY_LOCALSTORAGE.refresh_token) {
      window.location.reload();
    }
  } catch (e) {
    console.log(e)
  }
})
