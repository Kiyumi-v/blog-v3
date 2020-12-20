import { createApp } from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Ant from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

createApp(App)
  .use(store)
  .use(router)
  .use(Ant)
  .mount('#app');
