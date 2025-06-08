import { clear_auth_store_data } from "./auth_store";
import { init_worskpaces_store, clear_workspaces_store } from "./workspace_store";

export * as auth_store from "./auth_store";
export * as noti_store from "./noti_store";
export * as workspace_store from "./workspace_store"


export const clear_data_stores = async (): Promise<void> => {
  try {
    await Promise.all([
      clear_auth_store_data(),
      clear_workspaces_store()
    ])
  } catch (e) {
    console.log(e)
  }
  window.location.assign("/login");
}

export const init_data_stores = async (): Promise<void> => {
  try {
    await Promise.all([])
  } catch (e) {
    console.log(e)
  }
}


export const init_loggined_data_stores = async (): Promise<void> => {
  try {
    await Promise.all([
      init_worskpaces_store()
    ])
  } catch (e) {
    console.log(e)
  }
}
