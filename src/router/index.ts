import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router';

const PageWrapper = () => import(/* webpackChunkName: "pageWrapper" */'@/components/PageWrapper');

const Login = () => import(/* webpackChunkName: "login" */'@/views/user/Login');

const Main = () => import(/* webpackChunkName: "main" */'@/views/Main');

const Err404 = () => import(/* webpackChunkName: "error" */'@/views/error/404');
const routes: RouteRecordRaw[] = [
  {
    path: '/idx',
    component: PageWrapper,
    redirect: '/main',
    children: [
      {
        path: '/main',
        name: 'Main',
        component: Main
      },
      {
        path: '/404',
        name: '404',
        component: Err404
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/:w*',
    redirect: '/404'
  }
];

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
