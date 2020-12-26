import { Router, RouteLocationNormalized, RouteRecordRaw } from 'vue-router';
import { SYNC_ROUTES, asyncRoutes } from '@/router';
import whiteList from '@/router/whiteList';
import store from '@/store';

const auth = (to: RouteLocationNormalized, from: RouteLocationNormalized) => {
  let path = '';
  const { meta = {} } = to;
  const { allows = [] } = meta;
  if (whiteList.has(to.path)) {
  } else if (!store.getters.isLogin) {
    path = '/login';
  } else if (allows.length && !allows.includes(from.name)) {
    path = '/403';
  }
  return Promise.resolve(path);
};

const getMenus = () => {
  return Promise.resolve(['UserManager']);
};


const menuFilter: (menu: RouteRecordRaw[], menus: string[]) => RouteRecordRaw[]
  = (menu: RouteRecordRaw[] = asyncRoutes, menus: string[]) => {
  return menu.filter((m) => {
    const { name = '', children = [] } = m;
    if (children.length) {
      m.children = menuFilter(children, menus);
    }
    return menus.includes(name as string) || (m.children as RouteRecordRaw[]).length > 0;
  });
};

export default function permission(router: Router) {
  store.commit('menu/setSyncMenu', SYNC_ROUTES);
  router.beforeEach(async (to, from, next) => {
    const path: string = await auth(to, from);
    if (path) {
      next(path);
    } else {
      const menus = await getMenus();
      const filteredMenus = menuFilter(asyncRoutes, menus);
      filteredMenus.forEach((route) => {
        router.addRoute(route);
      });
      store.commit('menu/setAsyncMenu', filteredMenus);
      console.log(filteredMenus);
      next();
    }
  });
}
