import { defineComponent, reactive } from 'vue';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './app.scss';

export default defineComponent({
  setup() {
    let selectedKeys = reactive(['1']);
    const onClick = (item: any) => {
      const { key } = item;
      selectedKeys[0] = key;
    };
    console.log(selectedKeys);
    return {
      onClick,
      selectedKeys
    };
  },
  render() {
    return (
      <div class="app-container">
        <a-layout>
          <a-layout-sider class="fixed-sider">
            <div class="logo"></div>
            <a-menu theme="dark" mode="inline" selectedKeys={ this.selectedKeys } onClick={ this.onClick }>
              <a-menu-item key="1">
                nav 1
              </a-menu-item>
              <a-menu-item key="2">
                nav 2
              </a-menu-item>
            </a-menu>
          </a-layout-sider>
          <a-layout class="fixed-left">
            <a-layout-header class="app-header">
              <Header />
            </a-layout-header>
            <a-layout-content class="app-content">
              <router-view />
            </a-layout-content>
            <a-layout-footer class="app-footer">
              <Footer />
            </a-layout-footer>
          </a-layout>
        </a-layout>
      </div>
    );
  }
});
