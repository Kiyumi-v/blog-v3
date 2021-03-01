import { defineComponent } from 'vue';
import './app.scss';

export default defineComponent({
  setup() {

  },
  render() {
    return (
      <div class='app'>
        <router-view />
      </div>
    );
  }
});
