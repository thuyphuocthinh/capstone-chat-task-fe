import type {
  i_change_role_workspace,
  i_create_workspace,
  i_update_workspace,
  i_add_member_workspace,
  i_workspace_detail_response,
  i_workspaces_response
} from "#/types/workspace_types"

import type { i_status_message_response } from "#/types";

import { http } from "#/services/base";
import { error_services } from ".";

export const get_list_workspaces_api = async (page: number = 1, paging: number = 10): Promise<i_workspaces_response> => {
  const url = `/workspaces?page=${page}&paging=${paging}`;
    try {
      return await http.get(url);
    } catch (e: any) {
      error_services(e.response?.data.message);
      throw e
    }
}

export const find_workspaces_api = async (name: string = "", page: number = 1, paging: number = 10): Promise<i_workspaces_response> => {
  const url = `/workspaces/find?name=${name}&page=${page}&paging=${paging}`;
    try {
      return await http.get(url);
    } catch (e: any) {
     error_services(e.response?.data.message);
      throw e
    }
}

export const create_workspace_api = async (data: i_create_workspace): Promise<i_workspace_detail_response> => {
  const url = "/workspaces";
    try {
      return await http.post(url, data);
    } catch (e: any) {
      error_services(e.response?.data.message);
      throw e
    }
}


export const update_workspace_api = async (id: string, data: i_update_workspace): Promise<i_workspaces_response> => {
  const url = `/workspaces/${id}`;
    try {
      return await http.patch(url, data);
    } catch (e: any) {
      error_services(e.response?.data.message);
      throw e
    }
}

export const add_member_workspace_api = async (id: string, data: i_add_member_workspace): Promise<i_status_message_response> => {
  const url = `/workspaces/$${id}`;
    try {
      return await http.post(url, data);
    } catch (e: any) {
      error_services(e.response?.data.message);
      throw e
    }
}

export const remove_member_workspace_api = async (workspaceId: string, memberId: string): Promise<i_status_message_response> => {
  const url = `/workspaces/$${workspaceId}/remove-member/${memberId}`;
    try {
      return await http.delete(url);
    } catch (e: any) {
      error_services(e.response?.data.message);
      throw e
    }
}

export const change_role_member_workspace_api = async (workspaceId: string, memberId: string, data: i_change_role_workspace): Promise<i_status_message_response> => {
  const url = `/workspaces/$${workspaceId}/members/${memberId}/change-role`;
    try {
      return await http.patch(url, data);
    } catch (e: any) {
      error_services(e.response?.data.message);
      throw e
    }
}
