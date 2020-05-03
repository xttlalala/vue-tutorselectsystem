<template>
  <div>
    <index v-if="isLogin" />
    <login v-else />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  components: {
    login: () => import("@/views/Login.vue"),
    // welcome: () => import("@/views/Welcome.vue")
    index: () => import("@/views/Index.vue")
  },
  computed: {
    ...mapState(["isLogin"])
  }
};
</script>
