import Vue from "vue";

import App from "./App.vue";

import CategoryList from "./components/CategoryList.vue";

Vue.config.productionTip = false;

Vue.component("CategoryList", CategoryList);

new Vue({
  render: h => h(App)
}).$mount("#app");
