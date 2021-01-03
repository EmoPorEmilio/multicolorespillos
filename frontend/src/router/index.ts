import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Inicio from "../views/Inicio.vue";
import Pilleada from "../views/Pilleada.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Inicio",
    component: Inicio
  },
  {
    path: "/pilleada",
    name: "Pilleada",
    component: Pilleada
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
