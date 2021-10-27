import Vue from 'vue'
import App from './App.vue'
import router from "@/router";
import  store from "@/store"
import Vant from 'vant';
import axios from "axios";

//rem适配
import "amfe-flexible"
import 'vant/lib/index.css';
import "./styles/index.css"

Vue.use(Vant);
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
