import { set_noti_mess } from "#/stores/noti_store";

export * as auth_services from "./auth_services";

export const error_services = (error: string): void => {
	set_noti_mess({
    error: true,
    message: error
  })
};
