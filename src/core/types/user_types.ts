import type { i_status_response } from ".";

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


export interface i_status_user_response extends i_status_response {
  data: i_user;
}
