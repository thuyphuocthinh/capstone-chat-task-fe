import { computed } from "vue";
import { auth_store } from "#/stores/auth_store";
import { login_api, logout_api, google_login_api } from "#/services/auth_services";
import type { i_login, i_logout, i_google_login } from "#/types/auth_types";
import { get_profile_api } from "#/services/user_services";
import { clear_data_stores } from "#/stores";

// check user_loggined ?
export const auth_logged_in = computed(() => {
  if(auth_store.value.logged_in) return true;
  else return false;
})

export const log_in = async (data: i_login): Promise<void> => {
  try {
    await login_api(data).then(async (res) => {

      const accessToken = "Bearer " + res["data"].accessToken;
      const refreshToken = res["data"].refreshToken;

      auth_store.value.access_token = accessToken;
      auth_store.value.refresh_token = refreshToken;

      try {
        await fetch_user_profile();
      } catch (e) {
        console.log(e)
      }
    })
  } catch (e) {
    throw e
  }
}

export const google_log_in = async (data: i_google_login): Promise<void> => {
  try {
    await google_login_api(data).then(async (res) => {

      const accessToken = "Bearer " + res["data"].accessToken;
      const refreshToken = res["data"].refreshToken;

      auth_store.value.access_token = accessToken;
      auth_store.value.refresh_token = refreshToken;

      try {
        await fetch_user_profile();
      } catch (e) {
        console.log(e)
      }
    })
  } catch (e) {
    throw e
  }
}

// fetch_user_profile
export const fetch_user_profile = async (): Promise<void> => {
  try {
    if(auth_store.value.access_token) {
      const res = await get_profile_api();
      auth_store.value.user = res["data"];
      auth_store.value.logged_in = true;
    }
  } catch (e) {
    console.log(e)
  }
}

// log_out
export const log_out = async (): Promise<void> => {
  try {
    const data: i_logout = {refreshToken: auth_store.value.refresh_token as string};
    await logout_api(data);
  } catch (e) {
    console.log(e);
  }
  console.log("--> on clear all data stores")
  clear_data_stores();
}


