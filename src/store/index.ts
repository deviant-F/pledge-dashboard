import Vue from "vue";
import Vuex from "vuex";
import filters, { TFilterState } from "./modules/filters";
import notifications, { TNotiState } from "./modules/notifications";

Vue.use(Vuex);

export type TRootState = {
  filters: TFilterState;
  notifications: TNotiState;
};

export default new Vuex.Store({
  modules: {
    filters,
    notifications
  },
  strict: true
});
