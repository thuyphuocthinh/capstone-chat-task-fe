import type { i_status_response } from "./index";
import type { i_user } from "./user_types";

export interface i_login {
  email: string;
  password: string;
}

export interface i_register {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface i_refresh_token {
  refreshToken: string;
}

export interface i_otp {
  otp: string;
}

export interface i_forgot_password {
  email: string;
}

export interface i_reset_password {
  password: string;
  confirmPassword: string;
  email: string;
}

export interface i_logout {
  refreshToken: string;
}

export interface i_login_response extends i_status_response {
  data: {
    refreshToken: string;
    accessToken: string;
  }
}

export interface i_auth_store {
  user: i_user | null;
	logged_in: boolean;
	access_token: string | null;
	refresh_token: string | null;
}
