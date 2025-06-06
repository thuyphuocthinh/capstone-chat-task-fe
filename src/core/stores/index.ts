import { clear_auth_store_data } from "./auth_store";

export * as auth_store from "./auth_store";
export * as noti_store from "./noti_store";

export const clear_data_stores = async (): Promise<void> => {
  try {
    await Promise.all([
      clear_auth_store_data()
    ])
  } catch (e) {
    console.log(e)
  }
  window.location.assign("/login");
}
