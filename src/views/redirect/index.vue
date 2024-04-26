<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()

    const { params: { path }, query } = route
    router.replace({ path: `/${path}`, query })
  },
}
</script>
