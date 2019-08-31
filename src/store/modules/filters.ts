import Vuex, { MutationTree, ActionTree } from "vuex";
import { TFilter } from "../../utils/project";

export type TFilterState = TFilter;

const defaultState: TFilter = {
  funded: 0,
  goal: [0, -1]
};

const state = { ...defaultState };

const actions: ActionTree<TFilter, any> = {
  resetFilter: ({ commit }) => {
    commit("resetFilter");
  },

  changeFunded: ({ commit }, percentage: number) => {
    commit("changeFunded", percentage);
  },

  changeGoal: ({ commit }, range: [number, number]) => {
    commit("changeGoal", range);
  }
};

const mutations: MutationTree<TFilter> = {
  resetFilter: state => {
    state = { ...defaultState };
  },

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
