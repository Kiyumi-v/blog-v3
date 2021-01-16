import { defineComponent, ref, reactive, computed } from 'vue';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons-vue';
import classnames from 'classnames';
import './index.scss';

export default defineComponent({
  name: 'Login',
  setup() {
    const type = ref('account');
    const model = reactive({
      userName: '',
      password: '',
      phone: '',
      code: ''
    });
    const rules = reactive({
      userName: [
        {
          required: true,
          message: '请输入用户名'
        }
      ],
      password: [
        {
          required: true,
          message: '请输入密码'
        }
      ],
      code: []
    });
    let form = {
      validate() {
      }
    };
    const onSubmit = () => {
      console.dir(form);
      form.validate();
    };
    const setForm = (e: any) => form = e;
    const isAccount = computed(() => type.value === 'account');
    const isCeilPhone = computed(() => type.value === 'ceilPhone');
    const changeType = (_type: string) => {
      return () => {
        type.value = _type;
      };
    };
    const changeValue = (e: any, prop: 'userName' | 'password' | 'phone' | 'code') => {
      model[prop] = e.target.value;
    };
    return {
      type,
      model,
      setForm,
      onSubmit,
      changeType,
      changeValue,
      isAccount,
      isCeilPhone
    };
  },
  render() {
    const slots = {
      userName: {
        prefix: () => (<UserOutlined class='form-input-icon' />)
      },
      password: {
        prefix: () => (<LockOutlined class='form-input-icon' />)
      },
      phone: {
        prefix: () => (<MobileOutlined class='form-input-icon' />)
      },
      code: {
        prefix: () => (<MailOutlined class='form-input-icon' />)
      }
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
              value={ this.model }
              ref={ this.setForm }
              wrapperCol={ { span: 24 } }
            >
              <div class='login-form-container'>
                {
                  this.type === 'account'
                    ? (
                      <>
                        <a-form-item required>
                          <a-input
                            value={ this.model.userName }
                            size='large'
                            v-slots={ slots.userName }
                            onChange={ (e: InputEvent) => this.changeValue(e, 'userName') }
                          />
                        </a-form-item>
                        <a-form-item required>
                          <a-input
                            value={ this.model.password }
                            type='password'
                            size='large'
                            v-slots={ slots.password }
                            onChange={ (e: any) => this.changeValue(e, 'password') }
                          />
                        </a-form-item>
                      </>
                    )
                    : (
                      <>
                        <a-form-item required>
                          <a-input
                            value={ this.model.phone }
                            size='large'
                            v-slots={ slots.phone }
                            onChange={ (e: InputEvent) => this.changeValue(e, 'phone') }
                          />
                        </a-form-item>
                        <a-form-item required>
                          <a-input
                            value={ this.model.code }
                            size='large'
                            v-slots={ slots.code }
                            onChange={ (e: any) => this.changeValue(e, 'code') }
                          />
                        </a-form-item>
                      </>
                    )
                }
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
