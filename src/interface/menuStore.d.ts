import { IMenu } from '@/interface/menu';
import { GetterTree, MutationTree } from 'vuex';
import { RouteRecordRaw } from 'vue-router';

export type IMenuState = () => IMenu;

export interface IMenuGetters<IMenu, any> extends GetterTree<IMenu, any> {
  getSideMenu: (state: IMenu) => RouteRecordRaw[];
}

export interface IMenuMutations<IMenu> extends MutationTree<IMenu> {
  setSyncMenu: (state: IMenu, payload: RouteRecordRaw[]) => void;
  setAsyncMenu: (state: IMenu, payload: RouteRecordRaw[]) => void;
}
