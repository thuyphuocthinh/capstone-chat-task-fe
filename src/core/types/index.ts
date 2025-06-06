
export interface metadata {
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export interface i_status_response {
  status: string;
}

export interface i_status_message_response extends i_status_response {
  message: string;
}

export interface i_status_data_response extends i_status_response{
  data: Object;
}

export * as auth_type from "./auth_types";
