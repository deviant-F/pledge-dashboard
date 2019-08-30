import Vuex, { MutationTree, ActionTree } from "vuex";

export type FilterState = {
  funded: number;
  goal: [number, number?];
};

const state = {
  funded: 0,
  goal: [0, null]
};

const actions: ActionTree<FilterState, FilterState> = {
  changeFunded: ({ commit }, percentage: number) => {
    commit("changeFunded", percentage);
  },

  changeGoal: ({ commit }, range: [number, number?]) => {
    commit("changeGoal", range);
  }
};

const mutations: MutationTree<FilterState> = {
  changeFunded(state, percentage: number) {
    state.funded = percentage;
  },
  changeGoal(state, range: [number, number?]) {
    state.goal = range;
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations
};
