import { defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'sider',
  setup() {
    const store = useStore();
    const sideMenus = store.getters['menu/getSideMenu'];
    return {
      sideMenus
    };
  },
  render() {
    console.log(this.sideMenus);
    return (
      <div class="app-sider">

      </div>
    );
  }
});
