import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { useForm } from '@ant-design-vue/use';
import { UserOutlined, LockOutlined, MobileOutlined, MailOutlined } from '@ant-design/icons-vue';
import Logo from '@/assets/logo.png';
import classnames from 'classnames';
import './index.scss';

export default defineComponent({
  name: 'Login',
  setup() {
    const store = useStore();
    const router = useRouter();
    const type = ref('account');
    const model = reactive({
      userName: '',
      password: '',
      phone: '',
      code: ''
    });
    const accountRules = reactive({
      userName: [
        { required: true, message: '请输入用户名', trigger: 'manual' }
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'manual' }
      ]
    });
    const ceilRules = reactive({
      phone: [
        { required: true, message: '请输入手机号', trigger: 'manual' }
      ],
      code: [
        { required: true, message: '请输入验证码', trigger: 'manual' }
      ]
    });
    const isAccount = computed(() => type.value === 'account');
    const isCeilPhone = computed(() => type.value === 'ceilPhone');
    const accountForm = useForm(model, accountRules);
    const ceilForm = useForm(model, ceilRules);
    const validate = () => isAccount.value ? accountForm.validate() : ceilForm.validate();
    const validateInfos = (type: string) => type === 'account' ? accountForm.validateInfos : ceilForm.validateInfos;
    const resetFields = () => isAccount.value ? accountForm.resetFields() : ceilForm.resetFields();

    const onSubmit = () => {
      validate()
        .then(res => {
          console.log(res);
          store.commit('user/setUser', { userName: 'test', userId: 1 });
          router.push('/main');
        });
    };
    const changeType = (_type: string) => {
      return () => {
        resetFields();
        type.value = _type;
      };
    };
    const changeValue = (e: any, prop: 'userName' | 'password' | 'phone' | 'code') => {
      model[prop] = e.target.value;
    };
    return {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
      type,
      model,
      validateInfos,
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
              <img class='title-logo' src={ Logo } alt='' />
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
              labelCol={ this.labelCol }
              wrapperCol={ this.wrapperCol }
              colon={ false }
            >
              <div class='login-form-container'>
                {
                  this.type === 'account'
                    ? (
                      <>
                        <a-form-item label=' ' required { ...this.validateInfos('account').userName }>
                          <a-input
                            value={ this.model.userName }
                            size='large'
                            v-slots={ slots.userName }
                            onChange={ (e: any) => this.changeValue(e, 'userName') }
                            placeholder='请输入用户名'
                          />
                        </a-form-item>
                        <a-form-item label=' ' required { ...this.validateInfos('account').password }>
                          <a-input
                            value={ this.model.password }
                            type='password'
                            size='large'
                            v-slots={ slots.password }
                            onChange={ (e: any) => this.changeValue(e, 'password') }
                            placeholder='请输入密码'
                          />
                        </a-form-item>
                      </>
                    )
                    : (
                      <>
                        <a-form-item label=' ' required { ...this.validateInfos('ceilPhone').phone }>
                          <a-input
                            value={ this.model.phone }
                            size='large'
                            v-slots={ slots.phone }
                            onChange={ (e: any) => this.changeValue(e, 'phone') }
                            placeholder='请输入手机号'
                          />
                        </a-form-item>
                        <a-form-item label=' ' required { ...this.validateInfos('ceilPhone').code }>
                          <a-input
                            value={ this.model.code }
                            size='large'
                            v-slots={ slots.code }
                            onChange={ (e: any) => this.changeValue(e, 'code') }
                            placeholder='请输入密码'
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
