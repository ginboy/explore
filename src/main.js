import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import installVant from "@/plugins/vant.js";

// 开发测试环境显示console
if (process.env.VUE_APP_SHOWCONSOLE === "true") {
  let Vconsole = require("../node_modules/vconsole/dist/vconsole.min");
  new Vconsole();
}
const app = createApp(App);
installVant(app);
app.use(router).use(store).mount("#app");
