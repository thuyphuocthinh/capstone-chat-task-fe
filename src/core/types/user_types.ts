import type { i_status_response, metadata } from ".";

export type ROLE = "MEMBER" | "ADMIN";

export interface i_user {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
  avatar?: string;
  role: ROLE;
  status: string;
}

export interface i_change_password {
  currentPassword: string;
  newPassword: string
  confirmPassword: string
}

export interface i_change_profile {
  firstName: string;
  lastName: string
}

export interface i_status_user_response extends i_status_response {
  data: i_user;
}

export interface i_users_response extends i_status_response {
  metadat: metadata,
  data: Array<i_user>
}
