import Vue from "vue";
import Router from "vue-router";
import Authentication from "@/components/pages/Authentication/Authentication.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/login"
    },
    {
      path: "/login",
      name: "Authantication",
      component: Authentication
    }
  ]
});
