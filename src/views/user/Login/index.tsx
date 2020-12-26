import { defineComponent, ref, computed } from 'vue';
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue';
import classnames from 'classnames';
import './index.scss';

export default defineComponent({
  name: 'Login',
  setup() {
    const type = ref('account');
    const form = ref(null);
    const onSubmit = () => {
      console.log(form);
    };
    const isAccount = computed(() => type.value === 'account');
    const isCeilPhone = computed(() => type.value === 'ceilPhone');
    const changeType = (_type: string) => {
      return () => {
        type.value = _type;
      };
    };
    return {
      form,
      onSubmit,
      changeType,
      isAccount,
      isCeilPhone
    };
  },
  render() {
    const userNameSlots = {
      prefix: () => (<UserOutlined class='form-input-icon' />)
    };
    const pwdSlots = {
      prefix: () => (<LockOutlined class='form-input-icon' />)
    };
    return (
      <div class='login'>
        <div class='login-wrapper'>
          <div class='login-wrapper-title'>
            <div class='login-wrapper-title-content'>
              <img class='title-logo' src='../../../assets/logo.png' alt='' />
              <span>Ant Design</span>
            </div>
            <div class='login-wrapper-title-subtitle'>
              最具影响力的 Web 设计规范
            </div>
          </div>
          <div class='login-form'>
            <div class='login-form-tabs'>
              <div
                class={ classnames(this.isAccount ? 'tab-item-active' : '', 'tab-item') }
                onClick={ this.changeType('account') }
              >
                账号密码登录
              </div>
              <div
                class={ classnames(this.isCeilPhone ? 'tab-item-active' : '', 'tab-item') }
                onClick={ this.changeType('ceilPhone') }
              >
                手机号登录
              </div>
            </div>
            <a-form
              ref={ (e: any) => this.form = e }
              wrapperCol={ { span: 24 } }
            >
              <div class='login-form-container'>
                <a-form-item>
                  <a-input size='large' v-slots={ userNameSlots } />
                </a-form-item>
                <a-form-item>
                  <a-input size='large' v-slots={ pwdSlots } />
                </a-form-item>
                <a-button
                  class='login-form-confirm-btn'
                  type='primary'
                  size='large'
                  onClick={ this.onSubmit }
                >
                  确定
                </a-button>
              </div>
            </a-form>
          </div>
        </div>
      </div>
    );
  }
});
