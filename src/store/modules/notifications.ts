import Vuex, { GetterTree, MutationTree, ActionTree } from "vuex";
import { TRootState } from "../index";
import { fetchNotification } from "../../services/api";
import { numberWithCommas } from "../../utils/functions";
import { MessageType } from "../../services/getNotification";

type TMessage = {
  message_type: keyof typeof MessageType;
  project_id: number;
  funding_goal: number;
  project_name: string;
  funded_percentage?: number;
  creator?: string;
  milestone?: string;
  update_name?: string;
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
  getMessageList: state => {
    return state.notifications
      .slice(-10)
      .map(
        ({
          message_type,
          funding_goal,
          project_id,
          project_name,
          funded_percentage = 0,
          creator = "",
          milestone = "",
          update_name = ""
        }) => {
          const messageBase = MessageBase[message_type];
          const actualMessage = messageBase
            .replace("{{creator}}", creator)
            .replace("{{project}}", project_name)
            .replace("{{funded}}", funded_percentage.toString())
            .replace("{{milestone}}", milestone)
            .replace("{{update}}", update_name)
            .replace("{{goal}}", numberWithCommas(funding_goal / 100));
          return {
            project_id,
            message: actualMessage
          };
        }
      );
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
