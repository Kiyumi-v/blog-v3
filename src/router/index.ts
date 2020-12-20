import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

const Main = () => import(/* webpackChunkName: "main" */'@/views/Main');

const Err404 = () => import(/* webpackChunkName: "error" */'@/views/error/404');
const routes: Array<RouteRecordRaw> = [
  {
    path: '/main',
    name: 'Main',
    component: Main
  },
  {
    path: '/404',
    name: '404',
    component: Err404
  },
  {
    path: '/:w*',
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
