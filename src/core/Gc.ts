import * as types from "./types";
import * as services from "./services";
import * as stores from "./stores";
import * as auth from "./auth";
import * as modules from "./modules"
import type { App } from "vue";
import { useRouter, useRoute } from "vue-router";

export const Gc = {
  auth,
  types,
  services,
  stores,
  modules,
  router: {
		useRouter: useRouter,
		useRoute: useRoute
	},
}

export const SetupGc = {
	install: (app: App): void => {
		window._Gc_ = (): typeof Gc => {
			return Gc;
		};
		app.config.globalProperties.Gc = Gc;
		app.provide("Gc", Gc);
	}
};
