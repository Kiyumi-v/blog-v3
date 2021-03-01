import { defineComponent, reactive, onMounted } from 'vue';
import { useStore } from 'vuex';
import { RouteRecordRaw, useRoute, useRouter } from 'vue-router';
import './index.scss';

export default defineComponent({
  name: 'sider',
  props: {
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const sideMenus = store.getters['menu/getSideMenu'];
    const selectedKeys = reactive([route.path]);
    const onMenuItemClick = (item: any) => {
      const { key } = item;
      selectedKeys[0] = key;
      router.push(key);
    };
    const childrenFilter = (children: RouteRecordRaw[] | undefined) => {
      if (!children) {
        return [];
      }
      return children.filter(item => {
        const { meta = {} } = item;
        const { hidden } = meta;
        return !hidden;
      });
    };
    onMounted(() => {
      selectedKeys[0] = route.path;
    });
    return {
      sideMenus,
      selectedKeys,
      onMenuItemClick,
      childrenFilter
    };
  },
  render() {
    const renderItem = (items: RouteRecordRaw[]): any => {
      if (!items) {
        return null;
      }
      return items.map((item) => {
        const { path, name, meta = {}, redirect } = item;
        const children: RouteRecordRaw[] = this.childrenFilter(item.children);
        const { hidden, title } = meta;
        const text = title || name;
        const key = redirect || path;
        if (hidden) {
          return null;
        } else if (children && children.length > 0) {
          const subMenuSlots = {
            title: () => <span>{ text }</span>
          };
          return (
            <a-sub-menu key={ key } v-slots={ subMenuSlots }>
              { renderItem(children) }
            </a-sub-menu>
          );
        }
        return (
          <a-menu-item key={ key }>
            { text }
          </a-menu-item>
        );
      }).filter((i) => !!i);
    };
    return (
      <div class='app-sider'>
        <div class='logo'></div>
        <a-menu
          theme='dark'
          mode='inline'
          inlineCollapsed={ this.collapsed }
          selectedKeys={ this.selectedKeys }
          onClick={ this.onMenuItemClick }
        >
          { renderItem(this.sideMenus) }
        </a-menu>
      </div>
    );
  }
});
