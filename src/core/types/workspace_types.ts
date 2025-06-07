import type { i_status_response, metadata } from ".";

export type WORKSPACE_USER_ROLE = "HOST" | "MODERATOR" | "MEMBER";

export interface i_member_workspace {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  roleInWorkspace: string;
}

export interface i_workspace {
  id: string;
  name: string;
  members: Array<i_member_workspace>;
  host: i_member_workspace
}

export interface i_create_workspace {
  name: string;
}

export interface i_update_workspace {
  name: string;
}

export interface i_add_member_workspace {
  userId: string;
  role: WORKSPACE_USER_ROLE
}

export interface i_change_role_workspace {
  role: WORKSPACE_USER_ROLE
}

export interface i_workspace_detail_response extends i_status_response {
  data: i_workspace
}

export interface i_workspaces_response extends i_status_response, metadata {
  data: i_workspace
}

