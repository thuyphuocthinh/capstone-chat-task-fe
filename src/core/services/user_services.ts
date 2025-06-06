import { error_services } from ".";
import type { i_status_user_response } from "#/types/user_types";
import { http } from "./base";

export const get_profile_api = async (): Promise<i_status_user_response> => {
  const url = "/users/profile";
  try {
    return await http.get(url);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}
