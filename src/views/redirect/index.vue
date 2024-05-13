<script>
import { useRoute, useRouter } from 'vue-router'

export default {
  // eslint-disable-next-line jsdoc/require-jsdoc
  setup() {
    const router = useRouter()
    const route = useRoute()

    const { params: { path }, query } = route
    router.replace({ path: `/${path}`, query })
  },
}
</script>
