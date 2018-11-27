import Vuex from 'vuex'
import Vue from 'vue';

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    isLoggedIn: !!localStorage.getItem('token'),

  },

  mutations: {
    loginUser(state) {
        state.isLoggedIn = true
    },
    logoutUser (state){
        state.isLoggedIn = false
    },
  },

});
