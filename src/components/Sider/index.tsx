import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import MenuItem from './components/MenuItem';
import './index.scss';

export default defineComponent({
  name: 'sider',
  setup() {
    const store = useStore();
    const route = useRoute();
    const sideMenus = store.getters['menu/getSideMenu'];
    const selectedKeys = reactive([route.path]);
    const onMenuItemClick = (item: any) => {
      const { key } = item;
      selectedKeys[0] = key;
    };
    onMounted(() => {
      selectedKeys[0] = route.path;
    });
    return {
      sideMenus,
      selectedKeys,
      onMenuItemClick
    };
  },
  render() {
    console.log(this.sideMenus);
    return (
      <div class='app-sider'>
        <div class='logo'></div>
        <a-menu
          theme='dark'
          mode='inline'
          selectedKeys={ this.selectedKeys }
          onClick={ this.onMenuItemClick }
        >
          <MenuItem items={ this.sideMenus } />
        </a-menu>
      </div>
    );
  }
});
