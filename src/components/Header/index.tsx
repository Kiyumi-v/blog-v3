import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined
} from '@ant-design/icons-vue';
import './index.scss';

export default defineComponent({
  name: 'Header',
  props: {
    onMenuCollapse: {
      type: Function,
      default: () => (() => {
      })
    },
    collapsed: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const router = useRouter();
    const onMenuClick = (menuItem: Record<string, any>) => {
      const { key } = menuItem;
      if (key === 'logout') {
        return;
      }
      router.push({
        name: key
      });
    };
    return {
      onMenuClick
    };
  },
  render() {
    const renderIcon = () => {
      let Icon: any = <MenuFoldOutlined />;
      if (this.collapsed) {
        Icon = <MenuUnfoldOutlined />;
      }
      return <Icon onClick={ this.onMenuCollapse } />;
    };
    const avatarSlots = {
      icon: () => (
        <UserOutlined />
      )
    };
    const dropdownSlots = {
      default: () => (
        <div class='user'>
          <a-avatar class='avatar' v-slots={ avatarSlots } />
          <div class='user-name'>
            userName
          </div>
        </div>
      ),
      overlay: () => (
        <a-menu onClick={ this.onMenuClick }>
          <a-menu-item key='userCenter'>
            <UserOutlined />
            个人中心
          </a-menu-item>
          <a-menu-item key='userSetting'>
            <SettingOutlined />
            个人设置
          </a-menu-item>
          <a-menu-divider />
          <a-menu-item key='logout'>
            <LogoutOutlined />
            退出登录
          </a-menu-item>
        </a-menu>
      )
    };
    return (
      <div class='app-header'>
        <div class='left-wrapper'>
          { renderIcon() }
        </div>
        <div class='right-wrapper'>
          <a-dropdown placement='bottomLeft' v-slots={ dropdownSlots } />
        </div>
      </div>
    );
  }
});
