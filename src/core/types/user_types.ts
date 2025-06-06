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
