import { RouteRecordRaw } from 'vue-router';

export interface IMenu {
  syncMenus: RouteRecordRaw[];
  asyncMenus: RouteRecordRaw[];
}
