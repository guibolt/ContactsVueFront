import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueIziToast from 'vue-izitoast';

import 'roboto-fontface/css/roboto/roboto-fontface.css'
import "material-design-icons-iconfont/dist/material-design-icons.css";

import 'izitoast/dist/css/iziToast.css';

Vue.use(VueIziToast)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
