import Vuex, { MutationTree, ActionTree } from "vuex";
import { TFilter } from "../../utils/project";

const state = {
  funded: 0,
  goal: [0, -1]
};

const actions: ActionTree<TFilter, TFilter> = {
  changeFunded: ({ commit }, percentage: number) => {
    commit("changeFunded", percentage);
  },

  changeGoal: ({ commit }, range: [number, number]) => {
    commit("changeGoal", range);
  }
};

const mutations: MutationTree<TFilter> = {
  changeFunded(state, percentage: number) {
    state.funded = percentage;
  },
  changeGoal(state, range: [number, number]) {
    state.goal = range;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
