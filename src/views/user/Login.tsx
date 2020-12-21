import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Login',
  setup() {
    const onSubmit = () => {};
    return {
      onSubmit
    };
  },
  render() {
    return (
      <div class='login'></div>
    );
  }
});
