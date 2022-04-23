import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import store from "./store/index.js";
import installVant from "@/plugins/vant.js";
const app = createApp(App);
installVant(app);
app.use(router).use(store).mount("#app");
