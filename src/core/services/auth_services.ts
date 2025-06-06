import type { i_status_message_response } from "#/types/index";
import { http, authHttp } from "./base";
import type { i_login, i_login_response, i_logout, i_otp, i_refresh_token, i_register, i_reset_password, i_forgot_password } from "#/types/auth_types";
import { error_services } from ".";

export const login_api = async (data: i_login): Promise<i_login_response> => {
  const url = "/auth/login";
  try {
    return await authHttp.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}

export const refresh_token_api = async (data: i_refresh_token): Promise<i_login_response> => {
  const url = "/auth/refresh-token";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}

export const register_api = async (data: i_register): Promise<i_status_message_response> => {
  const url = "/auth/register";
  try {
    return await authHttp.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}

export const logout_api = async (data: i_logout): Promise<i_status_message_response> => {
   const url = "/auth/log-out";
  try {
    return await http.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}

export const forgot_password_api = async (data: i_forgot_password): Promise<i_status_message_response> => {
   const url = "/auth/forgot-password";
  try {
    return await authHttp.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}

export const verify_otp_api = async (data: i_otp): Promise<i_status_message_response> => {
   const url = "/auth/verify-otp";
  try {
    return await authHttp.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}

export const reset_password_api = async (data: i_reset_password): Promise<i_status_message_response> => {
   const url = "/auth/reset-password";
  try {
    return await authHttp.post(url, data);
  } catch (e: any) {
    error_services(e.message);
    throw e
  }
}
