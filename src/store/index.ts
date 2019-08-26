import Vue from "vue";
import Vuex, { MutationTree, ActionTree } from "vuex";
import { RootState } from "./types";
import { FEATURED } from "../utils/constants";

Vue.use(Vuex);

// root state object.
const state = {
  selectedCategory: FEATURED
};

const mutations: MutationTree<RootState> = {
  changeCategory(state, payload: string) {
    state.selectedCategory = payload;
  }
};

const actions: ActionTree<RootState, RootState> = {
  changeCategory: ({ commit }, payload: string) =>
    commit("changeCategory", payload)
};

const store = { state, actions, mutations, strict: true };

export default new Vuex.Store<RootState>(store);
