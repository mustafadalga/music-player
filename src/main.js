import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



const app = createApp(App)
app.component('font-awesome-icon', FontAwesomeIcon)
app.use(store).mount("#app");