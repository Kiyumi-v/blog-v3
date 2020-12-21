import { createStore } from 'vuex';

export default createStore({
  state: {},
  getters: {
    isLogin() {
      return true;
    },
    userName() {
      return 'admin';
    },
    userId() {
      return 'admin';
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
