import { Router } from 'vue-router';
import store from '@/store';

export default function permission(router: Router) {
  router.beforeEach((to, from, next) => {
    if (store.getters.isLogin) {
      next();
    }
  });
}
