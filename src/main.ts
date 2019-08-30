import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import hooks from "@u3u/vue-hooks";

import store from "./store/index";
import router from "./router";

import App from "./App.vue";
import CategoryList from "./components/CategoryList.vue";
import ProjectView from "./views/ProjectView.vue";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(hooks);

Vue.component("CategoryList", CategoryList);
Vue.component("ProjectView", ProjectView);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
}).$mount("#app");
