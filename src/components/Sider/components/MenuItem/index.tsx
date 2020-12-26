import { defineComponent } from 'vue';
import { RouteRecordRaw } from 'vue-router';

export default defineComponent({
  name: 'MenuItem',
  props: {
    items: {
      type: Array,
      default: () => ([])
    }
  },
  setup(props, context) {
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
    return {
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
        console.log(key);
        return (
          <a-menu-item key={ key }>
            { text }
          </a-menu-item>
        );
      }).filter((i) => !!i);
    };
    return renderItem(this.items as RouteRecordRaw[]);
  }
});
