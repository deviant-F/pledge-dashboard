import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import hooks from "@u3u/vue-hooks";

import store from "./store/index";

import App from "./App.vue";
import CategoryList from "./components/CategoryList.vue";
import ProjectList from "./components/ProjectList.vue";
import FilterPanel from "./components/FilterPanel.vue";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(hooks);

Vue.component("CategoryList", CategoryList);
Vue.component("FilterPanel", FilterPanel);
Vue.component("ProjectList", ProjectList);

new Vue({
  el: "#app",
  store,
  render: h => h(App)
}).$mount("#app");
