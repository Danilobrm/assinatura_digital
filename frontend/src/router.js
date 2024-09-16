import Home from "./views/Home.vue";
import "./style.css";
import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      name: "Home",
      path: "/",
      component: Home,
    },
  ],
});

export default router;
