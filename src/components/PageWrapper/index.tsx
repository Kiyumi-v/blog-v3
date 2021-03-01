import { defineComponent, reactive, ref } from 'vue';
import classnames from 'classnames';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Sider from '@/components/Sider';
import './index.scss';

export default defineComponent({
  name: 'PageWrapper',
  setup() {
    const collapsed = ref(false);
    const onMenuCollapse = () => {
      collapsed.value = !collapsed.value;
    };
    return {
      collapsed,
      onMenuCollapse
    };
  },
  render() {
    return (
      <div class='app-wrapper'>
        <a-layout>
          <a-layout-sider
            class='fixed-sider'
            collapsed={ this.collapsed }
            collapsible={ true }
            trigger={ null }
          >
            <Sider collapsed={ this.collapsed } />
          </a-layout-sider>
          <a-layout class={ classnames('fixed-right', this.collapsed ? 'collapsed' : '') }>
            <a-layout-header class='app-layout-header'>
              <Header collapsed={ this.collapsed } onMenuCollapse={ this.onMenuCollapse } />
            </a-layout-header>
            <a-layout-content class='app-layout-content'>
              <router-view />
            </a-layout-content>
            <a-layout-footer class='app-layout-footer'>
              <Footer />
            </a-layout-footer>
          </a-layout>
        </a-layout>
      </div>
    );
  }
});
