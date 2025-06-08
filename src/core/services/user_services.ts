import { error_services } from ".";
import type { i_change_password, i_change_profile, i_status_user_response, i_users_response } from "#/types/user_types";
import { http } from "./base";

export const get_profile_api = async (): Promise<i_status_user_response> => {
  const url = "/users/profile";
  try {
    return await http.get(url);
  } catch (e: any) {
    error_services(e.response?.data.message || "Error API");
    throw e
  }
}

export const find_users_by_email_api = async (email: string, page: number = 1, paging: number = 10): Promise<i_users_response> => {
  const url = `/users/profile?email=${email}&page=${page}&paging=${paging}`;
  try {
    return await http.get(url);
  } catch (e: any) {
    error_services(e.response?.data.message || "Error API");
    throw e
  }
}

export const get_user_by_id = async (id: string): Promise<i_status_user_response> => {
  const url = `/users/${id}`;
  try {
    return await http.get(url);
  } catch (e: any) {
    error_services(e.response?.data.message || "Error API");
    throw e
  }
}


export const change_profile_api = async (data: i_change_profile): Promise<i_status_user_response> => {
  const url = `/users/profile`;
  try {
    return await http.patch(url, data);
  } catch (e: any) {
    error_services(e.response?.data.message || "Error API");
    throw e
  }
}

export const change_password_api = async (data: i_change_password): Promise<i_status_user_response> => {
  const url = `/users/profile/change-password`;
  try {
    return await http.patch(url, data);
  } catch (e: any) {
    error_services(e.response?.data.message || "Error API");
    throw e
  }
}

export const change_avatar_api = async (formData: FormData): Promise<i_status_user_response> => {
  const url = `/users/profile/change-avatar`;

  try {
    return await http.patch(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  } catch (e: any) {
    error_services(e.response?.data.message || "Error API");
    throw e;
  }
};
