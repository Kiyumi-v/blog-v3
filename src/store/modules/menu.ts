import { IMenu } from '@/interface/menu';
import { IMenuState, IMenuGetters, IMenuMutations } from '@/interface/menuStore';
import { RouteRecordRaw } from 'vue-router';

const state: IMenuState = () => {
  return {
    syncMenus: [],
    asyncMenus: []
  };
};

const getters: IMenuGetters<IMenu, any> = {
  getSideMenu(state: IMenu) {
    return [...state.syncMenus, ...state.asyncMenus];
  }
};

const mutations: IMenuMutations<IMenu> = {
  setSyncMenu(state: IMenu, menus: RouteRecordRaw[]) {
    state.syncMenus = menus;
  },
  setAsyncMenu(state: IMenu, menus: RouteRecordRaw[]) {
    state.asyncMenus = menus;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations
};
