
import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import home from '@/Home'
import store from './store/store';

Vue.use(Vuex);
Vue.prototype.$http = axios;
Vue.config.productionTip = false


new Vue({
  el: '#app',
  router,
  store,
  components: { home },
  template: '<home/>'
})
