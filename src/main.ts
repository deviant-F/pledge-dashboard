import Vue from "vue";

import App from "./App.vue";
import CategoryList from "./components/CategoryList.vue";
import ProjectList from "./components/ProjectList.vue";

Vue.config.productionTip = false;

Vue.component("CategoryList", CategoryList);
Vue.component("ProjectList", ProjectList);

new Vue({
  render: h => h(App)
}).$mount("#app");
