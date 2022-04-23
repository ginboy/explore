import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/home/index.vue";
import Mine from "@/views/mine/index.vue";

const routerHistory = createWebHashHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      redirect: "/home",
      component: Home,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home,
          meta: {
            keepAlive: false
          }
        }
      ]
    },
    {
      path: "/mine",
      name: "Mine",
      component: Mine,
      meta: {
        keepAlive: false
      }
    }
  ]
});
export default router;
