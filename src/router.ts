import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/explore/All"
    },
    {
      path: "/explore/:name/:id?",
      name: "explore",
      component: () => import("./views/ProjectView.vue")
    }
  ]
});
