import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const PageWrapper = () => import(/* webpackChunkName: "pageWrapper" */'@/components/PageWrapper');

const Login = () => import(/* webpackChunkName: "login" */'@/views/user/Login/index');

const Main = () => import(/* webpackChunkName: "main" */'@/views/Main');

const UserManager = () => import(/* webpackChunkName: "user" */'@/views/user/Manager');

const Err404 = () => import(/* webpackChunkName: "error" */'@/views/error/404');

export const SYNC_ROUTES: RouteRecordRaw[] = [
  {
    path: '/',
    component: PageWrapper,
    redirect: '/main',
    meta: {
      hidden: true,
      hideInBreadcrumb: true
    },
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main,
        meta: {
          title: '首页'
        }
      },
      {
        path: '/404',
        name: '404',
        component: Err404,
        meta: {
          hidden: true,
          hideInBreadcrumb: true
        }
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      hidden: true
    }
  },
  {
    path: '/:w*',
    redirect: '/404',
    meta: {
      hidden: true
    }
  }
];

export const asyncRoutes = [
  {
    path: '/user',
    component: PageWrapper,
    redirect: '/user-Manager',
    meta: {
      title: '用户管理'
    },
    children: [
      {
        path: '/user-Manager',
        name: 'UserManager',
        component: UserManager,
        meta: {
          title: '注册用户'
        }
      }
    ]
  }
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: SYNC_ROUTES
});

export default router;
