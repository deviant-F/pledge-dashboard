import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/category/featured"
    },
    {
      path: "/category/:id",
      name: "category",
      component: () => import("./App.vue")
    }
  ]
});
