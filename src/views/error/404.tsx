import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: '404',
  setup() {
    const router = useRouter();
    const onClick = () => router.push('/main');
    return () => (
      <div class="error-404">
        404
        <a-button type="primary" onClick={ onClick }>回到首页</a-button>
      </div>
    );
  }
});
