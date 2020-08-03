import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Timeline from "../views/Timeline.vue";
import Pilleada from "../views/Pilleada.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Timeline",
    component: Timeline,
  },
  {
    path: "/pilleada",
    name: "Pilleada",
    component: Pilleada,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
