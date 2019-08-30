import Vue from "vue";
import VueCompositionApi from "@vue/composition-api";
import hooks from "@u3u/vue-hooks";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

import store from "./store/index";
import router from "./router";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(VueCompositionApi);
Vue.use(hooks);

Vue.component("font-awesome-icon", FontAwesomeIcon);

new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
}).$mount("#app");
