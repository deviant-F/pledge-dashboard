import Vuex, { GetterTree, MutationTree, ActionTree } from "vuex";
import { TRootState } from "../index";
import { fetchNotification } from "../../services/api";

type TMessage = {
  link: string;
  message: string;
};

export type TNotiState = {
  notifications: Array<TMessage>;
};

enum MessageBase {
  Create = "{{creator}} just launch a new project ({{project}}) with ${{goal}}",
  Funded = "{{project}} just has {{funded}}% funded",
  Milestone = "{{project}} completes a new milestone {{milestone}}",
  Update = "{{project}} has a new update: {{update}}."
}

const state = {
  notifications: []
};

const getters: GetterTree<TNotiState, TRootState> = {
  getMessageList: () => {
    debugger;
  }
};

const actions: ActionTree<TNotiState, TRootState> = {
  fetchNotification: async ({ commit, rootState }) => {
    const filters = rootState.filters;
    const notification = await fetchNotification(filters);

    if (notification) {
      commit("addNotification", notification);
    }
  }
};

const mutations: MutationTree<TNotiState> = {
  addNotification(state, notification) {
    state.notifications.push(notification);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
