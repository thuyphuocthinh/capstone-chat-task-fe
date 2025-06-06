import type { i_status_message_response } from "#/types/index";
import { http } from "./base";
import type { i_login, i_login_response, i_logout, i_otp, i_refresh_token, i_register, i_reset_password } from "#/types/auth_types";
import { error_services } from ".";

export const login_api = async (data: i_login): Promise<i_login_response> => {
  const url = "/auth/v1/login";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e);
    throw e
  }
}

export const refresh_token_api = async (data: i_refresh_token): Promise<i_login_response> => {
  const url = "/auth/v1/refresh-token";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e);
    throw e
  }
}

export const register_api = async (data: i_register): Promise<i_login_response> => {
  const url = "/auth/v1/register";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e);
    throw e
  }
}

export const logout_api = async (data: i_logout): Promise<i_status_message_response> => {
   const url = "/auth/v1/log-out";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e);
    throw e
  }
}

export const verify_otp_api = async (data: i_otp): Promise<i_status_message_response> => {
   const url = "/auth/v1/verify-otp";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e);
    throw e
  }
}

export const reset_password_api = async (data: i_reset_password): Promise<i_status_message_response> => {
   const url = "/auth/v1/reset-password";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e);
    throw e
  }
}
