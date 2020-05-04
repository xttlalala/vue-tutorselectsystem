<template>
  <div class="container">
    <p v-if="tutor">
      {{ tutor.user.name }}
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  created() {
    this.$store.dispatch("backendindex");
  },
  computed: {
    ...mapState(["tutor"])
  }
};
</script>
