import { set_noti_mess } from "#/stores/noti_store";

export * as auth_services from "./auth_services";
export * as base_service from "./base"
export * as workspace_services from "./workspace_services";
export * as user_services from "./user_services"

export const error_services = (error: string): void => {
	set_noti_mess({
    error: true,
    message: error
  })
};
