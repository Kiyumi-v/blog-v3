import {createStore} from 'vuex';
import user from './modules/user';
import menu from './modules/menu';

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
  modules: {
    user,
    menu
  }
});
